# Frontend security: XSS, CSRF, JWT storage, CSP

> **TL;DR:** never inject untrusted HTML, send a strict **Content-Security-Policy**, pick your token storage knowingly, and validate on the server.

## XSS (cross-site scripting)
- **Stored/reflected/DOM-based:** an attacker's script runs in your origin and can read tokens and act as the user.
- React escapes text by default. The danger zones are `dangerouslySetInnerHTML`, `innerHTML`, `href={userInput}` (`javascript:` URLs), `eval`/`new Function`, and third-party scripts.
- Defences: output encoding, **DOMPurify** for any HTML you must render, **CSP** (`script-src 'self'`, nonces or hashes, no `unsafe-inline`),
  **Trusted Types** (supported in React 19.3), and `HttpOnly` cookies so scripts can't read session cookies.

## CSRF (cross-site request forgery)
- Another site makes the user's browser send a request that carries **cookies** automatically.
- Defences: `SameSite=Lax/Strict` cookies, CSRF tokens (double-submit or synchroniser), checking `Origin`/`Referer`, and never changing state on GET.
- A bearer token in the `Authorization` header isn't sent automatically, so it isn't CSRF-prone. It **is** exposed to XSS if you keep it in JS-accessible storage.

## Where to keep the JWT?
| Storage | XSS | CSRF | Notes |
|---|---|---|---|
| `localStorage` | ❌ readable by any injected script | ✅ | simple (Kanvas uses this for learning) |
| Memory only | ✅ better | ✅ | lost on reload, so pair it with a refresh flow |
| `HttpOnly; Secure; SameSite` cookie | ✅ | ⚠️ needs SameSite/CSRF protection | the most common production choice |
| Short-lived access token in memory + refresh token in an HttpOnly cookie | ✅ | ⚠️ protect the refresh endpoint | a strong pattern |

JWT facts: a **signed, not encrypted** payload (base64url). Verify the signature and `exp` on the server. Keep payloads small. Revocation needs short TTLs, a denylist, or token versioning.

## Other headers & practices
`helmet` sets many of these: `Content-Security-Policy`, `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `frame-ancestors` (clickjacking).
Also: dependency audits (`npm audit`, Dependabot), Subresource Integrity for CDN scripts, rate limiting, input validation (zod) on the **server**, and never trusting client-side checks.

## 🎤 Interview questions
<details><summary>Is React immune to XSS?</summary>
No. It escapes interpolated text, but `dangerouslySetInnerHTML`, `javascript:` URLs, injected third-party scripts, and server-rendered data inlined into script tags can all still lead to XSS.
</details>

## Practise in Kanvas
`features/auth/authSlice.js` · `lib/httpClient.js` · `server/src/middleware/auth.js` · `server/src/app.js` (helmet, cors)
