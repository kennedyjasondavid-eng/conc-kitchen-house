# HOUSE — machine-global status ledger (consolidated 2026-08-10)

> **What this is.** The single source of truth for _cross-app_ facts (versions, phases, schema
> seams). Every repo's own `CLAUDE.md` opens by pointing at a machine-global ledger for exactly this
> reason — so cross-app status isn't duplicated (and allowed to drift) across six repos.
>
> **Provenance (verified 2026-08-10).** No standalone ledger file actually existed: the Claude
> pointer `~/.claude/CLAUDE.md` was never created, and the Codex pointer `~/.codex/AGENTS.md` now
> holds unrelated content (an OpenAI "Sites" plugins dual-write rule — a different project). So this
> file was **consolidated from the six repo memories**; the deepest single-app source is EXPO's repo
> `CLAUDE.md` (the ~1950-line one). This file is now the real thing — **install it to
> `~/.claude/CLAUDE.md` and maintain it as the cross-app source of truth going forward.** Where it
> and a repo `CLAUDE.md` disagree, the repo file is newer — reconcile the difference up into here.

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
| **MISE** | `conc-recipe-hub` | MISE / Recipe Hub / CODEX | Recipe library + the recipe/allergen/cost feed. |
| **PROOF** | `conc-kitchen-proof` | — | Board/funder reporting (plant-forward %, GHG, etc.). |
| **HOUSE** | `conc-kitchen-house` | umbrella | Landing page + owner of cross-HOUSE governance/knowledge docs. |

All GitHub repos: `github.com/kennedyjasondavid-eng/<repo>`.

---

## Current cross-app state (as of ~2026-08-10, reconstructed)

### The standard cutover (the load-bearing cross-app fact)
The kitchen cut over **reno → standard** on **2026-06-26** (DOOR → EXPO → HUB).
- **Standard is the ONLY live operating mode.** Stale `reno` / `reno_rex` requests normalize to Standard.
- **Cycle anchor: `_cycleStart = 2026-06-07`** (Sunday, Week 1). This makes **Jun 28–Jul 4 = Week 4**,
  and Jul 5 wraps to Week 1. In EXPO this is `HUB_CYCLE_START = new Date(2026, 5, 7)`.
  ⚠️ A June-2026 hot-fix corrected a wrong anchor (`2026-06-28`) to `2026-06-07`; **do not "re-fix"
  it back.** EXPO owns the anchor and emits the correct one.
- The 28-day menu rotation did **not** reset at go-live — only the operating model changed.

### Per-app versions / status
- **DOOR** — `DOOR_APP_VERSION = v31-standard.1`, build `2026-06-26`. `menu_current.json`
  `_meta.version` = **32**; `menu_reno.json` = 2. Standard menu base = Jason's **July 2 workbook
  import** (stored `concUploadedMenu`); `concMenuBase` is a delta layer; a `standardCutover` marker
  prunes pre-2026-07-13 overlay days. Publish path hardened (PublishAuth, serialized `_ghWriteQueue`,
  Gate-9 structural block). Smoke harness `tests/door-smoke.mjs` (67 tests).
