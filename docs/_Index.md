---
type: moc
tags: [index]
---

# Peako — Knowledge Base (MOC)

Entry point for everything about Peako. Open this folder (`docs/`) as an Obsidian Vault to get full backlinks + graph + Dataview.

## Top-level documents
- [[Peako_App_Structure]] — screens, tabs, navigation
- [[Peako_Design_Brief]] — voice, brand, product shape
- [[Peako_Games]] — challenge/game catalog
- [[Peako_Roadmap]] — phasing
- [[Peako_Open_Decisions]] — legacy decisions doc (being split into `Decisions/`)
- [[Peako_Alternatives]] — retired designs kept as A/B candidates

---

## All Logic (auto)

```dataview
TABLE
  status,
  file.folder AS folder,
  join(file.outlinks.file.name, ", ") AS "links out"
FROM "Logic"
WHERE type = "logic"
SORT status ASC, file.name ASC
```

## Logic by status

### Decided & shipped
```dataview
LIST FROM "Logic" WHERE type = "logic" AND (status = "decided" OR status = "shipped") SORT file.name ASC
```

### Still draft
```dataview
LIST FROM "Logic" WHERE type = "logic" AND status = "draft" SORT file.name ASC
```

---

## Open Decisions

```dataview
TABLE status, date, join(related, ", ") AS "affects"
FROM "Decisions"
WHERE type = "decision" AND status != "superseded"
SORT status ASC, date DESC
```

---

## Recent sessions

```dataview
LIST date
FROM "Journal"
WHERE type = "journal"
SORT date DESC
LIMIT 10
```

---

## All open questions across Logic notes

```dataview
TASK FROM "Logic" WHERE !completed
```

---

## How to use this vault

1. **Writing a new logic**: copy [[Templates/Logic]] into `Logic/`. Fill in *Why → Trigger → Rule* first; the rest can wait.
2. **Making a hard call**: create a [[Templates/Decision|Decision]] note. Link it from the relevant Logic note's *Open questions*.
3. **Ending a Cursor session**: tell Cursor **"归档"** (中) or **"obs"** (en) — it follows `.cursor/rules/obsidian-notes.mdc` and writes a Journal entry + updates affected Logic/Decisions.
4. **Finding things**: use Graph view, `#logic/feature/feed` tags, or the Dataview tables above.

## Required Obsidian plugins
- **Dataview** (community) — powers the tables above.
- **Templater** (community, optional) — easier template insertion. Point it at `Templates/`.
