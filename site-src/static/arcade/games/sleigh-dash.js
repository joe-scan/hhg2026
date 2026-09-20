'use strict';
// ---------- SLEIGH DASH: the free Christmas game
// Not part of a paid game, so it never calls addGame(). One button, sixty seconds: the hero runs
// the rooftops and jumps. Jump over a chimney and a present drops down it. Miss a roof and it's
// over. Everything is drawn from rect(), so it weighs nothing.

// the winter night behind the game and the screens either side of it
function xmasNight(t) {
  const gr = g.createLinearGradient(0, 0, 0, H);
  gr.addColorStop(0, '#08122e'); gr.addColorStop(.55, '#132a52'); gr.addColorStop(1, '#2b3f6b');
  g.fillStyle = gr; g.fillRect(0, 0, W, H);
  stars(t, 130);
  g.fillStyle = '#fff6d8'; g.beginPath(); g.arc(410, 46, 22, 0, Math.PI * 2); g.fill();
  // a far-off town, two layers, so the near rooftops read as rooftops
  for (let k = 0; k < 16; k++) {
    const bx = k * 34 - (t * .12) % 34, bh = 24 + (k * 37) % 28;
    rect(bx, 128 - bh, 30, bh, '#0f1f42'); rect(bx, 128 - bh, 30, 3, '#cfe0ff');
    for (let w = 0; w < 3; w++) if ((k + w) % 3) rect(bx + 5 + w * 8, 128 - bh + 9, 4, 5, '#ffd88a');
  }
  // a thin, dim line: any brighter and the far town reads as a floor to land on
  rect(0, 128, W, 2, '#6f86b5');
  xmasSnow(t);
}
function xmasSnow(t) {
  for (let k = 0; k < 30; k++) {
    const x = (k * 71 + Math.sin((t + k * 30) / 50) * 11) % W;
    const y = ((k * 53) + t * .7) % (H + 20) - 10;
    rect(x, y, k % 4 ? 2 : 3, k % 4 ? 2 : 3, k % 3 ? '#ffffff' : '#cfe4ff');
  }
}
function xmasTree(cx, by, sc) {
  for (let k = 0; k < 3; k++) { const w = (22 - k * 6) * sc, y = by - 6 * sc - k * 7 * sc;
    g.fillStyle = '#1e7a34'; g.beginPath(); g.moveTo(cx - w / 2, y); g.lineTo(cx + w / 2, y); g.lineTo(cx, y - 9 * sc); g.closePath(); g.fill(); }
  rect(cx - 2 * sc, by - 6 * sc, 4 * sc, 6 * sc, '#6b3f1d');
  rect(cx - sc, by - 34 * sc, 2 * sc, 2 * sc, '#ffd23f');
}

