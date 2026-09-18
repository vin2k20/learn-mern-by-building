# Express 5 & middleware

> **TL;DR:** an Express app is a **pipeline of middleware** `(req, res, next)`. Routers group routes. An error middleware `(err, req, res, next)`
> formats failures. **Express 5 forwards rejected promises from async handlers to the error middleware automatically.**

## Pipeline
```js
const app = express();
app.use(helmet());
app.use(cors({ origin: env.CLIENT_ORIGIN }));
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));
app.get('/health', (req, res) => res.json({ ok: true }));
app.use('/api/auth', authRouter);
app.use('/api', requireAuth, apiRouter);
app.use((req, res) => res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Route not found' } }));
app.use(errorHandler);                    // 4 arguments → the error middleware (must be last)
```

## Express 4 → 5 changes worth knowing
| Change | Impact |
|---|---|
| Async errors | `app.get('/x', async () => { throw … })` reaches the error handler, so there's no need for `express-async-handler` |
| Path syntax (path-to-regexp v8) | wildcards must be named: `/*splat`; optional segments use braces `/:file{.:ext}`; no regex characters in string paths |
| `req.body` | `undefined` unless a body parser ran |
| `req.query` | a read-only getter; the default parser is "simple" |
| Removed | `app.del`, `req.param()`, `res.send(status)` (use `res.sendStatus`), `res.json(obj, status)` signatures |
| `res.status()` | only accepts integers 100–999 |
| Node | requires Node 18+ |

## Patterns
- **App factory** (`createApp()`) so tests can import the app without listening on a port.
- **Layers:** routes (HTTP) → controllers (request/response mapping) → services (business logic) → models (data).
- **Validation middleware** with zod: `validate({ body: schema })` → 400 with `details`.
- **AppError class** with `status` and `code`. The error handler maps known errors to status codes, logs unknown ones, and hides stack traces in production.
- **Auth middleware** sets `req.user`. **Authorisation** checks project membership.
- **Rate limiting**, request ids, structured logging (pino).

## 🎤 Interview questions
<details><summary>What's the order of middleware and why does it matter?</summary>
Middleware runs in registration order. The body parser must come before handlers that read the body, auth before protected routes, the 404 handler after all routes, and the error handler last.
</details>
<details><summary>How does an error reach the error handler?</summary>
By calling `next(err)`, a synchronous throw, or (in Express 5) a rejected promise returned from the handler. Express skips the non-error middleware until it finds a 4-argument handler.
</details>

## Practise in Kanvas
`server/src/app.js` · `server/src/middleware/*`
