---
type: journal
tags: [journal, feature/mascot, design]
date: 2026-04-24
session: peako-mascot-reactions
participants: [me, claude-design]
---

# 2026-04-24 — Peako mascot reaction system

## TL;DR

Reframed Peako from a talking mascot into a silent cartoon that reacts. Two
linked decisions: (1) Peako shows, doesn't tell — front-of-app voice is stripped
to 1–4 word transient bubbles, glyphs do constant-presence work; (2) the "voice"
tweak (gentle/classic/savage) is wrong framing — it becomes "mood"
(Sweet/Deadpan/Gremlin) which swaps glyph + rare bubble palette, not verbosity.
Drafted a 28-reaction library across 5 categories (logs, posts, idle, near-miss,
celebrations) with design rationale in `peako_mascot_library.md`. Wired the new
bubble + glyph + mood system into Today; Diary + Feed long-form voice preserved
as opt-in surfaces.

## Topics covered

- Why the current ~9-pose set isn't engaging enough (character exists, doesn't react)
- Duolingo / Tamagotchi / Clippy engagement model — loss aversion + parasocial + screenshot-bait
- 4-axis reaction framework: valence · intensity · agency · shareability
- 28 reactions across 5 categories, each defined as `POSE · FACE · GLYPH · BUBBLE`
- Peako over-talks in Today tab, voice tweak, and front-of-app bubbles
- Show-don't-tell principle — 4 channels ranked: pose → face → glyph → rare bubble
- Mood replaces voice — same reactions, different glyph + rare bubble palette
- Scope for first pass: 14 screenshot-tier full-fidelity + 14 thumbnails

## New/updated Logic

- [[Logic/Peako-Reaction-System]] — new — 28-reaction state machine, triggers, cooldowns, priority ordering
- [[Logic/Peako-Front-Of-App-Voice]] — new — 1–4 word transient bubbles, fade rules, glyph-as-primary

## New/updated Decisions

- [[Decisions/ADR-009-peako-shows-not-tells]] — new — front-of-app silence + mood replaces voice

## Open threads

- [ ] Confirm tone ceiling — may Gremlin mood include KNIFE (#27) and BEGGING (#18)? Default is Deadpan so unhinged is opt-in.
- [ ] Confirm scope for mascot art pass: 14 full-fidelity + 14 thumbnails vs full 28
- [ ] `POSING` reaction (#11) needs OS screenshot detection hook — iOS `UIApplicationUserDidTakeScreenshotNotification`; no-op on web
- [ ] "Streak at risk" threshold (#19) currently 11pm local — confirm
- [ ] "Hard thing" (#4) needs definition — proposed: difficulty ≥ 4/5 OR skipped ≥ 2 times before
- [ ] Mascot visual design still deferred — library is logic-first; pose/face rendering plugs in later
- [ ] TODO: handoff to cursor — port `TodayScreen` bubble/glyph pattern into `src/` when design settles

## Raw notes

- Moved `roastLevel` → `mood` in tweaks. Removed verbosity dial UI entirely.
- Transient bubble: fade in 180ms → hold 2400ms → fade out 220ms; fires only on `reactionKey` change; never re-fires on same key.
- Glyph component is the constant-presence signal; bubble is rare and earned.
- Half the 28 reactions have no bubble at all (silent category — especially idle + many near-miss).
- Diary + Feed are the eloquence surfaces; user has to *go looking* for Peako's long voice.
- Full spec: `peako_mascot_library.md` (root of project, not vault).

## Code / UI anchors

- `components/today.jsx` L8–L56 — `TodayScreen`, new `bubble` state + `lastKeyRef` transition gate
- `components/today.jsx` L~200–L~280 — `BASE_BY_STATE` + `MOOD_OVERLAY` + `contextByState` + `TransientBubble` + `PeakoGlyph`
- `Peako Redesign.html` L39–L44 — `PEAKO_TWEAKS` now has `mood` instead of `roastLevel`
- `Peako Redesign.html` L~176–L180 — Tweaks panel row swapped from Voice → Mood
- `peako_mascot_library.md` — full design spec (root)

## Changelog

- 2026-04-24 [claude-design] — session created, vault bootstrapped with standalone files (no Templates/ available; will reconcile on next Cursor pull)
