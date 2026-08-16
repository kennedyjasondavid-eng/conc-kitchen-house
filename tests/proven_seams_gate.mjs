#!/usr/bin/env node
// tests/proven_seams_gate.mjs — the HOUSE_PROVEN_SEAMS.md registry verifier.
//
// Parses the machine-anchors block inside HOUSE_PROVEN_SEAMS.md and checks it
// against the sibling repo checkouts, in BOTH directions:
//
//   ANCHOR ROT  — a `seam` check fails: the hardened implementation moved or
//                 was renamed at its origin. Re-anchor the registry row (and
//                 look at what the rename did to ports).
//   STALE CELL  — a `gap` check fails: a "who still lacks it" claim is no
//                 longer true (usually because a port LANDED — good news).
//                 Update the row's cell. This is registry maintenance, never
//                 an app regression; nothing in the apps is wrong.
//
// Sibling resolution, in order: $SEAMS_SIBLINGS_ROOT/<repo> → <houseRoot>/_siblings/<repo>
// (the CI checkout layout) → <houseRoot>/../<repo> (the local multi-repo session
// layout). A missing sibling is a loud SKIP locally, but a HARD FAIL when
// SEAMS_REQUIRE_ALL=1 (set by CI) — a misconfigured workflow must never pass
// vacuously (the registry's own row-9 principle: empty must not validate clean).
// Zero parsed rows or zero executed checks also fail for the same reason.
//
// SEAMS_DOC=<path> overrides the doc location (used by the authored-to-fail
// receipt: run against a doctored copy to prove both failure classes go red).
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '..');
const DOC = process.env.SEAMS_DOC || join(ROOT, 'HOUSE_PROVEN_SEAMS.md');
const REQUIRE_ALL = process.env.SEAMS_REQUIRE_ALL === '1';

const fails = [];
const skips = [];
let checksRun = 0;

// ---- parse the anchors block out of the doc
const md = readFileSync(DOC, 'utf8');
const block = md.match(/<!-- SEAMS-ANCHORS-START -->([\s\S]*?)<!-- SEAMS-ANCHORS-END -->/);
if (!block) { console.error('GATE: FAIL — no SEAMS-ANCHORS block in ' + DOC); process.exit(1); }
const fence = block[1].match(/```json\s*([\s\S]*?)```/);
if (!fence) { console.error('GATE: FAIL — anchors block has no ```json fence'); process.exit(1); }
let anchors;
try { anchors = JSON.parse(fence[1]); }
catch (e) { console.error('GATE: FAIL — anchors JSON does not parse: ' + e.message); process.exit(1); }
if (!Array.isArray(anchors.rows) || anchors.rows.length === 0) {
  console.error('GATE: FAIL — zero anchor rows parsed (a vacuous run must not read as green)');
  process.exit(1);
}
for (const row of anchors.rows) {
  if (!Array.isArray(row.seam) || row.seam.length === 0) {
    fails.push(`row ${row.row} (${row.class}): no seam anchors — every row must pin its implementation`);
  }
}

// ---- sibling repo resolution
const repoRoots = {};
function resolveRepo(name) {
  if (name in repoRoots) return repoRoots[name];
  const candidates = [];
  if (process.env.SEAMS_SIBLINGS_ROOT) candidates.push(join(process.env.SEAMS_SIBLINGS_ROOT, name));
  candidates.push(join(ROOT, '_siblings', name), join(ROOT, '..', name));
  repoRoots[name] = candidates.find(p => existsSync(p)) || null;
  return repoRoots[name];
}

const fileCache = new Map();
function checkEntry(text, entry) {
  if (typeof entry === 'string') return text.includes(entry);
  if (entry && typeof entry.re === 'string') return new RegExp(entry.re).test(text);
  throw new Error('bad check entry: ' + JSON.stringify(entry));
}
const fmt = e => (typeof e === 'string' ? JSON.stringify(e) : '/' + e.re + '/');

function runTarget(row, t, kind) {
  const root = resolveRepo(t.repo);
  const where = `${t.repo}/${t.file}`;
  if (!root) {
    const msg = `row ${row.row} (${kind}): sibling checkout for ${t.repo} not found`;
    if (REQUIRE_ALL) fails.push('MISSING REPO — ' + msg + ' (CI checkout misconfigured?)');
    else skips.push('SKIP — ' + msg);
    return;
  }
  const path = join(root, t.file);
  const fileExists = existsSync(path);

  if ('exists' in t) {
    checksRun++;
    if (t.exists !== fileExists) {
      fails.push(t.exists
        ? `ANCHOR ROT — row ${row.row} (${row.class}): ${where} is MISSING — the anchored file moved; re-anchor the row.`
        : `STALE CELL — row ${row.row} (${row.class}): ${where} now EXISTS — the "who lacks it" claim looks closed. Update the cell (registry maintenance, not an app regression).`);
    }
    return; // an exists-target carries no content checks
  }

  if (!fileExists) {
    fails.push(`ANCHOR ROT — row ${row.row} (${row.class}): ${where} is MISSING — re-anchor the row.`);
    return;
  }
  if (!fileCache.has(path)) fileCache.set(path, readFileSync(path, 'utf8'));
  const text = fileCache.get(path);

  for (const c of t.has || []) {
    checksRun++;
    if (!checkEntry(text, c)) {
      fails.push(kind === 'seam'
        ? `ANCHOR ROT — row ${row.row} (${row.class}): ${where} no longer contains ${fmt(c)} — the seam moved or was renamed; re-anchor the row.`
        : `STALE CELL — row ${row.row} (${row.class}): the claimed gap form ${fmt(c)} is gone from ${where} — likely fixed. Update the "who lacks it" cell.`);
    }
  }
  for (const c of t.lacks || []) {
    checksRun++;
    if (checkEntry(text, c)) {
      fails.push(`STALE CELL — row ${row.row} (${row.class}): ${where} now contains ${fmt(c)} — the gap looks CLOSED. Update the "who lacks it" cell (registry maintenance, not an app regression).`);
    }
  }
}

for (const row of anchors.rows) {
  for (const t of row.seam || []) runTarget(row, t, 'seam');
  for (const t of row.gap || []) runTarget(row, t, 'gap');
}

if (checksRun === 0) fails.push('zero checks executed — a vacuous run must not read as green');

for (const s of skips) console.log(s);
console.log(`rows: ${anchors.rows.length} · checks run: ${checksRun} · skips: ${skips.length}`);
if (fails.length) {
  console.error('GATE: FAIL — proven-seams registry drift');
  for (const f of fails) console.error(' - ' + f);
  process.exit(1);
}
console.log('GATE: PASS — HOUSE_PROVEN_SEAMS.md agrees with the sibling checkouts (anchors intact, cells current)');
