# Peako — Games & Challenges

*The 10 placeholder games for Phase 1, plus the rules that govern daily assignment, swaps, skips, and rest days.*

Companion to `Peako_App_Structure.md`. Content spec — this doc is mostly for engineering, secondarily for design reference.

---

## Design Philosophy

1. **Bodyweight only, no equipment.** Anyone, anywhere, any time.
2. **1–3 minutes each.** A day's 3 challenges should take 5–10 minutes total. This is not a workout plan — it's a daily nudge.
3. **One input pattern per game.** Timer, counter, or guided-flow. No branching logic within a single game.
4. **Honor system.** We're not going to detect reps via computer vision in Phase 1. If a user says they did 20 squats, they did 20 squats. Peako's comment on this is part of the joke.
5. **Character > correctness.** A slightly imperfect form workout that Peako heckles is better than a perfect workout with no personality. We're not Peloton.

---

## The 3 Game Archetypes

Every Phase 1 game fits into one of three templates. The **engineering goal** is to ship three reusable components and plug content into them.

### A — Timer (hold / duration)
- Big countdown timer, full-screen
- Peako interjects at milestones (halfway, 10s left, 5-4-3-2-1)
- User can pause (penalty: Peako judges you)
- Auto-completes when timer hits 0
- **Examples:** plank, wall sit, high-knees, dead hang *(if we later add equipment)*

### B — Counter (rep-based)
- Big rep counter, big "+1" button user taps per rep
- Target rep count displayed ("0 / 20")
- Peako interjects at milestones (halfway, 5 left, 1 left)
- Manual "Done" button (allows early completion; Peako comments)
- **Examples:** squats, pushups, lunges, burpees, calf raises

### C — Guided Flow (sequence)
- Multi-step sequence with internal timer per step
- Visual demonstration (placeholder: a named card; later: animated mascot or video)
- "Next" button advances manually, OR auto-advances on timer
- Peako narrates transitions
- **Examples:** morning stretch flow (5 stretches × 30s), cooldown, mobility sequence

---

## The 10 Placeholder Games (Phase 1)

Each has: name, type, duration/reps, difficulty tier, category. Used by the challenge engine to build a balanced daily set.

### Strength
| # | Name | Type | Default | Diff | Peako's hook line |
|---|------|------|---------|------|------------------|
| 1 | **Squat Holdup** | B — Counter | 20 reps | Easy | "Squats. Simple. Don't complicate it." |
| 2 | **Pushup Punishment** | B — Counter | 10 reps | Medium | "If you do these on your knees, I won't tell anyone. I'll just know." |
| 3 | **Lunge Line** | B — Counter | 16 reps (8/leg) | Medium | "Both legs. Yes, both. I can see you." |
| 4 | **Burpee Breakdown** | B — Counter | 8 reps | Hard | "Burpees. The exercise people pretend to like. Begin." |
| 5 | **Calf Raise Riot** | B — Counter | 25 reps | Easy | "The easy one. Don't blow it." |

### Endurance / Isometric
| # | Name | Type | Default | Diff | Peako's hook line |
|---|------|------|---------|------|------------------|
| 6 | **Plank Patience** | A — Timer | 30s | Medium | "30 seconds. You can read a tweet. You can hold a plank. Prove me wrong." |
| 7 | **Wall Sit Woe** | A — Timer | 45s | Medium | "Find a wall. Lean. Suffer. That's it. That's the game." |
| 8 | **High-Knees Havoc** | A — Timer | 30s | Easy | "Run in place. Aggressively. Like you're late for something important." |

### Flexibility / Recovery
| # | Name | Type | Default | Diff | Peako's hook line |
|---|------|------|---------|------|------------------|
| 9 | **Morning Thaw** | C — Guided | 5 stretches × 30s = 2:30 | Easy | "Wake up. Slowly. Like a Victorian lady." |
| 10 | **Evening Shutdown** | C — Guided | 4 stretches × 45s = 3:00 | Easy | "Wind down. Yes, you. Not the phone. You." |

