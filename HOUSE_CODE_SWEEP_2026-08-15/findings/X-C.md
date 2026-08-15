# Findings — Slice X-C: shared-origin storage + duplicated vocabulary

- Sweep date: 2026-08-15
- Agent: X-C
- Repo HEADs at sweep start:
  - DOOR `conc-kitchen-door`: `7500521` Merge PR #74 (menu-footguns design)
  - EXPO `conc-kitchen-expo`: `2686de6` Merge PR #232 (v9.49.36 bump)
  - HUB `conc-kitchen-hub`: `9ecce4c` Publish to Hub: schedule v=-1793534894 + sidecar
  - MISE `conc-recipe-hub`: `6ea8b30` Cheat sheet #81
  - PROOF `conc-kitchen-proof`: `b3dc772` Merge PR #12
  - HOUSE `conc-kitchen-house`: `e992224` Code sweep outage log
- Coverage statement: IN PROGRESS — will be finalized at end.

## Grep-battery results (storage-focused)

- `localStorage.clear()` / `sessionStorage.clear()`: **0 across all six apps** — no nuclear clears anywhere.
- `storage` event listeners (`addEventListener('storage')` / `onstorage`): **0 across all six apps** — no app observes cross-tab/cross-app writes.
- removeItem survey: DOOR 12 sites (all DOOR-owned keys), HUB 5 (own + deliberate `conc_gh_token` disconnect), MISE 2 (own), EXPO's are gate-covered owner-guarded, PROOF 0.
- Global error/quota handlers: `QuotaExceeded|window.onerror|addEventListener('error')` → **0 hits in DOOR and MISE** (EXPO has the save-trust loud-failure contract; PROOF try-wraps everything; HUB try-wraps cache writes).
- MISE `setItem(RECIPE_LIBRARY_KEY` write sites: **28 total, 27 bare (no try), 1 try-wrapped** (measured with 4-line lookback).
- DOOR `localStorage.setItem` survey: **69 sites; ~30 BARE (no try)** including the menu-truth keys `concMenuBase` (5 sites, mixed bare/try) and `concUploadedMenu` (2 bare); `saveRegistryState` IS try-wrapped but the catch is `console.warn` only.

## Key census matrix

Legend: R=getItem, S=setItem, X=removeItem. Constructed keys resolved to literals. `<-- MULTI` = touched by >1 app.

