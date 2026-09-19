# Happy Hero Games: brief for AI assistants

Read this first, every session. It says what we're building, the rules that don't bend, and how to work in this repo. Joe's global `~/.claude/CLAUDE.md` (voice, formatting, banned words) also applies to everything here.

## What this is

Happy Hero Games puts someone special in their own arcade game. Usually that's a child, sometimes a grown-up (a dad for Father's Day, a granny for her 80th). Whoever's buying answers ten minutes of questions and gets back a private web game where that person is the hero and their own family are the opponents: Dad at penalties, Granny in the quiz, the dog as referee. It ends with the family cheering and "HAPPY BIRTHDAY, AOIFE!" in lights. It plays in any browser on a phone, tablet or laptop, with nothing to install.

- **Buyers:** parents, grandparents, godparents, partners. **Heroes:** mostly children aged 5 to 12, which is the main market in the plan; grown-ups are a second market.
- **One hero per game, not two people duelling.** The hero faces a different family member in each duel.
- **Occasions:** birthdays all year, Christmas, "just because".
- **Status (19 Sep 2026):** pre-launch. A working landing page, a live hero builder and a free four-duel demo exist in `site/`. No orders, no payments, no backend. happyherogames.com is registered and hosted; see Hosting, domain and email.
- **Owner:** Joe Scanlon (joe-scan on GitHub).

## Where it came from

The prototype is **Fionn vs Sean**, a two-player arcade game Joe made for his sons, at `~/Documents/fs` (live at joescanlon.com/fs, repo github.com/joe-scan/fs). Its engine was copied into `site/game/` on 19 Sep 2026. **Never edit `~/Documents/fs` from this project.** It's the boys' game; changes there are a separate job.

What we learnt from it, and why the product looks like this:
- Families respond to their own details (catchphrases, the dog, who's in charge of lunch), not to the game mechanics.
- Kids share it. The Share button and win screens are part of the product, not decoration.
- A public page can leak a family's details. The privacy rules below came from real mistakes in the prototype.

## The product

- **One hero per game.** The child is player slot 1. Each duel is against a different family member in slot 0, played by the computer, or by a real grown-up in 2-player mode.
- **The hero is meant to win more often than not.** The duels came with small hidden advantages for slot 1 (bigger hurley, wider plate, wins ties). Keep them; never show them on screen.
- **Structure:** title (STARRING [NAME]), then for each duel: versus card, how-to, countdown, play, result. Then a co-op boss with a family member alongside, then the finale for the occasion (cake, tree or trophy), then Share.
- **Demo vs full game:** the free demo is 4 duels and 1 boss, built in the browser from the builder. The paid game is 10 duels picked by interest, 2 bosses, up to 6 family members, custom lines written from the questionnaire, and checked by a person.
- **Add-ons:** a sibling as a second hero (turns it into a Fionn vs Sean-style rivalry), the family's recorded voices, a printed gift box, gift cards.
- Prices, model and plan: `docs/business-plan.md`. Questionnaire, config and game format: `docs/product.md`.

## Rules that don't bend

**Privacy (children's data).** Collect as little as possible and show less.
- Never on screen or in any public file: surnames, ages or birthdays, schools, clubs they play for, towns or addresses, travel plans, pets' breeds (security-question answers), photos, voice recordings (unless the family ordered voices, and then only in their private game).
- First names and roles ("Dad", "Granny") are fine.
- Games live at private, unguessable links with `noindex`. The demo keeps everything in the browser: the config travels in the link (`#g=`) and a local draft; nothing is sent to a server. Keep it that way until there's a proper backend with consent and deletion.
- Anything that stores personal data needs Joe's sign-off first, and GDPR / UK Children's Code review before launch.

**Brands and people.** Club names and car makes as text only. Never crests, logos or recognisable designs. No real celebrities.

**Tone.** Kid-safe teasing only: crisps, bedtime, football clubs, who does the dishes. Nothing about looks, weight, ability or anything that would sting. Grown-ups are allowed to be a bit silly ("I LET YOU WIN, YOU KNOW.").

**Copy.** Joe's writing rules apply to the site, the game and docs: British and Irish English, no em or en dashes, no hype or AI-register words, no reflexive three-item lists, no emoji in page copy or headings. In-game cheers can be enthusiastic because that's the product. Write for parents and grandparents: plain, warm, specific. "Put someone special in their own arcade game", not "Unlock magical personalised experiences". Don't keep saying child or kid: the hero could be a grown-up, so say "they", "the hero" or their name. The children's privacy rules below still apply to every game.

**Claims.** Don't write anything on the site that isn't true yet: no invented reviews, customer counts, "most popular" badges, press logos or discounts Joe hasn't decided.

## Design direction (proposed by Claude, 19 Sep 2026; Joe to confirm)

Following `docs/ai-website-organised.md`: the human sets the direction and the agent follows it.
- The pixel game screen is the only loud thing. The page around it is quiet: a cool paper ground (`#f7f6fb`, dark `#0f0c18`), ink text, thin rules, square corners.
- **No** cards, pills, drop shadows, gradients, glow or emoji in the page. (The game screen keeps its neon; that's the subject.)
- Type: **Bungee** (arcade marquee lettering) for a few big headlines only; **Atkinson Hyperlegible** for reading (built for legibility); **Press Start 2P** for tiny labels.
- One accent, arcade magenta: `#ff2bd6` for fills and the main button, `#c4107f` for text on light.
- The landing page opens with the builder itself, so the first thing a parent does is see their child in pixels.

## Repo layout

```
CLAUDE.md                 this brief
README.md                 short human intro and how to run it
deploy.sh                 publishes site/ to happyherogames.com
docs/business-plan.md     the business: market, competitors, pricing, model, plan, risks
docs/product.md           questionnaire with privacy rules per field, config format, game format
docs/ai-website-organised.md   the guide the page design follows
site/index.html           landing page with the live hero builder
site/.htaccess            https and www redirects, HSTS, caching, noindex on play.html
site/builder.js           the builder: form to config, live preview, Play link
site/play.html            the game page (reads the config from #g=)
site/css/site.css         shared page styles and design tokens
site/img/finale.png       the demo's last screen, used on the landing page
site/game/engine.js       engine: family config, sprites, audio, input, drawing, cheers
site/game/duels/*.js      one file per duel, plus bosses.js
site/game/flow.js         the hero's run: title, rounds, boss, finale, share
tests/smoke.mjs           headless test: plays the demo to the end and checks the builder
```

Plain `<script>` files share one global scope (no build step, works from `file://`). The engine's `THE FAMILY` section turns the config into sprites: `kidSpec` for the hero and siblings (five hair styles), `adultSpec` for grown-ups by role, `ted()` for the dog. Duels call `boy(i)` for the two players and `person(spec)` for cameo grown-ups (`helper()` returns a spare one). `docs/product.md` has the config format.

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

1. Run an EU (EUIPO) and US (USPTO) trademark search for HAPPY HERO GAMES. Known neighbours: Hero Games (Beijing publisher), Hero Games (US tabletop), a mobile game called Happy Hero.
2. Confirm or change the design direction above.
3. Pick a form service for the launch list (Tally, Buttondown or similar). The form in `site/index.html` is a placeholder that saves nothing.
4. Prices on the site are the plan's proposals (€49 / €69 / €129, +€20 sibling). Confirm before anything goes public.
