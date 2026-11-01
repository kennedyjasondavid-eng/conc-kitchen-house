# HOUSE status ledger

> **What this is.** The single owner of _cross-app_ status for HOUSE: versions, phases, schema
> seams, open cross-app lines. Every app's `CLAUDE.md` points here instead of restating these facts,
> so they are written once and can't drift apart across six repos. Where this file and a repo's own
> `CLAUDE.md` disagree, the repo file is newer: reconcile the difference up into here.
>
> **Moved here 2026-10-29** from `~/.claude/CLAUDE.md` on Jason's work computer, so cloud sessions
> (which can't see `~/.claude`) can read it. **Refreshed 2026-10-31** (Jason's ruling, call 12 of the
> CODEX Oct 31 walkthrough: this file is the one owner; every computer's `~/.claude/CLAUDE.md` only
> points here). Each app row was checked against its repo's `origin/main` and live Pages stamps on
> 2026-10-31; each section keeps its own date — re-verify before trusting a version number.

---

## What HOUSE is

**HOUSE** = Hospitality Operations Unified System Engine — CONC's (Christie Ossington Neighbourhood
Centre) unified shelter-catering ops system. Six repos, five apps + one umbrella. The telos: a tool
that **recedes into the work** — fewer staff errors, allergen/anaphylaxis safety checked before
service, the schedule computed once and rendered everywhere.

**Pipeline:** `MISE/CODEX → DOOR / EXPO → HUB`, with **PROOF** reading the feeds for reporting.
- DOOR is **upstream of everything** (resident registry + the menu source).
- EXPO consumes DOOR and produces the schedule.
- HUB is **downstream of EXPO** (renders; never computes).
- MISE/CODEX feeds recipe + allergen + cost data **into** DOOR and EXPO.
- PROOF reads the published feeds (board/funder reporting) and never writes back.

| App | Repo | Names | Role |
|---|---|---|---|
| **DOOR** | `conc-kitchen-door` | KitchenDOOR | Resident registry, routing, plating sheets, compliance. The menu source. |
| **EXPO** | `conc-kitchen-expo` | — | Production scheduler. Menu → multi-site cook/prep/send schedule. |
| **HUB** | `conc-kitchen-hub` | Production Hub | Staff-facing daily board (phone/tablet/print). Renders EXPO's schedule. |
| **MISE** | `conc-recipe-hub` | MISE / Recipe Hub / CODEX | Recipe library + the recipe/allergen feed. |
| **PROOF** | `conc-kitchen-proof` | — | Board/funder reporting (plant-forward %, GHG, etc.). |
| **HOUSE** | `conc-kitchen-house` | umbrella | Landing page + owner of cross-HOUSE governance/knowledge docs. |

All GitHub repos: `github.com/kennedyjasondavid-eng/<repo>`.

---

## Current cross-app state (confirmed 2026-10-31)

### The standard cutover (the load-bearing cross-app fact)
The kitchen cut over **reno → standard** on **2026-06-26** (DOOR → EXPO → HUB).
- **Standard is the ONLY live operating mode.** Stale `reno` / `reno_rex` requests normalize to Standard.
- **Cycle anchor: `_cycleStart = 2026-06-07`** (Sunday, Week 1). This makes **Jun 28–Jul 4 = Week 4**,
  and Jul 5 wraps to Week 1. In EXPO this is `HUB_CYCLE_START = new Date(2026, 5, 7)`; HUB's payload
  carries `_cycleStart 2026-06-07`.
  ⚠️ A June-2026 hot-fix corrected a wrong anchor (`2026-06-28`) to `2026-06-07`; **do not "re-fix"
  it back.** EXPO owns the anchor and emits the correct one.
- The 28-day menu rotation did **not** reset at go-live — only the operating model changed.

### App registry (each row checked against `origin/main` on 2026-10-31)

