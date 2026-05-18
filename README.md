# HOUSE — CONC Kitchen Operations

**HOUSE** (Hospitality Operations Unified System Engine) is the umbrella for the four single-file web apps that run the CONC (Christie Ossington Neighbourhood Centre) shelter catering operation.

**Live portal:** https://kennedyjasondavid-eng.github.io/conc-kitchen-house/

Open the portal on a phone or laptop and tap a tile to launch any of the four apps. The portal is the home screen — start here, drill into the app you need.

---

## The four apps

| App | What it does | Who uses it most | Live URL |
|---|---|---|---|
| **DOOR** | Resident intake, active menu, plating sheets, allergen compliance | Floor staff, supervisors | [conc-kitchen-door](https://kennedyjasondavid-eng.github.io/conc-kitchen-door/) |
| **CODEX** | Recipe library, creation, scaling, allergen data (a.k.a. MISE) | Cooks, recipe author | [conc-recipe-hub](https://kennedyjasondavid-eng.github.io/conc-recipe-hub/) |
| **HUB** | Unified kitchen whiteboard — today's schedule, sends, pulls, driver runs | Everyone on shift | [conc-kitchen-hub](https://kennedyjasondavid-eng.github.io/conc-kitchen-hub/) |
| **EXPO** | Production and logistics scheduling engine (4-week, multi-site) | Production planner | [conc-kitchen-expo](https://kennedyjasondavid-eng.github.io/conc-kitchen-expo/) |

Each app is a single HTML file hosted on GitHub Pages. No login, no backend, no install. Open the URL on any modern browser.

---

## How they fit together

```
                    ┌────────────────┐
                    │   CODEX (MISE) │   recipe data, allergens, cost
                    │   recipe-hub   │
                    └────────┬───────┘
                             │ recipe_production.json
                             │ DOOR_RECIPE_DATA.json
                             ▼
   ┌──────────┐         ┌────────────┐         ┌──────────┐
   │  DOOR    │────────▶│   EXPO     │────────▶│   HUB    │
   │ kitchen- │ menu_*  │ production │  hub_   │  daily   │
   │  door    │ .json   │  schedule  │ schedule│  board   │
   └──────────┘         └────────────┘         └──────────┘
        residents          rotating menu          today
        plating            cook/prep/send         every-
        compliance         multi-site             one
```

- **DOOR** authors the active menu (`menu_current.json`, `menu_reno.json`) and tracks residents + restrictions.
- **CODEX** holds canonical recipe data (`recipe_production.json`, `DOOR_RECIPE_DATA.json`) that DOOR and EXPO pull from at load time.
- **EXPO** pulls menu from DOOR + recipes from CODEX, runs the scheduler, publishes `hub_schedule.json`.
- **HUB** displays the published schedule for floor staff — printable, filterable, day-by-day.

If a fetch fails (offline, GitHub down), each app falls back to baked-in snapshots and keeps working from `file://`.

---

## Quick start by role

**Cook / floor staff** — Open the portal, tap **HUB** for today's schedule. Tap **DOOR** to look up a resident's restrictions or print a plating sheet.

**Supervisor / shift lead** — Use **DOOR** for intake / discharge / restriction edits. Generate plating sheets at the start of each meal. Hit Push when you're done so the rest of the system sees the changes.

**Production planner** — **EXPO** is the cockpit. Pull menu from DOOR, regenerate schedule, push to HUB. Use the wizard to add new items mid-cycle.

**Recipe author** — **CODEX** is the library. Add or edit a recipe, then push so EXPO and DOOR pick up the new data on their next fetch.

---

## Maintenance overview (for the person who keeps this running)

### Single-file HTML is the rule

Every app (with one exception below) is one `index.html` file with all CSS and JS inline. No build tools. No npm. No frameworks. Open the file in a browser and it works. This is **non-negotiable** — the system survives because anyone with a text editor and a browser can read, debug, and ship it.

Exception: **HUB** uses a generated pipeline. The hosted file is `CONC_Production_Hub.html`, produced from `00_Production_Source_Table.xlsx` + `hub_shell.html` + `hub_logic.js` + `hub_rcp.js` via `CONC_Hub_Builder.html`. See [HUB README](https://github.com/kennedyjasondavid-eng/conc-kitchen-hub#readme).

### Data flow & coupling

Each app fetches the others' published JSON at load time. URLs are externalized in EXPO via the `DATA_SOURCES` config (settings panel → Data Sources). DOOR and CODEX hardcode their URLs but include local snapshot fallbacks.

| File | Owner | Consumers |
|---|---|---|
| `menu_current.json`, `menu_reno.json` | DOOR | EXPO |
| `routing_by_meal.json` | DOOR | EXPO (resident counts) |
| `DOOR_RECIPE_DATA.json` | CODEX | DOOR (allergens, kitchen routing) |
| `recipe_production.json` | CODEX | EXPO (cook times, equipment, sites) |
| `hub_schedule.json` | EXPO → HUB repo | HUB |

When a JSON contract changes, update both producer and consumer in the same change set or stage carefully — drift across repos is the most common source of bugs.

### Repos

| App | Repo | Push tool |
|---|---|---|
| HOUSE | [conc-kitchen-house](https://github.com/kennedyjasondavid-eng/conc-kitchen-house) | git CLI |
| DOOR | [conc-kitchen-door](https://github.com/kennedyjasondavid-eng/conc-kitchen-door) | `KitchenDOOR_Push.hta` |
| CODEX | [conc-recipe-hub](https://github.com/kennedyjasondavid-eng/conc-recipe-hub) | `CONC_Recipe_Hub_Push.hta` |
| HUB | [conc-kitchen-hub](https://github.com/kennedyjasondavid-eng/conc-kitchen-hub) | `CONC_Hub_Builder_Push.hta` |
| EXPO | [conc-kitchen-expo](https://github.com/kennedyjasondavid-eng/conc-kitchen-expo) | git CLI / in-app Save button |

All repos live as OneDrive folders on Jason's machines:
```
C:\Users\Jason\OneDrive - CHRISTIE OSSINGTON NEIGHBOURHOOD CENTRE\
├── conc-kitchen-house\
├── conc-kitchen-door\
├── conc-recipe-hub\
├── conc-kitchen-hub\
└── conc-kitchen-expo\
```

OneDrive keeps the home and work machines in sync automatically. **Do not clone a second copy** of any repo — work directly from the OneDrive folder so both machines stay aligned.

### The HOUSE portal itself

This repo (`conc-kitchen-house`) contains only:

| File | Purpose |
|---|---|
| `index.html` | Portal landing page — green-card grid with PIN gate on certain tiles |
| `CONC-Logo_bw_nobackground_large-300x300.png` | Watermark logo |
| `README.md` | This file |

To change which apps are linked, edit the four `<a class="card">` blocks in `index.html`. The PIN modal (if enabled) is wired up in the same file — search for `pin-modal` to find it.

---

## House rules (do not break)

- **Single-file HTML.** No build tools, no npm, no frameworks, no React.
- **Each app is independent** — must work standalone if every other app is offline. Fallback to baked-in data.
- **Deterministic outputs.** Same inputs → same outputs. No timestamps in baked data, no random ordering.
- **GitHub Pages hosting only.** No servers, no databases, no cloud functions.
- **localStorage is the user's data.** Architect changes via baked-in tables; user edits via localStorage. Don't blow away their edits on a deploy.
- **Push tools matter.** The HTA push scripts are the daily workflow. If they break, the whole system slows down.

---

## Versions (current)

| App | Version | Date | Notes |
|---|---|---|---|
| HOUSE portal | v1.0 | 2026-05-16 | Initial four-card landing |
| DOOR | v25+ | 2026-05-12 | Tier migration, ~17.5K lines |
| CODEX (MISE) | v50 | 2026-05-09 | Dark mode complete, 224 recipes, ~21K lines |
| EXPO | v9.17 | 2026-05-17 | Phase 0 shipped, reno-from-DOOR live, ~23K lines |
| HUB | (pipeline) | 2026-05-17 | `hub_schedule.json` driving live board, reno mode |

For per-app history, see each repo's README and changelog/handoff docs.

---

## When things break

1. **App won't load** — open devtools, look at the console. Most failures are JSON fetch errors (CORS, 404, network). Each app has a baked-in fallback; if it's not kicking in, the bug is in the fallback path.
2. **Data looks stale** — check the source app's last push (GitHub Pages takes ~60s to redeploy). Hard-refresh (Ctrl+Shift+R) the consuming app.
3. **Cross-app drift** — verify the JSON contract. The producer's published file is the source of truth; the consumer's expectations are in its `fetch*` / `load*` functions.
4. **Push tool fails** — token expired most likely. Regenerate at github.com/settings/tokens.

---

*CONC Catering Kitchen — Christie Ossington Neighbourhood Centre, Toronto.*
