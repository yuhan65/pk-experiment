---
type: decision
status: accepted
tags: [decision, feature/progress, feature/growth, feature/economy]
date: 2026-04-24
deciders: [me, claude-design]
related:
  - "[[Logic/Coins-Growth-Duality]]"
  - "[[Peako_Design_Brief]]"
  - "[[Peako_App_Structure]]"
---

# ADR-001 · Keep both Coins and Growth, separate their expression

## Context

During redesign of the Progress ("The Trail") screen, the user surfaced two
linked concerns:

1. The **"Peako's Growth" progress card** on The Trail felt visually heavy.
   The screen already communicates stage via the header line
   (`DAY 7 OF 21 · SPROUT`) and via the biome/trail itself — a second
   progress meter was redundant.
2. More fundamentally, the **Coins system and the Growth system seemed to
   overlap in function** — both are "rewards for showing up". The user
   worried one should be removed.

Reference point the user raised: Tamagotchi has养成 but no progress bar —
the opacity is intentional. But Peako is a fitness app, and fitness apps
need a legible "am I getting better" signal.

## Options considered

**A. Drop Growth, keep only Coins.**
Simpler. Matches Tamagotchi's opacity. But kills the long-loop signal —
users who stick with it for 21 days would have nothing that says
"you've changed". Short-loop rewards alone flatten to a gamified chore app.

**B. Drop Coins, keep only Growth.**
Cleaner aesthetic. But strips the per-task dopamine hit — completing a
challenge would have no immediate payout, only a barely-visible nudge on a
long slow meter. Kills the short-loop reinforcement that gets users
through day 1–3.

**C. Keep both, but differentiate by tempo and surface.**
Coins = short-loop reward. Growth = long-loop state.
Never show both loudly on the same screen. Growth is quiet by default
and only "loud" at stage transitions (seed→sprout etc.).

## Decision

**Option C.** The two systems are not redundant — they operate on
different time scales and serve different psychological functions.
Conflict was in **expression**, not **concept**. Fix the expression:

- **Coins**
  - Live in the top chip on Today, per-challenge reward display, and
    a small secondary mention in Progress footer stats.
  - Behavior: "叮" on earn — number jumps, brief float, optional sound.
  - Short-loop / per-task reinforcement. User-facing resource.

- **Growth**
  - Lives **only on the You tab**, as a hero module below the ID card.
  - Behavior: quiet accumulator in normal view; loud at stage
    transitions (full/half-screen celebration moment when Peako
    changes form).
  - Long-loop / identity state. Peako-facing, not user-facing resource.

- **The Trail (Progress tab)** shows stage only via the header line
  and the biome/trail visualization itself. The standalone `GrowthMeter`
  card is removed.

- **Day-to-day UI rule:** any given screen prominently features at
  most ONE of {Coins, Growth}. They never share equal hierarchy.

## Consequences

Positive:
- Each system gets a clear mental model:
  - Coins = recurring small rewards (short-loop).
  - Growth = quietly-accumulating milestone state (long-loop).
- Progress screen regains visual calm; the Trail itself is the hero.
- Stage transitions become earned moments instead of gradual bar fill.

Negative / things to watch:
- Users who never visit the You tab may miss the Growth payoff — need
  to ensure stage-transition moments are **pushed** (interrupt Today,
  briefly), not just discoverable.
- Requires a "stage-transition moment" design that does not yet exist
  (see Open Threads in journal).

## Revisit trigger

Revisit this decision if:
- Qualitative testing shows users don't notice Growth progressing, OR
- Users report coin accumulation feels pointless because nothing to
  spend on in Phase 1 (would push Coins closer to Growth in function
  and re-open overlap).

## Changelog

- 2026-04-24 [claude-design] — ADR created, option C accepted.
