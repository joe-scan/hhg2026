'use strict';
// ---------- 10. THE FAMILY QUIZ: buzzer quiz, one arrow per answer
// [question, right answer, three wrong ones]. Questions up to 88 characters, answers up to 14.
const QUIZ_GENERAL = [
  ['WIE VIELE SPIELER HAT EIN BASEBALLTEAM?', '9', '7', '10', '11'],
  ['WIE VIELE SPIELER HAT EIN BASKETBALLTEAM?', '5', '6', '7', '4'],
  ['WIE VIELE SPIELER HAT EINE FUSSBALLMANNSCHAFT?', '11', '15', '9', '12'],
  ['WIE LANGE DAUERT EIN FUSSBALLSPIEL?', '90 MINUTEN', '60 MINUTEN', '80 MINUTEN', '100 MINUTEN'],
  ['WIE VIELE TORE SIND EIN HATTRICK?', '3', '2', '4', '5'],
  ['WIE VIELE PUNKTE GIBT EIN TOUCHDOWN?', '6', '3', '7', '5'],
  ['WAS IST DIE HAUPTSTADT DER USA?', 'WASHINGTON', 'NEW YORK', 'BOSTON', 'CHICAGO'],
  ['WAS IST DIE HAUPTSTADT FRANKREICHS?', 'PARIS', 'NIZZA', 'LYON', 'BRUSSELS'],
  ['WAS IST DIE HAUPTSTADT ITALIENS?', 'ROM', 'MAILAND', 'VENEDIG', 'NEAPEL'],
  ['WAS IST DIE HAUPTSTADT SPANIENS?', 'MADRID', 'BARCELONA', 'VALENCIA', 'LISSABON'],
  ['WELCHER US-STAAT IST DER GROESSTE?', 'ALASKA', 'TEXAS', 'CALIFORNIA', 'MONTANA'],
  ['AUS WELCHEM LAND KOMMT LAMBORGHINI?', 'ITALIEN', 'SCHWEDEN', 'DEUTSCHLAND', 'JAPAN'],
  ['IN WELCHEM LAND STEHT DER EIFFELTURM?', 'FRANKREICH', 'ITALIEN', 'SPANIEN', 'BELGIEN'],
  ['WIE VIELE BEINE HAT EINE SPINNE?', '8', '6', '10', '12'],
  ['WAS IST 7 X 8?', '56', '54', '48', '63'],
  ['WAS IST 12 X 12?', '144', '124', '132', '142'],
  ['WAS IST 9 X 6?', '54', '56', '45', '63'],
  ['WIE VIELE SEITEN HAT EIN SECHSECK?', '6', '5', '7', '8'],
  ['WELCHER PLANET IST DER SONNE AM NAECHSTEN?', 'MERKUR', 'VENUS', 'MARS', 'DIE ERDE'],
  ['WELCHER PLANET IST DER GROESSTE?', 'JUPITER', 'SATURN', 'NEPTUN', 'DIE ERDE'],
  ['WAS DAVON IST AM GROESSTEN?', 'DIE SONNE', 'DER MOND', 'DIE ERDE', 'JUPITER'],
  ['WELCHER OZEAN IST DER GROESSTE?', 'PAZIFIK', 'ATLANTIC', 'INDISCHER', 'ARKTIS'],
  ['WELCHER FLUSS IST DER LAENGSTE DER WELT?', 'DER NIL', 'DER AMAZONAS', 'DIE DONAU', 'DIE THEMSE'],
  ['WELCHES LANDTIER IST DAS SCHNELLSTE?', 'GEPARD', 'LOEWE', 'PFERD', 'GREYHOUND'],
  ['WELCHES TIER IST DAS GROESSTE?', 'GIRAFFE', 'ELEPHANT', 'KAMEL', 'STRAUSS'],
  ['WAS DAVON IST EIN SAEUGETIER?', 'DELFIN', 'HAI', 'LACHS', 'KRAKE'],
  ['WAS MACHEN BIENEN?', 'HONIG', 'MARMELADE', 'MILCH', 'BUTTER'],
  ['MISCH BLAU UND GELB. WELCHE FARBE KOMMT RAUS?', 'GRÜN', 'LILA', 'ORANGE', 'BRAUN'],
  ['WIE VIELE TAGE HAT EIN SCHALTJAHR?', '366', '365', '364', '360'],
  ['WIE VIELE MINUTEN HAT EINE STUNDE?', '60', '100', '30', '90'],
  ['WIE VIELE TASTEN HAT EIN KLAVIER?', '88', '76', '64', '100'],
  ['WIE VIELE SAITEN HAT EINE GITARRE?', '6', '4', '5', '8'],
  ['WIE NENNT MAN H2O?', 'WASSER', 'SALZ', 'LUFT', 'ZUCKER'],
  ['WELCHES GAS MUESSEN WIR EINATMEN?', 'SAUERSTOFF', 'HELIUM', 'DAMPF', 'RAUCH'],
  ['WAS MISST EIN THERMOMETER?', 'TEMPERATURE', 'GEWICHT', 'GESCHWINDIGKEIT', 'ZEIT'],
  ['WIE VIELE KONTINENTE GIBT ES?', '7', '5', '6', '8'],
  ['WAS DAVON IST KEIN OBST?', 'KAROTTE', 'APFEL', 'BANANE', 'MANGO'],
  ['WIE HEISST EIN HUNDEBABY?', 'WELPE', 'KAETZCHEN', 'BAERENJUNGES', 'FOHLEN'],
  ['WIE VIELE RAEDER HAT EIN DREIRAD?', '3', '2', '4', '5']
];
// Optional packs, switched on per game with CFG.packs (see docs/product.md). Nothing here is in the
// default deck, because a family in Ohio should never be asked what a sliotar is.
const QUIZ_PACKS = {
  ie: [
    ['HOW MANY PLAYERS ARE ON A HURLING TEAM?', '15', '11', '13', '18'],
    ['WHAT IS THE BALL IN HURLING CALLED?', 'SLIOTAR', 'PUCK', 'HURLEY', 'HELMET'],
    ['WHERE IS THE ALL-IRELAND FINAL PLAYED?', 'CROKE PARK', 'ANFIELD', 'WEMBLEY', 'THE AVIVA'],
    ['IN GAA, HOW MANY POINTS IS A GOAL WORTH?', '3', '1', '2', '5'],
    ['HOW MANY PLAYERS ARE ON A GAELIC FOOTBALL TEAM?', '15', '11', '13', '12'],
    ['WHAT IS THE BIGGEST COUNTY IN IRELAND?', 'CORK', 'KERRY', 'GALWAY', 'MAYO'],
    ['WHAT IS THE LONGEST RIVER IN IRELAND?', 'THE SHANNON', 'THE LEE', 'THE BOYNE', 'THE LIFFEY'],
    ['WHAT DOES FAILTE MEAN IN ENGLISH?', 'WELCOME', 'GOODBYE', 'THANK YOU', 'GOODNIGHT'],
    ['WHAT IS THE IRISH WORD FOR DOG?', 'MADRA', 'CAPALL', 'CAT', 'BO'],
    ['A CONCERTINA IS A KIND OF WHAT?', 'SQUEEZEBOX', 'DRUM', 'FLUTE', 'FIDDLE']
  ],
  uk: [
    ['WHICH CLUB PLAYS ITS HOME GAMES AT ANFIELD?', 'LIVERPOOL', 'EVERTON', 'CHELSEA', 'ARSENAL'],
    ['HOW MANY PLAYERS ARE ON A RUGBY UNION TEAM?', '15', '11', '13', '12'],
    ['WHAT IS THE LONGEST RIVER IN THE UK?', 'THE SEVERN', 'DIE THEMSE', 'THE TRENT', 'THE TYNE'],
    ['WHICH CITY ARE REAL MADRID FROM?', 'MADRID', 'BARCELONA', 'SEVILLE', 'LISSABON']
  ]
};
// The deck is built when a quiz starts, not when the file loads, so a game's packs are read from
// its config no matter what order the scripts run in.
function quizPool() { return QUIZ_GENERAL.concat(((CFG && CFG.packs) || []).flatMap(k => QUIZ_PACKS[k] || [])); }

