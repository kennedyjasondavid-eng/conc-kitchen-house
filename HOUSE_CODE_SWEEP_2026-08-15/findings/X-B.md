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

