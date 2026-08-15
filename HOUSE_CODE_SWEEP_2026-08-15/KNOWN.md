# KNOWN & RULED register — sweep dedupe baseline (2026-08-15)

Sweep agents: check findings against this BEFORE claiming NEW. Anything here is `KNOWN → ref` or `RULED → ref`. New *evidence* about a known item is welcome (status KNOWN, cite this file). Compiled from the silent-drift plan §9/§10, GitHub state, repo CLAUDE.mds, and the 2026-08-15 post-defuse handoff.

## Open, tracked (status = KNOWN)

**Silent-drift plan** (owner `conc-kitchen-hub/HOUSE_SILENT_DRIFT_ACTION_PLAN_2026-07-27.md` §10; all five forks ruled):
- **O1** stale-board republish via EXPO (pending Jason, unblocked) · **D1** DOOR atomic publish — one publish = 10 commits today; port EXPO `pushFilesToGitHubAtomic` (live 409-race evidence 2026-08-15, below) · **D2** routing `_meta.builtFromMenu{exported,hash}` · **D3** `getMenuData()` silent baked-fallback → loud Stop (FORK-3 ruled: Gate-9 override semantics) · **D4** per-slot `_components` failure invisible · **D5** stale-tab guard per-origin not per-tab · **D6** v32 text regressions (Strogonoff / Brocolli / duplicated biscuit-peas) · **E1** no-op publish guard proves only *this browser* published · **E2** atomic push never reads the payload it overwrites · **E3** auto-publish fire-and-forget, no durable queue · **E4** producer-side DOOR-drift notice at publish · **E5** new-item review identity keyed on transport tier · **E6** un-missable "Imported" menu badge · **H2** `hub_orders`/`hub_schedule` published paired, consumed unpaired · **H3** menu panel once-per-tab (partially addressed) · **H4** schema audit one-directional (no warn when payload older than reader) · **X2** cross-repo change-set rule enforcement · **X3** finish the 29-finding audit (4 verified) · **X4** recurring doc-vs-code audit pass.
- DONE (do not report as open): D7 version-contract doc · H1 notes-conflict contract · H5 deploy ungated (FORK-5(b)) · X5 EXPO gates on main-push · V0–V2.

**GitHub open:**
- **DOOR #63** — `getVegAltAllergenStr` fuzzy-match narrowness (matches a side, misses the veg main); 3 latent advisory-allergen deltas; food-safety; fix before next `routing_by_meal.json` republish.
- **EXPO #233** (open PR) — mirror the DOOR Parsnip defuse into EXPO's baked MENU + parity fixture. THE open remediation from the Aug-15 defuse. Until it lands + Jason republishes, EXPO's baked menu is stale vs live DOOR and HUB's drift banner is HONEST. In-flight — do not duplicate its work.

**DOOR (CLAUDE.md-known):** `routing_by_meal.json` regen pending (phantom `Halal:56` clears on next publish; never hand-edit routing) · Egg-Salad-Wrap `hasPork` durable only if cleared in the menu editor · W1 MON "Fully Loaded Sausage" has NO halal option · `computeDoorComplianceDiagnostics` intentionally unwired · `menu_reno.json` regen footgun (`_meta.manualEdits` breadcrumb) · touch-targets/print fidelity = live-preview task with the architect.

**EXPO (CLAUDE.md-known):** 2 send-model stragglers (Chicken Fajitas W1 SAT lunch; Halal chicken al pastor W4 TUE lunch — hot-send instead of cold; pass-ordering ~L14221) · `A2_PENDING_MENU_RECONCILIATION` skip-set (11 slots; incl. real-gap candidate Seasonal Veg W2 SAT) · baseline-promotion A2/A3/A4 + Stage B + Stage C not built; known-red census/fixture gates enumerated in that plan §10 · `jerk_tofu_menu_parity_gate` red + absent from CI (recorded in DOOR design doc §4/§7) · publish-unblock wizard forks await Jason · `openStickinessAuditPanel` audits a deleted store (deferred retirement) · documented cumulative-load flake set (`placement_reader`, `production_path_edit`, `step_value_set`, `nonmenu_add` gates).

