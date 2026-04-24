---
type: logic
status: draft
tags: [logic, feature/log, feature/economy]
owner: 
last_reviewed: 2026-04-22
related: [[Log-to-Feed-Flow]], [[Peako-Brain-Scripting]]
---

# Coin Reward Rule (on log)

## Why (user value)
Coins are the carrot that makes logging feel rewarding without turning honesty into optimization. The "pizza gives fewer coins" twist is in-character for Peako — judging you, but not refusing to engage. It keeps the frenemy voice consistent at the economy layer.

## Trigger
User taps **Log Salad**, **Log Pizza**, or **Log Gym** on the Today screen (currently the action-button row in the prototype).

## Rule

```
IF  kind == "pizza"    THEN coins += 2
ELSE IF kind in { "salad", "gym" }  THEN coins += 10
ELSE                                THEN no-op
```

- Rewards are independent of challenge completion (logging is a side channel, see [[Peako_App_Structure]] §Log Flow).
- No streak impact (streak comes from challenges, see [[Streak-Preservation]]).

## Outputs & side effects
- **State**: `coins` counter in top bar increments immediately.
- **UI**: number updates in Header without animation (opportunity — see Open questions).
- **Feed**: a Peako post is created regardless of coin delta — see [[Log-to-Feed-Flow]].
- **Notifications**: none at this layer.
- **Analytics events**: *none defined yet*. Suggested: `log_submitted { kind, coins_delta }`.

## Edge cases
- [ ] Unknown `kind` value (not in `PEAKO_SCRIPTS`) → current code returns silently; no coins, no post. Acceptable but untracked.
- [ ] Rapid repeated taps → each one earns coins (no debounce). Potential farming if coins gate anything real later.
- [ ] Negative coin state impossible today, but when spending is added this rule must not allow it.
- [ ] Offline: prototype is local-only, n/a. Future: coins must reconcile on sync.

## Depends on / Affects
- Depends on: [[Peako-Brain-Scripting]] (which `kind` values are legal)
- Affects: [[Log-to-Feed-Flow]] (same trigger creates the feed post)
- Affects: future `Coin-Spending-Rules` (stickers, outfits — Phase 2 per [[Peako_Roadmap]])

## Open questions
- [ ] Is 2 vs 10 the right gap, or too punitive? → see [[Decisions/ADR-001-Coin-Rewards-Per-Log]]
- [ ] Should coins be awarded *after* Peako responds (post appears) rather than on tap? Feels more earned.
- [ ] Does coin award respect Roast Level? (Savage = smaller rewards?)

## Code / UI anchors
- Code: `src/PeakoPrototype.jsx` L233–L244 (`log` function)
- Constants: `PEAKO_SCRIPTS` L22–L41
- UI: Action button row L285–L304; coin display L106–L111

## Changelog
- 2026-04-22 — created from prototype code during first obsidian setup
