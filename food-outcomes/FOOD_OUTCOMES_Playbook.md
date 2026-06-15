> _Canonical source: `conc-kitchen-expo/FOOD_OUTCOMES_Playbook.md` @ branch `claude/gracious-allen-0G6uI`, copied 2026-06-15. Edit it there, not here, to avoid drift._

# Better Food Outcomes at CONC — Execution Playbook for Cook-Chill at Scale

**Date:** 2026-06-06
**Scope:** HOUSE-wide (DOOR menu · EXPO schedule · HUB floor) — food *execution* quality
**Builds on:** the CODX authenticity pass (recipe authenticity, separate branch, not yet live).
Authenticity gets the recipe right; **this is the layer that gets it to the resident's plate still tasting and looking like it.**
**Top priorities (per Jason):** taste and presentation, kept executable by a small team across sites.
**Method:** codebase sweep (menu + schedule + production model) → scoped deep research (5 parallel
search angles) → verification of safety-critical and quantitative claims against authoritative sources →
prioritized synthesis. Confidence/caveats are flagged throughout; a sources appendix is at the end.

---

## Operation at a glance (the reality these tips are tuned to)

- **Scale:** ~165 portions/dish, 3 meals/day, 7 days, on a 4-week rotation (~42 distinct lunch/dinner
  main-lines), each in 3 streams (regular / vegetarian-vegan / halal) plus GF accommodation.
- **Sites (reno):** Bloor (primary cook + reheat/plate), Rex (frozen-stock freezer + plating/assembly),
  LAN (supplemental cook + cold prep + hot sides). Cold/hot van transport between sites (AM + PM runs).
- **Binding constraint:** combi/convection oven-time (~420 min/day Bloor, ~300 LAN).
- **Menu diversity:** Ethiopian, Filipino, Caribbean, Indian, West African, Tex-Mex, East/SE Asian, Thai,
  Middle Eastern, plus North American comfort.

### The cook-chill boundary is narrow and deliberate (get this right)

- **Cook-chill + reheat applies ONLY to:** stews and braised/sauced meats (curries, braises, stroganoff,
  peanut stew, adobo, griot, chakalaka, beef stew), shaped proteins (meatloaf/meatballs), and shared
  sauces/gravies. These are batch-cooked → blast-chilled → vacuum-bagged → cold-held → reheated → plated.
  **This is the only surface where reheat-quality matters.**
- **Everything else is cooked FRESH day-of at the service site:** roasted/grilled proteins (chicken legs,
  roast chicken, tandoori), fish, tofu — seasoned/marinated then cooked fresh, never reheated; fried/crisp
  items (tenders, wedges, falafel); boiled starches (pasta, noodles, rice); steamed/roasted vegetables.
- **Salads/sandwiches/wraps are cold-assembled** (no heat).

This already-correct split is the foundation. The research below sits on top of it.

---

## The one idea that organizes everything

A multi-day chill + ~60-min combi reheat reliably strips **volatile aroma** (most of what we perceive as
"flavor") and can breed **warmed-over / oxidized off-notes** — while **salt, umami/glutamate, and the
melded braise base survive or even improve**. So the whole game is:

> **Lock the stable dimensions in early. Restore the volatile dimensions — and all texture contrast and
> color — at the finishing station.**

And presentation is not cosmetic: in a controlled hospital study, *better plating of identical food* raised
the share of patients rating the meal "tasty" from **33.7% → 49.5%** and cut 30-day readmission from
**31.2% → 13.5%**. For a shelter population where intake matters, presentation is a direct outcome lever.

---

## Top 5 highest-leverage moves (do these first)

| # | Move | Why it's top-tier | Small-team fit |
|---|---|---|---|
| **1** | **A per-dish "finishing kit" at plate-up** — acid + fresh-herb drop-sauce + a crunch + an aromatic drizzle/tarka | Restores exactly what chill+reheat removes (aroma, brightness, texture, color) in one motion | Cheap, low-skill, cross-utilized across dishes/streams |
| **2** | **Move dairy/coconut, delicate veg, and final thickening OUT of the make-ahead base** — add on reheat/finish | Fixes the top reheat *texture* failures: split curries, grainy cream, mushy veg, gummy sauce | One staged add at the finishing site |
| **3** | **Cap cold holds at ≤5 days** (away from the 7–10-day max) | Quality degrades long before safety does; 10-day *vacuum* holds hit the botulinum boundary | One-line `maxHoldDays` change in EXPO |
| **4** | **Plating spec sheet + reference photo + portion tool per component**, posted at each finishing site | Single biggest driver of cross-site visual consistency; proven to lift intake | Lets a part-timer plate like the lead |
| **5** | **Season base to ~90% + lock umami in early; final salt/acid correction post-reheat** | Salt/umami survive the hold; aroma/brightness don't — so finish, don't front-load | A taste-and-adjust habit, not new labor |

