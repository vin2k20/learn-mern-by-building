---
name: review
description: Team-lead style code review of the learner's implementation of a Kanvas file, folder or phase against its instruction block (DONE WHEN), React/JS best practices, performance, accessibility and CSS quality. Use when the learner asks for a review or runs /review.
argument-hint: <file | folder | phase-N>
---

# /review — code review like a senior teammate

Scope: **$ARGUMENTS**

## Procedure
1. Resolve the scope:
   - A file → just that file (plus its `.module.css` or test file if one exists).
   - A folder → every implemented file in it.
   - `phase-N` → the files listed for that phase in `PROGRESS.md` / `docs/phases/phase-N-*.md`.
   - Skip files that still contain only an instruction block, and list them as "not started".
2. For each file, read the instruction block and the code. Check:
   - **Correctness** against every ✅ DONE WHEN item (mark each ✅ / ❌ / ⚠️).
   - **React**: hook rules, effect dependencies and cleanup, stale closures, keys, derived state, unnecessary state, memoization used correctly (not everywhere), Suspense/error boundaries.
   - **JS**: mutation vs immutability, error handling, async races (AbortController), naming, dead code.
   - **Performance**: re-render hot spots, layout thrashing, expensive work in render, bundle impact.
   - **Accessibility**: semantics, labels, focus management, keyboard support, `aria-*` used correctly, colour contrast tokens.
   - **CSS**: layout technique fits the job (flex vs grid), mobile-first media queries, no magic numbers (use tokens), animations on `transform`/`opacity`, `prefers-reduced-motion`.
   - **Tests** (if present): testing behaviour rather than implementation, user-event usage, accessible queries.
3. Output format:
   ```
   ## Review: <scope>
   Verdict: ✅ Approve | 💬 Approve with comments | 🔁 Request changes

   ### DONE WHEN checklist
   ### 🔴 Must fix      (bugs, a11y blockers, broken requirements)
   ### 🟡 Should fix    (perf, maintainability)
   ### 🟢 Nice to have  (style, stretch)
   ### 👏 What's good
   ### 🎤 Questions an interviewer would ask about this code
   ```
   For each finding: `path:line`, the quoted snippet, the impact, and a suggested direction (no full rewrite).
4. Offer to re-review after the fixes.

## Rules
- Don't edit files during a review.
- Be specific and kind. This also practises the "help with design and code reviews" responsibility that senior roles list, so point out how the learner could phrase similar feedback to a teammate.
