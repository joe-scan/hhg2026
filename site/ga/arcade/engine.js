'use strict';
// Happy Hero Games engine. Forked from Fionn vs Sean (~/Documents/fs/js/core.js) on 19 Sep 2026.
// Plain <script> files share one global scope, so everything here is visible to the games and flow.js.
// The big change from Fionn vs Sean: every person in the game comes from one family config (see THE FAMILY).

// ===================== SETUP =====================
const W = 480, H = 270, AY = 28;
const cv = document.getElementById('game');
const g = cv.getContext('2d');
g.imageSmoothingEnabled = false;
const FONT = '"Press Start 2P","Courier New",monospace';
try { if (document.fonts && document.fonts.load) document.fonts.load('8px "Press Start 2P"'); } catch (e) {}

const R = Math.random;
const rnd = (a, b) => a + R() * (b - a);
const rint = (a, b) => Math.floor(rnd(a, b + 1));
const clamp = (v, a, b) => v < a ? a : v > b ? b : v;
const pick = a => a[Math.floor(R() * a.length)];
const shuffle = a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(R() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

const COL = { bg: '#12062b', ink: '#0a0416', hot: '#ff2bd6', cyan: '#22e6ff', gold: '#ffd23f', red: '#ff2e4d', white: '#ffffff', green: '#3dff8b', purple: '#7a3cff', dim: '#8f7fc0', off: '#2a1a4a' };
// ===================== THE FAMILY =====================
// Everything personal comes from one config object. The builder writes it into the link (#g=...),
// so nothing is sent to a server. With no link, the game plays the demo family below.
// Player slot 1 is always the hero (the birthday child) and slot 0 is whichever family member they're facing.
// The games were written with small hidden advantages for slot 1, so the hero gets them.
const DEMO = {
  hero: { name: 'AVA', hair: 'ponytail', hairCol: '#6b3f1d', skin: '#f3c6a0', kit: '#1f7ae0' },
  occasion: 'birthday', catchphrase: 'NI CHREIDIM E!', food: 'PIZZA',
  family: [{ role: 'dad', name: '' }],
  pet: { name: 'BISCUIT', col: '#e8c9a0' }
};
// A role's label changes with the reader: Mom and Grandma in North America, Mum and Granny elsewhere.
// `us` is the North American word; everything else in the game is written to work either way.
const ROLES = {
  dad: { label: 'Daidí', adult: 'm', kit: '#2b4a8a', lose: 'LIG ME DUIT BUACHAN.', food: 'CURRY' },
  mum: { label: 'Mamaí', us: 'Mamaí', adult: 'f', kit: '#d81b8c', lose: 'AN CHUID IS FEARR AS TRI?', food: 'SAILEAD' },
  granny: { label: 'Mamó', us: 'Mamó', adult: 'f', kit: '#2e7d4f', lose: 'NACH TU ATA GO HIONTACH!', food: 'ANRAITH', grey: true },
  grandad: { label: 'Daideo', us: 'Daideo', adult: 'm', kit: '#7a5a3a', lose: 'I MO LASE...', food: 'STOBHACH', grey: true },
  auntie: { label: 'Aintín', us: 'Aintín', adult: 'f', kit: '#7a3cff', lose: 'O, TA TU GO MAITH!', food: 'PASTA' },
  uncle: { label: 'Uncail', adult: 'm', kit: '#1e7a34', lose: 'ADH AN TOSAITHEORA!', food: 'BORGAIRE' },
  brother: { label: 'Deartháir', kid: 'straight', kit: '#ff6b1a', lose: 'NI CHOMHAIRTEAR E SIN!', food: 'SCEALLOGA' },
  sister: { label: 'Deirfiúr', kid: 'ponytail', kit: '#22b573', lose: 'NI RAIBH ME REIDH!', food: 'NUDAIL' },
  friend: { label: 'Cara', kid: 'short', kit: '#00a2b3', lose: 'ATHIMIRT AMARACH!', food: 'PIZZA' },
  bestfriend: { label: 'An cara is fearr', kid: 'curly', kit: '#ffd23f', lose: 'CAIRDE FOS?', food: 'UACHTAR REOITE' },
  cousin: { label: 'Col ceathrair', kid: 'long', kit: '#b34bd8', lose: 'FAN GO DTI AN SAMHRADH!', food: 'HOT DOGS' },
  teacher: { label: 'Múinteoir', adult: 'f', kit: '#3a6f5c', lose: 'FAN SIAR TAR EIS AN RANGA!', food: 'CAIFE' },
  coach: { label: 'Traenálaí', adult: 'm', kit: '#c2410c', lose: 'FICHE TIMPEALL, GACH DUINE!', food: 'ORAISTI' }
};
// North American English unless the browser says otherwise. A game can pin it with CFG.dialect.
let DIALECT = 'us';
try { if (/^en-(GB|IE|AU|NZ|ZA|IN)/i.test(navigator.language || '')) DIALECT = 'int'; } catch (e) {}
function roleLabel(role) { const r = ROLES[role]; return !r ? '' : (DIALECT === 'us' && r.us) || r.label; }
const HAIRCOLS = ['#141018', '#3b2412', '#6b3f1d', '#93602f', '#8a3a1a', '#c8641e', '#e0b64a', '#9a96a6'];
const SKINS = ['#f6d1b4', '#f3c6a0', '#d9a577', '#b87a4b', '#8a5634', '#5e3a22'];
const KITCOLS = ['#1f7ae0', '#e0102a', '#1e9e4a', '#ffd23f', '#7a3cff', '#ff6b1a', '#ff2bd6', '#ffffff', '#141018'];
const PETCOLS = ['#ffffff', '#e8c9a0', '#c98a4b', '#6b3f1d', '#2a2230', '#9a96a6'];
const OCCASIONS = { birthday: 'LÁ BREITHE SONA', christmas: 'NOLLAIG SHONA', fathers: 'LÁ NA nAITHREACHA SONA', mothers: 'LÁ NA MÁITHREACHA SONA', star: 'IS REALTA THU' };
// The teaser demo: one game, then a locked card instead of the boss and the ending. The demo page
// sets window.HHG_TEASER; a paid game never does.
const TEASER = (() => { try { return !!window.HHG_TEASER; } catch (e) { return false; } })();
// The other games and the ending, named on the locked card so people see what they are not getting.
const LOCKED = ['CATH NA MAIDI', 'RAS AN DINNEIR', 'CATH AN TSUIOCHAIN CHUIL', 'TRÁTH NA GCEIST', 'AN CATH CEANNASAI', 'AN DEIREADH'];
// Optional question and joke packs for a family who want them (see the quiz). Off by default.
const PACKS = ['ie', 'uk'];

// names: capitals, accents stripped (the pixel font draws capital Í and Ó as lowercase shapes),
// letters, spaces, hyphens and apostrophes only
const cleanName = (s, n) => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase().replace(/[^A-Z '\-!?.,]/g, '').replace(/\s+/g, ' ').trim().slice(0, n);
const oneOf = (v, list, d) => list.includes(v) ? v : d;
function sanitise(c) {
  c = c || {}; const h = c.hero || {};
  const out = {
    hero: { name: cleanName(h.name, 10).replace(/[!?.,]/g, '') || 'LAOCH', hair: oneOf(h.hair, HAIRS, 'short'), hairCol: oneOf(h.hairCol, HAIRCOLS, HAIRCOLS[2]), skin: oneOf(h.skin, SKINS, SKINS[1]), kit: oneOf(h.kit, KITCOLS, KITCOLS[0]) },
    occasion: oneOf(c.occasion, Object.keys(OCCASIONS), 'birthday'),
    packs: (Array.isArray(c.packs) ? c.packs : []).filter(k => PACKS.includes(k)).slice(0, 3),
    catchphrase: cleanName(c.catchphrase, 22), food: cleanName(c.food, 10).replace(/[!?.,']/g, '') || 'PIZZA',
    family: (Array.isArray(c.family) ? c.family : []).slice(0, 8).filter(m => m && ROLES[m.role]).map(m => ({ role: m.role, name: cleanName(m.name, 10).replace(/[!?.,]/g, '') || cleanName(roleLabel(m.role), 10), hairCol: oneOf(m.hairCol, HAIRCOLS, HAIRCOLS[1]) })),
    pet: c.pet && cleanName(c.pet.name, 10) ? { name: cleanName(c.pet.name, 10).replace(/[!?.,]/g, ''), kind: oneOf(c.pet && c.pet.kind, Object.keys(PETKINDS), 'dog'), col: oneOf(c.pet.col, PETCOLS, PETCOLS[0]) } : null
  };
  if (!out.family.length) out.family.push({ role: 'dad', name: 'DAIDI', hairCol: HAIRCOLS[0] });
  return out;
}
// the config travels in the link as base64url JSON
function encodeCfg(c) { return btoa(unescape(encodeURIComponent(JSON.stringify(c)))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); }
function decodeCfg(s) { s = s.replace(/-/g, '+').replace(/_/g, '/'); while (s.length % 4) s += '='; return JSON.parse(decodeURIComponent(escape(atob(s)))); }
function cfgFromLink() { try { const m = location.hash.match(/[#&]g=([A-Za-z0-9_-]+)/); if (m) return decodeCfg(m[1]); } catch (e) {} return DEMO; }

// colour helpers for building palettes
const hexRgb = h => { if (h.length === 4) h = '#' + h[1] + h[1] + h[2] + h[2] + h[3] + h[3]; return [1, 3, 5].map(k => parseInt(h.slice(k, k + 2), 16)); };
const rgbHex = a => '#' + a.map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');
const mix = (h, to, k) => { const a = hexRgb(h), b = hexRgb(to); return rgbHex(a.map((v, i) => v + (b[i] - v) * k)); };
const lum = h => { const [r, g2, b] = hexRgb(h); return (0.299 * r + 0.587 * g2 + 0.114 * b) / 255; };
// a version of a kit colour that reads as text on the dark game screen
const uiCol = h => lum(h) < .35 ? mix(h, '#ffffff', .55) : h;

// the title screen menu
const MENU = ['1 IMREOIR', '2 IMREOIR: IMRIONN DUINE FASTA AN TEAGHLACH', 'MOD COIRME: GACH DUINE SA SEAL'];

// every file in games/ registers itself here, in the order the page loads them
const GAMES = [];
function addGame(name, make) { GAMES.push({ name, make }); }

// ===================== SPRITES =====================
// kids: one of five heads on a body. Heroes get the taller body, younger siblings the shorter one.
const HEADS = {
  curly: ['..Hh.HH.hH..', '.HHHHhHHHHH.', 'HHhHHHHHhHHH', 'HHSSSSSSSSHH', 'HhSESSSSESHH', '.HSSSSSSSSH.', '..SSSMMSSS..', '...SSSSSS...'],
  straight: ['..HHHHHHHH..', '.HHHHHHHHHH.', '.HHHHhHHHHH.', '.HHHHHHHSSH.', '.HSESSSSESH.', '..SSSSSSSS..', '..SSSMMSSS..', '...SSSSSS...'],
  short: ['...hHHHHh...', '..HHHHHHHH..', '.HHHHHHHHHH.', '.HSSSSSSSSH.', '.SSESSSSESS.', '..SSSSSSSS..', '..SSSMMSSS..', '...SSSSSS...'],
  long: ['..HHHHHHHH..', '.HHHHHHHHHH.', 'HHHHhHHHHHHH', 'HHSSSSSSSSHH', 'HHSESSSSESHH', 'HHSSSSSSSSHH', 'HHSSSMMSSSHH', 'HH.SSSSSS.HH'],
  ponytail: ['..HHHHHHHH..', '.HHHHHHHHH.H', '.HHSSSSSSHHH', '.HSESSSSESHH', '..SSSSSSSS.H', '..SSSSSSSS.H', '..SSSMMSSS..', '...SSSSSS...']
};
const HAIRS = Object.keys(HEADS);
const BODY_BIG = ['..TJJJJJJT..', '.JJJJJJJJJJ.', '.JJJJJJJJJJ.', '.SJJJJJJJJS.', '..PPPPPPPP..', '..PPP..PPP..', '..SS....SS..', '..KK....KK..', '..KK....KK..', '.BBB....BBB.'];
const BODY_SMALL = ['..TJJJJJJT..', '.JJJJJJJJJJ.', '.SJJJJJJJJS.', '..PPPPPPPP..', '..PPP..PPP..', '..SS....SS..', '..KK....KK..', '.BBB....BBB.'];
const LEGS_B = ['..PPP..PPP..', '...SS..SS...', '...KK..KK...', '..BBB..BBB..'];
const ADULT_M = ['..DDDDDDDD..', '.DDDDDDDDDD.', '.DDSSSSSSDD.', '.DSESSSSESD.', '..SSSSSSSS..', '..SSSMMSSS..', '...SSSSSS...', '....SSSS....', '..JJJJJJJJ..', '.JJJJJJJJJJ.', '.JJJJJJJJJJ.', '.JJJJJJJJJJ.', '.SJJJJJJJJS.', '..PPPPPPPP..', '..PPPPPPPP..', '..PPP..PPP..', '..PPP..PPP..', '..PPP..PPP..', '..PPP..PPP..', '..PPP..PPP..', '..PPP..PPP..', '.BBB....BBB.'];
const ADULT_F = ['..DDDDDDDD..', '.DDDDDDDDDD.', '.DDSSSSSSDD.', '.DSESSSSESD.', '.DSSSSSSSSD.', '.DDSSMMSSDD.', '.DD.SSSS.DD.', '.DJJJJJJJJD.', '.JJJJJJJJJJ.', '.SJJJJJJJJS.', '..JJJJJJJJ..', '..PPPPPPPP..', '..PPPPPPPP..', '..PPP..PPP..', '..PPP..PPP..', '..PPP..PPP..', '..PPP..PPP..', '..PPP..PPP..', '.BBB....BBB.'];
const GLYPHS = {
  A: ['.#.', '#.#', '###', '#.#', '#.#'], B: ['##.', '#.#', '##.', '#.#', '##.'], C: ['###', '#..', '#..', '#..', '###'], D: ['##.', '#.#', '#.#', '#.#', '##.'],
  E: ['###', '#..', '##.', '#..', '###'], F: ['###', '#..', '##.', '#..', '#..'], G: ['###', '#..', '#.#', '#.#', '###'], H: ['#.#', '#.#', '###', '#.#', '#.#'],
  I: ['###', '.#.', '.#.', '.#.', '###'], J: ['..#', '..#', '..#', '#.#', '###'], K: ['#.#', '#.#', '##.', '#.#', '#.#'], L: ['#..', '#..', '#..', '#..', '###'],
  M: ['#.#', '###', '###', '#.#', '#.#'], N: ['##.', '#.#', '#.#', '#.#', '#.#'], O: ['###', '#.#', '#.#', '#.#', '###'], P: ['###', '#.#', '###', '#..', '#..'],
  Q: ['###', '#.#', '#.#', '###', '..#'], R: ['##.', '#.#', '##.', '#.#', '#.#'], S: ['###', '#..', '###', '..#', '###'], T: ['###', '.#.', '.#.', '.#.', '.#.'],
  U: ['#.#', '#.#', '#.#', '#.#', '###'], V: ['#.#', '#.#', '#.#', '#.#', '.#.'], W: ['#.#', '#.#', '###', '###', '#.#'], X: ['#.#', '#.#', '.#.', '#.#', '#.#'],
  Y: ['#.#', '#.#', '.#.', '.#.', '.#.'], Z: ['###', '..#', '.#.', '#..', '###']
};
function glyph(ch, x, y, u, col) {
  const m = GLYPHS[ch]; if (!m) return; g.fillStyle = col;
  for (let r = 0; r < 5; r++) for (let c = 0; c < 3; c++) if (m[r][c] === '#') g.fillRect(Math.round(x + c * u), Math.round(y + r * u), u, u);
}
function drawMap(rows, pal, x, y, sc, flip) {
  const s = Math.ceil(sc);
  for (let r = 0; r < rows.length; r++) {
    const row = rows[r], n = row.length;
    for (let c = 0; c < n; c++) {
      const ch = row[flip ? n - 1 - c : c];
      if (ch === '.' || !pal[ch]) continue;
      g.fillStyle = pal[ch];
      g.fillRect(Math.round(x + c * sc), Math.round(y + r * sc), s, s);
    }
  }
}
const initial = name => (name.match(/[A-Z]/) || ['?'])[0];
function kidSpec(name, hair, hairCol, skin, kit, small) {
  let rows = HEADS[hair].concat(small ? BODY_SMALL : BODY_BIG);
  if (hair === 'long') { rows = rows.slice(); rows[8] = 'HHTJJJJJJTHH'; rows[9] = 'HJJJJJJJJJJH'; }
  const light = lum(kit) > .7;
  return {
    name, kind: 'kid', rows, rowsB: rows.slice(0, rows.length - 4).concat(LEGS_B), letter: initial(name), jr: [8, small ? 3 : 4],
    pal: { H: hairCol, h: mix(hairCol, '#ffffff', .22), S: skin, E: '#3a2210', M: '#b4514a', B: '#1a1a22', J: kit, T: light ? '#1c1136' : '#ffffff', P: mix(kit, '#000000', .3), K: kit },
    ink: light ? '#1c1136' : '#ffffff', col: uiCol(kit)
  };
}
function adultSpec(name, role, hairCol, skin) {
  const R0 = ROLES[role], f = R0.adult === 'f', rows = f ? ADULT_F : ADULT_M;
  const hair = R0.grey ? '#b9b5c4' : hairCol;
  return {
    name, kind: 'adult', rows, rowsB: rows, letter: initial(name), jr: f ? [7, 4] : [8, 5],
    pal: { D: hair, S: skin, E: '#2a1608', M: '#9c4a40', J: R0.kit, P: '#23233a', B: '#111118' },
    ink: '#ffffff', col: uiCol(R0.kit)
  };
}
// draw any character spec with its feet at (cx, fy). Grown-ups are taller, so on big screens they draw one scale smaller.
function drawSpec(sp, cx, fy, sc, flip, frame) {
  if (!sp) return;
  const s = sp.kind === 'adult' && sc >= 5 ? sc - 1 : sc, rows = (frame & 1) ? sp.rowsB : sp.rows;
  const x = cx - 6 * s, y = fy - rows.length * s;
  if (bigHead && sp.kind === 'kid') {
    const hs = s * 1.7;
    drawMap(rows.slice(8), sp.pal, x, y + 8 * s, s, flip);
    drawMap(rows.slice(0, 8), sp.pal, cx - 6 * hs, y + 8 * s - 8 * hs + s, hs, flip);
  } else drawMap(rows, sp.pal, x, y, s, flip);
  const u = Math.max(1, Math.floor(s / 2));
  glyph(sp.letter, cx - 1.5 * u, y + sp.jr[0] * s + (sp.jr[1] * s - 5 * u) / 2, u, sp.ink);
}
// how tall a character is at a given scale, for hit boxes and plates
const specH = (sp, sc) => sp.rows.length * (sp.kind === 'adult' && sc >= 5 ? sc - 1 : sc);

// the family, built from the config. CHAR[1] is the hero; CHAR[0] is set per game with setOpponent().
let CFG = null, HERO = null, FAM = [], PET = null, OPP = 0;
const CHAR = [null, null];
const PL = [{ name: '', col: COL.cyan }, { name: '', col: COL.gold }];
const SAYNAME = ['', ''], CATCH = ['', ''], SAYCATCH = ['', ''];
const titleCase = s => s.toLowerCase().replace(/(^|[\s'-])([a-z])/g, (m, a, b) => a + b.toUpperCase());
function applyConfig(c) {
  CFG = sanitise(c); const h = CFG.hero;
  HERO = kidSpec(h.name, h.hair, h.hairCol, h.skin, h.kit, false);
  FAM = CFG.family.map(m => {
    const R0 = ROLES[m.role];
    const sp = R0.kid ? kidSpec(m.name, R0.kid, m.hairCol, h.skin, R0.kit, true) : adultSpec(m.name, m.role, m.hairCol, h.skin);
    return Object.assign(sp, { role: m.role, lose: R0.lose, food: R0.food });
  });
  PET = CFG.pet ? Object.assign({ kind: 'dog' }, CFG.pet, { letter: initial(CFG.pet.name) }) : null;
  CHAR[1] = HERO; PL[1].name = HERO.name; PL[1].col = HERO.col;
  SAYNAME[1] = titleCase(h.name); CATCH[1] = CFG.catchphrase || 'NI CHREIDIM E!'; SAYCATCH[1] = titleCase(CATCH[1]);
  setOpponent(0);
}
function setOpponent(k) {
  OPP = k % FAM.length; const sp = FAM[OPP];
  CHAR[0] = sp; PL[0].name = sp.name;
  // keep the two players' colours apart on screen
  PL[0].col = Math.abs(lum(sp.col) - lum(PL[1].col)) < .08 && sp.col !== PL[1].col ? COL.cyan : (sp.col === PL[1].col ? COL.cyan : sp.col);
  SAYNAME[0] = roleLabel(sp.role) || titleCase(sp.name); CATCH[0] = sp.lose; SAYCATCH[0] = titleCase(sp.lose);
}
// a grown-up who isn't the current opponent, for cameo jobs like calling people in for lunch
function helper() { return FAM.find((m, k) => k !== OPP && m.kind === 'adult') || null; }
// the games call boy(i) for the two players and pet() for the pet
function boy(i, cx, fy, sc, flip, frame) { drawSpec(CHAR[i], cx, fy, sc, flip, frame); }
function person(sp, cx, fy, sc, flip, frame) { drawSpec(sp, cx, fy, sc, flip, frame); }

// ---- pets. Five kinds, two frames each: the same 14 by 9 grid, so every game can draw any of them.
// W is the pet's colour, w its shade, E the eye, N the nose. B and b are the fish's bowl and water.
const PETART = {
  dog: [
    ['.WWW..........', 'WWWWW.......W.', 'WEWWWw.....WW.', 'NWWWWwWWWWWW..', '.WWWwwWWWWWWW.', '..wwWWWWWWWWW.', '...WWWWWWWWW..', '...WW....WW...', '...WW....WW...'],
    ['.WWW..........', 'WWWWW......W..', 'WEWWWw.....WW.', 'NWWWWwWWWWWW..', '.WWWwwWWWWWWW.', '..wwWWWWWWWWW.', '...WWWWWWWWW..', '....WW..WW....', '....WW..WW....']
  ],
  cat: [
    ['.W...W.....WW.', '.WWWWW.....W..', 'WEWWWw.....W..', 'NWWWWwWWWWWW..', '.WWWwwWWWWWWW.', '..wwWWWWWWWWW.', '...WWWWWWWWW..', '...WW....WW...', '...WW....WW...'],
    ['.W...W.....W..', '.WWWWW....WW..', 'WEWWWw....W...', 'NWWWWwWWWWWW..', '.WWWwwWWWWWWW.', '..wwWWWWWWWWW.', '...WWWWWWWWW..', '....WW..WW....', '....WW..WW....']
  ],
  rabbit: [
    ['.W..W.........', '.W..W.........', '.WWWW.........', 'WEWWWwWWWWW...', 'NWWWWwWWWWWWw.', '.wwWWWWWWWWWW.', '...WWWWWWWWW..', '...WW....WW...', '...WW....WW...'],
    ['.W..W.........', '.W..W.........', '.WWWW.........', 'WEWWWwWWWWW...', 'NWWWWwWWWWWWw.', '.wwWWWWWWWWWW.', '...WWWWWWWWW..', '....WW..WW....', '....WW..WW....']
  ],
  hamster: [
    ['..............', '..............', '...WW....WW...', '..WWWWWWWWWW..', '.WEWWWWWWWWWw.', '.NWWWwwWWWWWw.', '..WWWWWWWWWW..', '...WW....WW...', '...WW....WW...'],
    ['..............', '..............', '...WW....WW...', '..WWWWWWWWWW..', '.WEWWWWWWWWWw.', '.NWWWwwWWWWWw.', '..WWWWWWWWWW..', '....WW..WW....', '....WW..WW....']
  ],
  fish: [
    ['..............', '...BbbbbbbB...', '..BbbbbbbbbB..', '..BbWWWwbbbB..', '..BWEWWWWWwB..', '..BbWWWwbbbB..', '..BbbbbbbbbB..', '...BBBBBBBB...', '....BBBBBB....'],
    ['..............', '...BbbbbbbB...', '..BbbbbbbbbB..', '..BbbWWWwbbB..', '..BbWEWWWWWB..', '..BbbWWWwbbB..', '..BbbbbbbbbB..', '...BBBBBBBB...', '....BBBBBB....']
  ]
};
// A fish stays in its bowl, so it never referees, fetches or blocks a balloon. Everyone else runs.
const PETKINDS = { dog: { label: 'Madra', mobile: true }, cat: { label: 'Cat', mobile: true }, rabbit: { label: 'Coinín', mobile: true }, hamster: { label: 'Hamstar', mobile: true }, fish: { label: 'Iasc', mobile: false } };
function pet(cx, fy, sc, faceRight, frame) {
  if (!PET) return;
  const art = PETART[PET.kind] || PETART.dog, rows = art[frame & 1], x = cx - 7 * sc, y = fy - rows.length * sc;
  const pal = { W: PET.col, w: mix(PET.col, lum(PET.col) > .5 ? '#6b5aa8' : '#ffffff', .25), E: '#1a1020', N: '#1a1020', B: '#9fd8ea', b: 'rgba(90,190,225,.45)' };
  drawMap(rows, pal, x, y, sc, faceRight);
  if (PET.kind === 'fish') return;
  // the collar and name tag
  const kx = Math.round(x + (faceRight ? 8 : 5) * sc), ky = Math.round(y + 3 * sc), mid2 = kx + sc / 2, top = ky + 3 * sc - 1;
  rect(kx, ky, sc, 3 * sc, '#e0102a');
  if (sc >= 3) { const tx = Math.round(mid2 - 3.5); rect(tx + 1, top, 5, 9, '#ffd23f'); rect(tx, top + 1, 7, 7, '#ffd23f'); glyph(PET.letter, tx + 2, top + 2, 1, '#a3001f'); }
  else rect(Math.round(mid2 - 1.5), top, 3, 3, '#ffd23f');
}
// true when the pet can leave its spot: everything except the fish
const petRuns = () => !!PET && PET.kind !== 'fish';

// ===================== SAVED STATS =====================
let stats = { w: [0, 0], boss: 0, best: 0 };
try { const raw = localStorage.getItem('hhg1'); if (raw) stats = Object.assign(stats, JSON.parse(raw)); } catch (e) {}
function save() { try { localStorage.setItem('hhg1', JSON.stringify(stats)); } catch (e) {} }

// ===================== AUDIO =====================
let AC = null, master = null, muted = false, noiseBuf = null;
function audioInit() {
  try {
    if (!AC) {
      const A = window.AudioContext || window.webkitAudioContext;
      if (!A) return;
      AC = new A(); master = AC.createGain(); master.gain.value = 0.5; master.connect(AC.destination);
      noiseBuf = AC.createBuffer(1, AC.sampleRate * 0.5, AC.sampleRate);
      const d = noiseBuf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = R() * 2 - 1;
    }
    if (AC.state === 'suspended') AC.resume();
  } catch (e) { AC = null; }
}
function tone(f, d, type, vol, slide, delay) {
  if (!AC || muted) return;
  try {
    const t = AC.currentTime + (delay || 0), o = AC.createOscillator(), v = AC.createGain();
    o.type = type || 'square'; o.frequency.setValueAtTime(f, t);
    if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(30, f + slide), t + d);
    v.gain.setValueAtTime(vol || 0.15, t); v.gain.exponentialRampToValueAtTime(0.001, t + d);
    o.connect(v); v.connect(master); o.start(t); o.stop(t + d + 0.02);
  } catch (e) {}
}
function noise(d, vol, delay) {
  if (!AC || muted || !noiseBuf) return;
  try {
    const t = AC.currentTime + (delay || 0), s = AC.createBufferSource(), v = AC.createGain();
    s.buffer = noiseBuf; v.gain.setValueAtTime(vol || 0.2, t); v.gain.exponentialRampToValueAtTime(0.001, t + d);
    s.connect(v); v.connect(master); s.start(t); s.stop(t + d + 0.02);
  } catch (e) {}
}
const sfx = {
  coin() { tone(988, .08, 'square', .18); tone(1319, .4, 'square', .18, 0, .08); },
  tick() { tone(520, .03, 'square', .08); },
  blip() { tone(740, .05, 'square', .12); },
  wall() { tone(300, .04, 'square', .1); },
  pong() { tone(480, .06, 'square', .16); },
  score() { tone(523, .1, 'square', .16); tone(659, .1, 'square', .16, 0, .1); tone(784, .22, 'square', .16, 0, .2); },
  kick() { tone(180, .08, 'triangle', .3, -90); noise(.04, .1); },
  woof() { tone(320, .07, 'sawtooth', .2, -120); tone(260, .1, 'sawtooth', .2, -120, .1); },
  buzz() { tone(90, .3, 'sawtooth', .22); },
  power() { [523, 659, 784, 1047].forEach((f, i) => tone(f, .09, 'square', .14, 0, i * .06)); },
  shoot() { tone(900, .07, 'square', .05, -500); },
  hit() { tone(200, .04, 'square', .07); },
  hurt() { tone(160, .3, 'sawtooth', .25, -100); noise(.15, .2); },
  blast() { tone(110, 1.1, 'sawtooth', .3, 900); noise(1, .25); },
  boom() { noise(.9, .4); tone(80, .9, 'sawtooth', .3, -40); },
  throwIt() { tone(700, .12, 'triangle', .1, -400); },
  count() { tone(440, .12, 'square', .16); },
  go() { tone(880, .4, 'square', .18); },
  siren() { tone(440, .35, 'sawtooth', .16, 400); tone(840, .35, 'sawtooth', .16, -400, .35); },
  clap() { noise(.08, .35); tone(1200, .08, 'square', .12); },
  note(i, f) { if (i === 0) { tone(f, .35, 'triangle', .3); tone(f * 2, .15, 'sine', .08); } else { tone(f, .25, 'sawtooth', .12); tone(f * 1.005, .25, 'square', .06); } }
};
function say(t) {
  try {
    if (muted || !window.speechSynthesis || !window.SpeechSynthesisUtterance) return;
    const u = new SpeechSynthesisUtterance(t); u.pitch = 0.4; u.rate = 0.95; u.volume = 0.9;
    speechSynthesis.cancel(); speechSynthesis.speak(u);
  } catch (e) {}
}
// tiny step sequencer for the chiptune loop
const mus = { mode: 'off', step: 0, t: 0, fast: false };
const SONGS = {
  title: { tempo: 9, bass: [110, 110, 87.31, 87.31, 130.81, 130.81, 98, 98], arp: [[220, 261.63, 329.63], [220, 261.63, 329.63], [174.61, 220, 261.63], [174.61, 220, 261.63], [261.63, 329.63, 392], [261.63, 329.63, 392], [196, 246.94, 293.66], [196, 246.94, 293.66]] },
  match: { tempo: 7, bass: [146.83, 146.83, 110, 110, 123.47, 123.47, 98, 110], arp: [[293.66, 369.99, 440], [293.66, 369.99, 440], [220, 277.18, 329.63], [220, 277.18, 329.63], [246.94, 293.66, 369.99], [246.94, 293.66, 369.99], [196, 246.94, 293.66], [220, 277.18, 329.63]] },
  boss: { tempo: 6, bass: [82.41, 82.41, 87.31, 82.41, 98, 87.31, 82.41, 73.42], arp: [[164.81, 196, 246.94], [164.81, 196, 246.94], [174.61, 207.65, 261.63], [164.81, 196, 246.94], [196, 233.08, 293.66], [174.61, 207.65, 261.63], [164.81, 196, 246.94], [146.83, 174.61, 220]] }
};
function musicTick() {
  if (mus.mode === 'off' || !AC || muted) return;
  const sg = SONGS[mus.mode], tempo = mus.fast ? sg.tempo - 2 : sg.tempo;
  if (++mus.t < tempo) return;
  mus.t = 0;
  const st = mus.step++, bar = Math.floor(st / 8) % sg.bass.length, ch = sg.arp[bar];
  if (st % 2 === 0) tone(sg.bass[bar], .13, 'triangle', .2);
  tone(ch[st % 3] * (st % 8 >= 4 ? 2 : 1), .07, 'square', .035);
  if (st % 4 === 2) noise(.03, .06);
}

// ===================== INPUT =====================
const KEYMAP = [
  { u: ['KeyW'], d: ['KeyS'], l: ['KeyA'], r: ['KeyD'], a: ['Space'] },
  { u: ['ArrowUp'], d: ['ArrowDown'], l: ['ArrowLeft'], r: ['ArrowRight'], a: ['Enter', 'NumpadEnter'] }
];
const GAMEKEYS = new Set(['KeyW', 'KeyS', 'KeyA', 'KeyD', 'Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter', 'NumpadEnter']);
const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
let held = {}, latched = {}, clicked = false, kpos = 0, bigHead = false;
// where the screen was last clicked or tapped, in game pixels; menus use it to pick rows
let tapAt = null;
const padNow = [{}, {}], padLatch = [{}, {}], touchNow = [{}, {}], touchLatch = [{}, {}];
let touchMode = false;
const DK = ['u', 'd', 'l', 'r', 'a'];

window.addEventListener('keydown', e => {
  // leave typing in the builder's form alone
  if (e.target && /^(INPUT|SELECT|TEXTAREA)$/.test(e.target.tagName)) return;
  // only the game page swallows arrow keys and space; the landing page still scrolls
  if (GAMEKEYS.has(e.code) && document.body.dataset.game) e.preventDefault();
  if (e.repeat) return;
  audioInit();
  held[e.code] = true; latched[e.code] = true;
  if (e.code === 'KeyM') toggleMute();
  if (e.code === 'Escape') goHome();
  kpos = (e.code === KONAMI[kpos]) ? kpos + 1 : (e.code === KONAMI[0] ? 1 : 0);
  if (kpos === KONAMI.length) { kpos = 0; bigHead = !bigHead; sfx.power(); floatText(bigHead ? 'MOD AN CHINN MHOIR!' : 'CINN GHNATHA', W / 2, 120, COL.green, 16); }
});
window.addEventListener('keyup', e => { held[e.code] = false; });
window.addEventListener('blur', () => { held = {}; });
cv.addEventListener('pointerdown', e => { audioInit(); clicked = true; const r = cv.getBoundingClientRect(); tapAt = { x: (e.clientX - r.left) * W / r.width, y: (e.clientY - r.top) * H / r.height }; try { cv.focus(); } catch (e) {} });

function syncButtons() {
  const b = document.getElementById('btn-mute');
  if (b) { b.setAttribute('aria-pressed', muted ? 'true' : 'false'); b.textContent = muted ? 'Fuaim: as' : 'Fuaim: ar siúl'; }
}
function toggleMute() { muted = !muted; if (muted) { try { speechSynthesis.cancel(); } catch (x) {} } syncButtons(); }
// back to the game's title screen from anywhere: abandons the match in progress
function goHome() { shake = 0; try { speechSynthesis.cancel(); } catch (e) {} go('title'); }
for (const [id, fn] of [['btn-home-pad', goHome], ['btn-mute', toggleMute]]) {
  const b = document.getElementById(id); if (b) b.addEventListener('click', () => { audioInit(); fn(); try { cv.focus(); } catch (e) {} });
}

// on-screen pads for phones and tablets: every button has data-p (0 Fionn, 1 Sean) and data-k (u d l r a)
function showTouch() { if (touchMode) return; touchMode = true; document.body.classList.add('touch'); }
window.addEventListener('touchstart', showTouch, { passive: true, once: true });
try { if (window.matchMedia && matchMedia('(pointer: coarse)').matches) showTouch(); } catch (e) {}
document.querySelectorAll('.tpad [data-k]').forEach(el => {
  const i = +el.dataset.p, k = el.dataset.k;
  const down = e => { e.preventDefault(); audioInit(); showTouch(); touchNow[i][k] = true; touchLatch[i][k] = true; el.classList.add('on'); try { el.setPointerCapture(e.pointerId); } catch (x) {} };
  const up = () => { touchNow[i][k] = false; el.classList.remove('on'); };
  el.addEventListener('pointerdown', down);
  for (const ev of ['pointerup', 'pointercancel', 'lostpointercapture']) el.addEventListener(ev, up);
  el.addEventListener('contextmenu', e => e.preventDefault());
});

function pollPads() {
  let ps = [];
  try { ps = navigator.getGamepads ? navigator.getGamepads() : []; } catch (e) { ps = []; }
  for (let i = 0; i < 2; i++) {
    const p = ps && ps[i], n = {};
    if (p) {
      const ax = p.axes || [], b = p.buttons || [], bp = k => !!(b[k] && b[k].pressed);
      n.l = ax[0] < -0.5 || bp(14); n.r = ax[0] > 0.5 || bp(15); n.u = ax[1] < -0.5 || bp(12); n.d = ax[1] > 0.5 || bp(13);
      n.a = bp(0) || bp(1) || bp(2) || bp(3);
    }
    for (const k of DK) if (n[k] && !padNow[i][k]) padLatch[i][k] = true;
    padNow[i] = n;
  }
}
function human(i) {
  const m = KEYMAP[i], o = {};
  for (const k of DK) {
    let h = !!(padNow[i][k] || touchNow[i][k]), p = !!(padLatch[i][k] || touchLatch[i][k]);
    for (const c of m[k]) { if (held[c]) h = true; if (latched[c]) p = true; }
    o[k] = h; o[k + 'P'] = p;
  }
  return o;
}
function anyIn() {
  const a = human(0), b = human(1), o = {};
  for (const k in a) o[k] = a[k] || b[k];
  return o;
}
let cpu = -1, cpuIn = null, demo = false;
const EMPTY = {};
// the one input call the games use: i = 0 Fionn, 1 Sean
function inp(i) {
  if (demo && game && game.ai) return game.ai(i);
  if (i === cpu) return cpuIn || EMPTY;
  return cpu >= 0 ? anyIn() : human(i);
}
function clearLatches() { tapAt = null; latched = {}; padLatch[0] = {}; padLatch[1] = {}; touchLatch[0] = {}; touchLatch[1] = {}; clicked = false; }

// ===================== DRAW HELPERS =====================
function rect(x, y, w, h, c) { g.fillStyle = c; g.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h)); }
function txt(s, x, y, size, col, al, glow) {
  g.font = size + 'px ' + FONT; g.textAlign = al || 'left'; g.textBaseline = 'top';
  if (glow) { g.shadowColor = glow === true ? col : glow; g.shadowBlur = 8; }
  g.fillStyle = col; g.fillText(s, Math.round(x), Math.round(y)); g.shadowBlur = 0;
}
function logo(s, x, y, size, c1, c2, c3) {
  g.font = size + 'px ' + FONT; g.textAlign = 'center'; g.textBaseline = 'top';
  g.fillStyle = '#1a0533'; g.fillText(s, x + 3, y + 3);
  const gr = g.createLinearGradient(0, y, 0, y + size);
  gr.addColorStop(0, c1); gr.addColorStop(.5, c2); gr.addColorStop(.52, c3); gr.addColorStop(1, c2);
  g.shadowColor = c2; g.shadowBlur = 10; g.fillStyle = gr; g.fillText(s, x, y); g.shadowBlur = 0;
}
function wrap(s, n) {
  const out = []; let line = '';
  for (const w of s.split(' ')) { const t = (line + ' ' + w).trim(); if (t.length > n && line) { out.push(line); line = w; } else line = t; }
  if (line) out.push(line);
  return out;
}
function bubble(s, cx, y, n) {
  const lines = wrap(s, n || 22), w = Math.max.apply(null, lines.map(l => l.length)) * 8 + 12, h = lines.length * 10 + 8, x = clamp(cx - w / 2, 2, W - w - 2);
  rect(x, y, w, h, '#ffffff'); rect(clamp(cx - 3, x + 2, x + w - 8), y + h, 6, 4, '#ffffff');
  lines.forEach((l, k) => txt(l, x + 6, y + 5 + k * 10, 8, '#0a0416'));
}
function arrow(d, cx, cy, r, col) {
  g.save(); g.translate(cx, cy); g.rotate({ u: 0, r: Math.PI / 2, d: Math.PI, l: -Math.PI / 2 }[d]);
  g.fillStyle = col; g.beginPath();
  g.moveTo(0, -r); g.lineTo(r, 0); g.lineTo(r * .4, 0); g.lineTo(r * .4, r); g.lineTo(-r * .4, r); g.lineTo(-r * .4, 0); g.lineTo(-r, 0);
  g.closePath(); g.fill(); g.restore();
}
function heart(x, y, c) { rect(x + 1, y, 2, 1, c); rect(x + 5, y, 2, 1, c); rect(x, y + 1, 8, 3, c); rect(x + 1, y + 4, 6, 1, c); rect(x + 2, y + 5, 4, 1, c); rect(x + 3, y + 6, 2, 1, c); }
function flag(type, x, y) {
  x = Math.round(x); y = Math.round(y);
  rect(x - 1, y - 1, 18, 12, '#0a0416');
  if (type === 0) { rect(x, y, 6, 10, '#0a7a3c'); rect(x + 6, y, 10, 10, '#d8202a'); rect(x + 4, y + 3, 4, 4, '#ffd23f'); }
  else if (type === 1) { rect(x, y, 16, 10, '#c8102e'); rect(x, y + 3, 16, 4, '#ffc400'); }
  else if (type === 2) { rect(x, y, 5, 10, '#1f3fa8'); rect(x + 5, y, 6, 10, '#ffffff'); rect(x + 11, y, 5, 10, '#e1242f'); }
  else if (type === 3) { rect(x, y, 5, 10, '#169b62'); rect(x + 5, y, 6, 10, '#ffffff'); rect(x + 11, y, 5, 10, '#ff883e'); }
  else { rect(x, y, 5, 10, '#009246'); rect(x + 5, y, 6, 10, '#ffffff'); rect(x + 11, y, 5, 10, '#ce2b37'); }
}
const FLAGNAMES = ['PORTUGAL', 'AN SPAINN', 'AN FHRAINC', 'EIRE', 'AN IODAIL'];
// Calm mode: the reader asked their browser for less motion, so the stars stop twinkling, the
// screen never shakes and there is half as much confetti. Nothing about the game changes.
let CALM = false;
try { CALM = matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
const STARS = []; for (let i = 0; i < 70; i++) STARS.push({ x: rint(0, W), y: rint(0, H), p: R() * 3 });
function stars(t, maxY) { for (const s of STARS) if (s.y < maxY) rect(s.x, s.y, 1, 1, CALM ? '#b9aee0' : ((t / 25 + s.p) % 3 < 2 ? '#e8e4f6' : '#6b5aa8')); }
function bgSynth(t) {
  const gr = g.createLinearGradient(0, 0, 0, 170);
  gr.addColorStop(0, '#0a0420'); gr.addColorStop(.55, '#26093f'); gr.addColorStop(1, '#8e2472');
  g.fillStyle = gr; g.fillRect(0, 0, W, 170);
  stars(t, 110);
  const sg = g.createLinearGradient(0, 70, 0, 170); sg.addColorStop(0, '#f2cf62'); sg.addColorStop(1, '#d9476f');
  g.fillStyle = sg; g.beginPath(); g.arc(240, 122, 52, 0, Math.PI * 2); g.fill();
  for (let k = 0; k < 5; k++) rect(186, 128 + k * 9, 108, 1 + k, '#5a1070');
  rect(0, 170, W, 100, '#0d0221'); rect(0, 170, W, 1, '#1d9fb4');
  g.strokeStyle = 'rgba(255,43,214,.34)'; g.lineWidth = 1; g.beginPath();
  for (let k = -14; k <= 14; k++) { g.moveTo(240 + k * 8, 170); g.lineTo(240 + k * 70, 270); }
  const ph = (t % 30) / 30;
  for (let i = 0; i < 9; i++) { const z = (i + ph) / 9, y = 170 + 100 * z * z; g.moveTo(0, y); g.lineTo(W, y); }
  g.stroke();
}
function shadow(x, y, w) { g.fillStyle = 'rgba(0,0,0,.3)'; g.beginPath(); g.ellipse(x, y, w, w * .35, 0, 0, Math.PI * 2); g.fill(); }

// particles + floating text
let parts = [], floats = [], shake = 0;
function burst(x, y, n, cols, sp) { if (CALM) n = Math.ceil(n / 2); for (let i = 0; i < n; i++) { const a = R() * 6.283, v = rnd(.5, sp || 3); parts.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 1, life: rint(25, 60), col: pick(cols), s: rint(1, 3), gr: .06 }); } }
function confetti(n, cols) { if (CALM) n = Math.ceil(n / 2); for (let i = 0; i < n; i++) parts.push({ x: rnd(0, W), y: rnd(-H, 0), vx: rnd(-.4, .4), vy: rnd(.8, 2), life: 400, col: pick(cols), s: rint(2, 3), gr: 0 }); }
function floatText(s, x, y, col, size) { floats.push({ s, x, y, col, size: size || 8, life: 70 }); }
function fxTick() {
  for (const p of parts) { p.x += p.vx; p.y += p.vy; p.vy += p.gr; p.life--; }
  parts = parts.filter(p => p.life > 0 && p.y < H + 10);
  for (const f of floats) { f.y -= .4; f.life--; }
  floats = floats.filter(f => f.life > 0);
  if (CALM) shake = 0; else { if (shake > 0) shake *= .85; if (shake < .3) shake = 0; }
}
function fxDraw() {
  for (const p of parts) rect(p.x, p.y, p.s, p.s, p.col);
  for (const f of floats) { txt(f.s, f.x + 1, f.y + 1, f.size, '#0a0416', 'center'); txt(f.s, f.x, f.y, f.size, f.col, 'center', true); }
}

// ===================== CHEERS =====================
// encouraging call-outs when someone scores. Streaks reset at the start of each game.
const CHEER = {
  nice: ['MAITH THU!', 'AR FHEABHAS!', 'URCHAR IONTACH!', 'GO HALAINN!', 'DIREACH E!', 'LEAN ORT!'],
  hot: ['TA TU TRI THINE!', 'DOSTOPTHA!', 'AR MUIN NA MUICE!', 'TE DEARG!'],
  back: ['COMHSCOR!', 'FILLEADH!', 'AR AIS ANN!', 'TOSAIONN SE!']
};
let streak = [0, 0];
// a score freezes the action for a few ticks and flashes the scorer's colour
let freeze = 0, flashT = 0, flashC = '#fff';
function punch(col) { freeze = 5; flashT = CALM ? 3 : 9; flashC = col; }
function cheerReset() { streak = [0, 0]; }
// call after pts[i] has gone up. words: the game's own lines for an ordinary score
function cheer(i, x, y, pts, words) {
  streak[i]++; streak[1 - i] = 0;
  const s = streak[i] >= 2 ? pick(CHEER.hot) : (pts && pts[i] === pts[1 - i]) ? pick(CHEER.back) : pick(words || CHEER.nice);
  floatText(s, x, y, PL[i].col); punch(PL[i].col);
}
