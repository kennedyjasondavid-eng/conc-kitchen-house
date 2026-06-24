# CONC HACCP — Monitoring, Corrective Actions, Verification & Records (Principles 4–7)

**Second companion annex to `HACCP_PLAN_DRAFT.md`** (after `HACCP_HAZARD_ANALYSIS.md`, Principles 1–3).
**Date:** 2026-06-24 · **Status:** Working draft for validation with Toronto Public Health (TPH). Software shapes below are a **design proposal**, not yet built.
**The premise (from the hazard analysis):** CONC's thermal controls already exist as MISE cook-card *instructions* — the missing layer is the *record*. Principles 4–7 are therefore mostly a **data-capture build on the existing HOUSE backbone**, not new kitchen procedure. The design honors the HOUSE rules: single-file HTML, no build step, localStorage = live state, **published JSON = the cross-app contract**, graceful degradation from `file://`, anaphylactic flags sacred, *the tool recedes*.

---

## 1. HACCP Master Plan — the integrated table (Principles 3→7 per CCP)

Critical limits recapped from `HACCP_HAZARD_ANALYSIS.md` §4. **Validated 2026-06-24 against Health Canada / O. Reg. 493/17 / FDA / FSA; ROP special-process status to confirm with TPH.**

### CCP-1 — Cooking
| | |
|---|---|
| **Critical limit** | Poultry/mixed/egg ≥**74 °C** (whole birds 82 °C); ground & whole-muscle ≥**71 °C** (ON); fish ≥**70 °C** (158 °F) — core, ≥15 s |
| **Monitoring** | *What:* core temp at the thickest/slowest point of each cooked batch · *How:* calibrated probe thermometer · *Freq:* **every batch**, at end of cook · *Who:* cook |
| **Corrective action** | Keep cooking → re-probe until limit met; if equipment fault, hold ≤4 °C or discard; log the deviation + disposition |
| **Verification** | Daily probe calibration (ice-point); supervisor reviews cook log daily; quarterly observation of practice |
| **Records** | Cook-log entry → `haccp_log…ccp.cook {temp,time,by,pass}` |

### CCP-2 — Cooling (cook-chill)
| | |
|---|---|
| **Critical limit** | **60→20 °C ≤2 h, 20→4 °C ≤4 h** (≤6 h total), blast chiller or validated ice-bath |
| **Monitoring** | *What:* core temp at chill start, **2 h mark**, and end · *How:* probe (or in-chiller logging probe) · *Freq:* **every cooked-to-chill batch** · *Who:* cook |
| **Corrective action** | *(already on the cook card)* not ≤20 °C by 2 h → reheat to 74 °C and re-cool **once**; second failure → **discard**; log |
| **Verification** | Daily cooling-log review; **blast-chiller performance check under full load**; calibration |
| **Records** | Cooling-log → `ccp.cool {startTemp,t0, mid:{temp,time}, end:{temp,time}, method, pass}` |

### CCP-3 — Chilled / ROP hold + cold transport
| | |
|---|---|
| **Critical limit** | ≤**4 °C** continuous; **ROP use-by ≤7 d from cook day**; transport depart ≤4 °C / arrive ≤4 °C; raw segregated from RTE |
| **Monitoring** | *What:* (a) fridge temp each unit; (b) ROP label correct + use-by dated from cook day; (c) van depart & arrive temps · *How:* min/max thermometer; label check; probe · *Freq:* fridges **2×/day**, label **every bag**, transport **every van leg** · *Who:* kitchen lead / driver |
| **Corrective action** | Fridge out-of-temp → assess exposure, repair/move stock, discard if abused; over-7 d / mis-dated → **discard**; transport breach → assess or discard; log |
| **Verification** | Daily temp-log review; **automated schedule check: (serve − cook) ≤ use-by for every ROP batch** (see §4); calibration; periodic *Listeria* swab if extending shelf life |
| **Records** | Fridge log; bag-label record → `ccp.bag {cookDate,useBy,by}`; transport log → `ccp.transport {departTemp,departTime,arriveTemp,arriveTime,route,by}` |

### CCP-4 — Reheating
| | |
|---|---|
| **Critical limit** | ≥**74 °C** core **within 2 h**, reheated **once only** |
| **Monitoring** | *What:* core temp before service · *How:* calibrated probe · *Freq:* **every reheated batch** · *Who:* Rex cook |
| **Corrective action** | Keep reheating to ≥74 °C; if not within 2 h, or already reheated once → **discard**; log |
| **Verification** | Daily reheat-log review; calibration |
| **Records** | Reheat-log → `ccp.reheat {temp,time,by,once,pass}` |

