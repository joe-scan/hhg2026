# Is the copy simple enough?

Checked 20 September 2026, sentence by sentence, on the built English pages. Re-run the raw numbers with `node tools/build.mjs && node tools/copy.mjs`: it prints every visible sentence with its word count and a rough reading grade. The numbers are a prompt, not a verdict. A three-word heading can score high on syllables and still be perfectly clear.

## The scale

| Score | What it means |
|---|---|
| 1-3 | One idea, plain words. A child could read it aloud and get it. |
| 4-6 | Fine for an adult skimming on a phone. One clause hanging off the main sentence. |
| 7-8 | Needs a second read. Two ideas jammed together, or a list inside a sentence. |
| 9-10 | Legal. Correct, but nobody reads it for pleasure. |

The target for the landing page and the free games is **everything at 5 or under**. Privacy and terms are allowed 6 to 8, because precision matters more there than pace, but they should never be worse than they need to be.

## What was fixed, and why

| Before | Was | Why it was hard | Now | Is |
|---|---|---|---|---|
| Every game is the same: five games and a boss, everyone they love in it, up to eight people, ready in 48 hours. | 8 | "Every game is the same: five games" uses *game* to mean two different things in seven words. Then four facts in one sentence. | Everyone gets the same thing: five games and a boss fight, up to eight people in it, ready in two days. | 4 |
| And optionally: a poster of their game, printed and posted, to keep on the wall. | 6 | "And optionally:" is form-filling language, not speech. | You can add a poster of their game, printed and posted, for the wall. | 3 |
| What they play: ...five titles..., each against a different person. Then a boss fight with someone on their side, and the ending with their name in lights. | 7 | 39 words, a five-item list and three more facts, all in two sentences. | Split into four short sentences: the list, then "Each one is against a different person.", then the boss, then the name in lights. | 3 |
| The game, a printed poster of their name in lights, posted to you, and a short trailer of their own game for the family chat. | 7 | 25 words, three commas, and "of their own game" repeats what the reader already knows. | The game, a poster of their name in lights in the post, and a short trailer for the family chat. | 4 |
| Yes. Party mode on the title screen: pick how many challengers, and each one takes a turn against the hero while everyone else watches. | 7 | A colon doing the work of a full stop, plus the word *challengers*, which nobody says. | Yes. Party mode is on the title screen. Pick how many are playing. Each one takes a turn against the hero while the rest watch. | 3 |
| And the pet, which can be a dog, cat, rabbit, hamster or fish. | 5 | "which can be" is a relative clause doing nothing. | The pet too: a dog, cat, rabbit, hamster or fish. | 2 |
| The full game takes up to eight people, so the whole cast turns up. | 5 | *takes* is ambiguous (takes how long? takes what?) and *cast* is our word, not the buyer's. | The full game fits eight people, so everyone turns up. | 3 |
| The poster and the trailer, made from one demo family. | 5 | A sentence with no verb, and *demo family* is jargon. | This poster and trailer are for a made-up family. | 2 |
| The games we make are the other way round: five of them, your own family and friends as the ones to beat, and their jokes written into every screen. | 8 | 29 words. It was on all three free pages, so the worst sentence on the site appeared three times. | The games we make are different. Five games, with your own family and friends to beat, and their jokes in every screen. | 4 |
| The rest of it has them as the hero, their family and friends as the ones to beat, and their own jokes in it. | 7 | Three "has" clauses in a row. | In the rest of it, they're the hero. Their family and friends are the ones to beat, and the jokes are their own. | 4 |
| The first ten games are being taken by email and built by hand, so this covers both the free demo, which sends us nothing, and what an order involves. | 8 | 29 words, and "built by hand" was a claim about how the work gets done rather than what the buyer gets. The promise that survives is the one we keep: a person plays every game before it goes out. | Orders are taken by email for now. This covers the free demo, which sends us nothing, and what an order involves. | 5 |
| They travel to the game inside the web address itself, and a copy is saved on your own device so your work is still there if you come back. | 8 | Two unrelated facts joined by "and". | Split into two sentences. | 5 |

## Where it stands now

The landing page averages **7.4 words a sentence** across 72 sentences, and nothing on it scores above 5. The longest line left is the origin story, at 23 words: "One dad made an arcade game for his two sons, full of their catchphrases, their dog and their fights over the front seat." It stays, because it reads aloud in one breath and it is the only place on the page telling a story rather than stating a fact.

## What is deliberately left complex

- **Terms.** "After it's delivered, and it works, but you've changed your mind: no refund, because it was made for you and can't be sold to anyone else." That is a 7, and it stays a 7. Simplifying a refund rule is how refund arguments start.
- **The consumer law sentence** in terms, and the data protection complaint sentence in privacy. Both are 8s. They are quoting the shape of the law and need to.
- **The Ted joke** in terms about a granny being beaten at a quiz by an eight-year-old. 29 words, scores 7, earns its place.

## The rule going forward

One idea per sentence. If a sentence has a colon and three commas, it is two sentences wearing a coat. If a word appears twice in one line meaning two different things (*game*), rename one of them. Read it aloud: if you run out of breath, it is too long.
