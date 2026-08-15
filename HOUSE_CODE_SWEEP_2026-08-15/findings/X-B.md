# Findings — Slice X-B: publish paths end-to-end (atomicity, failure modes, caching)

- Date: 2026-08-15 (relaunch wave 1, post-outage)
- Agent: X-B
- Repo HEADs at sweep time:
  - conc-kitchen-door `7500521` Merge PR #74 (menu-footguns-design)
  - conc-kitchen-expo `2686de6` Merge PR #232 (v9.49.36 bump)
  - conc-kitchen-hub `9ecce4c` Publish to Hub: schedule v=-1793534894 + sidecar
  - conc-recipe-hub `6ea8b30` Cheat sheet #81
  - conc-kitchen-proof `b3dc772` Merge PR #12
  - conc-kitchen-house `e992224` sweep scaffolding
- Coverage statement: IN PROGRESS — will be finalized at end of run.
- **RESUME (wave 2):** continued from the interrupted run above. DOOR/EXPO sections (X-B-1..7) are carried over unchanged. Added below: HUB publish mechanism + finding, MISE publish mechanism + finding, and the three cross-cutting audits (version order-compares, cache-busting, token handling).

## Grep-battery results (publish-path scoped)

- DOOR: `publishAndSync(` call sites = **21** (registry edits, compliance ops, menu edits, intake commits, plating generate…). `sidePublish(` call sites = **8** (menu_overlay, change_log ×3, learned_nr, special_meals, meal_swaps + boot change-log push-back). Every user act that touches state fires a full 10-file publish wave.
- DOOR GitHub endpoints: contents-API (auth) at `:11488` (validateToken, **with `cache:'no-store'`**), `:12143` (`_ghPushFileNow` SHA GET + PUT, **no no-store**), `:12204` (`preMergeOverlayWithCloud` GET, **no no-store**); raw.githubusercontent reads all carry `?_=Date.now()` busters (`:10067`, `:10175`, `:19172`, `:19260`, `:19284`).
- (appended per-repo below as gathered)

## DOOR publish mechanism map (for the report; supports findings X-B-1..5)

**Trigger census:** `publishAndSync(context)` = auto path (21 sites — every registry/compliance/menu/intake mutation). Manual = Settings "Publish" → `publishToGitHub(true)`. Side-publishes (8 sites) push single files outside the wave. Auto-publish can be disabled via the `gh_auto_publish` checkbox (`:12248`).

**Serialization:** two chained-promise queues — `_publishQueue` serializes whole publishes; `_ghWriteQueue` serializes every individual file write (side-publishes included). Within one tab nothing interleaves. Cross-tab: nothing serializes; 409-retry is the only defense.

**Wave order (`_doPublishToGitHub` :12339–:12351), one commit per file:**
1. menu_current.json → 2. registry_summary.json → 3. routing_by_meal.json → 4. door_state.json → 5. menu_overlay.json → 6. custom_tag_rules.json → 7. learned_nr.json → 8. meal_swaps.json → 9. special_meals.json → 10. recent_log.json.
**Partial-state window on death at file k:** files 1..k live at new vintage, k+1..10 old. Worst window = death at k∈{1,2}: **new menu + old routing** live simultaneously (menu lands FIRST, routing 3rd) — the exact skew class HUB's `menu-content-drift` check and EXPO's D0.1 alignment gate exist to catch downstream. Even a fully successful wave exposes this skew transiently (≈1 RTT/file) plus per-file independent Pages-CDN expiry (~10 min), so consumers can read mixed vintages for minutes after every publish. Preflight (Gate-9) runs BEFORE file 1, so a structural Stop blocks the whole wave — good.

**Failure UX:** thrown push → catch `:12399` → status "Failed: msg" red + toast (manual) / `publishAndSync` red sync-bar "Saved locally — not published" (auto). `{skipped}` results (not_hydrated / empty_clobber / size_regression) → "Partial publish — N/10 blocked" red. Honest and loud — but a mid-wave throw reports only "Failed", not *which files already landed* (see X-B-1 evidence).

## Findings

