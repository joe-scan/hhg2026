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

// The title card for the poster and the link preview comes from the name-in-lights page, which
// draws the same screen without the menu over it.
const card = await browser.newPage({ viewport: { width: 900, height: 900 }, deviceScaleFactor: 4 });
await card.goto(BASE + 'name/index.html', { waitUntil: 'load' });
await card.fill('#who', 'AVA');
await card.waitForTimeout(800);
await card.locator('#game').screenshot({ path: path.join(ASSETS, 'title.png') });

// The trailer: title, versus, a burst of play, the ending. Slow on the cards, quick on the game.
execFileSync('convert', ['-loop', '0', '-dispose', 'previous',
  '-delay', '160', path.join(TMP, 't-title.png'),
  '-delay', '140', path.join(TMP, 't-vs.png'),
  '-delay', '45', path.join(TMP, 't-play0.png'), path.join(TMP, 't-play1.png'), path.join(TMP, 't-play2.png'), path.join(TMP, 't-play3.png'),
  '-delay', '300', path.join(TMP, 't-end.png'),
  '-resize', '720x', '-layers', 'optimize', path.join(IMG, 'trailer.gif')], { stdio: 'inherit' });

// The link preview: the title screen, letterboxed to 1200x630 on the game's own background.
execFileSync('convert', [path.join(ASSETS, 'title.png'), '-resize', '1120x',
  '-background', '#12062b', '-gravity', 'center', '-extent', '1200x630', path.join(IMG, 'og.png')], { stdio: 'inherit' });

// The poster, printed and posted with the gift box.
const poster = await browser.newPage({ viewport: { width: 800, height: 1200 }, deviceScaleFactor: 2 });
await poster.goto('file://' + path.join(ASSETS, 'poster.html'), { waitUntil: 'networkidle' });
await poster.waitForTimeout(400);
await poster.screenshot({ path: path.join(TMP, 'poster-2x.png') });
execFileSync('convert', [path.join(TMP, 'poster-2x.png'), '-resize', '900x', path.join(IMG, 'poster.png')], { stdio: 'inherit' });

for (const f of fs.readdirSync(TMP)) if (f.startsWith('t-') || f === 'poster-2x.png') fs.unlinkSync(path.join(TMP, f));
await browser.close();
console.log('written: finale.png, og.png, trailer.gif, poster.png, and the poster stills');
