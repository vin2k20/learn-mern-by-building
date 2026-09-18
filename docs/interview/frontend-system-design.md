# Frontend system design: Kanvas at scale

Use this for the "take part in architectural discussions / re-architect sub-systems" part of senior roles.
Practise drawing it on paper or on a whiteboard in about 30 minutes.

## Framework for any frontend design question (RADIO)
1. **R**equirements: functional, non-functional (performance, a11y, i18n, offline, security), scale, devices
2. **A**rchitecture: the high-level components, rendering strategy, and module boundaries
3. **D**ata model: entities, client state shape, where each piece of state lives
4. **I**nterface (API): REST/GraphQL/WebSocket contracts, pagination, errors
5. **O**ptimisations and deep dives: performance, accessibility, security, observability, testing, rollout

---

## Prompt: "Make Kanvas collaborative for 10k concurrent users per workspace"

### 1. Requirements
- Real-time board updates (moves, edits) and a shared whiteboard with presence (cursors, avatars)
- Offline tolerance for short disconnects. Conflict handling.
- p75 INP < 200 ms, initial JS < 200 KB, WCAG 2.2 AA
- Web first; mobile web must work; SSO later

### 2. Architecture
```
┌───────────── Browser ─────────────┐
│ App shell (SPA or RR framework)   │
│  ├─ Board (Redux slice + RTKQ)    │◄──── REST (CRUD, pagination)
│  ├─ Whiteboard (canvas + CRDT doc)│◄──── WebSocket (ops, presence) ───┐
│  ├─ Dashboard (GraphQL)           │◄──── GraphQL (aggregations)       │
│  ├─ Service Worker (offline cache)│                                   │
│  └─ Web Worker (CRDT merge, export)                                   │
└───────────────────────────────────┘                                   │
            CDN (static, hashed assets)          ┌──── Realtime gateway ┘ (sticky sessions / pub-sub via Redis)
                                                 ├──── API (Express) ─── MongoDB (replica set)
                                                 └──── GraphQL (yoga + DataLoader)
```
- **Rendering:** SPA for the authenticated app (highly interactive). SSR/SSG for the marketing site (SEO, LCP).
- **Module boundaries:** feature folders with explicit public APIs. Consider a monorepo with a shared design-system package.
  Micro-frontends only if separate teams need independent deploys (trade-offs: duplicated dependencies, consistency, runtime composition via Module Federation).

### 3. Data model & state
- Normalised tasks (`entities`), columns as ordered id lists, fractional `order` keys (LexoRank-style strings to avoid float exhaustion).
- **Board conflicts:** server-authoritative with per-task versions (optimistic concurrency, `If-Match`/version → 409 → re-fetch and re-apply), or last-writer-wins per field.
- **Whiteboard:** a CRDT (e.g. Yjs) document of shapes. Local-first edits merge automatically. Keep undo per user.
- **Presence:** ephemeral and throttled (e.g. 20 Hz for cursors), never persisted.

### 4. Interfaces
- REST for CRUD, with cursor pagination and ETags.
- WebSocket messages: `{ type: 'task.moved', taskId, toStatus, order, version, clientId }`. Acknowledgements and retry with idempotency keys.
- Reconnect with exponential backoff and jitter. Re-subscribe and fetch the missed events since the last sequence number.
- GraphQL for dashboard aggregations (persisted queries, depth limits).

### 5. Deep dives
- **Performance:** virtualised columns for 1k+ cards; memoised selectors; batching socket updates into one dispatch per animation frame;
  canvas viewport culling and an offscreen cache; code-splitting the whiteboard (the heaviest route); Web Workers for CRDT merging.
- **Accessibility:** a keyboard drag alternative, live announcements for remote changes (rate-limited), canvas alternatives.
- **Security:** auth at the WebSocket handshake (a short-lived ticket), authorisation per workspace, CSP, sanitising rich text.
- **Observability:** web-vitals and error monitoring (Sentry), socket health metrics, feature-flagged rollout, synthetic tests.
- **Testing:** contract tests for the socket messages, E2E with two browser contexts (Playwright), load tests on the gateway.
- **Offline:** queue mutations in IndexedDB and replay them with idempotency keys. Show connection status.

### Trade-offs to say out loud
- CRDT vs OT: CRDTs are simpler to scale peer-to-peer, but their documents grow (they need compaction). OT needs a central server and has a complex transform set.
- WebSocket vs SSE vs polling: bidirectional low-latency vs one-way simplicity vs universal but inefficient.
- Redux for the board vs a CRDT for everything: consistency with existing tooling vs a unified sync model.

---

## More prompts to practise
1. Design an **autocomplete/typeahead** component library (API, caching, a11y, i18n).
2. Design a **news feed** with infinite scroll, likes and comments (pagination, optimistic UI, virtualisation).
3. Design a **design system** for multiple product teams (tokens, theming, versioning, docs, visual regression).
4. **Re-architect a legacy jQuery/CRA app** incrementally (strangler pattern, a module-federation shell, migrating routes one at a time, shared auth).
5. Design an **image editor** on canvas (layers, filters in WebGL or workers, undo, export).
