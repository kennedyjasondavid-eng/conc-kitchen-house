---
name: production-hub
description: "Generate and update the CONC Kitchen Production Hub — a single-file interactive HTML dashboard that replaces the production schedule printout, driver execution schedule, fridge routing schedule, and daily sends/pulls calendar as a unified daily reference for all staff. Use this skill whenever Jason asks to: build, update, regenerate, or add weeks to the Production Hub; change filters, sections, or print layout in the hub; populate a new week from the production schedule; fix data in the hub; or anything involving the interactive HTML calendar/dashboard for kitchen operations. Also trigger when he mentions \"the hub\", \"production hub\", \"the HTML schedule\", \"the calendar view\", \"the interactive schedule\", or asks to print/export the weekly view."
---

# CONC Production Hub — Skill Reference

## What This Is

A single-file HTML dashboard (`CONC_Production_Hub.html`) that consolidates multiple operational
documents into one interactive reference. It runs in Edge/any browser with zero dependencies,
and is shared via the CONC OneDrive / GitHub Pages. Every staff role gets a tailored view via filters.

**Documents it replaces as a daily reference:**
- 01_Production_Schedule (Bloor/LAN task view)
- 03_Driver_Execution_Schedule (Driver view)
- 05_Fridge_Routing_Schedule — Sends & Pulls tab (Cold-chain Movements section)
- 05_Fridge_Routing_Schedule — Daily Fridge Snapshot tab (Fridge Snapshot section)
- 05_Daily_Sends_Pulls_Calendar (integrated into Movements + Send sections)

The source-of-truth `.xlsx` files remain the master documents. The hub is a generated read-only view.

---

## Architecture

Single HTML file. No server, no build step, no external JS libraries. Fonts loaded from Google Fonts
(DM Sans + JetBrains Mono). All data is embedded as JS objects in a `<script>` block. CSS uses
custom properties for theming. Runs in Edge, Chrome, Safari, and prints cleanly.

### Source Files (Component Architecture)

The hub is built from separate component files assembled by `assemble_builder.py` or `CONC_Hub_Builder.html`:

| File | Role |
|------|------|
| `hub_shell.html` | HTML structure, CSS variables, all styles, static UI chrome |
| `hub_logic.js` | All JS — filters, rendering, navigation, popover, search, menu panel, dark mode |
| `hub_rcp.js` | RCP recipe keyword→URL dictionary and rcpUrl() function |
| `00_Production_Source_Table.xlsx` | Single source of truth for all production data |
| `assemble_builder.py` | CLI assembler — combines components into Builder HTML |
| `CONC_Hub_Builder.html` | Browser-based build tool — reads xlsx, generates hub |
| `builder_core.js` | Pipeline logic for the Builder (data extraction, assembly) |
| `builder_ui.html` | Builder UI markup |
| `builder_ui.css` | Builder styles (includes dark mode) |

**When making changes:** Always edit the component files and rebuild via `assemble_builder.py`,
rather than editing assembled output files directly. Changes to `hub_shell.html` or `hub_logic.js`
must be synced to `CONC_Production_Hub.html` manually if the hub is being edited directly.

### Dual-Mode Rendering

The hub has two rendering paths in the same file:

**Interactive mode** (desktop, File Explorer → Edge): JavaScript runs, adds `js-ready` class to
`<body>`, which hides the static fallback and shows the full interactive UI.

**Static fallback** (SharePoint web view, OneDrive mobile app, any JS-blocked context): JavaScript
is blocked, `js-ready` never added. Pre-rendered `<div id="sf">` is visible.

Key CSS pattern:
```css
#sf { display: block }
.js-ready #sf { display: none }
.top, .wt, .wi, .fb, .fh, .ws { display: none }
.js-ready .top { display: flex }
.js-ready .ws { display: grid; grid-template-columns: repeat(4, 1fr) }
```

### Deployment

GitHub repo: `kennedyjasondavid-eng/conc-kitchen-hub` (public).
Pages URL: `kennedyjasondavid-eng.github.io/conc-kitchen-hub/`

Workflow:
1. Build hub locally with `CONC_Hub_Builder.html`
2. Commit `CONC_Production_Hub.html` + `00_Production_Source_Table.xlsx` + component files
3. GitHub Actions runs `generate_all.py --xlsx-only` → generates xlsx downloads
4. Pages serves hub as `index.html` + xlsx downloads

