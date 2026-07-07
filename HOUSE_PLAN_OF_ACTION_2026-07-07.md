# HOUSE Plan of Action — 2026-07-07

**Status:** ACTIVE — the execution sheet for `HOUSE_ASSESSMENT_2026-07-07.md` (strategy + evidence live there; this doc is stages, slices, gates, and rulings).
**Shape:** seven stages. 0–2 are the near-term working set (0 is a day; 1 and 2 run in parallel as sessions); 3 is IT-clocked; 4 is the standing EXPO queue; 5–6 are the adoption arc; 7 runs slow in the background. One PR per slice unless marked; every slice ends with a receipt.
**Ceremony matched to stakes** (INSIGHTS): food-safety slices get authored-to-fail gates + 2-lens adversarial review; copy/doc slices get a single-skeptic pass; mechanical moves get `git diff --check` and a smoke run.

---

## Operating rules (bind every stage)

1. **Capture before features** — un-captured `LOG.xlsx` days never come back.
2. **Trust surfaces before new users** — Stage 5 does not start until Stage 1 = zero.
3. **Adoption beats engineering** — no new engine work outside Stage 4's already-ruled queue until Stage 5 has begun.
4. **$0 external spend**, every stage.
5. **Nothing lands unmerged** — build → review → merge → deploy, or close with a receipt; any branch idle >2 weeks gets merged or closed.
6. **Deliberate re-blesses only** — any baseline/feed-hash change ships with an enumerated delta list in the commit.

## Do-not-touch registry (for the duration of this plan)

- **Never run** the archived HUB builder pipeline (`archive/CONC_Hub_Builder*`) — it wipes the live feed.
- **No DOOR-side publish** (`publishToGitHub` from the app) until Slice 2.1 lands — it clobbers menu v31.
- **No hand-edits** to `hub_schedule.json` except emergency hot-fix (then fix EXPO).
- **Parked by design:** J7c-5 Lansdowne ruling, D-MS1 multi-site, the DOOR→EXPO special-meal pipe, the kernel evaluator refactor, EXPO Stage-5 hosting work. Triggers are named in the assessment §6.
- **No new funder-shaped columns** in the Tier-2 workbooks (PROOF governance).

---

## Stage 0 — Send the ask + zero-cost switches
*~1 day of Jason time. Starts the IT clock; everything else proceeds in parallel.*

| Slice | Action | Done when |
|---|---|---|
| 0.1 | **Send the IT package** — email `SHAREPOINT_IT_ASK.docx`, link the brief; ask for a named contact + a 30-min walkthrough slot | Email sent; contact named; meeting booked |
| 0.2 | **Verify/enable EXPO branch protection** on `main` requiring the 4 checks (`schedule-neutrality` · `determinism` · `ledger-spine` · `verb-gates`) | Settings show protection on; a test PR displays required checks |
| 0.3 | **Rule fork F0** (registry honesty — below) and apply the 5-minute consequence (stale stamp or resume decision) | Ruling recorded here; stamp visible on the artifact or resumption scheduled into Stage 5 |
| 0.4 | **Merge PR #4** (the SharePoint brief + assessment + this plan) so the handout URL goes live on Pages | PR merged; `…/SHAREPOINT_IT_BRIEF.html` serves |

**Advance gate:** none — Stages 1, 2, 4 may start immediately. 0.1 is the only clock that matters.

---

## Stage 1 — Food-safety zero
*Sessions; 5 slices across DOOR / EXPO / MISE. Highest ceremony: authored-to-fail gate → build → 2-lens review → merged green. This stage gates Stage 5.*

