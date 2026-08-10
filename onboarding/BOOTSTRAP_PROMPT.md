# BOOTSTRAP PROMPT — paste into the new work account's first session

> Copy everything in the fenced block below into your first message on the new Claude account (after
> you've made this bundle's files available to that session — e.g. uploaded the zip, or copied the
> folders into your working directory). It orients the new "you," installs the two skills and the
> machine-global memory, and states the operating rules. Adjust the paths in **[brackets]** to match
> where you put things.

```
You are picking up my CONC "HOUSE" kitchen-operations work on a fresh account. HOUSE is CONC's
unified shelter-catering ops system: six repos, five apps + an umbrella. The pipeline is
MISE/CODEX → DOOR / EXPO → HUB, with PROOF reporting off the published feeds. DOOR is upstream
(resident registry + the menu source); EXPO is the scheduler; HUB renders EXPO's schedule for
staff; MISE/CODEX is the recipe/allergen/cost library that feeds DOOR + EXPO; PROOF reads the feeds
for board/funder reporting; conc-kitchen-house is the umbrella that owns the shared knowledge docs.

Please do the following setup, then confirm each step:

1. CLONE the six repos (mine, on GitHub under kennedyjasondavid-eng):
   - conc-kitchen-door      (DOOR)
   - conc-kitchen-expo      (EXPO)
   - conc-kitchen-hub       (HUB)
   - conc-recipe-hub        (MISE/CODEX)
   - conc-kitchen-proof     (PROOF)
   - conc-kitchen-house     (HOUSE umbrella)
   Each repo's CLAUDE.md (PROOF uses AGENTS.md) auto-loads from the repo root — that's the per-app memory.

2. INSTALL the two CONC skills so they're always available (they do NOT live in any repo):
   - copy [bundle]/skills/conc-kitchen/SKILL.md      -> ~/.claude/skills/conc-kitchen/SKILL.md
   - copy [bundle]/skills/production-hub/SKILL.md    -> ~/.claude/skills/production-hub/SKILL.md
   Verify they're loadable (they should show up as /conc-kitchen and /production-hub, or in the skills list).

3. INSTALL the machine-global HOUSE ledger — the single source of truth for CROSS-APP facts
   (versions, phases, schema seams), which the repo CLAUDE.md files all point to:
   - copy [bundle]/memory/HOUSE_LEDGER_STARTER.md    -> ~/.claude/CLAUDE.md
   NOTE: that starter is a RECONSTRUCTION. If I hand you my real ~/.claude/CLAUDE.md from my personal
   machine, use that instead — it's authoritative and current.

4. READ, in this order: ~/.claude/CLAUDE.md  →  conc-kitchen-house/INSIGHTS.md  →
   conc-kitchen-house/HOUSE_ASSESSMENT_2026-07-07.md + HOUSE_PLAN_OF_ACTION_2026-07-07.md  →
   the CLAUDE.md of whatever app the task touches. Use the conc-kitchen skill for kitchen/ops facts and
   the production-hub skill for the HTML dashboard.

Operating rules that hold across every app (do not violate without asking me):
- Single-file HTML is non-negotiable — no build tools, no npm, no frameworks; every app degrades from file://.
- The served single file is the source of truth and is edited directly (HUB's Hub-Builder pipeline and
  EXPO's reno/reno_rex modes are DEPRECATED — do not regenerate from them).
- Architect-controlled data (menus, RECIPE_DB, routing tables, seed recipes) changes only when I change it.
- Deploys and merges are MINE to gate. Deterministic rendering: same data → same display.
- The gotcha that has bitten HOUSE more than once: a feed's `_meta.version` is a hand-maintained SCHEMA
  constant, NOT a data revision, and it is NOT monotonic — never order-compare it; compare menu CONTENT.
- Standard is the only live operating mode; the menu cycle anchor is _cycleStart = 2026-06-07 (Week 1).

When you're set up, give me a one-line status per repo (branch + whether it's current with origin/main),
confirm both skills load and ~/.claude/CLAUDE.md is in place, and tell me what you'd like to work on first.
```

## Notes on how Claude Code loads these (so placement is right)
- **Repo-root `CLAUDE.md` / `AGENTS.md`** auto-loads when you work inside that repo — nothing to install,
  it comes with the clone.
- **`~/.claude/CLAUDE.md`** is the *user-global* memory, loaded in every session regardless of repo. That's
  where the machine-global HOUSE ledger belongs.
- **Skills** live at `~/.claude/skills/<name>/SKILL.md`. On a managed **work** account, your admin may
  route skills through the account's skill settings instead of the home dir — if the file-copy doesn't make
  them appear, add them via the account's skill/plugin management using the same `SKILL.md` contents.
- If the work account is Claude Code **on the web**, you clone via the repo picker rather than `git clone`;
  the effect (repo-root CLAUDE.md auto-loads) is the same.
