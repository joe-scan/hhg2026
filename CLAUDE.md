# HappyHeroGames: brief for AI assistants

Read this first, every session. It says what we're building, the rules that don't bend, and how to work in this repo. Joe's global `~/.claude/CLAUDE.md` (voice, formatting, banned words) also applies to everything here.

## What this is

HappyHeroGames puts someone special in their own arcade game. Usually that's a child, sometimes a grown-up (a dad for Father's Day, a granny for her 80th). Whoever's buying types a name, picks a look and a family, and is playing the first game within a minute: that person is the hero and their own family and friends are the opponents, Dad in the back seat, Granny at the dinner table, the dog as referee. Then they keep it and send it. It ends with everyone cheering and "HAPPY BIRTHDAY, AVA!" in lights. It plays in any browser on a phone, tablet or laptop, with nothing to install.

- **Market:** sold worldwide in US dollars from day one. The US is the biggest slice of the spend, then the UK, Canada and Australia. Ireland is where Joe is, not a target market. The site is written in US English, prices are in dollars, and the game's roles read Mom and Grandma in North America, Mum and Granny elsewhere (`DIALECT` in `site-src/static/arcade/engine.js`). Anything specific to one country, like hurling questions, goes in an optional pack (`CFG.packs`), never the default.
- **Buyers:** parents, grandparents, godparents, partners. **Heroes:** mostly children aged 5 to 12, which is the main market in the plan; grown-ups are a second market.
- **One hero per game, not two people playing each other.** The hero faces a different family member in each game.
- **Occasions:** birthdays all year, Christmas, Father's Day, Mother's Day, "just because".
- **Status (21 Sep 2026):** live at happyherogames.com in English only (the other five languages are paused): landing page, hero builder, the first game free at `/g/demo/`, party mode, the paid game page `/g/play/`, two free seasonal games (`/free/christmas/`, `/free/halloween/`), six gift pages, privacy policy and draft terms. **Orders are open** through `/order/`, which posts to `order.php` and emails Joe a ready play link. Payment is a link Joe sends by hand. No automatic payments, no database, and no solicitor has read the terms yet.
- **Owner:** Joe Scanlon (joe-scan on GitHub).

## Where it came from

The prototype is **Fionn vs Sean**, a two-player arcade game Joe made for his sons, at `~/Documents/fs` (live at joescanlon.com/fs, repo github.com/joe-scan/fs). Its engine was copied into `site-src/static/arcade/` on 19 Sep 2026. **Never edit `~/Documents/fs` from this project.** It's the boys' game; changes there are a separate job.

