---
type: decision
status: accepted
tags: [decision, batch, phase/0.5]
date: 2026-04-23
deciders: founder
related: [[ADR-006-Internal-Demo-Scope]], [[ADR-004-Streak-Preservation-Threshold]], [[Peako_Open_Decisions]]
---

# ADR-007: MVP batch lock (2026-04-23)

## Context

Seven Tier-1 / Tier-2 questions had been blocking the Phase 0.5 internal-demo build. They were closed in a single decision session on 2026-04-23. This ADR is the single artifact future contributors can read to understand what was decided that day and — more importantly — **why**.

Scope reframing (internal demo, not external alpha) is captured separately in [[ADR-006-Internal-Demo-Scope]] and is the umbrella under which the decisions below were made.

## Decisions

### 1. Streak preservation rule *(Open_Decisions §1.1)*

**Decision:** ≥2/3 challenges OR rest day OR redeemed skip preserves the streak. Additionally, a user can spend **100 coins** on a **streak freeze**, limited to **1 per calendar month**, confirmed manually.

Full rationale, option comparison, and pseudocode: [[ADR-004-Streak-Preservation-Threshold]].

Reasoning in brief: the 2-of-3 baseline (originally Option 2) is fair but has no recovery for genuinely bad days. The freeze adds that recovery, is character-consistent (grudging, not celebratory), and solves the second problem that coins had no sink pre-stickers.

### 2. Challenge sequencing within a day *(Open_Decisions §1.3)*

**Decision:** All three challenges are tappable in any order from the moment the day begins. No locked states.

Reasoning: the original draft was sequential (Duolingo-style) for mental simplicity, but respecting the user's real-world schedule matters more than path ceremony. A user can't do plank in a meeting room; forcing a fixed order would make that user zero-for-three. Flexibility costs nothing in UI complexity (we remove the locked state rather than add anything). Reversible if alpha data shows users actually benefit from a guided path.

### 3. Onboarding flow *(Open_Decisions §1.8)*

**Decision:** 3 screens, no goal picker.
- Screen 1 — Meet Peako (animated intro + one self-introduction line; Peako does **not** ask why you're here)
- Screen 2 — Roast Level + Challenge Difficulty combined (Gentle / Classic / Savage × Easy / Normal / Hard)
- Screen 3 — Notification permission + tomorrow's first-challenge preview

Reasoning: the previously-planned "Set your fitness goal" screen (Lose/Maintain/Gain/Vibes) collects data that Phase 1 doesn't use for personalization. Asking for it increases cold-start friction and implicitly promises personalization we won't deliver. Removing it shortens onboarding by 25% and defers the decision to whenever a feature actually requires that input.

### 4. Tech stack *(Open_Decisions §1.9)*

**Decision:** Continue pure PWA on the existing React + Vite codebase. No Capacitor wrap. Deploy to Vercel.

Reasoning: Phase 0.5 is for internal demo only (see [[ADR-006-Internal-Demo-Scope]]). The iMessage sticker pack argument for going native only matters at Phase 2+ when viral sharing becomes the growth engine — that's a later ADR. For a demo, PWA + "Add to Home Screen" is indistinguishable from a native app to a non-technical audience. Avoiding Capacitor saves us learning Xcode and paying $99/year for an Apple Developer account we don't need yet.

### 5. LLM provider *(Open_Decisions §2.9)*

**Decision:** **Claude Haiku** (Anthropic). Proxied through a single Vercel serverless function so the API key never ships to the client.

Reasoning: Haiku's register skews toward dry, character-consistent snark, which matches Peako's voice better than gpt-4o-mini's slightly sanitized default tone. Cost is in the same ballpark ($0.25/M input, $1.25/M output ish, demo-scale irrelevant). Gemini Flash was a credible option but the character tuning was the tiebreaker.

Back-of-envelope for the demo: ~10 calls per demo run × 0.5k tokens ≈ $0.005/run. Cost is irrelevant at demo scale.

### 6. Bundled tentative values promoted to locked *(Open_Decisions §1.2, 1.4, 1.5)*

These three items were tentative-but-unblocked. Locked as-is to avoid carrying "still pending" status into the build:

- **§1.2** Meal logs alone do **not** preserve the streak. Streak is carried by challenges only.
- **§1.4** Swap is **Peako auto re-rolls same archetype**. User does not pick from a list. Reinforces Peako's agency in the relationship.
- **§1.5** Skip costs **-5 coins + a passive-aggressive Peako post**. Streak unaffected as long as the other two challenges complete. Monthly skip budget (5) already locked separately in [[Peako_Games]] §Skips.

### 7. Explicitly deferred (not decided — intentionally parked) *(Open_Decisions §1.7, §2.6, §2.8)*

- **§1.7 Share mechanics** — deferred to Phase 2. Internal demo doesn't need share.
- **§2.6 Analytics** — skipped for Phase 0.5. `console.log` on build events only.
- **§2.8 Backend stack** — Supabase recommendation stands for when we need one; we don't need one for the demo. Single-device localStorage only.

## Consequences

- The [[Peako_Roadmap]] now shows Phase 0.5 explicitly, with Phase 1 gated on buy-in.
- [[Peako_App_Structure]] updated: sequencing removed, onboarding shrunk, streak-freeze screens added.
- [[Peako_Games]] updated: streak freeze in the rules and as a coin sink in the economy table.
- [[Logic/Streak-Preservation]] promoted from `draft` to `accepted`.
- [[Peako_Open_Decisions]] cleaned up: all seven items moved to `Decided` with back-references to this ADR.
- Build can begin immediately. No remaining Tier-1 items block engineering or design.

## Revisit triggers

This ADR as a whole is superseded if [[ADR-006-Internal-Demo-Scope]] is superseded. Individual items can be revisited independently:

| Item | Revisit when |
|---|---|
| Streak rule | Alpha cohort break-rate data (see ADR-004 triggers) |
| Sequencing | Alpha retention data by sequence-adherence segment |
| Onboarding | First-day drop-off rate hits >40% or qualitative feedback asks for personalization |
| Tech stack | Phase 1 greenlit AND viral sharing becomes primary growth mechanism (then Capacitor / native RN re-evaluated) |
| LLM provider | Snark quality complaints in pitch feedback, or Haiku pricing changes materially |

## Landed in

- [[Peako_Roadmap]]
- [[Peako_App_Structure]]
- [[Peako_Games]]
- [[Peako_Open_Decisions]]
- [[Logic/Streak-Preservation]]
- [[ADR-004-Streak-Preservation-Threshold]]
- [[ADR-006-Internal-Demo-Scope]]
