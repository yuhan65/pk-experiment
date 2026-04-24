---
type: decision
status: accepted
tags: [decision, feature/challenge, feature/progress]
date: 2026-04-23
deciders: founder
related: [[Streak-Preservation]], [[ADR-007-MVP-Batch-Lock-2026-04-23]]
---

# ADR-004: Streak preservation threshold

## Context
Daily loop assigns 3 challenges. We must decide what qualifies as "streak preserved" for the day. This decision governs the single most load-bearing retention rule in the product — see [[Streak-Preservation]].

Originally documented but not locked in [[Peako_App_Structure]] §Open Questions #2. PM gut-feel at time of drafting: "at least 2 of 3 challenges OR a rest day."

## Options considered

1. **All 3 challenges required**
   - Pros: Streak means "I did everything Peako asked" — stronger signal, stronger pride.
   - Cons: Punishing. One bad afternoon ends a 30-day streak. Likely rage-quit driver. Doesn't match the "frenemy, not drill sergeant" voice.

2. **2 of 3 challenges required** *(original gut-pick)*
   - Pros: Allows for one off challenge per day. Feels fair. Still forces real effort. Matches Duolingo-style forgiveness without being limp.
   - Cons: Slight complexity in messaging ("you missed one but you're fine"). Can feel anticlimactic. No safety net for genuinely bad days (illness, travel) that ruin the whole day.

3. **1 of 3 challenges required**
   - Pros: Very forgiving — broad retention.
   - Cons: Streak becomes near-meaningless. Two minutes of effort ≠ a day. Undermines coaching claim.

4. **Any 1 challenge OR 1 log OR a rest day**
   - Pros: Maximally forgiving.
   - Cons: Logs are confessions not effort; allowing them to preserve streak breaks the product frame ("Peako coaches first"). Strong no.

5. **2 of 3 + Duolingo-style streak freeze** *(adopted)*
   - Baseline: same as option 2 (≥2/3 preserves, logs don't).
   - Add: user can spend **100 coins** to freeze one broken day per calendar month.
   - Pros: Keeps option 2's fairness for most days, adds a meaningful safety valve for legitimately bad days without making the streak meaningless. Also adds the product's first real **coin sink**, giving coins something to do pre-stickers (Phase 2). Character-consistent: Peako's reaction to a freeze is grudging, never celebratory.
   - Cons: One more mechanic to explain in onboarding or first-use. UI needs a confirm modal. A user with 0 coins or an already-used freeze still has no recovery, which is fine — scarcity is the point.

## Decision

**Option 5 adopted** on 2026-04-23.

Full pseudocode of the day-rollover rule lives in [[Streak-Preservation]]. Key numeric parameters:

| Parameter | Value | Rationale |
|---|---|---|
| Challenges required | ≥ 2 of 3 | Option-2 baseline |
| Freeze cost | 100 coins | Equivalent to ~10 challenges' worth of earnings — non-trivial but achievable |
| Freeze cap | 1 per calendar month | Matches the existing monthly skip cadence for consistency |
| Freeze confirmation | Manual tap, either proactive (from Progress) or at day-rollover | Never auto-spend a user's coins |
| Freeze UI cell | Blue on the streak calendar | Distinct from green/yellow/grey/red |

## Consequences
- Affects notification copy ("streak at risk" trigger threshold — now also references the freeze availability).
- Affects Progress calendar color rules in [[Peako_App_Structure]] §Progress (added blue "frozen" state).
- Adds new screen: `Streak Freeze Confirm` modal (see [[Peako_App_Structure]] §Full Screen Inventory).
- Adds new line item to the coin economy table (`-100 freeze purchase`) — see [[Peako_Games]] §Full coin economy.
- Peako voice library needs a grudging-freeze register. Not celebratory. See [[Peako_Design_Brief]] §3 for voice rules.
- Reversibility: **medium** — we can relax thresholds or change freeze price later without breaking trust; tightening is a one-way door (users feel the rug pull). Retiring the freeze entirely after launch would be a bigger trust hit than adjusting cost.

## Revisit trigger
- Alpha cohort data: if streak-break rate at day 14 > 60%, we're too strict even with the freeze.
- If streak-break rate < 15% and freeze usage < 5%, the mechanic isn't doing work — consider removing.
- If freeze usage > 50% of active users per month, the underlying 2-of-3 threshold is too tight — loosen before touching the freeze.
