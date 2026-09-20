# Happy Hero Games: brief for AI assistants

Read this first, every session. It says what we're building, the rules that don't bend, and how to work in this repo. Joe's global `~/.claude/CLAUDE.md` (voice, formatting, banned words) also applies to everything here.

## What this is

Happy Hero Games puts someone special in their own arcade game. Usually that's a child, sometimes a grown-up (a dad for Father's Day, a granny for her 80th). Whoever's buying answers a few short questions and gets back a private web game where that person is the hero and their own family and friends are the opponents: Dad in the back seat, Granny in the quiz, the dog as referee. It ends with everyone cheering and "HAPPY BIRTHDAY, AVA!" in lights. It plays in any browser on a phone, tablet or laptop, with nothing to install.

- **Market:** sold worldwide in US dollars from day one. The US is the biggest slice of the spend, then the UK, Canada and Australia. Ireland is where Joe is, not a target market. The site is written in US English, prices are in dollars, and the game's roles read Mom and Grandma in North America, Mum and Granny elsewhere (`DIALECT` in `site/arcade/engine.js`). Anything specific to one country, like hurling questions, goes in an optional pack (`CFG.packs`), never the default.
- **Buyers:** parents, grandparents, godparents, partners. **Heroes:** mostly children aged 5 to 12, which is the main market in the plan; grown-ups are a second market.
- **One hero per game, not two people playing each other.** The hero faces a different family member in each game.
- **Occasions:** birthdays all year, Christmas, Father's Day, Mother's Day, "just because".
- **Status (20 Sep 2026):** pre-launch, live at happyherogames.com. A landing page, a live hero builder and a free one-game demo exist in `site/`. No orders, no payments, no backend. happyherogames.com is registered and hosted; see Hosting, domain and email.
- **Owner:** Joe Scanlon (joe-scan on GitHub).

## Where it came from

The prototype is **Fionn vs Sean**, a two-player arcade game Joe made for his sons, at `~/Documents/fs` (live at joescanlon.com/fs, repo github.com/joe-scan/fs). Its engine was copied into `site/arcade/` on 19 Sep 2026. **Never edit `~/Documents/fs` from this project.** It's the boys' game; changes there are a separate job.

