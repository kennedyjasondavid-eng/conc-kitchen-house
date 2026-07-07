# HOUSE Assessment & Roadmap — 2026-07-07

**Status:** Current HOUSE-wide planning snapshot. Re-baselines and supersedes `HOUSE_ACTION_PLAN_2026-06-14.md` (whose Tier-1 items were partly landed, partly overtaken by the HACCP and SharePoint arcs that were not in it).
**Method:** full sweep of all six repos on 2026-07-07 — git history and publish cadences, live artifacts (`hub_schedule.json`, `recipe_production.json`, `registry_summary.json`, `snapshots/`), the active plan/roadmap/next-session docs in each repo, and the vision owners (`INSIGHTS.md`, `EXPO_KERNEL_VISION.md`, PROOF `VISION.md`).
**Companions:** `HOUSE_SHAREPOINT_IT_BRIEF_2026-07-07.md` (the IT ask this assessment leans on) · the HACCP set · per-app roadmap docs.

---

## 1. The headline

**HOUSE's engineering maturity has far outrun its operational adoption — and the highest-value work right now is closing that gap, not building more engine.**

The build quality is, frankly, exceptional for a zero-budget nonprofit stack: ~72 CI-gated regression tests in EXPO alone (4 required checks), ~248 assertions in PROOF, 55 in DOOR, deterministic engines, adversarial review culture, provenance stamps on every artifact, and a coherent cross-app data cascade where staff enter a fact once and everything downstream regenerates.

But the usage picture on 2026-07-07 is:

- **One live, daily-consumed surface** — HUB (schedule republished multiple times a day, most recently today).
- **One operator** — every save-snapshot, every ledger Decision, every fork ruling, every deploy is Jason.
- **A reporting instrument built and idle** — PROOF complete since June 18, dormant since June 21, waiting on three SharePoint workbooks that don't exist yet. Its incident log is forward-only: every un-captured week is permanently lost reporting history.
- **A registry gone cold** — DOOR's resident-registry artifacts last published June 10–11 (~4 weeks stale); menu authoring has moved to git, bypassing the app.
- **A recipe feed 2 months stale** — `recipe_production.json` still says `generated 2026-05-08` while the recipes themselves gained HACCP data and cook-temp corrections (deliberately feed-byte-stable, but the gap is real).
- **EXPO in first-contact soak** — the first genuine real-use sessions were July 5–6 (41–88 live Decisions); the next engineering arc (soak-1 Stages A–F) is fully planned and ruled with zero lines built.

The system's own telos names the destination: *"The system becomes invisible to the operation. People run the kitchen; the proof shows up. That is complete."* Today the system is invisible in the wrong sense — invisible to everyone except its maker. INSIGHTS.md itself names the structural risk: *"the lone maker is the current efficient cause and the bottleneck the vision is dissolving."*

---

## 2. State of each app

