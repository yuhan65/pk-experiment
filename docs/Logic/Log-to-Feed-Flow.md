---
type: logic
status: draft
tags: [logic, feature/log, feature/feed]
owner: 
last_reviewed: 2026-04-22
related: [[Coin-Reward-Rule]], [[Peako-Brain-Scripting]]
---

# Log → Feed Flow

## Why (user value)
The log is a **confession**; the feed post is Peako's **reaction**. Separating the two surfaces (log ≠ feed on home) makes the reaction feel earned, and makes push notifications meaningful ("Peako posted about your pizza"). See [[Peako_App_Structure]] §Log Flow — "log itself does NOT appear on Today."

## Trigger
User submits a log. In prototype: tap of an action button (`log('salad' | 'pizza' | 'gym')`). In target product: submit on the Log Modal.

## Rule

```
ON log(kind):
  script   = PEAKO_SCRIPTS[kind]
  IF script is null  THEN return  (silent no-op)
  newPost  = {
    id:        `${kind}-${now}`,
    text:      script.text,
    imageClass, imageLabel, tag  ← from script
    createdAt: now,
    likes:     random integer in [3, 22],
  }
  posts    = [newPost, ...posts]                 (prepend, newest first)
  coins   += rule from [[Coin-Reward-Rule]]
```

Prototype diverges from target product in two ways (both intentional for now):
- Log bypasses the modal + Peako "thinking" loading state.
- Feed and Today share one screen. Target: feed lives behind the phone icon.

## Outputs & side effects
- **State**: `posts` array prepended; `coins` updated.
- **UI**: `AnimatePresence` + `layout` on `<motion.article>` animates the card sliding down; existing cards reflow. See L144–L151.
- **Notifications (target, not prototype)**: push "Peako posted about your <kind>".
- **Analytics events**: *none*. Suggested: `feed_post_created { source: "log", kind }`.

## Edge cases
- [ ] Unknown `kind` → silent return (current). Acceptable only because buttons are hard-coded.
- [ ] `likes` being non-deterministic makes snapshot testing awkward (seed randomness when testing).
- [ ] Collisions of `id` if two logs happen in the same millisecond → `kind-${Date.now()}` would collide. Low probability, but add a suffix when wired to a real backend.
- [ ] Empty feed state: handled at L276–L280 with "Peako has nothing to say. Suspicious."
- [ ] When feed moves to a separate surface (target), the post must appear with a badge on the phone icon and survive tab switches.

## Depends on / Affects
- Depends on: [[Peako-Brain-Scripting]] (post content comes from `PEAKO_SCRIPTS`)
- Depends on: [[Coin-Reward-Rule]] (bundled in the same handler)
- Affects: feed unread-badge logic (not yet designed)
- Affects: push notification copy (not yet designed)

## Open questions
- [ ] Should Peako's response be LLM-generated at call time, or still scripted? If LLM: where does the "thinking" state actually wait on a real network call?
- [ ] Should the log itself persist as a separate record (for Progress tab aggregation), or is the feed post the only record? → see [[Decisions/ADR-002-Log-Persistence-Shape]]
- [ ] Does liking your own post do something special?

## Code / UI anchors
- Code: `src/PeakoPrototype.jsx` L233–L244 (`log` handler), L271–L275 (feed render), L144–L207 (`PostCard`)
- Related product doc: [[Peako_App_Structure]] §Log Flow

## Changelog
- 2026-04-22 — created from prototype code during first obsidian setup
