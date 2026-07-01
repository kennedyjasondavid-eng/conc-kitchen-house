# The One Kernel Across HOUSE — working draft

> **STATUS: DRAFT (2026-07-01) — a "note to do soon."** This captures, in one place,
> the cross-HOUSE articulation of the single kernel that every app instantiates.
> **To do:** formalize the strongest form of this into `INSIGHTS.md` (the cross-HOUSE
> KNOWLEDGE owner) as a first-class section, then reduce this file to a pointer, per
> the single-owner doc-governance model.
>
> **Where it came from:** the EXPO edit/pins-UX discussion (2026-07-01). The spark was
> noticing that in EXPO *"a pin is just a move at recipe breadth"* — the same
> `assert(item, day)` at a wider blast radius — and asking whether every HOUSE app is
> built that way. It is. HOUSE isn't six apps that share a style; it's **one primitive
> instantiated six times against six domains.**

---

## The kernel, in one line

**Assert a fact once at its source; derive everything that depends on it; let variation
be *blast radius*, not new machinery.**

Corollaries that fall out of it (all already load-bearing across HOUSE):
- **Read-before-build, never patch-after.** The consumer reads the assertions *before*
  it produces output, so nothing races or has to be reconciled back. (EXPO's generator
  reads Decisions before it builds; it never splices generated output.)
- **Derive what's declared; store only the irreducible** (EXPO INSIGHT #41 — "the germ
  recurs"). A stored copy of a derivable fact is a second truth that can drift.
