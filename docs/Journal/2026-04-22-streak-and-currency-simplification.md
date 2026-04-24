---
type: journal
tags: [journal, session/design]
date: 2026-04-22
session: streak-and-currency-simplification
participants: [me, cursor]
---

# 2026-04-22 — Streak & currency simplification

## TL;DR
- Collapsed the meal-logging economy from **3 streaks + "two currencies"** down to **1 streak + 1 currency + tagged rewards**. Same incentive coverage, much less UI pressure.
- Healthy-run bonuses (+10 / +25) kept, but as **trigger-reveal toasts**, not a visible counter.
- Retired design preserved as a future A/B candidate in [[Decisions/ADR-005-Streak-And-Currency-Count]] and [[Peako_Alternatives]].
- Challenge-streak threshold (2-of-3 vs all-3) is still open under [[Decisions/ADR-004-Streak-Preservation-Threshold]].

## Topics covered
- [[Peako_Games]] — rewrote "Streak rules" and "Meal Logging — Incentive System"; removed the "Dual-Currency" framing; added the trigger-reveal Healthy-run bonus pattern.
- [[Peako_App_Structure]] — Progress tab now shows 1 streak + a "This Week" low-pressure block instead of 3 streak counters.
- [[Peako_Design_Brief]] — no structural change needed; §3 voice registers by tag already matched the new framing.
- [[Peako_Open_Decisions]] — edited the 2026-04-22 [1.6] "Decided" entry; added a follow-up "Decided" entry capturing the refinement and linking to the new ADR.
- [[Peako_Roadmap]] — reworded Phase-2 achievement source from "dual-currency meal system" to "tagged-meal economy."
- [[_Index]] — linked [[Peako_Alternatives]].

## New / updated Logic notes
- *(none yet)* — [[Coin-Reward-Rule]] still describes the prototype's `{pizza, salad, gym}` model and needs a pass when we implement the Healthy/Treat/Whatever tag system.

## New / updated Decisions
- [[Decisions/ADR-005-Streak-And-Currency-Count]] — status: **decided** (Option B: 1 streak, 1 currency, tagged rewards). Full Option-A spec preserved inside the ADR as the A/B candidate.

## New docs
- [[Peako_Alternatives]] — parking-lot index for retired designs we might re-run as A/B tests. First entry: the multi-streak / dual-currency model.

## Open threads (carry forward)
- [ ] Update [[Coin-Reward-Rule]] from prototype keys (`pizza`/`salad`/`gym`) to the tag model (`Healthy`/`Treat`/`Whatever`) once implementation starts.
- [ ] Decide [[Decisions/ADR-004-Streak-Preservation-Threshold]] before alpha.
- [ ] Define the A/B test protocol for ADR-005's revisit triggers (how long, what N, what metric exactly).
- [ ] Confirm that a log-only user (never touches challenges) still has a reason to open the app on day 30 under the single-streak model — or accept that those users are not the target.

## Raw notes / quotes
> *"streak system这里到底应该怎么设计 首先我觉得每天三个小游戏challenge肯定是要的 然后普通的分享食物的话 激励的是货币streak还是一般的streak 需要两个streak吗还是只一个比较好 我觉得货币也最好不要有两个吧"*

> *"就这么干。然后可以把这个问题的其他方案记录obsidian一下，以后也许可以ab test"*

User instinct was right — multi-streak + dual-currency was overengineered for the companion tone. The ADR captures both why we stripped it back and what would make us bring it back.
