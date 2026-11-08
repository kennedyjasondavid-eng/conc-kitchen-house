# HOUSE standing rulings: an index

**An index, not an owner.** One line per standing ruling and a link to where it was made and is kept. Each ruling's words, reasons and status stay in its owning doc; this file points there and never restates more than a line. Started 2026-11-08 by call 18 of the in-app plan (Jason: "follow your leans on calls 15 to 18"): the plan's first draft broke three rulings that lived only in archived plans.

**Keep it current:** when a ruling is made, changed or retired, add or edit its line here in the same change set as its owning doc (HOUSE doc governance: the DECISION layer). A ruling retired by a later one keeps its line, marked with what replaced it.

Repository paths are on GitHub (`kennedyjasondavid-eng/<repo>`, `main`). `E` = conc-kitchen-expo, `C` = conc-recipe-hub (CODEX), `D` = conc-kitchen-door, `H` = conc-kitchen-house (this repo).

## Recipes, flow and food facts

| Ruling | Date | One line | Owner |
|---|---|---|---|
| F1 | 2026-08-23 (kept 2026-11-08, call 10) | How a dish travels between kitchens (site, chain type, packaging, hold, van) is EXPO's; only food facts (minutes, equipment, portions) may move to CODEX. | [E `docs/archive/EXPO_PRODUCTION_ARCHETYPE_ACTION_PLAN_2026-08-23.md`](https://github.com/kennedyjasondavid-eng/conc-kitchen-expo/blob/main/docs/archive/EXPO_PRODUCTION_ARCHETYPE_ACTION_PLAN_2026-08-23.md) (F1) |
| F2 | 2026-08-23 (kept 2026-11-08, call 11) | Six site-agnostic base shapes plus dials; new engine shapes stay architect-controlled. | Same plan (F2) |
| Jun 10 | 2026-06-10 (kept 2026-11-08, call 12) | An empty CODEX value means "CODEX doesn't know"; it never overwrites an EXPO value. | E `index.html`, the comment in `_mergeOneHubRecipe`; restated as a rule in the in-app plan §1 call 12 |
| J5 | 2026-10-13 | A saved starting point never carries another dish's max hold. | [E `docs/archive/EXPO_JOB_EDIT_STREAMLINE_ACTION_PLAN_2026-10-13.md`](https://github.com/kennedyjasondavid-eng/conc-kitchen-expo/blob/main/docs/archive/EXPO_JOB_EDIT_STREAMLINE_ACTION_PLAN_2026-10-13.md) (J5 / R4) |
| RF7a | 2026-10-31 (CODEX call 5) | CODEX's in-app feed publisher is deleted on purpose; the sealed feed changes only by a reviewed data edition. (Reading CODEX's shared Library is a different path and does not reverse it.) | [C `docs/plans/CODEX_REFINEMENT_ACTION_PLAN_2026-10-31.md`](https://github.com/kennedyjasondavid-eng/conc-recipe-hub/blob/main/docs/plans/CODEX_REFINEMENT_ACTION_PLAN_2026-10-31.md) |
| EXPO-1 | 2026-10-31 | A bagged dish's 7 days is a soft line; what the dish keeps is the stop. | Same CODEX plan (EXPO-1); EXPO #527 |
| EXPO-2 | 2026-11-01 | Vac-bagged food has one 10-day use-by everywhere, and it is the hard stop. | Same CODEX plan; EXPO #540 ([E history](https://github.com/kennedyjasondavid-eng/conc-kitchen-expo/blob/main/docs/archive/EXPO_CLAUDE_MD_HISTORY_2026-11.md)) |
| Staff call 17 | 2026-10-31 | CODEX owns the food-safety holds; EXPO shows them read-only and keeps no copy. | [E `EXPO_STAFF_ROLLOUT_ACTION_PLAN_2026-10-31.md`](https://github.com/kennedyjasondavid-eng/conc-kitchen-expo/blob/main/EXPO_STAFF_ROLLOUT_ACTION_PLAN_2026-10-31.md) §1 |
| Staff call 15 | 2026-10-31 | Each computer has a home kitchen; served sites come from the HOUSE registry's "cooked by". It sets defaults only, never permissions. | Same plan §1 |
| Staff call 7 | 2026-10-31 | Anyone with a key may change budgets and a dish's stream, with who and when and Undo. | Same plan §1 |

## Sites and data seams

| Ruling | Date | One line | Owner |
|---|---|---|---|
| Site registry | 2026-10-31 | One `sites.json` in HOUSE, read by every app; counts stay live in DOOR, equipment and staff in EXPO. | [H `HOUSE_STATUS_LEDGER.md`](HOUSE_STATUS_LEDGER.md) (Open cross-app lines); contract [`SITES.md`](SITES.md) |
| Cross-repo contract | 2026-07 (silent-drift plan §X2) | A fail-closed check about another app's data ships with that app's change, or fails loud, never into a silent fallback. | [E `CLAUDE.md`](https://github.com/kennedyjasondavid-eng/conc-kitchen-expo/blob/main/CLAUDE.md) (Rules) |
| No Second Home | 2026-08-31 | A fact has one home, owned by what it's about; every copy that can disagree is a second home. | [H `INSIGHTS.md`](INSIGHTS.md) |
| Silent when it works, loud when it breaks | 2026-11-07 | Three alarm levels: food safety (red, on screen), operations (quiet line plus a note to Jason), plumbing (log only). | [H `HOUSE_STATUS_LEDGER.md`](HOUSE_STATUS_LEDGER.md) (Operating rules) |
| Checks support, never obstruct | 2026-11-07 | Three kinds of check only (journeys, seam contracts, tricky logic); each names the failure it prevents; never read live data. | Same (Operating rules) |
| Test edits reflect kitchen flow | 2026-09-20 | A gate is corrected only when it misdescribes real kitchen flow, never to clear CI. Refined by in-app call 15 (below). | Jason's working rule; in-app plan §1 call 15 |

## The in-app plan (2026-11-08, all on the leans)

Owner of all 18: [E `EXPO_IN_APP_ACTION_PLAN_2026-11-08.md`](https://github.com/kennedyjasondavid-eng/conc-kitchen-expo/blob/main/EXPO_IN_APP_ACTION_PLAN_2026-11-08.md) §1.

| Call | One line |
|---|---|
| 1 | Guards before any new screen. |
| 2 | A rule about one dish is a dial on that dish; kitchen-wide numbers go on a list under Settings, Kitchen, shared at Publish. |
| 3 | Any supervisor with a key may edit kitchen rules, with who, when and Undo; holds excluded. |
| 4 | Rules across dishes prefer by default; refuse only for food safety; Review says when one gave way. |
| 5 | Retire EXPO's Recipe DB editor into Job Edit's "every time". |
| 6 | EXPO reads food facts from CODEX's shared Library, by DOOR's slot recipe ID (a proposal to CODEX). |
| 7 | Until 6 lands, EXPO stays the working home for recipe facts, with `_curated` shown per field. |
| 8 | Built-in name links become visible and retirable, dish by dish as DOOR covers them. |
| 9 | A weekly real DOOR-plus-CODEX fixture in the required check. |
| 10 | Keep F1. |
| 11 | Keep F2. |
| 12 | Keep Jun 10. |
| 13 | DOOR's allergen and plate rules: Jason and named leads only. |
| 14 | CODEX holds stay in its data edition. |
| 15 | Retire a gate instead of re-pinning it when invariants plus `ux_diff` cover it, with a dated note. |
| 16 | Count kitchen-change PRs monthly; a kitchen change never needs a PR. |
| 17 | An EXPO opened offline says so on the board. |
| 18 | This index. |

Also standing from the same plan: who reads what from whom (DOOR owns which recipe a dish is, CODEX owns food facts, EXPO owns how a dish travels; nothing relayed); no gate counts recipes; one EXPO writer at a time; no rule language in K3. All in the plan's §2 and §3.
