# HOUSE — Session Wrap-up & Handoff — 2026-06-14

> **FROZEN snapshot — not maintained.** This is a point-in-time record of the 2026-06-14 session. **Current cross-app status lives in the `~/.claude/CLAUDE.md` ledger**, not here; the doc-governance convention + rollout plan are in that ledger and in `HOUSE_Doc_Governance_Plan.md` (same folder). Read those for live state; read this for "what happened and how to pick up each open thread."

## Where things stand
Two big things landed. **(1)** CODEX's Stage 3a curator signal was validated/reviewed/fixed, and a cook-log finding cascaded into an **app-wide XSS hardening pass** (~57 sinks) — both **live on Pages and verified**. **(2)** The doc-drift problem became a **HOUSE-wide single-source doc-governance system**, now stood up: a status ledger in the global `CLAUDE.md`, pointer-stubs in all repos, the `LEDGER:`/`WRAP:` phrases, and per-repo adoption begun (CODEX/EXPO/PROOF done). Every repo touched is `0/0` with origin.

## What shipped (by theme)
- **CODEX security (live):** Stage 3a fixes incl. the cook-log stored-XSS (`1735b19`), P2 notes-only (`13fae44`), app-wide XSS pass + `_escJsAttr` + `recipeName`-norm retired (`61d1201`, `ee4cdce`).
- **HOUSE governance (live across repos):** the plan (`conc-kitchen-hub/HOUSE_Doc_Governance_Plan.md`), the ledger + convention in `~/.claude/CLAUDE.md`, pointer-stubs in all 6 repos, EXPO version-stamp convention + schemas relabeled Active (`378f2d3`, `9716d1d`, `aae51f8`), the `reference_house_insights` memory.
- **PROOF (live):** lodestars re-pointed to the **funder-agility telos**, committed + de-staled + pointer-stubbed; v2 plan + Increment-1 tracked (`cc20e23` → `f87fc39`).
- **Corrections the governance caught:** EXPO **Phase 2 is on main** (ported `b8659f8`), not branch-only — fixed in doc + ledger + memory. CODEX **3b artifact is located** (branch `codex-authenticity-layer`).