### Difficulty tiers explained
- **Easy** (3 games): accessible to anyone, good for rest-day-adjacent assignments and warm-ups
- **Medium** (4 games): the default difficulty — expects some effort but achievable
- **Hard** (3 games): burpees, tough plank variants — used sparingly, not every day

---

## The Challenge Engine (Rules)

### Daily assignment
Each morning at the user's preferred time (default 8am local), Peako assigns **3 challenges**:

- **Balance:** 1 strength + 1 endurance/isometric + 1 flexibility *(ideal; not strict)*
- **Difficulty curve:** the first challenge is easier than the last. Warm them up, then push.
- **Variety:** no game repeats within a 3-day rolling window.
- **Never same type twice in one day.** No "plank + wall sit + high knees" days. Mix archetypes.

Assignment is generated **once per day** and **locked** (beyond swaps). Peako committed to your plan; you can't re-roll the whole day.

### Swaps (3 per day)
User can replace a challenge with a different one. Rules:

- **Same archetype required** (swap a timer for a timer, counter for counter). Keeps the day's shape.
- **Different difficulty allowed** but costs more:
  - Same difficulty: 1 swap
  - Lower difficulty: 1 swap + Peako disapproval
  - Higher difficulty: 1 swap + Peako mild-approval
- **Cannot swap in a completed challenge.** You can only swap what you haven't started.
- Resets at midnight local.

### Skips (limited monthly budget)
User gets **5 skips per calendar month**. Rules:

- Skip removes a challenge from today's set entirely — it doesn't need to be replaced.
- Still need to complete the other 2 for the day to count toward streak.
- Skipping triggers a passive-aggressive Peako post in the feed.
- Budget resets on the 1st of each month.
- **Running out of skips is itself a content moment** — Peako's response when you try to skip with no budget left is gold ("You've already used your 'I'm tired' card 5 times this month. Be tired tomorrow.")

### Rest days
Peako decides rest days. Rules:

