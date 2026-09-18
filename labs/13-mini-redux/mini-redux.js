/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 labs/13-mini-redux/mini-redux.js · Phase 2 · Day 3 · ★ core
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL
 *   Re-implement the core of Redux (plus a Flux Dispatcher) so that on Day 4 the
 *   real Redux Toolkit feels transparent instead of magical.
 *
 * 🧠 CONCEPTS  → README.md · docs/concepts/react/flux-redux-rtk.md
 *   a single source of truth · pure reducers · listeners (observer) · enhancers ·
 *   middleware (a chain of responsibility) · currying · function composition
 *
 * 🧩 DEPENDS ON  lab 03 (EventEmitter idea) · lab 06 (compose)
 * 🧩 USED LATER BY  client/src/features/ui (classic Redux) · client/src/app/store.js (RTK)
 *
 * 📝 STEPS
 *   1. createStore(reducer, preloadedState, enhancer)
 *      - If preloadedState is a function and enhancer is undefined → treat it as the enhancer.
 *      - If there's an enhancer → return enhancer(createStore)(reducer, preloadedState).
 *      - Keep state, a listeners array and an isDispatching flag in the closure.
 *      - getState() → state
 *      - subscribe(listener) → unsubscribe (calling it twice must be safe)
 *      - dispatch(action):
 *          · throw if action isn't a plain object (Object.getPrototypeOf(action) === Object.prototype, or null)
 *          · throw if typeof action.type !== 'string'
 *          · throw if called while a reducer is running ('Reducers may not dispatch actions.')
 *          · state = reducer(state, action), in try/finally to reset isDispatching
 *          · call a SNAPSHOT of the listeners (copy the array first), then return the action
 *      - replaceReducer(next) → swap the reducer and dispatch { type: '@@redux/REPLACE' + random }
 *      - Initialise: dispatch { type: '@@redux/INIT' + a random suffix } so reducers return their defaults.
 *   2. combineReducers(reducers) → (state = {}, action) => nextState
 *      - For each key: nextSlice = reducers[key](state[key], action).
 *        If nextSlice is undefined → throw an Error mentioning the key.
 *      - Track hasChanged (nextSlice !== state[key]). Return the OLD state object if nothing changed.
 *   3. compose(...fns): right-to-left. compose() → identity; compose(f) → f.
 *   4. applyMiddleware(...middlewares) → createStore => (reducer, preloaded) => store'
 *      - const store = createStore(reducer, preloaded)
 *      - let dispatch = () => { throw new Error('Dispatching while constructing your middleware is not allowed.') }
 *      - const api = { getState: store.getState, dispatch: (...args) => dispatch(...args) }
 *      - const chain = middlewares.map((mw) => mw(api))
 *      - dispatch = compose(...chain)(store.dispatch)
 *      - return { ...store, dispatch }
 *   5. createThunk(extra) → ({ dispatch, getState }) => next => action =>
 *        typeof action === 'function' ? action(dispatch, getState, extra) : next(action)
 *      export const thunk = createThunk()
 *   6. createLogger(log = console.log) → a middleware that calls log({ type, prev, next }) per action
 *      and returns the result of next(action).
 *   7. bindActionCreators(creators, dispatch)
 *      - a function → (...args) => dispatch(creators(...args))
 *      - an object → the same keys, each one bound
 *   8. createAction(type, prepare)
 *      - creator(...args) → prepare ? { type, ...prepare(...args) } : { type, payload: args[0] }
 *      - creator.type = type; creator.toString = () => type; creator.match = (a) => a?.type === type
 *   9. class Dispatcher (Flux)
 *      - register(cb) → 'ID_1', 'ID_2', … · unregister(id)
 *      - dispatch(payload): throw 'Cannot dispatch in the middle of a dispatch.' if one is already running.
 *        Otherwise reset the per-dispatch isPending/isHandled maps and invoke every callback that isn't
 *        pending yet. Always clear the dispatching state in a `finally`.
 *      - waitFor(ids): only allowed while dispatching (otherwise throw). For each id: if it's pending
 *        but not handled → throw 'Circular dependency…'. If it's already handled → skip it. Otherwise invoke it now.
 *      - isDispatching() → boolean
 *
 * ✅ DONE WHEN
 *   [ ] npm run test:13 is green
 *   [ ] you can write thunk from memory and explain the middleware signature
 *
 * 💡 HINTS
 *   - Math.random().toString(36).slice(2)
 *   - A middleware's `next` is the NEXT middleware's dispatch (or the store's real dispatch for the last one).
 *
 * ⚠️ GOTCHAS
 *   - Iterating over `listeners` directly while one of them unsubscribes skips a listener. Iterate over a copy.
 *   - The middleware API's dispatch must go through the WHOLE chain (that's why it's a wrapper function).
 *
 * 🎤 INTERVIEW ANGLE  "Implement redux-thunk", "how does middleware work?", "Flux vs Redux".
 *
 * 🚀 STRETCH ☆  createSelector · crashReporter middleware
 *
 * 🤖 ASK THE AGENT  /explain redux middleware currying · /hint labs/13-mini-redux/mini-redux.js applyMiddleware
 * ═══════════════════════════════════════════════════════════════════════════
 */

export function createStore(reducer, preloadedState, enhancer) {
  throw new Error('TODO: implement createStore');
}

export function combineReducers(reducers) {
  throw new Error('TODO: implement combineReducers');
}

export function compose(...fns) {
  throw new Error('TODO: implement compose');
}

export function applyMiddleware(...middlewares) {
  throw new Error('TODO: implement applyMiddleware');
}

export function createThunk(extraArgument) {
  throw new Error('TODO: implement createThunk');
}

// Replace with: export const thunk = createThunk();
export function thunk() {
  throw new Error('TODO: export const thunk = createThunk()');
}

export function createLogger(log = console.log) {
  throw new Error('TODO: implement createLogger');
}

export function bindActionCreators(creators, dispatch) {
  throw new Error('TODO: implement bindActionCreators');
}

export function createAction(type, prepare) {
  throw new Error('TODO: implement createAction');
}

export class Dispatcher {
  constructor() {
    throw new Error('TODO: implement Dispatcher');
  }
}
