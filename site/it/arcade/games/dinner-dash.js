'use strict';
// ---------- 14. DINNER DASH: catch the dinners, dodge the sprouts
function gDinner() {
  const s = { name: 'LA CORSA DELLA CENA', how: [(helper() ? helper().name + ' PREPARA DA MANGIARE. ' : '') + 'PRENDILO NEL PIATTO.', 'PASTA, BROCCOLI: 1. I TUOI ' + CFG.food + ': 3.', 'I CAVOLINI TOLGONO 2. CHE SCHIFO!', 'PRIMO A 15.'], ctl: 'MUOVITI: SINISTRA E DESTRA', pts: [0, 0], done: -1 };
  const FOOD = {
    pasta: { v: [1, 1], c: '#ffd76b', say: 'PASTA!' }, broc: { v: [1, 1], c: '#2e9b4a', say: 'BROCCOLI!' },
    // 'stew' is the opponent's favourite and 'curry' the hero's; the names are kept from Fionn vs Sean
    stew: { v: [3, 0], c: '#7a4a22', say: CHAR[0].food + '! +3' }, curry: { v: [0, 3], c: '#ff8a1e', say: CFG.food + '! +3' },
    sprout: { v: [-2, -2], c: '#6fae3a', say: 'CHE SCHIFO! -2' }
  };
  const FLOOR = 250, SPEED = 2.6;
  // Sean's plate is a touch wider
  const REACH = [17, 19];
  const NULINES = ['IL PRANZO E PRONTO!', 'MANGIATE LE VERDURE!', 'MANI LAVATE?', 'NIENTE SMORFIE!', 'CE N\'E ANCORA!', 'STATE DRITTI TUTTI E DUE!'];
  const cook = helper();
  let p, food, nu = { line: 'IL PRANZO E PRONTO!', T: 150 }, t = 0, next = 30, pause = 40;
  s.init = () => { p = [{ x: 160, w: 0, flip: false, yum: 0 }, { x: 320, w: 0, flip: true, yum: 0 }]; food = []; };
  s.sub = () => s.pts[0] + ' - ' + s.pts[1];
  s.ai = i => {
    const me = p[i]; let best = null, score = -1e9;
    for (const f of food) {
      const val = FOOD[f.type].v[i], dt = (FLOOR - 30 - f.y) / f.vy, need = Math.abs(f.x - me.x) / SPEED;
      if (val > 0 && need < dt + 4 && val * 40 - dt > score) { score = val * 40 - dt; best = f; }
    }
    let tx = best ? best.x : 240;
    for (const f of food) if (f.type === 'sprout' && f.y > FLOOR - 90 && Math.abs(f.x - me.x) < 24) tx = me.x + (me.x < f.x ? -40 : 40);
    return { l: me.x > tx + 3, r: me.x < tx - 3 };
  };
  s.update = () => {
    t++;
    if (nu.T > 0) nu.T--; else if (t % 330 === 0) { nu.line = pick(NULINES); nu.T = 130; }
    if (pause > 0) { pause--; return; }
    if (--next <= 0) {
      const r = R(), type = r < .28 ? 'pasta' : r < .5 ? 'broc' : r < .64 ? 'stew' : r < .78 ? 'curry' : 'sprout';
      food.push({ x: rnd(30, 450), y: AY + 4, vy: rnd(1.3, 2) + Math.min(1.4, t / 1800), type, spin: rnd(-.1, .1) });
      next = rint(22, 40) - Math.min(12, Math.floor(t / 300));
    }
    for (let i = 0; i < 2; i++) {
      const me = p[i], I = inp(i), mx = (I.r ? 1 : 0) - (I.l ? 1 : 0);
      if (mx) { me.x = clamp(me.x + mx * SPEED, 16, 464); me.w++; me.flip = mx < 0; }
      if (me.yum > 0) me.yum--;
    }
    // brothers bump off each other
    const gap = p[1].x - p[0].x; if (Math.abs(gap) < 22) { const k = (22 - Math.abs(gap)) / 2 * Math.sign(gap || 1); p[0].x -= k; p[1].x += k; }
    for (const f of food) {
      f.y += f.vy;
      if (f.y > FLOOR - 36 && f.y < FLOOR - 24) {
        // closest plate gets it; a dead heat goes to Sean
        const d = p.map((me, i) => Math.abs(f.x - me.x) <= REACH[i] ? Math.abs(f.x - me.x) : 1e9);
        const i = d[1] <= d[0] ? 1 : 0;
        if (d[i] < 1e9) {
          const v = FOOD[f.type].v[i]; f.gone = true;
          if (v === 0) { floatText('NON E TUO!', p[i].x, FLOOR - 60, '#fff'); sfx.blip(); continue; }
          s.pts[i] = Math.max(0, s.pts[i] + v); floatText(FOOD[f.type].say, p[i].x, FLOOR - 60, v > 0 ? PL[i].col : '#fff');
          if (v > 0) { sfx.power(); p[i].yum = 20; burst(f.x, f.y, 10, [FOOD[f.type].c, '#fff'], 2); if (v >= 3) { cheer(i, W / 2, 60, s.pts, ['GNAM!', 'LA CENA E SERVITA!', 'PIATTO PULITO!']); nu.line = 'BRAVO, ' + PL[i].name + '!'; nu.T = 100; } }
          else { sfx.buzz(); shake = 3; nu.line = 'TI FANNO BENE, ' + PL[i].name + '!'; nu.T = 110; }
          if (s.pts[i] >= 15) { s.pts[i] = 15; s.done = i; }
        }
      }
      if (f.y > FLOOR + 6) { f.gone = true; if (f.type !== 'sprout') burst(f.x, FLOOR, 6, [FOOD[f.type].c], 1.5); }
    }
    food = food.filter(f => !f.gone);
  };
  function dish(f) {
    const x = Math.round(f.x), y = Math.round(f.y), c = FOOD[f.type].c;
    if (f.type === 'sprout') { g.fillStyle = c; g.beginPath(); g.arc(x, y, 6, 0, Math.PI * 2); g.fill(); rect(x - 4, y - 1, 8, 1, '#3f7a1f'); rect(x - 1, y - 5, 1, 9, '#3f7a1f'); return; }
    if (f.type === 'broc') { rect(x - 6, y - 8, 12, 8, c); rect(x - 4, y - 10, 4, 3, '#3dbb5c'); rect(x + 1, y - 10, 4, 3, '#3dbb5c'); rect(x - 2, y, 4, 6, '#8fd67e'); return; }
    rect(x - 9, y - 1, 18, 5, '#f2f2f7'); rect(x - 7, y + 4, 14, 2, '#c9c9d6'); rect(x - 8, y - 5, 16, 5, c);
    if (f.type === 'pasta') { rect(x - 6, y - 6, 3, 1, '#fff2c2'); rect(x + 1, y - 6, 4, 1, '#fff2c2'); }
    else { rect(x - 4, y - 4, 2, 2, f.type === 'stew' ? '#ff9a3d' : '#ffe08a'); rect(x + 2, y - 3, 2, 2, f.type === 'stew' ? '#d8c08a' : '#3dbb5c'); rect(x - 3, y - 17, 7, 9, '#0a0416'); glyph(f.type === 'stew' ? CHAR[0].letter : CHAR[1].letter, x - 1, y - 15, 1, f.type === 'stew' ? PL[0].col : PL[1].col); }
  }
  s.draw = () => {
    // kitchen: tiles, the counter and the window
    rect(0, AY, W, H - AY, '#f0e6d2');
    for (let y = AY; y < FLOOR - 40; y += 16) for (let x = (y / 16) % 2 ? 0 : 8; x < W; x += 16) rect(x, y, 15, 15, '#e6d8bd');
    rect(180, 40, 120, 60, '#9fd3ff'); rect(180, 40, 120, 60, 'rgba(255,255,255,.2)'); rect(238, 40, 4, 60, '#fff'); rect(180, 68, 120, 4, '#fff');
    rect(0, FLOOR - 40, W, 8, '#8a5a2b'); rect(0, FLOOR - 32, W, H - FLOOR + 32, '#c7b08a'); for (let x = 0; x < W; x += 40) rect(x, FLOOR - 32, 1, H, '#b09a74');
    if (cook) { person(cook, 240, 142, 2, false, 0); if (nu.T > 0) bubble(nu.line, 336, 70, 16); }
    for (const f of food) dish(f);
    for (let i = 0; i < 2; i++) {
      const me = p[i], hop = me.yum ? -3 : 0;
      boy(i, me.x, FLOOR + 14 + hop, 2, me.flip, Math.floor(me.w / 6));
      rect(me.x - REACH[i], FLOOR - 34 + hop, REACH[i] * 2, 3, '#ffffff'); rect(me.x - REACH[i] + 2, FLOOR - 31 + hop, REACH[i] * 2 - 4, 2, '#c9c9d6');
    }
    for (let i = 0; i < 2; i++) { const x = i === 0 ? 8 : W - 8 - 150; rect(x, AY + 4, 150, 6, 'rgba(0,0,0,.2)'); rect(i === 0 ? x : x + 150 - s.pts[i] * 10, AY + 4, s.pts[i] * 10, 6, PL[i].col); }
    if (pause > 0) txt('LA CENA E PRONTA!', W / 2, 130, 8, '#0a0416', 'center');
  };
  return s;
}
addGame('LA CORSA DELLA CENA', gDinner);
