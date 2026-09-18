# HTTP caching, CORS & networking basics

> **TL;DR:** cache aggressively with **content-hashed file names** and revalidate HTML. CORS is a **browser** protection that the server relaxes with headers.
> Use a dev proxy to avoid CORS during development.

## Caching headers
| Header | Example | Meaning |
|---|---|---|
| `Cache-Control` | `public, max-age=31536000, immutable` | hashed static assets (`app.3f9a.js`) |
| `Cache-Control` | `no-cache` | store it, but revalidate every time (HTML) |
| `Cache-Control` | `no-store` | never store it (sensitive data) |
| `Cache-Control` | `private, max-age=60, stale-while-revalidate=300` | per-user API responses |
| `ETag` / `If-None-Match` | `"abc123"` | a conditional request → `304 Not Modified` |
| `Last-Modified` / `If-Modified-Since` | date | the same idea, with dates |
| `Vary` | `Accept-Encoding, Authorization` | the cache key includes these request headers |

Layers of caching: the browser memory/disk cache → a Service Worker → the CDN → a reverse proxy → the app cache (LRU) → the DB.

## CORS
```
Browser at http://localhost:5173 ──► fetch('http://localhost:4000/api/projects')
  (non-simple request: JSON content type / Authorization header)
  1. Preflight: OPTIONS /api/projects
       Origin: http://localhost:5173
       Access-Control-Request-Method: GET
       Access-Control-Request-Headers: authorization, content-type
  2. Server: Access-Control-Allow-Origin: http://localhost:5173
             Access-Control-Allow-Headers: authorization, content-type
             Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE
             (Access-Control-Allow-Credentials: true, if cookies are sent; then the origin can't be *)
  3. The actual request proceeds.
```
- The **same-origin policy** = the same scheme + host + port.
- CORS errors are only visible in the browser. `curl` doesn't care.
- In dev, the **Vite proxy** (`server.proxy`) makes API calls same-origin, so there's no CORS at all.

## Other things to know
- HTTP/2 multiplexing and HTTP/3 (QUIC); why bundling matters less than it used to, though too many tiny modules still hurt.
- `preconnect`, `dns-prefetch`, `preload`, `modulepreload`, `fetchpriority`
- Compression: brotli > gzip. `Content-Encoding`.
- Cookies: `HttpOnly`, `Secure`, `SameSite=Lax|Strict|None`
- Service Workers: offline caching strategies (cache-first, network-first, stale-while-revalidate). MSW uses a Service Worker to mock requests.

## 🎤 Interview questions
<details><summary>How do you bust caches after a deploy?</summary>
Content-hash the asset file names (the bundler does this), serve index.html with no-cache so it always references the new hashes, and cache the assets forever.
</details>
<details><summary>Why does my request trigger a preflight?</summary>
A non-simple method (PUT/PATCH/DELETE), a custom header (Authorization), or a content type other than form, multipart or text/plain (e.g. application/json).
</details>

## Practise in Kanvas
`client/vite.config.js` (proxy) · `server/src/app.js` (cors, helmet) · `lib/httpClient.js`
