---
type: decision
status: accepted
tags: [decision, feature/mascot, design]
date: 2026-04-24
deciders: [me, claude-design]
related:
  - "[[Logic/Peako-Reaction-System]]"
  - "[[Logic/Peako-Front-Of-App-Voice]]"
  - "[[Journal/2026-04-24-peako-mascot-reactions]]"
---

# ADR-009 — Peako shows, doesn't tell

## Context

Peako currently uses full-sentence speech bubbles on the Today tab ("day's
almost over. just saying. phone's right there."), a persistent bubble that's
always mounted, and a "voice" tweak (gentle/classic/savage) that reads as a
verbosity dial. This makes Peako feel like a chatbot, not a mascot.

Mascots that land emotionally — Duolingo owl, Tamagotchi, Clippy — land because
**personality lives in the reaction, not the monologue**. They *respond*, they
don't explain.

Separately: the current ~9 poses (5 mascot states + 4 lounge variants) map to
*Peako's own day*, not *the user's action*. Peako exists; it doesn't react.
Without reactivity there's no engagement loop, no loss aversion, no
screenshot-bait, no viral potential.

## Options considered

1. **Keep bubbles, tighten copy.** Shorter sentences, same delivery model.
   Rejected — still chatbot-shaped; doesn't solve the over-talking.
2. **Kill the bubble entirely.** No words front-of-app ever.
   Rejected — loses key transition punctuation (e.g. "posted.") and removes a
   tool that, used sparingly, is effective.
3. **Transient rare bubble + constant glyph + expanded pose/face vocab.**
   Accepted. Matches how real cartoon mascots read. Preserves eloquence in
   opt-in surfaces (Feed, Diary) where users go looking for it.

## Decision

**Front-of-app Peako is a silent cartoon.** Communicates through 4 channels
ranked by priority:

1. Pose (always on)
2. Face (always on)
3. Glyph (`...` `!` `♡` `👀` `zzz` etc., on for ~4s on reaction trigger)
4. Bubble — 1–4 words MAX, fires only on state transitions, fades after ~2.8s

**Long-form voice** is moved entirely into **Feed** and **Diary** — opt-in
surfaces the user taps into. Peako has a "secret blog"; front-of-app, Peako
shuts up.

**The "voice" tweak (gentle / classic / savage) is replaced by "mood"
(Sweet / Deadpan / Gremlin).** Mood swaps the glyph palette + rare bubble
wording — NOT verbosity. Same reactions, different flavor. Default: Deadpan
(matches Peako's 腹黑 personality).

**Reaction library:** 28 reactions across 5 categories (A logs · B posts · C
idle · D near-miss · E celebratory). Each is `POSE · FACE · GLYPH · BUBBLE(?)`.
Half are fully silent. Full spec in `peako_mascot_library.md`.

## Consequences

Positive:
- Peako reads as a mascot, not a chatbot.
- Bubble becomes an earned beat, not background noise — higher impact per use.
- Mood is a lever users actually get (palette choice), not a confusing verbosity dial.
- Reaction library gives a clear target for character art work (28 poses, 16 faces, ~20 glyphs).
- Loss-aversion + screenshot-bait tiers create a real engagement engine (Duolingo playbook).

Negative / costs:
- Mascot art workload: need ~16 face variants (up from 4) and ~28 poses (up from ~9).
- Lose some "Peako personality" surface on the Today hero — mitigated by Diary being
  always visible on the desk + Feed being one tap away.
- Need a state resolver with priority + cooldowns so reactions don't spam or conflict.

Neutral:
- Status line copy shortens (JUST POSTED / IDLE / WATCHING / DONE) instead of
  "PEAKO IS GOROGORO-ING" etc. Cleaner but sacrifices some voice; Diary
  compensates.

## Revisit trigger

- First user-testing round on the new silent Today hero — if users report Peako
  feels "empty" or "less alive," revisit whether glyph alone carries enough
  weight or whether we need a 2nd always-on micro-signal (e.g. tail flick,
  blink loop).
- When mascot art is finalized and we have real pose fidelity — revisit whether
  any of the 13 currently-bubble'd reactions can drop their bubble.