Files that must be in the repo folder (and `_site/` via deploy.yml):
- `CONC_Production_Hub.html`
- `00_Production_Source_Table.xlsx`
- `02_Renovation_4_Week_Menu.xlsx` (for the download link in hub)
- `01_Production_Schedule_generated.xlsx`
- `03_Driver_Schedule_generated.xlsx`
- `Labour_Report_generated.xlsx`

---

## Dark Mode

The hub has a persistent dark mode toggle, defaulting to light.

### Implementation

**CSS variables:** `:root` defines light palette. `[data-theme="dark"]` block overrides all variables.
A separate `--hd` (header dark background) variable was split from `--tx` so dark mode can flip text
without affecting dark header banners. All header backgrounds use `background:var(--hd)`.

**Anti-flash script** in `<head>` (before CSS loads):
```html
<script>
  (function(){
    var t=localStorage.getItem('conc-theme');
    if(t==='dark') document.documentElement.setAttribute('data-theme','dark');
  })();
</script>
```

**Toggle button** in the `.top` banner (right side):
```html
<button id="dmBtn" onclick="toggleDark()">🌙 Dark Mode</button>
```

**JS toggle:**
```js
function toggleDark(){
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const next = isDark ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('conc-theme', next);
  document.getElementById('dmBtn').textContent = next === 'dark' ? '☀ Light Mode' : '🌙 Dark Mode';
}
```

**Key dark palette:**
- `--bg: #1c1a17` (body background)
- `--sf: #252320` (card surface)
- `--bd: #3a3835` (borders)
- `--bl: #2d2b27` (light panels)
- `--tx: #e0dbd2` (body text)
- `--hd: #111009` (header/banner background)

---

## Menu Panel

A full-screen panel showing the 4-week renovation menu, accessible via `🍽 Menu` button in the toolbar.

### Header

Title: **"🍽 CONC Temporary Renovation Menu — Rexdale"**
Subtitle (`#mnSub`): Date range for the active week (e.g., "May 17–23"), updated by `renderMenu()`.

### Data

Static const `MENU_DATA` embedded in `hub_logic.js` — extracted from `02_Renovation_4_Week_Menu.xlsx`.
Format: `{"1": [{bf, bfv, bfx, bfa, lu, luv, lua, di, div, dih, dia}, ...7 days], "2": ...}`

Fields: `bf`=breakfast regular, `bfv`=breakfast vegan, `bfx`=extras (fruit etc.), `bfa`=allergens,
`lu`=lunch, `luv`=lunch vegan, `lua`=lunch allergens, `di`=dinner, `div`=dinner vegan,
`dih`=dinner halal, `dia`=dinner allergens.

Week labels: `MENU_WK_LABELS = {1:'Wk 1 · May 17–23', 2:'Wk 2 · May 24–30', 3:'Wk 3 · May 31–Jun 6', 4:'Wk 4 · Jun 7–13'}`

Day dates per week: `MENU_DAY_DATES` — 7 date strings per week for column headers.

### Layout

- **Tabs** — pill-style week selectors (`Wk 1` through `Wk 4`)
- **Legend** — 🌱 Vegan · ☪ Halal · ⚠ Allergens
- **Table** — 7 day columns × 3 meal sections (Breakfast/Lunch/Dinner)
  - Column headers show day name + date (e.g., `Sun / May 17`)
  - Section banners: blue (Breakfast), amber/gold (Lunch), green (Dinner)
  - Colored left border on data rows matches section color
  - Allergen shown as red pill badge
  - Veg/Halal shown with dashed separator line above

### Scroll (mobile)

`#mn` is `display:flex; flex-direction:column; overflow:hidden`. Header/legend/tabs are
`flex-shrink:0`. `.mn-bd` is `flex:1 1 auto; overflow:auto; -webkit-overflow-scrolling:touch`.
This gives a single scroll context for both vertical and horizontal scrolling on iOS.

### Print

Switches to `@page { size: letter landscape }`. Resets `#mn.a` to `position:static`.
Tabs hidden. Colors forced with `print-color-adjust: exact`. Section banners and data rows
print with full color.

### Panels are mutually exclusive

Opening the menu closes the popover and overview. Opening the overview closes the menu.
All panels restore `document.body.style.overflow = ''` on close.

---

## Day Popup (Popover) Navigation

### Arrow button placement

