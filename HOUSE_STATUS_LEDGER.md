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
> **Re-checked 2026-11-11** (the ledger audit; Jason: "follow leans"): the DOOR, EXPO, HUB, CODEX and HOUSE
> rows, the reader lists below, and the open lines. PROOF and the DOOR privacy phases 3–4 were not re-checked.

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

## Current cross-app state (confirmed 2026-10-31; app rows re-checked 2026-11-11; DOOR, EXPO, HUB and CODEX updated 2026-11-12)

### The standard cutover (the load-bearing cross-app fact)
The kitchen cut over **reno → standard** on **2026-06-26** (DOOR → EXPO → HUB).
- **Standard is the ONLY live operating mode.** Stale `reno` / `reno_rex` requests normalize to Standard.
- **Cycle anchor: `_cycleStart = 2026-06-07`** (Sunday, Week 1). This makes **Jun 28–Jul 4 = Week 4**,
  and Jul 5 wraps to Week 1. In EXPO this is `HUB_CYCLE_START = new Date(2026, 5, 7)`; HUB's payload
  carries `_cycleStart 2026-06-07`.
  ⚠️ A June-2026 hot-fix corrected a wrong anchor (`2026-06-28`) to `2026-06-07`; **do not "re-fix"
  it back.** EXPO owns the anchor and emits the correct one.
  CODEX reads it from HUB's `hub_schedule.json` (`_cycleStart`, LB4, 2026-11-02) and holds no copy of its own.
- The 28-day menu rotation did **not** reset at go-live — only the operating model changed.

### App registry (DOOR, EXPO, HUB, CODEX and HOUSE rows re-checked against `origin/main` on 2026-11-11; PROOF last checked 2026-10-31)

