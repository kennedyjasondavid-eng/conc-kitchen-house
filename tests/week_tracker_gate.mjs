#!/usr/bin/env node
// tests/week_tracker_gate.mjs: the Week tracker's rules (week.html, "week-core"), on FIXED copies of the four
// public files from 2026-11-12, the day Week 4 closed (tests/fixtures/week_tracker_2026-11-12/). Never live data.
// Kitchen failure it prevents: a week that looks finished but isn't, or a finished week that cries wolf.
// Plan: docs/HOUSE_NEW_WEEK_PATH_PLAN_2026-11-13.md §5 and §7 (ruled by Jason 2026-11-13). Plain Node, no dependencies.
import fs from 'node:fs';
import vm from 'node:vm';

let pass = 0; const fails = [];
const ok = (label, cond, detail) => { if (cond) pass++; else fails.push(label + (detail === undefined ? '' : '  → ' + JSON.stringify(detail).slice(0, 500))); };

const html = fs.readFileSync(new URL('../week.html', import.meta.url), 'utf8');
const core = (html.match(/<script id="week-core">([\s\S]*?)<\/script>/) || [])[1];
ok('S1 week.html carries a week-core block', !!core);
const ctx = {}; vm.createContext(ctx); vm.runInContext(core + '\nthis.WeekCore = WeekCore;', ctx);
const W = ctx.WeekCore;

const dir = new URL('./fixtures/week_tracker_2026-11-12/', import.meta.url);
const read = (f) => JSON.parse(fs.readFileSync(new URL(f, dir), 'utf8'));
const base = { menu: read('menu_current.json'), hub: read('hub_schedule.json'), library: read('library_public.json'), feed: read('recipe_production.json') };
const copy = () => JSON.parse(JSON.stringify(base));
const refsOf = (hub, pred) => { const out = []; for (const w of Object.values(hub.WEEKS)) for (const d of w.days) for (const s of d.sections) for (const it of s.items) for (const r of (it.serviceRefs || [])) if (pred(r, it)) out.push([it, r]); return out; };

// ── A. The real Week 4, closed on 2026-11-12, reads "on the board" with nothing left. ──────────────────
const r4 = W.assess(base, '4');
ok('A1 Week 4 reads done', r4.done === true, { left: r4.left, menuMatch: r4.menuMatch, unreadable: r4.unreadable });
ok('A2 Week 4 has nothing left', r4.left.length === 0, r4.left);
ok('A3 the board was built from DOOR’s current menu (same hash)', r4.menuMatch === true);
ok('A4 unlinked dishes are a quiet note, never work left', r4.notes.some((n) => /aren’t linked to a CODEX recipe/.test(n)), r4.notes);
ok('A5 breakfast (no cards on the board) is a note, not work left', r4.notes.some((n) => /no breakfast cards/.test(n)), r4.notes);
const slot = (r, day, meal, key) => (r.meals.find((m) => m.day === day && m.meal === meal) || { slots: [] }).slots.find((s) => s.key === key);
const vwc = slot(r4, 'SUNDAY', 'dinner', 'veganalt');
ok('A6 Vegan White Chili (no cook time in CODEX, pulled from the chicken pot) is a note because EXPO plans it', vwc && vwc.facts === 'none' && vwc.card === true && /EXPO plans it anyway/.test(vwc.note), vwc);
const biryani = slot(r4, 'TUESDAY', 'dinner', 'starch');
ok('A7 a linked side with no card (Biryani Rice) is a note, not work left (ruling 7)', biryani && biryani.card === false && /a note, not work left/.test(biryani.note), biryani);
const donburi = slot(r4, 'TUESDAY', 'lunch', 'main');
ok('A8 Beef Donburi reads its cook time from the Library and its card by recipe ID', donburi && donburi.facts === 'library' && donburi.card === true, donburi);
const souv = slot(r4, 'SUNDAY', 'lunch', 'main');
ok('A9 Pork Souvlaki (unlinked, planned by name) needs nothing', souv && !souv.recipeId && r4.meals.find((m) => m.day === 'SUNDAY' && m.meal === 'lunch').onBoard === true);
for (const wk of ['1', '2', '3']) { const r = W.assess(base, wk); ok('A10 Week ' + wk + ' reads done on the same files', r.done === true, r.left); }

