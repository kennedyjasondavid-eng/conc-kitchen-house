# HACCP — Paste-Ready Citation / Continuation Prompt

*Created 2026-06-24; updated 2026-06-27 after the HACCP docs were authored and the architect decisions were locked. For current pickup context, read `HACCP_SESSION_HANDOFF_2026-06-27.md` first. The critical-limit source of truth is `HACCP_HAZARD_ANALYSIS.md` §4; `HACCP_REGULATORY_FINDINGS.md` is the citation/research history and still contains superseded `<3 °C` research recommendations. Citation second-pass status lives in `HACCP_CITATION_SECOND_PASS_2026-06-27.md`.*

---

## What this session is for
Continue CONC's **preliminary HACCP plan work** for the multi-site cook-chill / ROP operation. The plan docs now exist and are live in this repo. Use this prompt only for citation second-pass work, local-browser verification, or future revisions after reading the 2026-06-27 handoff. Do **not** re-do the regulatory research unless the task is specifically to verify citations; the current architect decision is voluntary HACCP, standard inspection only, and ROP at **≤4 °C + validated barrier**.

## Operation context (one paragraph)
CONC (Christie Ossington Neighbourhood Centre), Toronto, Ontario — non-profit shelter catering. Cook at two kitchens (Bloor, Rexdale) → blast-chill → **vacuum-pack (Reduced Oxygen Packaging / ROP)** → refrigerate → **van transport between sites** → reheat → serve **~300 shelter residents (a highly susceptible / vulnerable population)**. 224 recipes. **Binding regulator = Ontario O. Reg. 493/17 (Food Premises) under the HPPA, enforced by Toronto Public Health / DineSafe.** CFIA/SFCR is best-practice only (no federal licence required).

## The ONE framing rule that runs through the whole plan
**Ontario prescribes almost no numbers.** The *only* binding food-temperature rule is **s. 27 (≤ 4 °C / ≥ 60 °C)**. Everything else (cooking temps, cooling, reheating, shelf-life, ROP) is governed by the **performance standard s. 26(2): "All food must be processed in a manner that makes the food safe to eat."** So in the plan, state each numeric limit as **"CONC's evidence-based standard adopted to satisfy O. Reg. 493/17 s. 26(2)"**, citing Health Canada / MOH 2019 / TPH / FDA / FSA — **not** as "the regulation requires." Use the defined term **"potentially hazardous food" (PHF)** throughout, never "hazardous food."

---

## §4 critical-limit table to preserve / verify (current values)

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
| CCP-3 | **ROP / vacuum-packed product cold storage** | **≤4 °C + validated botulinum barrier** (not <3 °C) | CONC validated standard under s.26; cold-hold itself is binding s.27 | architect decision + TPH/FDA/FSA research history |
| CCP-3 | ROP / RTE use-by | **≤7 days from cook day at ≤4 °C, treated as Listeria Category 1, with a validated barrier** (90 °C/10-min-equiv cook by default, or pH < 5.0 / aw < 0.97 / NaCl > 3.5% where documented); prep day = Day 1 | CONC validated standard under s.26 | architect decision + TPH / FDA §3-501.17 / FSA |
| CCP-3 | ROP label | cook date, time, **discard-by date**, product identity | best-practice (TPH) | TPH |
| CCP-3 | Transport (van) | **≤ 4 °C** in transit (s. 27 names "transported") | **BINDING (s. 27)** | O. Reg. 493/17 |
| CCP-4 | Reheating | **≥ 74 °C (165 °F)**, within 2 h (best practice), reheat once (convention) | best-practice (Ontario silent) | HC / MOH / FDA §3-403.11 |
| CCP-5 | Hot-hold | **≥ 60 °C** | **BINDING (s. 27)** | O. Reg. 493/17 |
| CCP-5 | Danger zone | **4 – 60 °C**; only lawful excursion = **≤ 2 h prep window (s. 27(2)(a))** | **BINDING (s. 27)** | O. Reg. 493/17 / HC |
| CCP-6 | Allergen / HSP | exclude-array allergen control + Health Canada vulnerable-population foods-to-avoid (no non-dried deli meats unless reheated steaming; hot dogs to 74 °C; no raw/undercooked egg or meat; no raw sprouts; no unpasteurized dairy/juice; avoid soft & blue cheeses even pasteurized; no refrigerated pâté/smoked seafood) | best-practice | HC (immunocompromised, Mar 2025) |

