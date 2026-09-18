# Authentication with JWT (and password hashing)

> **TL;DR:** hash passwords (bcrypt/argon2) and **never** store them in plain text. After login, issue a **signed** JWT (`sub`, `role`, `exp`).
> Verify it on every request. Keep tokens short-lived.

## Flow
```
POST /api/auth/login {email, password}
  → find the user → bcrypt.compare(password, user.passwordHash)
  → jwt.sign({ sub: user.id, role }, JWT_SECRET, { expiresIn: '1h' })
  ← 200 { data: { token, user } }

GET /api/projects   Authorization: Bearer <token>
  → auth middleware: jwt.verify(token, JWT_SECRET) → req.user = { id: payload.sub, role }
  → 401 if it's missing, malformed or expired
```

## JWT anatomy
`base64url(header).base64url(payload).signature`: **readable by anyone**, so never put secrets in it.
`header: { alg: 'HS256', typ: 'JWT' }` · `payload: { sub, role, iat, exp }` · signature = HMAC-SHA256(header.payload, secret).
Always pin `algorithms: ['HS256']` when verifying (it prevents algorithm-confusion attacks).

## Passwords
- `bcryptjs` (pure JS) or `bcrypt` (native): `await bcrypt.hash(pw, 12)` / `await bcrypt.compare(pw, hash)`
- Don't reveal whether it was the email or the password that was wrong. Use one generic 401 message.
- Rate-limit the login endpoint. Consider account lockout or backoff.

## Refresh tokens & revocation (talking points)
- A short-lived access token (5–15 min) plus a refresh token (days) in an **HttpOnly, Secure, SameSite** cookie; rotate refresh tokens on use.
- Revocation: a denylist by `jti`, a `tokenVersion` on the user, or short TTLs.
- Where to store tokens on the client: see [security primer](../web/security-xss-csrf-jwt.md).

## Authorisation vs authentication
AuthN = who you are (JWT verification). AuthZ = what you may do (project membership and role checks) → **403**.

## 🎤 Interview questions
<details><summary>Sessions vs JWT?</summary>
Sessions keep state on the server (easy to revoke, but they need a shared store to scale). JWTs are stateless and self-contained (easy to scale, harder to revoke). Many apps use JWT access tokens plus server-side refresh sessions.
</details>

## Practise in Kanvas
`server/src/middleware/auth.js` · `server/src/controllers/auth.controller.js` · `client/src/features/auth/*`
