# CONC HACCP — Session Handoff (2026-06-27)

**Purpose.** Full pickup brief for a new session on CONC's HACCP food-safety work. Read this first, then the doc set in §6. It captures both the *state* (what's done, where it lives, what's open) and the *hard-won context* (the non-obvious decisions and footguns that aren't visible from the files alone).

**One-line status.** A complete, voluntary HACCP system is authored and **LIVE on `conc-kitchen-house` main** (10 artifacts incl. an HTML report). The in-app HACCP card in **MISE/`conc-recipe-hub` is built + tested but STAGED** — 6 commits on a feature branch, held for a visual QA before merge/deploy. The published recipe feed is byte-unchanged, so DOOR/EXPO/HUB are unaffected.

---

## 1. The big picture (why this exists)

CONC runs a multi-site **cook-chill** shelter-catering operation (~300 residents, 224 recipes, two kitchens). This HACCP plan is **voluntary** — CONC is legally bound only to pass a standard Ontario (O. Reg. 493/17) inspection. The plan exists to **differentiate CONC in city-contract bids**: to show a funder a kitchen that is documented and controlled *above* the regulatory floor.

**The strategic insight that should drive all future work:** the controls already exist — but only as *instructions* on cook cards (cook temps, two-stage blast-chill, reheat-once, ROP labelling, allergen routing). **What's missing is the *record*** — no probe reading is captured anywhere. The entire high-value roadmap (temperature-capture, Phases A→C) is about turning correct procedures into *provable* records. Prioritize through that lens.

---

## 2. Where everything stands (exact state, fetched 2026-06-27)

### conc-kitchen-house — LIVE
| | |
|---|---|
| `main` = `origin/main` = feature branch | **`1d56489`** (all in sync) |
| Feature branch | `claude/nifty-clarke-wtq7o8` |
| State | **All HACCP work merged to main + deployed to GitHub Pages.** |
| Live report | https://kennedyjasondavid-eng.github.io/conc-kitchen-house/HACCP_REPORT.html |

### conc-recipe-hub (MISE) — STAGED, NOT deployed
| | |
|---|---|
| `origin/main` | **`dd0e733`** |
| Feature branch `claude/nifty-clarke-wtq7o8` | **`a2723f6`** — exactly **6 commits ahead, 0 behind** origin/main (pushed) |
| State | In-app HACCP card built + tested; **held for visual QA** before merge/deploy (Jason-gated). |
| Feed safety | `recipe_production.json` + `DOOR_RECIPE_DATA.json` **byte-unchanged** → DOOR/EXPO/HUB unaffected. |

The 6 staged recipe-hub commits (clean stack on top of origin/main):
```
a2723f6  Add internal-temp target to ground-meat cook step (74C poultry / 71C beef-pork)
2e3aacd  Align HACCP card + decision-tree to architect decisions (ROP <=4C + validated barrier; voluntary)
21e1dc5  CCP decision-tree generator: CCP-3 ROP <3C / Listeria Cat 1   ← message says <3C; SUPERSEDED by 2e3aacd
eb8c81a  Raise fish cook temp 155->158F (70C, Health Canada) per architect; re-baseline
4d6f496  Make HACCP process-class chainType-authoritative; add CCP decision-tree generator
57df5bc  Add HACCP card generation alongside the Cook's Card (card + XLSX sheet)
```

---

## 3. Hard-won context & footguns (read before touching anything)

These are the things that will bite a new session that only reads the files.

1. **The record is the gap, not the procedure.** (See §1.) Don't re-author controls that already exist as instructions; build the capture layer.

2. **s.26 vs s.27 is the intellectual spine.** Only **3 numbers bind** — s.27: cold-hold ≤4 °C, hot-hold ≥60 °C, transit ≤4 °C. **Every other limit** (cooking, cooling, reheating, shelf-life, ROP) is **CONC's own evidence-based standard** adopted under the **s.26(2) performance duty** ("food processed in a manner that makes it safe"). Always phrase non-s.27 limits as *"our validated standard,"* never *"the regulation requires."* This is what keeps the plan honest under audit. Preserve it in any prose you write.

