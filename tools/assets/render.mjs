// Re-renders every picture on the site from the game code itself, so the marketing can't drift
// from the product. It plays a whole game in a headless browser, grabs the frames, and writes
// finale.png, og.png, trailer.gif, poster.png and the stills the poster uses.
//
//   npm install --no-save playwright-core
//   cd site && python3 -m http.server 8766   (or any server over site/)
//   CHROME=/path/to/chrome node tools/assets/render.mjs [http://127.0.0.1:8766/]
//
// Needs ImageMagick (`convert`) for the GIF and the poster resize.
import { chromium } from 'playwright-core';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const BASE = process.argv[2] || 'http://127.0.0.1:8766/';
const ROOT = path.resolve(import.meta.dirname, '..', '..');
const IMG = path.join(ROOT, 'site-src', 'static', 'img');
const ASSETS = path.join(ROOT, 'tools', 'assets');
const TMP = path.join(ASSETS, 'frames');
fs.mkdirSync(TMP, { recursive: true });

const browser = await chromium.launch(process.env.CHROME ? { executablePath: process.env.CHROME } : {});
const page = await browser.newPage({ viewport: { width: 1360, height: 900 }, deviceScaleFactor: 4 });
page.on('pageerror', e => { console.error('page error:', e.message); process.exitCode = 1; });

const tag = f => `<script src="${BASE}arcade/${f}"><\/script>`;
await page.setContent('<style>body{margin:0}canvas{image-rendering:pixelated;width:480px}</style>' +
  '<canvas id="game" width="480" height="270"></canvas>' +
  '<script>window.HHG_TEASER = false;<\/script>' + tag('engine.js') + tag('scenes.js') +
  ['games/paddle-battle.js', 'games/water-balloon-fight.js', 'games/back-seat-battle.js', 'games/dinner-dash.js', 'games/table-quiz.js', 'games/bosses.js', 'flow.js']
    .map(tag).join('') + '<script>startGame(Object.assign({}, DEMO, { family: [{ role: "dad", name: "" }, { role: "mum", name: "" }, { role: "brother", name: "JACK" }] }));<\/script>', { waitUntil: 'load' });
await page.waitForTimeout(600);

const canvas = page.locator('#game');
const shot = file => canvas.screenshot({ path: file });
const step = n => page.evaluate(k => { for (let i = 0; i < k; i++) __hhg.tick(); __hhg.render(); }, n);
const state = () => page.evaluate(() => __hhg.state().name);
// The computer plays both sides, the way the smoke test does it.
await page.evaluate(() => __hhg.setDemo(true));
// Walk to a state, tapping through the cards in the way, and stop there.
const until = async (want, cap = 2000) => {
  for (let i = 0; i < cap; i++) {
    const st = await state();
    if (st === want) return true;
    if (['title', 'vs', 'howto', 'result', 'bossIntro', 'cont'].includes(st) && i % 3 === 0) await page.keyboard.press('Space');
    await step(20);
  }
  return false;
};

const frames = [];
const grab = async name => { const f = path.join(TMP, name); await shot(f); frames.push(f); return f; };

await step(30); await grab('t-title.png');
if (!await until('vs')) console.error('never reached the versus card');
await step(40); await grab('t-vs.png');
if (!await until('play')) console.error('never reached a game');
for (let k = 0; k < 4; k++) { await step(45); await grab('t-play' + k + '.png'); }
if (!await until('finale', 6000)) console.error('never reached the ending');
await step(300);
const finale = path.join(IMG, 'finale.png');
await shot(finale);
await grab('t-end.png');
fs.copyFileSync(finale, path.join(TMP, 'f080.png'));   // the poster strip uses two stills
fs.copyFileSync(path.join(TMP, 't-play1.png'), path.join(TMP, 'f045.png'));

