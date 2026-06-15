> _Canonical source: `conc-kitchen-expo/FOOD_OUTCOMES_Action_Plan.md` @ branch `claude/gracious-allen-0G6uI`, copied 2026-06-15. Edit it there, not here, to avoid drift._

# Food-Outcomes — Plan of Action

**Date:** 2026-06-06 · **Status:** REVIEWED (Opus architectural review incorporated + independently
verified against `index.html`).
**Source docs:** `FOOD_OUTCOMES_Playbook.md` (the research), `INSIGHTS.md` (durable wisdom), `CLAUDE.md`.
**Goal:** turn the food-outcomes research into sequenced, owned, verifiable work — taste & presentation
first, executable by a small team, safety non-negotiable.

> **Review outcome (verdict):** sound in direction and ownership; revised before execution. The review
> caught two real gaps (the global `HOLD_LIMITS` ceiling; the FINISH step being a *cross-repo* change) and
> several missing safeguards (re-publish, stickiness audit, rollback, allergen-stream, named test harness).
> **One review claim was wrong and was corrected by direct verification:** it asserted "only one
> `maxHoldDays` in RECIPE_DB" — there are **49** (26×`10`, 4×`7`). The accurate picture (below) is that
> **both** the global `HOLD_LIMITS.vacBagged` ceiling **and** those per-recipe entries govern holds, so
> Phase 1 addresses both. Lesson logged: validate a review's load-bearing facts, don't propagate them blind.

---

## Guardrails (every item must respect these)

- **Single-file HTML.** No build tools / npm / frameworks in EXPO. Data + logic stay in `index.html`.
- **Deterministic + idempotent.** Same menu + DB + constraints = same output. Any new generator follows the
  v9.20 id discipline (`makeItem` colon-suffix stable ids `:3973`, `_usedIds` dedup) so re-runs don't
  duplicate rows.
- **Architect-controlled data.** `RECIPE_DB` and routing tables change when Jason changes them. New/edited
  entries get **`_curated: true`** — the MISE bridge overwrites un-curated fields on boot (`:22808`).
- **Safety is a hard constraint, not a tradeoff.** Reheat 74°C/165°F; cold-hold ≤4°C; ≤5-day shelf life;
  vacuum >10 days needs a validated control. Quality work never relaxes these.
- **Three separate repos.** EXPO (`index.html`, this repo) · **HUB** (`conc-kitchen-hub` →
  `CONC_Production_Hub.html`, renders `hub_schedule.json`) · **DOOR** (`conc-kitchen-door`, menu source).
  Any floor-visible change (FINISH text, plating photo) requires an EXPO change **and** a HUB-repo render
  change **and** a re-publish.

### Ownership legend
**ENGINE** = EXPO `index.html` · **FLOOR** = HUB repo render · **MENU/DATA** = DOOR menu / MISE-CODEX /
`RECIPE_DB` content · **SOP** = kitchen process (no software).

### Cross-cutting requirements — apply to EVERY ENGINE / MENU-DATA item
1. **Verify headless with `tests/_dump.mjs`** — keyed before/after item dump; acceptance bar = expected
   item-count delta **and** "nothing else in the 4-week schedule changed" (the v9.31.x method).
2. **Snapshot + rollback tag before landing**; run **`auditEditStickiness()` / `openStickinessAuditPanel()`**
   after, to confirm the edit is reflected and not stomped by a late generator.
3. **`_curated: true`** on every new/edited `RECIPE_DB` entry.
4. **Re-publish `hub_schedule.json`** (`publishHubSchedule`) after ANY engine/data change, then **diff vs the
   HUB driver manifest** (`auditDriverManifests()`). Holds shifting cook days (Phase 1) and FINISH rows
   (Phase 2) both change the HUB payload — HUB is stale until re-published.
5. **Menu edits routing:** `menu_reno.json` is **not** in DOOR's publish set (footgun #2). A reno-menu change
   must be baked into `RENO_MENU` in `index.html` **or** hand-edited in the DOOR repo with a
   `_meta.manualEdits` breadcrumb — otherwise it silently disappears.

---

## Phase 0 — Immediate kitchen quick wins (no code; start now) · **P1**

Taste/presentation gains shouldn't wait on engine work, and these de-risk the engine work by proving the
moves operationally first.

