<!-- Provenance: drafted 2026-06-13 by a HOUSE-wide survey (7 areas) + design + adversarial review workflow.
     This is the rollout PLAN (reference). The live CONVENTION lives in ~/.claude/CLAUDE.md. Dated artifact; freeze. -->

# Single-Source Doc Governance Across HOUSE — Final Implementation Plan

*Decision-ready. Grounded in the survey, hardened by adversarial review. Every CUT/CHANGE verdict applied. Ethos-true: no CI, no build tools, no cross-repo fetch fan-out, single-architect-friendly.*

---

## 1. The model in one screen

**The problem it solves:** the auto-loaded file lied. The global `CLAUDE.md` said "EXPO Phase 2 pending" while Phase 2 is complete-in-place and Phase 3a landed 2026-06-13. A fact lived in 5 files; two workstreams each thought they owned it; nobody agreed which copy was real.

**Four layers, each fact has exactly one owner:**

| Layer | What it holds | Owner-of-record |
|---|---|---|
| **STATUS** | versions, phases, branch state, "what shipped / what's stale" | cross-app → global `~/.claude/CLAUDE.md` tables · app-internal → that app's roadmap/CLAUDE.md |
| **CONTRACT** | published-JSON shapes + versions (the seams between apps) | producer app's `schemas/` doc + the version stamp (`_meta.version` or `<name>_version.json` sidecar) |
| **DECISION** | architect rulings with a *because* | a "Decisions" **section** in the owning app's roadmap (HOUSE-wide rules → global CLAUDE.md Working Rules) |
| **KNOWLEDGE** | transferable lessons (INSIGHT) + destination (VISION) | HUB `INSIGHTS.md` (HOUSE-canonical) / app-local INSIGHTS · V42 vision HTML / app `VISION.md` |

**The one governing rule:**
> Every milestone/schema/version/ruling change updates its **one owner** in the **same change set**. Nothing else restates it — downstream files POINTER ("see X for current state") or FETCH (runtime version check). Dated docs are FROZEN snapshots: never edited after their date, banner-marked "FROZEN snapshot — current state lives in <owner>."

**One deliberate exception (review CHANGE):** each app's roadmap keeps stating its **own** current version line. That cross-checks against the global ledger, so a stale ledger is *detectable*. Pure single-source on the most volatile fact is a false economy.

**Drift control = the same two mechanisms the data cascade already proves:**
- **STRUCTURAL** — one owner per fact (enforced by where you write).
- **RUNTIME** — the consumer checks a version and falls back (`if (version !== expected) warn + use cache`).

