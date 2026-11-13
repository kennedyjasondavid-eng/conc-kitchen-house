# One path for a new menu week: Rex's sheet to the staff board (plan, 2026-11-13)

> **What this is.** A design plan, not code. It answers item 28 of the Week 4 friction log (and item 26 of
> Week 3's): "Still no single 'new menu week' path." It lists each step a novice takes and which app owns
> it, what each app shows next ("what's left for this week"), the smallest first slice, and open questions
> for Jason, each with a lean.
>
> **Status:** draft for Jason to read. Nothing here is built or ruled. This doc owns the plan and its status;
> each slice's receipt is added under "Slices" when it lands.
>
> **Reviewed 2026-11-13** against the live files. Fixed: cards are matched to meals by `serviceRefs`
> (the first draft said cards carry a `recipeId` and couldn't tell the meal; they carry it inside
> `serviceRefs`, with the meal); "on the board" compares DOOR's menu hash, not publish times (the draft
> raised a false "publish from EXPO" on today's files); "done" no longer needs every slot linked (Week 4 has
> 29 unlinked slots and is closed); each app lists only its own facts and links to the tracker. Cross-app status stays in
> [`HOUSE_STATUS_LEDGER.md`](../HOUSE_STATUS_LEDGER.md).
>
> **Read for this plan** (2026-11-13, against each repo's `origin/main`):
> - the friction logs `Week4_Setup_Friction_Notes_2026-11-11.md` and
>   `Week3_Setup_Friction_Notes_2026-11-08.md` (OneDrive, beside the repos);
> - [`INSIGHTS.md`](../INSIGHTS.md) and [`HOUSE_RULINGS_INDEX.md`](../HOUSE_RULINGS_INDEX.md);
> - the ledger's "Change it in-app, not in code" and "DOOR menu flow" lines;
> - EXPO's `EXPO_IN_APP_ACTION_PLAN_2026-11-08.md` (row 9 and R3's "new menu week" journey check);
> - the live shapes of DOOR's `menu_current.json`, HUB's `hub_schedule.json` and CODEX's Library contract.

---

## 1. Why

Week 4 (2026-11-11/12) went in through all of these:
- a hand-made one-tab copy of Rex's workbook;
- a DOOR import;
- four DOOR Edit Menu fixes;
- CODEX cook facts on four new recipes, relayed between two sessions;
- EXPO shape and timing set-up;
- an EXPO ⇪ Publish on a kitchen computer.

It worked because one person knew all three apps. Nothing on any screen told them what came next, or when
the week was done. Jason's goal (2026-11-08, Week 3 log): *a novice creates recipes in CODEX, updates the
menu in DOOR, and EXPO either makes sense of the production with a little input, or walks them through it,
so they mostly confirm or tweak.* Week 3's log G adds the missing piece: **a visible finish line.**

Most of the friction is inside one app at a time, and each app's own plan is fixing it (§6 maps every
item). What no app owns is the **path between them**: which app to open next, for which dish, and when the
week is finished.

## 2. What the plan holds to

- **Ownership doesn't move.** DOOR owns which recipe a dish is (the slot link). CODEX owns food facts. EXPO
  owns how a dish travels (F1). Every fix in the path happens in the app that owns the fact, in-app
  (ruled 2026-11-08). The path only points.
- **The path stores nothing (No Second Home).** "Where is this week up to" is read off files the apps
  already publish. No checklist ticks, no "done" flags, no per-computer copy. If the files say a dish is
  linked, it is linked.
- **Silent when it works, loud when it breaks.** A week with nothing left says so in one line. Food
  safety (allergens) stays DOOR's red, on DOOR's screen. The path never judges allergens itself.
- **No new app.** The path is a short list in each app plus one read-only page.

## 3. The path, step by step