| ID | Action | Owner | Verify / acceptance |
|---|---|---|---|
| 0.1 | **Finishing-kit pilot** on 2 braises (Butter Chicken, one coconut curry): hold dairy/coconut out, add at reheat; pour tarka/finish + fresh acid/herb + a crunch at plate-up. **Per-stream variants** (regular/halal/vegan) and allergen note (nuts in dukkah, dairy in crema/niter kibbeh, alliums in herb sauce). | SOP | Side-by-side taste vs. current; lead sign-off; kit component quantities + allergen-segregation recorded. |
| 0.2 | **Plating spec pilot** on 2–3 highest-volume dinners: reference photo + clock-method layout + portion tool per component, taped at the plating station. | SOP | Plates match the photo across 3 services / 2 sites; staff + resident feedback. |
| 0.3 | **Two-stage tasting habit**: taste each big batch before chill *and* after reheat; re-season at reheat (separate portion, never the service batch). | SOP | Adopted on the line for braise/stew batches. |

---

## Phase 1 — Safety & holds · **P0 (leads everything codeable)**

Only safety-critical track. The mechanism is now precisely mapped:

> **How holds actually work (verified):** the backward scheduler places cook days, gated by
> `scoreCookDay`. Line `:6958` `if (!isCompItem && holdDays > HOLD_LIMITS.vacBagged) return -999` is an
> **unconditional global hard-block** at **10 days** (`HOLD_LIMITS.vacBagged`, `:2438`); the placement loop
> at `:8028` iterates `offset ≤ HOLD_LIMITS.vacBagged`. In **reno mode** (`:6963`–`:6968`) advance-produce
> needs ≥2 days, with a **+20 bonus at 4–6 days** because the bag→cold-send→Rex-hold(≥3d)→return journey
> needs the buffer. 49 RECIPE_DB entries also carry per-recipe `maxHoldDays` (26×`10`, 4×`7`, rest ≤5);
> these only ever *shorten* an item below the global ceiling.

