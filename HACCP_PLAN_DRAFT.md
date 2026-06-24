# CONC HACCP Plan — Working Draft / Sketch

**Operation:** Christie Ossington Neighbourhood Centre (CONC) shelter catering — Bloor + Rexdale kitchens serving the Bloor, Rexdale & Lansdowne shelter sites.
**Date:** 2026-06-24
**Document status:** Pre-validation **sketch**. Proposed temperatures/times are standard Health Canada / Ontario Reg. 493/17 / Toronto Public Health references **to be confirmed with the local public health unit and validated on-site** — they are *not* yet CONC-specific critical limits.
**Provenance:** Grounded in the live HOUSE apps as of this date — DOOR (resident/dietary/allergen routing), HUB (production board: chips, FRIDGE, MOVES, van routes), MISE/CODEX (224 recipes, allergen feed). No thermal data exists in any app today; that gap is this plan's central finding.

---

## A note on framework and scope of this draft

HACCP is built in the **Codex 12-step logic sequence** = 5 *preliminary steps* (1–5) + the 7 *principles* (steps 6–12). This draft completes **preliminary Steps 1–3 in depth** (HACCP team · product description · intended use & consumers), then sketches **Step 4 (flow diagrams)** with explicit start/end points and **previews Principle 1/2 (hazard analysis → CCPs)** so the trajectory is visible. Steps 5–12 require on-site verification and public-health validation (see final section).

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
| **Shelf life / hold** | Same-day to a documented **8-day** cold hold (e.g., the Vegan Chilli "MON Lunch (8d)"). ⚠ **8 days exceeds the common ≤5-day cook-chill and FDA 7-day RTE-at-≤4 °C defaults — flag as a critical-limit question for validation.** |
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

★ = danger-zone-crossing steps → the CCP candidates below. Note CONC's existing proto-monitoring: the HUB **FRIDGE** snapshot already colour-codes hold age (🟠/🟢) and tracks capacity (Bloor running **over** at 35u/22u), and **MOVES** carries a `holdClass` (g/y/r) and hold-day count — these are the natural hooks for real temperature/time monitoring.

---

## Step 5 ▸ On-site confirmation of the flow diagrams *(to do)*

Walk each diagram against reality at **Bloor**, at **Rex**, and on a **live van run** — time-stamping every hold, cool, and transport leg — then correct the diagrams before locking the hazard analysis.

---

## Preview ▸ Principle 1 & 2 — Hazard Analysis → Likely CCPs

Grounded in the P3 flow, the **probable Critical Control Points** (to be confirmed via a CCP decision tree in the full plan):

| # | CCP candidate | Step | Proposed critical limit *(validate w/ TPH)* | Hazard controlled |
|---|---|---|---|---|
| **CCP-1** | **Cooking** | COOK | Internal **74 °C** poultry/egg/reheat-mixed; **71 °C** ground; **70 °C** fish; held ≥15 s | Salmonella, *E. coli* O157, *Campylobacter* |
| **CCP-2** | **Cooling** (cook-chill) | COOL | **60 °C→20 °C ≤2 h, then 20 °C→4 °C ≤4 h** (≤6 h total) | *C. perfringens*, *B. cereus* (cooked rice/stews) |
| **CCP-3** | **Cold hold + transport** | FRIDGE / SEND | **≤4 °C continuous**; max hold-life **(8-day item flagged)**; cold chain unbroken on van | *Listeria*, general pathogen growth |
| **CCP-4** | **Reheating** | HEAT | **≥74 °C within 2 h**, once, before service | Recontamination / survivor outgrowth |
| **CCP-5** | **Allergen / anaphylactic control** | PREP + Plate | Verified separation + correct DOOR routing; anaphylactic red-flag acknowledged pre-service | Allergen cross-contact (chemical hazard) |

Likely managed as **Prerequisite Programs (PRPs)** rather than CCPs: supplier approval & receiving checks, cold/frozen storage, **thaw/PULL** control, cleaning & sanitation, pest control, personal hygiene / no-bare-hand-contact, potable water, **thermometer calibration**, and allergen-segregation housekeeping.

---

## The CONC-specific recommendation (where this becomes real)

CONC's standout asset is that **traceability already exists in software** — DOOR knows who eats what and which allergens apply; HUB knows what's cooked, where it moves, and how many days it's held; EXPO schedules it; MISE owns recipes/allergens. The **one missing layer is thermal**. The highest-value HACCP build is therefore to **extend the existing backbone to capture temperature + time at the ★ steps**:

1. **Temp/time fields on COOK, COOL, HEAT, and SEND** (final cook temp; cooling start/2 h/6 h checkpoints; reheat temp; van depart/arrive fridge temps) — turning HUB's chips into a monitoring log (Principle 4) and an audit record (Principle 7).
2. **Promote FRIDGE colour-coding & MOVES `holdClass`** from logistics hints into **enforced cold-hold-life limits** — and resolve the **8-day** vs. ≤5–7-day question.
3. **Wire the built-but-dormant `computeDoorComplianceDiagnostics` / Gate-9** as the home for an allergen+thermal pre-service gate.
4. Address the **chronically over-capacity Bloor fridge (35u/22u)** — a cold-chain risk that a CCP-3 limit would surface immediately.

---

## What's needed to finish Steps 5–12

On-site flow verification at both kitchens + a live van run; confirmation of the proposed critical limits with **Toronto Public Health**; the actual equipment list (combi/blast-chiller capability drives whether the 6 h cooling limit is even achievable); and a decision on the 8-day hold. From there: full hazard analysis (Principle 1), CCP decision-tree confirmation (2), and critical limits / monitoring / corrective-actions / verification / records (Principles 3–7).

---

*Sketch only — not a validated HACCP plan. All temperatures/times are standard references pending local public-health validation.*
