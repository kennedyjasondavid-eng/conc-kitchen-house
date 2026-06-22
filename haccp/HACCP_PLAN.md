# CONC Kitchen — HACCP Food-Safety Plan

> **Status: DRAFT v0.1 (2026-06-22) — for architect review.** This is Phase 0 of `HACCP_INTEGRATION_PLAN.md`. It is a *written plan*, not a certified HACCP study. Items needing a real-world value or a sign-off are marked **▢ CONFIRM** and collected in §13.
>
> **This plan must be reviewed and signed off by the person responsible for food safety at CONC, and should be checked against current Toronto Public Health / Ontario *Food Premises Regulation* (O. Reg. 493/17) guidance before it is relied on.** The temperatures below are the standard Health Canada / Ontario figures, but the named owner confirms them for this operation.

---

## 1. Purpose & scope

This plan documents how CONC (Christie Ossington Neighbourhood Centre) shelter catering keeps food safe from the point it is received to the point it is served, and how that safety is recorded so it can be demonstrated to funders, public health, and the board.

**Who we serve:** residents of CONC shelter programs — a population that includes elderly, immuno-compromised, and otherwise vulnerable individuals. This *raises* the stakes: the margin for a food-safety error is smaller here than in a typical restaurant, which is the reason this plan exists.

**Sites in scope (reno period):**
- **Bloor** — primary kitchen (under renovation; reduced cook capacity)
- **Rex (Rexdale)** — overflow cooking + on-site assembly + service
- **LAN** — supplemental cooking + cold-prep capacity

Food is cooked at one site, often chilled, and moved between sites by van before service. **This multi-site cold chain is the central food-safety reality of the operation** and is why cold-holding temperatures are the first thing this plan records.

**Scope of records, v1:** **fridge and freezer (cold-storage) temperatures**, plus thermometer calibration. Cooking, cooling, reheating, and transport temperatures are identified as control points below and are controlled today through standard practice and the production scheduler's enforced cold-hold times; **systematic temperature *records* for those points are Phase 2** (see §12 and `HACCP_INTEGRATION_PLAN.md`).

---

## 2. The food-safety team & responsibilities

| Role | Responsibility |
|---|---|
| **Food Safety Lead** ▢ CONFIRM (name) | Owns this plan; reviews records; signs off corrective actions; annual plan review. |
| **Site supervisors** (Bloor / Rex / LAN) ▢ CONFIRM (names) | Ensure checks happen on their site; digitize the paper log into HUB. |
| **Kitchen staff on shift** | Perform the temperature checks; record the reading + initials on the paper log; flag anything out of range immediately. |
| **Systems (HUB / PROOF / EXPO)** | HUB captures the digitized record; PROOF produces the funder report; EXPO enforces cold-hold timing. Tools support the people — they do not replace the sign-off. |

---

## 3. Process & product description

CONC produces multi-component meals (lunch + dinner, with regular / halal / vegan / allergen-modified streams) on a 4-week rotating menu, for roughly 160 residents per meal. ▢ CONFIRM (headcount)

The production flow, as already modelled by the EXPO scheduler:

```
RECEIVE → STORE (cold / frozen / dry) → PREP → COOK → CHILL (blast/bag)
   → COLD HOLD → VAN TRANSPORT (site→site) → REHEAT → HOT HOLD → SERVE
```

Most food is **cook–chill**: cooked in advance, rapidly chilled, held cold (sometimes for several days), moved between sites cold, then reheated to order. A smaller set is **cook-serve same day**, and some is **vendor-delivered ready-to-eat** (e.g. pizza). Each path has different control points; the cook–chill path carries the most risk and the most control points.

---

## 4. Hazard analysis (HACCP principle 1)

