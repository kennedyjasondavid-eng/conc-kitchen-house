# HOUSE onboarding kit

The version-controlled core needed to bootstrap **HOUSE** work in a **new Claude/Codex account**.
Assembled 2026-08-10.

## Why this folder is small on purpose
Almost all HOUSE knowledge already lives in git — cloning the six repos brings every app's `CLAUDE.md`
and this repo's own `INSIGHTS.md` / HOUSE plans along for free. Per this repo's
[`HOUSE_Doc_Governance_Plan.md`](../HOUSE_Doc_Governance_Plan.md) — **single owner per fact; this repo
points, never restates** — those docs are **not** copied here (a second copy would drift). This folder
carries only the pieces that have **no other home in git**:

| File | What it is |
|---|---|
| `HOUSE_LEDGER.md` | Consolidated machine-global cross-app ledger → install to `~/.claude/CLAUDE.md`. Built 2026-08-10 from the six repo memories: no standalone ledger existed (the `~/.claude/CLAUDE.md` pointer was never created; `~/.codex/AGENTS.md` had been repurposed for unrelated work), so this is that ledger, authoritative going forward. |
| `BOOTSTRAP_PROMPT.md` | Paste-into-the-new-account setup prompt (clone repos, install skills + ledger, operating rules). |
| `skills/conc-kitchen/SKILL.md` | The CONC kitchen/ops reference skill. Skills live in `~/.claude/skills/`, not in any repo — so they're version-controlled here. |
| `skills/production-hub/SKILL.md` | The Production Hub (HTML dashboard) skill. |

A fuller, **self-contained** download bundle (these files **plus** convenience snapshots of every repo's
`CLAUDE.md` and a curated per-app orientation layer) is generated on demand for offline use — ask Claude
to "rebuild the HOUSE onboarding bundle." That zip is a point-in-time export, not a source of truth.

## Where everything else lives (point, don't copy)
- **Cross-HOUSE design wisdom + telos:** [`../INSIGHTS.md`](../INSIGHTS.md) — read before any design pass.
- **Doc governance model:** [`../HOUSE_Doc_Governance_Plan.md`](../HOUSE_Doc_Governance_Plan.md).
- **Current planning snapshot + plan:** [`../HOUSE_ASSESSMENT_2026-07-07.md`](../HOUSE_ASSESSMENT_2026-07-07.md),
  [`../HOUSE_PLAN_OF_ACTION_2026-07-07.md`](../HOUSE_PLAN_OF_ACTION_2026-07-07.md).
- **SharePoint / M365 brief:** [`../HOUSE_SHAREPOINT_IT_BRIEF_2026-07-07.md`](../HOUSE_SHAREPOINT_IT_BRIEF_2026-07-07.md).
- **Per-app memory:** each sibling repo's root `CLAUDE.md` (PROOF uses `AGENTS.md`):
  `conc-kitchen-door` · `conc-kitchen-expo` · `conc-kitchen-hub` · `conc-recipe-hub` · `conc-kitchen-proof`.
- **The machine-global ledger:** `HOUSE_LEDGER.md` in this folder **is** it — install to
  `~/.claude/CLAUDE.md`. (The repo `CLAUDE.md` pointers to a pre-existing `~/.claude/CLAUDE.md` /
  `~/.codex/AGENTS.md` are stale: verified 2026-08-10, no such HOUSE ledger existed — the Claude path was
  never created and the Codex path holds unrelated content — so this consolidation supersedes them.)

## The six repos
`github.com/kennedyjasondavid-eng/` → `conc-kitchen-door` (DOOR), `conc-kitchen-expo` (EXPO),
`conc-kitchen-hub` (HUB), `conc-recipe-hub` (MISE/CODEX), `conc-kitchen-proof` (PROOF),
`conc-kitchen-house` (this umbrella).

Pipeline: **MISE/CODEX → DOOR / EXPO → HUB**, with **PROOF** reporting off the feeds.
