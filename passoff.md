# HappyHeroGames: an idea, and a brief

Written 21 September 2026, for a second assistant working independently of the first.

This is deliberately not a handover of answers. A version of this already exists and is live,
and if you read how it was done you will end up doing a variation of it. That is not what is
wanted. What is wanted is your own thinking, from the idea up.

Joe Scanlon owns it and decides. Ask him rather than assuming.

---

## The idea

A video game made for one particular person, with the people they know in it.

You tell it who the game is for and who is around them. It produces a game where that person is
the hero and the people they know turn up in it, with details only that household would
recognise. It plays in a browser on anything, with nothing to install.

That is the whole idea. Everything else is open: who it is for, what it is worth, how it is
sold, what it is called, whether a website is even the right shape for it.

---

## What already exists

Facts, so you know what you are starting with rather than starting from nothing.

- **A working game engine.** About 1,400 lines of plain JavaScript, no dependencies, no build
  step, in `site-src/static/arcade/`. It turns one config object (a name, some people, a few
  details) into a playable pixel game with sprites, sound, keyboard, gamepad and touch controls.
  `applyConfig(cfg)` builds it, `startGame(cfg)` plays it. Five games, a boss, two seasonal ones.
  This is the only part that would be genuinely expensive to replace.
- **A domain and hosting.** happyherogames.com, registered 19 September 2026, on Namecheap
  shared hosting with SSH, PHP 8.1 and editable DNS. HTTPS to April 2027. The domain is two days
  old, so it has no search authority whatsoever.
- **A live site in six languages**, and the translation machinery behind it.
- **Research**, in `docs/`: seven competitors captured with prices and weaknesses, the raw
  captures behind that, and a written business plan. Treat the plan as one team's reading of the
  numbers, not as truth.
- **Nothing else.** No customers, no reviews, no payment system, no database, no company
  formed, no solicitor's opinion on anything.

---

## What is not open to you

Short, and none of it is taste.

1. **Children's data.** Never collect or show photographs, voice recordings, surnames, ages,
   dates of birth, schools, clubs, towns or addresses. Anything that stores a child's details
   needs Joe's sign-off and a GDPR and UK Children's Code review first.
2. **No real people in games**, no club crests, kits or brand marks. Nothing belonging to
   anyone else.
3. **No invented proof.** No fake reviews, customer numbers, press logos or "most popular"
   badges. There are no customers yet, so there is nothing to claim.
4. **Addresses already in public keep working.** `hello@happyherogames.com`, the two free games,
   the sitemap, the Search Console DNS record, and the existing redirects.
5. **Never edit `~/Documents/fs`.** It is a different project: the two-player game one dad made
   for his sons, which the engine came from.

Everything not on that list, including the price, the audience, the name of the thing and the
existence of a website at all, is yours to question.

---

## The brief

Come back with options, not a plan. For each of the three questions below, give **five
different answers**, then **five more that are wildly different again** from those.

**1. How the idea is presented.** Five ways somebody could meet this thing and understand it in
ten seconds. Then five that break the format entirely: different medium, different first
contact, different thing being sold.

**2. How it is priced.** Five pricing shapes. Then five that change what is being paid for, who
pays, or when. A price is a positioning decision, so say what each one makes the product *mean*.

**3. How it is funded.** Five approaches to Enterprise Ireland, the Local Enterprise Office and
whatever else applies to an Irish company selling exports. Then five that do not involve those
bodies at all. Amounts and criteria change constantly: check anything before it goes in a
document, and say in your answer what you checked and when.

For every option, in two or three lines:

- who it is for and why they would care
- what it would cost to find out if it works, in money and days
- the single thing most likely to kill it
- what evidence exists either way, and where you got it

Rank them at the end, say which one you would bet on, and say plainly which of your own ideas
you think are weak. A list of fifteen equally-weighted options is not a recommendation, it is
homework.

---

## How to use what is already here

The live site and `docs/` are available to you. **Form your own answers first.** Read them
afterwards, as a check on whether you missed anything, and then say where you disagree and why.
Anything in `docs/` that reads like a decision, including every price and every target, was one
team's judgement and is open to being argued with. The competitor captures and the raw research
are the parts worth trusting, because they are records of what other companies actually do.

---

## Questions to put to Joe before you start

Do not guess at these.

- Is this a replacement for the current site, a competitor to it, or an experiment he will
  choose between?
- Does the pixel-art game stay as it is, or is the product itself open to being redesigned?
- Is the name fixed? A trademark search has not been done yet.
- How much money and time is there, and when does it have to earn something?
- Should you look at the current site at all, or work blind and compare at the end?
- Is he willing to sell something that is not a website: a physical product, a service, a
  licence, or something bought through somebody else's shop?
