# CONC HACCP Plan — Working Draft / Sketch

**Operation:** Christie Ossington Neighbourhood Centre (CONC) shelter catering — Bloor + Rexdale kitchens serving the Bloor, Rexdale & Lansdowne shelter sites.
**Date:** 2026-06-24
**Document status:** Pre-validation **sketch**. Proposed temperatures/times are standard Health Canada / Ontario Reg. 493/17 / Toronto Public Health references **to be confirmed with the local public health unit and validated on-site** — they are *not* yet CONC-specific critical limits.
**Provenance:** Grounded in the live HOUSE apps as of this date — DOOR (resident/dietary/allergen routing), HUB (production board: chips, FRIDGE, MOVES, van routes), MISE/CODEX (224 recipes, allergen feed). HACCP-correct thermal *procedures* already exist as MISE cook-card method text (two-stage blast-chill, reheat-to-74 °C-once, cut-specific cook temps, ROP "use-by" labelling); what's absent is any thermal *data field, log, or monitoring record* — the gap between a written procedure and verifiable HACCP. **Full hazard analysis, CCP determination & critical limits (Principles 1–3): see the companion annex `HACCP_HAZARD_ANALYSIS.md`.**

---

## A note on framework and scope of this draft

HACCP is built in the **Codex 12-step logic sequence** = 5 *preliminary steps* (1–5) + the 7 *principles* (steps 6–12). This draft completes **preliminary Steps 1–3 in depth** (HACCP team · product description · intended use & consumers) and sketches **Step 4 (flow diagrams)** with explicit start/end points. The seven principles are then worked out in two companion annexes: **Principles 1–3** (hazard analysis → CCP determination → critical limits) in **`HACCP_HAZARD_ANALYSIS.md`**, and **Principles 4–7** (monitoring → corrective actions → verification → records, plus the temperature-capture schema) in **`HACCP_MONITORING_RECORDS.md`**. What remains is execution: Step 5 on-site flow verification and public-health validation (see final section). A read-first executive summary of the whole set is in **`HACCP_PRELIMINARY_HAZARD_ANALYSIS.md`**.

Because CONC runs **224 recipes**, one-plan-per-recipe is impossible. This uses the **Process Approach** (FDA/Codex foodservice model): every menu item falls into one of three process categories defined by *how many times the food passes through the temperature danger zone* (4 °C–60 °C). That maps almost perfectly onto CONC's existing HUB chip vocabulary.

---

## ⌖ Scope & Boundaries — the precise START and END points

**System-level boundary (the whole plan):**

- **START ▸ Receiving.** The moment raw ingredients/supplies are accepted at the receiving door of the **Bloor** or **Rexdale** kitchen. (Everything upstream — supplier farming, processing, distribution — is controlled by the *Supplier Approval* prerequisite program, not by a CCP in this plan.)
- **END ▸ Service or documented discard.** The moment a plated meal is handed to / made available to a resident at Bloor, Rexdale, or Lansdowne — **or** the documented disposal of unserved food. Once the resident receives the meal it leaves scope (there is no consumer cook-step — see Step 3).

**Three process categories, each with its own precise start→end:**

| Process | CONC chips involved | Danger-zone passes | Start → End |
|---|---|---|---|
| **P1 — No-Cook / Cold** | PREP (cold) | 0 (no kill step) | Receiving → cold prep/assembly → cold hold → serve |
| **P2 — Same-Day Cook-Serve** | COOK, (HOT) SEND | 1 (up only) | Receiving → cook → hot-hold/transport → serve **same day** |
| **P3 — Cook-Chill-Transport-Reheat** | COOK, COOL, PREP, SEND, PULL, PARK, HEAT | 2+ (up, down, up again) | Receiving → cook → **cool** → cold/frozen hold (up to 8 d) → van transport → **reheat** → serve |

P3 is the bulk of CONC's volume and the **highest-risk** flow — multiple danger-zone crossings, multi-day holds, and an inter-site cold chain.

---

## Step 1 ▸ Assemble the HACCP Team

A HACCP plan is owned by a named, competent, multi-disciplinary team — not one person. Proposed composition mapped to CONC's actual roles:

| Seat | CONC role | HACCP responsibility |
|---|---|---|
| **HACCP Coordinator / Team Lead** | Kitchen Manager / Head Chef (certified food handler — Ontario requires ≥1 certified handler on premises) | Owns the plan, chairs reviews, signs off corrective actions, liaises with Toronto Public Health |
| **Production lead — Bloor** | Bloor kitchen lead | Owns COOK + COOL + PREP (vac-bag) + the FRIDGE at the production end |
| **Service lead — Rexdale** | Rex kitchen lead | Owns day-of COOK, HEAT (reheat), hot-hold, plating at the service end |
| **Logistics / cold-chain** | Driver(s) / transport coordinator | Owns SEND (AM/PM van runs), PULL/thaw, MOVES — the inter-site cold chain |
| **Dietary & medical compliance** | Health & Wellness (H&W) representative | Owns allergen/anaphylactic control, resident medical diets, the DOOR exclude-array, H&W sign-offs |
| **Systems / records owner** | DOOR/EXPO/HUB/MISE architect | Owns the digital traceability backbone and the records/monitoring tooling (Principle 4 & 7 enabler) |
| **External resource (advisory)** | Toronto Public Health PHI; optionally a Registered Dietitian | Validates critical limits, audits, reviews the plan |

**CONC-specific note:** the digital system (**DOOR** routing/plating · **EXPO** scheduling · **HUB** the daily board with FRIDGE/MOVES · **MISE/CODEX** recipes/allergens) is effectively the team's **documentation and traceability backbone** — it already records *what* is cooked, *where* it goes, *how many days* it's held, and *which allergens* are present. **Its one gap is thermal data** (no temperatures, cooling times, or hold-temp logs exist anywhere). Closing that gap is this team's primary build task (see Recommendations).

**Terms of reference:** scope = the three process flows above, all three sites, all four streams (regular/vegan/halal/vegan_protein); meets on a fixed cadence and on any menu/process/site change.

---

## Step 2 ▸ Describe the Product(s)

Under the process approach we describe the **meal output as food groups** rather than 224 individual cards.

