# HOUSE multi-site menus plan (2026-11-18)

Jason, 2026-11-18: "What happens when DOOR holds more than one menu for different sites?", then, after the answer that
only Rexdale's menu exists end to end today: "multi site menus are a medium term goal, yes".

This plan owns the line's status (§10). Every claim below was read on `origin/main` of each repo on 2026-11-18. Line
numbers are from that day's files and will drift.

## 1. The goal

Each site that serves meals can have its own menu. DOOR holds and publishes each one. Every other app reads the menus it
needs, by site, and never mixes one site's menu with another's.

- A kitchen that cooks for two sites plans both menus on one board, and every job says which site and meal it is for.
- When two sites eat the same dish on the same day, the cook can be shared, and the board says it feeds both.
- HUB shows each site its own meals and work.
- CODEX shows each site its own menu shelf and batch targets.

## 2. What exists today

**One menu, Rexdale's, runs end to end.** Every app reads one DOOR menu file, `menu_current.json`, from one DOOR site.

**DOOR's site picker changes paths, not data.**
- `selectSite` (DOOR `index.html:2613`) changes the SharePoint paths, the labels and the site notes. That is all.
- The menu, the resident list, the routing, swaps and special meals all live under one set of storage keys with no
  site in them (`concUploadedMenu`, `concMenuBase`, `concRegistryState`, `concMealSwaps`, `concSpecialMeals`, …).
- Every published file is stamped with `currentSite.id || 'rexdale'`, and a site record has no `id`, so every
  publish says `rexdale` whatever the picker shows (`10770`, `10787`, `10836`, `10949`, `12356`, `12450`, `12464`,
  `13108`, `18644`).
- All three sites' `spMenu` paths point at the same Bloor 4-week rotation workbook (`2492–2514`).

**The overwrite risk, exactly.** Set DOOR to Lansdowne and edit "the menu", and you are editing Rexdale's menu. A publish
writes Rexdale's `menu_current.json`, `routing_by_meal.json` and `registry_summary.json`, stamped `rexdale`, from
Lansdowne-labelled screens. EXPO, HUB and CODEX take it as Rexdale's. Nothing warns. Today nobody uses DOOR for
Lansdowne, so nothing has gone wrong, but the picker invites it.

**The site registry has no menu fields yet.** `sites.json` records hold `key`, `name`, `aliases`, `kitchen`, `served`,
`status`, `open`, `cookedBy`, `meals`, `numbersFrom` and `notes`. There is no `menu` field. (Correction to the summary
Jason got on 2026-11-18, which said `menu`/`menuFrom` were already reserved: they are not.) Only Rexdale has a
`numbersFrom`.

## 3. Single-menu assumptions, app by app

### DOOR (conc-kitchen-door): 7
| Where | Assumption | With two menus |
|---|---|---|
| `selectSite` 2613, storage keys | One menu, one resident list, one routing per computer | A second site's menu overwrites the first |
| `_meta.site` defaults (9 places above) | Every file is Rexdale's | A Lansdowne publish is stamped Rexdale |
| `DOOR_PUBLIC_FEEDS` 10517 | Fixed file names at the repo root | No room for a second menu file |
| `PublishAuth` repo 10222 | One repo for everything | Fine if per-site folders; per-site repos need a repo per site |
| `DOOR_CYCLE_ANCHOR` 18135 | One rotation start for every menu | A site on another rotation reads the wrong week |
| `DOOR_FLOW_ACTIVATION_EPOCH` 11899 | One flow-receipt chain, `rexdale-f4-…` | A second site needs its own chain |
| `SITE_CONFIGS` 2492 `spMenu` | All sites import one workbook | Each site needs its own menu source |

### EXPO (conc-kitchen-expo): 9
| Where | Assumption | With two menus |
|---|---|---|
| `DATA_SOURCES.doorBase` 2665, `syncMenuFromDOOR` 65532, `loadMenuFromDOOR` 66162 | One menu URL | Reads only one site's menu |
| `MENU` 18214, `decomposeMenu` 22284 | `MENU[week][day][meal]`, no site level | Two menus can't both be held |
| `operationalKey` 45406 | A job is name, type, line, week, day, meal | The same dish on two menus the same day is one job: a change to one hits both |
| `_sharedEventScopeKey` 3036 | The shared plan's identity has no site | Two computers' changes for two sites collide or merge |
| `serviceRefs` 19157 | Every service is `site: 'rexdale'` | HUB and CODEX read every job as Rexdale's |
| routing / registry reads 66735, 66797 | One site's counts and anaphylactic list | Batch sizes and allergy checks use one site's residents |
| HUB payload `_doorMenu` 34566, `MEALS` | One menu's meal lines and version | HUB's menu check compares against one menu |
| `HUB_CYCLE_START` 33941 | One rotation start | As DOOR |
| EX-16 reader 63493, 63543 | Counts only where `numbersFrom` is set (Rexdale) | Ready for more sites once DOOR publishes their counts |

