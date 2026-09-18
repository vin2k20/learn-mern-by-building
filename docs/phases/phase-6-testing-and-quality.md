# Phase 6 · Testing, accessibility & code review ★ (Days 5–6, ~2.5 h total)

**Goal:** confidence through tests (Vitest + Testing Library + MSW on the client; Mocha on labs and server), a clean lint,
an accessibility pass, and a **code-review exercise** (the job's "help with design and code reviews").
**[Interview topics](../interview/target-role.md) covered:** *performance testing frameworks like Mocha · CI/CD · code reviews · keen eye for detail*
**Primers:** [testing: Mocha, Vitest, RTL](../concepts/tooling/testing-mocha-vitest-rtl.md) · [accessibility](../concepts/web/accessibility.md) · [ESLint & Prettier](../concepts/tooling/eslint-prettier.md)

---

## 1. Test setup (15 min)
Follow `client/src/test/setup.js` and the `test` block in `client/vite.config.js`.

## 2. Write three tests (60 min)
| File | Type | What it proves |
|---|---|---|
| `features/board/boardSlice.test.js` | unit (reducer) | move/reorder logic, the optimistic rollback |
| `features/board/TaskCard.test.jsx` | component | renders data, opens the drawer on click, keyboard move |
| `features/search/CommandPalette.test.jsx` | integration (MSW) | opens with the shortcut, filters, navigates with arrows, Enter routes |

Each test file's instructions are at the top of the component it tests (look for "🧪 TESTS").
**Rules:** query the way a user would (`getByRole` > `getByLabelText` > `getByText` > `getByTestId`), use `user-event` rather than `fireEvent`,
don't test implementation details, and one behaviour per `it`.

## 3. The test pyramid for Kanvas
```
          ▲  E2E (Playwright ☆): login → create project → drag a card        few, slow, high confidence
         ▲▲▲  Integration (RTL + MSW): pages with the network mocked         some
       ▲▲▲▲▲▲▲  Unit (Vitest/Mocha): reducers, selectors, utilities, labs    many, fast
```

## 4. Lint & accessibility pass (30 min)
- `npm run lint -- --max-warnings 0`
- Keyboard-only walk-through: login → projects → board (move a card) → whiteboard toolbar → palette → settings
- Screen reader smoke test (VoiceOver: `Cmd + F5`): landmarks, headings, and announcements for toasts and card moves
- Lighthouse Accessibility ≥ 95 on each route. DevTools → Elements → Accessibility tree for tricky widgets.
- ☆ `npx @axe-core/cli http://localhost:4173`

## 5. Code review exercise (45 min)
1. Pick three files you wrote this week (one component, one slice, one CSS module).
2. Run `/review <file>` on each and fix the 🔴 findings.
3. **Role reversal:** ask the tutor *"write a flawed version of a TaskCard with 6 realistic bugs for me to review"*.
   Write your review in the format from `.github/pull_request_template.md`, then ask the tutor to grade it.
4. Practise phrasing: be specific, explain the impact, suggest a direction, and separate blocking from non-blocking comments.

## ✅ Checkpoint
- [ ] `npm test` in `client/` is green (3+ test files) · [ ] `npm run lint` is clean · [ ] the a11y checklist is done
- [ ] One self-review written with the PR template

## 🎤 Drill
1. Unit vs integration vs E2E: what goes where, and why?
2. How do you test a component that fetches data? (MSW, not mocking `fetch` by hand.)
3. Mocha vs Jest vs Vitest: the differences?
4. How do you give feedback on a PR when you disagree with the design?
5. What makes a component accessible? Name five concrete checks.

🤖 `/quiz testing accessibility code review`