### CCP-5 — Hot-holding & service window
| | |
|---|---|
| **Critical limit** | Hold ≥**60 °C**; **or** time-as-control **≤4 h** cumulative in the danger zone then discard |
| **Monitoring** | *What:* hot-hold temp at service start + hourly, **or** the time-out clock for TPHC items · *How:* probe / timer · *Freq:* per service · *Who:* server/lead |
| **Corrective action** | <60 °C and <2 h out → reheat to 74 °C; beyond the time/temp window → **discard**; log |
| **Verification** | Service-log review; calibration |
| **Records** | Service-log → `ccp.hotHold {checks:[{temp,time,by}] | timeOut}` |

### CCP-6 — Allergen / anaphylactic control *(largely already built in DOOR)*
| | |
|---|---|
| **Critical limit** | **Zero allergen cross-contact to a flagged resident; 100 % of anaphylactic plates verified against the DOOR anaphylactic list before service** |
| **Monitoring** | *What:* DOOR routing run (resident tags vs meal flags) + anaphylactic exclude-array + roommate co-routing + allergen-free prep separation · *How:* DOOR generate + H&W acknowledgement + visual prep check · *Freq:* **every meal** · *Who:* H&W / kitchen lead |
| **Corrective action** | Conflict → re-route / dedicated separate alternative; missing H&W ack → **block generation/service** (Gate); never serve unverified; log |
| **Verification** | `computeDoorComplianceDiagnostics` / Gate-9 review; confirm DOOR allergen data is synced **from CODEX** (never forked); periodic recipe-allergen audit |
| **Records** | DOOR plating sheets + auto anaphylactic list + acknowledgement log — **these existing artifacts *are* the CCP-6 records** |

---

## 2. Principle 5 — Corrective-action principles (cross-cutting)

Every corrective action must do four things, and the record must show all four: **(1)** bring the process back under control; **(2)** decide the disposition of the affected food; **(3)** record what happened, who, when; **(4)** if a CCP fails repeatedly, fix the root cause (re-train, re-equip, re-schedule). Disposition default for a breached **kill-or-toxin** step (cooling, cold/ROP hold, reheat) in a highly susceptible population is **discard** unless a documented reconditioning step (e.g., the cooling reheat-restart) applies. When in doubt → discard; a wrong meal is recoverable, a sick resident is not.

---

## 3. Principle 6 — Verification program

| Activity | What | Cadence | Who |
|---|---|---|---|
| **Thermometer calibration** | Ice-point (0 °C) check on every probe; reference-thermometer cross-check | Daily (ice-point) + annual (reference) | Each cook / Coordinator |
| **Record review** | Sign off the day's cook/cool/reheat/hold logs; flag missing or out-of-limit entries | Daily (lead) + weekly (Coordinator) | Lead / Coordinator |
| **Schedule-vs-hold check** | **Automated:** for every ROP batch, `(serveDate − cookDate) ≤ useByDays`; surface violations on the board so the worked-out schedule stays auditable | Continuous (on every schedule publish) | EXPO / HUB |
| **Equipment validation** | Blast chiller hits 60→20→4 °C targets under a full load; fridges hold ≤4 °C | Commissioning + annual | Coordinator |
| **CCP-6 sync check** | DOOR allergen data matches CODEX; diagnostics/Gate clean | Each menu change | H&W / Systems |
| **Plan reassessment** | Re-walk flows + re-validate limits | Annual + on any menu / process / equipment / site change | HACCP team |
| **Microbiological (optional)** | *Listeria* environmental swabs; product testing — **required validation if ROP shelf life is ever pushed past 7 d** | Per TPH | External lab |

---

## 4. The schedule-vs-hold-time check (turns the open worry into a control)

Scheduling cooks to stay inside the hold limit is an operational matter EXPO can solve — HACCP's job is to **verify it continuously**. Both inputs already exist in the data:

- **Cook day** — the production-section day in `hub_schedule.json` / EXPO.
- **Serve day** — the `serves` target (e.g. `"MON Lunch (8d)"`) and the MOVES `holdClass` / hold-day count.

**Rule:** for every ROP (`packaging:"vac"`) batch, `serveDate − cookDate ≤ ROP_USE_BY_DAYS` (default **7**). A violation (today: the 8-day Vegan Chilli) is flagged on the HUB board using the **existing colour language** (extend the MOVES `holdClass` r/y/g and the FRIDGE age dots to mean *HACCP hold-limit status*, not just logistics). This is a natural fit for DOOR's **Gate-9 structural-block** pattern: a publish-time check that flags or blocks an out-of-limit schedule before it reaches the floor.

---

## 5. Principle 7 — Records & documentation

**The record set:**
1. **Per-batch CCP log** — cook / cool / reheat / hold / transport readings (the `haccp_log.json` below).
2. **Fridge & equipment temperature logs** — per unit, 2×/day.
3. **Calibration log** — probe checks.
4. **Corrective-action log** — every deviation + disposition (can live inside the batch record).
5. **DOOR allergen/anaphylactic records** — plating sheets, anaphylactic list, H&W acknowledgements *(already generated)*.
6. **Verification records** — record-review sign-offs, schedule-check flags, reassessment minutes.

