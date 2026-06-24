# HACCP Regulatory Research — run this from a local (unrestricted-internet) session

**Why this exists:** the remote Claude Code environment's egress policy blocks the government/standards domains (`canada.ca`, `toronto.ca`, `food.gov.uk`, CanLII…) with 403 CONNECT denials, so the HACCP plan's critical limits are currently *validated against established standards but not live-fetched/cited*. Run the prompt below from a **local Claude Code session on your own machine** (normal internet) and it will produce a **cited findings report** that folds straight into the plan.

**How to run:** open a local session in the `conc-kitchen-house` repo and either paste everything under **THE PROMPT**, or just say *"Read HACCP_RESEARCH_PROMPT.md and do it."* If a `deep-research` skill/command is available, point it at §3; otherwise plain WebSearch + WebFetch is fine.

---

## THE PROMPT

You are validating the food-safety **critical limits** of a preliminary HACCP plan against authoritative, citable regulatory sources, and producing a report that folds into the plan. Be rigorous: quote and cite every value; do not rely on memory.

### 1. Operation context
**CONC** (Christie Ossington Neighbourhood Centre), Toronto, Ontario — shelter catering. Multi-site **cook-chill**: cook at two kitchens (Bloor, Rexdale) → **blast-chill** → **vacuum-pack (Reduced Oxygen Packaging / ROP)** → refrigerate → **van transport** between sites → **reheat** → serve **~300 shelter residents — a highly susceptible / vulnerable population.** 224 recipes. Almost certainly regulated **provincially** — **Ontario Regulation 493/17 (Food Premises)** under the Health Protection and Promotion Act, enforced by **Toronto Public Health / DineSafe**. **CFIA is the federal body** (Safe Food for Canadians Regulations / Preventive Control Plan) and is likely **best-practice guidance here, not the binding regulator** — confirm that boundary.

### 2. The plan and the limits to validate
A preliminary HACCP plan already exists in this repo (`conc-kitchen-house`) — **read these first**: `HACCP_PLAN_DRAFT.md`, **`HACCP_HAZARD_ANALYSIS.md` (its §4 is the critical-limit table — the single source of truth)**, `HACCP_MONITORING_RECORDS.md`, `HACCP_CCP_DECISION_TREE.md`, `HACCP_RECORDKEEPING_GUIDE.md`, `HACCP_PRELIMINARY_HAZARD_ANALYSIS.md`. Six CCPs: **CCP-1 Cooking · CCP-2 Cooling · CCP-3 Chilled/ROP hold + transport · CCP-4 Reheating · CCP-5 Hot-hold & service · CCP-6 Allergen/anaphylactic.**

Confirm, correct, or flag ("Ontario silent → which standard governs") these **draft limits**:
- **Cooking (internal core):** poultry pieces/mixed/egg **≥74 °C** (whole birds **82 °C**); ground meat **≥71 °C**; whole-muscle beef/pork **≥71 °C** (note FDA permits beef 63 °C); **fish ≥70 °C (158 °F)**.
- **Cooling:** **60→20 °C within 2 h, then 20→4 °C within 4 h (≤6 h total).**
- **Cold-hold ≤4 °C; hot-hold ≥60 °C; danger zone 4–60 °C.**
- **Reheat ≥74 °C within 2 h, once.**
- **RTE refrigerated shelf-life / date-marking:** working assumption **≤7 days** (Ontario may be silent; FDA Food Code = 7 d @ ≤5 °C, prep day = day 1).
- **ROP / vacuum cook-chill: use-by ≤7 days from the cook day WITHOUT a validated botulinum barrier** — the highest-priority item.