---

## Part 1 — Keeping braises/stews/sauced dishes vibrant through chill + reheat

### 1A. Flavor: lock stable, restore volatile

- **Season the base to ~90%; do the final salt/acid correction *after* reheat, at the pass.** A dish
  balanced when first cooked reads flat once chilled and reheated — but the fix is restoring *aroma*, not
  adding salt. Don't over-salt the base to compensate: salt is non-volatile and doesn't fade, so a
  pre-salted base tastes correct hot but over-salted if eaten cool.
- **Build umami into the base early — the one flavor dimension that is heat- and storage-stable.** MSG or
  high-glutamate ingredients (tomato paste, soy/fish sauce, mushroom powder, parmesan rind) deepen savory
  body that survives the hold. Bonus for a shelter population: MSG carries **~⅓ the sodium of table salt**,
  so partial salt→MSG substitution holds flavor at lower sodium.
- **Whole/hardy aromatics in the base; ground spices, fresh herbs, and acid at the finish.** Ground-spice
  top-notes and soft-herb oils evaporate over a multi-day hold and degrade above ~85°C, so anything
  delicate added before the reheat is cooked to nothing. Hardy herbs (bay, thyme, curry leaf, rosemary)
  and whole spices bloomed in fat go in early.
- **Finish every reheated braise with fresh acid** (lemon/lime squeeze, vinegar-dressed element). Acid
  heightens perception of other tastes, releases aroma volatiles, and cuts richness — "tastes
  underseasoned" is very often "lacks acid."
- **Use the cold hold's upside, then respect its limit.** At 1–2 days braises genuinely deepen (flavors
  meld, collagen→gelatin, fat traps aromatics). That reverses by day 7–10 as warmed-over flavor / aroma
  loss takes over — **so the longest-held batches need the most aggressive finishing** (another reason to
  keep holds short).
- **Minimize warmed-over flavor (WOF):** WOF is oxidative breakdown of meat fats into stale aldehydes,
  catalyzed by iron freed during cooking, worsening over storage and reheat. Vacuum bagging already helps
  (excludes air); antioxidant-rich spices (rosemary, clove, turmeric, berbere chilies) in the base slow it
  further. WOF is a bigger risk in your *milder/lighter-sauced* dishes than in heavily spiced curries.

### 1B. Cuisine-specific finishing (added at service; an asset of the diverse menu)

| Cuisine (your dishes) | Finish at plate-up |
|---|---|
| **Indian** (Butter Chicken, Vindaloo, Caribbean/Chickpea curry, dal) | **Tarka/tadka** — whole spices + garlic/chili bloomed in hot ghee, poured over at service |
| **Ethiopian** (Gomen Besiga, collard stew) | A spoon of **niter kibbeh** (spiced clarified butter) + fresh berbere bloomed in fat |
| **Caribbean** (Jerk braises, Griot, Chakalaka) | Fresh scotch-bonnet + thyme/scallion + lime |
| **SE Asian/Thai** (Massaman, Teriyaki, fried rice) | Lime + fish sauce + Thai basil/cilantro + fresh chili |
| **Latin/Tex-Mex** (Carnitas, Arroz con Pollo, Adobo) | Fresh cilantro/sofrito + lime; crema drizzle |

Niter kibbeh and chili/aromatic oils keep for weeks refrigerated — **batch them, hold warm/liquid, pour at
service.** Tarka with fresh garlic/curry-leaf is best bloomed close to service.

### 1C. Texture & sauce stability (the reheat-failure fixes)

- **Thicken with waxy/modified starch, or thicken on reheat — not cornstarch slurry or raw flour before
  chill.** Amylose (in regular starch/flour) recrystallizes cold and weeps/goes gummy on reheat; waxy
  maize/rice resist it. If only wheat is available, a properly cooked roux beats a slurry for hold.
- **Add cream/yogurt/sour cream after reheat, off the boil — never before chill.** Heat + acid + salt break
  dairy emulsions → graininess/curdling. If dairy must be cooked in, **temper it**, **stabilize with a
  little starch**, and use **full-fat** (fat protects the proteins). → *Directly fixes Butter Chicken,
  Stroganoff.*
