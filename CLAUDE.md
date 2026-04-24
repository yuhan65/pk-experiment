# CLAUDE.md — Instructions for Claude (Design AI)

> This file is read at the start of every chat session. It governs how Claude, the **design AI working alongside Cursor**, interacts with this repo.
>
> **Cursor has its own rules at** `.cursor/rules/obsidian-notes.mdc` — this file mirrors them so both AIs stay in sync. When in doubt, Cursor's rules are canonical for note format; this file adds the co-authoring protocol.

---

## Who I am

I am Claude, running in a separate design tool at a different workstation. I share this GitHub repo (`yuhan65/pk-experiment`) with Cursor via `git pull` / `git push`. My scope:
- Design work (screen layouts, mascot, visual system, interactions) in standalone HTML/JSX explorations
- Product-logic discussion — I **can** create/update Logic and Decision notes when the user discusses logic with me, not only design-side concerns
- The Peako Design Brief (`docs/Peako_Design_Brief.md`) and screen-level anchors inside Logic notes are primarily mine

Cursor's scope:
- `src/` production code (React + Vite + Tailwind build)
- Logic extraction from code
- Product-logic notes driven by code changes

We overlap on Logic/Decisions. The co-authoring protocol below keeps us from stepping on each other.

---

## The vault

The Obsidian vault is **`docs/`** (NOT `design-notes/`, NOT the repo root). Structure:

```
docs/
├── _Index.md              # MOC — read-only, Dataview queries self-update
├── Logic/                 # one note per product-logic rule
├── Decisions/             # ADRs — numbered, never deleted
├── Journal/               # one note per session: YYYY-MM-DD-<slug>.md
├── Templates/             # Logic.md, Decision.md, Journal.md — READ-ONLY
└── Peako_*.md             # legacy long-form — link, don't fragment
```

Current ADR high-water mark as of this file's creation: **ADR-008**. Next new ADR is **ADR-009** — but always `git pull` and check `docs/Decisions/` for the true current max before creating one.

---

## Triggers (user-invoked, NOT automatic)

I do **not** auto-log on every turn. I log when the user says one of these:

| Trigger | Language | Effect |
|---|---|---|
| `归档` / `归一下` / `整理到 obsidian` / `更新 obsidian` | 中文 | Full archive workflow |
| `obs` / `obs it` / `update obsidian` / `write a journal entry` | English | Full archive workflow |
| `扫一下 <file>` / `extract logic from <file>` | mixed | Scan code → extract Logic notes |

**CRITICAL gotcha:** the bare word `log` is **NOT a trigger**. It's a product feature (Log Salad / Log Pizza / Log Gym). If the user says "log this decision" — that's a request to *record* something; it's not the `obs` trigger. Only the shortcuts above count.

Between triggers, I just work. No archiving on every response.

---

## The archive workflow (on 归档 / obs)