**Integrity & retention:** each entry dated + initialled (staff ID), tamper-evident (append-only log; corrections are new entries, not overwrites). Retain cook/cool/reheat/hold logs **≥1 year** (confirm with TPH); calibration & verification records longer. localStorage holds the live copy; the published `haccp_log.json` is the durable record (mirrors how DOOR/MISE publish their JSON artifacts).

---

## 6. Temperature-capture schema — the software design

**App-role split (each app keeps its existing job):**
- **MISE/CODEX** — *owns the limits.* The cook-card `HACCP_*` targets (cook temps, the 2 h/6 h cooling curve, reheat 74 °C, ROP use-by) are the source of truth a capture screen checks against.
- **HUB** — *owns capture + display.* It's the tablet/phone board both kitchens already use; the COOK/COOL/HEAT/SEND chips become **tappable → a 2-field temp/time entry**. Persists to localStorage (HUB already does `_writeCache`); shows CCP status in the existing colour language.
- **DOOR** — *owns the gate + the record of truth.* Its hardened publish queue (`_ghWriteQueue`, `PublishAuth`) and dormant `computeDoorComplianceDiagnostics`/Gate-9 are the natural home to publish `haccp_log.json` and to run the **pre-service HACCP gate** (thermal + the allergen CCP-6 it already owns).
- **EXPO** — *owns scheduling.* Runs the §4 schedule-vs-hold check when it writes `hub_schedule.json`.

**The contract artifact — `haccp_log.json`** (published, append-only; joins to `hub_schedule.json` by `site+day+recipe` and to CODEX by `recipeId`):
```jsonc
{
  "_version": "…", "_generated": "2026-06-24T18:02Z", "_site": "Bloor",
  "batches": [{
    "batchId": "BLOOR-2026-06-22-vegan-chilli",
    "recipe": "Vegan Chilli", "recipeId": "…", "stream": "vegan",
    "site": "Bloor", "cookDate": "2026-06-22", "qty": "130 lb", "packaging": "vac",
    "ccp": {
      "cook":   { "temp": 84, "unit": "C", "time": "11:40", "by": "JD", "pass": true },
      "cool":   { "start": {"temp":82,"time":"12:00"}, "mid": {"temp":18,"time":"13:50"},
                  "end": {"temp":3,"time":"15:30"}, "method": "blast", "pass": true },
      "bag":    { "cookDate": "2026-06-22", "useBy": "2026-06-29", "by": "JD" },
      "transport": { "departTemp": 3, "departTime": "07:30", "arriveTemp": 4,
                     "arriveTime": "08:10", "route": "Bloor→Rex", "by": "AM-van" },
      "reheat": { "temp": 75, "time": "16:20", "once": true, "pass": true, "by": "RX" }
    },
    "corrective": [],
    "status": "complete"     // open | complete | deviation | discarded
  }]
}
```
**Surfacing on the board:** reuse what's already there — the FRIDGE age dots and MOVES `holdClass` r/y/g become **HACCP status** (green = all CCPs logged & in-limit; amber = a check due/approaching use-by; red = a deviation or over-limit hold). The cook sees the same board they always do; the safety state is just *in* it. *The tool recedes.*

---

## 7. Phased rollout (graceful, no big-bang)

- **Phase A — capture + daily log (HUB, localStorage only).** Tappable chips → temp/time entry; a printable/exportable end-of-day CCP log. **Immediate value, no publish, no build, degrades from `file://`.** This alone gets CONC to "we record our CCPs."
- **Phase B — publish the record.** Add a DOOR-style hardened write of `haccp_log.json` → the durable, off-device record (Principle 7 satisfied).
- **Phase C — the gate + the schedule check.** Extend `computeDoorComplianceDiagnostics`/Gate-9 to a pre-service thermal+allergen gate; wire the EXPO §4 schedule-vs-hold flag. **Now it's prevention, not just paperwork.**

---

## 8. Open decisions (for the architect / TPH)

1. **Capture placement** — recommended split above (capture in HUB, record+gate in DOOR). The one new surface is a small write/publish path in HUB; everything else reuses existing machinery. *Confirm this split before building.*
2. **ROP use-by = 7 d** — ratify with TPH (and whether the vacuum/ROP special process needs a TPH variance at all).
3. **Retention period** — confirm ≥1 year against TPH guidance.
4. **Probe hardware** — do the kitchens have enough calibrated digital probes / an in-chiller logging probe for per-batch capture? (Drives Phase A feasibility.)

---

*Working draft. Software shapes are a design proposal. Limits validated 2026-06-24 against Health Canada / O. Reg. 493/17 / FDA / FSA-ACMSF (established standards; reconfirm against the cited sources). Open TPH item: ROP special-process approval / variance.*