**Ethos guards (non-negotiable):** No CI / GitHub Actions / cross-repo automation. No build tools, npm, or schema-validation library. No status server / aggregator / health daemon. No big-bang rewrite. **No proactive cross-repo grep-and-demote sweep** (review LEAK 1 — that's a disguised fetch fan-out that can write into stale clones). Every step is a Markdown edit, a ≤300-byte JSON sidecar alongside an *already-published* artifact, or a boot-time `if`.

---

## 2. The standard update-phrase (minimum viable — after the cut)

The review cut the six-prefix DSL to **two phrases**. A sole operator won't sustain a grammar with five discriminator tests; a prefix you have to look up is a prefix you won't type. The five-tier taxonomy survives **as the assistant's internal routing logic**, not as keywords in your fingers.

| Phrase | Meaning | Single owner it writes | Pointers it refreshes |
|---|---|---|---|
| `LEDGER:` | "This changed — put it in its one owner, tell me where." Assistant infers tier + owner from content and **announces the owner** for one-word correction. | cross-app fact → global `~/.claude/CLAUDE.md` table · app-internal → that app's roadmap · JSON seam → `schemas/` doc + version bump · ruling-with-a-because → roadmap "Decisions" section | lazily — only a duplicate **encountered while doing this edit** gets demoted to a pointer. No global sweep. |
| `WRAP:` | Session-end safety net. Update owners for what actually changed this session; print a 3-line manifest. | same routing as `LEDGER:`, batched | same lazy rule |

**Routing intelligence lives in the assistant + the convention doc, not in your fingers.** You type a normal sentence with one verb in front. You never name the file.

**Critical guard (review CHANGE):** if a fact could be claimed by **>1 workstream inside the same app** (the exact Stage-3b failure), it escalates to the **global ledger** by definition — same trigger as "spans >1 app." This is the actual fix for the incident the project is named after.

**Example messages:**

```
LEDGER: EXPO Phase 3a M2 cutover merged 2026-06-13, routeItem authoritative, 10b/10c teardown pending
→ Wrote 1 row → ~/.claude/CLAUDE.md Phase-Milestone (last-confirmed 2026-06-13).
  Demoted project_expo_phase3_flip.md "3e complete" → pointer (encountered, superseded). Nothing else restated.
```

```
LEDGER: recipe_production.json adds _components cost-per-portion, v2.1
→ Owner: CODEX recipe contract (→ EXPO schemas/RECIPE_SCHEMA.md of record). Bumped _meta.version 2.0→2.1.
  Consumers: EXPO (reads in resolveItem — FLAGGED, update next touch), DOOR (passthrough — none). Same-change-set noted.
```

```
WRAP:
→ wrote → ~/.claude/CLAUDE.md (1 row), EXPO roadmap Recent (1 line)
  pointers refreshed → project_expo_status.md
  nothing else
```

---

## 3. Multi-tier capture from sessions

The taxonomy is the assistant's sort key. The **one-line test per tier** keeps captures from bleeding. The mnemonic for the top of the convention doc:

> **VISION = where · INSIGHT = how-to-think · STATUS = where-now · CONTRACT = the seam · DECISION = the because.**

| Tier | One-line test | Single owner across HOUSE | Mutability |
|---|---|---|---|
| **VISION** | "Did *where we're going* change?" | V42 vision HTML (HOUSE) · app `VISION.md` | living — edit in place |
| **INSIGHT** | "A *transferable* lesson, no expiry?" | HUB `INSIGHTS.md` (HOUSE-canonical) · app-local INSIGHTS for app-only lessons | append (numbered) |
| **STATUS** | "Did *current state* change — shipped/merged/stale?" | global `~/.claude/CLAUDE.md` (cross-app) · app roadmap (internal) | overwrite (current truth) |
| **CONTRACT** | "Did a *JSON seam another app reads* change?" | producer `schemas/` doc + version stamp | versioned (bump + consumers) |
| **DECISION** | "A *settled trade-off with a because*?" | roadmap "Decisions" section · global Working Rules for HOUSE-wide | append-only (archaeology) |

**Bleed discriminators (the hard pairs):**
- **VISION vs INSIGHT** — prescriptive-about-destination → VISION; descriptive-lesson-when-you-build → INSIGHT.
- **INSIGHT vs DECISION** — *would it still read the same if the specific item vanished?* Yes → INSIGHT; no → DECISION. (Wrong call sends archaeology into an overwrite tier and loses it — asymmetric, so default ambiguous cases to DECISION/append.)
- **STATUS vs CONTRACT** — touches a `.json` field/version another app reads → CONTRACT (stricter ritual); else STATUS.
- **DECISION vs STATUS** — a decision often *produces* a status line; log the STATUS, and if it carries a *because*, add the DECISION line in the roadmap section. Don't force both for routine bumps.

**The lightweight `WRAP:` ritual (cut from 5 passes / 8-row manifest to this):**
1. **Update owners** for what changed this session (the assistant already knows — it did the work).
2. **Freeze the handoff.** Any dated `HANDOFF_*.md` stays as-is with the FROZEN banner; its *live facts* are lifted into the proper owner so future sessions read the owner, not the handoff. (Fixes "HANDOFF_PHASE3.md never reaches global.")
3. **Print a 3-line manifest:** `wrote → <files>` · `pointers refreshed → <files>` · `nothing else`.

No mandatory FLAGGED-confirm gate (it traps you on busy days into walking away mid-prompt). No proactive demote-sweep — **demotion is lazy**: a future session that *reads* a duplicate and sees it disagrees fixes that one. WRAP is the safety net; `LEDGER:`-when-it-ships is the spine.

---

## 4. Per-repo rollout

| Repo | Ledger (status owner) | Pointers / Frozen | Contracts (schema + version) | Memory owner | First step (next touch) | Effort |
|---|---|---|---|---|---|---|
| **HOUSE portal** `conc-kitchen-house` | global `~/.claude/CLAUDE.md` owns cross-app registry; portal `README.md` owns only portal v1.0 / PIN / 4-card | README version table → **pointer** to global ledger (kills copy-paste drift) | none of its own — POINTER to EXPO `schemas/` | one line under `project_house_system.md` | replace README version table with pointer; **delete untracked `INSIGHTS.md`** (orphaned EXPO Phase-3 copy) | S |
| **HUB** `conc-kitchen-hub` | `CLAUDE.md` + 2-line "last deployed/edited" block | `README.md` + `Quick_Guide.md` → CLAUDE.md; **fix `Quick_Guide.md` L40-44 dead-builder pointer (end-user-facing, top priority)**; FROZEN: `EXPO_v9.30.1_Session_Handoff.md`; mark `HUB_Home_Site_Plan.md` "PLANNED" | owns version-stamp precedent `hub_schedule_version.json`; POINTER to EXPO `schemas/` for `hub_schedule.json` shape | `project_hub_status.md` | promote `INSIGHTS.md` → memory as `reference_hub_insights.md` (HOUSE-canonical, currently unindexed) | S–M |
| **CODEX/MISE** `conc-recipe-hub` | `CODEX_ROADMAP.md` "Current state" | `CLAUDE.md` + `NEXT_SESSION.md` → roadmap; FROZEN: `CODEX_SESSION_HANDOFF_2026-06-13.md`, `COOK_SURFACE_HANDOFF.md` | refresh stale `recipe_production.json` header (v2.0/2026-05-08) on each publish; add `version`+`generated` to `DOOR_RECIPE_DATA.json`; POINTER to EXPO `schemas/RECIPE_SCHEMA.md` (no parallel `schemas/`) | `project_mise_status.md` (pipeline/authenticity stay own facts) | collapse 4-way status dup (CLAUDE/ROADMAP/HANDOFF/NEXT) → roadmap-as-owner + 3 pointers | M |
| **EXPO** `conc-kitchen-expo` (+ worktrees) | new root `EXPO_STATUS.md` (own version + EXPO-phase + 1-line branch-reality note) | `CLAUDE.md` keeps architecture/Next-Moves, version claims → global; branch journals (`PHASE*.md`, `HANDOFF_PHASE3.md`, `PHASE5_PLAN.md`) → EXPO_STATUS for "current"; FROZEN: all `EXPO_v9.*_Session_Handoff.md`, `PHASE3A_Session_Handoff.md` | **owner of record** — fill MENU/RECIPE/SITE_PROFILE schemas from skeleton (**sequenced into Phase 1, not next-touch**); formalize `hub_schedule_version.json` as EXPO output contract | collapse 3 drifting files → **one** `project_expo_status.md`; prune/wikilink `project_expo_phase3_flip.md` + `project_expo_phase3a_cutover.md` | M |
| **DOOR** `conc-kitchen-door` (OneDrive-only) | `CLAUDE.md` (48 lines) | `README.md` → CLAUDE.md; FROZEN: `MENU_TYPO_FIXES_*`, `SLOT_ALLERGEN_AUDIT_*` | owns `menu_current.json` v30 (`_meta.version`), `menu_reno.json` v2, `routing_by_meal.json` (add `version`); POINTER to EXPO `schemas/MENU_SCHEMA.md` | **create `project_door_status.md`** (none exists today) | record in global SCHEMA MATRIX that **`menu_reno.json` is generated by EXPO's `_gen_menu_reno.py` — DOOR does not own its version** (reno menu ~20d stale) | S |
| **PROOF** `conc-kitchen-proof` (greenfield) | `PROOF_Implementation_Plan.md` until `proof.html` scaffolds, then app `CLAUDE.md` | **commit** untracked `VISION.md`+`INSIGHTS.md`; PROOF `INSIGHTS.md` header scoped "PROOF-only; cross-HOUSE → HUB/INSIGHTS.md" (avoid day-1 collision) | adopt stamp+boot-check+3-tier fallback from day 1; document consumed contracts by POINTER to EXPO `schemas/` (**only after EXPO schemas filled** — don't point at a skeleton); add unique entries locally | `project_proof_reporting.md`; promote VISION/INSIGHTS → `reference_proof_vision.md` / `reference_proof_insights.md` | add global APP-REGISTRY row (status: greenfield); commit lodestars | S→M |

---

## 5. Sequence

The review endorses incremental over big-bang **with one correction**: a pure-additive pointer-stub pass up front, so no repo *silently contradicts* the ledger during the adopt-on-next-touch window (a system that claims single-source while being dual-source is worse than the honest mess).

| # | Step | Repo(s) | Effort | Risk | Why this order |
|---|---|---|---|---|---|
| **0** | Stand up the global ledger: **3 tables** (App Registry / Phase Milestone / Schema Matrix) with **per-row `last-confirmed` date** + **`converted:` column**; terminology fix (PROOF backronym → committed form 5495a2d; MISE=engine/CODEX=explorer); 2 house rules (cross-app facts live only here; provenance-stamp every generated artifact) | global `~/.claude/CLAUDE.md` | M | ~0 | Keystone, auto-loads every session, fixes the worst confirmed drift |
| **0b** | **Pointer-stub pass across all 6 repos** — one additive line: "Cross-app status may be stale here; source of truth = ~/.claude/CLAUDE.md (as of <date>)" | all 6 | S | ~0 | Closes "which repos converted?" ambiguity immediately; pure-additive |
| **1** | Version-stamp convention in EXPO `schemas/README.md` **+ fill MENU/RECIPE/SITE_PROFILE schemas from skeleton** (pulled forward — PROOF/DOOR/CODEX pointers depend on a real owner) | EXPO | S→M | low | Names the existing `hub_schedule_version.json` pattern the standard; makes the pointer target real |
| **2** | Promote orphaned lodestars into memory graph (`reference_hub_insights`, `reference_proof_vision/insights`) | HUB, PROOF | S | ~0 | Closes orphaned-knowledge gap, no code |
| **3** | PROOF born-correct: commit VISION/INSIGHTS, scope its INSIGHTS header, add global APP row, bake stamp+fallback into plan | PROOF | S→M | low | Greenfield, zero debt |
| **4** | Adopt-on-next-touch: ledger/pointer/freeze + cheapest contract-gap closes | each repo as touched | S–M | low | No big-bang; converts during real work; `converted:` column tracks progress |
| **5** | **First runtime check:** HUB reads `hub_schedule_version.json` at boot (skip re-render on match, warn+fallback on miss) | HUB | M | med | First end-to-end proof of the runtime drift-check |
| **6** | **Ledger runtime check:** EXPO boot asserts its `APP_VERSION` vs the version the global ledger claims for it; console-warn on mismatch | EXPO | S | low | Gives the load-bearing ledger the runtime half it otherwise lacks |

**Highest-leverage / lowest-risk first move:** Step 0 — the one auto-loaded file, read before anything else, currently carrying the worst drift. Broadest blast radius for the least code.

---

## 6. Failure modes & guards

**A. The global CLAUDE.md is now the single point of failure (the plan's central irony).** All cross-app truth concentrated in one hand-edited, auto-loaded file with no runtime check, and per-app docs demoted to pointers — removing the redundancy that lets a sharp reader notice disagreement. A stale ledger read with high confidence is *worse* than no ledger.
- **Guard 1 (structural):** per-row `last-confirmed: YYYY-MM-DD`. A 20-day-old row in a fast phase is a visible smell. (Step 0.)
- **Guard 2 (runtime):** EXPO boot asserts its `APP_VERSION` vs the ledger's claim, console-warns on mismatch — one `if` in the file you open daily. (Step 6.)
- **Guard 3 (redundancy on purpose):** keep each app roadmap's own current-version line; never demote *it* to a pointer. Global-vs-app disagreement stays detectable.

**B. A clone is behind origin (documented hazard — OneDrive-EXPO was 159 commits behind).** A `LEDGER:`/`WRAP:` edit writes the owner-of-record into a stale tree; the global `~/.claude` file is machine-singular (safe) but app roadmaps + memory exist in up-to-4 copies.
- **Guard:** the convention **names the canonical clone per owner** — OneDrive clones are owner-of-record for app docs; home-dir worktrees are read-mostly (never `LEDGER:` into a worktree roadmap). **`git fetch` + compare HEAD to origin/main before any owner write** (extend the existing "fetch before trusting" rule to "fetch before writing").

**C. Parallel sessions clobber the global file (likely — background tasks + spawned subagents).** Last-writer-wins on a non-branched Markdown file; git may auto-merge adjacent table rows into a mangled table.
- **Guard (zero cost):** **only the foreground/primary session writes owners; subagents and background tasks return facts as text for the primary to ledger.** (This task already does exactly that.) Codify it.

**D. Half-migrated window asserts clean while being dual-source.**
- **Guard:** the Step-0b pointer-stub pass + the `converted: Y/N/partial` column make half-migration *visible* — a to-do list, not an invisible trap.

---

## 7. What we deliberately will NOT build (ethos)

- **No CI / GitHub Actions / cross-repo automation.** No bot reconciles the ledger.
- **No build tools, npm, schema-validation library.** Contracts are Markdown + a ≤300-byte JSON sidecar read at boot. JSON Schema files, if any, are prose-equivalents, not validated by tooling.
- **No status server, aggregator dashboard, or `cascade_health.json` daemon.** A single ≤300-byte sidecar alongside an *already-published* artifact is fine; a *new fetch fan-out across repos* is not.
- **No proactive cross-repo grep-and-demote sweep** (review LEAK 1 — a disguised fan-out that can write pointers into stale clones). Demotion is lazy, on read.
- **No six-prefix DSL.** Two phrases (`LEDGER:`, `WRAP:`); taxonomy lives in the convention doc, not your fingers.
- **No per-repo `DECISIONS.md` files.** A "Decisions" section in the existing roadmap — no new owners to maintain.
- **No VISION→paired-DECISION auto-spawn** (two-owner-by-construction; vision shifts monthly at most — write it in plain English with the why in the same doc).
- **No big-bang doc rewrite.** Adopt-on-next-touch, with the additive pointer-stub as the only up-front cross-repo work.

---

## 8. Start here (the concrete first 2-3 edits, today)

1. **Edit `C:\Users\Jason\.claude\CLAUDE.md`** — add the three tables (APP REGISTRY · PHASE MILESTONE · SCHEMA VERSION MATRIX), each row carrying `last-confirmed` + the registry carrying `converted:`. Seed from the survey: HOUSE portal v1.0 · DOOR menu_current v30 / reno v2 · CODEX v50 · EXPO v9.32.0 · HUB (served `CONC_Production_Hub.html`, no baked version) · PROOF greenfield. **Fix the confirmed conflation in the Phase table:** EXPO Phase 2 = COMPLETE-in-place on `expo-phase2-siteprofile` (deliberately divergent — do NOT merge); Phase 3a = M1+M2+10a merged 2026-06-13, 10b/10c pending. Lock the PROOF backronym (commit 5495a2d) and MISE=engine / CODEX=explorer. Add the two house rules: *"Cross-app facts live ONLY in the tables above; app docs and memory POINTER here"* and *"Every generated artifact (hub_schedule, reports, exports) stamps input provenance (source SHAs + as-of date + factor version) in its footer/`_meta`"* (PROOF INSIGHT #10 promoted to HOUSE-wide — the best idea in the docs, at the right altitude).

2. **Add the convention section to `C:\Users\Jason\.claude\CLAUDE.md`** (it auto-loads, so it's the right single home): the prefix→owner routing table (`LEDGER:` / `WRAP:`), the five-tier taxonomy + one-line tests as the assistant's internal logic, the **">1 workstream → escalate to global"** rule, and the three clone/parallel-write guards (fetch-before-write; canonical clone per owner; subagents report, primary writes).

3. **Pointer-stub pass (Step 0b)** — prepend the one additive line to each of the 6 repos' status-bearing doc (`README.md` or `CLAUDE.md`): *"Cross-app status may be stale here; source of truth = `~/.claude/CLAUDE.md` ledger (as of 2026-06-13)."* Pure-additive, ~30 min, closes the "which repos converted?" gap before any conversion begins.

Everything after Step 3 happens on next-touch, tracked by the `converted:` column. Ship Step 1 today.

---

Files referenced (all absolute): global ledger + convention home `C:\Users\Jason\.claude\CLAUDE.md`; memory index `C:\Users\Jason\.claude\projects\C--Users-Jason\memory\MEMORY.md`; contracts owner `C:\Users\Jason\OneDrive - CHRISTIE OSSINGTON NEIGHBOURHOOD CENTRE\conc-kitchen-expo\schemas\` (README/MENU/RECIPE/SITE_PROFILE); version-stamp precedent `conc-kitchen-hub\hub_schedule_version.json`; EXPO app-ledger target (new) `EXPO_STATUS.md` at EXPO root (worktree `C:\Users\Jason\expo-phase1\`); CODEX ledger `C:\Users\Jason\conc-recipe-hub\CODEX_ROADMAP.md`; PROOF `conc-kitchen-proof\PROOF_Implementation_Plan.md` + uncommitted `VISION.md` / `INSIGHTS.md`; HOUSE portal `conc-kitchen-house\README.md` + delete untracked `conc-kitchen-house\INSIGHTS.md`.