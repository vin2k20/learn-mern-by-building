# MongoDB & Mongoose 9 modelling

> **TL;DR:** MongoDB stores **documents** (BSON) in collections. Model your data around **how it's read**: embed what's read together,
> reference what's shared or unbounded. Mongoose adds schemas, validation, middleware and a query API.

## Schema example (the shape of Kanvas' Task model)
```js
const taskSchema = new Schema({
  project:   { type: Schema.Types.ObjectId, ref: 'Project', required: true, index: true },
  title:     { type: String, required: true, trim: true, maxlength: 120 },
  status:    { type: String, enum: ['todo', 'in_progress', 'review', 'done'], default: 'todo' },
  order:     { type: Number, required: true },
  assignee:  { type: Schema.Types.ObjectId, ref: 'User', default: null },
  labels:    [{ type: String, trim: true }],
  dependsOn: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
}, { timestamps: true });
taskSchema.index({ project: 1, status: 1, order: 1 });   // a compound index for board queries
```

## Embed vs reference
| Embed | Reference |
|---|---|
| read together, bounded size (labels, a drawing's shapes) | shared or unbounded (tasks of a project, activity) |
| atomic updates on one document | needs `populate` or `$lookup`, or several queries |
| 16 MB document limit | independent lifecycles |

## Mongoose 9 notes (breaking changes to know)
- **Pre middleware no longer receives `next()`**: write `schema.pre('save', async function () { … })`.
- Use `returnDocument: 'after'` instead of `new: true` in `findOneAndUpdate`.
- Update pipelines are disallowed unless `updatePipeline: true`.
- `isValidObjectId(6)` → false. Node ≥ 20.19.

## Useful APIs
`Model.find(filter).select().sort().limit().lean()` · `findById` · `create` · `findOneAndUpdate(filter, update, { returnDocument: 'after', runValidators: true })` ·
`deleteOne` · `countDocuments` · `populate('assignee', 'name avatarColor')` · `aggregate([...])` · `bulkWrite` ·
`toJSON` transforms (map `_id` → `id`, drop `__v` and `passwordHash`) · `session.withTransaction()` (needs a replica set).

## Aggregation (the dashboard)
```js
Task.aggregate([
  { $match: { project: projectId } },
  { $group: { _id: '$status', count: { $sum: 1 }, points: { $sum: '$estimate' } } },
]);
```

## Indexes & performance
Index the fields you filter and sort on (the **ESR rule**: Equality, Sort, Range). Check with `.explain('executionStats')`.
Use `lean()` for read-only queries. Avoid unbounded arrays. Use cursor pagination on `(createdAt, _id)`.

## 🎤 Interview questions
<details><summary>SQL vs MongoDB for this app?</summary>
Both work. Relational integrity (tasks ↔ projects ↔ users) favours SQL. Flexible documents (drawings, shapes) and a fast start favour MongoDB. Name the trade-offs: joins vs embedding, transactions, schema evolution.
</details>

## Practise in Kanvas
`server/src/models/*` · `server/src/graphql/resolvers.js`
