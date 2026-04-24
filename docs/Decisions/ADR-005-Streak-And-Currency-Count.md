---
type: decision
status: decided
tags: [decision, feature/progress, feature/economy, feature/log]
date: 2026-04-22
deciders: PM
related: [[Streak-Preservation]], [[Coin-Reward-Rule]], [[Peako_Games]], [[Peako_App_Structure]]
supersedes: []
---

# ADR-005: How many streaks and currencies does Peako have?

## Context

The meal-logging system (see [1.6] in [[Peako_Open_Decisions]]) needs an incentive structure that resolves a three-way tension:

1. **High log frequency** — the app dies if users stop feeding it content.
2. **Nudge healthy behavior** — we can't be a nihilistic roast machine.
3. **Honest reporting of unhealthy meals** — pizza roasts are the viral content engine; users must feel safe logging pizza.

The first cut answered this with **three independent streaks** (Challenge + Meal log + Healthy) and a **"dual-currency" framing** (coins + "content/roasts" as a second currency). That answer resolved the logic but looked wrong once sketched into the UI — three streak counters visible on the Progress tab, plus a "content currency" that users don't actually spend.

This ADR locks in the cleaned-up version, and parks the original for possible later A/B.

## Options considered

### Option A — 3 streaks, "dual currency" framing *(original design; rejected)*

**Mechanics:**
- 🔥 **Challenge streak** — 2-of-3 challenges/day or rest day (primary, shown top-bar).
- 📝 **Meal log streak** — preserved by logging ≥1 meal (any tag) that day.
- 🥗 **Healthy streak** — preserved by logging a Healthy-tagged meal; reset on Treat/Whatever.
- **Currency 1:** Coins (rewards virtue).
- **Currency 2:** Content / roasts (rewards honesty) — framed as a parallel currency.

**Progress tab:** three streak counters side-by-side + streak calendar + coins + weekly tag breakdown.

**Pros:**
- Every behavior we want (showing up, logging at all, eating healthy) has a dedicated retention hook.
- Users who care about different goals see a counter that matches their identity (the cutter, the logger, the clean-eater).
- "Dual currency" phrasing maps neatly onto the voice bible: coins vs roasts as parallel axes.

**Cons:**
- **Three visible counters = grind feel.** Companion-app tone breaks the moment the Progress tab looks like a dashboard of things not to break. Contradicts the frenemy model (cf. Finch, which has *no* streaks; Duolingo, which has only *one*).
- **Healthy streak is the worst kind of streak** — a single pizza resets it. In a meal-logging app this is identical to a hunger-cue punishment; it incentivizes under-logging or refusing to admit a Treat, which destroys the very honesty we want. (This was the decisive con.)
- **Meal log streak is redundant with challenge streak in practice** — the same users who show up for challenges also log meals. Adding a separate counter gives almost no new behavioral signal and multiplies anxiety.
- **"Content" is a reward, not a currency.** Users don't have a balance of roasts; they don't spend roasts; they just receive them. Calling it a currency overstructured a dynamic that's better described as "Peako's voice varies by tag."
- **Onboarding cost:** explaining three streaks and two currencies before the user has logged a single meal is a wall of rules — bad first-ten-minutes experience.

### Option B — 1 streak, 1 currency, tagged rewards *(chosen)*

**Mechanics:**
- 🔥 **Challenge streak only.** Preserved by 2-of-3 challenges/day, rest day, or monthly skip. Meal logging does **not** affect it.
- 💎 **Coins only.** All rewards accrue here.
- Meal tags (Healthy / Treat / Whatever) still drive **differential coin amounts** AND **differential Peako voice**, exactly as in Option A — but we describe these as "two dials on the same reward," not two currencies.
- **Healthy-run bonuses** (+10 at 3-in-a-row, +25 at 7-in-a-week) are **revealed on trigger** (floating "+10 Healthy Streak Bonus" toast) rather than tracked as a persistent on-screen counter. The math is identical to Option A's Healthy streak; the *UX surface* is a surprise, not a pressure.
- **Progress tab shows:** one streak, coins, and a low-pressure "This Week" block (Healthy / Treat / Total logged) that resets weekly with a Peako-narrated recap.

**Pros:**
- Preserves **every incentive** from Option A: Healthy earns more coins, Treat earns better roasts, logging is always correct, not-logging is the only thing that's punished.
- **Single streak** matches the companion tone and halves onboarding cost.
- **No anxiety counter for Healthy** — users can log a Treat without watching a number go to zero, which is exactly when we most need them to log honestly.
- The weekly "This Week" counts still surface healthy behavior without the grind of a streak.
- Weekly recap card becomes the natural shareable artifact for "how the week went" — leans into the screenshot-test principle from [[Peako_Design_Brief]] §9.

**Cons:**
- Users who actually *like* counting Healthy meals in a row lose a visible progress surface. Mitigation: the trigger-reveal bonuses still fire, and the weekly count is right there.
- Slightly weaker retention hook if a user only cares about logging and not challenges — they have no streak. We accept this; the primary loop is coaching.
- Some of the Option A rationale was genuinely right (differential content). We keep that; we just stop calling it a currency.

### Option C — Boss's original suggestion: only reward healthy logs (with negative coins for Treat) *(rejected earlier; included for completeness)*

**Rejected because:**
- Negative coins on honest logs destroys honest logging, which destroys the viral content engine (premium pizza roasts).
- This is the "Fitbit with shame" failure mode the product brief (see [[Peako_Design_Brief]] §9) explicitly exists to avoid.

## Decision

**Option B.** One streak (Challenge), one currency (Coins), tagged differential rewards expressed through coin amount + Peako voice. Healthy-run bonuses kept but hidden from the UI as trigger-reveals.

## Consequences

**Positive:**
- Cleaner Progress tab, cleaner onboarding, less grind anxiety.
- Preserves the honesty guarantee — no mechanism punishes logging a Treat.
- Weekly recap becomes the natural Phase-2 shareable (already in [[Peako_Roadmap]] Phase 2).

**Negative / cost:**
- Users who would have identity-attached to a "Healthy streak: 14" number lose that badge. Mitigation: achievements in Phase 2 (e.g. *Reluctantly Proud* = 7 Healthy in a week) convert this to a one-shot brag rather than a persistent counter.
- If analytics show logging frequency dropping without a meal-log streak pressure, we revisit.

**Reversibility:** **Easy in one direction, hard in the other.**
- *One streak → more streaks* is easy; we can surface the hidden Healthy-run counter as a streak any time.
- *Many streaks → one streak* is hard once shipped — users who built a 90-day Healthy streak feel rugged. This asymmetry is why we ship fewer streaks first.

## Revisit trigger

Run Option A as an A/B against Option B if any of:

- D14 log frequency in Option B drops more than 20% vs a cohort with any visible meal-streak.
- Qualitative signal from alpha: users ask "where's my streak?" for meals repeatedly.
- Phase-2 achievement engagement is low (suggests users aren't getting enough progression feedback from the weekly counts alone).

Detailed rejected spec lives in [[Peako_Alternatives]] §Multi-streak.

## Related

- Supersedes the multi-streak language that appeared briefly in earlier drafts of [[Peako_Games]] and [[Peako_App_Structure]] on 2026-04-22.
- Depends on [[Streak-Preservation]] (challenge streak threshold — still open under [[Decisions/ADR-004-Streak-Preservation-Threshold]]).
- Affects [[Coin-Reward-Rule]] when it's updated from prototype's `{pizza, salad, gym}` model to the Healthy/Treat/Whatever tag model.
