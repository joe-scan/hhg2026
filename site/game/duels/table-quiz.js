'use strict';
// ---------- 10. THE TABLE QUIZ: buzzer quiz, one arrow per answer
// [question, right answer, three wrong ones]. Questions up to 88 characters, answers up to 14.
const QUIZ = [
  ['HOW MANY PLAYERS ARE ON A HURLING TEAM?', '15', '11', '13', '18'],
  ['WHAT IS THE BALL IN HURLING CALLED?', 'SLIOTAR', 'PUCK', 'HURLEY', 'HELMET'],
  ['WHERE IS THE ALL-IRELAND FINAL PLAYED?', 'CROKE PARK', 'ANFIELD', 'WEMBLEY', 'THE AVIVA'],
  ['IN GAA, HOW MANY POINTS IS A GOAL WORTH?', '3', '1', '2', '5'],
  ['HOW MANY PLAYERS ARE ON A RUGBY UNION TEAM?', '15', '11', '13', '12'],
  ['HOW LONG IS A NORMAL SOCCER MATCH?', '90 MINUTES', '60 MINUTES', '80 MINUTES', '100 MINUTES'],
  ['WHICH CLUB PLAYS ITS HOME GAMES AT ANFIELD?', 'LIVERPOOL', 'EVERTON', 'CHELSEA', 'ARSENAL'],
  ['WHICH CITY ARE REAL MADRID FROM?', 'MADRID', 'BARCELONA', 'SEVILLE', 'LISBON'],
  ['HOW MANY GOALS MAKE A HAT-TRICK?', '3', '2', '4', '5'],
  ['WHICH COUNTRY MAKES LAMBORGHINI CARS?', 'ITALY', 'SWEDEN', 'GERMANY', 'JAPAN'],
  ['WHICH COUNTRY MAKES KOENIGSEGG CARS?', 'SWEDEN', 'ITALY', 'NORWAY', 'GERMANY'],
  ['WHAT IS THE BIGGEST COUNTY IN IRELAND?', 'CORK', 'KERRY', 'GALWAY', 'MAYO'],
  ['WHAT IS THE LONGEST RIVER IN IRELAND?', 'THE SHANNON', 'THE LEE', 'THE BOYNE', 'THE LIFFEY'],
  ['WHAT IS THE CAPITAL OF ITALY?', 'ROME', 'MILAN', 'VENICE', 'NAPLES'],
  ['WHAT IS THE CAPITAL OF PORTUGAL?', 'LISBON', 'PORTO', 'FARO', 'MADRID'],
  ['WHAT IS THE CAPITAL OF FRANCE?', 'PARIS', 'NICE', 'LYON', 'BRUSSELS'],
  ['WHAT IS THE CAPITAL OF SPAIN?', 'MADRID', 'BARCELONA', 'VALENCIA', 'LISBON'],
  ['WHAT DOES FAILTE MEAN IN ENGLISH?', 'WELCOME', 'GOODBYE', 'THANK YOU', 'GOODNIGHT'],
  ['WHAT IS THE IRISH WORD FOR DOG?', 'MADRA', 'CAPALL', 'CAT', 'BO'],
  ['HOW MANY LEGS DOES A SPIDER HAVE?', '8', '6', '10', '12'],
  ['WHAT IS 7 X 8?', '56', '54', '48', '63'],
  ['WHAT IS 12 X 12?', '144', '124', '132', '142'],
  ['WHAT IS 9 X 6?', '54', '56', '45', '63'],
  ['HOW MANY SIDES DOES A HEXAGON HAVE?', '6', '5', '7', '8'],
  ['WHICH PLANET IS CLOSEST TO THE SUN?', 'MERCURY', 'VENUS', 'MARS', 'EARTH'],
  ['WHAT IS THE BIGGEST PLANET?', 'JUPITER', 'SATURN', 'NEPTUNE', 'EARTH'],
  ['WHICH OF THESE IS THE BIGGEST?', 'THE SUN', 'THE MOON', 'EARTH', 'JUPITER'],
  ['WHAT IS THE BIGGEST OCEAN?', 'PACIFIC', 'ATLANTIC', 'INDIAN', 'ARCTIC'],
  ['WHAT IS THE FASTEST LAND ANIMAL?', 'CHEETAH', 'LION', 'HORSE', 'GREYHOUND'],
  ['WHAT IS THE TALLEST ANIMAL?', 'GIRAFFE', 'ELEPHANT', 'CAMEL', 'OSTRICH'],
  ['WHICH OF THESE IS A MAMMAL?', 'DOLPHIN', 'SHARK', 'SALMON', 'OCTOPUS'],
  ['WHAT DO BEES MAKE?', 'HONEY', 'JAM', 'MILK', 'BUTTER'],
  ['MIX BLUE AND YELLOW PAINT. WHAT COLOUR DO YOU GET?', 'GREEN', 'PURPLE', 'ORANGE', 'BROWN'],
  ['HOW MANY DAYS ARE IN A LEAP YEAR?', '366', '365', '364', '360'],
  ['HOW MANY MINUTES ARE IN AN HOUR?', '60', '100', '30', '90'],
  ['HOW MANY KEYS ARE ON A STANDARD PIANO?', '88', '76', '64', '100'],
  ['A CONCERTINA IS A KIND OF WHAT?', 'SQUEEZEBOX', 'DRUM', 'FLUTE', 'FIDDLE'],
  ['HOW MANY STRINGS ARE ON A NORMAL GUITAR?', '6', '4', '5', '8'],
  ['WHAT IS H2O BETTER KNOWN AS?', 'WATER', 'SALT', 'AIR', 'SUGAR'],
  ['WHAT GAS DO WE NEED TO BREATHE IN?', 'OXYGEN', 'HELIUM', 'STEAM', 'SMOKE'],
  ['WHAT DOES A THERMOMETER MEASURE?', 'TEMPERATURE', 'WEIGHT', 'SPEED', 'TIME'],
  ['HOW MANY CONTINENTS ARE THERE?', '7', '5', '6', '8'],
  ['WHICH OF THESE IS NOT A FRUIT?', 'CARROT', 'APPLE', 'BANANA', 'MANGO'],
  ['WHAT IS A BABY DOG CALLED?', 'PUPPY', 'KITTEN', 'CUB', 'FOAL'],
  ['HOW MANY PLAYERS ARE ON A GAELIC FOOTBALL TEAM?', '15', '11', '13', '12'],
  ['HOW MANY PLAYERS ARE ON A SOCCER TEAM?', '11', '15', '9', '12']
];
// questions about this family, built from the config and asked first
const KITNAMES = { '#1f7ae0': 'BLUE', '#e0102a': 'RED', '#1e9e4a': 'GREEN', '#ffd23f': 'YELLOW', '#7a3cff': 'PURPLE', '#ff6b1a': 'ORANGE', '#ff2bd6': 'PINK', '#ffffff': 'WHITE', '#141018': 'BLACK' };
function wrongs(right, pool) { return shuffle(pool.filter(x => x !== right)).slice(0, 3); }
function familyQuestions() {
  const q = [], h = HERO.name;
  q.push(['WHAT IS ' + h + '\'S FAVOURITE FOOD?', CFG.food].concat(wrongs(CFG.food, ['PIZZA', 'CHIPS', 'CURRY', 'PASTA', 'SUSHI', 'SOUP', 'BURGERS', 'TACOS', 'NOODLES'])));
  if (PET) q.push(['WHAT IS THE DOG CALLED?', PET.name].concat(wrongs(PET.name, ['REX', 'BELLA', 'MAX', 'LUNA', 'BUSTER', 'DAISY', 'MILO'])));
  if (CFG.catchphrase) q.push(['WHO SAYS "' + CFG.catchphrase + '"?', h].concat(wrongs(h, FAM.map(m => m.name).concat(['THE POSTMAN', 'THE TEACHER', 'SANTA']))));
  q.push(['WHAT COLOUR IS ' + h + '\'S JERSEY IN THIS GAME?', KITNAMES[CFG.hero.kit]].concat(wrongs(KITNAMES[CFG.hero.kit], Object.values(KITNAMES))));
  return shuffle(q);
}
// general questions are dealt without repeats until the whole deck has been used
let quizDeck = [];
function gQuiz() {
  const s = { name: 'THE TABLE QUIZ', how: ['FOUR ANSWERS, EACH ON ITS OWN ARROW.', 'FIRST RIGHT ANSWER WINS THE POINT.', 'WRONG ANSWER? YOU\'RE OUT FOR THAT QUESTION.', 'FIRST TO 3.'], ctl: 'ANSWER: UP DOWN LEFT RIGHT', pts: [0, 0], done: -1 };
  const DIRS = ['u', 'l', 'r', 'd'], BOX = { u: [240, 98], l: [130, 128], r: [350, 128], d: [240, 158] };
  const fam = familyQuestions();
  let q = null, ans = {}, right = 'u', phase = 'read', T = 0, t = 0, out = [false, false], picked = [null, null], winner = -1, pend = -1, ai = [null, null];
  function next() {
    if (fam.length) q = fam.pop();
    else { if (!quizDeck.length) quizDeck = shuffle(QUIZ.map((_, k) => k)); q = QUIZ[quizDeck.pop()]; }
    const order = shuffle(DIRS.slice()); ans = {};
    order.forEach((d, k) => { ans[d] = q[1 + k]; }); right = order[0];
    phase = 'read'; T = 70; out = [false, false]; picked = [null, null]; winner = -1; pend = -1;
    for (let i = 0; i < 2; i++) ai[i] = { at: rint(70, 220), d: R() < .72 ? right : pick(DIRS.filter(d => d !== right)) };
  }
  function award(i) {
    winner = i; s.pts[i]++; phase = 'show'; T = 130; sfx.score(); shake = 4;
    burst(BOX[right][0], BOX[right][1], 30, [PL[i].col, '#fff'], 4);
    floatText(PL[i].name + ' GETS IT!', W / 2, 186, PL[i].col, 16);
    cheer(i, W / 2, 206, s.pts, ['BRAINBOX!', 'SMART!', 'GENIUS!', 'TOP MARKS!']);
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
      if (d !== right) { out[i] = true; sfx.buzz(); floatText('WRONG!', i === 0 ? 50 : 430, 170, '#fff'); continue; }
      // right answers settle after a short window: see docs/concept.md section 4
      if (i === 0) pend = t; else return award(1);
    }
    if (pend >= 0 && t - pend >= 12) return award(0);
    if ((out[0] && out[1]) || T <= 0) { floatText(T <= 0 ? 'TIME UP!' : 'NOBODY GOT IT!', W / 2, 186, '#fff', 16); phase = 'show'; T = 110; sfx.blip(); }
  };
  s.draw = () => {
    rect(0, AY, W, H - AY, '#1d0f3a');
    for (let x = 0; x < W; x += 40) rect(x, 212, 20, 58, '#2a1650');
    rect(0, 212, W, 2, COL.hot);
    // the question card
    rect(24, 34, 432, 42, '#fff'); rect(24, 72, 432, 4, '#cfc8e6');
    const lines = wrap(q[0], 50);
    lines.forEach((l, k) => txt(l, W / 2, (lines.length > 1 ? 42 : 49) + k * 13, 8, '#0a0416', 'center'));
    if (phase === 'read') { txt('GET READY...', W / 2, 124, 16, t % 20 < 12 ? '#fff' : COL.dim, 'center'); }
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
    if (phase === 'show' && winner < 0) txt('IT WAS ' + ans[right], W / 2, 206, 8, COL.green, 'center');
    for (let i = 0; i < 2; i++) {
      const x = i === 0 ? 50 : 430, hop = phase === 'show' && winner === i ? Math.abs(Math.sin(t / 7)) * 10 : 0;
      boy(i, x, 262 - hop, 3, i === 1, 0);
      if (out[i] && phase === 'ask') txt('OUT!', x, 186, 8, COL.red, 'center');
    }
  };
  return s;
}
addDuel('THE TABLE QUIZ', gQuiz);
