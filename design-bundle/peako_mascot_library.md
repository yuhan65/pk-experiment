# Peako — Mascot Reaction Library

> Logic-first spec. Mascot visual design is **not** locked yet; this doc defines the
> *system* (when Peako reacts, how, with what channels) so pose rendering can be
> swapped in later without rewriting behavior.

---

## 1. Core principle — Peako shows, doesn't tell

Front-of-app Peako is a **silent cartoon**. Personality lives in the reaction, not
the monologue. Mascots that land (Duolingo owl, Tamagotchi, Clippy, Memoji) work
because they *respond* — they don't explain themselves.

Current Peako over-talks:
- Full-sentence speech bubbles on Today tab.
- "Voice" tweak (gentle/classic/savage) implies a verbosity dial — wrong framing.
- Bubble is permanently mounted — makes Peako feel like a chatbot.

**Fix:** bubble is rare, expression is constant, glyphs do the heavy lifting.

### Communication channels (ranked by priority)

| # | Channel       | Role                                                   | Budget                        |
|---|---------------|--------------------------------------------------------|-------------------------------|
| 1 | **Pose**      | Whole-body silhouette. Read at 40px and 300px.         | Always on                     |
| 2 | **Face**      | Eyes, brow, mouth. Nuance inside a pose.               | Always on                     |
| 3 | **Glyph**     | Tiny cartoon mark above the head (`...` `!` `♡` `zzz`). | On for ~4s on reaction trigger |
| 4 | **Bubble**    | 1–4 words. Fades in ~2.8s on state transitions only.    | Rare — half of reactions have none |

**Long-form voice** (full sentences, jokes, paragraphs) lives **only** in:
- **Feed** — Peako's posts about the user. Opt-in by tapping.
- **Diary** — Peako's private log. Opt-in by tapping.

Front-of-app Peako shuts up. Eloquence is something the user *goes looking for*.

---

## 2. Reaction framework — 4 axes

Every reaction sits on these axes. Keeps the library a system, not a pile of drawings.

| Axis          | Varies                                   | Why it matters                                   |
|---------------|------------------------------------------|--------------------------------------------------|
| Valence       | positive ↔ negative                      | rewards feel different from punishment           |
| Intensity     | gentle ↔ unhinged                        | viral moments need a ceiling                     |
| Agency        | Peako acts ON you ↔ Peako reacts TO you  | mix of proactive (pushes) and reactive (rewards) |
| Shareability  | quiet ↔ screenshot-bait                  | ~20% of poses should beg to be screenshotted     |

---

## 3. Psychology hooks (why this drives engagement + virality)

1. **Variable reinforcement.** Same user action doesn't always yield the same
   reaction. Logging rolls on a 6-slot table inside category A — dopamine roulette.
2. **Loss aversion > reward.** 6 distinct "about-to-fail" reactions with
   escalating desperation. This is the Duolingo playbook; it works.
3. **Parasocial hook.** Peako has *opinions about you specifically* — NOTEBOOK,
   GAVEL, LOCKED-EYES make the user feel watched in a fun way.
4. **Screenshot-bait tier.** ~14 of 28 reactions are designed to be screenshotted
   (clear emotion, caption-ready composition, meme-shaped framing).
5. **Meta virality.** `POSING` triggers when the OS screenshot API fires — Peako
   strikes a runway pose as you capture. 4th-wall gag → dedicated TikTok.
6. **Rare ceiling states.** GHOST, BEGGING, KNIFE, GRADUATION are gated on extreme
   user states. Users pursue the extremes just to unlock the drawing.

---

## 4. The reaction library — 28 entries, 5 categories

Every entry carries four fields:
`POSE · FACE · GLYPH · BUBBLE (only fires on state transition)`

### A. USER LOGS / COMPLETES *(positive)*

| #  | Trigger              | Pose              | Face                 | Glyph  | Bubble   | SS-bait |
|----|----------------------|-------------------|----------------------|--------|----------|:-:|
| 1  | First log today      | puff-up           | proud-teary          | `✧`    | "noted." | ✓ |
| 2  | Routine log          | quick-nod         | half-smirk           | `·`    | —        |   |
| 3  | All 3 done           | back-flop         | eyes-closed-smile    | `✦✦✦`  | "fine."  | ✓ |
| 4  | Hard thing done      | kowtow-bow        | respectful           | `⟡`    | "ok."    | ✓ |
| 5  | Early bird (<9am)    | stretch-up        | bright-eyes          | `☀`    | —        |   |
| 6  | First-ever X         | notebook-peek     | scribbling-focus     | `✎`    | —        | ✓ |

### B. USER POSTS / SHARES

