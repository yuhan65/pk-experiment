# Peako — App Structure & Information Architecture

*The skeleton of the app: tabs, screens, navigation patterns. Written for Phase 1 (MVP), with notes on Phase 2+ expansion.*

Companion to `Peako_Design_Brief.md`, `Peako_Roadmap.md`, and `Peako_Games.md`.

---

## The Product in One Sentence

> **Peako is your daily fitness frenemy. They assign you 3 challenges every day, and they judge what you eat when you tell them. One relationship, two directions.**

This sentence is the glue for every structural decision below. If a screen or tab doesn't reinforce it, cut that screen.

---

## Guiding Principles

1. **Home is today's challenges, not a feed.** Opening the app answers *"what am I doing right now?"* — not *"what did Peako say about me?"*
2. **Peako coaches first, observes second.** Assigned workouts are the primary loop. Logging is a side channel — available when the user wants it.
3. **The feed is Peako's messages, not the home screen.** You "check your phone" to see what Peako's been saying. Notifications bring you there. It's a secondary surface.
4. **Logging is a button, not a destination.** Tap it when you want. Don't make it a tab, don't make it mandatory, don't make it the front door.
5. **Three tabs for MVP, not four.** Every extra tab is a cognitive cost. The fourth tab (Collection) arrives in Phase 2 when it has real content.
6. **Peako reacts everywhere.** Empty states, loading states, completion moments, skip moments — every surface is a character beat.

---

## The Model (decided)

~~Formerly "Model A vs B vs C."~~ Locked in:

**Peako is a coach with an attitude.** The home screen shows today's challenges (what Peako is asking of you). The feed is secondary — accessed on demand via a **"phone" icon** in the top bar, and surfaced via push notifications when Peako posts.

Closest reference apps: **Duolingo** (daily lesson path), **Finch** (daily tasks + pet state), with a messages-style feed layered on top.

---

## Phase 1 MVP — Tab Structure

### 3 tabs + persistent UI elements

```
┌───────────────────────────────────────┐
│  🔥 5    💎 150         📱 (3)        │  ← top bar (on Today screen)
├───────────────────────────────────────┤
│                                       │
│          [ Current Screen ]           │
│                                       │
│                                       │
│                        ┌─────┐        │
│                        │  +  │        │  ← floating log button
│                        └─────┘        │
├───────────────────────────────────────┤
│     🏠              📊           👤   │
│   Today          Progress       You   │
└───────────────────────────────────────┘
```

### The persistent elements

