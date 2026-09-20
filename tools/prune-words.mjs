// Drops translations for English text that no longer appears anywhere, so the word files and the
// review documents stay honest. Run after removing a page or rewriting copy.
import fs from 'fs';
import path from 'path';
import { PAGES, LANGS } from './build.mjs';
import { JS_FILES, stringsIn } from './strings.mjs';

const ROOT = path.join(import.meta.dirname, '..');
const live = new Set();
for (const page of PAGES) {
  const html = fs.readFileSync(path.join(ROOT, 'site-src/pages', page), 'utf8');
  for (const m of html.matchAll(/>([^<>]+)</g)) live.add(m[1].trim());
  for (const m of html.matchAll(/\s(?:title|alt|placeholder|aria-label|content|data-int|data-dark|data-light)="([^"]*)"/g)) live.add(m[1].trim());
}
const liveGame = new Set(JS_FILES.flatMap(f => stringsIn(f)));

for (const lang of LANGS) {
  for (const [file, keep] of [[`${lang}.json`, live], [`game-${lang}.json`, liveGame]]) {
    const p = path.join(ROOT, 'site-src/words', file);
    const d = JSON.parse(fs.readFileSync(p, 'utf8'));
    const before = Object.keys(d).length;
    for (const k of Object.keys(d)) if (!keep.has(k) && !keep.has(k.trim())) delete d[k];
    fs.writeFileSync(p, JSON.stringify(d, null, 1) + '\n');
    console.log(`${file}: ${before} -> ${Object.keys(d).length}`);
  }
}
