'use strict';
// ---------- 10. THE FAMILY QUIZ: buzzer quiz, one arrow per answer
// [question, right answer, three wrong ones]. Questions up to 88 characters, answers up to 14.
const QUIZ_GENERAL = [
  ['QUANTI GIOCATORI HA UNA SQUADRA DI BASEBALL?', '9', '7', '10', '11'],
  ['QUANTI GIOCATORI IN CAMPO NEL BASKET?', '5', '6', '7', '4'],
  ['QUANTI GIOCATORI HA UNA SQUADRA DI CALCIO?', '11', '15', '9', '12'],
  ['QUANTO DURA UNA PARTITA DI CALCIO?', '90 MINUTI', '60 MINUTI', '80 MINUTI', '100 MINUTI'],
  ['QUANTI GOL SONO UNA TRIPLETTA?', '3', '2', '4', '5'],
  ['QUANTI PUNTI VALE UN TOUCHDOWN?', '6', '3', '7', '5'],
  ['QUAL E LA CAPITALE DEGLI STATI UNITI?', 'WASHINGTON', 'NEW YORK', 'BOSTON', 'CHICAGO'],
  ['QUAL E LA CAPITALE DELLA FRANCIA?', 'PARIS', 'NIZZA', 'LYON', 'BRUSSELS'],
  ['QUAL E LA CAPITALE DELL\'ITALIA?', 'ROMA', 'MILANO', 'VENEZIA', 'NAPOLI'],
  ['QUAL E LA CAPITALE DELLA SPAGNA?', 'MADRID', 'BARCELONA', 'VALENCIA', 'LISBONA'],
  ['QUAL E LO STATO PIU GRANDE DEGLI USA?', 'ALASKA', 'TEXAS', 'CALIFORNIA', 'MONTANA'],
  ['DI QUALE PAESE E LA LAMBORGHINI?', 'ITALIA', 'SVEZIA', 'GERMANIA', 'GIAPPONE'],
  ['IN QUALE PAESE E LA TORRE EIFFEL?', 'FRANCIA', 'ITALIA', 'SPAGNA', 'BELGIO'],
  ['QUANTE ZAMPE HA UN RAGNO?', '8', '6', '10', '12'],
  ['QUANTO FA 7 X 8?', '56', '54', '48', '63'],
  ['QUANTO FA 12 X 12?', '144', '124', '132', '142'],
  ['QUANTO FA 9 X 6?', '54', '56', '45', '63'],
  ['QUANTI LATI HA UN ESAGONO?', '6', '5', '7', '8'],
  ['QUALE PIANETA E PIU VICINO AL SOLE?', 'MERCURIO', 'VENERE', 'MARTE', 'LA TERRA'],
  ['QUAL E IL PIANETA PIU GRANDE?', 'GIOVE', 'SATURNO', 'NETTUNO', 'LA TERRA'],
  ['QUALE DI QUESTI E IL PIU GRANDE?', 'IL SOLE', 'LA LUNA', 'LA TERRA', 'GIOVE'],
  ['QUAL E L\'OCEANO PIU GRANDE?', 'PACIFICO', 'ATLANTIC', 'INDIANO', 'ARTICO'],
  ['QUAL E IL FIUME PIU LUNGO DEL MONDO?', 'IL NILO', 'IL RIO DELLE AMAZZONI', 'IL DANUBIO', 'IL TAMIGI'],
  ['QUAL E L\'ANIMALE TERRESTRE PIU VELOCE?', 'GHEPARDO', 'LEONE', 'CAVALLO', 'GREYHOUND'],
  ['QUAL E L\'ANIMALE PIU ALTO?', 'GIRAFFA', 'ELEPHANT', 'CAMMELLO', 'STRUZZO'],
  ['QUALE DI QUESTI E UN MAMMIFERO?', 'DELFINO', 'SQUALO', 'SALMONE', 'POLPO'],
  ['COSA FANNO LE API?', 'IL MIELE', 'LA MARMELLATA', 'IL LATTE', 'IL BURRO'],
  ['MESCOLA BLU E GIALLO. CHE COLORE VIENE?', 'VERDE', 'VIOLA', 'ARANCIONE', 'MARRONE'],
  ['QUANTI GIORNI HA UN ANNO BISESTILE?', '366', '365', '364', '360'],
  ['QUANTI MINUTI HA UN\'ORA?', '60', '100', '30', '90'],
  ['QUANTI TASTI HA UN PIANOFORTE?', '88', '76', '64', '100'],
  ['QUANTE CORDE HA UNA CHITARRA?', '6', '4', '5', '8'],
  ['COME SI CHIAMA L\'H2O?', 'ACQUA', 'SALE', 'ARIA', 'ZUCCHERO'],
  ['QUALE GAS DOBBIAMO RESPIRARE?', 'OSSIGENO', 'ELIO', 'VAPORE', 'FUMO'],
  ['COSA MISURA UN TERMOMETRO?', 'TEMPERATURE', 'IL PESO', 'LA VELOCITA', 'IL TEMPO'],
  ['QUANTI CONTINENTI CI SONO?', '7', '5', '6', '8'],
  ['QUALE DI QUESTI NON E FRUTTA?', 'CAROTA', 'MELA', 'BANANA', 'MANGO'],
  ['COME SI CHIAMA UN CUCCIOLO DI CANE?', 'CUCCIOLO', 'GATTINO', 'ORSACCHIOTTO', 'PULEDRO'],
  ['QUANTE RUOTE HA UN TRICICLO?', '3', '2', '4', '5']
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
    ['WHAT IS THE LONGEST RIVER IN THE UK?', 'THE SEVERN', 'IL TAMIGI', 'THE TRENT', 'THE TYNE'],
    ['WHICH CITY ARE REAL MADRID FROM?', 'MADRID', 'BARCELONA', 'SEVILLE', 'LISBONA']
  ]
};
// The deck is built when a quiz starts, not when the file loads, so a game's packs are read from
// its config no matter what order the scripts run in.
function quizPool() { return QUIZ_GENERAL.concat(((CFG && CFG.packs) || []).flatMap(k => QUIZ_PACKS[k] || [])); }

