# HOUSE — umbrella repo

> **Cross-app status may be stale here — single source of truth for cross-app facts (versions, phases, schema seams) is the HOUSE status ledger in `~/.claude/CLAUDE.md`.**

## What this is
`conc-kitchen-house` is the **HOUSE umbrella repo**: the landing page (`index.html`) that links the apps, and — as of 2026-06-21 — the **home of the HOUSE-level governance + knowledge docs** that apply to every app (they were previously accreted in the HUB repo and relocated here, where a cross-HOUSE fact's owner should live).

HOUSE (Hospitality Operations Unified System Engine) is CONC's unified kitchen-ops system. The apps:
- **DOOR** (`conc-kitchen-door`) — resident registry, routing, plating sheets, compliance (upstream of everything)
- **EXPO** (`conc-kitchen-expo`) — the production scheduler
- **HUB** (`conc-kitchen-hub`) — the staff-facing daily board
- **MISE / Recipe Hub / CODEX** (`conc-recipe-hub`) — recipe library + the recipe/allergen/cost feed
- **PROOF** (`conc-kitchen-proof`) — board/funder reporting

Pipeline: **MISE/CODEX → DOOR/EXPO → HUB**; DOOR is upstream of EXPO, HUB downstream of EXPO.

## HOUSE-level docs this repo owns (single owner per fact)
| Doc | Role |
|---|---|
| `INSIGHTS.md` | **The cross-HOUSE KNOWLEDGE owner** — design wisdom + lessons + telos for *every* app. Read it before any HOUSE design pass. App-specific grammar (e.g. EXPO's `EXPO_DESIGN_PRINCIPLES.md`, PROOF's `INSIGHTS.md`) **points back to it** — don't restate it. |
| `HOUSE_PROVEN_SEAMS.md` | **The proven-seams registry** (one level below INSIGHTS): problem class → the hardened implementation → where it lives → who still lacks it. Any session touching one of those classes **ports the seam instead of reinventing or omitting it** — and cites the row. Single owner of the seam table. |
| `HOUSE_Doc_Governance_Plan.md` | The doc-governance model + rollout (single owner per fact; the `LEDGER:`/`WRAP:` convention) |
| `HOUSE_ACTION_PLAN_2026-06-14.md`, `HOUSE_SESSION_HANDOFF_2026-06-14.md` | Dated, **frozen** HOUSE-wide planning snapshots |
| `HOUSE_SHAREPOINT_IT_BRIEF_2026-07-07.md`, `SHAREPOINT_IT_BRIEF.html` | **The SharePoint / M365 integration brief for CONC IT** — per-app external touchpoints, the big-picture data plane, the staged plan (Stages 1–5, hosting last), and the concrete Stage-1/2 ask (governed library + one Entra SPA app registration). The `.html` is the printable handout, Pages-served once merged. |
| `HOUSE_ASSESSMENT_2026-07-07.md` | **Current HOUSE-wide planning snapshot** (re-baselines the overtaken 2026-06-14 action plan): full six-repo sweep, per-app state, ranked risks (bus factor · adoption gap · food-safety debt · landmines · staleness), the ideal-usage picture, and a 3-horizon roadmap with operating rules. |
| `HOUSE_PLAN_OF_ACTION_2026-07-07.md` | **ACTIVE — the execution sheet for the assessment:** 7 stages (send-the-ask · food-safety zero · truth restoration · SharePoint ignition · EXPO soak-1 queue · second operator · HACCP capture · org ownership), session-sized slices with gate contracts, forks F0–F5 for Jason with leans, do-not-touch registry, first-30-days sequence, and a receipts table that appends as slices land. |
| `HOUSE_OPEN_ITEMS_PICKUP_2026-08-17.md` | **Dated open-items router for a fresh session** — triages the cross-HOUSE open work (buildable now · needs-a-Jason-ruling · Jason's operational hands · ruled) and **points to each item's owning doc or GitHub issue**, never restating them. A frozen snapshot; the pointed-to docs + issues are the live truth. |

**What lives elsewhere (this repo points, never restates):** cross-app STATUS (versions/phases/schema seams) → the HOUSE status ledger in `~/.claude/CLAUDE.md`. The product/ecosystem "why" → the V42 vision HTML under `~CONC Project Management Tool~`.

## Rules
- Single-file HTML landing page; no build tools. Graceful degradation from `file://`.
- `git fetch` + compare to `origin/main` before writing any owner doc here (clones drift).
- Deploys / merges are Jason-gated.
