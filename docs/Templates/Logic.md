---
type: logic
status: draft            # draft | decided | shipped | deprecated
tags: [logic, feature/TODO]
owner: 
last_reviewed: 
related: []              # [[Other-Logic-Note]], [[Feature-Note]]
---

# <Logic Name>

## Why (user value)
> 1–3 sentences. What problem this solves for the user. If you can't write this, the logic is premature.

## Trigger
- When this fires (event / state / time / entry point).

## Rule
<!-- The core spec. Use if-then, bullet rules, or a truth table. Write it so engineering has zero ambiguity. -->

```
IF  <condition>
AND <condition>
THEN <outcome>
ELSE <outcome>
```

## Outputs & side effects
- UI:
- State / data:
- Notifications:
- Analytics events:

## Edge cases
- [ ] Empty state
- [ ] Offline / network failure
- [ ] Timezone / day rollover
- [ ] Conflicting user input
- [ ] (others…)

## Depends on / Affects
- Depends on: [[…]]
- Affects: [[…]]

## Open questions
- [ ] Question → see [[Decisions/…]]

## Code / UI anchors
- Code: `src/…` L…–L…
- Screens: [[…]]

## Changelog
- YYYY-MM-DD — created
