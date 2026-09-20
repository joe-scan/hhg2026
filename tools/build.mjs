// Builds every page. The English pages in site-src/pages are the source of truth: write them
// normally, run this, and site/ is regenerated in every language. A language is one file of
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
const STATIC = path.join(ROOT, 'site-src', 'static');
const PARTS = path.join(ROOT, 'site-src', 'partials');
const SITE = path.join(ROOT, 'site');
const WORDS = path.join(ROOT, 'site-src', 'words');

// The pages, as paths inside site-src/pages/. These are the source: never edit site/*.html by
// hand, it is generated. The English build writes straight to site/. Game pages under /g/ are generated per
// order later; only the demo has a hand-written one.
export const PAGES = ['index.html', 'free/index.html', 'free/christmas/index.html', 'free/halloween/index.html', 'privacy/index.html', 'terms/index.html', 'g/demo/index.html', 'order/index.html', 'order/thanks/index.html', 'gifts/index.html', '404.html'];
// Pages that stay in English for now. The terms are a legal document and a bad translation of one
// is worse than none; every language links to the English copy until a lawyer has seen it.
// Apache serves one file for a missing page anywhere on the site, so the 404 is English only,
// like the terms. Both are left out of the language picker and the sitemap.
export const ENGLISH_ONLY = ['terms/index.html', '404.html', 'gifts/index.html'];
// Only languages that are actually translated. Adding one: write site-src/words/<lang>.json and
// game-<lang>.json (start from game-en.json), add it here, run the build. A half-translated
// language must never ship: a Spanish page leading to an English game is worse than no page.
export const LANGS = ['es', 'de', 'fr', 'it', 'ga'];
export const LANGNAMES = { en: 'English', es: 'Español', de: 'Deutsch', fr: 'Français', it: 'Italiano', ga: 'Gaeilge' };
// What the offer says, in the language being offered. Never in English: the person it is for
// may not read English, and the person who does read English should be able to ignore it.
export const OFFERS = { es: 'Ver en español', de: 'Auf Deutsch ansehen', fr: 'Voir en français',
  it: 'Vedi in italiano', ga: 'Féach as Gaeilge' };