| Hazard type | Examples in this kitchen | Primary control |
|---|---|---|
| **Biological** | Bacterial growth (*Salmonella*, *Listeria*, *C. perfringens*) in the temperature danger zone (4–60 °C); growth during slow cooling or long cold holding | Keep food out of the danger zone: cook hot enough, chill fast enough, hold cold enough, reheat hot enough. |
| **Allergen** | An allergen reaching a resident with that allergy (anaphylaxis risk) | DOOR's exclude-array routing — anaphylactic flags are never silently overridden and are surfaced in red with explicit acknowledgement. (Already enforced.) |
| **Chemical** | Cleaning chemicals, sanitizer residue | Prerequisite programs (§11): labelled storage, correct dilution. |
| **Physical** | Foreign objects (glass, metal, packaging) | Prerequisite programs (§11): receiving checks, equipment maintenance. |

**The dominant, recurring hazard is biological growth driven by time and temperature** across a multi-site cold chain. That is what the Critical Control Points below target.

---

## 5. Critical Control Points & critical limits (principles 2 & 3)

A **CCP** is a step where control is *essential* and where loss of control would likely cause harm. The critical limit is the measurable line between safe and unsafe.

| # | CCP | Critical limit (standard Health Canada / Ontario figures) ▢ CONFIRM | Records in v1? |
|---|---|---|---|
| **CCP-1** | **Cold storage** (fridges, walk-ins) | ≤ **4 °C** | ✅ **Yes — this plan** |
| **CCP-2** | **Frozen storage** (freezers) | ≤ **−18 °C** | ✅ **Yes — this plan** |
| CCP-3 | **Cooking** | Internal ≥ **74 °C** (poultry/eggs/reheated; ground meat ≥ 71 °C; whole-muscle cuts per Health Canada) held ≥ 15 s | Phase 2 |
| CCP-4 | **Cooling** (cook → chill) | **60 → 20 °C within 2 h**, then **20 → 4 °C within 4 h** (≤ 6 h total) | Phase 2 *(EXPO already enforces the cold-hold timing model today)* |
| CCP-5 | **Reheating** for hot holding | Internal ≥ **74 °C** within 2 h | Phase 2 |
| CCP-6 | **Hot holding** | ≥ **60 °C** | Phase 2 |
| CCP-7 | **Transport** (site-to-site van) | Cold loads ≤ **4 °C**; hot loads ≥ **60 °C** | Phase 2 |

> The danger zone is **4 °C – 60 °C**. Every limit above exists to keep food out of it, or to move it through quickly.

**v1 actively records CCP-1 and CCP-2.** CCP-3 through CCP-7 are real and are documented here so the plan is complete and honest; their control today rests on established cooking practice plus EXPO's enforced cold-hold timing, with temperature-record capture scheduled for Phase 2.

---

## 6. Monitoring (principle 4) — what v1 actually does

**What:** the temperature of every fridge and freezer in scope (the unit list lives in `haccp_spec.json`).

**When:** **twice daily — once AM, once PM.** ▢ CONFIRM (frequency)

**How:** a calibrated probe / unit thermometer is read; the reading and the checker's initials are written on the **paper log clipped to the unit**. Later (end of shift or end of week), a supervisor types the readings into HUB, which publishes the digital record.

**Who:** kitchen staff on shift record on paper; a site supervisor digitizes.

**The reading is the monitor; the initials are the accountability; the paper-then-HUB path is what makes it a record.**

---

## 7. Corrective actions (principle 5)

When a reading is **outside the critical limit**, the person who finds it acts immediately and records what they did. Standard responses:

| Situation | Action |
|---|---|
| Fridge > 4 °C / freezer > −18 °C, food still within safe time | Move food to a working unit; call for repair; note time + action. |
| Unit warm and food has been in the danger zone too long / time unknown | **Discard the affected food.** When in doubt, throw it out — this population cannot absorb the risk. |
| Repeated/expanding failure on one unit | Escalate to the Food Safety Lead; remove the unit from service until repaired and re-verified. |

Every out-of-range reading **requires a one-line corrective-action note** before the record can be saved (HUB enforces this in Phase 1). That note is the single most important thing a funder or inspector looks for: *not* that nothing ever went wrong, but that when it did, someone caught it and acted.

---

## 8. Verification (principle 6)

Verification = confirming the system is working, separate from doing the monitoring.

