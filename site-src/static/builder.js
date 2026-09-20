'use strict';
// The hero builder on the landing page. The form writes one config object, the canvas redraws it live,
// and the Play button opens the game page (g/demo/) with the config in the link. Nothing is sent to a server.
(() => {
  const $ = id => document.getElementById(id);

  // start from the link (coming back from the game), then a saved draft, then the demo family
  let cfg = null;
  const fromLink = location.hash.includes('g=');
  if (fromLink) cfg = cfgFromLink();
  if (!cfg) { try { const d = localStorage.getItem('hhg-draft'); if (d) cfg = JSON.parse(d); } catch (e) {} }
  cfg = sanitise(cfg || DEMO);
  // The hero's name and family travel in the hash. Once they are read, take them out of the address
  // bar: this page carries an analytics script, and a family's details have no business in anyone
  // else's logs. The draft in localStorage keeps them on this device.
  if (fromLink) { try { history.replaceState(null, '', location.pathname + '#make'); } catch (e) {} }

  function swatches(el, list, names, get, set) {
    el.innerHTML = '';
    list.forEach((c, k) => {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'sw'; b.style.setProperty('--c', c); b.title = names[k];
      b.setAttribute('aria-label', names[k]); b.setAttribute('aria-pressed', String(get() === c));
      b.addEventListener('click', () => { set(c); el.querySelectorAll('.sw').forEach(x => x.setAttribute('aria-pressed', String(x === b))); changed(); });
      el.appendChild(b);
    });
  }
  function choice(name, get, set) {
    document.querySelectorAll(`input[name="${name}"]`).forEach(r => {
      r.checked = r.value === get();
      r.addEventListener('change', () => { if (r.checked) { set(r.value); changed(); } });
    });
  }
  function text(id, get, set) { const el = $(id); el.value = get() || ''; el.addEventListener('input', () => { set(el.value); changed(); }); }

  // the hero
  text('hero-name', () => titleCase(cfg.hero.name), v => { cfg.hero.name = v; });
  choice('hair', () => cfg.hero.hair, v => { cfg.hero.hair = v; });
  swatches($('hair-col'), HAIRCOLS, HAIR_LABELS, () => cfg.hero.hairCol, v => { cfg.hero.hairCol = v; });
  swatches($('skin'), SKINS, SKIN_LABELS, () => cfg.hero.skin, v => { cfg.hero.skin = v; });
  swatches($('kit'), KITCOLS, KIT_LABELS, () => cfg.hero.kit, v => { cfg.hero.kit = v; });
  choice('occasion', () => cfg.occasion, v => { cfg.occasion = v; });

  // up to three family members: a role, a name, a hair color
  // words that change outside North America: Mum for Mom, Granny for Grandma (see DIALECT in engine.js)
  // outside North America the page says Mum and Granny. Each element carries the whole sentence,
  // so a translated page can hold a translated version of both.
  if (DIALECT !== 'us') document.querySelectorAll('[data-int]').forEach(el => { el.textContent = el.dataset.int; });
  const roleOpts = '<option value="">Nobody</option>' + Object.keys(ROLES).map(r => `<option value="${r}">${roleLabel(r)}</option>`).join('');
  const hairOpts = HAIRCOLS.map((c, k) => `<option value="${c}">${HAIR_LABELS[k]} hair</option>`).join('');
  const famRows = [];
  // the demo builds one opponent. The full game takes up to eight people.
  for (let k = 0; k < 1; k++) {
    const m = cfg.family[k] || { role: '', name: '', hairCol: HAIRCOLS[1] };
    const row = document.createElement('div'); row.className = 'fam';
    row.innerHTML = `<label class="sr" for="fam-role-${k}">Family member ${k + 1}</label><select id="fam-role-${k}">${roleOpts}</select>` +
      `<label class="sr" for="fam-name-${k}">Their name</label><input id="fam-name-${k}" maxlength="10" autocomplete="off" placeholder="Name (optional)">` +
      `<label class="sr" for="fam-hair-${k}">Their hair</label><select id="fam-hair-${k}">${hairOpts}</select>`;
    $('family').appendChild(row);
    const [role, name, hair] = row.querySelectorAll('select, input');
    role.value = m.role || ''; name.value = m.name && ROLES[m.role] && m.name !== roleLabel(m.role).toUpperCase() ? titleCase(m.name) : ''; hair.value = m.hairCol;
    [role, name, hair].forEach(el => el.addEventListener('input', changed));
    famRows.push({ role, name, hair });
  }
  // the dog, and the details that end up in the quiz and the finale
  cfg.pet = cfg.pet || { name: '', kind: 'dog', col: PETCOLS[0] };
  $('pet-kind').innerHTML = Object.keys(PETKINDS).map(k => `<option value="${k}">${PETKINDS[k].label}</option>`).join('');
  $('pet-kind').value = cfg.pet.kind || 'dog';
  $('pet-kind').addEventListener('change', () => { cfg.pet.kind = $('pet-kind').value; changed(); });
  text('pet-name', () => cfg.pet.name ? titleCase(cfg.pet.name) : '', v => { cfg.pet.name = v; });
  swatches($('pet-col'), PETCOLS, PET_LABELS, () => cfg.pet.col, v => { cfg.pet.col = v; });
  text('food', () => cfg.food ? titleCase(cfg.food) : '', v => { cfg.food = v; });
  text('catch', () => cfg.catchphrase ? titleCase(cfg.catchphrase) : '', v => { cfg.catchphrase = v; });

  function current() {
    cfg.family = famRows.filter(r => r.role.value).map(r => ({ role: r.role.value, name: r.name.value, hairCol: r.hair.value }));
    return sanitise(cfg);
  }
  function changed() {
    const c = current(); applyConfig(c);
    $('play').href = 'g/demo/#g=' + encodeCfg(c);
    $('play-label').textContent = 'Play ' + titleCase(c.hero.name) + '\'s first game, free';
    try { localStorage.setItem('hhg-draft', JSON.stringify(c)); } catch (e) {}
  }
  changed();

  // the live preview: the hero's name in lights with the whole cast on the horizon
  let t = 0;
  function frame() {
    requestAnimationFrame(frame); t++;
    bgSynth(t);
    scene(CFG.occasion, t, false);
    // The same sizes as the game's title screen, because this is the picture people judge the
    // whole thing on, and on a phone this canvas is about 350 pixels wide.
    txt('STARRING', W / 2, 10, 16, COL.ink, 'center');
    const n = HERO.name, size = n.length > 10 ? 24 : n.length > 8 ? 32 : 40;
    namePlate(n, W / 2, 28 + 4, size);
    nameLogo(n, W / 2, 32, size);
    const occ = OCCASIONS[CFG.occasion] === 'YOU\'RE A STAR' ? 'AN ARCADE ADVENTURE' : OCCASIONS[CFG.occasion];
    const ow = occ.length * 16;
    rect(W / 2 - ow / 2 - 10, 80, ow + 20, 30, BAND());
    rect(W / 2 - ow / 2 - 10, 80, ow + 20, 3, COL.gold);
    txt(occ, W / 2, 87, 16, COL.gold, 'center');
    const cast = [HERO].concat(FAM), gap = 70, x0 = W / 2 - (cast.length - 1) * gap / 2;
    cast.forEach((sp, k) => { shadow(x0 + k * gap, 240, 14); drawSpec(sp, x0 + k * gap, 240, k ? 3 : 4, false, Math.floor(t / 22 + k)); });
    if (petRuns()) { const c = t % 900; pet((c * 1.1) % (W + 120) - 60, 262, 2, true, Math.floor(t / 6)); }
    else if (PET) pet(40, 262, 2, true, Math.floor(t / 22));
    scene(CFG.occasion, t, true);
  }
  requestAnimationFrame(frame);
  if (fromLink) setTimeout(() => $('make').scrollIntoView(), 50);

})();