// questions about this family, built from the config and asked first
const KITNAMES = { '#1f7ae0': 'BLUE', '#e0102a': 'RED', '#1e9e4a': 'VERDE', '#ffd23f': 'YELLOW', '#7a3cff': 'VIOLA', '#ff6b1a': 'ARANCIONE', '#ff2bd6': 'PINK', '#ffffff': 'WHITE', '#141018': 'BLACK' };
function wrongs(right, pool) { return shuffle(pool.filter(x => x !== right)).slice(0, 3); }
function familyQuestions() {
  const q = [], h = HERO.name;
  q.push(['QUAL E ' + h + ' IL CIBO PREFERITO DI ', CFG.food].concat(wrongs(CFG.food, ['PIZZA', 'PATATINE', 'CURRY', 'PASTA', 'SUSHI', 'ZUPPA', 'HAMBURGER', 'TACOS', 'NOODLES'])));
  if (PET) q.push(['COME SI CHIAMA L\'ANIMALE?', PET.name].concat(wrongs(PET.name, ['REX', 'BELLA', 'MAX', 'LUNA', 'BUSTER', 'DAISY', 'MILO'])));
  if (CFG.catchphrase) q.push(['WHO SAYS "' + CFG.catchphrase + '"?', h].concat(wrongs(h, FAM.map(m => m.name).concat(['IL POSTINO', 'LA MAESTRA', 'BABBO NATALE']))));
  q.push(['DI CHE COLORE E ' + h + ' LA MAGLIA DI ', KITNAMES[CFG.hero.kit]].concat(wrongs(KITNAMES[CFG.hero.kit], Object.values(KITNAMES))));
  return shuffle(q);
}
// general questions are dealt without repeats until the whole deck has been used
let quizDeck = [];
function gQuiz() {
  const s = { name: 'IL QUIZ DI FAMIGLIA', how: ['QUATTRO RISPOSTE, UNA PER FRECCIA.', 'LA PRIMA RISPOSTA GIUSTA PRENDE IL PUNTO.', 'SBAGLI? SEI FUORI PER QUELLA DOMANDA.', 'PRIMO A 3.'], ctl: 'RISPONDI: LE FRECCE', pts: [0, 0], done: -1 };
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
    floatText(PL[i].name + ' INDOVINA!', W / 2, 186, PL[i].col, 16);
    cheer(i, W / 2, 206, s.pts, ['CERVELLONE!', 'BRAVO!', 'GENIO!', 'DIECI E LODE!']);
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
      if (d !== right) { out[i] = true; sfx.buzz(); floatText('SBAGLIATO!', i === 0 ? 50 : 430, 170, '#fff'); continue; }
      // right answers settle after a short window: see docs/concept.md section 4
      if (i === 0) pend = t; else return award(1);
    }
    if (pend >= 0 && t - pend >= 12) return award(0);
    if ((out[0] && out[1]) || T <= 0) { floatText(T <= 0 ? 'TEMPO SCADUTO!' : 'NESSUNO LO SAPEVA!', W / 2, 186, '#fff', 16); phase = 'show'; T = 110; sfx.blip(); }
  };
  s.draw = () => {
    rect(0, AY, W, H - AY, '#1d0f3a');
    for (let x = 0; x < W; x += 40) rect(x, 212, 20, 58, '#2a1650');
    rect(0, 212, W, 2, COL.hot);
    // the question card
    rect(24, 34, 432, 42, '#fff'); rect(24, 72, 432, 4, '#cfc8e6');
    const lines = wrap(q[0], 50);
    lines.forEach((l, k) => txt(l, W / 2, (lines.length > 1 ? 42 : 49) + k * 13, 8, '#0a0416', 'center'));
    if (phase === 'read') { txt('PRONTI...', W / 2, 124, 16, t % 20 < 12 ? '#fff' : COL.dim, 'center'); }
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
    if (phase === 'show' && winner < 0) txt('ERA ' + ans[right], W / 2, 206, 8, COL.green, 'center');
    for (let i = 0; i < 2; i++) {
      const x = i === 0 ? 50 : 430, hop = phase === 'show' && winner === i ? Math.abs(Math.sin(t / 7)) * 10 : 0;
      boy(i, x, 262 - hop, 3, i === 1, 0);
      if (out[i] && phase === 'ask') txt('FUORI!', x, 186, 8, COL.red, 'center');
    }
  };
  return s;
}
addGame('IL QUIZ DI FAMIGLIA', gQuiz);
