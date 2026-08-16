# Slice X-A — cross-app contract conformance (writer vs readers, field by field)

Read `_COMMON.md` first. Findings → `findings/X-A.md`. Record HEAD shas of all repos touched.

**Method:** for each feed below, grep-locate the writer's serialize site and EVERY reader's parse site across all six repos; read ONLY those functions (plus minimal surrounding context). Build a per-feed field matrix; report only rows with a defect or risk (full matrices → an appendix section of your findings file).

| Feed | Writer | Readers |
|---|---|---|
| `menu_current.json` | DOOR `buildMenuJSON` | EXPO `loadMenuFromDOOR`/`syncMenuFromDOOR` · HUB freshness compare (`compareBoardMenuToDoor` + `ensureMenuLoaded`) · PROOF `validateMenu` |
| `routing_by_meal.json` | DOOR `buildRoutingByMealJSON` | EXPO portion math (`_routingByMeal` consumers) · HUB `_componentPortions` · PROOF S2 join (`resolveCoverage`) |
| `hub_schedule.json` + `hub_schedule_version.json` | EXPO `generateHubData`/`_buildHubSchedulePayload` (+ sidecar write) | HUB `loadScheduleData` · PROOF `validateSchedule` · EXPO's own no-op-publish guard reads the sidecar |
| `DOOR_RECIPE_DATA.json` | MISE publish flow | DOOR live fetch (+ baked fallback) |
| `recipe_production.json` | MISE `publishRecipeProduction` | EXPO codex sync · HUB recipe links · PROOF `validateRecipes` |

**Per-field checks:** writer always emits? reader requires? behavior on missing/null (silent default? fabricated value — the `allergens || []` *never-verified→analyzed-clean* class? throw?); type agreement (string vs number, array vs map); version/schema stamp written vs actually read (and HOW read — equality only? the D7 contract); tolerant parse that would swallow structural corruption vs throwing parse that takes down a board. Flag any reader consuming a field no writer emits (dead contract) and any writer emitting fields no reader consumes (candidate cruft — check PROOF/HUB before calling it dead).

**Historical-tolerance check (static, by node script):** EXPO `snapshots/*.json` (~44 files, May→Aug) — key-set drift over time vs what HEAD's `revertToCanonical`/`gatherFullState`/STORE_MAP expects: would restoring an old snapshot silently drop or misread state? Also: HUB's committed `hub_schedule.json` at HEAD vs what PROOF's fixtures assume (quantify the fixture-schema gap for P-1 to cite).

**Known context (don't re-report as new):** `_meta.version` semantics = D7 (documented); H4 one-directional schema audit = KNOWN; EXPO#233 mirror in flight; `_components` can legitimately disagree with section counts (never propose reconciling). Your NEW ground: field-level conformance nobody has systematically checked.
