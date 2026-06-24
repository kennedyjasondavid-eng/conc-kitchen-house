# CONC HACCP — Hazard Analysis & CCP Determination (Principles 1–3)

**Companion annex to `HACCP_PLAN_DRAFT.md`.**
**Date:** 2026-06-24 · **Status:** Working draft for validation with Toronto Public Health (TPH). All critical limits are standard Health Canada / Ontario Reg. 493/17 / FDA Food Code / UK FSA references **to be confirmed and validated on-site** before the plan goes live.
**Grounding:** Built from the live HOUSE apps — MISE/CODEX recipe data + generated cook-card methods (`SEQUENCE_TEMPLATES`), HUB production schedule (`hub_schedule.json`, FRIDGE/MOVES), DOOR routing/allergen logic. Direct quotes from those sources are marked.

---

## 0. Headline findings (read first)

1. **The thermal controls already exist — as cook-card instructions, not as records.** MISE generates HACCP-correct method text: two-stage blast-chill with a corrective action, reheat-to-74 °C-once, cut-specific cook temps, and an ROP use-by label. **What's missing is the *monitoring and record* layer** — no probe readings are captured, no cooling-checkpoint log exists, no temperature is stored in any data field. That is the gap between "we have a procedure" and "we have HACCP" (Principles 4 & 7).

2. **⚠ Cooling: documented procedure conflicts with scheduled practice — must verify on-site.**
   - *Documented (MISE `HACCP_CHILL_BLAST`):* "Blast chill to below 40°F. Two-stage: 135→70°F in 2 hr, 70→41°F in 4 hr. Max 6 hr total. If not at 70°F by 2 hr mark — reheat to 165°F and restart." (+ `HACCP_CHILL_ICEBATH` fallback.)
   - *Scheduled (HUB `hub_schedule.json` notes):* "Next-day bag (stew — **cooled overnight**, vac seal morning)."
   - These cannot both be the literal truth for the same item. Either "cooled overnight" means *blast-chilled to ≤4 °C, then held chilled overnight and bagged in the morning* (compliant), or it means *left to cool passively overnight then bagged* (a critical 6 h-limit failure → spore-former outgrowth). **The difference is the entire cooling CCP.** No blast-chiller is referenced anywhere in HUB. Resolve at Step 5 (on-site flow verification); until then, treat as a potential critical deviation and design CCP-2 monitoring to catch exactly this.

3. **⚠ ROP shelf-life is too long. This resolves your "bagged holding" question.** 53 recipes (24 %) are vacuum-sealed (`packaging:"vac"`) = Reduced-Oxygen Packaging. The system's current label (MISE `HACCP_BAG_LABEL`) is **"Use by 2 weeks… store at 41°F or below."** For ROP held at ≤4 °C **without a validated botulinum barrier**, 14 days exceeds the safe ceiling (see §4, CCP-3). **Recommended limit: ≤7 days at ≤4 °C** (production day = day 1) — see the decision and basis in §4. This brings the 14-day label and the 8-day Vegan Chilli hold into line.

4. **Cold-chain capacity is a live risk.** Bloor's fridge runs **134–159 % over its 22u capacity** in the schedule. An over-packed refrigerator cannot hold ≤4 °C or cool product on schedule — this directly threatens CCP-2 and CCP-3 and is an immediate corrective-action trigger.

