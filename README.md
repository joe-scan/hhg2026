# Happy Hero Games

Put someone special in their own arcade game. They're the hero, and their own family turn up as the opponents. You build them in pixels, play a free demo in the browser, and order the full game for a birthday or Christmas.

Site: https://happyherogames.com. Email: hello@happyherogames.com (forwards to Joe's Gmail).

Pre-launch. Nothing here takes orders or stores anyone's details yet.

## Languages

English is the source and lives in `site-src/pages/`. Spanish is at `/es/`. Edit the source pages, run `node tools/build.mjs`, and every language is regenerated. Never edit `site/*.html` by hand.

## Try it

```sh
cd site && python3 -m http.server 8766
```

Open http://localhost:8766, change the name, hair, the person they're up against and the pet, and press Play. You can also open `site/index.html` straight from the folder.

## What's in here

- `site/`: the landing page with the live hero builder, the teaser demo at `/g/demo/` (one game, then a locked card), and the premiere countdown at `/premiere/`.
- `docs/business-plan.md`: the business, the numbers and the plan.
- `docs/pitch.md`: the whole business on one page, for grant applications.
- `docs/todo.md`: everything outside the code that Joe has to do, and what's done.
- `docs/competitors.md`: the seven companies selling something like this, and what to take from each.
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

It drives the builder into the game, checks every pet, plays the demo to the locked card and fails if the demo ever shows the boss or the ending, assembles the full five-game version and plays that to the ending, and checks the premiere countdown. It exits with an error code if anything fails.

The game engine started life as [Fionn vs Sean](https://joescanlon.com/fs/), a game one dad made for his two sons.