### HUB (conc-kitchen-hub): 5
| Where | Assumption | With two menus |
|---|---|---|
| `DOOR_BASE` 1395, menu read 6073 | One DOOR menu | Freshness compares against one menu |
| `compareBoardMenuToDoor` 2750 | Board meals vs DOOR's one menu | Reports drift for the other site's meals |
| routing reads 1364, 5994; registry 5967 | One site's counts | Portion links and frozen stock use one site's numbers |
| `HUB_SCHEDULE_URL` 6193 | One schedule | Fine if EXPO's one schedule holds every site, tagged |
| `hubSitesFromRegistry` 2429, `sliceMatch` 2513 | Site slices from the registry | Already per site; works once jobs carry their serve site |

### CODEX (conc-recipe-hub): 3
| Where | Assumption | With two menus |
|---|---|---|
| `CX_DOOR_MENU_URL` 41658, cache `concDoorMenuNames` 41669 | One menu's names | Week shelf and menu-name lookup see one site |
| `_cxMenuShelfSite` 42656 | Reads the menu's `_meta.site` and the device's site | Ready: works per site once each menu is labelled truly |
| `recipe_aliases.json` (41727) | Menu names are Rexdale's words | A second menu's names need their own alias review |

Batch targets (`_cxBatchTarget` 43579, `numbersFrom` reader 43062–43194) are already per site.

### HOUSE (conc-kitchen-house): 2
- `sites.json` has no menu field (above).
- The status ledger and `_cycleStart` speak of one rotation.

**Total: 26 places**, most of them in DOOR and EXPO.

## 4. The picture we're aiming for

- **DOOR** keeps each site's menu, resident list and routing apart, and publishes them per site:
  `sites/<site-key>/menu_current.json`, `sites/<site-key>/routing_by_meal.json`, `sites/<site-key>/registry_summary.json`.
  Each file's `_meta.site` is that site's key. The picker chooses whose data you are editing.
- **The registry** gains `menuFrom` (the path of the site's menu, or `null` for a site served from another site's menu)
  and `menuOf` (for a site that eats another site's menu, e.g. Roncesvalles eating Lansdowne's). `numbersFrom` is filled
  per site as DOOR publishes it.
- **EXPO** reads every menu its kitchens cook for. One board holds them all.
  - Each job carries its serve site and meal.
  - A cook two menus share is one job that says it feeds both, with each site's amount.
  - The shared plan's identity includes the serve site.
- **HUB** shows each site its own meals and work, from EXPO's one schedule, and checks each site's menu against DOOR's.
- **CODEX** shows a menu shelf and batch targets per site, and keeps aliases per menu.

## 5. Data contracts that change

| File | Change | Producer | Consumers |
|---|---|---|---|
| `sites.json` | add `menuFrom`, `menuOf`; schema 2 | HOUSE | DOOR, EXPO, HUB, CODEX |
| DOOR per-site menu, routing, registry summary | new paths `sites/<key>/…`; `_meta.site` is the true site; Rexdale's root files kept as a copy until every reader moves | DOOR | EXPO, HUB, CODEX |
| `hub_schedule.json` | each job's `serviceRefs.site` is its real serve site; `MEALS` per site; `_doorMenu` per site; `_schemaVersion` 3 | EXPO | HUB, CODEX |
| EXPO shared plan | the serve site joins the identity (`_sharedEventScopeKey`, `operationalKey`); a migration maps old events to Rexdale | EXPO | EXPO on every computer |

**The cross-repo rule holds** (silent-drift plan §X2): each contract change ships with its consumer in the same change
set, or the consumer refuses the new version out loud. Rexdale's root files stay until every reader reads per-site paths,
so nothing breaks in between.

## 6. Ship first: the DOOR guard

Before anything else, close the overwrite risk.

- While the picker is on any site other than Rexdale, DOOR refuses to edit or publish the menu, resident list or routing,
  and says so: "DOOR's published menu and resident list are Rexdale's. Switch to Rexdale to change them. Other sites'
  menus come later."
- The picker still changes SharePoint paths and labels, as today.
- Gate: with Lansdowne picked, Save, Publish and the menu editors are refused in words, and no file is written.

This is a small DOOR change, independent of everything else.

## 7. Phases and slices

