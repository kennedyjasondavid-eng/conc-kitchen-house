# Slice X-B — publish paths end-to-end (atomicity, failure modes, caching)

Read `_COMMON.md` first. Findings → `findings/X-B.md`. Record HEAD shas of all repos touched.

**Method:** read each app's publish/commit machinery end-to-end (locate by grep; read the functions + their call sites). For each: (1) multi-file ordering — what is live if it dies between files, and in what order do files land (does routing land before menu? sidecar before payload?); (2) SHA/409/conflict handling + retries; (3) what fires publishes (user act vs auto vs side-effect); (4) partial-failure UX — what does the operator SEE after a failed/partial publish (silent? stale-green? loud?).

**DOOR** (the 10-commit publish — D1 is KNOWN; your job is the full mechanism map, not the fix): `_ghPushFileNow` + `_ghWriteQueue` serialization + `publishAndSync` (@~16923) + `saveMenuBaseOverlay` side-publish (@~14042) + Gate-9 preflight + stale-tab guard + the SHA-refetch retry (@~12170–12185) vs the ≤60s browser cache of GitHub contents-API responses (the Aug-15 409 race — KNOWN evidence; verify mechanism at HEAD and document the exact partial-state windows a consumer can fetch mid-wave).

**EXPO:** `pushFilesToGitHubAtomic` (blobs→tree→commit→ref PATCH — verify the ref update is genuinely the only flip point; 422/409 retry) · `publishHubSchedule` incl. the `pp_last_published_version` auto guard (E1 KNOWN: proves only this-browser — verify, add mechanism detail) · snapshot push queue (`_queueSnapshotPush`/`pushQueuedSnapshots`/`setItemSafe` quota path — the documented sync/async split contract).

**HUB:** `hub_overrides` PUT + 409 conflict contract (adopt-and-surface — verify edges) · orders publish · the `gh issue create` on red main (contract-gates.yml) — can it spam duplicate issues?

**MISE:** publish @~32722 (how many files per publish? atomic or sequential? DOOR_RECIPE_DATA + sidecar + recipe_production + identity map — pairing guarantees?) · Graph `sendMail` @24407 (MSAL/token acquisition, expiry mid-operation, failure surface) · `api.anthropic.com` @16714/@22761 — what feature, where's the key stored, failure mode, and whether response text reaches sinks (describe precisely; M-1/M-2 own the UI side).

**Cross-cutting (whole-house):**
1. **The 4 versioning conventions** (`_meta.version` int-schema-constant · `_schemaVersion` int · `version:"2.0"` string · `schemaVersion:"0.1-*"` string): grep every consumer for ORDER-comparisons on any of them (the D7 non-monotonic trap generalized — any `<`/`>`/`localeCompare` on these anywhere in the house?).
2. **Cache-busting audit:** every cross-app runtime fetch (X-A has the list; or re-derive) — `?t=`/`no-store`/nothing? GitHub Pages CDN (~10min) + browser caching means an un-busted fetch after a publish reads stale; map which fetches are busted, which rely on the sidecar-token pattern, which are naked. Include DOOR's contents-API reads (the ≤60s cache that bit the 409 race) and each app's *fallback-tier* freshness semantics (is "cache" labeled stale to the user or shown as fresh?).
3. Token handling comparison: `PublishAuth` (DOOR) vs `getGHToken` sanitization (EXPO) vs HUB vs MISE — same token, four handling patterns (X-C owns key storage; you own the auth/send semantics — e.g. non-ISO-8859-1 sanitize present in one app, absent in others → same token works in EXPO, breaks in DOOR?).
