---
type: decision
status: accepted
tags: [decision, mascot, progress, phase/1]
date: 2026-04-23
deciders: founder
related: [[Peako_Design_Brief]], [[Peako_App_Structure]], [[Peako_Games]], [[Peako_Roadmap]], [[ADR-005-Streak-And-Currency-Count]]
---

# ADR-008: Peako Growth System + Dual Progress Views

## Context

Until now, the mascot has been a static character. Streak + coins are the only visible progression. This produces two gaps:

1. **No visible "I'm building a habit" arc.** Streak days tick up, but nothing in the product tells the user *"you are changing — here is what that looks like."* A 7-day streak and a 21-day streak feel identical on the Progress tab.
2. **Progress tab has a long-term identity problem.** The current Progress design (streak hero + calendar + weekly counts + coins + lifetime stats) is a **dashboard**. Dashboards are great for *maintaining* a habit but awful for *building* one — they look barren at day 3 and never change shape. We need something that carries the first ~3 weeks meaningfully and then steps aside.

The ask: tie the mascot's physical growth to the user's habit-formation arc, and rethink Progress as **two modes in one tab** — a journey view for the building phase, a dashboard for the steady state.

The target behavior we're designing for comes from habit-formation literature: ~21 days is the commonly-cited (and often over-simplified) baseline for a new habit feeling installed. We are deliberately choosing 21 days not because it's scientifically exact but because it's a legible contract: *"Show up for 21 days and Peako is fully grown."* If alpha data shows habits actually install at 30 / 45 / 66 days, we adjust the number — the system doesn't change.

## Decision

Ship a **4-stage mascot growth arc gated on effort, not calendar time**, and a **dual-view Progress tab** with a one-way transition at graduation.

### 1. The four growth stages

| # | Stage | Unlock | Mascot body | Peako's self-perception |
|---|---|---|---|---|
| 1 | 🌱 **Seed** | Day 0, brand-new user | Smallest form. Dormant-looking. Barely any personality yet in the body — character still shows through expression/voice. | "Fine. Let's see how long this lasts." |
| 2 | 🌿 **Sprout** | 7 effort days | Slightly grown. First hint of Peako's signature silhouette features. | "Oh. You're still here?" |
| 3 | 🧒 **Teen** | 14 effort days (cumulative) | Recognizably Peako. Full expression range unlocked. | "Don't embarrass me now." |
| 4 | 🌳 **Fully Grown** | 21 effort days (cumulative) | Final silhouette. The Peako that ships on stickers and marketing. | "Look at us. Look what we built." |

Visuals are **silhouette evolution, not species change.** Peako is the same character — the body reads as the same "kind of thing" from Seed to Fully Grown. What changes is scale, silhouette complexity, accessory fidelity, and expression range.

### 2. Effort-day definition (the gating rule)

A day counts toward growth if **either**:
- User completes **≥2 of 3** daily challenges, OR
- It's a **Peako-scheduled rest day**

A day does **not** count toward growth if:
- User skipped challenges (burned a monthly skip)
- User spent a streak freeze ❄️
- User missed the day entirely

This is **stricter than streak preservation.** Streak can survive via skip or freeze; growth cannot. Growth measures real effort; streak measures "didn't fall off entirely." The divergence is deliberate — Peako's body reflects actual habit-building work, not gaming the system.

Consequence: a user on a long streak whose last 7 days were all freezes/skips will see their streak intact but their growth frozen. This is correct — it prevents a coin-purchased shortcut to Fully Grown and makes the 21-day milestone feel earned.

### 3. Growth is milestone-gated, not linear time

Stages unlock on **effort-day counts**, not calendar days:
- Best case = 21 calendar days to graduate (perfect adherence)
- Realistic case = 28–35 calendar days (some freezes, skips, missed days)
- Pathological edge = indefinite (a user can theoretically take months)

Growth **does not regress.** Once Peako reaches a stage, Peako stays at that stage — even through broken streaks and long absences. Regression would punish exactly the users we need to pull back (returning-lapsed users), and breaks the promise "Peako is yours." We use tone/voice to express concern when a user lapses, not body regression.

### 4. Progress tab becomes dual-view

The existing Progress tab design (streak hero + freeze + calendar + weekly counts + coins + lifetime stats) is preserved as **Dashboard view**. A new **Trail view** is added as the pre-graduation default.

