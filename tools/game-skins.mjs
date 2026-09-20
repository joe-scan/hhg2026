// Ten looks for the game screens, rendered from the real game rather than mocked up: same
// sprites, same layout, different lettering, palette and background. Each look is a font, a
// handful of colours and one background function, which is all the game's look actually is.
//
//   CHROME=/path/to/chrome node tools/game-skins.mjs [http://127.0.0.1:8766/] [/tmp/looks]
//
// Writes one PNG per look per screen, plus a contact sheet (needs ImageMagick `montage`).
import { chromium } from 'playwright-core';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const BASE = process.argv[2] || 'http://127.0.0.1:8766/';
const OUT = process.argv[3] || '/tmp/hhg-looks';
fs.mkdirSync(OUT, { recursive: true });

// Fonts are loaded from Google Fonts in the harness page; keep this list in step with LOOKS.
const FONTS = ['Press+Start+2P', 'Silkscreen:wght@400;700', 'Pixelify+Sans:wght@400;700',
  'VT323', 'DotGothic16', 'Jersey+15', 'Bowlby+One', 'Micro+5'];

const PS = '"Press Start 2P",monospace';
const LOOKS = [
  {
    id: '01-sunset', name: 'Sunset Strip (now)', font: PS,
    col: {},
    bg: `(t) => { const gr = g.createLinearGradient(0,0,0,170);
      gr.addColorStop(0,'#0a0420'); gr.addColorStop(.55,'#26093f'); gr.addColorStop(1,'#8e2472');
      g.fillStyle = gr; g.fillRect(0,0,W,170); stars(t,110);
      const sg = g.createLinearGradient(0,70,0,170); sg.addColorStop(0,'#f2cf62'); sg.addColorStop(1,'#d9476f');
      g.fillStyle = sg; g.beginPath(); g.arc(240,122,52,0,Math.PI*2); g.fill();
      for (let k=0;k<5;k++) rect(186,128+k*9,108,1+k,'#5a1070');
      rect(0,170,W,100,'#0d0221'); rect(0,170,W,1,'#1d9fb4');
      g.strokeStyle='rgba(255,43,214,.34)'; g.lineWidth=1; g.beginPath();
      for (let k=-14;k<=14;k++){ g.moveTo(240+k*8,170); g.lineTo(240+k*70,270); }
      const ph=(t%30)/30; for (let i=0;i<9;i++){ const z=(i+ph)/9, y=170+100*z*z; g.moveTo(0,y); g.lineTo(W,y); }
      g.stroke(); }`
  },
  {
    id: '02-midnight', name: 'Midnight Arcade', font: PS,
    col: { hot: '#ff4d8d', cyan: '#5ce1e6', gold: '#ffd166', dim: '#7f8bb5', off: '#1b2544', bg: '#080d1f', plate: 'rgba(8,13,31,.7)', band: '#0b1229', name: '#5ce1e6' },
    bg: `(t) => { rect(0,0,W,H,'#080d1f'); stars(t,150);
      for (let k=0;k<20;k++){ const x=k*26, h=30+(k*53)%70; rect(x,168-h,22,h,'#101a38');
        for(let w=0;w<2;w++) if((k+w)%3) rect(x+5+w*9,168-h+8,5,6,'#2f4a86'); }
      rect(0,166,W,2,'#5ce1e6'); rect(0,168,W,H-168,'#0b1229');
      g.strokeStyle='rgba(92,225,230,.22)'; g.lineWidth=1; g.beginPath();
      for (let k=-10;k<=10;k++){ g.moveTo(240+k*14,168); g.lineTo(240+k*64,270); }
      for (let i=1;i<7;i++){ const y=168+i*i*2.6; g.moveTo(0,y); g.lineTo(W,y); } g.stroke(); }`
  },
  {
    id: '03-candy', name: 'Candy Cabinet', font: '"Pixelify Sans",monospace', big: '"Pixelify Sans",monospace',
    col: { hot: '#e0407a', cyan: '#2a9aa6', gold: '#e0951f', dim: '#7a6a86', off: '#e7d8ea', white: '#3b2a44', ink: '#3b2a44', plate: 'rgba(255,253,247,.86)', band: '#3b2a44', name: '#e0407a', nameTop: '#3b2a44' },
    bg: `(t) => { const gr=g.createLinearGradient(0,0,0,H); gr.addColorStop(0,'#ffd9e8'); gr.addColorStop(.6,'#ffeccd'); gr.addColorStop(1,'#cdeede');
      g.fillStyle=gr; g.fillRect(0,0,W,H);
      for (let k=0;k<5;k++){ const x=(k*120 + t*.2)%(W+90)-45, y=34+(k%3)*22;
        rect(x,y,44,12,'#fffdf7'); rect(x+8,y-7,28,10,'#fffdf7'); rect(x+16,y-12,14,8,'#fffdf7'); }
      rect(0,196,W,H-196,'#8fd9b6'); rect(0,196,W,3,'#69c89c');
      for (let k=0;k<W;k+=24) rect(k,206,12,3,'#69c89c'); }`
  },
  {
    id: '04-gameboy', name: 'Pocket Green', font: '"Silkscreen",monospace',
    col: { hot: '#0f380f', cyan: '#0f380f', gold: '#e8f4c0', dim: '#4e6b1f', off: '#9bbc0f', white: '#0f380f', ink: '#0f380f', red: '#0f380f', green: '#306230', purple: '#306230', plate: '#c6de6f', band: '#306230', name: '#306230', nameTop: '#0f380f' },
    bg: `(t) => { rect(0,0,W,H,'#9bbc0f'); rect(0,0,W,120,'#c6de6f');
      for (let k=0;k<W;k+=6) rect(k,118+((k/6)%2)*3,3,3,'#8bac0f');
      rect(0,168,W,H-168,'#8bac0f');
      for (let k=0;k<26;k++) rect((k*19+ (t*.2)%19)%W,180+(k%4)*22,6,2,'#306230'); }`
  },
  {
    id: '05-crt', name: 'CRT Amber', font: '"VT323",monospace',
    col: { hot: '#ffb000', cyan: '#ffd48a', gold: '#ffb000', dim: '#a06a00', off: '#2a1a00', white: '#ffe9c2', red: '#ff7b00', green: '#ffb000', purple: '#c98600', plate: 'rgba(18,10,0,.75)', band: '#1c1000', name: '#ffb000', nameTop: '#fff0c2' },
    bg: `(t) => { rect(0,0,W,H,'#120a00');
      g.strokeStyle='rgba(255,176,0,.30)'; g.lineWidth=1; g.beginPath();
      for (let k=-12;k<=12;k++){ g.moveTo(240+k*12,170); g.lineTo(240+k*60,270); }
      for (let i=1;i<8;i++){ const y=170+i*i*1.8; g.moveTo(0,y); g.lineTo(W,y); } g.stroke();
      g.fillStyle='rgba(255,176,0,.10)'; for (let y=0;y<H;y+=3) g.fillRect(0,y,W,1);
      rect(0,168,W,2,'#ffb000'); stars(t,120); }`
  },
  {
    id: '06-sunrise', name: 'Sunrise Coast', font: PS,
    col: { hot: '#ff6b5d', cyan: '#2ec5c0', gold: '#ffc857', dim: '#a9bccc', off: '#173a52', plate: 'rgba(14,52,80,.72)', band: '#0e3450', name: '#ffc857' },
    bg: `(t) => { const gr=g.createLinearGradient(0,0,0,168); gr.addColorStop(0,'#123a5c'); gr.addColorStop(.6,'#f0806a'); gr.addColorStop(1,'#ffc857');
      g.fillStyle=gr; g.fillRect(0,0,W,168); stars(t,60);
      g.fillStyle='#fff0c2'; g.beginPath(); g.arc(240,150,46,0,Math.PI*2); g.fill();
      rect(0,168,W,H-168,'#0e3450');
      for (let i=0;i<9;i++){ const y=170+i*i*1.3, w=120-i*10; rect(240-w/2+Math.sin((t+i*30)/40)*8,y,w,2,'#ffd08a'); }
      rect(0,168,W,2,'#ffd08a'); }`
  },
  {
    id: '07-tokyo', name: 'Neon Tokyo', font: '"DotGothic16",monospace',
    col: { hot: '#ff2f6d', cyan: '#31e1ff', gold: '#ffe14d', dim: '#8d7db0', off: '#1a1030', purple: '#8b38ff', plate: 'rgba(10,6,20,.72)', band: '#140b28', name: '#ff2f6d' },
    bg: `(t) => { rect(0,0,W,H,'#0a0614');
      for (let k=0;k<14;k++){ const x=k*38, h=50+(k*67)%90; rect(x,170-h,30,h,'#140b28');
        rect(x+4,170-h+8,6,26,(k%3?'#ff2f6d':'#31e1ff')); rect(x+18,170-h+16,8,10,'#ffe14d'); }
      rect(0,168,W,H-168,'#0e0820');
      g.fillStyle='rgba(49,225,255,.28)'; for (let k=0;k<50;k++){ const x=(k*53+t*3)%W, y=(k*37+t*7)%H; g.fillRect(x,y,1,7); }
      rect(0,168,W,2,'#ff2f6d'); }`
  },
  {
    id: '08-paper', name: 'Paper Cut', font: '"Silkscreen",monospace', big: '"Bowlby One",sans-serif',
    col: { hot: '#e0521f', cyan: '#2b6ea8', gold: '#b8791f', dim: '#8d7f6f', off: '#e6d6c3', white: '#2a1a12', ink: '#2a1a12', red: '#c33b2a', green: '#3f8a56', purple: '#6a5aa8', plate: 'rgba(253,245,236,.9)', band: '#2a1a12', name: '#e0521f', nameTop: '#2a1a12' },
    bg: `(t) => { rect(0,0,W,H,'#fdf5ec');
      rect(0,0,W,166,'#f6e7d4'); rect(0,164,W,3,'#2a1a12');
      g.fillStyle='#f0d9bd'; g.beginPath(); g.arc(240,140,54,0,Math.PI*2); g.fill();
      for (let k=0;k<6;k++) rect(120+k*40,30+(k%3)*16,26,6,'#eadbc6');
      rect(0,167,W,H-167,'#efe2d0');
      for (let k=0;k<W;k+=40) rect(k,200+((k/40)%2)*16,22,3,'#e0d0ba'); }`
  },
  {
    id: '09-space', name: 'Deep Space', font: PS,
    col: { hot: '#c86bff', cyan: '#6fe3ff', gold: '#ffd76b', dim: '#8f8fc0', off: '#161a3a', plate: 'rgba(5,6,15,.72)', band: '#0d0b22', name: '#c86bff' },
    bg: `(t) => { const gr=g.createLinearGradient(0,0,0,H); gr.addColorStop(0,'#05060f'); gr.addColorStop(1,'#141033');
      g.fillStyle=gr; g.fillRect(0,0,W,H); stars(t,200);
      g.fillStyle='#3a2f6b'; g.beginPath(); g.arc(392,60,40,0,Math.PI*2); g.fill();
      g.fillStyle='#4a3d82'; g.beginPath(); g.arc(380,50,10,0,Math.PI*2); g.fill();
      rect(0,190,W,H-190,'#0d0b22'); rect(0,190,W,2,'#6fe3ff');
      for (let k=0;k<W;k+=8) rect(k,192+Math.round(Math.sin((k+t)/28)*3),4,2,'#1d1b45'); }`
  },
  {
    id: '10-poster', name: 'Poster Bold', font: PS, big: '"Bowlby One",sans-serif',
    col: { hot: '#ff3b30', cyan: '#ffffff', gold: '#ffcc00', dim: '#d8ecff', off: '#1b1b1b', white: '#ffffff', ink: '#1b1b1b', green: '#12b76a', purple: '#7a3cff', plate: '#1b1b1b', band: '#1b1b1b', name: '#ffcc00', nameTop: '#ffffff' },
    bg: `(t) => { rect(0,0,W,H,'#00a3ff'); rect(0,0,W,4,'#1b1b1b');
      for (let k=0;k<7;k++) rect(k*70+((t*.3)%70)-70,18+(k%2)*20,40,10,'#ffffff');
      rect(0,150,W,6,'#1b1b1b'); rect(0,156,W,H-156,'#12b76a');
      for (let k=0;k<W;k+=30) rect(k,176,16,4,'#0f9257');
      for (let k=0;k<W;k+=30) rect(k+8,206,16,5,'#0f9257'); }`
  }
];

