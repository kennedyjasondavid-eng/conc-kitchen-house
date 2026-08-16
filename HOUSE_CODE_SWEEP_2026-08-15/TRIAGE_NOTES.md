# TRIAGE_NOTES — HOUSE code sweep 2026-08-15

Raw intake: **93 findings** across 11 slices (per findings/ files; two slice summaries miscounted their own severities by 1 — the files are authoritative: X-B is 3 P1/6 P2/2 P3, E-3 is 3 P1/2 P2/2 P3).

## Cross-slice merges (dedupe — same defect found independently = convergence, boosts confidence)

| Merged ID | Members | Note |
|---|---|---|
| MERGE-1 | E-1-2 + E-3-6 | Day-Sheet stale `2026-05-10` anchor + no cycle wrap. Found independently by both EXPO agents. P1. |
| MERGE-2 | X-B-9 + X-A-5 | MISE 4-file CODEX publish non-atomic, zero retry (D1-class, different repo). P1. |
| MERGE-3 | X-A-3 + M-2-5 | The allergen-fabrication chain, both ends: data layer never uses `null` (12/240 `allergens:[]`, display's honest "unverified" state unreachable — M-2-5) AND the `|| []` fabrication reaches BOTH published feeds with a live empty-stub instance (Apple Crisp) consumed by DOOR slot-flag autofill + EXPO conflict-scan fallback (X-A-3). **The sweep's most consequential finding.** P1, latent. |
| MERGE-4 | H-1-8 + X-C-3 | `SECTION_COUNTS` write-only (3 writer pipelines + a dead DOOR registry fetch, zero readers). P2. |
| MERGE-5 | X-B-11 + X-C-2 | Shared `conc_gh_token` sanitized on read in EXPO only; DOOR/HUB read it raw (EXPO's fixed v9.29 crash class live in 2 siblings). P2. |
| MERGE-6 | D-1-5 + X-B-1 | DOOR publish-trigger sprawl (21 publishAndSync + 8 sidePublish sites, zero debounce) + un-busted SHA GETs making the 409 retry structurally ineffective; same-file double-writes guarantee the <60s window. KNOWN → D1, with substantial new mechanism evidence. P1 KNOWN. |

Post-merge: **87 unique findings** — **29 P1 · 39 P2 · 19 P3 · 0 P0**.

## Severity calls (main-loop calibration)

- **No P0s claimed and none upgraded.** Closest candidates examined: MERGE-3 (latent — none of the 12 empty-allergen recipes is on the live menu; verified by X-A) and X-C-8 (DOOR registry save silent-fail incl. anaphRooms — the same-session publish still ships correct data; the loss window is local-restore-after-failed-write). Both stay P1 with the latency/window stated plainly.
- D-1-3 (anaph banner GF-drop, KNOWN from the repo's own KNOWN_VS_SHOWN register, open ~8 weeks) + D-1-9 (the only covering test passes empty fixtures — the defect is structurally invisible to door-smoke's 70/70) together form the report's **top food-safety item**: known, open, and un-gated.
- Main-loop spot-verification (2026-08-16, this session): H-1-1 (deploy.yml lacks the sidecar cp — confirmed), E-1-1 (`_RAW_SEND_ARCHETYPES` const @10982 vs parse-time read @3985 via merge @9693 — confirmed), M-2-2 (`DOOR_LIVE_PUBLISH_APPROVAL` single assignment — confirmed).

## Refute set (per plan: 100% of P1s + all FORKs; P2/P3 calibration sample)

- **R-1 (HUB + DOOR + storage + portal):** H-1-1, H-1-2, H-1-3(FORK), H-1-4, H-1-5(FORK), D-1-1, D-1-2, D-1-3+D-1-9 (as one), MERGE-6, X-C-7, X-C-8, P-1-7(FORK), P-1-8(FORK) + calibration sample: H-1-6, H-1-15, D-1-7.
- **R-2 (EXPO + MISE + PROOF + cross):** E-1-1, E-1-5, MERGE-1, E-2-1, E-2-2(FORK), E-2-7, E-3-1, E-3-2, M-1-1, M-2-2, MERGE-2, MERGE-3, X-B-10, X-C-9, P-1-1, P-1-2 + calibration sample: E-2-3, M-2-6, X-A-4.
- Verdicts: CONFIRMED / REFUTED(reason) / DOWNGRADE / RECLASSIFY — appended below by the refute agents' reports.

## Verdicts (filled after refute pass)

(pending)
