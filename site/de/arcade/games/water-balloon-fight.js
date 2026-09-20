'use strict';
// ---------- 13. WATER BALLOON FIGHT: garden shootout with Ted running through the middle
function gBalloons() {
  const s = { name: 'WASSERBOMBEN-SCHLACHT', how: ['NASS MACHEN: ' + PL[0].name + ' BEVOR DU NASS WIRST.', 'BEWEG DICH IN DEINER GARTENHAELFTE. FEUER WIRFT.', helper() ? 'WENN ' + helper().name + ' AUS DER TUER SCHAUT, NICHT WERFEN!' : PET ? PET.name + ' ZERPLATZT JEDE BOMBE, DIE TRIFFT.' : 'AUSWEICHEN UND WERFEN!', 'WER ZUERST 5 TREFFER HAT.'], ctl: 'BEWEGEN: ALLE RICHTUNGEN   WERFEN: FEUER', pts: [0, 0], done: -1 };
  const Y0 = 58, Y1 = 258, ZONE = [[24, 190], [290, 456]], COLS = ['#22e6ff', '#ff2bd6', '#3dff8b', '#ffd23f'];
  const NULINES = ['ESSEN IN FUENF MINUTEN!', 'WER MACHT HIER WEN NASS?', 'ACHTUNG, DIE FENSTER!', 'ICH SEHE EUCH ZWEI!'];
  let p, balls, drops, dog, nu, t = 0, pause = 0;
  s.init = () => {
    p = [{ x: 70, y: 160, cd: 0, wet: 0, w: 0 }, { x: 410, y: 160, cd: 0, wet: 0, w: 0 }];
    balls = []; drops = []; dog = { y: 100, vy: 1.1, bark: 0 }; nu = { ph: 'away', T: rint(300, 480), line: '', who: helper() }; pause = 40;
  };
  s.sub = () => s.pts[0] + ' - ' + s.pts[1];
  s.ai = i => {
    const me = p[i], you = p[1 - i], o = {};
    let ty = you.y + Math.sin(t / 40 + i) * 18, tx = i === 0 ? 90 + Math.sin(t / 70) * 50 : 390 + Math.sin(t / 70) * 50;
    for (const b of balls) if (b.who !== i && Math.abs(b.x - me.x) < 120 && Math.abs(b.y - me.y) < 22) ty = me.y + (me.y < b.y ? -40 : 40);
    o.u = me.y > ty + 4; o.d = me.y < ty - 4; o.l = me.x > tx + 4; o.r = me.x < tx - 4;
    if (me.cd <= 0 && Math.abs(you.y - me.y) < 14 && R() < .12 && (nu.ph === 'away' || R() < .04)) o.aP = true;
    return o;
  };
  function splash(x, y, n, c) { for (let k = 0; k < n; k++) drops.push({ x, y, vx: rnd(-2, 2), vy: rnd(-2.5, .5), life: rint(20, 40), c }); }
  s.update = () => {
    t++;
    for (const d of drops) { d.x += d.vx; d.y += d.vy; d.vy += .15; d.life--; }
    drops = drops.filter(d => d.life > 0);
    if (pause > 0) { pause--; return; }
    // A grown-up checks on them from the back door. Throwing while they're looking costs a point.
    if (nu.who && --nu.T <= 0) {
      if (nu.ph === 'away') { nu.ph = 'door'; nu.T = 45; nu.line = 'ALSO...'; sfx.blip(); }
      else if (nu.ph === 'door') { nu.ph = 'look'; nu.T = 110; nu.line = pick(NULINES); }
      else { nu.ph = 'away'; nu.T = rint(360, 600); }
    }
    // Ted patrols the middle, chasing anything that flies past
    const near = balls.find(b => Math.abs(b.x - 240) < 60);
    dog.y += near ? Math.sign(near.y - dog.y) * 1.6 : dog.vy;
    if (dog.y < Y0 + 20 || dog.y > Y1 - 4) dog.vy = -dog.vy;
    dog.y = clamp(dog.y, Y0 + 20, Y1 - 4); if (dog.bark > 0) dog.bark--;
    for (let i = 0; i < 2; i++) {
      const me = p[i], I = inp(i), mx = (I.r ? 1 : 0) - (I.l ? 1 : 0), my = (I.d ? 1 : 0) - (I.u ? 1 : 0);
      if (me.cd > 0) me.cd--; if (me.wet > 0) me.wet--;
      if (mx || my) { const n = Math.hypot(mx, my); me.x += mx / n * 1.8; me.y += my / n * 1.8; me.w++; }
      me.x = clamp(me.x, ZONE[i][0], ZONE[i][1]); me.y = clamp(me.y, Y0 + 30, Y1);
      if (I.aP && me.cd <= 0 && nu.ph === 'look') { s.pts[i] = Math.max(0, s.pts[i] - 1); me.cd = 40; nu.line = 'ICH HAB DAS GESEHEN, ' + PL[i].name + '!'; nu.T = Math.max(nu.T, 50); sfx.buzz(); shake = 4; floatText('-1', me.x, me.y - 44, '#fff', 16); continue; }
      if (I.aP && me.cd <= 0) { balls.push({ x: me.x + (i === 0 ? 14 : -14), y: me.y - 22, vx: i === 0 ? 4.2 : -4.2, who: i, c: pick(COLS), k: 0 }); me.cd = 28; sfx.throwIt(); }
    }
    for (const b of balls) {
      b.x += b.vx; b.k++;
      if (petRuns() && Math.abs(b.x - 240) < 12 && Math.abs(b.y - (dog.y - 10)) < 12) { b.gone = true; splash(b.x, b.y, 14, b.c); sfx.woof(); dog.bark = 30; floatText(pick([PET.name + ' HAELT SIE!', 'GUT GEHALTEN, ' + PET.name + '!', 'WUFF!']), 240, dog.y - 34, '#fff'); continue; }
      const you = p[1 - b.who];
      // the hit box is the sprite, so the shorter brother is a smaller target
      const tall = specH(CHAR[1 - b.who], 2) - 4;
      if (you.wet <= 0 && Math.abs(b.x - you.x) < 12 && b.y > you.y - tall && b.y < you.y + 2) {
        b.gone = true; you.wet = 60; splash(b.x, b.y, 26, b.c); shake = 5; sfx.hurt();
        s.pts[b.who]++; floatText('PLATSCH!', you.x, you.y - 48, '#fff', 16); cheer(b.who, W / 2, 76, s.pts, ['VOLLTREFFER!', 'NASS!', 'KLATSCHNASS!']);
        if (s.pts[b.who] >= 5) s.done = b.who;
      }
      if (b.x < -10 || b.x > W + 10) b.gone = true;
    }
    balls = balls.filter(b => !b.gone);
  };
  s.draw = () => {
    rect(0, AY, W, H - AY, '#1e7a34');
    for (let k = 0; k < 10; k++) rect(0, Y0 - 4 + k * 22, W, 11, '#23883b');
    // back fence and the washing line
    rect(0, AY, W, 26, '#8a5a2b'); for (let x = 0; x < W; x += 16) rect(x, AY, 2, 26, '#6b4220');
    g.strokeStyle = '#ddd'; g.lineWidth = 1; g.beginPath(); g.moveTo(20, 40); g.quadraticCurveTo(240, 52, 460, 40); g.stroke();
    [['#e0102a', 90], ['#fff', 130], ['#ffd23f', 330], ['#22e6ff', 380]].forEach(([c, x]) => rect(x, 43 + Math.sin(x) * 2, 18, 14, c));
    rect(236, Y0, 8, Y1 - Y0, 'rgba(255,255,255,.12)');
    // the back door. A spare grown-up looks out of it, if there is one: with only one other person
    // in the game they are the opponent, and they cannot be in two places at once.
    const shut = !nu.who || nu.ph === 'away';
    rect(224, AY, 32, 26, '#3b2412'); rect(227, AY + 2, 26, 24, shut ? '#6b4220' : '#1a0f08');
    if (shut) rect(248, AY + 13, 2, 2, '#ffd23f');
    else { person(nu.who, 240, 76, 2, false, 0); bubble(nu.line, 336, 30, 18); }
    if (nu.who && nu.ph === 'look') txt(nu.who.name + ' SCHAUT. NICHT WERFEN!', W / 2, 244, 8, COL.green, 'center', '#0a0416');
    const ents = p.map((me, i) => ({ y: me.y, f: () => {
      shadow(me.x, me.y, 8);
      boy(i, me.x, me.y + 2, 2, i === 1, Math.floor(me.w / 6));
      if (me.wet > 0) { for (let k = 0; k < 4; k++) rect(me.x - 8 + k * 5, me.y - 30 + ((t + k * 7) % 20), 2, 3, '#9ec5ff'); }
      if (me.cd <= 0) { g.fillStyle = COLS[i + 1]; g.beginPath(); g.arc(me.x + (i === 0 ? 12 : -12), me.y - 20, 4, 0, Math.PI * 2); g.fill(); }
    } }));
    // a dog, cat, rabbit or hamster patrols the middle and swats balloons. A fish stays out of it.
    if (petRuns()) ents.push({ y: dog.y, f: () => { shadow(240, dog.y, 9); pet(240, dog.y + 2, 2, dog.vy > 0, Math.floor(t / 5)); if (dog.bark && t % 12 < 8) txt('!', 250, dog.y - 34, 8, '#fff'); } });
    ents.sort((a, b) => a.y - b.y).forEach(e => e.f());
    for (const b of balls) { const y = b.y + Math.sin(b.k / 4) * 1.5; g.fillStyle = b.c; g.beginPath(); g.arc(b.x, y, 4.5, 0, Math.PI * 2); g.fill(); rect(b.x - 1, y - 3, 2, 2, '#fff'); }
    for (const d of drops) rect(d.x, d.y, 2, 2, d.c);
    for (let i = 0; i < 2; i++) for (let k = 0; k < 5; k++) { const x = i === 0 ? 8 + k * 12 : W - 16 - k * 12; g.fillStyle = k < s.pts[i] ? PL[i].col : 'rgba(255,255,255,.2)'; g.beginPath(); g.arc(x + 4, H - 8, 4, 0, Math.PI * 2); g.fill(); }
    if (pause > 0) txt('FERTIG... WURF!', W / 2, 140, 8, '#fff', 'center', COL.hot);
  };
  return s;
}
addGame('WASSERBOMBEN-SCHLACHT', gBalloons);