`◀` and `▶` buttons are **outside the `.pop` div**, placed as direct siblings after it in the HTML.
They use `position:fixed`, vertically centred at screen height, pinned to the popover edges:

```css
.pnav { display:none; position:fixed; top:50%; transform:translateY(-50%); z-index:103;
  background:var(--hd); border:none; color:#fff; font-size:20px; cursor:pointer;
  width:40px; height:56px; border-radius:8px; box-shadow:0 4px 16px rgba(0,0,0,.3) }
#pPrev { left: max(6px, calc(50vw - 316px)) }
#pNext { right: max(6px, calc(50vw - 316px)) }
.pnav.vis { display:flex }
```

Arrows are shown/hidden by adding/removing the `.vis` class in `openPop()` / `closePop()`:

```js
document.getElementById('pPrev').classList.add('vis');    // in openPop()
document.getElementById('pPrev').classList.remove('vis'); // in closePop()
```

This means the arrows stay at exactly the same screen position on every day — staff can
tap the same spot repeatedly to step through days without moving their finger.

### Popover header

Title only + print buttons + close (no nav arrows in header):

```html
<div class="pop-hd">
  <h2 id="pT" style="flex:1 1 auto;min-width:0"></h2>
  <div class="pop-hd-b">
    <button class="pb" id="bD">🖨 Day</button>
    <button class="pb" id="bW">🖨 Week</button>
    <button class="px" id="pX">&times;</button>
  </div>
</div>
```

### Swipe navigation

Touch listeners on `#pop` with direction locking:

```js
pop.addEventListener('touchstart', e => { _tx=e.touches[0].clientX; _ty=e.touches[0].clientY; _lock=null; }, {passive:true});
pop.addEventListener('touchmove', e => {
  const dx=e.touches[0].clientX-_tx, dy=e.touches[0].clientY-_ty;
  if (_lock===null && (Math.abs(dx)>8 || Math.abs(dy)>8))
    _lock = Math.abs(dx) > Math.abs(dy) ? 'h' : 'v';
  if (_lock==='h') e.preventDefault();   // prevent horizontal pan
}, {passive:false});
pop.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - _tx;
  if (_lock==='h' && Math.abs(dx)>50 && DI!==null) dx<0 ? navDay(1) : navDay(-1);
}, {passive:true});
```

`passive:false` on `touchmove` is required to allow `preventDefault()`. Vertical scrolling
is unaffected because `preventDefault()` is only called when `_lock === 'h'`.

---

## Download Bar

Reference documents bar below the day cards:

```html
<div class="dl">
  <span class="dl-lbl">📥 Reference Documents (Downloads)</span>
  <a href="00_Production_Source_Table.xlsx" download>📋 Production Source Table (master doc)</a>
  <a href="01_Production_Schedule_generated.xlsx" download>📊 Production Schedule</a>
  <a href="03_Driver_Schedule_generated.xlsx" download>🚐 Driver Schedule</a>
  <a href="Labour_Report_generated.xlsx" download>⏱ Labour Report</a>
  <a href="02_Renovation_4_Week_Menu.xlsx" download>🍽 4-Week Menu</a>
</div>
```

All linked files must be co-located in the same folder as the hub (or `_site/` on Pages).

---

## Toolbar

```
[Wk1][Wk2][Wk3][Wk4]  Week info  |  Site: [All][Bloor][Lansdowne][Rexdale]  Show: [🍳 Kitchen][🚐 Driver]
[📋 Overview] [🍽 Menu] [📅 Today]  [🔍 Search…]  [🔄]  Built timestamp  |  [🌙 Dark Mode]
```

Dark mode button is right-aligned in the `.top` banner (not the filter row).

---

## JS Validation (builder_core.js)

The validator extracts the main `<script>` block using `lastIndexOf` for both tags:

```js
const scriptStart = hubHtml.lastIndexOf('<script>');
const scriptEnd   = hubHtml.lastIndexOf('</script>');
const jsOnly = hubHtml.slice(scriptStart + 8, scriptEnd);
```

**Critical:** Must use `lastIndexOf` (not `indexOf`) because the hub now has TWO `<script>` tags —
the anti-flash dark mode snippet in `<head>`, and the main data+logic block at the end of `<body>`.
Using `indexOf` for the opening tag grabs the head snippet and includes all HTML between the two
blocks, causing an `Unexpected token '<'` syntax error in the validator.

---

## Data Model

Three JS data structures power the hub. When populating a new week, these are what get filled.

