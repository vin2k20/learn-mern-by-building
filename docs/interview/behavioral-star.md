# Behavioral interviews: STAR stories mapped to typical role responsibilities

**STAR** = **S**ituation (1–2 sentences) → **T**ask (your responsibility) → **A**ction (what *you* did: the specifics) → **R**esult (numbers, learning).
Keep each story to ~90 seconds. Prepare **6 stories** from your past projects (you've shipped React/Node apps, so mine those) and reuse them flexibly.

| Typical role responsibility | Likely question | Your story (fill in) |
|---|---|---|
| "Work closely with leads and product teams" | Tell me about translating a vague product requirement into a feature. | |
| "Help with design and code reviews" | Describe a code review where you caught something important, or disagreed. | |
| "Ensure optimised for various devices" | A time you fixed a responsive, cross-browser or device-specific issue. | |
| "Write highly optimised, performant code" | A performance problem you diagnosed and fixed. What was the impact? | (use your Kanvas before/after log if you have nothing else) |
| "Take part in architectural discussions" | A technical decision you influenced. How did you convince others? | |
| "Re-architect sub-systems" | A refactor or migration you led. How did you de-risk it? | |
| "Prioritise and manage multiple milestones" | Tell me about juggling competing deadlines. | |
| "Self-driven, keen eye for detail" | A time you went beyond the ticket. | |
| "Strong team player / collaborator" | A conflict with a teammate and how you resolved it. | |
| "Continued education" | How do you keep up with frontend trends? What did you learn recently? | (this week: React 19.3, Vite 8, RR8, Express 5…) |
| (always) | Tell me about a failure or a mistake. | |
| (always) | Why this role / company? | |

## Template
```
Title: _______________________________
S: At <company/project>, <context>, <constraint>.
T: I was responsible for <goal/metric>.
A: 1) I <investigated/measured> …  2) I <proposed/built> … because …  3) I <collaborated/communicated> …
R: <metric improved by X%/time saved/incidents avoided>. I learned <insight>, which I now apply by <habit>.
```

## Code-review language (practise it)
- "**Blocking:** this effect has no cleanup, so the listener leaks on every navigation. Could we return a remover?"
- "**Suggestion (non-blocking):** extracting this into `useBoardDnD` would make TaskCard easier to test."
- "**Question:** is `index` safe as a key here? Can the list be reordered?"
- "**Praise:** nice use of `createEntityAdapter`, the reducer is much simpler now."

## Questions to ask them
- How are frontend architecture decisions made and documented (RFCs, ADRs)?
- What does code review look like? How long does a PR usually take to merge?
- What's the testing strategy and CI setup? Any performance budgets?
- Is there a design system? Who owns it?
- What would success look like for this role in the first 90 days?
