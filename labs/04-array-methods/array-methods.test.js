// Lab 04 · ready-made tests. Don't edit.
import { expect } from 'chai';
import {
  myMap,
  myFilter,
  myReduce,
  countByStatus,
  groupByAssignee,
  topAssignees,
  allLabels,
  lastCompleted,
  toColumns,
  paginate,
  chunk,
  updateById,
} from './array-methods.js';

function withBuiltinDisabled(name, run) {
  const original = Array.prototype[name];
  Array.prototype[name] = () => {
    throw new Error(`built-in Array.prototype.${name} must not be used`);
  };
  try {
    return run();
  } finally {
    Array.prototype[name] = original;
  }
}

const freezeAll = (arr) => Object.freeze(arr.map((t) => Object.freeze({ ...t, labels: Object.freeze([...t.labels]) })));

const tasks = freezeAll([
  { id: 't1', title: 'Hero', status: 'todo', assigneeId: 'u1', labels: ['ui'], order: 2000, estimate: 3 },
  { id: 't2', title: 'Login', status: 'in_progress', assigneeId: 'u2', labels: ['auth', 'ui'], order: 1000, estimate: 5 },
  { id: 't3', title: 'API', status: 'done', assigneeId: 'u2', labels: ['backend'], order: 1000, estimate: 8 },
  { id: 't4', title: 'Docs', status: 'todo', assigneeId: null, labels: [], order: 1000, estimate: 1 },
  { id: 't5', title: 'Deploy', status: 'done', assigneeId: 'u3', labels: ['devops', 'backend'], order: 500, estimate: 2 },
  { id: 't6', title: 'Review PR', status: 'review', assigneeId: 'u1', labels: ['ui'], order: 1000, estimate: 5 },
  { id: 't7', title: 'Tests', status: 'todo', assigneeId: 'u3', labels: ['qa'], order: 1500, estimate: 6 },
]);