### 1. `WEEKS` — Production Data (per week)

```js
const WEEKS = {
  4: {
    number: 4,
    range: "June 7–13, 2026",
    note: "Remediation · All food HOT from Bloor or LAN · Rex = portion & serve only",
    days: [ /* array of 7 day objects, Sun–Sat */ ]
  }
};
```

Each **day object**:
```js
{
  dayName: "Monday",
  date: "Jun 8",
  dateNum: 8,       // calendar day-of-month
  sections: [ ... ] // array of 5 section objects
}
```

Each **section object**:
```js
{
  id: "send-am",          // one of: send-am, lunch, production, dinner, send-pm
  label: "▲ Send AM",
  vanLoad: "3 hotels + bags",  // only on send-am and send-pm
  items: [ ... ]
}
```

Each **item object**:
```js
{
  type: "COOK",           // SEND | HEAT | COOK | PREP | SOUP | ALT
  item: "Fish Curry",
  qty: "150 pcs",
  site: "Bloor",          // Bloor | LAN | GC
  route: "Bloor → Rex",   // SEND items only
  time: "30 min",
  notes: "Bake in sauce",
  serves: "Today's Dinner"
}
```

Helper: `function S(type, item, qty, site, opts={}) { return { type, item, qty, site, ...opts } }`

### 2. `FRIDGE` — Daily Fridge Snapshots

```js
const FRIDGE = {
  4: {  // keyed by dateNum
    bloor: { u: 4, cap: 24, items: "..." },
    rex:   { u: 11, cap: 60, items: "..." },
    lan:   { u: 0, cap: 12, items: "(day-of staging only)" },
    status: "✅"
  }
};
```

**CRITICAL:** Every FRIDGE entry MUST include all three site properties — `bloor`, `rex`, AND `lan`.
Missing `lan` causes a runtime crash.

### 3. `MOVES` — Cold-Chain Movements

```js
const MOVES = {
  4: [{
    dir: "PULL",
    item: "Thai Green Curry",
    from: "LAN", to: "LAN→Bloor→Rex (hot)",
    qty: "1.5u", run: "AM",
    hold: "4d", holdClass: "g",
    notes: "..."
  }]
};
```

### 4. `MEALS` — Menu Meal Descriptions

```js
const MEALS = {
  12: { lunch: 'Chicken Deli / Veg Sandwich, Broccoli Salad',
        dinner: 'Beef/Mushroom Stroganoff, Pasta' },
  // 28 entries total, keyed by dateNum
};
```

### 5. `MENU_DATA` — Full 4-Week Menu (static, in hub_logic.js)

Separate from `MEALS`. Not regenerated by the Builder — it's static in `hub_logic.js` and carries
through to every built hub automatically. Contains full breakfast/lunch/dinner data for all 4 weeks.
Sourced from `02_Renovation_4_Week_Menu.xlsx`. Update manually when menu changes.

---

## Filter System

```js
const ALL_SITES = ['Bloor', 'LAN', 'Rex'];
let SITE = new Set(ALL_SITES);  // multi-select
let SK = true;   // show kitchen sections
let SD = true;   // show driver sections
let WK = 1;      // active week
let DI = null;   // active day index (null = closed)
```

Item visibility:
```js
function vis(it) {
  let siteOK = false;
  if (siteAll()) siteOK = true;
  else if (siteOnly('Rex')) siteOK = it.type === 'SEND';
  else {
    if (SITE.has(it.site)) siteOK = true;
    if (SITE.has('Rex') && it.type === 'SEND') siteOK = true;
  }
  if (!siteOK) return false;
  if (it.type === 'SEND') return SD;  // Note: uses startsWith('SEND') in vis() logic
  return SK;
}
```

**CRITICAL:** The `vis()` item type check must use `startsWith('SEND')` not `=== 'SEND'` to
correctly handle SEND AM / SEND PM items and keep driver filter sections populated.

---

## Section Ordering

```js
const SEC_ORDER_FULL    = ["lunch", "send-am", "production", "dinner", "send-pm"];
const SEC_ORDER_KITCHEN = ["lunch", "production", "dinner"];
const SEC_ORDER_DRIVER  = ["send-am", "send-pm"];
```

---

## Warning / Flag System

Items with notes matching `???`, `⚠`, `TBC`, `RECIPE?`, `⚑`, or `confirm` (case-insensitive) trigger:
1. Pulsing amber dot on day card
2. Yellow warning banner at top of popover
3. Red note text in item meta line

