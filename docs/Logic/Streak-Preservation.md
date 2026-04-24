---
type: logic
status: accepted
tags: [logic, feature/challenge, feature/progress]
owner: 
last_reviewed: 2026-04-23
related: [[Challenge-Sequencing]], [[Decisions/ADR-004-Streak-Preservation-Threshold]], [[Decisions/ADR-007-MVP-Batch-Lock-2026-04-23]]
---

# Streak Preservation

## Why (user value)
The streak is the primary retention mechanic. Its rules determine whether users feel fairly treated on bad days — too strict and they rage-quit at day 12; too loose and the streak means nothing. This is the single most load-bearing rule in the product.

## Trigger
End of each local calendar day (per user's timezone). Evaluated before the next day's challenge drop.

## Rule (locked 2026-04-23)

Locked in [[Decisions/ADR-004-Streak-Preservation-Threshold]] and reflected in [[Peako_Games.md]] §Streak rules.

```
ON day-rollover for user U:
  today = U's record for yesterday (local tz)

  IF today.type == "rest"                         THEN streak += 1
  ELSE IF today.challengesCompleted >= 2 (of 3)   THEN streak += 1
  ELSE IF today.skipRedeemed                      THEN streak += 1
  ELSE IF user.freezeAvailableThisMonth
          AND user.confirmsFreeze                 THEN
            streak += 1
            today.type = "frozen"
            user.coins -= 100
            user.freezeAvailableThisMonth = false
  ELSE                                            THEN streak = 0

  // Logs alone do NOT preserve streak.
```

Freeze confirmation UX: the user is prompted either proactively from Progress (buy the freeze in advance, "bank" it) or at day-rollover when their streak is about to die. Must be a manual tap. Never auto-spend.

Implications this rule locks in:
- Completing **2 of 3** challenges keeps you whole. Completing all 3 is the same streak value as 2 — the reward for 3 is bonus coins, not streak bonus.
- A logged meal on a failed day is **not a rescue**.
- Rest days are peako-assigned (per [[Peako_App_Structure]] §Today); a user cannot manually declare one to save a streak.
- Freeze is a **paid** last resort — 100 coins, max 1 per calendar month, manual confirm. A user with 0 coins or an already-used freeze this month has no recovery option.

## Outputs & side effects
- **State**: `user.streak`, `user.longestStreak` (if `streak > longestStreak`).
- **UI**: Top-bar streak counter refreshes on Today screen; Progress calendar cell for yesterday colors (green / yellow / grey / red per [[Peako_App_Structure]] §Progress).
- **Feed**: Peako posts on (a) streak-broken day (passive-aggressive), (b) milestone days (7/30/100…).
- **Notifications**: morning push if streak-at-risk ("one challenge left or the streak dies").
- **Analytics events**: `streak_preserved { streak, reason: 'rest'|'2of3'|'3of3'|'skip'|'freeze' }`, `streak_broken { from }`, `freeze_purchased { balance_after }`. *(For Phase 0.5 internal demo: log to console only.)*

## Edge cases
- [ ] Timezone changes mid-streak (user travels) → evaluate in the timezone active at day-end.
- [ ] Clock manipulation (user changes device time) → server authoritative; prototype has no server.
- [ ] Partial day install (new user onboarded at 11:50 PM) → first day-rollover should not count against them; grace period.
- [ ] App uninstalled/reinstalled → streak restore if within N days? Decision needed.
- [ ] Peako assigns rest day but user does a challenge anyway — rest day still counts as preservation; extra challenge is bonus coins.
- [ ] Only 1-of-3 done + 1 log → streak broken (logs don't rescue). Confirm.

## Depends on / Affects
- Depends on: [[Challenge-Sequencing]] (what "completed" means for a challenge)
- Depends on: rest-day scheduler (not yet documented)
- Affects: all milestone Peako posts in feed
- Affects: Progress tab calendar coloring
- Affects: "streak at risk" notification logic

## Open questions
- [x] ~~Confirm **2-of-3 threshold** vs 1-of-3 vs all-3~~ → **Resolved 2026-04-23**, see [[Decisions/ADR-004-Streak-Preservation-Threshold]].
- [x] ~~Streak freezes / shields as a monetization or retention hook?~~ → **Resolved 2026-04-23**, 100 coins / 1 per month / manual confirm. (Retention hook for now; can monetize in Phase 3 by selling extra freezes.)
- [ ] Grace period for brand-new users' first 24–48h? *(Still open — not blocking the internal demo. Demo assumes new-user day 1 = normal day.)*
- [ ] Streak bumps by 1 per day vs by amount-of-challenge-done? *(Still open — days preferred for Phase 0.5 simplicity.)*

## Code / UI anchors
- Code: *not implemented in prototype* — prototype holds `streak: 5` inside `INITIAL_STATE` at `src/PeakoPrototype.jsx` (around line 29).
- Related product doc: [[Peako_App_Structure]] §Progress, [[Peako_Games]] §Streak rules + Streak freeze.

## Changelog
- 2026-04-22 — created from open questions in Peako_App_Structure during first obsidian setup
- 2026-04-23 — rule locked: 2-of-3 threshold + streak freeze mechanic (100 coins / 1 per month / manual). Status changed from `draft` to `accepted`. See [[Decisions/ADR-007-MVP-Batch-Lock-2026-04-23]].