| Element | Where | Purpose |
|---------|-------|---------|
| **Streak + coins** | Top-left of Today screen | Stat display; taps to Progress |
| **📱 Phone icon** | Top-right of Today screen | Opens feed (Peako's posts). Red badge when unread. |
| **+ Log button** | Floating bottom-right on Today screen | Opens log modal anytime |
| **Tab bar** | Bottom, all main screens | Today / Progress / You |

The phone icon is the **key ownable UI concept.** Peako "texts" you throughout the day; you check your phone to see what they said. It's literal and on-brand for a frenemy character.

---

## Tab-by-Tab Contents

### 🏠 Today (home tab — the primary surface)

**Purpose:** What Peako is asking of you today. The daily coaching loop.

**Contents:**
- **Top bar:** streak + coins + phone icon (with unread badge). When a streak freeze is available for use this month, a small ❄️ affordance sits next to the streak counter (purely informational; the actual "use freeze" flow fires from Progress or at day-rollover — see below).
- **Peako greeting** — 1–2 lines in voice, today-specific ("3 challenges. Don't embarrass me.")
- **Today's 3 challenges** — shown as a stacked card list. **All three are tappable in any order** from the moment the day begins. No locked states; respect the user's schedule.
  - Each card shows name, archetype icon (Timer / Counter / Guided), target (reps or duration), and a Start button.
- **Swap counter** — "2 swaps left today"
- **Skip counter** — "3 skips left this month"
- **Rest day state** *(if applicable)* — instead of challenges, a Peako card giving you the day off ("Don't get used to this.")
- **Completion state** — when all 3 done: big celebration card, coins earned, streak bumped, "come back tomorrow"

**Interactions:**
- Tap Start on any challenge → opens game modal. The other two remain available when the user returns to Today.
- Tap Swap → **Peako auto re-rolls** a replacement of the **same archetype** from the library (user does not pick). Costs 1 swap.
- Tap Skip → skips this challenge (costs 1 monthly skip + 5 coins; streak still counts if the other 2 complete).
- Long-press challenge → preview detail (what it involves, rough difficulty).

**What it's NOT:**
- Not a workout library. User can't browse all games. Peako chooses.
- Not a schedule editor. Peako decides rest days.

---

### 📊 Progress — dual-view (Trail + Dashboard)

**Purpose:** How am I doing? Proof of the relationship over time.

Progress has **two views** toggled by a segmented control at the top of the tab. The **default** view flips from Trail to Dashboard at graduation (see `Peako_Games.md` §Growth System and [[Decisions/ADR-008-Peako-Growth-System-Dual-Progress-Views]]). The user can always override the default via the toggle.

| View | Default while… | Purpose |
|------|----------------|---------|
| 🌱 **Trail** | Peako is still growing (Seed / Sprout / Teen) | Shows the habit-building journey; the mascot lives here |
| 📊 **Dashboard** | Peako is Fully Grown (post-graduation) | Shows steady-state metrics; where the streak lives long-term |

#### View 1 — Trail (journey mode)

A vertical biome path (exact illustration TBD with designer — forest / climb / river / other) with **4 stage nodes** on it:

- 🌱 **Seed** (day 0) → 🌿 **Sprout** (7 effort days) → 🧒 **Teen** (14 effort days) → 🌳 **Fully Grown** (21 effort days)

**What's on the Trail screen:**
- **Current Peako sprite** positioned between the last-reached node and the next one (e.g., "day 5 of 7 toward Sprout").
- **Effort-day counter** near the sprite: *"5 / 7 effort days → Sprout"*. Small, quiet — not a scoreboard.
- **Past nodes** (already reached) are **tappable** — each opens a `Trail Node Detail` memory card with 2–3 standout Peako posts from that stage. This turns ephemeral feed content into a permanent keepsake.
- **Future nodes** are dimmed / silhouetted until reached. No spoilers on Peako's final form.
- **Small "Dashboard →" link** always visible (we don't hide steady-state metrics pre-graduation; some users just want the numbers).
- **Peako quote** at the top of the screen, stage-aware ("Still here. Respectable." at Sprout; "Don't embarrass me now." at Teen).

**What counts as an effort day** (stricter than streak — see `Peako_Games.md` §Growth System): ≥2/3 challenges completed OR a Peako-scheduled rest day. Skips and streak freezes do NOT advance growth.

#### View 2 — Dashboard (steady-state mode)

This is the pre-existing Progress design. Default view after graduation.

**Contents:**
- **🔥 Challenge streak** *(the one streak — headline)* — current streak, longest streak. Preserved by doing 2 of 3 daily challenges, or a rest day, or redeeming a skip, or spending a streak freeze (see below).
- **❄️ Streak freeze** — at most **1 per calendar month**. Costs **100 coins** to purchase. Manual confirm from this section ("Spend 100 coins to freeze your streak?") or at day-rollover if the streak is about to die. Shown as: `❄️ Available / ❄️ Used (resets Nov 1)`. If the user has no unused freeze this month, the purchase button is disabled and Peako posts a passive-aggressive line when the streak dies anyway.
- **Streak calendar** — GitHub-style heatmap for the challenge streak, one month visible. Color-coded: green (all 3 challenges), yellow (2 of 3), grey (rest), blue (freeze used), red (missed).
- **This Week** *(weekly counts — low-pressure stats, NOT streaks)*:
  - 🥗 Healthy meals: X / 7
  - 🍕 Treat meals: X
  - 📝 Total meals logged: X
  - Resets each Sunday with a Peako-narrated weekly recap post (Phase 2).
- **💎 Coins** — balance, recent earn/spend log. Freeze purchases show up here as a -100 line.
- **Lifetime stats** — total challenges completed, total meals logged, days active, swap/skip/freeze usage.

**Why only one streak:** We deliberately reject a multi-streak UI (Meal log streak, Healthy streak, etc.). Multiple counters = grind feel, not companion vibe. Meal behavior is still incentivized via coins + Peako's content; the Healthy-run bonuses reveal themselves on trigger rather than living as a persistent counter. See `Peako_Games.md` "Streak rules" and `Peako_Alternatives.md` for the retired multi-streak design (A/B candidate).

**What Progress is NOT (either view):**
- NOT a history of every workout or meal. Those live in the feed as posts.
- NOT graph-heavy. A few visual elements max. This isn't MyFitnessPal.

**Tone note:** Weekly summary card (Dashboard) is narrated in Peako's voice, not tabulated. Trail copy is stage-aware.

#### The graduation moment

When the user's 21st effort day completes, a **full-screen Graduation Takeover** fires (not a modal — this is on par with streak milestones and is a prime share surface). First reveal of Peako's Fully Grown silhouette, grudging-pride copy, and one CTA to switch the default Progress view to Dashboard (which happens automatically regardless of the tap). Trail stays accessible via the toggle forever as a "journey archive" — past nodes still open their memory cards.

**Post-graduation behavior** (see `Peako_Games.md` §Growth System for full detail):
- Dashboard is the hero loop.
- Peako's coaching voice shifts from teaching → maintaining.
- A "worried check-in" register activates if the user is inactive 3+ consecutive days.
- Peako does not un-grow on lapses — the body reflects what you built, not current activity.

---

### 👤 You

**Purpose:** Identity, settings, customization.

**Contents (scrollable list):**
- **Profile card** — avatar, name, member since, current streak
- **Roast Level** — Gentle / Classic / Savage (sets LLM tone — applies to new content only, not retroactive)
- **Challenge difficulty** — Easy / Normal / Hard (biases which games Peako assigns)
- **Rest day preference** — Auto (Peako decides) / Mon / Tue / ... / None (Peako overrides "none")
- **Peako customization** *(Phase 2+)* — outfits, voice modes
- **Notifications** — enable, time-of-day preference for morning challenge drop
- **Account** — email, sign out, delete
- **About** — version, credits, privacy, terms

---

## The Other Surfaces (not tabs)

### 📱 Peako's Feed (accessed via phone icon)

**Purpose:** The shared history of the relationship. Peako's running commentary.

**Access:**
- Tap phone icon in Today's top bar
- Tap a push notification ("Peako is judging your pizza" → opens feed)
- Deep link from elsewhere

**Visual treatment:** Slides in from the right (iOS push navigation). Back button returns to Today. It's *not* a tab — the badge resets on open; the feed doesn't compete for home-screen attention.

**Contents:**
- **Peako's posts** — chronological, newest on top:
  - Reactions to your logs ("Pizza? Bold.")
  - Challenge completion posts ("20 squats. I'm mildly impressed.")
  - Skip/swap acknowledgments ("So we're just… not doing plank today?")
  - Weekly recap posts (Sunday night)
  - Milestone posts (streak achievements)
  - Idle posts (Peako bored, random observations — rare, Phase 2)
- Pull-to-refresh → Peako says something new
- Empty state → Peako's first message to a brand-new user
- Like ❤️ → meta-reaction ("Oh, you liked that one? Noted.")

**Phase 2:** share-to-export (one-tap screenshot of a post, branded).

---

### ➕ Log Flow (floating button → modal)

**Purpose:** Tell Peako what you ate (or anything else worth confessing).

**Flow (bottom sheet, swipe-to-dismiss):**
1. Tap "+" anywhere on Today screen → sheet slides up
2. Choose category: **Meal** / **Other**
   - *(Workout is NOT a log category. Workouts are challenges, assigned by Peako. If you did exercise outside a challenge, it goes under "Other.")*
3. **Meal flow:**
   - Photo (camera or library) + optional 1-line caption
   - **Tag picker** (required — user self-categorizes):
     - 🥗 **Healthy** — "I'm being good"
     - 🍕 **Treat** — "I'm having fun"
     - 🤷 **Whatever** — "Don't make me pick"
   - Tag choice drives coins earned + Peako's voice register (see `Peako_Games.md` "Meal Logging — Incentive System" and `Peako_Design_Brief.md` §3 for tag-specific voice examples).
4. **Other:** free-text only ("drank 4 espressos", "skipped breakfast")
5. Tap "Send to Peako" → loading state with Peako "thinking" animation
6. Modal dismisses, returns to Today
7. **Push notification arrives** shortly after: "Peako posted about your pizza." Tap → opens feed with new post at top.

**Important:** the log itself does NOT appear on Today. Today is for challenges. The reaction appears in the feed. This keeps the two surfaces separate and makes the notification meaningful.

**Design notes:**
- Loading is a major character moment. Peako is "analyzing" / "judging" / "thinking" — not a generic spinner.
- The tag picker should feel like a **confession moment**, not a form field. Three big tappable buttons, not a dropdown. The user is choosing what to tell Peako — lean into the drama.
- **No negative reinforcement** on any tag choice. All tags produce content and coins; they just produce *different* kinds. See the design invariant in `Peako_Games.md`.

---

### 🎮 Game / Challenge Modal (full-screen takeover)

**Purpose:** The actual workout.

**Flow:**
1. Tap Start on a challenge card → full-screen takeover
2. Pre-game screen: challenge name, instructions, Peako pep-talk (1 line)
3. Game screen: timer OR counter OR guided animation — depends on game type (see `Peako_Games.md`)
4. Peako heckles / encourages during the game (1–2 text interjections)
5. Completion: "Done!" button (honor system for counter games; automatic for timer games)
6. Post-game: coins awarded, Peako commentary, "Next challenge" or "Return to Today"
7. If this was the 3rd challenge: big celebration, streak confirmed

**Exit options:**
- Tap X (top-left) → confirm quit → returns to Today. Challenge marked incomplete. Does NOT count as skip.
- Force-close app → challenge saved as in-progress, resumes on return.

**Details of each game type → `Peako_Games.md`.**

---

## Phase 2 — Adding the 4th Tab

When we ship stickers/achievements, a new tab joins:

### 🏆 Collection *(Phase 2)*

**Purpose:** The viral/collectible surface. Shareable artifacts.

**Contents:**
- **Stickers** — grid of unlocked stickers, tap to share/export
- **Achievements** — illustrated badges for milestones (first 7-day streak, 100 challenges, first rest-day-earned, etc.)
- **Memorable Posts** — user-starred Peako posts, exportable as images

Justifies a tab only when 20+ items live here.

**Overlap with Trail archive:** The Trail view's memory cards (past stage nodes with preserved Peako posts) already cover *part* of the "memorable posts" brief — specifically the chronological, stage-tagged journey snapshot. Collection remains distinct: Collection is the **cross-stage library** (top posts of all time, stickers, achievement badges), whereas Trail is the **narrative of the first 21 days**. Phase 2 decision: keep both, but use Trail nodes as the primary source for journey-specific memories and Collection for everything else.

---

## Navigation Patterns (The Rules)

| Pattern | When to use | Example |
|---------|-------------|---------|
| **Tab** | Persistent destination | Today, Progress, You |
| **Push (from top bar)** | Secondary surface accessed on-demand | Phone → Feed |
| **Modal / Sheet** | Flow with a start + end | Log entry, Edit profile, Challenge swap picker |
| **Full-screen takeover** | Focused experience requiring attention | Onboarding, Game/Challenge |
| **Inline** | Quick toggle of single field | Roast Level, Like button |

### Specific rules
- **Never push between tabs.** Tapping a tab is a fresh context.
- **Modals and game takeovers dismiss back to where they started.**
- **Onboarding is a full-screen one-time flow.** Not a tab, not a modal.
- **The feed back-navigates to Today**, not to wherever the notification was tapped from.

---

## Full Screen Inventory (Phase 1)

### One-time / rare
- `Onboarding 1` — Meet Peako (animated intro + one self-introduction line; Peako does **not** ask why you're here)
- `Onboarding 2` — Pick your roast level (Gentle / Classic / Savage) **and** challenge difficulty (Easy / Normal / Hard) on one screen
- `Onboarding 3` — Notification permission + tomorrow's first-challenge preview

*(Original Onboarding 2 "Set your fitness goal" was deleted on 2026-04-23 — Phase 1 doesn't use that data. Lose/Maintain/Gain/Vibes picker will return in Phase 2 only if personalization actually needs it.)*

### Today tab (primary)
- `Today — Active` — 3 challenges, at least 1 undone
- `Today — Completed` — all 3 done, celebration state
- `Today — Rest Day` — no challenges, rest message from Peako
- `Swap Picker` (modal) — pick an alternate challenge from the pool
- `Skip Confirm` (modal) — warns about monthly skip usage

### Game / Challenge modals
- `Challenge Intro` — name, instructions, pep-talk
- `Challenge Active — Timer` (plank, wall sit, etc.)
- `Challenge Active — Counter` (squats, pushups, etc.)
- `Challenge Active — Guided` (stretch flow — sequential steps)
- `Challenge Complete` — coins, Peako line, next action
- `Challenge Quit Confirm`

### Feed (pushed from phone icon)
- `Feed — Main`
- `Feed — Empty` (brand-new user)
- `Post Detail` *(nice-to-have; skip for MVP)*

### Log modal
- `Log — Category Picker` (Meal / Other)
- `Log — Meal Entry` (photo + caption)
- `Log — Meal Tag Picker` (Healthy / Treat / Whatever)
- `Log — Other Entry`
- `Log — Submitting` (Peako thinking)
- `Log — Sent` (confirmation; feed will update)

### Progress tab
- `Progress — Trail` (journey view, default pre-graduation)
- `Trail Node Detail` (modal; memory card for a past stage node — 2–3 preserved Peako posts)
- `Progress — Dashboard` (steady-state view, default post-graduation; ≈ the old `Progress — Main`)
- `Streak Calendar — Full` (multi-month drill-down; reached from Dashboard)
- `Streak Freeze Confirm` (modal) — "Spend 100 coins to freeze your streak? Peako will have opinions." 1/month cap.
- `Graduation Takeover` (one-time full-screen, fires when user hits 21 effort days — prime share surface; see [[Decisions/ADR-008-Peako-Growth-System-Dual-Progress-Views]])

### You tab
- `You — Main`
- `Edit Profile` (modal)
- `Roast Level` (inline)
- `Challenge Difficulty` (inline)
- `Rest Day Preference` (inline)
- `Notification Settings` (push)
- `Account Settings` (push)
- `About / Legal` (push)

### Global / system
- `Loading — App Launch` (Peako waking up)
- `Error — Network` (Peako can't see you)

**Total Phase 1 screens: ~33.** Up from ~30 — the growth system adds `Progress — Trail`, `Trail Node Detail`, and `Graduation Takeover`. Onboarding shrank from 4 to 3 on 2026-04-23; Streak Freeze Confirm was added 2026-04-23; growth/trail screens were added 2026-04-23 per [[Decisions/ADR-008-Peako-Growth-System-Dual-Progress-Views]].

**Internal-demo subset (for Phase 0.5):** Today (Active/Completed), Challenge modals (one per archetype + Complete + Quit Confirm), Feed (Main + Empty), Log modal (full flow), Progress (Dashboard + a **static placeholder Trail** with 2–3 fake nodes), You (Main + Roast Level + Difficulty inline + Debug menu), Onboarding (all 3), Loading, Streak Freeze Confirm, Graduation Takeover (fireable from Debug menu). About 22 screens — enough for a convincing day-in-the-life demo. Rest day and edge-case screens can be faked via the debug menu if we need to show them in a pitch. The Trail view in Phase 0.5 is a teaser of the concept; real effort-day accounting and stage-specific mascot art land in Phase 1.

---

## Deliberately Not In The App (Phase 1–2)

Say no now, save pain later:

- ❌ **Social / friends tab** — intimacy with Peako is the product.
- ❌ **Explore / discover** — no user-generated content.
- ❌ **Calorie / macro tracker** — not our job.
- ❌ **Browsable workout library** — Peako assigns; user doesn't shop. This is a design decision (forcing Peako's agency), not a limitation.
- ❌ **Custom workout scheduling** — Peako plans your week, not you.
- ❌ **Notification inbox tab** — the feed is the inbox; the phone icon opens it.
- ❌ **Chat with Peako** — defer to Phase 3+. Changes the product shape.
- ❌ **Apple Health integration** — Phase 3 at earliest.

---

## Open Questions (remaining)

Most items are now resolved (2026-04-23 batch — see `Peako_Open_Decisions.md` §Decided). What's left:

1. ~~**Challenge sequencing within a day.**~~ **Resolved 2026-04-23:** any order, all 3 tappable.
2. ~~**What counts as "streak preserved"?**~~ **Resolved 2026-04-23:** ≥2/3 challenges OR rest day OR redeemed skip OR streak freeze (100 coins, 1/month).
3. ~~**Swap mechanics.**~~ **Resolved 2026-04-23:** Peako auto re-rolls same-archetype, user does not pick.
4. ~~**Skip penalty.**~~ **Resolved 2026-04-23:** -5 coins + passive-aggressive post; streak unaffected.
5. **Post Detail screen — MVP or skip?** Still on the table. Skipping saves a few days. Not needed for internal demo.

---

## Hand-Off Implications

**For designer:** Phase 1 hero frames should now cover:
- Today screen (active, completed, rest-day variants) — **most important**
- Challenge/game screens (timer, counter, guided — one archetype each)
- Log modal
- Feed (accessed via phone)
- **Progress — Trail** (journey view, default pre-graduation)
- **Progress — Dashboard** (steady-state view, default post-graduation)
- **Graduation Takeover** (one-time full-screen — prime share surface)
- You

That's 8–10 key frames, not 6.

The **phone icon** is a new key design element — it should feel like a physical object (iOS home-screen app icon? literal cartoon phone?) and deserves mascot-aware treatment.

The **mascot now has 4 growth stages** — Seed / Sprout / Teen / Fully Grown — all of which must read as the same character, differing in silhouette scale/complexity rather than species. Expression sheet scope grows accordingly: stage × register × emotion. See [[Peako_Design_Brief]] §4 and [[Decisions/ADR-008-Peako-Growth-System-Dual-Progress-Views]].

The **Trail biome illustration** is a standalone design brief — choose an environment metaphor (forest path, mountain climb, river, skyline, abstract constellation, etc.) that survives the 4 node positions and carries the "journey" feeling without feeling childish.

**For engineering:** this shape maps to:
- Router with 3 bottom tabs + pushed feed route + modal log flow + full-screen game takeover.
- New major system: **challenge engine** — daily assignment, swap/skip logic, rest-day scheduler, completion tracking.
- New data model additions: `challenges`, `challengeAssignments`, `challengeCompletions`, `dailyRecord`.

---

*Structure changes faster than character. If we learn something in alpha that breaks this IA, redo it.*
