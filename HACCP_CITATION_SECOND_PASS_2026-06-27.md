# CONC HACCP — Citation Second Pass

**Date:** 2026-06-27  
**Purpose:** Re-check the material citation claims in `HACCP_REGULATORY_FINDINGS.md` against current primary/current web sources, then separate confirmed source truth from architect decisions and remaining human/PHI questions.

This is not a legal opinion. It is an audit trail for the HACCP docs. The current critical-limit source of truth remains `HACCP_HAZARD_ANALYSIS.md` §4. The 2026-06-24 regulatory findings file is research history; it contains some superseded recommendations, especially the old ROP `<3 °C` path.

---

## Executive result

The core legal spine checks out:

- **Ontario binding temperature rule:** O. Reg. 493/17 s. 27 binds cold/hot holding and transport at **≤4 °C or ≥60 °C**.
- **Ontario performance-duty framing:** non-s.27 numbers should be phrased as CONC's evidence-based standards under s. 26(2), not as "the regulation requires."
- **Cooking temperatures:** Health Canada still supports the main cook targets in the plan: poultry and ground poultry 74 °C, ground beef/pork 71 °C, fish 70 °C, egg dishes/mixed leftovers 74 °C.
- **Cooling:** the Ontario MOH reference still supports **60→20 °C within 2 h, then 20→4 °C within 4 h** as the Ontario gap-filler.
- **Record retention:** no current source found a binding general temperature-log retention period; the plan's **2-year** retention is a CONC voluntary commitment above the statutory floor.
- **HACCP is voluntary for current CONC foodservice:** no current source found a general Ontario HACCP mandate or named ROP variance regime for the present workflow. s. 34 remains the future trigger for manufactured meat processes.

The important caveat:

- Toronto's public **sous-vide / vacuum packaging** page still carries a stricter advisory path for sous-vide-style vacuum foods, including below-3 °C storage language. The current HOUSE plan intentionally does **not** adopt that as the governing standard; Jason's locked decision is **≤4 °C + validated barrier**. Treat the Toronto page as citation context and PHI-discussion material, not as an automatic plan rewrite.

---

## Claim-by-claim status

