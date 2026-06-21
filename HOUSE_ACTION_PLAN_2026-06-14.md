# HOUSE — Action Plan (agent-reviewed) — 2026-06-14

> **Cross-app status may be stale here — single source of truth is the HOUSE status ledger in `~/.claude/CLAUDE.md` (as of 2026-06-14).** This is a *dated, agent-reviewed* priority/sequencing plan; as items complete, their status moves to the ledger, not here. Per-item **bootstrap prompts** are in `HOUSE_SESSION_HANDOFF_2026-06-14.md` (same folder); the full session narrative is there too.

*Drafted from the 2026-06-14 session's open items, then **adversarially reviewed** (an agent re-fetched every repo, read the consumer feeds + the EXPO guard code, and corrected the draft). Verdict: right on CODEX, but stale on two parallel developments — corrected below.*

---

## State the review verified (the corrections that shape the order)
- **EXPO PR #97 is MERGED** (`origin/main` ≈ `015fc3b`): the Phase-2 site-profile port is on main + live; the branch retirement is now in **soak**, not pending. `origin/expo-phase2-backup-2026-06-13` exists as the safety net.
- **The prepMin backfill (E1) is mid-flight** — `portions`/`servingOz` already moved to EXPO-owned; `prepMin` is on worktree `expo-portac` / branch `phase5-prepmin-backfill` with an **uncommitted `index.html`** + untracked `analyze_port.mjs`.
- **PR #96 (Phase-3A 10b) is open, soaked, reviewed** — ready to merge (the draft missed it).
- **"Zeroed cook times" is library hygiene, NOT a live-cascade fire.** DOOR's `DOOR_RECIPE_DATA.json` carries only `recipeName/category/stream/allergens` (no cook-time fields); EXPO already guards zero-erasure (`_feedEmpty`, merged in #97); HUB is downstream of guarded EXPO. So bad seed reaches **EXPO only, which is guarded** — never DOOR or live HUB. The audit is bigger than zeros, though: ~34 no-cook-time COOK entries, 123 `hotelEquiv==0`, plus *mislabels* (e.g. meatloaf classified stovetop/Bloor but it's oven-baked / sent raw to Rexdale). Needs a legitimately-zero-vs-missing rubric.
- **C3 (CODEX audit) and E1 (EXPO backfill) are INDEPENDENT** — decouple them (the EXPO guard already protects live; the backfill cherry-picked clean seed values).
- **HUB governance Step 5 is already built** (`CONC_Production_Hub.html:3661` — boot-time `hub_schedule_version.json` check exists). Verify+document only.
- **DOOR's XOR default gh-token has 3 fallback sites** (`:9678` default, `:9688` resurrection, `:9690` shared `conc_gh_token`) — a fix must cover all three.

## ⚠️ Immediate housekeeping (before any EXPO worktree work)
1. **Commit / PR / stash the `expo-portac` working tree** (`phase5-prepmin-backfill`) — an uncommitted `index.html` + untracked `analyze_port.mjs` will be **clobbered** by the Phase-2 worktree removal in G4. (Architect WIP — do this yourself or confirm before an agent touches it.)
2. **`LEDGER:` EXPO PR #97 is merged** (Phase-2 port to main; retirement in soak) — the memory says "after merge+soak"; mark it merged.

---

## The plan — tiered + ordered
*Tags: app · effort · risk · gating. Detailed per-item prompt → `HOUSE_SESSION_HANDOFF_2026-06-14.md`.*

### Tier 1 — CODEX batch (ready, context-local, do together)
| # | Item | App | Effort | Risk | Gating |
|---|---|---|---|---|---|
| C1 | Cost-feed loop — CODEX consumes its own published cost (read-only, 3-tier) | CODEX | M | Low | ready |
| C2 | Method-gen CI gate — enforce `tests/method_snapshot.mjs` (pre-commit/CI) | CODEX | S | Low | ready |
| C3 | Library-correctness audit (was "zeroed cook times") — rubric for legitimately-zero vs missing + mislabels; republish, confirm EXPO inert | CODEX | M | Low | ready (hygiene, not a fire) |

### Tier 2 — EXPO in-flight loops (finish what's already moving)
| # | Item | App | Effort | Risk | Gating |
|---|---|---|---|---|---|
| E1 | Finish the prepMin-backfill PR (**commit the live worktree first**) | EXPO | S | Low | ready |
| E2 | Merge PR #96 (Phase-3A 10b) — soaked + reviewed | EXPO | XS | Low | merge-when-ready |

### Tier 3 — decision-gated
| # | Item | App | Effort | Risk | Gating |
|---|---|---|---|---|---|
| D1 | CODEX Stage 3b — advisory adoption (ship FE0+FE1 + the 13-edit packet; defer generative). Decide on **craft value** — the funder argument is retired (PROOF telos re-point). | CODEX | S advisory / XL generative | Low / High | **your decision** |

