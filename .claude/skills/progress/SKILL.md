---
name: progress
description: Assess the learner's progress on the Kanvas project. Runs lab tests, detects which instruction files have real implementations, updates PROGRESS.md checkboxes and suggests the next task per ROADMAP.md. Use when the learner runs /progress or asks "what's next" / "how am I doing".
argument-hint: [optional: phase or day]
---

# /progress — where am I, what's next?

Focus (optional): **$ARGUMENTS**

## Procedure
1. **Labs**: if `labs/node_modules` exists, run `cd labs && npm test 2>&1 | tail -60` (use `--reporter dot` if the output is long). Build a per-lab table: passing / failing / total. A lab is ✅ when all its core tests pass (`npm test` skips the ☆ stretch suites; `npm run test:stretch` includes them).
   If `node_modules` is missing, tell the learner to run `cd labs && npm install` (don't install it yourself unless asked).
2. **Instruction files**: for `landing/`, `client/src/`, `server/src/`, `server/test/` and `client/*.config.js`, decide whether each file is:
   - *not started*: only the instruction comment block (strip comments; nothing meaningful left),
   - *in progress*: code exists, but DONE WHEN items look unmet or there are `TODO`s,
   - *done*: code exists and looks complete (skim it against DONE WHEN; don't do a full review).
   A quick way: a small node or grep script that strips `/* */`, `//`, `<!-- -->` and `#` comments and counts the remaining non-blank lines.
3. **Setup checks**: `node -v` (should be v24), whether `.git` exists, whether `client/package.json` and `server/package.json` exist.
4. **Update `PROGRESS.md`**: tick the checkboxes that are done, fill the lab table, and set the `Last updated by /progress:` line to today's date. Don't touch the confidence tracker or quiz log.
5. **Report** (keep it short):
   - The learner's track and where they are in it (read the `Track:` and `Started:` lines at the top of `PROGRESS.md`; if they're empty, ask once and fill them in), and whether they're ahead of, on, or behind schedule for that track in `ROADMAP.md`.
   - A table of phases with % done.
   - The **next 3 concrete tasks** (file path + step) in priority order: ★ before ☆, and core interview topics first.
   - One encouragement line and one suggested `/quiz` topic based on what was just finished.

## Rules
- Only edit `PROGRESS.md`.
- Don't judge code quality in depth here; suggest `/review` for that.
