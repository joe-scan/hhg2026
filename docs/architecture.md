# Happy Hero Games: architecture

Written 20 September 2026. The rule behind every decision here: the server does nothing but hand over files, and there is as little to maintain, back up and forget about as possible.

## 1. One domain

Everything lives at happyherogames.com. Games are at `/g/<id>/`, the site is at `/`, shared code is at `/arcade/` and `/css/`.

Joe asked whether to spread a few hundred games over hhg001.com to hhg010.com, sharing code from hhg000.com. Don't. The reasons:

- **There is no load to spread.** These are static files. A game page plus the engine is well under 300KB, and shared hosting serves that all day without noticing. Each play costs bandwidth and no CPU. If traffic ever did hurt, Cloudflare's free tier in front of one domain fixes it with a DNS change and costs nothing.
- **Domain sharding is obsolete.** It was an HTTP/1.1 trick for more parallel connections. Under HTTP/2, which this host already speaks, one connection carries everything and extra origins only add DNS lookups and TLS handshakes.
- **Shared code across domains isn't shared.** Browsers partition the HTTP cache by top-level site, so hhg003.com fetching `engine.js` from hhg000.com gets no benefit from hhg007.com having fetched it. Fonts and `fetch` would need CORS, and localStorage wouldn't be shared either. All the cost, none of the saving.
- **Ten domains is ten times the admin.** Ten renewals, ten DNS zones, ten certificates. One lapsed certificate on retroelf.com already cost an afternoon.
- **It looks like spam.** A present from Granny arriving as `hhg007.com/g/1234` reads as phishing. `happyherogames.com/g/otter-lamp-914` reads as a present.

Buy happyherogames.com variants only to stop someone else using them, and redirect them. Don't serve anything from them.

## 2. Game URLs

`https://happyherogames.com/g/<id>/`, where `<id>` is random, never sequential. Sequential ids mean anyone can type `/g/1235` and read another family's names, catchphrase and dog, which breaks the privacy rules in `CLAUDE.md`.

Use three words from a 1,500-word list plus two digits: `otter-lamp-914`. That's about 2^40 combinations, readable down the phone, and it doesn't look like a hash. Games are unlisted, not secret: the whole `/g/` folder is `noindex, nofollow` (`site/g/.htaccess`) with directory listing off.

The free demo is a game like any other, at `/g/demo/`, with its config in the link fragment (`#g=...`) so nothing reaches the server.

## 3. How a game is built

No server code, no database, no build step at runtime.

```
/index.html            the landing page and builder
/css/site.css          every page, shared
/arcade/engine.js        sprites, audio, input, drawing
/arcade/games/*.js       one file per game
/arcade/flow.js          the run: title, games, boss, finale, share
/g/<id>/index.html     one small page per game: the config, plus <script> tags
```

Each game page is a few hundred bytes of config and a list of script tags pointing at the shared files. Every game after the first loads from the browser cache, so a new game costs almost nothing to open.

Shared headers, footers and script lists come from one template. At deploy time a small script renders the template into each game folder, so a change to the header changes every game on the next deploy, and the server still runs no code. That's the same benefit as a PHP include with nothing to go wrong at request time. PHP stays in reserve for the few things that need it (see scores and orders).

Caching: HTML is `no-cache`, so a deploy shows up straight away. When the engine grows, give it a content hash in the filename (`engine.a1b2c3.js`) and cache it for a year; until then `no-cache` on JS is fine and keeps deploys simple.

## 4. Scores

Three stages, in order, and stop at whichever is enough:

1. **Local only (now).** `localStorage` holds best scores for that browser. Zero server, zero privacy risk, and it matches what families actually want: beating their own record. No accounts.
2. **One PHP endpoint with SQLite (when a leaderboard is asked for).** A single `scores.php` that validates and inserts a row, and a read that returns the top ten for one game. SQLite is one file, it's built into PHP on this host, and it handles concurrent writes properly.
3. **A real database.** Only if there's a reason, and there probably won't be.