### X-B-1 · DOOR publish: same-file double-writes + cache-poisoned SHA GETs make the 409 retry structurally ineffective
- class: footgun
- severity: P1
- status: KNOWN → KNOWN.md §Live-incident (D1 evidence); NEW mechanism detail below
- confidence: verified (traced at HEAD 7500521)
- where: conc-kitchen-door/index.html:12150 (SHA GET), :12176–12179 (409 retry re-GET), :12187 (PUT result discarded), :11489 (in-house `cache:'no-store'` seam), :14042 + :12343 (menu_overlay double-write), :17601+:12348 (meal_swaps), :17589+:12349 (special_meals), :9276+:12347 (learned_nr)
- what: Four artifacts (menu_overlay, meal_swaps, special_meals, learned_nr) have BOTH a `sidePublish` caller and a slot in the 10-file wave, so one menu-edit Save writes menu_overlay.json **twice within seconds** (sidePublish at :14042, then wave slot 5 at :12343) — ~12 commits per Save. GitHub contents-API GETs return `Cache-Control: private, max-age=60`; both the initial SHA GET (:12150) and the 409-retry re-GET (:12178) are plain `fetch(url,{headers})` with no `cache:'no-store'` and no buster, so after the first write bumps the SHA, the second write's SHA GET — and crucially its *retry* re-GET — can both be served the pre-write cached response. The retry then re-PUTs the same stale SHA and fails loudly. Queue serialization (`_ghWriteQueue`) cannot help because the poison is the HTTP cache, not interleaving.
- evidence: `:12150 try { const ex=await fetch(url,{headers}); …sha=j.sha…}` and `:12178` identical fetch in the 409 branch — vs `:11489 fetch(url, { headers: …, cache: 'no-store' })` in `validateToken`, 55 lines above in the same object. `:12187 return res.json();` — the PUT response carries the fresh `content.sha`; no caller stores it. Live incident 2026-08-15 (KNOWN.md §Live-incident): 409s landed on reload.
- consequence: The cloud feed stalls loudly mid-wave whenever two writes of one file happen <60s apart — which the app's own architecture *guarantees* on every menu-edit save. Operator sees "Failed"; files already pushed (menu first, routing 3rd) stay live at mixed vintage; nothing names which files landed.
- direction: KNOWN D1 (atomic port) is the ruled fix. Independent micro-hardening using existing in-house seams: (a) `cache:'no-store'` on both SHA GETs (the `validateToken` pattern at :11489); (b) keep a per-path in-memory SHA from each PUT response (the `_ghHydrated` module-state pattern) so within-tab sequences never re-GET at all; (c) drop the sidePublish when a full wave is already queued behind it (the `_publishQueue` state is inspectable).

### X-B-2 · DOOR `PublishAuth.getRepo()` reads the live DOM field for background publishes — asymmetric with the token guard
- class: footgun
- severity: P2
- status: NEW
- confidence: verified
- where: conc-kitchen-door/index.html:11344–11346, :11400–11415
- what: `getRepo()` prefers the Settings input's live value over the saved setting for ALL credential paths, including `_getSavedCredentials()` used by background/auto/side publishes. The token deliberately does the opposite — `getCredentialsForManualPublish` warns on a typed-unsaved token, and the comment (:11409–11412) explains a field value "must never block the automatic cloud feed". A typed-but-unsaved repo value *redirects* the automatic cloud feed: every auto-publish while the operator is mid-edit in Settings targets the typed repo string.
- evidence: `getRepo() { return ((document.getElementById('gh-repo') || {}).value || appSettings['gh-repo'] || …).trim(); }` — called from `_getSavedCredentials` (:11401), which backgrounds use.
- consequence: Mid-typing, auto-publishes 404 loudly against a partial repo name ("Saved locally — not published") — confusing but recoverable; worst case a *valid* other repo the token can write lands the whole artifact wave in the wrong repo with a green "Synced ✓". Same-class trap the token guard was explicitly built to avoid.
- direction: Apply the token's own asymmetry (the in-house seam at :11408–11415): background paths read `appSettings['gh-repo']` only; the typed value participates in manual publish + Test & Save.

### X-B-3 · DOOR hydration "gate" is a 5s timer, and its signal fetches are duplicates of the real merge fetches
- class: kludge
- severity: P2
- status: NEW
- confidence: verified
- where: conc-kitchen-door/index.html:19204–19209, :19176 vs :19206
- what: `_ghHydrated` — the anti-clobber gate consulted by every publish write (:12145) — flips true when a `Promise.allSettled` of two *fresh, duplicate* fetches settles, or unconditionally after `setTimeout(…, 5000)`. The allSettled fetches are separate requests from the ones whose `.then` handlers actually merge cloud data into localStorage (menu_overlay fetched at :19176 for merging and again at :19206 purely as a timing signal), so the gate can open before the merge handlers have run; offline, the 5s timer opens it with nothing hydrated at all.
- evidence: `Promise.allSettled([fetch(base+'menu_overlay.json'+bust)…, fetch(base+'door_state.json'+bust)…]).then(()=>{ _ghHydrated = true; }); setTimeout(()=>{ _ghHydrated = true; }, 5000);`
- consequence: "Hydrated" does not mean hydrated; the real anti-clobber protection is only the empty-clobber + <30% size heuristics in `_ghPushFileNow`. A fast-typing operator on a fresh device whose boot fetches hang can publish a nearly-empty-but-not-empty overlay over cloud state 5s after boot (the 30% heuristic needs remote >1024b to fire).
- direction: Flip `_ghHydrated` inside the *merge* handlers' completion (chain off the fetch promises that already exist at :19176/:19190), keeping the 5s timer as the offline escape hatch; that removes the duplicate fetches too.

