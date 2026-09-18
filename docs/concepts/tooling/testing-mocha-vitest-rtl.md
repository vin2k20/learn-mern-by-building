# Testing: Mocha, Vitest, Testing Library, MSW, Supertest

> **TL;DR:** test **behaviour**, not implementation. Many fast unit tests, a solid set of integration tests (components with the network mocked),
> and a few E2E tests. Mocha and Vitest are runners, Chai is assertions, RTL renders and queries like a user, MSW mocks the network, and Supertest hits Express.

## Runners compared
| | Mocha (+ Chai + Sinon) | Jest | Vitest |
|---|---|---|---|
| Philosophy | minimal, pick your libraries | batteries included | Jest-compatible API, powered by Vite |
| Assertions | Chai (`expect(x).to.equal`) | built in (`expect(x).toBe`) | built in (Jest-style) |
| Mocks/spies/timers | Sinon | built in | built in (`vi.fn`, `vi.useFakeTimers`) |
| ESM/TS | native ESM; TS via a loader | historically painful | native (shares Vite config) |
| DOM | jsdom (global-jsdom) | jsdom env | jsdom / happy-dom / **browser mode** |
| Used in Kanvas | labs, server | (legacy CRA) | client |

## Testing Library principles
- "The more your tests resemble the way your software is used, the more confidence they give you."
- Query priority: `getByRole` → `getByLabelText` → `getByPlaceholderText` → `getByText` → `getByDisplayValue` → `getByAltText` → `getByTitle` → `getByTestId`
- `getBy*` (throws if missing) · `queryBy*` (null if missing, for asserting absence) · `findBy*` (async, waits)
- `userEvent.setup()` then `await user.click()`, `user.type()`, `user.keyboard('{ArrowDown}')`
- `@testing-library/jest-dom` matchers: `toBeInTheDocument`, `toHaveAccessibleName`, `toBeDisabled`, `toHaveAttribute`

```jsx
test('opens the palette with Cmd+K and filters results', async () => {
  const user = userEvent.setup();
  renderWithProviders(<App />, { route: '/projects' });
  await user.keyboard('{Meta>}k{/Meta}');
  const input = await screen.findByRole('combobox', { name: /search/i });
  await user.type(input, 'logi');
  expect(screen.getByRole('option', { name: /login form/i })).toBeInTheDocument();
});
```

## MSW (Mock Service Worker)
The same handlers serve the browser (a Service Worker) and tests (`setupServer` from `msw/node`). Call `server.use(...)` to override a handler per test (e.g. to force a 500).
Lifecycle: `beforeAll(listen)`, `afterEach(resetHandlers)`, `afterAll(close)`.

## Redux testing
- Reducers and selectors: pure-function unit tests (the fastest, highest value).
- Components: render with a **real store** (`setupStore(preloadedState)`), not a mocked one.

## Server testing
```js
import request from 'supertest';
const res = await request(app).post('/api/auth/login').send({ email, password }).expect(200);
expect(res.body.data.token).to.be.a('string');
```
Use `mongodb-memory-server` for an isolated, throwaway database per test run.

## Coverage & flakiness
Coverage (`vitest --coverage`, `c8`) is a signal, not a goal. Flaky tests usually come from real timers, shared state, network calls or ordering, so fix the root cause.

## 🎤 Interview questions
<details><summary>How do you test a debounced search input?</summary>
Fake timers (`vi.useFakeTimers()`), type, advance the timers by the debounce delay, and assert the request was made once (MSW handler spy) and the results render. Or use real timers with `findBy` and a short delay.
</details>
<details><summary>What do you mock and what don't you?</summary>
Mock the boundaries (network, time, randomness, browser APIs jsdom lacks). Don't mock your own modules or child components unless there's a strong reason.
</details>

## Practise in Kanvas
`labs/*` (Mocha) · `client/src/test/setup.js` · [phase 6](../../phases/phase-6-testing-and-quality.md) · `server/test/*`