| Slice | Repo | Work | Gate contract |
|---|---|---|---|
| 1.1 | DOOR | **C1 CRITICAL:** anaphylaxis ALERT banner must read the compliance enforcer, not `r.tags` — today it can name the wrong allergen or omit the lethal one | New door-smoke tests: banner names exactly the enforcer's allergen set on a seeded GF/anaph mismatch fixture; authored-to-fail first |
| 1.2 | DOOR | **NEW-1 HIGH:** published `registry_summary.json` special-diet headcounts derive from live restriction data, not the frozen routing label (today they can publish 0) | Test: seeded diabetic/noDairy/GF residents → nonzero published counts; publish path smoke |
| 1.3 | DOOR | **v31 allergen sign-off:** run `menu_v31_allergen_VERIFY.md` checklist end-to-end, record confirmations, flip DRAFT→confirmed; define the W1 MON halal option (fork F1) | Checklist file shows all rows signed; menu carries the ruled halal slot; EXPO decomposer emits the halal cook (EXPO-side smoke) |
| 1.4 | EXPO | **The 2 hot-send stragglers** (Chicken Fajitas W1 SAT, Halal al pastor W4 TUE): instrument the cold-chain block in `generateSendRows`, root-cause the pass-ordering escape, fix | Bagged-hot-send anomaly class 2 → **0**; `ux_diff` re-blessed with exactly the enumerated send-row deltas; full verb-gates green |
| 1.5 | MISE | **`HACCP_BAG_LABEL`** "2 weeks" → the locked ≤7-day ROP language in `CONC_Recipe_Data.js` | `haccp_card` gate green; **check `feed_stable_hash`** — if the string reaches the published feed, fold this into Slice 2.3's deliberate republish instead of re-blessing twice |

**Advance gate (→ Stage 5):** all five merged green on their `main`s; assessment risk #3 reads zero.

---

## Stage 2 — Truth restoration
*Sessions; parallel with Stage 1. Makes every published artifact honest again.*

