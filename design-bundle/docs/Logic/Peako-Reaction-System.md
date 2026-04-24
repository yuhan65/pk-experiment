---
type: logic
status: draft
tags: [logic, feature/mascot]
owner: claude-design
last_reviewed: 2026-04-24
related:
  - "[[Logic/Peako-Front-Of-App-Voice]]"
  - "[[Decisions/ADR-009-peako-shows-not-tells]]"
---

# Peako Reaction System

## Why

Peako needs to react to the user, not just exist. Duolingo-tier engagement
comes from a mascot with *opinions about you specifically*. A reaction library
with variable reinforcement, loss aversion, and screenshot-bait ceiling states
is the engine. See `peako_mascot_library.md` for the full 28-reaction spec and
design rationale.

## Trigger

User event fires OR state changes (e.g. time crosses threshold, streak
updates, idle timer fires, screenshot API hook). Resolver picks one reaction.

## Rule

```
reaction_resolver(events, user_state, mood):
  candidates = [ reaction for reaction in LIBRARY if reaction.trigger matches ]
  IF no candidates:
    RETURN fallback by user_state bucket (category C — idle)

  // priority ordering — highest wins if multiple trigger at once
  priority = {
    D: 4,  // near-miss / fail — always wins
    E: 3,  // celebratory — if triggered this session
    A: 2,  // user just logged / completed
    B: 2,  // user just posted / shared
    C: 1,  // idle / fallback
  }
  winner = max(candidates, key=category_priority)

  // cooldown gate
  IF winner fired within last 20 min AND winner.category != D:
    winner = next_best(candidates)

  // mood palette lookup — same reaction, different glyph/bubble
  reaction = apply_mood_palette(winner, mood)

  RETURN reaction { pose, face, glyph, bubble? }
```

### Category → priority

| Category              | Priority | Cooldown override? |
|-----------------------|----------|--------------------|
| D (near-miss / fail)  | 4        | yes — escalation allowed |
| E (celebratory)       | 3        | no                 |
| A (logs / completes)  | 2        | no                 |
| B (posts / shares)    | 2        | no                 |
| C (idle / fallback)   | 1        | no — slow cycle    |

### Cooldowns

- Same reaction can't fire twice within **20 minutes** (prevents spam).
- Category D overrides cooldown — escalation from #17 → #18 → #19 must be allowed.
- Category C has no cooldown; cycles slowly every ~90s through idle poses.

### Mood palette

Same 28 reactions, swapped glyph + (if present) bubble wording per mood:

| Mood    | Glyph skew                        | Bubble tone           |
|---------|-----------------------------------|-----------------------|
| Sweet   | `♡ ✧ ☀ ♪ ✨`                       | warm — "yay." "nice!" |
| Deadpan | `... · ⟟ ✦ ?`                      | dry — "fine." "ok."   |
| Gremlin | `💢 👀 ✕ ♥?`                       | sharp — "no." "seen." |

Pose and face do NOT vary by mood — only glyph + bubble wording.

## Outputs & side effects

- `{ pose, face, glyph, bubble? }` object consumed by `TodayScreen` hero + any
  other surface that renders Peako.
- Bubble triggers `TransientBubble` mount (see [[Logic/Peako-Front-Of-App-Voice]]).
- Glyph triggers `PeakoGlyph` mount (~4s bob + fade).
- Reaction firing is logged to Peako's Feed (user-visible) and Diary
  (Peako-authored, long-form voice) — those are the eloquence surfaces.

## Edge cases

- **Multiple D-category triggers simultaneously** (e.g. streak-at-risk AND
  missed-yesterday): pick highest ID — later in the day = more urgent.
- **Mood change mid-reaction**: current reaction completes with old palette;
  next reaction uses new palette. Don't swap glyph mid-fade.
- **Rapid state change** (user logs twice in 2 seconds): debounce 500ms,
  coalesce into single reaction.
- **Offline / unknown state**: fall back to category C, glyph `...`, no bubble.
- **POSING (#11)**: requires OS screenshot hook; no-op on web prototype.

## Depends on

- User action events (log, complete, post, share, skip)
- User state (streak, last-action-time, challenges-done-today)
- Clock (time-until-end-of-day for category D escalation)
- Mood setting (from tweaks / user preference)

## Affects

- Today hero rendering
- [[Logic/Peako-Front-Of-App-Voice]] — bubble firing
- Feed (long-form post generated per reaction)
- Diary (long-form entry accumulates)

## Open questions

- TODO: confirm tone ceiling — may Gremlin mood trigger KNIFE (#27) and
  BEGGING (#18)? Default Deadpan → unhinged is opt-in.
- TODO: confirm streak-at-risk threshold for #19 (currently proposed: 11pm local)
- TODO: define "hard thing" for #4 (proposed: difficulty ≥ 4/5 OR skipped ≥ 2x)
- TODO: should category E reactions persist longer than the ~4s glyph window?
  (Graduation #24 feels like it should linger.)

## Code / UI anchors

- `peako_mascot_library.md` — full 28-reaction spec (source of truth)
- `components/today.jsx` L~200 — `BASE_BY_STATE` + `MOOD_OVERLAY` + `contextByState` (current partial implementation covers 4 states, not full 28)

## Changelog

- 2026-04-24 [claude-design] — initial draft, logic-first; visual design deferred