Each dish slot (a meal's main, vegan, halal, sides) has five things to know. Every one can be read from a
file already on Pages (each checked against the live files on 2026-11-13):

| State | What it means | Read from (public, today) |
|---|---|---|
| 1. On the menu | Rex's dish is in DOOR's week | DOOR `menu_current.json`, `menu[wk][DAY]` and its `<meal>_slots` |
| 2. Linked | its slot names a CODEX recipe | the slot's `recipeId` (a `{manual}` slot has none). 65 of 197 slots carry one; Week 4: 20 of 49 |
| 3. Has kitchen facts | CODEX knows how long it cooks, on what | CODEX `library_public.json` (57 records) by `recipeId`: `production.sets` lists `cookMin` (a listed 0 is a value: "no cook"); else the sealed `recipe_production.json` |
| 4. Planned for this meal | a card on the board serves this exact meal, and none "needs a plan" | HUB `hub_schedule.json`: 538 of 542 cards carry `serviceRefs` `[{week, day, meal, component, recipeId, …}]`; `needsPlan: true` marks a dish with no plan (none on the board today) |
| 5. On the board | the board was built from DOOR's current menu | HUB `_doorMenu.flow.components.menu` against DOOR `_meta.flow.components.menu` (the F4 menu hash). **Not** the two `exported` times: DOOR publishes count changes daily without changing the menu |

**The states are not a chain.** Long-standing dishes are planned by EXPO's own recipes under their menu
name, with no CODEX link: on Week 4, Pork Souvlaki, Fish Curry, Tandoori Pork and Beef lasagna are
`{manual}` slots, and each is on the board. So a dish **needs something** only when:
- no card serves its meal (state 4), or a card "needs a plan";
- or it is linked to a CODEX recipe with no cook facts (state 3);
- or the board was built from an older menu (state 5).

"Not linked" alone is shown quietly, as a note, never as work left. Otherwise a closed week (Week 4: 29
unlinked slots) would never read as done.

The steps a novice takes, in order. "Absorbs" names the friction items each step's own fixes cover (§6).

| # | The novice does | App | Done when | Absorbs |
|---|---|---|---|---|
| 0 | Rex emails the workbook. Nothing to prepare: no one-tab copy (once DOOR asks which tab, step 1; until then a one-tab copy may still be needed). | (outside) | — | Wk4 2 |
| 1 | DOOR → Menu Config → **↑ Rex's week sheet**. Pick the file. DOOR names the week, the dates and the tab it read, in big type, and asks which tab when two match. | DOOR | the review opens on the right week | Wk4 1, 3 |
| 2 | Go through the review, one meal at a time. For each new dish: pick the CODEX recipe DOOR proposes, search for another, or say **"Not in CODEX yet"**. Allergen "Take off" ticks start safe. | DOOR | every new dish is linked or marked "not in CODEX yet" | Wk4 4–12; Wk3 1–3 |
| 3 | **Save.** DOOR publishes and shows **What's left for Week N** (§4). | DOOR | DOOR has published | Wk4 18, 19 |
| 4 | For each dish "not in CODEX yet": in CODEX, **Start a recipe** (or bring in the card), answer the kitchen questions (where it's made, how it travels, how long on what, hands-on time, what it's served with), **Save to the Library**. For each linked recipe missing cook facts: open it from the list and answer the same questions. | CODEX | every recipe the week links has kitchen facts | Wk4 26, 27a; Wk3 G, 10, 11 |
| 5 | Back in DOOR, link the new recipes. DOOR offers each one on the dish it was made for; the novice confirms (allergens change, so a person confirms). | DOOR | every dish on the week is linked | Wk4 13–17 |
| 6 | Open EXPO **on a kitchen computer**. Its list for Week N shows one row per dish: confirm the shape EXPO proposes (pre-filled from CODEX, R6), or change it. | EXPO | no dish on the week "needs a plan" | Wk4 20–26a, 26d; Wk3 12–26h |
| 7 | **⇪ Publish.** One step: the board and the shared-plan stamp together. | EXPO | HUB's board is built from DOOR's latest menu | Wk4 24, 26f |
| 8 | Nothing. HUB shows the week. The tracker (§4) reads "Week N is on the board". | HUB | — | — |

Steps 4 and 5 are skipped when every new dish already has a CODEX recipe with kitchen facts, which is most
weeks once the Library grows. Recipes may also come first (Week 3's order): step 2 then links at once.

## 4. What each app shows next: "What's left for Week N"

Each app gets the same small list: one row per dish that needs something, saying **what's missing and a
link that opens the fix.** Each app lists **only the facts it owns**, and links to the tracker for the
rest. The cross-app view is worked out in one place, the tracker, not re-derived in each app: a rule kept
in each reader gets missed in one (INSIGHTS, 2026-10-16), and four lists in four wordings would disagree.
When nothing is left, the list is one quiet line.

| Where | Rows it shows (its own facts only) | Reads | Link goes to |
|---|---|---|---|
| **DOOR**, after Save and on Menu Config | "Not in CODEX yet: *Tacos al pastor* (Fri lunch)" (a review answer, step 2) · "See the whole week →" | its own menu | Edit Menu on that slot; CODEX's Start a recipe; the tracker on Week N |
| **CODEX**, Administration (beside "Menu dishes with no recipe") | "Recipes on DOOR's Week N with no cook facts" | DOOR `menu_current.json` (RF5a reader); its own Library | that recipe's kitchen questions |
| **EXPO**, What the board needs, grouped by menu week | one row per dish: "needs a plan: confirm the shape" · "CODEX's recipe has no cook time → CODEX" · "a side doesn't resolve: *Zucchini & Carrot*" (the piece named in the headline, the meal named as served: "cooked Sun for Tue lunch") | as today | the set-up wizard; CODEX `?recipe=<id>` |
| **HUB** | nothing new. Staff see the board; the path stays out of their way. | — | — |
| **HOUSE page**, a **Week tracker** | every dish slot on the chosen week, with its five states (§3) as marks, and the one next step for a dish that needs something | the four public files in §3 | the owning app, on that dish |

The tracker is the one place a novice can look to see the whole week, and the one place Jason can check a
week is finished without opening three apps. It reads; it never writes. If the per-app lists later make it
unused, it retires (question 1).

## 5. The smallest first slice: the Week tracker (HOUSE, read-only)

**Why this one first.** It touches no app's code, so it cannot break the kitchen. It makes the path exist
today, with the apps as they are: a novice can see what's left and which app to open. It also gives every
later slice a place to check its effect ("did Week N's rows clear?"). And its state model is the script for
EXPO's planned "new menu week" journey check (in-app plan row 9; no gate of that name is on EXPO's `main`).

**What it is.**
- One single-file page in this repo, `week.html`, linked from `index.html`. No build, works from Pages;
  from `file://` it says it can't read the feeds.
- It reads DOOR's `menu_current.json`, CODEX's `library_public.json` and `recipe_production.json`, and
  HUB's `hub_schedule.json` from Pages, cache-busted (proven seams row 2).
- It opens on the next menu week by the cycle anchor (`_cycleStart` 2026-06-07, read from HUB's file, never
  copied); a picker shows Weeks 1–4.
- One row per dish slot, with its marks. A slot is matched to cards by `serviceRefs` (week, day, meal),
  then by `recipeId` when the slot has one, else by the slot's words against `component`. A dish that needs
  something gets one "Next:" line naming the app and linking into it.
- At the top, one line: "Week 4: 3 dishes left (2 in CODEX, 1 in EXPO)", or "Week 4 is on the board".
  When DOOR's menu hash differs from the one the board was built from, it says so: "DOOR's menu changed
  after the board was built: publish from EXPO on a kitchen computer". (On 2026-11-13 the two hashes match:
  DOOR's 15:11Z publish changed counts, not the menu, so no line shows.)
- An unreadable file greys its column and says which file; the rest still shows.

**What it doesn't do.** No allergen marks (DOOR's job and red). No writes, no keys, no local storage
beyond the picked week. No resident data (DOOR's public files hold none).

**To check while building it:**
- whether a `needsPlan` card carries `serviceRefs` (EXPO's schema example has none, and there are none on
  today's board to look at). If not, it matches by its `item` words, or EXPO adds the refs in its own slice;
- four sides Week 4 links have no card at all (Biryani Rice, Braised Cabbage, Peas and Carrot, Roasted
  Yams), though the week is closed. Until question 7 is ruled, a linked side with no card is a quiet note,
  not a dish left.

**Check** (per "Checks support, never obstruct"): one gate, `tests/week_tracker_gate.mjs`, on **fixed**
copies of the four files from 2026-11-12 (Week 4 just closed), never live data. On those files Week 4 reads
"on the board", with no dish left and its unlinked slots and card-less sides as quiet notes. Planted breaks
must show: a meal no card serves reads "no plan → EXPO", a `needsPlan` card reads "needs a plan → EXPO", a
linked Library record without `cookMin` in `sets` reads "no cook time → CODEX", a different menu hash
reads "publish from EXPO", and a newer DOOR `exported` with the **same** hash reads nothing (the false alarm
this review caught). Kitchen failure it prevents: a week that looks finished but isn't.

**Size:** S, HOUSE only. Jason-gated merge as usual.

## 6. The slices after it, and where every friction item goes

Each slice ships in its owning repo, through that app's own plan.

| # | Slice | App | What changes for the novice |
|---|---|---|---|
| 1 | **Week tracker** (§5) | HOUSE | sees the whole week and the next step |
| 2 | **DOOR's What's left**, after Save on Rex's week sheet and on Menu Config: its own rows and a link to the tracker; "Not in CODEX yet" as a plain review answer | DOOR | knows what to do after the import |
| 3 | **CODEX: this week's recipes, and the kitchen questions at save** (Wk3 log G: where made, how it travels, how long on what, hands-on, served with; engine words behind "Advanced") | CODEX | fills cook facts without engine words |
| 4 | **DOOR offers the new recipe on its dish** once it's in the Library (confirm, never auto-link) | DOOR | step 5 becomes one confirm per dish |
| 5 | **EXPO: one row per dish per week**, naming the piece and the owning app; Publish carries the stamp in one step; EXPO names its computer | EXPO | step 6 reads as a short list of confirms |
| 6 | **The "new menu week" journey check**: Week 4's fixed files through slices 1–5 | EXPO + HOUSE | (a check; nothing on screen) |

Every Week 4 item, and where it stands (checked 2026-11-13):

| Items | Where | State |
|---|---|---|
| 1 (which tab) | DOOR | partly fixed by #190 (reads the tab the workbook was saved on); asking when two tabs match is open |
| 2, 3 (one-tab copy; wrong file looks right) | DOOR | item 3 is being built by the side session "DOOR: say which week, dates and tab an upload read" |
| 4, 5, 6, 11 | DOOR | fixed by #190 (.68) |
| 7, 8, 9, 10, 12 (review: preselect, sauces, side links, old alternatives, length) | DOOR | open; DOOR's menu-flow plan |
| 13, 14 | DOOR | fixed by #190 (unlink on "No matches"; Spicy stays off) |
| 15, 16, 17 (Edit Menu words, clicks, dialogs) | DOOR | open; Week 3 repeats |
| 18, 26e | DOOR, EXPO | fixed by DOOR #189 and EXPO #617 |
| 19 (waiting changes send silently) | DOOR | open; slice 2's "sent" line |
| 20, 21, 22, 23, 25 (EXPO's rows) | EXPO | open; slice 5 |
| 24, 26f (which computer; the stamp publish) | EXPO | open; slice 5 |
| 26a | EXPO | fixed by #619 |
| 26b | EXPO | good as is |
| 26c (background tab stalls) | EXPO | open; EXPO performance, not this path |
| 26d (moved dish re-targets done prep) | EXPO | open; a food-safety question at Publish, EXPO's plan |
| 26, 27a (no cook facts at save; engine words) | CODEX | open; slice 3 |
| 27 (vegan unknown on mushrooms) | CODEX | on branch `claude/codex-vegan-mushroom-kinds`, waiting on Jason |
| 28 | HOUSE | this plan |

## 7. Open questions for Jason (each with a lean)

1. **Where does the whole-week view live?** A HOUSE page, or only inside each app?
   *Lean: both.* The tracker first (it's the smallest and touches no app); each app's own list after,
   showing only its own rows and "Next: <app>". If the apps' lists make the tracker unused, retire it.
2. **Who is the novice?** *Lean: a Bloor supervisor with a DOOR sending key and a kitchen computer.* Rex
   only sends the workbook. This sets which keys the path needs: DOOR's sending key, CODEX's Library save,
   EXPO's Publish.
3. **Menu first or recipes first?** *Lean: menu first.* Import the week, mark what isn't in CODEX yet, let
   the list send the novice to CODEX and back. Recipes-first still works (step 2 links at once). Menu-first
   matches how the week arrives (a workbook from Rex) and puts the whole week in view from the start.
4. **When a recipe appears in CODEX for a "not in CODEX yet" dish, should DOOR link it by itself?**
   *Lean: no; offer it, a person confirms.* Linking changes the plate's allergens. "Silent when it works"
   doesn't stretch to a quiet allergen change.
5. **Must the EXPO step happen on a kitchen computer?** *Lean: yes, for now.* The browser-pane EXPO is a
   separate copy (Wk4 24). The tracker can show which computer built the board once EXPO names it (slice
   5); until then the path says "on a kitchen computer".
6. **When is a week "done"?** *Lean:* a card serves every meal on the week, no card needs a plan, every
   linked recipe has cook facts, and the board was built from DOOR's current menu (same menu hash). Being
   linked is not required: EXPO plans long-standing dishes by name (Week 4 has 29 unlinked slots and is
   closed). Allergen review is DOOR's and happens in step 2; the tracker doesn't re-judge it.
7. **Sides with no card.** On Week 4, four linked sides (Biryani Rice, Braised Cabbage, Peas and Carrot,
   Roasted Yams) have no card on the board, though the week is closed. Are they made at Rex on the day
   with no card, or is a card missing? *Lean:* a side with no card is a quiet note, never a dish left,
   until you say which sides should have a card.
8. **Should the tracker know which dishes are new this week?** No public file says so (only DOOR's review
   knows). *Lean: no.* It lists what needs something, new or not; a dish already on the board needs
   nothing and stays quiet.
9. **Should slice 1 wait for the side session on friction item 3?** *Lean: no.* They don't touch the same
   repo or files; the tracker reads DOOR's published file, not its upload screen.

## 8. Not in this plan

- Fixing the per-app friction items themselves: each is owned by its app's plan (§6 table).
- EXPO performance (26c, Wk3 25, 26f).
- How Rex writes the workbook (a template for Rex is a later conversation, if ever).
- Sites other than Bloor/Rex (the path reads `site` from each file; nothing here is Rex-specific beyond
  today's data).
