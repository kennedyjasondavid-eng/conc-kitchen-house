# CONC HACCP — Hazard Analysis & CCP Determination (Principles 1–3)

**Companion annex to `HACCP_PLAN_DRAFT.md`.**
**Date:** 2026-06-24 · **Status:** Working draft. Critical limits **validated against `HACCP_REGULATORY_FINDINGS.md`** (local-session research, 2026-06-24, quoting Health Canada / O. Reg. 493/17 / MOH 2019 / TPH / FDA / FSA), with citation second-pass logged in `HACCP_CITATION_SECOND_PASS_2026-06-27.md`. **This is a *voluntary* HACCP plan** — a contract-differentiation asset, not a regulatory mandate; CONC is subject only to standard O. Reg. 493/17 inspection, with **no TPH special-process review for ROP** (architect-confirmed 2026-06-24). **Framing:** only cold ≤4 °C / hot ≥60 °C / in-transit ≤4 °C are binding (s. 27); every other limit is CONC's *voluntarily-adopted* standard on the s. 26(2) basis (see §4).
**Grounding:** Built from the live HOUSE apps — MISE/CODEX recipe data + generated cook-card methods (`SEQUENCE_TEMPLATES`), HUB production schedule (`hub_schedule.json`, FRIDGE/MOVES), DOOR routing/allergen logic. Direct quotes from those sources are marked.

---

## 0. Headline findings (read first)

1. **The thermal controls already exist — as cook-card instructions, not as records.** MISE generates HACCP-correct method text: two-stage blast-chill with a corrective action, reheat-to-74 °C-once, cut-specific cook temps, and an ROP use-by label. **What's missing is the *monitoring and record* layer** — no probe readings are captured, no cooling-checkpoint log exists, no temperature is stored in any data field. That is the gap between "we have a procedure" and "we have HACCP" (Principles 4 & 7).

