# Phase 9 · Interview drills ★ (every evening + Day 7 afternoon)

**Goal:** turn what you built into crisp answers under time pressure.
**[Interview topics](../interview/target-role.md) covered:** *problem solving · participating in and guiding technical discussions · architecture · prioritisation · communication*

---

## Daily routine (20–30 min every evening)
1. `/quiz <today's topics> n=5` → log the score in `PROGRESS.md`.
2. Re-read the 🎤 sections of the files you finished today, and answer them **out loud**.
3. Update the confidence tracker.

## Day 7 afternoon (2 h)
| Block | Activity | Resource |
|---|---|---|
| 45 min | 1 timed machine-coding prompt (the hardest one you haven't done) | [machine-coding.md](../interview/machine-coding.md) |
| 30 min | Frontend system design: whiteboard "Design Kanvas for 10k concurrent users with real-time collaboration" | [frontend-system-design.md](../interview/frontend-system-design.md) |
| 25 min | Write and rehearse 6 STAR stories | [behavioral-star.md](../interview/behavioral-star.md) |
| 20 min | `/quiz full mock interview senior frontend` | all Q&A banks |

## Machine-coding rules (simulate the real thing)
- A timer on screen. 45–60 min. Vanilla JS or React in a fresh sandbox (`npm create vite@latest drill -- --template react` in a *separate* folder).
- First 5 min: clarify requirements and **say your plan out loud**.
- Get it working first, then accessibility and edge cases, then polish.
- Last 5 min: talk through the trade-offs and what you'd do with more time.

## The "tell me about your project" pitch (practise until it takes 90 s)
> "I built **Kanvas**, a React 19 + Redux Toolkit board with a canvas whiteboard, backed by Express 5, MongoDB and GraphQL.
> The interesting parts were **(1)** drag-and-drop with optimistic updates and rollback, using normalised state and fractional ordering,
> **(2)** a hi-DPI canvas whiteboard with a command-pattern undo stack and hit-testing,
> **(3)** performance: virtualising a 10k-row feed took the initial render from __ ms to __ ms and removed long tasks, and route splitting cut the initial JS by __ %,
> and **(4)** a Trie-plus-fuzzy-scoring command palette with full keyboard and screen-reader support.
> It's tested with Vitest/RTL/MSW on the client and Mocha/Supertest on the server, and CI runs lint, tests and a Lighthouse budget."

Fill in the blanks from your Phase 5 before/after log.

## The day before the interview
- [ ] Re-read [javascript-qa](../interview/javascript-qa.md), [react-qa](../interview/react-qa.md), [css-html-qa](../interview/css-html-qa.md), [performance-qa](../interview/performance-qa.md)
- [ ] Redo one machine-coding prompt from scratch (debounced autocomplete is the classic)
- [ ] Rehearse the pitch and 3 STAR stories
- [ ] Prepare questions for them (team structure, the design system, the testing culture, how code review works, the performance budget, the release cadence)
- [ ] Sleep 😴