### Tier 4 — cleanup (verify-first on live apps)
| # | Item | App | Effort | Risk | Gating |
|---|---|---|---|---|---|
| F1 | DOOR XOR default gh-token — remove or gate (all **3** fallback sites) | DOOR | S | Low-Med | your decision (remove vs gate) |
| F2 | CODEX salt-% divergence comment + `COST_BUDGET` retune | CODEX | S | Low | ready |

### Tier 5 — status / governance (cheap; some gated)
| # | Item | App | Effort | Risk | Gating |
|---|---|---|---|---|---|
| G1 | EXPO Phase-2/3 status-truth `LEDGER:` pass | EXPO | XS | None | ready |
| G2 | HUB Step-5 verify + document (already built) | HUB | XS | Low | verify-first |
| G3 | PROOF v1-supersede banner + HOUSE-portal orphan `INSIGHTS.md` (delete gated on your nod) | PROOF, HOUSE-portal | S | Low | ready / your-nod |
| G4 | EXPO Phase-2 branch retirement (archive-tag → delete) — **DESTRUCTIVE, do LAST, never merge** | EXPO | S | Destructive | your go + #96/#97 soak |

### Recommended order
**C1 + C2 + C3** (CODEX batch) → **E1 (commit worktree first!) + E2** → **D1** (your decision) → **F1 + F2** → **G1 + G2 + G3** → **G4 last, on explicit go.**

### Standing rules for every item
- `git fetch` + compare to origin/main before trusting or writing any clone; OneDrive clones own app docs; never write app docs into a home-dir worktree.
- Deploys are Jason-gated. Gate each code step with an adversarial review. Record status changes with `LEDGER:`.
- Verify CODEX/HUB in-browser via DOM/eval (the served file hangs on `document_idle`). The salt-bug iron rule: never write the recipe via a read path. End any escaping/security pass with an empirical `[onerror]` payload scan.

---

## Continuation prompt (copy into a fresh session)

```
Continue the HOUSE remaining-work program (CONC kitchen ops; single-file HTML apps; GitHub Pages; deploys Jason-gated). ORIENT FIRST: read ~/.claude/CLAUDE.md (the HOUSE status ledger + the LEDGER:/WRAP: doc-governance convention), then conc-kitchen-hub/HOUSE_ACTION_PLAN_2026-06-14.md (the agent-reviewed sequenced plan — START HERE), conc-kitchen-hub/HOUSE_SESSION_HANDOFF_2026-06-14.md (per-item bootstrap prompts + session narrative), and the memory index ~/.claude/projects/C--Users-Jason/memory/MEMORY.md. For any repo you act on: git fetch + compare to origin/main before trusting or writing; OneDrive clones are owner-of-record for app docs; never write app docs into a home-dir worktree; record status changes with LEDGER:.

IMMEDIATE (before any EXPO worktree work): the expo-portac worktree (branch phase5-prepmin-backfill) has an UNCOMMITTED index.html + an untracked analyze_port.mjs — commit/PR or stash it before any worktree sweep (clobber risk). Also LEDGER: EXPO PR #97 is merged (Phase-2 port to main + live); the branch retirement is in soak.

Then execute the plan in order:
  CODEX batch [C1 cost-feed loop (read-only consume of own recipe_production.json cost) · C2 method-gen CI gate (enforce tests/method_snapshot.mjs) · C3 library-correctness audit (rubric for legit-zero vs missing cook times + mislabels like meatloaf; republish, confirm EXPO inert — it's hygiene, not a live fire: DOOR feed has no cook-time fields, EXPO already guards zeros)]
  → EXPO in-flight [E1 finish prepMin-backfill PR — commit the worktree FIRST · E2 merge PR #96 / Phase-3A 10b (soaked+reviewed)]
  → D1 CODEX Stage 3b (YOUR DECISION: advisory vs generative — advisory recommended; ship FE0+FE1 + the 13-edit adoption packet (branch codex-authenticity-layer); decide on CRAFT value, the funder argument is retired; FE-P is the deliberate per-dish-generation pivot; any generative injection must be structured/versioned/read-only)
  → cleanup [F1 DOOR XOR default gh-token — all 3 fallback sites :9678/:9688/:9690, remove vs gate is your call · F2 CODEX salt-% comment + COST_BUDGET retune]
  → governance tidy [G1 EXPO Phase-2/3 status-truth LEDGER pass · G2 HUB Step-5 verify+document (already built at CONC_Production_Hub.html:3661) · G3 PROOF v1-supersede banner + HOUSE-portal orphan INSIGHTS.md (delete only with Jason's nod)]
  → G4 EXPO Phase-2 branch retirement (archive-tag → delete; DESTRUCTIVE; do LAST; on explicit go; NEVER merge the branch; backup origin/expo-phase2-backup-2026-06-13 exists).

Per item: gate code steps with an adversarial review; verify CODEX/HUB in-browser via DOM/eval (served file hangs on document_idle); honor the salt-bug iron rule (never write the recipe via a read path); end any escaping/security pass with an empirical [onerror] payload scan. The detailed per-item prompt for each is in HOUSE_SESSION_HANDOFF_2026-06-14.md. Pick the next un-done item from the plan and confirm scope before large changes.
```
