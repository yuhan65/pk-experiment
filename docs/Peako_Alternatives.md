---
type: moc
tags: [index, alternatives, ab-candidates]
date: 2026-04-22
---

# Peako — Alternatives & A/B Candidates

Parking lot for designs we **considered and rejected** but that could earn their way back via A/B testing, analytics signal, or a pivot.

Each entry should:
1. Say what was considered.
2. Say why we didn't ship it *now*.
3. Say the exact signal that would make us re-run it.

Keep it terse. Full decision logic lives in the ADR; this page is a map.

---

## Active parking lot

### Multi-streak + dual-currency meal economy
- **Retired:** 2026-04-22 in favor of one-streak / one-currency.
- **What it was:**
  - Three independent streaks — Challenge 🔥, Meal log 📝, Healthy 🥗.
  - "Two currencies" framing — Coins (virtue) and Content/roasts (honesty) as parallel rewards.
  - Progress tab surfaced all three streaks prominently.
- **Why we parked it:** Three visible streak counters break the companion tone; the Healthy streak specifically punishes the honesty it depends on (a single Treat resets it → under-logging). "Content" is a reward, not a currency, so calling it one overstructured a simpler dynamic.
- **Why it might come back:**
  - If D14 log frequency under the simple model is meaningfully worse than a cohort with a visible Meal-log streak.
  - If alpha users repeatedly ask "where's my streak?" for meals.
  - If Phase-2 achievements alone aren't enough progression feedback.
- **Full spec + ADR:** [[Decisions/ADR-005-Streak-And-Currency-Count]] §Option A.

---

## How to add an entry here

When you retire a design:

1. Write (or update) the ADR in `Decisions/ADR-<n>-*.md` — that's the source of truth.
2. Add a short stub here under **Active parking lot** with a link to the ADR.
3. Name the revisit trigger in concrete terms (a metric threshold, a qualitative signal, a phase milestone).

If the alternative is eventually shipped or definitively killed, move it out of the Active list and into a section below.

---

## Shipped (won an A/B or got adopted later)

*(none yet)*

---

## Killed (won't revisit)

*(none yet)*
