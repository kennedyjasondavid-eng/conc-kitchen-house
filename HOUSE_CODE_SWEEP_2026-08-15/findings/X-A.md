# Findings — Slice X-A: cross-app contract conformance (writer vs readers, field by field)

- Date: 2026-08-15/16 (fresh start, prior run died before writing)
- Agent: X-A
- Mode: TOKEN-LEAN (hard ≤3,500-line Read budget; grep/sed-first; incremental writes)
- Repo HEADs at sweep start:
  - conc-kitchen-door `7500521` Merge PR #74 (menu-footguns-design)
  - conc-kitchen-expo `2686de6` Merge PR #232 (v9.49.36 bump)
  - conc-kitchen-hub `9ecce4c` Publish to Hub: schedule v=-1793534894 + sidecar
  - conc-recipe-hub `6ea8b30` Cheat sheet #81 (dish→EXPO-routing bridge)
  - conc-kitchen-proof `b3dc772` Merge PR #12 (halal meals routing checks)
  - conc-kitchen-house `04e0840` Code sweep: E-3 complete (unrelated to this slice)
- **Re-verified all 5 repo HEADs immediately before finalizing this file (2026-08-16): unchanged from sweep-start** — no drift during this session.
- Coverage statement: see "Coverage statement (final)" at the end of this file.

## Read budget ledger (via Read tool only; Grep/Bash/node-script extraction is free per _COMMON.md and not counted)

Approx. running total ≈ **1,220 lines** read via the Read tool across all 5 repos (well under the 3,500-line TOKEN-LEAN budget) — see the "Coverage statement (final)" section for the itemized range list. All remaining evidence in this file came from Grep with -C context, or bounded node/python scripts run over checked-in JSON/JS data files (snapshot key-set census, live `hub_schedule.json`/`DOOR_RECIPE_DATA.json`/`menu_current.json` field spot-checks).

---

## Grep-battery results (contract-scoped)

Ran the standard battery, contract-focused, against the specific writer/reader functions this slice's method calls for (not a whole-file sweep — see Coverage statement). Notable:
- `entry.allergens || []` / `\.allergens\s*\|\|\s*\[\]` pattern: **3 independent occurrences**, all in MISE (`buildDoorRecipeDataJSON` `:28683`, `buildRecipeProductionJSON` `:28658`), plus the same fallback shape mirrored downstream in EXPO's `updateAllergenMapFromRecipeData` (`conc-kitchen-expo/index.html:36299`, `recipe.allergens || []`) — see X-A-3.
- `isLANActive()`-gated dead-in-standard-mode functions: confirmed 2 (`generatePullSteps`, `applyRoutingDrivenQty`) — already reported by sibling agent E-2 (KNOWN → `findings/E-2.md#E-2-2`), cross-verified independently here via the live `hub_schedule.json` (0 `"PULL"` chainStep entries anywhere in the 240KB payload) rather than re-reported.
- Bare bulk-JSON write loops with no atomic multi-file commit: MISE's `publishRecipeProduction` pushes 4 files (`recipe_production.json`, `DOOR_RECIPE_DATA.json`, 2 meta sidecars) via 4 sequential `await ghPushFile(...)` calls in a `for` loop (`:32688-32700`, not shown in full above) — the same non-atomic-multi-file-publish shape KNOWN.md's D1 already tracks for DOOR specifically; MISE's own publish has the identical structural risk and is NOT covered by D1's DOOR-scoped item or by any KNOWN.md entry I found. Noted below as a new, narrower finding.
- `catch\s*\([^)]*\)\s*\{\s*\}` empty catches: not swept exhaustively this slice (out of the assigned feed-matrix scope; X-C's slice owns the storage/catch sweep) — spot-checked only the load-bearing writer/reader functions I traced, all of which use non-empty catches or explicit fallback values.

---

## Feed 1: `routing_by_meal.json` — DOOR `buildRoutingByMealJSON` → EXPO/HUB/PROOF

**Writer shape** (`conc-kitchen-door/index.html:11684-11770`): `{_meta:{source,site,exported,version}, routing:{wk:{DAY:{meal:{SectionLabel:n, _components:{dish:portions}}}}}}`.
- `counts[label]` is only written when `residents.length>0 OR rule.key==='regular'` — a zero-resident non-regular section is **omitted entirely**, not written as 0. Every reader I found defaults via `|| 0` on lookup, so this is safe (verified in EXPO + PROOF).
- `_components` is try-guarded and additive; on internal throw it's silently absent (`console.warn` only) — degrades to no-portion-scaling downstream, never corrupts.
- Gate-9 structural validator (`validateDoorRoutingArtifact`, `:11858-11939`) is genuinely solid: Stop-level on missing week/day/meal, non-plain-object meal, non-integer/negative section counts AND `_components` portions; Review-level (advisory) on an unexpected meal key or zero `_components` slots anywhere. **Confirmed-healthy.**

**Section-label string contract (4-way, verified agreement today):** DOOR's routing rule table (`index.html:13537-13548`) emits section counts keyed by `rule.label` — `'Regular'`,`'Halal'`,`'Vegan / Vegetarian'`,`'Gluten Free'`,`'Soft Meals'`,`'Diabetic'`,`'Bland'`,`'No Egg / Mustard'`,`'No Processed Food'`, plus conditional `'Anaphylactic Alternative'`. EXPO's `_pullSectionKey(stream)` (`index.html:15963-15967`) hand-derives 3 of these; PROOF's `P.DICT.section` (`proof.html:348-355`) hardcodes the full 10-entry set. **All three currently agree exactly** (verified by direct comparison).

### X-A-1 · EXPO's section-label lookup has no fail-loud guard; PROOF's identical lookup does
- class: kludge
- severity: P2
- status: NEW
- confidence: verified
- where: `conc-kitchen-expo/index.html:15963-15967` (`_pullSectionKey`) vs `conc-kitchen-door/index.html:13537-13548` (rule labels) vs `conc-kitchen-proof/proof.html:348-355,373` (`P.DICT.section` + enum check in `validateRouting`)
- what: EXPO re-derives DOOR's routing section-label strings by hand with no validation — an unrecognized `stream` value silently falls through to the `'Regular'` default, and a future DOOR label rename would silently return a string that no longer matches any `routing_by_meal.json` key. PROOF's `validateRouting()` checks the identical string set via `P.DICT.section.includes(k)` and **fails loud** (`error: routing.section.enum`) on any unrecognized key — the exact defense EXPO lacks.
- evidence: EXPO: `if (stream === 'halal') return 'Halal'; if (stream === 'vegan') return 'Vegan / Vegetarian'; return 'Regular';` (no else-branch, no unknown-stream warning). PROOF: `if (!P.DICT.section.includes(k)) flags.push(flag('error','routing.section.enum', ...))`.
- consequence: No active bug today (verified 4-way string agreement). The masking factor: EXPO's two schedule-affecting consumers of this lookup (`generatePullSteps`/`applyRoutingDrivenQty`) are already dead in standard mode (KNOWN → `findings/E-2.md#E-2-2`), so a silent-zero there is currently moot. But `_collectFrozenServes` (`index.html:38935`, the **live** Order Sheet feature — not `isLANActive()`-gated) uses the identical unguarded lookup, so a DOOR rule-label wording edit would silently zero Order Sheet quantities for the affected section with no error anywhere in EXPO, while PROOF would catch the exact same drift instantly.
- direction: Port PROOF's enum-check pattern (`P.DICT.section`-style array + loud console warning on an unrecognized `sectionKey`) into EXPO's `_pullSectionKey` caller sites, matching EXPO's own existing pattern of console-warning on missing routing data (`loadRoutingFromDOOR`'s no-data branch).