**View 1 — Trail (Journey mode)** — default while Peako is still growing:
- Vertical biome trail (illustrative path — forest / mountain / river metaphor TBD with designer) with **4 node markers** positioned at stage unlock points.
- **Current Peako sprite** sits on the user's current position (e.g. "day 5 of 7 toward Sprout" lives between Seed and Sprout nodes).
- Past nodes (already reached) are **tappable** — each opens a lightweight "memory card" showing 2–3 of Peako's standout posts from that stage. This turns the feed's ephemeral content into a permanent souvenir.
- Future nodes are dimmed / mysterious until reached.
- A small effort counter shows progress to the next stage: *"5 / 7 effort days → Sprout"*.
- A quiet link to "see full dashboard" is always available — we don't hide it even pre-graduation.

**View 2 — Dashboard (Steady-state mode)** — default after graduation:
- Unchanged from the current `Progress — Main` spec in [[Peako_App_Structure]] §Progress. Streak hero, freeze, calendar, weekly counts, coins, lifetime stats, weekly recap.

**View toggle:** a segmented control at the top of the Progress tab (Trail / Dashboard). The *default* flips at graduation (see below), but the user can always switch.

### 5. The graduation moment

When the user's 21st effort day completes:

- **Full-screen celebration takeover** (not a modal — this is a Phase 1 signature moment, on par with streak milestones).
- Peako in the Fully Grown form, first time the user sees the final silhouette.
- Copy register: grudging pride. Example: *"21 days. You actually did it. I'll admit — I didn't see that coming. Look at me. I grew up. Because of you. Don't get cocky."*
- One CTA: *"Switch to Dashboard"* (primary) + *"Stay on Trail"* (secondary link).
- Regardless of choice, **the app's default Progress view flips to Dashboard from this point forward.** Trail view remains accessible through the toggle forever.
- This screen is a **prime share surface** — it passes the Screenshot Test and should have its own share card template in Phase 2.

### 6. Post-graduation behavior

Once Peako is Fully Grown, the product shifts from "coaching a new habit" into "maintaining an installed habit." Concrete changes:

- **Default Progress view = Dashboard.** Trail becomes an archive.
- **Peako's coaching register evolves.** From teaching ("10 more seconds, you can do this") to maintaining ("you know the drill by now"). Less hand-holding, more peer energy. Codified in the Voice Bible (deferred — see [[Peako_Open_Decisions]] §4.1).
- **"Worried check-in" register activates.** If the user is inactive for **3+ consecutive days** post-graduation, Peako's feed posts tonally shift from snark to a kind of reluctant concern: *"Haven't seen you in a bit. Everything okay? …no, genuinely asking. Don't make me do this twice."* This is the only register where Peako's frenemy edge softens to something more like a friend. It's rare by design — if we over-use worry, it loses teeth.
- **No un-growing / no regression.** Even through broken streaks, Peako remains Fully Grown. The body reflects *what you built*, not *what you're currently doing*. Streak and calendar already track the current state; the mascot is the long-term relationship artifact.
- **Returning-lapsed users get a bespoke welcome-back moment** (Phase 2+). Peako Fully Grown + "took you long enough" energy + offer to re-engage with a lightweight challenge day.

### 7. Phase assignment

**Phase 1 (MVP / Alpha):** Full system ships — 4-stage art, trail view, dashboard view, toggle, graduation takeover, effort-day accounting, post-graduation tone shift, worried check-in register.

**Phase 0.5 (Internal Demo):** System is **scoped down to a pitch tease**:
- Debug menu in You tab can trigger a fake "Seed → Sprout" transition and the "Fully Grown graduation" takeover on demand, for pitch variety.
- Trail view renders as a static illustration (2–3 placeholder nodes) — no real effort-day accounting.
- Dashboard view is unchanged from the existing Progress design.
- Mascot stages use placeholder art — the real 4-stage illustration set is Phase 1 designer work.

This lets the demo show the concept (graduation = share-worthy moment) without committing the designer time that Phase 0.5 deliberately defers.

## Consequences

