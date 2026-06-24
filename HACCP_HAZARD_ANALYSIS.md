# CONC HACCP — Hazard Analysis & CCP Determination (Principles 1–3)

**Companion annex to `HACCP_PLAN_DRAFT.md`.**
**Date:** 2026-06-24 · **Status:** Working draft. Critical limits **validated against `HACCP_REGULATORY_FINDINGS.md`** (local-session research, 2026-06-24, quoting Health Canada / O. Reg. 493/17 / MOH 2019 / TPH / FDA / FSA). **Framing:** only cold ≤4 °C / hot ≥60 °C / in-transit ≤4 °C are binding (s. 27); every other limit is CONC's evidence-based standard under the **s. 26(2) performance requirement** (see §4). **Open:** TPH sign-off on the ROP special process + a citation second-pass (findings §8).
**Grounding:** Built from the live HOUSE apps — MISE/CODEX recipe data + generated cook-card methods (`SEQUENCE_TEMPLATES`), HUB production schedule (`hub_schedule.json`, FRIDGE/MOVES), DOOR routing/allergen logic. Direct quotes from those sources are marked.

---

## 0. Headline findings (read first)

1. **The thermal controls already exist — as cook-card instructions, not as records.** MISE generates HACCP-correct method text: two-stage blast-chill with a corrective action, reheat-to-74 °C-once, cut-specific cook temps, and an ROP use-by label. **What's missing is the *monitoring and record* layer** — no probe readings are captured, no cooling-checkpoint log exists, no temperature is stored in any data field. That is the gap between "we have a procedure" and "we have HACCP" (Principles 4 & 7).

