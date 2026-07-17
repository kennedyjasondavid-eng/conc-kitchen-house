# HACCP Integration Plan — CONC HOUSE

> **Status: DRAFT for review (2026-06-22).** Cross-HOUSE governance/knowledge doc; owned by the HOUSE umbrella repo per the single-owner-per-fact rule. Nothing in here is built yet — this is the strategy and the build spec for sign-off.

> **Telos check.** HOUSE's design telos (`INSIGHTS.md`) is *a tool that recedes / fewer staff errors*. HACCP compliance is **a funder requirement, not a kitchen-control project**, so every choice below optimizes for **producing credible evidence with the least possible change at the line.** A HACCP layer that adds ceremony to a shelter kitchen mid-renovation would be rejected by the people who have to use it — so it must recede.

---

## 0. The four decisions that shape this plan

The architect ruled these on 2026-06-22; they set the "line of complexity" more than anything else:

| Decision | Consequence for the design |
|---|---|
| **Records + a written plan** (not full certified HACCP) | Build a real HACCP plan document **plus** the evidence logs that back it. Skip external-audit machinery, formal validation studies, and per-CCP verification cycles. The plan doc is the funder centrepiece; the logs prove it is followed. |
| **Paper at the line, digitize later** | Ground-level UX = a **printed log clipped to the fridge**. Digital UX = a quiet data-entry surface used by a supervisor at a calm moment, away from service. The cook's day does not change. |
| **PROOF gets a HACCP report tab** | Capture and reporting are split by audience: **HUB (staff) captures, PROOF (director/funder) reports.** This matches how the rest of HOUSE already separates concerns. |
| **Fridge/freezer temps first** | The first shippable slice is the cheapest, highest-audit-value log. Cooking / cooling / reheating CCPs are real but deferred — and are exactly where HOUSE's existing engine gives a large head-start later. |

---

## 1. What HACCP is, in plain language — and why HOUSE already owns ~70% of it

HACCP (Hazard Analysis & Critical Control Points) is a food-safety method built on **seven principles**. In plain English, with where each already lives in HOUSE:

| Principle | Plain meaning | Where it lives today |
|---|---|---|
| 1. **Hazard analysis** | "What can make food unsafe here?" (bacterial growth, allergens, contamination) | *New* — this is the plan document (§5a). |
| 2. **Identify Critical Control Points (CCPs)** | The few steps where you must get it right or someone gets sick: cooking, cooling, reheating, holding, and **allergen separation**. | **EXPO already models the cook→cool→reheat flow. DOOR already owns allergen control.** The big head-start. |
| 3. **Critical limits** | The pass/fail number at each CCP (cook to 74 °C; fridge ≤ 4 °C). | *New* — temperatures. HOUSE tracks *time* (hold days) but not *temperature*. |
| 4. **Monitoring** | Actually measuring and recording at those points. | *New* — the logs. The real gap: nobody records a number today. |
| 5. **Corrective action** | What you do when a number is out of range (toss, reheat, fix the fridge). | *New* — one line on the log (§5d). |
| 6. **Verification** | A supervisor confirms the system is being followed. | *New but cheap* — digitization + the PROOF roll-up **is** verification evidence. |
| 7. **Record-keeping** | Keep the proof for the funder/auditor. | **The whole point.** HUB captures, PROOF reports. |

**The insight that makes this small instead of huge:** HOUSE already encodes the *choreography* of food — what is cooked where, how long it is held cold, how it crosses sites in the vans, and who cannot eat what.

- EXPO's lifecycle `PREP → COOK → BAG/blast-chill → COLD SEND → COLD RETURN → HEAT → SEND` **is the cold chain HACCP monitors.** `maxHoldDays`, the blast-chiller capacity model, frozen-stock thaw lead times, and AM/PM inter-site van runs are all already encoded.
- DOOR's anaphylactic routing (the exclude-array pattern, "never silently overridden, always surfaced in red") **is** principle 2's allergen CCP — already enforced.
- PROOF already ingests `food-safety` incident records (LOG.xlsx) and reports them under its TSS framework.