// questions about this family, built from the config and asked first
const KITNAMES = { '#1f7ae0': 'BLUE', '#e0102a': 'RED', '#1e9e4a': 'GRÜN', '#ffd23f': 'YELLOW', '#7a3cff': 'LILA', '#ff6b1a': 'ORANGE', '#ff2bd6': 'PINK', '#ffffff': 'WHITE', '#141018': 'BLACK' };
function wrongs(right, pool) { return shuffle(pool.filter(x => x !== right)).slice(0, 3); }
function familyQuestions() {
  const q = [], h = HERO.name;
  q.push(['WAS IST ' + h + ' LIEBLINGSESSEN?', CFG.food].concat(wrongs(CFG.food, ['PIZZA', 'POMMES', 'CURRY', 'NUDELN', 'SUSHI', 'SUPPE', 'BURGER', 'TACOS', 'ASIA-NUDELN'])));
  if (PET) q.push(['WIE HEISST DAS HAUSTIER?', PET.name].concat(wrongs(PET.name, ['REX', 'BELLA', 'MAX', 'LUNA', 'BUSTER', 'DAISY', 'MILO'])));
  if (CFG.catchphrase) q.push(['WHO SAYS "' + CFG.catchphrase + '"?', h].concat(wrongs(h, FAM.map(m => m.name).concat(['DER BRIEFTRAEGER', 'DIE LEHRERIN', 'DER WEIHNACHTSMANN']))));
  q.push(['WELCHE FARBE HAT ' + h + ' SHIRT IN DIESEM SPIEL?', KITNAMES[CFG.hero.kit]].concat(wrongs(KITNAMES[CFG.hero.kit], Object.values(KITNAMES))));
  return shuffle(q);
}
// general questions are dealt without repeats until the whole deck has been used
let quizDeck = [];
function gQuiz() {
  const s = { name: 'DAS FAMILIENQUIZ', how: ['VIER ANTWORTEN, JE EINE PFEILTASTE.', 'DIE ERSTE RICHTIGE ANTWORT HOLT DEN PUNKT.', 'FALSCH? DANN RAUS AUS DIESER FRAGE.', 'WER ZUERST 3 HAT.'], ctl: 'ANTWORT: PFEILTASTEN', pts: [0, 0], done: -1 };
  const DIRS = ['u', 'l', 'r', 'd'], BOX = { u: [240, 98], l: [130, 128], r: [350, 128], d: [240, 158] };
  const fam = familyQuestions();
  let q = null, ans = {}, right = 'u', phase = 'read', T = 0, t = 0, out = [false, false], picked = [null, null], winner = -1, pend = -1, ai = [null, null];
  function next() {
    if (fam.length) q = fam.pop();
    else { if (!quizDeck.length) quizDeck = shuffle(quizPool()); q = quizDeck.pop(); }
    const order = shuffle(DIRS.slice()); ans = {};
    order.forEach((d, k) => { ans[d] = q[1 + k]; }); right = order[0];
    phase = 'read'; T = 70; out = [false, false]; picked = [null, null]; winner = -1; pend = -1;
    for (let i = 0; i < 2; i++) ai[i] = { at: rint(70, 220), d: R() < .72 ? right : pick(DIRS.filter(d => d !== right)) };
  }
  function award(i) {
    winner = i; s.pts[i]++; phase = 'show'; T = 130; sfx.score(); shake = 4;
    burst(BOX[right][0], BOX[right][1], 30, [PL[i].col, '#fff'], 4);
    floatText(PL[i].name + ' HAT ES!', W / 2, 186, PL[i].col, 16);
    cheer(i, W / 2, 206, s.pts, ['SCHLAUKOPF!', 'KLUG!', 'GENIE!', 'BESTNOTE!']);
  }
  s.init = next;
  s.sub = () => s.pts[0] + ' - ' + s.pts[1];
  s.ai = i => (phase === 'ask' && !out[i] && T === 600 - ai[i].at) ? { [ai[i].d + 'P']: true } : EMPTY;
  s.update = () => {
    t++;
    if (phase === 'read') { if (--T <= 0) { phase = 'ask'; T = 600; sfx.go(); } return; }
    if (phase === 'show') { if (--T <= 0) { if (winner >= 0 && s.pts[winner] >= 3) s.done = winner; else next(); } return; }
    T--;
    for (let i = 0; i < 2; i++) {
      if (out[i] || (i === 0 && pend >= 0)) continue;
      const I = inp(i), d = DIRS.find(k => I[k + 'P']);
      if (!d) continue;
      picked[i] = d;
      if (d !== right) { out[i] = true; sfx.buzz(); floatText('FALSCH!', i === 0 ? 50 : 430, 170, '#fff'); continue; }
      // right answers settle after a short window: see docs/concept.md section 4
      if (i === 0) pend = t; else return award(1);
    }
    if (pend >= 0 && t - pend >= 12) return award(0);
    if ((out[0] && out[1]) || T <= 0) { floatText(T <= 0 ? 'ZEIT UM!' : 'KEINER WUSSTE ES!', W / 2, 186, '#fff', 16); phase = 'show'; T = 110; sfx.blip(); }
  };
  s.draw = () => {
    rect(0, AY, W, H - AY, '#1d0f3a');
    for (let x = 0; x < W; x += 40) rect(x, 212, 20, 58, '#2a1650');
    rect(0, 212, W, 2, COL.hot);
    // the question card
    rect(24, 34, 432, 42, '#fff'); rect(24, 72, 432, 4, '#cfc8e6');
    const lines = wrap(q[0], 50);
    lines.forEach((l, k) => txt(l, W / 2, (lines.length > 1 ? 42 : 49) + k * 13, 8, '#0a0416', 'center'));
    if (phase === 'read') { txt('BEREIT MACHEN...', W / 2, 124, 16, t % 20 < 12 ? '#fff' : COL.dim, 'center'); }
    else for (const d of DIRS) {
      const [cx, cy] = BOX[d], isRight = d === right, reveal = phase === 'show';
      let bg = '#2a1a4a', fg = '#fff';
      if (reveal && isRight) { bg = winner >= 0 ? PL[winner].col : COL.green; fg = '#0a0416'; }
      else if (!isRight && (picked[0] === d || picked[1] === d)) { bg = '#5a1a2a'; fg = COL.dim; }
      rect(cx - 72, cy - 12, 144, 24, bg);
      arrow(d, cx - 58, cy, 6, reveal && isRight ? '#0a0416' : COL.cyan);
      txt(ans[d], cx + 8, cy - 4, 8, fg, 'center');
    }
    if (phase === 'ask') { const f = T / 600; rect(140, 190, 200, 6, '#2a1a4a'); rect(140, 190, 200 * f, 6, f < .25 ? COL.red : COL.cyan); }
    if (phase === 'show' && winner < 0) txt('ES WAR ' + ans[right], W / 2, 206, 8, COL.green, 'center');
    for (let i = 0; i < 2; i++) {
      const x = i === 0 ? 50 : 430, hop = phase === 'show' && winner === i ? Math.abs(Math.sin(t / 7)) * 10 : 0;
      boy(i, x, 262 - hop, 3, i === 1, 0);
      if (out[i] && phase === 'ask') txt('RAUS!', x, 186, 8, COL.red, 'center');
    }
  };
  return s;
}
addGame('DAS FAMILIENQUIZ', gQuiz);
