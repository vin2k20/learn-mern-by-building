# Design patterns in frontend code

> **TL;DR:** patterns are named solutions to recurring problems. In interviews, name the pattern, say *why* it fits, and give the trade-off.

| Pattern | Idea | In Kanvas |
|---|---|---|
| **Module** | encapsulate private state and expose an API | `lib/httpClient.js`, the closure-based utilities |
| **Singleton** | one shared instance | the Redux store, the MSW worker (usually a module-level instance) |
| **Observer / Pub-Sub** | subscribers are notified of changes | `EventEmitter` (lab 03), `store.subscribe`, the Toast system |
| **Mediator** | a central hub coordinates components | the Flux Dispatcher (lab 13), the Redux store |
| **Command** | encapsulate an action as an object with `do`/`undo` | whiteboard `drawingEngine` history |
| **Strategy** | interchangeable algorithms behind one interface | whiteboard tools (pen, rect, ellipse, eraser) |
| **Factory** | create objects without exposing construction details | `createIdGenerator`, `createAction`, `createSlice` |
| **Decorator / HOC** | wrap to add behaviour | `memo(Component)`, middleware, `withErrorBoundary` |
| **Proxy** | an intermediary controls access | `createObservable` (lab 03), Immer, the API client cache |
| **Adapter** | translate one interface to another | the GraphQL enum mapping, normalising API responses |
| **Facade** | a simple API over complex subsystems | `httpClient` over fetch + retry + cache + auth |
| **Flyweight** | share state across many objects | list virtualisation reusing a small number of rows |
| **Chain of responsibility** | pass a request along handlers | Redux/Express middleware |
| **Iterator** | sequential access without exposing internals | `Symbol.iterator` on LinkedList/Queue |

## React-specific patterns
Container/presentational · compound components (`<Tabs><Tabs.List/>…`) · render props · custom hooks (the modern replacement for HOCs/render props) ·
controlled vs uncontrolled · provider pattern (Context) · state reducer · headless components.
See [component patterns](../react/component-patterns.md).

## SOLID in frontend terms (quick version)
- **S**: one reason to change. Split data fetching from presentation.
- **O**: extend via props, composition or strategies instead of editing internals.
- **L**: a `<PrimaryButton>` should work anywhere a `<Button>` does.
- **I**: small prop interfaces. Don't pass the whole store down.
- **D**: depend on abstractions. Inject `api` into thunks (the `extraArgument`) so tests can swap it.

## 🎤 Interview questions
<details><summary>How would you implement undo/redo in a drawing app?</summary>
The Command pattern: each action is `{ do(), undo() }` stored on a history stack (with a redo stack cleared on new actions). The alternative is immutable snapshots (simpler, but uses more memory), or patches (Immer's `produceWithPatches`).
</details>