export const DISMISS = { es: 'No, gracias', de: 'Nein, danke', fr: 'Non merci', it: 'No, grazie', ga: 'Níl, go raibh maith agat' };

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
// Only the shared static files live at the site root. Every page, and a translated copy of the
// game code, lives inside the language folder, so those links must stay exactly as written:
// rerooting them is how a Spanish page ended up sending people to the English demo.
const SHARED = /(^|\/)(css|img)\//;
function reroot(html, up) {
  return html.replace(/\s(href|src)="([^"]+)"/g, (m, attr, url) => {
    if (/^([a-z]+:|\/|#)/i.test(url)) return m;
    if (!SHARED.test(url)) return m;
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

// Canonical, hreflang and og:url all need the real address, not a relative one: Google's
// hreflang spec requires fully-qualified URLs, and a preview card needs somewhere to point.
const SITE_URL = 'https://happyherogames.com';
const absolute = (pagePath, lang) =>
  SITE_URL + '/' + (lang === 'en' ? '' : lang + '/') + pagePath.replace(/index\.html$/, '');

function hreflangs(pagePath, lang) {
  const here = absolute(pagePath, lang);
  // An English-only page has no translated versions, so it must not advertise any: a browser
  // that follows one gets a 404.
  const langs = ENGLISH_ONLY.includes(pagePath) ? ['en'] : ['en', ...LANGS];
  const tags = [`<link rel="canonical" href="${here}">`, `<meta property="og:url" content="${here}">`];
  for (const l of langs) tags.push(`<link rel="alternate" hreflang="${l}" href="${absolute(pagePath, l)}">`);
  tags.push(`<link rel="alternate" hreflang="x-default" href="${absolute(pagePath, 'en')}">`);
  return tags.join('\n');
}

// The picker: one small control showing the language you are in, in its own words, which opens
// the short list. No flags: a flag is a country, and Spanish is not Spain's alone. What it has
// instead is a pixel chip with the language's code in it, which is ours and is not boring.
function picker(pagePath, lang) {
  if (ENGLISH_ONLY.includes(pagePath)) return '';   // nothing to pick between
  const href = siblings(pagePath, lang);
  const chip = l => `<b class="lang-chip">${l.toUpperCase()}</b>`;
  const others = ['en', ...LANGS].filter(l => l !== lang)
    .map(l => `<a href="${href(l)}" hreflang="${l}" lang="${l}">${chip(l)}<span>${LANGNAMES[l]}</span></a>`).join('');
  return `<details class="langs"><summary title="Language" lang="${lang}">${chip(lang)}<span>${LANGNAMES[lang]}</span></summary><div>${others}</div></details>`;
}

// What the page is, in the form a search engine reads. Everything in it is lifted out of the
// rendered page, so it cannot drift: the description is the page's own meta description, the
// questions are the page's own questions, in whatever language the page is in. Only the front
// page carries it; the others have nothing to declare.
const strip = h => h.replace(/<[^>]+>/g, '').replace(/&middot;/g, '·').replace(/&amp;/g, '&')
  .replace(/&mdash;/g, '—').replace(/&#\d+;/g, '').replace(/\s+/g, ' ').trim();

function structured(pagePath, lang, html) {
  if (pagePath !== 'index.html') return '';
  const site = SITE_URL, here = absolute(pagePath, lang);
  const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
  const faq = [...html.matchAll(/<details><summary>([\s\S]*?)<\/summary><p>([\s\S]*?)<\/p><\/details>/g)]
    .map(m => ({ '@type': 'Question', name: strip(m[1]), acceptedAnswer: { '@type': 'Answer', text: strip(m[2]) } }));
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Organization', '@id': site + '/#org', name: 'HappyHeroGames', url: site,
        logo: site + '/img/logo.svg', email: 'hello@happyherogames.com',
        address: { '@type': 'PostalAddress', addressCountry: 'IE' } },
      { '@type': 'WebSite', '@id': site + '/#site', url: site, name: 'HappyHeroGames',
        publisher: { '@id': site + '/#org' }, inLanguage: lang },
      { '@type': 'Product', '@id': here + '#product',
        name: 'A personalized video game, made for one person', description: desc,
        image: [site + '/img/og.png', site + '/img/finale.png', site + '/img/poster.png'],
        brand: { '@id': site + '/#org' }, category: 'Personalized gifts',
        offers: { '@type': 'Offer', price: '99.00', priceCurrency: 'USD',
          url: absolute('order/index.html', lang), availability: 'https://schema.org/InStock',
          priceValidUntil: '2027-12-31',
          shippingDetails: { '@type': 'OfferShippingDetails', deliveryTime: { '@type': 'ShippingDeliveryTime',
            handlingTime: { '@type': 'QuantitativeValue', minValue: 1, maxValue: 5, unitCode: 'DAY' } } } } },
      ...(faq.length ? [{ '@type': 'FAQPage', '@id': here + '#faq', mainEntity: faq }] : [])
    ]
  };
  return '<script type="application/ld+json">' + JSON.stringify(data) + '<\/script>';
}

// A visitor whose browser is set to Spanish is offered Spanish, once, and can say no. Nobody is
// redirected: an English speaker in Madrid has a Spanish browser and wants the page they asked for.
function offer(pagePath, lang) {
  if (lang !== 'en' || ENGLISH_ONLY.includes(pagePath)) return '';
  const href = siblings(pagePath, lang);
  const alts = Object.fromEntries(LANGS.map(l => [l, { u: href(l), t: OFFERS[l], n: DISMISS[l] }]));
  return `<div id="lang-offer" hidden data-alt='${JSON.stringify(alts)}'></div>
<script>(function(){var el=document.getElementById('lang-offer');if(!el)return;
try{if(localStorage.getItem('hhg-lang-offer')==='no')return;}catch(e){}
var alt=JSON.parse(el.dataset.alt),code=(navigator.language||'').slice(0,2).toLowerCase(),o=alt[code];if(!o)return;
var a=document.createElement('a');a.href=o.u;a.lang=code;a.textContent=o.t;
var b=document.createElement('button');b.type='button';b.lang=code;b.textContent=o.n;
b.onclick=function(){el.hidden=true;try{localStorage.setItem('hhg-lang-offer','no');}catch(e){}};
el.append(a,b);el.hidden=false;})();<\/script>`;
}

