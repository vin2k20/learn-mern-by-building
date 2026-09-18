# JavaScript labs

Thirteen focused labs that cover the JavaScript topics that frontend and MERN job descriptions keep asking for: the object model, DOM and events,
data structures and algorithms, JSX/Babel, the Virtual DOM and Flux/Redux. Every lab comes with a **ready-made Mocha + Chai test suite**.
Your job is to turn it green.

## Setup (once)
From the repo root, switch to Node 24, then install the exact dependency versions from `package-lock.json`:
```bash
nvm use
```
```bash
cd labs && npm ci
```

## Everyday commands
| Command | What it does |
|---|---|
| `npm run test:01` | Run one lab's tests (01 … 13) |
| `npm test` | Run every lab |
| `npm run test:watch` | Re-run on save |
| `npm run test:stretch` | Also run the ☆ stretch tests (they're skipped by default) |
| `npm run serve:09` | Serve the DOM playground at http://localhost:3000 |
| `npm run serve:10` | Serve the canvas playground |

## How each lab is organised
```
07-data-structures/
├── README.md                  concepts, tasks, "predict the output", interview questions
├── data-structures.js         instruction block + export stubs that throw "TODO". Replace the stub bodies.
└── data-structures.test.js    the spec. DON'T EDIT.
```

**Loop:** read the README → read the test names (they describe the behaviour) → implement one export →
`npm run test:07` → repeat. Aim to write the code **without** looking anything up first, the way you would in an interview.
Then compare with `/review labs/07-data-structures`.

## Lab index
| # | Lab | ★/☆ | Interview topic | Reused later in |
|---|---|---|---|---|
| 01 | [Scope & closures](01-scope-closures/README.md) | ★ | ES6 variables & scoping | `hooks/`, id generators |
| 02 | [`this`, call/apply/bind](02-this-bind/README.md) | ★ | Object model, event handlers | class components |
| 03 | [Object model](03-object-model/README.md) | ★ | JavaScript object model | ErrorBoundary, pub/sub |
| 04 | [Array methods](04-array-methods/README.md) | ★ | ES6 array methods | selectors, board columns |
| 05 | [Async](05-async/README.md) | ★ | Event loop, REST calls | `lib/httpClient.js` |
| 06 | [Functional utilities](06-functional/README.md) | ★ | Optimised code | `useDebounce`, `setIn` |
| 07 | [Data structures](07-data-structures/README.md) | ★ | Data structures | Trie, LRU, Graph, History |
| 08 | [Algorithms](08-algorithms/README.md) | ☆ | Algorithms | fuzzy search, VirtualList |
| 09 | [DOM & events](09-dom-events/README.md) | ★ | DOM manipulation, event handlers | Modal, drag-and-drop |
| 10 | [Canvas helpers](10-canvas/README.md) | ☆ | Canvas | whiteboard, charts |
| 11 | [Babel & JSX](11-babel-jsx/README.md) | ★ | JSX, Babel | build tooling |
| 12 | [Mini-React](12-mini-react/README.md) | ★ | Virtual DOM, lifecycle | mental model for all React work |
| 13 | [Mini-Redux & Flux](13-mini-redux/README.md) | ★ | Flux, Redux | `features/ui`, store |

## Rules
- Don't edit `*.test.js`. Don't use libraries in your implementations (the whole point is to build it yourself).
- Where the instructions forbid a built-in (e.g. `structuredClone` in `deepClone`), the tests check for it.
- A lab is **done** when every non-☆ test passes. Record it in `PROGRESS.md` (or run `/progress`).
- Stuck? `/hint labs/<lab>/<file>.js <function>`, then `/unstuck` as a last resort.