5. **Transport has no temperature spec.** Cold/hot/raw van legs (AM/PM runs, "no return leg") carry no documented cold-pack, insulation, or arrival-temperature check. Folded into CCP-3.

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
| 2 | **Dry / cold / frozen storage** | B | Growth from temp abuse; raw→RTE cross-contamination (*Listeria*); over-capacity defeating ≤4 °C (**Bloor 134–159 % over**) | **Y** | *Listeria* grows at ≤4 °C; HSP; over-capacity is observed, not hypothetical | ≤4 °C / ≤−18 °C frozen; raw stored below RTE; FIFO; **fix Bloor capacity**; thermometers | PRP (capacity feeds CCP-3) |
| 2 |  | C | Cleaning-chemical contamination; allergen cross-contact in shared storage | Y | HSP/anaphylaxis | Segregated/labelled chemicals; sealed + separated allergens | PRP + CCP-6 |
| 3 | **Thawing** (PULL — frozen → thaw) | B | Surface pathogen growth if thawed in the danger zone (ambient) | **Y** | Schedule shows "thaw" pulls; ambient thaw is a common failure | Thaw under refrigeration ≤4 °C, or cook from frozen; never ambient | PRP (cook step CCP-1 covers survival) |
| 4 | **Cold prep / assembly** — P1 no-cook (salads, slaw, tofu, dressings; 66 `coldPrep`) | B | Growth + hand/board contamination during prep — **no downstream kill step** | **Y** | P1 has no cook; HSP; mayo/protein salads (Coronation, Ranch, Tuna) are TCS | Minimise danger-zone time; ≤4 °C; hand hygiene + **no bare-hand contact** with RTE; washed produce; clean/sanitised boards | PRP + CCP-3 (cold hold) |
| 4 |  | C | Allergen cross-contact during shared assembly | **Y** | HSP/anaphylaxis | Dedicated allergen-free prep zone/utensils; sequencing | CCP-6 |
| 5 | **Cooking** (COOK) — P2/P3 | B | Survival of vegetative pathogens (Salmonella, *E. coli* O157, Campylobacter, *Listeria*) if undercooked | **Y** | The primary kill step; high-severity organisms | Cook to internal-temp limits (§4 CCP-1); probe verify | **CCP-1** |
| 6 | **Cooling** (COOL / blast-chill) — P3 (`stew`, `beefStew`, `vegan`, `pork`, `bonelessChicken`, `tofu`…) | B | Germination & outgrowth of spore-formers surviving the cook — ***C. perfringens***, ***B. cereus*** — and toxin formation if cooling is slow | **Y** | Spores survive cooking; toxins (B. cereus emetic) are heat-stable → reheat won't save it; HSP. **Procedure-vs-practice conflict (see §0.2)** | Two-stage ≤6 h blast-chill (§4 CCP-2); documented corrective action exists; **monitoring/records to be added** | **CCP-2** |
| 7 | **Portioning & vacuum-packing** (PREP / ROP) — 53 `vac` recipes | B | Handling contamination into an **anaerobic** pack favouring **non-proteolytic *C. botulinum*** & *Listeria*; toxin over shelf life | **Y** | Botulinum toxin life-threatening + heat-stable; ROP is a recognised special process | Hygiene; pack already-chilled product; ≤4 °C; validated shelf-life + label (feeds CCP-3) | CCP-3 |
| 7 |  | P | Plastic/film fragments from bagging | N* | Low | Equipment checks; visual | PRP |
| 8 | **Chilled storage / hold** (FRIDGE) — P1 cold, P3 ROP | B | *Listeria* growth at refrigeration temps; **non-proteolytic *C. botulinum* toxin over an over-long ROP shelf life**; general growth if >4 °C | **Y** | Reheating does **not** destroy preformed toxins → no downstream control; HSP; **14-day label too long** | ≤4 °C continuous; **ROP use-by ≤7 d** (§4 CCP-3); FIFO; date-mark; capacity control | **CCP-3** |
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
| Storage / cross-contamination / capacity | Y | N | Y | Partly (cook for P3; **not** for P1 RTE) | PRP (P1 leans on CCP-3) |
| Histamine on fish | Y | N | Y | **No** (heat-stable) | PRP (supplier + cold chain) — verify w/ TPH whether CCP |

**Final CCP set (6):** CCP-1 Cooking · CCP-2 Cooling · CCP-3 Cold/ROP storage + transport · CCP-4 Reheating · CCP-5 Hot-holding & service window · CCP-6 Allergen/anaphylactic control.

> Note: P1 no-cook items have **no kill step**, so their safety rests almost entirely on PRPs (supplier, hygiene, no-bare-hand) **plus CCP-3** (cold hold). Histamine is held as a PRP pending a TPH ruling — some plans elevate it to a CCP at receiving.

---

## 4. Principle 3 — Critical Limits

Per CCP, with basis. **All pending TPH validation.** Temperatures given in °C (Ontario/Health Canada) with °F (FDA / CONC cook cards) in parentheses.

### CCP-1 — Cooking (internal core temperature, held ≥15 s)
| Food | Critical limit | Basis / note |
|---|---|---|
| Poultry; stuffed; mixed/re-formed dishes; egg dishes for holding | **≥74 °C (165 °F)** | Health Canada / O. Reg. 493/17. CONC cooks chicken to 195 °F for pulled texture — **compliant** (above min). |
| Ground meat (non-poultry) | **≥71 °C (160 °F)** | Health Canada |
| Whole-muscle beef/pork | **≥71 °C (160 °F)** Ontario *(FDA permits 63 °C/145 °F, 15 s)* | Reconcile to chosen authority; CONC ham 145 °F = cured/whole-muscle, document basis |
| Fish | **≥70 °C (158 °F)** Health Canada *(FDA 63 °C/145 °F)* | ⚠ CONC cook card uses **155 °F** for fish — *below* the Health Canada 158 °F target. Raise to 158 °F or document the FDA 145 °F basis with TPH. |

### CCP-2 — Cooling (cook-chill, two-stage)
- **Critical limit:** **60 °C → 20 °C within 2 h, then 20 °C → 4 °C within the next 4 h (≤6 h total).** Matches O. Reg. 493/17 and CONC's `HACCP_CHILL_BLAST` (135→70→41 °F).
- **Documented corrective action (already in the cook card):** not at 20 °C/70 °F by 2 h → reheat to 74 °C/165 °F and re-cool **once**; second failure → discard.
- **⚠ Validation gate:** confirm a **blast chiller (or validated ice-bath)** actually achieves this — and resolve the "cooled overnight" schedule note (§0.2). Passive/ambient overnight cooling **fails** this limit.

