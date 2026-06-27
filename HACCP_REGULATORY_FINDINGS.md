# HACCP Regulatory Findings — CONC Cook-Chill / ROP Critical-Limit Validation

> **Second-pass note (2026-06-27):** See `HACCP_CITATION_SECOND_PASS_2026-06-27.md` before using this file as evidence. This document is the 2026-06-24 research history. The live HACCP docs now exist, `HACCP_HAZARD_ANALYSIS.md` §4 is the critical-limit owner, and the `<3 °C` ROP recommendation below has been superseded by the architect-locked decision: **ROP ≤4 °C + validated barrier**. The old Toronto Ch. 545 each-area food-handler clause is also **historical**, not current-confirmed; cite O. Reg. 493/17 s. 32 for the binding food-handler floor.

**Operation:** Christie Ossington Neighbourhood Centre (CONC), Toronto, Ontario — non-profit shelter catering.
Multi-site **cook-chill**: cook at two kitchens (Bloor, Rexdale) → blast-chill → **vacuum-pack (Reduced Oxygen Packaging / ROP)** → refrigerate → van transport between sites → reheat → serve **~300 shelter residents (a highly susceptible / vulnerable population)**. 224 recipes.

**Prepared:** 2026-06-24 · **All web sources accessed:** 2026-06-24 · **Method:** primary regulatory text preferred (O. Reg. 493/17 via Ontario e-Laws + official MOH reproduction; Toronto Public Health; Health Canada; FDA Food Code 2022; UK FSA/ACMSF; CFIA), cross-checked ≥2 authoritative sources per material claim, every value quoted verbatim with URL.

---

## ⚠ 0. Read first — two framing facts

**(a) The HACCP plan documents this report was meant to validate do not yet exist in `conc-kitchen-house`.** A search of the working tree, all branches (`main`, `claude/house-doc-relocation`), every git ref, and the whole `C:\Users\Jason` tree found **no** `HACCP_PLAN_DRAFT.md`, `HACCP_HAZARD_ANALYSIS.md` (the §4 critical-limit table), `HACCP_MONITORING_RECORDS.md`, `HACCP_CCP_DECISION_TREE.md`, `HACCP_RECORDKEEPING_GUIDE.md`, or `HACCP_PRELIMINARY_HAZARD_ANALYSIS.md`. This report therefore validates the **draft critical limits as stated in the task brief** (reproduced in each row below). **Corrections in §5 are keyed to the *named* draft limits / the §4 table to be authored**, so they can be applied verbatim once those docs are created.

**(b) Terminology correction — "potentially hazardous food," not "hazardous food."** O. Reg. 493/17 does **not** use the term "hazardous food." The binding defined term throughout is **"potentially hazardous food" (PHF)** — *s. 1(1): "food in a form or state that is capable of supporting the growth of infectious or toxigenic micro-organisms and which requires time and temperature control to limit such growth."* Use "potentially hazardous food" everywhere in the plan.

**Legend** — **BINDING** = enforceable on CONC in Ontario (O. Reg. 493/17 under the *Health Protection and Promotion Act*, enforced by Toronto Public Health / DineSafe; or Toronto Municipal Code). **BEST-PRACTICE** = authoritative but not legally binding here (Health Canada, CFIA, FDA Food Code, UK FSA/ACMSF) — these fill the gaps where Ontario is silent. **Verdict:** *confirms* / *corrects* / *Ontario-silent*.

---

## 1. Executive summary — what must change or be obtained

1. **Ontario prescribes almost no numeric limits.** O. Reg. 493/17's **only binding food-temperature rule is s. 27: PHF must be kept at ≤ 4 °C or ≥ 60 °C** (the cold/hot-hold + danger-zone limits — *confirmed*). It is **silent** on cooking temperatures, cooling windows, reheating, RTE shelf-life/date-marking, and ROP/cook-chill — these are governed by the **performance standard s. 26(2): "All food must be processed in a manner that makes the food safe to eat."** Every numeric limit in those areas is therefore **best-practice that CONC adopts to demonstrate s. 26 compliance**, not a quoted regulation. The draft limits are sound; the plan must **label them as the evidence-based standards CONC follows under s. 26**, not as "the regulation requires."

2. **ROP / cook-chill is the highest-priority item — the draft "≤ 7 days, no barrier" needs two tightenings (not a rewrite).** Ontario has **no ROP variance/permit regime** (silent). TPH's own published sous-vide/vacuum guidance is the closest binding-adjacent standard and it **caps the product at 7 days BUT requires storage below 3 °C** (not ≤ 4 °C) and date/discard labelling. Independently, the **UK FSA/ACMSF "10-day rule"** and **Health Canada's Listeria policy** both say a chilled vacuum-packed RTE food held **> 5 days** (Listeria) / **> 10 days** (botulinum) without a validated barrier is the danger line. **Actions:** (i) **tighten ROP cold storage to < 3 °C** (TPH sous-vide rule), not the general ≤ 4 °C; (ii) record the 7-day product as **Listeria Category 1** (highest scrutiny — see §7); (iii) **build a documented, validated cook-chill/ROP food-safety plan and have your TPH Public Health Inspector review it** — TPH may require this under s. 26 even though no section names "ROP."