What is missing is narrow and consistent across all of it: **temperature truth + a human sign-off.** We are attaching a thin evidence layer to a system that already knows the dance — not building HACCP from scratch.

---

## 2. Architecture — where each piece lives

```
                    ┌──────────────────────────────────────────────┐
                    │  HOUSE repo  (cross-app governance owner)      │
                    │                                                │
                    │  • HACCP_PLAN.md   ← the funder's plan doc      │
                    │  • haccp_spec.json ← machine-readable spec:     │
                    │      units, target ranges, CCPs, check schedule │
                    │      (mirrors PROOF's ghg_factors.json pattern) │
                    └───────────────┬────────────────────────────────┘
                          one source │ feeds template, form, and report
            ┌───────────────────────┼────────────────────────────┐
            ▼                       ▼                             ▼
   ┌─────────────────┐   ┌────────────────────┐      ┌────────────────────────┐
   │ PRINTED TEMPLATE│   │  HUB capture panel │      │  PROOF "R6 · HACCP" tab │
   │ (paper at line) │   │  (digitize later)  │      │  (funder/board lens)    │
   │                 │   │                    │      │                         │
   │ pre-filled grid │   │ supervisor keys in │ pub  │ reads haccp_log.json as │
   │ unit + range +  │──►│ paper readings →   │─────►│ a Tier-1 source; rolls  │
   │ AM/PM + initials│   │ publishes          │ JSON │ up completeness +       │
   │                 │   │ haccp_log.json     │      │ exceptions; exports PDF │
   └─────────────────┘   └────────────────────┘      └────────────────────────┘
        GROUND LEVEL          GROUND LEVEL                 DIRECTOR / FUNDER
                                                     (a LENS — stores nothing)
```

**Data flow, plain:** the printed sheet is filled in by hand at the fridge → a supervisor enters those numbers into HUB at a quiet moment → HUB writes `haccp_log.json` to GitHub (the *same rail* it already uses for staff notes) → PROOF fetches that JSON like any other operational source and produces the funder-facing compliance report and PDF export.

### The "lens, never a vault" reconciliation

There is an apparent tension — *PROOF is director-facing, but HACCP should live close to the ground.* PROOF's own architecture resolves it: **PROOF is a lens, never a vault** (`VISION.md:41` — "Sensitive rows are parsed in one function scope, summed, and forgotten. Nothing sensitive ever reaches localStorage, GitHub, or a snapshot"). PROOF never *owns* the HACCP record. The record's home is the ground level (the paper sheet → the HUB-published `haccp_log.json` → git history → the archived funder PDF). PROOF only *re-slices* it for the audience that never touches the kitchen. So "PROOF gets a HACCP tab" and "HACCP lives close to the ground" are both true at once.

This is, in fact, PROOF's entire reason for existing — its telos is *"funder-report agility… operations are never bent to fit a funder's template"* (`VISION.md:13`). "HACCP is a funder issue, disrupt operations as little as possible" is the same sentence said twice.

### Principles this inherits from HOUSE

- **Single owner per fact** — the unit list, target ranges, and CCPs are defined **once** in `haccp_spec.json`. The paper template, the HUB form, and the PROOF labels all *read* it; no one re-types a fridge's range in three places.
- **Publish JSON, update the consumer in the same change set** — the new artifacts follow the same contract discipline as `menu_current.json` / `hub_schedule.json`.
- **Derive what's declared, store only the irreducible** (INSIGHTS #41) — completeness %, exceedance counts, and trends are *derived* by PROOF at view time, never stored.
- **Capture once, re-slice for any framework** (PROOF SUBSTRATE) — one ground-level capture serves this funder and the next one.

---

## 3. The "line of complexity," drawn explicitly