### 3. Research questions (cite every answer)
1. **Cooking temperatures** by food type — the Health Canada Safe Internal Cooking Temperatures table (poultry whole vs pieces/ground, ground meat, beef/pork whole cuts, fish, eggs, mixed dishes), in °C. Does O. Reg. 493/17 specify any?
2. **Two-stage cooling** — the exact temperature thresholds and time windows in O. Reg. 493/17 (and what TPH enforces).
3. **Hot-holding / cold-holding** temperatures and the danger-zone bounds in O. Reg. 493/17.
4. **Reheating** temperature and time requirement.
5. **RTE refrigerated shelf-life / date-marking** for in-house-prepared potentially-hazardous foods — is there a hard maximum number of days in Ontario, and at what temperature? If silent, the FDA/best-practice number.
6. **ROP / vacuum / cook-chill / sous-vide in a food-service premises (KEY):** does Ontario or Toronto Public Health require a **special-process approval, variance, or documented HACCP/food-safety plan** before operating? What **shelf-life limits** and ***Clostridium botulinum* control barriers** apply (temperature, pH, water activity, validated heat treatment)? What is the **maximum refrigerated shelf life WITHOUT additional barriers** (e.g. the UK FSA/ACMSF ≤10-day-at-≤8 °C rule; the FDA Food Code §3-502.12 ROP cook-chill provisions)?
7. **Certified food handler** requirement in Ontario/Toronto — how many, and when they must be present.
8. **Written food-safety plan / HACCP and record-keeping** expectations for higher-risk operations and those serving vulnerable populations — including the **record retention period** TPH expects.
9. **Highly susceptible populations** (shelters/institutions) — Health Canada "food safety for vulnerable populations" + FDA HSP provisions: stricter controls or prohibited foods.
10. **Engaging Toronto Public Health** to review/approve a special process (ROP) — the process and required documentation.
11. **CFIA jurisdiction:** does the SFCR / CFIA actually regulate a provincial, on-site shelter/institutional caterer that doesn't sell across borders, or is it provincial only? Is an SFCR licence required? Where does CFIA authority begin/end?
12. **CFIA Preventive Control Plan (PCP)** — its structure, what it must document, how it maps to/extends the 7 HACCP principles, and any reusable generic models/templates for prepared meals / food service.
13. **Health Canada / CFIA *Listeria monocytogenes* policy** for ready-to-eat foods — the food categories, the **shelf-life threshold** (e.g. the >5-day distinction) and environmental-monitoring expectations — and **whether it changes the ≤7-day ROP assumption.**

### 4. Method
- Prefer **primary sources**: the regulation text (O. Reg. 493/17 on ontario.ca and CanLII), Health Canada, CFIA, the FDA Food Code, UK FSA/ACMSF. Treat blogs and training-company sites as secondary corroboration only.
- **Cross-check at least 2 authoritative sources per claim.** Quote the exact wording, give the URL, and note the access date.
- Explicitly flag where **Ontario regulation is silent** and name the standard that fills the gap. Mark each finding **binding (Ontario/TPH)** vs **best-practice (CFIA/FDA/FSA)**.
- Resolve the **two priority unknowns**: (a) whether O. Reg. 493/17 / Toronto Public Health require a **special-process approval/variance** for ROP/cook-chill in food service, plus the **max refrigerated shelf life** allowed (with and without barriers); (b) the **record retention period**.

### 5. Deliverable — save as `HACCP_REGULATORY_FINDINGS.md`
A cited report containing:
- **Per-item table:** Item · Our draft · Authoritative value · Source (URL + quoted text) · Verdict (✓ confirms / ✗ corrects / ⚠ Ontario-silent) · Action.
- **Corrections to apply** — the exact doc + row to change (especially `HACCP_HAZARD_ANALYSIS.md` §4), with the corrected value.
- **Questions for Toronto Public Health directly** — a ready-to-send list of what web research can't settle (ROP special-process/variance, retention period, any ambiguity).
- **Jurisdiction note** — whether CFIA/SFCR applies or is best-practice, and what the PCP model adds.
- **CFIA / Health Canada items worth folding in** — PCP structure, the *Listeria* RTE shelf-life thresholds (and whether they change the ≤7-day ROP), generic models/templates.

Then **offer to apply the confirmed corrections to the HACCP docs** — update `HACCP_HAZARD_ANALYSIS.md` §4 and the dependent caveats, and (if the fish/temperature values change) the `COOK_FISH`/cook-temp text in the `conc-recipe-hub` repo with a `tests/method_snapshot.mjs --update` re-baseline — keeping `recipe_production.json` and all test baselines green.

### 6. Known starting points (verify, don't trust)
O. Reg. 493/17: `https://www.ontario.ca/laws/regulation/170493` and CanLII `https://www.canlii.org/en/on/laws/regu/o-reg-493-17/latest/o-reg-493-17.html` · Health Canada safe cooking temps: `https://www.canada.ca/en/health-canada/services/general-food-safety-tips/safe-internal-cooking-temperatures.html` · Toronto Public Health food safety + specialty/special-process foods (search toronto.ca) · FDA Food Code ROP §3-502.12 · UK FSA/ACMSF vacuum/MAP & the "10-day rule" · CFIA SFCR + PCP guidance + the Health Canada *Listeria* policy + Health Canada food safety for vulnerable populations.

---

*Context current as of 2026-06-24. Bring `HACCP_REGULATORY_FINDINGS.md` back to fold the cited values into the plan (or let the local session apply the corrections directly).*
