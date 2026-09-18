---
name: unstuck
description: Escape hatch that shows and explains a reference implementation for ONE specific step or function of a Kanvas instruction file or lab, after hints weren't enough. Only use when the learner explicitly runs /unstuck or explicitly asks for the solution.
argument-hint: <file path> <step number | function name>
---

# /unstuck — reference solution for one step

Target: **$ARGUMENTS**

## Procedure
1. Read the file's instruction block, the learner's current code and (for labs) the test file.
2. Confirm the scope in one line: "Showing a reference for **<step/function>** only."
3. First, show what's already right in the learner's attempt (if there is one).
4. Show a **reference implementation of just that step or function** in the chat (not in the file):
   - idiomatic, modern JS/React matching the repo's stack versions,
   - commented where the reasoning isn't obvious,
   - with complexity notes (time/space) for DS&A items.
5. Explain it line by line where it matters, then add:
   - **Why this approach** (and one alternative, with its trade-off),
   - **🎤 Interview angle**: how to talk through this solution in 30 seconds.
6. Ask whether the learner wants to type it in themselves (recommended for memory) or have you insert it.
   Only write to the file if they explicitly say so. Never touch `*.test.js`.
7. Suggest a variation to try without help (e.g. "now add `maxAge` expiry to the LRU cache") to lock in the learning.

## Rules
- One step or function per invocation. If asked for "the whole file", suggest going step by step and confirm first.
