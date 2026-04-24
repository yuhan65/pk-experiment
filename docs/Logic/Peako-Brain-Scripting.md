---
type: logic
status: draft
tags: [logic, feature/voice, feature/feed]
owner: 
last_reviewed: 2026-04-22
related: [[Log-to-Feed-Flow]], [[Coin-Reward-Rule]]
---

# Peako Brain — Scripted Response Mapping

## Why (user value)
Peako's voice is the product. The brain is the single source of truth for "what Peako says in response to X." Keeping it in one place means voice changes ship in one PR and don't drift across screens.

## Trigger
Any code path that needs a Peako reaction to a known stimulus (currently: `salad`, `pizza`, `gym` logs).

## Rule

Source of truth is the `PEAKO_SCRIPTS` object in `src/PeakoPrototype.jsx` L22–L41.

```
PEAKO_SCRIPTS: Record<kind, {
  text:       string,          // the snark line
  imageClass: string,          // Tailwind gradient for the image
  imageLabel: string,          // emoji + label rendered in the image box
  tag:        string,          // short category label
}>

kinds currently defined: "salad" | "pizza" | "gym"
```

Contract for callers:
- Never hard-code response text elsewhere — always look up by `kind`.
- Unknown `kind` → no response, no side effects.
- `SEED_POSTS` (L43–L54) is allowed to override individual fields at seed time only.

## Outputs & side effects
- Pure data — no runtime side effects. Consumed by [[Log-to-Feed-Flow]].

## Edge cases
- [ ] Adding a new `kind`: must add the button in the UI *and* decide a coin reward (see [[Coin-Reward-Rule]]) *and* the script entry here. Missing any of the three silently breaks.
- [ ] Localization: scripts are English-only; when we localize, voice must be re-authored, not translated.
- [ ] Roast Level: currently one script per kind. Savage/Classic/Gentle variants will require one-of-N selection by level — see Open questions.

## Depends on / Affects
- Affects: [[Log-to-Feed-Flow]], [[Coin-Reward-Rule]]
- Affects: all future surfaces that speak (empty states, completion screens, error screens per [[Peako_App_Structure]] §Guiding Principles #6)

## Open questions
- [ ] **Scripted vs LLM-generated**: how far does hand-scripted go before we switch to LLM with a voice prompt? Prototype is 100% scripted; production likely hybrid.
- [ ] **Roast Level plumbing**: should every script entry be `Record<RoastLevel, string>`, or do we keep one and ask the LLM to adjust? → [[Decisions/ADR-003-Voice-Generation-Strategy]]
- [ ] **Non-log triggers**: this object currently only covers logs. Challenge completion, skip, swap, rest day all need similar maps per [[Peako_App_Structure]] Guiding Principles #6 ("Peako reacts everywhere").

## Code / UI anchors
- Code: `src/PeakoPrototype.jsx` L22–L41 (`PEAKO_SCRIPTS`), L43–L54 (`SEED_POSTS`)
- Related product doc: [[Peako_Design_Brief]] (voice bible)

## Changelog
- 2026-04-22 — created from prototype code during first obsidian setup