| Phase | Slice | What | Repo | Gate idea |
|---|---|---|---|---|
| 0 | G1 | The DOOR guard (§6) | DOOR | Lansdowne picked: nothing edits or publishes, and the screen says why |
| 1 | R1 | `sites.json` schema 2: `menuFrom`, `menuOf` | HOUSE | sites_registry_gate reads the new fields; schema 1 readers refuse 2 out loud |
| 1 | R2 | Every app reads schema 2 (and still reads 1) | DOOR, EXPO, HUB, CODEX | each app's sites gate on both schemas |
| 2 | D1 | DOOR keeps each site's data under its own storage keys; picker switches data | DOOR | two sites' menus edited in turn stay apart; Rexdale's keys migrate once |
| 2 | D2 | DOOR publishes per-site paths, true `_meta.site`; Rexdale's root files kept as a copy | DOOR | a Lansdowne publish writes only `sites/lansdowne/…`; Rexdale's root files unchanged |
| 3 | E1 | EXPO reads every menu its kitchens cook (from `sites.json`), holds `MENU[site]` | EXPO | Rexdale's board byte-identical (ux_diff 0/0/0) with one menu; a second menu adds its jobs only |
| 3 | E2 | Serve site in job identity and the shared plan, with a migration | EXPO | old shared events map to Rexdale; a change to one site's dish never moves the other's |
| 3 | E3 | Shared cooks: one job feeds two sites, each amount shown | EXPO | the same dish on two menus the same day is one cook with two serves |
| 3 | E4 | `hub_schedule.json` schema 3: serve sites, per-site meals and menu stamps | EXPO + HUB | producer and consumer gates byte-identical, as the required-key contract |
| 4 | H1 | HUB per-site meals and freshness | HUB | each site's board checks its own menu |
| 4 | C1 | CODEX per-site shelves, aliases per menu | CODEX | each site's shelf reads its own menu |
| 5 | X1 | Retire Rexdale's root copies once every reader reads per-site paths | DOOR | no reader fetches the root files |

Order: G1 now; R1–R2; D1–D2; E1–E4; H1 and C1; X1. Each slice is one PR with its gate authored red first, and a cross-repo
slice lands producer and consumer together.

## 8. Calls for Jason

| Call | Question | Lean |
|---|---|---|
| M1 | One DOOR with per-site folders, or one DOOR repo per site? | One DOOR, per-site folders. One app to keep, one connection key per kitchen, and the registry already names sites. |
| M2 | Do Lansdowne's served sites (1011 Lansdowne, Roncesvalles, the warming centre) share Lansdowne's menu? | Yes, through `menuOf`, until one needs its own. |
| M3 | Does EXPO plan every kitchen on one board, or one board per kitchen? | One board, with the site filter. Bloor cooks for more than one site, and one board is how shared cooks stay one job. |
| M4 | A cook two menus share: one job or two? | One job that says it feeds both, with each site's amount; it splits only if someone moves one site's part. |
| M5 | Does the serve site join the shared plan's identity? | Yes, with a one-time migration that reads every old event as Rexdale's. |
| M6 | HUB's home site default? | Unchanged: each tablet keeps its chosen home site; a new tablet asks once. |
| M7 | Rollout: Lansdowne first, read-only? | Yes. DOOR publishes Lansdowne's menu; EXPO and HUB show it beside Rexdale's, planning nothing, for one cycle. Then EXPO plans it. |
| M8 | Do sites share one 4-week rotation start? | Yes until a site needs its own; then `cycleStart` moves into the site record. |

## 9. Risks

- **EXPO identity change (E2).** Every saved change on every computer is keyed without a site. The migration must be
  exact and gated on real saves, or changes stop matching.
- **Shared cooks (E3).** Splitting or merging a shared cook must never drop one site's amount.
- **Counts and allergy checks.** Each site's anaphylactic list and plated counts must stay with that site. A mix-up here
  is a food-safety problem, not a display one.
- **Two copies during the move.** Rexdale's root files and its per-site files must agree until X1. A gate compares them.
- **Scale.** The rest of HOUSE has been built and tested on one menu; expect re-pins in every repo.

## 10. Not in this plan

- How a site's menu is written (Rex's week sheet, the workbook). Each site uses DOOR's existing tools.
- Staffing and equipment per site (EXPO's site profile already holds these).
- PROOF reporting per site.

## 11. Status

| Item | State | Where |
|---|---|---|
| This plan | written 2026-11-18 | this file |
| Calls M1–M8 | waiting for Jason | §8 |
| G1 (DOOR guard) | built 2026-11-19 (`v31-standard.108`): with another site picked, DOOR refuses every write to the menu, resident list, routing, swaps, special meals and rules, and every send (skip reason `other_site`, the outbox keeps the work); review in progress | conc-kitchen-door #248 |
| R1–X1 | not started | |
