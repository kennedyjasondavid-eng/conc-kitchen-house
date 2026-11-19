# HOUSE storage: one browser origin, kept from filling — plan, 2026-11-19

Jason, 2026-11-19: CODEX gave "storage is full" errors; "do the storage fix when you are able". DOOR, EXPO, HUB and CODEX are served from one origin (`kennedyjasondavid-eng.github.io`), so they share one localStorage allowance of about 5 million characters. This file owns the line's status (§0).

## 0. Status

| Slice | What | Repo | State |
| --- | --- | --- | --- |
| S1-H | This plan; proven-seams row 1 extended (re-fetchable caches are expendable everywhere) | HOUSE | In progress |
| S1-C | CODEX: `setItemSafe` frees re-fetchable caches and retries once; Administration → Storage used (read-only) | CODEX | Built, reviewed (SHIP); PR after its full suite |
| S1-D | DOOR: `DOOR_EXPENDABLE_KEYS` gains its re-fetchable caches; the dead reno menu cache goes | DOOR | PR conc-kitchen-door#263 |
| S1-E | EXPO: the same in `ensureStorageHeadroom`; carries the tests-only CI change | EXPO | After EXPO #670 |
| S1-U | HUB: bare cache writes go through a quota-safe writer with the same rule | HUB | PR conc-kitchen-hub#82 |
| S2 | One kept copy per published file shared by every app; caches move to IndexedDB | all | Later |

## 1. What was measured

On the device that showed the error (Jason, 2026-11-19), the 25 largest keys held about 4.9 million characters:

| App | Share | Largest keys |
| --- | --- | --- |
| EXPO | 42% | `pp_autosave` 526 KB, `pp_canonical_save` 263, `pp_ledger` 244, five feed caches |
| DOOR | 29% | `door_shared_library_cache` 285, `concMenuChangeLog` 216, `door_routing_cache` 213, `concMenuBase` 189 |
| CODEX | 24% | `concRecipeLibrary` 1,085 |
| HUB | 6% | `hub_schedule_cache` 305 |

Correction (2026-11-19, found building S1-D): `door_routing_cache`, `door_menu_rexdale_current_cache` and `door_recipe_prod_records_cache` are HUB's keys despite the `door_` prefix (only HUB writes and reads them), so about 570 KB of the DOOR row above is HUB's. HUB's slice frees them.

About 1.4 MB is the same published files kept two or three times by different apps: the shared Library (EXPO and DOOR), DOOR's routing (EXPO, DOOR and CODEX), DOOR's menu (EXPO and DOOR), the recipe feed (EXPO and DOOR). DOOR's reno menu cache (61 KB) is read by nothing since every app runs the standard menu.

## 2. The rule (slice 1)

- **A re-fetchable cache is expendable.** A key that only holds a copy of a published file, kept for offline use, may be removed when a write fails for quota. The app re-reads the file at its next fetch, and falls back to its built-in copy offline, as each reader already does (proven-seams row 2).
- **Working data is never expendable.** A recipe library, a menu edit, a registry, a schedule save, a ledger, an outbox: none is removed by this rule.
- **Each app frees only its own caches,** the keys it writes. Another app's keys are left alone; each app's writer applies the rule to its own list.
- **One retry.** On a quota failure the writer frees the app's expendable caches, retries once, and if that still fails, says so as it does today. Freed keys are named in the console.

## 3. Slice 2 (later)

One kept copy per published file, keyed by the file's URL and read by every app, and the kept copies moved to IndexedDB (a far larger allowance), so localStorage holds only working data. It needs each app's reader changed together, so it is its own line.