## How to drive it forward
- **`LEDGER: <what changed>`** → routes the fact to its single owner, reports where. **`WRAP:`** → session-end sweep. Status lives once (ledger for cross-app, the app's roadmap for internal); everything else points.
- **Every session:** read `~/.claude/CLAUDE.md` (auto-loads) → the app's `CLAUDE.md`/roadmap → relevant memory. **`git fetch` + compare to origin before trusting or writing any clone.** Deploys are Jason-gated. OneDrive clones are owner-of-record for app docs; never write app docs into a home-dir worktree.

## Standing footguns
- Single-file HTML, no build tools, anywhere. Verify CODEX/HUB in-browser via **DOM/eval** (the served file hangs on `document_idle` — screenshots time out).
- End an escaping/security pass with an **empirical payload scan** (`document.querySelectorAll('[onerror]')`), not just grep — and run **both** a by-region sweep and a by-dimension completeness review.
- Never mutate the real `concRecipeLibrary`/user localStorage to test UI — monkeypatch the loader transiently and restore.
- Both escapers escape `& < > "` but **not** `'`; inline `onclick="fn('VALUE')"` sites need `_escJsAttr`.

---

# Further-work prompts
*Each is self-contained for a fresh session. The context line above each block is for bearings; copy the fenced block into a new session. Independent — run in any order. Highest user-value: #1. Most "verify-before-touch": #4, #5. Governance Step 6 is intentionally dropped (a running web app can't read `~/.claude`; a central fetch-manifest would violate the no-fetch-fan-out rule — structural dating + contract checks cover it).*

---

### 1. CODEX — Stage 3b: authenticity (advisory adoption + the one decision) · app: CODEX/MISE (`conc-recipe-hub`)
**Context:** Method-gen engine is done (0/299). The Bloor authenticity layer is built on local branch `codex-authenticity-layer` (FE0+FE1 advisory `authenticity-quality` metric + a **13-edit adoption packet**). The one open call is **advisory vs generative**; recommend advisory-first. Highest-value CODEX move; it's *recipe-data edits*, not engine work.

```
Continue the CODEX trajectory (conc-recipe-hub). Read ~/.claude/CLAUDE.md (HOUSE ledger), then the repo's CODEX_ROADMAP.md (Stage 3b section), CODEX_SESSION_HANDOFF_2026-06-13.md, and memory project_codex_authenticity + project_mise_status. Work in C:\Users\Jason\conc-recipe-hub; git fetch + compare to origin/main first. Also inspect branch codex-authenticity-layer (CODEX_FE0_FE1_Build_Plan.md, CODEX_FE_Adoption_Packet.md, tests/authenticity_integrity.mjs).

Goal: decide Stage 3b = ADVISORY vs GENERATIVE, and if advisory (recommended), ship FE0+FE1 (the read-only authenticity-quality metric, zero method drift) and work the 13-item adoption packet by hand — start Tier 1 (red-wine-vinegar→lime swaps: cost-neutral + halal-beneficial). These are architect-controlled recipe-data edits; keep the method-gen engine untouched. DEFER the generative FE-P→FE5 bridge until adoption proves the rules. Gate each step with an adversarial review; verify on the deployed Pages build via DOM/eval (the served file hangs on document_idle); deploys are Jason-gated. Record outcomes with LEDGER:.
```

---

### 2. CODEX — close the cost-feed loop + enforce the method-gen CI gate · app: CODEX (`conc-recipe-hub`)
**Context:** Two ready, low-risk engineering wins. **Cost-feed loop:** CODEX *publishes* cost to `recipe_production.json` but doesn't *consume* it, so curators see stale seed costs — the cost twin of the Stage 2 portions pipe. **CI gate:** `tests/method_snapshot.mjs` is battle-tested but run by hand — make it a pre-commit/CI check.

```
Two CODEX hygiene tasks in conc-recipe-hub. Read ~/.claude/CLAUDE.md ledger + CODEX_ROADMAP.md + memory project_mise_status / project_codex_pipeline. Work in C:\Users\Jason\conc-recipe-hub; git fetch + compare first; single-file HTML, no build tools; deploys Jason-gated; verify via DOM/eval on the deployed build.

(A) Cost-feed loop: CODEX consumes its OWN published recipe_production.json cost (3-tier fallback) so the detail-view scaler shows live cost alongside portions — the cost twin of the Stage 2 portions pipe. Read-only consumption; never write the recipe. The recipe_production.json envelope is {version, generated, source, recipes:{}} (header v2.0/2026-05-08 is refresh-on-publish).
(B) Method-gen CI gate: promote tests/method_snapshot.mjs to an enforced check (pre-commit hook or minimal CI) so generated-method drift fails loudly. No new build pipeline — keep it Node + the existing harness.
Gate each with an adversarial review; record with LEDGER:.
```

---

### 3. CODEX + DOOR — cleanup backlog · apps: CODEX (`conc-recipe-hub`) + DOOR (`conc-kitchen-door`)
**Context:** Three documented debts. The **DOOR XOR'd default gh-token** (~line 9678) silently resurrects when the stored token is empty and masks the no-token state (caused a 401) — architect's call to remove. **Salt-%** inconsistency (nutrition 1.5% vs cost 0.8%) is internal-only. **`COST_BUDGET`** thresholds were placeholder. DOOR is **OneDrive-only**.

```
Cleanup backlog across DOOR + CODEX. Read ~/.claude/CLAUDE.md ledger + each app's CLAUDE.md + CODEX_ROADMAP.md "cleanup". Single-file HTML, no build tools; deploys Jason-gated; fetch+compare each clone first.

DOOR (conc-kitchen-door, OneDrive-only): remove (or gate-on-empty) the XOR'd embedded default gh-token at ~line 9678 that resurrects when the stored token is empty and masks the "no token" state. Architect-decide remove-entirely vs gate.
CODEX (C:\Users\Jason\conc-recipe-hub): (a) document the salt-% divergence (nutrition assumedSaltGrams ~1.5% vs cost ~0.8%, both water-inclusive) with a code comment rather than harmonizing — internal-only; (b) retune COST_BUDGET { warn, danger } if real per-portion costs warrant (the over-budget items are mostly unit bugs — Salt ×25 — not expensive recipes).
Verify via DOM/eval; adversarial review per change; record with LEDGER:.
```

---

### 4. HUB — governance Step 5: runtime version-check · app: HUB (`conc-kitchen-hub`)
> ✅ **DONE 2026-06-14** (commit `039b49a`, live on Pages). Verified the boot-time check meets spec and never hard-fails; added `console.warn` on an unexpected version (malformed sidecar / sidecar↔payload skew) + a truthy-guard against a `null===null` false cache-hit. **Discovered + fixed a blocker:** the `#builtTs` freshness/stale/error banner element had been dropped in a header redesign while its four JS readers were left behind, silently no-op'ing every banner — restored it (with click-to-retry on the no-data path + a style-reset after a successful retry). Also hardened the loader (single-flight guard, `projectDates()` try/catch, orders fetch falls back to cache on a non-OK HTTP status). Details in HUB `CLAUDE.md`; the transferable lesson is in `INSIGHTS.md`.

**Context:** HUB already reads `hub_schedule_version.json` at boot — the precedent the version-stamp convention copies. Step 5 = **verify it's really there and formalize it**. This is a **live-code** change to the served `CONC_Production_Hub.html` (edit it directly — build pipeline is dead), so care + verification, not a casual edit.

```
HUB governance Step 5 in conc-kitchen-hub (OneDrive-only; served artifact CONC_Production_Hub.html is canonical — edit it directly, NEVER regenerate; dates derive at view-time from _cycleStart). Read ~/.claude/CLAUDE.md ledger + HUB CLAUDE.md + memory project_hub_status + EXPO schemas/README.md "Version stamping". git fetch + compare first; deploys Jason-gated.

Goal: verify and formalize HUB's boot-time hub_schedule_version.json check — version matches → skip re-fetch/re-render; mismatch/missing → fetch + re-render, then fall back to localStorage cache; warn (console) on unexpected version, never hard-fail. If it already does this (likely), tighten/document; if partial, complete it. Verify in-browser via DOM/eval; adversarial review; record with LEDGER:.
```

---

### 5. EXPO — reconcile the Phase-3 slice state · app: EXPO (`conc-kitchen-expo`)
**Context:** The exact EXPO Phase-3 status drifted across docs. A **read-and-LEDGER** task: pin the real current slice state from the repo, write it to its single owner. EXPO Phase 2 is on main (`b8659f8`); the branch `expo-phase2-siteprofile` is divergent (Phase 3) — **do not merge it**.

```
Reconcile EXPO's Phase-3 status. Read ~/.claude/CLAUDE.md ledger (EXPO Phase-milestone row) + EXPO CLAUDE.md + EXPO_Generic_Scheduler_Roadmap.md + the PHASE3*/HANDOFF_PHASE3 docs + memory project_expo_phase3_flip / project_expo_phase3a_cutover. EXPO clones: OneDrive owner-of-record at "...\conc-kitchen-expo"; home-dir worktrees (expo-phase1, etc.) are read-mostly — NEVER write app docs into a worktree. git fetch + compare first.

Goal: determine the ACTUAL current Phase-3 slice state on main vs the divergent branch expo-phase2-siteprofile (which carries Phase 3 work — do NOT merge), then update the SINGLE owner: the global ledger's EXPO Phase-milestone row (and the EXPO roadmap if internal). Demote any stale restatement to a pointer. Don't change code — this is a status-truth pass. Use LEDGER:; mark the ledger row confirmed with today's date.
```

---

### 6. HOUSE-wide — governance tidy (adopt-on-next-touch loose ends) · apps: PROOF, HOUSE-portal, + per-repo
**Context:** Step 4 ("adopt on next touch") plus loose ends: PROOF's **v1 plan should be marked superseded** by v2; the HOUSE-portal repo has an **orphaned untracked `INSIGHTS.md`** flagged for deletion; and any app you open can finish converting its docs to ledger/pointer/freeze.

```
HOUSE governance tidy. Read ~/.claude/CLAUDE.md ledger + conc-kitchen-hub/HOUSE_Doc_Governance_Plan.md. For each repo: git fetch + compare before writing; deploys Jason-gated; OneDrive clones own app docs.

(A) PROOF (conc-kitchen-proof): mark PROOF_Implementation_Plan.md (v1) as SUPERSEDED by PROOF_Plan_v2_Funder_Agility.md (banner pointer at its top; keep as history).
(B) HOUSE portal (conc-kitchen-house): review the untracked INSIGHTS.md flagged as an orphaned EXPO Phase-3 copy — confirm with Jason, then delete or repurpose; don't auto-delete a file you didn't create without his nod.
(C) Adopt-on-next-touch (any app you open): where a doc RESTATES cross-app status (version/phase/schema), replace the restatement with a pointer to the ledger; freeze dated handoffs with a "FROZEN snapshot" banner. Record each with LEDGER:.
```