| #  | Trigger              | Pose              | Face                 | Glyph  | Bubble   | SS-bait |
|----|----------------------|-------------------|----------------------|--------|----------|:-:|
| 7  | Typing post          | hunched-phone     | down-cast            | `· · ·`| —        |   |
| 8  | Post sent            | mini-megaphone    | smug-closed          | `!`    | "posted."| ✓ |
| 9  | Shared externally    | spyglass-peek     | one-eye-wide         | `👁`    | —        | ✓ |
| 10 | Friend reacts        | envelope-open     | surprised            | `♡`    | "ohh."   |   |
| 11 | Screenshot taken     | runway-pose       | camera-wink          | `📷`   | "yes."   | ✓✓ meta |

### C. IDLE / PASSIVE

| #  | Trigger              | Pose              | Face                 | Glyph  | Bubble   | SS-bait |
|----|----------------------|-------------------|----------------------|--------|----------|:-:|
| 12 | Idle 30s             | gorogoro-sprawl   | bored-lidded         | `...`  | —        |   |
| 13 | Reopen same hour     | already-looking   | locked-eyes          | `👀`   | —        | ✓ |
| 14 | 2nd idle day         | arms-crossed-tap  | judging-squint       | `⏱`    | —        |   |
| 15 | Back after long gap  | stone-still       | dead-stare           | —      | —        | ✓ meme |
| 16 | After-hours          | loaf              | sleepy-lidded        | `zzz`  | —        |   |

### D. NEAR-MISS / FAIL *(loss aversion — the engagement engine)*

| #  | Trigger              | Pose              | Face                 | Glyph  | Bubble   | SS-bait |
|----|----------------------|-------------------|----------------------|--------|----------|:-:|
| 17 | <4h left, 0/3        | staring-across    | unblinking           | `.`    | —        | ✓ |
| 18 | <1h left, 0/3        | knees-clasped     | single-tear          | `!`    | "hey."   | ✓ meme |
| 19 | Streak at risk       | shielding-flame   | determined-wide      | `⚠`    | —        | ✓ |
| 20 | Missed yesterday     | suitcase-pose     | raised-brow          | `?`    | "oh."    | ✓ |
| 21 | Missed 3+ days       | ghost-drift       | hollow-eyes          | `…`    | —        | ✓ meme |
| 22 | About to skip        | door-block-arms   | brow-furrow          | `✕`    | "no."    | ✓ |

### E. CELEBRATORY / UNHINGED *(ceiling states — rare, earned, screenshot gold)*

| #  | Trigger              | Pose              | Face                 | Glyph  | Bubble        | SS-bait |
|----|----------------------|-------------------|----------------------|--------|---------------|:-:|
| 23 | 7-day streak         | party-horn-cone   | eyes-sparkle         | `✧`    | "week."       | ✓ |
| 24 | 21-day grown         | cap-and-scroll    | teary-pride          | `✦`    | "we did it."  | ✓ meme |
| 25 | Friend joined        | ta-da-gesture     | bright-grin          | `✨`    | "new."        |   |
| 26 | Personal record      | flex-bicep        | determined-smirk     | `💢`   | "pr."         | ✓ |
| 27 | Threat (opt-in mood) | hands-behind-back | smile+shadow         | `♥?`   | —             | ✓ meme |
| 28 | Weird input          | gavel-tap         | deadpan-stare        | `⟟`    | "noted."      | ✓ meme |

**Bubble count: 13 of 28.** Half the library is fully silent.
**All bubbles are 1–2 words** except "we did it." (3) — reserved for the grown-stage milestone.

---

## 5. Face vocabulary (target: ~16 faces)

Face is a drop-in slot inside the mascot body. Expanding from the current 4 to 16
is what lets the library feel varied without redrawing 28 bodies.

Current (4): `sly` · `on-phone` · `staring` · `sleepy`

Add (12):
`proud-teary` · `wink` · `surprised` · `deadpan` · `brow-furrow` ·
`sparkle` · `squint-judging` · `hollow` · `closed-smile` ·
`single-tear` · `shadow-smile` · `wide-determined`

Each face is ~30 lines of SVG, composable with any body pose.

---

## 6. Glyph layer

New `<PeakoGlyph kind="..." />` component. Small cartoon mark floating above the
head. Bob + fade animation, auto-unmounts after ~4s.

Supported kinds:

| Category          | Glyphs                                                            |
|-------------------|-------------------------------------------------------------------|
| Neutral           | `...` · `·` · `? ` · `!` · `!?`                                    |
| Positive          | `✧` · `✦` · `♡` · `♪` · `✨` · `☀` · `✎` · `⟡`                      |
| Watch / attention | `👀` · `👁` · `💭`                                                 |
| Sleep / idle      | `zzz` · `☁` (sigh cloud)                                           |
| Negative / spicy  | `💢` · `✕` · `⚠` · `♥?`                                            |
| Meta              | `📷` · `⏱` · `⟟`                                                   |

Glyphs do the work the old always-on bubble used to do. They're cheaper visually
and read as cartoon shorthand rather than dialogue.

---

## 7. Bubble rules (transient, rare)

```
<ReactionBubble text="..." />
```

