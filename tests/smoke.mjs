// Headless smoke test for the landing page and the demo. How to run it: README, Test.
import { chromium } from 'playwright-core';
const BASE = process.argv[2] || 'http://127.0.0.1:8766/';
const exe = process.env.CHROME;
const browser = await chromium.launch(exe ? { executablePath: exe } : {});
const errors = [];
const watch = p => { p.on('pageerror', e => errors.push('pageerror: ' + e.message)); p.on('console', m => { if (m.type() === 'error') errors.push('console: ' + m.text()); }); };

// 1. the builder: type a family in, press Play, check the game got it
const page = await browser.newPage({ viewport: { width: 1360, height: 900 } }); watch(page);
await page.goto(BASE + 'index.html'); await page.waitForTimeout(600);
await page.fill('#hero-name', 'Siobhán');
await page.click('label:has(input[value="curly"])'); await page.click('#kit .sw:nth-child(2)');
await page.selectOption('#fam-role-0', 'granny'); await page.fill('#fam-name-0', 'Nana Kay');
await page.fill('#pet-name', ''); await page.fill('#food', 'Tacos'); await page.fill('#catch', 'Ah here!');
// 1b. every pet kind draws without an error, including the fish that stays in its bowl
for (const kind of ['dog', 'cat', 'rabbit', 'hamster', 'fish']) {
  await page.selectOption('#pet-kind', kind); await page.fill('#pet-name', 'Biscuit'); await page.waitForTimeout(120);
  const got = await page.evaluate(() => [CFG.pet && CFG.pet.kind, PET && PET.name, petRuns()].join('/'));
  if (got !== `${kind}/BISCUIT/${kind !== 'fish'}`) errors.push('pet ' + kind + ' came out as ' + got);
}
await page.fill('#pet-name', ''); await page.waitForTimeout(120);

await page.click('#play'); await page.waitForTimeout(700);
const got = await page.evaluate(() => [HERO.name, FAM.map(f => f.name).join(','), !!PET, CFG.food, CFG.catchphrase].join(' | '));
console.log('builder -> game:', got);
if (got !== 'SIOBHAN | NANA KAY | false | TACOS | AH HERE!') errors.push('builder did not carry the family into the game');

// 2. the teaser demo, computer on both sides: one game, then the locked card
const run = async (pg, stop) => {
  await pg.evaluate(() => __hhg.setDemo(true));
  const seen = [];
  for (let n = 0; n < 4000; n++) {
    const st = await pg.evaluate(() => __hhg.state().name);
    if (seen[seen.length - 1] !== st) seen.push(st);
    if (st === stop) break;
    if (['title', 'vs', 'howto', 'result', 'bossIntro', 'cont'].includes(st) && n % 3 === 0) await pg.keyboard.press('Space');
    await pg.evaluate(() => { for (let i = 0; i < 20; i++) __hhg.tick(); __hhg.render(); });
  }
  await pg.evaluate(() => { for (let i = 0; i < 300; i++) __hhg.tick(); __hhg.render(); });
  return seen;
};
const seen = await run(page, 'locked');
console.log('demo:', seen.join(' > '));
if (seen[seen.length - 1] !== 'locked') errors.push('the demo did not stop at the locked card');
if (seen.includes('boss') || seen.includes('finale')) errors.push('the demo gave away the boss or the ending');

// 2b. the full game: every game, the boss and the ending, assembled the way a paid game is
const full = await browser.newPage({ viewport: { width: 1360, height: 900 } }); watch(full);
const tag = f => `<script src="${BASE}arcade/${f}"><\/script>`;
await full.setContent('<canvas id="game" width="480" height="270"></canvas>' +
  '<script>window.HHG_TEASER = false;<\/script>' + tag('engine.js') + tag('scenes.js') +
  ['games/paddle-battle.js', 'games/water-balloon-fight.js', 'games/back-seat-battle.js', 'games/dinner-dash.js', 'games/table-quiz.js', 'games/bosses.js', 'flow.js'].map(tag).join('') +
  '<script>startGame(DEMO);<\/script>',
  { waitUntil: 'load' });
await full.waitForTimeout(600);
const seenFull = await run(full, 'finale');
const nGames = await full.evaluate(() => __hhg.games().length);
console.log('full game:', nGames + ' games >', seenFull.join(' > '));
if (nGames !== 5) errors.push('the full game has ' + nGames + ' games, and everything we sell says five');
if (seenFull[seenFull.length - 1] !== 'finale') errors.push('the full game did not reach the ending');

// 2d. every translated language: the page is translated, the game is translated, the demo still
// stops at the locked card, and the picker gets you back to English and out again.
const LANGS = [
  { code: 'es', name: 'Español', game: 'GUERRA DE GLOBOS', dad: 'Papá' },
  { code: 'de', name: 'Deutsch', game: 'WASSERBOMBEN-SCHLACHT', dad: 'Papa' },
  { code: 'fr', name: 'Français', game: "BATAILLE DE BALLONS D'EAU", dad: 'Papa' },
  { code: 'it', name: 'Italiano', game: 'GUERRA DI GAVETTONI', dad: 'Papà' },
  { code: 'ga', name: 'Gaeilge', game: 'CATH NA mBALUN UISCE', dad: 'Daidí' }
];
for (const L of LANGS) {
  const pg = await browser.newPage({ viewport: { width: 1360, height: 900 } }); watch(pg);
  await pg.goto(`${BASE}${L.code}/`); await pg.waitForTimeout(500);
  if (await pg.evaluate(() => document.documentElement.lang) !== L.code) errors.push(`${L.code}: page not marked lang="${L.code}"`);
  await pg.goto(`${BASE}${L.code}/g/demo/`); await pg.waitForTimeout(700);
  const got = await pg.evaluate(() => [__hhg.games()[0], ROLES.dad.label].join(' | '));
  if (got !== `${L.game} | ${L.dad}`) errors.push(`${L.code}: game reads ${got}, wanted ${L.game} | ${L.dad}`);
  const seenL = await run(pg, 'locked');
  if (seenL[seenL.length - 1] !== 'locked') errors.push(`${L.code}: demo did not stop at the locked card`);
  console.log(`${L.code}: ${L.game}, ${seenL.length} states, locked`);
  await pg.close();
}

