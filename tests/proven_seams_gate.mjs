#!/usr/bin/env node
// tests/proven_seams_gate.mjs — the HOUSE_PROVEN_SEAMS.md registry verifier.
//
// Parses the machine-anchors block inside HOUSE_PROVEN_SEAMS.md and checks it
// against the sibling repos, in BOTH directions:
//
//   ANCHOR ROT  — a `seam` check fails: the hardened implementation moved or
//                 was renamed at its origin. Re-anchor the registry row (and
//                 look at what the rename did to ports).
//   STALE CELL  — a `gap` check fails: a "who still lacks it" claim is no
//                 longer true (usually because a port LANDED — good news).
//                 Update the row's cell. This is registry maintenance, never
//                 an app regression; nothing in the apps is wrong.
//
// TWO ACQUISITION MODES for the sibling files:
//
//   git   (default) — read from sibling checkouts on disk. Resolution order:
//         $SEAMS_SIBLINGS_ROOT/<repo> → <houseRoot>/_siblings/<repo> →
//         <houseRoot>/../<repo> (the local multi-repo session layout).
//         Byte-true against HEAD; the strong mode.
//   pages (SEAMS_FETCH=pages) — fetch each anchored file from the repos'
//         public GitHub Pages sites. This exists because four of the five
//         siblings are PRIVATE repos with public Pages — the same public data
//         plane the HOUSE apps already use to read each other — and the CI
//         workflow's default token cannot check private siblings out. No
//         stored credential means nothing to expire: the anti-decay gate must
//         not itself carry a decaying credential (registry row 4's lesson).
//         Fetches carry a ?t=Date.now() bust (row 2's own seam, ported).
//         Trade-offs, accepted + documented: Pages lags a push by a deploy
//         (~1 min — irrelevant at the weekly cadence), Jekyll never serves
//         dot-dirs (targets marked "gitOnly": true are SKIPPED here, loudly,
//         and only enforced in git mode), and a 404 is read as file-absent.
//
// SEAMS_REQUIRE_ALL=1 (set by CI) hard-fails on a missing sibling checkout /
// unreachable Pages site — a misconfigured run must never pass vacuously (the
// registry's own row-9 principle: empty must not validate clean). Zero parsed
// rows or zero executed checks fail for the same reason in every mode.
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
const MODE = process.env.SEAMS_FETCH === 'pages' ? 'pages' : 'git';
const PAGES_BASE = process.env.SEAMS_PAGES_BASE || 'https://kennedyjasondavid-eng.github.io';

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

// ---- acquisition: one file read per (repo, file), mode-dependent
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
// → { status: 'ok', text } | { status: 'absent' } | { status: 'norepo' } | { status: 'error', detail }
async function getFile(repo, file) {
  const key = repo + '::' + file;
  if (fileCache.has(key)) return fileCache.get(key);
  let out;
  if (MODE === 'git') {
    const root = resolveRepo(repo);
    if (!root) out = { status: 'norepo' };
    else {
      const path = join(root, file);
      out = existsSync(path) ? { status: 'ok', text: readFileSync(path, 'utf8') } : { status: 'absent' };
    }
  } else {
    const url = `${PAGES_BASE}/${repo}/${file}?t=${Date.now()}`;
    try {
      const r = await fetch(url, { cache: 'no-store' });
      if (r.ok) out = { status: 'ok', text: await r.text() };
      else if (r.status === 404) out = { status: 'absent' };
      else out = { status: 'error', detail: `HTTP ${r.status}` };
    } catch (e) {
      out = { status: 'error', detail: String(e && e.message || e) };
    }
  }
  fileCache.set(key, out);
  return out;
}

function checkEntry(text, entry) {
  if (typeof entry === 'string') return text.includes(entry);
  if (entry && typeof entry.re === 'string') return new RegExp(entry.re).test(text);
  throw new Error('bad check entry: ' + JSON.stringify(entry));
}
const fmt = e => (typeof e === 'string' ? JSON.stringify(e) : '/' + e.re + '/');

async function runTarget(row, t, kind) {
  const where = `${t.repo}/${t.file}`;
  if (t.gitOnly && MODE === 'pages') {
    skips.push(`SKIP — row ${row.row} (${kind}): ${where} is gitOnly (Jekyll never serves this path; enforced in git-mode runs)`);
    return;
  }
  const got = await getFile(t.repo, t.file);

  if (got.status === 'norepo') {
    const msg = `row ${row.row} (${kind}): sibling checkout for ${t.repo} not found`;
    if (REQUIRE_ALL) fails.push('MISSING REPO — ' + msg + ' (run misconfigured?)');
    else skips.push('SKIP — ' + msg);
    return;
  }
  if (got.status === 'error') {
    const msg = `row ${row.row} (${kind}): could not fetch ${where} (${got.detail})`;
    if (REQUIRE_ALL) fails.push('FETCH ERROR — ' + msg);
    else skips.push('SKIP — ' + msg);
    return;
  }

  if ('exists' in t) {
    checksRun++;
    const fileExists = got.status === 'ok';
    if (t.exists !== fileExists) {
      fails.push(t.exists
        ? `ANCHOR ROT — row ${row.row} (${row.class}): ${where} is MISSING — the anchored file moved; re-anchor the row.`
        : `STALE CELL — row ${row.row} (${row.class}): ${where} now EXISTS — the "who lacks it" claim looks closed. Update the cell (registry maintenance, not an app regression).`);
    }
    return; // an exists-target carries no content checks
  }

  if (got.status === 'absent') {
    fails.push(`ANCHOR ROT — row ${row.row} (${row.class}): ${where} is MISSING — re-anchor the row.`);
    return;
  }
  const text = got.text;

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
  for (const t of row.seam || []) await runTarget(row, t, 'seam');
  for (const t of row.gap || []) await runTarget(row, t, 'gap');
}

if (checksRun === 0) fails.push('zero checks executed — a vacuous run must not read as green');

for (const s of skips) console.log(s);
console.log(`mode: ${MODE} · rows: ${anchors.rows.length} · checks run: ${checksRun} · skips: ${skips.length}`);
if (fails.length) {
  console.error('GATE: FAIL — proven-seams registry drift');
  for (const f of fails) console.error(' - ' + f);
  process.exit(1);
}
console.log('GATE: PASS — HOUSE_PROVEN_SEAMS.md agrees with the sibling repos (anchors intact, cells current)');
