# Joe's list

Everything outside the code that has to happen, in the order it matters. Tick things off in here, and add anything new at the bottom of its section rather than in your head.

Rules for this file: one line per job, the point of it, and what "done" actually looks like. If a job needs a decision from Joe before anyone can act, it says so. Amounts and rules for Irish schemes change; check each one at source before quoting it anywhere.

Last updated 21 September 2026.

## This week

- [ ] Search the trademark (see Trademark below). Two hours, and it decides whether the name is safe to spend on.
- [ ] Book the Local Enterprise Office meeting at County Hall, Cork. Bring `docs/pitch.md`.
- [ ] **Find out what a customer costs.** A few hundred dollars of US ads pointed at the builder, counting buyers. Since $39 went on the page, this number decides whether the business works (`docs/business-plan.md`, section 4).
- [ ] Show the demo to ten parents outside the family, at least three American. Watch, don't pitch. Write down what they do, not what they say.
- [ ] Etsy listing. "Custom video game gift" is a search term with its own landing page there, and Etsy has the buyers that SEO on a two-day-old domain will not reach before Christmas. 20 cents a listing.
- [ ] Pitch Christmas gift guides, this week. Most close in mid-October. Send the poster picture and a link to the demo.
- [ ] Set up a Tally form so the site can collect emails instead of asking people to write one. The free games already ask; today the link opens an email.
- [ ] Google Search Console: the TXT record is live in DNS since 20 Sep 2026 and answers on both Namecheap nameservers and on Google, Cloudflare and Quad9, so press Verify. The HTML tag is on the front page too, for a URL-prefix property. Then submit https://happyherogames.com/sitemap.xml and check Coverage in a week. Bing Webmaster Tools takes the Google verification.

## Trademark

- [ ] Search EUIPO at euipo.europa.eu ("eSearch plus") for **happy hero** and for **hero games**, in class 9 (software, games) and class 41 (entertainment).
- [ ] Search USPTO at tmsearch.uspto.gov for the same two terms and classes.
- [ ] Search Google, the App Store and Google Play for "Happy Hero". Unregistered use in the US can still block you.
- [ ] Screenshot anything close, with the owner, the class and the filing date. That list is what a solicitor needs. Known neighbours: Hero Games (Beijing publisher), Hero Games (US tabletop), a mobile game called Happy Hero.
- [ ] Decide: clear, risky, or change the name. Do this before spending on the brand.
- [ ] If clear: file the EU mark yourself at EUIPO, one class to start. It's an online form.
- [ ] US mark: use an attorney, because of the use-in-commerce rules. File after the first paid orders, not before.

**Done looks like:** a one-page note in this repo saying what you found and what you decided.

## Setting up the business

- [ ] Decide sole trader or limited company. Sole trader is faster and cheaper to run; a limited company separates your own money from the business and is what Enterprise Ireland expects for High Potential Start-Up status. If you're going for HPSU, incorporate.
- [ ] Register the business name or the company with the CRO (cro.ie).
- [ ] Register with Revenue for the right taxes (ROS). Ask the accountant which, given the choice above.
- [ ] Open a business bank account. Revolut Business or a pillar bank; the pillar bank matters more if you want credit later.
- [ ] Get an accountant. One conversation now is cheaper than a year of guessing. Ask them specifically about VAT on digital services sold worldwide, and whether a merchant of record removes the problem.
- [ ] Check VAT: selling digital goods across borders has its own rules, and thresholds change. A merchant of record (see Payments) is meant to take this off your plate. Confirm that with the accountant rather than assuming it.
- [ ] Business insurance: public liability and professional indemnity. Cheap, and grant bodies ask.

## Grants and supports

- [ ] Local Enterprise Office, County Hall, Cork: first meeting. Ask which of their supports you qualify for right now and what the next call dates are.
- [ ] Trading Online Voucher: matched funding for online trading. Ask the LEO for the current amount and the conditions.
- [ ] Priming Grant: for a new business in its first eighteen months. Ask what it can be spent on.
- [ ] Feasibility grant: would fund proper market research in the US, which is exactly the number you're least sure of.
- [ ] Enterprise Ireland New Frontiers: founder programme with a stipend. Check the next intake for the Cork hub.
- [ ] Enterprise Ireland High Potential Start-Up: aimed at companies targeting around $1M of export sales inside three years and ten jobs. That is the plan in `docs/business-plan.md`. Ask the LEO how to get introduced.
- [ ] Skillnet or similar training supports, if you end up hiring checkers.

**Done looks like:** one application in, with `docs/pitch.md` and `docs/business-plan.md` attached.

## Before you can take money

- [ ] **A solicitor reads `site/terms/`.** It is written and live, marked as a draft, and no money should change hands until someone qualified has read it.

- [ ] Payments: open a Paddle account, so a paid link goes out without you reading your email first (merchant of record, so US sales tax, EU VAT and UK VAT are theirs, not yours). Lemon Squeezy is the alternative.
- [ ] Terms of sale: what people are buying, delivery time, what happens if they're not happy. Needs a look from a solicitor, not just a template.
- [ ] Refund policy: decide it before the first complaint, not during it. Digital goods have their own consumer-rights rules in the EU and UK.
- [ ] Privacy review: the policy at `/privacy/` is written and true, but it needs a legal read before any child's details are stored. GDPR, and the UK Children's Code.
- [ ] Cookie notice for EU and UK visitors, because Statcounter sets a cookie on the front page.
- [ ] Signed links, so a $39 game can't be turned into a $99 one by editing the address. Fine for the first orders, not for paid ads.
- [ ] Decide on a money-back guarantee. Proposed 21 Sep 2026, not decided.

## Product decisions waiting on Joe