| Attribute | Description |
|---|---|
| **Product** | Hot and cold ready-to-eat meals — breakfast, lunch, dinner — on a fixed **28-day rotating menu**, in four parallel streams: **Regular (164), Vegan (34), Halal (11), Vegan-Protein (15)** |
| **Food-group composition** | Cooked proteins (chicken/beef/pork/fish/tofu); stews, curries & braises; cooked rice & grains; soups; cooked & raw vegetable sides; salads (incl. mayo-based: Coronation/Ranch/Tuna); sauces/marinades; breads & desserts; breakfast egg/pancake items |
| **TCS classification** | **Predominantly TCS** (time/temperature-control-for-safety): cooked poultry/meat/fish/egg/dairy, **cooked rice (*B. cereus*)**, legume stews & soups (***C. perfringens***), creamy/mayo items (*Listeria/Salmonella*). Non-TCS: dry spice blends, sealed breads/cakes, acidified raw slaw |
| **Allergens present** | Full **Health Canada priority** set in the menu: wheat/gluten (69 recipes), soy (30), milk (22+), egg (24+), fish/Basa (4), sesame (3), peanut (2), tree nut/**coconut**, sulphites (20), mustard (6), oats (7). CONC-tracked extensions: **nightshades (53), spicy (30)** |
| **Packaging** | Vacuum-seal (`vac`), cambro, bins, hotel pans — varies by process leg |
| **Storage & distribution** | Cold cook-chill (refrigerated), frozen stock (PULL/thaw chains), and hot same-day transport — by **van between sites** (Bloor↔Rex↔LAN), on scheduled **AM/PM runs** |
| **Shelf life / hold** | Scheduled chilled holds run **5 d (37 items), 6 d (22), 7 d (2), 8 d (4, e.g. Vegan Chilli)** under a MISE vac-bag label of **"use by 2 weeks @ ≤41 °F."** ⚠ **For Reduced-Oxygen Packaging (53 vac recipes) at ≤4 °C without a botulinum barrier, 14 days is too long — recommended critical limit ≤7 d (annex CCP-3).** Frozen holds (e.g. 11 d "Shape & Freeze" patties) are a separate regime; a 27 d "Shakshuka" + 9 ambiguous "?d" holds need classifying. |
| **Where consumed** | On-site at the three shelters; no retail sale |

---

## Step 3 ▸ Identify Intended Use & Consumers

This step sets the **risk tier**, and for CONC it sets it **high**.

- **Consumers: ~300 shelter residents** — Rexdale (181), Lansdowne (~90 incl. Roncy + winter warming-centre), Bloor (30). Shelter populations skew toward a **highly susceptible / vulnerable population** (HSP): elevated rates of chronic illness, immunocompromise, older adults, and others for whom a foodborne illness is more likely and more severe. **Implication:** CONC should adopt the *stricter* end of every control — e.g., no raw/undercooked TCS items for at-risk diners, no bare-hand contact with ready-to-eat food, conservative cooling/hold limits, and the lowest defensible cold-hold shelf life.
- **Intended use: ready-to-eat, consumed as served.** Reheated (HEAT) meals are consumed immediately; there is **no consumer-side cook or kill step.** The kitchen is the **last line of defense** — whatever leaves service is what's eaten.
- **Method of consumption:** plated to the resident per DOOR's routing/plating sheets; some grab/room delivery; eaten shortly after service.
- **Dietary & allergen needs are a co-equal critical concern.** DOOR routes residents through **12 dietary streams** (Vegan/Veg, Halal, No-Processed, No-Fish/Shellfish, GF, No-Dairy, No-Beef, Diabetic, Bland, Soft/texture-modified, No-Egg/Mustard, Regular) **plus a separate Anaphylactic Alternative**. The **anaphylactic exclude-array is "sacred"** — anaphylactic residents (and their roommates, for cross-contact) are systematically routed away from triggering meals, red-flagged on every plating sheet, and require H&W acknowledgement before service. **For an HSP, allergen cross-contact is a food-safety hazard on par with microbial hazards** — so allergen control is a candidate CCP, not just a service nicety.
- **Labeling/communication:** plating sheets carry restriction + allergen info per resident; the anaphylactic list is auto-generated. This is CONC's existing **allergen-communication control** to formalize.

---

## Step 4 ▸ Process Flow Diagrams *(sketched — with precise start/end)*

> Confirmed on-site walk-through is **Step 5** (verify each diagram against reality at Bloor, at Rex, and on a live van run, including time-stamps at each hold).

**Process 1 — No-Cook / Cold** (e.g., Coleslaw, assembled tofu dishes, salads)

```
▶START Receiving → Cold storage → PREP (cold assembly) → Cold hold (≤4 °C)
   → [SEND cold, if off-site] → Plate → SERVE◀END
```
*No kill step → safety rests on supplier approval, cold chain, hygiene & no bare-hand contact.*

**Process 2 — Same-Day Cook-Serve** (e.g., Rex day-of Roasted Veg Stacks; RAW Jerk Chicken sent to Rex to cook on arrival; Bloor HOT items on the PM van)

```
▶START Receiving → Storage → [PULL/thaw or RAW-protein SEND] → COOK
   → Hot-hold (≥60 °C) → [HOT SEND same-day] → Plate → SERVE◀END
```
*One danger-zone pass (up). Cooking is the kill step.*

**Process 3 — Cook-Chill-Transport-Reheat** (the high-risk majority — e.g., Vegan Chilli, Butter Chicken, Beef Stroganoff, Chicken Vindaloo, Halal Chicken & Veg Pasta)

```
▶START Receiving → Dry/Cold/Frozen storage → [PULL → thaw ≤4 °C]
   → COOK (Bloor) → ★COOL (two-stage cook-chill) → PREP (portion + vac/cambro)
   → ★Cold hold (FRIDGE, up to 8 d) → ★SEND (van AM/PM, Bloor→Rex/LAN)
   → Receive + cold hold at destination → ★HEAT (reheat) → Hot-hold/Plate (DOOR routing)
   → SERVE → [Discard unserved]◀END
```

★ = danger-zone-crossing steps → the CCP candidates below. Note CONC's existing proto-monitoring: the HUB **FRIDGE** snapshot already colour-codes hold age (🟠/🟢) and **MOVES** carries a `holdClass` (g/y/r) and hold-day count — these are the natural hooks for real temperature/time monitoring.

---

## Step 5 ▸ On-site confirmation of the flow diagrams *(to do)*

Walk each diagram against reality at **Bloor**, at **Rex**, and on a **live van run** — time-stamping every hold, cool, and transport leg — then correct the diagrams before locking the hazard analysis.

---

## Principles 1–3 ▸ Hazard Analysis → CCPs → Critical Limits *(full worksheet in `HACCP_HAZARD_ANALYSIS.md`)*

The full step-by-step hazard analysis, Codex decision-tree CCP determination, and critical-limit table now live in the companion annex. Summary of the result — **six CCPs**, with limits anchored to Ontario Reg. 493/17 / Health Canada / FDA / FSA (all pending TPH validation):

| # | CCP | Step | Critical limit *(validate w/ TPH)* | Primary hazard |
|---|---|---|---|---|
| **CCP-1** | **Cooking** | COOK | ≥**74 °C** poultry/mixed/egg; **71 °C** ground & whole-muscle (ON); **70 °C** fish (⚠ cook card uses 155 °F) | Salmonella, *E. coli* O157, Campylobacter |
| **CCP-2** | **Cooling** | COOL | **60→20 °C ≤2 h, 20→4 °C ≤4 h** (≤6 h); reheat-restart once | *C. perfringens*, *B. cereus* (spore-formers) |
| **CCP-3** | **Chilled/ROP hold + transport** | PREP/FRIDGE/SEND | **≤4 °C**; **ROP use-by ≤7 d** (was 14 d); insulated transport + arrival probe | *Listeria*, **non-proteolytic *C. botulinum*** toxin |
| **CCP-4** | **Reheating** | HEAT | ≥**74 °C** core within 2 h, **once only** | Recontamination / survivor outgrowth |
| **CCP-5** | **Hot-holding & service window** | hot-send / post-reheat | **≥60 °C**, or time-as-control **≤4 h** then discard | *C. perfringens*, *S. aureus* toxin |
| **CCP-6** | **Allergen / anaphylactic** | PREP + Plate | **Zero cross-contact to a flagged resident; 100 % anaphylactic plates verified** pre-service | Allergen / anaphylaxis (chemical) |

**Two findings that reshaped the first sketch:** (1) the thermal controls *exist* as MISE cook-card text but are **not monitored or recorded** — that's the build, not the procedure; (2) the cooling "blast-chill vs cooled overnight" question is **resolved** — the stew is blast-chilled to <4 °C within 2 h, then held refrigerated overnight and bagged the next morning (compliant); the remaining CCP-2 work is just to *record* the checkpoint temperatures. See annex §0 and §5.

**Managed as Prerequisite Programs (PRPs):** supplier approval & receiving temp checks, cold/frozen storage, **thaw/PULL** control, cleaning & sanitation, pest control, personal hygiene / no-bare-hand-contact, potable water, **thermometer calibration**, allergen-segregation housekeeping.

---

## The CONC-specific recommendation (where this becomes real)

CONC's standout asset is that **traceability already exists in software** — DOOR knows who eats what and which allergens apply; HUB knows what's cooked, where it moves, and how many days it's held; EXPO schedules it; MISE owns recipes/allergens — and MISE cook cards even carry the correct thermal *procedures*. The **one missing layer is thermal *records***: nothing captures the actual probe readings, so a correct procedure can't be proven. The highest-value HACCP build is therefore to **extend the existing backbone to capture temperature + time at the ★ steps**:

1. **Temp/time fields on COOK, COOL, HEAT, and SEND** (final cook temp; cooling start/2 h/6 h checkpoints; reheat temp; van depart/arrive fridge temps) — turning HUB's chips into a monitoring log (Principle 4) and an audit record (Principle 7).
2. **Promote FRIDGE colour-coding & MOVES `holdClass`** from logistics hints into **enforced cold-hold-life limits** — and bring the vac-bag use-by from 14 d to the **≤7 d** ROP limit (annex CCP-3).
3. **Wire the built-but-dormant `computeDoorComplianceDiagnostics` / Gate-9** as the home for an allergen+thermal pre-service gate.

---

## What's needed to finish Steps 5–12

**Principles 1–7 are now drafted** across the two annexes. What remains is execution, not design: on-site flow verification at both kitchens + a live van run (Step 5); **Toronto Public Health** validation of the limits (incl. the ROP use-by and the fish cook temp) and whether the vacuum/ROP special process needs a variance; the equipment list (does the blast chiller hold the 2 h / 6 h targets under full load?); and the **staged build of the temperature-capture layer** (`HACCP_MONITORING_RECORDS.md` §7, Phases A→C) that turns these correct procedures into provable records.

---

*Sketch only — not a validated HACCP plan. All temperatures/times are standard references pending local public-health validation.*