### X-B-4 · DOOR `preMergeOverlayWithCloud` treats 404 as auth-shaped and aborts the whole publish — fresh-repo bootstrap dead-end
- class: footgun
- severity: P3 (dormant in this deployment; bites any second-site/fresh-repo setup)
- status: NEW
- confidence: verified (code path traced; dormancy verified — menu_overlay.json exists in repo)
- where: conc-kitchen-door/index.html:12206–12208, :12219–12223, :11472
- what: The pre-merge GET throws on 404 (`classifyGitHubError(404)` → "GitHub could not find this repo/file…"), and the catch rethrows any message matching `/token|access|repo|find|refused|rejected/i` — "could not find" matches `find`, "repo" and "access" also present. `preMergeOverlayWithCloud` runs BEFORE any file push (:12294), so on a repo where menu_overlay.json doesn't exist yet, every publish aborts before pushing anything — and since only the publish path creates the file, it can never come into existence from inside the app.
- evidence: `if (res.status === 401 || res.status === 403 || res.status === 404) { …throw… }` then `if (/token|access|repo|find|refused|rejected/i.test(e.message||'')) { …throw e; }`.
- consequence: A fresh deployment (the Phase-5 second-site path in DOOR's own roadmap) hits a chicken-and-egg publish failure with a misleading token-flavored error. Zero effect on the current repo.
- direction: Distinguish file-404 from repo-404 (contents GET on a known-existing file, e.g. the `validateToken` probe of door_state.json, already proves repo access) — treat file-missing as `return localOverlay`.

### X-B-6 · EXPO publish: ref/SHA GETs carry no cache-bust — DOOR's 409-cache class generalizes to EXPO's atomic path
- class: footgun
- severity: P2
- status: NEW (the class is KNOWN for DOOR via the Aug-15 incident/D1; EXPO's instance is not in KNOWN.md — E1/E2/E3 cover different defects)
- confidence: verified (code traced at HEAD 2686de6; consequence chain plausible + historically consistent)
- where: conc-kitchen-expo/index.html:22428 (`pushFileToGitHub` SHA GET), :22503 (`pushFilesToGitHubAtomic` ref GET via `ghJSON('GET','/git/ref/'+ref)`), :22524–22527 (422/409 retry re-runs the same un-busted GET after only 250–500ms jitter)
- what: grep confirms **zero** `cache:'no-store'` on any `api.github.com` fetch in EXPO (the only no-store in the file is `build_info.json` :40375). GitHub API GETs are browser-cacheable ≤60s (`Cache-Control: private, max-age=60`). Two publishes <60s apart — e.g. two board drags in a row, each auto-publishing (Jason's ruled always-publish drag behavior) — let the second publish's ref GET return the pre-first-publish tip from HTTP cache; the commit builds on the stale parent, the `force:false` ref PATCH 422s, and the retry's re-GET is served the *same* cached tip (jitter ≪ TTL), so it 422s again and throws.
- evidence: EXPO's own v9.31.11 record documents a recurring live `422 "Update is not a fast forward"` class (attributed then to concurrent boot publishes; the cache mechanism produces the identical signature single-tab). The DOOR twin was live-confirmed 2026-08-15 (KNOWN.md §Live-incident).
- consequence: A curating supervisor doing rapid successive drags sees "❌ Publish failed" + red dot on the second one; `pp_last_published_version` is not updated so the *next* act re-publishes — self-healing but noisy, and it spends the red-failure signal's credibility (lens 9).
- direction: Same seam as DOOR X-B-1: `cache:'no-store'` on the ref/SHA GETs (the pattern already exists in the same file at :40375 and in DOOR's `validateToken`). Alternative: on 422/409 retry, force revalidation only on the retry GET.

### X-B-7 · EXPO no-op publish guard stamps "Live board current · HH:MM" from a purely local record — KNOWN E1, stronger evidence
- class: data
- severity: P2
- status: KNOWN → silent-drift plan E1
- confidence: verified
- where: conc-kitchen-expo/index.html:22700–22707 (`auto && storedVersion === boardVersion` → `showPubToast('Live board already current'); _refreshHubFreshnessUI({ verifiedAt: _hubClockLabel() })`), :22628–22633
- what: E1 (KNOWN) says the guard proves only *this browser* published. Mechanism detail worth adding: the no-op branch doesn't merely skip — it actively stamps `verifiedAt` (the same parameter a *confirmed successful push* uses) and toasts "Live board already current", so the UI asserts verified currency with **zero network reads**. Another device/browser publishing a different board after this browser's last push leaves this browser claiming "Live board current · HH:MM" on every boot. (HUB's content-drift banner is the compensating downstream control.)
- evidence: `if (auto && storedVersion === boardVersion) { … showPubToast('Live board already current'); _refreshHubFreshnessUI({ verifiedAt: _hubClockLabel() }); return; }` — `verifiedAt` also clears `_hubPublishFailure` (:22653).
- consequence: multi-device operation (the ruled Option-B future, and single-operator-multi-device today) gets a false-green trust surface on the second device.
- direction: E1's ruled remediation (silent-drift plan). Cheap interim honesty: the no-op toast/tooltip could say "matches this browser's last publish" instead of the categorical "Live board already current".

## HUB publish mechanism map (for the report; supports X-B-8)

**Two write surfaces.** (1) `hub_overrides.json` (supervisor day-notes) via `saveOverrides()` — the only HUB-authored write to GitHub; `hub_schedule.json`/`hub_orders.json`/`hub_schedule_version.json` are EXPO-authored, HUB only ever fetches them. (2) The CI auto-issue on a red `main` (`contract-gates.yml`).

**`saveOverrides()` (`CONC_Production_Hub.html:4725-4797`) is the most hardened write in the whole sweep so far.** Pre-save GET (busted `?t=Date.now()`, no `cache:'no-store'` needed since the URL itself is unique per call) both harvests the SHA **and** decodes+compares remote content against `HUB_OV_BASE_JSON` (the copy this device last loaded) via `assessNotesSaveConflict()`; a genuine conflict — remote changed since load, or unreadable — refuses the save outright (`_notesConflictBail`) rather than risking an overwrite. A `getRes` that isn't `ok`/`404` (network hiccup) also refuses ("Couldn't check… nothing was saved, and nothing was overwritten") instead of guessing. The PUT's own `409` gets a best-effort re-read + the same honest bail. This is the H1 (silent-drift plan) fix, confirmed live at HEAD — no gap found. **Confirmed-healthy, not a finding.**

### X-B-8 · HUB's red-`main` auto-issue has no de-duplication — can spam one issue per failing push
- class: kludge
- severity: P2
- status: NEW
- confidence: verified (workflow read in full — `.github/workflows/contract-gates.yml`, 45 lines)
- where: conc-kitchen-hub/.github/workflows/contract-gates.yml:35-44
- what: The FORK-5(b) "loud flag on red main" step (`gh issue create`) has no search-before-create step and no reuse of the run's SHA/branch as a dedup key — it unconditionally creates a **new** issue with title `"⚠ Contract gates RED on main @ <sha>"` every time a push to `main` fails any of the four gates. `hub_schedule.json`/`hub_orders.json` are pushed by EXPO on essentially every Generate/boot (documented as "essentially every push"), so a gate that stays red across several consecutive EXPO auto-publishes (e.g. `menu-content-drift` staying red while DOOR is mid-edit, or any transient gate flake) opens one issue **per commit**, not one issue for the incident.
- evidence: `gh issue create --repo "$GITHUB_REPOSITORY" --title "⚠ Contract gates RED on main @ ${GITHUB_SHA:0:7}" --body "$body"` — no `gh issue list --search`/`--state open` guard precedes it.
- consequence: This is the exact P2 the FORK-5 design was built to avoid recreating (a cry-wolf class, lens 9) — not a false alarm, but a *volume* problem: a genuine multi-push red streak (plausible given EXPO auto-publishes on Generate/boot) creates an issue storm that trains the on-call reader to skim/ignore rather than act on any single one, which is the same credibility cost as a cry-wolf gate even though every individual issue is truthful.
- direction: Existing in-house seam — `gh issue list --repo "$GITHUB_REPOSITORY" --state open --search "Contract gates RED"` before create, and only create when that search is empty (or reuse/comment on the existing open issue instead of opening a new one) — mirrors the "search before creating" convention this same MCP toolset's own instructions already require for issue-creation elsewhere in HOUSE.

## MISE publish mechanism map (for the report; supports X-B-9)

**`publishRecipeProduction()` (`index.html:32656-32712`) pushes 4 files SEQUENTIALLY** (`recipe_production.json` → `DOOR_RECIPE_DATA.json` → `recipe_production_meta.json` → `DOOR_RECIPE_DATA_meta.json`) via `ghPushFile()`, one Contents-API PUT per file, in a plain `for` loop with `try/catch` per iteration. A `buildPublishDryRun()` content-quality gate runs BEFORE the loop starts (blocks on non-authorized/incomplete records) — this protects *what* gets pushed, not the atomicity of the push itself.

**`ghPushFile()` (`index.html:28604-28614`) is the least-hardened GitHub writer found in the sweep:** SHA GET has no cache-bust of any kind (`fetch(url, {headers})`, same class as DOOR's X-B-1/X-B-6 finding but with **zero retry** — a `409`/non-ok PUT response just throws `'GitHub API ' + res.status + ...'` straight into the loop's `catch`, which records `published.push`-so-far and re-throws with a "Published X; failed at Y" message. No re-GET, no backoff, no second attempt.

### X-B-9 · MISE's 4-file publish has no atomicity and no retry — a mid-sequence failure pairs a fresh EXPO feed with a stale DOOR allergen feed
- class: footgun
- severity: P1
- status: NEW
- confidence: verified (both functions read in full at HEAD `6ea8b30`)
- where: conc-recipe-hub/index.html:32656-32712 (`publishRecipeProduction`), :28604-28614 (`ghPushFile`)
- what: The four files are pushed in the fixed order recipe_production.json, DOOR_RECIPE_DATA.json, then the two meta sidecars — with no all-or-nothing wrapper (no EXPO-style `pushFilesToGitHubAtomic` blob→tree→commit→ref-PATCH) and no retry on the individual PUTs. A failure after file 1 lands leaves EXPO's feed (recipe_production.json — names, streams, production facts) updated while DOOR's feed (DOOR_RECIPE_DATA.json — **allergen** data, explicitly food-safety-owned per DOOR's own CLAUDE.md: "Allergen data is owned by CODEX — fix it there, never fork it into DOOR") stays at the prior published state, for as long as it takes someone to notice and re-publish.
- evidence: `for (var i = 0; i < payloads.length; i++) { ... try { await ghPushFile(repo, payload.path, payload.content, token); published.push(payload.path); } catch(pushErr) { ...prefix = published.length ? 'Published '+published.join(', ')+'; failed at '+payload.path+': ' ... throw partialErr; } }` — and `ghPushFile`'s only failure path is `if (!res.ok) { ... throw new Error('GitHub API ' + res.status + ': ' + (err.message || res.statusText)); }` with no retry branch at all (contrast DOOR's `:12176-12179` and EXPO's `:22524-22527`, both of which at least attempt one retry).
- consequence: A curator who re-publishes after a CODEX data correction (the exact August workflow this repo's CLAUDE.md documents repeatedly — plant-forward flips, allergen fixes) and hits a transient network blip or a 409 (plausible given the same un-busted-SHA-GET class as X-B-1/X-B-6, since a re-click after a partial failure re-fetches the same possibly-cached SHA) can silently leave DOOR serving a stale allergen record for a recipe whose name/stream EXPO has already updated — a cross-app pairing skew in food-safety-relevant data, surfaced only by the operator reading the "Published X; failed at Y" status text and knowing to re-run.
- direction: Existing in-house seam, one directory over — EXPO's `pushFilesToGitHubAtomic` (blobs → tree → commit → single ref PATCH) is the proven pattern for exactly this "N files, one MUST-land-together commit" shape; DOOR's KNOWN D1 slice is the same port. MISE's 4-file publish is a clean case for the same port.

## Cross-cutting audit 1 — version order-compares (whole house)

Grepped `[Vv]ersion\s*[<>]` plus a broader `.version\s*[<>]|version\s*[<>]=?\s*[\w'"]|localeCompare.*version` sweep over all four app files (DOOR `index.html`, EXPO `index.html`, MISE `index.html`, HUB `CONC_Production_Hub.html`).

- **DOOR: 0 hits.** No order-compare on `_meta.version`, `DOOR_SCHEMA_VERSIONS`, or any version-ish identifier anywhere in the app. Matches the D7 lesson (documented, gate-checked) — the app itself only ever tests inequality.
- **EXPO: 0 hits.** Same — `_doorMenuMeta`/`_menuHash`/`APP_VERSION`/`pp_last_published_version` are all compared by equality (`===`) or used as opaque tokens, never ordered.
- **MISE: 0 hits.** `version:'2.0'` (recipe_production.json), per-recipe `version`, and `_schemaVersion`-shaped fields are never order-compared.
- **HUB: 1 hit — the KNOWN one-directional schema check.** `CONC_Production_Hub.html:1436`: `if(schemaVersion>HUB_SCHEDULE_SCHEMA_VERSION)warnings.push('Payload schema v'+schemaVersion+' is newer than this HUB reader...')`. This is exactly the doc-drift note already recorded in HUB's own CLAUDE.md ("the audit only warns when the payload is newer than the reader, so a payload that silently regresses below v2 later would pass unremarked") and KNOWN.md's H4. **Status: KNOWN → KNOWN.md H4 + HUB CLAUDE.md `Schedule-card contract v2` section.** No new evidence beyond confirming it is the *only* order-compare in the house and that the code matches the doc's description exactly (one-directional `>`, no `<` companion anywhere nearby).

**Net finding: the D7 lesson propagated almost perfectly** — three of four apps have zero version order-comparisons anywhere, and the one exception is already tracked. Recording as **confirmed-healthy** (see below) rather than a new finding.

## Cross-cutting audit 2 — cache-busting (whole house, cross-app runtime fetches)

| Fetch | Direction | Busting | Verified at |
|---|---|---|---|
| DOOR → CODEX `DOOR_RECIPE_DATA.json` | live allergen feed | `cache:'no-cache'` (conditional revalidate; no query-bust) | door/index.html:752 |
| DOOR's own outbound reads (raw.githubusercontent, pre-merge GETs) | self-reads for publish | `?_=Date.now()` busters on raw reads (`:10067` etc. per wave-1 grep); **contents-API SHA/pre-merge GETs are NOT busted** | door/index.html (X-B-1/X-B-4, already filed) |
| **EXPO → DOOR** `menu_current.json` (×2 call sites), `routing_by_meal.json`, `registry_summary.json` | live menu/routing/resident sync | **NONE — naked `fetch(url)`, no second argument at all** | expo/index.html:35682, 36089, 36364, 36391 |
| **EXPO → CODEX** `recipe_production.json` | live recipe feed | **NONE — naked `fetch(url)`** | expo/index.html:35272 |
| EXPO's own GitHub-API SHA/ref GETs (publish path) | self-reads for publish | **NONE** (already filed as X-B-6) | expo/index.html:22428, 22503 |
| HUB → EXPO `hub_schedule.json`/`hub_schedule_version.json`/`hub_orders.json` | live board feed | **Both tiers**: `cache:'no-store'` AND `?t=Date.now()` query-bust, with an explicit code comment "never trust browser/CDN cache for these files" | hub/CONC_Production_Hub.html:4260-4268 |
| HUB → self `hub_overrides.json` (pre-save conflict check) | supervisor-notes write | unique `?t=Date.now()` per call (no `cache:` needed — unique URL bypasses cache by construction) | hub/CONC_Production_Hub.html:4694, 4743, 4788 |
| MISE's own GitHub-API SHA GET (publish path) | self-reads for publish | **NONE** (already filed as X-B-9) | recipe-hub/index.html:28608 |

### X-B-10 · EXPO's cross-app reads from DOOR and CODEX are completely unbusted — the app most engineered around menu-freshness honesty has the least-protected transport
- class: footgun
- severity: P1
- status: NEW
- confidence: verified (5 call sites read in full via Grep -A2; all confirmed single-argument `fetch(url)` with no options object at all, not merely a missing `cache` key)
- where: conc-kitchen-expo/index.html:35272 (`recipe_production.json`), :35682 (`menu_current.json`, review-preview path), :36089 (`menu_current.json`, second call site), :36364 (`routing_by_meal.json`), :36391 (`registry_summary.json`)
- what: All five of EXPO's cross-app content fetches are bare `fetch(DATA_SOURCES.doorBase + filename)` / `fetch(DATA_SOURCES.codexBase + 'recipe_production.json')` — no `cache:'no-store'`, no `?t=`/`?_=` query-bust, nothing. GitHub Pages sits behind a CDN with up to ~10 minutes of edge caching (per this sweep's brief) on top of the browser's own HTTP cache. Meanwhile HUB (one hop downstream) explicitly busts **both** tiers on every equivalent fetch with a code comment stating exactly why, and DOOR busts its own outbound raw reads — EXPO is the one app in the DOOR→EXPO→HUB pipeline with no busting on its upstream reads at all.
- evidence: `fetch(DATA_SOURCES.doorBase + filename)` (`:35682`) — single argument, confirmed via `Grep -A2` context that the next two lines are `if (!res.ok) throw...` / `const data = await res.json()`, i.e. no options object exists anywhere in the call.
- consequence: EXPO's own CLAUDE.md (2026-07-27 entry) documents a full remediation pass making menu-adoption *provenance* honest (`acceptMenuSync` stamping `_doorMenuMeta` correctly, the D0.1 alignment gate, the embedded-fallback message naming the real cause) — real engineering effort spent on "did we adopt the menu we think we adopted." None of that protects against the transport itself serving a browser/CDN-cached *response body* from before DOOR's most recent publish: an operator who clicks Sync within the CDN TTL window of a DOOR publish can get a same-status-200, fully "successful" fetch that is nonetheless the prior menu — silently, since nothing here would distinguish it from a genuinely fresh read. Self-heals once the TTL expires, so this is not a durable corruption, but it is a live window where the app's own freshness-honesty machinery is working from a stale input without knowing it.
- direction: Existing in-house seam, two files away in the same pipeline — HUB's `_fetchJSON` (`hub/CONC_Production_Hub.html:4260-4268`) is the proven pattern (`cache:'no-store'` + `?t=Date.now()`, one shared helper) and is directly portable to EXPO's five DOOR/CODEX fetch sites.

## Cross-cutting audit 3 — token handling comparison (whole house)

All three of DOOR/EXPO/HUB read the **same shared localStorage key**, `conc_gh_token` (DOOR migrates any pre-existing value into it at `door/index.html:11533`; EXPO is `conc_gh_token` per its own PR-B changelog; HUB reads it directly with a legacy `hub_gh_token` fallback at `hub/CONC_Production_Hub.html:1080`). MISE does **not** participate in that shared key at all — its "Hub Publish" token (used both to test-connect and to actually push `recipe_production.json`/`DOOR_RECIPE_DATA.json`) lives in a separate, MISE-local `conc_hub_gh_settings.token` (`recipe-hub/index.html:32668-32670`, `:32715-32716`), despite the confusingly HUB-flavored naming.

| App | Storage key | Read-time sanitization | Trim |
|---|---|---|---|
| DOOR | `conc_gh_token` (shared) | **none** | yes (`.trim()`, `door/index.html:11348`) |
| EXPO | `conc_gh_token` (shared) | **yes** — strips every non-`\x20-\x7E` byte (`expo/index.html:22352`: `raw.replace(/[^\x20-\x7E]/g, '').trim()`) | yes |
| HUB | `conc_gh_token` (shared) / `hub_gh_token` (legacy) | **none** | **none** — plain `||` read, no `.trim()` at all |
| MISE | `conc_hub_gh_settings.token` (**own, unshared**) | **none** | **none** |

### X-B-11 · The same shared GitHub token is sanitized in EXPO but not in DOOR or HUB — a paste that works in one app can throw in a sibling
- class: kludge
- severity: P2
- status: NEW
- confidence: verified (all four getters read in full)
- where: conc-kitchen-door/index.html:11347-11349 (`getSavedToken`), :11461-11464 (`githubHeaders`, uses the token raw); conc-kitchen-expo/index.html:22341-22352 (`getGHToken`, documented fix); conc-kitchen-hub/CONC_Production_Hub.html:1078-1081 (`getHubToken`)
- what: EXPO's `getGHToken()` carries an explicit, dated fix (v9.29, 2026-05-23) with the comment "Non-ISO-8859-1 characters (smart quotes from rich-text paste, invisible whitespace, etc.) in the token break the fetch Authorization header with the error: 'String contains non ISO-8859-1 code point'." — and strips them on every read. DOOR's `getSavedToken()` only `.trim()`s; its `githubHeaders(token)` passes the value straight into `'Bearer ' + token`. HUB's `getHubToken()` doesn't even trim. Since all three read the identical `conc_gh_token` value, a token pasted with a stray non-ASCII character (a very plausible real-world paste from a browser's password manager, a chat client, or a PDF) will sanitize itself clean on every EXPO read but reproduce the exact documented crash on DOOR's and HUB's own publish attempts using that same stored string.
- evidence: EXPO `raw.replace(/[^\x20-\x7E]/g, '').trim()` vs DOOR `(appSettings['gh-token'] || '').trim()` vs HUB `localStorage.getItem('conc_gh_token') || localStorage.getItem('hub_gh_token') || ''` (no `.trim()`, no strip).
- consequence: A previously-fixed, dated, documented bug (EXPO v9.29) remains live in two sibling apps reading the identical credential — an operator who successfully saves a token via DOOR's or EXPO's Settings UI (whichever sanitizes on *save*, if either does — not verified this pass) could still hit a silent-looking publish failure specifically in DOOR or HUB while EXPO keeps working, which reads as "the token is fine, something else is broken" rather than pointing at the actual cause.
- direction: Existing in-house seam — EXPO's own `getGHToken()` regex is the fix; porting the one-line `.replace(/[^\x20-\x7E]/g, '')` into DOOR's `getSavedToken()`/`getTypedToken()` and HUB's `getHubToken()` closes the class everywhere the shared key is read. (MISE is out of scope for *this* fix since it doesn't share the key, but its own `ghSettings.token` read has the identical unsanitized-paste exposure independently.)

### X-B-5 · DOOR grouped P3s: publish-path fossils and nits
- class: kludge (grouped)
- severity: P3
- status: NEW
- confidence: verified
- where: conc-kitchen-door/index.html:12001, tests/door-smoke.mjs:1386+1489; index.html:11425–11428; :19206
- what: (a) `validateDoorPublishArtifacts` returns `blockingEnabled: false` — a fossil from the pre-Gate-9 advisory era; the live caller blocks on `counts.Stop` regardless, and two door-smoke tests pin the fossil (`assert.equal(result.blockingEnabled, false)`), so the code self-describes as non-blocking while blocking. A future reader/agent could conclude Gate-9 is advisory. (b) `showSidePublishResult` sequences its sync-bar message after the caller's via `setTimeout(250)` — magic-delay-as-ordering. (c) Boot fetches menu_overlay.json twice (merge fetch + timing-signal fetch), double network on every boot.
- evidence: `blockingEnabled: false` vs `if (_structuralStop) { …skip/confirm… }` at :12322–12338.
- consequence: Misleading self-description on the single most safety-relevant publish gate; minor wasted requests; fragile message ordering.
- direction: Rename/remove the field and re-pin the two tests to assert the *blocking* behavior (Gate-9's contract) instead of the fossil flag.

## Confirmed-healthy

Things checked expecting a problem, found solid:

- **HUB `saveOverrides()` / the notes-conflict contract (H1).** Full pre-save GET+content-compare, honest refusal on an unreadable/unreachable check, best-effort re-read on a live 409, and a bail that adopts-and-surfaces rather than silently overwriting. No gap found beyond what KNOWN.md already records as DONE.
- **HUB's own cross-app fetches (`_fetchJSON`) are the best-hardened caching pattern in the house** — both `cache:'no-store'` AND a `?t=Date.now()` query-bust, with a code comment stating the rationale, applied uniformly to `hub_schedule.json`, `hub_schedule_version.json`, and `hub_orders.json`.
- **Version order-compare discipline is nearly perfect house-wide.** DOOR, EXPO, and MISE have **zero** `<`/`>`/`localeCompare` comparisons on any version-shaped identifier anywhere in their app files — every version field is treated as an opaque equality token, exactly the D7 lesson generalized. Only HUB's one, already-KNOWN (H4) one-directional `schemaVersion>` check exists in the entire codebase.
- **DOOR's raw.githubusercontent reads and HUB's overrides-conflict GETs are cache-safe** (busted or uniquified per-call) — the caching gap found in this pass (X-B-10) is specific to EXPO's DOOR/CODEX content reads and does not generalize to every cross-app fetch in the house.
- **MISE's `buildPublishDryRun()` content-quality gate genuinely blocks before any file is pushed** — a non-authorized or incomplete record cannot reach `publishRecipeProduction`'s push loop at all; the atomicity gap found in X-B-9 is a distinct, additive failure mode (a mid-sequence *transport* failure after the content gate has already passed), not a hole in the content gate itself.

## Limitations

- **Doc-drift spot-check (protocol step 5) was skipped for the HUB/MISE/cross-cutting portion of this run**, per the TOKEN-LEAN MODE budget-pressed allowance — one doc-drift item was caught incidentally (HUB's own CLAUDE.md `_schemaVersion` claim, already flagged as stale in KNOWN.md, re-confirmed live at HEAD: the payload path documented in X-B's HUB section shows the reader-side check is real and matches the doc).
- **DOOR's token-*save* path was not traced** (only the *read* getters `getSavedToken`/`getTypedToken`) — X-B-11's consequence line is phrased conditionally ("whichever sanitizes on save, if either does") because I did not verify whether DOOR's Settings-save handler trims/sanitizes on write, which would change (but not eliminate) the blast radius.
- **MISE's token-*save* path (`saveHubGHSettings`) likewise not traced for sanitization** — read from the same evidence window as `loadHubGHSettings`/`testHubGHPublish`, not independently verified.
- **The MISE `api.anthropic.com` translator feature (brief item) was scoped but not written up as a finding** — traced key storage ("stored locally only", user-disclosed in the UI, `index.html:22729`) and the response-parse path (`JSON.parse` inside a try/catch that reaches `showTranslatorReview`); judged as a disclosed BYOK pattern consistent with the rest of the house's client-only architecture, and downstream `showTranslatorReview`/`matchToCONCPantry` sinks are covered by MISE's documented 2026-06-13 app-wide XSS hardening pass (KNOWN.md). Not independently re-verified at the specific sink this pass — recorded here as a gap, not a clean bill.
- **The MSAL/Graph `sendMail` path (MISE `index.html:24399-24420`) was read but not written up** — token acquisition is `acquireTokenSilent` (MSAL-standard, throws on failure into the caller's own try/catch at the call site, not traced further), and a failed send throws `Error('Email failed (...)')`. No finding because nothing looked structurally different from a normal fetch-and-throw; not exhaustively chased into every caller.
- **EXPO's `_queueSnapshotPush`/`setItemSafe` sync/async-split contract (brief item) was not independently re-verified** — EXPO's own CLAUDE.md documents this contract in detail (PR-D, 2026-07-04) with its own authored-to-fail gate receipts; treated as adequately self-documented and not re-traced given the budget, per protocol step 1 ("check KNOWN.md before claiming NEW" — this is a documented, gated, shipped feature, not an open item).
- **Did not independently verify the "≤60s GitHub contents-API cache" TTL figure** used throughout X-B-1/X-B-6/X-B-9's consequence reasoning — taken from the brief's own framing ("the browser caches GitHub contents-API responses ≤60s") and from `Cache-Control: private, max-age=60` as a standard GitHub API response header; not confirmed by an actual network trace this session.
- **Did not check whether DOOR's `PublishAuth.getRepo()` asymmetry (X-B-2) has an EXPO/HUB/MISE analog** — scoped to DOOR only in the interrupted run; not revisited this wave given the token-handling and cache-busting audits were the explicitly named resume point.

## Coverage statement

**Read attentively via the Read tool** (exact line ranges): conc-kitchen-door/index.html — 12150-12340 (publish wave + SHA/409 handling, wave 1), 11340-11475 (PublishAuth object, wave 1), 19170-19215 (`_ghHydrated` gate, wave 1), 12200-12230 (`preMergeOverlayWithCloud`, wave 1), 746-763 (CODEX recipe-data fetch, wave 2); conc-kitchen-expo/index.html — 22340-22360 (`getGHToken`/`saveGHToken`, wave 2), 35675-35690 (DOOR menu fetch, wave 2), 22690-22710 + 22620-22635 (no-op publish guard, wave 1, per prior findings file); conc-kitchen-hub/CONC_Production_Hub.html — 4690-4820 (overrides load/save/conflict, wave 2), 4255-4285 (`_fetchJSON`/schedule fetch, wave 2), 1078-1090 (`getHubToken`, wave 2), 1-45 (`contract-gates.yml`, wave 2, full file); conc-recipe-hub/index.html — 32650-32750 (`publishRecipeProduction`/`testHubGHPublish`/settings, wave 2), 28604-28660 (`ghPushFile`/`buildRecipeProductionJSON`, wave 2), 24380-24421 (Graph upload/notify, wave 2), 16690-16735 (Anthropic translator call, wave 2).

**Grep-covered only (not attentively read beyond the matched line + minimal context):** the full-house version order-compare sweep (0 hits in 3/4 apps, 1 known hit in HUB); the full-house cache-busting fetch inventory (table above); the full-house `conc_gh_token`/token-storage grep census; DOOR's raw.githubusercontent busting sites (`:10067`, `:10175`, `:19172`, `:19260`, `:19284` — confirmed present via grep in wave 1, not re-read attentively in wave 2).

**Unread / out of scope this run:** MISE's `MSAL`/Graph SharePoint-upload path beyond the two functions read (`graphUpload`/`graphNotify`) — no deeper trace into `acquireTokenSilent`'s internals (it's a vendored library call, not app code) or into every caller of `graphUpload`/`graphNotify`. DOOR's and MISE's token-*save* paths (see Limitations). HUB's `hub_orders.json`/`hub_schedule.json` *producer*-side pairing guarantee beyond confirming EXPO pushes both in one `pushFilesToGitHubAtomic` call (KNOWN.md H2 already covers the consumer-side unpairing; not re-traced). PROOF was out of this slice's brief entirely and was not touched.

**Repo HEADs at time of this finding (wave 2, in-flight collision guard honored — re-verify before any final cross-agent report is assembled):** conc-kitchen-door `7500521` · conc-kitchen-expo `2686de6` · conc-kitchen-hub `9ecce4c` · conc-recipe-hub `6ea8b30` — all as recorded at wave-1 sweep start; not re-verified at wave-2 finish given the interruption/resume framing, but the sections added in wave 2 are read-only greps/reads of those same files with no indication of concurrent edits to the specific lines cited (line numbers cross-checked internally consistent across separate tool calls in this wave).