Skip flat files. A `scores.txt` that several people append to at once needs its own locking, has no way to ask a question without reading the whole file, and grows without limit. SQLite is the same amount of work and doesn't have those problems.

When stage 2 arrives: no personal data beyond a first name the player types, cap the name at 12 characters and strip anything but letters, spaces and apostrophes, cap the rate per IP, and store no IP addresses.

## 5. Backups

Games are in git, so the repo is their backup. The only thing on the server that can't be rebuilt is whatever is written there: the scores database later, and the order details when orders open.

The plan, for when it's needed: a nightly cron on the host that copies the SQLite file (`VACUUM INTO`, which is safe while it's in use) and any uploads into a dated tarball, then `rclone` to Joe's Google Drive, keeping 90 days and deleting older ones. One cron line, one config file. Not built yet, and there's nothing to back up until scores or orders exist.

## 6. Intros, outros and cartoons

Everything animated is drawn by the engine on the same pixel canvas, or is CSS. No video files, no animation libraries.

- Three intro styles and three outro styles, picked per game so the game doesn't feel repetitive.
- Five to ten seconds, and any key or tap skips them. Nothing waits for a player twice.
- An instruction screen is one sentence of concept, at most three rules, then a try-it round that can't be lost before the real thing starts.

A ten-second pixel cutscene costs a few hundred bytes of code. The same thing as video would be several megabytes and would need its own player, poster image and bandwidth.

## 7. What keeps it from looking AI-made

A flat page on paper-coloured ground, one accent colour, square corners, no drop shadows, no gradients, no glow, no emoji, no stock illustration. The only loud thing is the game screen. The sprites are drawn by a human pixel artist, which is the part no generator gets right and the part families notice.

## 8. Pricing

Three prices, in US dollars everywhere. No currency switching: a card handles the conversion, and one set of numbers is one less thing to be wrong.

| | Price | What |
|---|---|---|
| The demo | Free | Two games and a boss, built in the browser in a minute |
| Starter | $49 | Three games and a boss, the hero plus three people, and the pet |
| Family and Friends | $99 | Five games and a boss, up to eight people, everyone's own lines written in, checked by a person, ready in 48 hours |
| Gift Box | $179 | Everything above, plus a printed arcade poster of their title screen, a premiere countdown everyone opens together, and a twenty-second trailer of their own game |

The shape is deliberate. Starter is thin on purpose so the middle one is the obvious buy, and the top one is a physical present rather than a longer list of features, which is easier to want and harder to compare. Nothing else is sold: no subscription, no sibling add-on, no per-item extras. Every option on the page is one more decision standing between someone and their credit card.

Two things follow. The paid game is five games, not ten: more than five is more than a family plays in a sitting, and more than a person can check in eighteen minutes. And the demo is two games, so there is a real difference between free and paid.

The plan flags that Starter loses about $2.55 an order once advertising is counted, so it earns its place only as the cheap option that makes $99 look sensible. If it ever takes more than a quarter of orders, raise it or stop showing it to cold traffic.

The Gift Box used to mean a parcel posted from Ireland, which cost $20 to $30, took a week and could land the buyer with customs. It is now three things that mostly are not parcels:

- **The poster.** Their title screen, their name in lights, printed by a print-on-demand partner that prints in the buyer's own country. A US order prints in the US and arrives in about three days. Nobody here touches it, and it scales to any volume.
- **The premiere.** `site/premiere/` is a static page: `/premiere/?n=Ava&at=2026-12-25T09:00&to=/g/otter-lamp-914/`. It counts down in the viewer's own clock, then opens the game. `to` is followed only when it stays on this site, so a premiere link can never be turned into a redirect somewhere else. Costs nothing per order and needs no server.
- **The trailer.** Twenty seconds of their own game, rendered from the same canvas, for the family chat. No new data, and every share carries the site.

Voice recordings were dropped on 20 September 2026 and are not coming back: audio of a child is the worst thing this business could hold, for a feature nobody asked for.

`docs/business-plan.md` has the model behind these numbers.