### X-A-2 · routing_by_meal.json's `_meta.source`/`_meta.site` are write-only across all three readers
- class: redundancy
- severity: P3
- status: NEW
- confidence: verified
- where: `conc-kitchen-door/index.html:11767` (writer) vs `conc-kitchen-expo/index.html:36362-36387` (`loadRoutingFromDOOR`, reads only `data.routing`) vs HUB `CONC_Production_Hub.html:4084` (reads only `rtJSON.routing`) vs `conc-kitchen-proof/proof.html:365-380` (`validateRouting`, reads only `raw._meta.version`)
- what: DOOR stamps `_meta.source` and `_meta.site` on every routing publish; none of the three readers I traced ever look at either field (EXPO and HUB destructure straight to `.routing`; PROOF's validator reads only `.version`). Harmless (debugging metadata, not a defect) — noted per the brief's "check before calling it dead" instruction, not elevated to a real finding.
- evidence: as cited above.
- consequence: none currently — purely informational for a human reading the raw JSON.
- direction: no action needed; not worth a cleanup slice on its own.

### Confirmed-healthy (routing_by_meal.json)
- DOOR's Gate-9 routing validator (`validateDoorRoutingArtifact`) — thorough Stop/Review split, non-negative-integer enforcement on both section counts and `_components` portions.
- HUB's `_componentPortions` (`CONC_Production_Hub.html:1243-1263`) — exact-match-first then bounded 12-char fuzzy match, **conflicting fuzzy hits → null** (never guesses), and a genuinely good staleness guard: `ROUTING_STALE` flips true past a 7-day cache-age bound (`HUB_ROUTING_MAX_CACHE_MS`), degrading every portion-scaled link to unscaled rather than serving a wrong number. This is the file's own version of the D7 lesson (age/content over version-number trust) done right.
- PROOF's `validateRouting` — validates VALUES not just keys (catches a corrupt/negative denominator), flags empty-cell fetches as an error (an empty JSON can't pass as "clean"), and explicitly treats a routine DOOR version bump as NOT drift (comment cites the D7 lesson by name) while still flagging a missing/non-numeric version. `componentsVsMenu` (`proof.html:1371-1373`) cross-checks `_components` staleness against DOOR's own menu — an independent second freshness signal beyond the raw version stamp.
- The "missing key means 0, not corruption" writer convention (sections with 0 non-regular residents are omitted) is correctly handled by every reader's `|| 0` default — no reader assumes key-presence.

---