describe('Lab 04 · array methods', () => {
  describe('myMap', () => {
    it('maps values and passes (value, index, array)', () => {
      const seen = [];
      const out = myMap([10, 20], (v, i, arr) => {
        seen.push([v, i, arr.length]);
        return v * 2;
      });
      expect(out).to.deep.equal([20, 40]);
      expect(seen).to.deep.equal([
        [10, 0, 2],
        [20, 1, 2],
      ]);
    });

    it('supports thisArg', () => {
      const out = myMap(
        [1, 2],
        function (v) {
          return v * this.k;
        },
        { k: 3 },
      );
      expect(out).to.deep.equal([3, 6]);
    });

    it('preserves holes and does not call back for them', () => {
      let calls = 0;
      // eslint-disable-next-line no-sparse-arrays
      const out = myMap([1, , 3], (v) => {
        calls += 1;
        return v + 1;
      });
      expect(calls).to.equal(2);
      expect(out.length).to.equal(3);
      expect(1 in out).to.equal(false);
      expect(out[2]).to.equal(4);
    });

    it('does not use Array.prototype.map', () => {
      const out = withBuiltinDisabled('map', () => myMap([1, 2], (x) => x * 10));
      expect(out).to.deep.equal([10, 20]);
    });
  });

  describe('myFilter', () => {
    it('keeps truthy results and skips holes', () => {
      // eslint-disable-next-line no-sparse-arrays
      expect(myFilter([1, 2, , 4, 5], (v) => v % 2 === 1)).to.deep.equal([1, 5]);
    });

    it('does not use Array.prototype.filter', () => {
      const out = withBuiltinDisabled('filter', () => myFilter([1, 2], (x) => x > 1));
      expect(out).to.deep.equal([2]);
    });
  });

  describe('myReduce', () => {
    it('reduces with an initial value', () => {
      expect(myReduce([1, 2, 3], (acc, v) => acc + v, 10)).to.equal(16);
    });

    it('uses the first element when no initial value is given', () => {
      const indexes = [];
      const sum = myReduce([1, 2, 3], (acc, v, i) => {
        indexes.push(i);
        return acc + v;
      });
      expect(sum).to.equal(6);
      expect(indexes).to.deep.equal([1, 2]);
    });

    it('treats an explicit undefined as an initial value', () => {
      const out = myReduce([1], (acc, v) => [acc, v], undefined);
      expect(out).to.deep.equal([undefined, 1]);
    });

    it('throws a TypeError for an empty array with no initial value', () => {
      expect(() => myReduce([], (a, b) => a + b)).to.throw(TypeError);
      // eslint-disable-next-line no-sparse-arrays
      expect(() => myReduce([, ,], (a, b) => a + b)).to.throw(TypeError);
      expect(myReduce([], (a, b) => a + b, 0)).to.equal(0);
    });

    it('skips holes and does not use Array.prototype.reduce', () => {
      // eslint-disable-next-line no-sparse-arrays
      const out = withBuiltinDisabled('reduce', () => myReduce([, 2, , 4], (a, b) => a + b));
      expect(out).to.equal(6);
    });
  });

  describe('task data wrangling', () => {
    it('countByStatus counts every status (all keys present)', () => {
      expect(countByStatus(tasks)).to.deep.equal({ todo: 3, in_progress: 1, review: 1, done: 2 });
      expect(countByStatus([])).to.deep.equal({ todo: 0, in_progress: 0, review: 0, done: 0 });
    });

    it('groupByAssignee groups tasks, using "unassigned" for null', () => {
      const g = groupByAssignee(tasks);
      expect(Object.keys(g).sort()).to.deep.equal(['u1', 'u2', 'u3', 'unassigned']);
      expect(g.u1.map((t) => t.id)).to.deep.equal(['t1', 't6']);
      expect(g.unassigned.map((t) => t.id)).to.deep.equal(['t4']);
    });

    it('topAssignees sums estimates, sorts and limits', () => {
      expect(topAssignees(tasks, 2)).to.deep.equal([
        { assigneeId: 'u2', points: 13 },
        { assigneeId: 'u1', points: 8 },
      ]);
      expect(topAssignees(tasks, 10)).to.deep.equal([
        { assigneeId: 'u2', points: 13 },
        { assigneeId: 'u1', points: 8 },
        { assigneeId: 'u3', points: 8 },
      ]);
    });

    it('allLabels returns sorted unique labels', () => {
      expect(allLabels(tasks)).to.deep.equal(['auth', 'backend', 'devops', 'qa', 'ui']);
    });

    it('lastCompleted finds the last done task', () => {
      expect(lastCompleted(tasks).id).to.equal('t5');
      expect(lastCompleted(tasks.slice(0, 2))).to.equal(undefined);
    });

    it('toColumns builds ordered id lists for every column', () => {
      expect(toColumns(tasks)).to.deep.equal({
        todo: ['t4', 't7', 't1'],
        in_progress: ['t2'],
        review: ['t6'],
        done: ['t5', 't3'],
      });
      expect(toColumns([])).to.deep.equal({ todo: [], in_progress: [], review: [], done: [] });
    });
  });

  describe('paginate', () => {
    const items = Array.from({ length: 23 }, (_, i) => i + 1);

    it('returns the requested page', () => {
      expect(paginate(items, 1, 10)).to.deep.equal({
        items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        page: 1,
        totalPages: 3,
        hasNext: true,
      });
      expect(paginate(items, 3, 10)).to.deep.equal({
        items: [21, 22, 23],
        page: 3,
        totalPages: 3,
        hasNext: false,
      });
    });

    it('clamps out-of-range pages and handles empty input', () => {
      expect(paginate(items, 99, 10).page).to.equal(3);
      expect(paginate(items, 0, 10).page).to.equal(1);
      expect(paginate([], 1, 10)).to.deep.equal({ items: [], page: 1, totalPages: 1, hasNext: false });
    });
  });

  describe('chunk', () => {
    it('splits into fixed-size groups', () => {
      expect(chunk([1, 2, 3, 4, 5], 2)).to.deep.equal([[1, 2], [3, 4], [5]]);
      expect(chunk([], 3)).to.deep.equal([]);
    });

    it('rejects sizes below 1', () => {
      expect(() => chunk([1], 0)).to.throw(RangeError);
    });
  });

  describe('updateById (structural sharing)', () => {
    it('replaces only the matching item', () => {
      const next = updateById(tasks, 't2', { status: 'review' });
      expect(next).to.not.equal(tasks);
      expect(next[1]).to.deep.include({ id: 't2', status: 'review', title: 'Login' });
      expect(tasks[1].status).to.equal('in_progress');
      next.forEach((t, i) => {
        if (i !== 1) expect(t).to.equal(tasks[i]);
      });
    });

    it('returns the same array when nothing matches', () => {
      expect(updateById(tasks, 'nope', { status: 'done' })).to.equal(tasks);
    });
  });
});
