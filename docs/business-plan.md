# Happy Hero Games: business plan

Written 19 September 2026, rewritten 20 September 2026 for a US-first launch in US dollars, and again the same day for a simpler price ladder and a smaller product. Every number here is an assumption to test, not a forecast. The first version of this plan (two siblings, sold as a rivalry game) is in the Fionn vs Sean repo; this version makes one person the hero. That person is usually a child, which is who the numbers below assume, but the product and the copy work for a grown-up too.

The doc keeps British spelling. The site uses US spelling, because the buyers are American.

## 1. In one paragraph

People buy a personalised arcade game for someone special, usually a child, for a birthday or Christmas. That person is the hero and their own family are the opponents, with the dog as referee, and it ends with "HAPPY BIRTHDAY, AOIFE!" in lights. It plays on any phone. A free demo on the landing page builds the hero in pixels in under a minute. There are three prices: Starter at $49, Family and Friends at $99, and the Gift Box at $179. Family and Friends is the main product and the one the page pushes: five games, one boss, up to eight people, their own catchphrases and lines written in, ready in 48 hours and checked by a person.

## 2. The honest summary

- **This is a one-off gift business.** There is no subscription and no recurring revenue. The monthly club is dropped: it made the product harder to explain, it put every buyer on a treadmill of new content forever, and it could not grow faster than game sales anyway. A monthly product may come back once 100 games have sold and we know what families actually ask for after their game arrives. On the model in section 8 that is around December 2026.
- **The $50K-a-month goal is total revenue, not MRR.** It is a sales target, met by selling roughly 500 games a month at an average order around $100.
- **The demand is proven.** [Muksun Games](https://muksungames.com/) sells custom games starring your family for $99 (Android and Windows only). [Wonderbly](https://en.wikipedia.org/wiki/Wonderbly) sold millions of personalised children's books and was bought by Penguin Random House in 2025. We need to be better, not first.
- **The US is the market.** Roughly 73 million under-18s, a culture of spending on birthday presents, and ad platforms that will sell us as much reach as we can pay for. Ireland is where Joe is and where the first hand-built games get made; it is not where we launch.
- **One hero is a bigger market than two rivals.** Every child has a birthday. Birthdays happen all year, so this is less seasonal than a Christmas-only gift, and it suits the grandparent buying for one grandchild.
- **The make-or-break number is human time per order.** Five games rather than ten roughly halves it. At 18 minutes of checking, a $99 order clears about $82 before advertising. At an hour it clears about $60, and at two hours the Starter tier loses money.
- **The free demo is the sales engine.** Someone types a name, sees the hero in pixels, and plays two games against their own family. That is the moment that sells it, the same way Wonderbly's preview sold books.

## 3. Customers

In order of how much we spend to reach them.

| Who | Why they buy | Where to reach them |
|---|---|---|
| US parents of 5 to 12-year-olds | A birthday present nobody else will give, that the child plays with the family | Instagram and TikTok ads, Facebook parent groups, class group chats |
| US grandparents, godparents, aunts and uncles | Something personal that isn't another toy, and easy to give from far away | Gift cards, Facebook, search in November and December |
| UK, Irish, Canadian and Australian parents | Same reason, same language, no translation work. Second wave, once the US ads are paying back. They are also the only market that can buy the Gift Box. | The same ads, run later, at lower budgets |
| Partners and grown-up children buying for an adult | A Father's Day, Mother's Day or milestone-birthday present with the whole family in it. Untested; the model below counts none of it. | Search and gift guides around those days |

Why the US first and not Ireland. Ireland has about 60,000 births a year against roughly 3.6 million in the US, and Irish parents will not carry a paid-ads business. The old plan's argument was that a small, connected market gives fast word of mouth, and that is still true, which is why the first hand-built games come from Joe's own network in Ireland. But the first families are research, not a launch market. The money goes into US ads from the start.

What the US costs us: a merchant of record for sales tax in about 45 states, US spelling and US date formats, support hours that overlap the east coast, and no physical box until there is a US fulfilment partner (section 11).

## 4. What makes us different

| | Muksun Games | Happy Hero Games |
|---|---|---|
| Price | $99 | $49, $99 or $179 |
| Plays on | Android, Windows PC | Any browser: iPhone, Android, iPad, laptop. Nothing to install. |
| Try before you buy | No | A free demo built in a minute, in the browser |
| Built from | Photos and locations | A questionnaire about the family. No photos. |
| The family | Appear in the story | Are the opponents, the referee, the cook, the teammate |
| Ending | Game ends | The occasion: cake and "HAPPY BIRTHDAY" with the whole family |

The pitch: **"Put someone special in their own arcade game."** The site keeps mentions of children to a minimum so it reads as right for a grown-up hero too.

## 5. Pricing

Three prices, in US dollars, shown in dollars to everyone.

| Product | Price | What's in it |
|---|---|---|
| Starter | $49 | Three games and one boss. The hero and up to three other people. |
| Family and Friends | $99 | Five games and one boss. Up to eight people, their own catchphrases and lines written in. Ready in 48 hours. **The main product.** |
| Gift Box | $179 | Everything in Family and Friends, plus a printed box and card to wrap, tracked delivery, and one change after it arrives. UK, Ireland and the EU only for now. |
| Gift cards | $49, $99 or $179 | The giver pays, the parent fills in the questionnaire. |

The free demo is two games and one boss, built in the browser. It is not a price tier and it is never sold; it is the advert.

**Family and Friends is the product.** Starter exists to make it look like good value and to catch the buyer who wants something small. The Gift Box exists for the person who wants to hand over an object. The page leads with $99, and the other two sit beside it.

**No sibling add-on.** Eight people is enough room for a brother or sister without a separate line on the price list, and one fewer choice at checkout is worth more than $25.

**A gift never expires.** Every game is static files in a folder at a private link, and it keeps working at that link, forever. Nothing is ever taken back and there is nothing to cancel.

Prices on the site and prices in this plan have to be the same figures. If one moves, the other moves in the same commit.

### Unit economics

Merchant-of-record and card fees are 5% plus $0.50 on every order. Human checking is $28 an hour: 18 minutes on Starter and Family and Friends, 35 minutes on the Gift Box because of the printing and the packing. AI drafting is $2 on Starter and $3 on the other two, since there are more people and more lines to write. Hosting is about $0.20 an order.

| Per order | Starter $49 | Family and Friends $99 | Gift Box $179 |
|---|---|---|---|
| Price | $49.00 | $99.00 | $179.00 |
| Fees (5% + $0.50) | $2.95 | $5.45 | $9.45 |
| Human check | $8.40 (18 min) | $8.40 (18 min) | $16.35 (35 min) |
| AI drafting | $2.00 | $3.00 | $3.00 |
| Box, card and tracked delivery | none | none | $27.00 |
| Hosting | $0.20 | $0.20 | $0.20 |
| **Left before advertising** | **$35.45** | **$81.95** | **$123.00** |
| **Left after $38 of advertising** | **-$2.55** | **$43.95** | **$85.00** |

Starter does not pay for its own customer at a blended $38. That is deliberate and it is only safe as long as Starter stays a minority of the mix: it is there to make $99 the obvious choice, not to be sold on its own. If Starter climbs above about a quarter of orders, either raise it or stop showing it to cold traffic and keep it for people who have already seen the demo.

**The mix:** 20% Starter, 65% Family and Friends, 15% Gift Box. That gives an average order value of **$101** and an average of **$79 left before advertising**, which is 78% of revenue. At a blended $38 to win a customer, **about $41 an order** survives.

**The Gift Box's $27** is a printed box and card at about $12 and tracked delivery inside the UK, Ireland and the EU at $12 to $18. It earns more per order than Family and Friends but it ties up 35 minutes and it cannot be sold to the US, so it is priced for the gift, not for the margin.

## 6. Growth

1. **The demo is the ad.** Every ad and post links straight to the builder, not a sales page. Measure: builder starts, demo plays, then purchases.
2. **US paid social first.** Instagram and TikTok, creative that opens on a child seeing their own name in pixels. The whole business depends on whether blended acquisition lands nearer $30 than $45.
3. **Reaction videos.** A child seeing themselves in lights for the first time is the best advert we can buy. Pay US families, with consent, to film it, and run those.
4. **Kids share it.** Share on the finale sends a picture plus the game's link. Every paid game carries a "make one for your family" link with a referral code: $10 off for the friend, a credit for the family. Target 15% of orders from referrals by month 6.
5. **Gift cards** for grandparents and faraway relatives, pushed hardest in November and December.
6. **Then the rest of the English-speaking market:** the UK and Ireland together from the third quarter of 2027, Canada and Australia in 2028. Same copy, same ads, a currency switch and a different tax registration. The UK and Ireland also open up the Gift Box, which cannot ship to America yet. Australia is worth doing for the reversed seasons alone: their summer birthdays land in our quiet months.
7. **Later:** a club or school version, the whole team as heroes, sold as a fundraiser. A separate bet, parked until the family product works.

## 7. Operations

The paid game follows `docs/product.md`: questionnaire, generator, a person checks it, delivery in 48 hours or on the chosen date. The demo already proves the generator's first half, config to sprites and games. What's missing: the questionnaire, payments, order storage with consent and deletion, the AI drafting step, a checking tool, and the rest of the game library.

Five games per paid order rather than ten is the decision that makes the checking time work. It also means a smaller library to build before launch, which brings phase 1 forward.

**Payments go through a merchant of record, Paddle or Lemon Squeezy.** They take about 5% plus $0.50, which is more than Stripe, and in exchange they become the seller of record and handle US state sales tax, EU VAT and UK VAT, including registration, filing and the EU's one-stop shop. For a one-person business selling digital goods into 45 US states from Ireland, that is the reason to use them. Revisit when revenue is large enough that the difference between 5% and 3% pays for an accountant.

Support runs from Ireland, which is five hours ahead of New York. Answer US email by early afternoon Irish time so a parent who writes in the evening has a reply when they wake up.

The Gift Box ships from Ireland and is sold to the UK, Ireland and the EU only. See section 11.

## 8. The revenue model

Assumptions, all to test:

- Hand-built orders from October 2026, mostly to Joe's own network in Ireland, then a generator from spring 2027.
- The three-price ladder is fully live from February 2027. Before that the average order is lower, because the first families get hand-built Starter and Family and Friends orders while the Gift Box is still being worked out.
- Mix of 20% Starter, 65% Family and Friends and 15% Gift Box, giving an average order value of $101.
- December 2027 drops to $96 because December is heavily American and the Gift Box cannot be sold there, so the box's share of that month falls.
- Blended acquisition cost $38 per order, inside an assumed range of $30 to $45 in the US. This is the single number most likely to be wrong, and the one to measure first. Ad spend in the first three months is lower because those orders come from Joe's own network.
- Gross profit is revenue minus fees, AI drafting, hosting, box and delivery, human checking and advertising. It is 78% of revenue before ads.
- Christmas brings about 2.5 times a normal month, less than a pure gift product because birthdays fill the year.
- No recurring revenue anywhere in the model. Every dollar here is a one-off sale.

Money columns are in thousands of dollars.

| Month | New games | Average order | Revenue | Ad spend | Gross profit after ads and checking |
|---|---|---|---|---|---|
| Oct 26 | 15 | $65 | $1.0K | $0.2K | $0.6K |
| Nov 26 | 40 | $75 | $3.0K | $0.8K | $1.6K |
| Dec 26 | 90 | $90 | $8.1K | $2.2K | $4.2K |
| Jan 27 | 50 | $95 | $4.8K | $1.9K | $1.8K |
| Feb 27 | 70 | $101 | $7.1K | $2.7K | $2.9K |
| Mar 27 | 100 | $101 | $10.1K | $3.8K | $4.1K |
| Apr 27 | 160 | $101 | $16.2K | $6.1K | $6.6K |
| May 27 | 200 | $101 | $20.2K | $7.6K | $8.2K |
| Jun 27 | 260 | $101 | $26.3K | $9.9K | $10.7K |
| Jul 27 | 300 | $101 | $30.3K | $11.4K | $12.4K |
| Aug 27 | 340 | $101 | $34.3K | $12.9K | $14.0K |
| Sep 27 | 450 | $101 | $45.5K | $17.1K | $18.5K |
| **Oct 27** | 560 | $101 | **$56.6K** | $21.3K | $23.1K |
| Nov 27 | 900 | $101 | $90.9K | $34.2K | $37.1K |
| Dec 27 | 1,500 | $96 | $144.0K | $57.0K | $55.9K |
| **Jan 28** | 600 | $101 | **$60.6K** | $22.8K | $24.7K |
| Feb 28 | 700 | $101 | $70.7K | $26.6K | $28.8K |
| Mar 28 | 820 | $101 | $82.8K | $31.2K | $33.8K |
| Apr 28 | 900 | $101 | $90.9K | $34.2K | $37.1K |
| May 28 | 1,000 | $101 | $101.0K | $38.0K | $41.2K |
| Jun 28 | 1,200 | $101 | $121.2K | $45.6K | $49.4K |
| Jul 28 | 1,250 | $101 | $126.2K | $47.5K | $51.5K |
| Aug 28 | 1,350 | $101 | $136.3K | $51.3K | $55.6K |
| Sep 28 | 1,600 | $101 | $161.6K | $60.8K | $65.9K |

What it says:

- **Total revenue first passes $50K in October 2027**, at $56.6K on 560 orders, and it does not fall below $50K again. The month that proves it holds is January 2028 at $60.6K: a Christmas-only product would have collapsed there, and a birthday product does not. September 2027 at $45.5K is the near miss, so the month it lands depends on about a hundred orders.
- **$50K a month is about 500 orders a month,** which at 18 minutes each is 150 hours of checking, or one full-time person. That is the useful way to read the target.
- **December 2027 means 1,500 orders**, 450 hours of checking, about $12.6K of wages and roughly three people working full time for the month. Hire and train seasonal checkers from October, or close Christmas orders early. Under the old ten-game product the same month needed five people.
- **Ad spend is the whole risk.** December 2027 spends $57K to earn $144K. At a blended $45 rather than $38 that month's ad bill is $67.5K and $10.5K of profit disappears. At $30 the business is comfortable. Nothing else in the model moves the answer as much.
- **There is no recurring revenue to fall back on.** Every month starts at zero and has to be sold again. That is the cost of dropping the club, and it is why the acquisition number matters more here than it would in a subscription business.

## 9. Plan

| Phase | When | What | Done when |
|---|---|---|---|
| 0. Prove it | Now to Dec 2026 | Landing page and demo live. Launch list. Hand-build 50 to 100 paid orders for Christmas, mostly through Joe's network in Ireland, using the demo engine plus AI help. | 50 paid orders, time per order written down, share rate measured |
| 1. Generator and US launch | Jan to Mar 2027 | Questionnaire, merchant of record, private links, the three-price checkout, enough games in the library for a five-game order, AI drafting, checking tool. US spelling and copy, US support hours, first paid US ads. | Under 25 minutes of human time per order, blended acquisition under $45 |
| 2. The Gift Box and referrals | Apr to Jun 2027 | Printed box and card, tracked delivery, referral codes, gift cards | Gift Box at 15% of orders in the UK, Ireland and the EU, and under 35 minutes of handling each |
| 3. Scale | Jul to Dec 2027 | Reaction-video ads at volume, UK and Ireland launch, seasonal checking team | Profitable after ads through Christmas |
| 4. Next | 2028 | Canada and Australia, US fulfilment partner for the box, decide whether a monthly product comes back | Decided by the data |

**The monthly product is a phase 4 decision, not a phase 2 one.** Revisit it once 100 games have sold, which the model puts around December 2026: look at what those families ask for after delivery, and only build it if they ask for the same thing twice.

**Team for phases 0 and 1:** Joe (product, sales, the first families), a freelance developer (backend, payments, generator), a pixel artist (hair styles, more roles, new game art). Part-time support and checking from phase 2.

**Money to the end of phase 1:** about $15K to $25K for freelance work, legal review, the domain and trademark filing, and early US ads. A smaller library than the ten-game product takes some of this out. Get real quotes before committing.

## 10. What would kill it

Decide these before starting, and change course if they happen:

- Blended acquisition cost above $60 after $10K of US ad spend, with no creative that beats it.
- Fewer than 5% of demo players join the launch list, or fewer than 50 paid orders from the first 1,000 demo plays.
- Human time per order still over 40 minutes after 200 orders.
- More than half of orders coming in at $49, so the average order drops towards $70 and the ad maths stops working.
- Under 30% of families pressing Share. Without sharing and referrals, every order has to be bought with ads, and there is no repeat revenue to make up for it.

## 11. Risks

- **Children's data.** One leak would end it. Collect little, show less, private by default, reviewed by a lawyer before launch. US children's privacy law (COPPA) sits on top of GDPR and the UK Children's Code, and the FTC has been fining on it. Get US advice, not just Irish advice, before the first US order. Recorded voices in the Gift Box are the most sensitive thing we will ever hold: keep them in the family's own private game and nowhere else.
- **No repeat revenue.** Every month is sold from scratch. A bad ad month is a bad revenue month with nothing underneath it, so keep enough cash to carry two slow months and do not let the December ad budget eat the reserve.
- **Five games might be too little for $99.** Ten was generous and slow; five is fast and might feel thin next to Muksun's $99. Watch refund requests and the "is that it?" question in support mail from the first fifty orders. If it reads as thin, add a sixth game before cutting the price.
- **The Gift Box does not travel.** Tracked shipping from Ireland to the US is $20 to $30 and takes a week or more, and the buyer can be hit with a customs charge on delivery, which is the worst possible thing to happen to a present. So the box is sold to the UK, Ireland and the EU only. In the US the site shows it as coming soon rather than offering it and then failing to deliver, and Americans get the game and the voices meanwhile. A US print and fulfilment partner is a 2028 job.
- **Starter cannibalising Family and Friends.** At $49 it does not cover a $38 customer. The mix is an assumption; measure it from the first hundred orders and be ready to raise Starter or hide it from cold traffic.
- **Currency and the Irish base.** Revenue is in dollars, costs are largely in euro and sterling. A 10% move in the rate moves the margin on a $99 order by about $8. Not fatal, worth watching.
- **The name.** "Hero Games" is used by a Beijing publisher and a US tabletop publisher; there's a mobile game called Happy Hero. Search USPTO before spending on the brand in the US, and EUIPO before spending in Europe.
- **Quality slipping.** It only works while the jokes feel made for that family. Eighteen minutes is the budget, not the target; do not cut the human check to save money.
- **Copycats.** Anyone with AI tools can make one game. The edge is the demo, the speed, the family depth, the privacy and the share loop.
- **Seasonality and cash.** Christmas still spikes. Keep enough cash to hire checkers ahead of it and to carry a $57K ad month.

## 12. The next five steps

1. Put $49, $99 and $179 on the site, remove every mention of a monthly club and of the sibling add-on, and keep the site and section 5 on the same figures from here on. If one moves, both move in the same commit.
2. Time a real Family and Friends order end to end, start to delivered, and see whether 18 minutes of checking is honest. Everything in section 5 rests on it.
3. Show the demo to ten parents outside the family, including at least three American ones. Watch; don't pitch. Ask which of the three prices they would pick and why.
4. Open a Paddle or Lemon Squeezy account and read what they actually require from an Irish sole trader before building anything around it.
5. Take 10 Christmas pre-orders and build them by hand, at least three of them Gift Boxes so the box and the printing get tested before anyone pays $179 for one.