**MISE/CODEX (known):** `plantforward_tier1_gate` env-red (needs sibling DOOR checkout; skips in single-repo CI) · supplier-price acceptance lane closed pending curator authority · 4 source-blank units authority-gated · ambiguous curry aliases + Gomen Spice = deferred architect decisions · P1 LAN-card badge needs a design ruling first.

**HUB (known):** H2/H3/H4 above. Note: CLAUDE.md's "live payload has NO `_schemaVersion`" claim is dated 07-27; the HEAD `hub_schedule.json` DOES carry `_schemaVersion: 2` — verify and treat as doc-drift, not a code bug.

**PROOF (known):** SharePoint Tier-2 standup = its #1 ranked not-done (GOVERNANCE.md owners/permissions unfilled) · `ghg_factors.json` `placeholder:true` by design · R4/R5 honest-degradation (muted/caveated) by design — not bugs.

## Ruled / retired (status = RULED — never propose)

- **The "Elegance" class:** in-file modularization, IIFE/namespace conventions, section banners, standalone design-token systems, frameworks/build tools/npm. Single-file HTML, no build step is constitutional across HOUSE.
- **EXPO S5b** — reviewed, awaiting Jason's explicit acceptance; no implementation authorized.
- **EXPO U3** (deferred until demonstrated batch demand) · **U4 + Lansdowne J7c-5** (parked on D-MS1) · **J4** dialog friction + **J8** `.mob` layer (real-use soak questions, not build items).
- **MISE C8** (local cost-engine switch) + **C9** (public-feed cost migration) are authorization-gated; cost fields stay OUT of `recipe_production.json`.
- **HUB freshness = detect-only** (FORK-2 ruled, quantified reopen trigger) · **HUB Builder pipeline deprecated** — regenerating from `archive/` REGRESSES the hub.
- **EXPO reno/reno_rex teardown leftovers** (BBQ one-off revert, falafel routing revert) — known follow-ups with preserved checklists; don't re-derive.
- **DOOR menu contents/flags are Jason-ruled facts** — e.g. Parsnip and Carrot REPLACES Seasonal Vegetables on W1 TUE + W2 SAT lunch; W2 SAT main renamed "Chicken Tenders" (both RULED 2026-08-15). Data *integrity* issues are in scope; culinary contents are not.

## Recently fixed / freshly swept (low marginal yield — skim-class; don't re-report)

- **DOOR Aug 14–15:** menu-representation footgun investigation + Parsnip defuse; PR #74 merged; door-smoke re-pinned 70/70. Pre-read `DOOR_POST_DEFUSE_REMEDIATION_HANDOFF_2026-08-15.md`.
- **MISE Aug 10–12:** recipe-flow simplification S0–S6 + UX-friction remediation (PR #78) merged; cheat-sheet #81.
- **EXPO Aug 9–10:** unresolved-dish consolidation S0–S3b merged (PR #224); Nigerian/Blackened reconciliation #226–#228; v9.49.36 bump #232.
- Earlier hardening lines (verify *coverage since*, don't re-litigate): DOOR publish-path PRs #48–#51 + Gate-9; EXPO save-trust PR-A..D, boot-TDZ fix (v9.49.28), escape-helper unification (J1); MISE app-wide XSS pass (~57 sinks, 2026-06-13); HUB freshness + notes-conflict contracts.

## Live incident evidence (record, don't fix)

- **2026-08-15 DOOR publish 409s:** overlapping publish waves (each editor save auto-publishes via `publishAndSync` `:16923`; `saveMenuBaseOverlay` side-publishes `:14042`) race on file SHAs; the browser caches GitHub contents-API responses ≤60s so `_ghPushFileNow`'s single SHA-refetch retry (`:12170-12185`) can re-grab a stale SHA and fail loudly. Landed on reload. = D1 evidence. (Post-defuse handoff §1.)

## In-flight collision guard

- Jason (2026-08-15): the repos are being actively worked in a couple of places RIGHT NOW. Treat HEAD as movable; record the swept SHA in every findings file; re-verify volatile facts (artifacts, CI state, open PRs) immediately before the final report. Never assume the artifacts on disk equal what's live on Pages.
