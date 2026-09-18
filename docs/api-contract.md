# Kanvas API contract

This is the **single source of truth** for API shapes. Both the MSW mock (`client/src/mocks/handlers.js`, Day 4)
and the Express server (`server/src/routes/*`, Day 7) must follow it, so the client never notices the swap.

- Base URL: `/api` (REST) and `/graphql` (GraphQL). In dev, Vite proxies both to `http://localhost:4000` once the server exists.
- Content type: `application/json; charset=utf-8`.
- IDs: strings. The mock uses `"t_001"` style IDs; MongoDB uses ObjectId strings. **The client must not care which.**
- Dates: ISO-8601 strings in UTC (`"2026-09-17T10:15:00.000Z"`).
- **Demo login:** any seeded user's email with password **`kanvas123`** (e.g. `demo@kanvas.dev`).

---

## 1. Data model

```ts
// Types written in TypeScript notation for clarity only. The project itself is JavaScript.
type User = {
  id: string; name: string; email: string;
  role: 'admin' | 'member';
  avatarColor: string;           // hex, used for the initials avatar
};

type Project = {
  id: string; name: string; description: string;
  color: string;                 // hex accent colour
  ownerId: string; memberIds: string[];
  createdAt: string; updatedAt: string;
  taskCount?: number;            // included in list responses
};

type TaskStatus = 'todo' | 'in_progress' | 'review' | 'done';
type Priority   = 'low' | 'medium' | 'high' | 'urgent';

type Task = {
  id: string; projectId: string;
  title: string; description: string;
  status: TaskStatus; priority: Priority;
  assigneeId: string | null;
  labels: string[];
  order: number;                 // position inside its column (fractional indexing, see §4)
  estimate: number;              // story points
  dependsOn: string[];           // task ids that must be done first
  dueDate: string | null;
  createdAt: string; updatedAt: string; completedAt: string | null;
};

type Comment  = { id: string; taskId: string; authorId: string; body: string; createdAt: string };

type Activity = {
  id: string; projectId: string; actorId: string;
  type: 'project.created' | 'task.created' | 'task.updated' | 'task.moved' | 'comment.added';
  message: string;               // human readable, e.g. "Asha moved “Login form” to Review"
  taskId: string | null;
  createdAt: string;
};

type Shape = {
  id: string;
  type: 'pen' | 'line' | 'rect' | 'ellipse';
  points?: [number, number][];   // pen strokes
  x?: number; y?: number; w?: number; h?: number;   // line/rect/ellipse
  stroke: string; fill: string | null; strokeWidth: number;
};

type Drawing = { id: string; projectId: string; shapes: Shape[]; updatedAt: string };
```

---

## 2. Envelope & errors

**Success:** `{ "data": <payload> }` (plus `nextCursor` for paginated lists).
**No content:** `204` with an empty body.

