// Every visible English sentence on the built site, with its word count and a rough reading
// grade, so copy can be checked with numbers rather than by eye. Long sentences are the ones
// to look at: the grade is noisy on short marketing lines.
//   node tools/build.mjs && node tools/copy.mjs | sort -t$'\t' -k2 -rn | head -30
// Pull the visible English copy out of the built pages, sentence by sentence, with readability.
import fs from 'node:fs'; import path from 'node:path';
const SITE = path.resolve(import.meta.dirname, '..', 'site');
const PAGES = ['index.html', 'free/index.html', 'free/christmas/index.html', 'free/halloween/index.html', 'privacy/index.html', 'terms/index.html'];
const syll = w => { w = w.toLowerCase().replace(/[^a-z]/g,''); if (!w) return 0;
  const m = w.replace(/e$/,'').match(/[aeiouy]+/g); return Math.max(1, m ? m.length : 1); };
const rows = [];
for (const p of PAGES) {
  let html = fs.readFileSync(path.join(SITE, p), 'utf8');
  html = html.replace(/<(script|style)[\s\S]*?<\/\1>/g, ' ').replace(/<!--[\s\S]*?-->/g, ' ');
  const body = html.slice(html.indexOf('<body'));
  const text = body.replace(/<[^>]+>/g, '\n').replace(/&middot;/g,'·').replace(/&#\d+;/g,'').replace(/&amp;/g,'&').replace(/&quot;/g,'"');
  for (const block of text.split('\n').map(s => s.trim()).filter(s => s.length > 12)) {
    for (const sent of block.split(/(?<=[.!?])\s+/)) {
      const s = sent.trim(); if (s.length < 8) continue;
      const words = s.split(/\s+/).filter(w => /[a-z]/i.test(w));
      if (words.length < 2) continue;
      const sy = words.reduce((a, w) => a + syll(w), 0);
      const grade = 0.39 * words.length + 11.8 * (sy / words.length) - 15.59;
      const long = words.filter(w => syll(w) >= 3).length;
      const commas = (s.match(/,/g) || []).length;
      rows.push({ page: p, s, w: words.length, grade: +grade.toFixed(1), long, commas });
    }
  }
}
const seen = new Set();
for (const r of rows) {
  const k = r.page + r.s; if (seen.has(k)) continue; seen.add(k);
  console.log([r.page, r.w, r.grade, r.long, r.commas, r.s].join('\t'));
}
