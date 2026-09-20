// Renders the landing page in every skin and writes one screenshot each, plus a labelled sheet.
// Run: node tools/preview-skins.mjs [baseUrl] [outDir]
import { chromium } from '../node_modules/playwright-core/index.mjs';
import { SKINS } from './skins.js';
const BASE = process.argv[2] || 'http://127.0.0.1:8766/';
const OUT = process.argv[3] || '/tmp/skins';
import fs from 'fs';
fs.mkdirSync(OUT, { recursive: true });
const b = await chromium.launch({ executablePath: process.env.CHROME });
for (const skin of SKINS) {
  const p = await b.newPage({ viewport: { width: 1200, height: 860 }, colorScheme: 'light' });
  await p.goto(BASE); await p.waitForTimeout(900);
  await p.addStyleTag({ content: ':root{' + Object.entries(skin.vars).map(([k, v]) => `--${k}:${v}`).join(';') + '}' });
  await p.evaluate(() => { document.documentElement.dataset.theme = 'light'; });
  await p.waitForTimeout(300);
  await p.screenshot({ path: `${OUT}/${skin.id}-top.png` });
  await p.evaluate(() => document.getElementById('prices').scrollIntoView());
  await p.waitForTimeout(250);
  await p.screenshot({ path: `${OUT}/${skin.id}-prices.png` });
  await p.close();
  console.log('rendered', skin.name);
}
await b.close();