- **Mascot deliverable expands.** The designer now owns 4 silhouettes × the existing expression sheet, plus a post-graduation "worried" register. [[Peako_Design_Brief]] §4 grows meaningfully.
- **New Phase 1 screens:** `Progress — Trail`, `Trail Node Detail` (memory card), `Graduation Takeover`. Roughly 3 new screens added to the Phase 1 inventory.
- **Effort-day is a new first-class data concept.** State model adds `growthStage`, `effortDaysByStage`, and `graduatedAt`. The daily-rollover job evaluates effort-day eligibility alongside streak rules.
- **Coin economy is unaffected.** Growth does not award coins directly — the graduation takeover is the reward, not a number. This is deliberate: if graduation paid coins, every design debate about "which stage gives how many" would re-open the coin economy.
- **Streak-freeze semantic clarifies.** Freeze = "I'm keeping my visual streak intact" is now clearly different from "I'm growing." Users who rage-spend freezes don't advance Peako. This is the *healthy* outcome — we wanted freeze to be a mercy, not a progression tool.
- **Share surface adds two candidates for Phase 2:** the graduation card itself, and a "my journey" trail export summarizing the 21 days.
- **Progress tab grows from ~1 screen to 3** in the screen inventory (Trail, Trail Node Detail, Dashboard — plus Graduation Takeover as a one-time event).
- **Voice Bible scope grows** by two registers: post-graduation "maintaining" voice and "worried check-in" voice. This pushes Voice Bible further downstream but is acceptable — it was already deferred per [[Peako_Open_Decisions]] §4.1.

## Alternatives considered

**A. Linear day-count growth (no effort gating).** Simpler. Rejected because a user could skip every challenge and still "grow" on the calendar — breaks the contract that Peako reflects real habit-building.

**B. Growth regression on broken streaks.** Considered. Rejected because the people most likely to break streaks (returning-lapsed users) are exactly the ones we need to re-engage, and punishing their avatar for coming back is user-hostile. Body is a memorial; streak is current state.

**C. Multi-track growth (Peako grows taller for challenges, wider for healthy meals, etc.).** Overbuilt. One axis of growth (showing up to challenges) keeps the metaphor clean. Meals already have their own incentive system — conflating it with growth cheapens both.

**D. More stages (6, 8, 12).** Rejected. More stages = smaller visible changes = less "wow" per unlock. Four stages at 7-day intervals is the minimum-viable meaningful cadence.

**E. Growth-resettable (restart as Seed after graduation).** Rejected. Peako is a long-term relationship, not a game character. Resetting breaks the meaning we just earned.

**F. Dashboard stays primary even pre-graduation, trail is optional.** Rejected because the dashboard's weakness **is specifically** the "building" phase — that's when it looks emptiest and most boring. The dual-view flip exists to fix that problem; optional trail fails to solve it.

## Revisit triggers

- **Alpha data shows graduation feels unearned / anticlimactic.** Extend the effort-day count per stage.
- **Alpha data shows graduation is unreachable.** Audit drop-off curves — if median user abandons at day 5, the problem is onboarding/day-1 friction, not graduation being too far. Don't shrink the 21 — fix day 1.
- **Users want regression / restart.** (Unlikely but possible.) If alpha qualitative feedback reveals users *want* to "start over" after a long lapse, consider a one-time "Peako naps" visual state (not regression — a third tone register) instead of un-growing.
- **Trail view memory cards bloat the data model.** If storing Peako's posts-per-stage becomes expensive, cap memory cards at 3 per stage, chosen by a simple relevance heuristic (user likes + Peako system tags).

## Open questions (flagged separately in `Peako_Open_Decisions.md`)

- **[Growth.1]** Worried-check-in trigger threshold — 3 days? 5? 7? Tuned in alpha.
- **[Growth.2]** What specifically is in the Trail biome illustration — forest / climbing route / skyline / other? Designer call in Phase 1.
- **[Growth.3]** Can the user name their Peako at Seed stage (Tamagotchi-style), or is it always "Peako"? Leaning toward always Peako for brand consistency — but worth a look if personalization becomes a retention lever.
- **[Growth.4]** Should Phase 2 offer a **Second Journey** (e.g., a new character, or Peako adopting a new "track") for users who want progression beyond Fully Grown? Not a Phase 1 concern, but worth naming so we don't paint ourselves into a corner.

## Landed in

- [[Peako_Design_Brief]] — §4 mascot (4 stages added to deliverables), §5 visual style (growth stage color/size language), §8 Stage 2 deliverables (now includes stage × expression matrix)
- [[Peako_App_Structure]] — Progress tab restructured into Trail + Dashboard; new screens added to inventory; Graduation Takeover added; Phase 2 Collection tab note updated to avoid overlap with Trail archive
- [[Peako_Games]] — new "Growth System" section; clarified that effort days ≠ streak-preservation days
- [[Peako_Roadmap]] — Phase 1 deliverables expanded; Phase 0.5 debug hooks noted
- [[Peako_Open_Decisions]] — Decided entry (this ADR); 4 new tier-2/3 open questions
- [[Peako_Product_Doc_CN]] — §三 Peako 角色（加成长系统）、§5.3 Progress 屏（双视图）
- [[Logic/Peako-Growth-Stages]] — new logic note with the effort-day rule and pseudocode
