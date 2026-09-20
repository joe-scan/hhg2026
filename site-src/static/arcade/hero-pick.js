'use strict';
// ---------- PICK YOUR LOOK
// The free pages let you change the hero, not just name them: hair, hair colour, skin and shirt.
// The same four choices the builder offers, minus the family, so the strip stays small.
// The choice is kept in the visitor's own browser and shared by every free page, so the hero
// follows them from the name page to the Christmas game. Nothing is sent anywhere.

const LOOK_KEY = 'hhg-look';
const HAIRLABELS = { short: 'Short', straight: 'Straight', curly: 'Curly', long: 'Long', ponytail: 'Ponytail' };

function heroLook() {
  const out = { hair: DEMO.hero.hair, hairCol: DEMO.hero.hairCol, skin: DEMO.hero.skin, kit: DEMO.hero.kit };
  // a hero built on the front page comes with the visitor, if they made one
  try {
    const draft = JSON.parse(localStorage.getItem('hhg-draft') || 'null');
    if (draft && draft.hero) Object.assign(out, { hair: draft.hero.hair, hairCol: draft.hero.hairCol, skin: draft.hero.skin, kit: draft.hero.kit });
  } catch (e) {}
  try { Object.assign(out, JSON.parse(localStorage.getItem(LOOK_KEY) || 'null') || {}); } catch (e) {}
  return out;
}

// The free pages get the short list. Eight hair colours and nine shirts is a decision to make
// before somebody has been given anything, which is too much work for free. The skin row is the
// exception and keeps all six: that row is about a child seeing themselves, and cutting it to
// three leaves people out.
const FEW_HAIR = ['#141018', '#6b3f1d', '#c8641e', '#e0b64a'];
const FEW_KITS = ['#1f7ae0', '#e0102a', '#1e9e4a', '#ffd23f'];

function heroPick(into, look, onChange, brief) {
  if (!into) return;
  const save = () => { try { localStorage.setItem(LOOK_KEY, JSON.stringify(look)); } catch (e) {} onChange(); };

  const row = label => {
    const d = document.createElement('div');
    d.className = 'row-l';
    const s = document.createElement('span'); s.textContent = label; d.appendChild(s);
    into.appendChild(d);
    return d;
  };
  const swatches = (label, all, names, key, few) => {
    const list = brief && few ? few : all;
    const d = row(label), box = document.createElement('div');
    box.className = 'sws';
    list.forEach((c0, k0) => {
      const c = c0, k = all.indexOf(c0);
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'sw'; b.style.setProperty('--c', c);
      b.title = names[k]; b.setAttribute('aria-label', names[k]);
      b.setAttribute('aria-pressed', String(look[key] === c));
      b.addEventListener('click', () => {
        look[key] = c;
        box.querySelectorAll('.sw').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
        save();
      });
      box.appendChild(b);
    });
    d.appendChild(box);
  };

  const d = row('Hair'), opts = document.createElement('div');
  opts.className = 'opts';
  ['short', 'straight', 'curly', 'long', 'ponytail'].filter(h => HAIRS.includes(h)).forEach(h => {
    const lab = document.createElement('label'), inp = document.createElement('input'), sp = document.createElement('span');
    inp.type = 'radio'; inp.name = 'look-hair'; inp.value = h; inp.checked = look.hair === h;
    sp.textContent = HAIRLABELS[h] || h;
    inp.addEventListener('change', () => { if (inp.checked) { look.hair = h; save(); } });
    lab.append(inp, sp); opts.appendChild(lab);
  });
  d.appendChild(opts);

  swatches('Hair color', HAIRCOLS, HAIR_LABELS, 'hairCol', FEW_HAIR);
  swatches('Skin', SKINS, SKIN_LABELS, 'skin');
  swatches('Shirt', KITCOLS, KIT_LABELS, 'kit', FEW_KITS);
}
