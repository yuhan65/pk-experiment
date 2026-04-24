---
type: decision
status: accepted
tags: [decision, scope, phase/0.5]
date: 2026-04-23
deciders: founder
related: [[ADR-007-MVP-Batch-Lock-2026-04-23]], [[Peako_Roadmap]]
---

# ADR-006: Internal Demo as the next delivery target (Phase 0.5)

## Context

The founder's boss said: *"the framework should be shipped at ~60%, validate the MVP with real use, then iterate."* This was interpreted during drafting as "ship a public alpha at 60% completeness."

On 2026-04-23, during a decision-closing session, the founder clarified: **the app is being built for internal pitch purposes, not public deployment.** The audience is internal stakeholders — not real users. "Investment-ready MVP" in this context means "pitch-ready demo," not "alpha-ready product."

This is a material re-scoping. The original Phase 1 plan in [[Peako_Roadmap]] assumed real users, which brings a long list of blocking requirements (accounts, backend, push, analytics, privacy review, app store submission in some form). For an internal demo, most of that is dead weight.

## Decision

Insert a new **Phase 0.5 — Internal Demo** between the existing Phase 0 (Prototype) and Phase 1 (MVP / Alpha) in the roadmap. Treat Phase 0.5 as the **immediate delivery target**, and gate Phase 1 on internal buy-in earned by the demo.

### What's in scope for Phase 0.5
- Vercel-deployed PWA (React + Vite — existing codebase, no rewrite).
- localStorage persistence for a single device.
- Real **Claude Haiku** calls proxied through a single Vercel serverless function.
- Full day-in-the-life path: Today (3 challenges) → complete/swap/skip → log meal → see Peako's feed reaction.
- All three challenge archetypes working with one example each.
- Onboarding (3 screens, new shape — see [[ADR-007-MVP-Batch-Lock-2026-04-23]] §1.8).
- Streak / coins / streak-freeze mechanic, all in localStorage.
- Debug menu in You tab to fake edge states (rest day, streak about to die, low coins) for pitch variety.

### What's explicitly out of scope for Phase 0.5
- Accounts, backend, cross-device sync.
- Push notifications.
- Analytics / telemetry (`console.log` is enough).
- App Store / TestFlight / Capacitor.
- Share-to-export flows.
- Privacy policy / ToS polish.
- Photo upload for meals (re-evaluate if asked).
- Mascot lock / expression sheet / full UI kit. The existing gradient-card placeholder aesthetic is sufficient for the demo audience. Mascot work resumes in Phase 1 if buy-in lands.

### What gets deferred in [[Peako_Open_Decisions]]
- §2.6 Analytics
- §2.8 Backend stack
- §1.7 Share mechanics

All three are logged under "Deferred — out of internal-demo scope" and will be resumed only if Phase 1 is greenlit.

## Consequences

- Significantly less work than the original Phase 1 — realistic completion window shrinks from ~12 weeks to ~4–6.
- Less technical risk, because nothing depends on Supabase schema design, auth flow, or push infrastructure.
- Higher demo-quality bar per screen, because in a pitch there's no room to say "this part isn't built yet." Each included screen must be convincing, which is a different kind of pressure than "good enough for alpha."
- Accepts a specific failure mode: if internal audience asks "what happens if I open this on my other phone?" or "where does the data live?", the honest answer is *"nowhere — this is a demo"*. We've consciously traded real-user legitimacy for speed-to-pitch.

## Revisit trigger

This ADR is superseded if any of the following happens:
- **Internal buy-in lands** → Phase 1 kicks in, reintroducing backend, accounts, push, analytics.
- **Demo audience expands** beyond internal (e.g. the pitch reaches outside investors who will actually try the app) → revisit the "no accounts / no persistence" stance before that happens.
- **The demo loop itself proves fragile** in rehearsal (e.g. LLM latency wrecks the pitch moment) → rework the LLM layer (caching, pre-generated fallback responses) before rework of anything else.

When any of the above triggers, write a new ADR superseding this one rather than editing it in place.

## Landed in

- [[Peako_Roadmap]] — Phase 0.5 row in TL;DR table + new Phase 0.5 section; Phase 1 re-framed as "gated on Phase 0.5 buy-in".
- [[Peako_Open_Decisions]] — Scope note at top + Deferred section at bottom.
- [[Peako_App_Structure]] — new "Internal-demo subset" note in Full Screen Inventory (~20 of ~30 screens sufficient for demo).
- [[ADR-007-MVP-Batch-Lock-2026-04-23]] — the concrete product decisions that ride on top of this scope decision.
