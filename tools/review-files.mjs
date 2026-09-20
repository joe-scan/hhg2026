// Writes one Markdown file per language for a human checker: English on the left, our translation
// on the right, grouped by where it appears. They edit the right column and send it back;
// tools/review-load.mjs reads it in again.
//   node tools/review-files.mjs            all languages
//   node tools/review-files.mjs ga         one
import fs from 'fs';
import path from 'path';
import { LANGS, LANGNAMES } from './build.mjs';

// how to describe a family that speaks it, which is not always the language's own name
const SPEAKERS = { es: 'Spanish-speaking', de: 'German-speaking', fr: 'French-speaking', it: 'Italian-speaking', ga: 'Irish-speaking' };

const ROOT = path.join(import.meta.dirname, '..');
const WORDS = path.join(ROOT, 'site-src', 'words');
const OUT = path.join(ROOT, 'docs', 'translations');

const esc = s => s.replace(/\|/g, '\\|').replace(/\n/g, ' ');

function groups(dict, gameDict) {
  return [
    ['The page people land on, and the builder', Object.entries(dict).slice(0, 55)],
    ['The rest of the site, including the privacy policy', Object.entries(dict).slice(55)],
    ['What the game says: names, instructions and scores', Object.entries(gameDict).filter(([k]) => /^[A-Z0-9 .,!?:'()-]+$/.test(k) && k.length > 3).slice(0, 120)],
    ['What the family says: taunts, cheers and jokes', Object.entries(gameDict).filter(([k]) => /[a-z]/.test(k) || k.includes('!')).slice(0, 120)],
    ['Everything else in the game, including the quiz', Object.entries(gameDict)]
  ];
}

for (const lang of (process.argv[2] ? [process.argv[2]] : LANGS)) {
  const dict = JSON.parse(fs.readFileSync(path.join(WORDS, `${lang}.json`), 'utf8'));
  const gameDict = JSON.parse(fs.readFileSync(path.join(WORDS, `game-${lang}.json`), 'utf8'));
  const seen = new Set();
  let out = `# ${LANGNAMES[lang]}: please check this translation\n\n`;
  out += `Everything HappyHeroGames says in ${LANGNAMES[lang]}, beside the English it came from. It was translated by an AI and has never been read by a native speaker, which is why you are looking at it.\n\n`;
  out += `**How to help:** change anything in the right-hand column. Leave the left column alone. Send the file back and it goes straight into the site.\n\n`;
  out += `Two things to know. The text inside the game is drawn in a pixel font that has no capital É, Í, Ó, Ö, À or Ç, so those are written without the accent on purpose. Á, Ñ and Ü are fine. And a line that starts or ends with a space joins onto a name, so "GANO " becomes "GANO AVA".\n\n`;
  out += `The jokes matter more than the legal text. If the taunts do not sound like something a real ${SPEAKERS[lang] || ''} family would say, rewrite them completely.\n\n`;
  for (const [title, rows] of groups(dict, gameDict)) {
    const fresh = rows.filter(([k]) => !seen.has(k));
    if (!fresh.length) continue;
    out += `## ${title}\n\n| English | ${LANGNAMES[lang]} |\n|---|---|\n`;
    for (const [k, v] of fresh) { seen.add(k); out += `| ${esc(k)} | ${esc(v)} |\n`; }
    out += '\n';
  }
  fs.mkdirSync(OUT, { recursive: true });
  fs.writeFileSync(path.join(OUT, `${lang}.md`), out);
  console.log(`${lang}: ${seen.size} lines in docs/translations/${lang}.md`);
}