| Slice | Repo | Work | Gate contract |
|---|---|---|---|
| 2.1 | DOOR | **Defuse the v31 landmine** per fork F2 ruling — make DOOR's app state agree with the in-repo v31 menu | A dry-run of `buildMenuJSON` produces v31-equivalent output (or a deliberate version increment); door-smoke addition pinning `_meta.version` ≥ 31 on any future publish |
| 2.2 | DOOR | Apply the F0 registry ruling's durable half (stale-stamp in `_meta`, or a resumption checklist for Stage 5) | Downstream consumers can see data age without archaeology |
| 2.3 | MISE | **Republish the feed:** regenerate `recipe_production.json` + `DOOR_RECIPE_DATA.json` (+ meta sidecars) with an honest `generated` stamp; deliberate `feed_stable_hash` re-bless with enumerated deltas (HACCP temps, cook-temp corrections, 1.5's label) | `feed_validator` green; DOOR/EXPO consumer smoke green; commit lists every changed recipe field class |
| 2.4 | MISE | **Merge-or-retire the stranded work** per fork F3: U15 stack, Stage-3b authenticity layer (push it to origin *first*, whatever the disposition), July-7 landing-UX plan | Each branch either merged green or closed with a one-paragraph receipt; nothing unpushed anywhere |
| 2.5 | all | **Hygiene batch** (one mechanical PR per repo, low ceremony): EXPO — move the ~73 reno-historical docs to `docs/archive/`, slim CLAUDE.md's Recent to pointers; MISE — refresh `NEXT_SESSION.md`/`CODEX_ROADMAP.md` to current reality; HUB — fix the README `_cycleStart` example, add a **minimal smoke test** (~10 assertions: schedule shape, `_meta` keys, date projection, anchor) + CI job; refresh stale local `main` refs everywhere | Each repo's pickup doc describes its actual current thread; HUB has its first CI check |

**Advance gate:** none (2.x slices are independent); 2.1 lifts the DOOR-publish do-not-touch.

---

## Stage 3 — SharePoint ignition
*IT-clocked. Starts the day IT delivers Stage-1 of the brief; slices in order.*

| Slice | Action | Done when |
|---|---|---|
| 3.1 | **Library standup day** (with IT): folders + permission groups + retention labels + version history per `conc-kitchen-proof/SHAREPOINT_SETUP_CHECKLIST.md`; **stand up `LOG.xlsx` the same day** and run the day-one smoke (test row → PROOF R2 reads it → delete) | First **real** LOG row captured — the forward-only clock stops losing days |
| 3.2 | Seed `CREW.xlsx` (current certs/training) + `LEDGER.xlsx` (current-month capture only, no backfill); confirm the named owner + named weekly hour per book | All three books live in `Active/`; owners recorded in PROOF `GOVERNANCE.md` |
| 3.3 | OneDrive sync of `PROOF Tier-2/Active` + `Kitchen Ops/` on the named kitchen machines; DOOR/EXPO manual exports start landing there | A DOOR compliance export and an EXPO order sheet exist on the shared drive |
| 3.4 | **Client ID received** → enter in CODEX Settings, run `docs/CODEX_U13_LIVE_SHAREPOINT_SMOKE_PLAN_2026-06-20.md`; enter in HUB SharePoint Sync settings | CODEX review-queue live round-trip passes; HUB site-profile sync exercised once |
| 3.5 | **First PROOF month-end close** (first calendar close after 3.2): load closeout copies → review flags → fix sources → rerun → archive PDFs + copies to `Closeouts/`/`Outputs/` | The close ran end-to-end; artifacts archived; it's on the calendar as a rhythm |

**Contingency:** if IT hasn't responded in 2 weeks → resend the docx to the director-level sponsor; Stages 1/2/4 are unaffected.

---

## Stage 4 — EXPO soak-1 build (the standing engineering queue)
*Already planned and ruled — this plan just slots it. Authority: `conc-kitchen-expo/EXPO_SOAK1_BUILD_PLAN_2026-07-06.md` (Stages A–F, forks F1–F8 ruled, one PR per stage, authored-to-fail → build → scaled adversarial review → full green, merged-green advance gate).*

- Begin with **Stage A** (T0/P0 probes + G1 copy honesty + M1 relocate-supersede + V1 serve-anchor) — unblocked today.
- **T0's bucket table goes to Jason** to gate the F1 (a)-vs-(b) escalation before Stage B, exactly as the build plan specifies.
- Rule: **no other EXPO feature work** until Stage F ships; soak feedback from Stage 5 files into the *next* plan, not this one.

**Advance gate:** per the EXPO build plan's own cadence.

---

## Stage 5 — Second operator (the adoption pilot)
*Gated on Stage 1 = zero. The single highest-leverage stage in this plan.*

| Slice | Action | Done when |
|---|---|---|
| 5.1 | Rule fork F4 (person + surface). Write the **one-page quick card** for that surface (Quick_Guide style) | Named person, named surface, card printed |
| 5.2 | **One-shift training**, side by side | Operator performs the core loop unassisted by end of shift |
| 5.3 | **Two-week observed soak**: operator drives; every stumble goes in a friction log (this is the real answer-source for J4 dialog friction, copy gaps, occasion vocabulary) | ≥10 shifts of real use; friction log has dated entries |
| 5.4 | **Fold-back session**: fix the top frictions (copy first, mechanics second), receipts per fix; unfixed items ticketed into the relevant repo's plan | Operator completes a full week unassisted; friction log items all dispositioned |
| 5.5 | Second surface / second person (DOOR intake if 5.1 chose HUB, or vice versa) — repeat 5.2–5.4; **this is where the F0 registry resumption lands** if ruled | Registry publishing is live again with a non-Jason author |

**Advance gate (→ Stage 7 adoption declaration):** two people, two surfaces, unassisted weeks on both.

---

## Stage 6 — HACCP record capture (Phases A→C)
*"The record is the gap, not the procedure." Starts once Stage 5 has an operator rhythm to capture from; pairs with Stage 3's governed home for records.*

| Slice | Action |
|---|---|
| 6.1 | Design pass: the temperature-capture surface on the HUB/DOOR backbone (`haccp_log.json` schema already specified in `HACCP_MONITORING_RECORDS.md`); plan-review per house cadence |
| 6.2 | Build Phase A (manual probe entry at the named CCPs → durable log), then B/C per the HACCP session handoff |
| 6.3 | On-site flow verification (HACCP Step 5) + confirm the food-handler cert provider (the two quick wins from the handoff) |

**Done when:** a week of real temperature records exists and a seeded deviation shows up in the deviations log.

---

## Stage 7 — Org ownership (background track; months)
*Runs slowly behind everything; sequenced by the SharePoint IT brief's Stages 3–5.*

| Slice | Action |
|---|---|
| 7.1 | **Succession doc** (`HOUSE_CONTINUITY.md`): accounts, tokens, deploy paths, publish channels, "if the maker is unavailable" runbook — write it *now*, it costs an afternoon |
| 7.2 | **Org GitHub organization**: create, mirror the six repos, then cut over per fork F5 — Pages URL changes ripple through every `DATA_SOURCES`/`DOOR_BASE`/`RECIPE_HUB_BASE` constant, so each consumer flips in one reviewed change set |
| 7.3 | **SharePoint Stage 3** (Graph-backed state at DOOR's three seams first, then EXPO snapshots) and **Stage 4** (SSO; retire pasted tokens + the portal PIN; overrides signed by real names) |
| 7.4 | **Hosting move** (brief Stage 5) — last, with IT's chosen target |
| 7.5 | **Formal adoption**: the "HOUSE is the kitchen system" declaration + training — only after Stage 5's advance gate |

---

## Forks for Jason (rule when the stage arrives; leans marked)

| Fork | Question | Options | Lean |
|---|---|---|---|
| **F0** (Stage 0) | DOOR registry: resume or stamp stale? | (a) resume daily use at Rexdale now · (b) stamp artifacts "as of 2026-06-10", resume at Stage 5.5 | **(b)** — honest immediately; resumption belongs with a trained operator |
| **F1** (Slice 1.3) | W1 MON "Fully Loaded Sausage" halal option — a kitchen fact only you can rule | name the halal alternative · or mark the slot no-halal-by-design | needs your call |
| **F2** (Slice 2.1) | v31 defuse path | (a) seed `concUploadedMenu` with v31 (fast stopgap) · (b) update baked `MENU_DATA` (durable) | **(b)**, with (a) same-day if a DOOR session is imminent |
| **F3** (Slice 2.4) | Stranded MISE work dispositions | per branch: merge / park-with-receipt / close | **merge U15** (already reviewed) · **push + park Stage-3b** with a decision note · **review landing-UX plan** next MISE session |
| **F4** (Slice 5.1) | First operator surface | (a) HUB day-notes (lowest stakes) · (b) DOOR intake (highest value) | **(a) then (b)** — confidence first, value second |
| **F5** (Slice 7.2) | Org GitHub migration shape | big-bang transfer · mirror-then-cutover per consumer | **mirror-then-cutover** — the URL constants make big-bang risky |

---

## The first 30 days, concretely

- **Week 1:** Stage 0 complete (ask sent, protection verified, F0 ruled, PR #4 merged). Start 1.1 (DOOR C1) and 2.1 (v31 defuse) as the first two sessions. Start EXPO Stage A.
- **Weeks 2–3:** finish Stage 1 slices (1.2–1.5) and Stage 2 slices (2.2–2.4). EXPO Stage A merged; T0 table to Jason; Stage B begins. If IT has moved: Slice 3.1 standup day — **LOG.xlsx live**.
- **Week 4:** hygiene batch (2.5). Rule F4; write the quick card (5.1). If books are live: seed CREW/LEDGER (3.2–3.3). Month-end → first PROOF close (3.5) if the calendar allows, else next month-end.
- **Exit state at day 30:** IT engaged, LOG capturing (or escalated), food-safety debt zero, every published artifact honest, EXPO soak-1 through Stage A–B, a named second operator with a training date.

---

## Receipts

Each completed slice appends one line here (date · slice · PR/commit · gate result). Stage advances are recorded with their gate evidence. When all stages close, this doc gets a WRAP note and freezes like its predecessors.

| Date | Slice | Receipt |
|---|---|---|
| 2026-07-07 | plan | Authored; companion to `HOUSE_ASSESSMENT_2026-07-07.md`; rides PR #4 |
