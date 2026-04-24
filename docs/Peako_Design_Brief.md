# Peako — Design Brief

*A handoff doc for brainstorming visual style, IP/character design, and brand direction.*

---

## 1. The One-Liner

**Peako is the fitness app that roasts you into shape.**

Think Duolingo's passive-aggressive owl, but for fitness. Peako is a mascot-driven fitness companion with a "frenemy" personality. They do **two things**:

1. **Coach you** — assign 3 gamified daily challenges (bodyweight workouts, stretches, etc.), Duolingo-lesson style.
2. **Judge you** — react to meals you log with snarky commentary.

One relationship, two directions: Peako → you (coaching), you → Peako (logging). The app is built around that loop.

---

## 2. Why This Project Exists

Most fitness apps fall into two camps:
- **The Drill Sergeant** (MyFitnessPal, Noom) — clinical, spreadsheet-y, shame-based.
- **The Cheerleader** (Calm, Fitbit) — overly positive, easy to ignore.

Neither is *fun*. Gen Z and younger millennials don't want a coach — they want a **character**. Duolingo proved that a bird with an attitude can drive billions in engagement. Peako applies that same formula to fitness.

**Our north star:** users should screenshot Peako's comments and send them to the group chat.

### The business model, in one line

> **The app is a printing press for shareable content.**

Every day, Peako produces: 3 challenges (and completion moments), 1+ snarky reactions to what the user ate, a weekly recap, and milestone posts. All of these should be **natively screenshot-worthy** — self-contained, branded, legible at thumbnail size. Distribution happens when users share Peako's output on social; that's our growth engine, not paid acquisition.

This means **shareability is a Phase 1 design constraint, not a Phase 2 feature.** Every screen should pass the "would you screenshot this?" test.

### Target market & platforms (overseas)

**Primary markets:** US / UK / Canada / Australia / EU. English-first.

**Platforms users will share to:**
| Platform | Format | Priority | Why |
|----------|--------|----------|-----|
| **iMessage / WhatsApp** | Sticker packs, screenshots, 1:1 chat | ⭐⭐⭐ | Group chat sharing is the highest-intimacy viral channel. Stickers are a native iOS feature. |
| **Instagram Stories** | 9:16 vertical | ⭐⭐⭐ | Most active sharing surface for this demo. |
| **TikTok** | 9:16 video + screenshots | ⭐⭐⭐ | #GymTok + "beating the Duolingo bird" meme energy. Peako fits here natively. |
| **Twitter/X** | Landscape or square image + text | ⭐⭐ | Screenshot culture. Short-form witty content wins. |
| **Reddit** | Screenshots posted to r/ProgressPics, r/Fitness, etc. | ⭐⭐ | Brutal screenshot audience — if Peako survives Reddit, it survives anywhere. |
| **Instagram feed posts** | 1:1 or 4:5 | ⭐ | Lower priority, but single-image Peako cards can live here. |

**Design implication:** the share-card template system needs to output **at minimum 3 aspect ratios**: 9:16 (Stories/Reels/TikTok), 1:1 (Twitter/IG), and a native-feed card that looks good as a raw screenshot.

---

## 3. Brand Personality

Peako is a **frenemy**, not an enemy and not a friend. The tone lives in the tension between those two.

| Peako IS                         | Peako is NOT                      |
| -------------------------------- | --------------------------------- |
| Snarky, witty, observational     | Mean, cruel, body-shaming         |
| Self-aware and chronically online | Corporate, sanitized, "wellness-y" |
| Smart (makes pop-culture refs)   | Dumb, slapsticky, childish        |
| Slightly judgmental — lovingly   | Preachy or moralizing             |
| Rooting for you (secretly)       | Your biggest fan                  |

**Voice examples** in two registers (observing + coaching), with meal-log observation further split by the user's self-tagged meal type:

*Observing — Meal log (split by tag; see `Peako_Games.md` for full system):*