- [ ] Printful samples: a t-shirt, a poster and a mug with a real pixel hero on them, to your own address. Their prices on the order form wait on this.
- [ ] An adult hero sprite. The hero is always drawn as a child today, so the Father's Day gift page promises more than the game draws.
- [ ] Lock the English, then turn the languages back on (`LANGS` in `tools/build.mjs`) and send them to native speakers.
- [ ] Confirm the design direction in `CLAUDE.md`, or change it.

## Proving it works

- [ ] Ten parents see the demo. Count how many reach for their phone without being asked.
- [ ] Take the first ten orders and time every one, start to sent. The plan guesses 8 minutes for $39 and 15 for $99.
- [ ] Record the $39/$99 split and how many $39 buyers upgrade.
- [ ] Measure the share rate: how many families press Share at the end.
- [ ] Ask every buyer for a ten-second clip of the moment the child sees their name. Those clips are the advertising.

## Languages

- [ ] **Paused 21 Sep 2026 until the English is settled.** The language folders redirect to English for now.
- [ ] Get each language read by a native speaker. All five are Claude's work: good enough to ship, not good enough to be proud of. The jokes and the taunts are what matter, not the privacy policy.
- [ ] Irish: Joe's wife teaches Irish and is checking that one.
- [ ] Note for whoever checks: in-game text is written without É, Í, Ó and Ç because the pixel font cannot draw them as capitals. Á, Ñ and Ü are fine. If a phrase needs one of the missing ones, reword it rather than dropping the accent silently.

## From the competitor research

See `docs/competitors.md`. These are the cheap, proven moves.

- [ ] A printable gift card the moment someone pays, free, so there is something to hand over on the day.
- [ ] Put "works on any phone, nothing to install" in the first screenful. Muksun's $99 game does not run on an iPhone.
- [ ] Sell the poster framed as well as rolled, once the Printful sample is in. Ready Player U's 1,873 reviews say people frame this.
- [ ] Decide whether to list on Etsy for discovery, at a price that suits Etsy, without dropping the price here.
- [ ] Collect the first fifty reviews and ten reaction clips. We have no proof and they have thousands.

## Marketing, when the above is done

- [ ] Referral: a code on every finished game, so a family can pass it on.
- [ ] Easter Egg Hunt, in February, but only if Halloween or Christmas actually gets passed around.

## Done

- [x] Register happyherogames.com, set up hosting, HTTPS and hello@ (19 Sep 2026).
- [x] Landing page, hero builder and free demo live (20 Sep 2026).
- [x] Prices decided: $99 and $179, no cheap tier, no subscription (20 Sep 2026). Replaced the next day.
- [x] Privacy policy written and published (20 Sep 2026).
- [x] Business plan, one-page pitch and product spec written (20 Sep 2026).
- [x] Competitor research done and written up (20 Sep 2026).
- [x] Sunset is the site, with a one-button dark mode. Paper dropped (20 Sep 2026).
- [x] Translation machinery built (20 Sep 2026).
- [x] Spanish, German, French, Italian and Irish live, pages and game (20 Sep 2026).
- [x] Title screen made readable, poster and trailer regenerated, link previews added (20 Sep 2026).
- [x] Premiere removed: too much work for the return (20 Sep 2026).
- [x] Terms and refunds drafted, orders open for the first ten by email (20 Sep 2026).
- [x] docs/viral.md: fifty ways to spread it (20 Sep 2026).
- [x] Party mode: two to six challengers take turns against the hero, results board, champion (20 Sep 2026).
- [x] Name in lights generator, built and retired the same day: three free things were harder to explain than two (20 Sep 2026).
- [x] Trick or Treat Dash, free, sixty seconds, shareable score (20 Sep 2026).
- [x] Pixel HHG logo beside the wordmark, matching favicon (20 Sep 2026).
- [x] In-game text resized for phones: title, versus, how-to, results and the locked card (20 Sep 2026).
- [x] Sleigh Dash, the free Christmas game: one button, sixty seconds, a present down every chimney (20 Sep 2026).
- [x] The free games moved to /free/, with a list page and a Free games menu. The old addresses 301 (20 Sep 2026).
- [x] arcade/free.js: one harness for every free game, so the next season is a game file and a page (20 Sep 2026).
- [x] The game's look chosen from ten rendered on the real game: Poster Bold, and all five games redrawn with proper scenery (20 Sep 2026).
- [x] Bungee dropped for Bowlby One, which has a lowercase, so the wordmark reads HappyHeroGames (20 Sep 2026).
- [x] Occasion scenes on the name page: cake and balloons, tree and snow, flowers, trophy (20 Sep 2026).
- [x] Every page shares one header and footer, and the marketing pictures are rendered from the game itself (20 Sep 2026).
- [x] Copy check: every sentence scored, twelve rewritten, docs/copy-check.md and tools/copy.mjs (20 Sep 2026).
- [x] Ten copy changes for the sale itself: the phone promise, the photo line, a reason for the box, how long it lasts (20 Sep 2026).
- [x] A language is offered, never forced: one dismissible line for a Spanish browser (20 Sep 2026).
- [x] The free games ask for an email at the end, at the one moment somebody is pleased (20 Sep 2026).
- [x] Make, play, keep: the demo ends on $39 for this game or $99 for all five, same day (21 Sep 2026).
- [x] The quiz removed. The five are four games and the final battle (21 Sep 2026).
- [x] "Made by": who the game is from and a line for them, on the game's page and its title screen (21 Sep 2026).
- [x] Order form: rush and sibling add-ons replaced by a t-shirt, poster or mug (21 Sep 2026).
- [x] Translations paused, language folders redirect to English (21 Sep 2026).
