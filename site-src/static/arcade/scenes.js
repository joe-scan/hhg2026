'use strict';
// ===================== THE DECORATIONS =====================
// The props that change with the occasion: a cake and balloons for a birthday, a tree and snow
// for Christmas, flowers for Mother's Day, a trophy for Father's Day. Two callers: the finale
// screen in flow.js, which wants one prop beside the hero, and the name-in-lights page, which
// dresses the whole screen. Everything is drawn from rect() so it stays in the pixel grid.

function cake(cx, by, t) {
  rect(cx - 40, by - 30, 80, 30, '#ff8fb0'); rect(cx - 40, by - 30, 80, 6, '#fff'); for (let x = cx - 38; x < cx + 38; x += 8) rect(x, by - 25, 4, 4 + (x % 3), '#fff');
  rect(cx - 30, by - 52, 60, 22, '#ffd23f'); rect(cx - 30, by - 52, 60, 5, '#fff'); rect(cx - 48, by, 96, 4, '#cfc8e6');
  for (let k = 0; k < 5; k++) { const x = cx - 22 + k * 11; rect(x, by - 62, 3, 10, ['#22e6ff', '#ff2bd6', '#3dff8b', '#ff6b1a', '#7a3cff'][k]); rect(x, by - 67 - (t / 4 + k) % 2, 3, 4, t % 10 < 5 ? '#ffd23f' : '#ff6b1a'); }
}
function tree(cx, by, t) {
  for (let k = 0; k < 4; k++) { const w = 70 - k * 16, y = by - 20 - k * 20; g.fillStyle = '#1e7a34'; g.beginPath(); g.moveTo(cx - w / 2, y); g.lineTo(cx + w / 2, y); g.lineTo(cx, y - 30); g.closePath(); g.fill(); }
  rect(cx - 6, by - 20, 12, 20, '#6b3f1d');
  for (let k = 0; k < 9; k++) rect(cx - 26 + (k * 37) % 52, by - 30 - (k * 23) % 70, 4, 4, ['#ff2e4d', '#ffd23f', '#22e6ff'][(k + Math.floor(t / 15)) % 3]);
  rect(cx - 3, by - 110, 6, 6, '#ffd23f');
}
function trophy(cx, by) { rect(cx - 20, by - 50, 40, 26, '#ffd23f'); rect(cx - 28, by - 48, 8, 12, '#ffd23f'); rect(cx + 20, by - 48, 8, 12, '#ffd23f'); rect(cx - 5, by - 24, 10, 12, '#e0b64a'); rect(cx - 16, by - 12, 32, 12, '#6b3f1d'); rect(cx - 10, by - 44, 6, 14, '#fff2c2'); }

// A balloon on a string, bobbing. y is where the balloon sits before the bob.
function balloon(x, y, col, t, k) {
  const b = Math.round(Math.sin((t + k * 40) / 34) * 5), ty = y + b;
  rect(x - 9, ty, 18, 22, col); rect(x - 11, ty + 5, 2, 12, col); rect(x + 9, ty + 5, 2, 12, col);
  rect(x - 5, ty + 3, 4, 8, 'rgba(255,255,255,.55)');
  rect(x - 2, ty + 22, 4, 3, mix(col, '#000000', .3));
  for (let s = 0; s < 22; s += 2) rect(x + (s % 8 < 4 ? 0 : 1) - 0, ty + 25 + s, 1, 2, '#e8ddff');
}
// Bunting: triangles on a sagging string, left to right.
function bunting(y, t) {
  for (let k = 0; k < 13; k++) {
    const x = 8 + k * 38, sag = Math.round(Math.sin(k / 3 + t / 60) * 3);
    if (x > 120 && x < 350) continue; // the middle is where the name goes
    rect(x, y + sag, 38, 2, '#e8ddff');
    g.fillStyle = ['#ff2bd6', '#ffd23f', '#22e6ff', '#3dff8b'][k % 4];
    g.beginPath(); g.moveTo(x + 6, y + sag + 2); g.lineTo(x + 26, y + sag + 2); g.lineTo(x + 16, y + sag + 18); g.closePath(); g.fill();
  }
}
// Snow, confetti and sparks all fall the same way, so one function with a colour list.
function fallers(t, cols, n, speed, size) {
  for (let k = 0; k < n; k++) {
    const x = (k * 71 + Math.sin((t + k * 30) / 50) * 9) % W;
    const y = ((k * 53) + t * speed) % (H + 20) - 10;
    rect(x, y, size, size, cols[k % cols.length]);
  }
}
function flower(x, by, col, t, k) {
  const sway = Math.round(Math.sin((t + k * 50) / 45) * 2);
  rect(x - 1, by - 26, 3, 26, '#2f9e52'); rect(x + 2 + sway, by - 18, 7, 3, '#2f9e52');
  const cx = x + sway;
  rect(cx - 7, by - 34, 14, 8, col); rect(cx - 4, by - 38, 8, 5, col); rect(cx - 2, by - 33, 4, 4, '#ffd23f');
}
function present(x, by, box, ribbon) {
  rect(x - 13, by - 22, 26, 22, box); rect(x - 3, by - 22, 6, 22, ribbon); rect(x - 13, by - 14, 26, 5, ribbon);
  rect(x - 9, by - 28, 8, 6, ribbon); rect(x + 1, by - 28, 8, 6, ribbon);
}
// A rosette: the medal a dad actually gets, with two ribbon tails.
function medal(x, by, t) {
  const sway = Math.round(Math.sin(t / 50) * 1);
  rect(x - 7 + sway, by - 26, 6, 26, '#ff2e4d'); rect(x + 1 + sway, by - 26, 6, 26, '#22e6ff');
  const cy = by - 44 + sway;
  rect(x - 18, cy - 10, 36, 20, '#ffd23f'); rect(x - 10, cy - 18, 20, 36, '#ffd23f');
  rect(x - 12, cy - 12, 24, 24, '#fff2c2'); rect(x - 7, cy - 7, 14, 14, '#ffd23f');
}
function heart(x, y, s, col) { rect(x - 3 * s, y, 2 * s, s, col); rect(x + s, y, 2 * s, s, col); rect(x - 3 * s, y + s, 6 * s, s, col); rect(x - 2 * s, y + 2 * s, 4 * s, s, col); rect(x - s, y + 3 * s, 2 * s, s, col); }
function twinkle(x, y, s, col) { rect(x - s, y, s * 3, s, col); rect(x, y - s, s, s * 3, col); }

