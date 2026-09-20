# Happy Hero Games: business plan

Written 19 September 2026. Rewritten 20 September 2026 for a US-first launch in US dollars, then again the same day around two prices and a single target: $1M of annual sales. Every number here is an assumption to test, not a forecast. Where something does not add up, it is said out loud rather than smoothed over.

The doc keeps British spelling. The site uses US spelling, because the buyers are American.

## 1. The business in two paragraphs

Happy Hero Games sells a personalised web arcade game as a gift. Someone buys it for a child, or sometimes for a grown-up, for a birthday or Christmas. They answer a questionnaire about the family. Two days later they get a private link to a game where that person is the hero and their own family are the opponents: Dad at penalties, Granny in the quiz, the dog as referee. It ends with the family cheering and the child's name in lights. It plays in any browser, with nothing to install. A free demo on the landing page builds the hero in pixels in under a minute, and that demo is what sells the product.

There are two prices. The game is $99: five games and a boss, up to eight people, their own lines, ready in 48 hours and checked by a person. The gift box is $179: exactly the same game, plus three physical or event extras, a printed arcade poster of the hero's own title screen, a premiere link everyone opens at the same moment, and a twenty-second trailer of their game for the family chat. The company is Irish, based in Ireland, selling into the United States from day one. The target this plan is built around is $1M of annual sales, which at an average order of $115 is about 8,700 games a year.

## 2. The honest summary

