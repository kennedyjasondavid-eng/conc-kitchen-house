#!/usr/bin/env node
// tests/sites_registry_gate.mjs — keeps sites.json (the HOUSE site registry, SITES.md) honest.
// Ruled 2026-10-31 (CODEX refinement plan §4, calls S1–S4). Plain Node, no dependencies.
// It validates the real file, then proves each rule bites by breaking a copy in memory.
import fs from 'node:fs';

let pass = 0; const fails = [];
const ok = (label, cond, detail) => { if (cond) pass++; else fails.push(label + (detail === undefined ? '' : '  → ' + JSON.stringify(detail).slice(0, 400))); };

const STATUS = new Set(['planned', 'active', 'paused', 'retired']);
const MEALS = new Set(['breakfast', 'lunch', 'dinner', 'snack']);
const FORBIDDEN = ['residentCount', 'residents', 'count', 'counts', 'headcount', 'staff', 'equipment', 'labour', 'labor', 'portions', 'batch'];
const KEY = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;

// Returns a list of problems; [] means valid.
function validate(doc, everKeys) {
  const problems = [];
  if (!doc || typeof doc !== 'object') return ['not an object'];
  if (!doc._meta || !Number.isInteger(doc._meta.schemaVersion)) problems.push('_meta.schemaVersion must be an integer');
  if (!Array.isArray(doc.sites) || !doc.sites.length) return problems.concat('sites must be a non-empty list');
  const keys = new Set(); const names = new Map();
  for (const s of doc.sites) {
    const k = s && s.key;
    if (typeof k !== 'string' || !KEY.test(k)) { problems.push('bad key ' + JSON.stringify(k)); continue; }
    if (keys.has(k)) problems.push('duplicate key ' + k);
    keys.add(k);
    if (typeof s.name !== 'string' || !s.name.trim()) problems.push(k + ': name required');
    if (!(s.address === null || typeof s.address === 'string')) problems.push(k + ': address must be text or null');
    if (typeof s.kitchen !== 'boolean' || typeof s.served !== 'boolean') problems.push(k + ': kitchen and served must be true/false');
    if (!STATUS.has(s.status)) problems.push(k + ': status must be one of ' + [...STATUS].join('/'));
    if (!Array.isArray(s.aliases) || s.aliases.some((a) => typeof a !== 'string' || a !== a.toLowerCase() || !a.trim())) problems.push(k + ': aliases must be lowercase text');
    if (!Array.isArray(s.cookedBy)) problems.push(k + ': cookedBy must be a list');
    const mealLists = Array.isArray(s.meals) ? [s.meals] : (s.meals && typeof s.meals === 'object' ? Object.entries(s.meals).map(([dt, list]) => (/^(weekday|weekend)$/.test(dt) ? list : null)) : [null]);
    if (mealLists.some((list) => !Array.isArray(list) || list.some((m) => !MEALS.has(m)))) problems.push(k + ': meals must use breakfast/lunch/dinner/snack (a list, or {weekday, weekend})');
    if (!(s.numbersFrom === null || (typeof s.numbersFrom === 'string' && /\.json$/.test(s.numbersFrom)))) problems.push(k + ': numbersFrom must be a .json path or null');
    if (s.open !== undefined) {
      if (!Array.isArray(s.open)) problems.push(k + ': open must be a list of windows');
      else for (const w of s.open) {
        const fromOk = w && (w.from === null || DATE.test(w.from)); const toOk = w && (w.to === null || DATE.test(w.to));
        if (!fromOk || !toOk) problems.push(k + ': open window dates must be YYYY-MM-DD or null');
        else if (w.from && w.to && w.from > w.to) problems.push(k + ': open window ends before it starts');
      }
    }
    for (const f of FORBIDDEN) if (Object.prototype.hasOwnProperty.call(s, f)) problems.push(k + ': "' + f + '" is not stored here (SITES.md: counts, staff and equipment live in their apps)');
    for (const n of [k, ...(Array.isArray(s.aliases) ? s.aliases : [])]) {
      if (names.has(n) && names.get(n) !== k) problems.push('name "' + n + '" belongs to both ' + names.get(n) + ' and ' + k);
      names.set(n, k);
    }
  }
  const byKey = new Map(doc.sites.filter((s) => s && typeof s.key === 'string').map((s) => [s.key, s]));
  for (const s of byKey.values()) {
    for (const c of (Array.isArray(s.cookedBy) ? s.cookedBy : [])) {
      const kitchen = byKey.get(c);
      if (!kitchen) problems.push(s.key + ': cookedBy names an unknown site ' + c);
      else if (!kitchen.kitchen) problems.push(s.key + ': cookedBy ' + c + ' is not a kitchen');
    }
    if (s.served && s.status === 'active' && !(s.cookedBy || []).length) problems.push(s.key + ': an active served site needs a kitchen in cookedBy');
  }
  for (const k of everKeys || []) if (!byKey.has(k)) problems.push('key "' + k + '" was published before and has disappeared (retire it with status, never delete it)');
  return problems;
}

