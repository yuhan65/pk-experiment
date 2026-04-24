---
type: logic
status: accepted
tags: [logic, feature/mascot, feature/progress]
owner: 
last_reviewed: 2026-04-23
related: [[Streak-Preservation]], [[Decisions/ADR-008-Peako-Growth-System-Dual-Progress-Views]]
---

# Peako Growth Stages

## Why (user value)

Streak counts days; Peako's body counts **effort**. The mascot is the long-term relationship artifact — the thing that tells the user "you actually changed" without a number. Growth is the difference between a utility that tracks numbers and a companion that *notices*.

It is also the thing that makes the Progress tab carry the first three weeks meaningfully — otherwise a brand-new user stares at an empty heatmap and a `streak: 0` and nothing happens.

## Trigger

End of each local calendar day (per user's timezone), evaluated **after** [[Streak-Preservation]] has run. Ordering matters: streak runs first so that the day's `type` is already labeled (`rest` / `frozen` / `normal` / `skipped` / `missed`) when growth evaluates it.

## Rule (locked 2026-04-23)

Locked in [[Decisions/ADR-008-Peako-Growth-System-Dual-Progress-Views]].

```
CONST STAGE_THRESHOLDS = {
  seed: 0,          // starting stage
  sprout: 7,        // effort days
  teen: 14,         // effort days (cumulative)
  grown: 21,        // effort days (cumulative) → graduation
}

ON day-rollover for user U, AFTER streak evaluation:
  today = U's record for yesterday (local tz)

  // An "effort day" is stricter than streak preservation.
  isEffortDay = (today.challengesCompleted >= 2)
             OR (today.type == "rest")

  IF isEffortDay THEN
    U.effortDays += 1
  // else: growth does NOT advance. No regression.

  // Evaluate stage transitions (can only advance, never regress).
  newStage = U.growthStage
  IF U.effortDays >= STAGE_THRESHOLDS.grown   AND U.growthStage != "grown"  THEN newStage = "grown"
  ELSE IF U.effortDays >= STAGE_THRESHOLDS.teen   AND U.growthStage == "sprout" THEN newStage = "teen"
  ELSE IF U.effortDays >= STAGE_THRESHOLDS.sprout AND U.growthStage == "seed"   THEN newStage = "sprout"

  IF newStage != U.growthStage THEN
    U.growthStage = newStage
    fireStageTransition(U, newStage)
    IF newStage == "grown" THEN
      U.graduatedAt = now
      queueGraduationTakeover(U)
      flipDefaultProgressViewTo("dashboard", U)
```

Key properties this locks in:

- **Effort days are stricter than streak days.** `skipped` and `frozen` days preserve streak but do **not** increment effort.
- **Growth is monotonic.** `growthStage` only moves forward. There is no un-growing on broken streaks, long absences, or post-graduation lapses.
- **Graduation is a one-way door for the default view.** After graduation, the Progress tab defaults to Dashboard; Trail stays accessible via the toggle.

## Outputs & side effects

- **State:** `user.effortDays`, `user.growthStage` ∈ `seed | sprout | teen | grown`, `user.graduatedAt` (nullable timestamp).
- **UI — Today tab:** Peako's portrait in the greeting renders the current stage's body.
- **UI — Progress tab:** Trail view renders the stage nodes + current-position indicator + "X / N effort days → next stage" counter. Dashboard view is unaffected by stage beyond using the correct mascot art.
- **UI — Feed:** on stage transition (`sprout`, `teen`), Peako posts in character about the change. On graduation, the takeover screen fires **instead of** a feed post; the feed gets a summary post after the user dismisses the takeover.
- **Voice register gates:**
  - `grown` unlocks the "maintaining" coaching register (less teaching, more peer energy).
  - `grown` + `daysSinceLastActive >= 3` unlocks the "worried check-in" register (the only place Peako softens to near-friend).

## Edge cases

- [ ] First-day brand-new user — `growthStage = "seed"`, `effortDays = 0`. Day 0 does not double-count.
- [ ] User is at Teen with 20 effort days, breaks streak for a week, then comes back and does 1 more effort day → effortDays = 21, graduation fires. Broken streak in between is irrelevant to growth. **Confirm this is desired — yes, per ADR-008.**
- [ ] User at Sprout accumulates 14 effort days while `growthStage` is stale (e.g., via a bug) → the advance-once-per-rollover logic above is safe; the IF-ELSE chain catches at most one transition per day, but `effortDays >= STAGE_THRESHOLDS.grown` will eventually catch up across rollovers. If we ever want one-day multi-stage leaps (backfill scenario), change the chain to a `WHILE`.
- [ ] Timezone / clock manipulation — inherit the guarantees of [[Streak-Preservation]]. Growth runs after streak, so any anti-cheat there applies.
- [ ] User uninstalls after graduation, reinstalls fresh → Phase 0.5 has no server, so `localStorage` being wiped = starts at Seed. Phase 1 account system must persist `growthStage` and `graduatedAt` server-side — graduation is the single most precious piece of user state.
- [ ] Phase 0.5 debug menu can force `growthStage` to any value and/or queue a synthetic graduation takeover. These mutations should bypass the normal `effortDays` check.

## Depends on / Affects

- Depends on: [[Streak-Preservation]] (labels the day's `type` before growth runs)
- Depends on: challenge completion tracking (same `challengesCompleted` counter streak uses)
- Affects: Progress tab default view (flips on graduation)
- Affects: Peako portrait across the app (all surfaces read `user.growthStage`)
- Affects: feed post generation (stage-transition posts, graduation summary, post-graduation "worried" posts)
- Affects: Voice Bible scope — two new registers gated on `growthStage == "grown"`

## Open questions

- [ ] Worried check-in threshold — 3 / 5 / 7 days since last active? Default 3 in ADR-008; tune in alpha. *(Out of internal-demo scope; revisit at Phase 1 alpha.)*
- [ ] Memory-card content per stage — how many Peako posts per stage are preserved, and how are they chosen? Draft cap: 3 per stage, chosen by (user-liked) + (system-flagged-as-standout). Revisit when Trail view gets built.
- [ ] Naming Peako (Tamagotchi-style) at Seed unlock — out of scope for Phase 1, flagged in ADR-008 §Open questions as [Growth.3].
- [ ] Second Journey (new track after graduation) — Phase 2+ question, flagged in ADR-008 §Open questions as [Growth.4].

## Code / UI anchors

- Code: *not implemented in prototype.* When implementing, co-locate with streak-preservation logic in the daily-rollover handler. Suggested file: `src/logic/dailyRollover.ts` (Phase 1 refactor).
- State lives in the same reducer slice as streak: extend `INITIAL_STATE` in `src/PeakoPrototype.jsx` (for Phase 0.5 debug) with `growthStage: 'seed', effortDays: 0, graduatedAt: null`.
- Related product doc: [[Peako_App_Structure]] §Progress (Trail view + Dashboard view), [[Peako_Design_Brief]] §4 (stage × expression matrix), [[Peako_Games]] §Growth System.

## Changelog

- 2026-04-23 — created from [[Decisions/ADR-008-Peako-Growth-System-Dual-Progress-Views]]. Status `accepted` on creation.