3. **It is VOLUNTARY — and that was a correction.** Standard O. Reg. 493/17 inspection only; **no TPH special-process review for ROP** (architect-confirmed). It's a contract-differentiation asset. Early drafts implied TPH review; do **not** let "TPH will review / requires" language creep back.

4. **ROP = ≤4 °C + validated barrier — a CLOSED decision with a misleading commit trail.** Not <3 °C. A prior pass set <3 °C; it was reverted after the architect's answer. **Footgun:** recipe-hub commit `21e1dc5`'s *message* still says "<3C", and the *next* commit `2e3aacd` corrects it. The net/live state is ≤4 °C+barrier in every doc, the generator, and the model. **Do not "re-tighten" to <3 °C** — that regresses a resolved decision. Validated barrier = **90 °C/10-min cook** *or* formulation (**pH<5.0 / aw<0.97 / salt>3.5%**); use-by **≤7 days** (Listeria Cat 1).

5. **This environment cannot do the regulatory research.** `canada.ca`, `toronto.ca`, `food.gov.uk` → **403 CONNECT** (org-policy egress denial). Per `/root/.ccr/README.md`, 403 = policy denial — **never retry or route around.** That's why validation was delegated to a local browser session (see `HACCP_RESEARCH_PROMPT.md` → `HACCP_REGULATORY_FINDINGS.md`). Any further citation work **must be delegated**, not attempted here.

6. **Single source of truth for the numbers: §4 of `HACCP_HAZARD_ANALYSIS.md`.** §5 (deviations log, 9 items) records *why* each number is what it is. The in-app card, the preliminary summary's CCP table, the report's CCP strip, and the decision-tree generator must all **agree with §4**. Change §4 first, then ripple downstream. If you find a disagreement, §4 wins (unless the architect re-rules — then update §4).

7. **Feed byte-stability is a hard gate.** `recipe_production.json` + `DOOR_RECIPE_DATA.json` must stay byte-identical (`tests/feed_stable_hash.mjs`) or it ripples to DOOR/EXPO/HUB. The HACCP card is render/generation-only and does not touch the feed. The cook-temp changes live in `CONC_Recipe_Data.js` (cook-card seed text) and re-baselined the method snapshot — **they did not alter the published feed.** Keep it that way.

8. **Recipe-hub test invocation:** run **from repo root** — `cd /home/user/conc-recipe-hub && node tests/all.mjs` (many tests use a bare relative `index.html`; from `tests/` you get ENOENT). Last green **41/41**. HACCP has its own gate: `tests/haccp_card.mjs` + `tests/haccp_baseline.json` (300 templates). `method_baseline.json` was re-baselined **twice** (fish, then ground-meat) — those are **intentional**, not drift.

9. **`buildHaccpModel`: chainType is authoritative for process class.** Classifying by recipe *category* alone mis-classed **66 coldPrep dishes** (e.g. Coleslaw → P2/P3). chainType precedence fixed it. **Templates have no chainType**, so the method baseline is unchanged — that's *why* the fix is template-safe. If you touch the classifier, preserve chainType precedence. Mapping: coldPrep/spice→P1, hotSend/rexHandled→P2, stew/beefStew/vegan/pork/bonelessChicken/tofu/meatloaf/fish/rop→P3.

