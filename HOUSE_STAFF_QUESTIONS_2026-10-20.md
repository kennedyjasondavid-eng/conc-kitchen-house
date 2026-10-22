# HOUSE — questions for the sites (2026-10-20)

Jason, 2026-10-20, on the chickpea drumsticks' lifecycle and batch interval:

> note as something I need to know from them. it would be good to compile a list of things I should ask them about to fill out things like this to present once I'm ready to start bringing in others to use HOUSE.

Each question below is a fact only kitchen, program or ordering staff can supply. Each is still open after checking the newest docs and data.

**Checked against:**
- CODEX: work tree `058c9eb`, `shared-library` `25a0a96`.
- EXPO: `869c328`.
- DOOR: `92cb6a4`.
- HUB: `ad719d9`.
- HOUSE: `ee660b6`.

**This is a frozen snapshot.** When a question is answered:
- write the answer and its date under the question;
- then change the place its **Goes to** line names, and give that change its own dated note there.

**Key:**
- **CODEX card**: the recipe record in CODEX's Library (`CONC_Recipe_Data.js` → `CONC_PRODUCTION_SEED`).
- **EXPO l.N**: a line in `conc-kitchen-expo/index.html` on `main` at `869c328`.
- *(Jason, 2026-10-20)*: raised by Jason the day this list was compiled.

**Residents' details are not in this doc.** The questions for Health & Wellness staff name residents' rooms with their allergies and health needs, and this repo is public. So they are kept out of it, and Jason holds them as a separate list. §4 says only what they cover.

---

## 1. Rexdale kitchen

### 1a. Things Rex makes ahead and freezes

**R1. Vegan chickpea drumsticks** *(Jason, 2026-10-20)*. Served Wk1 WED lunch (wrap) and Wk1 FRI lunch.
- **Ask:**
  - How often do you make a batch, and how many in a batch?
  - How long can a batch stay in the freezer before it's used up?
  - The CODEX card says air-fry, cool, then freeze. Is that right?
  - How do you cool them before they go in the freezer?
- **Why:** gives the make interval and freezer limit. Cooked before freezing means a cook-chill card, not "no kill step".
- **Source:**
  - EXPO "Chickpea Drumstick" l.12391 still says "Purchased frozen"; FROZEN_STOCK_DB l.22812.
  - CODEX card "Vegan Drumstick": batch 7; "Air fry in Combi… Cool and freeze".
  - `docs/CODEX_COOKED_SAUCES_V25_2026-10-19.md` §5: the route was guessed by the import.
- **Goes to:**
  - EXPO RECIPE_DB "Chickpea Drumstick" (make interval, frozen hold, notes).
  - CODEX "Vegan Drumstick" (production route, batch, HACCP card).

**R2. Vegetarian Frittata, Ham Frittata, Tofu & Potato Hash** *(Jason, 2026-10-20)*. Served Wednesday breakfasts (Ham Frittata on Wk3 WED) and Wk3 TUE vegan lunch.
- **Ask:**
  - How often is each made, and how long does a batch stay frozen?
  - Is each fully cooked before freezing? The frittata card says bake, cool, cut 6×4, "tray for breakfast reheat". The hash card says steam and cool the potatoes, then pan-fry in the combi.
  - How are they cooled before freezing?
  - On the day: reheated from frozen? For how long, at what setting?
  - Is the ham frittata the same batch with ham added?
- **Why:**
  - This decides the HACCP card.
  - EXPO has no record of either dish, so neither is on the board.
- **Source:**
  - CODEX cards "Vegetarian Frittata" (note: "also made with pork") and "Tofu and Potato Hash".
  - v25 receipt §5; EXPO `tests/ux_baseline.json` (no job for either).
- **Goes to:**
  - CODEX routes and batches.
  - New EXPO RECIPE_DB entries (make day, frozen hold, Rex reheat).
  - Both HACCP cards.

**R3. Falafel** *(Jason, 2026-10-20)*. Served Wk2 TUE and Wk4 MON vegan lunch (falafel sandwich).
- **Ask:**
  - Do you make and freeze falafel like the drumsticks? How often, how many, kept how long?
  - Which card do you follow? "Rexdale Falafel" (form, chill overnight), "Sophie's Falafel" or "GF Cajun Fallafal"?
  - On the day: baked from frozen? For how long?
- **Why:** EXPO plans a 20-minute oven cook and 2 per vegan resident from the freezer. The card's route was guessed.
- **Source:**
  - EXPO "Falafel" l.12899: "Rexdale makes falafel themselves… banked frozen stock".
  - FROZEN_STOCK_DB l.22809; the three CODEX cards.
  - DOOR links the sandwich to Rexdale Falafel (`v31-standard.29`).
- **Goes to:** EXPO "Falafel" (interval, hold); CODEX "Rexdale Falafel" route and batch; keep or retire the other two cards (R9).

**R4. Crispy Quinoa Cakes** *(Jason, 2026-10-20)*. Served Wk1 MON vegan lunch.
- **Ask:**
  - Are they made at Rex from the "Quinoa Cakes" card, or bought?
  - If made: frozen? How often? Kept how long?
  - If made: is the flour always gluten-free?
  - If bought: brand and label (O3).
- **Why:** EXPO lists them as in-house frozen stock but types them "purchased". The card's Gluten comes from flour written as "gluten free flour".
- **Source:**
  - EXPO "Crispy Quinoa Cakes" l.12683; FROZEN_STOCK_DB "Quinoa Burger" l.22805 (in-house group).
  - CODEX card "Quinoa Cakes"; CODEX `CLAUDE.md` v22 "Found, for Jason".
- **Goes to:** EXPO type and route; CODEX route, batch and Gluten label.

**R5. Black bean patties** *(Jason, 2026-10-20)*. Served Wk4 SUN vegan lunch, with naan, carrots and tzatziki.
- **Ask:**
  - Served hot or cold?
  - EXPO has Rex cooking and cooling them two days ahead. Your card says form them raw and freeze them. Which is right?
  - If frozen raw: how are they cooked on the day, and for how long?
- **Why:** decides whether EXPO needs a cook or heat job on the day, and which HACCP card prints.
- **Source:**
  - EXPO "Black Bean Patties" l.11059 (60 min stovetop, cold-prep shape); the board's Rex prep two days before.
  - FROZEN_STOCK_DB l.22806.
  - CODEX card "Vegan Bean Patties": "Form 5oz Patties and Freeze… bag and label".