- **Coconut curries: hold the base without coconut milk; stir it in during the last ~5 min of reheat.** It's
  a fragile emulsion that splits under long/high heat; a tapioca slurry re-emulsifies a broken sauce. →
  *Massaman, Caribbean curry, Yetisse, Fish/Tofu curry.*
- **Pull braised meats slightly *under* tenderness and store/reheat them *in their sauce.*** The hold +
  60-min reheat is significant extra thermal exposure — treat it as carryover. Submerged meat reabsorbs
  liquid and the sauce buffers it from drying; drained meat goes stringy. *(The initial cook must still hit
  the 74°C kill step — "undercook" means texture, not bacterial safety.)*
- **Keep quick-cooking veg and starches out of the make-ahead sauce.** Potatoes, peas, green veg, pasta keep
  softening through cook→hold→reheat. Cook fresh and combine at service, or add near the end.

### 1D. Reheat technique (the combi is the kill step *and* the chief texture-degrader)

- **Reheat in combi *combination* mode (hot air + ~50% steam, ~120–140°C), not dry convection or a high
  blast.** Steam reheats gently and re-hydrates ("regenerates"), preventing surface-dry, edge-overcook, and
  color-dulling.
- **Shallow even layers, stir once partway, probe the *coldest/center* point.** Deep dense pans overcook
  edges before the center is safe.
- **Reheat to the 74°C target and stop — don't exceed it.** Excess time/temp accelerates the lipid
  oxidation that creates warmed-over flavor. Add aromatic fats/oils at the *end* of the cycle so their
  volatiles aren't driven off.

### ⚠️ Safety spine (Ontario / Health Canada — verified)

> - **Cook** to ≥74°C core · **cold-hold** ≤4°C · **hot-hold** ≥60°C · **reheat** to **74°C/165°F within 2 h**
>   (Ontario O.Reg 493/17). Note: your governing reheat target is **74°C**, not the UK's 70°C.
> - **Cool fast:** Ontario two-stage limit 60→20°C in 2 h, 20→4°C in 4 h; **aim for blast-chiller pace
>   (≤90 min through the danger zone)** — faster is better for both safety and texture.
> - **Hold ≤5 days** (conventional cook-chill best practice). **The 7–10-day vacuum-bag holds are the red
>   flag:** >10 days chilled in vacuum triggers the non-proteolytic *C. botulinum* "10-day rule," needing a
>   validated control (e.g., **90°C/10 min equivalent + storage ≤3–8°C**). Reduced-oxygen/vacuum cook-chill
>   often needs a **specialized HACCP plan / variance** — confirm with Toronto Public Health.
> - **This aligns with EXPO already scoring 3–5-day holds best and penalizing 7+.** Tightening
>   `maxHoldDays` to ≤5 is both a quality and a safety win.

---

## Part 2 — General uplift: presentation & taste at institutional scale with a small team

### 2A. Plating standardization (the cross-site consistency engine)

- **One-page plating spec per dish: a reference photo + the portion tool per component.** Any plater
  reproduces the lead's plate.
