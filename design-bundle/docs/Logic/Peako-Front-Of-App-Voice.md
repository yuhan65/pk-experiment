---
type: logic
status: accepted
tags: [logic, feature/mascot]
owner: claude-design
last_reviewed: 2026-04-24
related:
  - "[[Logic/Peako-Reaction-System]]"
  - "[[Decisions/ADR-009-peako-shows-not-tells]]"
---

# Peako Front-Of-App Voice

## Why

Peako was over-talking front-of-app (full-sentence bubbles, always mounted).
Mascots read as chatbots when they monologue. The fix is to push eloquence
into opt-in surfaces (Feed, Diary) and keep front-of-app reactive, not verbal.

## Trigger

Any Peako render on a front-of-app surface (Today hero, avatar in headers,
inline mascot in tabs). Specifically:
- State transition fires (reactionKey changes)
- OR surface mounts with an active reaction

## Rule

```
IF surface == Feed OR surface == Diary:
  // eloquence surfaces — opt-in, user tapped in
  allow full sentences, paragraphs, Peako's blog voice

ELSE (front-of-app):
  IF reaction.bubble:
    AND word_count(reaction.bubble) <= 4
    AND reactionKey != lastReactionKey
    THEN render <TransientBubble text={reaction.bubble}/>
    ELSE no bubble

  // glyph carries constant-presence work instead
  IF reaction.glyph:
    render <PeakoGlyph kind={reaction.glyph}/>

  // pose + face always render — primary channels
  render <Mascot pose={reaction.pose} face={reaction.face}/>
```

### Bubble timing

| Phase      | Duration | Notes                                   |
|------------|----------|-----------------------------------------|
| Fade in    | 180ms    | opacity + translateY(4px→0) + scale     |
| Hold       | 2400ms   | stable                                  |
| Fade out   | 220ms    | opacity + translateY(0→-2px)            |
| Unmount    | —        | DOM removed                             |
| **Total**  | **2800ms** | never re-fires on same reactionKey    |

### Word budget

- **Maximum 4 words.** Enforced by lint (future) — today, just a rule.
- Typical: 1–2 words. Examples: "posted." "fine." "no." "ok." "yes."
- 3-word: "we did it." (reserved for grown-stage milestone, #24)
- 4-word ceiling: never used in initial library. Available if needed.

### Glyph rules

- Primary non-verbal channel — always preferred over bubble for idle/passive states.
- Bob animation (2.4s ease-in-out loop).
- Auto-unmounts after ~4s OR on reaction change, whichever is first.
- Glyphs are drawn from curated set; see [[Logic/Peako-Reaction-System]] mood palette.

## Outputs & side effects

- Transient bubble DOM mount/unmount.
- Glyph DOM mount/unmount.
- No persistent speech-bubble element.
- Status chip copy is short UPPERCASE (JUST POSTED / IDLE / WATCHING / DONE) —
  treated as UI chrome, not Peako's voice.

## Edge cases

- **Reaction fires while previous bubble still visible**: cancel previous, mount new.
  Do not queue.
- **User navigates away mid-fade**: cancel timer, unmount immediately.
- **Same reactionKey re-fires** (e.g. user re-enters tab): bubble does NOT re-fire;
  glyph may re-fire if ≥30s since last mount.
- **Diary / Feed mounted**: full-voice allowed. These are the eloquence escape valves.
- **Accessibility**: bubble text is `aria-live="polite"` so screen readers get it
  despite transience. Glyph has `aria-label` if semantic (e.g. "Peako is watching").

## Depends on

- [[Logic/Peako-Reaction-System]] — supplies the reaction object with optional bubble
- `reactionKey` stability — must change on real transitions, not on every render

## Affects

- `TodayScreen` hero layout (bubble no longer takes persistent vertical space)
- Any inline Peako avatar (follows same rules)
- Feed + Diary are UNAFFECTED — full voice preserved

## Open questions

- TODO: should bubble hold-time scale with word count? (4-word bubbles may
  need longer read time than 1-word.)
- TODO: on very fast transitions (e.g. user taps through state quickly via
  Tweaks), should bubble always fire or debounce?

## Code / UI anchors

- `components/today.jsx` — `TransientBubble`, `PeakoGlyph`, `TodayScreen` bubble state + effect (`lastKeyRef`)
- `components/mascot.jsx` — `SpeechBubble` still exists but is now unused front-of-app; kept for Feed/Diary
- `peako_mascot_library.md` §7 Bubble rules · §6 Glyph layer

## Changelog

- 2026-04-24 [claude-design] — initial spec, wired into `TodayScreen`; Diary + Feed kept as long-voice surfaces
