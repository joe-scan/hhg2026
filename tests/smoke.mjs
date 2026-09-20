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
await page.selectOption('#fam-role-2', 'granny'); await page.fill('#fam-name-2', 'Nana Kay');
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
if (got !== 'SIOBHAN | DAD,MUM,NANA KAY | false | TACOS | AH HERE!') errors.push('builder did not carry the family into the game');

// 2. the demo, computer on both sides, title to finale
await page.evaluate(() => __hhg.setDemo(true));
const seen = [];
for (let n = 0; n < 3000; n++) {
  const st = await page.evaluate(() => __hhg.state().name);
  if (seen[seen.length - 1] !== st) seen.push(st);
  if (st === 'finale') break;
  if (['title', 'vs', 'howto', 'result', 'bossIntro', 'cont'].includes(st) && n % 3 === 0) await page.keyboard.press('Space');
  await page.evaluate(() => { for (let i = 0; i < 20; i++) __hhg.tick(); __hhg.render(); });
}
console.log('demo:', seen.join(' > '));
if (seen[seen.length - 1] !== 'finale') errors.push('demo did not reach the finale');
await page.evaluate(() => { for (let i = 0; i < 400; i++) __hhg.tick(); __hhg.render(); });

// 3. the default demo family with no link, and a phone-width landing page
const p2 = await browser.newPage(); watch(p2); await p2.goto(BASE + 'g/demo/'); await p2.waitForTimeout(500);
console.log('default hero:', await p2.evaluate(() => HERO.name));
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
const m = await ctx.newPage(); watch(m); await m.goto(BASE + 'index.html'); await m.waitForTimeout(500);
if (await m.evaluate(() => document.documentElement.scrollWidth > innerWidth)) errors.push('landing page scrolls sideways on a phone');

console.log(errors.length ? 'ERRORS:\n' + [...new Set(errors)].join('\n') : 'no errors');
await browser.close();
if (errors.length) process.exitCode = 1;
