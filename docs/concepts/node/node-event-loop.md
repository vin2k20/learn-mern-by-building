# The Node.js event loop & runtime

> **TL;DR:** Node is a single JS thread on **libuv**. I/O is non-blocking (the OS does the work, and callbacks come back through the loop).
> CPU-heavy work blocks every request, so offload it to worker threads or other services.

## Phases (one loop iteration)
```
   ┌───────────────────────────┐
┌─►│ timers                    │ setTimeout / setInterval callbacks whose time has come
│  ├───────────────────────────┤
│  │ pending callbacks         │ some deferred system callbacks
│  ├───────────────────────────┤
│  │ poll                      │ wait for I/O; run I/O callbacks (fs, net)
│  ├───────────────────────────┤
│  │ check                     │ setImmediate callbacks
│  ├───────────────────────────┤
└──┤ close callbacks           │ socket.on('close')
   └───────────────────────────┘
Between each callback: process.nextTick queue first, then the promise microtasks.
```
- `process.nextTick` runs **before** promise microtasks. Overusing it can starve I/O.
- `setImmediate` vs `setTimeout(fn, 0)`: inside an I/O callback, setImmediate always runs first.
- The libuv **thread pool** (default size 4) handles fs, dns.lookup, crypto (e.g. `bcrypt`-style hashing) and zlib.

## Blocking examples
`JSON.parse` of huge payloads, synchronous crypto or fs (`readFileSync` in request handlers), regex backtracking (ReDoS), big loops.
Fixes: streaming, `worker_threads`, queues (BullMQ), and pagination.

## Node 24 LTS niceties
`node --watch` · `node --env-file=.env` · `node --test` (a built-in runner) · global `fetch`/`WebSocket` · `node:sqlite` (release candidate in 24; stable in 26) ·
TypeScript type stripping · `import.meta.dirname` · the permission model (`--permission`).

## Graceful shutdown
```js
process.on('SIGTERM', async () => {
  server.close();                // stop accepting new connections
  await mongoose.disconnect();   // finish and close resources
  process.exit(0);
});
```

## 🎤 Interview questions
<details><summary>How does Node handle 10k concurrent connections on one thread?</summary>
Non-blocking I/O: the thread only runs callbacks when data is ready (epoll/kqueue), so it never waits idle on a single socket. Throughput is limited by CPU work per request, not by the connection count.
</details>
