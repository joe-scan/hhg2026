# tools

Not deployed. `deploy.sh` only copies `site/`.

- `skins.js`: ten colour skins for the page around the game, as CSS variable sets.
- `preview-skins.mjs`: renders the landing page in each skin. Serve `site/` on 8766, then
  `CHROME=/path/to/chrome node tools/preview-skins.mjs http://127.0.0.1:8766/ tools/skin-previews`.
- `skin-previews/`: the rendered comparison shots, for picking.
