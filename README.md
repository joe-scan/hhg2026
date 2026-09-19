# Happy Hero Games

Personalised arcade games starring your child, with their own family as the opponents. A parent builds their child in pixels, plays a free demo in the browser, and orders the full game for a birthday or Christmas.

Pre-launch. Nothing here takes orders or stores anyone's details yet.

## Try it

```sh
cd site && python3 -m http.server 8766
```

Open http://localhost:8766, change the name, hair and family, and press Play. You can also open `site/index.html` straight from the folder.

## What's in here

- `site/`: the landing page with the live hero builder, and the playable demo (4 duels, a boss and a birthday finale).
- `docs/business-plan.md`: the business, the numbers and the plan.
- `docs/product.md`: the questionnaire, the privacy rule for each field, the config format and the game format.
- `CLAUDE.md`: the brief for AI assistants working on this. Read it before changing anything.

## Test

```sh
npm install --no-save playwright-core
cd site && python3 -m http.server 8766 &
CHROME=/path/to/chrome node tests/smoke.mjs
```

It plays the demo through to the finale with the computer on both sides, drives the builder into the game, and exits with an error code if anything fails.

The game engine started life as [Fionn vs Sean](https://joescanlon.com/fs/), a game one dad made for his two sons.
