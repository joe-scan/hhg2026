// Builds the translated pages. The English pages in site/ are the source of truth: write them
// normally, run this, and every language is regenerated. A language is one file of
// English -> translated pairs in site-src/words/<lang>.json, so nothing is duplicated by hand.
//
//   node tools/build.mjs            build every language in LANGS
//   node tools/build.mjs es         build one
//
// Output: site/<lang>/index.html, site/<lang>/privacy/index.html and so on, plus the hreflang
// tags and the language picker links on every page, English included.
import fs from 'fs';
import path from 'path';
import { JS_FILES, literals } from './strings.mjs';

const ROOT = path.join(import.meta.dirname, '..');
const SRC = path.join(ROOT, 'site-src', 'pages');
const SITE = path.join(ROOT, 'site');
const WORDS = path.join(ROOT, 'site-src', 'words');

// The pages, as paths inside site-src/pages/. These are the source: never edit site/*.html by
// hand, it is generated. The English build writes straight to site/. Game pages under /g/ are generated per
// order later; only the demo has a hand-written one.
export const PAGES = ['index.html', 'name/index.html', 'halloween/index.html', 'privacy/index.html', 'terms/index.html', 'g/demo/index.html'];
// Pages that stay in English for now. The terms are a legal document and a bad translation of one
// is worse than none; every language links to the English copy until a lawyer has seen it.
export const ENGLISH_ONLY = ['terms/index.html'];
// Only languages that are actually translated. Adding one: write site-src/words/<lang>.json and
// game-<lang>.json (start from game-en.json), add it here, run the build. A half-translated
// language must never ship: a Spanish page leading to an English game is worse than no page.
export const LANGS = ['es', 'de', 'fr', 'it', 'ga'];
export const LANGNAMES = { en: 'English', es: 'Español', de: 'Deutsch', fr: 'Français', it: 'Italiano', ga: 'Gaeilge' };

const read = p => fs.readFileSync(p, 'utf8');
const write = (p, s) => { fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, s); };

// --- the translating bit -----------------------------------------------------------------
// Only text between tags and a short list of attributes are touched, so CSS, script and markup
// are never rewritten by accident. A string with no translation is left in English and counted.
// Attributes people actually read. `content` is handled separately, because the viewport and
// theme-colour tags are not English.
const ATTRS = ['title', 'alt', 'placeholder', 'aria-label', 'data-int', 'data-dark', 'data-light'];
const META_CONTENT = /<meta\s+(?:name="description"|property="og:(?:title|description|image:alt)")/i;
const SKIP_TAGS = /^(script|style)$/i;

function translate(html, dict, missing) {
  const use = s => {
    const key = s.trim();
    if (!key || !/[A-Za-z]{2}/.test(key)) return null;
    if (dict[key] === undefined) { missing.add(key); return null; }
    return s.replace(key, dict[key]);
  };
  let out = '', i = 0, skipUntil = null;
  // translate="no" marks the brand and anything else that stays in English
  while (i < html.length) {
    const lt = html.indexOf('<', i);
    if (lt === -1) { out += (skipUntil ? html.slice(i) : (use(html.slice(i)) ?? html.slice(i))); break; }
    const text = html.slice(i, lt);
    out += skipUntil ? text : (use(text) ?? text);
    const gt = html.indexOf('>', lt);
    if (gt === -1) { out += html.slice(lt); break; }
    let tag = html.slice(lt, gt + 1);
    const name = (tag.match(/^<\/?([a-zA-Z0-9-]+)/) || [])[1] || '';
    if (skipUntil) { if (new RegExp(`^</${skipUntil}`, 'i').test(tag)) skipUntil = null; }
    else if ((SKIP_TAGS.test(name) || /\stranslate="no"/i.test(tag)) && !tag.endsWith('/>') && !tag.startsWith('</')) skipUntil = name;
    else {
      const attrs = META_CONTENT.test(tag) ? [...ATTRS, 'content'] : ATTRS;
      for (const a of attrs) {
        tag = tag.replace(new RegExp(`(\\s${a}=")([^"]*)(")`, 'g'), (m, p1, v, p3) => {
          const t = use(v);
          return t === null ? m : p1 + t + p3;
        });
      }
    }
    out += tag;
    i = gt + 1;
  }
  return out;
}

