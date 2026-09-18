# The target role (and where Kanvas covers each skill)

Kanvas was designed around a **typical senior frontend / MERN full-stack job description** (4–9 years of experience).
The phase guides mark the relevant skills as "Interview topics covered". Junior and mid-level learners still get the full stack;
the ★ items are the core for every level.

## What these roles usually ask for
**Technical**
- Strong JavaScript: the object model, DOM manipulation and event handlers, ES6+ (scoping, array methods), data structures and algorithms
- Solid React fundamentals: JSX, Babel, the Virtual DOM, the component lifecycle, hooks
- State management workflows: Flux, Redux (and Redux Toolkit), data-structure libraries (Immer, normalisation)
- RESTful APIs and GraphQL
- HTML and CSS, responsive design across devices and platforms, UI design sense
- Tooling: npm, bundlers (CRA historically, Vite today), Git (and awareness of SVN), CI/CD and DevOps basics
- Testing, including frameworks such as Mocha, plus browser-based debugging and performance testing
- Canvas experience (often listed as a plus)
- Node.js and a database (for full-stack roles: Express + MongoDB, which is the MERN stack)

**Responsibilities**
- Work closely with leads and product teams to turn requirements into interactive apps
- Take part in design and code reviews
- Keep the app optimised for many devices and platforms
- Write performant code using appropriate design patterns and data structures
- Join architectural discussions, and help re-architect sub-systems as the business grows
- Keep up with frontend trends and advocate for standards and best practices

**Soft skills**
Problem solving, prioritising several milestones, attention to detail, communication, collaboration, and guiding technical discussions.

## Skill → where you practise it in Kanvas
| Skill | Practised in |
|---|---|
| JS, object model, DOM, event handlers | labs 01–06, 09 · board drag-and-drop · `landing/js/main.js` |
| Data structures & algorithms | labs 07–08 → Trie (command palette), LRU (httpClient), Graph (task dependencies), Stack (undo), virtualWindow |
| JSX, Babel | lab 11 · [JSX & Babel primer](../concepts/react/jsx-and-babel.md) |
| React fundamentals: Virtual DOM, lifecycle | lab 12 mini-React · ErrorBoundary + LegacyClock class components · hooks |
| Flux, Redux, CRA, data structure libraries | lab 13 · `features/ui` classic Redux · RTK + entity adapter + Immer · RTK Query · CRA-vs-Vite primer + a by-hand Vite setup |
| REST / GraphQL | MSW → Express REST · the GraphQL dashboard · [API contract](../api-contract.md) |
| HTML/CSS (media queries, keyframes, flexbox, grid) | `landing/` (dedicated) + every app `.module.css` |
| ES6 scoping, array methods | labs 01, 04 |
| Git/SVN, tools, CI/CD, DevOps | Phase 0 branch-per-phase workflow + PR template · ESLint/Prettier/Vite · `ci.yml` · Dockerfile ☆ |
| Mocha / performance testing | labs + server on Mocha · Vitest · web-vitals · Lighthouse · React Profiler |
| Browser debugging & performance tools | [debugging lab](../debugging-lab.md) · the Phase 5 profiling exercises |
| Canvas | lab 10 · whiteboard · canvas charts |
| UI design, multi-device | design tokens and wireframes · media and container queries · pointer and touch events |
| Design patterns, architecture, code reviews | [design patterns primer](../concepts/js/design-patterns.md) · command/strategy/observer/compound patterns · feature-based folders · `/review` · [system design](frontend-system-design.md) |
| Node, Express, MongoDB (the "EN" in MERN) | Phase 7: Express 5, Mongoose 9, JWT, GraphQL, Supertest |
| Trends | React 19.3 `<ViewTransition>` ☆ · React Compiler ☆ · [trends primer](../concepts/web/trends-2026.md) |
| Soft skills | [behavioral STAR stories](behavioral-star.md) · code-review exercise (Phase 6) · the PR template |

## Adapting to your own target role
Paste the job description you're preparing for into your AI tutor and ask:
*"Map this job description to the Kanvas phases and labs, and tell me which ☆ items to promote to ★ for it."*
Then note the result in the `Goal:` line of your `PROGRESS.md`.