// The title card for the poster and the link preview: the same screen the order form draws,
// rendered on its own here since the name-in-lights page was retired.
const card = await browser.newPage({ viewport: { width: 700, height: 500 }, deviceScaleFactor: 4 });
card.on('pageerror', e => console.error('card error:', e.message));
await card.setContent(
  '<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Bowlby+One&display=swap" rel="stylesheet">' +
  '<style>body{margin:0;background:#111}canvas{image-rendering:pixelated;width:480px}</style>' +
  '<canvas id="game" width="480" height="270"></canvas>' +
  tag('engine.js') + tag('scenes.js') +
  `<script>
    applyConfig(Object.assign({}, DEMO, { hero: Object.assign({}, DEMO.hero, { name: 'AVA' }), occasion: 'birthday' }));
    let t = 0;
    (function draw() {
      t++;
      bgSynth(t); scene('birthday', t, false);
      txt('STARRING', W / 2, 10, 16, COL.ink, 'center');
      const n = HERO.name, size = 40;
      namePlate(n, W / 2, 32, size); nameLogo(n, W / 2, 28, size);
      const line = OCCASIONS.birthday, ow = line.length * 16;
      rect(W / 2 - ow / 2 - 10, 80, ow + 20, 30, BAND());
      rect(W / 2 - ow / 2 - 10, 80, ow + 20, 3, COL.gold);
      txt(line, W / 2, 87, 16, COL.gold, 'center');
      shadow(W / 2, 236, 16); drawSpec(HERO, W / 2, 236, 4, false, Math.floor(t / 22));
      if (PET) pet(70, 258, 2, true, Math.floor(t / 6));
      scene('birthday', t, true);
      requestAnimationFrame(draw);
    })();
  <\/script>`, { waitUntil: 'load' });
await card.waitForTimeout(1200);
await card.locator('#game').screenshot({ path: path.join(ASSETS, 'title.png') });

// The trailer. It must not rush and it must not smear. Each card is held for three seconds or
// so; -morph 3 dissolves between them; -dither None keeps the flat colours flat, which is what
// made the first cut look like a photocopy. The halving to 960 happens before the morph, so
// every pixel stays a square, and the page shows it at exactly 480, which is a clean 2:1.
// After -morph 3 the real frames land on 0, 4, 8, 12, 16, 20, 24.
const shots = ['t-title.png', 't-vs.png', 't-play0.png', 't-play1.png', 't-play2.png', 't-play3.png', 't-end.png']
  .map(f => path.join(TMP, f));
execFileSync('convert', [...shots,
  '-filter', 'point', '-resize', '50%',
  '-morph', '3',
  '-set', 'delay', '%[fx:(t==0)?320:(t==4)?280:(t==24)?420:((t%4)==0?150:5)]',
  '-loop', '0', '-dither', 'None', '-colors', '128', '-layers', 'optimize',
  path.join(IMG, 'trailer.gif')], { stdio: 'inherit' });

// The link preview: the title screen at a clean 2x, letterboxed to 1200x630 on the game's sky.
execFileSync('convert', [path.join(ASSETS, 'title.png'), '-filter', 'point', '-resize', '50%',
  '-background', '#00a3ff', '-gravity', 'center', '-extent', '1200x630', path.join(IMG, 'og.png')], { stdio: 'inherit' });

// The poster, printed and posted with the gift box.
const poster = await browser.newPage({ viewport: { width: 800, height: 1200 }, deviceScaleFactor: 1.125 });
await poster.goto('file://' + path.join(ASSETS, 'poster.html'), { waitUntil: 'networkidle' });
await poster.waitForTimeout(400);
await poster.screenshot({ path: path.join(IMG, 'poster.png') });   // 900 wide already: no resize, no blur

for (const f of fs.readdirSync(TMP)) if (f.startsWith('t-') || f === 'poster-2x.png') fs.unlinkSync(path.join(TMP, f));
await browser.close();
console.log('written: finale.png, og.png, trailer.gif, poster.png, and the poster stills');
