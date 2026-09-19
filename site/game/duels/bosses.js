'use strict';
// ===================== BOSSES (co-op): 0 = HOMEWORK MONSTER, 1 = THE BEDTIME CLOCK =====================
let darkCv = null;
function darkness(a, pts) {
  if (!darkCv) { darkCv = document.createElement('canvas'); darkCv.width = W; darkCv.height = H; }
  const d = darkCv.getContext('2d');
  d.globalCompositeOperation = 'source-over'; d.clearRect(0, 0, W, H); d.fillStyle = 'rgba(2,2,14,' + a + ')'; d.fillRect(0, AY, W, H - AY);
  d.globalCompositeOperation = 'destination-out';
  for (const q of pts) { const gr = d.createRadialGradient(q.x, q.y - 16, 24, q.x, q.y - 16, 74); gr.addColorStop(0, 'rgba(0,0,0,1)'); gr.addColorStop(1, 'rgba(0,0,0,0)'); d.fillStyle = gr; d.beginPath(); d.arc(q.x, q.y - 16, 74, 0, Math.PI * 2); d.fill(); }
  g.drawImage(darkCv, 0, 0);
}
function gBoss(kind) {
  const BED = kind === 1;
  const s = { name: BED ? 'THE BEDTIME CLOCK' : 'HOMEWORK MONSTER', boss: true, pts: [0, 0], done: -1, time: 0 };
  const MAXHP = BED ? 200 : 150;
  const WORDS = BED ? ['ZZZ', 'YAWN', '9PM', 'BED!', 'PJS', 'TEETH', 'SLEEP'] : ['7x8', '9x6', '12x12', '6x7', '8x8', 'SUMS', 'TESTS', 'ESSAY', 'GAEILGE', 'TABLES'];
  let hp = MAXHP, t = 0, bx = 240, by = 74, hearts = 6, meter = 0, shots = [], foes = [], foods = [], blast = 0, lastP = [-99, -99], flash = 0;
  let dog = null, nextDog = 420, dead = 0, atk = 80, pen = 200, nextFood = 300, dark = 0, nextDark = 480;
  const p = [{ x: 190, y: 240, cd: 0, inv: 0, w: 0, rapid: 0, power: 0 }, { x: 290, y: 240, cd: 0, inv: 0, w: 0, rapid: 0, power: 0 }];
  s.init = () => { };
  s.ai = i => {
    const me = p[i], o = { a: true }; let tx = bx + (i === 0 ? -16 : 16), danger = null;
    for (const f of foes) if (f.y < me.y && me.y - f.y < 90 && Math.abs(f.x + f.vx * 12 - me.x) < f.w / 2 + 18 && (!danger || f.y > danger.y)) danger = f;
    if (danger) { tx = me.x + (me.x < danger.x ? -50 : 50); if (tx < 20) tx = me.x + 70; if (tx > 460) tx = me.x - 70; }
    else {
      const fd = foods.find(f => f.y > 150 && !(f.type === 'stew' && i === 1) && !(f.type === 'curry' && i === 0));
      if (fd) { tx = fd.x; o.d = true; } else if (dog && hearts < 6) { tx = dog.x; o.d = true; }
    }
    o.l = me.x > tx + 4; o.r = me.x < tx - 4;
    const since = t - lastP[1 - i];
    if (meter >= 100 && since > 6 && since < 24) o.aP = true;
    return o;
  };
  function eat(i, f) {
    const me = p[i]; sfx.power(); burst(f.x, f.y, 14, ['#fff', PL[i].col], 3);
    if (f.type === 'pasta') { me.rapid = 420; floatText('PASTA POWER! RAPID FIRE', me.x, me.y - 50, COL.gold); }
    else if (f.type === 'broc') { hearts = Math.min(6, hearts + 1); floatText('BROCCOLI! +1 HEART', me.x, me.y - 50, COL.green); }
    else if (f.type === 'stew') { me.power = 480; floatText('STEW POWER! TRIPLE SHOT', me.x, me.y - 50, COL.gold); }
    else { me.power = 480; floatText('CURRY POWER! FIRE SHOTS', me.x, me.y - 50, '#ff8a1e'); }
  }
  s.update = () => {
    t++; s.time = t;
    if (dead > 0) {
      dead++; if (dead % 4 === 0 && dead < 100) { burst(bx + rnd(-30, 30), by + rnd(-25, 25), 8, BED ? ['#ffe9a0', '#fff', '#2b3a8a'] : ['#f5f0d8', '#fff', '#9ec5ff'], 4); if (dead % 16 === 0) sfx.boom(); shake = 5; }
      if (dead > 140) s.done = 1; return;
    }
    const ph2 = hp < MAXHP * .5, ph3 = hp < MAXHP * .22; mus.fast = ph2;
    bx = 240 + Math.sin(t / (ph2 ? 60 : 90)) * 160; by = 78 + Math.sin(t / 37) * 12; if (flash > 0) flash--;
    for (let i = 0; i < 2; i++) {
      const I = inp(i), me = p[i], mx = (I.r ? 1 : 0) - (I.l ? 1 : 0), my = (I.d ? 1 : 0) - (I.u ? 1 : 0);
      me.x = clamp(me.x + mx * 2.4, 14, 466); me.y = clamp(me.y + my * 2, 180, 252); if (mx || my) me.w++;
      if (me.cd > 0) me.cd--; if (me.inv > 0) me.inv--; if (me.rapid > 0) me.rapid--; if (me.power > 0) me.power--;
      if (I.a && me.cd <= 0 && blast <= 0) {
        if (i === 0 && me.power > 0) for (const vx of [-1.3, 0, 1.3]) shots.push({ x: me.x, y: me.y - 34, vx, who: 0, dmg: 1 });
        else shots.push({ x: me.x, y: me.y - 34, vx: 0, who: i, dmg: (i === 1 && me.power > 0) ? 2 : 1, fire: i === 1 && me.power > 0 });
        me.cd = me.rapid > 0 ? 5 : 11; sfx.shoot();
      }
      if (I.aP) lastP[i] = t;
    }
    if (meter >= 100 && blast <= 0 && t - lastP[0] <= 30 && t - lastP[1] <= 30) { blast = 70; meter = 0; lastP = [-99, -99]; foes.length = 0; sfx.blast(); say('Family blast!'); shake = 12; }
    if (blast > 0) { blast--; if (blast % 3 === 0) { hp -= 1.1; flash = 3; burst(bx, by, 4, [COL.gold, COL.red, '#fff'], 5); } }
    for (const b of shots) { b.y -= 5; b.x += b.vx; if (Math.abs(b.x - bx) < 36 && Math.abs(b.y - by) < 30) { b.y = -99; hp -= b.dmg; meter = Math.min(100, meter + 2.5); flash = 3; sfx.hit(); burst(b.x, by + 26, 3, ['#fff', PL[b.who].col], 2); } }
    shots = shots.filter(b => b.y > AY);
    if (blast <= 0) {
      if (--atk <= 0) { const label = pick(WORDS); foes.push({ x: clamp(bx + rnd(-30, 30), 40, 440), y: by + 32, vx: 0, vy: rnd(1.1, 1.7) * (ph3 ? 1.35 : 1), label, w: label.length * 8 + 6, h: 12 }); atk = ph3 ? 40 : ph2 ? 52 : 78; }
      if (ph2 && --pen <= 0) { const tg = p[rint(0, 1)], dx = tg.x - bx, dy = tg.y - 20 - by, d = Math.hypot(dx, dy) || 1; foes.push({ x: bx, y: by + 20, vx: dx / d * 2.5, vy: dy / d * 2.5, aimed: true, w: 10, h: 14 }); pen = ph3 ? 100 : 150; sfx.throwIt(); }
    }
    for (const f of foes) {
      f.x += f.vx; f.y += f.vy;
      for (let i = 0; i < 2; i++) { const me = p[i]; if (me.inv <= 0 && Math.abs(f.x - me.x) < f.w * .4 + 5 && f.y + f.h / 2 > me.y - 28 && f.y - f.h / 2 < me.y) { if (i !== cpu) hearts--; me.inv = 90; shake = 8; sfx.hurt(); f.y = 999; floatText(BED ? 'SLEEPY...' : 'OUCH!', me.x, me.y - 46, '#fff'); if (hearts <= 0) { s.done = 0; return; } } }
    }
    foes = foes.filter(f => f.y < H + 20 && f.x > -20 && f.x < W + 20);
    // food power-ups: pasta + broccoli for anyone, stew for Fionn, curry for Sean
    if (--nextFood <= 0) { foods.push({ x: rnd(40, 440), y: AY + 8, type: pick(['pasta', 'broc', 'stew', 'curry']), rest: 300 }); nextFood = rint(380, 520); }
    for (const f of foods) {
      if (f.y < 246) f.y += .9; else f.rest--;
      for (let i = 0; i < 2; i++) { const me = p[i]; if (f.rest > 0 && Math.abs(f.x - me.x) < 15 && f.y > me.y - 36 && f.y < me.y + 8 && !(f.type === 'stew' && i === 1) && !(f.type === 'curry' && i === 0)) { eat(i, f); f.rest = 0; } }
    }
    foods = foods.filter(f => f.rest > 0);
    if (BED) { if (dark > 0) dark--; else if (--nextDark <= 0) { dark = 260; nextDark = rint(460, 640); sfx.buzz(); floatText('LIGHTS OUT!', W / 2, 120, '#fff', 16); } }
    if (PET && !dog && hearts < 6 && --nextDog <= 0) { dog = { x: -20 }; sfx.woof(); }
    if (dog) {
      dog.x += 1.5;
      for (let i = 0; i < 2 && dog; i++) if (Math.abs(p[i].x - dog.x) < 16 && p[i].y > 228) { hearts++; sfx.power(); floatText(PET.name + '! +1 HEART', dog.x, 214, COL.green); dog = null; nextDog = 480; }
      if (dog && dog.x > W + 20) { dog = null; nextDog = 360; }
    }
    if (hp <= 0) { dead = 1; foes.length = 0; shots.length = 0; dark = 0; mus.mode = 'off'; say(BED ? 'Bedtime cancelled!' : 'Homework destroyed!'); }
  };
  function drawFood(f) {
    const x = Math.round(f.x), y = Math.round(f.y); if (f.rest < 80 && t % 10 < 4) return;
    g.shadowColor = '#fff'; g.shadowBlur = 6;
    if (f.type === 'broc') { rect(x - 6, y - 8, 12, 8, '#2e9b4a'); g.shadowBlur = 0; rect(x - 4, y - 10, 4, 3, '#3dbb5c'); rect(x + 1, y - 10, 4, 3, '#3dbb5c'); rect(x - 2, y, 4, 6, '#8fd67e'); }
    else { rect(x - 8, y - 2, 16, 5, '#f2f2f7'); g.shadowBlur = 0; rect(x - 6, y + 3, 12, 3, '#c9c9d6'); rect(x - 7, y - 5, 14, 4, f.type === 'pasta' ? '#ffd76b' : f.type === 'stew' ? '#7a4a22' : '#ff8a1e'); if (f.type === 'pasta') { rect(x - 5, y - 6, 3, 1, '#fff2c2'); rect(x + 1, y - 6, 4, 1, '#fff2c2'); } else { rect(x - 4, y - 5, 2, 2, f.type === 'stew' ? '#ff9a3d' : '#ffe08a'); rect(x + 2, y - 4, 2, 2, f.type === 'stew' ? '#d8c08a' : '#3dbb5c'); } }
    if (f.type === 'stew' || f.type === 'curry') { rect(x - 3, y - 16, 7, 9, '#0a0416'); glyph(f.type === 'stew' ? CHAR[0].letter : CHAR[1].letter, x - 1, y - 14, 1, f.type === 'stew' ? PL[0].col : PL[1].col); }
  }
  function drawBoss() {
    const ph2 = hp < MAXHP * .5, x = Math.round(bx), y = Math.round(by), look = Math.sign(Math.sin(t / 40)) * 2;
    if (!BED) {
      const body = flash ? '#ffffff' : ph2 ? '#ffd0c8' : '#f5f0d8';
      for (const sd of [-1, 1]) { const ax = x + sd * 46, ay = y + Math.sin(t / 10 + sd) * 8; rect(ax - 3, ay - 22, 6, 40, '#ffc400'); rect(ax - 3, ay - 28, 6, 6, '#ff8fb0'); rect(ax - 3, ay + 18, 6, 4, '#e8c9a0'); rect(ax - 1, ay + 22, 2, 4, '#222'); }
      rect(x - 38, y - 24, 72, 56, '#c9c2a0'); rect(x - 36, y - 28, 72, 56, '#e2dcc0'); rect(x - 34, y - 32, 72, 60, body);
      if (!flash) { for (let k = 0; k < 6; k++) rect(x - 34, y - 8 + k * 6, 72, 1, '#9ec5ff'); rect(x - 24, y - 32, 1, 60, '#ff7b8a'); }
      txt('HOMEWORK', x + 2, y - 29, 8, '#0a0416', 'center');
      rect(x - 22, y - 14, 14, 10, '#fff'); rect(x + 12, y - 14, 14, 10, '#fff'); rect(x - 17 + look, y - 11, 5, 6, '#d8202a'); rect(x + 17 + look, y - 11, 5, 6, '#d8202a');
      g.fillStyle = '#0a0416'; g.beginPath(); g.moveTo(x - 26, y - 20); g.lineTo(x - 6, y - 13); g.lineTo(x - 6, y - 16); g.closePath(); g.fill(); g.beginPath(); g.moveTo(x + 30, y - 20); g.lineTo(x + 10, y - 13); g.lineTo(x + 10, y - 16); g.closePath(); g.fill();
      rect(x - 18, y + 8, 40, 12, '#0a0416'); for (let k = 0; k < 5; k++) { rect(x - 16 + k * 8, y + 8, 4, 4, '#fff'); rect(x - 12 + k * 8, y + 16, 4, 4, '#fff'); }
    } else {
      const ring = ph2 ? '#7a1f4a' : '#2b3a8a', face = flash ? '#ffffff' : '#ffe9a0';
      rect(x - 26, y + 28, 8, 10, ring); rect(x + 18, y + 28, 8, 10, ring);
      for (const sd of [-1, 1]) { g.fillStyle = '#c0c8ff'; g.beginPath(); g.arc(x + sd * 24, y - 30, 10, 0, Math.PI * 2); g.fill(); }
      g.fillStyle = ring; g.beginPath(); g.arc(x, y, 36, 0, Math.PI * 2); g.fill(); g.fillStyle = face; g.beginPath(); g.arc(x, y, 30, 0, Math.PI * 2); g.fill();
      for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; rect(x + Math.cos(a) * 26 - 1, y + Math.sin(a) * 26 - 1, 2, 2, '#0a0416'); }
      rect(x - 18, y - 1, 18, 3, '#0a0416'); rect(x - 1, y - 24, 3, 25, '#0a0416');
      rect(x - 20, y - 14, 14, 8, '#fff'); rect(x + 8, y - 14, 14, 8, '#fff'); rect(x - 20, y - 14, 14, 3, ring); rect(x + 8, y - 14, 14, 3, ring); rect(x - 15 + look, y - 11, 5, 5, '#d8202a'); rect(x + 13 + look, y - 11, 5, 5, '#d8202a');
      const yawn = 4 + Math.abs(Math.sin(t / 20)) * 5; g.fillStyle = '#0a0416'; g.beginPath(); g.ellipse(x + 1, y + 14, 7, yawn, 0, 0, Math.PI * 2); g.fill();
      g.fillStyle = '#7a3cff'; g.beginPath(); g.moveTo(x - 22, y - 28); g.lineTo(x + 22, y - 28); g.lineTo(x + 34, y - 52 + Math.sin(t / 12) * 3); g.closePath(); g.fill(); rect(x - 24, y - 31, 48, 5, '#ffffff');
      g.fillStyle = '#fff'; g.beginPath(); g.arc(x + 35, y - 51 + Math.sin(t / 12) * 3, 5, 0, Math.PI * 2); g.fill();
    }
  }
  s.draw = () => {
    rect(0, 0, W, H, BED ? '#060a24' : '#0a0420'); stars(t, 200);
    if (BED) { g.fillStyle = '#ffe9a0'; g.beginPath(); g.arc(420, 70, 16, 0, Math.PI * 2); g.fill(); g.fillStyle = '#060a24'; g.beginPath(); g.arc(413, 65, 14, 0, Math.PI * 2); g.fill(); rect(0, 256, W, 14, '#27408b'); for (let x = 0; x < W; x += 16) rect(x, 256, 8, 14, '#3553a8'); rect(0, 256, W, 1, '#fff'); }
    else { rect(0, 256, W, 14, '#1a0b3a'); rect(0, 256, W, 1, COL.hot); for (let x = (-(t % 24)); x < W; x += 24) rect(x, 257, 1, 13, '#3a1a6a'); }
    if (dead < 100) drawBoss();
    for (const f of foes) {
      if (f.aimed) { g.save(); g.translate(f.x, f.y); if (BED) { g.rotate(t / 8); rect(-8, -6, 16, 12, '#ffffff'); rect(-8, 3, 16, 3, '#cfd6ff'); rect(-6, -4, 3, 3, '#cfd6ff'); } else { g.rotate(Math.atan2(f.vy, f.vx) - Math.PI / 2); rect(-2, -8, 4, 12, '#ffc400'); rect(-2, -11, 4, 3, '#ff8fb0'); rect(-1, 4, 2, 4, '#222'); } g.restore(); }
      else if (BED) { rect(f.x - f.w / 2, f.y - 6, f.w, 12, '#1d2a6e'); txt(f.label, f.x, f.y - 4, 8, '#c0c8ff', 'center'); }
      else { rect(f.x - f.w / 2, f.y - 6, f.w, 12, '#f5f0d8'); rect(f.x - f.w / 2, f.y + 5, f.w, 1, '#9ec5ff'); txt(f.label, f.x, f.y - 4, 8, '#c8102e', 'center'); }
    }
    foods.forEach(drawFood);
    for (const b of shots) {
      if (b.fire) { rect(b.x - 3, b.y - 5, 7, 10, '#ff8a1e'); rect(b.x - 1, b.y - 7, 3, 12, '#ffd23f'); }
      else if (b.who === 0) { rect(b.x - 2, b.y - 2, 5, 5, '#fff'); rect(b.x - 2, b.y, 5, 1, '#d9424f'); }
      else { rect(b.x - 2, b.y - 4, 5, 8, '#8a4b20'); rect(b.x - 1, b.y - 5, 3, 10, '#8a4b20'); rect(b.x, b.y - 2, 1, 4, '#fff'); }
    }
    if (blast > 0) {
      const cols = [COL.gold, COL.red, '#fff', COL.cyan];
      for (let i = 0; i < 2; i++) { const me = p[i]; g.strokeStyle = cols[(t + i) % 4]; g.lineWidth = 8 + (t % 3) * 2; g.shadowColor = '#fff'; g.shadowBlur = 14; g.beginPath(); g.moveTo(me.x, me.y - 36); g.lineTo(bx, by + 10); g.stroke(); g.strokeStyle = '#fff'; g.lineWidth = 3; g.stroke(); g.shadowBlur = 0; }
      txt('FAMILY BLAST!', W / 2, 130, 24, cols[t % 4], 'center', true);
    }
    if (dog) { ted(dog.x, 262, 2, true, Math.floor(t / 5)); heart(dog.x - 4, 232 + Math.sin(t / 6) * 2, COL.red); }
    for (let i = 0; i < 2; i++) { const me = p[i]; if (me.inv > 0 && t % 6 < 3) continue; shadow(me.x, me.y, 9); if (me.power > 0 || me.rapid > 0) { g.fillStyle = me.power > 0 ? (i === 1 ? 'rgba(255,138,30,.4)' : 'rgba(255,210,63,.4)') : 'rgba(255,255,255,.3)'; g.beginPath(); g.ellipse(me.x, me.y - 16, 15 + (t % 8 < 4 ? 2 : 0), 24, 0, 0, Math.PI * 2); g.fill(); } boy(i, me.x, me.y + 2, 2, false, Math.floor(me.w / 6)); }
    if (dark > 0 && dead === 0) {
      darkness(Math.min(1, dark / 30, (260 - dark) / 30) * .94, p); g.shadowColor = '#ff2e4d'; g.shadowBlur = 8; rect(bx - 15, by - 11, 5, 5, '#ff2e4d'); rect(bx + 13, by - 11, 5, 5, '#ff2e4d'); g.shadowBlur = 0;
    }
    // HUD
    rect(0, 0, W, AY - 2, '#0a0416'); rect(0, AY - 2, W, 2, COL.hot);
    for (let k = 0; k < 6; k++) heart(6 + k * 10, 4, k < hearts ? COL.red : '#3a2a5e');
    txt('TEAM', 6, 15, 8, COL.dim);
    rect(140, 5, 200, 8, '#2a1a4a'); rect(140, 5, 200 * clamp(hp / MAXHP, 0, 1), 8, hp < MAXHP * .5 ? COL.red : COL.green); txt(s.name, W / 2, 16, 8, '#fff', 'center');
    rect(W - 86, 5, 80, 8, '#2a1a4a'); rect(W - 86, 5, .8 * meter, 8, meter >= 100 ? (t % 10 < 5 ? '#fff' : COL.gold) : COL.cyan); txt('BLAST', W - 6, 16, 8, COL.cyan, 'right');
    if (meter >= 100 && blast <= 0 && dead === 0) { rect(0, 150, W, 16, 'rgba(10,4,22,.7)'); txt(cpu >= 0 ? 'BLAST READY! TAP FIRE!' : 'BLAST READY! BOTH TAP FIRE TOGETHER!', W / 2, 154, 8, t % 20 < 12 ? COL.gold : '#fff', 'center'); }
  };
  return s;
}