**Error:** always this shape:
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Title is required",
    "details": [{ "path": "title", "message": "Required" }]
  }
}
```

| Status | `code` | When |
|---|---|---|
| 400 | `VALIDATION_ERROR` | Body or query fails schema validation |
| 401 | `UNAUTHENTICATED` | Missing, invalid or expired token; wrong credentials |
| 403 | `FORBIDDEN` | Not a member of the project |
| 404 | `NOT_FOUND` | Unknown id or route |
| 409 | `CONFLICT` | Duplicate email / project name |
| 422 | `BLOCKED_BY_DEPENDENCY` | Moving a task to `done` while a `dependsOn` task isn't done |
| 429 | `RATE_LIMITED` | Too many requests (send a `Retry-After` header) |
| 500 | `INTERNAL` | Anything unexpected (never leak stack traces) |

**Auth:** `Authorization: Bearer <jwt>` on every route except `POST /api/auth/login`, `POST /api/auth/register` and `POST /api/metrics`.
The token payload is `{ sub: userId, role }`, and it expires after 1 h.

---

## 3. REST endpoints

### Auth
| Method & path | Body | Response |
|---|---|---|
| `POST /api/auth/login` | `{ email, password }` | `200 { data: { token, user } }` · `401` |
| `POST /api/auth/register` ☆ | `{ name, email, password }` (password ≥ 8 chars) | `201 { data: { token, user } }` · `409` |
| `GET /api/auth/me` | none | `200 { data: user }` · `401` |

### Users
| `GET /api/users` | none | `200 { data: User[] }` |
|---|---|---|

### Projects
| Method & path | Body / query | Response |
|---|---|---|
| `GET /api/projects?search=kan` | `search` optional, case-insensitive match on name | `200 { data: Project[] }` (with `taskCount`), newest first |
| `POST /api/projects` | `{ name (2–60), description?, color? }` | `201 { data: Project }` · `400` · `409` |
| `GET /api/projects/:projectId` | none | `200 { data: Project }` · `404` |
| `PATCH /api/projects/:projectId` ☆ | any of `name, description, color` | `200 { data: Project }` |
| `DELETE /api/projects/:projectId` ☆ | none | `204` (also deletes its tasks) |

### Tasks
| Method & path | Body | Response |
|---|---|---|
| `GET /api/projects/:projectId/tasks` | none | `200 { data: Task[] }` sorted by `status`, then `order` |
| `POST /api/projects/:projectId/tasks` | `{ title (1–120), status?='todo', priority?='medium', assigneeId?, labels?, estimate?, dueDate? }` | `201 { data: Task }` (placed at the **end** of its column) |
| `GET /api/tasks/:taskId` | none | `200 { data: Task }` |
| `PATCH /api/tasks/:taskId` | any of `title, description, priority, assigneeId, labels, estimate, dueDate, dependsOn` | `200 { data: Task }` · `400` if `dependsOn` would create a **cycle** |
| `PATCH /api/tasks/:taskId/move` | `{ status, order }` | `200 { data: Task }` · `422 BLOCKED_BY_DEPENDENCY` |
| `DELETE /api/tasks/:taskId` | none | `204` |
| `GET /api/tasks/:taskId/comments` ☆ | none | `200 { data: Comment[] }` oldest first |
| `POST /api/tasks/:taskId/comments` ☆ | `{ body (1–2000) }` | `201 { data: Comment }` |

Side effects: creating, updating or moving a task, or adding a comment, **writes an Activity row**.

### Activity (cursor pagination)
`GET /api/projects/:projectId/activity?limit=50&cursor=<opaque>`
```json
{ "data": [ /* Activity, newest first */ ], "nextCursor": "MjAyNi0wOS0xN1QxMDoxNTowMC4wMDBafGFfMDQy" }
```
- `limit`: 1–100, default 50. `nextCursor` is `null` on the last page.
- The cursor is opaque to the client. The server encodes `base64("<createdAt>|<id>")` and queries
  `createdAt < c.createdAt OR (createdAt == c.createdAt AND id < c.id)`.
- Why a cursor instead of `?page=`? Rows stay stable while new activity is being inserted (an interview favourite).

### Drawings
| `GET /api/projects/:projectId/drawing` | none | `200 { data: Drawing }` (an empty `shapes` array if none exists yet) |
|---|---|---|
| `PUT /api/projects/:projectId/drawing` | `{ shapes: Shape[] }` (max 5,000 shapes) | `200 { data: Drawing }` |

### Metrics
| `POST /api/metrics` | `{ name: 'LCP'|'INP'|'CLS'|'FCP'|'TTFB', value, rating, id, path }` | `204` (fire-and-forget; the client uses `navigator.sendBeacon`) |
|---|---|---|

---

## 4. Ordering tasks (fractional indexing)
Each task has a numeric `order`. To move a task between tasks A and B, the client sends
`order = (A.order + B.order) / 2`. Top of the column: `first.order - 1`. Bottom: `last.order + 1`. Empty column: `1000`.
This means **one** row update per move instead of re-numbering the whole column.
*Interview follow-up:* what happens after many moves between the same two items? (Floating-point precision runs out,
so you need an occasional re-balance, or string-based fractional keys like `LexoRank`.)

---

## 5. Mock-only behaviour (MSW)
To practise loading and error states, the mock API:
- adds a random **300–800 ms** delay to every request,
- fails `PATCH /api/tasks/:taskId/move` with a `500` about **10 %** of the time (to exercise optimistic-update rollback),
- generates **10,000** activity rows deterministically for the first project,
- stores state in memory, so a page reload resets it (☆ persist to `localStorage`).

---

## 6. GraphQL (`POST /graphql`)
REST handles the CRUD. GraphQL powers the **dashboard**, where one screen needs data from several resources in one round trip.

```graphql
enum TaskStatus { TODO IN_PROGRESS REVIEW DONE }    # REST uses 'in_progress' etc. The resolver maps between them.

type User    { id: ID!, name: String!, email: String!, avatarColor: String! }
type Task    { id: ID!, title: String!, status: TaskStatus!, priority: String!, estimate: Int!, assignee: User }
type Project {
  id: ID!, name: String!, color: String!
  members: [User!]!
  tasks(status: TaskStatus): [Task!]!
}

type Totals         { tasks: Int!, done: Int!, overdue: Int!, points: Int!, pointsDone: Int! }
type StatusCount    { status: TaskStatus!, count: Int!, points: Int! }
type AssigneeCount  { user: User, count: Int! }          # user is null for unassigned tasks
type BurndownPoint  { date: String!, remaining: Int! }   # remaining story points at the end of that day

type Dashboard {
  project: Project!
  totals: Totals!
  tasksByStatus: [StatusCount!]!
  tasksByAssignee: [AssigneeCount!]!
  burndown(days: Int = 14): [BurndownPoint!]!
}

type Query {
  me: User
  project(id: ID!): Project
  dashboard(projectId: ID!): Dashboard!
}

type Mutation {                                           # ☆
  renameTask(id: ID!, title: String!): Task!
}
```

**Example request** (the client's `dashboardQueries.js`):
```graphql
query Dashboard($projectId: ID!) {
  dashboard(projectId: $projectId) {
    project { id name color }
    totals { tasks done overdue points pointsDone }
    tasksByStatus { status count points }
    tasksByAssignee { user { id name avatarColor } count }
    burndown(days: 14) { date remaining }
  }
}
```

**HTTP shape:** `POST /graphql` with body `{ "query": "...", "variables": { "projectId": "p_001" } }`.
The response is `{ "data": {...} }` or `{ "errors": [{ "message", "path", "extensions": { "code" } }] }`, **still with HTTP 200**
for resolver errors. That's an important difference from REST: your client must check `errors`.