| | **In v1 (build now)** | **On the line (Phase 2)** | **Deliberately OUT** |
|---|---|---|---|
| **Plan** | Written HACCP plan + machine-readable spec | — | Formal validation studies; external certification |
| **Logs** | Fridge/freezer AM/PM temps; probe **calibration** log | Cooking & reheating CCP temps; 2-stage cooling logs; receiving temps; cleaning checklist; inter-site transport temps | Per-resident temp tracking; lot/batch traceability |
| **Capture** | Paper template + HUB digitization | EXPO-driven *schedule-aware* prompts ("you cooked X today — log its temp") | Live mid-service tapping; wireless probes; fridge data-loggers |
| **Report** | PROOF R6 compliance tab + funder PDF | Trend analytics; corrective-action SLA tracking; join to incident LOG | Real-time alerting / live dashboards |

**Why the line sits here:**
- *Funder-driven, not operations-driven* → optimize for **credible evidence**, not tighter control. Fridge/freezer temps are the single most-requested record and the least disruptive to collect.
- *Disrupt as little as possible* → paper-first keeps the line workflow unchanged; digitization is a back-office act.
- *Phase 2 is "on the line," not "out,"* because HOUSE's engine makes it unusually cheap when there is appetite (§5f). We are sequencing, not abandoning.

---

## 4. The full inventory of new artifacts (data contracts)

| File | Owner / repo | Read by | Sensitivity | Contents |
|---|---|---|---|---|
| `HACCP_PLAN.md` | HOUSE | humans, funder | public | The prose plan (7 principles). |
| `haccp_spec.json` | HOUSE | template generator, HUB form, PROOF (Tier-1 + labels) | public | Units, target ranges, CCP list, check schedule, calibration cadence. **Single source of truth.** `_meta`-versioned, mirroring `ghg_factors.json`. |
| `haccp_log.json` | **HUB** (published to its Pages, via the existing GitHub overrides rail) | PROOF (Tier-1 source) | non-sensitive (numbers + initials) | Readings, initials, timestamps, out-of-range corrective actions. |
| HACCP predicate rows | PROOF `framework_map.json` | PROOF `evalPredicate` | public | "Out of range" + "check complete" funder predicates (data only, zero code). |

Each follows the cross-app rule: **change the schema → update the consumer in the same change set.** Proposed concrete schemas are in the Appendix.

---

## 5. Each aspect in detail — what it is, how it plugs in, the UX

### 5a. The written HACCP plan (the funder's centrepiece)

**What it is:** a maintained document with the standard HACCP sections — facility/process description, hazard analysis, the CCP table, critical limits, monitoring procedures, corrective actions, verification, and the record list. In plain terms: *"here are our risks, here are the few points we control, here's the number that means safe, here's how we check, here's what we do when it's wrong, here's where we keep the proof."*

**Where it plugs in:** the **HOUSE umbrella repo**, which already "owns the HOUSE-level governance + knowledge docs that apply to every app" (HOUSE `CLAUDE.md`). A cross-cutting food-safety plan is exactly that; it sits beside `INSIGHTS.md` and `HOUSE_Doc_Governance_Plan.md`.

**UX:** none for staff — it is a document. The director reads it; the funder is handed it.

### 5b. The machine-readable spec — `haccp_spec.json` (HOUSE)

**What it is:** the plan's data twin. The unit list, each unit's target range, which steps are CCPs, the check schedule (AM/PM, daily), and the calibration cadence. The prose plan is for humans; the JSON is the single source that **generates the paper template, drives the HUB form's range-validation, and labels PROOF's report.** Change a fridge's target range once and everything downstream updates.

**Pattern:** it deliberately mirrors PROOF's `ghg_factors.json` — a small, `_meta`-versioned reference table with an explicit change rule ("only ADD or re-point with a dated migration note; never silently redefine"). PROOF already knows how to ingest exactly this shape.

### 5c. The paper log template (ground level — the zero-disruption surface)

**What it is:** a printable grid, generated from `haccp_spec.json` so it is always current. Each sheet pre-prints the unit name, its **target range**, the **AM/PM columns** for the week, an **initials** column, and a footer line: *"If outside range → record action below."*