// Search engines get one list of every public page, with the languages pointing at each other,
// and one robots file that keeps them out of /g/, where a family's details live in the address.
function searchFiles() {
  const url = (l, page) => absolute(page, l);
  const today = new Date().toISOString().slice(0, 10);
  const out = ['<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.w3.org/1999/xhtml" xmlns:xhtml="http://www.w3.org/1999/xhtml">'.replace('xmlns="http://www.w3.org/1999/xhtml"', 'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"')];
  // Two pages stay out of it: the demo lives under /g/, which robots.txt disallows, and the
  // terms are marked noindex until a solicitor has read them.
  const OUT = ['g/demo/index.html', 'terms/index.html', '404.html', 'order/thanks/index.html'];
  for (const page of PAGES.filter(p2 => !OUT.includes(p2))) {
    const langs = ENGLISH_ONLY.includes(page) ? ['en'] : ['en', ...LANGS];
    for (const l of langs) {
      out.push('  <url>', `    <loc>${url(l, page)}</loc>`, `    <lastmod>${today}</lastmod>`);
      for (const other of langs) out.push(`    <xhtml:link rel="alternate" hreflang="${other}" href="${url(other, page)}"/>`);
      if (langs.length > 1) out.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${url('en', page)}"/>`);
      out.push(`    <priority>${page === 'index.html' ? '1.0' : '0.7'}</priority>`, '  </url>');
    }
  }
  for (const g of LANDINGS) {
    out.push('  <url>', `    <loc>${SITE_URL}/gifts/${g.slug}/</loc>`, `    <lastmod>${today}</lastmod>`,
      '    <priority>0.6</priority>', '  </url>');
  }
  out.push('</urlset>');
  write(path.join(SITE, 'sitemap.xml'), out.join('\n') + '\n');
  write(path.join(SITE, 'robots.txt'),
    ['# Every game at /g/ carries a family\'s details in its address, so none of them are for search engines.',
     'User-agent: *', 'Disallow: /g/', '', `Sitemap: ${SITE_URL}/sitemap.xml`, ''].join('\n'));
  console.log(`search: sitemap.xml (${out.filter(l => l.includes('<loc>')).length} addresses) and robots.txt`);
}

// The landing pages at /gifts/. Written entries in site-src/landings.json, one shared template,
// and a picture drawn from each page's own example family so no two are the same page with a
// different noun in it. English only: they are written for how people search in the US and the
// UK, and a machine-translated landing page is worse than none. Not in the menu; the hub at
// /gifts/ and the sitemap are how they are found.
const LANDINGS = JSON.parse(read(path.join(ROOT, 'site-src', 'landings.json'))).pages;

function landings(header, footer) {
  const tpl = read(path.join(PARTS, 'landing.html'));
  for (const g of LANDINGS) {
    const cfg = {
      hero: { name: g.hero, hair: 'short', hairCol: '#6b3f1d', skin: '#f3c6a0', kit: '#1f7ae0' },
      occasion: g.occasion, catchphrase: 'NO WAY!', food: 'PIZZA',
      family: g.cast.map(([role, name]) => ({ role, name })),
      pet: { name: g.pet, kind: 'dog', col: '#e8c9a0' }
    };
    const others = LANDINGS.filter(o => o.slug !== g.slug).slice(0, 3)
      .map(o => `<a href="/gifts/${o.slug}/">${o.title.replace(/^A /, '')}</a>`).join(', ');
    // this page's own questions, and where it sits, in the form a search engine reads
    const schema = '<script type="application/ld+json">' + JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'HappyHeroGames', item: SITE_URL + '/' },
          { '@type': 'ListItem', position: 2, name: 'Gift ideas', item: SITE_URL + '/gifts/' },
          { '@type': 'ListItem', position: 3, name: g.title, item: SITE_URL + '/gifts/' + g.slug + '/' }
        ] },
        { '@type': 'FAQPage', mainEntity: g.faq.map(([q, a]) => ({ '@type': 'Question', name: q,
          acceptedAnswer: { '@type': 'Answer', text: a } })) }
      ]
    }) + '<\/script>';
    let html = tpl
      .replace(/\{\{schema\}\}/g, schema)
      .replace(/\{\{playsIntro\}\}/g, g.playsIntro)
      .replace(/\{\{plays\}\}/g, g.plays.map(x => `\n    <li>${x}</li>`).join('') + '\n  ')
      .replace(/\{\{dayTitle\}\}/g, g.dayTitle).replace(/\{\{day\}\}/g, g.day)
      .replace(/\{\{askTitle\}\}/g, g.askTitle).replace(/\{\{ask\}\}/g, g.ask)
      .replace(/\{\{suitsTitle\}\}/g, g.suitsTitle).replace(/\{\{suits\}\}/g, g.suits)
      .replace(/\{\{faq\}\}/g, g.faq.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('\n  '))
      .replace(/\{\{title\}\}/g, g.title)
      .replace(/\{\{description\}\}/g, g.description)
      .replace(/\{\{slug\}\}/g, g.slug)
      .replace(/\{\{h1\}\}/g, g.h1)
      .replace(/\{\{lede\}\}/g, g.lede)
      .replace(/\{\{angle\}\}/g, g.angle)
      .replace(/\{\{alt\}\}/g, `The title screen for this example: ${g.hero} in lights, with their family lined up`)
      .replace(/\{\{body\}\}/g, g.body.map(t2 => `<p>${t2}</p>`).join('\n  '))
      .replace(/\{\{config\}\}/g, JSON.stringify(cfg))
      .replace(/\{\{occasionJson\}\}/g, JSON.stringify(g.occasion))
      .replace('<!--siblings-->', others)
      .replace('<!--header-->', header.replace(/\{\{root\}\}/g, '/'))
      .replace('<!--footer-->', footer.replace(/\{\{root\}\}/g, '/'))
      .replaceAll('<!--langs-->', '');
    write(path.join(SITE, 'gifts', g.slug, 'index.html'), html);
  }
  console.log(`gifts: ${LANDINGS.length} landing pages`);
}