| Claim | Second-pass status | Source / note |
|---|---|---|
| O. Reg. 493/17 uses "potentially hazardous food" and defines it around foods needing time/temperature control. | **Confirmed.** | [O. Reg. 493/17](https://www.ontario.ca/laws/regulation/170493), s. 1. |
| s. 26(2) is the performance-duty hook: food must be processed so it is safe to eat. | **Confirmed.** | [O. Reg. 493/17](https://www.ontario.ca/laws/regulation/170493), s. 26. |
| s. 27 binds PHF storage/distribution/transport/display/sale at ≤4 °C or ≥60 °C. | **Confirmed.** | [O. Reg. 493/17](https://www.ontario.ca/laws/regulation/170493), s. 27. This is the plan's strongest binding numeric citation. |
| s. 27 permits only a limited preparation/processing/manufacturing excursion outside the s. 27 temperatures. | **Confirmed.** | [O. Reg. 493/17](https://www.ontario.ca/laws/regulation/170493), s. 27(2)(a). Keep the plan's "≤2 h prep window" framing. |
| Ontario does not prescribe a general HACCP plan for ordinary foodservice; s. 34 matters for manufactured meat. | **Confirmed in principle.** | [O. Reg. 493/17](https://www.ontario.ca/laws/regulation/170493) includes s. 34 for manufactured meat. No general HACCP/ROP variance text found in the regulation. |
| Health Canada cook temps: poultry/ground poultry 74 °C; ground beef/pork 71 °C; fish 70 °C; egg dishes 74 °C. | **Confirmed.** | [Health Canada safe internal cooking temperatures](https://www.canada.ca/en/health-canada/services/general-food-safety-tips/safe-internal-cooking-temperatures.html). |
| Ontario/MOH cooling gap-filler: 60→20 °C within 2 h and 20→4 °C within 4 h. | **Confirmed.** | [MOH Food Premises Reference Document, 2019](https://files.ontario.ca/moh-ophs-ref-food-premise-reference-document-2019-en.pdf). |
| Reheat to 74 °C is a Health Canada/MOH/FDA best-practice, not an Ontario numeric rule. | **Confirmed as best-practice framing.** | Health Canada and MOH support 74 °C reheating guidance; O. Reg. 493/17 does not provide a separate reheating numeric table. |
| Reheat within 2 h and reheat once only. | **Cleared with distinction.** | FDA Food Code 2022 supports the 74 °C/165 °F within-2-hours reheat target for hot holding. "Once only" remains a CONC/industry operating rule, not a located statute. |
| Toronto sous-vide/vacuum guidance includes a below-3 °C path and 7-day cap. | **Confirmed as Toronto guidance, but superseded in the live HOUSE plan by architect decision.** | [Toronto specialty foods guidance](https://www.toronto.ca/community-people/health-wellness-care/health-programs-advice/food-safety/food-safety-for-businesses/food-safety-resources/specialty-foods/). Keep as PHI-discussion context. |
| ROP at ≤4 °C + validated barrier is the current plan decision. | **Confirmed as architect decision, not directly sourced law.** | Source of truth: `HACCP_HAZARD_ANALYSIS.md` §4 and `HACCP_SESSION_HANDOFF_2026-06-27.md`. Keep it distinguished from Toronto's older advisory path. |
| ROP use-by ≤7 days from cook day; label cook date/time, product identity, discard-by. | **Supported, with nuance.** | Toronto/FDA support date/discard labelling and 7-day frames in relevant contexts. The live plan's defensibility depends on the validated barrier record. |
| Health Canada Listeria policy supports treating >5-day RTE foods that support growth as a higher-risk category. | **Confirmed as best-practice context; applicability to foodservice remains jurisdictional.** | [Health Canada Listeria policy principles](https://www.canada.ca/en/health-canada/services/food-nutrition/legislation-guidelines/policies/listeria-monocytogenes-ready-eat-foods/principles-controlling-listeria-monocytogenes.html) and related control-measures page. |
| TPH centralized-kitchen material expects temperature logs, delivery temperature verification, and 7-day retained samples. | **Confirmed as TPH guidance.** | [Toronto food sample collection and storage protocol](https://www.toronto.ca/community-people/health-wellness-care/health-programs-advice/food-safety/food-safety-for-businesses/food-safety-resources/food-sample-collection-storage-protocol/). |
| O. Reg. 493/17 record-retention floor: purchase and pest-control records ≥1 year; no general temp-log mandate located. | **Confirmed.** | [O. Reg. 493/17](https://www.ontario.ca/laws/regulation/170493), ss. 13 and 29. The 2-year HACCP retention remains CONC's voluntary commitment. |
| Toronto Ch. 545 requires a certified supervisory handler in each area. | **Cleared / corrected.** | The phrase is supported by historical By-law 678-2006, but the current consolidated Ch. 545 PDF does not contain "food handler." Do not cite Ch. 545 as the current source for the each-area rule. |
| Current food-handler legal floor. | **Confirmed.** | Use [O. Reg. 493/17](https://www.ontario.ca/laws/regulation/170493) s. 32: one certified food handler or supervisor on the premises during every hour of operation. Treat "each area" as CONC's own coverage practice unless TPH says otherwise. |
| City food-handler program / approved provider. | **Operationally current source identified.** | Use [Toronto food handler certification](https://www.toronto.ca/community-people/health-wellness-care/health-programs-advice/food-safety/food-handler-certification/) before booking training or naming a provider. |
| No CFIA Safe Food for Canadians licence is needed for food traded only within one province. | **Confirmed in principle.** | [CFIA food business activities](https://inspection.canada.ca/en/food-licences/food-business-activities). |
| CFIA PCP model is best-practice structure, not binding here. | **Confirmed.** | [CFIA preventive control plans](https://inspection.canada.ca/en/food-safety-industry/preventive-control-plans). |
| UK FSA/ACMSF 10-day rule details and barrier values. | **Cleared via archived official FSA guide.** | The live FSA page is gone, but the UK Government Web Archive has the official Food Standards Agency `vacpacguide.pdf` (July 2008). It supports the >10-day controlling factors: 90 °C/10 min equivalent, pH 5 or less, salt 3.5% aqueous phase, aw 0.97 or less, or a validated combination. |

---

## Corrections / doc hygiene to carry forward

1. **Do not use `HACCP_REGULATORY_FINDINGS.md` as the live critical-limit owner.** It is research history. Use `HACCP_HAZARD_ANALYSIS.md` §4.
2. **Do not resurrect `<3 °C` as the ROP answer.** It is valid citation context from Toronto sous-vide guidance, but the current HOUSE plan decision is **≤4 °C + validated barrier**.
3. **Keep the binding-vs-voluntary language sharp.** The only binding numeric food-temperature limits currently confirmed are s. 27's cold/hot/transport limits.
4. **Use "2 years" as a CONC commitment, not as a statutory temperature-log rule.**
5. **Do not cite the old Ch. 545 each-area food-handler clause as current law.** Cite O. Reg. 493/17 s. 32 for the binding food-handler floor; keep "each area" only as CONC practice unless TPH confirms otherwise.

---

## Remaining source / authority tasks

- Ask TPH/PHI how they classify CONC's current workflow: generic ROP, sous-vide, centralized kitchen, or something else. Record that answer as jurisdictional context, not as an automatic rewrite.
- Before booking training, use Toronto's current food-handler certification page to pick an accepted provider.