What we learnt from it, and why the product looks like this:
- Families respond to their own details (catchphrases, the dog, who's in charge of lunch), not to the game mechanics.
- Kids share it. The Share button and win screens are part of the product, not decoration.
- A public page can leak a family's details. The privacy rules below came from real mistakes in the prototype.

## The product

- **One hero per game.** The hero is player slot 1. Each game is against a different family member or friend in slot 0, played by the computer, or by a real grown-up in 2-player mode.
- **The hero is meant to win more often than not.** The games came with small hidden advantages for slot 1 (bigger paddle, wider plate, wins ties). Keep them; never show them on screen.
- **Structure:** title (STARRING [NAME]), then for each game: versus card, how-to, countdown, play, result. Then a co-op boss with a family member alongside, then the finale for the occasion (cake, tree or trophy), then Share.
- **Demo vs full game:** the free demo is one game, then a locked card, played at `/g/demo/`. The paid game is 5 games and a boss, never ten: more than that is more than a family plays and more than we can check. Every paid game gets its own `/g/<id>/` folder with a random, unguessable id. Never number them in sequence.
- **The Gift Box ($179):** a printed arcade poster of their title screen (print-on-demand, printed in the buyer's own country, so nothing ships from Ireland), a premiere (a countdown link everyone opens together, built at `site/premiere/`), and a twenty-second trailer of their own game. Plus gift cards. No sibling add-on and no subscription: **two prices, and only one variable between them.** Everything about the game is the same at $99 and $179; the money buys something printed. Defend that when the next tier gets suggested.
- **No voice recordings.** Dropped on 20 Sep 2026: families uploading recordings of their children is the worst privacy exposure in the whole product, for a feature nobody asked for. Don't reintroduce it.
- **Words.** They are games, never duels. The cast is family and friends, so a best friend, a cousin, a teacher or a coach can be an opponent. The pet is a dog, cat, rabbit, hamster or fish, not always a dog.
- **Two prices: $99 the game, $179 the gift box.** Decided 20 Sep 2026, on the site, and in the plan. Model and numbers: `docs/business-plan.md`. Questionnaire, config, game format and how the site is served: `docs/product.md`.
- **No cheap tier, no monthly club, no sibling add-on.** All three were tried on paper and dropped. Every extra option is another decision between someone and their credit card.

## Rules that don't bend

**Privacy (children's data).** Collect as little as possible and show less.
- Never on screen or in any public file: surnames, ages or birthdays, schools, clubs they play for, towns or addresses, travel plans, pets' breeds (security-question answers), photos. Voice recordings are not collected at all, anywhere.
- First names and roles ("Dad", "Granny") are fine.
- **Analytics go on the public landing page only.** Statcounter is in `site/index.html`. Never add it to `/g/` or `/premiere/`: those URLs carry a family's details, and handing them to a third party's logs would undo the rest of this. The builder strips `#g=` out of the address bar as soon as it has read it.
- Games live at private, unguessable links with `noindex`. The demo keeps everything in the browser: the config travels in the link (`#g=`) and a local draft; nothing is sent to a server. Keep it that way until there's a proper backend with consent and deletion.
- Anything that stores personal data needs Joe's sign-off first, and GDPR / UK Children's Code review before launch.

**Brands and people.** Club names and car makes as text only. Never crests, logos or recognisable designs. No real celebrities.

**Tone.** Kid-safe teasing only: snacks, bedtime, sports teams, who does the dishes. Nothing about looks, weight, ability or anything that would sting. Grown-ups are allowed to be a bit silly ("I LET YOU WIN, YOU KNOW.").

**Copy.** Joe's writing rules apply to the site, the game and docs: British and Irish English, no em or en dashes, no hype or AI-register words, no reflexive three-item lists, no emoji in page copy or headings. In-game cheers can be enthusiastic because that's the product. Write for parents and grandparents: plain, warm, specific. "Put someone special in their own arcade game", not "Unlock magical personalised experiences". Don't keep saying child or kid: the hero could be a grown-up, so say "they", "the hero" or their name. The children's privacy rules below still apply to every game.

**Claims.** Don't write anything on the site that isn't true yet: no invented reviews, customer counts, "most popular" badges, press logos or discounts Joe hasn't decided.

## Design direction (proposed by Claude, 19 Sep 2026; Joe to confirm)

- The pixel game screen is the only loud thing. The page around it is quiet: a cool paper ground (`#f7f6fb`, dark `#0f0c18`), ink text, thin rules, square corners.
- **No** cards, pills, drop shadows, gradients, glow or emoji in the page. (The game screen keeps its neon; that's the subject.)
- Type: **Bungee** (arcade marquee lettering) for the main headline and the wordmark only; **Atkinson Hyperlegible** for everything else on the page. **Press Start 2P** stays inside the game canvas and the premiere clock, never in page copy.
- One accent, arcade magenta: `#ff2bd6` for fills and the main button, `#c4107f` for text on light.
- The landing page opens with the builder itself, so the first thing a parent does is see their child in pixels.

## Repo layout

```
CLAUDE.md                 this brief
README.md                 short human intro and how to run it
deploy.sh                 publishes site/ to happyherogames.com
docs/business-plan.md     the business: market, competitors, pricing, model, plan, risks
docs/pitch.md             the one page for grant applications and anyone who needs it in two minutes
docs/todo.md              Joe's list: trademark, company setup, grants, what's needed before taking money
docs/product.md           the product and how it's built: questionnaire, config, game format, one domain, /g/ URLs, scores, backups
site/index.html           landing page with the live hero builder
site/.htaccess            https and www redirects, HSTS, caching
site/g/.htaccess          keeps every game out of search engines
site/builder.js           the builder: form to config, live preview, Play link
site/g/demo/index.html    the free demo's game page (reads the config from #g=)
site/premiere/index.html  the premiere countdown: ?n=NAME&at=WHEN&to=/g/<id>/
site/privacy/index.html   the privacy policy. Keep it true: it is a promise, not a form
site/css/site.css         shared page styles and design tokens
site/img/finale.png       the full game's last screen, used on the landing page
site/img/poster.png       the gift box poster, rendered from the engine
site/img/trailer.gif      the gift box trailer, rendered from the engine
site/img/icon.svg         the pixel H favicon
site/arcade/engine.js       engine: family config, sprites, audio, input, drawing, cheers
site/arcade/games/*.js      one file per game, plus bosses.js
site/arcade/flow.js         the hero's run: title, rounds, boss, finale, share
tests/smoke.mjs           headless test: the builder, every pet, the demo stopping at the locked card,
                          a full five-game assembly played to the ending, and the premiere countdown
```

Plain `<script>` files share one global scope (no build step, works from `file://`). The engine's `THE FAMILY` section turns the config into sprites: `kidSpec` for the hero and siblings (five hair styles), `adultSpec` for grown-ups by role, `pet()` for the pet (`petRuns()` is false for a fish, which stays in its bowl). Games call `boy(i)` for the two players and `person(spec)` for cameo grown-ups; `helper()` returns a spare grown-up, or null when the only other person is the opponent. `docs/product.md` has the config format.

## How to work here

- **Run it:** `cd site && python3 -m http.server 8766`, then open http://localhost:8766. Or open `site/index.html` directly.
- **Test it:** `npm install --no-save playwright-core`, serve `site/` on 8766, then `CHROME=/path/to/chrome node tests/smoke.mjs`. It must pass with no console errors before any commit that touches `site/`.
- **Commit and push everything, every time,** docs included, without asking. The repo is private at github.com/joe-scan/hhg2026 (remote `origin`, over SSH).
- **Don't deploy** without Joe saying so. When he does, run `./deploy.sh`. Never touch `public_html/test` on Joe's joescanlon.com server; it belongs to another project.
- **Look at what you build.** Screenshot the game and the pages at desktop and phone width before saying something works.

## Hosting, domain and email (set up 19 Sep 2026)

- **Domain:** happyherogames.com, registered at Namecheap. DNS is Namecheap's hosting nameservers (dns1/dns2.namecheaphosting.com), A record 162.0.217.226.
- **Hosting:** an addon domain on Joe's Namecheap shared hosting (cPanel user `joescoaz`, main domain joescanlon.com, server premium269-4.web-hosting.com). Web root `~/happyherogames.com`. SSH with `ssh retroelf-host` (alias in `~/.ssh/config`, port 21098, key `joescanlon_deploy`).
- **Deploy:** `./deploy.sh` rsyncs `site/` to the web root and prints the status of the main files. It deletes old site files but never `.well-known` or `cgi-bin`.
- **HTTPS:** a free Namecheap certificate (SSL.com) covering happyherogames.com and www, valid to 5 Apr 2027, renewed by Namecheap as long as DNS points at the server. If a renewal lapses, switch to acme.sh on the server as was done for retroelf.com and violinfree.com. `site/.htaccess` sends http and www to https://happyherogames.com and sets HSTS (one year, no includeSubDomains).
- **Email:** hello@happyherogames.com is a cPanel forwarder to jscan1@gmail.com. MX is Namecheap's (jellyfish.systems). There's no mailbox, so replies go from Gmail unless Joe adds hello@ as a "Send mail as" address.
- **Repo:** github.com/joe-scan/hhg2026, private.

## Open decisions (Joe's)

The full list, including everything outside the code, is `docs/todo.md`. Keep it current: when a decision here is made or a job is done, move it to the Done section there rather than leaving both versions alive.

1. Trademark neighbours to watch when searching: Hero Games (Beijing publisher), Hero Games (US tabletop), a mobile game called Happy Hero.
2. Confirm or change the design direction above.
3. Set up a Tally form for the launch list. There is no form on the site at the moment: the price block says to email hello@ instead, which is honest but collects nothing.
4. Pick the print partner for the poster: order an A2 from Prodigi and from Printful and compare them in your hands. Left for later on 20 Sep 2026.
5. Grant funding: first stop is the Local Enterprise Office at County Hall, Cork. Take `docs/pitch.md`. Then Enterprise Ireland (New Frontiers, High Potential Start-Up). Check current amounts with the LEO; they change.
6. Trademark: search EUIPO and USPTO for HAPPY HERO GAMES before any more brand spend. Known neighbours are in decision 1.
7. A logo beyond the pixel H in `site/img/icon.svg`.
