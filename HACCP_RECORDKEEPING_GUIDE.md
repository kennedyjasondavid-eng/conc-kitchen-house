# CONC HACCP — Record-Keeping & Monitoring Guide (simple, audit-ready)

**The practical companion to `HACCP_MONITORING_RECORDS.md`** (which owns the Principle 4–7 *design* + the digital capture schema). This doc owns the **operational record set**: what to write down, how little you can get away with, and what an auditor will ask for.
**Date:** 2026-06-24 · **Status: WORKING DRAFT.** The critical-limit *values* below are **validated against Health Canada / O. Reg. 493/17 / FDA / FSA** (2026-06-24); **`HACCP_HAZARD_ANALYSIS.md` §4 remains the single source of truth for the numbers.** Open regulatory item: the ROP special-process / variance status, to confirm directly with TPH.

---

## The design principle
A record system fails two ways:
- **Too heavy** → busy staff stop filling it in → at audit you have *nothing*. (Worse than a light system.)
- **Too thin** → it doesn't prove control → it fails the audit.

**Target: the *minimum* set of records that proves — for every CCP — that it was monitored, that any deviation was caught and corrected, and that someone verified it. Captured *at the moment of work*, inside the workflow staff already do.** When in doubt, fewer fields filled in reliably beats more fields filled in never.

## The five golden rules (this is what makes a record "audit-ready")
1. **Record at the moment** — not end-of-day from memory. (A logging probe / one chip-tap does this for you.)
2. **If it isn't written down, it didn't happen.** Auditors credit only what's recorded.
3. **Date + initials on every entry.** Who, when — always.
4. **Append-only. Never erase.** A correction is a *new* line, not an overwrite. (Erasures read as tampering.)
5. **Someone reviews and signs.** A monitored record nobody checks isn't verification. A lead initials the day's logs; the coordinator reviews weekly.

---

## The minimal record set (this is everything an audit needs)
Six active logs + the plan + the review trail. Most are one line per batch or two readings per day.

| # | Record | What it proves | Minimal fields | Frequency | Who | Home | Keep |
|---|---|---|---|---|---|---|---|
| 1 | **Cook / Cool / Reheat batch log** | CCP-1, 2, 4 | item · date · cook °C · cool@2h °C · cool@6h °C · reheat °C · initials | per batch | cook | HUB chip-tap → log | ≥1 yr* |
| 2 | **Fridge / cold-hold log** | CCP-3 | unit · temp · time · initials | **2×/day** per unit | lead | HUB / paper | ≥1 yr* |
| 3 | **Vac-bag / ROP label** *(is the record)* | CCP-3 dating | product identity · cook **date + time** · **discard-by date** (cook + ≤7 d) | every bag | cook | printed label | with batch |
| 4 | **Transport log** | CCP-3 cold chain | route · depart °C · arrive °C · time · initials | per van leg | driver | HUB / paper | ≥1 yr* |
| 5 | **Thermometer calibration log** | verification | probe · ice-point check · pass/adjust · initials | **daily** | each cook | paper / HUB | ≥1 yr* |
| 6 | **Corrective-action log** | Principle 5 | what failed · when · action · disposition (use/discard) · who | only on a deviation | whoever finds it | HUB / paper | ≥1 yr* |
| 7 | **Retained food sample (7-day)** | TPH Centralized-Kitchen rule | dated, sealed sample of **every RTE item produced** | each RTE item, daily | lead | labelled sample fridge | **7 days** |
| — | **Allergen / anaphylactic records** | CCP-6 | *DOOR already generates these* — plating sheets + auto anaphylactic list + H&W acknowledgement | every meal | H&W / lead | **DOOR (existing)** | ≥1 yr* |
| — | **Receiving + cleaning** (PRPs) | foundation | receiving: supplier · temp · accept/reject · initials · cleaning: tick per shift | per delivery / per shift | receiver / staff | paper | ≥1 yr* |
| — | **Food-handler certification** | competency | cert on file per handler; **a certified supervisory handler in *each area* at all times** (Toronto Ch. 545, above the provincial s. 32 floor) | standing | coordinator | binder | current |
| — | **The HACCP plan + review sign-offs** | the system exists & is live | the HACCP plan docs + weekly coordinator review signature | standing | coordinator | binder / repo | current + superseded |

*\*Retention floor **≥1 year** — the statutory minimum for purchase + pest-control records (O. Reg. 493/17 s. 29(2) / s. 13(2)). There is **no binding retention period for temperature logs**, but keep all monitoring logs ≥1 yr (confirm 1 vs 2 yr for the special-process logs with TPH). Validated 2026-06-24 — `HACCP_REGULATORY_FINDINGS.md`.*

**The big simplicity win:** allergen control (CCP-6) needs **no new paperwork** — DOOR already produces the plating sheets, the anaphylactic list, and the H&W acknowledgement. Those *are* the CCP-6 records. Don't recreate them.

---

