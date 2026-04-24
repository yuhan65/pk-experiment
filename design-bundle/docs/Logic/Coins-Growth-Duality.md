---
type: logic
status: accepted
tags: [logic, feature/economy, feature/growth, feature/progress]
owner: me
last_reviewed: 2026-04-24
related:
  - "[[Decisions/ADR-001-coins-growth-dual-system]]"
  - "[[Peako_App_Structure]]"
---

# Coins & Growth — two systems, two tempos

## Why

Peako has two reward-like systems. Without a clear rule, they fight for
screen real estate and users read them as redundant. The fix is not to
delete one; it is to give them different **tempos** and different
**surfaces**, so the user forms two distinct mental models:

- Coins = **a stream of small rewards** (short feedback loop)
- Growth = **a slowly-accumulating state of Peako** (long feedback loop)

Tamagotchi-style养成 works because pet state is opaque and the payoff
is occasional surprise. Fitness apps work because quantified progress
gives reinforcement. Peako needs both, which is why neither can own the
same visual tempo as the other.

## Trigger

This rule applies to every screen that could show either system.

## Rule

```
IF a screen is short-loop oriented (Today, per-challenge)
  THEN show Coins prominently
  AND do NOT show Growth meter/progress visualization

IF a screen is long-loop oriented (You)
  THEN show Growth prominently (hero module)
  AND show Coins at most as a small stat

IF a screen is record/journey oriented (Progress / The Trail)
  THEN show stage implicitly (header line + biome visual)
  AND do NOT show a separate Growth progress meter
  AND show Coins only as a footer ministat

IF Peako crosses a stage boundary (day 7, 14, 21)
  THEN trigger a stage-transition MOMENT
       (full or half-screen, interrupts Today once)
  ELSE Growth is quiet — no per-day "+1" animation

IF a challenge is completed
  THEN coins animate "叮"-style (number jumps, brief float)
```

### Surface allocation (truth table)

| Screen        | Coins       | Growth            |
|---------------|-------------|-------------------|
| Today         | Top chip (prominent) | Not shown |
| Today (post-challenge) | +N float animation | Not shown |
| Progress/Trail | Footer ministat only | Header line + biome only (no meter card) |
| You           | Stat row on ID card (small) | Hero module (primary) |
| Stage transition moment | Not shown | Full-screen, rare |

## Outputs & side effects

- Today header shows `🔥 streak + ◆ coins` chips. Never a growth %.
- Completing a challenge triggers a +N coin float animation + sound.
- You tab renders `<GrowthModule growthDay={...}>` as the primary
  module below the ID card.
- Progress/Trail header renders `DAY N OF 21 · STAGE_NAME`. No
  separate meter.
- Coin jar (spending UI) remains on Progress as a secondary block
  (currently `CoinJar` in `screens-progress.jsx` — legacy exploration,
  to be consolidated).

## Edge cases

- **Day 0 (onboarding)** — Growth module shows `Seed`, "0 / 21 days".
  No transition moment yet (user hasn't earned it).
- **Day 21 (graduation)** — Growth module shows "FULLY GROWN · NEW
  JOURNEY UNLOCKED". Coins continue to accumulate normally.
- **Day > 21 (Phase 2 and beyond)** — Not yet defined. TODO: decide
  whether Growth resets, continues, or branches.
- **Stage-transition moment** — Not yet implemented. Placeholder
  behavior: none. See Open Questions.
- **Missed days / broken streak** — Growth does NOT regress. Only
  streak counter can decrement. Growth is monotonic.

## Depends on / Affects

- **Depends on:** `stageForDay(day)` in `components/mascot.jsx` (the
  canonical day → stage mapping).
- **Affects:**
  - `components/progress.jsx` — removal of `GrowthMeter` call
  - `components/you.jsx` — new `GrowthModule` component
  - Future: stage-transition moment component (does not exist yet)

## Open questions

- What does the stage-transition moment look like? (Full-screen
  Peako animation? Half-sheet? Does it replace the Today hero for
  that day only?)
- Should Coins be spendable in Phase 1 or only after graduation?
  Current `CoinJar` text says "spendable in Phase 2" — needs PM
  confirmation.
- Phase 2 growth arc — does Peako keep evolving past "Grown", or does
  a new axis open up (e.g. personality traits, outfits)?

## Code / UI anchors

- `components/you.jsx L181–L293` — `GrowthModule` component
- `components/you.jsx L8–L15` — `YouScreen` accepts `growthDay` prop
- `components/progress.jsx L85–L88` — `GrowthMeter` removal site
  (replaced by inline comment explaining the decision)
- `Peako Redesign.html L58, L81` — `growthDay` passed to `YouScreen`
- `components/mascot.jsx L362` — `stageForDay(day)` canonical mapping

## Changelog

- 2026-04-24 [claude-design] — Logic note created alongside ADR-001.
  Removed `GrowthMeter` from Progress; added `GrowthModule` to You.
