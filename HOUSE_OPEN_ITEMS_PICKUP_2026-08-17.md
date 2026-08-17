# HOUSE — open-items pickup (2026-08-17)

**What this is.** A dated **router** for the open work across the six HOUSE repos, for a fresh session. It **points to each item's authoritative doc/issue — it does not restate them** (single-owner-per-fact; a copied fix-list goes stale the moment the owning doc moves). Read the pointer for the real detail; this file only orients and triages.

**Frozen snapshot.** Items resolve and plans move. The pointed-to docs + **GitHub issues are the live truth** — re-verify status before acting. Cross-app CLAUDE.md banners may be stale, and no machine-global `~/.claude/CLAUDE.md` status ledger is present in a cloud container, so the in-repo `CLAUDE.md` files plus this router are the orientation.

**How to use.** Pick **one** item (or take Jason's direction). These span four repos and several are blocked on a Jason ruling — this is a menu, not a linear task. Start from the item's pointer, not from memory.

---

## Conventions (apply to everything below)

- **Repos** (all at `/home/user/<repo>`, all on branch `claude/house-repos-code-sweep-1lf1jv`): `conc-kitchen-house` (umbrella/governance) · `conc-kitchen-door` (DOOR — menu + resident source, upstream) · `conc-kitchen-expo` (EXPO — scheduler) · `conc-kitchen-hub` (HUB — staff board) · `conc-recipe-hub` (MISE/CODEX — recipe/allergen/cost feed) · `conc-kitchen-proof` (PROOF — reporting). Pipeline: MISE/CODEX → DOOR/EXPO → HUB.
- **Visibility / CI cost:** house + DOOR are **public** (free CI); EXPO, HUB, MISE, PROOF are **private** (billable gate runs; public Pages except PROOF, which has none). A docs-only PR to a private repo still bills a gate run — EXPO/PROOF gates download Chromium (heavy), MISE's is plain-Node (cheap). Be frugal; bundle trivial doc changes into substantive PRs.
- **PRs:** create as **draft**; **Jason flips ready + merges — never merge on his behalf.** After a merge, restart that repo's branch from fresh `origin/main` (`git fetch origin main && git checkout -B claude/house-repos-code-sweep-1lf1jv origin/main && git push -u origin … --force-with-lease`). Subscribe to PR activity, watch CI to green, drive-to-green on your own PRs.
- **Commit trailers:** `Co-Authored-By: Claude <noreply@anthropic.com>` + a `Claude-Session:` line; Claude Code footer on PR bodies. **Never** put a model identifier in a pushed artifact.
- **Single-file HTML is non-negotiable** in every app (no build/npm/frameworks). **Retired, never re-propose:** in-file modularization, IIFE/namespaces, section banners, standalone design tokens.
- **Proven-seams registry:** `HOUSE_PROVEN_SEAMS.md` (this repo) — problem class → hardened implementation → who lacks it. Touching one of those classes: **port the seam, cite the row.** Verifier `node tests/proven_seams_gate.mjs` (git mode 29/29; weekly cron). The per-app pointer rollout is complete (all five apps).

**State as of 2026-08-17:** the proven-seams registry + a CI-minutes cost pass just fully landed (EXPO `schedule-gate` #239 + PROOF `proof-gates` #14 now cache Chromium + cancel superseded runs; caches warm). Nothing from that line is outstanding. All six branches are clean at `origin/main` except HUB (intentionally left behind — realigns on its next touch).

---

## A — Buildable now (has a plan + a verification path; no ruling needed)

### A1 · DOOR #63 — veg-alt allergen lookup drops PEANUT/TREE-NUT advisories (FOOD-SAFETY)
→ **`conc-kitchen-door` issue #63** (full mechanism, the 3 fix options, the measured 2-slot table).
`getVegAltAllergenStr` (DOOR `index.html`) can match a veg slot's vegan *side* and miss the veg *main*, dropping the main's peanut/tree-nut advisory on 2 slots (Wk2 MON, Wk4 SAT dinner). **Latent** — only manifests when DOOR next regenerates `routing_by_meal.json`; land the fix **before** that republish. Preferred fix (issue opt 1): union the partial lookup with the main-meal fallback as an allergen **floor** (never replace). The anaphylactic routing lockout and the No-Egg `_vegAltSafe` net are **separate and unaffected** — what degrades is the advisory string. **Verify:** from `conc-recipe-hub` with a sibling DOOR checkout, `node tests/door_vegalt_safety_gate.mjs` (2 slots retain the warning; 0 `_vegAltSafe` transitions, anchor 84/84). This is an `index.html` code fix (guarded by `door-smoke`), not a menu-data edit. **The readiest food-safety build — recommended first.**

### A2 · Silent-drift remediation — open D/E/X slices (adjacent, trust/food-safety class)
→ **`conc-kitchen-hub/HOUSE_SILENT_DRIFT_ACTION_PLAN_2026-07-27.md` §10** (owner) + `HOUSE_SILENT_DRIFT_HANDOFF_2026-07-27.md` (pickup). All forks ruled. Still open: O1 (Jason's republish — his hands), D1–D6, E1–E6, H2–H4, X2–X4. Highest-value buildable slice = **D1**: DOOR publishes one artifact set as 10 per-file commits (`_ghPushFileNow`), so 9 of 10 CI runs per publish evaluate partial sets — fix = port EXPO's `pushFilesToGitHubAtomic` (one atomic commit). **D1 *is* proven-seams `HOUSE_PROVEN_SEAMS.md` row 5's named DOOR gap — cite the row.** Read the plan §10 slice list before starting; several E- (EXPO) and X- slices are independent.

---

## B — Needs a Jason ruling / authorization before build (surface the option, don't build)

### B1 · EXPO baseline-promotion — forks RULED, buildable from the plan (readiest EXPO line)
→ **`conc-kitchen-expo/EXPO_BASELINE_PROMOTION_NEXT_SESSION_PROMPT_2026-08-07.md`** → plan `EXPO_BASELINE_PROMOTION_MYCHANGES_CALM_WIZARD_ACTION_PLAN_2026-08-07.md` §10. A1a is built; A1b→A2→A3→A4, Stage B, Stage C pending; forks ruled ("follow the leans"). ⚠ **Drive the known-red census/fixture gates in §10 GREEN first.** This needs execution from the plan, not a fresh ruling.

### B2 · Option B — the CODEX-promotion north star (CROSS-APP EXPO+MISE; build-GATED)
→ **`conc-kitchen-expo/EXPO_NEW_DISH_PROMOTION_NEXT_SESSION_PROMPT_2026-08-10.md`** (+ EXPO plan §14 binding corrections; MISE north star in `conc-recipe-hub/CLAUDE.md`). The New Dishes panel becomes an on-ramp promoting a device-local fact UP into CODEX's publish flow (**reviewed handoff, not a direct write**). Ruled the goal, **but** the device-local disposition ("A") must **soak first** and CODEX ingest is C9-gated. **Do not build without Jason confirming it's time.** Locked: EXPO promotion carries production facts; DOOR's allergen fact is a **separate architect-authored CODEX step** (never auto-derived — food safety); exclude `_userClassifications`.

### B3 · MISE costing C8/C9 + plant-forward Tier 2/3/4 (need authorization / rulings)
→ `conc-recipe-hub/CLAUDE.md` "Recent Changes"; `docs/CODEX_COSTING_PROGRAM_PICKUP_HANDOFF_2026-07-16.md`; `docs/PLANT_FORWARD_UPLIFT_FULL_PLAN_2026-07-18.md`. Costing is live through PR #67; **C8** (local-engine switch/soak) and **C9** (public-feed migration) each need **explicit authorization**; supplier-price acceptance + unresolved canonical alternatives + 4 source-blank units need curator/source authority. Plant-forward ingredient-verified flips are exhausted; **Tier 2/3/4 each need a Jason ruling** (Tier 4 gated on a PROOF-denominator ruling).

### B4 · EXPO S5b — PARKED / OVERTAKEN (do not assume it's the priority)
→ `conc-kitchen-expo/EXPO_SCHEDULER_REFINEMENT_S5B_IMPLEMENTATION_PLAN_2026-07-17.md`. Reviewed and "awaiting §10 acceptance" on 2026-07-17, but **~6 weeks of newer EXPO work landed since without it** (baseline-promotion, New-Dishes consolidation, Nigerian/Blackened corrections). Treat as **dormant**; confirm with Jason it's still wanted before reviving. Its §10 acceptance is a hard gate — no S5b build until he explicitly accepts.

---

## C — Jason's operational hands (a session can scope, not decide)

### C1 · DOOR #78 — W1 MON lunch has no halal option (pork main, no `lunch_halal` slot)
→ **`conc-kitchen-door` issue #78** (candidate dish, downstream behavior). Halal residents have no W1 MON lunch dish. Durable fix = add a halal option **in DOOR's menu editor** then publish (candidate: Halal Beef Sausages; dish choice is the architect's). ⚠ **Publish-reverts-hand-edits:** editing committed `menu_current.json` alone is **not** durable — the next publish regenerates from app-state and reverts it; the editor is the authority. EXPO auto-picks-up on the next menu resync (the menu-driven `purchased_positive_cook_gate` starts expecting + verifying the row; no EXPO change needed in advance). **A session can confirm the candidate/scope; the ruling + editor action are Jason's.**

---

## D — Ruled; no action unless Jason revisits

### D1 · HUB freshness = detect-only (RULED 2026-07-27)
→ `conc-kitchen-hub/CLAUDE.md` (freshness contract) + `HOUSE_SILENT_DRIFT_ACTION_PLAN_2026-07-27.md`. HUB compares its served menu to DOOR's live menu slot-by-slot and banners drift, but clearing it requires an **EXPO republish** (Menu & Board → Review DOOR menu → Apply), **not** auto-remediation. A ruled posture, not open work — revisit only if Jason wants to move beyond detect-only. (DOOR's menu `_meta.version` is a hand-maintained **schema constant**, not a data revision, and **not monotonic** — never order-compare it; HUB compares **content** for exactly this reason.)

---

## Recommended first move

If Jason hasn't directed a specific item: lead with **A1 (DOOR #63)** — food-safety, fully buildable, has a reproduction harness, closes a real advisory-warning regression before DOOR's next routing republish. **B1 (EXPO baseline-promotion §10)** is the readiest larger line if he wants EXPO progress. Everything in Bucket B/C waits on his ruling or his hands — present the option, don't build unprompted.

## Cross-cutting footguns (carry these regardless of item)

- **Publish-reverts-hand-edits** (DOOR + EXPO): durable authority is app-state / the menu editor, not committed JSON. A committed-JSON menu edit reverts on the next publish.
- **`_meta.version` is a per-artifact SCHEMA constant** — not monotonic, not a data revision. Never order-compare; compare **content**.
- **Food-safety nets are layered and independent:** the anaphylactic routing lockout is separate from advisory allergen strings and from the No-Egg `_vegAltSafe` net — never conflate or assume one covers another.
- **Verify cross-app claims against the other repo** before acting (CLAUDE.md banners may be stale; no machine-global ledger in this container).
