// Reads a checked file back in: tools/review-load.mjs docs/translations/ga.md
// Only the right-hand column is used, and only for keys we already have, so a stray edit to the
// English side cannot invent a new string.
import fs from 'fs';
import path from 'path';
const ROOT = path.join(import.meta.dirname, '..');
const file = process.argv[2];
if (!file) { console.error('which file?'); process.exit(1); }
const lang = path.basename(file, '.md');
const words = path.join(ROOT, 'site-src', 'words');
const page = JSON.parse(fs.readFileSync(path.join(words, `${lang}.json`), 'utf8'));
const game = JSON.parse(fs.readFileSync(path.join(words, `game-${lang}.json`), 'utf8'));
let changed = 0, unknown = 0;
for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
  const m = line.match(/^\|(.+?)\|(.+?)\|$/);
  if (!m) continue;
  const en = m[1].trim().replace(/\\\|/g, '|'), to = m[2].trim().replace(/\\\|/g, '|');
  if (en === 'English' || /^-+$/.test(en)) continue;
  const target = page[en] !== undefined ? page : game[en] !== undefined ? game : null;
  if (!target) { unknown++; continue; }
  if (target[en] !== to) { target[en] = to; changed++; }
}
fs.writeFileSync(path.join(words, `${lang}.json`), JSON.stringify(page, null, 1) + '\n');
fs.writeFileSync(path.join(words, `game-${lang}.json`), JSON.stringify(game, null, 1) + '\n');
console.log(`${lang}: ${changed} changed, ${unknown} lines skipped (no matching English). Now run: node tools/build.mjs`);