## Corrections vs the original draft (already applied — preserve)
1. **Terminology:** "hazardous food" → **"potentially hazardous food (PHF)"** everywhere.
2. **Ground poultry = 74 °C** (split the draft's blanket "ground ≥71"; ground beef/pork stays 71 °C). *This is the only substantive temperature error.*
3. **ROP cold storage = ≤4 °C + validated barrier**. Do not re-tighten to <3 °C; that was a superseded research recommendation.
4. **Qualify the ≤7-day use-by** with Listeria Category 1 + validated barrier conditions above.
5. **Add ROP label fields** (date/time/discard/identity).
6. **Label cooking/cooling/reheat numbers as best-practice under s. 26(2)**, not "regulation requires."
7. **Add the s. 27(2)(a) 2-hour prep excursion** as the only lawful danger-zone window.
8. **Records: retention 2 years** (CONC voluntary commitment; statutory floor is 1 year for purchase/pest records); **no binding temp-log retention**, but keep logs + a **7-day retained food sample** of every RTE item (TPH Centralized Kitchens).
9. **Food handlers:** cite **O. Reg. 493/17 s. 32** as the binding floor (one certified food handler or supervisor on premises during every hour of operation). Do **not** cite old Toronto Ch. 545 each-area wording as current law; treat each-area coverage as CONC practice unless TPH confirms otherwise.
10. **No CFIA/SFC licence** — note Ontario/TPH is binding; reuse the CFIA **PCP** model (= 7 HACCP principles + supporting programs) as the doc structure.

## Recipe-hub cross-app note (staged — do not deploy without Jason's gate)
The in-app HACCP card and cook-temp text changes are built on `conc-recipe-hub` branch `claude/nifty-clarke-wtq7o8`, including ground poultry at **74 °C** and fish at **70 °C**. The work is staged for visual QA before merge/deploy. Keep `recipe_production.json` and `DOOR_RECIPE_DATA.json` byte-stable; the HACCP card is render/generation-only and must not change the published feed.

## Questions to carry to Toronto Public Health (DineSafe@toronto.ca / 416-338-7600, ask for your PHI)
1. ROP/cook-chill: confirm there is no pre-approval or variance for CONC's current workflow; ask what evidence a PHI would expect if reviewing the voluntary plan under s. 26.
2. Do they classify CONC as "sous-vide," generic "ROP," or "Centralized Kitchen"? Capture the answer as citation context without overriding the locked architect decision unless Jason re-rules it.
3. Do any recipes (cure/smoke/ferment meat) trigger the mandatory **s. 34 PHI/MOH-approved written procedures**?
4. Record retention — any required format for voluntary 2-year CCP monitoring logs?
5. Which food-handler certification provider should CONC use from Toronto's current accepted-provider guidance?
6. Confirm that the only binding cold-storage target is ≤4 °C under s. 27, and record any stricter guidance as advisory unless Jason re-rules it.
7. Any expectations for temperature monitoring/logging **during van transport** between sites?

## Open caveats before finalizing
- **Citation second-pass logged:** see `HACCP_CITATION_SECOND_PASS_2026-06-27.md`. The named loose ends are cleared: current Ch. 545 does not carry the old each-area food-handler wording, official FSA barrier text was verified through the UK Government Web Archive, and FDA section evidence was captured from the official 2022 Food Code PDF.
- **FDA Food Code exact sections:** §3-501.14, §3-501.17, §3-403.11, and §3-502.12 were verified from the official 2022 Food Code PDF as best-practice support only.
- Verbatim source backups (if still present) were extracted to `C:\Users\Jason\AppData\Local\Temp\haccp_found\` (3 foundation reads: O. Reg. 493/17, TPH, Health Canada).

## Guardrails for authoring
- These are **Markdown docs** (HACCP plan), not the single-file-HTML apps — normal doc conventions apply.
- **Cite `HACCP_REGULATORY_FINDINGS.md`** as the source of every limit; don't restate the full quotes — point to it.
- Keep the binding-vs-best-practice distinction explicit on every limit.
- This is **food safety for a vulnerable population** — when in doubt, choose the stricter value and flag it for the PHI.
