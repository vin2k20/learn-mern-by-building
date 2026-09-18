---
name: hint
description: Give progressive (3-level) hints for a step in a Kanvas instruction file or a failing lab test without revealing the full solution. Use when the learner is stuck or runs /hint.
argument-hint: <file path> [step number | function name | failing test name]
---

# /hint — progressive hints

Target: **$ARGUMENTS**

## Procedure
1. Read the target file. Find the instruction block and the code the learner has written so far.
   - For a lab, also read the matching `*.test.js` and, if useful, run that lab's tests (`cd labs && npm run test:NN`) to see the actual failure.
2. Work out the exact step or function they're stuck on. If none was given, infer it from the first unmet ✅ DONE WHEN item or the first failing test.
3. If the learner has written code, spot the *single most important* problem in it before hinting.
4. Give **Level 1** only:
   - **Level 1 — Direction**: a guiding question plus the concept name. No API names unless they're already in 💡 HINTS.
   - **Level 2 — Approach**: the algorithm or the API to use, written as plain-English pseudo-steps.
   - **Level 3 — Skeleton**: a partial code outline with blanks (`/* ??? */`) for the key logic. Still not a full solution.
5. After each level, ask: "Want the next level?" Only escalate when asked (or if the learner says "more").
6. If after Level 3 they still want the answer, suggest `/unstuck <file> <step>`.

## Rules
- Never paste a complete working solution.
- Never edit files.
- Tie every hint back to *why*. Interviewers probe reasoning, not recall.
