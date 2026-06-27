# CONC HACCP — Preliminary Hazard Analysis (Executive Summary)

**Read-first front sheet.** A one-page orientation to CONC's food-safety hazard analysis — what the hazards are, why they matter, and the controls that hold them. The full worksheets live in the documents listed at the foot.
**Date:** 2026-06-24 · **Status: WORKING DRAFT.** Critical limits **validated against `HACCP_REGULATORY_FINDINGS.md`** (2026-06-24; Health Canada / O. Reg. 493/17 / MOH / TPH / FDA / FSA), with citation second-pass logged in `HACCP_CITATION_SECOND_PASS_2026-06-27.md`. **This is a *voluntary* HACCP plan** — a contract-differentiation asset, not a regulatory mandate; CONC is subject only to standard O. Reg. 493/17 inspection, with **no TPH special-process review for ROP** (architect-confirmed). **Open:** on-site flow confirmation and any PHI classification guidance CONC chooses to request.

---

## The operation in one breath
CONC runs a **multi-site cook-chill shelter-catering** operation: two kitchens (**Bloor** produces; **Rexdale** produces + serves) feeding **~300 residents** across Bloor, Rexdale & Lansdowne, from **224 recipes** on a 28-day cycle in four streams (regular / vegan / halal / vegan-protein). Because per-recipe plans are impossible at that scale, the analysis uses the **process approach** — every dish falls into one of three flows by how many times it crosses the danger zone (4–60 °C):

- **P1 — No-cook / cold** (salads, dressings, assembled tofu): no kill step.
- **P2 — Same-day cook-serve** (Rex day-of cooks; hot van loads): one pass.
- **P3 — Cook → chill → hold → transport → reheat → serve** (the high-risk majority): multiple passes, multi-day chilled holds, an inter-site cold chain.

**Why the risk tier is high:** the consumers are a **highly susceptible population** — shelter residents with elevated rates of chronic illness and immunocompromise. In this analysis that **raises every enteric-pathogen severity one band**, pushing CONC to the stricter end of each limit. The kitchen is the **last line of defense** — meals are ready-to-eat, consumed as served, with no consumer cook step.

## The hazard picture — what drives the plan
Four hazard families account for nearly all the risk:
1. **Spore-formers surviving the cook** (*C. perfringens*, *B. cereus*) that outgrow if cooling is slow → **controlled at cooling**.
2. **Growth + toxin on chilled/ROP hold over time** (*Listeria*; non-proteolytic *C. botulinum* in vacuum packs) — **toxins are heat-stable, so reheating cannot undo them** → controlled by cold-chain + a bounded shelf life.
3. **Vegetative pathogens** (*Salmonella*, *E. coli* O157, *Campylobacter*) → controlled at **cooking and reheating** (the kill steps).
4. **Allergen cross-contact / anaphylaxis** at plating → controlled by routing + segregation (a chemical hazard treated as life-threatening here).

## The six Critical Control Points (at a glance)
| CCP | Step | Critical limit *(validated vs HC / O. Reg. 493/17 / FDA / FSA)* |
|---|---|---|
| **1 — Cooking** | COOK | Core ≥**74 °C** poultry incl. ground poultry/mixed/egg · ≥**71 °C** ground beef-pork & whole-muscle · ≥**70 °C** fish |
| **2 — Cooling** | COOL | **60→20 °C ≤2 h, 20→4 °C ≤4 h** (≤6 h); blast chiller |
| **3 — Chilled/ROP hold + transport** | PREP/FRIDGE/SEND | cold ≤**4 °C [binding s.27]** · **ROP ≤4 °C + validated barrier** (≥90 °C/10-min cook, or pH/aw/salt) · **use-by ≤7 d** (Listeria Cat 1) · transit ≤4 °C [binding] |
| **4 — Reheating** | HEAT | ≥**74 °C** core within 2 h, **once only** |
| **5 — Hot-hold & service** | service | ≥**60 °C**, or time-as-control **≤4 h** then discard |
| **6 — Allergen / anaphylactic** | PREP + plate | **Zero cross-contact to a flagged resident; 100 % of anaphylactic plates verified** pre-service |

