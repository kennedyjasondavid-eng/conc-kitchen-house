# CONC HACCP — Preliminary Hazard Analysis (Executive Summary)

**Read-first front sheet.** A one-page orientation to CONC's food-safety hazard analysis — what the hazards are, why they matter, and the controls that hold them. The full worksheets live in the documents listed at the foot.
**Date:** 2026-06-24 · **Status: WORKING DRAFT.** Critical limits **validated 2026-06-24 against Health Canada / O. Reg. 493/17 / FDA Food Code / UK FSA-ACMSF** (established standards — a live regulatory-source fetch was blocked this session, so reconfirm against the cited sources). **Not yet a live plan:** the open items are direct TPH sign-off (especially the **ROP special-process / variance** question) and on-site flow confirmation.

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
| **3 — Chilled/ROP hold + transport** | PREP/FRIDGE/SEND | general cold ≤**4 °C [binding s.27]** · **ROP product < 3 °C** · **ROP use-by ≤7 d** (Listeria Cat 1) · transit ≤4 °C [binding] |
| **4 — Reheating** | HEAT | ≥**74 °C** core within 2 h, **once only** |
| **5 — Hot-hold & service** | service | ≥**60 °C**, or time-as-control **≤4 h** then discard |
| **6 — Allergen / anaphylactic** | PREP + plate | **Zero cross-contact to a flagged resident; 100 % of anaphylactic plates verified** pre-service |

## Key findings & decisions
- **The controls already exist — but only as instructions.** MISE cook-cards carry HACCP-correct method text (two-stage blast-chill, reheat-to-74 °C-once, cut-specific cook temps, ROP labelling). **What's missing is the *record*** — no probe readings are captured anywhere. Closing that gap is the build, not the procedure.
- **Cooling is compliant** (architect-confirmed): cook → blast-chill to <40 °C within 2 h → hold at fridge temp overnight → bag in the morning. "Cooled overnight" is refrigerated holding before bagging, not passive cooling.
- **ROP hold cut from 14 days → ≤7 days** at ≤4 °C — the safe no-barrier limit for a vulnerable population. The cook→serve schedule is kept inside the limit by an **automated verification flag**, not manual vigilance.
- **Allergen control (CCP-6) is CONC's most mature control** — already largely built in DOOR (exclude-array routing, auto anaphylactic list, red-flag + mandatory H&W acknowledgement). The HACCP task is to formalise it, not invent it.
- **Minor items:** ✓ fish cook temp **raised 155 → 158 °F (70 °C)** (Health Canada) on 2026-06-24; no documented transport-temperature spec; a few hold-day anomalies (a 27-day and some "?d" entries) to classify.

## Prerequisite programs (PRPs) — the assumed foundation
HACCP sits on a base of prerequisite programs (sanitation, pest control, supplier approval, personal hygiene, potable water, **thermometer calibration**, allergen segregation). Per CONC direction these are **assumed covered informally and/or by existing CONC administration (incl. OH&S)** and are **out of scope for this plan to author.** One honest caveat: OH&S is *worker* safety, not *food* safety — so the **food-specific PRPs (especially thermometer calibration, on which CCP monitoring directly depends, plus food-contact sanitation, supplier approval, and allergen segregation) should be confirmed to actually exist and be verifiable**, even though they're owned elsewhere. The HACCP plan should *reference* them; it need not *contain* them.

## What makes this "preliminary" — the gates to a live plan
1. **Step 5 — on-site flow verification** (walk Bloor + Rex + a live van run; time-stamp every hold/cool/transport leg).
2. **TPH sign-off** — limits are validated against the standards; the open regulatory question is whether the vacuum/ROP special process needs a **special-process approval / variance** (confirm directly with TPH — web sources were blocked this session).
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

*Working draft. Limits validated 2026-06-24 against Health Canada / O. Reg. 493/17 / FDA / FSA-ACMSF (established standards; reconfirm against the cited sources). Open TPH item: ROP special-process approval / variance.*
