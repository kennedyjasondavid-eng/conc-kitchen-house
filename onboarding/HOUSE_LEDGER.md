# HOUSE status ledger — moved

The cross-app status ledger is now **[`../HOUSE_STATUS_LEDGER.md`](../HOUSE_STATUS_LEDGER.md)**, at this
repo's root. It is the single owner of cross-app status (versions, phases, schema seams).

This file held the 2026-08-10 consolidation, which was installed to `~/.claude/CLAUDE.md` and kept there
until 2026-10-29. On that day the maintained copy moved into the repo (#44), so cloud sessions, which
can't see `~/.claude`, can read it. This copy had stopped being kept up to date (it still said DOOR
`v31-standard.1`), so it is now only this pointer and can't be mistaken for the current ledger. Its
2026-08-10 text is in git history.

A computer's `~/.claude/CLAUDE.md` loads the ledger from a local clone of this repo with one import line,
for example:

```
@/path/to/conc-kitchen-house/HOUSE_STATUS_LEDGER.md
```