- **The "clock method" for placement** (protein 6 o'clock, starch 10, veg 2) removes per-cook judgment —
  the main source of cross-site drift. Adapt to tray compartments for divided service.
- **Standardize a portion tool to each component** — number-coded disher for mounds, oz ladle for sauce,
  spoodle for sides — and write the tool number on the spec. Locks both appearance *and* cost.
- **Design color/contrast in at the recipe stage** — never let a plate go monochrome/beige. Beige-heavy
  dishes (butter chicken + rice + naan) need a designed-in bright element (colored veg, herb, or sauce
  accent), not an improvised one at the line.
- **"Garnish that's also an ingredient,"** pre-portioned in shakers at mise (chopped herbs, paprika dusting,
  scallion) — color in one fast motion, no separate prep stream.
- **Ladle sauce to-order; wipe rims.** Smeared sauce + dirty rims are *the* institutional-look failure.
  Don't hold pre-sauced food (it bleeds color and goes gluey).
- **Protect the plate during service:** pre-warm plates, hold in covered cabinets (not long under heat
  lamps), keep **shallow steam-table pans freshly topped** so the top layer never crusts and dulls.

> **Why it's worth it:** identical food, better-plated, raised "tasty" ratings to 49.5% (from 33.7%) and
> cut readmissions in the hospital study; appealing presentation is a recognized appetite/intake driver in
> long-term-care research too. (Hospital result is one strong single-center controlled study — compelling,
> not definitive.)

### 2B. The finishing-station model (the 3-site CPK structure, as a quality asset)

The 3-site split is already a **central-production-kitchen + finishing-kitchen** model — the exact structure
that lets *low-skill staff at the finishing site* produce high-quality plates, because the skill is
concentrated upstream and the finishing site reheats, finishes, and plates *to spec*. Turn it into a quality
asset:

- **Run finishing as a mise-en-place assembly line:** base → protein → sauce/drizzle → garnish, each station
  stocked within arm's reach, finishing-kit components pre-staged.
- **The finishing kit (Move #1) is built from a few cross-utilized components** — acid (citrus/vinegar), one
  or two herb drop-sauces (gremolata/chimichurri-style, sub-5-min), a crunch (**dukkah, toasted seeds,
  crispy shallots** — shelf-stable, garnish dozens of dishes), and an aromatic drizzle (chili oil / tarka /
  niter kibbeh / crema). Texture contrast is a measurable satisfaction driver, not decoration.
- **Assemble dressed salads/slaws at the finishing site, not upstream** — keep raw produce as a Rex→site
  input lane so crunch/acidity survive transit.

### 2C. Small-team systems & QC

- **A standardized recipe per dish = the source of truth across all 3 sites** (weights, yield, portion,
  method, equipment). It's what lets part-time/rotating staff reproduce quality and makes cost predictable.
  **Re-test each at *your* batch size** — a recipe isn't standardized until it works on your equipment.
- **Don't scale seasoning linearly.** Salt, spice, acid, garlic, chili scale to ~**60–75%** of the batch
  factor — then taste up. Bulk ingredients scale 1:1; seasonings/thickeners/leavening don't.
- **Taste every big batch twice — once before chill, once after reheat** — and re-season at reheat. Always
  from a separate portion, never the service batch.
- **Designate one taster per shift as the consistency anchor** (with a cross-trained backup), against a
  one-line written sensory standard per dish ("what right tastes/looks like").
- **A one-card pre-service line check** (taste sauces, probe proteins, check veg doneness, plate vs.
  reference photo). Keep it to one card or a busy team stops using it.
- **Combine the HACCP temp log with a one-word quality note** (cook temp / chill curve / reheat temp +
  "look/smell/taste OK?") — safety record and quality-trend tool in one motion.
- **Cross-train + speed-scratch where labor-bound** (already done — vendor pizza is a speed-scratch
  decision). Keep flavor-defining steps in-house; buy out the rest.

### 2D. Model / menu-level (structural)

- **Cross-utilized mother-bases cut SKU count and prep load** — one tomato base → marinara / curry base /
  enchilada by re-spicing; one finishing kit serves regular/halal/vegan and many menu days. Same principle
  as the existing shared-base routing tables; extend it deliberately. *(Operator efficiency figures here are
  directional trade estimates, not audited.)*
- **Keep menu-engineering the cook-chill / fresh-finish / buy split explicit** (mostly already done).
  Reheats-well = braises, stews, chili, beans, soups, tomato/gravy-based. Cooks-fresh = crisp/fried,
  delicate fish, eggs, leafy/fresh, pasta/rice. Buy = where quality-in ≥ quality-you-can-make (pizza). Avoid
  flour-roux + dairy-heavy sauces *in the make-ahead stream* unless stabilized.
- **Batch like-cooked items and sequence the longest-cook first** on the combi (the binding constraint) —
  overlaps cook and prep, maximizes throughput; size batches to a full rack and stagger so the chiller
  isn't overwhelmed.

---

## How this plugs back into HOUSE/EXPO

A few of these are codeable, not just operational:

1. **`maxHoldDays` → cap at 5** (Move #3). Aligns with `scoreCookDay`'s existing 3–5-day preference; surfaces
   the 10-day vacuum-pack batches as the ones needing a validated process or a shorter hold.
2. **Model the finishing step as a first-class chain row.** A `FINISH`/companion step on every
   `advancedStew` / `bonelessChicken` (braise) / `shapedProtein` archetype — "add dairy/coconut + tarka/acid/
   herb + garnish at plate-up" — would put the single highest-leverage taste move on the HUB card the floor
   actually reads, making "dairy/coconut added at finish" the scheduled default rather than tribal knowledge.
3. **Plating spec + reference photo per dish belongs in HUB** (the floor-facing surface), keyed off the dish
   like the rest of the schedule.
4. **A "cook-chill suitability" tag in `RECIPE_DB`** would make the make-ahead-vs-fresh-vs-buy split
   queryable and auditable — turning a good instinct into a checkable rule.

---

## The three things, if nothing else

1. **Add a finishing kit (acid + herb + crunch + drizzle/tarka) to every reheated dish, at the plating
   station.** Biggest taste-per-effort lever; restores everything chill+reheat strips.
2. **Get dairy, coconut, and final thickening out of the make-ahead base and into the finish; cap holds at
   ≤5 days.** Kills the split/grainy/gummy/mushy reheat failures and closes the botulinum risk.
3. **One plating spec + reference photo + portion tool per dish, at each site.** Proven to lift
   intake/satisfaction; makes a small, rotating, multi-site team plate consistently.

---

## Evidence & confidence

- **High confidence (well-corroborated food science / standards):** warmed-over flavor, aroma loss on
  cooling, starch retrogradation, dairy/coconut emulsion splitting, herb/aroma volatility, MSG umami &
  sodium, the Ontario safety numbers, standardized-recipe benefits, non-linear seasoning scaling.
- **Moderate / single-study:** the hospital plating→intake outcome (one strong single-center controlled
  study); "stew is better next day" (strongest at 1–2 days); spice shelf-life applied to in-sauce holds.
- **Directional only (vendor/trade estimates, not audited):** labor-savings (~35%), food-cost (~2–5%),
  efficiency (~25%) percentages from cook-chill / sauce vendors.
- **Method note:** research subagents' page-fetches were 403-blocked in this environment, so many claims
  rest on authoritative-publisher *search extracts*; the safety-critical numbers and the marquee hospital
  study were independently re-verified at the parent level via search.

---

## Sources (grouped)

**Cook-chill flavor science**
- Warmed-over flavor — Wikipedia: https://en.wikipedia.org/wiki/Warmed-over_flavor
- WOF mechanism in pork — ScienceDirect: https://www.sciencedirect.com/science/article/pii/S2590157525011058
- Aroma/taste loss on cooling — PBS NewsHour: https://www.pbs.org/newshour/science/the-food-science-behind-what-makes-leftovers-tasty-or-not
- Acid as finisher — America's Test Kitchen: https://www.americastestkitchen.com/articles/1212-all-about-acid-cooking-s-most-versatile-ingredient
- Acid/lemon (Kenji) — TODAY: https://www.today.com/food/why-you-should-be-putting-lemon-everything-today-t215228
- Fresh-herb timing — Food Republic: https://www.foodrepublic.com/1716861/cooking-rule-when-add-fresh-herbs/
- MSG umami & sodium — MSGdish (Ajinomoto): https://msgdish.com/umami-enhancer-msg-added-value/ ; Wikipedia: https://en.wikipedia.org/wiki/Monosodium_glutamate
- Tarka/tadka — PomPomCooks: https://pompomcooks.com/tarka-indian-tempered-spices/
- Niter kibbeh — The Daring Gourmet: https://www.daringgourmet.com/niter-kibbeh-ethiopian-spiced-clarified-butter/

**Texture, sauce stability, reheat**
- Waxy/modified starch — Natural Products Insider: https://www.naturalproductsinsider.com/ingredients/starch-stabilizer-solutions
- Thickening science — The Culinary Pro: https://www.theculinarypro.com/the-science-of-thickening-agents
- Dairy curdling prevention — Yogurt Nerd: https://yogurtnerd.com/how-do-i-stop-natural-yogurt-curdling-when-cooking-with-it/
- Coconut-milk splitting fix — Low Histamine Eats: https://lowhistamineeats.com/fix-coconut-milk-separated/
- Braising (moisture/texture) — RICARDO: https://www.ricardocuisine.com/en/articles/food-chemistry/643-how-to-perfect-the-art-of-braising
- Braising veg separately — For Love of the Table: https://www.forloveofthetable.com/2012/01/braising-and-stewing-basics.html
- Combi steam reheat — Steam & Bake: https://steamandbake.com/how-to-reheat-food-with-steam/
- Combi-oven batch reheat — US Army JCCOE: https://quartermaster.army.mil/jccoe/publications/recipes/section_a/a033.pdf

**Food safety (verified)**
- Ontario Food Premises Reg O.Reg 493/17: https://www.ontario.ca/laws/regulation/170493
- Canada food-safety temperatures — Safe Food Handler: https://safefoodhandler.ca/food-safety-temperatures/
- FDA Food Code reheating chart: https://llhd.org/wp-content/uploads/2023/03/Chart-4-B-Reheating-for-hot-holding-2022-FDA-Food-Code.pdf
- FSAI Guidance Note 15 (cook-chill): https://www.fsai.ie/publications/guidance-note-15-cook-chill-systems-in-the-food-se
- Vacuum-pack >10-day "10-day rule" — Chilled Food Association: https://www.chilledfood.org/the-10-day-rule-for-shelf-life/
- FSA vacuum-pack / non-proteolytic C. botulinum guide: https://www.food.gov.uk/sites/default/files/media/document/vacpacguide.pdf
- Cook-chill blast-chill spec — CESA/The Caterer: https://www.thecaterer.com/news/cesa-guide-cook-chill-systems

**Component / finishing strategy**
- Central production kitchens — CloudKitchens: https://cloudkitchens.com/blog/benefits-of-central-production-kitchens
- Cook-chill pipeline & labor — Chef Services Group: https://chefservicesgroup.com/services/cook-chill-production/
- Sous-vide regeneration (don't over-reheat) — Sammic: https://www.sammic.us/blog/2014/Jun/10/regeneration-of-food-by-sous-vide
- Gremolata — The Kitchn: https://www.thekitchn.com/how-to-make-gremolata-cooking-lessons-from-the-kitchn-193008
- Dukkah — The Mediterranean Dish: https://www.themediterraneandish.com/dukkah-recipe/
- Crispy shallots — Feasting at Home: https://www.feastingathome.com/crispy-fried-shallots/
- Textural contrast — Park City Culinary Institute: https://parkcityculinaryinstitute.com/blog/textural-contrast-in-plating-science-behind-it/
- Mother-sauce cross-utilization — Giraffe Foods: https://giraffefoods.com/how-custom-sauces-streamline-foodservice-operations/
- Assembly-line plating — Nimbus Kitchen: https://www.nimbuskitchen.com/blog/how-to-optimize-your-line-for-high-volume-service

**Plating & presentation**
- Plating techniques (clock method, spec) — Tableo: https://tableo.com/food-beverage-trends/food-plating-techniques-for-restaurants-2025/
- Disher/scoop sizing — WebstaurantStore: https://www.webstaurantstore.com/guide/717/kitchen-scoop-and-disher-guide.html ; USDA FBG Table 13: https://foodbuyingguide.fns.usda.gov/Content/TablesFBG/Table13_FBG_Sizes_and_Capacities_of_Scoop_s_(or_Dishers).pdf
- Plating principles (color/height/sauce) — EatingMeals: https://eatingmeals.com/what-are-the-plating-principles/
- Portion control & cost — BCcampus OpenEd: https://opentextbc.ca/basickitchenandfoodservicemanagement/chapter/controlling-food-costs/
- Hospital plating RCT — *Clinical Nutrition* (Navarro/Boaz et al., 2016): https://www.sciencedirect.com/science/article/abs/pii/S0261561415002460
- Long-term-care mealtime (M3) — BMC Geriatrics / PMC: https://pmc.ncbi.nlm.nih.gov/articles/PMC5234152/

**Small-team systems & QC**
- Standardized recipes — Performance Foodservice: https://www.performancefoodservice.com/get-inspired/benefits-of-the-standardized-recipe ; PSU Pressbooks: https://psu.pb.unizin.org/hmd329/chapter/chapter-6-standardized-recipes/
- Non-linear seasoning scaling — meez: https://www.getmeez.com/blog/recipe-scaling-conversions-101 ; Chemistry World: https://www.chemistryworld.com/opinion/how-chefs-scale-up-dishes-without-sacrificing-taste/2500015.article
- What reheats well — Maytag: https://www.maytag.com/blog/kitchen/reheating-leftovers.html
- Batch cooking / prep sheets — ChefStore: https://www.chefstore.com/about/blog/prep-sheets-batch-cooking-save-on-labor/
- Line check / QC — GoAudits: https://goaudits.com/blog/restaurant-quality-control/
- Temp + quality logging — SecurVO: https://securvo.com/resources/haccp-temperature-logging-guide
- Speed-scratch — FoodService Director: https://www.foodservicedirector.com/menu-trends/speed-scratch-ingredients-create-recipe-for-kitchen-efficiency

---

*CONC Catering Kitchen — Christie Ossington Neighbourhood Centre · HOUSE (Hospitality Operations Unified
System Engine). Research synthesis, 2026-06-06.*
