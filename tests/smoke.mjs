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
  '<script>window.HHG_TEASER = false;<\/script>' + tag('engine.js') +
  ['games/paddle-battle.js', 'games/water-balloon-fight.js', 'games/dinner-dash.js', 'games/table-quiz.js', 'games/bosses.js', 'flow.js'].map(tag).join('') +
  '<script>startGame(DEMO);<\/script>',
  { waitUntil: 'load' });
await full.waitForTimeout(600);
const seenFull = await run(full, 'finale');
console.log('full game:', (await full.evaluate(() => __hhg.games().length)) + ' games >', seenFull.join(' > '));
if (seenFull[seenFull.length - 1] !== 'finale') errors.push('the full game did not reach the ending');

// 2c. the premiere page: it counts down, it opens the game at zero, and it refuses to send
// anyone off this site
const prem = await browser.newPage(); watch(prem);
const soon = new Date(Date.now() + 36e5).toISOString();
await prem.goto(`${BASE}premiere/?n=Ava&at=${encodeURIComponent(soon)}&to=/g/demo/`); await prem.waitForTimeout(500);
const clock = await prem.textContent('#clock');
if (!/^00:00:59:\d\d$/.test(clock)) errors.push('the premiere clock read ' + clock);
await prem.goto(`${BASE}premiere/?n=Ava&at=2020-01-01T10:00&to=https://example.com/evil`); await prem.waitForTimeout(3200);
if (!prem.url().includes('/premiere/')) errors.push('the premiere followed an off-site link');
await prem.goto(`${BASE}premiere/?n=Ava&at=2020-01-01T10:00&to=/g/demo/`); await prem.waitForTimeout(3200);
if (!prem.url().includes('/g/demo/')) errors.push('the premiere did not open the game at zero');

// 3. the default demo family with no link, and a phone-width landing page
const p2 = await browser.newPage(); watch(p2); await p2.goto(BASE + 'g/demo/'); await p2.waitForTimeout(500);
console.log('default hero:', await p2.evaluate(() => HERO.name));
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
const m = await ctx.newPage(); watch(m); await m.goto(BASE + 'index.html'); await m.waitForTimeout(500);
if (await m.evaluate(() => document.documentElement.scrollWidth > innerWidth)) errors.push('landing page scrolls sideways on a phone');

console.log(errors.length ? 'ERRORS:\n' + [...new Set(errors)].join('\n') : 'no errors');
await browser.close();
if (errors.length) process.exitCode = 1;
