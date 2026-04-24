---
type: journal
tags: [journal, feature/growth, feature/economy]
date: 2026-04-24
session: growth-vs-coins
participants: [me, claude-design]
---

# 2026-04-24 · Growth vs Coins — do we need both?

## TL;DR

User raised two concerns about the Progress ("The Trail") screen:

1. The Growth meter card felt visually heavy — duplicated the
   header line "DAY 7 OF 21 · SPROUT".
2. Coins and Growth felt conceptually redundant — both "rewards
   for showing up".

Conclusion: **keep both, differentiate by tempo.** Coins = short-loop
"叮" reward. Growth = long-loop quiet accumulator with loud stage
transitions. They never share equal prominence on the same screen.
See [[Decisions/ADR-001-coins-growth-dual-system]] and
[[Logic/Coins-Growth-Duality]].

## Topics covered

- Tamagotchi reference — opacity works because the pet has no
  "goal". Peako has a 21-day arc, so opacity alone is insufficient.
- Short-loop vs long-loop reward psychology. Coins are operant
  conditioning; Growth is identity/attachment.
- Where each system should live on which screen.
- "叮" treatment for Coins (number jump + brief float) vs quiet
  treatment for Growth.
- Stage-transition moment as the place where Growth gets "loud" —
  not yet designed.

## New/updated Logic

- [[Logic/Coins-Growth-Duality]] — created. Truth table of which
  system appears on which screen at which prominence.

## New/updated Decisions

- [[Decisions/ADR-001-coins-growth-dual-system]] — created,
  accepted. Option C (keep both, differentiate expression).

## Code changes

- `components/progress.jsx` — removed `<GrowthMeter/>` call from
  `ProgressScreen`; left a comment pointing to the new rule.
  `GrowthMeter` function is still defined in the file (dead code,
  kept for now in case we want to revive it for a transient
  moment). Consider deleting next pass.
- `components/you.jsx` — `YouScreen` now accepts `growthDay` prop;
  added new `GrowthModule` component rendered between the ID card
  and Achievements. Legacy `GrowthCollection` still exported but
  unused.
- `Peako Redesign.html` — threaded `growthDay` through to
  `YouScreen` in both the main tab render and the SingleScreen
  artboard render.

## Open threads

- [ ] Design the **stage-transition moment** (day 7, 14, 21).
      Full-screen interrupt? Half-sheet? When in the day does it fire?
- [ ] Decide Phase 2 behavior — does Growth continue, reset, or
      branch into a new axis?
- [ ] Confirm with PM whether Coins are spendable in Phase 1.
      `CoinJar` currently says "spendable in Phase 2" — is that still
      right?
- [ ] Delete dead `GrowthMeter` in `components/progress.jsx` and
      dead `GrowthCollection` in `components/you.jsx` once the new
      Module is reviewed.
- [ ] Audit Today tab — current `TopChips` shows both streak and
      coins, which is fine (both short-loop). Confirm no growth
      indicator slipped in.

## Raw notes

User's framing that crystallized the decision:

> 解法不是砍掉一个, 而是让两者在获取节奏和表达方式上明显不同.
> Coins = 一次次的小奖励 (短反馈回路)
> Growth = 安安静静发生的一件大事 (长反馈回路)
> 日常 UI 上, 同屏只露其中一个.

This is the rule. Encoded in [[Logic/Coins-Growth-Duality]] as the
screen×system truth table.
