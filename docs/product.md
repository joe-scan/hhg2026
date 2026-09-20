# The product, and how it is built

What a family tells us, how it becomes a game, what the game contains, and how the whole thing is served. The demo in `site/` already does the parts marked **(demo)**. Prices and the business model are in `docs/business-plan.md`.

## 1. The questionnaire

Some short questions on a phone. Every field has a privacy rule, because the hero is usually a child and this is often children's data.

| Field | Example | Used for | Privacy rule |
|---|---|---|---|
| Hero's first name **(demo)** | Ava | Title, shirt initial, speech, finale | First name only. Accents are stripped for the pixel font but kept for speech. |
| How to say it | "AY-va" | The announcer's voice | Never shown on screen. |
| Hair style and colour, skin tone, shirt colour **(demo)** | Ponytail, brown, light, blue | The hero's pixel sprite | No photos, ever. The avatar is built from choices. |
| Occasion **(demo)** | Birthday | Title and finale | Never ask for the date of birth or the age. Ask "when do you need it by?" instead. |
| Family and friends, up to 8 (demo: 1) **(demo)** | Dad, Mom, Grandma "Nana Kay", best friend Jack | Opponents, referee, cameos, finale | First names or roles only. No surnames. |
| The pet **(demo)** | Biscuit, a cream cat | Referee, blocks balloons, brings hearts, name tag | Kind, name and colour only. Never the breed. Dog, cat, rabbit, hamster or fish; a fish stays in its bowl and does none of the jobs. |
| Favourite food **(demo)** | Pizza | Dinner Dash, the quiz | |
| Catchphrase **(demo)** | "No way!" | Losing lines, finale bubble, the quiz | 22 characters. Checked for anything unkind. |
| What they love doing | Soccer, dancing, Minecraft | Picks the 5 games from the library | Interests only, never the club or team they play for. |
| The family's running arguments | The remote, the front seat, bedtime | Game themes and boss choice | |
| Who's in charge of lunch / homework / bedtime | Grandma | Cameo roles (the door in Water Balloon Fight, the cook in Dinner Dash) | |
| Family jokes and lines, optional | "Are you sure now boy?" | Trash talk, forfeits, cheers | A person reads every line before it ships. |
| Places they've been, optional | Portugal, Spain | A World Tour game | Past trips only. Never upcoming travel. |
| ~~Voices~~ | Dropped 20 Sep 2026 | Was: phone recordings replacing the announcer | Never again: audio of a child is the worst thing we could hold, for a feature nobody asked for. |

Consent: a parent or guardian ticks that they may share these details about the child and the family members named. When the hero is an adult, the person buying confirms the same thing.

## 2. The config

The builder and the game share one config object. In the demo it travels in the link as base64url JSON after `#g=`, so nothing reaches a server. `sanitise()` in `site/arcade/engine.js` is the gatekeeper: it uppercases, strips accents and symbols, trims lengths, and only accepts colours and roles from fixed lists.

```json
{
  "hero": { "name": "AVA", "hair": "ponytail", "hairCol": "#6b3f1d", "skin": "#f3c6a0", "kit": "#1f7ae0" },
  "occasion": "birthday",
  "packs": [],
  "catchphrase": "NO WAY!",
  "food": "PIZZA",
  "family": [
    { "role": "dad", "name": "DAD", "hairCol": "#141018" },
    { "role": "mum", "name": "MOM", "hairCol": "#8a3a1a" },
    { "role": "brother", "name": "JACK", "hairCol": "#6b3f1d" }
  ],
  "pet": { "name": "BISCUIT", "kind": "cat", "col": "#e8c9a0" }
}
```

- `hair`: short, straight, curly, long, ponytail. `occasion`: birthday, christmas, fathers, mothers, star.
- `packs`: optional question and joke packs for one country, `ie` or `uk`. Empty by default, because the default game has to work for a family in Ohio. The quiz reads them in `site/arcade/games/table-quiz.js`.
- `role`: dad, mum, granny, grandad, auntie, uncle, brother, sister, friend, bestfriend, cousin, teacher, coach. The key never changes, but the label shown does: Mom, Grandma, Grandpa and Aunt in North America, Mum, Granny, Grandad and Auntie elsewhere (`DIALECT` and `roleLabel()` in `engine.js`). Each role has a shirt colour, a losing line, a favourite food and a set of taunts (`ROLES` in `engine.js`, `TAUNT` in `flow.js`).
- `pet` is optional, and `pet.kind` is dog, cat, rabbit, hamster or fish (`PETKINDS` and `PETART` in `engine.js`). Without a pet, or with a fish, a spare grown-up referees and nothing blocks the balloons (`petRuns()`).
- The paid game will extend this with interests, arguments, custom lines and a game list. Keep the demo able to read older configs.