// ── B. Planted breaks: each must show, and say which app fixes it. ──────────────────────────────────────
{ const f = copy(); for (const [it] of refsOf(f.hub, (r) => r.week === '4' && r.day === 'TUESDAY' && r.meal === 'lunch')) it.serviceRefs = it.serviceRefs.filter((r) => !(r.week === '4' && r.day === 'TUESDAY' && r.meal === 'lunch'));
  const r = W.assess(f, '4');
  ok('B1 a meal no card serves reads "No card … Plan it in EXPO"', !r.done && r.left.some((x) => x.app === 'EXPO' && /No card on the board serves Tue lunch/.test(x.text)), r.left); }
{ const f = copy(); const day = f.hub.WEEKS['4'].days[0]; day.sections[0].items.push({ type: 'COOK', item: 'Mystery Stew', qty: '', site: 'Rex', time: '', needsPlan: true, serviceRefs: [{ week: '4', day: 'MONDAY', meal: 'dinner', component: 'Mystery Stew', recipeId: null }] });
  const r = W.assess(f, '4');
  ok('B2 a needsPlan card with service records reads "needs a plan" under its meal', !r.done && r.left.some((x) => x.app === 'EXPO' && x.where === 'Mon dinner' && /Mystery Stew needs a plan/.test(x.text)), r.left);
  ok('B2b … and only in its own week', W.assess(f, '1').left.every((x) => !/Mystery Stew/.test(x.text))); }
{ const f = copy(); f.hub.WEEKS['4'].days[2].sections[0].items.push({ type: 'COOK', item: 'Portobello Melt', qty: '', site: 'Rex', time: '', needsPlan: true });
  const r = W.assess(f, '4');
  ok('B3 a needsPlan card with no service records reads "needs a plan" in the week it sits in', !r.done && r.left.some((x) => /Portobello Melt needs a plan \(on the board in Week 4\)/.test(x.text)), r.left); }
{ const f = copy(); const rec = f.library.recipes.find((x) => x.recipeId === 'kimchi-fried-rice-vegan'); rec.production.sets = rec.production.sets.filter((k) => k !== 'cookMin');
  for (const [, ref] of refsOf(f.hub, (r) => r.recipeId === 'kimchi-fried-rice-vegan')) ref.recipeId = null;
  const r = W.assess(f, '4');
  const row = r.left.find((x) => x.app === 'CODEX');
  ok('B4 a linked recipe with no cook time that EXPO doesn’t plan reads "Add it in CODEX"', !r.done && row && row.where === 'Fri dinner' && row.recipe === 'Kimchi Fried Rice (Vegan)' && /no cook time/.test(row.text), r.left); }
{ const f = copy(); const rec = f.library.recipes.find((x) => x.recipeId === 'kimchi-fried-rice-vegan'); rec.production.sets = rec.production.sets.filter((k) => k !== 'cookMin');
  const r = W.assess(f, '4');
  ok('B5 … but when EXPO already plans it by that recipe, it stays a note', r.done === true && slot(r, 'FRIDAY', 'dinner', 'veganalt').note === 'CODEX has no cook time; EXPO plans it anyway', r.left); }
{ const f = copy(); const rec = f.library.recipes.find((x) => x.recipeId === 'kimchi-fried-rice-vegan'); rec.production.cookMin = 0;
  ok('B6 a listed cookMin of 0 is a value ("no cook"), not a gap', W.factsFor('kimchi-fried-rice-vegan', f.library, f.feed).from === 'library'); }
{ const f = copy(); f.hub._doorMenu.flow.components.menu = 'sha256:' + '0'.repeat(64);
  const r = W.assess(f, '4');
  ok('B7 a different DOOR menu hash reads "Publish from EXPO"', r.menuMatch === false && !r.done && r.left.some((x) => x.app === 'EXPO' && /Publish from EXPO/.test(x.text)), r.left); }
{ const f = copy(); f.menu._meta.exported = '2026-11-13T15:11:25.209Z';
  const r = W.assess(f, '4');
  ok('B8 a newer DOOR publish with the SAME menu hash raises nothing (the review’s false alarm)', r.done === true && r.left.length === 0, r.left); }
{ const f = copy(); delete f.hub._doorMenu.flow;
  const r = W.assess(f, '4');
  ok('B9 no menu hash on one side: "can’t compare", not done, no false "publish"', r.menuMatch === null && !r.done && !r.left.some((x) => /Publish from EXPO/.test(x.text))); }
{ const r = W.assess({ ...copy(), library: null }, '4');
  ok('B10 an unreadable Library is named, not done, and raises no CODEX rows', r.unreadable.includes('library') && !r.done && !r.left.some((x) => x.app === 'CODEX'), r); }
{ const r = W.assess({ ...copy(), hub: null }, '4');
  ok('B11 an unreadable board is named and nothing is claimed about cards', r.unreadable.includes('hub') && !r.done && r.meals.every((m) => m.onBoard === null) && r.left.length === 0, r.left); }
{ const r = W.assess({ ...copy(), menu: null }, '4');
  ok('B12 an unreadable DOOR menu lists no meals and says so', r.meals.length === 0 && !r.done && r.notes.some((n) => /couldn’t be read/.test(n))); }