- **Single owner per fact; everyone else points.** Coherence *is* the product — and
  therefore the load: an error in the one source propagates everywhere, so verification
  moves **upstream to the source** (this is why gates + adversarial review aren't optional).

---

## Each system is that kernel, pointed at a different domain

### MISE / CODEX — assert the *recipe*
- **Asserted once:** a recipe — its ingredients plus a cuisine `profileId`.
- **Derived:** the method is *generated*, not hand-stored — `buildInstructionSuggestions`
  is a pure function of the structured data + `profileId` (same data ⇒ same method; the
  quality gate holds it at 0 flags across all templates). Allergens, cost, and sodium are
  derived **read-only estimates**.
- **Variation = blast radius:** fix an allergen at CODEX and it propagates to DOOR **and**
  EXPO — "fix it there, never fork it into a consumer." One canonical entity per dish
  (`recipeId`, exact lookup; fuzzy demoted to a flag).
- **The tell:** the salt-injection bugfix *removed* the four sites that wrote a derived
  "Salt 1.6 lb" row back into the stored recipe. A derived fact must not be re-stored as
  data — that's #41 violated, caught in the wild.

### DOOR — assert the *resident* (and the menu)
- **Asserted once:** a resident's facts (intake / discharge / restriction update) and the
  active menu. Staff "enter resident changes once → DOOR generates all plating sheets,
  dietary labels, and support files in one run."
- **Derived:** plating sheets, labels, allergen routing, compliance checks; `routing_by_meal`
  portion counts and `_components` are computed by the *one* plating engine ("never
  reconcile the two — the plating engine is the authority").
- **Variation = blast radius:** one restriction (the exclude-array) blasts to every meal
  route, label, and sheet that resident touches; a `custom_tag_rule` is the same kind of
  assertion at a *broader* breadth (many residents at once).
- **The tell:** the anaphylactic flag is the one assertion you may **never** silently
  derive away — sacred, always surfaced in red. Compliance is *derived* from restriction
  assertions and checked **before** service (verification upstream).

### EXPO — assert the *jobs and the edits* (the exemplar)
- **Asserted once:** the menu, the recipes, the site profile, and the human's edits —
  *all the same kind of utterance.* The schedule is **not something the program builds; it
  is the fixpoint of those assertions reconciled against what the kitchen can physically do.**
- **Derived:** the whole board. `resolveItem`/`routeItem` resolve each item; the backward
  scheduler places it; the generator reads Decisions **before** it builds (four build-tail
  passes, inert on an empty ledger).
- **Variation = blast radius:** every supervisor edit is `assert(item, property, value, reason)`;
  the verbs (suppress / add / move / set / pin) dissolve into one operation over the item's
  property space, differing only in **breadth** — *a pin is just a move at recipe breadth*
  (one-occurrence relocate ⟶ recipe-wide pin ⟶ deployment ⟶ global). Routing is a
  **capability the profile declares**, not code a generator hard-codes (#54, the S5 arc).
- **The tell:** the whole reno teardown *was* this principle enforced — deleting the
  override tables that stored a second copy of what the recipe/profile already declares.

### HUB — assert *nothing*; derive the *view*
- **Asserted once:** nothing of its own. HUB renders the schedule EXPO publishes — it
  **computes nothing.**
- **Derived:** the entire board, every load. Most sharply, **dates are derived at
  view-time** — `projectDates()` re-projects the baked snapshot onto today's calendar from
  the anchor `_cycleStart` on every load. The baked absolute dates are a *derived artifact*
  that goes stale; the irreducible truth is `(anchor + 28-day rotation)`, and HUB
  re-derives from it. Portion links derive from DOOR's `routing_by_meal`.
- **The tell:** this is #41 at its purest — *don't trust the derivable (baked dates),
  derive it from the irreducible (the anchor).* The cache `version` is an **opaque equality
  token**, compared with `===` and never ordered — an assertion of identity, not a value.

### PROOF — assert *nothing*; derive the *report* (a read-only lens)
- **Asserted once:** nothing. PROOF "re-slices the record but never owns it."
- **Derived:** each report is a *projection* over the same underlying record, driven by
  **declarative `framework_map` predicates — zero code per framework.** Audience-aware
  disclosure is the same record shown at a different lens/breadth.
- **The tell:** a reporting framework is a *declarative assertion*; the report derives from
  it. PROOF is a lens, never a second vault — so the funder view can never disagree with
  the ground truth it re-slices.

### HOUSE — the kernel applied to *knowledge itself*
- **Asserted once:** every cross-app fact has a single owner — status/versions/phases live
  in the `~/.claude/CLAUDE.md` ledger; a schema lives with its producing app; a lesson
  lives in `INSIGHTS.md`.
- **Derived / pointed:** everyone else **points, never restates** (the `LEDGER:` / `WRAP:`
  governance convention).
- **Variation = blast radius:** change the fact at its owner and every pointer reflects it;
  a restatement is a second truth that drifts — which is exactly the staleness this
  session's doc sweep had to chase down after the teardown merged.

---

## The pipeline *is* the kernel at system scale

**MISE/CODEX → DOOR/EXPO → HUB** is a one-way cascade: each stage **asserts**, the next
**derives**, and no stage copies-and-mutates upstream truth. CODEX stays stream-blind and
never fetches DOOR; HUB never computes the schedule; PROOF never owns the record. The whole
system is one big read-before-build — the same shape as a single EXPO generate, scaled up.

---

## Why this matters (and why it's worth formalizing)

1. **It explains why HOUSE coheres.** It isn't discipline holding six different designs in
   line; it's literally the same idea all the way down. New work "fits" when it's another
   instance of assert-once/derive/blast-radius, and *feels* wrong when it isn't (a stored
   copy, a hard-coded route, a patch-after-build, a restated fact).
2. **It's a design test, not just a description.** Facing any new feature — in any app —
   ask: *what is asserted once here, what should derive from it, and is the variation just
   blast radius?* If a design stores a derivable fact, hard-codes what an entity should
   declare, or reconciles output after the fact, it's fighting the kernel and will grow a
   footgun.
3. **It's the same reason the work is demanding.** One source of truth means one place an
   error propagates from — so coherence is the load, and verification belongs upstream.

**Next:** fold the strongest form into `INSIGHTS.md` as a first-class section
("The one kernel across HOUSE"), have the app-specific grammars (EXPO's
`EXPO_KERNEL_VISION.md` / `EXPO_DESIGN_PRINCIPLES.md`, PROOF's `INSIGHTS.md`) point at it,
and reduce this draft to a pointer.