// --- the game code ------------------------------------------------------------------------
// The English game files are never touched. For a language we write a translated copy of each
// one into site/<lang>/, replacing whole string literals only, so the code itself cannot change.
function translateJs(src, dict, missing) {
  let out = '', last = 0;
  for (const lit of literals(src)) {
    const to = dict[lit.text];
    if (to === undefined) { missing.add(lit.text); continue; }
    out += src.slice(last, lit.start) + "'" + to.replace(/'/g, "\\'") + "'";
    last = lit.end;
  }
  return out + src.slice(last);
}

// --- paths -------------------------------------------------------------------------------
// A translated page sits one folder deeper than its English original, so every relative link
// needs one more step up. Absolute, anchor, mail and external links are left alone.
function reroot(html, up) {
  return html.replace(/\s(href|src)="([^"]+)"/g, (m, attr, url) => {
    if (/^([a-z]+:|\/|#)/i.test(url)) return m;
    // the game code has a translated copy inside the language folder, so those paths stay put
    if (/(^|\/)(arcade\/|builder\.js)/.test(url)) return m;
    return ` ${attr}="${up}${url}"`;
  });
}

// Where this page's other languages live, as seen from where this page sits. A translated page
// is one folder deeper than the English one, which is the step that was missing.
function siblings(pagePath, lang) {
  const depth = pagePath.split('/').length - 1 + (lang === 'en' ? 0 : 1);
  const up = '../'.repeat(depth) || './';
  return l => (l === 'en' ? `${up}${pagePath}` : `${up}${l}/${pagePath}`).replace(/index\.html$/, '');
}

function hreflangs(pagePath, lang) {
  const href = siblings(pagePath, lang);
  const tags = ['en', ...LANGS].map(l => `<link rel="alternate" hreflang="${l}" href="${href(l)}">`);
  tags.push(`<link rel="alternate" hreflang="x-default" href="${href('en')}">`);
  return tags.join('\n');
}

// The picker: one small control showing the language you are in, in its own words, which opens
// the short list. No flags (a language is not a country) and no JavaScript.
function picker(pagePath, lang) {
  const href = siblings(pagePath, lang);
  const others = ['en', ...LANGS].filter(l => l !== lang)
    .map(l => `<a href="${href(l)}" hreflang="${l}" lang="${l}">${LANGNAMES[l]}</a>`).join('');
  return `<details class="langs"><summary title="Language" lang="${lang}">${LANGNAMES[lang]}</summary><div>${others}</div></details>`;
}

function build(lang) {
  const dict = lang === 'en' ? {} : JSON.parse(read(path.join(WORDS, lang + '.json')));
  const gameDict = lang === 'en' ? {} : JSON.parse(read(path.join(WORDS, `game-${lang}.json`)));
  const missing = new Set(), missingGame = new Set();
  for (const page of PAGES) {
    if (lang !== 'en' && ENGLISH_ONLY.includes(page)) continue;
    let html = read(path.join(SRC, page));
    if (lang !== 'en') {
      html = translate(html, dict, missing);
      html = reroot(html, '../');
      html = html.replace(/<html lang="[^"]*"/, `<html lang="${lang}"`);
    }
    html = html.replace('<!--hreflang-->', hreflangs(page, lang));
    html = html.replace('<!--langs-->', picker(page, lang));
    const out = lang === 'en' ? path.join(SITE, page) : path.join(SITE, lang, page);
    write(out, html);
  }
  if (lang !== 'en') for (const f of JS_FILES) {
    write(path.join(SITE, lang, f), translateJs(read(path.join(SITE, f)), gameDict, missingGame));
  }
  if (missingGame.size) {
    console.log(`${lang}: ${missingGame.size} game strings with no translation`);
    write(path.join(WORDS, `game-${lang}.missing.json`), JSON.stringify(Object.fromEntries([...missingGame].map(k => [k, ''])), null, 1) + '\n');
  }
  if (missing.size) {
    console.log(`${lang}: ${missing.size} strings with no translation`);
    write(path.join(WORDS, `${lang}.missing.json`), JSON.stringify(Object.fromEntries([...missing].map(k => [k, ''])), null, 2) + '\n');
  } else console.log(`${lang}: complete`);
}

const only = process.argv[2];
for (const lang of ['en', ...LANGS]) if (!only || only === lang) build(lang);