**Where it plugs in:** HUB already has a mature **print path** (`buildTaskSheet` / `buildDriverManifest`, landscape, one page per day). The HACCP sheet is one more template on that machinery — or, at its simplest, a standalone printable. Staff print it weekly and clip it to the fridge.

**UX:** a clipboard on the fridge. The only new daily act: glance at the thermometer you already have, write a number, initial it. This is "recede" made literal — at the moment of service the system is *paper*.

**Why paper-first is right here:** during the Bloor renovation there are **three sites (Bloor / Rex / LAN)** with mobile, busy staff. A paper sheet at each fridge needs no device, no login, no network, and survives a wet hand. It is the lowest-risk way to *not* break service.

### 5d. HUB capture surface (digitization — close to the ground, off the line)

**What it is:** a new **"HACCP" button** in HUB's action bar (alongside Overview / Menu / Orders / Costs). It opens a panel showing **this week's log as a grid that mirrors the paper sheet**: rows = units, columns = days × AM/PM.

**UX, step by step:**
1. Supervisor opens HUB on the tablet at end of shift (or end of week), taps **HACCP**.
2. Sees the week grid; empty cells flagged "missing."
3. Taps a cell → number entry → types the temp from the paper sheet. Initials default to the staff name HUB already stores (`hub_staff_name`).
4. If the number is **out of range**, the cell turns red and a one-line "what did you do?" box appears (corrective action). It will not let you leave it blank — the funder's favourite field.
5. A **completeness meter** ("18 / 28 checks logged this week") shows at a glance what is missing.
6. **Save** → writes/publishes `haccp_log.json`.

**How it plugs in (almost entirely reuse):** HUB is *already a capture app*, not read-only. It already stores **author-attributed, timestamped** entries (`HUB_OVERRIDES.notes` / `.general`) and pushes them to GitHub via `saveOverrides()` / `loadOverrides()`, with `hub_staff_name` for attribution and a saved GitHub token for the push. The HACCP log is a new key on that proven rail (`HUB_OVERRIDES.haccp` → published as `haccp_log.json`). Estimated footprint: **~650–850 lines** added to the ~5,400-line file — a panel, a grid renderer, a save hook. No new infrastructure.

**Why this is not "at the line":** the cook never opens this. It is a back-office transcription done once a day or once a week. That is the point of the "digitize later" choice — the disruption budget at the line stays at zero.

### 5e. PROOF "R6 · HACCP" report (the funder/board lens)

This is where the PROOF internals matter, so it is specified concretely.

**What it is:** a sixth report in PROOF (R1–R5 ship today) that turns the raw log into the **audit-ready record**: a compliance scorecard (% of required checks completed, count of out-of-range events, count of corrective actions recorded), an exceptions list (every out-of-range reading with its action and timestamp), and the **"Export funder packet"** PDF that bundles the plan-doc reference + the period's records + the exceptions.

**How it plugs in — exact seams in PROOF's existing model:**