---

## Print Layout

Three print contexts, each with their own `@media print` handling:

### Day / Week print (standard)
- `@page { size: letter; margin: 0.5in }`
- UI chrome hidden, `#pa` rendered
- Fit-to-page scaling via `doPr()`

### Menu print
- `@page { size: letter landscape; margin: 0.4in }`
- `#mn.a` reset to `position:static; overflow:visible`
- Tabs hidden, colors forced with `print-color-adjust: exact`
- Section banners, allergen badges, row colors all print

**Both print blocks are separate `@media print` declarations** in the CSS so they don't conflict.

---

## Color System

| Element | Background | Text |
|---------|-----------|------|
| Send AM | `#ed7d31` | white |
| Send PM | `#c44e00` | white |
| Lunch | `#dae3f3` | `#2e75b6` |
| Dinner | `#e2efda` | `#548235` |
| Production | `#b4c6e7` | `#2e5090` |
| ALT | `#ffd1dc` | `#8b0000` |
| Bloor site | `#b4c6e7` | `#1a3a5c` |
| LAN site | `#fff2cc` | `#806600` |
| GC site | `#d9d9d9` | `#444` |
| Rex site | `#c8e6c9` | `#2e7d32` |
| Movements | `#f0e6f6` | `#6a3d7c` |
| Serves (today) | `#e8f5e9` | `#2e7d32` |
| Serves (advance) | `#fff3e0` | `#e65100` |
| Recipe badge | `#e8f5e9` + `1px #c8e6c9` | `#2e7d32` |

Menu section banners:
- Breakfast: `#dce8f8` bg / `#4472c4` border / `#2f5496` text
- Lunch: `#fef3d0` bg / `#e8a000` border / `#9e6b00` text
- Dinner: `#e2f0d9` bg / `#548235` border / `#375623` text

---

## Validation Checklist

After generating or editing:
- [ ] `node --check` on extracted `<script>` block passes
- [ ] No duplicate `const` declarations (FRIDGE, MOVES, MEALS, WK1–4, WEEKS, RCP, RCP_KEYS, S, rcpUrl, MENU_DATA each appear exactly once)
- [ ] Both `<script>` and `</script>` tags appear exactly twice (anti-flash head script + main block)
- [ ] `js-ready` class renders interactive mode correctly
- [ ] Static fallback renders when `js-ready` removed from `<body>`
- [ ] Dark mode toggle persists across reload
- [ ] Menu panel opens/closes, tabs switch, scroll works on mobile
- [ ] Popover arrows appear at fixed screen position; swipe works horizontally
- [ ] Download bar links resolve (all xlsx files co-located)
- [ ] Print: day/week = portrait letter; menu = landscape letter

---

## Dates (Remediation)

Wk1: May 17–23 · Wk2: May 24–30 · Wk3: May 31–Jun 6 · Wk4: Jun 7–13

Hub dateNums: Wk1=[17-23], Wk2=[24-30], Wk3=[31,1,2,3,4,5,6], Wk4=[7-13]

---

## Session Updates (Apr 1 2026)

- **Arrow nav redesign:** Arrows moved outside `.pop` to fixed overlay position. Always same screen location — no reflow between days. Show/hide via `.vis` class in open/closePop().
- **Swipe navigation:** `touchmove` with `passive:false` locks direction at 8px threshold. `preventDefault()` called only on horizontal lock to prevent popup panning. Vertical scroll unaffected.
- **Dark mode:** Full light/dark theme via `[data-theme]` attribute. Anti-flash inline head script. `--hd` var split from `--tx` for headers. Persistent via `localStorage('conc-theme')`. Default: light.
- **Menu panel added:** Full-screen 4-week menu with tabs, legend, colour-coded table. Header: "🍽 CONC Temporary Renovation Menu — Rexdale". Static data in `hub_logic.js`. Mobile scroll fixed with flex column + single overflow context.
- **Menu print:** Landscape orientation, colours forced, tabs hidden, page-break control on section banners.
- **Download bar:** Added `02_Renovation_4_Week_Menu.xlsx` link. Bar now in `hub_shell.html` so Builder-generated hubs include it.
- **JS validator fix:** `lastIndexOf('<script>')` instead of `indexOf` to avoid false positive with anti-flash head script.
- **Builder dark mode:** System-default (`prefers-color-scheme`) + explicit override. Persistent. Anti-flash head script. CONC logo embedded.
- **Builder push.bat:** `⬇ push.bat` button generates and downloads a fresh bat file (`git add -A` → `git commit` → `git pull --rebase` → `git push`).
- **push.bat fix:** `dm_js` string in `assemble_builder.py` is a plain string (not f-string) — must use single `{}` not `{{}}`. Double braces were being emitted literally as JS syntax errors.

