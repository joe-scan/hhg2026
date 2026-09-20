# Product spec

What a family tells us, how it becomes a game, and what the game contains. The demo in `site/` already does the parts marked **(demo)**.

## 1. The questionnaire

Ten minutes on a phone. Every field has a privacy rule, because the hero is usually a child and this is often children's data.

| Field | Example | Used for | Privacy rule |
|---|---|---|---|
| Hero's first name **(demo)** | Aoife | Title, jersey initial, speech, finale | First name only. Accents are stripped for the pixel font but kept for speech. |
| How to say it | "EE-fa" | The announcer's voice | Never shown on screen. |
| Hair style and colour, skin tone, jersey colour **(demo)** | Ponytail, brown, light, blue | The hero's pixel sprite | No photos, ever. The avatar is built from choices. |
| Occasion **(demo)** | Birthday | Title and finale | Never ask for the date of birth or the age. Ask "when do you need it by?" instead. |
| Family members, up to 6 (demo: 3) **(demo)** | Dad, Mum, Granny "Nana Kay", brother Conor | Opponents, referee, cameos, finale | First names or roles only. No surnames. |
| The dog **(demo)** | Biscuit, cream | Referee, blocks balloons, brings hearts, name tag | Name and colour only. Never the breed. |
| Favourite food **(demo)** | Pizza | Dinner Dash, the quiz | |
| Catchphrase **(demo)** | "No way!" | Losing lines, finale bubble, the quiz | 22 characters. Checked for anything unkind. |
| What they love doing | Football, dancing, Minecraft | Picks the 10 duels from the library | Interests only, never the club or team they play for. |
| The family's running arguments | The remote, the front seat, bedtime | Duel themes and boss choice | |
| Who's in charge of lunch / homework / bedtime | Granny | Cameo roles (the door in Water Balloon Fight, the cook in Dinner Dash) | |
| Family jokes and lines, optional | "Are you sure now boy?" | Trash talk, forfeits, cheers | A person reads every line before it ships. |
| Places they've been, optional | Portugal, Spain | A World Tour duel | Past trips only. Never upcoming travel. |
| Voices, Deluxe only | Phone recordings | Replaces the robot announcer for catchphrases | Stored only inside that family's private game, deleted on request. |

Consent: a parent or guardian ticks that they may share these details about the child and the family members named.

## 2. The config

The builder and the game share one config object. In the demo it travels in the link as base64url JSON after `#g=`, so nothing reaches a server. `sanitise()` in `site/game/engine.js` is the gatekeeper: it uppercases, strips accents and symbols, trims lengths, and only accepts colours and roles from fixed lists.

```json
{
  "hero": { "name": "AOIFE", "hair": "ponytail", "hairCol": "#6b3f1d", "skin": "#f3c6a0", "kit": "#1f7ae0" },
  "occasion": "birthday",
  "catchphrase": "NO WAY!",
  "food": "PIZZA",
  "family": [
    { "role": "dad", "name": "DAD", "hairCol": "#141018" },
    { "role": "mum", "name": "MUM", "hairCol": "#8a3a1a" },
    { "role": "brother", "name": "CONOR", "hairCol": "#6b3f1d" }
  ],
  "pet": { "name": "BISCUIT", "col": "#e8c9a0" }
}
```

- `hair`: short, straight, curly, long, ponytail. `occasion`: birthday, christmas, star.
- `role`: dad, mum, granny, grandad, auntie, uncle, brother, sister. Each role has a jersey colour, a losing line, a favourite food and a set of taunts (`ROLES` in `engine.js`, `TAUNT` in `flow.js`).
- `pet` is optional. Without a dog, a spare grown-up referees and nothing blocks the balloons.
- The paid game will extend this with interests, arguments, custom lines and a duel list. Keep the demo able to read older configs.

## 3. The game

| Part | Demo | Full game |
|---|---|---|
| Title | STARRING [NAME], occasion line, cast on the horizon, 1 or 2 players | Same, plus the family's own tagline |
| Duels | Puck-Out, Water Balloon Fight, Dinner Dash, The Table Quiz | 10 from the library, picked by interests |
| Opponents | Family members in turn | Same, with the family's own taunts |
| Referee | The dog, or a spare grown-up | Same |
| Boss | Bedtime Clock (birthday, Christmas) or Homework Monster, with a family member as teammate | Two bosses from the family's real battles |
| Finale | HAPPY BIRTHDAY / HAPPY CHRISTMAS / YOU'RE A STAR, cake, tree or trophy, family walks in, share prompt | Same, plus recorded voices on Deluxe |
| Sharing | Share button: a picture of the screen plus the game's link | Same, plus a "make one for your family" referral link |

**Duel library.** Fourteen duels already exist in the Fionn vs Sean engine (`~/Documents/fs/games/`): Puck-Out, Neon Racers, Garden Five-a-Side, Back Seat Battle, World Tour, Session Showdown, Remote Control Grab, Front Seat Showdown, Who Walks Ted?, The Table Quiz, Free-Taker, Rugby Rush, Water Balloon Fight, Dinner Dash. Each needs its Fionn and Sean text swapped for the config (as the four demo duels were) before it can join. Missing and worth building first: dancing, swimming, a racing game for gamers, gymnastics, and a piano / instrument duel that isn't tied to concertina.

**Porting a duel from Fionn vs Sean:** copy it into `site/game/duels/`, replace names and pronouns with `PL[i].name`, replace `person('nuala')` and similar with `helper()`, replace Ted text with `PET` (and handle no dog), make hit boxes use `specH()`, check the how-to lines stay under 60 characters with 10-letter names, then add its `<script>` to `site/g/demo/index.html` and run the smoke test.

## 4. Making a paid order (the plan)

1. The questionnaire saves a config (plus the extra fields) against an order.
2. A generator builds the game: the config drives sprites, duels and text, and an AI model drafts taunts, forfeits and quiz questions from the answers.
3. A person plays it through and reads every line (target: 30 minutes an order).
4. The family gets a private link and a printable card. Delivered in 48 hours, or on the chosen date.