- **Daily:** the supervisor digitizing the log sees gaps and out-of-range entries as they enter them.
- **Monthly:** PROOF's HACCP report (R6) shows **completeness** (% of required checks done) and an **exceptions list** (every out-of-range event + its corrective action). The Food Safety Lead reviews and signs off.
- **Thermometer calibration:** see §10.
- **Annual:** full plan review (§12).

The PROOF report stamps the exact version of the underlying record it was built from — so a verification sign-off is traceable to specific data.

---

## 9. Record-keeping (principle 7)

| Record | Where it lives | Retention |
|---|---|---|
| Daily temperature logs (paper) | Clipped at the unit, then filed | ▢ CONFIRM (suggest ≥ 1 year) |
| Digital temperature record (`haccp_log.json`) | Published by HUB; full history in git | Indefinite (version-controlled) |
| Corrective-action notes | Inside the digital record | With the record |
| Calibration records | In the digital record | ▢ CONFIRM (suggest ≥ 1 year) |
| Monthly verification PDFs | Exported from PROOF; archived | ▢ CONFIRM (suggest ≥ funder requirement, often 2–3 years) |

The git history of `haccp_log.json` plus the archived monthly PDFs is the durable, tamper-evident record. ▢ CONFIRM whether the funder requires a formal retention period / labelled storage — if so, that triggers the PROOF SharePoint (Tier-2) upgrade noted in the integration plan.

---

## 10. Thermometer calibration

A temperature record is only as trustworthy as the thermometer. Probe thermometers are calibrated by the **ice-point method** (0 °C in an ice-water slurry) on a regular cadence ▢ CONFIRM (suggest monthly), and after any drop or suspected fault. Each calibration is recorded (probe id, date, checker, pass/fail). A probe that fails is recalibrated or removed from service.

---

## 11. Prerequisite programs (the foundation HACCP sits on)

HACCP assumes good basic practice underneath it. These are noted here as the foundation; they are managed through existing operations, not this temperature-logging system:

- **Receiving** — check temperature and condition of deliveries; reject unsafe goods.
- **Cleaning & sanitizing** — surfaces, equipment, utensils; correct sanitizer dilution.
- **Personal hygiene** — handwashing, illness reporting, glove use.
- **Pest control** — monitoring and exclusion.
- **Allergen control** — separation in prep/storage; DOOR's routing on the service side.
- **Supplier approval & traceability** — approved suppliers; ability to trace a product if recalled.
- **Equipment maintenance** — including the fridges/freezers this plan monitors.

▢ CONFIRM which of these already have written procedures; gaps can be noted as future work without blocking this plan.

---

## 12. Plan review & revision

This plan is reviewed **at least annually**, and whenever: the menu or process changes materially, a site is added or removed (e.g. when the Bloor renovation ends and the cold chain shortens), a corrective-action pattern suggests a control is inadequate, or public-health guidance changes. Revisions are dated; the change history lives in git.

**Reno → standard transition note:** when the renovation ends and cooking returns to Bloor, the multi-site cold chain (and CCP-7 transport) shrinks dramatically. The unit list in `haccp_spec.json` and CCP-7's relevance should be revisited at that point.

---

## 13. Open confirmations (what turns this draft into a final plan)

1. **Fridge/freezer inventory** — every cold unit at Bloor, Rex, LAN, with its target range. *(Fills `haccp_spec.json`; until then the spec ships `placeholder:true` and PROOF mutes the numbers.)*
2. **Funder requirement** — did the funder name a standard/framework, or ask for "documented food-safety records + a plan"? *(Sets the formality and the R6 label.)*
3. **Names** — Food Safety Lead + site supervisors (§2).
4. **Check frequency** — twice daily assumed (§6); confirm.
5. **Retention periods** — paper, PDFs, calibration (§9).
6. **Critical-limit confirmation** — the standard figures in §5, confirmed for this operation / against current Toronto Public Health guidance.
7. **Prerequisite programs** — which already have written procedures (§11).

*None of these block starting: paper logs can begin against the standard limits today, and the values fold in as they are confirmed.*