### SEND AM / PM & Section Audit (Apr 1 2026)

**Problem:** Hub Builder was dropping send-am and/or lunch sections for days where the only
content was NOTE items (cold-lunch days pre-sent the evening before). Also, some dinner
sections were missing main proteins that existed in SEND PM but had no DINNER-period row in
the source table.

**Section fixes applied to hub data (11 days):**

| Day | Fix |
|-----|-----|
| Wk1 Fri (dn=22) | Added send-am NOTE + lunch NOTE (Egg Salad + Bean Salad) |
| Wk2 Wed (dn=27) | Added send-am NOTE (Coronation) + Coronation NOTE to lunch |
| Wk2 Fri (dn=29) | Added lunch section (Falafel HEAT) |
| Wk2 Sat (dn=30) | Added send-am NOTE + lunch NOTE (Tuna Rex + Chickpea Rex) |
| Wk3 Fri (dn=5) | Added send-am NOTE + lunch NOTE (Egg Salad + Bean Salad) |
| Wk4 Mon (dn=8) | Added lunch section (Vegan Chili HEAT + Bland ALT) |
| Wk4 Wed (dn=10) | Added send-am NOTE + lunch NOTE (Coronation) |
| Wk4 Sat (dn=13) | Added lunch NOTE (Tuna Rex Salad) |

**Dinner fixes (3 days):**

| Day | Fix |
|-----|-----|
| Wk1 Wed (dn=20) | Added Roast Shakshuka Chicken Legs (existed in source, dropped by builder) |
| Wk3 Wed (dn=3) | Added Bake Tomato Fish + Tofu (new source rows added) |
| Wk3 Sat (dn=6) | Added Pizza NOTE (new source row added) |

**MEALS block rewritten:** All 28 entries now use resident-facing menu names from
`02_Renovation_4_Week_Menu.xlsx` instead of production item names. Previously 7 days had
empty lunch fields. The `MEALS` dictionary is for week-view card display only — it should
always match the menu, not the production schedule.

**Expected section ordering per day (all 28 days now conform):**
`send-am → lunch → production → dinner → send-pm`

Exception: Wk3 Mon (dn=1) has no production section — that's correct (no advance production
items scheduled that day).

**Hub Builder gap:** NOTE-only sections need to be handled in `builder_core.js` to prevent
future builds from dropping them. Until fixed, manual hub edits or post-build patching is needed
after every Hub Builder regeneration.

### Double-Comma Bug Pattern (Apr 1 2026)

When inserting sections into hub JS data via text manipulation (e.g. inserting a `lunch` section
between `send-am` and `production`), the join can produce `]},,` if the preceding section's
closing already has a trailing comma. In JS, `,,` creates an `undefined` array element.

**Symptoms:** Days after the broken one disappear from the week view. No console error on
`node --check` — syntax is technically valid. The renderer crashes when it hits
`undefined.items` during section iteration.

**Fix:** Replace `]},,` with `]},` globally.

**Prevention (MANDATORY after any manual hub JS edit):**
1. `node --check` on extracted script block
2. Search for `,,` in script block — must be 0 occurrences
3. **Runtime test** — instantiate WK arrays and iterate:
```js
WK.forEach((d, i) => {
  if (!d) { console.log('UNDEFINED DAY', i); return; }
  d.sections.forEach((s, j) => {
    if (!s) { console.log(d.dayName, 'UNDEFINED SECTION', j); }
  });
});
```

### Production Chain Fixes (Apr 1 2026)

11 new rows added to source table across Wk2–Wk4 to close production chain gaps found during
audit. Key additions: Vegetable Biryani COOK (LAN), Mashed Potato HEAT (Thu), Gravy Sat HEAT,
White Chilli Vegan COOK, Vegan Massaman COOK, Green Curry Sauce COOK, Roasted Peppers COOK ×3
(LAN morning-of for AM van). Hub data was NOT updated with these chain fixes — needs a Hub
Builder rebuild to pick them up from the source table.

