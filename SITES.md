# HOUSE site registry — `sites.json`

**One file names every CONC site for every HOUSE app.** It lives at the root of `conc-kitchen-house` and is served on Pages at `https://kennedyjasondavid-eng.github.io/conc-kitchen-house/sites.json`. Each app reads it like any other HOUSE feed: live, then the last copy it kept, then a copy built into the app.

Ruled by Jason on 2026-10-31 (CODEX refinement plan, `conc-recipe-hub/docs/plans/CODEX_REFINEMENT_ACTION_PLAN_2026-10-31.md` §4, calls S1–S4). His brief: "a simple but powerful way to easily add/remove sites with relevant details in HOUSE". It ports HUB's `HUB_HOME_SITES` pattern (`HOUSE_PROVEN_SEAMS.md` row 8) up to HOUSE level.

## What a record holds (S3: shared facts only)

| Field | Type | Meaning |
| --- | --- | --- |
| `key` | lowercase words joined by `-` | The site's permanent id. **Never changes, never reused, never deleted** (S2). |
| `name` | text | What people call it. Can change. |
| `address` | text or `null` | Street address. |
| `aliases` | list of lowercase text | Other names and every app's old codes (`rex`, `lan`, `gc`). An app matches by key or alias, case-insensitively. |
| `kitchen` | true / false | The site cooks or preps. "Which sites are kitchens?" is always this flag, never a list in code. |
| `served` | true / false | Residents are served meals there. |
| `status` | `planned`, `active`, `paused`, `retired` | Whether the site is in use at all. |
| `open` | list of `{from, to}` dates (optional) | When it is open (S4). Absent means open whenever it is active; an empty list means no window, so closed. Both ends are included, as local dates. `to` may be `null` (open-ended). A seasonal site gets a new window each season. |
| `cookedBy` | list of site keys | Which kitchens feed it (itself if it cooks its own). Each must be a `kitchen: true` site. |
| `meals` | list, or `{weekday: [...], weekend: [...]}` | Meals served: `breakfast`, `lunch`, `dinner`, `snack`. Use the object when weekdays and weekends differ. |
| `numbersFrom` | path or `null` | Which published file holds its live plated counts, e.g. `conc-kitchen-door/routing_by_meal.json`. `null` means no numbers yet; count-based features (CODEX's batch targets) skip the site. |
| `notes` | text | Short context for people. |

**Never stored here:** counts (live in DOOR), equipment, labour and staff (EXPO's site profile), registry and SharePoint paths (DOOR), fridge codes (HUB), batch rules (CODEX). Each app keeps its own details under the same `key`.

## Doing things

- **Add a site:** add a record with `status: "planned"`. If it is served, set up its DOOR registry; if it cooks, add its EXPO profile. Then set `active` (with an `open` window if it is seasonal or temporary) and, once DOOR publishes it, `numbersFrom`.
- **A site gets its own kitchen** (1011 Lansdowne is planned to): set `kitchen: true`, add its EXPO profile and change `cookedBy` to itself. Every app follows from that one edit.
- **A season:** add an `open` window; correct the dates when they are confirmed.
- **Pause or retire:** set `status`. Never delete the record: saved recipes, receipts and history still name its key.

Edits go through a PR for now. `tests/sites_registry_gate.mjs` checks every rule above, including that no key ever used has disappeared (`tests/fixtures/site_keys_ever.json`). A "Sites" form on the HOUSE portal page is planned later (S1).

## Versioning

`_meta.schemaVersion` is `1`. A change to the fields or their meaning bumps it and updates every reader in the same change set (HOUSE rule). Readers check it and say so on screen when it is missing or newer than they understand.

## Readers

| App | Status |
| --- | --- |
| CODEX | First reader (refinement plan RF4, 2026-10-31): `_cxSites()` reads this file live, then its kept copy, then a built-in copy, in place of its 11 site-label maps. Old CODEX spellings (`bloor_shelter`) are aliases here. |
| HUB, DOOR, EXPO | Adopt in their own follow-ups, mapping their old codes through `aliases`. DOOR's typed resident counts give way to its live counts. |