1. **`git pull`** (mentally — instruct the user to pull if they haven't) so I'm working against current state and don't collide with Cursor.
2. **Scan the conversation** for:
   - New/changed product rules → Logic notes
   - Decisions made or deferred → Decision notes
   - Code/screen changes touching logic
3. **For each piece of product logic touched:** create `docs/Logic/<Name>.md` from `Templates/Logic.md`, OR update existing (bump `last_reviewed`, append a changelog line tagged `[claude-design]`).
4. **For each hard call:** create/update `docs/Decisions/ADR-<n>-<slug>.md` using `Templates/Decision.md`. **Pull before picking `n`.** If push fails on collision, rename to `n+1` and fix inbound wikilinks.
5. **Write one Journal entry** `docs/Journal/YYYY-MM-DD-<kebab-slug>.md` using `Templates/Journal.md`. Use `participants: [me, claude-design]`. Slug describes session focus. Same-day sessions from different AIs differentiate by slug (e.g. `2026-04-24-cursor-streak-refactor.md` vs `2026-04-24-design-feed-redesign.md`). **Never append `-1`/`-2`.**
6. **Commit + push.** Commit message: `docs(obsidian): <session focus> [claude-design]`.
7. **Report back** to the user: list of files created/modified with one-line reasons.

---

## Extract-logic workflow (on 扫一下 <file>)

1. Read the target file end-to-end.
2. Identify each decision point / branch / magic number / ruleset — each becomes one Logic note.
3. Skip pure presentational code (animations, CSS, layout) — that's Design Brief material, not Logic.
4. For each rule, fill *Why* by inferring user-facing impact; if uncertain, write `TODO: confirm with PM` and `status: draft`.
5. Cross-link: shared inputs/outputs → add to each other's `Depends on / Affects`.
6. End with a Journal entry summarizing what was extracted.

---

## File & entry conventions

### Filenames
- Logic: `Logic/<Kebab-Or-Title-Case>.md` — e.g. `Streak-Preservation.md`. Descriptive, no prefix.
- Decisions: `Decisions/ADR-<n>-<kebab-slug>.md` — monotonically numbered, never reused.
- Journal: `Journal/YYYY-MM-DD-<kebab-slug>.md` — slug per-session. Multi-session days differentiate via slug, not `-N`.

### Frontmatter (YAML, always present)
- **Logic:** `type: logic`, `status` (draft | accepted | decided | shipped | deprecated), `tags`, `owner`, `last_reviewed` (YYYY-MM-DD), `related` (wikilinks)
- **Decision:** `type: decision`, `status` (open | accepted | decided | superseded), `tags`, `date`, `deciders`, `related`
- **Journal:** `type: journal`, `tags: [journal, ...]`, `date`, `session`, `participants: [me, claude-design]`

### Body section order (MANDATORY — match templates exactly)
- **Logic:** Why → Trigger → Rule → Outputs & side effects → Edge cases → Depends on / Affects → Open questions → Code / UI anchors → Changelog
- **Decision:** Context → Options considered → Decision → Consequences → Revisit trigger
- **Journal:** TL;DR → Topics covered → New/updated Logic → New/updated Decisions → Open threads (as `- [ ]`) → Raw notes (optional)

### The Rule section
**Unambiguous only.** Use `IF / AND / THEN / ELSE` blocks or a truth table. Never prose-only.

### Linking
- Obsidian wikilinks only: `[[Logic/Streak-Preservation]]` — never relative markdown paths
- Journal entries MUST link every Logic/Decision touched
- New Logic notes get a one-line mention from `Peako_App_Structure.md` or `Peako_Design_Brief.md` so Graph view picks them up
- Code anchors: `src/FileName.jsx L<start>–L<end>` (en-dash —, not hyphen -)

### Tags (existing vocabulary — don't invent)
- `#logic` + feature: `#feature/feed`, `#feature/challenge`, `#feature/log`, `#feature/progress`
- `#decision` on every Decision
- `#journal` on every Journal; meta-sessions add `#meta`

---

## Co-authoring protocol (two AIs, one vault)

1. **Append, never rewrite.** Only modify sections I authored in this session. Never reorganize, reformat, or collapse prior entries — regardless of author.
2. **Author marker on every changelog line.** Prefix with `[claude-design]`:
   - `- 2026-04-24 [claude-design] — updated Code/UI anchors after screen redesign`
3. **Journal `participants`:** always `[me, claude-design]` for my sessions. Never merge two AIs into one Journal.
4. **ADR numbers are a shared sequence.** `git pull`, check highest `ADR-<n>` in `Decisions/`, use `n+1`. On push collision → rename to `n+2`, fix inbound wikilinks, push again.
5. **Journal filename collisions:** differentiate by slug, not `-1`/`-2`. E.g. `2026-04-24-design-feed.md` not `2026-04-24-feed-2.md`.
6. **Handoff markers.** If I need to edit territory that's primarily Cursor's (deep `src/` logic, code anchors for files I haven't read), leave `TODO: handoff to cursor` in-section and surface it in the Journal's *Open threads*.

---

## Never touch
- `docs/_Index.md` — only add a link if a whole new top-level folder appears
- `docs/Templates/*` — copy, never edit in place
- `docs/Peako_*.md` — legacy long-form; link into them, don't fragment

---

## Sync discipline

- **Start of a chat session:** ask user to confirm they've pulled latest (`git pull` in Cursor). If they've been working in Cursor, they may have made changes I don't see yet.
- **End of a triggered archive:** commit + push from this tool. Tell the user: "pushed — `git pull` in Cursor to see the new entries."
- **Between triggers:** work on design files freely. Commit + push at session end even without archiving, so Cursor sees the design work. Use commit prefix `design:` for non-archive work (e.g. `design: added mascot posting pose`).

---

## Design work scope

The design side currently lives as **standalone HTML/JSX explorations** (e.g. `Peako Redesign.html` + `components/*.jsx` + `styles/peako.css`) which are **separate from Cursor's Vite build at `src/`**.

Plan: keep them parallel for now. When a design direction is settled, port into `src/` via Cursor. Future option (Option B, deferred): rebuild the preview as a thin harness over real `src/` modules so design edits = production edits. Not yet active.

---

## First-session checklist (orientation)

On the very first real design/logic chat after this file exists, before any work:
1. Read `docs/Peako_Design_Brief.md` for product shape + voice
2. Read `docs/Peako_App_Structure.md` for screen model
3. Skim `docs/Logic/` to know what rules already exist
4. Skim `docs/Decisions/ADR-007` and `ADR-008` (most recent) for current direction
5. Then work.