# HACCP — Paste-Ready Next-Session Prompt (author the plan from the validated limits)

*Created 2026-06-24. Paste this into a fresh HACCP working session. It is self-contained, but its **single source of truth is `HACCP_REGULATORY_FINDINGS.md`** (same repo) — open that first; every limit below is quoted + cited there.*

---

## What this session is for
Author CONC's **preliminary HACCP plan documents** for the multi-site cook-chill / ROP operation, with the **regulator-validated critical limits already baked in** (validation is done — see `HACCP_REGULATORY_FINDINGS.md`). The plan docs do **not** exist yet; you are creating them. Do **not** re-do the regulatory research — it's complete and cited.

## Operation context (one paragraph)
CONC (Christie Ossington Neighbourhood Centre), Toronto, Ontario — non-profit shelter catering. Cook at two kitchens (Bloor, Rexdale) → blast-chill → **vacuum-pack (Reduced Oxygen Packaging / ROP)** → refrigerate → **van transport between sites** → reheat → serve **~300 shelter residents (a highly susceptible / vulnerable population)**. 224 recipes. **Binding regulator = Ontario O. Reg. 493/17 (Food Premises) under the HPPA, enforced by Toronto Public Health / DineSafe.** CFIA/SFCR is best-practice only (no federal licence required).

## The ONE framing rule that runs through the whole plan
**Ontario prescribes almost no numbers.** The *only* binding food-temperature rule is **s. 27 (≤ 4 °C / ≥ 60 °C)**. Everything else (cooking temps, cooling, reheating, shelf-life, ROP) is governed by the **performance standard s. 26(2): "All food must be processed in a manner that makes the food safe to eat."** So in the plan, state each numeric limit as **"CONC's evidence-based standard adopted to satisfy O. Reg. 493/17 s. 26(2)"**, citing Health Canada / MOH 2019 / TPH / FDA / FSA — **not** as "the regulation requires." Use the defined term **"potentially hazardous food" (PHF)** throughout, never "hazardous food."

---

## §4 critical-limit table to author (validated — use these exact values)

Six CCPs: CCP-1 Cooking · CCP-2 Cooling · CCP-3 Chilled/ROP hold + transport · CCP-4 Reheating · CCP-5 Hot-hold & service · CCP-6 Allergen/anaphylactic.

| CCP | Parameter | **Critical limit** | Binding vs best-practice | Source |
|---|---|---|---|---|
| CCP-1 | Poultry pieces | **≥ 74 °C (165 °F)** | best-practice (s.26) | Health Canada chart |
| CCP-1 | Whole poultry / birds | **82 °C (180 °F)** | best-practice | HC / MOH (NOT 85 °C) |
| CCP-1 | **Ground poultry** | **74 °C (165 °F)** ⟵ **CORRECTED** | best-practice | HC (was wrongly "≥71") |
| CCP-1 | Ground beef/pork/veal/lamb | **71 °C (160 °F)** | best-practice | HC |
| CCP-1 | Whole-muscle beef/pork | **≥ 71 °C (160 °F)** (no rare/medium-rare for HSP) | best-practice | HC |
| CCP-1 | Fish | **70 °C (158 °F)** | best-practice | HC |
| CCP-1 | Eggs / egg dishes | **74 °C (165 °F)** | best-practice | HC |
| CCP-1 | Mixed dishes / casseroles / stuffing / hot dogs / leftovers | **74 °C (165 °F)** | best-practice | HC / MOH |
| CCP-2 | Two-stage cooling | **60 → 20 °C within 2 h, then 20 → 4 °C within 4 h (≤ 6 h total)** | best-practice (Ontario silent) | MOH 2019 |
| CCP-3 | General cold-hold | **≤ 4 °C** | **BINDING (s. 27)** | O. Reg. 493/17 |
| CCP-3 | **ROP / vacuum-packed product cold storage** | **< 3 °C** ⟵ **TIGHTER than ≤4** | best-practice (TPH sous-vide) | TPH |
| CCP-3 | ROP / RTE use-by | **≤ 7 days from cook day, stored < 3 °C, treated as Listeria Category 1**; longer only with a validated barrier (90 °C/10-min-equiv cook, or pH < 5.0 / aw < 0.97 / NaCl > 3.5%); prep day = Day 1 | best-practice | TPH / FDA §3-501.17 / FSA |
| CCP-3 | ROP label | cook date, time, **discard-by date**, product identity | best-practice (TPH) | TPH |
| CCP-3 | Transport (van) | **≤ 4 °C** in transit (s. 27 names "transported") | **BINDING (s. 27)** | O. Reg. 493/17 |
| CCP-4 | Reheating | **≥ 74 °C (165 °F)**, within 2 h (best practice), reheat once (convention) | best-practice (Ontario silent) | HC / MOH / FDA §3-403.11 |
| CCP-5 | Hot-hold | **≥ 60 °C** | **BINDING (s. 27)** | O. Reg. 493/17 |
| CCP-5 | Danger zone | **4 – 60 °C**; only lawful excursion = **≤ 2 h prep window (s. 27(2)(a))** | **BINDING (s. 27)** | O. Reg. 493/17 / HC |
| CCP-6 | Allergen / HSP | exclude-array allergen control + Health Canada vulnerable-population foods-to-avoid (no non-dried deli meats unless reheated steaming; hot dogs to 74 °C; no raw/undercooked egg or meat; no raw sprouts; no unpasteurized dairy/juice; avoid soft & blue cheeses even pasteurized; no refrigerated pâté/smoked seafood) | best-practice | HC (immunocompromised, Mar 2025) |

