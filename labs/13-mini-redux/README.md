# Lab 13 · Build mini-Redux (and a Flux dispatcher) ★

**Time box:** 60 min · **Run:** `npm run test:13` · **Primer:** [Flux → Redux → RTK](../../docs/concepts/react/flux-redux-rtk.md)

## Why this matters
*"Preceding experience with ReactJS workflows like Flux, Redux."* Interviewers love "how does Redux work internally?",
"what is middleware?", "how does redux-thunk work?" (it's 5 lines), and "Flux vs Redux?".
Build it once and you'll never forget the answers.

## The data flow you're implementing
```
            ┌──────────── dispatch(action) ◄──────────── UI event
            ▼
   middleware chain (logger → thunk → …)     ← can log, delay, transform, or swallow actions
            ▼
   rootReducer(state, action) → newState     ← pure function, no mutation
            ▼
   listeners notified ──► UI re-reads state (react-redux: useSyncExternalStore + selectors)
```
**Flux** had *multiple stores* and a *central Dispatcher* (with `waitFor` for ordering between stores).
**Redux** has a *single store*, *pure reducers* and *middleware*, and the dispatcher is just `store.dispatch`.

## Tasks (in `mini-redux.js`)
1. `createStore(reducer, preloadedState?, enhancer?)`
2. `combineReducers(reducers)`
3. `compose(...fns)`, `applyMiddleware(...middlewares)`
4. `thunk` / `createThunk(extraArgument)`, `createLogger(log)`
5. `bindActionCreators(creators, dispatch)`, `createAction(type, prepare?)` (like RTK's)
6. `class Dispatcher` (Flux) with `register`, `unregister`, `dispatch`, `waitFor`, `isDispatching`

## 🎤 Interview questions
1. Walk through what happens when you call `store.dispatch(action)`.
2. What's the middleware signature `store => next => action => …` for? Why is it curried?
3. How does redux-thunk work? When would you pick RTK Query or sagas instead?
4. Why must reducers be pure? What breaks if they aren't? (Time-travel debugging, memoised selectors, React bail-outs.)
5. Why does `combineReducers` return the *same* state object when nothing changed?
6. Flux vs Redux: what did Redux simplify?
7. Context vs Redux: when is each appropriate?
8. What does Redux Toolkit add on top? (Immer, `createSlice`, a store with good defaults, serializability/immutability checks, RTK Query.)

## Stretch ☆
- Add a `crashReporter` middleware (try/catch around `next`).
- Implement `createSelector` (memoise on input selector results).