- **This is a one-off gift business.** No subscription, no recurring revenue. Every month starts at zero and has to be sold again. That is the central risk and nothing in this plan hides it.
- **The target is $1M of annual sales.** Section 6 does the arithmetic. It is roughly 8,700 orders a year, 725 a month, about 24 a day.
- **The demand is proven.** [Muksun Games](https://muksungames.com/) sells custom games starring your family for $99 (Android and Windows only). [Wonderbly](https://en.wikipedia.org/wiki/Wonderbly) sold millions of personalised children's books and was bought by Penguin Random House in 2025. We need to be better, not first.
- **The US is the market.** Roughly 73 million under-18s, a culture of spending on birthday presents, and ad platforms that will sell as much reach as we can pay for. Ireland is where the work happens and where the first hand-built games get made. It is not the launch market.
- **The make-or-break number is human time per order.** Five games rather than ten roughly halves it. At 18 minutes of checking, a $99 order clears about $82 before advertising.
- **The second make-or-break number is what a customer costs.** The plan assumes $38 blended in the US, inside a range of $30 to $45. If it settles at $60 the business does not work at these prices.
- **The free demo is the sales engine.** Someone types a name, sees the hero in pixels, plays a game, then hits a locked card. That is the moment that sells it.

## 3. Pricing

Two prices, in US dollars, shown in dollars to everyone.

| Product | Price | What's in it |
|---|---|---|
| The game | $99 | Five games and a boss. Everyone in it, up to eight people. Their own lines. Ready in 48 hours, checked by a person. |
| The gift box | $179 | The same game, plus a printed arcade poster of their title screen, a premiere, and a twenty-second trailer. |
| Gift cards | $99 or $179 | The giver pays, the parent fills in the questionnaire. |

The free demo is one game, then a locked card. It is not a price tier and it is never sold. It is the advert.

**Everything except the physical extras is identical between the two.** Same five games, same boss, same eight people, same lines, same 48 hours. The only choice a buyer makes is whether they want something printed. That is the whole point: one variable. A pricing page with one variable on it can be understood in five seconds, and a gift buyer decides in about that long.

### Why the $49 Starter is gone

It was in the plan until 20 September 2026 and it is now dropped. Its own numbers killed it. At $49, after fees, checking, drafting and hosting it left $35.45, and at a blended $38 to win a customer that is a loss of $2.55 an order. It only ever worked as a decoy: a cheap option whose job was to make $99 look sensible. Selling something at a loss so that a different thing looks better is a bad trade when the cost is a third column on the pricing page and a buyer who has to work out what "three games" means against "five games". It made the page hard to understand, and that is what it was removed for.

### What the gift box actually is

- **The poster.** Their own title screen, STARRING AOIFE, their name in lights, printed and ready to frame. Made by a print-on-demand partner, Prodigi or Printful, that prints in the buyer's own country. A US order prints in the US and arrives in about three days. No customs, nothing posted from Ireland, nobody here touching it. About $15 to $20 delivered.
- **The premiere.** The buyer picks a date and time. Everyone gets a countdown link that opens the game at that moment, wherever they are, so a grandparent in Florida and a cousin in Cork see it together. This is already built and live at `site/premiere/`. It costs nothing per order.
- **The trailer.** A twenty-second video of their own game, rendered from the same pixels, for the family chat. No new data is collected.

### What is not sold

No subscription. No sibling add-on: eight people is enough room for a brother or sister without a separate line at checkout. **No voice recordings**, dropped on 20 September 2026 for privacy and not coming back, because audio of a child is the most sensitive thing this company could hold and nobody asked for it.

**A gift never expires.** Every game is static files in a folder at a private link, and it keeps working at that link. Nothing is taken back and there is nothing to cancel.

Prices on the site and prices in this plan have to be the same figures. If one moves, the other moves in the same commit.

## 4. Unit economics

Fees are 5% plus $0.50 on every order, through a merchant of record. Human checking is $28 an hour: 18 minutes on the game, 25 minutes on the gift box, the extra seven minutes being the poster artwork check. AI drafting is $3. Hosting is about $0.20 an order. The poster is $15 to $20 delivered; the table takes the worse end, $20. The trailer render rounds to $0.10 and the premiere to nothing.

| Per order | The game $99 | The gift box $179 |
|---|---|---|
| Price | $99.00 | $179.00 |
| Fees (5% + $0.50) | $5.45 | $9.45 |
| Human check | $8.40 (18 min) | $11.67 (25 min) |
| AI drafting | $3.00 | $3.00 |
| Printed poster, delivered | none | $20.00 |
| Trailer render | none | $0.10 |
| Hosting | $0.20 | $0.20 |
| **Left before advertising** | **$81.95** | **$134.58** |
| **Left after $38 of advertising** | **$43.95** | **$96.58** |

At the good end of the print quote, $15 rather than $20, the gift box leaves $139.58 before advertising. Budget for reprints on top: a 5% reprint rate on a $20 poster is about $1 an order, and that is the number to watch once real prints are going out.

**The mix.** Assume 80% take the game and 20% the gift box. That gives an average order of **$115** and **$92.48 left before advertising**, which is 80% of revenue. After $38 of advertising, **$54.48 an order survives**. That $54.48 is the number the rest of the plan runs on.

The gift box is the better margin, $134.58 against $81.95, for seven more minutes of human time and one thing in the post that we never touch. If the split comes in at 30% boxes rather than 20%, the average order rises to $123 and contribution to about $59. If it comes in at 10%, they fall to $107 and $49. Measure the split from the first hundred orders before trusting any month in section 7.

## 5. Customers

In order of how much we spend to reach them.

| Who | Why they buy | Where to reach them |
|---|---|---|
| US parents of 5 to 12-year-olds | A birthday present nobody else will give, that the child plays with the family | Instagram and TikTok ads, Facebook parent groups, class group chats |
| US grandparents, godparents, aunts and uncles | Something personal that isn't another toy, and easy to give from far away | Gift cards, Facebook, search in November and December |
| UK, Irish, Canadian and Australian parents | Same reason, same language, no translation. Second wave, once the US ads pay back. | The same ads, run later, at lower budgets |
| Partners and grown-up children buying for an adult | A Father's Day, Mother's Day or milestone-birthday present with the whole family in it. Untested; the model counts none of it. | Search and gift guides around those days |

Why the US and not Ireland. Ireland has about 60,000 births a year against roughly 3.6 million in the US, and Irish parents will not carry a paid-ads business. The first hand-built games still come from Joe's own network in Ireland, because that is the fastest way to learn what breaks. Those families are research, not a launch market. The money goes into US ads from the start.

What the US costs us: a merchant of record for sales tax in about 45 states, US spelling and date formats, and support hours that overlap the east coast. The poster prints in the buyer's own country, so the one physical item is not a reason to hold the US back.

### What makes us different

| | Muksun Games | Happy Hero Games |
|---|---|---|
| Price | $99 | $99 or $179 |
| Plays on | Android, Windows PC | Any browser: iPhone, Android, iPad, laptop. Nothing to install. |
| Try before you buy | No | A free demo built in a minute, in the browser |
| Built from | Photos and locations | A questionnaire about the family. No photos. |
| The family | Appear in the story | Are the opponents, the referee, the cook, the teammate |
| Ending | Game ends | The occasion: cake and "HAPPY BIRTHDAY" with the whole family |

The pitch: **"Put someone special in their own arcade game."**

## 6. The $1M target

The whole plan is built around one number: $1M of sales in a year.

**How many orders that is.** At an average order of $115, $1M is 8,696 orders. Call it 8,700 a year. That is 725 a month and about 24 a day, every day. On the 80/20 mix that is roughly 6,960 games at $99 and 1,740 gift boxes at $179.

**What each of those orders leaves.** $115 in, minus $6.25 of blended fees, minus $9.05 of blended checking, minus $3 of drafting, minus $4 of blended poster cost, minus $0.20 of hosting, leaves $92.48. Minus $38 of advertising, **$54.48 of contribution an order**.

**What the year looks like at that volume.**

| At 8,700 orders a year | |
|---|---|
| Sales | $1,000,000 |
| Fees | $54,400 |
| Human checking | $78,700 |
| AI drafting | $26,100 |
| Posters (1,740 at $20) | $34,800 |
| Hosting and trailer renders | $1,900 |
| **Contribution before advertising** | **$804,100** |
| Advertising (8,700 at $38) | $330,600 |
| **Contribution after advertising** | **$473,500** |

**What that $473K has to cover.** Everything that is not per-order: Joe's own pay, an operations lead, someone running paid social, a contract developer, art work, tools and hosting overhead, accounting, legal and privacy review, insurance, refunds and reprints beyond the budgeted $1 an order, and tax. A rough sketch of that is $280K to $320K, which would leave somewhere around $150K to $190K before tax. It is a sketch, not a budget. Get real quotes before quoting it anywhere, and in particular before quoting it in a grant application.

**Where it breaks.** At $45 blended acquisition instead of $38, contribution falls to $47.48 an order and $413K a year, and the fixed costs above eat most of it. At $30 it rises to $62.48 and $543K. Nothing else in the model moves the answer as much.

## 7. Hiring, driven by orders

Nobody gets hired before the orders exist. Every trigger below is a number of orders a month, not a date.

**The arithmetic.** Checking is 18 minutes for a game and 25 for a box, so 19.4 minutes blended at the 80/20 mix. At the $1M run rate of 725 orders a month that is 234 hours a month, or about 2,810 hours a year. Counting a full-time checker at about 1,700 productive hours a year, that is **1.65 full-time checkers**. If checking comes down to a flat 18 minutes across both products, it is 2,610 hours and about 1.5 people. Either way, running $1M of sales needs under two people doing the checking. That is the whole reason the product is five games and not ten.

| Trigger | Hire | Why |
|---|---|---|
| Under 150 orders a month | Nobody | Joe checks every order. At 150 orders that is 48 hours a month, which is the ceiling for one person who is also selling. |
| 150 orders a month | A part-time checker | Takes the checking off Joe so he can sell. A half-time checker covers about 220 orders a month. |
| 400 orders a month | A second checker, and someone running paid social | 400 orders is 129 hours, roughly one full-time checker. Ad spend is about $15K a month by then, which is more than a founder should be running between other jobs. |
| 800 orders a month | An operations lead | 800 orders is 259 hours, about 1.8 checkers, plus print partners, refunds, reprints and the delivery promise. That needs an owner who is not Joe. |
| Every further 300 orders a month | Another checker | One full-time checker covers about 450 orders a month at 19.4 minutes. Above 800 the ladder above runs out, so add capacity by this rule. |

**The developer is a contractor throughout, not an employee.** The backend, payments, the generator and the checking tool are project work with a beginning and an end. A full-time developer at this volume would be the largest fixed cost in the business and would spend most of the year without a project. Revisit only if the product needs continuous engineering, which on current evidence it does not.

**Seasonal checkers.** Christmas is roughly 2.5 times a normal month, so December needs two or three extra checkers hired and trained from October. Train them on real orders in November, not on Christmas Eve.

## 8. The revenue model

Assumptions, all to test:

- Hand-built orders from October 2026, mostly to Joe's own network in Ireland, then a generator from spring 2027.
- Both prices fully live from February 2027. Before that the average order is $99 to $105, because the first families get hand-built games while the poster, premiere and trailer are still being proven.
- Mix of 80% game and 20% gift box from February 2027, giving an average order of $115.
- Blended acquisition $38 an order. Spend is lower in the first three months, because those orders come from Joe's own network.
- Contribution is revenue minus fees, checking, drafting, hosting, poster and advertising: $54.48 an order at the full mix.
- Christmas is about 2.5 times a normal month, less than a pure gift product because birthdays fill the year.
- No recurring revenue anywhere. Every dollar is a one-off sale.

Money columns are in thousands of dollars.

| Month | Orders | Average order | Revenue | Ad spend | Contribution after ads |
|---|---|---|---|---|---|
| Oct 26 | 15 | $99 | $1.5K | $0.2K | $1.0K |
| Nov 26 | 40 | $99 | $4.0K | $0.8K | $2.5K |
| Dec 26 | 90 | $99 | $8.9K | $2.2K | $5.2K |
| Jan 27 | 50 | $105 | $5.3K | $1.9K | $2.3K |
| Feb 27 | 70 | $115 | $8.1K | $2.7K | $3.8K |
| Mar 27 | 100 | $115 | $11.5K | $3.8K | $5.4K |
| Apr 27 | 160 | $115 | $18.4K | $6.1K | $8.7K |
| May 27 | 200 | $115 | $23.0K | $7.6K | $10.9K |
| Jun 27 | 260 | $115 | $29.9K | $9.9K | $14.2K |
| Jul 27 | 300 | $115 | $34.5K | $11.4K | $16.3K |
| Aug 27 | 340 | $115 | $39.1K | $12.9K | $18.5K |
| **Sep 27** | 450 | $115 | **$51.8K** | $17.1K | $24.5K |
| Oct 27 | 560 | $115 | $64.4K | $21.3K | $30.5K |
| Nov 27 | 900 | $115 | $103.5K | $34.2K | $49.0K |
| Dec 27 | 1,500 | $115 | $172.5K | $57.0K | $81.7K |
| Jan 28 | 600 | $115 | $69.0K | $22.8K | $32.7K |
| Feb 28 | 700 | $115 | $80.5K | $26.6K | $38.1K |
| Mar 28 | 820 | $115 | $94.3K | $31.2K | $44.7K |
| Apr 28 | 900 | $115 | $103.5K | $34.2K | $49.0K |
| May 28 | 1,000 | $115 | $115.0K | $38.0K | $54.5K |
| **Jun 28** | 1,200 | $115 | $138.0K | $45.6K | $65.4K |
| Jul 28 | 1,250 | $115 | $143.8K | $47.5K | $68.1K |
| Aug 28 | 1,350 | $115 | $155.3K | $51.3K | $73.6K |
| Sep 28 | 1,600 | $115 | $184.0K | $60.8K | $87.2K |
| Oct 28 | 1,800 | $115 | $207.0K | $68.4K | $98.1K |
| Nov 28 | 2,600 | $115 | $299.0K | $98.8K | $141.6K |
| Dec 28 | 4,000 | $115 | $460.0K | $152.0K | $217.9K |

### What the table says

- **Total revenue first passes $50K in September 2027**, at $51.8K on 450 orders. August is $39.1K, so the month it lands depends on about ninety orders. It does not fall below $50K again after October 2027.
- **The run rate first passes $1M a year in June 2028.** Measured properly, as trailing twelve months, the twelve months to June 2028 total $1.07M. The twelve months to May 2028 total $958K. Two earlier months annualise above $1M on their own, November and December 2027, but those are Christmas and annualising a Christmas month is dishonest. The first ordinary month whose rate would hold at $1M a year is March 2028, at $94.3K.
- **At the $1M crossing the business has about five people.** June 2028 runs 1,200 orders a month, which is 388 hours of checking, so roughly 2.7 full-time checkers. Call it three checkers, an operations lead, someone on paid social, Joe, and a developer on contract. Calendar year 2028 in this table totals about $2.05M, well past the target, so $1M is a waypoint and not the end of the plan.
- **Christmas is a staffing problem before it is a revenue one.** December 2027 is 1,500 orders, about 485 hours of checking and $13.6K of wages in one month. December 2028 is 4,000 orders, 1,293 hours, roughly nine full-time checkers for a single month. That is not plausible with hiring alone. Either close Christmas orders early, cap December volume, or get the checking time down before the second Christmas. Say which, in writing, by September 2028.
- **Ad spend is the whole risk.** December 2027 spends $57K to earn $172.5K, and it goes out before the revenue comes in. At $45 blended that month's ad bill is $67.5K.
- **Posters are a cash cost too.** December 2027 is about 300 posters at $20, so $6K to the printer before delivery. December 2028 is about 800.
- **Nothing underneath.** Every month starts at zero. That is the cost of having no subscription, and it is why the acquisition number matters more here than it would in a recurring business.

## 9. Operations

The paid game follows `docs/product.md`: questionnaire, generator, a person checks it, delivery in 48 hours or on the chosen date. The demo already proves the generator's first half, config to sprites and games. What is missing: the questionnaire, payments, order storage with consent and deletion, the AI drafting step, a checking tool, and the rest of the game library.

Five games per order rather than ten is the decision that makes the checking time work, and it also means a smaller library to build before launch.

**Payments go through a merchant of record, Paddle or Lemon Squeezy.** They take about 5% plus $0.50, more than Stripe, and in exchange they become the seller of record and handle US state sales tax, EU VAT and UK VAT, including registration and filing. For a small Irish business selling digital goods into 45 US states, that is the reason to use them. Revisit when the gap between 5% and 3% pays for an accountant.

Support runs from Ireland, five hours ahead of New York. Answer US email by early afternoon Irish time so a parent who writes in the evening has a reply when they wake up.

The gift box needs no warehouse and no packing table. The poster file goes to the print partner by API, they print and post it in the buyer's own country, and the only Irish work is checking the artwork before it goes.

## 10. Growth

1. **The demo is the ad.** Every ad and post links straight to the builder, not a sales page. Measure builder starts, demo plays, then purchases.
2. **US paid social first.** Instagram and TikTok, creative that opens on a child seeing their own name in pixels. Whether blended acquisition lands nearer $30 than $45 decides the business.
3. **Reaction videos.** A child seeing themselves in lights for the first time is the best advert we can buy. Pay US families, with consent, to film it.
4. **Kids share it.** Share on the finale sends a picture plus the game's link. Every paid game carries a "make one for your family" link with a referral code: $10 off for the friend, a credit for the family. Target 15% of orders from referrals by month six.
5. **The trailer is an advert we do not pay for.** Every gift box produces a twenty-second video of that family's own game with the site on the end card, and it lands in a group chat where every other adult has a child with a birthday coming. Measure trailer shares, clicks back to the builder and orders per trailer. If a trailer beats a share picture, put it in the $99 game too.
6. **Gift cards** for grandparents and faraway relatives, pushed hardest in November and December.
7. **Then the rest of the English-speaking market:** the UK and Ireland from the third quarter of 2027, Canada and Australia in 2028. Same copy, a currency switch, a different tax registration. Australia is worth doing for the reversed seasons: their summer birthdays land in our quiet months.
8. **Later:** a club or school version, the whole team as heroes, sold as a fundraiser. Parked until the family product works.

## 11. Plan

| Phase | When | What | Done when |
|---|---|---|---|
| 0. Prove it | Now to Dec 2026 | Landing page and demo live. Launch list. Hand-build 50 to 100 paid orders for Christmas, mostly through Joe's network in Ireland. | 50 paid orders, time per order written down, share rate measured |
| 1. Generator and US launch | Jan to Mar 2027 | Questionnaire, merchant of record, private links, two-price checkout, enough games in the library for a five-game order, AI drafting, checking tool, US copy and support hours, first paid US ads | Under 25 minutes of human time per order, blended acquisition under $45 |
| 2. The gift box and referrals | Apr to Jun 2027 | Print-on-demand poster through Prodigi or Printful, premiere (already built), trailer render, referral codes, gift cards | Gift box at 20% of orders, under 25 minutes of handling each, reprint rate under 5% |
| 3. Scale | Jul to Dec 2027 | Reaction-video ads at volume, UK and Ireland launch, seasonal checking team, first permanent checker and paid social hire | Profitable after ads through Christmas |
| 4. To $1M | 2028 | Canada and Australia, second print partner, operations lead, checking time down before the second Christmas | Trailing twelve months past $1M |

**Team for phases 0 and 1:** Joe on product, sales and the first families, a contract developer on backend, payments and the generator, and a pixel artist for hair styles, roles and new game art. No employees until section 7's triggers are hit.

**Money to the end of phase 1:** about $15K to $25K for contract development, legal and privacy review, the domain and trademark filing, and early US ads. Get real quotes before committing.

## 12. Irish grant funding

The company is Irish, trading from Ireland, selling almost entirely into export markets. That profile fits several Irish supports. What follows is a map of which doors to knock on, not a funding plan. **No amounts or rates are quoted here on purpose.** Every scheme below changes its limits, its rates and its eligibility rules, sometimes more than once a year, and several are administered locally with discretion. Confirm current terms with the Local Enterprise Office or Enterprise Ireland directly before any figure goes into an application, a cash-flow forecast or this document.

**Local Enterprise Office (the LEO for the county where the business is registered).** The first call, and the one that costs nothing to make.

- **Trading Online Voucher.** Aimed at small businesses improving how they sell online. It is matched funding, so it pays a share of eligible costs and the business pays the rest. It is the most obvious fit for the checkout, the questionnaire and the order system. There is usually a short training session to attend before applying.
- **Priming Grant.** For businesses in their first eighteen months of trading. It is assessed on jobs created and on export potential, both of which this plan speaks to directly: section 7 ties every hire to a volume of orders, and effectively all the revenue is export.
- **Feasibility Study Grant.** For researching whether a new product or market is viable. The honest use here would be the US market test: what a customer costs on US paid social, what the print partners deliver in practice, and whether the 18-minute check holds. That work is real, it is scheduled in phase 1, and it is the sort of question this grant exists to answer.
- LEOs also run mentoring and management development programmes. They cost little or nothing and are worth taking on their own merits.

**Enterprise Ireland.**

- **New Frontiers** is the national entrepreneur development programme, delivered through institutes of technology and universities. Phase 2 is a full-time, several-month programme with a stipend and space. It suits a founder taking a product from prototype to first paying customers, which is where this business is now.
- **High Potential Start-Up (HPSU) status** is Enterprise Ireland's designation for start-ups that are export-oriented, based in a knowledge or technology sector, and capable of reaching roughly $1M in export sales and around ten jobs within three years. That is the reason this plan is built around $1M rather than a monthly revenue figure: section 6 sets out the $1M explicitly, section 7 sets out the headcount and what drives it, and section 8 shows the month it lands. Whether this business meets the technology test is Enterprise Ireland's call, not ours, and it should be asked plainly rather than assumed.
- A company must normally be a limited company to be considered, so the sole trader question has to be settled before any of this is pursued.

**What an assessor should be told straight.** The business has no revenue yet. The landing page, the hero builder and the free demo are built and live at happyherogames.com. The premiere is built. The generator, the questionnaire and payments are not. The numbers in sections 4, 6 and 8 are assumptions with their sources stated, not results, and the two that matter most, the cost of a customer and the minutes of human checking per order, are both scheduled to be measured in phase 1 before any scaling spend.

**Next step on funding:** book the LEO meeting, ask which of the three grants this business is actually eligible for as it stands, and get the current rates in writing. Nothing above goes into an application until that has happened.

## 13. What would kill it

Decide these now, and change course if they happen.

- Blended acquisition cost above $60 after $10K of US ad spend, with no creative that beats it.
- Fewer than 5% of demo players joining the launch list, or fewer than 50 paid orders from the first 1,000 demo plays.
- Human time per order still over 40 minutes after 200 orders.
- The gift box under 10% of orders, which pulls the average order to $107 and contribution to about $49.
- Under 30% of families pressing Share. Without sharing and referrals every order has to be bought, and there is no repeat revenue underneath.

## 14. Risks

- **Children's data.** One leak would end it. Collect little, show less, private by default, reviewed by a lawyer before launch. US children's privacy law (COPPA) sits on top of GDPR and the UK Children's Code, and the FTC has been fining on it. Get US advice, not just Irish advice, before the first US order. Voice recordings were dropped on 20 September 2026 and stay dropped. The print partner is the one place a child's first name leaves our systems: send the artwork and a delivery address, nothing else, and put a data processing agreement in place before the first order.
- **No repeat revenue.** A bad ad month is a bad revenue month with nothing underneath it. Keep enough cash to carry two slow months, and do not let the December ad budget eat the reserve.
- **Five games might be too little for $99.** Ten was generous and slow; five is fast and could feel thin next to Muksun's $99. Watch refund requests and the "is that it?" question in support mail from the first fifty orders. If it reads as thin, add a sixth game before cutting the price.
- **Losing the $49 option could cost volume.** Removing the cheap tier makes the page clearer, but it also removes the only entry point under $99, and some buyers who would have spent $49 will now spend nothing. The decoy effect it provided is gone too. Watch the conversion rate from demo play to purchase before and after, and if it falls hard, the answer is a clearer $99 page, not a third price back.
- **The print could be bad.** The poster is the only thing a customer can physically be disappointed by, and we never see it before they do. A dull print, wrong colours, a crease, or a poster arriving after the birthday, and the whole $179 feels like a con. Order test prints from both partners before committing, check every artwork file by hand inside the 25 minutes, reprint free and without argument, and keep a second partner ready for Christmas.
- **The poster could look cheap in a frame.** Pixel art at poster size can read as a low-resolution screenshot rather than an arcade marquee. Render at print resolution from the start, compose the title screen as a poster rather than cropping the game, choose a heavy matte stock, and photograph a real one before selling it.
- **Depending on one print partner.** Prodigi and Printful are other people's factories and other people's Christmas queues. Set up both, test both, be able to switch in a day.
- **Currency and the Irish base.** Revenue is in dollars, costs are largely in euro and sterling. A 10% move moves the margin on a $99 order by about $8. Printing in dollars in the US takes some of that out.
- **The name.** "Hero Games" is used by a Beijing publisher and a US tabletop publisher, and there is a mobile game called Happy Hero. Search USPTO before spending on the brand in the US, and EUIPO before spending in Europe.
- **Quality slipping.** It only works while the jokes feel made for that family. Eighteen minutes is the budget, not the target. Do not cut the human check to save money.
- **Copycats.** Anyone with AI tools can make one game. The edge is the demo, the speed, the family depth, the privacy and the share loop.

## 15. The next five steps

1. Done on 20 Sep 2026: $99 and $179 are on the site, with no Starter, club, sibling add-on or voice recordings anywhere. Next: keep the two sets of figures in step, and keep the site and section 3 on the same figures. If one moves, both move in the same commit.
2. Time a real $99 order end to end, start to delivered, and see whether 18 minutes of checking is honest. Sections 4, 6 and 7 all rest on it.
3. Show the demo to ten parents outside the family, at least three of them American. Watch, do not pitch. Ask whether they would pay $99, and whether the poster is worth $80 to them.
4. Open a Paddle or Lemon Squeezy account and read what they require from an Irish business before building anything around it.
5. Book the LEO meeting, and order test posters from both Prodigi and Printful to an Irish address and a US one. Then take ten Christmas pre-orders and build them by hand, at least three of them gift boxes, so the poster, the premiere and the trailer are all tested before anyone pays $179.