1. **Ingestion = Tier-1, not Tier-2.** Fridge/freezer temps are operational and non-sensitive (numbers + initials), so `haccp_log.json` joins PROOF's **Tier-1 public-JSON fetch** (the `SOURCES` map: live fetch → cache → embedded `SAMPLE` fallback, validated by a `validateHaccp`). This avoids any SharePoint dependency for v1 and reuses the exact pattern PROOF already uses for DOOR/EXPO/HUB feeds. *(Contrast: the incident `LOG.xlsx` is Tier-2 because it carries PII/`reported_by`. Temperature logs do not, so they stay Tier-1.)*
2. **Reference data = the `ghg_factors.json` pattern.** PROOF reads `haccp_spec.json` (the critical limits) the same way it reads `ghg_factors.json` — a versioned reference table with a `placeholder` flag that mutes numbers until the real unit list is confirmed.
3. **Framework = data, zero code.** Per PROOF's cardinal rule (`FRAMEWORK_MAP.md:10`, "a predicate maps operational fields → a funder concept… zero code per framework"), add HACCP predicate rows to `framework_map.json` (e.g. `haccp_out_of_range`, `haccp_check_complete`), `active:false` until ready, evaluated by the existing `evalPredicate` verb.
4. **The report itself = the established render pattern.** Add `<option value="R6">R6 · HACCP / Food-safety records</option>`, a `rollupR6(roll, asOf)` that joins the log against the spec limits to compute completeness + exceedances, a `renderR6Sections(roll, mgmt)` (~50–80 lines), and one branch in the `renderAll()` dispatcher.
5. **Audience-aware out of the box.** PROOF already gates `mgmt = (state.audience !== 'director')`; the funder/board view shows aggregate-only (completeness %, exceedance counts), while management can drill into individual readings — exactly the right disclosure split for a compliance record.
6. **Provenance = built-in audit credibility.** PROOF's `renderProvenance()` footer already stamps each source's version + content hash. A funder PDF that footnotes the exact `haccp_log.json` version it was built from is materially more credible than a spreadsheet.
7. **Gated.** PROOF ships under a binary test gate (`node tests/all.mjs` — changed output blocks the push). R6 lands with a fixture (a synthetic `haccp_log.json` + spec) so the report is regression-proof.

**UX:** director-grade. Pick a period, see green/amber numbers, click export, hand the PDF to the funder. No data entry happens here.

**Upgrade path (recorded, not built):** if the record later needs formal retention labels/permissions, or needs to join the incident `LOG.xlsx`, PROOF's **Tier-2 SharePoint path** is the graceful upgrade — a `HACCP.xlsx` workbook with a `parseHaccp` parser, parsed-in-memory and never persisted, exactly like LEDGER/CREW/LOG. v1 stays on the simpler Tier-1 public-JSON rail.

### 5f. Phase-2 preview — why CCP temps are unusually cheap *later*

Deferred, but worth seeing because it is the payoff for being inside HOUSE rather than buying an off-the-shelf temp-log app:

- EXPO's **`BAG`/blast-chill step is the cooling CCP** (the highest-risk point in any kitchen — the cook→chill curve). EXPO already knows the blast-chiller capacity and which items get bagged.
- EXPO's **`HEAT` step is the reheat CCP**; its **`COOK` step** is the cook CCP; the **van `SEND`s between sites** are transport-holding points.
- Because EXPO already emits all of this into `hub_schedule.json`, a Phase-2 build can have EXPO **stamp `isCCP` + the required limit** onto those rows, and HUB's HACCP panel becomes **schedule-aware**: *"today Bloor cooked Beef Stew and blast-chilled it — log the post-chill temp here,"* prompting for exactly the readings that matter, on exactly the days they happen. No off-the-shelf tool can do that, because none of them know your menu and cold chain. **We do not build it now — but v1's data shapes are chosen so this drops in cleanly.**

---

## 6. Sequencing — each phase independently shippable and funder-visible

- **Phase 0 — The plan + the paper (days, not weeks).** Write `HACCP_PLAN.md` + `haccp_spec.json` + generate the printable template. *Outcome: hand the funder a real HACCP plan and start collecting paper records immediately, with zero code in HUB/PROOF.* This alone may satisfy much of the funder ask.
- **Phase 1 — HUB capture.** The digitization panel for fridge/freezer temps; publishes `haccp_log.json`. *Outcome: paper becomes a durable, attributed digital record.*
- **Phase 2 — PROOF R6 tab + export.** The funder-facing roll-up and PDF packet. *Outcome: one-click audit evidence for the board/funder.*
- **Phase 3 — (later) CCP temps + schedule-aware prompts + receiving/cleaning/transport.** The cook/cool/reheat layer of §5f.

Phase 0 + 1 + 2 together deliver the full "records + plan" mandate. Phase 3 is the elegant extension when there is appetite.

---

## 7. Risks & things to confirm (do not block Phase 0, but shape its content)