function gSleighDash(seconds) {
  // the text the free page puts around the game, here rather than in the page, so it is
  // translated with the rest of the game code
  const s = {
    name: 'SLEIGH DASH', score: 0, missed: 0, over: false, falls: 0,
    howto: ['RUN THE ROOFTOPS AND JUMP.', 'CLEAR A CHIMNEY, POST A PRESENT.', 'MIND THE GAPS.'],
    endTitle: 'HAPPY CHRISTMAS',
    result: () => 'POSTED ' + s.score + (s.score === 1 ? ' PRESENT' : ' PRESENTS'),
    note: () => s.falls ? 'AND FELL OFF ' + s.falls + (s.falls === 1 ? ' ROOF.' : ' ROOFS.') : '',
    bg: t2 => xmasNight(t2),
    prop: () => xmasTree(62, 252, 2),
    cols: ['#ff2e4d', '#3dff8b', '#ffd23f', '#fff'],
    shareLine: who => who + ' posted ' + s.score + ' presents at happyherogames.com'
  };
  const HX = 130, GROUND = 250, GRAV = .52, JUMP = -8.4;
  let t = 0, time = (seconds || 60) * 60, speed = 2.4;
  let y = 0, vy = 0, air = false;            // y is the height above the roof he is standing on
  let roofs = [], chimneys = [], pops = [], scroll = 0;

  // a roof is {x, w, y}. The first one is long, so nobody falls in the first second.
  const addRoof = () => {
    const last = roofs[roofs.length - 1];
    const gap = last ? rint(26, 52) : 0;
    const x = last ? last.x + last.w + gap : -40;
    const w = last ? rint(70, 130) : 220;
    const ry = last ? clamp(last.y + rint(-22, 22), 176, 226) : 206;
    const r = { x, w, y: ry };
    roofs.push(r);
    // a chimney sits on most roofs, never at the very edge: jumping over it posts a present
    if (last && R() < .8) chimneys.push({ x: x + rint(22, Math.max(23, w - 22)), y: ry, done: false });
  };
  const roofAt = px => roofs.find(r => px >= r.x && px <= r.x + r.w);

  s.init = () => { sfx.go(); for (let k = 0; k < 8; k++) addRoof(); };

  s.update = () => {
    t++;
    if (s.over) return;
    if (--time <= 0) { s.over = true; sfx.score(); return; }
    speed = 2.4 + t / 900;
    scroll += speed;
    for (const r of roofs) r.x -= speed;
    for (const c of chimneys) c.x -= speed;
    while (roofs.length && roofs[0].x + roofs[0].w < -60) roofs.shift();
    chimneys = chimneys.filter(c => c.x > -30);
    while (roofs[roofs.length - 1].x < W + 120) addRoof();

    const i = anyIn();
    if ((i.aP || i.uP || clicked) && !air) { air = true; vy = JUMP; sfx.kick(); }
    const under = roofAt(HX);
    if (air || !under) {
      vy += GRAV;
      y += vy;
      const land = roofAt(HX);
      if (vy > 0 && land && y >= land.y - 0 && y - vy <= land.y) { y = land.y; air = false; vy = 0; }
      // A fall doesn't end it: the minute is the only clock. He climbs out onto the next roof
      // and loses three seconds, because a game that ends four seconds in is no fun to send on.
      if (!land && y > H + 10) {
        s.falls++; time = Math.max(60, time - 180); sfx.hurt(); shake = 5;
        const next = roofs.find(r => r.x > HX) || roofs[roofs.length - 1];
        const dx = next.x - (HX - 24);
        for (const r of roofs) r.x -= dx;
        for (const c of chimneys) c.x -= dx;
        y = next.y - 70; vy = 0; air = true;
      }
    } else y = under.y;

    // a present goes down any chimney he clears
    for (const c of chimneys) {
      if (!c.done && air && Math.abs(c.x - HX) < 13 && y < c.y - 16) {
        c.done = true; s.score++; sfx.blip();
        pops.push({ x: c.x, y: c.y - 30, life: 26 });
      }
    }
    for (const p of pops) p.life--;
    pops = pops.filter(p => p.life > 0);
  };

  s.draw = () => {
    xmasNight(t);
    for (const r of roofs) {
      rect(r.x, r.y, r.w, H - r.y, '#3a2a55');
      rect(r.x, r.y - 5, r.w, 6, '#e8f1ff');
      for (let k = 6; k < r.w - 8; k += 18) rect(r.x + k, r.y + 14, 10, 12, '#2b1f41');
      if (r.w > 100) xmasTree(r.x + r.w - 22, r.y, 1);
    }
    for (const c of chimneys) {
      rect(c.x - 9, c.y - 22, 18, 22, '#7a3b2a'); rect(c.x - 11, c.y - 26, 22, 5, '#e8f1ff');
      if (c.done) rect(c.x - 5, c.y - 14, 10, 8, '#ffd23f');
    }
    for (const p of pops) {
      rect(p.x - 6, p.y - (26 - p.life), 12, 10, '#ff2e4d');
      rect(p.x - 2, p.y - (26 - p.life), 4, 10, '#ffd23f');
      txt('+1', p.x, p.y - 18 - (26 - p.life), 8, COL.gold, 'center');
    }

    const gy = y;
    shadow(HX, Math.min(gy + 2, GROUND), air ? 8 : 12);
    drawSpec(HERO, HX, gy, 3, false, air ? 0 : Math.floor(t / 6));
    // a red hat, so it reads as Christmas at a glance
    rect(HX - 10, gy - 52, 20, 5, '#ff2e4d'); rect(HX - 10, gy - 47, 20, 3, '#ffffff');
    rect(HX + 6, gy - 57, 7, 6, '#ff2e4d'); rect(HX + 11, gy - 53, 5, 4, '#ffffff');
    // the sack, bouncing with the run
    rect(HX - 20, gy - 30 + (air ? 0 : Math.floor(t / 6) % 2), 10, 12, '#a3161f');

    rect(0, 0, W, 26, 'rgba(8,18,46,.85)');
    txt(HERO.name, 8, 6, 12, COL.gold);
    txt('PRESENTS: ' + s.score, W / 2, 6, 12, '#fff', 'center');
    txt(Math.ceil(time / 60) + 'S', W - 8, 6, 12, time < 600 ? COL.red : COL.cyan, 'right');
    if (t < 150) txt(touchMode ? 'TAP TO JUMP' : 'PRESS FIRE TO JUMP', W / 2, 36, 10, '#fff', 'center');
  };

  return s;
}
