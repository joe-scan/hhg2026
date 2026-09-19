# Happy Hero Games: business plan

Written 19 September 2026. Every number is an assumption to test, not a forecast. The first version of this plan (two siblings, sold as a rivalry game) is in the Fionn vs Sean repo; this version makes one child the hero.

## 1. In one paragraph

Parents and grandparents buy a personalised arcade game for a child's birthday or Christmas. The child is the hero and their own family are the opponents, with the dog as referee, and it ends with "HAPPY BIRTHDAY, AOIFE!" in lights. It plays on any phone. A free demo on the landing page builds their child in pixels in under a minute; the paid game (€69) is made in 48 hours and checked by a person. Revenue comes from the games, then add-ons, then a monthly Season Pass.

## 2. The honest summary

- **The demand is proven.** [Muksun Games](https://muksungames.com/) sells custom games starring your family for $99 (Android and Windows only). [Wonderbly](https://en.wikipedia.org/wiki/Wonderbly) sold millions of personalised children's books and was bought by Penguin Random House in 2025. We need to be better, not first.
- **One hero is a bigger market than two rivals.** Every child has a birthday. Birthdays happen all year, so this is less seasonal than a Christmas gift, and it suits the grandparent who buys one grandchild's present.
- **"€50K MRR quickly" is still the wrong target.** Games are one-off purchases. On the model in section 8, **total monthly revenue passes €50K in November 2027 and stays above it every month from then on**, because birthdays keep sales steady after Christmas. **Recurring revenue alone** (the Season Pass) reaches about €31K by September 2028; €50K needs about 5,600 subscribers, which is 2029 on these numbers.
- **The make-or-break number is human time per game.** At €69 an order earns about €26 after advertising if a person can check it in 30 minutes. At 90 minutes it earns about €1.
- **The free demo is the sales engine.** It already works: a parent types a name, sees their child in pixels, and plays four duels against their own family. That's the moment that sells it, the same way Wonderbly's preview sold books.

## 3. Customers

| Who | Why they buy | Where to reach them |
|---|---|---|
| Parents of 5 to 12-year-olds | A birthday present nobody else will give, that the child plays with the family | Instagram and TikTok ads, parenting groups, school WhatsApps |
| Grandparents, godparents, aunts and uncles | Something personal that isn't another toy, and easy to give from far away | Gift cards, Facebook, search at Christmas and birthdays |
| Families with two kids close in age | The sibling add-on turns it into a rivalry game (the Fionn vs Sean original) | Add-on at checkout |

## 4. What makes us different

| | Muksun Games | Happy Hero Games |
|---|---|---|
| Price | $99 | €49 to €129 |
| Plays on | Android, Windows PC | Any browser: iPhone, Android, iPad, laptop. Nothing to install. |
| Try before you buy | No | A free demo built in a minute, in the browser |
| Built from | Photos and locations | A questionnaire about the family. No photos. |
| The family | Appear in the story | Are the opponents, the referee, the cook, the teammate |
| Ending | Game ends | The occasion: cake and "HAPPY BIRTHDAY" with the whole family |
| Afterwards | One-off | Season Pass: a new duel every month |

The pitch: **"Put your kid in their own arcade game."**

## 5. Pricing

| Product | Price | What's in it |
|---|---|---|
| Free demo | €0 | 4 duels and a boss, built in the browser |
| Starter | €49 | 6 duels, 1 boss, the hero, one family member and the dog |
| Family | €69 | 10 duels, 2 bosses, up to 6 family members, custom lines. The main product. |
| Deluxe | €129 | Family, plus recorded family voices, a printed gift box with the card, one change after delivery |
| Sibling add-on | +€20 | A brother or sister as a second hero: turns it into a two-player rivalry |
| Gift card | any tier | The giver pays, the parent fills in the questionnaire |
| Season Pass | €9 a month or €79 a year | A new personalised duel every month, seasonal bosses (Halloween, Christmas), a scoreboard that lasts |

**Cost of one €69 order:** card fees about €2, AI drafting €2 to €5, hosting under €0.50, human check 30 minutes at €25 an hour (€12.50). About **€48 before advertising**, and about **€26 after** a blended €22 to win each customer.

## 6. Growth

1. **The demo is the ad.** Every ad and post links straight to the builder, not a sales page. Measure: builder starts, demo plays, then purchases.
2. **Kids share it.** Share on the finale sends a picture plus the game's link. Every paid game carries a "make one for your family" link with a referral code: €10 off for the friend, a free Season Pass month or bonus duel for the family. Target 15% of orders from referrals by month 6.
3. **Reaction videos.** A child seeing themselves in lights for the first time is the best advert. Pay families (with consent) to film it and run those as ads.
4. **Gift cards** for grandparents and faraway relatives, pushed hardest in November and December.
5. **Ireland first**, then the UK, then the US. Irish parents talk to each other; it's a small, connected first market.
6. **Later:** a club or school version (the whole team as heroes, sold as a fundraiser). A separate bet, parked until the family product works.

## 7. Operations

The paid game follows `docs/product.md`: questionnaire, generator, a person checks it, delivery in 48 hours or on the chosen date. The demo already proves the generator's first half (config to sprites and duels). What's missing: the questionnaire, payments (Stripe), order storage with consent and deletion, the AI drafting step, a checking tool, and the rest of the duel library.

## 8. The revenue model

Assumptions, all to test:
- Hand-built ("concierge") orders from October 2026, then a generator from spring 2027.
- Price rises from €39 for the first families to €69 by January 2027. 20% of orders add a sibling (€20).
- Season Pass from April 2027: 35% of new buyers take it, 20% of earlier buyers at launch, 7% cancel a month, €9 a month.
- €22 blended advertising cost per new game. Christmas brings about 2.5 times a normal month, less than a pure gift product because birthdays fill the year.

| Month | New games | Game + add-on revenue | Active passes | Pass MRR | Total revenue | Ad spend |
|---|---|---|---|---|---|---|
| Oct 26 | 15 | €0.6K | 0 | €0.0K | €0.6K | €0.3K |
| Nov 26 | 40 | €2.1K | 0 | €0.0K | €2.1K | €0.9K |
| Dec 26 | 90 | €5.7K | 0 | €0.0K | €5.7K | €2.0K |
| Jan 27 | 50 | €3.6K | 0 | €0.0K | €3.6K | €1.1K |
| Mar 27 | 100 | €7.3K | 0 | €0.0K | €7.3K | €2.2K |
| Apr 27 | 160 | €11.7K | 124 | €1.1K | €12.8K | €3.5K |
| Jun 27 | 260 | €19.0K | 267 | €2.4K | €21.4K | €5.7K |
| Sep 27 | 450 | €32.9K | 586 | €5.3K | €38.1K | €9.9K |
| Oct 27 | 560 | €40.9K | 741 | €6.7K | €47.6K | €12.3K |
| **Nov 27** | 900 | €65.7K | 1,004 | €9.0K | **€74.7K** | €19.8K |
| Dec 27 | 1,500 | €109.5K | 1,459 | €13.1K | €122.6K | €33.0K |
| **Jan 28** | 600 | €43.8K | 1,567 | €14.1K | **€57.9K** | €13.2K |
| Mar 28 | 820 | €59.9K | 1,870 | €16.8K | €76.7K | €18.0K |
| Jun 28 | 1,200 | €87.6K | 2,563 | €23.1K | €110.7K | €26.4K |
| Sep 28 | 1,600 | €116.8K | 3,500 | €31.5K | €148.3K | €35.2K |

What it says:
- **€50K a month is first reached in November 2027, and January 2028 stays above it.** That January figure is the difference a birthday product makes.
- **€50K of recurring revenue needs about 5,600 active passes**, roughly 1,100 new buyers a month at these rates. That's 2029 unless pass take-up, price or cancellation improve.
- **December 2027 means 1,500 orders**, which is 750 hours of checking at 30 minutes each. Hire seasonal checkers from October, or close Christmas orders early.

## 9. Plan

| Phase | When | What | Done when |
|---|---|---|---|
| 0. Prove it | Now to Dec 2026 | Register the domain. Put the landing page and demo live. Launch list. Hand-build 50 to 100 paid games for Christmas using the demo engine plus AI help. | 50 paid orders, time per game written down, share rate measured |
| 1. Generator | Jan to Mar 2027 | Questionnaire, Stripe, private links, 10 more duels ported and 4 new ones, AI drafting, checking tool | Under 45 minutes of human time per order |
| 2. Season Pass | Apr to Jun 2027 | Monthly duel drops, scoreboards, referral codes, sibling add-on | 25% take the pass, under 8% cancel a month |
| 3. Scale | Jul to Dec 2027 | Reaction-video ads, gift cards, UK launch, seasonal checking team | Profitable after ads through Christmas |
| 4. Next | 2028 | US, more languages, club and school version | Decided by the data |

**Team for phases 0 and 1:** Joe (product, sales, the first families), a freelance developer (backend, payments, generator), a pixel artist (hair styles, more roles, new duel art). Part-time support and checking from phase 2.

**Money to the end of phase 1:** about €15K to €25K for freelance work, legal review, the domain and trademark filing, and early ads. Get real quotes before committing.

## 10. What would kill it

Decide these before starting, and change course if they happen:
- Fewer than 5% of demo players join the launch list, or fewer than 50 paid orders from the first 1,000 demo plays.
- Human time per game still over 60 minutes after 200 orders.
- Under 30% of families pressing Share.
- Season Pass take-up under 15%: then drop the MRR goal and run it as a gift business, which can still be a good one.

## 11. Risks

- **Children's data.** One leak would end it. Collect little, show less, private by default, reviewed by a lawyer before launch.
- **The name.** "Hero Games" is used by a Beijing publisher and a US tabletop publisher; there's a mobile game called Happy Hero. Search trademarks before spending on the brand.
- **Quality slipping.** It only works while the jokes feel made for that family. Don't cut the human check to save money.
- **Copycats.** Anyone with AI tools can make one game. Our edge is the demo, speed, family depth, privacy and the share loop.
- **Seasonality and cash.** Christmas still spikes. Keep enough cash to hire checkers ahead of it.

## 12. The next five steps

1. Register happyherogames.com and search the trademark (EUIPO and USPTO).
2. Show the demo to ten parents outside the family. Watch; don't pitch. Ask what they'd pay.
3. Connect the launch list to a form service and put the landing page live.
4. Take 10 Christmas pre-orders at €39 and build them by hand. Time every one.
5. Decide on the freelance developer for phase 1 by the end of November.