// The whole screen, dressed. Drawn after the background and before the hero, except the
// falling bits, which want to be in front of everything. Returns nothing; draws twice via `front`.
function scene(occ, t, front) {
  if (occ === 'birthday') {
    if (front) { fallers(t, ['#ff2bd6', '#ffd23f', '#22e6ff', '#3dff8b'], 14, .6, 3); return; }
    bunting(0, t);
    balloon(44, 118, '#ff2bd6', t, 0); balloon(78, 146, '#22e6ff', t, 1);
    balloon(404, 122, '#ffd23f', t, 2); balloon(438, 150, '#3dff8b', t, 3);
    cake(404, 252, t);
  } else if (occ === 'christmas') {
    if (front) { fallers(t, ['#ffffff', '#e8f4ff'], 26, .5, 3); return; }
    rect(0, 258, W, 12, '#f2f7ff'); rect(0, 256, W, 3, '#dfe9ff');
    tree(424, 258, t);
    present(28, 258, '#ff2e4d', '#ffd23f'); present(58, 258, '#22e6ff', '#fff'); present(42, 236, '#3dff8b', '#ff2bd6');
    // baubles hang at the edges only: the middle of the top strip is the name
    for (let k = 0; k < 6; k++) { const x = k < 3 ? 22 + k * 38 : 356 + (k - 3) * 38, d = (k % 2) * 5;
      rect(x, 0, 4, 14 + d, '#2f9e52'); rect(x - 2, 14 + d, 8, 8, ['#ff2e4d', '#ffd23f', '#22e6ff'][k % 3]); }
  } else if (occ === 'fathers') {
    if (front) { for (let k = 0; k < 6; k++) twinkle(k < 3 ? 26 + k * 34 : 388 + (k - 3) * 34, 132 + (k % 3) * 16, 2, (t / 8 + k) % 6 < 3 ? '#ffd23f' : '#fff2c2'); return; }
    bunting(0, t);
    trophy(410, 252); medal(42, 248, t);
  } else if (occ === 'mothers') {
    if (front) { for (let k = 0; k < 6; k++) heart(k < 3 ? 34 + k * 52 : 342 + (k - 3) * 52, H + 30 - ((t * .5 + k * 45) % (H + 40)), 4, k % 2 ? '#ff8fb0' : '#ff2bd6'); return; }
    flower(36, 262, '#ff2bd6', t, 0); flower(60, 266, '#ffd23f', t, 1); flower(86, 262, '#ff8fb0', t, 2);
    flower(394, 262, '#ff8fb0', t, 3); flower(420, 266, '#22e6ff', t, 4); flower(444, 262, '#ff2bd6', t, 5);
    rect(0, 266, W, 4, '#2f9e52');
  } else {
    if (front) { fallers(t, ['#ffd23f', '#22e6ff', '#ff2bd6'], 10, .4, 2); return; }
    for (let k = 0; k < 9; k++) { const x = 26 + k * 54; if (x > 190 && x < 300) continue; twinkle(x, 126 + ((k * 37) % 5) * 12, 3, (t / 10 + k) % 6 < 3 ? '#ffd23f' : '#22e6ff'); }
    trophy(410, 252);
  }
}
