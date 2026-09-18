/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 labs/03-object-model/object-model.js · Phase 2 · Day 1 · ★ core
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL
 *   Show you understand prototypes, classes, private state, descriptors and
 *   Proxies by building six small utilities.
 *
 * 🧠 CONCEPTS  → docs/concepts/js/prototypes-object-model.md, docs/concepts/js/design-patterns.md
 *
 * 🧩 USED LATER BY
 *   EventEmitter → the Flux Dispatcher idea (lab 13) and the toast system (client/src/components/Toast)
 *   deepFreeze   → why Redux state must be immutable (RTK freezes it in dev)
 *   createObservable → how MobX/Vue-style reactivity works (a talking point vs Redux)
 *
 * 📝 STEPS
 *   1. class EventEmitter
 *      - Store listeners in a Map<eventName, Function[]>.
 *      - on(event, listener) → adds it and RETURNS an unsubscribe function.
 *      - off(event, listener) → removes the LAST registration of that listener
 *        (it must also remove listeners added via once(); see step 1c).
 *      - once(event, listener) → wraps the listener so it removes itself before running.
 *        Store the original on the wrapper (e.g. wrapper.listener = listener) so off() can find it.
 *      - emit(event, ...args) → calls listeners in registration order with `this` = the emitter.
 *        Iterate over a COPY of the array (listeners added or removed during emit must not affect
 *        the current emit). Return true if there were listeners, otherwise false.
 *        Special case: emitting 'error' with no listeners throws the first arg
 *        (or new Error('Unhandled error') if it isn't an Error).
 *      - listenerCount(event) → number.
 *   2. inherits(Child, Parent)
 *      - Child.prototype = Object.create(Parent.prototype, { constructor: {...non-enumerable...} })
 *      - Object.setPrototypeOf(Child, Parent) so statics are inherited too.
 *   3. class Task / class BugTask
 *      - Task has PRIVATE #title and #points, and a PUBLIC class field `status = 'todo'`.
 *        (So Object.keys(task) is exactly ['status'].)
 *      - constructor({ title, points = 1 }) uses the title setter for validation.
 *      - get title() / set title(v): v must be a non-empty string after trim(), otherwise throw a
 *        TypeError. Store the trimmed value.
 *      - get points() only (read-only).
 *      - complete() → sets status to 'done' and returns `this` (chainable).
 *      - toJSON() → { title, points, status }
 *      - static fromJSON(json) → build with `new this(json)` (so BugTask.fromJSON returns a BugTask),
 *        then copy json.status if present.
 *      - static get created() → how many Task (or subclass) instances have been constructed.
 *        Use a `static #created = 0` counter.
 *      - BugTask extends Task: constructor({ severity = 'minor', ...rest }) → super(rest), then
 *        this.severity = severity. toJSON() adds severity (use super.toJSON()).
 *   4. deepFreeze(value)
 *      - Primitives and null are returned as they are.
 *      - Freeze the object, then recurse into its own property values (Reflect.ownKeys).
 *      - Use a WeakSet of visited objects so cycles don't overflow the stack. Return the value.
 *   5. createObservable(target, onChange)
 *      - Return a Proxy. `set` and `deleteProperty` traps call onChange with
 *        { type: 'set' | 'delete', path: string[], value, previous }
 *        (for delete, value is undefined). Skip the notification when Object.is(previous, value).
 *      - `get` trap: if the value is a non-null object, return a Proxy for it too (with the path
 *        extended), so nested writes are reported with their full path.
 *      - Cache child proxies in a WeakMap so `state.user === state.user` stays true.
 *      - Use Reflect.get / Reflect.set / Reflect.deleteProperty to do the actual work.
 *   6. getPrototypeChain(obj)
 *      - Walk Object.getPrototypeOf until null, collecting proto.constructor?.name.
 *        If a prototype has no own `constructor`, push '(anonymous)'.
 *
 * ✅ DONE WHEN
 *   [ ] npm run test:03 is green
 *   [ ] you can draw the prototype chain for `new BugTask(...)` from memory
 *
 * 💡 HINTS
 *   - Object.hasOwn(proto, 'constructor')
 *   - Array.prototype.lastIndexOf, splice
 *   - In a class, `static #count = 0` is accessed as Task.#count (inside the class body).
 *
 * ⚠️ GOTCHAS
 *   - Setting `Child.prototype = Object.create(...)` AFTER adding methods to Child.prototype wipes them out.
 *   - Private fields are NOT inherited in the sense of subclass access: BugTask can't read this.#title.
 *   - A Proxy get trap that creates a NEW proxy on every read breaks identity checks (and React memoization).
 *
 * 🎤 INTERVIEW ANGLE
 *   "What does `new` do?", "class vs prototype", "implement an EventEmitter",
 *   "how does Vue/MobX reactivity work?", "freeze vs seal".
 *
 * 🚀 STRETCH ☆  EventEmitter.prependListener · batched observable notifications
 *
 * 🤖 ASK THE AGENT
 *   /explain prototype chain · /explain Proxy and Reflect · /hint labs/03-object-model/object-model.js createObservable
 * ═══════════════════════════════════════════════════════════════════════════
 */

export class EventEmitter {
  on(event, listener) {
    throw new Error('TODO: implement EventEmitter.on');
  }

  off(event, listener) {
    throw new Error('TODO: implement EventEmitter.off');
  }

  once(event, listener) {
    throw new Error('TODO: implement EventEmitter.once');
  }

  emit(event, ...args) {
    throw new Error('TODO: implement EventEmitter.emit');
  }

  listenerCount(event) {
    throw new Error('TODO: implement EventEmitter.listenerCount');
  }
}

export function inherits(Child, Parent) {
  throw new Error('TODO: implement inherits');
}

export class Task {
  constructor({ title, points = 1 } = {}) {
    throw new Error('TODO: implement Task');
  }

  static fromJSON(json) {
    throw new Error('TODO: implement Task.fromJSON');
  }

  static get created() {
    throw new Error('TODO: implement the Task.created static getter');
  }
}

export class BugTask extends Task {
  constructor({ severity = 'minor', ...rest } = {}) {
    super(rest);
  }
}

export function deepFreeze(value) {
  throw new Error('TODO: implement deepFreeze');
}

export function createObservable(target, onChange) {
  throw new Error('TODO: implement createObservable');
}

export function getPrototypeChain(obj) {
  throw new Error('TODO: implement getPrototypeChain');
}