// the picker, both directions, on every page
for (const [from, click, wantEnd] of [['es/', 'English', '/'], ['de/privacy/', 'English', '/privacy/'],
                                      ['ga/g/demo/', 'English', '/g/demo/'], ['', 'Italiano', '/it/'],
                                      ['', 'Gaeilge', '/ga/']]) {
  const t = await browser.newPage(); watch(t);
  await t.goto(BASE + from); await t.waitForTimeout(500);
  await t.click('.langs summary');                       // the picker opens on click
  await t.click(`.langs a:text-is("${click}")`); await t.waitForTimeout(600);
  const path = new URL(t.url()).pathname;
  if (!path.endsWith(wantEnd)) errors.push(`${click} from /${from} landed on ${path}, wanted ${wantEnd}`);
  await t.close();
}

// 2e. party mode: pick four challengers, play the lot, end on the results board
const pm = await browser.newPage({ viewport: { width: 1360, height: 900 } }); watch(pm);
await pm.goto(BASE + 'g/demo/'); await pm.waitForTimeout(700);
const step = k => pm.evaluate(n => { for (let i = 0; i < n; i++) __hhg.tick(); __hhg.render(); }, k);
await step(60);
await pm.keyboard.press('ArrowDown'); await step(3);
await pm.keyboard.press('ArrowDown'); await step(3);
await pm.keyboard.press('Space'); await step(30);
if (await pm.evaluate(() => __hhg.state().name) !== 'partySetup') errors.push('party mode did not open from the menu');
await pm.keyboard.press('ArrowUp'); await step(5);
await pm.keyboard.press('Space'); await step(30);
await pm.evaluate(() => __hhg.setDemo(true));
const pmSeen = [];
for (let n = 0; n < 6000; n++) {
  const st2 = await pm.evaluate(() => __hhg.state().name);
  if (pmSeen[pmSeen.length - 1] !== st2) pmSeen.push(st2);
  if (st2 === 'partyEnd') break;
  if (['partyVs', 'howto', 'result'].includes(st2) && n % 3 === 0) await pm.keyboard.press('Space');
  await step(20);
}
const turns = pmSeen.filter(x => x === 'partyVs').length;
console.log('party mode:', turns, 'turns >', pmSeen[pmSeen.length - 1]);
if (turns !== 4) errors.push('party mode played ' + turns + ' turns, wanted 4');
if (pmSeen[pmSeen.length - 1] !== 'partyEnd') errors.push('party mode did not reach the results board');
await pm.close();

// 2f. the two free pages: a name in lights, and the Halloween game
const lights = await browser.newPage(); watch(lights);
await lights.goto(BASE + 'name/'); await lights.waitForTimeout(700);
await lights.fill('#who', 'Saoirse'); await lights.waitForTimeout(400);
if (await lights.evaluate(() => HERO.name) !== 'SAOIRSE') errors.push('the name in lights page did not take the name');
await lights.close();

// every free theme game: it starts, it runs a full minute, it ends, and the end card is drawn
for (const [theme, who] of [['themes/halloween/', 'Fionn'], ['themes/christmas/', 'Sean']]) {
  const fp = await browser.newPage(); watch(fp);
  await fp.goto(BASE + theme); await fp.waitForTimeout(700);
  await fp.fill('#who', who); await fp.click('#play'); await fp.waitForTimeout(900);
  await fp.evaluate(() => { const gm = __free.game(); for (let i = 0; i < 3700; i++) gm.update(); });
  await fp.waitForTimeout(900);
  const over = await fp.evaluate(() => __free.game().over);
  const shown = await fp.evaluate(() => !document.getElementById('save').hidden);
  console.log(theme, over ? 'ran to the end' : 'DID NOT END', shown ? 'and offered the picture' : 'WITH NO PICTURE');
  if (!over) errors.push(theme + ' did not finish');
  if (!shown) errors.push(theme + ' never offered the picture');
  await fp.close();
}

// the old Halloween address was shared before the games moved under /themes/
if (BASE.startsWith('https://')) {
  const moved = await fetch(BASE + 'halloween/', { redirect: 'manual' });
  if (moved.status !== 301) errors.push('/halloween/ no longer redirects (' + moved.status + ')');
}

// 3. the default demo family with no link, and a phone-width landing page
const p2 = await browser.newPage(); watch(p2); await p2.goto(BASE + 'g/demo/'); await p2.waitForTimeout(500);
console.log('default hero:', await p2.evaluate(() => HERO.name));
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
const m = await ctx.newPage(); watch(m); await m.goto(BASE + 'index.html'); await m.waitForTimeout(500);
if (await m.evaluate(() => document.documentElement.scrollWidth > innerWidth)) errors.push('landing page scrolls sideways on a phone');

console.log(errors.length ? 'ERRORS:\n' + [...new Set(errors)].join('\n') : 'no errors');
await browser.close();
if (errors.length) process.exitCode = 1;