## The combinations — hazard → CCP → limit → control → monitor → record → fix
One row per CCP. *(Limit values validated against HC / O. Reg. 493/17 / FDA / FSA — single source is §4 of the hazard analysis.)*

| CCP / step | Hazard | Critical limit *(validated — single source §4)* | Control measure | Monitor (what · freq · who) | Record | Corrective action |
|---|---|---|---|---|---|---|
| **CCP-1 Cooking** | Salmonella, *E. coli* O157, Campylobacter | poultry incl. **ground poultry**/mixed/egg ≥**74 °C** · ground beef-pork ≥**71 °C** · fish ≥**70 °C** core | cook to temp; probe slowest point | core temp · **every batch** · cook | Log 1 | keep cooking → re-probe; record |
| **CCP-2 Cooling** | *C. perfringens*, *B. cereus* outgrowth | **60→20 °C ≤2 h, 20→4 °C ≤4 h** (≤6 h); blast chiller | rapid two-stage chill | core temp at **2 h** + end · every cooked-to-chill batch · cook | Log 1 | not ≤20 °C by 2 h → reheat 74 °C + recool **once**, else **discard** |
| **CCP-3 Chilled/ROP hold + transport** | *Listeria*; *C. botulinum* toxin over time | general cold ≤**4 °C [BINDING]** · **ROP product < 3 °C** · ROP use-by **≤7 d** (Listeria Cat 1) · transit ≤4 °C **[BINDING]** | cold chain + dated discard-by label | fridge **2×/day** · label **every bag** · van **arrival temp** · lead/driver | Logs 2, 3, 4, 7 | over-temp/over-date → **discard**; repair/relocate |
| **CCP-4 Reheating** | survival / recontamination | ≥**74 °C** core within 2 h, **once** | reheat to temp, once only | core temp before service · every reheat · Rex cook | Log 1 | keep heating; 2nd reheat or >2 h → **discard** |
| **CCP-5 Hot-hold & service** | *C. perfringens*, *S. aureus* toxin | ≥**60 °C**, or time-as-control **≤4 h** then discard | hot-hold or timed service | hold temp at service + hourly · per service · server | Service line of Log 1 | <60 °C & <2 h → reheat 74 °C; else **discard** |
| **CCP-6 Allergen / anaphylactic** | allergen cross-contact / anaphylaxis | **zero cross-contact; 100 % anaphylactic plates verified** pre-service | DOOR routing + prep segregation + H&W ack | DOOR generate + visual prep check + ack · **every meal** · H&W/lead | **DOOR records (existing)** | re-route / separate alternative; **block service until verified** |

---

## Keeping it simple (concrete tactics)
- **One tap, not a clipboard.** The HUB capture (see `HACCP_MONITORING_RECORDS.md` §6) turns each COOK/COOL/HEAT/SEND chip into a temp/time entry — the log writes itself, time-stamped and attributed.
- **Let the label be the record.** Pre-printed vac-bag labels with the use-by **auto-dated from the cook day** make CCP-3 dating automatic and tamper-evident — no separate hold-time log.
- **Tick + one number.** Records are a checkbox and a temperature, never a paragraph.
- **Show the target, capture the actual.** The screen shows the recipe's expected cook temp; the cook records what the probe read. Out-of-limit highlights itself.
- **Exception logging where it's safe.** A continuous-logging blast chiller means staff confirm the *end* temp + that the 2 h checkpoint passed, rather than hand-logging the curve.
- **Reuse, don't recreate.** CCP-6 rides on DOOR's existing outputs; the fridge log is two readings, not hourly.
- **Paper works on day one.** Every log has a printable form so the system runs before any software lands (graceful degradation) — then the digital capture replaces the clipboard.

---

## What an auditor (DineSafe / PCP) will actually ask — and where we point
| The ask | We show |
|---|---|
| "Show me your food-safety plan." | The 5 HACCP docs (plan + hazards/CCPs + monitoring + per-dish determinations + this guide). |
| "Show me today's — and last week's — cooling log." | Log 1 (batch cook/cool/reheat). |
| "Your fridge temperatures?" | Log 2 (2×/day per unit). |
| "How do you know your thermometer is right?" | Log 5 (daily ice-point calibration). |
| "Show me a time something went out of limit and what you did." | Log 6 (corrective action + disposition). |
| "How do you protect an allergic/anaphylactic resident?" | DOOR plating sheet + anaphylactic list + H&W acknowledgement. |
| "Who checks that all this is being done?" | Weekly coordinator review sign-off. |
| "How long do you keep records?" | Retention policy *(≥1 yr — confirming via research)*. |

The through-line an auditor wants to see: **monitored → deviation caught → corrected → verified.** Our six logs + the review trail close that loop for every CCP.

---

*Working draft. Limit values sync from `HACCP_HAZARD_ANALYSIS.md` §4 (validated 2026-06-24 vs HC / O. Reg. 493/17 / FDA / FSA). Retention ≥1 yr is the working assumption — confirm with TPH. Part of the HACCP set — see the index in `HACCP_PRELIMINARY_HAZARD_ANALYSIS.md`.*