What we learnt from it, and why the product looks like this:
- Families respond to their own details (catchphrases, the dog, who's in charge of lunch), not to the game mechanics.
- Kids share it. The Share button and win screens are part of the product, not decoration.
- A public page can leak a family's details. The privacy rules below came from real mistakes in the prototype.

## The product

- **One hero per game.** The hero is player slot 1. Each game is against a different family member or friend in slot 0, played by the computer, or by a real grown-up in 2-player mode.
- **The hero is meant to win more often than not.** The games came with small hidden advantages for slot 1 (bigger paddle, wider plate, wins ties). Keep them; never show them on screen.
- **The end screen is the only place we ask for anything.** When a free game finishes, one line asks whether they want the next one. It is a mailto for now; when there is a Tally form, it is one `href` in each free page. Nothing is collected anywhere else, and no game page asks for an email.
- **The free pages ask for less than the paid one.** Four hair colours, four shirts, three occasions, because a decision made before anybody has been given anything should cost a second. The skin row keeps all six: that row is about a child seeing themselves, and cutting it leaves people out.
- **Make it, play it, keep it.** Decided 21 Sep 2026. The buyer makes the game on the front page, plays the first one at `/g/demo/`, and the locked card at the end is the offer: $39 to keep this game, $99 for all five. Nothing else sits between making it and buying it.
- **The final battle is in the game and named in the list, never sold as a feature.** Every five-game order ends with it: a family member on the hero's side.
- **Free games are the share engine.** They live at `/free/<season>/`, ask for nothing, store nothing, and end on a picture with somebody's name on it. They exist to be sent to people, and every one points at the builder. Christmas is Sleigh Dash and Halloween is Trick or Treat Dash. The name-in-lights page was retired on 20 Sep 2026: two free games are easier to explain than three, and its address redirects to `/free/`. `docs/viral.md` has the rest of the list.
- **A new theme is a game file and a page.** `arcade/free.js` is the harness: the start screen, the minute, and the end card with the name in lights. The game object carries its own screen text (`name`, `howto`, `endTitle`, `result()`, `note()`, `bg()`, `prop()`, `cols`, `shareLine()`), so a season is translated with the rest of the game code rather than stranded in a page. One rule learnt from Sleigh Dash: **never end a free game early.** Falling costs three seconds, not the run. Sixty seconds, one picture, every time.
- **Party mode.** A third option on the title screen: pick two to six challengers, each takes a turn against the hero on the same screen, and it ends on a results board with a champion. Built for birthday parties, where one gift is seen by six families. No typing: challengers are PLAYER 1 to PLAYER 6, because a name box on a canvas is a misery.
- **Structure:** title (STARRING [NAME], MADE BY whoever gave it), then for each game: versus card, how-to, countdown, play, result. Then the final battle with a family member alongside, then the finale for the occasion (cake, tree or trophy), then Share.
- **Free, $39 and $99:** the free preview and the $39 game are the same first game (Water Balloon Fight), ending on the locked card. $99 is Water Balloon Fight, Paddle Battle, Back Seat Battle, Dinner Dash and the final battle, never ten. The quiz was removed on 21 Sep 2026: too much work. A paid game is played at `/g/play/#g=<config>`, with `&n=1` for the $39 version; until signed links exist, that is protected only by nobody knowing it.
- **The game's page says who made it.** `/g/play/` opens on "A game made for Ava, by Mom and Dad" and the buyer's message, and the title screen says MADE BY. It is what makes it a present rather than a link, for both people. `from` is 40 characters and `note` 140, and a person reads both before the link goes out.
- **The hero on something they can hold:** a t-shirt, a poster or a mug through Printful, printed in the buyer's own country. Always the pixel hero, never a photograph. Ticked on the order form; prices wait for samples, so the form says "we will send a picture and a price".
- **No voice recordings.** Dropped on 20 Sep 2026: families uploading recordings of their children is the worst privacy exposure in the whole product, for a feature nobody asked for. Don't reintroduce it.
- **Words.** They are games, never duels. The cast is family and friends, so a best friend, a cousin, a teacher or a coach can be an opponent. The pet is a dog, cat, rabbit, hamster or fish, not always a dog.
- **Two prices: $39 and $99.** Decided 21 Sep 2026, replacing one price of $99 with add-ons. A $39 game upgrades to all five for $60, offered on the game itself when the first one ends. Every link is permanent. The $49 tier refused on 20 Sep was refused because it charged for what the demo gave away; $39 keeps the game they already made and played, which is different, but it still loses money on its own at the plan's $38 to win a customer. `docs/business-plan.md` section 4 has the numbers, and the cost of a customer is now the number the business rests on.
- **Rush and a sibling's game are gone.** Delivery is the same day, so there is nothing to rush, and a second game is a second order.
- **No subscription and no monthly club.**

## Languages

**Paused 21 Sep 2026 until the English is settled.** Joe: "Don't bother with translating any more until we get English locked down." `LANGS` in `tools/build.mjs` is empty, `LANGS_PAUSED` holds the five, and `.htaccess` sends `/es/` and the rest to the English page with a temporary 302. Don't add or update translations until Joe says so. When they come back: English is the source, and Spanish, German, French, Italian and Irish live at `/es/`, `/de/`, `/fr/`, `/it/` and `/ga/`. A language is two files: `site-src/words/<lang>.json` for the pages and `site-src/words/game-<lang>.json` for the game code, both keyed by the exact English string. `node tools/build.mjs` renders the pages, writes a translated copy of the game code into `site/<lang>/arcade/`, and adds the hreflang tags and the language picker. An identity dictionary reproduces the English files byte for byte, which is the test that the machinery is safe.

- **The menu is three plain links: How it works, Price, Questions.** No dropdown, and no "Build a game" link, because on the front page that scrolled to the top of the page somebody was already on. The seasonal free games are off the menu: two things called free was what made it confusing.
- **The demo's address is `/g/demo/` and nothing else.** The builder saves a draft in the visitor's own browser and the demo reads it, so nobody is sent a hundred characters of base64. `#g=` still works and still wins when it is there, because that is how a finished game and a shared link carry a family. `cfgFromLink()` returns null when the address has no family in it, which is what let the draft through.
- **Offer a language, never force one.** An English page whose visitor has a Spanish browser shows one dismissible line, "Ver en español", linking to the same page in Spanish. No automatic redirect: an English speaker in Madrid has a Spanish browser and asked for the page they asked for. The no is remembered in their own browser.
- **Never ship a half-translated language.** A Spanish page leading to an English game is worse than no Spanish page. `LANGS` in `tools/build.mjs` lists only what is finished.
- **In-game text avoids the capitals the pixel font cannot draw.** Á, Ñ and Ü are fine. É, Í, Ó, Ö, À and Ç come out as lowercase shapes, so translated in-game strings are written without them: SCHOENEN in German, TREMPE in French, PIU in Italian, DAIDI in Irish. Page text keeps every accent. A person's name is stripped of accents for the canvas automatically (`cleanName`).
- **Every language here is Claude's translation and none has been checked by a native speaker.** That is the open job in `docs/todo.md`. Joe's wife teaches Irish and will read the Irish one.

## Rules that don't bend

**Privacy (children's data).** Collect as little as possible and show less.
- Never on screen or in any public file: surnames, ages or birthdays, schools, clubs they play for, towns or addresses, travel plans, pets' breeds (security-question answers), photos. Voice recordings are not collected at all, anywhere.
- First names and roles ("Dad", "Granny") are fine.
- **Analytics go on the public landing page only.** Statcounter is in `site/index.html`. Never add it to `/g/`: those URLs carry a family's details, and handing them to a third party's logs would undo the rest of this. The builder strips `#g=` out of the address bar as soon as it has read it.
- Games live at private, unguessable links with `noindex`. The demo keeps everything in the browser: the config travels in the link (`#g=`) and a local draft; nothing is sent to a server. Keep it that way until there's a proper backend with consent and deletion.
- Anything that stores personal data needs Joe's sign-off first, and GDPR / UK Children's Code review before launch.

**Real people.** Nobody real goes in a game: no politicians, no footballers, no pop stars. Topical is fine, people are not. Take the situation, never the person. `docs/viral.md` explains why.

**Brands and people.** Club names and car makes as text only. Never crests, logos or recognisable designs. No real celebrities.

**Tone.** Kid-safe teasing only: snacks, bedtime, sports teams, who does the dishes. Nothing about looks, weight, ability or anything that would sting. Grown-ups are allowed to be a bit silly ("I LET YOU WIN, YOU KNOW.").

**Copy.** Every price lives in the Price section, the offer at the end of the first game, the order form and the gift pages' "What it costs" paragraph, nowhere else: an answer in the questions says what happens, not what it costs. Write for the person buying, who is often a grandparent. Ask the questions they would ask ("What device do I need?", not "What does it play on?"), and use their words, not ours: a web address, not a private link; a short video, not a trailer. Never take a swipe at a competitor; say what we do instead. One idea per sentence, and read it aloud before shipping it: if you run out of breath, split it. `node tools/copy.mjs` prints every visible sentence with its length, and `docs/copy-check.md` has the scale, what was cut and why. Joe's writing rules apply to the site, the game and docs: British and Irish English, no em or en dashes, no hype or AI-register words, no reflexive three-item lists, no emoji in page copy or headings. In-game cheers can be enthusiastic because that's the product. Write for parents and grandparents: plain, warm, specific. "Put someone special in their own arcade game", not "Unlock magical personalised experiences". Don't keep saying child or kid: the hero could be a grown-up, so say "they", "the hero" or their name. The children's privacy rules below still apply to every game.

**Claims.** Don't write anything on the site that isn't true yet: no invented reviews, customer counts, "most popular" badges, press logos or discounts Joe hasn't decided.

## Design direction (proposed by Claude, 19 Sep 2026; Joe to confirm)

- The pixel game screen is the only loud thing. The page around it is quiet: warm cream ground (`#fdf5ec`, dark `#0f0c18`), ink text, thin rules, square corners.
- **The game's own look is Poster Bold**, picked on 20 Sep 2026 from ten rendered on the real game: sky blue, pitch green, black ink, one red and one yellow, flat colour and hard edges, because that reads on a phone at arm's length. `COL` in `engine.js` is the whole palette and `bgSynth()` is the sky and the grass. `CHROME=... node tools/game-skins.mjs` re-renders the ten if the choice is ever reopened; a look is a font, a few colours and one background function.
- **Each game draws its own scenery, and that is what people actually look at.** Ten palettes changed nothing below the top bar until the games themselves were redrawn. A new game needs a place, not just a mechanic: a crowd, a fence, a window, something with depth.
- **No** cards, pills, drop shadows, gradients, glow or emoji in the page. The game screen is the exception to nothing: it is flat colour too, just brighter.
- Type: **Bowlby One** for headlines, the wordmark and the big lettering inside the game; **Atkinson Hyperlegible** for everything else on the page; **Press Start 2P** for the game's own small text, never in page copy. Bungee was dropped on 20 Sep 2026; the reason is in the comment at the top of `site.css`.
- One accent: burnt orange `#f2711c` on the warm site, arcade magenta `#ff2bd6` in dark mode. The game has its own palette (see Poster Bold above) and does not use either.
- **One lockup, used twice.** The header and the footer show the same thing at two sizes: the pixel HHG block, then Happy**Hero**Games. In both, the middle element is the brand orange and the rest is ink or paper, so the mark and the wordmark tell one story. The favicon is the same block, cropped to the orange H.
- **The mark never changes colour.** `--brand` (`#f2711c`) is the orange in HappyHero**Games**, in `logo.svg` and in `icon.svg`, in both skins and on every page. A wordmark that changes colour with the theme is not a wordmark. The letters around it flip with the skin so they stay legible; the brand colour does not.
- **Two looks, decided 20 Sep 2026:** Sunset, warm cream and burnt orange, is the site. Dark is for a dark room or a phone set that way. One small button in the header switches them and the choice is kept in the visitor's own browser; with no choice made the device decides. They are colour only: same type, same layout, same pixel screen. No third option, and no row of choices eating the header. The eight other skins tried are in `tools/skins.js`.
- The landing page opens with the builder itself, so the first thing a parent does is see their child in pixels.

## Repo layout

```
Written by hand
  CLAUDE.md               this brief
  README.md               short human intro and how to run it
  deploy.sh               builds, uploads site/ to happyherogames.com, checks the URLs
  docs/business-plan.md   the business: market, competitors, pricing, model, plan, risks
  docs/pitch.md           the one page for grants and anyone who needs it in two minutes
  docs/product.md         the product and how it's built: questionnaire, config, game format,
                          one domain, /g/ URLs, scores, backups
  docs/competitors.md     who else sells this, what to take from them, where we win
  docs/viral.md           fifty ways this could spread, ranked by effort
  docs/copy-check.md      every sentence on the site, rated for how hard it is to read
  docs/todo.md            Joe's list: everything outside the code, and what is done
  docs/research/          raw captures behind the research, kept so claims can be checked
  site-src/pages/*.html     the source pages, one per page. The free games are under
                            pages/free/<season>/, listed at pages/free/index.html.
                            pages/order/ is the order form and pages/order/thanks/ its reply.
                            pages/404.html is served for a missing page at any depth
  site-src/partials/        header.html and footer.html, dropped into every page by the build
                            at the <!--header--> and <!--footer--> marks. {{root}} becomes / or
                            /es/ and so on, so every link is absolute and the wordmark always
                            lands on the clean front page
  site-src/landings.json    the written landing pages at /gifts/, one entry each
  site-src/words/*.json     one file per language: English text -> translated text
  site-src/static/          everything copied into site/ untouched:
    arcade/engine.js        engine: family config, sprites, audio, input, drawing, cheers
    arcade/flow.js          the hero's run: title, games, party mode, boss, finale, share
    arcade/scenes.js        the occasion decorations: cake, balloons, tree, presents, flowers,
                            trophy, medal, snow and confetti. scene(occasion, t, front) dresses
                            a whole screen; the finale and the name page both use it
    arcade/games/*.js       one file per game, plus bosses.js and the free seasonal ones
                            (trick-or-treat.js, sleigh-dash.js)
    arcade/free.js          the harness every free theme page runs on
    arcade/hero-pick.js     the pick-your-look strip: hair, hair colour, skin, shirt. The free
                            pages use it, the choice is kept in the visitor's own browser, and
                            a hero built on the front page carries over
    builder.js              the builder: form to config, live preview, Play link
    css/site.css            shared page styles, the two looks, design tokens
    img/                    logo.svg, icon.svg, og.png (link previews), poster.png, trailer.gif,
                            finale.png (the ending, shown on the landing page)
    order.php               the order form's handler, and the only server code on the site
    .htaccess               https and www redirects, HSTS, caching, the 404, the old addresses
    g/.htaccess             keeps every game out of search engines
  tests/smoke.mjs         the headless test. What it covers is under How to work here
  tests/look.mjs          screenshots of the pages that break quietly: nothing asserted, look

Generated (only `site/` is gitignored; the translation files are generated but kept in git)
  site/                     the whole deployable site: the static files copied in, every page
                            rendered, and a translated copy of the game code per language.
                            Run `node tools/build.mjs` after a fresh clone, or just `./deploy.sh`
  docs/translations/*.md    one file per language for a native speaker to correct (in git)

Tools, none of them deployed
  tools/build.mjs         renders every page and every language into site/
  tools/strings.mjs       pulls the player-facing strings out of the game code
  tools/review-files.mjs  writes docs/translations/<lang>.md for a human checker
  tools/review-load.mjs   reads a checked file back into the word files
  tools/prune-words.mjs   drops translations for English text that no longer exists
  tools/skins.js          the ten page skins tried on 20 Sep 2026; two of them shipped
  tools/game-skins.mjs    the ten game looks tried on 20 Sep 2026; Poster Bold shipped
  tools/preview-skins.mjs re-renders those skins as pictures, if the choice is revisited
  tools/assets/           the poster template and the one hand-made still it uses.
                          title.png and frames/ are regenerated by render.mjs and are not in git
  tools/assets/render.mjs re-renders finale.png, og.png, trailer.gif and poster.png by playing
                          a real game headless. Run it after any change to the game's look, or
                          the marketing starts describing a product that no longer exists
  tools/links.mjs         every local link on every built page, checked against the files
  tools/copy.mjs          every visible sentence with its word count and reading grade
```

Plain `<script>` files share one global scope (no build step, works from `file://`). The engine's `THE FAMILY` section turns the config into sprites: `kidSpec` for the hero and siblings (five hair styles), `adultSpec` for grown-ups by role, `pet()` for the pet (`petRuns()` is false for a fish, which stays in its bowl). Games call `boy(i)` for the two players and `person(spec)` for cameo grown-ups; `helper()` returns a spare grown-up, or null when the only other person is the opponent. `docs/product.md` has the config format.

## How to work here

- **Everything you edit lives in `site-src/`.** Pages in `site-src/pages/`, words in `site-src/words/`, the game code and assets in `site-src/static/`. `site/` is generated in full by `node tools/build.mjs` and is not in git: anything typed into it is gone on the next build. `deploy.sh` builds before it uploads.
- **Run it:** `node tools/build.mjs`, then `cd site && python3 -m http.server 8766` and open http://localhost:8766.
- **Test it:** `npm install --no-save playwright-core`, serve `site/` on 8766, then `CHROME=/path/to/chrome node tests/smoke.mjs`. It must pass with no console errors before any commit that touches the site. What it covers is written once, in README under Test. Add the live site as an argument to run it against production: `node tests/smoke.mjs https://happyherogames.com/`.
- **The 404 is one file for the whole site.** `site-src/pages/404.html`, served by `ErrorDocument 404 /404.html` for a missing page at any depth, in any folder. Every link and script in it is absolute, because a relative one breaks the moment somebody mistypes a URL two folders down. It is English only and out of the sitemap.
- **Every page gets a canonical, an og:url and absolute hreflangs** from `hreflangs()` in the build. Relative hreflangs are invalid, and six language folders with no canonical is how duplicate-content trouble starts.
- **Landing pages live in `site-src/landings.json`, one entry each, and are written, not generated.** The build renders them into `/gifts/<slug>/` with `partials/landing.html`, and each draws its own example family on its own title screen, so no two are the same page with a different noun in it. The rule, and it is Google's rule too: **if a page would only be a find-and-replace of another, it does not go in.** They are English only, because a machine-translated landing page is worse than none, and they are not in the menu: the hub at `/gifts/` and the sitemap are how they are found.
- **Structured data is lifted from the page, never written twice.** `structured()` in the build reads the front page's own meta description and its own questions, in whatever language it just rendered, and declares one Product at $99. If the price or a question changes on the page, the machine-readable copy changes with it, and the smoke test fails if the two ever disagree.
- **Search engines:** `tools/build.mjs` writes `site/sitemap.xml` (every public page in every language, with hreflang pointing both ways) and `site/robots.txt` (everything allowed except `/g/`). The demo and the terms are deliberately left out: the demo lives under `/g/` and the terms are noindex until a solicitor has read them. Submitting the sitemap to Google is a one-off job in `docs/todo.md`.
- **Commit and push everything, every time,** docs included, without asking. The repo is private at github.com/joe-scan/hhg2026 (remote `origin`, over SSH).
- **Deploy every time,** without asking (Joe, 20 Sep 2026). Build, run the smoke test and `node tools/links.mjs`, then `./deploy.sh`, then run the smoke test again against `https://happyherogames.com/`. A failing test is the one reason not to: fix it or say what's broken. Never touch `public_html/test` on Joe's joescanlon.com server; it belongs to another project.
- **Look at what you build.** Screenshot the game and the pages at desktop and phone width before saying something works.

## The tools

None of them are deployed. `deploy.sh` only copies `site/`.

- `node tools/build.mjs` renders every page and language. `deploy.sh` runs it first, so the live site can't go stale. `node tools/build.mjs es` does one language.
- `node tools/strings.mjs` rewrites `site-src/words/game-en.json` from the game code, which is how a new string becomes translatable.
- `node tools/review-files.mjs` writes `docs/translations/<lang>.md` for a native speaker. **Run it whenever copy changes**, or the file you send someone is stale. `node tools/review-load.mjs docs/translations/ga.md` reads their corrections back.
- `node tools/prune-words.mjs` drops translations of English text that no longer exists.
- `tools/skins.js` holds the ten looks tried on 20 Sep 2026. `CHROME=/path/to/chrome node tools/preview-skins.mjs http://127.0.0.1:8766/ /tmp/skins` re-renders them if the decision is ever reopened.
- `tools/assets/poster.html` is the printed poster. `node tools/assets/render.mjs` screenshots it, along with everything else: it plays a whole game headless and writes `finale.png`, `og.png`, `trailer.gif` and `poster.png`. On 20 Sep 2026 the landing page was still showing "Won 2 of 4 duels" after the word had been taken out of the code, because the picture was made by hand once and never remade. **Run it whenever the game's look or wording changes.**
- `node tools/links.mjs` checks every local link on every built page. The English-only terms page is the usual casualty: a `{{root}}terms/` in a partial gives five 404s.

## Hosting, domain and email (set up 19 Sep 2026)

- **Domain:** happyherogames.com, registered at Namecheap. DNS is Namecheap's hosting nameservers (dns1/dns2.namecheaphosting.com), A record 162.0.217.226.
- **DNS records can be edited from the server**, which is quicker than the Namecheap panel: `ssh retroelf-host` then `uapi DNS parse_zone zone=happyherogames.com` to read, and `uapi DNS mass_edit_zone zone=... serial=<current SOA serial> add='{"dname":"happyherogames.com.","ttl":14400,"record_type":"TXT","data":["..."]}'` to add. Pass the JSON from a small script file, not inline over ssh, or the quoting eats it. The nameservers picked up a new record in under fifteen seconds on 20 Sep 2026.
- **Hosting:** an addon domain on Joe's Namecheap shared hosting (cPanel user `joescoaz`, main domain joescanlon.com, server premium269-4.web-hosting.com). Web root `~/happyherogames.com`. SSH with `ssh retroelf-host` (alias in `~/.ssh/config`, port 21098, key `joescanlon_deploy`).
- **Deploy:** `./deploy.sh` rsyncs `site/` to the web root and prints the status of the main files. It deletes old site files but never `.well-known` or `cgi-bin`.
- **HTTPS:** a free Namecheap certificate (SSL.com) covering happyherogames.com and www, valid to 5 Apr 2027, renewed by Namecheap as long as DNS points at the server. If a renewal lapses, switch to acme.sh on the server as was done for retroelf.com and violinfree.com. `site-src/static/.htaccess` sends http and www to https://happyherogames.com and sets HSTS (one year, no includeSubDomains).
- **Email:** hello@happyherogames.com is a cPanel forwarder to jscan1@gmail.com. MX is Namecheap's (jellyfish.systems). There's no mailbox, so replies go from Gmail unless Joe adds hello@ as a "Send mail as" address.
- **Repo:** github.com/joe-scan/hhg2026, private.

## Open decisions (Joe's)

They all live in `docs/todo.md`, which is the single list. When something here is decided or done, move it there rather than leaving both versions alive.

Two are repeated here because they shape the code: the trademark search for HAPPYHEROGAMES (neighbours: Hero Games in Beijing, Hero Games in the US, a mobile game called Happy Hero), and a solicitor reading `site/terms/` before any money changes hands.
