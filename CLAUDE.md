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
| `HOUSE_Doc_Governance_Plan.md` | The doc-governance model + rollout (single owner per fact; the `LEDGER:`/`WRAP:` convention) |
| `HOUSE_ACTION_PLAN_2026-06-14.md`, `HOUSE_SESSION_HANDOFF_2026-06-14.md` | Dated, **frozen** HOUSE-wide planning snapshots |

**What lives elsewhere (this repo points, never restates):** cross-app STATUS (versions/phases/schema seams) → the HOUSE status ledger in `~/.claude/CLAUDE.md`. The product/ecosystem "why" → the V42 vision HTML under `~CONC Project Management Tool~`.

## Rules
- Single-file HTML landing page; no build tools. Graceful degradation from `file://`.
- `git fetch` + compare to `origin/main` before writing any owner doc here (clones drift).
- Deploys / merges are Jason-gated.