## Corrections vs the original draft (apply when authoring)
1. **Terminology:** "hazardous food" → **"potentially hazardous food (PHF)"** everywhere.
2. **Ground poultry = 74 °C** (split the draft's blanket "ground ≥71"; ground beef/pork stays 71 °C). *This is the only substantive temperature error.*
3. **ROP cold storage < 3 °C** (distinct from the general ≤ 4 °C cold-hold).
4. **Qualify the ≤ 7-day use-by** with the < 3 °C + Listeria Category 1 + barrier conditions above.
5. **Add ROP label fields** (date/time/discard/identity).
6. **Label cooking/cooling/reheat numbers as best-practice under s. 26(2)**, not "regulation requires."
7. **Add the s. 27(2)(a) 2-hour prep excursion** as the only lawful danger-zone window.
8. **Records: retention ≥ 1 year** (statutory floor — s. 29(2)/s. 13(2)); **no binding temp-log retention**, but keep logs + a **7-day retained food sample** of every RTE item (TPH Centralized Kitchens).
9. **Food handlers:** add the **Toronto Ch. 545** rule (certified supervisory handler in *each area* at all times) above the provincial s. 32 floor.
10. **No CFIA/SFC licence** — note Ontario/TPH is binding; reuse the CFIA **PCP** model (= 7 HACCP principles + supporting programs) as the doc structure.

## Recipe-hub cross-app note (do NOT auto-apply — Jason's call)
The only recipe-data value implied by the corrections is **ground poultry → 74 °C**. If/when Jason approves: check `conc-recipe-hub` cook-temp text (`CONC_Recipe_Data.js`, `index.html`) for any ground-poultry temp encoded at 71 °C; if present, correct to 74 °C and **re-baseline `tests/method_snapshot.mjs --update`**, keeping `recipe_production.json` + all test baselines green. (Confirmed present: the clone, the test, and cook-temp strings — but not yet verified that it encodes a ground-poultry temp.) All other cook temps confirm — no other recipe-hub change.

## Questions to carry to Toronto Public Health (DineSafe@toronto.ca / 416-338-7600, ask for your PHI)
1. ROP/cook-chill: pre-approval, variance, or review-on-request? What must the food-safety plan contain to satisfy s. 26?
2. Do they classify CONC as "sous-vide," generic "ROP," or "Centralized Kitchen"? (Determines < 3 °C vs ≤ 4 °C cold storage.)
3. Do any recipes (cure/smoke/ferment meat) trigger the mandatory **s. 34 PHI/MOH-approved written procedures**?
4. Record retention — is 1 year enough for CCP monitoring logs, or 2 years for the special process? Required format?
5. Is **Toronto Municipal Code Ch. 545 §545-5G(17)** still in force as worded, and which approved certification provider (City program is suspended)?
6. Confirm binding cold-storage target for the vacuum-packed product (< 3 °C vs ≤ 4 °C).
7. Any expectations for temperature monitoring/logging **during van transport** between sites?

## Open caveats before finalizing
- **Citation second-pass advisable:** the validation's adversarial-verification layer didn't run (API limits). Quotes in `HACCP_REGULATORY_FINDINGS.md` were taken directly from retrieved primary text but not independently re-checked.
- **FDA Food Code verbatim** for §3-501.14 / §3-501.17 / §3-403.11 couldn't be fetched (corrupted/404 PDFs); their values are best-practice cross-checks only and the Ontario-governing gap-fillers (MOH/HC/TPH) are primary-quoted. Confirm FDA verbatim against the official 2022 Food Code if cited.
- Verbatim source backups (if still present) were extracted to `C:\Users\Jason\AppData\Local\Temp\haccp_found\` (3 foundation reads: O. Reg. 493/17, TPH, Health Canada).

## Guardrails for authoring
- These are **Markdown docs** (HACCP plan), not the single-file-HTML apps — normal doc conventions apply.
- **Cite `HACCP_REGULATORY_FINDINGS.md`** as the source of every limit; don't restate the full quotes — point to it.
- Keep the binding-vs-best-practice distinction explicit on every limit.
- This is **food safety for a vulnerable population** — when in doubt, choose the stricter value and flag it for the PHI.