3. **Record-retention (priority unknown) — resolved.** The **only binding retention rules** in O. Reg. 493/17 are **food-purchase records ≥ 1 year (s. 29(2))** and **pest-control records ≥ 1 year (s. 13(2))** (plus meat records s. 36 if you cure/ferment). **There is NO binding requirement to keep cooking/cooling/holding temperature logs at all** — but TPH's *Centralized Kitchens* guidance expects them, plus a **retained food sample of every RTE item for ≥ 7 days**. **Recommendation: retain all CCP monitoring records for ≥ 1 year** (align to the statutory floor; confirm with TPH whether the special process warrants 2 years).

4. **One cooking-temperature correction:** the draft's blanket *"ground ≥ 71 °C"* is **wrong for ground poultry** — Health Canada requires **ground poultry 74 °C (165 °F)** (ground beef/pork/veal/lamb stay 71 °C/160 °F). All other draft cook temps confirm.

5. **A federal SFC licence is NOT required.** CONC prepares and serves within one province and does not trade interprovincially/export — CFIA: *"You do not need a licence … manufacture, process, treat, preserve, grade, package or label food that will be sold and consumed within your province or territory."* **Binding regulator = Ontario / TPH.** CFIA/SFCR + the Preventive Control Plan model are **best-practice** (worth adopting as the plan's structure — §7).

6. **Food handlers:** second pass corrected this item. The binding current floor is O. Reg. 493/17 s. 32: at least one certified food handler or supervisor on premises during every operating hour. The old Toronto Ch. 545 each-area wording appears in historical By-law 678-2006, but not in the current consolidated Ch. 545 PDF.

7. **The shelter is a highly susceptible population (HSP).** Health Canada's vulnerable-population / immunocompromised guidance imposes **stricter controls and a list of foods to avoid** (no non-dried deli meats unless reheated steaming, hot dogs to 74 °C, no raw/undercooked eggs or meat, no raw sprouts, no unpasteurized dairy/juice, avoid soft & blue cheeses even pasteurized, no refrigerated pâté/smoked seafood). Fold these into CCP-6 / a vulnerable-population annex.

---

## 2. Per-item validation tables

> Quoted text is verbatim from the cited source, accessed 2026-06-24. Section numbers of O. Reg. 493/17 are identical across the Ontario e-Laws consolidation (current to Jan 1 2025, last amendment 497/24) and the official MOH *Food Premises Reference Document, 2019* reproduction.

### CCP-1 — Cooking (core internal temperature)

**Governing rule in Ontario:** **BINDING performance standard, O. Reg. 493/17 s. 26(2):** *"All food must be processed in a manner that makes the food safe to eat."* — **no numeric cooking temperature is prescribed** (MOH 2019: *"Internal cooking temperatures are not specified in the FPR … Operators are expected to continue to follow evidence-based internal cooking temperatures"*). The numbers below are the **best-practice** standard (Health Canada chart + MOH guidance table) CONC follows to satisfy s. 26.

| Item | Our draft | Authoritative value | Source (URL + quote) | Tier | Verdict | Action |
|---|---|---|---|---|---|---|
| Poultry pieces (wings/breasts/legs/thighs) | ≥ 74 °C | **74 °C (165 °F)** | Health Canada "Safe cooking temperatures": *"Pieces (wings, breasts, legs, thighs) — 74°C (165°F)"* — https://www.canada.ca/en/health-canada/services/general-food-safety-tips/safe-internal-cooking-temperatures.html | Best-practice | **confirms** | Keep. |
| Whole poultry / whole birds | 82 °C | **82 °C (180 °F)** | Health Canada (same page): *"Whole — 82°C (180°F)."* MOH 2019: *"Whole poultry 82°C (180°F)."* — https://files.ontario.ca/moh-ophs-ref-food-premise-reference-document-2019-en.pdf | Best-practice | **confirms** | Keep. (Note: an older **85 °C** value circulates on third-party laminated charts — **use 82 °C**, the current Health Canada value.) |
| **Ground poultry** | "ground ≥ 71 °C" | **74 °C (165 °F)** | Health Canada: *"Ground poultry (burgers, meatballs, sausages) — 74°C (165°F)."* | Best-practice | **corrects** | **Split the draft's blanket "ground ≥71": ground POULTRY = 74 °C.** Directly relevant to CONC's poultry sausages/meatballs/loaf. |
| Ground beef / veal / lamb / pork | ≥ 71 °C | **71 °C (160 °F)** | Health Canada: *"Ground meat (burgers, meatballs, sausages) — 71°C (160°F)"*; *"Ground pork … 71°C (160°F)."* | Best-practice | **confirms** | Keep (applies to non-poultry ground meat only). |
| Whole-muscle beef | ≥ 71 °C (draft notes FDA permits 63 °C) | HC: medium-rare **63 °C (145 °F)** / medium **71 °C (160 °F)** / well-done **77 °C (170 °F)** | Health Canada: *"Pieces and whole cuts — medium-rare 63°C (145°F) / medium 71°C (160°F) / well done 77°C (170°F)."* | Best-practice | **confirms** (conservative) | Keep ≥ 71 °C. **For an HSP, do not serve rare/medium-rare beef** — hold the ≥ 71 °C floor (see §7). |
| Whole-muscle pork | ≥ 71 °C | **71 °C (160 °F)** | Health Canada: *"Pork (ham, pork loin, ribs) — Pieces and whole cuts — 71°C (160°F)."* | Best-practice | **confirms** | Keep. |
| Fish | ≥ 70 °C (158 °F) | **70 °C (158 °F)** | Health Canada: *"Fish — 70°C (158°F)."* | Best-practice | **confirms** | Keep. (FDA Food Code allows 63 °C/145 °F for fish — HC 70 °C is stricter; keep the HC value.) |
| Eggs / egg dishes | ≥ 74 °C | **74 °C (165 °F)** | Health Canada: *"Egg dishes — 74°C (165°F)."* | Best-practice | **confirms** | Keep. |
| Mixed dishes / casseroles / stuffing / hot dogs / leftovers | ≥ 74 °C | **74 °C (165 °F)** | Health Canada "immunocompromised" chart: *"Other foods (hot dogs, stuffing and leftovers) 74 °C (165 °F)"*; MOH 2019: *"food mixtures containing poultry/eggs/meat/fish 74°C (165°F)."* — https://www.canada.ca/en/health-canada/services/publications/food-nutrition/safe-food-handling-immunocompromised-individuals.html | Best-practice | **confirms** | Keep 74 °C (conservative-correct; mixed dishes with beef/pork-only may be 71 °C, but 74 °C is the safe blanket for an HSP). |

### CCP-2 — Cooling (two-stage)

| Item | Our draft | Authoritative value | Source (URL + quote) | Tier | Verdict | Action |
|---|---|---|---|---|---|---|
| Cooling windows | 60 → 20 °C in 2 h, then 20 → 4 °C in 4 h (≤ 6 h total) | **60 °C → 20 °C within 2 h; 20 °C → 4 °C within 4 h** | O. Reg. 493/17 is **SILENT** (its only "cooling" section, s. 40, is milk-only). MOH 2019 gap-filler, verbatim: *"Accepted cooling parameters: 60° Celsius to 20° Celsius within 2 hours and, 20° Celsius to 4° Celsius within 4 hours."* — https://files.ontario.ca/moh-ophs-ref-food-premise-reference-document-2019-en.pdf | Best-practice (Ontario-silent) | **confirms** | Keep exactly. Cite MOH as the Ontario gap-filler; note the FDA Food Code §3-501.14 cross-check uses different thresholds (135 °F→70 °F / 57 °C→21 °C in 2 h, then →41 °F / 5 °C within 6 h total). The Canadian 60→20→4 °C numbers govern in Ontario. |

### CCP-5 — Hot/cold holding & danger zone

| Item | Our draft | Authoritative value | Source (URL + quote) | Tier | Verdict | Action |
|---|---|---|---|---|---|---|
| Cold-hold | ≤ 4 °C | **≤ 4 °C** | **O. Reg. 493/17 s. 27(1):** *"Potentially hazardous food shall be distributed, maintained, stored, **transported**, displayed, sold and offered for sale only under conditions in which the internal temperature of the food is, (a) 4° Celsius, or lower; or (b) 60° Celsius, or higher."* — https://www.ontario.ca/laws/regulation/170493 | **BINDING** | **confirms** | Keep. Note "transported" is in the binding text → it **covers the inter-site van runs**. |
| Hot-hold | ≥ 60 °C | **≥ 60 °C** | O. Reg. 493/17 s. 27(1)(b) (above); Health Canada: *"Keep hot foods at or above 60 °C (140 °F)."* | **BINDING** | **confirms** | Keep. |
| Danger zone | 4–60 °C | **4–60 °C** | Health Canada (vulnerable-populations): *"Perishable food should never reach temperatures between 4 °C to 60 °C (40 °F to 140 °F)."* | BINDING (via s. 27) + best-practice | **confirms** | Keep. |
| Prep excursion | (implicit) | **≤ 2 h** out of the ≤4/≥60 range | O. Reg. 493/17 s. 27(2)(a): excursion *"not to exceed two hours, that are necessary for the preparation, processing and manufacturing of the food."* | **BINDING** | adds detail | **Add to the plan**: the only lawful danger-zone excursion is the s. 27(2)(a) two-hour prep window. |

### CCP-4 — Reheating

| Item | Our draft | Authoritative value | Source (URL + quote) | Tier | Verdict | Action |
|---|---|---|---|---|---|---|
| Reheat temperature | ≥ 74 °C | **74 °C (165 °F)** | O. Reg. 493/17 **SILENT** on reheating (governed by s. 26(2) + s. 27(1)(b) once hot-held). Health Canada: *"When reheating food, make sure it is cooked to an internal temperature of at least 74 °C (165 °F). Bring gravies, soups and sauces to a full, rolling boil."* MOH 2019 reheating table: poultry/mixtures 74 °C, pork/ground 71 °C, fish 70 °C. | Best-practice (Ontario-silent) | **confirms** | Keep 74 °C as the single reheat target (simplest + safest across food types). |
| Reheat within 2 h | within 2 h | within 2 h | Ontario silent; FDA Food Code §3-403.11 (best-practice): reheat to 165 °F/74 °C **within 2 hours**. | Best-practice | **confirms (best-practice)** | Keep; label as best-practice (FDA), not Ontario-binding. |
| Reheat once only | once | (not codified) | No source — neither O. Reg. 493/17 nor Health Canada nor FDA Food Code states a "reheat once" numeric rule; it is an industry best practice. | Best-practice (convention) | **Ontario-silent** | Keep as a CONC operating rule; describe it as best practice, not a regulatory requirement. |

### CCP-3 — RTE refrigerated shelf-life / date-marking

| Item | Our draft | Authoritative value | Source (URL + quote) | Tier | Verdict | Action |
|---|---|---|---|---|---|---|
| Max refrigerated RTE shelf-life | ≤ 7 days | **≤ 7 days** | O. Reg. 493/17 **SILENT** (no shelf-life cap, no date-marking except for milk, ss. 45–46). TPH sous-vide guidance: *"Sous vide prepared foods should be stored up to a maximum of seven days."* FDA Food Code §3-501.17 (best-practice cross-check): ≤ 7 days at ≤ 5 °C/41 °F. — TPH: https://www.toronto.ca/community-people/health-wellness-care/health-programs-advice/food-safety/food-safety-for-businesses/food-safety-resources/specialty-foods/ | Best-practice (Ontario-silent) | **confirms** | Keep ≤ 7 days **but see CCP-3 ROP below** — for the *vacuum-packed* product, 7 days requires storage < 3 °C and triggers Listeria Category 1 (§7). |
| Day-counting | prep day = day 1 | prep day = Day 1 | FDA Food Code §3-501.17 (best-practice): *"the day of preparation shall be counted as Day 1."* | Best-practice | **confirms** | Keep. |
| Date-marking / labelling | (working assumption) | **Required (label date/time/discard/identity)** | TPH sous-vide: *"All sous vide pouched foods stored under refrigeration must be clearly labelled with date, time, discard date and identity."* | Best-practice (TPH) | adds requirement | **Add explicit ROP label fields**: cook date, time, discard-by date, product identity. |

### CCP-3 — ROP / vacuum / cook-chill / sous-vide  ⭐ highest priority

**Approval regime — what's binding vs best-practice:**

| Item | Our draft | Authoritative value | Source (URL + quote) | Tier | Verdict | Action |
|---|---|---|---|---|---|---|
| Special-process approval / variance for ROP | (assumed none) | **No codified ROP variance regime in Ontario; PHI may require a documented plan under s. 26** | O. Reg. 493/17 contains **zero** instances of "reduced oxygen," "vacuum," "sous," "cook-chill," "HACCP," or "food safety plan." Only adjacent binding text: s. 27(2)(b) exempts *"a hermetically sealed food that has been subjected to a process sufficient to prevent the production of bacterial toxins or the survival of spore-forming pathogenic bacteria."* MOH 2019: operators must *"demonstrate evidence-based safe practices and [be] approved by a PHI or MOH."* | BINDING (silent on a named regime; s. 26 performance duty applies) | **Ontario-silent / corrects** | **Build a documented, validated ROP/cook-chill food-safety plan and have your TPH PHI review it.** No pre-approval form exists, but a PHI can require you to *demonstrate* the process is safe under s. 26. |
| ROP cold-storage temperature | (draft cold-hold ≤ 4 °C) | **< 3 °C** for refrigerated sous-vide/ROP product | TPH sous-vide: *"All refrigerated sous vide products must be stored below 3°C until reheating."* and *"All sous vide food that is not ready-to-eat … should be cooled using an ice water bath to below 3°C within two hours."* | Best-practice (TPH-published) | **corrects** | **Tighten the ROP/vacuum product's cold storage to < 3 °C** (stricter than the general ≤ 4 °C cold-hold). This is the key correction. |
| Cook (water-bath) floor | (n/a) | **≥ 55 °C; ≥ 60 °C for chicken** | TPH sous-vide: *"No potentially hazardous food may be processed in water bath temperatures lower than 55°C. For chicken products, the lower limit is 60°C."* | Best-practice (TPH) | adds limit | Add to the plan if any item is held/cooked in a low-temperature water bath. |
| Max shelf-life **without** a botulinum barrier | ≤ 7 days, no barrier | **≤ 10 days at ≤ 8 °C, OR < 3.0 °C throughout** (UK FSA/ACMSF); TPH caps sous-vide at **7 days @ < 3 °C** | UK FSA/ACMSF "10-day rule", verbatim controls: *"storage throughout shelf life at <3.0°C, or"* / *"storage chill temperature (3-8°C) & shelf-life <10 days [10 day rule], or"* / *"…& 90°C/10 min (or equivalent)"* / *"…& pH <5.0 throughout food, or"* / *"…& NaCl >3.5% throughout food, or"* / *"…& Aw <0.97 throughout food, or"* / *"…& combination of factors which can be shown consistently to prevent growth/toxin formation."* — https://www.chilledfood.org/the-10-day-rule-for-shelf-life/ | Best-practice | **partially confirms** | **The draft's "≤ 7 days, no barrier" is defensible ONLY at < 3 °C storage** (TPH) **and treating the product as Listeria Category 1** (§7). 7 days at ≤ 4 °C is *not* clearly safe — at 3–8 °C the no-barrier limit is 10 days but Listeria growth (> 5 days) is the binding concern. **Decide:** (i) hold < 3 °C + 7-day cap + Category-1 controls, or (ii) add a validated barrier (below), or (iii) drop shelf-life to ≤ 5 days (→ Listeria Category 2A). |
| Botulinum barriers (to extend shelf-life) | (none) | **< 3.0 °C throughout; OR 90 °C/10 min (or equiv.); OR pH < 5.0; OR aw < 0.97; OR NaCl > 3.5%; OR validated combination** (FSA/ACMSF). FDA adds: ROP at ≤ 5 °C with **Aw ≤ 0.91** or **pH ≤ 4.6** or cured | FSA (above) + FDA Food Code §3-502.12(B), verbatim via TPH foundation: a ROP establishment *"shall implement a HACCP PLAN …"* and hold the food *"at 5°C (41°F) or less"* meeting at least one barrier *(Aw ≤0.91, pH ≤4.6, cured meat/poultry, etc.)* — https://www.fda.gov/media/164194/download | Best-practice | adds | If CONC wants > 7-day / ambient-robust shelf-life, **validate one barrier** (most practical: a **90 °C/10-min-equivalent** cook step — also listericidal — or < 3.0 °C throughout). Record the validation in the plan. |
| Pre-conditions for ROP without a variance | (n/a) | HACCP plan; on-premises/own-sites only; high-barrier film | FDA Food Code §3-502.11 / §3-502.12, verbatim via TPH foundation: variance required *"before … Packaging TIME/TEMPERATURE CONTROL FOR SAFETY FOOD using a REDUCED OXYGEN PACKAGING method except where … controlled as specified under §3-502.12,"* and §3-502.12 requires a HACCP plan + barrier. | Best-practice (gold standard) | adds | Model CONC's ROP plan on FDA §3-502.12 (HACCP plan + ≤ 5 °C + barrier; or ≤ 1 °C/34 °F for ≤ 30 days). CONC already meets the "own-sites, not sold to consumers" condition. |
| Manufactured-meat processes (if CONC cures/smokes/ferments any meat) | (n/a) | **Mandatory PHI/MOH-approved written procedures** | **O. Reg. 493/17 s. 34(1)–(2) (BINDING):** *"Every operator … at which manufactured meat products are manufactured must develop written food safety procedures … "* that *"must be approved by a medical officer of health or a public health inspector."* s. 35: process must be *"sufficient to destroy pathogenic bacteria, parasites …"* | **BINDING** | adds (conditional) | If any recipe cures/smokes/ferments meat, this is the **one mandatory written-plan + approval** in the regulation — confirm with TPH whether any CONC item qualifies. |

### Food-handler certification

| Item | Our draft | Authoritative value | Source (URL + quote) | Tier | Verdict | Action |
|---|---|---|---|---|---|---|
| Provincial floor | (n/a) | **≥ 1 trained handler/supervisor present every operating hour** | **O. Reg. 493/17 s. 32 (BINDING):** *"Every operator of a food service premise shall ensure that there is at least one food handler or supervisor on the premise who has completed food handler training during every hour in which the premise is operating."* | **BINDING** | adds | Document who holds current certification per shift/site. |
| Toronto Ch. 545 each-area wording | (n/a) | Historical only; **do not cite as current law** | By-law 678-2006 contains the each-area wording, but the current consolidated Ch. 545 PDF does not contain "food handler" (second pass, 2026-06-27). | Historical | corrects | Cite O. Reg. 493/17 s. 32 as the binding floor. Use each-area certified coverage only as CONC internal practice unless TPH confirms otherwise. |

### Written food-safety plan, monitoring & record-retention

| Item | Our draft | Authoritative value | Source (URL + quote) | Tier | Verdict | Action |
|---|---|---|---|---|---|---|
| General HACCP / written plan mandated? | (assumed yes) | **No** — not mandated generally in Ontario (mandatory only for manufactured meat, s. 34) | MOH 2019: a food-safety management plan is *"recommended"*; *"Food safety management plans are mandatory for manufactured meat products."* | BINDING (not required) + best-practice (recommended) | clarifies | A written HACCP/PCP is **best practice, strongly advisable for an HSP cook-chill operation** — but not a general legal requirement. Build it anyway (it's what a PHI will ask to see for ROP). |
| Temperature-log retention | (TBD) | **No binding retention requirement for temp logs** | O. Reg. 493/17 prescribes no general temperature-log record-keeping. (The binding duty is *achieving* the s. 27 temperatures, not *logging* them.) | BINDING (silent) | **Ontario-silent** | Keep logs as best practice (TPH expects them — below). |
| **Record retention period (priority unknown — RESOLVED)** | (TBD) | **Binding floor = 1 year** (purchase + pest-control records); no temp-log mandate | **s. 29(2) (BINDING):** food-purchase records retained *"at least until the first anniversary of the purchase date."* **s. 13(2) (BINDING):** pest-control records *"for at least one year."* **s. 36(1):** manufactured-meat records ≥ 1 year (if applicable). | **BINDING** | resolves | **Retain all CCP monitoring records ≥ 1 year** (statutory floor). Confirm with TPH whether the ROP special process warrants 2 years (§6). |
| Monitoring & samples (multi-site) | (TBD) | **Log fridge/freezer/hot-hold/cooking/delivery temps; verify delivery temps; keep a 7-day food sample** | TPH *Centralized Kitchens*: *"Use record logs to document and monitor temperatures for: Refrigerators, Freezers, Hot holding units, Cooking and delivery temperatures."* / *"Verify temperatures of hazardous foods at the time of delivery."* / *"Keep a sample of all menu items for a minimum of seven days for Toronto Public Health to collect."* (≥ 200 g of each RTE item) — https://www.toronto.ca/community-people/health-wellness-care/health-programs-advice/food-safety/food-safety-for-businesses/food-safety-resources/food-sample-collection-storage-protocol/ | Best-practice (TPH, directly on point) | adds | **CONC is a "Centralized Kitchen" in TPH's terms** — adopt this page's logging + delivery-temp-verification + 7-day-sample retention as the monitoring/record core. |

### Highly susceptible population (HSP) — vulnerable residents

| Item | Our draft | Authoritative value | Source (URL + quote) | Tier | Verdict | Action |
|---|---|---|---|---|---|---|
| Who is at risk | (n/a) | pregnant; ≤ 5 yrs; weakened immune systems; ≥ 60 yrs | Health Canada: *"Those at increased risk of food poisoning include: people who are pregnant / children ages 5 and under / people with weakened immune systems / adults ages 60 and over."* — https://www.canada.ca/en/health-canada/services/food-safety-vulnerable-populations/food-safety-vulnerable-populations.html | Best-practice | adds | Shelter residents include all four → treat the whole operation as serving an HSP. |
| Foods to avoid / restrict | (n/a) | deli meats unless reheated steaming; hot dogs to 74 °C; no raw/lightly-cooked eggs; no raw/undercooked meat; no raw seafood / refrigerated smoked seafood; no unpasteurized dairy + avoid soft/semi-soft/blue cheeses even pasteurized; no raw sprouts; no refrigerated pâté/meat spreads; no unpasteurized juice/cider | Health Canada "immunocompromised" (March 2025), verbatim rows incl.: *"Non-dried deli meats … → … heated until steaming hot"*; *"The middle of the hot dog should be steaming hot or 74 °C (165 °F)"*; *"Raw sprouts such as alfalfa, clover, radish and mung beans"* (avoid). | Best-practice | adds | **Fold into CCP-6 / a vulnerable-population annex.** These are stricter than the general limits and align with the FDA Food Code HSP provisions (§3-801.11). |

---

## 3. The "Ontario is silent → what governs" map (binding vs gap-filler)

| Topic | O. Reg. 493/17 | Governs in practice |
|---|---|---|
| Numeric cooking temps | **SILENT** — performance standard s. 26(2) | Health Canada chart / MOH guidance (best-practice) |
| Cooling windows | **SILENT** (s. 40 = milk only) | MOH 60→20 °C/2h, 20→4 °C/4h (best-practice) |
| Reheating temp | **SILENT** | Health Canada / MOH 74 °C (best-practice) |
| Cold/hot holding | **BINDING — s. 27: ≤ 4 °C / ≥ 60 °C** | s. 27 |
| RTE shelf-life / date-marking | **SILENT** (milk only) | TPH sous-vide ≤ 7 days; FDA §3-501.17 (best-practice) |
| ROP / vacuum / cook-chill / sous-vide | **SILENT as named processes**; s. 27(2)(b) hermetic-seal bar; **s. 34 mandatory plan for *manufactured meat* only** | TPH sous-vide guidance + s. 26 + PHI review; FDA §3-502.11/.12, FSA 10-day (best-practice) |
| Food-handler training | **BINDING — s. 32** | s. 32; old Toronto Ch. 545 each-area wording is historical/not current-confirmed |
| General written HACCP plan | **Not mandated** (mandatory only for manufactured meat) | Best-practice (strongly advised) |
| Record retention | **BINDING — purchase s. 29(2) & pest-control s. 13(2), each ≥ 1 yr** | s. 29(2), s. 13(2) |

---

## 4. The one binding numeric limit, verbatim (for the §4 table header)

> **O. Reg. 493/17 s. 27(1):** *"Potentially hazardous food shall be distributed, maintained, stored, transported, displayed, sold and offered for sale only under conditions in which the internal temperature of the food is, (a) 4° Celsius, or lower; or (b) 60° Celsius, or higher."*
> **s. 27(2)(a):** excursion *"not to exceed two hours, that are necessary for the preparation, processing and manufacturing of the food."*

Everything else in §4 should be stated as **"CONC's evidence-based standard under O. Reg. 493/17 s. 26(2),"** citing Health Canada / MOH / TPH / FDA / FSA as the source of each number.

---

## 5. Corrections to apply (keyed to the §4 critical-limit table to be authored)

> Historical note: when this research file was written, the HACCP docs did not exist yet (§0a). The live docs now exist; use `HACCP_HAZARD_ANALYSIS.md` §4 plus `HACCP_CITATION_SECOND_PASS_2026-06-27.md` before carrying any correction forward.

1. **Terminology (global):** replace **"hazardous food" → "potentially hazardous food (PHF)"** throughout all HACCP docs (matches the O. Reg. 493/17 s. 1(1) defined term).
2. **CCP-1 cooking — add the ground-poultry row:** change the blanket *"ground ≥ 71 °C"* to two rows — **ground beef/pork/veal/lamb = 71 °C (160 °F)** and **ground poultry = 74 °C (165 °F)**. (The only substantive temperature error in the draft.)
3. **CCP-1 — label the cook-temp table as best-practice under s. 26(2)**, not "regulation requires." Add the whole-poultry note (use **82 °C**, not the older 85 °C) and an HSP note (no rare/medium-rare beef for residents — hold ≥ 71 °C).
4. **CCP-3 ROP — tighten cold storage to `< 3 °C`** for the vacuum-packed product (TPH sous-vide rule), distinct from the general cold-hold ≤ 4 °C (CCP-5). This is the highest-priority correction.
5. **CCP-3 ROP — qualify the ≤ 7-day use-by:** *"≤ 7 days from cook day, stored < 3 °C, treated as Listeria Category 1; longer only with a validated barrier (e.g. 90 °C/10-min-equivalent cook, or pH < 5.0 / aw < 0.97 / NaCl > 3.5%) — see Listeria + ROP notes."*
6. **CCP-3 — add ROP label fields:** cook date, time, **discard-by date**, product identity (TPH requirement).
7. **CCP-2 / CCP-4 — cite the gap-fillers:** cooling = MOH "60→20 °C/2h, 20→4 °C/4h"; reheat = Health Canada/MOH 74 °C; mark "reheat within 2 h" and "reheat once" as **best practice** (FDA / convention), not Ontario-binding.
8. **CCP-5 — add the s. 27(2)(a) two-hour prep excursion** as the only lawful danger-zone window; note s. 27 explicitly covers **"transported"** (van runs).
9. **Records — set retention = ≥ 1 year** for all CCP monitoring logs (statutory floor; confirm 2 years for the special process with TPH); add **7-day retained food sample** of every RTE item (TPH Centralized Kitchens).
10. **Food handlers — use O. Reg. 493/17 s. 32** as the binding floor. Do not cite the historical Toronto Ch. 545 each-area wording as current law.
11. **CCP-6 / HSP annex — add the Health Canada vulnerable-population foods-to-avoid list** as restricted/prohibited foods.
12. **Cross-app:** if any cooking-temperature *text* lives in `conc-recipe-hub` (e.g. a `COOK_FISH` / cook-temp string), the **only** value that changes is **ground poultry → 74 °C**; everything else confirms. (No change needed to fish 70 °C, eggs 74 °C, whole poultry 82 °C.)

---

## 6. Questions to put to Toronto Public Health directly

Web research cannot settle these — phone **Toronto Health Connections 416-338-7600 (ask for your assigned Public Health Inspector)** or email **DineSafe@toronto.ca**:

1. **ROP / cook-chill special process:** Does TPH require **pre-approval, a variance, or only review-on-request** for our blast-chill → vacuum-pack → refrigerate → inter-site transport → reheat process? **What must our food-safety plan contain** to satisfy you under s. 26? (No application form/checklist/timeline is published.)
2. **Classification:** Do you treat our workflow as **"sous-vide," generic "ROP," or a "Centralized Kitchen"** operation? (This determines which guidance applies — they differ on cold-storage temp: < 3 °C vs ≤ 4 °C.)
3. **Manufactured meat:** Do **any** of our recipes (curing/smoking/fermenting/drying meat) trigger the **mandatory s. 34 PHI/MOH-approved written procedures**?
4. **Record retention:** Is **1 year** (the s. 29(2)/s. 13(2) statutory floor) sufficient for our **CCP monitoring logs (cooking/cooling/holding/transport/reheat)**, or do you expect **2 years** for the special process? Any required log format?
5. **Food-handler provider:** Which currently accepted certification provider should CONC use? The old Toronto Ch. 545 each-area wording is historical/not current-confirmed; use O. Reg. 493/17 s. 32 as the binding floor.
6. **Cold-storage target:** Confirm the binding cold-storage temperature for our **vacuum-packed** product — **< 3 °C** (TPH sous-vide guidance) vs the general **≤ 4 °C** (s. 27).
7. **Inter-site transport:** Any specific expectations for **temperature monitoring/logging during van transport** between Bloor and Rexdale (s. 27 covers "transported," but no numeric monitoring cadence is published)?

---

## 7. Jurisdiction note + CFIA/Health Canada items to fold in

### Is CFIA / SFCR binding? — No.
A federal **Safe Food for Canadians licence is not required.** CFIA, verbatim: *"You **do not need** a licence: trade food within your province [or] manufacture, process, treat, preserve, grade, package or label food that will be sold and consumed within your province or territory."* (https://inspection.canada.ca/en/food-licences/food-business-activities). A licence is triggered only by **import, export, or sending food across provincial/territorial borders** (SFCR ss. 5–7). CONC cooks and serves locally within Ontario and does not trade interprovincially → **the binding regulator is Ontario / Toronto Public Health under O. Reg. 493/17.** CFIA/SFCR and the materials below are **best-practice** worth adopting.

### CFIA Preventive Control Plan (PCP) — adopt as the plan's structure (best-practice).
CFIA defines a PCP as *"a written document that demonstrates how hazards to your food are identified and prevented, eliminated or reduced to an acceptable level"* (https://inspection.canada.ca/en/food-safety-industry/preventive-control-plans). Its required elements **are the 7 HACCP principles** — *"Conducting a hazard analysis / Evidence showing a control measure is effective / Determining critical control points and their critical limits / Monitoring procedures / Corrective action procedures / Verification procedures / Record keeping"* — and it **extends** them with supporting programs (sanitation, premises/equipment, recall & complaints, traceability, incoming materials, training). CFIA publishes **generic PCP templates for domestic food businesses** that CONC can reuse as a skeleton (https://inspection.canada.ca/en/preventive-controls/preventive-control-plans/domestic-food-businesses). *(No food-service-specific generic model is published; the domestic-food-business template is the closest reusable starting point.)*

### Health Canada Listeria policy — this **does affect** the ≤ 7-day ROP assumption.
Health Canada's *Policy on Listeria monocytogenes in Ready-to-Eat Foods (2023)* classifies RTE foods by growth potential **and shelf-life**:
- **Category 1** = *"RTE foods … which support the growth of L. monocytogenes … throughout the stated shelf-life"* **with refrigerated shelf-life > 5 days** — highest scrutiny; **Health Risk 1** (zero-tolerance: *"Action level = Detected in 125 g"*).
- **Category 2A** includes *"RTE refrigerated foods with a stated shelf-life of 5 days or less."*
- **Category 2B** = growth will not occur (e.g. *"pH < 4.4 …"*, *"aw < 0.92 …"*, *"combination of pH < 5.0 and aw < 0.94,"* frozen, or *"≤ 0.5 log CFU/g"* growth over shelf-life).
- **Vulnerable-population override:** *"Irrespective of category, the detection of L. monocytogenes in RTE foods specifically produced for consumption by vulnerable populations … may trigger a Health Risk 1 concern."*
- (https://www.canada.ca/en/health-canada/services/food-nutrition/legislation-guidelines/policies/listeria-monocytogenes-ready-eat-foods/principles-controlling-listeria-monocytogenes.html and …/control-measures.html)

**Implication for CONC:** a refrigerated, vacuum-packed RTE meal held **7 days (> 5)** that supports *L. mono* growth is a **Category 1** food **made for a vulnerable population** → the strictest (Health Risk 1 / detection) standard. The ≤ 7-day assumption is **not safe by default**. Three defensible paths:
1. **Keep 7 days** → store **< 3 °C**, treat as Category 1, add a **validated listericidal step** (a 90 °C/10-min-equivalent cook is both listericidal *and* the FSA botulinum barrier), and run **environmental monitoring** (the policy expects FCS sampling for foods made for vulnerable populations); **or**
2. **Drop the use-by to ≤ 5 days** → the food becomes **Category 2A** (much lower scrutiny); **or**
3. **Formulate to Category 2B** (pH/aw barrier) where the dish allows.

*Scope caveat:* the Listeria policy formally targets **manufacturers, not retail/food-service** (*"retail food businesses that sell food directly to consumers are not subject to the Listeria policy"*). Whether a central cook-chill kitchen distributing between two sites is a "manufacturer" is a TPH/CFIA classification question — but the **category logic maps directly** onto CONC's product and is the right best-practice frame.

---

## 8. Open uncertainties / sources not fully verified (honest disclosure)

1. **FDA Food Code section text (§3-501.14 cooling, §3-501.17 date-marking, §3-403.11 reheating, §3-502.12 ROP):** second pass retrieved the official 2022 Food Code PDF and extracted the relevant section evidence. These FDA values remain **best-practice cross-checks only** — the binding-in-Ontario gap-fillers (MOH cooling, HC/TPH reheat & shelf-life) remain primary.
2. **O. Reg. 493/17 text** was captured from the **official Ontario e-Laws downloadable `.doc`** (`ontario.ca/laws/docs/170493_eV002.doc`) and the **official MOH 2019 Reference Document**, because the live e-Laws HTML page is a JavaScript app and CanLII returned HTTP 403 to automated fetch. Section numbers and wording matched across both primary sources (consolidation current to Jan 1 2025, last amendment 497/24).
3. **Toronto Municipal Code Ch. 545 §545-5G(17)** quotes are verbatim from the **2006 enacting by-law** (law0678.pdf), but second pass found the current consolidated Ch. 545 PDF does not contain "food handler." Treat the each-area wording as historical unless TPH confirms otherwise. The binding current food-handler requirement is O. Reg. 493/17 s. 32.
4. **FDA HSP §3-801.11** prohibited-foods text was not retrieved verbatim; the Health Canada immunocompromised foods-to-avoid list (primary, March 2025) carries the same controls and is quoted instead.
5. **Listeria policy applicability** (manufacturer vs food-service) is a jurisdictional question for TPH/CFIA — treated as best-practice here.
6. **Process note:** the multi-agent research workflow that produced the three primary-source foundations (O. Reg. 493/17, TPH, Health Canada) completed those reads, but its 13 per-question structured-finding + adversarial-verification agents were cut short by API rate/session limits. This report was synthesized by the primary session from the three completed verbatim foundation extracts plus targeted follow-up research (FSA 10-day rule, CFIA licensing + PCP). The **adversarial citation-verification layer was not run**; quotes were taken directly from the foundation agents' retrieved text and the follow-up fetches, but a second-pass verification of each quote against its source URL is advisable before the plan is finalized.

---

*Sources (all accessed 2026-06-24): O. Reg. 493/17 — ontario.ca/laws/regulation/170493 (text via ontario.ca/laws/docs/170493_eV002.doc) · MOH Food Premises Reference Document 2019 — files.ontario.ca/moh-ophs-ref-food-premise-reference-document-2019-en.pdf · Toronto Public Health — toronto.ca food-safety pages (specialty-foods, centralized-kitchens, food-handler-certification, starting-a-food-business) · Toronto Municipal Code Ch. 545 — toronto.ca/legdocs/bylaws/2006/law0678.pdf · Health Canada — safe-internal-cooking-temperatures, safe-food-handling-immunocompromised-individuals (Mar 2025), food-safety-vulnerable-populations, Listeria policy (2023) principles + control-measures · FDA Food Code 2022 §3-401.11/.501.14/.501.17/.403.11/.502.11/.502.12 — fda.gov · UK FSA/ACMSF 10-day rule — chilledfood.org/the-10-day-rule-for-shelf-life · CFIA — inspection.canada.ca food-licences + preventive-control-plans.*
