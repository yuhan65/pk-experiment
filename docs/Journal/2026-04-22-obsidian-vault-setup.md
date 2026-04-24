---
type: journal
tags: [journal, meta]
date: 2026-04-22
session: obsidian-vault-setup
participants: [me, cursor]
---

# 2026-04-22 — Obsidian Vault Setup

## TL;DR
- Converted `docs/` into an Obsidian-ready knowledge vault with folders for **Logic**, **Decisions**, **Journal**, **Templates**.
- Installed `.cursor/rules/obsidian-notes.mdc` so future sessions follow a consistent protocol when the user says "整理到 obsidian".
- Extracted 4 starter Logic notes from `src/PeakoPrototype.jsx` as a seed set; opened 1 real Decision (streak threshold).
- Vault now relies on Dataview plugin for auto-generated indexes — no manual TOC maintenance.

## Topics covered
- Information architecture for a product knowledge vault (PM-style, not engineering-style)
- How to separate "rule content" from "implementation detail" so notes survive refactors
- The "整理到 obsidian" workflow as a Cursor rule

## New / updated Logic notes
- [[Logic/Coin-Reward-Rule]] — created. Pizza=2 / others=10 reward rule extracted from `log()` handler.
- [[Logic/Log-to-Feed-Flow]] — created. The full submit-log → prepend-post flow, plus the intended divergence from current prototype.
- [[Logic/Peako-Brain-Scripting]] — created. `PEAKO_SCRIPTS` as the single source of voice truth.
- [[Logic/Streak-Preservation]] — created. Drafted the proposed 2-of-3 rule from the open question in `Peako_App_Structure.md`; still `status: draft`.

## New / updated Decisions
- [[Decisions/ADR-004-Streak-Preservation-Threshold]] — opened, `status: open`. Linked from [[Logic/Streak-Preservation]].

## Open threads (carry forward)
- [ ] Decide ADR-004 (streak threshold) before any real alpha user sees the app.
- [ ] Extract remaining open questions from `Peako_Open_Decisions.md` into individual ADRs (ADR-001…003, ADR-005+).
- [ ] Write `Logic/Challenge-Sequencing.md` (sibling to Streak-Preservation; referenced as dependency but not yet created).
- [ ] Install Obsidian + Dataview plugin locally and verify `_Index.md` queries render correctly.
- [ ] Decide whether coin awards should run through the same voice/roast-level filter as feed posts (see [[Logic/Coin-Reward-Rule]] open questions).

## Raw notes / quotes
PM framing that drove the Logic template:
> "Logic notes most easily fail by becoming code specs. The 7 fields that matter are Why, Trigger, Rule, Outputs, Edge cases, Depends/Affects, Open questions — in that order. Inputs and metrics are secondary. Code anchors are a footer, not a header."
