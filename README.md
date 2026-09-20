# Happy Hero Games

Put someone special in their own arcade game. They're the hero, and their own family turn up as the opponents. You build them in pixels, play a free demo in the browser, and order the full game for a birthday or Christmas.

Site: https://happyherogames.com. Email: hello@happyherogames.com (forwards to Joe's Gmail).

Pre-launch. Nothing here takes orders or stores anyone's details yet.

## Try it

```sh
cd site && python3 -m http.server 8766
```

Open http://localhost:8766, change the name, hair and family, and press Play. You can also open `site/index.html` straight from the folder.

## What's in here

- `site/`: the landing page with the live hero builder, and the playable demo at `/g/demo/` (4 duels, a boss and a birthday finale).
- `docs/business-plan.md`: the business, the numbers and the plan.
- `docs/architecture.md`: how the site and the games are put together, and why it's one domain.
- `docs/product.md`: the questionnaire, the privacy rule for each field, the config format and the game format.
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

It plays the demo through to the finale with the computer on both sides, drives the builder into the game, and exits with an error code if anything fails.

The game engine started life as [Fionn vs Sean](https://joescanlon.com/fs/), a game one dad made for his two sons.