| key / family | DOOR | EXPO | HUB | MISE | PROOF | HOUSE | note |
|---|---|---|---|---|---|---|---|
| `conc_gh_token` | R (detect-only, PublishAuth.migrateLegacyState :11533) | R/S/X (owner of record; sanitizes on read) | R/S/X (writes raw; disconnect removes) | — | — | — | <-- MULTI, see X-C-3/4 |
| `concRecipeLibrary` | — | test-only refs | R/S (seed-merge writer :4899; reader :3086) | R/S — 28 write sites, owner | — | — | <-- MULTI, see X-C-2 |
| `concRecipeSettings` | — | — | R/S (`.microsoft365` RMW :3869) | R/S (full-object clobber :23201) | — | — | <-- MULTI, see X-C-1 |
| `concRecipeSettingsHistory` | — | — | — | R/S | — | — | |
| `concRegistryState` | R/S/X | — | — | — | — | — | single-writer ✔ |
| `concRegistrySnapshot`, `concRegistryProvenance`, `concRegistryPatch_20260427` | R/S(/X) | — | — | — | — | — | |
| `concUploadedMenu`(+`Timestamp`), `concMenuBase`, `concMenuEdits`, `concMenuChangeLog`, `concCustomTagRules`, `concLearnedNR`, `concMealSwaps`, `concSpecialMeals`, `concRecentLog`, `concRevertedSwapKeys`, `concDismissedDiffs`, `concIntakeQueue`, `concNRResolutions`, `concUnresolvedNR`, `concLastImport*`, `concLastGenerated`, `concOperatorName`, `concAltMenuActive/Cache/Stamp`(retired,cleared), `concAltFlagSweepV1` | R/S/X | — | — | — | — | — | DOOR family (unprefixed `conc*`) |
| `conc_selected_site` | R/S | — | — | — | — | — | lowercase site keys |
| `conc-door-settings` (token inside), `conc-door-anaph`, `conc-door-gh-token-meta` | R/S | — | — | — | — | — | DOOR token lives here |
| `door_html_stamp` | R/S | — | — | — | — | — | stale-tab guard |
| `door_just_reloaded` | sessionStorage R/S/X | — | — | — | — | — | |
| `door_recipe_data_cache` | R/S | — | — | — | — | — | CODEX feed cache (53KB) |
| `door_recipe_prod_cache`, `door_registry_cache`, `door_routing_cache`(+`_at`) | — | — | R/S | — | — | — | **HUB-owned keys wearing the `door_` prefix** (X-C-9) |
| `kdo-dark` | R/S/X | — | — | — | — | — | theme (see X-C-12) |
| `pp_*` family (~45 keys incl. `pp_canonical_save`, `pp_ledger`, `pp_history`, caches, `pp_new_item_review_v1`, `pp_premigration_backup`) | — | R/S/X | — | — | — | — | EXPO-owned, owner-guarded cleanup ✔ |
| `pp_gh_token` (legacy) | — | R+X (migrate-once) | — | — | — | — | retired correctly |
| `sec_*`/`dsec_*` (escrow + collapse prefs), `expo.orderSheet.bucket.wk<N>`/`.onhand.<key>`, `expo-graph-groups`, `expo_showRouteBadges`, `pp-theme`, `conc-schedule-mode` | — | R/S/X | — | — | — | — | all in `_storageKeyOwner` regex ✔ |
| `hub_schedule_cache`, `hub_schedule_version`, `hub_orders_cache`, `hub_overrides_cache`, `hub_pinned_docs`, `hub_pinned_prints`, `hub_staff_name`, `hub_home_site` (HOME_SITE_STORAGE_KEY) | — | test-only | R/S/X | — | — | — | single-writer ✔ |
| `hub_gh_token` (legacy) | — | — | R+X (migrating) | — | — | — | |
| `conc-theme` | — | — | R/S | — | — | — | theme (X-C-12) |
| `concSiteProfile` | — | — | R/S | — | — | — | HUB-only; feeds dead SECTION_COUNTS (X-C-7) |
| `concRecipeScheduleLinks` | — | — | R/S | — | — | — | |
| `conc_hub_gh_settings` `{token,repo,autoPublish}` | — | — | — | R/S | — | — | MISE's own GH token (X-C-4) |
| `CONC_COST_OVERRIDES`, `CONC_COST_PRICE_LEDGER_V1` | — | — | — | R/S | — | — | SHOUTCASE unprefixed (X-C-11) |
| `concRecipeLog`, `concEquipment`, `concProductionSeedVersion`, `concSharedStatusMigration`, `concSeedMergeReceipt`, `concSeedMergeToastVersion`, `concSharedStatusMigrationReceipt`, `concPreMigrationRecipeBackup`, `conc-rb-theme` | — | — | — | R/S/X | — | — | MISE family sharing DOOR's `conc` prefix (X-C-11) |
| `concRecipeAuthoringSessionV1` | — | — | — | sessionStorage R/S/X | — | — | |
| `proof_period/site/audience/theme/report/nudge_log` | — | — | — | — | R/S (whitelist-enforced) | — | ✔ |
| `proof_cache_routing/registry/menu/schedule/recipes/aliases/framework/ghgfactors` | — | — | — | — | R/S | — | ~530KB family |
| `house_expo_auth`, `house_door_auth`, `house_codex_auth` | — | — | — | — | — | sessionStorage R/S | portal unlock flags |

## Findings

(appended as confirmed)

## Confirmed-healthy

(appended as confirmed)

## Limitations

(appended at end)
