---
type: daily-plan
date: YYYY-MM-DD
tags: [daily-plan]
author:                     # cursor | claude-design
generated_from: []          # [Inbox, Journal/latest, Peako_Open_Decisions, yesterday's plan, git log]
---

# <YYYY-MM-DD> — Daily Plan

## Top 3 today
> The three things most worth your time. Each cites what it came from and links to relevant Logic/Decisions.

1. **<Item>** — <one-sentence why> → see [[Logic/…]] or [[Decisions/ADR-…]]
2. **<Item>** — <why>
3. **<Item>** — <why>

## Secondary (if time)
- <Item> — <one-liner>
- <Item> — <one-liner>

## Open questions → candidate ADRs
> Inbox items that are hard calls, not tasks. Each should probably become a Decision note.
- [ ] <Question> — candidate: `Decisions/ADR-<n+1>-<slug>.md`

## Stale (inbox ≥ 7 days, no movement)
> Either defer explicitly, escalate to an ADR, or close. Don't let these rot.
- <Item> (in inbox since YYYY-MM-DD) — suggestion: <defer | ADR | close>

## Carryover from yesterday
> Unfinished top-3 items from the last daily plan. If they roll over 3+ days without being touched, the agent should demote them to Secondary or flag them stale.
- <Item> — <status>

## What changed while you were away
> Summary of git commits since the last daily plan was generated. Helps the agent (and you) pick up context without re-reading diffs.
- `<short-sha>` <message> *(by cursor | claude-design)*

## Raw inbox snapshot
> The inbox entries the agent processed, quoted verbatim. Lets you verify classification and catch misreads.
```
4/24
<entry>
<entry>
```
