# HappyHeroGames: pass-off

For whoever builds the next version of happyherogames.com. Written 21 September 2026.

**Read this as facts and constraints, not as a brief.** The site that exists today is one answer
to the problem. Nothing about how it looks, how it is laid out, how it is written or how it is
built is binding on you. Where something genuinely cannot change, it says so and gives the
reason. Everything else is yours to decide, including throwing the whole thing away.

Joe Scanlon owns the business and makes the decisions. Ask him before assuming.

---

## 1. What is being sold

A personalised video game, made for one person, bought as a gift.

Somebody orders it for a child, or sometimes for an adult. They answer a few questions: the
person's first name, who else should be in it, what that person loves, what they always say.
A few days later they get a web address of their own. At that address is a game where the
person is the hero and the people they know are the opponents, with their own jokes written
into it. It ends with their name up in lights.

The buyer is usually a parent, grandparent, aunt, uncle or godparent. The hero is usually a
child aged five to twelve, though the product works for an adult and sells for Father's Day and
Mother's Day. It is sold worldwide in US dollars; the United States is the largest market, then
the UK, Canada and Australia. The company is in Ireland. That is where Joe is, not the market.

### Commercial facts, decided by Joe

- **$99** for the game: five games, up to eight people in it, ready within five working days.
- **Add-ons, chosen when ordering, not on the pricing page:** the printed poster and a short
  video of the game **+$80**; a 48-hour turnaround **+$39**; a second game for a brother or
  sister **+$69**.
- A **$49 tier has been proposed twice and refused twice**, with numbers: it leaves about $2.15
  after the assumed $38 cost of winning a customer, and one game against one character is what
  the free demo already gives away.
- There is **no subscription** and no monthly club.
- The unit economics, the $1M target and the month-by-month model are in `docs/business-plan.md`.
  If any figure on a site disagrees with that file, the file is right.

### The state of the business, honestly

No customers yet. No reviews. The domain was registered on 19 September 2026, so it has no
search authority and will not rank for competitive gift terms for months. Orders are taken by a
form that emails Joe; there is no payment system, no database and no questionnaire-after-payment
yet. A solicitor has not read the terms. These are the real gaps, and they matter more to the
business than anything on the website does.

---

## 2. Hard constraints

These are not style preferences. Breaking one either harms a child, breaks the law, breaks a
promise already made in public, or breaks something a buyer has already been sent.

### Children's privacy

- **Never collect or display:** photographs, voice recordings, surnames, ages, dates of birth,
  schools, clubs, towns, addresses, travel plans, or a pet's breed (it is a security-question
  answer). First names and roles like "Dad" or "Granny" are fine.
- **No analytics on a game's own page.** A game's web address carries a family's details, so
  those URLs must not go into anybody else's logs. Analytics, if any, go on public pages only.
- Games live at unguessable addresses under `/g/`, which is `Disallow`ed in `robots.txt` and
  carries `X-Robots-Tag: noindex`. Never number game URLs in sequence.
- Anything that stores personal data needs Joe's sign-off and a GDPR and UK Children's Code
  review first. Today nothing is stored: the demo keeps everything in the browser and the order
  form emails and forgets.

### Content

- **No real people in games.** No politicians, footballers or pop stars. Topical is fine as a
  situation, never as a person.
- **No club crests, badges, kits, logos or recognisable branded designs.** Club names and car
  makes as plain text only.
- **Teasing stays kind:** snacks, bedtime, who does the dishes. Nothing about looks, weight or
  ability.
- **No invented proof.** No fake reviews, customer counts, "most popular" badges, press logos or
  discounts Joe has not agreed. There are no reviews yet, so there is nothing to show.

### Things already in public that must keep working

- `hello@happyherogames.com` is a forwarder to Joe's Gmail. It is on the site and in the wild.
- `/halloween/`, `/es/halloween/` and the rest, plus `/name/` and `/themes/*`, currently answer
  301 redirects to their new homes. Those addresses were shared; keep them resolving somewhere
  sensible.
- `https://happyherogames.com/sitemap.xml` is submitted to Google Search Console, and the domain
  is verified by a TXT record on the apex. Do not remove the record.
- Two free games exist at `/free/christmas/` and `/free/halloween/`. They have been shared.
- The site is live in six languages at `/`, `/es/`, `/de/`, `/fr/`, `/it/`, `/ga/`. If you drop
  languages, redirect them rather than 404 them.

---

## 3. What exists that you can use, or ignore

The repository is `github.com/joe-scan/hhg2026` (private). Everything hand-written is in
`site-src/`; `site/` is generated by `node tools/build.mjs` and is not in git.

### The game engine (the part worth keeping)

About 1,400 lines of plain JavaScript in `site-src/static/arcade/`, no build step, no
dependencies, works from `file://`. Plain `<script>` tags sharing one global scope.

- `engine.js` — the config format, sprite generation for people and pets, audio, input
  (keyboard, gamepad, touch), drawing helpers, the colour palette.
- `flow.js` — the run: title screen, versus card, how-to, countdown, play, result, repeat, boss,
  ending, share. Also party mode.