## Key findings & decisions
- **The controls mostly exist as instructions; the record is still missing.** MISE/CODEX now carries the deployed per-dish HACCP card/model beside the Cook's Card, with corrected fish, ground-poultry, and ROP limits. **What's missing is the *record*** — no probe readings are captured anywhere. One legacy ordinary cook-card fragment still needs cleanup: `HACCP_BAG_LABEL` says `"Use by" date (2 weeks)` even though the HACCP card/model and plan now govern ROP at **≤7 days @ ≤4 °C + validated barrier**.
- **Cooling is compliant** (architect-confirmed): cook → blast-chill to <40 °C within 2 h → hold at fridge temp overnight → bag in the morning. "Cooled overnight" is refrigerated holding before bagging, not passive cooling.
- **ROP hold cut from 14 days → ≤7 days** at ≤4 °C **with a validated barrier** (90 °C/10-min cook by default, or documented formulation barrier). The HACCP card/model is live with this limit; the remaining CODEX cleanup is to align the older generated method-label snippet.
- **Allergen control (CCP-6) is CONC's most mature control** — already largely built in DOOR (exclude-array routing, auto anaphylactic list, red-flag + mandatory H&W acknowledgement). The HACCP task is to formalise it, not invent it.
- **Minor items:** ✓ fish cook temp **raised 155 → 158 °F (70 °C)** (Health Canada) on 2026-06-24; no documented transport-temperature spec; a few hold-day anomalies (a 27-day and some "?d" entries) to classify.

## Prerequisite programs (PRPs) — the assumed foundation
HACCP sits on a base of prerequisite programs (sanitation, pest control, supplier approval, personal hygiene, potable water, **thermometer calibration**, allergen segregation). Per CONC direction these are **assumed covered informally and/or by existing CONC administration (incl. OH&S)** and are **out of scope for this plan to author.** One honest caveat: OH&S is *worker* safety, not *food* safety — so the **food-specific PRPs (especially thermometer calibration, on which CCP monitoring directly depends, plus food-contact sanitation, supplier approval, and allergen segregation) should be confirmed to actually exist and be verifiable**, even though they're owned elsewhere. The HACCP plan should *reference* them; it need not *contain* them.

## What makes this "preliminary" — the gates to a live plan
1. **Step 5 — on-site flow verification** (walk Bloor + Rex + a live van run; time-stamp every hold/cool/transport leg).
2. **Voluntary plan** — no TPH special-process approval is required for ROP (architect-confirmed); CONC runs standard O. Reg. 493/17 inspection, and the plan is a contract-differentiation asset. *(Future: cure/smoke/ferment would trigger a binding s. 34 MOH/PHI-approved written procedure.)*
3. **Equipment-under-load** — confirm the blast chiller hits the 2 h / 6 h targets at full batch size.
4. **Build the monitoring + records layer** — the temperature-capture design that turns correct procedures into provable records.

---

### Document set
| Document | Role |
|---|---|
| **`HACCP_PRELIMINARY_HAZARD_ANALYSIS.md`** *(this)* | Read-first executive summary |
| `HACCP_PLAN_DRAFT.md` | The plan spine — preliminary steps 1–5, flow diagrams, scope/start-end points |
| `HACCP_HAZARD_ANALYSIS.md` | Principles 1–3 — full hazard worksheet, CCP determination, critical limits |
| `HACCP_MONITORING_RECORDS.md` | Principles 4–7 — monitoring, corrective actions, verification, records + the capture schema |
| `HACCP_CCP_DECISION_TREE.md` | Per-dish CCP-vs-CP determinations across the live menu (generated from MISE) |
| `HACCP_CITATION_SECOND_PASS_2026-06-27.md` | Dated citation audit: confirmed claims, superseded `<3 °C` context, and cleared source checks |

*Working draft — **voluntary** HACCP plan (contract-differentiation; standard inspection only). Limits validated 2026-06-24 (see `HACCP_REGULATORY_FINDINGS.md`) and second-pass logged 2026-06-27 (`HACCP_CITATION_SECOND_PASS_2026-06-27.md`).*