// ── C. The cycle anchor (HUB's _cycleStart 2026-06-07). Rex's sheet "Week 4 (Mod) Nov 15 – Nov 21". ─────
const at = (y, m, d) => new Date(y, m - 1, d, 9);
ok('C1 Sun 2026-11-15 is Week 4', W.weekOf('2026-06-07', at(2026, 11, 15)) === 4);
ok('C2 Sat 2026-11-14 is Week 3', W.weekOf('2026-06-07', at(2026, 11, 14)) === 3);
ok('C3 Jun 28 – Jul 4 is Week 4, Jul 5 wraps to Week 1', W.weekOf('2026-06-07', at(2026, 6, 28)) === 4 && W.weekOf('2026-06-07', at(2026, 7, 4)) === 4 && W.weekOf('2026-06-07', at(2026, 7, 5)) === 1);
ok('C4 a bad anchor gives no week, never a guess', W.weekOf('', at(2026, 11, 15)) === null && W.weekOf('soon', at(2026, 11, 15)) === null);
const ns = W.nextStart('2026-06-07', '4', at(2026, 11, 13));
ok('C5 from Fri Nov 13, Week 4 next starts Sun Nov 15', ns && ns.getMonth() === 10 && ns.getDate() === 15, String(ns));
const ns1 = W.nextStart('2026-06-07', '1', at(2026, 11, 13));
ok('C6 from Fri Nov 13, Week 1 next starts Sun Nov 22', ns1 && ns1.getMonth() === 10 && ns1.getDate() === 22, String(ns1));

// ── D. The page: read-only, names never reach HTML, links only to the HOUSE apps. ───────────────────────
ok('D1 no innerHTML / outerHTML / insertAdjacentHTML / document.write anywhere in week.html', !/innerHTML|outerHTML|insertAdjacentHTML|document\.write/.test(html));
ok('D2 no localStorage, and no write verbs (PUT/POST/DELETE) in week.html', !/localStorage/.test(html) && !/method\s*:\s*['"](PUT|POST|DELETE|PATCH)/i.test(html));
ok('D3 the core holds no copy of the cycle anchor', !/2026-06-07/.test(core));
ok('D4 the page reads the board’s _cycleStart', /files\.hub\._cycleStart/.test(html));

console.log(`week_tracker_gate: ${pass} passed, ${fails.length} failed`);
if (fails.length) { for (const f of fails) console.log('  ✗ ' + f); process.exit(1); }
