'use strict';
// ---------- 1. PADDLE BATTLE: two paddles, one ball, no mercy
function gPaddle() {
  const s = { name: 'BATALLA DE PALAS', how: ['UNA PELOTA, DOS PALAS.', 'BLOQUEA Y APUNTA CON EL BORDE.', 'GANA EL PRIMERO A 3.'], ctl: 'MUEVE: ARRIBA Y ABAJO', pts: [0, 0], done: -1 };
  const ph = [36, 44], py = [150, 150];
  let b, serveT = 0, err = 0, trail = [];
  function serve(dir) { b = { x: 240, y: 150, vx: dir * 2.4, vy: rnd(-1.3, 1.3) }; serveT = 60; trail = []; }
  s.init = () => serve(R() < .5 ? -1 : 1);
  s.sub = () => s.pts[0] + ' - ' + s.pts[1];
  s.ai = i => {
    const toward = i === 0 ? (b.vx < 0 && b.x < 300) : (b.vx > 0 && b.x > 180);
    const ty = toward ? b.y + err : 150;
    return { u: py[i] > ty + 5, d: py[i] < ty - 5 };
  };
  function hitP(i) {
    const sp = Math.min(6, Math.abs(b.vx) * 1.07 + .1);
    b.vx = (i === 0 ? 1 : -1) * sp; b.vy = (b.y - py[i]) / (ph[i] / 2) * 2.8; b.x = i === 0 ? 38 : 442;
    err = rnd(-26, 26); sfx.pong(); burst(b.x, b.y, 6, [PL[i].col, '#fff'], 2);
  }
  function point(i) {
    s.pts[i]++; shake = 6; sfx.score(); floatText(PL[i].name + ' ¡MARCA!', W / 2, 120, PL[i].col, 16); cheer(i, W / 2, 142, s.pts);
    if (s.pts[i] >= 3) s.done = i; else serve(i === 0 ? 1 : -1);
  }
  s.update = () => {
    for (let i = 0; i < 2; i++) { const I = inp(i); py[i] = clamp(py[i] + ((I.d ? 1 : 0) - (I.u ? 1 : 0)) * 3.2, AY + ph[i] / 2, H - ph[i] / 2); }
    if (serveT > 0) { serveT--; return; }
    b.x += b.vx; b.y += b.vy; trail.push([b.x, b.y]); if (trail.length > 8) trail.shift();
    if (b.y < AY + 3) { b.y = AY + 3; b.vy = Math.abs(b.vy); sfx.wall(); }
    if (b.y > H - 3) { b.y = H - 3; b.vy = -Math.abs(b.vy); sfx.wall(); }
    if (b.vx < 0 && b.x <= 38 && b.x >= 28 && Math.abs(b.y - py[0]) <= ph[0] / 2 + 3) hitP(0);
    if (b.vx > 0 && b.x >= 442 && b.x <= 452 && Math.abs(b.y - py[1]) <= ph[1] / 2 + 3) hitP(1);
    if (b.x < -8) point(1); else if (b.x > W + 8) point(0);
  };
  s.draw = () => {
    for (let k = 0; k < 12; k++) rect(k * 40, AY, 40, H - AY, k % 2 ? '#0e5a2a' : '#0b4d24');
    rect(239, AY, 2, H - AY, 'rgba(255,255,255,.5)'); rect(60, AY, 1, H - AY, 'rgba(255,255,255,.3)'); rect(419, AY, 1, H - AY, 'rgba(255,255,255,.3)');
    // goalposts
    for (const x of [6, 470]) { rect(x, 100, 3, 100, '#fff'); rect(x - 2, 100, 7, 3, '#fff'); rect(x - 2, 197, 7, 3, '#fff'); }
    for (let i = 0; i < 2; i++) {
      const x = i === 0 ? 33 : 442;
      boy(i, i === 0 ? 17 : 463, py[i] + 18, 2, i === 1, Math.floor(py[i] / 6));
      rect(x, py[i] - ph[i] / 2, 5, ph[i], '#e2bd85'); rect(x - 1, py[i] - ph[i] / 2, 7, 12, '#f0d2a0'); rect(x, py[i] + ph[i] / 2 - 8, 5, 4, PL[i].col);
    }
    trail.forEach((p, k) => rect(p[0] - 1, p[1] - 1, 3, 3, 'rgba(255,255,255,' + (k / 16) + ')'));
    g.shadowColor = '#fff'; g.shadowBlur = 6; rect(b.x - 3, b.y - 3, 6, 6, '#fff'); g.shadowBlur = 0; rect(b.x - 3, b.y - 1, 6, 1, '#d9424f');
    if (serveT > 20 && s.done < 0) txt('READY...', W / 2, 60, 8, '#fff', 'center');
  };
  return s;
}
addGame('BATALLA DE PALAS', gPaddle);
