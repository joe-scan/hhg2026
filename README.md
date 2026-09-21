# HappyHeroGames

Put someone special in their own arcade game. They're the hero, and their own family turn up as the opponents. You build them in pixels, play a free demo in the browser, and order the full game for a birthday or Christmas.

Site: https://happyherogames.com. Email: hello@happyherogames.com (forwards to Joe's Gmail).

The first ten games are open. An order is the form at `/order/`, a payment link sent by hand, and a person checking the game before it goes out. No automatic payments and no database yet.

## Languages

Everything you edit is in `site-src/`: the pages, one file of words per language, and the game code and assets under `site-src/static/`. `site/` is built from it and is not in git. Spanish, German, French, Italian and Irish are at `/es/`, `/de/`, `/fr/`, `/it/` and `/ga/`, pages and game alike. Edit the source pages, run `node tools/build.mjs`, and every language is regenerated. Never edit `site/*.html` by hand.

## Try it

```sh
node tools/build.mjs
cd site && python3 -m http.server 8766
```

Open http://localhost:8766, change the name, hair, the person they're up against and the pet, and press Play. You can also open `site/index.html` straight from the folder.

## What's in here

- `site/`: the landing page with the live hero builder, the first game free at `/g/demo/` (one game, then a locked card and the $39/$99 offer), the paid game page at `/g/play/`, the order form, two free games (`/free/christmas/` and `/free/halloween/`), the privacy policy and the terms. English only while the other five languages are paused.
- `docs/business-plan.md`: the business, the numbers and the plan.
- `docs/pitch.md`: the whole business on one page, for grant applications.
- `docs/todo.md`: everything outside the code that Joe has to do, and what's done.
- `docs/competitors.md`: the seven companies selling something like this, and what to take from each.
- `docs/viral.md`: fifty ways this could spread, ranked by effort against reach.
- `docs/research/`: the raw material behind the analysis: the competitor captures and a catalogue of seasonal game ideas.
- `docs/translations/`: one file per language, English beside the translation, for a native speaker to correct.
- `docs/copy-check.md`: every sentence on the site scored for how hard it is to read, what was cut and why.
- `site/sitemap.xml` and `site/robots.txt`: written by the build, for search engines. Everything except `/g/` is allowed.
- `docs/product.md`: the product and how it's built. The questionnaire, the privacy rule for each field, the config format, the game format, and why it's all on one domain.
- `CLAUDE.md`: the brief for AI assistants working on this. Read it before changing anything.

## Deploying

```sh
./deploy.sh
```

It copies `site/` to the Namecheap host over SSH and checks the main URLs. Hosting, HTTPS and email details are in `CLAUDE.md`.

## Test

```sh
npm install --no-save playwright-core
cd site && python3 -m http.server 8766 &
CHROME=/path/to/chrome node tests/smoke.mjs
```

It drives the builder into the game, checks every pet, plays the demo to the locked card and fails if the demo ever shows the boss or the ending, assembles the full version (four games and the final battle) and plays that to the ending, plays a four-challenger party through to the results board, plays both seasonal free games to the end and checks each one offers the picture and asks about the next game, clicks the dark/light button on six pages, the paid game page among them, and reloads to check it is remembered, checks the order form for its required fields, its prices and extras, its hidden honeypot and that it no longer offers a retired price, checks there is no language picker or offer while translations are paused (and, when they are back, plays the demo in each language and clicks the picker both ways), and checks the landing page at phone width. Against the live site it also checks the old `/halloween/` address still redirects and that a missing page at three different depths serves the 404. It exits with an error code if anything fails.

The game engine started life as [Fionn vs Sean](https://joescanlon.com/fs/), a game one dad made for his two sons.