- Mounts only when `reactionKey` changes.
- **Max 4 words.**
- Fade in 180ms → hold 2400ms → fade out 220ms → unmount.
- Never re-fires on the same `reactionKey`.
- Never renders on idle / passive states (category C).
- If user navigates away before fade-out, cancel.

---

## 8. Mood system (replaces the voice tweak)

The `voice: gentle | classic | savage` tweak is wrong framing — it implies a
verbosity dial. Peako's verbosity is fixed (near zero). What *should* vary is
**which glyph/bubble palette Peako draws from** for the same reaction.

New tweak: **Mood — Sweet / Deadpan / Gremlin.**

| Reaction                | Sweet           | Deadpan         | Gremlin           |
|-------------------------|-----------------|-----------------|-------------------|
| First log today         | glyph `♡` "yay."| glyph `✧` "noted." | glyph `👀` —   |
| All 3 done              | glyph `✨` "nice!"| glyph `✦✦✦` "fine."| glyph `💢` "finally."|
| Missed yesterday        | glyph `?` "hi."  | glyph `?` "oh."  | glyph `👀` —      |
| About to skip           | glyph `!` "wait."| glyph `✕` "no."  | glyph `💢` "seen."|

Same 28 *reactions*. Same 28 *poses*. Only the glyph palette and bubble wording
differ per mood. No verbosity dial.

Default: **Deadpan** (matches Peako's 腹黑 personality).

---

## 9. State machine — when does what fire?

```
USER EVENT  ─────────┐
                     ▼
           ┌─── reaction resolver ───┐
           │ 1. priority ordering    │
           │ 2. cooldown gate        │
           │ 3. mood palette lookup  │
           └─────────────┬───────────┘
                         ▼
              reactionKey = #N_mood
                         │
           ┌─────────────┼─────────────┐
           ▼             ▼             ▼
         <Pose/>      <Glyph/>    <Bubble/>
         (sticky)     (~4s fade)  (~2.8s, if defined)
```

### Priority ordering (highest wins if multiple trigger at once)

1. Category D (fail / near-miss) — always wins
2. Category E (celebrations) — if triggered this session
3. Category A / B — user just acted
4. Category C — default / fallback

### Cooldowns

- Same reaction can't fire twice within 20 minutes (prevents spam).
- Category D overrides cooldown (escalation is allowed).
- Category C is the fallback; no cooldown — just a slow pose cycle every ~90s.

### Transitions

- Any reaction change triggers: pose crossfade (300ms) + glyph pop-in + optional bubble.
- If the new reaction has no glyph, the old glyph fades out without replacement.
- If the new reaction has no bubble, no bubble renders (not "empty bubble").

---

## 10. Artboards to build in the redesign file

1. **Pose library** — 28 reactions on a grid, 5 category rows. Each card:
   pose render, face render, glyph, trigger label, bubble (if any).
2. **Face library** — all 16 faces on one head, labeled.
3. **Glyph library** — all glyphs on one artboard, categorized.
4. **In-context Today** — 6 critical reactions rendered inside the full
   iPhone frame. **No bubble** on 3 of them to prove the silent treatment works.
5. **Day-in-the-life strip** — 8-panel sequence playing a realistic day:
   wake → first log → post → idle → near-miss → rescue log → all-done → sleep.
6. **Mood compare** — same reaction (e.g. "all 3 done") rendered in
   Sweet / Deadpan / Gremlin side-by-side. Proves the mood system.

---

## 11. Tweaks panel (rewritten)

- **Reaction** — dropdown, step through all 28 live in the Today hero.
- **Mood** — Sweet / Deadpan / Gremlin.
- **Growth Day** — 0 / 7 / 14 / 21+ (stays).
- ~~Voice (gentle / classic / savage)~~ — removed.
- ~~Idle Pose (gorogoro / loaf / popcorn / plotting)~~ — absorbed into
  Reaction dropdown (they're entries 12–15).

---

## 12. Scope for first pass

**Recommended: 14 screenshot-tier reactions at full fidelity + 14 thumbnails.**

Screenshot-tier (14): 1, 3, 4, 8, 9, 11, 13, 15, 17, 18, 20, 21, 24, 27

Thumbnails (14): 2, 5, 6, 7, 10, 12, 14, 16, 19, 22, 23, 25, 26, 28

Second pass promotes thumbnails to full-fidelity once user has picked favorites.

---

## 13. Open questions

- **Tone ceiling** — confirm Gremlin mood may include KNIFE (#27) and
  BEGGING (#18). Default mood is Deadpan, so unhinged content is opt-in.
- **Screenshot detection** — #11 POSING requires OS screenshot API hook.
  On iOS, detect via `UIApplicationUserDidTakeScreenshotNotification`; fall
  back to never firing on web prototype.
- **Streak at risk threshold** — #19 currently set to 11pm local. Confirm.
- **"Hard thing"** — #4 needs a definition. Proposed: challenge marked
  difficulty ≥ 4/5 *or* one the user has skipped ≥ 2 times before.