| App | `main` | Version / state | Latest |
|---|---|---|---|
| **DOOR** | `f54fff9` (2026-10-31) | `DOOR_APP_VERSION` **v31-standard.47** (build 2026-10-29; #146/#147 did not bump it) | #147 Wk2 THU/FRI dinners trade days, vegan Sunday lunch is the Portobello Cheese Melt; #146 Mat's Rexdale menu changes; #144 "Keep DOOR's" answers synced across computers (.47); #143 Rex's week sheet updates DOOR's menu (.46). Published stamps: `menu_current` v32, `routing_by_meal` v31, `registry_summary` and `door_state` v30, `menu_reno` v2 (frozen since 2026-06-30). |
| **EXPO** | `5e909f7` (2026-10-31) | `APP_VERSION` **v9.49.85**; Standard is the only mode | #525 Publish pulls DOOR's menu and dated meals before the dialog (the built-in menu is only a fallback for a never-connected computer); #524 engine refinement R1–R10; #523 Mat's Rexdale menu changes. Detail owner: EXPO `CLAUDE.md` Recent. |
| **HUB** | `befb15e` (2026-10-30, a board publish) | no version stamp; last code PR #52 (2026-10-25, boot no longer stops on a pinned print button) | Live board `v=-454303815`, published 2026-10-30 from EXPO v9.49.85 on DOOR menu stamp 15:44Z, before DOOR #147: expect a menu-drift flag until EXPO republishes (inferred from timestamps, not compared). Served file `CONC_Production_Hub.html` (+ `index.html`). Recipe links: `docs/RECIPE_LINK_CONTRACT.md`. |
| **CODEX / MISE** | `3b7d5a3` (2026-10-31) | seed **`2026-10-30-v34-vegan-meat-soy`**; **241** production recipes; identity authority `fnv1a32-6fa6cb39` | #226 the refinement plan (RF1–RF10, HOUSE-1, EXPO-1, HOUSE site registry); #225 `veganBatchOf` in the production feed; #224 v34 vegan meat holds no soy. Save to the shared Library is publish (DOOR overlays it). Line owner: `conc-recipe-hub/docs/plans/CODEX_REFINEMENT_ACTION_PLAN_2026-10-31.md`. |
| **PROOF** | `2ab41c9` (2026-08-17) | `APP_VERSION` **v1.0** (the static `v0.5-S5` span is overwritten at runtime); R1–R5 shipped and gated | `framework_map` v5; `ghg_factors` v1 (placeholder). Plant-forward 27.9% is the 2026-07-19 snapshot (PR #11). Remaining work is operational (Tier-2 SharePoint: LEDGER/CREW/LOG). `PROOF_STATE_OF_PLAY.md` still says v0.9-P5 (a PROOF-internal label drift). |
| **HOUSE** | `11056ad` (2026-10-30) | portal v1.0 | Owns this ledger (since 2026-10-29), `INSIGHTS.md`, `HOUSE_PROVEN_SEAMS.md` and the governance docs. |

### Phase milestones
| Track | State | Confirmed |
|---|---|---|
| HOUSE build-path (1–9, vision V42) | 1–4 + 7a complete; 5/6/7b/7c/8/9 pending | 2026-06-13 |
| EXPO generic-scheduler refactor (0/1/2/3) | **0–3 complete on `main` and live**: URL/schema externalized, load-bearing wizard, `site_profiles/conc_site_profile.json`, authoritative `routeItem()`; the reno/`reno_rex` machinery is deleted (Track B, #133/#134). `expo-phase2-siteprofile` is a never-merge historical branch. | 2026-09-22 |
| EXPO Decision Ledger | **Complete and live** since v9.38.2; every supervisor verb flows through one dialog; "My Changes" is the trust surface. Lessons: EXPO `EXPO_DESIGN_PRINCIPLES.md`, HOUSE `INSIGHTS.md` #41. | 2026-06-23 |
| CODEX stages | 1/2/3a/4 live; app-wide XSS hardening live; 3b ruled advisory (FE0+FE1 on branch `codex-3b-advisory`, awaiting Jason's deploy gate). Not re-verified on 2026-10-31. | 2026-06-14 |

**Two "Phase N" schemes — do not conflate:** HOUSE build-path phases 1–9 (product) vs EXPO's
generic-scheduler refactor phases 0–3 (engine). "Phase 2 (HOUSE routing)" ≠ "Phase 2 (EXPO site profile)".

---

## Schema seams (change the writer and the reader in the SAME change set)

| Feed | Writer | Reader(s) | Shape / version (2026-10-31) | Notes |
|---|---|---|---|---|
| `DOOR_RECIPE_DATA.json` | CODEX | DOOR | bare array, 241 records, **no stamp** | Recipe + allergen data. **Allergen data owned by CODEX — fix it there, never fork into DOOR.** A `_meta` wrap is planned (CODEX RF10, paired with DOOR). |
| `recipe_production.json` | CODEX | EXPO, DOOR, PROOF | header v2.0 (`generated` stamp stale), 241 records, no cost fields | PROOF reads top-level `stream`. Optional `veganBatchOf` (R9; EXPO `schemas/RECIPE_SCHEMA.md`). A `_meta` provenance stamp is planned (CODEX RF3). |
| `library_public.json` + `pages_provenance.json` | CODEX (built into Pages from the `shared-library` branch) | CODEX devices (anonymous reads), DOOR (overlay) | public `_meta.version` 1; provenance `schemaVersion` 1 (main + shared-library SHAs, public sha256) | The small shared Library (16 recipes + 1 tombstone on 2026-10-29), not the 241 production recipes. Contracts: CODEX `docs/CODEX_PUBLIC_LIBRARY_CONTRACT.md`, `docs/CODEX_SHARED_LIBRARY_CONTRACT.md`. |
| `menu_current.json` `{_meta:{source,site,exported,version}, menu:{wk:{DAY:{…}}}}` | DOOR `buildMenuJSON` | EXPO `loadMenuFromDOOR`, HUB, CODEX `_cxDoorMenu` (RF5a, conc-recipe-hub#236: dish lines + `<period>_slots` for the menu-name lookup and the "Menu dishes with no recipe" worklist; versions 30/31/32 by membership, any other refused out loud) | `_meta.version` 32, `site: "rexdale"` | `<period>_slots` is live on 54 meals (bound `{recipeName}` or `{manual}`). Schema doc EXPO `schemas/MENU_SCHEMA.md` (its "version 30" note is stale). See the version contract below. |
| `menu_overlay.json` | DOOR | DOOR (self, on top of `menu_current`) | — | Post-import user deltas; cutover-stamped. |
| `routing_by_meal.json` `{_meta:{source,site,exported,version,builtFromMenu}, routing:{wk:{DAY:{meal:{Section:n,_components:{dish:n}}}}}}` | DOOR | EXPO (portion math), HUB (portion-aware CODEX links); CODEX `_cxBatchTarget` (RF5b, conc-recipe-hub#237: dish `_components` through the menu-name lookup and its diet rails, the cycle's highest meal, rounded and held a week; `_meta.version` 31 read, newer or missing refused with a notice; sites with `numbersFrom` in `sites.json`, Rexdale today) | `_meta.version` 31, `site: "rexdale"`; `componentErrors` only on degradation | `_components` is plating-engine truth; never "reconcile" it against section counts. `builtFromMenu` is a provenance stamp (no consumer reads it yet). |
| `registry_summary.json` | DOOR | (summary counts) | v30, same `_meta` + `builtFromMenu` | Headcounts and tag distribution, no names. |
| `meal_swaps.json`, `meal_swaps_reverted.json`, `special_meals.json`, `special_meals_removed.json` | DOOR | EXPO (dated meals, #504); HUB shows `lunch_dated` / `dinner_dated` (#47/#48) | — | `meal_swaps.json` is `{}` on 2026-10-31. |
| `hub_schedule.json` (+ `hub_schedule_version.json` `{version, generated, source, mode}`) | EXPO `_buildHubSchedulePayload` | HUB `CONC_Production_Hub.html` | `_schemaVersion` 2 | HUB re-projects dates at view time via `projectDates()`; dates in the feed are a snapshot. |
| `sites.json` | HOUSE (`conc-kitchen-house`, contract `SITES.md`) | CODEX first (RF4), then HUB, DOOR, EXPO | `_meta.schemaVersion` 1 | The HOUSE site registry, ruled 2026-10-31 (S1–S4); validated by `tests/sites_registry_gate.mjs` (no key ever deleted). |

**Payload keys** `hub_schedule.json` (2026-10-31): `WEEKS, FRIDGE, MOVES, MEALS, RESOURCES, CONFLICTS,
FROZEN_SERVES, _generated, _source, _mode, _menuSource, _doorMenu, _recipeData, _aliasTableHash, _codex,
_cycleStart, _sharedRelease, _version`. `WEEKS:{"1".."4":{number,range,note,days:[{dayName,date,
sections:[{id,label,items:[{type,item,qty,site,route?,time?,serves?,notes?}],vanLoad?}]}]}}`.

### ⚠️ The version contract (D7) — `_meta.version` is NOT what it looks like
Proven on live data 2026-07-27, every consumer must know:
1. It is a **hand-maintained SCHEMA constant** (`DOOR_SCHEMA_VERSIONS.<artifact>`), **not a data
   revision** — 23 menu fields changed 07-15→07-27 (incl. an allergen flag flipping `hasPork`
   true→false) while it stayed `32`.
2. It is **NOT monotonic** (31 → 30 → 32 across 06-30 / 07-12 / 07-13). Only ever test **inequality**;
   never order-compare; never treat a lower number as older.
3. Each artifact keeps a **separate counter** (registry 30 / routing 31 / menu 32, still on 2026-10-31).
   Only `menu_current.json`'s counter is comparable to a consumer's `_doorMenu.version`.

This is why **HUB's freshness check compares menu _content_ slot-by-slot, never these numbers.**

---

## Open cross-app lines

- **CODEX refinement line (2026-10-31).** Owner: `conc-recipe-hub/docs/plans/CODEX_REFINEMENT_ACTION_PLAN_2026-10-31.md`
  (Jason's 12 rulings, batches RF1–RF10, HOUSE-1, EXPO-1). Cross-app pieces: v35 Coconut family
  (paired DOOR change, after a one-resident DOOR check), CODEX reading DOOR's `routing_by_meal.json`
  for batch targets (RF5), and **EXPO-1**: a bagged dish's lead becomes a soft 7 days with the use-by
  as the hard stop (Jason: "I don't want it as a total hard line because sometimes we might require 8 days").
- **HOUSE site registry (ruled 2026-10-31, S1–S4).** One `conc-kitchen-house/sites.json` on Pages,
  read by every app with the 3-tier fallback; lowercase keys with every app's old codes as aliases;
  shared facts only (identity, kitchen/served flags, status, dated open windows, cooked-by, meals,
  where its numbers come from); counts stay live in DOOR, equipment and staff in EXPO. Sites:
  Bloor, Rexdale, Lansdowne (kitchen + ~40 residents), 1011 Lansdowne and Roncy (served, cooked by
  Lansdowne), the winter warming centre (Lansdowne, Nov 15 – Apr 15 for now), GCNC (baking, paused).
  Published 2026-10-31 as `sites.json` (contract `SITES.md`); readers adopt it next (CODEX first, RF4).
- **Silent-drift remediation (2026-07-27).** Owner: `conc-kitchen-hub/HOUSE_SILENT_DRIFT_ACTION_PLAN_2026-07-27.md`
  §10; pickup: `HOUSE_SILENT_DRIFT_HANDOFF_2026-07-27.md`. The class: a clean-fetched but stale board
  (HUB served a 14-day-old board built from DOOR menu v30 while DOOR had been on v32 for two weeks;
  both numbers were in memory and nothing compared them). RESOLVED to date: HUB freshness contract +
  H1 notes-conflict contract (PR #29); EXPO menu-provenance/publish-honesty fixes (`b37cc97`, gate-green);
  all three repos verified green. Still open as of 2026-07-27: O1 (Jason's EXPO republish), H2–H4, D1–D6, E1–E6, X2–X4.
- **SharePoint / M365 integration.** Brief: `conc-kitchen-house/HOUSE_SHAREPOINT_IT_BRIEF_2026-07-07.md`
  (+ `SHAREPOINT_IT_BRIEF.html` printable handout). Staged plan (Stages 1–5, hosting last); the concrete
  Stage-1/2 ask to CONC IT = a governed library + one Entra SPA app registration. HOUSE Phase 5/6.
  CODEX's dormant SharePoint review queue stays hidden, code kept, until this is ruled.
- **HACCP capture.** Food-safety plan work in `conc-kitchen-house/haccp/` + the `HACCP_*.md` docs.
- **Food-safety follow-up `conc-kitchen-door#63`.** Veg-alt allergen-lookup narrowness in DOOR's
  `getVegAltAllergenStr` (3 latent advisory deltas). CODEX data is correct; the fix is DOOR-side, to
  land before DOOR next republishes `routing_by_meal.json`. Harness: `conc-recipe-hub/tests/door_vegalt_safety_gate.mjs`.
  Not re-verified on 2026-10-31.

---

## Design + knowledge owners (single owner per fact — point, don't restate)
- **Cross-HOUSE design wisdom + lessons + telos:** `conc-kitchen-house/INSIGHTS.md`. **Read before any
  design pass.** App-specific grammar (EXPO's `EXPO_DESIGN_PRINCIPLES.md`, PROOF's `INSIGHTS.md`)
  points back to it.
- **Doc governance model** (single owner per fact; the `LEDGER:` / `WRAP:` convention):
  `conc-kitchen-house/HOUSE_Doc_Governance_Plan.md`.
- **Current HOUSE-wide planning snapshot:** `HOUSE_ASSESSMENT_2026-07-07.md` (state + ranked risks)
  and its execution sheet `HOUSE_PLAN_OF_ACTION_2026-07-07.md` (7 stages, forks F0–F5).
- **Product/ecosystem "why" (the vision):** `CONC_Kitchen_Operations_Vision_V42.html` — lives in
  Jason's OneDrive under `~CONC Project Management Tool~`, **not in any repo.**

---

## Operating rules that hold across every app
- **Single-file HTML is non-negotiable.** No build tools, no npm, no frameworks. Every app must
  degrade gracefully from `file://`.
- **Architect-controlled data** (RECIPE_DB, routing tables, seed recipes, menus) changes when **Jason**
  changes it — never automatically.
- **localStorage = the user's live state.** Repo JSON files are snapshots the push writes for the rest
  of HOUSE to consume. Never blow away a cache on deploy. All HOUSE apps share one github.io origin, so
  they share one origin's storage quota (3.55M of about 5M characters used on Jason's Edge, 2026-10-31):
  write through each app's quota-safe seam (`HOUSE_PROVEN_SEAMS.md` row 1).
- **Deploys / merges are Jason-gated.** Deterministic rendering: same data → same display.
- **LOCAL-machine rule (does NOT apply in a fresh cloud/work-account clone):** on Jason's own machine
  the repos live OneDrive-only — never a second clone. In a work-account or cloud session, the clone
  *is* the working copy; that rule is about avoiding two competing OneDrive copies on one PC.
- **Deprecated / do-not-regenerate:** HUB's component/Hub-Builder pipeline (`archive/`), EXPO's
  `reno`/`reno_rex` modes, DOOR's Alt-Menu / `menu_reno.json` edit path. The served single files are
  the source of truth and are edited directly.

---
