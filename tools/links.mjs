// Every local link on every built page, checked against the files on disk. The site has six
// languages and one English-only page, so a link that is right in English can 404 in Irish.
//   node tools/build.mjs && node tools/links.mjs
import fs from 'node:fs'; import path from 'node:path';
const SITE = path.resolve(import.meta.dirname, '..', 'site');
const pages = [];
(function walk(d){ for (const f of fs.readdirSync(d)) { const p = path.join(d,f); if (fs.statSync(p).isDirectory()) walk(p); else if (f.endsWith('.html')) pages.push(p); } })(SITE);
let bad = 0, n = 0;
for (const p of pages) {
  const html = fs.readFileSync(p,'utf8');
  for (const m of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const u = m[1];
    if (/^(https?:|mailto:|data:|#)/.test(u)) continue;
    n++;
    const clean = u.split('#')[0].split('?')[0]; if (!clean) continue;
    const abs = clean.startsWith('/') ? path.join(SITE, clean) : path.resolve(path.dirname(p), clean);
    const target = abs.endsWith('/') || !path.extname(abs) ? path.join(abs, 'index.html') : abs;
    if (!fs.existsSync(target)) { bad++; console.log('MISSING', path.relative(SITE,p), '->', u); }
  }
}
console.log(pages.length + ' pages, ' + n + ' local links, ' + bad + ' broken');
