# Phase 2 · JavaScript labs ★ (Days 1–3)

**Goal:** get JavaScript fluency back to interview level: the object model, scope, async, the DOM, data structures,
JSX/Babel, the Virtual DOM and Redux internals. Every lab has ready-made tests.
**[Interview topics](../interview/target-role.md) covered:** *JavaScript, object model, DOM manipulation and event handlers, data structures, algorithms, JSX, Babel, ES6, Flux/Redux, Mocha*
**Start here:** [labs/README.md](../../labs/README.md)

---

## Schedule
| Day | Labs | Why in this order |
|---|---|---|
| 1 | 01 → 02 → 03 → 04 → 05 | Language core first: scope, `this`, prototypes, arrays, async |
| 2 | 06 → 07 → 09 (+ playground) · ☆ 08, 10 | Utilities and data structures you'll reuse, then the DOM |
| 3 | 11 → 12 → 13 | Tooling (Babel) → how React works → how Redux works. The bridge to Phase 3. |

## How to work a lab (the interview-simulation loop)
1. **Read** the lab README (5 min) and the test *names* (`describe`/`it`). The test names are the spec.
2. **Predict first.** For labs with `predictions`, write your answers *before* running anything.
3. **Code with a timer.** Give each function 10–15 min. If you're stuck for more than 5 min, use `/hint` (level 1).
4. **Run just that lab:** `npm run test:07`. Use `npm run test:watch` while iterating.
5. **Explain it.** Once it's green, explain the complexity and trade-offs out loud (record yourself if you can).
6. **Commit:** `git commit -m "feat(labs): lab 07 data structures"`.
7. **Review:** `/review labs/07-data-structures`. Fix anything in 🔴.

## Mocha + Chai crash course (you'll use them again in the server)
```js
import { expect } from 'chai';
describe('unit', () => {
  before(() => {/* once */});  beforeEach(() => {/* each test */});
  it('does a thing', () => { expect(fn(1)).to.equal(2); });
  it('async', async () => { expect(await load()).to.deep.equal({ ok: true }); });
});
```
- `equal` (strict `===`) vs `deep.equal` (structural) · `.to.throw(TypeError)` · `.to.be.instanceOf(X)` · `.to.include` · `.to.have.lengthOf`
- `--watch`, `.only` / `.skip` (never commit `.only`), `--reporter dot`, `this.timeout(5000)` (needs `function () {}`, not an arrow)
- Sinon: `sinon.spy()`, `sinon.stub(obj, 'method')`, `sinon.useFakeTimers()` → `clock.tick(ms)`
- The labs use **global-jsdom** to fake a browser for the DOM labs (09, 12).

## ✅ Checkpoint (end of Day 3)
- [ ] `npm test` in `labs/`: all ★ labs green
- [ ] Predictions: at least 80% right on your first try (be honest!)
- [ ] You can write `debounce`, `Promise.all`, `bind` and an LRU cache from memory in ~10 minutes each
- [ ] You can explain the event loop, the prototype chain, reconciliation and middleware with a drawing

## 🎤 Drill
Run `/quiz javascript hard n=8` at the end of Day 1 and Day 2, and `/quiz react internals redux n=6` at the end of Day 3.
Log your scores in `PROGRESS.md`.