## 3. The game

| Part | Demo | Full game |
|---|---|---|
| Title | STARRING [NAME], occasion line, cast on the horizon, 1 or 2 players | Same, plus the family's own tagline |
| Games | Water Balloon Fight (the demo is one game, then the locked card) | 5 from the library, picked by interests |
| Opponents | Family members in turn | Same, with the family's own taunts |
| Referee | The pet, or a spare grown-up | Same |
| Boss | Locked. The demo stops at the locked card, and the test fails if it ever appears | Bedtime Clock (birthday, Christmas) or Homework Monster, with a family member as teammate |
| Finale | Locked, same as the boss | HAPPY BIRTHDAY / HAPPY CHRISTMAS / YOU'RE A STAR, cake, tree or trophy, everyone walks in, share prompt, with the family's own lines |
| Sharing | Share button: a picture of the screen plus the game's link | Same, plus a "make one for your family" referral link |
| Party mode | Two to six challengers take turns against the hero, then a results board | Same |

**Game library.** Fourteen games already exist in the Fionn vs Sean engine (`~/Documents/fs/games/`): Puck-Out (ported as Paddle Battle), Back Seat Battle (ported), Neon Racers, Garden Five-a-Side, World Tour, Session Showdown, Remote Control Grab, Front Seat Showdown, Who Walks Ted?, The Table Quiz (ported as The Family Quiz), Free-Taker, Rugby Rush, Water Balloon Fight, Dinner Dash. Five are ported and live: Paddle Battle, Water Balloon Fight, Back Seat Battle, Dinner Dash and The Family Quiz. Each of the rest needs its Fionn and Sean text swapped for the config (as the five built ones were) before it can join. Missing and worth building first: dancing, swimming, a racing game for gamers, gymnastics, and a piano or instrument game that isn't tied to the concertina.

**Porting a game from Fionn vs Sean:** copy it into `site/arcade/games/`, replace names and pronouns with `PL[i].name`, replace `person('nuala')` and similar with `helper()`, replace Ted text with `PET` (and handle no dog), make hit boxes use `specH()`, check the how-to lines stay under 60 characters with 10-letter names, then add its `<script>` to `site-src/pages/g/demo/index.html` (never the generated copy in `site/`), run `node tools/build.mjs` and run the smoke test.

## 4. Making a paid order (the plan)

1. The questionnaire saves a config (plus the extra fields) against an order.
2. A generator builds the game: the config drives sprites, games and text, and an AI model drafts taunts, forfeits and quiz questions from the answers.
3. A person plays it through and reads every line. The budget is 18 minutes for a game and 25 for a gift box, which is what the model in `docs/business-plan.md` is built on. If a real order takes 30, the margin goes with it.
4. The family gets a private link and a printable card. Delivered in 48 hours, or on the chosen date.

## 5. One domain

Everything lives at happyherogames.com. Games are at `/g/<id>/`, the site is at `/`, shared code is at `/arcade/` and `/css/`.

Joe asked whether to spread a few hundred games over hhg001.com to hhg010.com, sharing code from hhg000.com. Don't. The reasons:

- **There is no load to spread.** These are static files. A game page plus the engine is well under 300KB, and shared hosting serves that all day without noticing. Each play costs bandwidth and no CPU. If traffic ever did hurt, Cloudflare's free tier in front of one domain fixes it with a DNS change and costs nothing.
- **Domain sharding is obsolete.** It was an HTTP/1.1 trick for more parallel connections. Under HTTP/2, which this host already speaks, one connection carries everything and extra origins only add DNS lookups and TLS handshakes.
- **Shared code across domains isn't shared.** Browsers partition the HTTP cache by top-level site, so hhg003.com fetching `engine.js` from hhg000.com gets no benefit from hhg007.com having fetched it. Fonts and `fetch` would need CORS, and localStorage wouldn't be shared either. All the cost, none of the saving.
- **Ten domains is ten times the admin.** Ten renewals, ten DNS zones, ten certificates. One lapsed certificate on retroelf.com already cost an afternoon.
- **It looks like spam.** A present from Granny arriving as `hhg007.com/g/1234` reads as phishing. `happyherogames.com/g/otter-lamp-914` reads as a present.