- `games/*.js` — one file per game. Five paid games, one boss file, two free seasonal games.
- `scenes.js` — occasion decorations and the places games happen.
- `free.js` — the harness the free seasonal pages run on.
- `hero-pick.js` — hair, hair colour, skin, shirt pickers.
- `builder.js` — the form-to-config builder used on the current front page.

A game is **one config object**: hero (name, hair, hair colour, skin tone, shirt colour),
occasion, family (up to eight, each with a role and name), pet, catchphrase, favourite food.
`applyConfig(cfg)` turns it into sprites; `startGame(cfg)` plays it. The config can travel in a
URL fragment (`#g=` plus base64) or come from anywhere else you like.

The games came from a two-player game one dad built for his sons, at `~/Documents/fs`. **Never
edit that project.**

### Everything else

- `tools/build.mjs` renders pages into six languages from one source, using a dictionary per
  language keyed on the exact English string. `tools/strings.mjs` extracts translatable strings
  from the game code. If you rewrite the site, this machinery is replaceable, but the
  translations themselves (`site-src/words/*.json`) are hours of work and are reusable.
- `site-src/static/order.php` takes the order form, emails it and stores nothing. The host runs
  PHP 8.1 with `mail()`.
- `tests/smoke.mjs` drives the whole site in a headless browser and fails on console errors.
  Whatever you build, something like this is worth keeping: the game is the product, and a
  silent JavaScript error means a child's present does not open.
- `tools/links.mjs`, `tools/copy.mjs`, `tools/assets/render.mjs` (regenerates the marketing
  images by playing a real game headless).

### Hosting and deployment

- Namecheap shared hosting, cPanel user `joescoaz`, addon domain, web root `~/happyherogames.com`.
- `ssh retroelf-host` (alias in `~/.ssh/config`, port 21098). `./deploy.sh` builds and rsyncs.
- DNS is Namecheap's hosting nameservers but the zone is editable from the server itself with
  `uapi DNS parse_zone` and `uapi DNS mass_edit_zone`.
- HTTPS is a Namecheap certificate valid to 5 April 2027. `.htaccess` forces one canonical
  address, sets HSTS and serves `/404.html` for any missing page.
- **Never touch `public_html/test` on Joe's joescanlon.com server.** It belongs to another
  project.

---

## 4. What the current site does, for reference only

None of this is a recommendation. It is here so you know what exists and what Joe has already
seen, so you can do something different on purpose rather than by accident.

Pages: a landing page whose first element is a live builder (type a name, see a pixel hero),
a free one-game demo at `/g/demo/`, two free seasonal games, an order form and its thank-you
page, six written landing pages under `/gifts/`, privacy, draft terms and a 404 with a small
game on it. Six languages. One price on the page with add-ons listed under it. A dark and a
light look, switched by a button and remembered in the visitor's browser.

Things Joe has said during the current build, which are his preferences rather than facts:
he wants it simple above all else ("KISS"), he wants it clear enough for a grandparent to
follow, he does not want competitors criticised on the site, and he dislikes clutter, dropdowns
and anything that makes the buyer choose twice. He has also said the word "duel" is banned;
they are games, and the cast is "family and friends".

**Ask him what he thinks of the current site before you assume he likes any of it.**

---

## 5. Where the useful evidence is

Read these before making decisions; they are research and numbers, not opinion.

| File | What it is |
|---|---|
| `docs/business-plan.md` | The business: market, pricing, unit economics, forecast, risks. The single source for every figure. |
| `docs/competitors.md` | Seven companies selling something similar, captured 20 September 2026, with prices, weaknesses and what to take from each. |
| `docs/research/competitor-pages-raw.md` | The raw captures behind that analysis, so any claim can be checked. |
| `docs/product.md` | The product in detail: the questionnaire, the privacy rule for each field, the config format, how a game is served. |
| `docs/viral.md` | Fifty ways this could spread, ranked by effort. |
| `docs/todo.md` | Everything outside the code that Joe has to do, and what is already done. |
| `docs/pitch.md` | The business on one page, for grant applications. |
| `CLAUDE.md` | The brief the current build worked to. Useful for the constraints; ignore the design sections unless you want them. |

The two most useful facts in the competitor research: nobody else lets a buyer play a
personalised demo before paying, and the closest competitor at the same price does not run on an
iPhone. The most useful number: the closest analogue, Songfinch, went from $150,000 in 2019 to
over $5M in 2021 selling custom songs, which is the evidence that this shape of business works.

---

## 6. Questions worth asking Joe before you start

- What does he actually want changed? "A completely different site" could mean the look, the
  structure, the words, the whole approach, or all four.
- Is the free playable demo staying? It is the single biggest differentiator and also the most
  expensive thing to rebuild.
- Does the pixel-art game style stay, or is the game itself open to being redesigned?
- Six languages or one? They are real work to maintain and nobody has visited from those
  countries yet.
- Who is the priority buyer: the parent, or the grandparent? The current site tries to serve
  both and leans towards clarity for the older one.
- What is his budget and patience for SEO, which will not pay before spring 2027, against
  channels that could sell something this Christmas?