- 🥗 **Healthy tag → reluctant, dry approval** (scarce — only ~1 in 5 gets explicit approval):
  - *"Fine. That was… actually fine. Don't get cocky."*
  - *"Is that a leaf? Are we a rabbit now? Anyway, 1 point to Gryffindor."*
- 🍕 **Treat tag → full-send roast** (Peako's signature register — this is the viral content engine):
  - *"I've calculated your 'beach body' progress. It's now scheduled for the year 2099."*
  - *"Pizza again? That's three this week. Are we committed to this bit or giving up entirely?"*
- 🤷 **Whatever tag → suspicious, prying, nosy:**
  - *"'Whatever.' Nice dodge. What was it really, pizza?"*
  - *"Mysterious. I'm assuming the worst."*

*Coaching — Challenge flow:*
- Assigning the day → *"Three challenges. Don't embarrass me. Try to make it past #1 this time."*
- Mid-plank → *"10 more seconds. I've seen tectonic plates move faster."*
- Completion → *"Fine. That was… actually fine. I'll allow it."*
- Skip → *"So we're just… not doing plank today? Alright. Noted. Forever."*
- Rest day → *"You get today off. I'm feeling generous. Don't get used to it."*

**Voice rule:** Peako's approval is a scarce resource. Default to dry acknowledgment; reserve actual praise for milestones. The moment Peako claps for every salad, we become Fitbit.

If the mascot design doesn't make you read those lines in its voice automatically — the design isn't done yet.

---

## 4. The Mascot: What We Need From You

This is the **most important deliverable**. Peako's character IP is the product.

### Open questions for you to explore:

1. **What *is* Peako?**
   - Completely open. Animal, creature, object, blob, abstract shape, something invented — all on the table. Treat "Peako" as just a name, not a hint about species.
   - **One hard constraint:** no birds. Duolingo already owns "snarky bird mascot" and we don't want to invite the comparison. Everything else is fair game.
   - Whatever it ends up being, it needs **strong silhouette recognition** — we should know it's Peako from 20 feet away, and ideally from a single pose or shape.

2. **What are its signature features?**
   - Peako needs 2–3 memorable, easily-reproducible traits — an accessory, an expression, a color, a pose, a body proportion, a texture. Whatever makes it instantly re-drawable by a fan.

3. **What's its default expression?**
   - Think *raised eyebrow*. *Smug smirk*. *Unimpressed side-eye*. Not a toothy smile.

4. **Growth stages — Peako evolves alongside the user's habit.**

   Peako isn't a single silhouette. The mascot has **4 growth stages** tied to the user's habit-formation arc (full rationale in [[Decisions/ADR-008-Peako-Growth-System-Dual-Progress-Views]]):

   | # | Stage | When | What it should communicate |
   |---|---|---|---|
   | 1 | 🌱 **Seed** | Day 0, brand-new user | Dormant, small, unformed — curious but not yet committed. Personality must still come through, even in a minimal body. |
   | 2 | 🌿 **Sprout** | 7 effort days in | First hint of signature features. Recognizably the same character, but barely. |
   | 3 | 🧒 **Teen** | 14 effort days in | Recognizably Peako. Full signature silhouette readable. Expression range unlocked. |
   | 4 | 🌳 **Fully Grown** | 21 effort days → graduation | Final form. This is the Peako that ships on stickers and marketing. |

   **Hard design constraint:** all 4 stages must read as **the same character** — silhouette evolution, not species change. A user looking at Seed and Fully Grown side by side should say *"that's baby Peako and grown-up Peako"*, not *"that's a different creature."* What changes: scale, silhouette complexity, accessory fidelity, and expression range. What stays: core shape language, the 2–3 signature features, the color identity.

   **Why not 3 stages or 6:** Four is the minimum-viable cadence to feel meaningful across 21 days (one transition per week-ish). More stages → smaller per-stage change → less "wow" per unlock.

5. **Expression range:**
   - We'll need **two distinct emotional registers** — an observing/judging one (for log reactions) and a coaching/active one (for workout challenges) — **plus two post-graduation registers** that unlock once Peako is Fully Grown.
   - At minimum, please explore:
     - *Observing:* Smug, Judgy, Surprised, Impressed (reluctantly), Disappointed, Asleep/Bored, Hype.
     - *Coaching (pre-graduation, "teaching" energy):* Demonstrating a move, Counting/timing (focused), Heckling mid-workout, Grudgingly proud of completion, "I told you so" (for skips), Generous (rest day).
     - *Coaching (post-graduation, "maintaining" energy):* Peer-to-peer nod, Casual encouragement, Been-here-before confidence. Less hand-holding than the teaching register.
     - *Worried* (post-graduation only, rare): Peako dropping the snark when the user has gone quiet 3+ days. The only register where Peako softens to near-friend. This is the only place the frenemy mask comes off — handle with care, it must not become the default.
   - That's ~13 expressions in the pre-graduation set + ~4 in the post-graduation set = **~17 across the full sheet**. Feel free to merge or split; the point is to prove the character can judge, coach, maintain, and worry without breaking tone.
   - **Stage × expression matrix:** not every expression needs to exist at every stage. Seed and Sprout can ship with a reduced set (the body can't support full range anyway). Teen and Fully Grown need the complete sheet. A practical target: **~6 expressions at Seed, ~10 at Sprout, full ~17 at Teen and Fully Grown.**

### Mood board references to start from

- **Duolingo's Duo** — reference only for *engagement mechanics* (how a mascot earns screen real estate and emotional buy-in). **Do not reference visually** — we want clear daylight between our character and theirs.
- **Pusheen / Line Friends** — stickerable, screenshot-friendly character design.
- **Finn the Human / Adventure Time** — simple silhouettes, massive expression range.
- **The Cuphead aesthetic** — NOT this literally, but the idea that character *personality* can carry an entire brand.
- **Apple's Memoji** — the iOS-native feel we want to live next to.
- **Go wider than mascots, too** — toy design (Sonny Angels, Smiski), Japanese yurukyara, indie game characters, emoji, even kitchenware and furniture with "faces." The more unexpected the starting point, the more ownable the result.

---

## 5. Visual Style — Initial Direction

This is a starting point, not a constraint. Push back if you have better instincts.

### Platform context
The MVP is a **web prototype mimicking an iPhone 15 interface** (393 × 852px). So the design needs to feel at home inside iOS — clean, rounded, glassy, legible — while Peako himself stands out as the loud, colorful character on top of that clean canvas.

### Color direction (tentative)
- **Base UI:** iOS off-white (`#F7F7F8`), soft greys, subtle shadows.
- **Peako's signature color:** TBD by you. Needs to pop against white AND against a dark mode. Avoid Duolingo green (#58CC02) — we need our own territory. Consider: electric coral, acid teal, hot magenta, or a gradient.
- **Accent colors:** a "streak" color (fire/orange) and a "coins" color (gem/cyan) for stats.
- **Growth stage palette:** each stage can carry a slight palette shift alongside the silhouette change — e.g., Seed reads cooler/quieter, Fully Grown reads at the mascot's full saturation. Keep it subtle; the core color identity must stay consistent so the character is unmistakably Peako at every stage.

### Trail view illustration (new — needs its own direction)

The Progress tab's **Trail view** (see [[Peako_App_Structure]] §Progress and [[Decisions/ADR-008-Peako-Growth-System-Dual-Progress-Views]]) is a vertical biome path with 4 stage nodes on it. Open direction for you:

- **Environment metaphor** — forest path / mountain climb / constellation / river / skyline / abstract landscape / something invented. Whatever supports "a journey with 4 waypoints" and doesn't feel like a children's game map.
- **Node treatment** — each node marks a stage unlock (Seed / Sprout / Teen / Fully Grown). Reached nodes should look *visited* (lit, claimed, tappable); unreached nodes should look *mysterious* (dimmed, silhouetted) — no spoilers on the final Peako form before graduation.
- **Peako sprite position** — Peako walks/climbs/floats along the path. Position is dynamic (between last-reached node and next one, proportional to effort-day progress).
- **Mood** — should feel like "earned territory," not a Duolingo lesson tree or a Candy Crush map. Closer to Firewatch, or a minimalist hiking map, than to a gamified grid.

### Typography
- System font stack (`-apple-system`, `Inter`) for UI — feels native.
- Consider a **display/headline font** with personality for Peako's posts or the logo. Something with a wink to it.

### Iconography
- Using `lucide-react` for functional icons (like, share, comment).
- Custom illustrations needed for: food items, exercise types, streak milestones, achievement badges.

---

## 6. Screens That Exist Today (Prototype) — and what's changing

The working prototype has one screen — **Peako's Feed** — which looks like a Twitter/X feed but every post is from Peako commenting on what the user just logged.

**Important context:** the product concept has since evolved. The prototype is a **log-only** app. The MVP we're designing for is a **coach + observer** app:

- **Home** is no longer "Feed." Home is **Today** — Peako's 3 daily challenges.
- **Feed** still exists, but it's **accessed on-demand** via a "phone" icon in the top bar (with a red-dot notification badge). Treat the feed like iMessage: you check it when Peako texts.
- **Logging** becomes a floating button — tap when you want, get a reaction in the feed.

Full structural details live in `Peako_App_Structure.md`. **Please read it before the kickoff call** — it'll change how you approach the hero frames.

You don't need to design around the existing prototype's layout — feel free to reimagine everything. The prototype is a scaffold, not a constraint.

---

## 7. Where This Is Going (Product Roadmap)

Today, the prototype only has **one screen** (Peako's Feed) — but that's intentional for Phase 0. The product has a few phases ahead of it; you should have this in your head so the character & system you design can stretch into later phases without needing to be rebuilt.

**Full roadmap lives in `Peako_Roadmap.md`** (read this before the kickoff). Short version:

| Phase | What it is | Design implication |
|-------|------------|--------------------|
| **0 — Prototype** *(done)* | Log-only feed, proves the vibe | — |
| **1 — MVP / Alpha** | Coach + observer: 3 daily challenges + logging, real AI, ~30 screens | Full UI kit, mascot (both coaching & judging modes), Today screen, challenge game UI, phone-icon feed, onboarding, expression sheet |
| **2 — Beta** | Shareables, stickers, achievements, push | Share-card system, stickers, badges, notification visuals |
| **3 — Growth** | Native iOS, customization, maybe a paid tier | Outfits/moods, premium visual language |
| **4 — Expansion** | Peako beyond fitness (speculative) | Keep the IP portable — don't tie the character to gym imagery |

**The important thing for you:** the mascot you design has to survive all the way to Phase 4. So please don't over-couple it to fitness, salad, or gym iconography. Peako is a *personality*, not a themed character — someone who happens to coach fitness today but could coach anything tomorrow.

---

## 8. What We're Asking From You (Phase 1)

No pressure to deliver everything at once — this is **brainstorm / exploration** phase. We'll sequence it in stages.

### Stage 1 — Direction (Week 1–2)
1. **3–5 mood boards** for overall visual direction.
2. **3 mascot concepts** — rough sketches, deliberately different directions (don't converge too early).
3. **Color + type direction** for each concept.

### Stage 2 — Character lock (Week 2–3)
Once we've picked a direction:
4. **Expression sheet** for the chosen mascot — ~17 expressions across *observing* / *coaching (teaching)* / *coaching (maintaining)* / *worried* registers (see section 4), delivered as a **stage × expression matrix**: ~6 at Seed, ~10 at Sprout, full ~17 at Teen and Fully Grown.
5. **The "phone" icon** — our signature UI element. Should feel like Peako's personal phone/device that you "check" to see what they said. Open to literal phone / cartoon device / abstract bubble / something unexpected.
6. **Growth stage art** — the 4 mascot silhouettes (Seed / Sprout / Teen / Fully Grown) at default pose, proving the same-character constraint holds across the arc.

### Stage 3 — Hero frames (Week 3–4)
7. **Today screen** — the new home. 3 daily challenges, Peako's greeting, streak/coins/phone icon in top bar, floating log button. **This is the most important frame** — it's the front door of the product.
8. **Challenge/game screen** — one archetype (timer-based, e.g., 30s plank). Show where Peako lives during a workout (cheering? timing? heckling?).
9. **Peako's Feed post card** — the most screenshot-able surface. Needs to pass the screenshot test (see section 9) at full-size AND as a thumbnail.
10. **Log modal** — quick sheet for sending Peako a meal photo.
11. **Challenge completion screen** — the "I did it" moment. Should feel like a trophy/receipt users want to send to friends. This is a **prime share surface**.
12. **Progress — Trail view** — the biome path + 4 stage nodes + current-position Peako sprite + effort-day counter. Default Progress view pre-graduation.
13. **Progress — Dashboard view** — streak hero + freeze + calendar + weekly + coins + lifetime. Default Progress view post-graduation.
14. **Graduation Takeover** — full-screen one-time reveal of Fully Grown Peako at 21 effort days. Prime share surface — must pass the screenshot test on its own.

### Stage 4 — Share artifacts (Week 4–5)
11. **Share card template system** — the template that produces shareable images in 3 aspect ratios (9:16 Stories, 1:1 IG/Twitter, native screenshot). Cards for: Peako post, challenge completion, streak milestone, weekly recap.
12. **iMessage sticker pack preview** — 6–8 stickers from the expression sheet, packaged as an iMessage sticker set. Huge viral lever on iOS.

### Nice-to-have
- App icon exploration.
- Additional game screen archetypes (counter-based, guided-flow) — see `Peako_Games.md` for the types.
- TikTok-style "reaction video template" — a layout where Peako appears as an overlay/corner element that content creators can screen-record over their workout.

---

## 9. Constraints & Gotchas

- **Must work at small sizes.** The mascot avatar in the feed is ~40px. If it's unreadable at that size, it fails.
- **Must be animatable.** We use Framer Motion. Design with movement in mind — a character that can bounce, tilt, react.
- **Must not cross the cruelty line.** No body-shaming, no mocking weight, no triggering content. Peako is a frenemy, not a bully. If you're ever unsure, we're too harsh.
- **Must feel native to iOS** — even though the MVP is web, it's supposed to *feel* like an iPhone app a user forgot they downloaded.
- **Must pass the screenshot test.** Any screen a user might want to share (feed post, completion screen, weekly recap, streak milestone) must be **self-contained, branded, and legible** when cropped to a phone screenshot with no context. If you can't explain what it is by showing only the screenshot — it needs work.

### The "Screenshot Test" — explicit criteria

For any potentially-shareable screen:

- **Brand visible** — Peako (mascot) + "Peako" wordmark or app icon, placed so it survives a random crop
- **Self-contained message** — text + visual tell the full story without requiring context
- **Aspect-ratio resilient** — looks good cropped to 9:16, 1:1, or native screenshot
- **Legible at 50% zoom** — thumbnails in Instagram/Twitter/iMessage are tiny
- **No personal info leakage** — email, full name, IP, etc. must never be in a shareable frame
- **Feels like merch, not like a UI screenshot** — the visual should feel designed *to be shared*, not like a bureaucratic form someone accidentally capped

---

## 10. Timeline & Next Steps

- **Week 1:** Read all four docs (`Design_Brief`, `Roadmap`, `App_Structure`, `Games`). Mood boards + mascot concept sketches.
- **Week 2:** Review together. Pick a mascot direction. Expression sheet + phone icon exploration begins.
- **Week 3:** Hero frames — Today screen, challenge screen, feed, log modal.
- **Week 4+:** UI system, remaining screens, polish.

Let's do a **30-min kickoff call** once you've had a day or two to sit with this. Bring questions, bring weird ideas, push back on anything that feels off. Peako's personality is 80% of the product — getting the character right matters more than any pixel.

---

*Questions? Wildly different ideas? Hate the name "Peako"? Say so. Nothing here is locked.*