const browser = await chromium.launch(process.env.CHROME ? { executablePath: process.env.CHROME } : {});
const tag = f => `<script src="${BASE}arcade/${f}"><\/script>`;
const GAMES = ['games/paddle-battle.js', 'games/water-balloon-fight.js', 'games/back-seat-battle.js',
  'games/dinner-dash.js', 'games/table-quiz.js', 'games/bosses.js'];

for (const look of LOOKS) {
  const page = await browser.newPage({ viewport: { width: 700, height: 500 }, deviceScaleFactor: 2 });
  page.on('pageerror', e => console.error(look.id, 'page error:', e.message));
  await page.setContent(
    `<link href="https://fonts.googleapis.com/css2?${FONTS.map(f => 'family=' + f).join('&')}&display=swap" rel="stylesheet">` +
    '<style>body{margin:0;background:#111}canvas{image-rendering:pixelated;width:480px}</style>' +
    '<canvas id="game" width="480" height="270"></canvas>' +
    `<script>window.HHG_TEASER = false; window.HHG_FONT = ${JSON.stringify(look.font)};` +
    `window.HHG_FONT_BIG = ${JSON.stringify(look.big || look.font)};` +
    `window.HHG_COL = ${JSON.stringify(look.col)};<\/script>` +
    tag('engine.js') + tag('scenes.js') + GAMES.map(tag).join('') + tag('flow.js') +
    `<script>bgSynth = ${look.bg}; startGame(Object.assign({}, DEMO, { family: [{ role: "dad", name: "" }, { role: "mum", name: "" }] })); __hhg.setDemo(true);<\/script>`,
    { waitUntil: 'load' });
  await page.waitForTimeout(900);
  try { await page.evaluate(() => document.fonts.ready); } catch (e) {}
  await page.waitForTimeout(400);

  const canvas = page.locator('#game');
  const step = n => page.evaluate(k => { for (let i = 0; i < k; i++) __hhg.tick(); __hhg.render(); }, n);
  const state = () => page.evaluate(() => __hhg.state().name);

  await step(40);
  await canvas.screenshot({ path: path.join(OUT, look.id + '-a-title.png') });
  for (let i = 0; i < 400 && await state() !== 'play'; i++) {
    if (['title', 'vs', 'howto'].includes(await state()) && i % 3 === 0) await page.keyboard.press('Space');
    await step(20);
  }
  await step(150);
  await canvas.screenshot({ path: path.join(OUT, look.id + '-b-play.png') });
  await page.close();
  console.log('rendered', look.id, look.name);
}
await browser.close();

// one sheet to look at, labelled, two screens per look
try {
  const args = [];
  for (const look of LOOKS) args.push('-label', look.name, path.join(OUT, look.id + '-a-title.png'),
    '-label', '', path.join(OUT, look.id + '-b-play.png'));
  execFileSync('montage', [...args, '-tile', '2x', '-geometry', '480x270+8+8', '-background', '#1b1b1b',
    '-fill', '#ffffff', '-pointsize', '22', path.join(OUT, 'sheet.png')], { stdio: 'inherit' });
  console.log('sheet:', path.join(OUT, 'sheet.png'));
} catch (e) { console.log('montage not available, the individual PNGs are in', OUT); }