| App | `main` | Version / state | Latest |
|---|---|---|---|
| **DOOR** | `db45d6e` (2026-11-12, #190) | `DOOR_APP_VERSION` **v31-standard.68** | **#189 W3d fix (.67, 2026-11-12):** the out-of-date check compares the page's content, not its ETag. Each DOOR publish redeploys Pages, which gives the same page a new ETag, so after its own publish a tab read as out of date and held its sends (twice on 2026-11-11). **#190 Week 4 setup fixes (.68, merged 2026-11-12)** (Jason, 2026-11-12: "Clean up any remaining DOOR: fix menu-import gaps"): in Rex's week review the "Take off" boxes start ticked only when every new dish is linked to a CODEX recipe, and dish names carry what they plainly hold (tacos, lasagna: Gluten; lasagna: Dairy; al pastor: Nightshades). The halal plate never inherits Pork from a name. The packaging row is not breakfast. "Curry and Rice" = "Curry, Rice". Both uploads read the tab the workbook was saved on. Edit Menu: an unticked Spicy stays off, and "No matches" unlinks. Gate `rex_import_safety_gate` (7, red on main). **Fixed 2026-11-12 14:42Z (publication 13):** Wk4 SUN dinner's main slot carries Gluten again. A 14:08Z relink to the White Chicken & Chickpea Chili recipe had left the pasta's Gluten only on the meal, and `main`'s "regular and vegan flags stay separated" test read it as a leak. **Week 4 menu (2026-11-11):** the new Week 4 went in in-app via Rex's week sheet plus four Edit Menu fixes (publications 6 to 10); see "Week 4 new menu" below. **#187** menu-flow plan (docs): F3a's EXPO side merged Nov 8, the re-check and HUB #61. **#186 D2b (.66):** leads add plate rules in Settings, protection-only (a mark opens a plate, a restriction joins one, an amber note; No Fish / Shellfish, GF, No Dairy, No Beef only; every add proved by the real engine to move residents only from the regular plate to an alternative; Jason's three Nov 10 rulings). **#185 D2a (.65):** leads add allergen words (Rex spellings, workbook and menu-name allergen words, restriction words), add-only, in Settings → Allergen and routing rules; who may edit = sending key + a leads list only Jason edits; shared in `door_rules.json` (a kitchen file, not on Pages, not F4-stamped, not read by EXPO or HUB). **#184 (.64):** the import reads a near spelling only when it is plainly the same word ("No meat" was read as Gluten Free). **#183 D1 (.63):** site names and the picker read `sites.json`; typed resident counts gone; `main` green again (the privacy check reads F4's recipe flags as recipe data). **#181 F4 switched on (.62):** counts carry a publication receipt (epoch `rexdale-f4-2026-11-09`, base `d6d4cab`); every stamped file carries its site; the bootstrap is proved by compare + counter history. #182 a bare side word on the vegan line names that side only (.61). #179 W3e a picked recipe stays picked (.60). Week 3 post-mortem items (owner: `conc-kitchen-door/docs/DOOR_MENU_FLOW_ACTION_PLAN_2026-11-06.md`): #167 W3a allergen ticks follow the dish (.55); #169 W3c Edit Menu and import fixes (.56); #170 W3d an out-of-date page says so loudly and reloads itself (.57); #172 CODEX's Mushroom and Beans labels set their ticks (C1-1) and #173 W3b the vegan and halal lines name their own sides, **both stamped .58**; #175 Edit Menu doesn't trust slots behind the menu text (.59); #168/#174 menu data; #176 F4 readers design pass and #177 the flow-validity block pinned (test only); #178 C1-1 gate. Before them: #161 a computer the update disconnected says so in red (.51); #163 the offline recipe list follows CODEX (.52); #164 no built-in resident count (.53); #165 Rex's week sheet reuses dish links (.54). Earlier (2026-11-01): #151 DOOR reads its own files through one reader (Contents API with a key), viewing keys, and says when it can't read the resident list (.49); #150 room fields kept out of saved-key autofill; #148 Pages serves only the app and the files other apps read, and the page carries no built-in resident list (.48); #147 Wk2 THU/FRI dinners trade days; #146 Mat's Rexdale menu changes. Published stamps: `menu_current` v32, `routing_by_meal` v31, `registry_summary` and `door_state` v30, `menu_reno` v2 (frozen since 2026-06-30; no longer on Pages). Line: "DOOR resident-data privacy" below. |
| **EXPO** | `1cf9599` (2026-11-12) | `APP_VERSION` **v9.49.89** (#617); Standard is the only mode | **#617 U2 fix (v9.49.89, 2026-11-12):** the out-of-date check compares the page's content, not its ETag (each Publish redeploys EXPO's Pages; U2's auto-reload threw away a Publish in flight twice on 2026-11-11), and ⇪ Publish holds the reload from its click. **In-app line** (owner: EXPO `EXPO_IN_APP_ACTION_PLAN_2026-11-08.md` §6), through #615. Nov 9: P1 speed #582; G3/G6/G4 #583–#585; R3 #586 (food facts from CODEX's `library_public.json` by recipe ID); R6 #587; K2a/K2b/K6 #588–#591. Nov 10: G5, R1, K1 and K3 families 1–6 (kitchen rules as kitchen data, #592–#600); T2/T3 #601; U2 #602 (an out-of-date tab reloads itself, v9.49.88); G2/K4/K5/R2 #603–#606; S1–S3 #607–#609; R4 #610. Nov 11: the ratchet #611, T3 trims #612/#613, T4/T5 #614, R4 Chicken Ranch Salad #615. Before them: G1 #576, R5 #578, U1 #579, F4 + D1 #580/#581, and F3a #565 (merged 2026-11-08, v9.49.87). **Staff rollout EX-0 to EX-16 complete**, EX-15's line endings included (#570, 2026-11-08; EXPO's plan §6 still says "Prepared, not opened") (owner: EXPO `EXPO_STAFF_ROLLOUT_ACTION_PLAN_2026-10-31.md` §6). Since 2026-11-02: #552 EX-11 Today / Tomorrow view; #554/#558 EX-10 wording and layout; #560 EX-12 hardening (holds 10 / 4 / 3, the 7-day warning kept for unbagged cooked food, shared changes follow renamed jobs with seven old shared moves kept inert); #561 EX-13 unused code removed and saves from before 2026-09-12 refused; #562 EX-14 routing logs only with `pp_debug_routing`; #563 EX-15 repo tidy (CI roster check, frozen gate inputs); #564 DOOR's whole dated meals carried into planning, and CI pinned to `ubuntu-24.04` + Playwright 1.56.1; #566 EXPO opens on Board with the 4-week Menu open; #567 chicken legs seasoned 2–3 days before the cook (never Monday for a Tuesday service) and Vindaloo Sauce the day before its proteins (six cards move); #568 locks in the stew rules (a stew and its vegan version cook the same day; raw-sent Rex dishes cook on their service day). HUB's board (2026-11-10, v9.49.87) carries these; a publish from a reloaded EXPO carries #602–#615 (whether they change the board was not checked). Detail owner: EXPO plan §6 and `CLAUDE.md` Recent. |
| **HUB** | `4ef54e7` (2026-11-11) | no version stamp; **#61 H1 + H2** (F3a re-plan, Jason 2026-11-11): a card links by recipe ID alone and warns only when its recipe is gone (a retired or duplicated ID); no ID, no link and no warning; reads CODEX's `library_public.json` (version 1) beside the sealed feed; gate `tests/recipe_links_h1h2_contract.mjs`. Before it **#60 D1:** its site list and kitchen flag read `sites.json`; April's counts and the typed headcounts gone, Settings shows DOOR's counts or says they didn't load. F4 + D1 #58/#59 (2026-11-09: the shared flow-validity block; routing aged by DOOR's stamp; frozen-stock counts marked ‡ as estimates; routing re-read when the menu shows a newer DOOR publication). Before it, code PR #55 (2026-11-02, `c6bb187`: each cold send once on every `MOVES` view; in-house frozen stock on 🧊 Frozen stock; gates `tests/moves_run_contract.mjs`, `frozen_stock_contract` §8). Before it #54 (`8497b61`: a `needsPlan` card shows "⚠ Needs a plan", no time, no recipe link; gate `tests/needs_plan_contract.mjs`) | Live board `v=-1469292687` (`f4ad542`), published 2026-11-11T19:41Z from EXPO v9.49.88 on DOOR's publication 10 (exported 19:03:57Z) and shared release `rel_000025`: the new Week 4. HUB read "matches the shared plan", with no "Needs a plan" card. DOOR has published since (2026-11-12 13:48Z and 14:09Z edits); the next EXPO publish carries them. Served file `CONC_Production_Hub.html` (+ `index.html`). Recipe links: HUB `CLAUDE.md`, "Recipe links by recipe ID" (#61); `docs/RECIPE_LINK_CONTRACT.md` still describes the older name matching. |
| **CODEX / MISE** | `4cf9f1b` (2026-11-11) | seed **`2026-11-11-gluten-soy-ranch`**; **256** production recipes (`tests/fixtures/feed_seal.json`); identity authority `fnv1a32-041dec2a` | **Shared Library, 2026-11-11 (Week 4):** Beef Donburi (Gyudon-Style Beef Bowl), Mushroom Donburi (Vegan), Kimchi Chicken Fried Rice and Kimchi Fried Rice (Vegan) shared. Their cook minutes were added in-app from each card's own method (`shared-library` `79626c8`) so EXPO could plan them; the numbers are for Jason to confirm. Mushroom Donburi and Kimchi Fried Rice (Vegan) read `veganFriendly` null (shiitake and cremini fix on branch `claude/codex-vegan-mushroom-kinds`). **#297 data edition 2026-11-11:** Gluten off the three Ginger dishes; Chicken Ranch Salad no cook, 120 prep (EXPO #615 retired its overrides). Open: #298 (draft, data edition 2026-11-11b) and #299 (CI Chromium install). R3 Library block line (owner: `conc-recipe-hub/docs/plans/CODEX_R3_LIBRARY_BLOCK_PLAN_2026-11-08.md`): R3-a–d #286/#289 (a recipe ID given at Library save; IDs backfilled on `shared-library` `2b128d6`), R3-e #287 (no test counts recipes), C1-1 #291 (Mushroom and Beans allergen families; DOOR #172 reads them), C1-3 #292 (Served with: a dish records the parts made separately), C1-3a #294 (each allergen family once on a shared record), **C1-3b #295: a vegan portion pulled before the meat goes in reads vegan-friendly** (Jason, 2026-11-09: the recipe method's "pulled ... before ... <meat> ... went in" makes a "(see recipe)" row read as that recipe without that meat's rows; stock, broth, dairy, egg and other animal rows still count; no seed recipe has the words, so the feeds are unchanged; Vegan Bolognese's shared record carries `door.veganFriendly: true`, `shared-library` `0c03c78`), #296 (`door_consumer_smoke` loads DOOR's `doorLinkFlags`; test only). Earlier: refinement line RF1–RF8 merged (#227–#240): one seal file and a feed-regenerate gate (RF1b); the HOUSE site registry reader (RF4); one menu-name lookup with diet rails and batch targets from DOOR (RF5a/b, reading `menu_current.json` and `routing_by_meal.json`); one Administration page (RF7b); the craft guide, °C first, one 10-day use-by for vac-bagged cook-chill food (`CX_HOLD_LIMITS`) and the HACCP card’s safe temperatures (`CX_SAFE_TEMPS`) (RF8; Jason, 2026-11-01); docs cleanup (RF7c); Jason’s 2026-11-01 rulings (RF7d, #241: Cooking styles shelf, “Not yet in the Library”, rises apply at once, per-line diet rail, approvedEdition); data edition #242 (Vegan Meat Replacement 45 oven + 45 stove, 90 prep; Moroccan Chickpea Salad Sunday cut / Tuesday cook; Chicken Griot oven only). Save to the shared Library is publish (DOOR overlays it). Line owner: `conc-recipe-hub/docs/plans/CODEX_REFINEMENT_ACTION_PLAN_2026-10-31.md`. |
| **PROOF** | `2ab41c9` (2026-08-17) | `APP_VERSION` **v1.0** (the static `v0.5-S5` span is overwritten at runtime); R1–R5 shipped and gated | `framework_map` v5; `ghg_factors` v1 (placeholder). Plant-forward 27.9% is the 2026-07-19 snapshot (PR #11). Remaining work is operational (Tier-2 SharePoint: LEDGER/CREW/LOG). `PROOF_STATE_OF_PLAY.md` still says v0.9-P5 (a PROOF-internal label drift). |
| **HOUSE** | `4593eef` (2026-11-11) | portal v1.0 | Owns this ledger (since 2026-10-29), `INSIGHTS.md`, `HOUSE_PROVEN_SEAMS.md` and the governance docs. |

### Phase milestones
| Track | State | Confirmed |
|---|---|---|
| HOUSE build-path (1–9, vision V42) | 1–4 + 7a complete; 5/6/7b/7c/8/9 pending | 2026-06-13 |
| EXPO generic-scheduler refactor (0/1/2/3) | **0–3 complete on `main` and live**: URL/schema externalized, load-bearing wizard, `site_profiles/conc_site_profile.json`, authoritative `routeItem()`; the reno/`reno_rex` machinery is deleted (Track B, #133/#134). `expo-phase2-siteprofile` is a never-merge historical branch. | 2026-09-22 |
| EXPO Decision Ledger | **Complete and live** since v9.38.2; every supervisor verb flows through one dialog; "My Changes" is the trust surface. Lessons: EXPO `EXPO_DESIGN_PRINCIPLES.md`, HOUSE `INSIGHTS.md` #41. | 2026-06-23 |
| CODEX stages | 1/2/3a/4 live; app-wide XSS hardening live; 3b ruled advisory; its branch `codex-3b-advisory` is gone from origin and no commit on `main` names 3b, FE0 or FE1 (checked 2026-11-11): state unknown, ask Jason before treating it as pending. | 2026-06-14 |

**Two "Phase N" schemes — do not conflate:** HOUSE build-path phases 1–9 (product) vs EXPO's
generic-scheduler refactor phases 0–3 (engine). "Phase 2 (HOUSE routing)" ≠ "Phase 2 (EXPO site profile)".

---

## Schema seams (change the writer and the reader in the SAME change set)

| Feed | Writer | Reader(s) | Shape / version (2026-10-31) | Notes |
|---|---|---|---|---|
| `DOOR_RECIPE_DATA.json` | CODEX | DOOR | bare array, 256 records (2026-11-09), **no stamp** | Recipe + allergen data. **Allergen data owned by CODEX — fix it there, never fork into DOOR.** A `_meta` wrap is planned (CODEX RF10, paired with DOOR). |
| `recipe_production.json` | CODEX | EXPO, DOOR, PROOF, HUB (recipe links; by recipe ID since #61) | header v2.0 (`generated` stamp stale), 256 records (2026-11-09), no cost fields | PROOF reads top-level `stream`. Optional `veganBatchOf` (R9; EXPO `schemas/RECIPE_SCHEMA.md`). A `_meta` provenance stamp is planned (CODEX RF3). |
| `library_public.json` + `pages_provenance.json` | CODEX (built into Pages from the `shared-library` branch) | CODEX devices (anonymous reads), DOOR (overlay), EXPO (R3 #586: food facts by recipe ID; `_meta.version` 1 only; kept copy `pp_library_public_cache`), HUB (#61: recipe IDs and names for links; version 1 only) | public `_meta.version` 1; provenance `schemaVersion` 1 (main + shared-library SHAs, public sha256) | The small shared Library (33 recipes + 1 tombstone on 2026-11-11), not the 256 production recipes. **Since R3 / C1 (2026-11-08):** each record is keyed by top-level `recipeId` (= `door.recipeId`); its `production` block carries `recipeId`, `sets` (read a food fact only when its field is listed; no `sets` = pre-R3, "doesn't know"), `handsOnMin` and `servedWith` `[{name, recipeId?, role: sauce\|protein\|starch\|veg\|other, bought, madeAt?}]`. This is in the Library only, not the feeds; the parts are facts for EXPO K6, and `madeAt` is a hint (F1: EXPO owns how a dish travels). Allergen families gain **Mushroom** and **Beans** (DOOR maps them, #172). First Served-with records: Garden à la King (`garden-a-la-king`), Bolognese Sauce (`bolognese-sauce`), Vegan Bolognese (`vegan-bolognese`). Contracts: CODEX `docs/CODEX_PUBLIC_LIBRARY_CONTRACT.md`, `docs/CODEX_SHARED_LIBRARY_CONTRACT.md`. |
| `menu_current.json` `{_meta:{source,site,exported,version}, menu:{wk:{DAY:{…}}}}` | DOOR `buildMenuJSON` | EXPO `loadMenuFromDOOR`, HUB, CODEX `_cxDoorMenu` (RF5a, conc-recipe-hub#236: dish lines + `<period>_slots` for the menu-name lookup and the "Menu dishes with no recipe" worklist; versions 30/31/32 by membership, any other refused out loud) | `_meta.version` 32, `site: "rexdale"` | `<period>_slots` is live on 54 meals (bound `{recipeName}` or `{manual}`). Schema doc EXPO `schemas/MENU_SCHEMA.md` (its "version 30" note is stale). See the version contract below. |
| `menu_overlay.json` | DOOR | DOOR (self, on top of `menu_current`) | — | Post-import user deltas; cutover-stamped. Not on DOOR's Pages since 2026-11-01: DOOR reads it through the repository. |
| `routing_by_meal.json` `{_meta:{source,site,exported,version,builtFromMenu}, routing:{wk:{DAY:{meal:{Section:n,_components:{dish:n}}}}}}` | DOOR | EXPO (portion math), HUB (portion-aware CODEX links); CODEX `_cxBatchTarget` (RF5b, conc-recipe-hub#237: dish `_components` through the menu-name lookup and its diet rails, the cycle's highest meal, rounded and held a week; `_meta.version` 31 read, newer or missing refused with a notice; sites with `numbersFrom` in `sites.json`, Rexdale today) | `_meta.version` 31, `site: "rexdale"`; `componentErrors` only on degradation | `_components` is plating-engine truth; never "reconcile" it against section counts. `builtFromMenu` is a provenance stamp (no consumer reads it yet). |
| `registry_summary.json` | DOOR | EXPO (headcounts, tag distribution), HUB, PROOF | v30, same `_meta` + `builtFromMenu` | Headcounts and tag distribution, no names, no rooms. |
| `meal_swaps.json`, `meal_swaps_reverted.json`, `special_meals.json`, `special_meals_removed.json` | DOOR | EXPO (dated meals, #504); HUB shows `lunch_dated` / `dinner_dated` (#47/#48) | — | `meal_swaps.json` is `{}` on 2026-10-31. |

**DOOR's Pages serve a list (since 2026-11-01, `conc-kitchen-door/.github/workflows/pages.yml`):** `index.html`,
`favicon.ico`, `menu_current.json`, `routing_by_meal.json`, `registry_summary.json` and the four swap and special-meal
files above. Every reader in the table reads these from Pages: EXPO, HUB, PROOF, and CODEX's RF5 readers (checked
2026-11-01). Any other DOOR file is read through the repository with a key, as DOOR itself does. A new cross-app
reader of a DOOR file either reads one of these, or adds it to that list in a DOOR change (it becomes public), in the
same change set.
| `hub_schedule.json` (+ `hub_schedule_version.json` `{version, generated, source, mode}`) | EXPO `_buildHubSchedulePayload` | HUB `CONC_Production_Hub.html`; CODEX `_cxHubCycle` (Library browse LB4, ruling R11, Jason 2026-11-02: reads `_cycleStart` only, for the menu week; `_schemaVersion` 2 read, any other refused with a notice and no week guessed; keeps the date in `concHubCycleStart`) | `_schemaVersion` 2 | HUB re-projects dates at view time via `projectDates()`; dates in the feed are a snapshot. |
| `sites.json` | HOUSE (`conc-kitchen-house`, contract `SITES.md`) | CODEX (RF4); EXPO (EX-16 #550, Settings only, read-only); DOOR (D1, #183: names and the site picker) and HUB (D1, #60: its site list and kitchen flag), 2026-11-10 | `_meta.schemaVersion` 1 | The HOUSE site registry, ruled 2026-10-31 (S1–S4); validated by `tests/sites_registry_gate.mjs` (no key ever deleted). |
| `_meta.flow` on DOOR's `menu_current`, `routing_by_meal`, `registry_summary` (public) and `menu_overlay`, `door_state` (private) | DOOR (#156, 2026-11-06) | EXPO (#580, #581) and HUB (#58, #59), each carrying the shared flow-validity block (seams row 11) | `_meta.flow.schema` 1; **switched on 2026-11-09** (DOOR #181, `v31-standard.62`): stamped from the first publish on that version. Readers use DOOR's counts quietly within 7 days; past 7 days or once superseded they are marked "estimate: DOOR's counts are from <date>" (Jason, 2026-11-08) | The count stamp: one publication identity (epoch + sequence, `inputRevision`, per-input hashes) so EXPO and HUB can tell current counts from mixed or stale ones. Also adds exact-date routing inside `routing_by_meal.json`; the dated maps (`meal_swaps.json` etc.) get no `_meta`. Contract: `conc-kitchen-door/docs/F4_FLOW_CONTRACT_DRAFT_2026-11-06.md` (reviewed, with its counter and public-delivery amendments). Switched on by DOOR #181 after the readers shipped. |

**Payload keys** `hub_schedule.json` (2026-10-31): `WEEKS, FRIDGE, MOVES, MEALS, RESOURCES, CONFLICTS,
FROZEN_SERVES, _generated, _source, _mode, _menuSource, _doorMenu, _recipeData, _aliasTableHash, _codex,
_cycleStart, _sharedRelease, _version`. `WEEKS:{"1".."4":{number,range,note,days:[{dayName,date,
sections:[{id,label,items:[{type,item,qty,site,route?,time?,serves?,notes?,datedFor?,needsPlan?}],vanLoad?}]}]}}`.
`MOVES[dateNum]` (2026-11-02, EXPO #548 EX-8): every cold send to Rex, AM and PM, with `run` from its van (was SEND PM
only, all `run:'PM'`); HUB #55 shows each once (a send its AM/PM run lists isn't repeated). `FROZEN_SERVES` gains the
optional `inHouse:{items,thaws}` (Bloor's in-house frozen stock; `v` stays 1; Rex's order list unchanged). Shape:
EXPO `schemas/HUB_SCHEDULE_SCHEMA.md`.

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

- **Week 4 new menu (2026-11-11/12).** Rex's new Week 4 ("Week 4 Kitchen (Mod)": donburi, kimchi fried rice, tandoori moved to Tue, lasagna to Thu, tacos to Fri) is live in DOOR, CODEX, EXPO and HUB, done in-app. Notes: `Week4_Setup_Friction_Notes_2026-11-11.md` (OneDrive, a novice's view; about 35 items, the case study). DOOR's item 18 and EXPO's 26e were fixed by DOOR #189 and EXPO #617; the import items were fixed by DOOR #190 (merged, .68). Open for Jason: confirm that the al pastor pork prepped Nov 10–11 (for the old Tue tacos) keeps to Fri Nov 20; check the CODEX cook minutes on the four new recipes; EXPO's two older warnings (Vegan Bolognese cooked 7 days ahead against the beef's 5, against the stew rule; Vegan White Chilli Pasta Casserole's shape not recorded). EXPO gap seen: a same-day hot send (both kimchi fried rices) can't be recorded as its shape, so its warning was dismissed with a reason.
- **Change it in-app, not in code (ruled 2026-11-08).** Owner: `conc-kitchen-expo/EXPO_IN_APP_ACTION_PLAN_2026-11-08.md` §6.
  Jason ruled all 18 calls on the leans: kitchen changes (menus, recipes, production rules, shapes) are made in-app,
  and a kitchen change that needs a PR is a bug in the plan (call 16 counts them monthly). Who reads what: DOOR owns
  which recipe a dish is (the slot link), CODEX owns food facts, EXPO owns how a dish travels (F1); nothing relayed.
  Cross-app pieces, all done: R3 (EXPO reads CODEX's shared Library by recipe ID; 2026-11-09, CODEX #286/#287/#289,
  EXPO #586; HUB #61 reads the same file), D1 (DOOR and HUB read `sites.json`; 2026-11-10, DOOR #183, HUB #60) and D2
  (DOOR allergen, routing and spelling rules page; Jason and named leads only; 2026-11-10, DOOR #185 and #186). Each ships paired or fails loudly. Standing rulings: `HOUSE_RULINGS_INDEX.md`.
- **DOOR menu flow (Astra, 2026-11-06; picked up 2026-11-07).** Owner: `conc-kitchen-door/docs/DOOR_MENU_FLOW_ACTION_PLAN_2026-11-06.md` §Status.
  - Built: DOOR #153–#158, EXPO #564, HUB #56/#57. F1 (one-set publishing) is on.
  - EXPO #565 (F3a): **merged 2026-11-08** (`d0663f7`; the 'parked' note here was stale, found 2026-11-11). Its 19 once-failing gates pass on main. Follow-up: HUB #61, recipe links by recipe ID, a card warns only when its recipe is gone, HUB reads CODEX's Library (Jason's rulings 2026-11-11).
  - F4 done 2026-11-09: EXPO #580/#581 and HUB #58/#59 read the count stamp (independent review folded), DOOR #181 switched it on. Operational: the follow-up publish is done (stamped publishes since 11-09; sequence 5 on 2026-11-11); every DOOR data edition goes through DOOR's stamped publish.
  - F3b and F5 wait until F4 has run about a week (Jason, 2026-11-07).
- **CODEX refinement line (2026-10-31).** Owner: `conc-recipe-hub/docs/plans/CODEX_REFINEMENT_ACTION_PLAN_2026-10-31.md`
  §0 (Jason's 12 rulings, batches RF1–RF10, HOUSE-1, EXPO-1). Done: RF1, RF2, RF4–RF8, EXPO-1 (conc-kitchen-expo#527;
  EXPO #600 has since made its 7 days kitchen data). Cross-app piece still open: **RF3**, the v35 Coconut family
  (paired DOOR change, after a one-resident DOOR check); not started (checked 2026-11-11).
- **DOOR resident-data privacy (2026-10-31).** DOOR's repository moves to private, as CODEX, HUB and EXPO already
  are, with its Pages kept to the list above. Jason, 2026-11-01: he and his manager judge the records not identifying
  and of low sensitivity. Phases:
  1. **done:** Pages serves only the app and its feeds; no built-in resident list (#148, .48);
  2. **done:** one keyed reader for DOOR's own files, viewing keys, and the "can't read the list" state (#151, .49);
  3. **Jason:** make a viewing key, rehearse on one computer with DOOR's rehearsal switch (this confirms viewing-key
     detection), then give viewing keys to the computers that show plating sheets;
  4. **Jason:** make the DOOR repository private;
  5. **a session:** remove DOOR's temporary raw-read fallback and the rehearsal switch.

  No other app changes: every cross-app reader uses DOOR's Pages. EXPO's own Pages narrowing is EXPO's EX-9. The plan
  doc is on Jason's computer (DOOR branch `claude/door-resident-data-privacy-plan`, not pushed).
- **HOUSE site registry (ruled 2026-10-31, S1–S4).** One `conc-kitchen-house/sites.json` on Pages,
  read by every app with the 3-tier fallback; lowercase keys with every app's old codes as aliases;
  shared facts only (identity, kitchen/served flags, status, dated open windows, cooked-by, meals,
  where its numbers come from); counts stay live in DOOR, equipment and staff in EXPO. Sites:
  Bloor, Rexdale, Lansdowne (kitchen + ~40 residents), 1011 Lansdowne and Roncy (served, cooked by
  Lansdowne), the winter warming centre (Lansdowne, Nov 15 – Apr 15 for now), GCNC (baking, paused).
  Published 2026-10-31 as `sites.json` (contract `SITES.md`). Read by CODEX (RF4), EXPO (EX-16), DOOR (#183)
  and HUB (#60) (checked 2026-11-11); nothing open but new sites.
- **Silent-drift remediation (2026-07-27).** Owner: `conc-kitchen-hub/HOUSE_SILENT_DRIFT_ACTION_PLAN_2026-07-27.md`
  §10. The class: a clean-fetched but stale board (HUB served a 14-day-old board built from DOOR menu v30
  while DOOR had been on v32 for two weeks; nothing compared them). **Closed except E3** (deferred by Jason
  2026-08-18; it heals on the next EXPO boot): D1–D5 2026-08-17; X2–X4 2026-08-18; H2–H4 HUB #39; E1/E2/E4–E6
  EXPO #240/#241; O1 and D6 2026-10-16 (checked 2026-11-11). Nothing to build.
- **SharePoint / M365 integration.** Brief: `conc-kitchen-house/HOUSE_SHAREPOINT_IT_BRIEF_2026-07-07.md`
  (+ `SHAREPOINT_IT_BRIEF.html` printable handout). Staged plan (Stages 1–5, hosting last); the concrete
  Stage-1/2 ask to CONC IT = a governed library + one Entra SPA app registration. HOUSE Phase 5/6.
  CODEX's dormant SharePoint review queue stays hidden, code kept, until this is ruled.
- **HACCP capture.** Food-safety plan work in `conc-kitchen-house/haccp/` + the `HACCP_*.md` docs.
- **Food-safety follow-up `conc-kitchen-door#63`:** closed 2026-08-17 (DOOR's veg-alt allergen floor,
  `mergeVegAltAllergenFloor`). Harness `conc-recipe-hub/tests/door_vegalt_safety_gate.mjs` still runs on CODEX feed changes.

---

## Design + knowledge owners (single owner per fact — point, don't restate)
- **Standing rulings (an index, call 18 of the in-app plan):** `conc-kitchen-house/HOUSE_RULINGS_INDEX.md`.
  One line and a link per ruling; each ruling's owner stays its plan.
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
- **Silent when it works, loud when it breaks** (Jason, 2026-11-07). The back end may be as capable as
  the job needs, as long as staff never see its workings. A break must reach someone who can act on it.
  Alarm levels (ruled by Jason, 2026-11-07):
  - **food safety** (an allergen or anaphylactic change didn't reach the plating sheet or EXPO): red, on
    the screen in use;
  - **operations** (stale counts, a computer that hasn't sent, a site offline): a quiet line for
    supervisors and a note to Jason;
  - **plumbing** (retries, skipped duplicates, slow deploys): a log only Jason reads.

  The 2026-11-06 DOOR publish stop showed nowhere, which is the case this rule exists to prevent. DOOR's
  red reconnect banner and its journey check (DOOR #161, `v31-standard.51`) are its first application.
- **Checks support, never obstruct** (Jason, 2026-11-07). Three kinds only:
  - kitchen-journey checks (an edit reaches EXPO and HUB);
  - contract checks at each seam between apps;
  - unit checks for genuinely tricky logic.

  Every new check names the kitchen failure it prevents. A check never reads live menu or roster data
  (DOOR C2a's lesson): use fixed examples. A flaky check is fixed or removed within a week, never
  retried quietly.
- **Keep the seams swappable** (direction 2026-11-07, below). Sign-in code lives only in each app's
  credential seam (`PublishAuth` in DOOR; `HOUSE_PROVEN_SEAMS.md` rows 3–4). File reads and writes go
  only through each app's reader and publisher. Add no new GitHub-specific machinery: no per-computer
  GitHub keys, no GitHub Enterprise, no server.

## Direction (Jason, 2026-11-07, long term; nothing built yet)
- **Hosting:** the apps' code on GitHub Pages under a **CONC organization account**, not Jason's
  personal one. The move changes every Pages address, so every cross-app feed address changes in the
  same sitting. Planned once, before more sites are wired in.
- **Sign-in:** **Entra / Microsoft 365** replaces the GitHub keys (PATs). Jason is talking with IT.
  Questions for IT:
  - an Entra app registration (single-page app) for the Pages addresses;
  - SharePoint/Graph access for it;
  - guest accounts for outside kitchens;
  - shared kitchen tablets.

  An Entra token can't write to GitHub, so the data moves too (next item). Sign-in needs the hosted
  `https://` page; `file://` stays read-only.
- **Data:** resident and menu data in **SharePoint through Microsoft Graph** (build-path phase 6), with
  permissions per site. Private resident data then never sits on GitHub.
- **Sites:** **kitchens that cook** (Bloor, Rex; contract kitchens later) and **sites where people eat**
  (each with its own residents and probably its own menu). DOOR is the eating side, EXPO the cooking
  side.
  - Shelter kitchens may join later as a site that cooks for itself; nothing is designed for them now.
  - Each site's data stays separate once outside kitchens join.
  - Bloor/Rex is the focus now.
  - F4's count stamp already carries the site (checked 2026-11-07):
    - required, and hashed into `inputRevision`;
    - carried in `_meta.site` and in each `serviceRef`;
    - matched by the consumer API (`houseFlowResolve({site,…})`);
    - DOOR's `rexdale` is a `sites.json` key.

    No change needed. One per-site gap remains: the private publication counter (`door_flow_publication.json`) is one file per repository. That is fine while each site has its own storage, which is the SharePoint direction.

---
