'use strict';
// ---------- TRICK OR TREAT DASH: the free Halloween game
// Not part of a paid game, so it never calls addGame(). It runs on its own from /free/halloween/,
// using the engine's drawing, input and sound. One player, sixty seconds, and one number at the
// end that is worth sending to somebody.

// the night sky, the fence and the pumpkins, shared by the game and the screens either side of it
function hwNight(t) {
  const gr = g.createLinearGradient(0, 0, 0, H);
  gr.addColorStop(0, '#0d0420'); gr.addColorStop(.6, '#2a1140'); gr.addColorStop(1, '#3b1a12');
  g.fillStyle = gr; g.fillRect(0, 0, W, H);
  stars(t, 150);
  g.fillStyle = '#ffd9a0'; g.beginPath(); g.arc(404, 52, 26, 0, Math.PI * 2); g.fill();
  g.fillStyle = '#2a1140'; g.beginPath(); g.arc(392, 44, 22, 0, Math.PI * 2); g.fill();
  const bat = (bx, by, f) => {
    rect(bx - 6, by, 12, 4, '#2a1a4a');
    rect(bx - 12, by + (f ? 0 : 2), 6, 2, '#2a1a4a');
    rect(bx + 6, by + (f ? 0 : 2), 6, 2, '#2a1a4a');
  };
  bat(90 + Math.sin(t / 40) * 30, 60, Math.floor(t / 8) % 2);
  bat(280 + Math.sin(t / 33 + 2) * 40, 88, Math.floor(t / 7) % 2);
  rect(0, 196, W, 8, '#3b2412');
  for (let k = 0; k < W; k += 22) rect(k, 168, 8, 36, '#4a2d18');
  rect(0, 244, W, H - 244, '#241428');
  hwPumpkin(36, 240, 1); hwPumpkin(452, 240, 1);
}

function hwPumpkin(px, py, sc) {
  rect(px - 9 * sc, py - 8 * sc, 18 * sc, 14 * sc, '#ff6b1a');
  rect(px - 2 * sc, py - 12 * sc, 4 * sc, 4 * sc, '#1e7a34');
  rect(px - 6 * sc, py - 5 * sc, 3 * sc, 3 * sc, '#1a0f08');
  rect(px + 3 * sc, py - 5 * sc, 3 * sc, 3 * sc, '#1a0f08');
  for (let k = 0; k < 4; k++) rect(px - 6 * sc + k * 4 * sc, py, 2 * sc, 2 * sc, '#1a0f08');
}

function gTrickOrTreat(seconds) {
  // the text the free page puts around the game, here rather than in the page, so it is
  // translated with the rest of the game code
  const s = {
    name: 'TRICK OR TREAT DASH', score: 0, missed: 0, over: false,
    howto: ['CATCH THE SWEETS IN YOUR BUCKET.', 'LEAVE THE SPROUTS ALONE.', 'SIXTY SECONDS.'],
    endTitle: 'HAPPY HALLOWEEN',
    result: () => 'CAUGHT ' + s.score + (s.score === 1 ? ' SWEET' : ' SWEETS'),
    note: () => s.missed ? 'AND ' + s.missed + ' SPROUTS. UNLUCKY.' : '',
    bg: t2 => hwNight(t2),
    prop: () => hwPumpkin(64, 240, 1.4),
    cols: ['#ff6b1a', '#ffd23f', '#ff2bd6', '#fff'],
    shareLine: who => who + ' caught ' + s.score + ' sweets at happyherogames.com'
  };
  const FLOOR = 238, LEFT = 40, RIGHT = 440;
  const SWEET = ['#ff2bd6', '#ffd23f', '#22e6ff', '#3dff8b', '#ff6b1a'];
  let x = W / 2, t = 0, time = (seconds || 60) * 60, drops = [], spawn = 30, pops = [];

  s.init = () => { sfx.go(); };

  s.update = () => {
    t++;
    if (s.over) return;
    if (--time <= 0) { s.over = true; sfx.score(); return; }
    const i = inp(1);
    if (i.l) x = Math.max(LEFT, x - 4);
    if (i.r) x = Math.min(RIGHT, x + 4);

    // sweets fall faster as the minute goes on, with the odd sprout in the mix
    if (--spawn <= 0) {
      const sprout = R() < .28;
      drops.push({ x: rnd(LEFT, RIGHT), y: -10, v: rnd(1.6, 3.2), sprout, col: sprout ? '#3dff8b' : pick(SWEET) });
      spawn = Math.max(9, 28 - Math.floor(t / 90));
    }
    for (const d of drops) {
      d.y += d.v;
      if (!d.got && d.y > FLOOR - 16 && d.y < FLOOR + 6 && Math.abs(d.x - x) < 22) {
        d.got = true;
        if (d.sprout) {
          s.score = Math.max(0, s.score - 2); s.missed++;
          sfx.buzz(); shake = 4; floatText('YUCK! -2', d.x, FLOOR - 44, '#3dff8b');
        } else {
          s.score++; sfx.blip();
          pops.push({ x: d.x, y: FLOOR - 34, life: 24, col: d.col });
        }
      }
    }
    drops = drops.filter(d => !d.got && d.y < H + 12);
    for (const p of pops) p.life--;
    pops = pops.filter(p => p.life > 0);
  };

  s.draw = () => {
    hwNight(t);

    for (const d of drops) {
      if (d.sprout) {
        rect(d.x - 6, d.y - 6, 12, 12, '#3dff8b');
        rect(d.x - 3, d.y - 10, 6, 4, '#1e7a34');
        rect(d.x - 3, d.y - 3, 3, 3, '#1e7a34');
      } else {
        rect(d.x - 7, d.y - 5, 14, 10, d.col);
        rect(d.x - 10, d.y - 3, 3, 6, '#fff');
        rect(d.x + 7, d.y - 3, 3, 6, '#fff');
        rect(d.x - 4, d.y - 3, 4, 3, '#fff');
      }
    }
    for (const p of pops) txt('+1', p.x, p.y - (24 - p.life), 10, p.col, 'center');

    // the hero, holding a pumpkin bucket
    shadow(x, FLOOR + 2, 12);
    drawSpec(HERO, x, FLOOR, 3, false, Math.floor(t / 8));
    rect(x - 13, FLOOR - 16, 26, 14, '#ff6b1a');
    rect(x - 13, FLOOR - 16, 26, 3, '#ffd23f');
    rect(x - 9, FLOOR - 12, 4, 4, '#1a0f08');
    rect(x + 5, FLOOR - 12, 4, 4, '#1a0f08');

    rect(0, 0, W, 26, 'rgba(10,4,22,.85)');
    txt(HERO.name, 8, 6, 12, COL.gold);
    txt('SWEETS: ' + s.score, W / 2, 6, 12, '#fff', 'center');
    txt(Math.ceil(time / 60) + 'S', W - 8, 6, 12, time < 600 ? COL.red : COL.cyan, 'right');
  };

  return s;
}