2. **✓ Cooling: resolved (architect-confirmed workflow) — not a deviation.** The apparent gap between the cook-card "blast chill" and the schedule note "cooled overnight, vac seal morning" is terminology, not practice.
   - *Documented (MISE `HACCP_CHILL_BLAST`):* "Blast chill to below 40°F. Two-stage: 135→70°F in 2 hr, 70→41°F in 4 hr. Max 6 hr total. If not at 70°F by 2 hr mark — reheat to 165°F and restart." (+ `HACCP_CHILL_ICEBATH` fallback.)
   - **Actual workflow (confirmed):** a stew is cooked over a few hours, **blast-chilled to <40 °F (<4 °C) within 2 h**, then **held at fridge temperature (≤4 °C) overnight** and **vacuum-bagged the next morning.** This is compliant with CCP-2 — "overnight" is *refrigerated holding before the bagging step*, not passive ambient cooling; a blast chiller **is** in use (it simply isn't named in the HUB schedule text).
   - *Follows from the cook-day/bag-day split:* **date the ROP "use-by" from the cook/production day** (when the food became a TCS hazard), not the next-morning bagging day. The remaining CCP-2 work is purely to *record* the 2 h / 6 h checkpoint temperatures (Principle 4).

3. **⚠ ROP shelf-life is too long. This resolves your "bagged holding" question.** 53 recipes (24 %) are vacuum-sealed (`packaging:"vac"`) = Reduced-Oxygen Packaging. The system's current label (MISE `HACCP_BAG_LABEL`) is **"Use by 2 weeks… store at 41°F or below."** For ROP held at ≤4 °C **without a validated botulinum barrier**, 14 days exceeds the safe ceiling (see §4, CCP-3). **Recommended limit: ≤7 days at ≤4 °C** (production day = day 1) — see the decision and basis in §4. This brings the 14-day label and the 8-day Vegan Chilli hold into line.

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
| 7 | **Portioning & vacuum-packing** (PREP / ROP) — 53 `vac` recipes | B | Handling contamination into an **anaerobic** pack favouring **non-proteolytic *C. botulinum*** & *Listeria*; toxin over shelf life | **Y** | Botulinum toxin life-threatening + heat-stable; ROP is a recognised special process | Hygiene; pack already-chilled product; ≤4 °C; validated shelf-life + label (feeds CCP-3) | CCP-3 |
| 7 |  | P | Plastic/film fragments from bagging | N* | Low | Equipment checks; visual | PRP |
| 8 | **Chilled storage / hold** (FRIDGE) — P1 cold, P3 ROP | B | *Listeria* growth at refrigeration temps; **non-proteolytic *C. botulinum* toxin over an over-long ROP shelf life**; general growth if >4 °C | **Y** | Reheating does **not** destroy preformed toxins → no downstream control; HSP; **14-day label too long** | ≤4 °C continuous; **ROP use-by ≤7 d** (§4 CCP-3); FIFO; date-mark | **CCP-3** |
| 9 | **Loading & transport** (SEND — cold/hot/raw van legs) | B | Cold-chain break (cold loads) or hot-hold break (hot loads) → growth; cross-contamination raw↔RTE in shared van | **Y** | No transit-temp spec today; HSP | Insulated/refrigerated transport; depart ≤4 °C / ≥60 °C; **arrival probe check**; segregate raw | CCP-3 (cold) / CCP-5 (hot) |
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

> Note: P1 no-cook items have **no kill step**, so their safety rests almost entirely on PRPs (supplier, hygiene, no-bare-hand) **plus CCP-3** (cold hold). Histamine is held as a PRP pending a TPH ruling — some plans elevate it to a CCP at receiving.

---

## 4. Principle 3 — Critical Limits

Per CCP, with basis. **Framing rule** (validated 2026-06-24 — full citations in `HACCP_REGULATORY_FINDINGS.md`): **O. Reg. 493/17 binds only three numbers — cold-hold ≤4 °C, hot-hold ≥60 °C, and in-transit ≤4 °C (s. 27)**, marked **[BINDING s.27]** below. **Every other limit (cooking, cooling, reheating, shelf-life, ROP) is CONC's evidence-based standard adopted to satisfy the s. 26(2) performance requirement** — *"food processed in a manner that makes the food safe to eat"* — drawn from Health Canada / MOH 2019 / TPH / FDA / FSA. State them that way for audit (**not** "the regulation requires"). Ontario's defined term is **potentially hazardous food (PHF)**. Temperatures in °C with °F in parentheses; the ROP special-process status is the one item still to confirm directly with TPH.

### CCP-1 — Cooking (internal core temperature, held ≥15 s)
| Food | Critical limit | Basis / note |
|---|---|---|
| Poultry pieces/ground; stuffed; mixed/re-formed dishes; egg dishes for holding | **≥74 °C (165 °F)** *(whole birds 82 °C / 180 °F)* | Health Canada / O. Reg. 493/17. CONC cooks chicken to 195 °F for pulled texture — **compliant** (above min). |
| Ground meat (non-poultry) | **≥71 °C (160 °F)** | Health Canada |
| Whole-muscle beef/pork | **≥71 °C (160 °F)** Ontario *(FDA permits 63 °C/145 °F, 15 s)* | Reconcile to chosen authority; CONC ham 145 °F = cured/whole-muscle, document basis |
| Fish | **≥70 °C (158 °F)** Health Canada *(FDA 63 °C/145 °F)* | ✓ Validated. CONC cook card was 155 °F — **raised to 158 °F (70 °C)** on 2026-06-24 (`COOK_FISH` step text + basa-fillet prose) to meet the Health Canada value. |

### CCP-2 — Cooling (cook-chill, two-stage)
- **Critical limit:** **60 °C → 20 °C within 2 h, then 20 °C → 4 °C within the next 4 h (≤6 h total).** Matches O. Reg. 493/17 and CONC's `HACCP_CHILL_BLAST` (135→70→41 °F).
- **Documented corrective action (already in the cook card):** not at 20 °C/70 °F by 2 h → reheat to 74 °C/165 °F and re-cool **once**; second failure → discard.
- **Workflow confirmed (§0.2):** blast-chilled to <4 °C within 2 h, then refrigerated overnight, bagged next morning — compliant. Remaining CCP-2 work is to **record** the 2 h / 6 h checkpoint temperatures (Principle 4) and verify the blast chiller meets the targets under full load.

### CCP-3 — Chilled / ROP storage + cold transport
- **General cold-hold:** **≤4 °C continuous — [BINDING s. 27].**
- **ROP (vacuum-packed) product cold storage:** **< 3 °C** — *tighter than the general ≤4 °C* (TPH sous-vide / cook-chill guidance; controls non-proteolytic *C. botulinum*, which grows down to ~3.3 °C). [best-practice]
- **ROP / RTE use-by:** **≤ 7 days from the cook day (prep day = Day 1), stored < 3 °C, treated as *Listeria* Category 1** (the >5-day RTE line). Longer **only** with a validated barrier — a ≥90 °C·10 min-equivalent cook, **or** pH < 5.0 / aw < 0.97 / NaCl > 3.5%. (Basis: TPH / FDA §3-501.17 / FSA-ACMSF.) Replaces the old 14-day label; brings the 8-day Vegan Chilli within limit (move serve −1 day or validate a barrier). [best-practice]
- **ROP label (this *is* the CCP-3 dating record):** cook **date + time**, **discard-by date**, product identity. [TPH]
- **Frozen hold:** ≤ −18 °C; thaw under refrigeration (covers the 11-day "Shape & Freeze" patties — a *frozen*, not chilled, regime).
- **Transport (van):** **≤ 4 °C in transit — [BINDING s. 27]** (s. 27 names "transported"). Depart ≤4 °C; **arrival probe** ≤4 °C; raw segregated from RTE.
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

## 5. Open deviations & validation to-do (before go-live)

*Resolved during drafting: the cooling "blast-chill vs cooled overnight" question (§0.2) — compliant workflow confirmed by the architect. Fridge-capacity is out of scope for this pass at the architect's direction.*

*Regulatory validation (2026-06-24, local research → `HACCP_REGULATORY_FINDINGS.md`): limits validated; **only ≤4 °C / ≥60 °C / in-transit ≤4 °C are binding (s. 27)** — the rest are CONC's s. 26(2) evidence-based standards. Corrections applied: ground poultry 74 °C (was blanket 71); **ROP product cold storage < 3 °C** + Listeria Cat 1 + barrier conditions; ROP label fields; the s. 27(2)(a) 2 h prep excursion; HSP foods-to-avoid (CCP-6). **Caveat:** the research's adversarial citation second-pass did not run (API limits) — re-check quotes before final sign-off (findings §8).*

| # | Item | Action | Owner |
|---|---|---|---|
| 1 | **ROP special-process status** | Re-label (cook date/time + discard-by); reschedule the 8-day Chilli to ≤7 d. **Confirm with TPH** whether ROP/cook-chill needs pre-approval/variance or review-on-request, and the binding cold-storage target (< 3 °C vs ≤ 4 °C) — see the 7 TPH questions in `HACCP_REGULATORY_FINDINGS.md`. | Coordinator + TPH |
| 2 | ✓ **Fish cook temp — DONE** | Raised `COOK_FISH` step text + basa prose 155 → 158 °F (70 °C) on 2026-06-24 | — |
| 3 | **Transport temperature spec** | Insulated/refrigerated transport (≤4 °C in transit = binding s. 27) + arrival-probe log; confirm whether TPH expects in-transit logging | Logistics + TPH |
| 4 | **"?d" + 27 d / 10 d holds** | Classify each; assign definite limits | Coordinator |
| 5 | **No monitoring/records layer** | Build temp + time capture on COOK/COOL/HEAT/SEND (Principles 4 & 7); retention ≥1 yr + 7-day retained food sample (see record-keeping guide) | Systems owner |
| 6 | **Food handler — Toronto Ch. 545** | Add the City rule (certified supervisory handler in *each area* at all times) above the provincial s. 32 floor; confirm Ch. 545 §545-5G(17) still in force + an approved provider | Coordinator + TPH |
| 7 | **Recipe-hub ground-poultry temp** *(Jason-gated)* | Verify whether `conc-recipe-hub` encodes a ground-poultry cook temp at 71 °C; if so correct to 74 °C + re-baseline. **Do not auto-apply — architect's call.** | Jason |
| 8 | **Citation second-pass** | The research's adversarial-verification layer didn't run (API limits); re-check the `HACCP_REGULATORY_FINDINGS.md` quotes against primary sources before final sign-off (findings §8) | Coordinator |
| 9 | **Final TPH sign-off** | Obtain TPH sign-off on the plan, especially the ROP special process; carry the 7 questions in `HACCP_REGULATORY_FINDINGS.md` | TPH |

---

## 6. What comes next (Principles 4–7)

This annex closes **Principles 1–3** (hazards → CCPs → limits). Still to build: **P4** monitoring (who probes what, when — and where it's logged), **P5** corrective actions (the cooling reheat-restart is the model to generalise), **P6** verification (probe calibration, record review, periodic swab/audit), **P7** records (the temperature/time logs the system does not yet capture). The strongest move is to make the **HUB board** the live monitoring surface — its FRIDGE colour-coding and MOVES hold-classes are already proto-monitoring; add the temperatures and they become the HACCP record.

---

*Working draft. Critical limits validated 2026-06-24 against Health Canada / O. Reg. 493/17 / FDA Food Code / UK FSA-ACMSF (established standards; reconfirm against the cited sources — live fetch was blocked this session). Open TPH item: ROP special-process approval / variance.*