10. **`HACCP_REPORT.html` is now the reference example** of HOUSE house-style applied to a report (dark `#16191d`, green `#4ade80`, amber `#e0a82e` for pending/future, system font, wide-tracked uppercase eyebrows, left-green-border cards, CONC·HOUSE mark). Its difficulty×impact chart is **pure CSS** (absolutely-positioned dots, `left`=x% / `bottom`=y%, `translate(-50%,50%)` centers on the point). **The chart plots OPERATIONAL change** (new daily behaviour asked of staff) **vs. impact — not build effort** (reframed at the architect's request 2026-06-27). Keep that lens if you revise it.

---

## 4. The architect's locked decisions (TPH Q1–Q7 — do not relitigate)

| # | Question | Decision |
|---|---|---|
| Q1 | TPH requirement / review? | **None. Voluntary**, standard inspection only; contract differentiation. |
| Q2 | ROP cold-hold limit? | **≤4 °C + validated barrier** (not <3 °C). |
| Q3 | Barrier validation basis? | **Per-product** — heat (90 °C/10-min) default; formulation where it qualifies. |
| Q4 | Cure / smoke / ferment? | **Not currently — wants to start, and to learn s.34.** (This is the one future regulatory trigger: a manufactured-meat process needs a **binding MOH/PHI-approved written procedure** before service.) |
| Q5 | Continuous data-loggers? | **No — rely on equipment.** So monitoring = **manual probe + record**, not auto-loggers (for now). |
| Q6 | Record retention? | **2 years.** |
| Q7 | PRPs covered? | **Yes, each area** (OH&S etc.). Caveat: food-specific PRPs — **especially thermometer calibration**, on which CCP monitoring depends — should be confirmed *verifiable*, even though owned elsewhere. |

**Cook-temp resolution (the "poultry piece," now done):** `COOK_GROUND` carries **74 °C/165 °F for ground poultry**, 71 °C/160 °F beef-pork, verify-with-probe. Fish raised to **70 °C/158 °F** (Health Canada). CONC's ground-poultry dishes: **Pad Krapow** (Thai Basil Chicken, 55 lb ground chicken) and **Halal Breaded Chicken Burgers**.

---

## 5. The six CCPs (validated limits — quick reference; authority is §4 of the hazard analysis)

| CCP | Step | Critical limit |
|---|---|---|
| 1 — Cooking | COOK | Poultry/mixed/egg ≥**74 °C** · ground beef-pork & whole-muscle ≥**71 °C** (ground poultry **74 °C**) · fish ≥**70 °C** |
| 2 — Cooling | COOL | **60→20 °C ≤2 h, 20→4 °C ≤4 h** (≤6 h total); blast chiller |
| 3 — Chilled/ROP hold + transport | PREP/FRIDGE/SEND | cold ≤**4 °C** [binding] · **ROP ≤4 °C + validated barrier** · use-by **≤7 d** · transit ≤4 °C [binding] |
| 4 — Reheating | HEAT | ≥**74 °C** core within 2 h, **once only** |
| 5 — Hot-hold & service | service | ≥**60 °C**, or time-as-control **≤4 h** then discard |
| 6 — Allergen / anaphylactic | PREP + plate | **Zero cross-contact** to a flagged resident; **100% of anaphylactic plates verified** pre-service (most mature control — already built in DOOR) |

---

## 6. The document set (all LIVE on conc-kitchen-house main)

Read-order top to bottom:

| Doc | Role |
|---|---|
| `HACCP_PRELIMINARY_HAZARD_ANALYSIS.md` | **Read-first** executive summary / living index of the set |
| `HACCP_REPORT.html` | HOUSE-style HTML report — overview, 8 component cards (what/why/roadmap), operational-change × impact chart. *Best viewed in a browser.* |
| `HACCP_PLAN_DRAFT.md` | The spine — Codex preliminary steps 1–5, 3 process flow diagrams, scope/start-end points |
| `HACCP_HAZARD_ANALYSIS.md` | **The analytical core (Principles 1–3). §4 = critical-limit table = single source of truth; §5 = deviations log (the "why" for every number).** |
| `HACCP_MONITORING_RECORDS.md` | Principles 4–7 — monitoring/corrective/verification/records + the temperature-capture schema (`haccp_log.json` shape) |
| `HACCP_RECORDKEEPING_GUIDE.md` | Audit playbook — minimal record set, hazard→CCP→limit→control→monitor→record→fix table, retention (2 yr) + 7-day food sample, auditor checklist |
| `HACCP_CCP_DECISION_TREE.md` | **Generated** per-dish CCP/CP determinations across all 224 live dishes (P3 81 / P2 60 / P1 83; 53 ROP; 23 inferred) |
| `HACCP_REGULATORY_FINDINGS.md` | Cited regulatory ground-truth from the local research session (s.26/s.27/s.34, TPH, Health Canada, FDA, FSA) |
| `HACCP_RESEARCH_PROMPT.md` / `HACCP_NEXT_SESSION_PROMPT.md` | The turnkey research prompt + local-session pickup (because egress is blocked here) |

The decision-tree doc is regenerated by **`conc-recipe-hub/docs/gen_ccp_decision_tree.mjs`** (reads `recipe_production.json` → `buildHaccpModel` → markdown). Regenerate it on any menu/feed change.

---

## 7. Open items & next steps (prioritized; difficulty / impact)

**Quick wins (low effort — do before any bid):**
- **Citation second-pass** — re-verify the quoted regulation text (s.27 numbers, s.34 scope, Toronto Ch.545) via a **local session** (blocked here). The adversarial-verification layer didn't fully finish; this is the one genuinely-open *validation* gap before the plan is leaned on. *Low / Med.*
- **Visual QA the in-app HACCP card**, then (Jason-gated) **merge the 6 recipe-hub commits + deploy.** They're a clean fast-forward (0 behind). *Low / Med.*
- **Confirm an approved Toronto Ch.545 food-handler certification provider** (external). *Low / Low–Med.*

**Worth the lift (the real investments):**
- **Build the temperature-capture layer — Phases A→C** on the existing HUB/DOOR backbone (A: capture → B: publish records → C: pre-service gate). This is the high-impact build — it's what turns the procedures into provable records. Schema already designed in `HACCP_MONITORING_RECORDS.md`. *Med→High / High.*
- **On-site flow verification (Step 5)** — walk Bloor + Rex + one live van run; time-stamp every cool/hold/transport leg. Promotes the plan from "preliminary" to "live." *Med / Med.*

**Deliberate / future:**
- **Classify the 23 inferred-process dishes** (empty logistics metadata) in the decision tree. *Low–Med / Low–Med.*
- **Confirm per-ROP-dish barrier** (90 °C/10-min cook vs formulation) for the 53 ROP items. *Med / Med.*
- **Equipment-under-load check** — confirm the blast chiller hits the 2 h / 6 h targets at full batch size. *Med / Med.*
- **s.34 written procedure** when the architect picks a cure/smoke/ferment item — unlocks a new menu line but needs an **MOH/PHI-approved written procedure first** (the one path that brings real regulatory review). *High / High.*

---

## 8. How to pick up

- **Branch discipline:** develop on `claude/nifty-clarke-wtq7o8` in each repo; push `git push -u origin <branch>` (retry network errors 2/4/8/16 s). **Deploys/merges are Jason-gated.** This session, Jason authorized HOUSE merges to main; the **recipe-hub deploy is NOT yet authorized** (held for the card QA).
- **HOUSE merges** (precedent this session): commit on feature → push → `git checkout main && git merge --ff-only <branch> && git push origin main && git checkout <branch>`. Merging to main publishes to GitHub Pages (~60 s).
- **Recipe-hub tests:** `cd /home/user/conc-recipe-hub && node tests/all.mjs` (from repo root). HACCP gate: `node tests/haccp_card.mjs`. Confirm feed stability with `tests/feed_stable_hash.mjs`.
- **Simulate any date in HUB** (if touching the live board): `window.__HUB_NOW__='YYYY-MM-DD'` then `loadScheduleData()`.
- **Do NOT** create PRs unless asked; **do NOT** retry 403/407 egress denials; **do NOT** re-tighten ROP to <3 °C; **do NOT** reintroduce "TPH reviews this" language.

---

*Handoff frozen 2026-06-27. State verified by git fetch the same day. The HOUSE doc set is the owner of these facts; cross-app status lives in `~/.claude/CLAUDE.md`.*
