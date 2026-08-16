# HOUSE proven seams — port, don't reinvent

**What this is.** The house's answer to "solved once, not propagated" (the structural recommendation of `HOUSE_CODE_SWEEP_2026-08-15/`, commissioned by Jason 2026-08-16). A shared library is ruled out — single-file HTML is non-negotiable in every app — so the propagation mechanism is knowledge, one level below `INSIGHTS.md`: a short table of problem classes each solved *well* exactly once somewhere in HOUSE, with a pointer to the hardened implementation and an honest census of who still lacks it.

**The rule.** Any session touching one of these problem classes **ports the seam instead of reinventing or omitting it**. Port means: read the named implementation, copy its shape (adapted to the app's idiom), and cite the registry row in the commit/PR. If the port improves the seam, update the origin too — or record why the divergence is deliberate in the row.

**Anchors.** The durable anchor in each row is the **symbol name** — grep for it. Line numbers are a convenience snapshot **as of 2026-08-16** and will drift. "Who still lacks it" cells date from the 2026-08-15 sweep plus same-day spot checks; re-verify before acting on one.

---

## The registry

| # | Problem class | Hardened implementation | Where it lives | Who still lacks it |
|---|---|---|---|---|
| 1 | **Quota-safe localStorage write** — a full origin (shared by all six apps) makes `setItem` throw; a bare try/catch swallow turns that into silent non-persistence | `setItemSafe(key, value)`: synchronous happy path (byte-identical timing to a bare `setItem`, so fire-and-forget callers still see the write land); only the quota path goes async — `ensureStorageHeadroom()` → retry once → **loud** console fail + `return false`. Deliberately NOT used for the one write that must fail loudly on its own terms (EXPO's `pp_canonical_save` keeps its toast-and-return-null contract) — the seam includes knowing which write to exempt | EXPO `index.html` `setItemSafe` (~:31556) + `ensureStorageHeadroom` | DOOR / HUB / MISE / PROOF all write localStorage behind bare swallows (sweep empty-catch counts: DOOR 34 · HUB 17 · MISE 64 · PROOF 3; EXPO's 132 are mostly non-storage). On quota, their saves silently don't happen |
| 2 | **Cache-busted cross-app fetch** — GitHub Pages + CDN serve stale JSON; a "successful" fetch of an old artifact is worse than a failed one | `_fetchJSON(url)`: appends `?t=Date.now()` **and** `{ cache: 'no-store' }` (belt and suspenders — the query bust defeats CDN/proxy layers `no-store` alone can miss), null-swallows so callers degrade to their cache tier | HUB `CONC_Production_Hub.html` `_fetchJSON` (~:4277) | EXPO's five cross-app fetches gained `cache:'no-store'` in #235 but not the query bust; DOOR/MISE/PROOF cross-app reads vary — check the specific fetch before trusting its freshness |
| 3 | **GH token sanitizer** — a token pasted from rich text carries smart quotes / invisible whitespace; non-ISO-8859-1 bytes make the `Authorization` header constructor throw | `getGHToken()`: strip non-ASCII + trim **at the read seam**, so every consumer downstream gets a header-safe token (v9.29 lesson — the push failed with an opaque header error, not "bad token") | EXPO `index.html` `getGHToken` (~:22363) | DOOR's `PublishAuth.getSavedToken()` trims but does not strip non-ASCII; HUB (notes PUT) and MISE (publish path) read tokens with no sanitize. Same paste, same opaque failure |
| 4 | **Publish credential lifecycle** — tokens that silently expire, resurrect from embedded defaults, or persist untested erode trust in the whole publish lane | `PublishAuth`: one object owning token/repo/expiry metadata; **Test & Save** (probe GitHub before persisting), no embedded-default resurrect on empty storage, expiry surfaced before it bites. EXPO's save-trust PR-B (`testGHConnection`/`_ghConnState`) is a partial port of this, modeled on it explicitly | DOOR `index.html` `PublishAuth` (~:11369; `window` export ~:11570) | EXPO's port lacks expiry metadata; MISE's publish path (manual-first, C9-gated) and HUB's notes-save token handling are ad hoc — no probe-before-persist |
| 5 | **Atomic multi-file publish** — N files pushed as N commits means a crash mid-publish ships an artifact set that never existed; a version sidecar that outruns its payload silently pins every client to stale data (the 2026-05-28 HUB incident) | `pushFilesToGitHubAtomic(token, files, msg)`: one commit via the Git Data API (blobs → tree → commit → ref PATCH); the ref update is the all-or-nothing flip, a crash before it is a clean no-op; retry once on 409/422; **no fallback to the split path by design** — fails loudly so the publish is retried whole | EXPO `index.html` `pushFilesToGitHubAtomic` (~:22502) | **DOOR** — one publish is still 10 per-file commits via `_ghPushFileNow` (9 of 10 CI runs per publish evaluate partial artifact sets; porting this IS the open silent-drift slice D1). MISE's feed publish is its own reviewed path |
| 6 | **Noon-anchored local dates** — `new Date('YYYY-MM-DD')` parses as **UTC midnight**, which is the previous evening in Toronto; DST ±1h can flip the day-of-month. A date-only string must never go through the bare constructor | The idiom: `new Date(dateStr + 'T12:00:00')` — local noon absorbs any DST shift so the calendar day never flips. HUB's `_now()` regex-guards (`/^\d{4}-\d{2}-\d{2}$/` → noon form, else passthrough) and builds all cycle dates via `_localDate(y,m,d)` at 12:00 | EXPO `index.html` `dateToRotationSlot` (~:35560) · HUB `CONC_Production_Hub.html` `_now`/`_localDate`/`_parseLocalISO` (~:2961–2969) | Any remaining bare `new Date('YYYY-MM-DD')` on a date-only string (the sweep P-1 TZ lane's class, flagged in DOOR/PROOF date math). Grep for the constructor before writing new date logic anywhere |
| 7 | **Escape-helper coverage** — one `innerHTML`/inline-handler sink taking user or imported text unescaped is stored XSS; a 3-entity escaper in an attribute context is a hole, not a helper (549 innerHTML sinks house-wide per the sweep) | Two-tier family: a 4-entity text/attr escaper (`& < > "`) plus a dedicated **onclick-arg** escaper adding `\` and `'` for `onclick="fn('VALUE')"` sinks. MISE: `_esc` + `_escJsAttr`. EXPO's J1 unification: `_htmlEsc` / `_jsSingleQuoteString` / `_htmlJsSingleQuoteArg` (5-entity, gate-enforced). DOOR: escaped at every display sink (2026-06-18 hardening) | MISE `index.html` `_escJsAttr` (~:17957) · EXPO J1 family (`escape_helper_unification_gate` pins it) | **HUB's `escH` (~:3100) escapes only `& < >`** — no `"`, so a double-quoted attribute context is injectable; its `escJ` covers JS strings but nothing covers the combined attr+JS sink. PROOF is small but unaudited for sink coverage |
| 8 | **Site vocabulary registry** — site names smeared through code as string literals drift into incompatible vocabularies (the sweep found 3 vocabularies + extra inline lists + 10 MISE label maps); membership questions ("which sites are kitchens?") get answered by hardcoded lists that go stale when operations change | `HUB_HOME_SITES`: one `Object.freeze`d table owning code / display label / URL aliases / **capability facts** (`kitchen:true`), with membership **derived** from the capability flag (the F7 ruling: the Kitchen role reads `kitchen:true`, not a reno-era hardcoded `['Bloor','LAN']` that hid Rex's standard-mode cooking). Dedicated matchers (`sliceMatch`, `movementMatch`) own comparison; one device-local pref key | HUB `CONC_Production_Hub.html` `HUB_HOME_SITES` (~:1286); gate `tests/home_site_slice.mjs` | The *pattern* (one frozen registry, capability flags, derived membership) is what ports — each app keeps its own vocabulary. EXPO (`SITES` + profile), DOOR, and especially MISE (10 label maps) still answer site questions from scattered literals |
| 9 | **Closed-enum guard on ingested artifacts** — a tolerant reader that silently drops unknown keys turns upstream vocabulary drift into invisible data loss (a renamed routing section just vanishes from the report) | PROOF's routing reader: every section key checked against the closed enum `P.DICT.section` → **error flag naming the unknown key**; values validated too (non-numeric/negative = error — "validate values, not just keys, else a corrupt denominator slips through"); zero cells = error (an empty/truncated fetch must not validate clean); a missing version = warn, not error (routine bumps aren't drift) | PROOF `proof.html` `P.DICT.section` enum guard (~:373; skip census ~:647) | EXPO's DOOR-artifact readers and HUB's payload readers are deliberately tolerant (graceful degradation is a house rule) — but tolerant-with-a-census is the portable middle: count and surface what you skipped, never silently drop it |
| 10 | **Zero-config test discovery** — a hand-enumerated CI gate list strands every test someone authors but forgets to enroll; the stranded gate then rots against a moving app (exactly how EXPO's two known-red gates drifted, E-3-2) | `tests/all.mjs`: `readdirSync` glob — every `tests/*.mjs` runs as its own **subprocess** (state isolation, real per-file pass/fail), per-test 120s wall-clock cap (a hung test fails loudly), OneDrive conflict-copies excluded by pattern, new tests auto-enroll with **no CI edit** | MISE `tests/all.mjs` (:11 discovery, :23 filter); DOOR's `node --test tests/*.mjs` is the same property via the built-in runner | **EXPO** hand-enumerates `verb-gates` in `schedule-gate.yml` — a direct glob is NOT a drop-in there (diagnostics like `route_via_crosstab` must not gate; documented cumulative-load flakes), so the port needs an exclusion convention (e.g. `_`-prefix for non-gates) first. *(Cell corrected 2026-08-16: the sweep-era "PROOF has no CI" claim closed post-sweep — PROOF gained `proof-gates.yml` running the full suite on push + PR, the P-1-10 close. The HOUSE portal's only CI is this registry's own verifier, `seams-gate.yml`.)* |

---

## Machine anchors — the verifier's input

The machine-checkable **subset** of the table above (not a restatement — prose claims a script can't grep stay prose-only). `tests/proven_seams_gate.mjs` parses this block and checks it against the sibling repos in both directions: a `seam` check failing = **anchor rot** (the implementation moved/renamed — re-anchor the row); a `gap` check failing = **stale cell** (the "who still lacks it" claim is no longer true — update the cell). **Edit the table → edit these anchors in the same change.** Check entries are literal substrings, or `{"re": "…"}` for a regex; a target with `"exists"` asserts file presence/absence instead of content; `"gitOnly": true` marks a target Pages can't serve (dot-dirs; all of PROOF, which has no Pages site) — enforced in git-mode runs, loudly skipped in Pages mode; `"pagesFile"` names the path a curated Pages deploy serves the file under (HUB's `deploy.yml` ships `CONC_Production_Hub.html` as `index.html`).

<!-- SEAMS-ANCHORS-START -->
```json
{
  "rows": [
    { "row": 1, "class": "quota-safe localStorage write",
      "seam": [ { "repo": "conc-kitchen-expo", "file": "index.html", "has": ["function setItemSafe(key, value)", "ensureStorageHeadroom("] } ],
      "gap": [
        { "repo": "conc-kitchen-door",  "file": "index.html", "lacks": ["setItemSafe"] },
        { "repo": "conc-kitchen-hub",   "file": "CONC_Production_Hub.html", "pagesFile": "index.html", "lacks": ["setItemSafe"] },
        { "repo": "conc-recipe-hub",    "file": "index.html", "lacks": ["setItemSafe"] },
        { "repo": "conc-kitchen-proof", "file": "proof.html", "gitOnly": true, "lacks": ["setItemSafe"] }
      ] },
    { "row": 2, "class": "cache-busted cross-app fetch",
      "seam": [ { "repo": "conc-kitchen-hub", "file": "CONC_Production_Hub.html", "pagesFile": "index.html", "has": ["async function _fetchJSON", "+ 't=' + Date.now()", { "re": "cache:\\s*'no-store'" }] } ],
      "gap": [ { "repo": "conc-kitchen-expo", "file": "index.html", "has": [{ "re": "cache:\\s*'no-store'" }] } ] },
    { "row": 3, "class": "GH token sanitizer",
      "seam": [ { "repo": "conc-kitchen-expo", "file": "index.html", "has": ["function getGHToken()", "strip non-ASCII"] } ],
      "gap": [ { "repo": "conc-kitchen-door", "file": "index.html", "has": ["return (appSettings['gh-token'] || '').trim();"] } ] },
    { "row": 4, "class": "publish credential lifecycle",
      "seam": [
        { "repo": "conc-kitchen-door", "file": "index.html", "has": ["const PublishAuth = {"] },
        { "repo": "conc-kitchen-expo", "file": "index.html", "has": ["testGHConnection"] }
      ] },
    { "row": 5, "class": "atomic multi-file publish",
      "seam": [ { "repo": "conc-kitchen-expo", "file": "index.html", "has": ["async function pushFilesToGitHubAtomic("] } ],
      "gap": [ { "repo": "conc-kitchen-door", "file": "index.html", "has": ["_ghPushFileNow"], "lacks": ["pushFilesToGitHubAtomic"] } ] },
    { "row": 6, "class": "noon-anchored local dates",
      "seam": [
        { "repo": "conc-kitchen-expo", "file": "index.html", "has": ["new Date(dateStr + 'T12:00:00')"] },
        { "repo": "conc-kitchen-hub", "file": "CONC_Production_Hub.html", "pagesFile": "index.html", "has": ["function _localDate(y,m,d){return new Date(y,m,d,12,0,0,0);}"] }
      ] },
    { "row": 7, "class": "escape-helper coverage",
      "seam": [
        { "repo": "conc-recipe-hub", "file": "index.html", "has": ["function _escJsAttr(s)"] },
        { "repo": "conc-kitchen-expo", "file": "index.html", "has": ["_htmlJsSingleQuoteArg"] }
      ],
      "gap": [ { "repo": "conc-kitchen-hub", "file": "CONC_Production_Hub.html", "pagesFile": "index.html", "has": ["function escH(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}"] } ] },
    { "row": 8, "class": "site vocabulary registry",
      "seam": [ { "repo": "conc-kitchen-hub", "file": "CONC_Production_Hub.html", "pagesFile": "index.html", "has": ["const HUB_HOME_SITES=Object.freeze("] } ] },
    { "row": 9, "class": "closed-enum guard on ingested artifacts",
      "seam": [ { "repo": "conc-kitchen-proof", "file": "proof.html", "gitOnly": true, "has": ["P.DICT.section.includes(", "routing.section.enum"] } ] },
    { "row": 10, "class": "zero-config test discovery",
      "seam": [
        { "repo": "conc-recipe-hub", "file": "tests/all.mjs", "has": ["readdirSync("] },
        { "repo": "conc-kitchen-proof", "file": ".github/workflows/proof-gates.yml", "has": ["node tests/all.mjs"], "gitOnly": true }
      ],
      "gap": [ { "repo": "conc-kitchen-expo", "file": "tests/all.mjs", "exists": false } ] }
  ]
}
```
<!-- SEAMS-ANCHORS-END -->

---

## Maintenance

- **Add a row** when a problem class gets solved well for the *second* time — that duplication is the signal it belongs here. Prefer promoting the better implementation to "the seam" and citing the other as a port.
- **Update, don't append:** a row's "who still lacks it" cell shrinks as ports land — edit the cell (with a date) rather than adding a second row. When a cell reaches "nobody", keep the row: it's still the pointer for the *next* new app or surface.
- **Enforcement (added 2026-08-16):** `tests/proven_seams_gate.mjs` verifies the machine-anchors block against the sibling repos; `.github/workflows/seams-gate.yml` runs it on push + PR **and a weekly cron** — the cron matters because this registry rots against *other* repos' changes, not its own pushes. A red non-PR run auto-opens a repo issue (the loud-flag step ported from HUB `contract-gates.yml` — this registry's own rule applied to itself). A **stale-cell red is registry maintenance, never an app regression**: the app improved; update the cell. Two acquisition modes: local multi-repo sessions verify **git checkouts** (byte-true, incl. `gitOnly` targets); CI verifies over the repos' **public Pages sites** — EXPO/HUB/MISE are private repos with public Pages, and the anti-decay gate must not itself carry an expiring credential (row 4's lesson), so CI reads the same public data plane the apps already use to read each other. PROOF is private with **no Pages site**, so its anchors are `gitOnly` — CI-invisible by necessity, covered by local git-mode runs; HUB's curated deploy serves its app as `index.html` (`pagesFile`).
- **Pending ride-alongs (2026-08-16):** a one-line registry pointer beside each app orientation doc's existing INSIGHTS pointer (EXPO · DOOR · MISE CLAUDE.md; PROOF's INSIGHTS.md) — fold into the next PR that touches each repo; note it here as they land. **HUB's landed 2026-08-16**, riding along with the served-layout doc correction (`CONC_Production_Hub.html` deploys as `index.html`).
- **This doc owns the seam table** (single owner per fact, per `HOUSE_Doc_Governance_Plan.md`). `INSIGHTS.md` points here; app docs may cite a row but never restate the table.
- Line-number anchors are as-of snapshots — re-grep the symbol name before editing at a cited location.