| App | State | Live evidence (2026-07-07) | Posture |
|---|---|---|---|
| **HUB** | 🟢 Live daily | Schedule republished ~1–7×/day; last publish today; `_cycleStart` anchor fix holding since 6/29 | The living surface — protect it |
| **EXPO** | 🟢 Active, soaking | First real-use soak 7/5–7/6; soak-1 Stages A–F planned + forks ruled, nothing built | The active engineering front |
| **DOOR** | 🟡 Dormant-with-landmines | Registry publish stopped ~6/10; app still holds OLD menu (v31 clobber risk); allergen flags DRAFT; C1/NEW-1 diagnostics unsigned | Needs a deliberate "resume or mark stale" decision |
| **MISE/CODEX** | 🟡 Rich, part-stranded | HACCP arc live; feed header 5/8; U15 + Stage-3b + landing-UX all unmerged/undeployed; pickup docs stale | Needs a merge-or-retire pass + feed republish |
| **PROOF** | 🟡 Complete, idle | R1–R5 shipped + gated 6/18; zero activity since 6/21; blocked solely on the SharePoint books | Needs Stage 1 of the IT ask — nothing else |
| **HOUSE/portal** | 🟢 Current | HACCP set live; SharePoint IT brief authored 7/7 (PR #4) | The governance seat |

### Per-app notes beyond the table

**DOOR** carries the system's most serious open items despite being the quietest repo:
- **The v31 landmine:** `menu_current.json` v31 was authored in-repo; DOOR's app state (`concUploadedMenu` → baked `MENU_DATA`) still holds the OLD menu. One accidental in-app republish silently reverts the live menu the whole pipeline gates on. Fix is small (seed the upload or update the baked table) and overdue.
- **Food-safety diagnostics awaiting sign-off** (`KNOWN_VS_SHOWN_FINDINGS.md`): C1 CRITICAL — the anaphylaxis ALERT banner scrapes `r.tags` rather than the enforcer and can name the wrong allergen or omit the lethal one; NEW-1 HIGH — published special-diet headcounts can read 0 on a HOUSE artifact. Both diagnosed read-only, neither fixed.
- v31 allergen flags shipped as DRAFT with an unsigned verification checklist; W1 MON "Fully Loaded Sausage" still has no halal option.

**EXPO**'s queue is healthy and self-aware. Two items worth naming at HOUSE level: the 2 remaining hot-send stragglers (Chicken Fajitas W1 SAT, Halal al pastor W4 TUE — bagged items that should cold-ship) are standing food-safety-adjacent debt since the cutover; and branch protection on `main` is **unconfirmed** (the CI workflow's own header still frames it as a to-do while a handoff claims it's on — five minutes to verify, high value). Doc sprawl is real: 155 root `.md` files, ~73 of them for the deleted reno architecture, CLAUDE.md at 287 KB.

**MISE/CODEX** has three bodies of finished-but-not-live work: U15 intake surfaces (reviewed, on an unmerged branch), the Stage-3b authenticity layer (never pushed to origin — exists on one machine), and the July-7 landing-UX plan (authored, staged off main). One in-app contradiction: the `HACCP_BAG_LABEL` snippet still says "2 weeks" while the shipped HACCP card locks ≤7-day ROP.

**HUB** — the busiest surface has **zero automated tests**. Its integrity rests on EXPO's upstream gates and eyeballs. Supervisor overrides carry no identity (`_by: "Staff"`).

**PROOF** — nothing to build. *"The next work is operational, not architectural: make the three SharePoint books real, governed, and current."*

---

## 3. Cross-cutting strengths (keep doing these)

1. **The gate culture.** Authored-to-fail tests, schedule-neutrality baselines, adversarial multi-lens reviews, determinism checks. This is why a 34K-line single-file app can be refactored aggressively without breaking a shelter's dinner.
2. **The one-way cascade + single-owner-per-fact.** CODEX → DOOR/EXPO → HUB with PROOF as a read-only lens. Data classification is genuinely sound: resident data never leaves DOOR's browser; PROOF never persists a sensitive row.
3. **Derive-don't-duplicate, refuse-at-the-source, degrade-visibly** — the INSIGHTS principles are actually enforced in code, not aspirational.
4. **The $0 external cost model**, extended (not abandoned) by the SharePoint plan: infrastructure the org already pays for, no vendors.
5. **Receipts for everything.** Every decision has a dated document. (Also a liability — see doc sprawl.)

## 4. Cross-cutting risks (ranked)

1. **Bus factor = 1.** Operation, rulings, deploys, hosting (personal GitHub account), tokens, OneDrive working folders, and the sole test fixture are all one person. The system was designed so "the operation cannot quietly fail" — today it can, in exactly one way.
2. **The adoption gap.** No second operator has ever driven any surface. Staff identity exists nowhere. Training and the formal "HOUSE is the kitchen system" declaration (Jason's own roadmap items) haven't started. Engineering is ready for users it doesn't have — and several open design questions (J4 dialog friction, occasion vocabulary, Fine-tune need) can *only* be answered by real users.
3. **Food-safety debt, small but load-bearing.** DOOR C1 + NEW-1 + DRAFT allergen flags + missing halal slot; EXPO's 2 hot-send stragglers; MISE's bag-label contradiction. Individually contained; collectively they're the exact trust surface the system exists to protect, and they should be zero before inviting new users in.
4. **Latent landmines.** DOOR v31 app-state clobber; unconfirmed EXPO branch protection; HUB's zero tests; the retired HUB builder pipeline that would wipe the live feed if ever re-run.
5. **Staleness debt.** CODEX feed (May 8), DOOR registry (June 10), MISE pickup docs (June 20–21, missing the current thread), the overtaken June-14 plan, EXPO's 155-file doc root.
6. **Stranded value on unmerged branches.** U15, Stage-3b (unpushed!), landing-UX, and PROOF's whole raison d'être — all finished work delivering nothing.

---

## 5. The ideal usage picture

*The 6–12-month operating rhythm this system was built for — every sentence below is already supported by shipped or near-shipped capability; what's missing is operations, identity, and people.*

**Every shift.** Kitchen staff at Bloor and Rex glance at HUB on the wall tablet or the printout. The board is simply there — settled, dated correctly, role-filtered. A cook taps a dish and lands on the CODEX card pre-scaled to tonight's routed portion count. Temperatures get logged at the CCPs the HACCP plan names, into the capture layer, in seconds. Drivers see their van runs. Nobody asks whether the board is current; the status line would say so if it weren't.

**Every day.** Rexdale floor staff record intakes, discharges, and restriction changes in DOOR — once. Plating sheets, dietary labels, and allergen routing flow out; an anaphylactic conflict is caught red and acknowledged before service, never after. Incidents and near-misses land in `LOG.xlsx` the same shift, from the person who saw them.

**Every week.** A supervisor — not only Jason — adjusts the schedule in EXPO through the one decision dialog: move a cook, swap a dish, add a cake for Sunday. Each edit is a reasoned assertion that sticks, visible in My Changes, and the board re-settles. There is no "Generate" anxiety; there is no bake step; nothing is lost on reload. The bookkeeper enters the week's invoice lines in `LEDGER.xlsx`; the admin updates a cert in `CREW.xlsx` when one renews.

**Every month and quarter.** The director opens PROOF, loads the three books from the synced folder, reviews the data-quality flags, and prints the funder pack — any funder's shape, C40 or CFIF or TSS or the board, with suppression and provenance stamped — without anyone re-entering a number. Closeout copies freeze the month; the HACCP records prove the temperatures happened.

**Underneath, invisibly.** The data lives in CONC's Microsoft 365 tenant under IT's governance — permission groups, retention labels, version history. Staff sign in with the CONC accounts they already have; nobody pastes a token. The apps are served from org-owned infrastructure. IT owns tenancy, identity, and governance; a kitchen team — plural — owns the apps, with Jason as dimension-keeper rather than sole operator, and any competent staff member can be taught any surface in one shift.

*"People run the kitchen; the proof shows up. That is complete."*

---

## 6. The roadmap

Sequenced by real constraints: capture-loss is irreversible (LOG), trust surfaces must be clean before new users arrive, adoption answers questions engineering can't, and hosting moves last.

### Horizon 1 — Now (next 2–4 weeks): *ignite capture, retire the sharp edges*

| # | Item | Why now | Owner |
|---|---|---|---|
| 1.1 | **Deliver the IT ask** (PR #4 / the docx). Stage 1: governed library + OneDrive sync → **stand up `LOG.xlsx` first**, then CREW/LEDGER. Stage 2: the Entra Client ID | LOG is forward-only — every week is permanent loss; one Client ID unblocks CODEX review transport *and* all future Graph writes | Jason → IT |
| 1.2 | **Zero the food-safety debt**: DOOR C1 + NEW-1 (rule → fix → gate), sign off the v31 allergen checklist, define the W1 MON halal option, fix EXPO's 2 hot-send stragglers, fix MISE's `HACCP_BAG_LABEL` 2-weeks→≤7-days | Small, contained, and exactly the trust surface everything else depends on. Do before inviting any new operator | Jason (sessions) |
| 1.3 | **Defuse the v31 landmine**: seed `concUploadedMenu` with v31 (or update baked `MENU_DATA`) so DOOR's app agrees with its repo | One accidental publish currently reverts the live menu | Jason (session) |
| 1.4 | **Verify/enable EXPO branch protection** (4 required checks) — 5 minutes; decide the **DOOR registry question** honestly: resume daily use at Rexdale *or* stamp the published registry artifacts "as of 2026-06-10" so downstream can't over-trust (degrade visibly) | Cheap; closes a contradiction and an over-trust hazard | Jason |
| 1.5 | **Republish the CODEX feed** (or at minimum stamp honest `generated` metadata) | The pipeline consumes a May-8 feed; the governance plan's own to-do | Jason (session) |

### Horizon 2 — This quarter: *second operator, the soak-1 build, the PROOF rhythm*

| # | Item | Why | 
|---|---|---|
| 2.1 | **Build EXPO soak-1 Stages A–F** as planned (one PR per stage, gated cadence). This *is* the supervisor-usability arc — SEND hot↔cold, Generate receding, accept-as-baseline, pull-from-X | Already ruled; directly serves adoption |
| 2.2 | **First non-Jason operator.** Pick one person + one surface (HUB day-notes or DOOR intake are the gentlest). Train in one shift, watch, fold the friction findings back (this answers J4, occasion vocabulary, Fine-tune need — questions only real users can answer) | The single highest-leverage act in this document |
| 2.3 | **Start the PROOF monthly close rhythm** the first month-end after the books exist: load → review flags → fix sources → rerun → archive PDFs + closeout copies | The instrument is built; rhythm is what makes it real |
| 2.4 | **HACCP record capture (Phases A→C)** — the temperature-capture layer on the HUB/DOOR backbone. *"The record is the gap, not the procedure."* | Turns correct procedures into provable records; pairs naturally with 2.2 |
| 2.5 | **Merge-or-retire pass** on stranded work: U15 stack, Stage-3b (push it somewhere first!), landing-UX plan. Adopt the rule: *unmerged > 2 weeks → merge it or close it with a receipt* | Finished work delivering nothing is pure risk |
| 2.6 | **Hygiene batch:** archive the ~73 reno docs under `docs/archive/`, slim EXPO's CLAUDE.md, refresh MISE's pickup docs, add a minimal HUB smoke test (schedule shape + date projection + anchor — even 10 assertions), README anchor fix | Orientation cost is real; HUB is the untested busiest surface |

### Horizon 3 — 6–12 months: *the org owns it*

| # | Item | Notes |
|---|---|---|
| 3.1 | **SharePoint Stages 3–4**: runtime state to Graph at the built seams (DOOR's three first, then EXPO snapshots); staff SSO; retire pasted tokens + the portal PIN; overrides signed by real names | Sequenced in the IT brief; shared-tablet policy is IT's call |
| 3.2 | **Hosting move (Stage 5) + org-owned GitHub organization** — repos, Pages, and tokens off the personal account. Write the **succession doc**: accounts, tokens, deploy paths, "if the maker is unavailable" | The structural bus-factor fix |
| 3.3 | **Formal adoption**: the "HOUSE is the kitchen system" declaration + training, per the standing rollout roadmap — only after 2.2's lessons are folded | Adoption is a decision, not a drift |
| 3.4 | **Multi-site D-MS1** when Lansdowne returns (take the J7c-5 profile/UI ruling with it); the DOOR→EXPO special-meal pipe when a real event demands it | Both deliberately parked; triggers are named |
| 3.5 | **The kernel destination** (EXPO's assert-propagate-reconcile evaluator) as the long-arc engineering star — advanced only as soak feedback justifies | *"Twenty-eight days of cook, prep, send, heat — not assembled, settled."* |

### Operating rules for the roadmap

1. **Capture before features.** Un-captured LOG days never come back; a feature can wait a month.
2. **Trust surfaces before new users.** The allergen/food-safety list (1.2) reaches zero before anyone new is trained in.
3. **Adoption beats engineering now.** The next ten units of value come from a second operator and a monthly PROOF close, not from ten more gates.
4. **Every stage keeps the $0 external-spend model.**
5. **Nothing new lands unmerged.** Build → review → merge → deploy, or close with a receipt.

---

## 7. The ten recommendations, distilled

1. Hand IT the ask this week; stand up `LOG.xlsx` before anything else.
2. Zero the five food-safety debt items (DOOR C1, NEW-1, v31 flags sign-off + halal gap, EXPO stragglers, MISE bag label).
3. Defuse DOOR's v31 app-state landmine.
4. Verify EXPO branch protection; give HUB even a minimal smoke test.
5. Make the DOOR registry state honest — resume it or stamp it stale.
6. Republish the CODEX feed with honest metadata.
7. Build soak-1 Stages A–F; nothing else new in EXPO until they ship.
8. Train the first non-Jason operator this quarter and fold back what they trip on.
9. Run the first PROOF monthly close the month the books exist; make it a rhythm.
10. Start the org-ownership track (org GitHub, succession doc, SSO) so the bus factor stops being 1 — the vision's own words: *dissolve the bottleneck.*

---

## 8. Evidence appendix (dates as of 2026-07-07)

- HUB `hub_schedule.json`: 37 publish commits; daily cadence through 7/7 (`_source EXPO v9.48.0`, `_mode standard`, `_cycleStart 2026-06-07` — anchor fix holding since 6/29).
- DOOR: last registry publish 6/10–11 (`registry_summary` v30, exported 6/11); last commit 6/30 (v31 menu cluster); 55-test CI green; HTA push channel last used 4/23.
- EXPO: `snapshots/` = 11 saves (May cluster + 7/5–7/6 soak, ledger 41–88 Decisions); soak-1 build plan Stage A "not started"; 72 gate files, 4 CI checks; 155 root docs (~73 reno-historical).
- MISE: main = `31529df` (6/27, HACCP); feed header `generated 2026-05-08`; 224 production recipes / 300 templates confirmed; U15 + Stage-3b + landing-UX unmerged.
- PROOF: R1–R5 complete 6/16–18; ~248 test assertions + Playwright render gate; dormant since 6/21; blocked only on the SharePoint books.
- HOUSE: HACCP set live (report Pages-served); SharePoint IT brief + ask authored 7/7 (PR #4); INSIGHTS.md is the KNOWLEDGE owner (relocated 6/21).
