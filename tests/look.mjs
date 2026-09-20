// Screenshots of the pages that are easy to break: the shared header and footer, the two free
// pages, a translated page, and the demo at phone width. Nothing is asserted; look at them.
//   CHROME=/path/to/chrome node tests/look.mjs   (serve site/ on 8766 first)
import { chromium } from 'playwright-core';
const b = await chromium.launch({ executablePath: process.env.CHROME });
const O = process.argv[2] || '/tmp/hhg-look/';
import fs from 'node:fs'; fs.mkdirSync(O, { recursive: true });
const errs = [];
for (const [name, url, w, h, full] of [
  ['front', '/', 1280, 900, false],
  ['front-phone', '/', 390, 844, false],
  ['name-es', '/es/name/', 1280, 900, true],
  ['halloween', '/halloween/', 1280, 900, true],
  ['demo', '/g/demo/', 390, 844, true],
]) {
  const p = await b.newPage({ viewport: { width: w, height: h } });
  p.on('pageerror', e => errs.push(name + ': ' + e.message));
  await p.goto('http://127.0.0.1:8766' + url, { waitUntil: 'load' });
  await p.waitForTimeout(900);
  await p.screenshot({ path: O + name + '.png', fullPage: full });
  await p.close();
}
console.log('errors:', errs);
await b.close();