- **Default cadence:** 1 rest day per 7 days, chosen by Peako.
- **User preference** (in You tab): "Auto" (Peako decides), specific day (Mon/Tue/…), or "None" (Peako overrides to 1 per 10 days minimum — we don't let you skip rest entirely).
- Rest day = no challenges assigned. Today screen shows a single "Rest Day" card with a Peako message.
- Streak **continues** through a rest day (doesn't break it, doesn't extend it).
- Logging still works on rest days.

### Streak rules

**One streak, one currency.** The whole app has exactly two numbers the user sees accumulate:

1. **Challenge streak** 🔥 — the only streak. Visible on Today's top bar.
2. **Coins** 💎 — the only currency. All rewards go here.

The challenge streak is preserved each day if any ONE of:
- User completes **≥2 of 3** assigned challenges
- It's a rest day
- User redeems a monthly skip
- User spends a **streak freeze ❄️** (see below)

Logging meals does **not** affect the challenge streak. The challenge loop stands on its own.

### Streak freeze ❄️ (locked 2026-04-23)

A Duolingo-style safety net, intentionally scarce.

- **Cost:** 100 coins.
- **Cap:** 1 per calendar month. Resets on the 1st.
- **Trigger:** manual confirm. The user decides to spend it, either proactively from the Progress tab or at day-rollover when Peako would otherwise break their streak.
- **Effect:** the day is recorded as `frozen` in the streak calendar (blue cell). Streak is preserved; no challenges are retroactively marked complete. No coins earned for the frozen day.
- **Peako voice on a freeze:** grudging, never encouraging ("Fine. I'll pretend yesterday didn't happen. You won't."). Never celebratory — the freeze is a mercy, not a win.
- **Why this specifically:** coins currently have no sink in Phase 0.5. A meaningful, character-consistent coin sink prevents runaway accumulation and gives every completed challenge a little more weight without requiring a shop.
- See [[Decisions/ADR-004-Streak-Preservation-Threshold]] for the full decision record.

> **Design note:** We deliberately rejected a multi-streak system (separate Meal log streak + Healthy streak). Three counters each begging for attention = cognitive overload and a "grind" feel, not a companion relationship. The meal side is still incentivized — via coins and Peako's content — but we don't ask users to white-knuckle a second or third streak. See `Peako_Alternatives.md` for the retired design and the case for re-visiting it in an A/B test.

---

## Growth System — Peako's body tracks effort, not the streak

Locked 2026-04-23 in [[Decisions/ADR-008-Peako-Growth-System-Dual-Progress-Views]]. Full rule + pseudocode in [[Logic/Peako-Growth-Stages]].

Peako grows through **4 stages** as the user builds the habit:

| Stage | Unlock | What it represents |
|-------|--------|-------------------|
| 🌱 **Seed** | Day 0 | Brand new user |
| 🌿 **Sprout** | 7 effort days | First week, habit taking root |
| 🧒 **Teen** | 14 effort days (cumulative) | Habit recognizable |
| 🌳 **Fully Grown** | 21 effort days (cumulative) | Graduation — habit "installed" |

Hitting Fully Grown triggers a full-screen **Graduation Takeover** and flips the Progress tab's default view from Trail to Dashboard (see [[Peako_App_Structure]] §Progress).

### Effort days ≠ streak-preservation days

The streak uses a forgiving rule (≥2/3 OR rest OR skip OR freeze — see §Streak rules above). The growth system uses a **stricter** rule:

| Day type | Preserves streak? | Counts as effort day? |
|---|---|---|
| ≥2/3 challenges completed | ✅ | ✅ |
| Peako-scheduled rest day | ✅ | ✅ |
| Redeemed a monthly skip | ✅ | ❌ |
| Spent a streak freeze ❄️ | ✅ | ❌ |
| Missed entirely | ❌ | ❌ |

**Why stricter:** growth is meant to feel earned. If skips and freezes advanced the mascot, a user could coin-purchase their way to Fully Grown, which would cheapen the 21-day milestone and break the contract. Streak stays forgiving (keeps users from rage-quitting); growth stays honest (keeps the graduation meaningful).

### Growth does not regress

Once Peako reaches a stage, Peako stays at that stage — **even through broken streaks and long lapses.** The mascot's body is a *memorial to what you built*, not a reflection of current activity. Regression would punish exactly the returning-lapsed users we need to re-engage. Instead, lapses are handled through **voice** — see "Post-graduation behavior" below.

### Post-graduation behavior

After Fully Grown, the product shifts from coaching-a-new-habit to maintaining-an-installed-habit:

- **Progress default = Dashboard.** Trail remains accessible via the toggle; past nodes hold memory cards of Peako's standout posts from each stage.
- **Peako's coaching register softens from teaching → maintaining.** Less hand-holding, more peer energy. ("You know the drill.")
- **"Worried check-in" register activates after 3+ consecutive inactive days.** Peako drops snark temporarily: *"Haven't seen you in a bit. Everything okay? …no, genuinely asking. Don't make me do this twice."* Rare by design — worry loses meaning if overused.
- **Post-graduation feed** includes occasional "relationship" posts — Peako remembering something from the first 21 days, casually referencing the Trail archive.

### Phase assignment

- **Phase 1:** Full system. 4-stage mascot art, Trail view with real effort-day accounting, Dashboard view, toggle, Graduation Takeover, post-graduation voice shifts.
- **Phase 0.5 (internal demo):** Teaser only. Debug menu can fake a Seed → Sprout transition and a Graduation Takeover for pitch variety. Trail is a static placeholder with 2–3 fake nodes. No real effort-day accounting needed for the demo.

Design implications for the mascot (silhouette scaling across 4 stages) and the Trail illustration live in [[Peako_Design_Brief]] §4 and §5.

---

## Meal Logging — Incentive System

### Core principle

> **Every meal log earns coins AND produces a Peako post. Healthy meals earn more coins. Treat meals earn better content. Users are never penalized for honest logs. Users who don't log get nothing.**

This resolves the three-way tension between (a) high log frequency, (b) nudging healthy behavior, and (c) honest reporting of unhealthy meals — without punishing any behavior. Different tags emphasize different sides of the reward: Healthy leans coins, Treat leans content. Both are valid ways to "win."

### Meal tag system (user self-tags at log time)

When a user logs a meal, they choose one tag:

| Tag | Examples | Intent |
|-----|----------|--------|
| 🥗 **Healthy** | Salad, grilled chicken, home-cooked, fruits | "I'm being good today" |
| 🍕 **Treat** | Pizza, burger, dessert, takeout | "I'm having fun today" |
| 🤷 **Whatever** | Unclear, mixed, "I ate something" | "Don't make me categorize, Peako" |

**Why user-tagged and not AI-tagged:** LLM/vision judgment of "healthy" is unreliable and paternalistic. Self-tagging is part of the frenemy relationship — *you tell Peako the truth, Peako reacts accordingly.* It also sidesteps an entire class of "why is my açaí bowl unhealthy?!" complaints.

### What each tag produces

Every meal earns **coins + a Peako post.** Tag choice varies both.

| Tag | Coins | Peako's response style | Shareability of content |
|-----|-------|------------------------|-------------------------|
| 🥗 Healthy | **+5** | Reluctant mild approval. Scarce and dry. ("Fine. That was actually fine. Don't get cocky.") | Medium — the *rarity* is the hook |
| 🍕 Treat | **+2** | Full-send roast. Peako's signature voice. ("I've calculated your beach body progress. It's now scheduled for the year 2099.") | **High — viral content engine** |
| 🤷 Whatever | **+2** | Suspicious, prying, nosy. ("'Whatever.' Nice dodge. What was it really, pizza?") | Medium-high |

**Voice rule:** Healthy-meal approval should feel **scarce and earned** — not every salad gets a clap. Default: ~1 in 5 Healthy logs gets explicit approval; the other 4 get a dry acknowledgment. This protects the app from feeling like Fitbit.

See `Peako_Design_Brief.md` §3 for the full voice register with examples in each tag.

### Healthy-run bonuses (background math, not a UI streak)

To reinforce healthy behavior *without* putting a streak counter on screen:

- **3 Healthy meals in a row**: +10 coin bonus + Peako post ("Three in a row. Who are you?")
- **7 Healthy meals in a week (rolling)**: +25 coin bonus + Peako post ("I almost respect this. Almost.")

**Key UX decision:** These bonuses are **revealed on trigger**, not tracked as a persistent counter in the UI. User sees a "+10 Healthy Streak Bonus" floating notification when the 3rd Healthy meal is logged — and that's it. No "🥗 Healthy Streak: 2 → don't break it!" pressure in the UI.

Why: persistent counters create anxiety and break the frenemy vibe. Surprise bonuses feel like a wink from Peako.

### Why "Whatever" exists (and why it's not too easy an escape)

Risk: users default to Whatever to avoid committing.

Mitigations:
- **Peako's Whatever response is the most annoying of the three** (prying, nosy) — users learn to avoid it.
- **Whatever earns only base coins** (+2), no Healthy-run bonus contribution.
- **Whatever breaks the healthy-run counter** (same as Treat) — so habitual Whatever-ers never trigger the Healthy bonuses.

Net effect: Whatever is an escape hatch for legitimately mixed meals, not a strategy.

### Invariant (do not break)

**No negative coins for any meal log, ever.** Breaking this rule destroys honest logging. If a future feature wants to penalize a behavior, penalize *not logging* — not the content of the log.

### Result — how the three tensions resolve

| User eats | User doesn't log | User logs |
|-----------|------------------|-----------|
| 🥗 Healthy | Forfeit +5 coins + rare positive content | +5 coins, rare "Peako impressed" screenshot |
| 🍕 Treat | Forfeit +2 coins + viral roast + lose accountability | +2 coins, premium roast content |
| 🤷 Whatever | Forfeit +2 coins + nothing | +2 coins, "Peako prying" content |

**Logging is always the correct answer, regardless of what was eaten.** That's the design goal.

### Full coin economy (all events)

| Event | Coins |
|-------|-------|
| Complete a challenge | +10 |
| Complete all 3 in a day | +10 bonus (so: 30 + 10 = 40/day at max) |
| Complete higher-difficulty swap | +5 bonus |
| Log a Healthy meal | +5 |
| Log a Treat meal | +2 |
| Log a Whatever meal | +2 |
| 3 Healthy meals in a row (revealed on trigger) | +10 bonus |
| 7 Healthy meals in a week (rolling, revealed on trigger) | +25 bonus |
| Skip a challenge | -5 |
| Quit a challenge mid-way | 0 (no penalty, just no reward) |
| Purchase streak freeze ❄️ (max 1/month) | **-100** |

**Coin sink, one:** the streak freeze is the only way to spend coins in Phase 0.5 / Phase 1. Phase 2+ adds cosmetic spend: stickers, customization, Peako personalities.

---

## Screen Flow: A Challenge From Start To Finish

Using **Squat Holdup** (Counter type) as the example:

```
┌─── Today screen ────────┐
│ Challenge 2 of 3         │
│ 🦵 Squat Holdup          │
│ 20 reps                  │
│ [ Start ]  [ Swap ]      │
└──────────────────────────┘
        ↓ tap Start
┌─── Challenge Intro ─────┐
│ [Peako, coaching pose]   │
│ "Squats. Simple. Don't   │
│  complicate it."         │
│         [ Begin → ]      │
└──────────────────────────┘
        ↓ tap Begin
┌─── Challenge Active ────┐
│   [Peako, counting pose] │
│                          │
│        0 / 20            │
│                          │
│       ┌──────┐           │
│       │  +1  │           │
│       └──────┘           │
│                          │
│  [peako line: "keep      │
│   going, I'm watching"]  │
│                          │
│       [ Quit ]           │
└──────────────────────────┘
        ↓ tap +1 × 20 → auto-advances
┌─── Challenge Complete ──┐
│  [Peako, mildly impressed]│
│  "Fine. That was… fine.  │
│   I'll allow it."        │
│                          │
│  +10 coins               │
│                          │
│  [ Next Challenge → ]    │
│  [ Back to Today ]       │
└──────────────────────────┘
```

---

## Phase 2+ Game Expansion

This doc covers Phase 1 placeholders. Things deferred:

- **More games.** Goal: 30–50 in the library by public launch.
- **Equipment-based games** — dumbbells, resistance bands. Gated on user opting in.
- **Cardio** — run/walk tracking with GPS. Substantially bigger scope.
- **Computer vision rep counting** — camera watches you do squats, counts automatically. Research project.
- **Difficulty auto-adjustment** — if the user crushes 20 squats effortlessly, next week it's 25.
- **Weekly "boss" challenge** — Sunday or weekend mega-workout, longer + harder + extra coins.
- **Challenge combos** — 2-game circuits ("20 squats, then 30s plank, repeat 3x").
- **Narrative arcs** — week-long challenge series with a Peako-narrated storyline.

---

## Open Questions

1. **Pause behavior in Timer games** — allowed with penalty? Not allowed? Limited pauses per game?
2. **Counter games — can user over-report?** If target is 20 and they tap 50, do we cap or let them flex? Probably cap silently.
3. **Demonstration UI** — placeholder for Phase 1 is a text name + maybe a static icon. When does this become actual animation/video? Could be a Phase 1.5 polish push.
4. **Global mute on Peako interjections** — some users might find constant heckling annoying during a workout. Toggle in You tab?
5. **Accessibility** — alternate game set for users with mobility limitations? Probably Phase 2, but worth naming now so we don't paint ourselves into a corner.

---

*Game content changes more often than game systems. The 10 games above are placeholders — they'll be rewritten, renamed, rebalanced. The three **archetypes** (Timer / Counter / Guided) should stay stable. Build the engine around those, not the specific games.*