- **Goes to:** EXPO "Black Bean Patties" (shape, day, hot or cold); CODEX route and batch.

**R6. Vegan sausages and vegan breakfast patties.**
- **Ask:**
  - Are the vegan sausages bought, or made from Rex's jackfruit "Vegan Sausage" card? They appear at Wk1 THU lunch, Wk2 THU dinner, the Wk2 SUN pasta and the breakfasts.
  - Are the vegan breakfast patties made from the "Breakfast Vegan Patty" card (formed, frozen, vac-bagged)?
  - For whatever you make: how often, how long frozen, how cooked for service?
  - Is the flour or oat flour always gluten-free?
- **Why:**
  - EXPO orders vegan sausages as a bought item, but CODEX holds house recipes for both.
  - Both cards list Gluten (Wheat) from gluten-free flour or oats.
- **Source:**
  - EXPO "Vegan Sausages" l.15698 (PURCHASED); FROZEN_STOCK_DB l.22784.
  - CODEX cards "Vegan Sausage" and "Breakfast Vegan Patty"; CODEX `CLAUDE.md` v22 Found (l.530); v25 receipt §5.
- **Goes to:** EXPO type; CODEX routes, batches and Gluten labels; the label check in O3 if bought.

**R7. Vegan pot pie.** Served Wk4 WED vegan dinner.
- **Ask:**
  - Is the filling made fresh that day, or ahead and frozen?
  - How long for prep, stovetop and oven?
  - Is it topped with crust (Rex's "Vegan Pie Crust" card), or served as filling?
- **Why:** EXPO's times are marked placeholder, and its frozen-stock list still says "pulled frozen".
- **Source:**
  - EXPO "Vegan Pot Pie Filling" l.15673: "⚠ PLACEHOLDER times (Jason 2026-08-13, to confirm)".
  - FROZEN_STOCK_DB l.22814; CODEX cards "Vegan  Pie Filling" and "Vegan  Pie Crust".
- **Goes to:** EXPO times (drop the frozen line if it's made fresh); CODEX route and batch.

**R8. Cooling at Rex.**
- **Ask:**
  - When Rex cooks something ahead (drumsticks, frittata, hash, pot pie filling, bean patties), how is it cooled before the fridge or freezer? Shallow pans, ice bath, trays in the walk-in?
  - How long until it's cold?
- **Why:** Rex has no blast chiller. The cooling step (60 → 20 °C in 2 h, then 4 °C within 4 more) needs Rex's real method.
- **Source:** EXPO `CONC_OPERATIONS.md` (Rex: "No blast-chiller"); HOUSE `HACCP_HAZARD_ANALYSIS.md` CCP-2; the CODEX Check & save cooling question.
- **Goes to:** method and storage lines on Rex-made CODEX cards; their HACCP cards.

### 1b. Rex cards that nothing schedules: still made?

**R9. The eight cards from the May 2026 import** *(Jason, 2026-10-20)*.
- **Ask for each:**
  - Is it still made?
  - For which meal?
  - Made on the day, made ahead, or frozen?

| Card | What the card says | Also ask |
|---|---|---|
| Braised Cabbage | braised in the combi, "cool and set aside" | |
| Breakfast Vegan Patty | formed, frozen, vac-bagged | covered by R6 |
| Fish Cake | potato and fish, breaded, baked 12 min | |
| GF Cajun Fallafal | patties frozen one by one | still used, or only Rexdale Falafel? |
| Jammaican Vegetarian Filling (and Jamcaican Patty Dough) | patty filling | made, or bought patties? The card has no unit for its garlic and thyme |
| Kuku Paka | chicken thighs in coconut sauce, "cool and vac pack" | soup base label (O2) |
| Shawarma Chick Peas | cooked chickpeas, raw peppers and onions, marinated and kept in the fridge (no cooking step) | shawarma is off the current menu |
| Sophie's Falafel | method stops after step 1 | the rest of the method, if still used |

- **Why:**
  - An import script guessed their route, so the food-safety tree calls them "no kill step".
  - EXPO has no record of any of them.
- **Source:** `docs/CODEX_COOKED_SAUCES_V25_2026-10-19.md` §5; `docs/rexdale_enrich.py`; the CODEX cards.
- **Goes to:**
  - Each card's production route in CODEX (`recipe_production.json`), or retire the card.
  - An EXPO entry only if the dish is on a menu.

**R10. Baking, soups and other off-menu food.**
- **Ask:**
  - Rex has about 30 baking and dessert cards (cakes, cookies, scones, pies, Butter Tarts, Banana Pudding, Overnight Oats…) and three soup cards (Butternut Squash, Roasted Carrot, Chickpea). Which are still made? How often, for what (snacks, events), how many?
  - Are baked goods kept in the fridge, or covered at room temperature?
  - Is the Saturday breakfast granola made from the card (with honey) or bought?
  - What goes out as "seasonal soup"? Does it ever contain flour or roux, cream, or a soup base?
- **Why:**
  - Seasonal soup is on the gluten-free, dairy-free, no-egg, diabetic and soft plates at Wk2 TUE, Wk3 SUN and Wk4 MON lunch. Its record says "no fixed ingredients".
  - Storage decides the dessert HACCP card.
  - The off-menu production list in EXPO `VISION.md` doesn't exist yet.
- **Source:**
  - `docs/rexdale_codex_seed.json` (98 cards); DOOR `menu_current.json` alternatives.
  - EXPO "Seasonal Soup" l.11117; CODEX card "Chickpea Soup (NOT blended)" (method is one line).
- **Goes to:**
  - A Rex off-menu production list (what, how often, how many).
  - CODEX routes and storage lines; retire unused cards.
  - Seasonal soup's allergen line.

### 1c. Sides EXPO planned from old Lansdowne notes

**R11. Three sides.**
- **Ask for each:**
  - Who makes it?
  - Fresh or frozen?
  - Cut the day before or the same day?
  - How is it cooked, and for how long?
  - How much for one service?

| Dish (menu) | What EXPO has now |
|---|---|
| Butternut Squash (Wk2 SAT dinner, vegan line; is it still served?) | Rex prep the day before; 20 min stovetop steam; "12 bags" |
| Cauliflower & Carrot (Wk4 FRI lunch) | Rex oven 35 min, "7 bags cauli"; its frozen-stock line says frozen bags, thawed a day ahead |
| Roasted Sweet Potato (Wk1 TUE lunch, Wk2 SAT lunch) | Rex cuts the day before, oven 45. CODEX says Bloor cooks it and sends it hot |

- **Why:** each EXPO note says "Method/qty carried from the LAN recipe — confirm with Fiona if Rex differs".
- **Source:**
  - EXPO l.11414, l.12004 (and FROZEN_STOCK_DB l.22816), l.14567.
  - `recipe_production.json` "Roasted Sweet Potato" (Bloor, hot send).
- **Goes to:** EXPO RECIPE_DB entries; a CODEX recipe for Roasted Sweet Potato (it has none).

### 1d. Menu dishes with no recipe in CODEX

**R12. Five dishes.**
- **Ask:** what goes in each (including dressing or sauce), and how much for one service?

| Dish (menu) | Why it matters |
|---|---|
| Side Salad and its dressing (Wk1 THU L, Wk3 THU L, Wk3 SAT D, Wk4 THU L) | a dressing can carry egg, mustard or dairy; no Egg tick on any of these meals |
| Garlic Corn & Bean (Wk3 TUE L) | green beans or dried beans? DOOR has no Beans tick (two residents are No Beans); any butter? |
| Coconut Rice & Peas (Wk2 WED D) and Lime Coconut Rice (Wk3 FRI L) | EXPO says "maybe beans". Kidney beans, pigeon peas or green peas? Same as Rex's "Rice and Beans" / "Lime and Coconut Rice" cards? No Beans tick on either meal |
| Tumeric Quinoa (Wk4 SAT L, vegan line) | water or stock? If stock, chicken or vegetable? |
| Vegan Gyro (Wk2 MON L, vegan line) | which product? Does Rex cook it (EXPO), or Bloor (CODEX: stovetop 30)? |

- **Source:**
  - CODEX records with no ingredients (Side Salad, Garlic Corn and Bean, Lime Coconut Rice, Vegan Gyro).
  - `docs/CODEX_VEGAN_FRIENDLY_RECEIPT_2026-10-18.md` "For Jason" 1–2.
  - EXPO l.14473 and l.14492, and the comment at l.7095 ("except maybe beans").
  - DOOR `menu_current.json` ticks.
- **Goes to:** CODEX recipes (rows → allergens and the vegan-friendly flag); DOOR menu ticks (Beans, Egg, Mustard).

### 1e. Breakfast

**R13. French Toast Casserole** *(Jason, 2026-10-20)*.
- **Ask:**
  - Is it still made?
  - Baked the morning it's served and kept hot until breakfast (for how long)? Or baked ahead and reheated?
  - How many does one batch serve?
- **Why:** its HACCP card prints "cool, then cold" with no hot-holding step.
- **Source:** CODEX card "French Toast Casserole" (soak overnight, bake in the combi; batch unknown); `docs/CODEX_HACCP_BY_KIND_V24_2026-10-19.md` §4; v25 receipt §5.
- **Goes to:** CODEX route and batch; the HACCP card's class.

**R14. Pancakes (Monday breakfast).**
- **Ask:**
  - Who makes them, and when? Rex that morning?
  - How long are they held hot? The card says in the oven at 200 °F.
- **Why:** CODEX's production record says Bloor cooks them and sends them hot. A breakfast item can't ride the 09:00 van.
- **Source:** `recipe_production.json` "Pancakes" (Bloor, hot send); v25 receipt §5.
- **Goes to:** CODEX "Pancakes" route; its HACCP card.

**R15. What vegan residents eat at breakfast.**
- **Ask:**
  - The menu's vegan breakfast line repeats frittata, pancakes, scrambled eggs, cereal and milk, bagel and cream cheese, and yoghurt. What do the 4 vegan residents actually get?
  - On pancake days, do vegan and gluten-free residents get Johnny Cakes?
- **Why:** DOOR routes breakfast by this line, so its plates and "contains" lines are wrong if the vegan plate is different.
- **Source:** DOOR `menu_current.json` `breakfast_veg`; `door_state.json` (4 Vegan, 7 Vegetarian); CODEX v19 (Johnny Cakes is the GF/vegan substitute).
- **Goes to:** DOOR breakfast vegan lines (menu editor); CODEX breakfast records.

### 1f. Special-diet plates at service

**R16. Wk1 THU lunch (Fully Loaded Sausage, pork).**
- **Ask:** what do halal and no-pork residents get? Halal beef sausages?
- **Why:** DOOR has no halal line for this lunch and EXPO plans no halal job.
- **Source:**
  - DOOR `menu_current.json` Wk1 THU: no `lunch_halal`, no alternative.
  - EXPO board: Pork Sausages and vegan sausages only.
  - DOOR issue #78, closed 2026-09-16 when the dish moved off Wk1 MON; the gap moved with it.
- **Goes to:** DOOR halal line; an EXPO halal sausage job (FROZEN_STOCK_DB "Halal Beef Sausages" exists).

**R17. Wk3 THU hotdog lunch.**
- **Ask:**
  - Do halal residents get the all-beef hotdog, or a separate halal chicken hotdog? The kitchen's plating sheet makes 23 chicken ones.
  - If they get the beef hotdog: is the product halal-certified?
- **Why:** Jason ruled on Oct 5 that the beef hotdog is halal-certified, but the manual sheets still make chicken.
- **Source:** DOOR `CLAUDE.md` v31-standard.40/.41 ("Open for Jason"); EXPO `EXPO_MENU_WORKBOOK_2026-10-05.md` rulings.
- **Goes to:** DOOR halal line and ticks; an EXPO job if it's a separate product.

**R18. Wk2 THU lunch (beef burger / veggie burger).**
- **Ask:** what do soft-diet residents get?
- **Why:** no soft alternative is recorded, and the kitchen's sheet splits soft residents three ways.
- **Source:** DOOR `CLAUDE.md` v31-standard.41 "Open for Jason"; `menu_current.json` Wk2 THU lunch.
- **Goes to:** DOOR soft alternative for that meal.

### 1g. Batch sizes and missing amounts on Rex cards

**R19. Batch sizes and blank units.**
- **Ask:** how many portions does one batch of each card make? These are the cards on the menu with no batch size:
  - Salads and fillings: Coronation Chicken Salad, Tuna Salad Sandwich Mix, Rex Tuna Salad Mix.
  - Rice and grains: Pineapple Rice, Rice and Beans, Spanish Rice, Couscous, Refried Beans, Lime and Coconut Rice.
  - Others: Garlic Sauce, Vegetarian Frittata, Rexdale Falafel, Quinoa Cakes, Vegan Bean Patties, Vegan Pie Filling.
- **Also fill in the blank units:**
  - Jammaican Vegetarian Filling: garlic "1", thyme "1".
  - Vegan Sausage: garlic "2".
- **Why:**
  - HUB opens CODEX recipes pre-scaled (`&portions=N`). With no base batch, CODEX can't scale them.
  - Costing skips the blank units.
- **Source:**
  - CODEX seed `portions: null` (57 cards). The shared Library copies are blank too: Couscous, Garlic Sauce, Pineapple Rice, Refried Beans, Rice and Beans.
  - `docs/CODEX_COSTING_C7B_RESIDUAL_CLEANUP_HANDOFF_2026-07-16.md` §4.
- **Goes to:** each CODEX card's batch (portions) and units.

### 1h. Equipment, deliveries and reheating at Rex

**R20. Rex equipment.**
- **Ask:**
  - How many combi ovens, gas ovens, steamers and burners does Rex have?
  - How many full hotel pans fit in one oven load?
- **Why:** EXPO's Rex budget counts only a gas oven (360 min a day) and the stovetop (240). It misses the combi and the steamer.
- **Source:** EXPO `schemas/ROUTING_MODEL.md` l.58; `site_profiles/conc_site_profile.json`; CODEX `docs/CODEX_NEW_DISHES_MENU_PASS_CHEAT_SHEET_2026-08-12.md` §2b ("Not in any repo").
- **Goes to:** EXPO site profile (rexdale equipment).

**R21. When the van arrives, and when bags are reheated.**
- **Ask:**
  - Who checks the temperature of cold food when it arrives, and how soon does it go in the fridge?
  - How are bags reheated, and for how long?
  - Is the core temperature (74 °C) probed and written down?
- **Why:** HACCP calls the arrival an "unmonitored handoff", and checks reheating "every reheated batch".
- **Source:** HOUSE `HACCP_HAZARD_ANALYSIS.md` (row 10; CCP-4); `HACCP_MONITORING_RECORDS.md` §1.
- **Goes to:** HACCP monitoring and records.

### 1i. Four more, from the CODEX routes survey and its review (added later on 2026-10-20 and 2026-10-21)

**R22. Chicken Ranch Salad and Coronation Chicken Salad: the defrost "if in a rush".**
- **Ask:**
  - Both cards start "Defrost and strain chicken, use baking sheets and low temp on oven if in a rush". Does the oven only thaw the cooked chicken, or does it warm it?
  - If it warms it: how is the chicken cooled again before it's mixed and put in the fridge?
- **Why:** cooked chicken warmed in a low oven and then mixed cold needs a cooling step on the card. Their rows say "Diced Chicken (Defrosted and Strained)". Until this is answered, CODEX gives them no route of their own (v27 review fold, 2026-10-21): their card keeps the full cook-chill set, read from the kind, while the HOUSE decision tree reads their feed's no-cook route.
- **Source:** CODEX cards "Chicken Ranch Salad (Rexdale)" and "Coronation Chicken Salad", method step 1. Jason, 2026-10-05: "coronation uses bought cooked chicken". `docs/CODEX_V27_ROUTES_2026-10-20.md` §3, §10.
- **Goes to:** the two cards' method and route: no-cook if the oven only thaws bought cooked chicken (with the oven step taken out of the method), a cooling step if it warms it.

**R23. Johnny Cakes.**
- **Ask:** are they baked the morning they're served and kept hot until breakfast, or baked ahead and reheated?
- **Why:** the May 2026 import guessed their route. The HOUSE decision tree reads Johnny Cakes as cooked, cooled and reheated, while the printed card reads them as baked the same day.
- **Source:** CODEX cards "Johnny Cakes" and "Johnny Cakes (2)" (combi at 375 °F with 40% steam); `recipe_production.json` (routes guessed by the import); `docs/CODEX_COOKED_SAUCES_V25_2026-10-19.md` §5.
- **Goes to:** the CODEX route of both cards; their HACCP cards.

**R24. Refried Beans.**
- **Ask:**
  - After the cook two days ahead: how is it cooled, and how fast?
  - On the service day: how is it reheated (time, setting), and is it probed?
- **Why:** Jason ruled it a Rex cook two days ahead, reheated at Rex on the service day (2026-08-31), and EXPO plans it that way. The card's method still ends "store in hot box until service", a same-day cook. CODEX's v27 data PR gives the card that route, so it prints cooling and reheating, but the method doesn't say how either is done.
- **Source:**
  - CODEX card "Refried Beans", method step 4.
  - EXPO `RECIPE_DB` "Refried Beans" ("advance cook -2d + reheat", Jason 2026-08-31: `cold-advance`, Rex cooks 2 days before, max hold 8, oven 60).
  - `docs/CODEX_V27_ROUTES_2026-10-20.md` §2, §9.
- **Goes to:** the card's method (cooling and reheating lines in place of the hot box).

**R25. Red Red Beans, Jollof Rice and Plain Rice – Regular oven method (Rexdale): cooked on the day?** *(added 2026-10-21)*
- **Ask:** is each cooked on the day it's served and kept hot until service, or cooked ahead, cooled and reheated?
- **Why:** the May 2026 import guessed a same-day hot route for 19 rices, sides and breakfast eggs, so their cards print cooking and hot-holding only. For 16 of them the method holds or serves them on the day ("hot box until service", "serve or hold"), they are eggs cooked in the combi that morning, or EXPO plans a cook on the service day. These three methods end at the cook ("bake at 450 for 50 minutes", "cook for 1hr 30 mins", "cook the second batch the same way"), and EXPO has no record of them.
- **Source:** CODEX cards "Red Red Beans", "Jollof Rice" and "Plain Rice - Regular oven method (Rexdale)"; `docs/CODEX_V27_ROUTES_2026-10-20.md` §5, §9 (the v27 review, P3-1).
- **Goes to:** the three cards' route; a cooling and reheating step if they are made ahead.

### 1j. From the raw-send HACCP card (added 2026-10-21)

**R26. Curried Tofu: made at Rex on the day?** *(added 2026-10-21)*
- **Ask:**
  - Is it made at Rex the day it's served: the tofu and peppers diced and spiced, baked in the combi and kept in the hot box?
  - Is any of it done the day before? If the tofu is diced and spiced ahead, is it kept in the fridge until it's baked?
- **Why:** its route came from the May 2026 Rexdale import (the tofu route, made at Rex), and EXPO has no record of it. CODEX's HACCP card now reads the tofu route as a raw send: cooked and hot-held on the day, with the raw tofu held at ≤4 °C before cooking. Its method describes a same-day cook at Rex.
- **Source:** CODEX card "Curried Tofu"; `recipe_production.json` (`chainType` "tofu", `cookSite` "Rex", `archetype` "rawTofuSend"); CODEX `docs/CODEX_RAW_SEND_CARD_2026-10-21.md` §5, §8.
- **Goes to:** the card's route, or its method if part of it is done ahead.

### 1k. From the CODEX walkthrough (added 2026-10-21)

**R27. Pineapple Rice: does liquid egg go in?** *(added 2026-10-21)* Served Wk3 SAT lunch, vegan line.
- **Ask:** is liquid egg fried and folded into the rice, as the card's method says? Is the vegan pan made the same way?
- **Why:** the card is on the vegan line. Its method fries liquid egg and folds it into the rice ("Except the liquid egg"; "Pan fry the liquid egg"; "fold the pan fried egg into the rice"), but its ingredient table has no egg row and its allergens don't list Eggs. Jason ruled to ask Rexdale before changing anything (the CODEX walkthrough plan, call 7a).
- **Source:** CODEX card "Pineapple Rice" (method steps 1, 4 and 5); `CODEX_UX_WALKTHROUGH_2026-10-21.md` P1-11; `CODEX_UX_WALKTHROUGH_ACTION_PLAN_2026-10-21.md` §4 Q1.
- **Goes to:** if yes, an egg row and "Eggs (Liquid Egg)" on the card, and the dish off the vegan line (DOOR's vegan plate). If no, the egg steps come out of the method.

**R28. Johnny Cakes: how much vanilla?** *(added 2026-10-21)*
- **Ask:** the card holds 1,760 g of vanilla ("Vanilla · 2 Lt" on the Rexdale card) for 115 pieces. What is the real amount, and which product (extract or flavouring)?
- **Why:** about 15 g a piece looks like a slip; the cost and the printed card both read it.
- **Source:** CODEX card "Johnny Cakes"; `CODEX_UX_WALKTHROUGH_ACTION_PLAN_2026-10-21.md` §4 Q6.
- **Goes to:** the amount and product on the card.

**R29. Vegan Pie Filling: what is the "Vegan crumble"?** *(added 2026-10-22)* Served Wk4 WED vegan dinner (Vegan Pot Pie).
- **Ask:** is the crumble bought (which product?) or CONC's own Vegan Meat Replacement? If bought, does its label list soy or wheat?
- **Why:** the card lists Gluten, Oats, Nightshades and Sulphites but no Soy. Bought vegan crumbles are usually soy, and DOOR has a No Soy resident. CONC's Vegan Meat Replacement (mushrooms, chickpeas, brown rice, cornmeal, panko) has no soy, and its families are already on the card. Jason ruled to ask Rexdale first (2026-10-22).
- **Source:** CODEX card "Vegan  Pie Filling" (row "Vegan crumble"); conc-recipe-hub `docs/CODEX_V29_SAFE_SIDE_ALLERGENS_2026-10-21.md` §9.
- **Goes to:** if bought with soy, "Soy (Vegan Crumble)" on the card (and DOOR's vegan plate through the feed); if it's the Vegan Meat Replacement, the row links to that recipe.

**R30. Cranberry Orange Scones and Cranberry Sour Cream Cake: fresh or dried cranberries?** *(added 2026-10-22)*
- **Ask:** are the cranberries in the scones ("Cranberry") and in the cake ("Cranberries", 4 kg stirred into the batter) fresh, frozen or dried? If dried, their label: does it list a sulphite preservative?
- **Why:** dried fruit often carries sulphites. Jason ruled the safe side for the raisins and dried cranberries in six Rexdale recipes (2026-10-22: CODEX lists Sulphites on them, v30). These two rows don't say which cranberry, so they wait on this answer. The cake already lists Sulphites for its lemon juice; its label would then name the cranberries too.
- **Source:** CODEX cards "Cranberry Orange Scones" and "Cranberry Sour Cream Cake"; conc-recipe-hub v30 receipt.
- **Goes to:** if dried, "Sulphites (Dried Cranberries)" on the scones, and the cake's Sulphites label naming them, unless the label shows none.

The walkthrough's other questions are already here: the Quinoa Cakes' flour (R4), the rows for Side Salad and Garlic Corn and Bean (R12), Roasted Sweet Potato (R11) and the Soy-Free Mushroom Fried Rice (B4), and the four labels (O2).

---

## 2. Bloor kitchen

**B1. Cooling, bagging and labels, kind by kind.**
- **Ask:**
  - For stews and braises, sliced proteins, sauces, rice and starches, and salads: what pan depth, blast chiller setting and time? When does it go into the walk-in, and when is it bagged? What bag size and label?
  - Is CODEX's default for stews right: 6-inch hotel pans, blast chiller, 10-lb vac bags labelled with name and date, reheat 45–60 min in combi steam?
  - What use-by date goes on a vac bag?
- **Why:**
  - 59 of 92 cook-chill recipes in CODEX's Library don't say how they're cooled.
  - The plan's limit is 7 days from the cook day, but an old label says 2 weeks.
- **Source:**
  - CODEX `CLAUDE.md` C1b ("33 of 92 cook-chill recipes say how they're cooled"); CODEX `index.html` `_cxDefaultStorageText`.
  - HOUSE `HACCP_HAZARD_ANALYSIS.md` §5 item 10 (`HACCP_BAG_LABEL`: "Use by… 2 weeks").
- **Goes to:** one standard cooling and storage step per kind of dish in CODEX; the HACCP card and bag label.

**B2. Blast chiller at full load, and the simmer before bagging.**
- **Ask:**
  - Does a full batch (for example the 80-lb shakshuka in 6-inch pans) reach 20 °C within 2 h and 4 °C within 6 h?
  - Do vac-bagged dishes reach a full simmer (90 °C) for 10 minutes before chilling? Are there any that don't (sliced proteins, sauces)?
- **Why:** the 7-day bag life rests on that 10-minute simmer. HACCP asks for a check of each bagged dish (54 now) and a full-load chiller test.
- **Source:** HOUSE `HACCP_SESSION_HANDOFF_2026-06-27.md` §7 (l.135–136); `HACCP_HAZARD_ANALYSIS.md` CCP-1 and CCP-3; the regenerated decision tree (54 vac-bagged).
- **Goes to:** HACCP plan (barrier per dish); EXPO hold limits if a dish fails.

**B3. Nigerian Fish, Nigerian Styled Tofu and Roast Tofu.** Served Wk3 FRI lunch and Wk1 THU vegan dinner.
- **Ask:**
  - Per batch, how much of each goes into the Pepper & Onion Sauce: roasted peppers, onions, garlic, ginger, Nigerian spice mix?
  - What seasoning goes on the Roast Tofu?
- **Why:** the three CODEX records are empty, and the sauce quantities were never given.
- **Source:**
  - `docs/CODEX_NIGERIAN_ROAST_TOFU_FISH_CORRECTION_2026-08-10.md` §4b and §8 #2 ("quantities not yet given").
  - CODEX records "Nigerian Pepper Stew Fish/Tofu" and "Roast Tofu"; EXPO l.11187 and l.14817.
  - Shared Library "Nigerian Spice Mix" (Bloor, Oct 18).
- **Goes to:** CODEX recipes for the three dishes and the sauce.

**B4. Soy-free mushroom fried rice.** Served Wk3 FRI vegan dinner.
- **Ask:**
  - What's the full ingredient list? What replaces the soy sauce?
  - Does anything with soy go into the vegan pan?
- **Why:** DOOR takes the SOY warning off that vegan plate because the name says soy-free, and CODEX has no recipe to back it up.
- **Source:** CODEX record "Soy-Free Mushroom Fried Rice" (no ingredients); EXPO l.15790; DOOR `DOOR_DECLARED_FREE` (`index.html` l.18931, v31-standard.20).
- **Goes to:** a CODEX recipe; keep or drop DOOR's soy-free reading.

**B5. Green curry sauce.** Served Wk4 MON fish curry and tofu curry.
- **Ask:**
  - Is one sauce made for both?
  - Which paste: the house vegan paste, or a bought one (read its label)?
  - Does the sauce contain any dairy, fish sauce or shrimp paste?
- **Why:** DOOR's vegan plate reads "Vegan Thai Green Curry Sauce", but the shared card "Thai Green Curry Sauce – Bagged (Fish & Tofu)" lists Milk, Gluten and Soy "(source card)".
- **Source:** `library_shared.json` (`shared-library`); `docs/CODEX_ONE_ALLERGEN_SOURCE_2026-10-16.md` l.293; EXPO "Green Curry Sauce" l.13118; DOOR Wk4 MON dinner slot.
- **Goes to:** the bagged card's allergen list in CODEX, or retire the card.

**B6. Sweet Potato Biscuit.** Served Wk2 WED lunch, both lines.
- **Ask:**
  - Is it bought, or made from CODEX's card? (The card has Bloor make and freeze the dough, then bake from frozen.)
  - If made: butter or margarine? Dairy milk or plant milk?
- **Why:** DOOR's Milk tick waits on where the biscuit comes from. EXPO says "either purchased frozen or scratch bake at Rex".
- **Source:** CODEX one-allergen receipt §6 (l.298); CODEX card "Sweet Potato Biscuits"; EXPO l.14973.
- **Goes to:** DOOR Dairy tick; CODEX route; EXPO entry.

**B7. African Peanut Chicken Stew.**
- **Ask:** the card says "1 Veg Bouillon". One what: tub, cup or tablespoon?
- **Why:** the unit is blank, so costing can't read it.
- **Source:** `docs/CODEX_COSTING_C7B_RESIDUAL_CLEANUP_HANDOFF_2026-07-16.md` §4.
- **Goes to:** the unit on the CODEX card.


**B8. Meatballs and Meatloaf: who cooks them, and when?** *(added 2026-10-21)*
- **Ask:**
  - Does Bloor still roast the meatballs, cool them and bag them with the Simple Tomato Sauce? Does it still bake the meatloaf, cool it and portion it for Rex to reheat?
  - Or does Bloor send the raw mix, and Rex shapes and cooks them on the day? If so, is the raw mix kept in the fridge until it's cooked?
- **Why:** EXPO sends both raw for Rex to cook on the service day: Bloor mixes them (and trays the meatloaf), and Rex shapes the meatballs. The meatball card's own method notes "mix now goes to Rex in this form". But both CODEX methods still cook them ahead ("Cool and bag with Simple Tomato Sauce"; "Cool and portion … Reheat covered"). So their HACCP card keeps the full cook-chill set with "verify on-site", while the other raw sends print the same-day card.
- **Source:** CODEX cards "Meatballs" (steps 4 and 7) and "Meatloaf" (steps 6–8); EXPO `RECIPE_DB` "Halal Beef Meatballs" and "Beef Meatloaf — Bake" (`rawMeatSend`, cooked at Rex); CODEX `docs/CODEX_RAW_SEND_CARD_2026-10-21.md` §1, §8.
- **Goes to:** the two cards' methods, then their HACCP card (same-day if Rex cooks them on the day).

**B9. Butter Chickpeas: the amounts.** *(added 2026-10-21)*
- **Ask:** the card makes 20 portions from 10 lbs of onions, 1 can of chickpeas, 250 mL of coconut milk and a quarter can of diced tomatoes. What are the real amounts for one batch, and how many portions does it make?
- **Why:** the onions outweigh the chickpeas many times over. The card scales from these numbers, so a cook who scales it gets the same mismatch.
- **Source:** CODEX card "Butter Chickpeas" (Bloor); `CODEX_UX_WALKTHROUGH_ACTION_PLAN_2026-10-21.md` §4 Q8.
- **Goes to:** the card's rows and batch.

**B10. Seasonal Soup and Cut Fruit: what goes in them?** *(added 2026-10-21)*
- **Ask:** what goes in each, and how much for one service? For the soup: water or stock (if stock, chicken or vegetable)? Any cream, butter or flour?
- **Why:** both CODEX records list no ingredients. Their allergens say "None", but CODEX can't check that without rows, so they stay "Not verified".
- **Source:** CODEX records "Seasonal Soup" and "Cut Fruit" (Bloor, no ingredients); `CODEX_UX_WALKTHROUGH_ACTION_PLAN_2026-10-21.md` §3 call 6 and §4 Q9.
- **Goes to:** each record's rows; then CODEX shows "No allergens · checked", or the families its rows bring.
---

## 3. Lansdowne and Bloor's own residents (when they come into HOUSE)

Work across several sites is parked "until Lansdowne returns". Ask these when LAN, or Bloor's own residents, are brought into HOUSE.

**L1. Who the kitchen feeds.**
- **Ask:**
  - Is the Lansdowne kitchen cooking now? For whom: LAN residents, Roncesvalles, a warming centre? How many meals for each?
  - Does Bloor feed its own residents?
- **Why:** the sources disagree.
  - LAN: EXPO's site file says 25; the HACCP draft says about 90, Roncy included.
  - Bloor: the site file says 30; `CONC_OPERATIONS.md` says Bloor serves no one.
- **Source:** EXPO `site_profiles/conc_site_profile.json` (residents); `CONC_OPERATIONS.md`; `VISION.md` l.107; HOUSE `HACCP_PLAN_DRAFT.md` l.78; `HOUSE_ASSESSMENT_2026-07-07.md` l.125.
- **Goes to:** EXPO site profile; DOOR site and resident list for each site.

**L2. LAN's menu, recipes and diet list.**
- **Ask:**
  - What menu does LAN cook: the same 4-week rotation, or its own?
  - Which recipes does it use?
  - Who keeps the residents' diet list there?
- **Why:** "LAN's real recipe library and production schedule are a data gap."
- **Source:** EXPO `CONC_OPERATIONS.md` l.34.
- **Goes to:** EXPO menus and site profile; CODEX recipes; DOOR resident list for LAN.

**L3. The Roncesvalles van.**
- **Ask:** when does it leave and arrive? What goes hot, and what goes cold?
- **Why:** this transport leg isn't modelled anywhere.
- **Source:** EXPO `CONC_OPERATIONS.md` (Roncy "not currently modeled").
- **Goes to:** EXPO site profile `transport`.

---

## 4. Program / Health & Wellness staff (resident list)

These questions name residents' rooms with their allergies and health needs, so they are kept out of this public repo. Jason holds them as a separate list, to go through only with Health & Wellness staff. They cover:
- **H1. The anaphylactic list:** each room, its allergens, whether it is anaphylactic, and whether anyone is missing.
- **H2. Restrictions an import dropped from DOOR's published list:** seafood, tree nuts, and vegetables that may be an allergy or a dislike.
- **H3. Two residents' plates:** whether each needs a separate gluten-free or dairy-free plate. DOOR makes one; the kitchen's sheets don't.
- **H4. One-off needs on the kitchen's sheets that DOOR's list doesn't carry:** a low-carb need, which peppers to leave out, and low potassium.

**Goes to:** DOOR's resident tags, its anaphylactic list and the residents' notes.

---

## 5. Drivers / van

**V1. Van times.**
- **Ask:** when do the AM and PM vans actually leave Bloor and reach Rex, on weekdays and on weekends?
- **Why:**
  - Hot food sent the same day must stay at 60 °C or above, or be used within 4 hours.
  - HACCP asks for clock times ("currently only ~2:00 / AM / PM").
  - EXPO assumes 09:00 → 09:30 and 14:00 → 14:30.
- **Source:** EXPO `CONC_OPERATIONS.md` l.76–82; site profile `transport`; HOUSE `HACCP_HAZARD_ANALYSIS.md` CCP-5 (l.123).
- **Goes to:** EXPO site profile `transport`; the HACCP hot-send time limit.

**V2. What the food travels in.**
- **Ask:**
  - Insulated hot boxes or cambros? Coolers with ice packs? A refrigerated van?
  - How many hot and cold containers fit in one run?
- **Why:**
  - HACCP's transport control is "validated insulated/refrigerated transport (documented capability)", and nothing documents it yet.
  - EXPO assumes 9 hot / 12 total.
- **Source:** HOUSE `HACCP_HAZARD_ANALYSIS.md` l.115; EXPO `CONC_OPERATIONS.md` l.81.
- **Goes to:** HACCP transport control (CCP-7); EXPO van capacity.

---

## 6. Every site: food-safety records

**S1. Fridges and freezers.**
- **Ask:** list every fridge, walk-in and freezer at Bloor, Rex and LAN, with the temperature each should hold.
- **Why:** the temperature-log spec has only placeholder units.
- **Source:** HOUSE `haccp/haccp_spec.json` (every unit "PLACEHOLDER"); `haccp/HACCP_PLAN.md` §13 #1.
- **Goes to:** `haccp_spec.json` units (and HUB's log form later).

**S2. Temperature logs, thermometers, written procedures.**
- **Ask:**
  - Who checks fridge and freezer temperatures, and how often? (The plan assumes twice a day.)
  - Where do the sheets go, and how long are they kept?
  - How are probe thermometers checked (ice water?), and how often?
  - Which written procedures already exist: cleaning, pest control, receiving, allergen control?
- **Why:** the draft HACCP plan marks each of these "▢ CONFIRM".
- **Source:** `haccp/HACCP_PLAN.md` §13 #3–5 and #7, and the "▢ CONFIRM" marks in §6, §9, §10 and §11.
- **Goes to:** HACCP plan §6, §9, §10 and §11.

---

## 7. Whoever orders food

**O1. Rex frozen stock.**
- **Ask:**
  - Who places the order, and on which days?
  - How long does each supplier take to deliver?
  - Who counts the freezer, and how often?
- **Why:** every frozen item carries a stand-in 7-day lead, and HUB's "order by" date uses it. Jason: "I don't know when rex's order day(s) are".
- **Source:** EXPO FROZEN_STOCK_DB l.22773 (`leadTimeDays: 7` on every item); `EXPO_HUB_FROZEN_ORDER_ACTION_PLAN_2026-10-11.md` HF1 and HF7.
- **Goes to:** FROZEN_STOCK_DB `leadTimeDays`; the counting routine on HUB's Frozen stock screen.

**O2. Read these labels (one trip to the shelf).**

| Product | Look for | Used in |
|---|---|---|
| Cider vinegar | sulphites | 7 recipes list Sulphites from it (Coleslaw, Braised Cabbage, Shawarma Vinaigrette and Slaw, GF Cajun Fallafal, Cajun Fish Fallafal Coleslaw, Gluten Free Bread). They come off if the label shows none |
| Bouillon / soup base | soy, milk, celery… (gluten already ruled out). For Roasted Carrot Soup's soup base: chicken or vegetable? | the stews, Kuku Paka, Roasted Carrot Soup |
| Canned baked beans | pork, lard, honey, milk, gelatin | Chakalaka (both lines, Wk3 THU dinner) |
| Teriyaki sauce | honey, fish, milk | Teriyaki Tofu (Wk4 THU vegan dinner), Sesame Sauce |
| Coconut milk powder | milk or caseinate | Rice and Beans (Wk1 MON dinner, both lines) |
| Bottled lemon juice and lime juice *(added 2026-10-21)* | a sulphite preservative (metabisulphite, bisulphite) | 29 CODEX recipes, among them the marinades, Tzatziki, Garlic Sauce, both tuna mixes and Refried Beans. Jason ruled the safe side (2026-10-21): CODEX lists Sulphites on all 29. They come off, with a stamped removal, if the labels show none. *Added 2026-10-22 (v30):* Chicken Gyro carries its tzatziki's, and Rexdale's Lime Coconut Rice (no rows on its card) carries its twin Lime and Coconut Rice's. Rexdale: is that rice made with bottled lime juice? |
| Pickled onions, pickle juice, white vinegar *(added 2026-10-22)* | a sulphite preservative | The CONC Salad's pickled onions (Wk2 FRI lunch), the ranch's pickle juice or vinegar (Chicken Ranch Salad), the Vindaloo Marinade's white vinegar. CODEX lists no Sulphites for them (from the DOOR W1b review); nothing is added until a label is read |
| Cattlemen's BBQ sauce *(added 2026-10-21)* | tomato, paprika or chili (nightshades); molasses (sulphites); mustard; Worcestershire (fish, gluten, soy); anything else. And: which BBQ sauce do the BBQ Chicken Legs use? If another, read its label too *(BBQ Chicken Legs added 2026-10-22)* | Honey BBQ Sauce; BBQ Chicken Legs (Bloor). CODEX lists Nightshades on both, on the safe side; nothing else is added until a label is read (Jason, 2026-10-22) |
| Raisins and dried cranberries *(added 2026-10-22)* | a sulphite preservative (sulphur dioxide, sulphite, metabisulphite) | Rexdale's Butter Tarts, Vegan Butter Tart, Coconut Drop Cookies, Granola, Overnight Oats and Fiona's Oatmeal Cookies. Jason ruled the safe side (2026-10-22): CODEX lists Sulphites naming the fruit on all six (v30). They come off, with a stamped removal, if the labels show none |
| Lemon pepper seasoning *(added 2026-10-21)* | paprika, red pepper or chili (nightshades); anything else. Is the "Lemon Pepper Seasoning Mix" in the chimichurri dishes the same product as the one in Lime-Spiced Chicken Legs? | Chimichurri Chicken Legs, Chimichurri Tofu, Lime-Spiced Chicken Legs. CODEX lists Nightshades on all three |
| Beef jus *(added 2026-10-21)* | First: is it bought, or the beef's own cooking liquid? The recipe's method pours it off the browned beef ("Beef Jus (Cooking Liquid)"), as Beef Nacho Mix does with no Gluten listed. If bought: wheat or gluten; soy *(question sharpened 2026-10-22, from the W1 review)*. **Answered 2026-10-22 (Jason): the method's own words — it's the pan liquid.** Bloor only needs to say if a bought jus is ever used | Beef CONC Salad Mix. CODEX takes the Gluten off, with a stamped removal (v30) |

- **Why:** these decide published allergens and the vegan-friendly flag; each is listed as waiting on its label.
- **Source:** CODEX one-allergen receipt §11 (l.493, "Label checks, open"); C8 receipt "For Jason" #1 (l.51); bouillon ruling (v22).
- **Goes to:** CODEX allergen lists (stamped when one comes off); DOOR ticks through the feed.

**O3. Bought menu items CODEX has no label for.**
- **Ask:** brand and full label for each. What allergens does it list, and is it vegan?

| Item | Menu |
|---|---|
| Veggie burgers | Wk2 THU and Wk4 THU lunch, vegan line |
| Vegan gyro strips | Wk2 MON lunch, vegan line |
| Pre-cooked chicken gyro meat | Wk2 MON lunch |
| Breaded chicken tenders | Wk2 SAT lunch |
| Vegan sausages, vegan breakfast sausage, quinoa cakes | only if bought (R4, R6) |

- **Why:** their CODEX records have no ingredients. Their allergens were guessed from words like "breadcrumbs", "pita" and "vegan strips", and the veggie burger's vegan flag waits on its label.
- **Source:** CODEX records "Veggie Burger (Black Bean)", "Vegan Gyro", "Chicken Gyro" and "Chicken Tenders" (no ingredients); C8 receipt (Veggie Burger under "Waiting — 19").
- **Goes to:** those records' allergens and vegan flag in CODEX; DOOR ticks.

---

## Checked and left out (already answered or ruled)
- **Honey BBQ Sauce:** blended, not heated (Jason, 2026-10-20).
- **Ruled Oct 6–7** (`EXPO_MENU_WORKBOOK`):
  - hotdogs 20 min and Roasted Zucchini 25 min;
  - Side Salad made the day before;
  - the hotdog mustard and soy flags stay.

  EXPO's notes still say "placeholder until Rex confirms" and "facts pending".
- **Garlic Corn & Bean** is a Rex day-of cook (Oct 4). Only its ingredients are asked (R12).
- **Bouillon** has no gluten (Oct 17). Only the rest of its label is asked (O2).
- **Answered by Jason:** Gardein tenders (soy and gluten); the jackfruit sandwich (jackfruit and aromatics); coronation chicken (bought cooked chicken); chips (corn, no gluten); spring rolls (no soy); CONC's soy sauce (gluten-free).
- **June's long holds** (27-day shakshuka, 10-day epis) are gone: the board on 2026-10-20 holds nothing longer than 7 days.
- **The Oct 4 held calls are ruled:** carnitas, shawarma, BBQ legs. So are the Sep 3 rice and veg rulings (Home Fries, Roasted Yam; Mujadarrah is off the menu).

## Found on the way (Jason can fix these without asking anyone)
- EXPO "Chickpea Drumstick" (l.12391) still says "Purchased frozen". Today's ruling says Rex makes them.
- DOOR has no Corn tick on Wk1 SAT lunch "Peas and Corn" or Wk3 TUE lunch "Garlic corn & Bean". One resident avoids corn, and DOOR reads No Corn against that tick (`index.html` l.9177).
- DOOR has no halal line for Wk3 TUE lunch (Glazed Ham), though EXPO cooks "Glazed Halal Chicken" for it.
- The registry published Oct 19 still lacks four residents' hand re-adds (in the Health & Wellness list). Confirm them with H2 first.