| ID | Action | Owner | Verify / acceptance |
|---|---|---|---|
| 1.1 | **Audit realized holds + schedulability** (read-only). For each cook-chill dish emit: current realized hold; the cook-day's combi **serial load** (`COMBI_SERIAL_BUDGET`); and **free combi minutes in the 4–5-day pre-service window**. The deliverable answers not just *"which exceed 5d"* but *"does a quality-compliant (≤5d, reno ≥4d) placement that clears the combi budget exist?"* | ENGINE (read-only, `tests/_dump.mjs`) | Per-offender table: hold, candidate-window combi headroom, feasible-or-not. **Gates 1.2.** |
| 1.2 | **Lower the ceiling — primary lever:** `HOLD_LIMITS.vacBagged` **10 → 5** (`:2438`) — this caps everything via the `:6958` gate + `:8028` loop. Align the reno sweet-spot band (`:6967`, currently `4–6`) to **4–5**. **Secondary hygiene:** re-point the ~30 RECIPE_DB `maxHoldDays` `7`/`10` entries to ≤5 (the global gate already caps them, but clean up so they don't mislead or leak via non-gated paths like order-sheet lead times). | ENGINE | Headless before/after: hold distribution ≤5, reno window 4–5; **no dish becomes unschedulable** (no all-candidates-`-999`); chains intact; item delta explained. Then stickiness audit + re-publish + manifest diff. |
| 1.3 | **Decide each residual >5-day need:** shorten, or validate (90°C/10 min-equivalent + ≤3–8°C) — confirm vacuum cook-chill HACCP/variance status with **Toronto Public Health**. | SOP + architect | Each exception eliminated or documented with a validated control. |

> **⚠️ Acute risk (review-confirmed, code hard-blocks):** the reno cold journey needs **≥4 days**, so a ≤5
> cap leaves only a **4–5-day window**. `scoreCookDay` returns **`-999`** (not a soft penalty) when no day
> fits, so an over-tight cap makes heavy braises (Thu/Sun, already serial-constrained at
> `COMBI_SERIAL_BUDGET`/`OVEN_BUDGET`) **unschedulable**, silently breaking chains. **1.1 must prove
> feasibility before 1.2 lands.** If 1.1 shows overflow, the architect's options: keep ≤6 for flagged
> overflow dishes (still well under the old 10, fine with strong finishing), route more to LAN, or thin
> concurrent braises per day. See Open Question 3.

---

## Phase 2 — Taste in the engine: the FINISH step · **P1 (highest taste leverage)**

Make "restore volatiles + texture at plate-up" a scheduled, floor-visible default. **This is a cross-repo
change (EXPO + HUB), not a one-file edit.**

> **Decision — FINISH representation (resolves old OQ1):** **a structured `finish` field on the existing
> service-day HEAT row**, surfaced via `fmtItem` as a `finish` property, rendered by HUB as "show
> `item.finish` if present." **Not** a new `JOB.FINISH` (ripples through the `JOB` enum `:1875`,
> `classifyEquipment` `:4069`, color/label maps, chain editor, **and** HUB — expensive). **Not** `companions`
> (`:7282`/`:7286` — those are independent COOK/PREP items on their *own* cook day with **no `lifecycleOf`**
> and a hold-limit bypass; they'd mint a stray production card on the wrong day). The HEAT row
> (`generateHeatRows` `:9865`) is already on the service day and correctly lifecycled (`lifecycleOf: it.id`),
> so a field rides existing plumbing: **one EXPO change + one additive `fmtItem` field + a small HUB
> render**. *(Note: `ARCHETYPES[x].chain` `:6631` is descriptive metadata read for `schedClass` at
> `:6784`–`:6789`, **not** a row emitter — rows come from dedicated passes like `generateHeatRows`.)*

| ID | Action | Owner | Verify / acceptance |
|---|---|---|---|
| 2.0 | **Spike: one dish, end-to-end.** Add `finish` to Butter Chicken's HEAT row → `fmtItem` → `hub_schedule.json` → render on the HUB card, in the HUB repo. Surfaces the true cross-repo cost before scaling. | ENGINE + FLOOR | Butter Chicken's HUB card shows its finish text; headless `_dump.mjs` shows no other change. |
| 2.1 | **Generalize** the `finish` field across reheat archetypes (`advancedStew` / `bonelessChicken`-braise / `shapedProtein`). Idempotent (`:3973` id discipline); additive `fmtItem` passthrough. | ENGINE | Field present on all reheat-archetype HEAT rows; deterministic re-run (no dupes). |
| 2.2 | **HUB render** of `item.finish` (own repo). | FLOOR | Floor cards show finish instructions for reheated dishes. |
| 2.3 | **Populate finish text** for the pilot set (Butter Chicken, a coconut curry, Stroganoff, a dal, an Ethiopian wat): dairy/coconut at finish; tarka/acid/herb/garnish at plate-up. **Per-stream variants + allergen segregation** as acceptance. | MENU/DATA (`_curated`) | Each pilot dish's finish text is correct, cuisine-appropriate, stream-/allergen-safe. |
| 2.4 | **Move dairy/coconut + final thickening out of the make-ahead base** (waxy/modified starch or thicken-on-reheat). **Per dish, first confirm its resolve layer** (`resolveItem` 6-layer chain) — items resolving via `RENO_ITEM_OVERRIDES` strip chain metadata (CLAUDE.md finding #2; `classifyForScheduling` `:6687`), so a RECIPE_DB edit may be ignored. | MENU/DATA (architect) | Resolve layer confirmed per dish; no make-ahead base carries unstabilized dairy/coconut/flour; honored in the rendered schedule (stickiness audit). |

**Sequencing:** 2.0 spike → 2.1/2.2 → 2.3. 2.4 is data-only, can start immediately *with* the resolve-layer check.

---

## Phase 3 — Presentation at scale · **P1**

> **Decision — plating photos (resolves old OQ2):** **reference photos by URL, never embedded.** The
> single-file / Pages / `file://` constraint makes base64 image storage a non-starter (bloats the file,
> breaks diff/snapshot). Host photos as ordinary files (Pages repo `assets/` or an image host); put a
> **string `platingPhoto` URL** on the dish, flowed through `fmtItem` → `hub_schedule.json` → HUB render.
> The plating-spec **text** (clock layout + disher number) can be a `RECIPE_DB` field (`_curated`) or a
> small keyed table; the photo is a URL only.

| ID | Action | Owner | Verify / acceptance |
|---|---|---|---|
| 3.1 | **Plating spec template** (reference photo + clock layout + portion tool per component) + **name a photo owner & cadence** (who shoots, re-shoot when a recipe changes). | SOP | Reusable template + a named owner/process. |
| 3.2 | **Plumb `platingPhoto` (URL) + spec text** EXPO → HUB; render on the floor card. | ENGINE + FLOOR | Floor sees spec/photo for the dish being plated. |
| 3.3 | **Roll across top ~10 dinners**; standardize portion tools (disher/ladle numbers) into specs. | SOP + FLOOR + MENU/DATA | Top dinners have specs; tools standardized across sites. |
| 3.4 | **Design color in** for beige-heavy dishes (bright veg/herb/sauce accent). Menu/recipe edit — **route per cross-cutting rule #5** (RENO_MENU vs DOOR). | MENU/DATA | No top dish plates monochrome. |

---

## Phase 4 — Systems & structure · **P2**

| ID | Action | Owner | Verify / acceptance |
|---|---|---|---|
| 4.1 | **`cook-chill suitability` tag in `RECIPE_DB`** (make-ahead / fresh-finish / buy) + menu audit. Beware resolve-layer traps (RENO_OVERRIDE metadata stripping). Update `schemas/` RECIPE contract. | ENGINE + MENU/DATA | Every main tagged; audit flags routing mismatches. |
| 4.2 | **Standing finishing-kit SKU set** cross-utilized across streams; wire into the Order Sheet. **Allergen segregation documented** (nuts/dairy/alliums vs halal/vegan streams). | SOP + MENU/DATA | Kit on order sheet; per-stream/allergen plan written. |
| 4.3 | **QC cards**: one-card pre-service line check + combined HACCP temp/quality log. | SOP (+FLOOR if hosted) | Cards in use on the line. |
| 4.4 | **Standardized-recipe batch re-test** + non-linear seasoning-scaling note on high-volume dishes. | SOP + MENU/DATA | Top dishes validated at production batch size. |

---

## Sequencing summary

```
Phase 0 (SOP quick wins) ──┐ start now, in parallel
Phase 1 (safety/holds) ────┘ P0 — 1.1 audit GATES 1.2 cap
        │
        ▼
Phase 2 (FINISH: 2.0 spike → generalize → HUB → populate) ──► Phase 3 (plating: photo-by-URL)   [P1]
        │
        ▼
Phase 4 (suitability tag · kit SKUs · QC cards · recipe re-test)   [P2]
```

## Success metrics
- **Safety:** 0 dishes scheduled >5-day hold without a documented validated control; **0 unschedulable
  dishes** after the cap.
- **Taste:** every reheat-archetype dish carries a `finish` on its HUB card; pilot dishes pass before/after
  taste sign-off.
- **Presentation:** top ~10 dinners have spec + photo + portion tool; lower plate-waste / better feedback.
- **Systems:** every main tagged; finishing-kit SKUs on the order sheet with allergen plan.

## Open questions for the architect
1. **(was OQ3) How aggressive on the cap, given the reno 4–5-day window?** Hard `vacBagged: 5`, or `5` with a
   per-recipe validated-exception flag for combi-overflow braises at 6 days? 1.1's feasibility output should
   decide this.
2. **Finishing-kit SKU ownership** — EXPO Order-Sheet, DOOR ordering, or both?
3. **Where does plating-spec *text* live** — a `RECIPE_DB` field, or a small new keyed table (cleaner for a
   multi-field spec)? (Photo is settled: URL only.)

---

## Verified code references (for the implementer)
- `HOLD_LIMITS` `:2436` (`vacBagged:10` `:2438`, `vacOverride:14` `:2439`, `preferred.max:5` `:2445`)
- `scoreCookDay` global hard-block `:6958`; reno hold band `:6963`–`:6968`
- Backward-scheduler placement loop bound `:8028`; vacOverride 14d hard-stop `:11394`/`:11536`
- 49 `maxHoldDays` in RECIPE_DB (26×`10`, 4×`7`) — verified by count on the `:2741` mega-line
- `makeItem` id discipline `:3973`; `fmtItem` (EXPO→HUB payload) `:14573`; `JOB` enum `:1875`
- `generateHeatRows` (service-day HEAT, lifecycled) `:9865`; companion gen `:7282`/`:7286`
- `ARCHETYPES[x].chain` is descriptive metadata `:6631` (read at `:6784`–`:6789`, not an emitter)
- `classifyForScheduling` / RENO_OVERRIDE metadata-strip risk `:6687`; `_curated` shield `:22808`
- HUB render + plating/finish surfacing live in the **`conc-kitchen-hub`** repo (`CONC_Production_Hub.html`)
- Harness: `tests/_dump.mjs` · data contracts: `schemas/`