function build(lang) {
  const dict = lang === 'en' ? {} : JSON.parse(read(path.join(WORDS, lang + '.json')));
  const gameDict = lang === 'en' ? {} : JSON.parse(read(path.join(WORDS, `game-${lang}.json`)));
  const missing = new Set(), missingGame = new Set();
  // one header and one footer for every page, with {{root}} pointing back at this language's
  // front page, so every link is the same everywhere and nothing runs together
  const header = read(path.join(PARTS, 'header.html'));
  const footer = read(path.join(PARTS, 'footer.html'));
  for (const page of PAGES) {
    if (lang !== 'en' && ENGLISH_ONLY.includes(page)) continue;
    let html = read(path.join(SRC, page));
    // absolute, so the wordmark always lands on the clean front page and reroot() leaves them be
    const root = lang === 'en' ? '/' : `/${lang}/`;
    html = html.replace('<!--header-->', header.replace(/\{\{root\}\}/g, root))
               .replace('<!--footer-->', footer.replace(/\{\{root\}\}/g, root));
    if (lang !== 'en') {
      html = translate(html, dict, missing);
      html = reroot(html, '../');
      html = html.replace(/<html lang="[^"]*"/, `<html lang="${lang}"`);
    }
    html = html.replace('<!--hreflang-->', hreflangs(page, lang));
    html = html.replaceAll('<!--langs-->', picker(page, lang));
    html = html.replace('<!--offer-->', offer(page, lang));
    html = html.replaceAll('<!--lang-->', lang);
    html = html.replace('<!--schema-->', structured(page, lang, html));
    if (page === 'gifts/index.html') html = html.replace('<!--gift-list-->', LANDINGS.map(g =>
      `\n    <li><h2><a href="${g.slug}/">${g.h1}</a></h2><p>${g.angle}</p></li>`).join('') + '\n  ');
    const out = lang === 'en' ? path.join(SITE, page) : path.join(SITE, lang, page);
    write(out, html);
  }
  if (lang !== 'en') for (const f of JS_FILES) {
    write(path.join(SITE, lang, f), translateJs(read(path.join(STATIC, f)), gameDict, missingGame));
  }
  // A .missing.json lists what still needs translating. It has to be deleted when the gap
  // closes, or it sits there telling the next person a lie: ten of them were left behind on
  // 20 Sep 2026, all of them already translated.
  const gap = (file, set, indent) => {
    const at = path.join(WORDS, file);
    if (set.size) write(at, JSON.stringify(Object.fromEntries([...set].map(k => [k, ''])), null, indent) + '\n');
    else if (fs.existsSync(at)) { fs.unlinkSync(at); console.log(`${lang}: ${file} is no longer needed, deleted`); }
  };
  gap(`game-${lang}.missing.json`, missingGame, 1);
  gap(`${lang}.missing.json`, missing, 2);
  if (lang === 'en') landings(header, footer);
  if (missingGame.size) console.log(`${lang}: ${missingGame.size} game strings with no translation`);
  if (missing.size) console.log(`${lang}: ${missing.size} strings with no translation`);
  if (!missing.size && !missingGame.size) console.log(`${lang}: complete`);
}

// Everything in site/ is generated, so the hand-written files (the game code, the builder, the
// styles, the pictures and the .htaccess rules) are copied in first, and the language builds
// write their translated copies on top.
function copyStatic() {
  fs.cpSync(STATIC, SITE, { recursive: true });
  console.log('static: copied site-src/static into site/');
}

const only = process.argv[2];
copyStatic();
for (const lang of ['en', ...LANGS]) if (!only || only === lang) build(lang);
if (!only) searchFiles();
