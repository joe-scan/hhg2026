// Pulls the strings a player actually sees out of the game code. Comments are stripped first,
// because an apostrophe in a comment would otherwise look like the start of a string.
// Used by tools/build.mjs and to make the list a translator works from.
import fs from 'fs';
import path from 'path';
const ROOT = path.join(import.meta.dirname, '..');
export const JS_FILES = ['arcade/engine.js', 'arcade/scenes.js', 'arcade/flow.js', 'arcade/games/bosses.js',
  'arcade/games/back-seat-battle.js', 'arcade/games/dinner-dash.js', 'arcade/games/paddle-battle.js',
  'arcade/games/table-quiz.js', 'arcade/games/water-balloon-fight.js',
  'arcade/games/trick-or-treat.js', 'arcade/games/sleigh-dash.js', 'arcade/free.js', 'arcade/hero-pick.js', 'builder.js'];

export const stripComments = src => src
  .replace(/\/\*[\s\S]*?\*\//g, m => m.replace(/[^\n]/g, ' '))
  .replace(/(^|[^:\\])\/\/[^\n]*/g, (m, p) => p + m.slice(p.length).replace(/[^\n]/g, ' '));

// a single-quoted literal, apostrophes escaped as \'
const LIT = /'((?:[^'\\\n]|\\.)*)'/g;

// what counts as something a player reads
const SPRITE = /^[.A-Za-z]{8,}$/;              // pixel maps: rows of letters and dots
export function isText(s) {
  if (s.length < 2 || !/[A-Za-z]{2}/.test(s)) return false;
  if (/^#[0-9a-fA-F]{3,8}$/.test(s)) return false;          // colours
  if (/^[a-z][a-zA-Z0-9-]*$/.test(s)) return false;         // config keys and ids
  if (/^(Key|Arrow|Digit|Space|Enter|Escape)/.test(s)) return false;  // key codes
  if (SPRITE.test(s) && !/ /.test(s)) return false;         // sprite rows
  if (/^(source-over|destination-out|center|right|left|NFD|use strict)$/.test(s)) return false;
  if (/^[a-z-]+\.(png|js|json)$/.test(s)) return false;
  if (/^rgba?\(|^\(|^\.|[<>{}\[\];=]|\)\.|\/g,/.test(s)) return false;   // css, selectors, code fragments
  if (/^(image\/png|text\/|utf-8)/.test(s)) return false;
  if (s.includes('"')) return false;
  if (/^[#.]/.test(s) || /^[a-z]+(, ?[a-z]+)+$/.test(s)) return false;   // selectors                              // font stacks
  return true;
}

// The literals in a file, with their positions, comments masked out so an apostrophe in a
// comment cannot look like a string. Both the string list and the build use this.
export function literals(src) {
  const masked = stripComments(src);
  const out = [];
  for (const m of masked.matchAll(LIT)) {
    const raw = m[1], text = raw.replace(/\\'/g, "'");
    if (isText(text)) out.push({ start: m.index, end: m.index + m[0].length, raw, text });
  }
  return out;
}

export function stringsIn(file) {
  return literals(fs.readFileSync(path.join(ROOT, 'site-src', 'static', file), 'utf8')).map(l => l.text);
}

if (process.argv[1] && process.argv[1].endsWith('strings.mjs')) {
  const all = new Map();
  for (const f of JS_FILES) for (const s of stringsIn(f)) all.set(s, (all.get(s) || 0) + 1);
  console.log(`${all.size} strings`);
  fs.writeFileSync(path.join(ROOT, 'site-src/words/game-en.json'),
    JSON.stringify(Object.fromEntries([...all.keys()].map(k => [k, k])), null, 1) + '\n');
}