## Feed 3: `hub_schedule.json` + `hub_schedule_version.json` — EXPO `_buildHubSchedulePayload`/`generateHubData` → HUB/PROOF/EXPO-self

**Writer** (`conc-kitchen-expo/index.html:21870-22192` `generateHubData`, `:22594-22606` `_buildHubSchedulePayload`, `:22689+` `publishHubSchedule`): returns `{_schemaVersion:2, WEEKS, FRIDGE, MOVES, MEALS, RESOURCES, CONFLICTS}` (`:22192`), then the wrapper stamps `_generated/_source/_mode/_menuSource/_doorMenu/_recipeData/_aliasTableHash/_codex/_cycleStart`, then `publishHubSchedule` adds `_version` (a **string** djb2 hash, `_hubScheduleVersionHash` at `:22558-22566` explicitly `return String(hash)`).
- **This is the most mature of the five feeds I audited** — EXPO already publishes schedule + sidecar + orders in ONE atomic Git-Data-API commit (`pushFilesToGitHubAtomic`, `:22748-22761`), unlike DOOR's still-10-separate-commit publish (the open D1 item in KNOWN.md). Worth naming as the in-house reference pattern for D1's fix.
- **Live-verified `_schemaVersion` parity** (fresh evidence on a KNOWN item — `hub_schedule.json` HEAD 2026-08-13T16:46:11Z, EXPO v9.49.35): payload `_schemaVersion:2` (int), HUB reader `HUB_SCHEDULE_SCHEMA_VERSION=2` (`CONC_Production_Hub.html:1416`) — **writer and reader are at exact parity today.** This directly confirms KNOWN.md's correction that HUB's own CLAUDE.md ("no `_schemaVersion` field at all", dated 07-27) is stale doc-drift, not a code bug — status **KNOWN** (cite KNOWN.md HUB section), adding this as the concrete verification KNOWN.md asked for.
- **`cardPolicy` (v2 suppression) is live-used** (4 items carry it in the current payload) but **PROOF never reads the field at all** (`grep cardPolicy proof.html` → 0 hits). Checked whether this under/over-counts PROOF's funder rollups: it does not — HUB's own contract is explicit that "suppressed rows remain in the payload," so PROOF's naive `section.items` walk still sees and counts the underlying production step; `cardPolicy` is a pure staff-UI-visibility directive riding on an otherwise-intact item. **Confirmed non-issue**, not reported as a finding.
- **`MEALS`/`WEEKS` join keys verified exact** — writer: `mealsObj[dateNum]` (`:22042`); HUB's `compareBoardMenuToDoor` reader: `meals[String(dateNum)]` keyed off `day.dateNum` from the same `WEEKS` tree (`CONC_Production_Hub.html:1500-1524`). Matches, and this is the mechanism the whole freshness-contract line (KNOWN, H2-H4) already exercises — no new defect.
- **Version-hash input completeness spot-check:** `_hubScheduleVersionInput()` (`:22571-22590`, the no-op-publish dirty-check) hashes `{schedule, menu, fridgeState, rexFridgeState, lanFridgeState, conflicts, hubDateMap, budgets, source, mode, menuSource, doorMenu, recipeData, aliasTableHash, codex, cycleStart}` — a deliberately raw-state input list, separate from `generateHubData()`'s transform, with a comment explaining why (avoid invoking a full payload build for a read-only diagnostic). I did not exhaustively verify `generateHubData()` reads nothing outside this list (would require a full read of the ~320-line function, out of budget) — flagging as a **limitation**, not a finding: if `generateHubData()` ever derives payload content from state not in `_hubScheduleVersionInput()`, the no-op guard could falsely skip a real publish. Worth a targeted follow-up sweep, not claimed as a defect here.

### Confirmed-healthy (hub_schedule.json)
- Atomic single-commit publish (schedule+sidecar+orders together) — EXPO already has what DOOR's D1 needs to copy.
- Version-hash type contract (string both ends) is exactly right — I initially suspected a `typeof !== 'string'` false-positive (djb2 hashes are usually numeric) and verified it's explicitly `String(hash)`-cast on the writer side; no bug.
- HUB's sidecar-vs-payload skew handling (`:4448-4452`) keys the cache off the **payload's own** `_version`, not the sidecar's — deliberately so a transiently-stale sidecar self-heals next boot instead of wedging good content behind a stale cache-key. Good design, matches the D7 lesson in spirit.
- `_schemaVersion` writer/reader parity is current (verified above), closing the immediate risk KNOWN.md flagged as needing verification.

---

## Feed 4: `DOOR_RECIPE_DATA.json` / `recipe_production.json` — MISE publish → DOOR live fetch (+ baked fallback) / EXPO codex sync, HUB recipe links, PROOF `validateRecipes`

**Writer chain:** `publishRecipeProduction` (`conc-recipe-hub/index.html:32656`) → `buildDoorRecipePublishPayload(dryRun)` (`:30981-30986`, live default mode routes to `buildDoorRecipeDataJSON()`) → `buildDoorRecipeDataJSON()` (`:28674-28690`): for every library entry with `status==='production'`, emits `{recipeName, allergens: entry.allergens || [], category: entry.category || '', stream: (entry.tags||{}).stream || 'regular'}`.