const doc = JSON.parse(fs.readFileSync('sites.json', 'utf8'));
const ever = JSON.parse(fs.readFileSync('tests/fixtures/site_keys_ever.json', 'utf8')).keys;
const real = validate(doc, ever);
ok('S0 sites.json is valid against SITES.md', real.length === 0, real);
ok('S1 every key in sites.json is listed in tests/fixtures/site_keys_ever.json', doc.sites.every((s) => ever.includes(s.key)), doc.sites.map((s) => s.key).filter((k) => !ever.includes(k)));
ok('S2 the ruled sites are present', ['bloor', 'rexdale', 'lansdowne', '1011-lansdowne', 'roncy', 'gcnc', 'warming-centre'].every((k) => doc.sites.some((s) => s.key === k)));
ok('S3 kitchens are derived from the flag (Bloor, Rexdale, Lansdowne, GCNC)', JSON.stringify(doc.sites.filter((s) => s.kitchen).map((s) => s.key).sort()) === JSON.stringify(['bloor', 'gcnc', 'lansdowne', 'rexdale']));
ok('S4 only Rexdale has live numbers today', JSON.stringify(doc.sites.filter((s) => s.numbersFrom).map((s) => s.key)) === JSON.stringify(['rexdale']));

// Each rule bites: break a copy and expect a problem.
const clone = () => JSON.parse(JSON.stringify(doc));
const bites = (label, mutate, pattern) => { const c = clone(); mutate(c); const p = validate(c, ever); ok('B ' + label, p.some((x) => pattern.test(x)), p); };
bites('a deleted key is caught', (c) => { c.sites = c.sites.filter((s) => s.key !== 'gcnc'); }, /disappeared/);
bites('an uppercase key is caught', (c) => { c.sites[0].key = 'Bloor'; }, /bad key/);
bites('a duplicate alias is caught', (c) => { c.sites[1].aliases.push('lan'); }, /belongs to both/);
bites('a stored count is caught', (c) => { c.sites[1].residentCount = 181; }, /not stored here/);
bites('cookedBy a non-kitchen is caught', (c) => { c.sites.find((s) => s.key === 'roncy').cookedBy = ['1011-lansdowne']; }, /is not a kitchen/);
bites('an unknown meal is caught', (c) => { c.sites[1].meals = ['brunch']; }, /meals must use/);
bites('a backwards window is caught', (c) => { c.sites.find((s) => s.key === 'warming-centre').open = [{ from: '2027-04-15', to: '2026-11-15' }]; }, /ends before/);
bites('a bad status is caught', (c) => { c.sites[0].status = 'closed'; }, /status must be/);
bites('a served site with no kitchen is caught', (c) => { c.sites.find((s) => s.key === 'roncy').cookedBy = []; }, /needs a kitchen/);

console.log('sites_registry_gate: ' + pass + '/' + (pass + fails.length) + ' passed' + (fails.length ? ' — ' + fails.length + ' FAILED' : ''));
fails.forEach((f) => console.log('  ✗ ' + f));
process.exit(fails.length ? 1 : 0);