Buy happyherogames.com variants only to stop someone else using them, and redirect them. Don't serve anything from them.

## 6. Game URLs

`https://happyherogames.com/g/<id>/`, where `<id>` is random, never sequential. Sequential ids mean anyone can type `/g/1235` and read another family's names, catchphrase and dog, which breaks the privacy rules in `CLAUDE.md`.

Use two words from a 1,500-word list plus two digits: `otter-lamp-914`. That is about 2^28 combinations, which is enough for an unlisted link and still readable down the phone. Three words takes it past 2^38 if guessing ever looks like a risk. Games are unlisted, not secret: the whole `/g/` folder is `noindex, nofollow` (`site/g/.htaccess`) with directory listing off.

The free demo is a game like any other, at `/g/demo/`, with its config in the link fragment (`#g=...`) so nothing reaches the server.

## 7. How a game is built

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

`tools/build.mjs` already renders the pages from `site-src/pages` into `site/`, in every language, and `deploy.sh` runs it before uploading. **Not built yet:** the same treatment for paid games, so that one template renders into every `/g/<id>/` folder and a change to the header changes every game on the next deploy.

Caching: HTML is `no-cache`, so a deploy shows up straight away. When the engine grows, give it a content hash in the filename (`engine.a1b2c3.js`) and cache it for a year; until then `no-cache` on JS is fine and keeps deploys simple.

## 8. Scores

Three stages, in order, and stop at whichever is enough:

1. **Local only (now).** `localStorage` holds best scores for that browser. Zero server, zero privacy risk, and it matches what families actually want: beating their own record. No accounts.
2. **One PHP endpoint with SQLite (when a leaderboard is asked for).** A single `scores.php` that validates and inserts a row, and a read that returns the top ten for one game. SQLite is one file, it's built into PHP on this host, and it handles concurrent writes properly.
3. **A real database.** Only if there's a reason, and there probably won't be.

Skip flat files. A `scores.txt` that several people append to at once needs its own locking, has no way to ask a question without reading the whole file, and grows without limit. SQLite is the same amount of work and doesn't have those problems.

When stage 2 arrives: no personal data beyond a first name the player types, cap the name at 12 characters and strip anything but letters, spaces and apostrophes, cap the rate per IP, and store no IP addresses.

## 9. Backups

Games are in git, so the repo is their backup. The only thing on the server that can't be rebuilt is whatever is written there: the scores database later, and the order details when orders open.

The plan, for when it's needed: a nightly cron on the host that copies the SQLite file (`VACUUM INTO`, which is safe while it's in use) and any uploads into a dated tarball, then `rclone` to Joe's Google Drive, keeping 90 days and deleting older ones. One cron line, one config file. Not built yet, and there's nothing to back up until scores or orders exist.

## 10. Intros, outros and cartoons

Everything animated is drawn by the engine on the same pixel canvas, or is CSS. No video files, no animation libraries.

- **Not built yet:** three intro styles and three outro styles, picked per game so the run doesn't feel repetitive. Today there is one of each.
- Five to ten seconds, and any key or tap skips them. Nothing waits for a player twice.
- An instruction screen is one sentence of concept, at most three rules, then a try-it round that can't be lost before the real thing starts.

A ten-second pixel cutscene costs a few hundred bytes of code. The same thing as video would be several megabytes and would need its own player, poster image and bandwidth.

## 11. What keeps it from looking AI-made

A flat page on paper-coloured ground, one accent colour, square corners, no drop shadows, no gradients, no glow, no emoji, no stock illustration. The only loud thing is the game screen.

The pixel art is hand-placed, pixel by pixel, in code: every sprite is a grid of letters in `engine.js` that somebody chose. That is why it reads as made rather than generated, and it is the thing to protect. No stock art, no generated art, no filters over photographs.

## 12. Why there are only two prices

The prices themselves live in `docs/business-plan.md`, so they are written down once. What belongs here is the shape:

**One variable, and only one.** Everything about the game is identical at $99 and $179: same five games, same eight people, same 48 hours. The only decision a buyer makes is whether they want something printed. That is what makes it sayable in one breath, and it is the rule to defend when someone suggests another tier.

The $49 Starter was dropped on 20 September 2026 for two reasons. Its own numbers had it losing about $2.55 an order after advertising, and three tiers turned the page into a comparison exercise. People told Joe the concept was easy and the pricing was confusing, which is the wrong way round.

Voice recordings were dropped the same day and are not coming back: audio of a child is the worst thing this business could hold, for a feature nobody asked for.
