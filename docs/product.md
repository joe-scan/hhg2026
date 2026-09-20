# Product spec

What a family tells us, how it becomes a game, and what the game contains. The demo in `site/` already does the parts marked **(demo)**.

## 1. The questionnaire

Some short questions on a phone. Every field has a privacy rule, because the hero is usually a child and this is often children's data.

| Field | Example | Used for | Privacy rule |
|---|---|---|---|
| Hero's first name **(demo)** | Ava | Title, shirt initial, speech, finale | First name only. Accents are stripped for the pixel font but kept for speech. |
| How to say it | "AY-va" | The announcer's voice | Never shown on screen. |
| Hair style and colour, skin tone, shirt colour **(demo)** | Ponytail, brown, light, blue | The hero's pixel sprite | No photos, ever. The avatar is built from choices. |
| Occasion **(demo)** | Birthday | Title and finale | Never ask for the date of birth or the age. Ask "when do you need it by?" instead. |
| Family and friends, up to 8 (demo: 3) **(demo)** | Dad, Mom, Grandma "Nana Kay", best friend Jack | Opponents, referee, cameos, finale | First names or roles only. No surnames. |
| The pet **(demo)** | Biscuit, a cream cat | Referee, blocks balloons, brings hearts, name tag | Kind, name and colour only. Never the breed. Dog, cat, rabbit, hamster or fish; a fish stays in its bowl and does none of the jobs. |
| Favourite food **(demo)** | Pizza | Dinner Dash, the quiz | |
| Catchphrase **(demo)** | "No way!" | Losing lines, finale bubble, the quiz | 22 characters. Checked for anything unkind. |
| What they love doing | Soccer, dancing, Minecraft | Picks the 5 games from the library | Interests only, never the club or team they play for. |
| The family's running arguments | The remote, the front seat, bedtime | Game themes and boss choice | |
| Who's in charge of lunch / homework / bedtime | Grandma | Cameo roles (the door in Water Balloon Fight, the cook in Dinner Dash) | |
| Family jokes and lines, optional | "Are you sure now boy?" | Trash talk, forfeits, cheers | A person reads every line before it ships. |
| Places they've been, optional | Portugal, Spain | A World Tour game | Past trips only. Never upcoming travel. |
| ~~Voices~~ | Dropped 20 Sep 2026 | Was: phone recordings replacing the announcer | Never again: audio of a child is the worst thing we could hold, for a feature nobody asked for. |
| Premiere day and time, Gift Box | 25 Dec, 9am | The countdown link at `/premiere/` | A date and a time, nothing else. It sits in the link, not in a database. |

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
| Games | Water Balloon Fight, The Family Quiz | 5 from the library, picked by interests (3 on Starter) |
| Opponents | Family members in turn | Same, with the family's own taunts |
| Referee | The pet, or a spare grown-up | Same |
| Boss | Bedtime Clock (birthday, Christmas) or Homework Monster, with a family member as teammate | One boss from the family's real battles |
| Finale | HAPPY BIRTHDAY / HAPPY CHRISTMAS / YOU'RE A STAR, cake, tree or trophy, family walks in, share prompt | Same, with the family's own lines |
| Sharing | Share button: a picture of the screen plus the game's link | Same, plus a "make one for your family" referral link |

**Game library.** Fourteen games already exist in the Fionn vs Sean engine (`~/Documents/fs/games/`): Puck-Out (ported as Paddle Battle), Neon Racers, Garden Five-a-Side, Back Seat Battle, World Tour, Session Showdown, Remote Control Grab, Front Seat Showdown, Who Walks Ted?, The Table Quiz, Free-Taker, Rugby Rush, Water Balloon Fight, Dinner Dash. Each needs its Fionn and Sean text swapped for the config (as the four demo duels were) before it can join. Missing and worth building first: dancing, swimming, a racing game for gamers, gymnastics, and a piano / instrument duel that isn't tied to concertina.

**Porting a game from Fionn vs Sean:** copy it into `site/arcade/games/`, replace names and pronouns with `PL[i].name`, replace `person('nuala')` and similar with `helper()`, replace Ted text with `PET` (and handle no dog), make hit boxes use `specH()`, check the how-to lines stay under 60 characters with 10-letter names, then add its `<script>` to `site/g/demo/index.html` and run the smoke test.

## 4. Making a paid order (the plan)

1. The questionnaire saves a config (plus the extra fields) against an order.
2. A generator builds the game: the config drives sprites, games and text, and an AI model drafts taunts, forfeits and quiz questions from the answers.
3. A person plays it through and reads every line (target: 30 minutes an order).
4. The family gets a private link and a printable card. Delivered in 48 hours, or on the chosen date.