2. **✓ Cooling: resolved (architect-confirmed workflow) — not a deviation.** The apparent gap between the cook-card "blast chill" and the schedule note "cooled overnight, vac seal morning" is terminology, not practice.
   - *Documented (MISE `HACCP_CHILL_BLAST`):* "Blast chill to below 40°F. Two-stage: 135→70°F in 2 hr, 70→41°F in 4 hr. Max 6 hr total. If not at 70°F by 2 hr mark — reheat to 165°F and restart." (+ `HACCP_CHILL_ICEBATH` fallback.)
   - **Actual workflow (confirmed):** a stew is cooked over a few hours, **blast-chilled to <40 °F (<4 °C) within 2 h**, then **held at fridge temperature (≤4 °C) overnight** and **vacuum-bagged the next morning.** This is compliant with CCP-2 — "overnight" is *refrigerated holding before the bagging step*, not passive ambient cooling; a blast chiller **is** in use (it simply isn't named in the HUB schedule text).
   - *Follows from the cook-day/bag-day split:* **date the ROP "use-by" from the cook/production day** (when the food became a TCS hazard), not the next-morning bagging day. The remaining CCP-2 work is purely to *record* the 2 h / 6 h checkpoint temperatures (Principle 4).

3. **⚠ ROP shelf-life was too long in the legacy method label. This resolves your "bagged holding" question.** 53 recipes (24 %) are vacuum-sealed (`packaging:"vac"`) = Reduced-Oxygen Packaging. The deployed HACCP card/model now uses the resolved limit: **≤7 days at ≤4 °C with a validated barrier** (production day = day 1) — see the decision and basis in §4. One older ordinary MISE cook-card fragment (`HACCP_BAG_LABEL`) still says **"Use by 2 weeks… store at 41°F or below"** and needs a future CODEX cleanup; until then, §4 and the HACCP card/model govern.

4. **Transport has no temperature spec.** Cold/hot/raw van legs (AM/PM runs, "no return leg") carry no documented cold-pack, insulation, or arrival-temperature check. Folded into CCP-3.

---

## 1. Methodology — how significance is scored

A hazard is **significant** (and must be controlled in the plan) based on **severity × likelihood**, with one CONC-specific rule:

- **Severity:** **H** = life-threatening / hospitalization (C. botulinum & S. aureus toxins, E. coli O157, L. monocytogenes, anaphylaxis); **M** = moderate self-limiting illness (C. perfringens, B. cereus, Campylobacter, norovirus); **L** = mild/nuisance.
- **Likelihood** with current controls in place: **H/M/L**.
- **🔺 Vulnerable-population rule:** because consumers are a **Highly Susceptible Population** (≈300 shelter residents — see plan Step 3), enteric-pathogen **severity is raised one band**. A hazard that is "moderate" for the general public is treated as "high" here. This pushes CONC toward the stricter end of every limit.
- **Significant if:** Severity H at any credible likelihood, **or** Severity M at likelihood ≥ M.

Each significant hazard then runs the **Codex decision tree** (§3) to decide **CCP vs prerequisite program (PRP)**.

---

## 2. Principle 1 — Hazard Analysis Worksheet

Hazard classes: **B** = biological, **C** = chemical (incl. allergens), **P** = physical. "Sig?" = significant after the §1 rule. Final column routes each to a **CCP** (§3) or a **PRP**.

| # | Process step | Cls | Hazard(s) | Sig? | Justification (with HSP rule) | Control measure | → |
|---|---|---|---|---|---|---|---|
| 1 | **Receiving** (raw meat/poultry/fish, produce, dairy, dry, frozen) | B | Pathogens already on raw proteins (Salmonella, Campylobacter, *E. coli* O157, *Listeria*); temperature-abused delivery | **Y** | High severity; raw animal proteins are expected carriers | Approved-supplier program; check delivery ≤4 °C (frozen solid); reject abused/damaged; logged | PRP (cook step CCP-1 covers survival for cooked streams) |
| 1 |  | C | Histamine/scombrotoxin on mishandled fish (heat-stable — cooking won't remove); undeclared allergen in a supplied ingredient | **Y** | Heat-stable → no downstream kill; allergen → HSP/anaphylaxis | Spec sheets + Certificates; cold-chain at receipt; supplier allergen statements | PRP + CCP-6 (allergen) |
| 1 |  | P | Bone fragments, packaging, metal, stones | N* | Low likelihood w/ specs | Supplier specs; visual check at receipt | PRP |
| 2 | **Dry / cold / frozen storage** | B | Growth from temp abuse; raw→RTE cross-contamination (*Listeria*) | **Y** | *Listeria* grows at ≤4 °C; HSP | ≤4 °C / ≤−18 °C frozen; raw stored below RTE; FIFO; thermometers | PRP |
| 2 |  | C | Cleaning-chemical contamination; allergen cross-contact in shared storage | Y | HSP/anaphylaxis | Segregated/labelled chemicals; sealed + separated allergens | PRP + CCP-6 |
| 3 | **Thawing** (PULL — frozen → thaw) | B | Surface pathogen growth if thawed in the danger zone (ambient) | **Y** | Schedule shows "thaw" pulls; ambient thaw is a common failure | Thaw under refrigeration ≤4 °C, or cook from frozen; never ambient | PRP (cook step CCP-1 covers survival) |
| 4 | **Cold prep / assembly** — P1 no-cook (salads, slaw, tofu, dressings; 66 `coldPrep`) | B | Growth + hand/board contamination during prep — **no downstream kill step** | **Y** | P1 has no cook; HSP; mayo/protein salads (Coronation, Ranch, Tuna) are TCS | Minimise danger-zone time; ≤4 °C; hand hygiene + **no bare-hand contact** with RTE; washed produce; clean/sanitised boards | PRP + CCP-3 (cold hold) |
| 4 |  | C | Allergen cross-contact during shared assembly | **Y** | HSP/anaphylaxis | Dedicated allergen-free prep zone/utensils; sequencing | CCP-6 |
| 5 | **Cooking** (COOK) — P2/P3 | B | Survival of vegetative pathogens (Salmonella, *E. coli* O157, Campylobacter, *Listeria*) if undercooked | **Y** | The primary kill step; high-severity organisms | Cook to internal-temp limits (§4 CCP-1); probe verify | **CCP-1** |
| 6 | **Cooling** (COOL / blast-chill) — P3 (`stew`, `beefStew`, `vegan`, `pork`, `bonelessChicken`, `tofu`…) | B | Germination & outgrowth of spore-formers surviving the cook — ***C. perfringens***, ***B. cereus*** — and toxin formation if cooling is slow | **Y** | Spores survive cooking; toxins (B. cereus emetic) are heat-stable → reheat won't save it; HSP | Two-stage ≤6 h blast-chill (§4 CCP-2) — workflow confirmed (§0.2); documented corrective action exists; **monitoring/records to be added** | **CCP-2** |
| 7 | **Portioning & vacuum-packing** (PREP / ROP) — 53 `vac` recipes | B | Handling contamination into an **anaerobic** pack favouring **non-proteolytic *C. botulinum*** & *Listeria*; toxin over shelf life | **Y** | Botulinum toxin life-threatening + heat-stable; ROP is a recognised higher-risk process | Hygiene; pack already-chilled product; ≤4 °C; validated shelf-life + label (feeds CCP-3) | CCP-3 |
| 7 |  | P | Plastic/film fragments from bagging | N* | Low | Equipment checks; visual | PRP |
| 8 | **Chilled storage / hold** (FRIDGE) — P1 cold, P3 ROP | B | *Listeria* growth at refrigeration temps; **non-proteolytic *C. botulinum* toxin over an over-long ROP shelf life**; general growth if >4 °C | **Y** | Reheating does **not** destroy preformed toxins → no downstream control; HSP; **14-day label too long** | ≤4 °C continuous; **ROP use-by ≤7 d** (§4 CCP-3); FIFO; date-mark | **CCP-3** |
| 9 | **Loading & transport** (SEND — cold/hot/raw van legs) | B | Cold-chain break (cold loads) or hot-hold break (hot loads) → growth; cross-contamination raw↔RTE in shared van | **Y** | No transit-temp spec today; HSP | Validated insulated/refrigerated transport (documented capability; no per-leg log — CONC decision); depart ≤4 °C / ≥60 °C; segregate raw | CCP-3 (cold) / CCP-5 (hot) |
| 10 | **Receipt at destination + cold hold** (Rex/LAN) | B | Growth if not promptly returned to ≤4 °C | **Y** | HSP; arrival is an unmonitored handoff | Probe on arrival; into ≤4 °C immediately; log | CCP-3 |
| 11 | **Reheating** (HEAT) — P3 | B | Survival of vegetative pathogens picked up during cold chain/handling; outgrowth if reheated slowly/partially | **Y** | Last kill step before service; HSP | Reheat ≥74 °C core within 2 h, **once only** (§4 CCP-4); probe verify | **CCP-4** |
| 12 | **Hot-holding & service window** (P2 hot-send + post-reheat) | B | *C. perfringens* / *S. aureus* (toxin) growth in the danger zone if held too long or too cool | **Y** | S. aureus toxin heat-stable; HSP; P2 has a cook→van→serve gap | Hold ≥60 °C, **or** time-as-control ≤4 h then discard (§4 CCP-5) | **CCP-5** |
| 13 | **Plating & service** (DOOR routing/plating) | C | **Allergen cross-contact / wrong meal to a flagged or anaphylactic resident** | **Y** | Life-threatening; the consumer is the last line — no step after | DOOR exclude-array routing; anaphylactic segregation + roommate co-routing; red-flag + H&W ack; correct plating sheet | **CCP-6** |
| 13 |  | B | Bare-hand contact / utensil contamination of RTE food at plating | **Y** | HSP | No bare-hand contact; clean utensils; ill-worker exclusion | PRP |
| 14 | **Leftover handling** (discard) | B | Re-service of temperature-abused / out-of-date food | **Y** | HSP | Discard policy; no re-chill of served food; date enforcement | PRP (+ CCP-3 dating) |

*\*Physical/low-likelihood hazards are controlled adequately by PRPs and are not significant enough to be CCPs, but remain on the worksheet for completeness.*

---

## 3. Principle 2 — CCP Determination (Codex decision tree)

Applied to each **significant** hazard. **Q1** Control measure exists? · **Q2** Is the step *designed* to eliminate/reduce the hazard to acceptable? (Yes→CCP) · **Q3** Could contamination/growth reach unacceptable levels here? · **Q4** Will a *later* step eliminate/reduce it? (Yes→not a CCP; No→CCP).

| Step / hazard | Q1 | Q2 | Q3 | Q4 | Result |
|---|---|---|---|---|---|
| Cooking — pathogen survival | Y | **Y** | — | — | **CCP-1** |
| Cooling — spore-former outgrowth/toxin | Y | **Y** | Y | No (reheat won't remove heat-stable toxin) | **CCP-2** |
| Chilled/ROP hold + transport — *Listeria* / botulinum toxin over shelf life | Y | N | **Y** | **No** (reheat ≠ toxin removal) | **CCP-3** |
| Reheating — vegetative survival/recontamination | Y | **Y** | — | — | **CCP-4** |
| Hot-hold & service window — danger-zone growth/toxin | Y | N | **Y** | **No** (service is next) | **CCP-5** |
| Allergen / anaphylactic routing | Y | **Y** | Y | **No** (consumer is next) | **CCP-6** |
| Receiving (pathogens, cooked streams) | Y | N | Y | Yes — cooking (CCP-1) | PRP |
| Thawing | Y | N | Y | Yes — cooking (CCP-1) | PRP |
| Storage / cross-contamination | Y | N | Y | Partly (cook for P3; **not** for P1 RTE) | PRP (P1 leans on CCP-3) |
| Histamine on fish | Y | N | Y | **No** (heat-stable) | PRP (supplier + cold chain) — verify w/ TPH whether CCP |

**Final CCP set (6):** CCP-1 Cooking · CCP-2 Cooling · CCP-3 Cold/ROP storage + transport · CCP-4 Reheating · CCP-5 Hot-holding & service window · CCP-6 Allergen/anaphylactic control.

> Note: P1 no-cook items have **no kill step**, so their safety rests almost entirely on PRPs (supplier, hygiene, no-bare-hand) **plus CCP-3** (cold hold). Histamine is held as a PRP — some plans elevate it to a CCP at receiving.

---

## 4. Principle 3 — Critical Limits

Per CCP, with basis. **Framing rule** (validated 2026-06-24 — full citations in `HACCP_REGULATORY_FINDINGS.md`): **O. Reg. 493/17 binds only three numbers — cold-hold ≤4 °C, hot-hold ≥60 °C, and in-transit ≤4 °C (s. 27)**, marked **[BINDING s.27]** below. **Every other limit (cooking, cooling, reheating, shelf-life, ROP) is CONC's evidence-based standard adopted to satisfy the s. 26(2) performance requirement** — *"food processed in a manner that makes the food safe to eat"* — drawn from Health Canada / MOH 2019 / TPH / FDA / FSA. State them that way for audit (**not** "the regulation requires"). Ontario's defined term is **potentially hazardous food (PHF)**. Temperatures in °C with °F in parentheses. (This is a *voluntary* plan — standard inspection only — so there is no TPH special-process gate to clear.)

### CCP-1 — Cooking (internal core temperature, held ≥15 s)
| Food | Critical limit | Basis / note |
|---|---|---|
| Poultry pieces/ground; stuffed; mixed/re-formed dishes; egg dishes for holding | **≥74 °C (165 °F)** *(whole birds 82 °C / 180 °F)* | Health Canada / O. Reg. 493/17. CONC cooks chicken to 195 °F for pulled texture — **compliant** (above min). |
| Ground meat (non-poultry) | **≥71 °C (160 °F)** | Health Canada |
| Whole-muscle beef/pork | **≥71 °C (160 °F)** Ontario *(FDA permits 63 °C/145 °F, 15 s)* | Reconcile to chosen authority; CONC ham 145 °F = cured/whole-muscle, document basis |
| Fish | **≥70 °C (158 °F)** Health Canada *(FDA 63 °C/145 °F)* | ✓ Validated. CONC cook card was 155 °F — **raised to 158 °F (70 °C)** on 2026-06-24 (`COOK_FISH` step text + basa-fillet prose) to meet the Health Canada value. |
| **ROP items — botulinum-barrier cook** | **≥90 °C / 10-min-equivalent core** (default) | Items that will be vacuum-packed and cold-held rely on this validated cook as their *C. botulinum* barrier — the basis for the ≤7-day shelf life (CCP-3) — **unless** the item qualifies for a documented formulation barrier (pH < 5.0 / aw < 0.97 / NaCl > 3.5%). A per-recipe determination. [voluntary cook-chill standard, 2026-06-24] |

### CCP-2 — Cooling (cook-chill, two-stage)
- **Critical limit:** **60 °C → 20 °C within 2 h, then 20 °C → 4 °C within the next 4 h (≤6 h total).** Matches O. Reg. 493/17 and CONC's `HACCP_CHILL_BLAST` (135→70→41 °F).
- **Documented corrective action (already in the cook card):** not at 20 °C/70 °F by 2 h → reheat to 74 °C/165 °F and re-cool **once**; second failure → discard.
- **Workflow confirmed (§0.2):** blast-chilled to <4 °C within 2 h, then refrigerated overnight, bagged next morning — compliant. Remaining CCP-2 work is to **record** the 2 h / 6 h checkpoint temperatures (Principle 4) and verify the blast chiller meets the targets under full load.

### CCP-3 — Chilled / ROP storage + cold transport
- **General cold-hold:** **≤4 °C continuous — [BINDING s. 27].**
- **ROP (vacuum-packed) product cold storage:** **≤ 4 °C** (the s. 27 floor). CONC's chosen *C. botulinum* control is a **validated barrier, not sub-3 °C storage** (architect decision 2026-06-24). [voluntary]
- **ROP / RTE use-by:** **≤ 7 days from the cook day (prep day = Day 1), at ≤ 4 °C, treated as *Listeria* Category 1** (the >5-day RTE line). **The ≤7-day shelf life is justified by a validated botulinum barrier:** by default a **≥90 °C·10 min-equivalent core cook** (see CCP-1), **or** a documented **formulation barrier (pH < 5.0 / aw < 0.97 / NaCl > 3.5%)** for items that qualify — a per-recipe call. (Basis: TPH / FDA §3-501.17 / FSA-ACMSF.) Replaces the old 14-day label; brings the 8-day Vegan Chilli within limit (move serve −1 day). [voluntary]
- **ROP label (this *is* the CCP-3 dating record):** cook **date + time**, **discard-by date**, product identity. [TPH]
- **Frozen hold:** ≤ −18 °C; thaw under refrigeration (covers the 11-day "Shape & Freeze" patties — a *frozen*, not chilled, regime).
- **Transport (van):** **≤ 4 °C in transit — [BINDING s. 27]** (s. 27 names "transported"). Control = **validated insulated/refrigerated transport** (documented capability); **no per-leg probe/log** (CONC decision 2026-06-24); raw segregated from RTE.
- **TPH review:** there is **no approval form**, but a PHI can require CONC to demonstrate a **documented, validated cook-chill / ROP plan** under s. 26 — confirm directly (see §5 + the TPH questions in `HACCP_REGULATORY_FINDINGS.md`).
- **⚠ Items to reconcile:** the **27-day "Chickpea Shakshuka"** and **10-day "Green Seasoning/Epis"** holds (verify whether frozen, high-acid sauce, or a 4-week cycle-projection artifact); the **9 ambiguous "?d"** salad holds (assign a definite ≤-day limit).

### CCP-4 — Reheating (for hot service)
- **Critical limit:** **≥74 °C (165 °F) core within 2 h, reheated once only.** [best-practice — Ontario silent; HC / MOH / FDA §3-403.11.] Matches CONC `HACCP_REHEAT` ("Combi steam 350 °F… 165 °F core within 2 hours… never reheat more than once"). Probe before service.

### CCP-5 — Hot-holding & service window
- **Critical limit:** hot food held **≥60 °C (140 °F) — [BINDING s. 27]**; **or** time-as-public-health-control **≤4 h cumulative** then discard. **Danger zone 4–60 °C; the only lawful excursion is the ≤2 h prep window (s. 27(2)(a)).** P2 "hot-send" cook→service must fit inside this (define clock times for the AM/PM van runs — currently only "~2:00 / AM / PM").

### CCP-6 — Allergen / anaphylactic control
- **Critical limit (zero-tolerance):** **no allergen cross-contact reaches a flagged resident; 100 % of anaphylactic plates verified against the DOOR anaphylactic list before service.**
- Enforced by: DOOR exclude-array routing (resident allergen tags vs meal flags); anaphylactic residents + roommates co-routed to the separate Anaphylactic Alternative; red flag + **explicit H&W acknowledgement before generation/service**; dedicated allergen-free prep (separate utensils/surfaces/sequencing); no last-minute substitution without re-running the check.
- This is CONC's most mature existing control — it is largely **built in DOOR already**; the HACCP step is to *formalise it as a CCP with monitoring and records.*
- **Highly-susceptible-population foods-to-avoid (Health Canada, immunocompromised — Mar 2025):** no non-dried deli meats unless reheated to steaming; hot dogs cooked to 74 °C; no raw/undercooked egg or meat; no raw sprouts; no unpasteurized dairy/juice; avoid soft & blue cheeses (even pasteurized); no refrigerated pâté / smoked seafood. Screen the menu against this list. [best-practice]

---

## 5. Open deviations & validation to-do (before live records rollout)

*Resolved during drafting: the cooling "blast-chill vs cooled overnight" question (§0.2) — compliant workflow confirmed by the architect. Fridge-capacity is out of scope for this pass at the architect's direction.*

*Regulatory validation (2026-06-24, local research → `HACCP_REGULATORY_FINDINGS.md`; second pass → `HACCP_CITATION_SECOND_PASS_2026-06-27.md`): limits validated; **only ≤4 °C / ≥60 °C / in-transit ≤4 °C are binding (s. 27)** — the rest are CONC's voluntarily-adopted standards. **This is a voluntary HACCP plan** (a contract-differentiation asset); CONC is subject only to standard O. Reg. 493/17 inspection, with **no TPH special-process review for ROP** (architect-confirmed). Corrections applied: ground poultry 74 °C; ROP at **≤4 °C + a validated botulinum barrier**; ROP label fields; the s. 27(2)(a) 2 h prep excursion; HSP foods-to-avoid (CCP-6).*

*Architect decisions (2026-06-24, TPH question series): **(1)** HACCP is **voluntary**, standard inspection only; **(2)** ROP cold storage **≤4 °C + validated barrier** (not <3 °C); **(3)** barrier = **heat ≥90 °C/10-min-equiv by default**, formulation (pH<5.0 / aw<0.97 / NaCl>3.5%) where an item qualifies; **(4)** cure/smoke/ferment **planned** → s. 34 MOH/PHI-approved written procedure required **before launch**; **(5)** transport — **no per-leg logging**, rely on validated equipment; **(6)** record retention **2 years**; **(7)** food-handler coverage in place; binding floor is O. Reg. 493/17 s. 32, while each-area coverage is CONC practice unless TPH confirms otherwise.*

| # | Item | Action | Owner |
|---|---|---|---|
| 1 | ✓ **ROP pathway — RESOLVED** | Voluntary; no TPH special-process review. ROP cold **≤4 °C + validated barrier**; HACCP card/model deployed with **≤7 d** shelf-life; re-label ordinary cook-card snippets to cook date/time + discard-by where still stale | Coordinator |
| 2 | ✓ **Fish cook temp — DONE** | Raised `COOK_FISH` step text + basa prose 155 → 158 °F (70 °C) on 2026-06-24 | — |
| 3 | ✓ **Transport — RESOLVED** | Validated insulated/refrigerated transport (≤4 °C in transit, binding s. 27); **no per-leg log** — rely on documented equipment capability | Logistics |
| 4 | **"?d" + 27 d / 10 d holds** | Classify each; assign definite limits | Coordinator |
| 5 | **Monitoring/records layer** | Build temp + time capture on COOK/COOL/HEAT/SEND (Principles 4 & 7); **2-year** retention + 7-day retained food sample | Systems owner |
| 6 | ✓ **Food handler — s. 32 floor confirmed** | Ontario requires a certified food handler or supervisor on premises during every operating hour. Current Ch. 545 does **not** carry the old each-area food-handler wording; each-area coverage remains CONC practice unless TPH confirms otherwise. Confirm current accepted provider before training. | Coordinator |
| 7 | ✓ **Ground-poultry cook temp — DONE** | Verified: no wrong 71 °C was encoded (the shared ground-meat step was texture-only, "until browned"). Added an explicit **71 °C/160 °F (74 °C/165 °F for poultry) — verify with thermometer** target to `COOK_GROUND` on 2026-06-24 (9 ground-meat dishes incl. Pad Krapow; re-baselined). | — |
| 8 | ✓ **Citation second-pass — DONE** | Logged in `HACCP_CITATION_SECOND_PASS_2026-06-27.md`: s.27, s.34, current Ch. 545, FDA sections, and FSA barrier evidence checked; `<3 °C` retained only as superseded/advisory citation context | — |
| 9 | **s. 34 — FUTURE process (cure/smoke/ferment)** | Planned, not current. Before launch: build the process's hazards + critical limits (nitrite / pH / aw / time-temp) as an **MOH/PHI-approved written procedure (binding)** and produce only once approved | Coordinator + PHI |
| 10 | **CODEX legacy bag-label snippet** | `CONC_Recipe_Data.js::HACCP_BAG_LABEL` still says `"Use by" date (2 weeks)`. Future CODEX cleanup should align it to the locked ROP limit (`≤7 d`, cook date/time, discard-by, validated barrier) while keeping public feeds stable. | Systems owner |

---

## 6. What comes next (Principles 4–7)

This annex closes **Principles 1–3** (hazards → CCPs → limits). Still to build: **P4** monitoring (who probes what, when — and where it's logged), **P5** corrective actions (the cooling reheat-restart is the model to generalise), **P6** verification (probe calibration, record review, periodic swab/audit), **P7** records (the temperature/time logs the system does not yet capture). The strongest move is to make the **HUB board** the live monitoring surface — its FRIDGE colour-coding and MOVES hold-classes are already proto-monitoring; add the temperatures and they become the HACCP record.

---

*Working draft — **voluntary** HACCP plan (contract-differentiation; standard O. Reg. 493/17 inspection only). Limits validated 2026-06-24 against Health Canada / O. Reg. 493/17 / FDA / FSA-ACMSF (see `HACCP_REGULATORY_FINDINGS.md`); citation second-pass logged 2026-06-27 (`HACCP_CITATION_SECOND_PASS_2026-06-27.md`).*