1. **The exact unit inventory** — how many fridges and freezers at each of Bloor, Rex, and LAN, and each one's target range. (Populates `haccp_spec.json`.) Until confirmed, the spec ships with `placeholder:true` and PROOF mutes the numbers (the `ghg_factors.json` convention).
2. **The funder's actual ask** — do they name a framework/standard, or just want "documented food-safety records + a plan"? (Determines how formal the plan-doc language gets, and whether R6 needs a named-framework label.)
3. **Who does digitization** — which role keys the paper into HUB, and how often (daily vs weekly).
4. **Probe-thermometer calibration** — funders almost always want a calibration log; it is nearly free to add to the plan/spec and is a credibility multiplier. Recommend including it in Phase 0.
5. **Inter-site transport temps** — during reno, food crosses sites in vans (a genuine HACCP holding/transport point). Slotted into Phase 2/3; flag if the funder wants it sooner.
6. **Record retention** — git history of `haccp_log.json` + archived funder PDFs is the v1 retention story. If the funder requires a formal retention period/labels, that is the trigger for the PROOF Tier-2 SharePoint upgrade (§5e).

---

## 8. Appendix — proposed schemas (for review)

### `haccp_spec.json` (HOUSE — single source of truth)
```json
{
  "_meta": {
    "version": 1,
    "placeholder": true,
    "change_rule": "Only ADD or re-point a unit/limit with a dated migration note. Never silently redefine an active limit.",
    "updated": "2026-06-22"
  },
  "units": [
    { "id": "bloor_walkin",  "site": "Bloor", "label": "Bloor walk-in cooler", "kind": "fridge",  "min_c": 0, "max_c": 4 },
    { "id": "bloor_freezer", "site": "Bloor", "label": "Bloor freezer",        "kind": "freezer", "max_c": -18 },
    { "id": "rex_fridge_1",  "site": "Rex",   "label": "Rex fridge 1",         "kind": "fridge",  "min_c": 0, "max_c": 4 }
  ],
  "schedule": { "checks_per_day": 2, "slots": ["AM", "PM"] },
  "calibration": { "cadence_days": 30, "method": "ice-point" },
  "ccps_phase2": ["cook", "cool", "reheat", "transport"]
}
```

### `haccp_log.json` (HUB-published — the ground-level record)
```json
{
  "_meta": { "version": 7, "spec_version": 1, "generated": "2026-06-22T20:00:00Z" },
  "readings": [
    { "unit": "bloor_walkin", "date": "2026-06-22", "slot": "AM",
      "temp_c": 3.1, "by": "JD", "ts": "2026-06-22T08:05:00Z" },
    { "unit": "bloor_freezer", "date": "2026-06-22", "slot": "AM",
      "temp_c": -15.0, "by": "JD", "ts": "2026-06-22T08:06:00Z",
      "out_of_range": true, "action": "Moved stock to Rex freezer; called fridge tech." }
  ],
  "calibrations": [
    { "probe": "probe-1", "date": "2026-06-01", "by": "MN", "result": "pass" }
  ]
}
```

### `framework_map.json` additions (PROOF — data only, zero code)
```json
"haccp_out_of_range": {
  "framework": "HACCP",
  "label": "Cold-storage reading outside critical limit",
  "grain": "snapshot",
  "field": "out_of_range",
  "in": [true],
  "active": false,
  "activated": "pending (HACCP Phase 2)"
},
"haccp_check_complete": {
  "framework": "HACCP",
  "label": "Required cold-storage check logged",
  "grain": "snapshot",
  "field": "temp_c",
  "exists": true,
  "active": false,
  "activated": "pending (HACCP Phase 2)"
}
```

---

## 9. Recommended first move

**Phase 0** is the highest-leverage start: pure documentation + a printable, satisfies a large chunk of the funder requirement on its own, and changes nothing in the kitchen. Concretely: draft `HACCP_PLAN.md` + `haccp_spec.json` (with `placeholder:true` until the unit inventory is confirmed) + the printable fridge/freezer template. Answering risk items 1–2 in §7 turns the spec from templated to concrete.

*No code has been written in HUB / PROOF / EXPO / DOOR. This document is the plan for sign-off.*
