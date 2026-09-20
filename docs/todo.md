# Joe's list

Everything outside the code that has to happen, in the order it matters. Tick things off in here, and add anything new at the bottom of its section rather than in your head.

Rules for this file: one line per job, the point of it, and what "done" actually looks like. If a job needs a decision from Joe before anyone can act, it says so. Amounts and rules for Irish schemes change; check each one at source before quoting it anywhere.

Last updated 20 September 2026.

## This week

- [ ] Search the trademark (see Trademark below). Two hours, and it decides whether the name is safe to spend on.
- [ ] Book the Local Enterprise Office meeting at County Hall, Cork. Bring `docs/pitch.md`.
- [ ] Show the demo to ten parents outside the family, at least three American. Watch, don't pitch. Write down what they do, not what they say.
- [ ] Decide the three skins for the site (previews in `tools/skin-previews/`).
- [ ] Set up a Tally form so the site can collect emails instead of asking people to write one.

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

- [ ] Payments: open a Paddle account (merchant of record, so US sales tax, EU VAT and UK VAT are theirs, not yours). Lemon Squeezy is the alternative.
- [ ] Terms of sale: what people are buying, delivery time, what happens if they're not happy. Needs a look from a solicitor, not just a template.
- [ ] Refund policy: decide it before the first complaint, not during it. Digital goods have their own consumer-rights rules in the EU and UK.
- [ ] Privacy review: the policy at `/privacy/` is written and true, but it needs a legal read before any child's details are stored. GDPR, and the UK Children's Code.
- [ ] Cookie notice for EU and UK visitors, because Statcounter sets a cookie on the front page.
- [ ] The questionnaire, payments and the ordering system have to exist. That's the contract developer job in the plan.

## Product decisions waiting on Joe

- [ ] Pick up to three skins from `tools/skin-previews/`. Claude's pick: Paper as the default, Cabinet for dark, Sunset for warmth.
- [ ] Print partner: order one A2 poster from Prodigi and one from Printful, to your own address, and compare them in your hands. Left aside on 20 Sep 2026.
- [ ] When orders open. Not decided.
- [ ] A logo beyond the pixel H favicon.
- [ ] Confirm the design direction in `CLAUDE.md`, or change it.

## Proving it works

- [ ] Ten parents see the demo. Count how many reach for their phone without being asked.
- [ ] Take ten hand-built orders at $99 and build them yourself. Time every one, start to delivered.
- [ ] Check whether 18 minutes of checking is honest. The whole margin rests on it.
- [ ] Measure the share rate: how many families press Share at the end.
- [ ] Ask every buyer for a ten-second clip of the moment the child sees their name. Those clips are the advertising.

## Marketing, when the above is done

- [ ] First paid social budget, to find the real cost of winning a customer. The plan assumes $38.
- [ ] Referral: a code on every finished game, so a family can pass it on.
- [ ] Link previews: make a shared game link show that family's own title screen. Cheap, and it turns every share into an advert.
- [ ] Seasonal free drop (a Halloween game for everyone who has bought) as loyalty that costs one game to build.

## Done

- [x] Register happyherogames.com, set up hosting, HTTPS and hello@ (19 Sep 2026).
- [x] Landing page, hero builder and free demo live (20 Sep 2026).
- [x] Prices decided: $99 and $179, no cheap tier, no subscription (20 Sep 2026).
- [x] Privacy policy written and published (20 Sep 2026).
- [x] Business plan, one-page pitch and product spec written (20 Sep 2026).