### CCP-3 — Chilled / ROP storage + cold transport
- **Cold-hold temperature:** **≤4 °C continuous** (O. Reg. 493/17). *Tightens CONC's current "≤41 °F/5 °C" label by 1 °C.*
- **ROP (vacuum-pack) refrigerated shelf life — the bagged-holding decision:** **≤7 days, production day = day 1, at ≤4 °C, with no additional barrier.**
  - *Basis:* FDA Food Code RTE date-marking caps in-house RTE TCS at 7 d @ ≤5 °C; the UK FSA/ACMSF botulinum rule caps vacuum/MAP chilled food at ~10 d without an additional control; non-proteolytic *C. botulinum* grows down to ~3.3 °C. 7 d @ ≤4 °C sits safely inside both and suits an HSP.
  - *Effect:* **replaces the current 14-day label**; brings the 8-day Vegan Chilli to within limit (move serve −1 day, or validate a barrier).
  - *To hold longer than 7 d:* requires a **validated botulinum barrier** (guaranteed cold chain ≤3.3 °C, **or** pH ≤5.0 / aw ≤0.97 / a validated ≥90 °C·10 min heat step) **and** a **TPH ROP special-process sign-off / variance**.
- **Frozen hold:** ≤−18 °C; thaw under refrigeration (covers the 11-day "Shape & Freeze" patties — a *frozen*, not chilled, regime).
- **Transport:** closed/insulated or refrigerated; depart ≤4 °C; **arrival probe ≤4 °C** (transient ≤6 °C triggers corrective action); raw segregated from RTE.
- **⚠ Items to reconcile:** the **27-day "Chickpea Shakshuka"** and **10-day "Green Seasoning/Epis"** holds (verify whether frozen, high-acid sauce, or a 4-week cycle-projection artifact — a genuine 27-day chilled RTE hold is a critical deviation); the **9 ambiguous "?d"** salad holds (assign a definite ≤-day limit); **Bloor over-capacity** (cannot guarantee ≤4 °C while 134–159 % full).

### CCP-4 — Reheating (for hot service)
- **Critical limit:** **≥74 °C (165 °F) core within 2 h, reheated once only.** Matches CONC `HACCP_REHEAT` ("Combi steam 350 °F… 165 °F core within 2 hours… never reheat more than once"). Probe before service.

### CCP-5 — Hot-holding & service window
- **Critical limit:** hot food held **≥60 °C (140 °F)**; **or** time-as-public-health-control **≤4 h cumulative** in the danger zone then discard. P2 "hot-send" cook→service window must fit inside this (define clock times for AM/PM van runs — currently only "~2:00 / AM / PM").

### CCP-6 — Allergen / anaphylactic control
- **Critical limit (zero-tolerance):** **no allergen cross-contact reaches a flagged resident; 100 % of anaphylactic plates verified against the DOOR anaphylactic list before service.**
- Enforced by: DOOR exclude-array routing (resident allergen tags vs meal flags); anaphylactic residents + roommates co-routed to the separate Anaphylactic Alternative; red flag + **explicit H&W acknowledgement before generation/service**; dedicated allergen-free prep (separate utensils/surfaces/sequencing); no last-minute substitution without re-running the check.
- This is CONC's most mature existing control — it is largely **built in DOOR already**; the HACCP step is to *formalise it as a CCP with monitoring and records.*

---

## 5. Open deviations & validation to-do (before go-live)

| # | Item | Action | Owner |
|---|---|---|---|
| 1 | **Cooling: "blast-chill" vs "cooled overnight"** | Walk the Bloor cook→cool→bag flow; confirm equipment + actual checkpoint times (Step 5) | Bloor lead + Coordinator |
| 2 | **ROP shelf-life 14 d → 7 d** | Re-label; reschedule the 8-day Chilli; decide barrier+variance path if longer holds needed | Coordinator + TPH |
| 3 | **Bloor fridge 134–159 % over capacity** | Capacity/throughput fix — a cold-chain CCP-3 risk now | Coordinator |
| 4 | **Fish cook temp 155 °F vs 158 °F** | Raise to Health Canada 158 °F or document FDA 145 °F basis | Coordinator + TPH |
| 5 | **Transport temperature spec** | Insulated/refrigerated transport + arrival probe log | Logistics |
| 6 | **"?d" + 27 d / 10 d holds** | Classify each; assign definite limits | Coordinator |
| 7 | **No monitoring/records layer** | Build temperature + time capture on COOK/COOL/HEAT/SEND (Principles 4 & 7) — extend the existing HUB/DOOR backbone | Systems owner |
| 8 | **Confirm all critical limits** | Validate the whole §4 table against current TPH guidance | TPH |

---

## 6. What comes next (Principles 4–7)

This annex closes **Principles 1–3** (hazards → CCPs → limits). Still to build: **P4** monitoring (who probes what, when — and where it's logged), **P5** corrective actions (the cooling reheat-restart is the model to generalise), **P6** verification (probe calibration, record review, periodic swab/audit), **P7** records (the temperature/time logs the system does not yet capture). The strongest move is to make the **HUB board** the live monitoring surface — its FRIDGE colour-coding and MOVES hold-classes are already proto-monitoring; add the temperatures and they become the HACCP record.

---

*Working draft — not a validated HACCP plan. Critical limits are standard references pending Toronto Public Health validation.*
