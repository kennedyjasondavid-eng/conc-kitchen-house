# HOUSE Code Sweep 2026-08-15 — COMMON BRIEF (read first)

You are one slice of an 11-agent, analysis-only code sweep across the six HOUSE repos. Your job: find **redundancies, kludges, footguns, and cleaner-structure opportunities** in your assigned slice, with evidence, and write them to your findings file.

## Hard rules

- **ANALYSIS ONLY.** You create exactly ONE file: `/home/user/conc-kitchen-house/HOUSE_CODE_SWEEP_2026-08-15/findings/<SLICE>.md`. You modify nothing else — no app code, no data, no tests, no docs, no git state changes (no add/commit/push/checkout/stash). Scratch scripts go in your scratchpad or /tmp.
- The repos are under **active development elsewhere today**. Record the HEAD of every repo you touch (`git -C <repo> log -1 --format="%h %s"`) in your findings header.
- Read `../KNOWN.md` (same sweep dir) before claiming any finding is NEW.

## HOUSE in one paragraph

Six repos at `/home/user/`: **DOOR** (`conc-kitchen-door`) = resident registry + menu source, upstream of everything; **EXPO** (`conc-kitchen-expo`) = production scheduler; **HUB** (`conc-kitchen-hub`) = staff daily board (renders, never computes); **MISE/CODEX** (`conc-recipe-hub`) = recipe/allergen/cost feed into DOOR+EXPO; **PROOF** (`conc-kitchen-proof`) = funder reporting reading DOOR/HUB/CODEX feeds; **HOUSE** (`conc-kitchen-house`) = umbrella portal + governance docs. All apps are deliberately **single-file HTML, no build step**, offline-capable from `file://`; **localStorage is live state**; committed JSONs are published snapshots siblings consume off GitHub Pages. All apps share **one Pages origin → one localStorage namespace**. Telos: *a tool that recedes — fewer staff errors*. Food-safety (anaphylaxis, halal/vegan routing) outranks everything else.

## Grading lenses (the INSIGHTS canon — judge by these)

1. **Single source of truth** — a stored copy of a derivable fact is a second truth that can disagree.
2. **Silently-dead code** — JS can outlive the DOM element/store it targets; grep looks healthy; only a runtime/binding check tells.
3. **Known≠shown** — most UI defects are the surface hiding/distorting/jargonizing what the engine already knows.
4. **Gate the populated/hostile state** — a gate green on the clean baseline can be green *because* the feature is inert (incl. the returning-user boot).
5. **Silent failure on a load-bearing write** is the worst class — degrade visibly, not just safely.
6. **The deployed artifact is the oracle** — docs and comments are claims to verify, not facts.
7. **Data-over-code** — capability profiles / entity fields beat override tables and identity-branching.
8. **Find the existing seam** before proposing a new mechanism.
9. **Ceremony ≠ boundary** — name where enforcement actually lives; a cry-wolf guard spends real guards' credibility; a hand-frozen "expected value" rots into a false-alarm generator.
10. **Source order is a load-bearing contract** in a single file (parse-time TDZ class), and nothing enforces it.

## What NOT to report

- Anything in `KNOWN.md` → status KNOWN (cite it). New *evidence* on a known item is welcome.
- The RETIRED class (see KNOWN.md §Ruled) — never propose modularization/namespaces/build tooling.
- Culinary/menu content choices (Jason-ruled facts). Data *integrity* defects ARE in scope.

## Protocol (in order; ~60–90 min; if time-pressed, complete footgun coverage first)

1. **Orient**: KNOWN.md + your slice brief + mandatory pre-reads. Map your slice from its section banners.
2. **Grep battery** over the whole file(s) you own (record counts + notable lines):
   empty catches `catch\s*\([^)]*\)\s*\{\s*\}` (then INSPECT those wrapping load-bearing writes) · sinks `innerHTML\s*=` / `insertAdjacentHTML` / `document.write` / `outerHTML\s*=` · storage ops incl. **constructed** keys · version order-compares (`<`/`>` near version-ish identifiers, `localeCompare`) · bare `JSON.parse` (no try/fallback) · inline handlers `on\w+="` (collect names → set-diff vs defined functions) · `setTimeout`-as-sequencing (magic delays standing in for ordering) · `new Date(` with string args · duplicate `function <name>` declarations · self-confessed markers `legacy|deprecated|for now|TODO|FIXME|workaround|shim`.
3. **Attentive read** of your assigned range. Flag priority: **footgun > data > kludge > redundancy**.
4. **Load-bearing-write trace**: every persistence/publish write in slice — on throw/quota/network-fail, is it silent? does the UI keep claiming success/freshness? are multi-key writes atomic?
5. **Doc-drift spot-check**: 3–5 load-bearing claims (CLAUDE.md/README/plan docs) about YOUR slice vs HEAD.
6. **Dead code/CSS**: functions defined but never referenced — the reference search MUST include string contexts (`onclick="fn("`, template literals); sampled CSS selectors vs markup; compat shims past their window.
7. **Emit** the findings file; return a ≤10-line summary message (counts by severity + top-3 one-liners). The FILE is the deliverable — never truncate the file to fit the message.

## Finding schema (one block per finding)

```
### <SLICE>-<n> · <short title>
- class: redundancy | kludge | footgun | opportunity | doc-drift | test-gap | data
- severity: P0 (food-safety / data-loss / corrupts live staff board) | P1 (correctness or trust-surface defect) | P2 (robustness / efficiency / hygiene) | P3 (cosmetic / doc nit)
- status: NEW | KNOWN → <ref> | RULED → <ref>
- confidence: verified (you traced evidence AND consequence at HEAD yourself) | plausible
- where: <file>:<line(s)>
- what: 1–3 sentences.
- evidence: minimal quoted line(s)/measurement.
- consequence: the telos-relevant outcome (who is affected, when, how bad).
- direction: 1–2 sentences naming an EXISTING in-house seam/pattern; or "FORK: needs Jason —" with the fork stated. Never a RETIRED proposal.
```

**Quality bar:** 10–25 substantial findings beat 60 trivia. Batch related P3s into one grouped finding. Every P0/P1 will face an adversarial refute pass — self-check the consequence chain before claiming.

## Interruption armor (added after the 18:20 UTC cap outage)

- **Write your findings file INCREMENTALLY.** Create it with its header the moment you start; append each grep-battery result and each finding AS YOU CONFIRM IT; finish by updating the coverage statement + healthy/limitations sections. If your run is killed, the partial file is salvage.
- **If `findings/<SLICE>.md` already exists** (a prior interrupted run), read it first and CONTINUE from where it stops — do not restart from zero or overwrite completed sections.

## Findings file layout

1. Header: slice id, date, repo HEAD sha(s), **coverage statement** (ranges read attentively; ranges skim-class and why).
2. Grep-battery results (counts + notable lines).
3. Findings (schema blocks, most severe first).
4. **Confirmed-healthy** notes — things you checked expecting problems and found solid (name them; the report needs these).
5. Limitations — what you could not verify and why.