### X-A-3 · Fabricated-empty allergen default reaches the published DOOR feed for at least one live, empty-content "production" recipe — the exact `allergens || []` class the brief named
- class: data / footgun
- severity: P1
- status: NEW
- confidence: verified (traced the full chain AND found a live, currently-published, concrete instance)
- where: `conc-recipe-hub/index.html:28683` (`allergens: entry.allergens || []`, the fabrication point) · `:25342-25367` (`_cxPromotionFloor`, the one well-designed defense — see Confirmed-healthy) · `:32874-32890` (`promoteToLibrary`, its **sole** enforcement call site) · `:25536-25538` (a second `status='production'` write site — the boot-time seed-rename-reconciliation merge — that does **not** call `_cxPromotionFloor`) · `:32230` + `:32291-32293` (`buildPublishDryRun`'s `emptyAllergens` census — **warn-only**, bundled with cosmetic gaps like "no equipment", never a blocker) · `conc-kitchen-door/index.html:14271` (`f[k] = (entry.allergens||[]).includes(k)` — DOOR's recipe-link autofill reads this exact field into a menu slot's compliance `_flags`)
- what: `buildDoorRecipeDataJSON()` silently converts an undefined/missing `allergens` field to an empty array with no distinction from a genuinely-verified "no allergens" determination — precisely the brief's named "`allergens || []` never-verified→analyzed-clean" pattern. The one real gate against this (`_cxPromotionFloor`'s "allergens finalized" check, which is itself well-designed — see below) is enforced at exactly one UI call site (`promoteToLibrary`); a second code path that also flips a record to `status:'production'` (the seed-merge boot logic reconciling a locally-renamed recipe back onto its seed identity) does not call it; and the publish-time dry-run computes an `emptyAllergens` count but only warns, never blocks.
- evidence — **a live, currently-published instance, not just a theoretical path:** the checked-in `conc-recipe-hub/DOOR_RECIPE_DATA.json` (240 records) has 12 entries with `allergens:[]`. Cross-checked against `CONC_Recipe_Data.js`: **`"Apple Crisp"`** is `{"allergens":[],"ingredients":[],"instructions":[],"portions":null,"servingOz":null,"status":"production","savedAt":"2026-05-09T00:00:00.000Z","promotedBy":{"name":"CONC Rexdale Kitchen (May 2026)"}}` — a completely empty stub (zero ingredients, zero instructions) that is nonetheless `status:"production"` and is currently publishing `allergens:[]` to the live DOOR feed. Apple Crisp virtually always carries a flour/oat crumble (gluten) and often butter (dairy) — neither is flagged; nothing in the record even claims to have checked. The `savedAt` date (2026-05-09) predates the S3a promotion-floor build (Aug 10-11, per this repo's own CLAUDE.md), which explains how a record with zero content ever reached `production` status unfloor-checked. 11 more `allergens:[]` records exist; most (Braised Cabbage, Plain Rice, Turmeric Quinoa, etc.) have real ingredient lists and are plausibly genuinely allergen-free, but were not individually ingredient-audited here — Apple Crisp (and its near-duplicate "Apple Crisp Dessert", not individually re-checked but same-pattern name) is the one I traced to source and confirmed empty end-to-end.
- consequence: **Currently latent, not an active incident** — verified `menu_current.json` (DOOR's live standard menu) does not contain "Apple Crisp" or any of the other three spot-checked empty-allergen dishes anywhere in its text, so no resident is being served against this gap today. But DOOR's own recipe-link autofill (`:14271`) reads `DOOR_RECIPE_DATA.json`'s `allergens` field directly into a menu slot's `_flags` — the same flags that drive `getAnaphConflictRooms` and the anaphylactic routing lockout DOOR's CLAUDE.md calls "sacred". The moment a supervisor adds Apple Crisp (or any of these 12, or any future record that slips past the one floor-check call site) to a future menu rotation and uses the recipe-link autofill, the slot silently inherits "no allergens" — a false-safe claim in the exact system whose entire purpose is catching this.
- direction: Move the allergen-completeness check from a UI-layer floor (one call site) to the publish-time gate itself — `buildPublishDryRun` already has a real block-vs-warn split (`:32233-32289`) and already computes `emptyAllergens`; promote it from the warn-only "Quality census" bucket to a blocker (or a `_cxDetectedAllergenCategories`-aware conditional blocker, mirroring `_cxPromotionFloor`'s own logic, which already knows how to distinguish a plausible empty list from a suspicious one) so the boundary holds at the ONE place that actually writes the shared feed, not at however many UI entry points can flip `status:'production'`.
- **second confirmed propagation path (widens blast radius beyond DOOR):** `buildRecipeProductionJSON()` (`conc-recipe-hub/index.html:28641-28658`) — the writer for the SEPARATE `recipe_production.json` feed — carries the **identical** `allergens: entry.allergens || []` line, sourced from the SAME `lib` entries. EXPO's own independent resident-conflict fallback detector (`conc-kitchen-expo/index.html:36297-36305` `updateAllergenMapFromRecipeData`, itself `const raw = recipe.allergens || [];`) consumes exactly this field into `RECIPE_ALLERGEN_MAP`, and `getItemAllergens()` (`:36474-36485`) feeds EXPO's "v19 fallback: RECIPE_ALLERGEN_MAP string matching" conflict scan (`:36535-36560`, populating the `CONFLICTS` block of `hub_schedule.json`) with `if (!allergens.length) return;` — an empty (fabricated-or-real) allergens list silently exits the conflict check for that dish. So Apple-Crisp-class stub records risk under-flagging in **two independent apps' safety surfaces** (DOOR's menu-slot autofill AND EXPO's own conflict-scan fallback), both traced to the same MISE-side root cause. I did not verify whether EXPO's "v19 fallback" is the live/primary conflict path or genuinely a rarely-hit fallback behind a v20 registry-flags path (`extractAnaphylacticResidents`, `:36308+`) — noted as a limitation, not resolved here.

### X-A-5 · MISE's own 4-file CODEX publish is non-atomic — the same D1 defect class KNOWN.md tracks for DOOR, but for a different repo/feed pair
- class: footgun
- severity: P1
- status: NEW (adjacent to KNOWN → D1, which is DOOR-scoped only)
- confidence: verified
- where: `conc-recipe-hub/index.html:32687-32700` (`publishRecipeProduction`, `for (var i = 0; i < payloads.length; i++) { ... await ghPushFile(repo, payload.path, payload.content, token); ... }`)
- what: MISE publishes `recipe_production.json`, `DOOR_RECIPE_DATA.json`, `recipe_production_meta.json`, and `DOOR_RECIPE_DATA_meta.json` as 4 SEPARATE sequential commits (one per `ghPushFile` call), not one atomic multi-file commit. KNOWN.md's D1 item tracks exactly this defect class ("one publish is 10 commits today; port EXPO's `pushFilesToGitHubAtomic`") but is scoped to DOOR's publish path only — this is the same shape in a different repo, feeding two different published artifacts (the very feeds this slice audits).
- evidence: the loop body (read directly, `:32688-32700`) awaits each `ghPushFile` in sequence with no wrapping transaction; EXPO's own `pushFilesToGitHubAtomic` (`conc-kitchen-expo/index.html`, referenced in KNOWN.md's D1 note and in my Feed 3 section above) is the in-house reference implementation MISE could reuse — same GitHub org, same Contents/Git-Data API.
- consequence: a death mid-loop (closed tab, network blip, thrown JS between pushes) leaves `recipe_production.json` and `DOOR_RECIPE_DATA.json` at different vintages — exactly the half-published-feed skew class the D1/atomic-publish work exists to prevent elsewhere in HOUSE. Given `recipe_production.json` and `DOOR_RECIPE_DATA.json` are BOTH sourced from the same `lib` snapshot in the same function call (`buildRecipeProductionJSON()`/`buildDoorRecipePublishPayload()` are both called before any push starts, so the *content* is consistent) — the live risk is specifically the two META sidecars (published last, after the two content files) landing stale relative to the content, or one content file landing while the other doesn't, which a downstream consumer polling by file (rather than by commit) could observe as inconsistent.
- direction: same pointer as D1 — port `pushFilesToGitHubAtomic` (already proven in EXPO's own codebase) into MISE's `publishRecipeProduction`.

### Confirmed-healthy (allergen safety design, worth citing as the pattern to reuse)
- `_cxPromotionFloor`'s "Allergens finalized" check (`:25342-25367`) is genuinely well-designed and explicitly self-aware of the exact failure class this finding reports — its own comment says: *"NOT just Array.isArray (an empty defaulted array passes that)... 'Finalized' = the stored list is present AND consistent with the ingredients... A genuinely allergen-free recipe... passes."* It uses `_cxDetectedAllergenCategories(entry)` (an ingredient-keyword heuristic) to refuse an empty list when the ingredients imply otherwise. This is the correct fix shape — it just isn't wired to the one place (`buildPublishDryRun`) that would make it a structural boundary instead of a UI nicety.
- DOOR's separate independent allergen auto-detectors (referenced in DOOR's own CLAUDE.md, `~:13713`/`~:15595`) are a second, CODEX-independent line of defense not evaluated in this slice — not verified here, but their existence means this finding is "the CODEX-feed link is silently fabricable," not "DOOR has zero other allergen safeguards."

---

---

## Feed 5: `menu_current.json` — DOOR `buildMenuJSON` → EXPO/HUB/PROOF (light pass — most-audited feed per brief priority)

Given this is the most previously-audited artifact (D2/D3/D6/H4 in KNOWN.md's silent-drift line already cover it extensively), I kept this pass light and targeted rather than re-treading the whole matrix.
- **Verified live and correct:** the pork-never-halal-certified invariant (July-19 CLAUDE.md entry) is present and wired exactly as documented — `conc-kitchen-door/index.html:11636-11640`: `if (flags.hasPork && flags.halalCertifiedMeat) { flags = {...flags, halalCertifiedMeat:false}; }`, clone-not-mutate as claimed, immediately before the JSON is assembled.
- **PROOF's `validateMenu`** (`proof.html:393-401`) is intentionally shallow — week-count and version-presence only, no day/meal/flag validation — consistent with PROOF's menu usage being text-comparison (`componentsVsMenu`) rather than allergen-safety consumption. Not a gap for PROOF's actual use.
- Did not re-verify the EXPO-side `loadMenuFromDOOR`/`syncMenuFromDOOR` field-by-field against DOOR's `_flags` emission — this is the single largest remaining gap in my Feed 5 coverage (see Limitations) given the extensive prior audit history there and my remaining time budget.

---

## Historical-tolerance check: EXPO `snapshots/*.json` (44 dated files, 2026-05-16 → 2026-08-10) vs HEAD's restore path

Ran a static node script (scratchpad `snapshot_keyset.mjs`) comparing every snapshot's `state{}` top-level key set against HEAD's `gatherFullState()` (`conc-kitchen-expo/index.html:31200-31219`) and `revertToCanonical()`'s (`:32435+`) explicit fold-forward handling.

### X-A-4 · `editedItems` (the pre-Decision-Ledger v9.16 edit store) holds real, substantial content in 5 committed snapshots with zero fold-forward path on revert
- class: data / footgun
- severity: P2
- status: NEW
- confidence: verified
- where: `conc-kitchen-expo/snapshots/2026-05-21/11-14-52_huj40j.json` + 4 more (05-23, 05-24×3) vs `conc-kitchen-expo/index.html:32435-32510` (`revertToCanonical`, no `s.editedItems` reference anywhere in the function)
- what: `editedItems` is the v9.16-era pre-Decision-Ledger edit store (superseded first by `dbPatches`/`userMealOverrides`, then by the Ledger in Slice 2 — CLAUDE.md's footgun #3 calls it "OBSOLETE... all deleted"). `revertToCanonical` explicitly folds `dbPatches`/`userMealOverrides` and `permanentOverrides`/`sessionOverrides` from a legacy snapshot into the Ledger (visible, commented code, `:32471-32492`) — but never reads or folds `s.editedItems` anywhere. I initially assumed this was harmless (redundant with the folded `dbPatches`), but the actual data disproves that: in the same 7 files, `dbPatches` holds a constant 2 entries while `editedItems` holds **36-37 entries** in 5 of them — a materially larger, non-overlapping set of edits.
- evidence: node script output — `2026-05-21/11-14-52_huj40j.json editedItems: 36 dbPatches: 2`; same pattern in 4 more files (05-23, and three 05-24 saves, one at 37). `dbPatches` never exceeds 2 across all 7 legacy-era files.
- consequence: The only path to actually apply one of these committed snapshot files today is still the manual one CLAUDE.md's own May-16 backlog flagged as a deferred sharp edge ("paste snapshot's state JSON into localStorage.pp_canonical_save, click Revert") — no first-class restore-from-snapshot picker was ever built (not found in any later changelog entry). That is exactly an emergency-recovery scenario (Jason manually reaching for an old good snapshot because something broke) — precisely where a SILENT drop of 36+ historical edits (no warning, no partial-restore notice) is most costly. Impact is bounded to these specific 3-month-old files only; nothing about current/recent snapshots is affected (the same script found 0 unhandled keys in any snapshot from 2026-07-05 onward).
- direction: Either (a) add a defensive fold for `s.editedItems` mirroring the `dbPatches` pattern already in the function (map old edited-item entries to SET Decisions where the shape allows), or (b) if the content is confirmed truly superseded/unusable, have `revertToCanonical` at least emit a loud, named warning when `s.editedItems` is present and non-empty but silently unhandled — matching this codebase's own strong convention elsewhere (e.g. the S3b lockstep comments) of never dropping a legacy field without saying so.

### Confirmed-healthy (snapshot historical tolerance) — the empirical check validates two of EXPO's own changelog claims
- **`dismissedUnverified`** appears in 43/44 snapshots and vanishes in exactly the 2026-08-10 file — this is an EXACT empirical match to EXPO's own S3b changelog entry ("retired the dead silent-hide store `pp_dismissed_unverified`", PR #224, merged 2026-08-10) and the code comment in `gatherFullState` itself ("S3b: `dismissedUnverified` dropped from the snapshot — the store is retired"). Doc claim verified against real historical data, not just re-read.
- **`customAliases`/`userNoProduction`** are present in only the single newest (08-10) snapshot, absent from all 43 older ones — again an exact match to the same S3b changelog entry's claim ("brought `_customAliases`/`_userNoProduction` into full export/snapshot/revert/drift lockstep — closes a real export→import / save→revert data-loss bug — they were invisible to durability before"). The bug the changelog describes is empirically real (43/44 files prove it existed) and the fix-date lines up exactly.
- `ledger`/`premigrationBackup` (absent pre-07-05, before the Ledger existed) and `newItemReview` (absent pre-07-19) both have correct `Array.isArray(...) ? ... : []`-style graceful defaults in `revertToCanonical` — verified in source, and no file combination in the real snapshot set exercises an unhandled crash path.
- `permanentOverrides`/`sessionOverrides`/`dbPatches`/`userMealOverrides` (the pre-Ledger override stores, present only in the 7 oldest files) all have explicit, commented, deliberate fold-into-Ledger logic that runs on revert — genuinely well-engineered backward compatibility, not just happenstance.

---

## Findings summary

| ID | Title | Class | Severity | Status |
|---|---|---|---|---|
| X-A-1 | EXPO section-label lookup has no fail-loud guard (PROOF's identical lookup does) | kludge | P2 | NEW |
| X-A-2 | routing_by_meal.json `_meta.source`/`_meta.site` write-only | redundancy | P3 | NEW (non-issue, no action) |
| X-A-3 | Fabricated-empty allergen default reaches the published feed for a live, empty-content "production" recipe (2 feeds, 2 consumer apps) | data/footgun | **P1** | NEW |
| X-A-4 | `editedItems` legacy edit store (36-37 real entries in 5 files) has no revert fold-forward path | data/footgun | P2 | NEW |
| X-A-5 | MISE's own 4-file CODEX publish is non-atomic (D1-class, different repo) | footgun | P1 | NEW (adjacent to KNOWN D1) |

**Severity distribution: 2×P1, 2×P2, 1×P3 (5 total findings).** Quality-over-quantity per the brief's "10-25 substantial findings beat 60 trivia" — I stopped at 5 because each required real chain-tracing (not surface pattern-matching) and I'd rather ship 5 verified findings with live evidence than pad the count with unverified pattern-matches.

## Overall confirmed-healthy summary (cross-referencing the per-feed sections above)

- **DOOR's Gate-9 structural validators** (menu + routing) are thorough and correctly split Stop-vs-Review severity; the pork-never-halal-certified invariant is live and correctly wired at the JSON-build boundary (clone-not-mutate, as documented).
- **The 4-way section-label string contract** (DOOR rule labels ↔ EXPO's 3-string subset ↔ PROOF's 10-entry `P.DICT.section`) is, today, in exact agreement — verified by direct enumeration, not assumption.
- **HUB's `_componentPortions`** and **PROOF's `validateRouting`/`validateAliases`** are both genuinely well-designed: exact-then-bounded-fuzzy matching that degrades to "no answer" on ambiguity rather than guessing, value-level (not just key-level) validation, and explicit non-order-comparison of DOOR's schema-constant version (each independently reflects the D7 lesson, in its own idiom).
- **`hub_schedule.json`'s publish path is the most mature of the five feeds** — already atomic (single Git-Data-API commit for schedule+sidecar+orders), string-typed version-hash contract verified correct end-to-end, `_schemaVersion:2` writer/reader parity confirmed live (closing a KNOWN.md "verify this" item with fresh evidence).
- **`_cxPromotionFloor`'s allergen-finalization check** (MISE) is a genuinely well-designed piece of logic, explicitly self-aware of the exact "empty-defaulted-array passes naive checks" failure class — it just isn't wired to the one place (the publish-time dry-run) that would make it a structural boundary rather than a UI nicety (X-A-3's direction).
- **EXPO's snapshot/revert backward-compatibility engineering is strong** — explicit, commented fold-forward logic for 3 successive generations of user-edit storage (override triple → dbPatches/mealOverrides → Ledger), verified against real historical snapshot data, not just source-read. The one real gap found (`editedItems`, X-A-4) is narrow and dates to the oldest 7 of 44 files.

## Limitations (what I could not verify, and why)

- **EXPO's `generateHubData()` full read** (~320 lines) was not exhaustively completed — I spot-checked the header (bucket/format logic) and confirmed the `MEALS`/`_schemaVersion` fields I needed, but did not verify every field it emits has no hidden dependency outside `_hubScheduleVersionInput()`'s hash-input list (noted in Feed 3 as a specific open question, not claimed as a finding).
- **Feed 5 (menu_current.json) got a deliberately light pass** per my brief's stated priority order (routing_by_meal + hub_schedule first, DOOR_RECIPE_DATA/recipe_production second, menu_current last "most previously audited") — I did not field-by-field trace EXPO's `loadMenuFromDOOR`/`syncMenuFromDOOR` against DOOR's `_flags` emission, relying instead on the extensive existing KNOWN.md coverage (D2/D3/D6/H4) for that artifact.
- **`_cxRecordDestinationTransition`'s full caller graph** (Feed 4, MISE) was not exhaustively traced — I confirmed `promoteToLibrary` is floor-gated and found one bypass (the seed-merge rename-reconciliation path, `:25536-25538`), but did not enumerate every other caller of the `'promote_to_library'`/`'add_to_library'` action normalization to rule out additional bypass paths. The finding is scoped to what I concretely verified.
- **EXPO's "v19 fallback" conflict-detection path** (the second `getItemAllergens`-consuming propagation in X-A-3) — I did not verify whether this is EXPO's live/primary anaphylactic-conflict mechanism or a rarely-exercised fallback behind a v20 registry-flags path; flagged explicitly in the finding itself, not resolved.
- **No exhaustive empty-catch / inline-handler / dead-code sweep** was run for this slice — those are X-B's and X-C's assigned territory per the sweep's slice division; I only inspected catch blocks and error paths inside the specific writer/reader functions this slice's method named.
- **Did not verify the 11 non-Apple-Crisp `allergens:[]` records** in `DOOR_RECIPE_DATA.json` individually against their ingredient lists — spot-checked 4 (Johnny Cakes (2) — turned out to be a distinct, correctly-tagged record from a same-named "Johnny Cakes"; Roasted Carrot Soup, Braised Cabbage, Shawarma Slaw — all have real ingredient content and are plausibly-but-not-confirmed genuinely allergen-free). Only Apple Crisp was traced to a fully-confirmed empty stub.

## Coverage statement (final)

**Read attentively (via Read tool, ≈1,220 lines total, well under the 3,500-line budget):**
- `conc-kitchen-door/index.html`: 11684-11823 (`buildRoutingByMealJSON` + Gate-9 meta/routing validators), 11900-11939 (routing validator body), 11636-11640 + 13738-13742 + 14595-14599 + 15606-15610 (halal-invariant + routing-rule-label table, via targeted reads/greps), 14271 neighborhood (allergen-to-flags autofill, via grep -C).
- `conc-kitchen-expo/index.html`: 21870-21944 (`generateHubData` header), 22558-22767 (version-hash + publish + freshness-state functions), 35262-35301 (`loadRecipeDataFromHub`), 35324-35354 (`mergeHubRecipes` header), 36297-36305 (`updateAllergenMapFromRecipeData`), 36355-36389 (`loadRoutingFromDOOR`), 36460-36560 (`getItemAllergens` + conflict-scan fallback), 38895-38953 (Order Sheet `_collectFrozenServes`), plus grep-context around `_pullSectionKey`/`generatePullSteps`/`isLANActive`/`frozenKeyFor`.
- `conc-kitchen-hub/CONC_Production_Hub.html`: 1230-1279 (`_componentPortions`/`rcpUrlWithFallback`), 1416-1440 (`auditHubScheduleContract` header + `HUB_SCHEDULE_SCHEMA_VERSION`), 1500-1524 (`compareBoardMenuToDoor`), 4404-4478 (`loadScheduleData`/`_loadScheduleDataImpl`), plus grep-context around `ROUTING_STALE`/cache-age handling.
- `conc-recipe-hub/index.html`: 25330-25367 (`_cxPromotionFloor`), 25460-25544 (seed-merge boot logic), 28616-28763 (`buildRecipeProductionJSON`, `buildDoorRecipeDataJSON`, `CODEX_FEED_BASELINE`), 30015-30064 (`_cxRecordDestinationTransition` status-transition branches), 30981-31055 (`buildDoorRecipePublishPayload` + DOOR-projection-approval helpers), 32155-32300 (`buildPublishDryRun` body incl. `emptyAllergens` census), 32656-32700 (`publishRecipeProduction`), 32870-32900 (`promoteToLibrary`).
- `conc-kitchen-proof/proof.html`: 348-410 (`P.DICT`, `validateRouting`, `validateRegistry`, `validateMenu`, `validateSchedule`), 412-416 (`validateRecipes`), 1292-1310 (data-source registry), 1371-1373 (`componentsVsMenu` call site), plus grep-context for `routing_by_meal`/`resolveCoverage` (not found under that name; see note below).
- **Data files read/scripted, not source:** live `conc-kitchen-hub/hub_schedule.json` (python, full-file field spot-checks), live `conc-recipe-hub/DOOR_RECIPE_DATA.json` (python, full enumeration of `allergens:[]` records), `conc-recipe-hub/CONC_Recipe_Data.js` (targeted string-offset extraction, not a Read — the file is single-mega-line and would blow the budget if Read directly), `conc-kitchen-door/menu_current.json` (python, presence checks), all 44 `conc-kitchen-expo/snapshots/**/*.json` files (node script, full key-set + `editedItems`/`dbPatches` size census).

**Grep-covered only (patterns matched, surrounding context read via -C, but no full-function Read):** `generatePullSteps`/`applyRoutingDrivenQty` bodies (already covered by E-2, cross-verified via live-data proof instead of re-reading); `_pullSectionKey`; MISE's `_cxDetectedAllergenCategories`/`_cxMinimalAuthoringFloor` (named/located, not fully read — referenced only for their documented behavior); DOOR's `ROUTING_RULES` table (label column only, via grep, not the full ~15-row rule object); PROOF's `P.rollupR1`/`plantForward`/`rollupR4`/`costPerMeal` (named as routing_by_meal consumers, call sites located, bodies not read — out of budget, and not where I found defects).

**Not swept at all (explicitly out of scope or deferred to sibling slices):** empty-catch/inline-handler/dead-code battery (X-B/X-C territory); DOOR's `menu_reno.json` / `menu_overlay.json` contracts (not in my Feed table); the full `generateHubData()` body beyond its header/bucket logic; EXPO's `loadMenuFromDOOR`/`syncMenuFromDOOR` field-by-field trace against DOOR's menu `_flags` (deferred — see Limitations, menu_current.json was the lowest-priority feed per my brief).