- **EXPO** — `APP_VERSION ≈ v9.49.35` (latest line: the "New Dishes" unresolved-dish consolidation,
  S0–S3b, on **draft PR #224**, awaiting Jason's review/merge). Standard-only. Site profile
  `site_profiles/conc_site_profile.json` (no `recipeDBRef`; reno/LAN teardown merged via PR #133/#134).
  Publishes `hub_schedule.json` (+ `hub_schedule_version.json`). Boot-TDZ blank-board crash fixed
  (v9.49.28, PR #218/#219). **North star ruling (2026-08-10): Option B** — the New Dishes panel
  becomes an on-ramp that promotes a device-local fact **up to CODEX** (reviewed handoff into CODEX's
  publish flow, not a direct write); Option A (device-local, honest, durable) is the resting state
  that soaks first.
- **HUB** — serving the **LIVE STANDARD board**. `_mode standard`, `_cycleStart 2026-06-07`.
  Freshness contract live (`menu-content-drift` is the PRIMARY check — compares board `MEALS` to
  DOOR's live menu slot-by-slot; version numbers are a fallback only). Deploys no longer gate on
  tests (FORK-5): four contract gates run in `contract-gates.yml`; a red `main` auto-opens an issue
  instead of freezing the board. H1 notes-conflict contract shipped (PR #29).
- **MISE/CODEX** — single-file HTML recipe library; **~224–225 recipes**. Costing program live
  through **PR #67 (`c3bcbcf`)** (C0–C7b + C5 identity mapping; supplier-price acceptance still
  closed). Plant-forward uplift merged (PR #71 Tier-1 + PR #72 Garlic Bread). `recipe_production.json`
  v2.0 = 224 records, **no cost fields** (cost evidence stays local to CODEX unless a C9 decision
  authorizes publication). Recipe-view UX line merged through N7 (PR #49–#51).
- **PROOF** — board/funder reporting. Plant-forward metric **27.9%** (2,974 / 10,661; period
  2026-07, cs 2026-06-07) after the CODEX Tier-1 + Garlic Bread mistag flips. Reads the corrected
  CODEX feed via its Phase-4 consumer (PR #10) — no PROOF code change needed for those. GHG factors
  in `ghg_factors.json`.
- **HOUSE** — umbrella repo; landing page + the cross-HOUSE governance/knowledge docs
  (`INSIGHTS.md`, the HOUSE plans, the SharePoint brief). HACCP plan work lives here.

---

## Schema seams (change the writer and the reader in the SAME change set)

| Feed | Writer | Reader(s) | Notes |
|---|---|---|---|
| `DOOR_RECIPE_DATA.json` | CODEX | DOOR | recipe + allergen data. **Allergen data owned by CODEX — fix it there, never fork into DOOR.** |
| `recipe_production.json` | CODEX | EXPO, DOOR, PROOF | production projection; PROOF reads top-level `stream`. No cost fields. |
| `menu_current.json` `{_meta, weeks[]}` | DOOR `buildMenuJSON` | EXPO `loadMenuFromDOOR` | see the version contract below. |
| `menu_overlay.json` | DOOR | DOOR (self, on top of `menu_current`) | post-import user deltas; cutover-stamped. |
| `routing_by_meal.json` `{wk:{DAY:{meal:{Section:n, _components:{dish:portions}}}}}` | DOOR | EXPO (portion math), HUB (portion-aware CODEX deep-links) | `_components` is plating-engine truth; never "reconcile" it against section counts. |
| `hub_schedule.json` (+ `hub_schedule_version.json`) | EXPO `generateHubData` / `_buildHubSchedulePayload` | HUB `CONC_Production_Hub.html` | HUB re-projects dates at view-time via `projectDates()`; dates in the feed are a snapshot. |

**Payload shape** `hub_schedule.json`: `{ WEEKS:{"1".."4":{number,range,note,days:[{dayName,date,
sections:[{id,label,items:[{type,item,qty,site,route?,time?,serves?,notes?}],vanLoad?}]}]}}, MOVES,
FRIDGE, _mode, _cycleStart, _menuSource, _doorMenu }`.

### ⚠️ The version contract (D7) — `_meta.version` is NOT what it looks like
Proven on live data 2026-07-27, every consumer must know:
1. It is a **hand-maintained SCHEMA constant** (`DOOR_SCHEMA_VERSIONS.<artifact>`), **not a data
   revision** — 23 menu fields changed 07-15→07-27 (incl. an allergen flag flipping `hasPork`
   true→false) while it stayed `32`.
2. It is **NOT monotonic** (31 → 30 → 32 across 06-30 / 07-12 / 07-13). Only ever test **inequality**;
   never order-compare; never treat a lower number as older.
3. Each artifact keeps a **separate counter** (registry 30 / routing 31 / menu 32 on 2026-07-27).
   Only `menu_current.json`'s counter is comparable to a consumer's `_doorMenu.version`.

This is why **HUB's freshness check compares menu _content_ slot-by-slot, never these numbers.**

---

## Open cross-app lines

- **Silent-drift remediation (2026-07-27).** Owner: `conc-kitchen-hub/HOUSE_SILENT_DRIFT_ACTION_PLAN_2026-07-27.md`
  §10; pickup: `HOUSE_SILENT_DRIFT_HANDOFF_2026-07-27.md`. The class: a clean-fetched but stale board
  (HUB served a 14-day-old board built from DOOR menu v30 while DOOR had been on v32 for two weeks;
  both numbers were in memory and nothing compared them). RESOLVED to date: HUB freshness contract +
  H1 notes-conflict contract (PR #29); EXPO menu-provenance/publish-honesty fixes (`b37cc97`, gate-green);
  all three repos verified green. Still open: O1 (Jason's EXPO republish), H2–H4, D1–D6, E1–E6, X2–X4.
- **SharePoint / M365 integration.** Brief: `conc-kitchen-house/HOUSE_SHAREPOINT_IT_BRIEF_2026-07-07.md`
  (+ `SHAREPOINT_IT_BRIEF.html` printable handout). Staged plan (Stages 1–5, hosting last); the concrete
  Stage-1/2 ask to CONC IT = a governed library + one Entra SPA app registration. HOUSE Phase 5.
- **HACCP capture.** Food-safety plan work in `conc-kitchen-house/haccp/` + the `HACCP_*.md` docs.
- **Food-safety follow-up `conc-kitchen-door#63`.** Veg-alt allergen-lookup narrowness in DOOR's
  `getVegAltAllergenStr` (3 latent advisory deltas). CODEX data is correct; the fix is DOOR-side, to
  land before DOOR next republishes `routing_by_meal.json`. Harness: `conc-recipe-hub/tests/door_vegalt_safety_gate.mjs`.

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
  of HOUSE to consume. Never blow away a cache on deploy.
- **Deploys / merges are Jason-gated.** Deterministic rendering: same data → same display.
- **LOCAL-machine rule (does NOT apply in a fresh cloud/work-account clone):** on Jason's own machine
  the repos live OneDrive-only — never a second clone. In a work-account or cloud session, the clone
  *is* the working copy; that rule is about avoiding two competing OneDrive copies on one PC.
- **Deprecated / do-not-regenerate:** HUB's component/Hub-Builder pipeline (`archive/`), EXPO's
  `reno`/`reno_rex` modes, DOOR's Alt-Menu / `menu_reno.json` edit path. The served single files are
  the source of truth and are edited directly.

*(End of reconstructed starter ledger. Replace with the authoritative `~/.claude/CLAUDE.md` when available.)*
