// Lab 07 · ready-made tests. Don't edit.
import { expect } from 'chai';
import {
  Stack,
  Queue,
  LinkedList,
  LRUCache,
  Trie,
  MinHeap,
  Graph,
  History,
} from './data-structures.js';

// If the code under test isn't written yet (TODO) or never threw (expect.fail), show THAT error
// instead of a confusing "expected 'Error' to equal 'TimeoutError'".
function rethrowUnexpected(e) {
  if (String(e?.message).startsWith('TODO') || e?.name === 'AssertionError') throw e;
}

describe('Lab 07 · data structures', () => {
  describe('Stack', () => {
    it('is last-in, first-out', () => {
      const s = new Stack();
      expect(s.push('a')).to.equal(1);
      expect(s.push('b')).to.equal(2);
      expect(s.peek()).to.equal('b');
      expect(s.pop()).to.equal('b');
      expect(s.pop()).to.equal('a');
      expect(s.pop()).to.equal(undefined);
      expect(s.peek()).to.equal(undefined);
    });

    it('tracks size, emptiness, toArray (copy) and clear', () => {
      const s = new Stack();
      expect(s.isEmpty()).to.equal(true);
      s.push(1);
      s.push(2);
      expect(s.size).to.equal(2);
      const arr = s.toArray();
      expect(arr).to.deep.equal([1, 2]);
      arr.push(99);
      expect(s.size).to.equal(2);
      s.clear();
      expect(s.isEmpty()).to.equal(true);
      expect(s.size).to.equal(0);
    });
  });

  describe('Queue', () => {
    it('is first-in, first-out', () => {
      const q = new Queue();
      expect(q.enqueue(1)).to.equal(1);
      expect(q.enqueue(2)).to.equal(2);
      expect(q.peek()).to.equal(1);
      expect(q.dequeue()).to.equal(1);
      q.enqueue(3);
      expect(q.dequeue()).to.equal(2);
      expect(q.dequeue()).to.equal(3);
      expect(q.dequeue()).to.equal(undefined);
      expect(q.isEmpty()).to.equal(true);
    });

    it('is iterable front to back and tracks size', () => {
      const q = new Queue();
      ['a', 'b', 'c'].forEach((x) => q.enqueue(x));
      q.dequeue();
      expect([...q]).to.deep.equal(['b', 'c']);
      expect(q.size).to.equal(2);
    });

    it('does not use Array.prototype.shift and handles many operations', () => {
      const original = Array.prototype.shift;
      let out = [];
      Array.prototype.shift = () => {
        throw new Error('Array.prototype.shift is O(n); do not use it');
      };
      try {
        const q = new Queue();
        for (let i = 0; i < 10_000; i++) q.enqueue(i);
        for (let i = 0; i < 5_000; i++) out.push(q.dequeue());
        for (let i = 10_000; i < 12_000; i++) q.enqueue(i);
        while (!q.isEmpty()) out.push(q.dequeue());
      } finally {
        Array.prototype.shift = original;
      }
      expect(out.length).to.equal(12_000);
      expect(out.every((v, i) => v === i)).to.equal(true);
    });
  });

  describe('LinkedList', () => {
    it('appends, prepends and converts to an array', () => {
      const list = new LinkedList();
      list.append(2);
      list.append(3);
      list.prepend(1);
      expect(list.toArray()).to.deep.equal([1, 2, 3]);
      expect(list.size).to.equal(3);
    });

    it('is iterable and can be built from an array', () => {
      const list = LinkedList.fromArray(['x', 'y']);
      expect(list).to.be.instanceOf(LinkedList);
      expect([...list]).to.deep.equal(['x', 'y']);
    });

    it('finds values with a predicate', () => {
      const list = LinkedList.fromArray([{ id: 1 }, { id: 2 }]);
      expect(list.find((v) => v.id === 2)).to.deep.equal({ id: 2 });
      expect(list.find((v) => v.id === 3)).to.equal(undefined);
    });

    it('removes head, middle and tail correctly (tail stays valid)', () => {
      const list = LinkedList.fromArray([1, 2, 3, 4]);
      expect(list.remove(1)).to.equal(true);
      expect(list.remove(3)).to.equal(true);
      expect(list.remove(4)).to.equal(true);
      expect(list.remove(42)).to.equal(false);
      list.append(5);
      expect(list.toArray()).to.deep.equal([2, 5]);
      expect(list.size).to.equal(2);
      list.remove(2);
      list.remove(5);
      list.append(6);
      expect(list.toArray()).to.deep.equal([6]);
    });

    it('reverses in place and keeps append working', () => {
      const list = LinkedList.fromArray([1, 2, 3]);
      expect(list.reverse()).to.equal(list);
      expect(list.toArray()).to.deep.equal([3, 2, 1]);
      list.append(0);
      expect(list.toArray()).to.deep.equal([3, 2, 1, 0]);
    });
  });

  describe('LRUCache', () => {
    it('rejects capacities below 1', () => {
      expect(() => new LRUCache(0)).to.throw(RangeError);
    });

    it('stores and returns values (including falsy ones)', () => {
      const c = new LRUCache(3);
      c.set('zero', 0).set('empty', '');
      expect(c.get('zero')).to.equal(0);
      expect(c.get('empty')).to.equal('');
      expect(c.get('missing')).to.equal(undefined);
      expect(c.size).to.equal(2);
    });

    it('evicts the least recently used entry', () => {
      const evicted = [];
      const c = new LRUCache(2, { onEvict: (k, v) => evicted.push([k, v]) });
      c.set('a', 1);
      c.set('b', 2);
      c.get('a'); // a is now most recent
      c.set('c', 3); // evicts b
      expect(c.has('b')).to.equal(false);
      expect(c.keys()).to.deep.equal(['a', 'c']);
      expect(evicted).to.deep.equal([['b', 2]]);
    });

    it('set on an existing key updates it and refreshes recency', () => {
      const c = new LRUCache(2);
      c.set('a', 1);
      c.set('b', 2);
      c.set('a', 10);
      c.set('c', 3); // evicts b
      expect(c.get('a')).to.equal(10);
      expect(c.keys()).to.deep.equal(['c', 'a']);
    });

    it('has() does not refresh recency; delete() does not call onEvict', () => {
      let evictions = 0;
      const c = new LRUCache(2, { onEvict: () => evictions++ });
      c.set('a', 1);
      c.set('b', 2);
      expect(c.has('a')).to.equal(true);
      c.set('c', 3); // a was LRU → evicted
      expect(c.has('a')).to.equal(false);
      expect(c.delete('b')).to.equal(true);
      expect(c.delete('b')).to.equal(false);
      expect(evictions).to.equal(1);
      expect(c.size).to.equal(1);
    });
  });

  describe('Trie', () => {
    function build() {
      const t = new Trie();
      ['Login form', 'Logout bug', 'Landing page', 'Lighthouse audit', 'Blog'].forEach((w) => t.insert(w));
      return t;
    }

    it('checks exact words and prefixes, case-insensitively', () => {
      const t = build();
      expect(t.has('login form')).to.equal(true);
      expect(t.has('LOGIN FORM')).to.equal(true);
      expect(t.has('login')).to.equal(false);
      expect(t.startsWith('LOG')).to.equal(true);
      expect(t.startsWith('x')).to.equal(false);
      expect(t.size).to.equal(5);
    });

    it('suggests words for a prefix, alphabetically when weights tie', () => {
      const t = build();
      expect(t.suggest('lo')).to.deep.equal(['Login form', 'Logout bug']);
      expect(t.suggest('l', 2)).to.deep.equal(['Landing page', 'Lighthouse audit']);
      expect(t.suggest('zzz')).to.deep.equal([]);
    });

    it('ranks by weight and keeps the original spelling from the first insert', () => {
      const t = build();
      t.insert('LOGOUT BUG', 5);
      expect(t.size).to.equal(5);
      expect(t.suggest('lo')).to.deep.equal(['Logout bug', 'Login form']);
      expect(t.suggest('')[0]).to.equal('Logout bug');
      expect(t.suggest('', 10)).to.have.lengthOf(5);
    });

    it('deletes words and prunes empty branches', () => {
      const t = build();
      expect(t.delete('blog')).to.equal(true);
      expect(t.delete('blog')).to.equal(false);
      expect(t.has('blog')).to.equal(false);
      expect(t.startsWith('b')).to.equal(false);
      expect(t.delete('login')).to.equal(false);
      expect(t.startsWith('login')).to.equal(true);
      expect(t.size).to.equal(4);
    });
  });

  describe('MinHeap', () => {
    it('pops numbers in ascending order', () => {
      const h = new MinHeap();
      const input = [5, 3, 8, 1, 9, 2, 7, 3, 0, 6];
      input.forEach((n) => h.push(n));
      expect(h.size).to.equal(10);
      expect(h.peek()).to.equal(0);
      const out = [];
      while (h.size) out.push(h.pop());
      expect(out).to.deep.equal([...input].sort((a, b) => a - b));
      expect(h.pop()).to.equal(undefined);
      expect(h.peek()).to.equal(undefined);
    });

    it('works as a priority queue with a custom comparator', () => {
      const rank = { urgent: 0, high: 1, medium: 2, low: 3 };
      const h = new MinHeap((a, b) => rank[a.priority] - rank[b.priority] || a.createdAt - b.createdAt);
      h.push({ id: 'a', priority: 'low', createdAt: 1 });
      h.push({ id: 'b', priority: 'urgent', createdAt: 5 });
      h.push({ id: 'c', priority: 'high', createdAt: 2 });
      h.push({ id: 'd', priority: 'urgent', createdAt: 3 });
      const order = [];
      while (h.size) order.push(h.pop().id);
      expect(order).to.deep.equal(['d', 'b', 'c', 'a']);
    });

    it('handles random input', () => {
      const h = new MinHeap();
      const nums = Array.from({ length: 500 }, () => Math.floor(Math.random() * 1000));
      nums.forEach((n) => h.push(n));
      const out = [];
      while (h.size) out.push(h.pop());
      expect(out).to.deep.equal(nums.toSorted((a, b) => a - b));
    });
  });

  describe('Graph', () => {
    const isValidOrder = (order, edges) =>
      edges.every(([from, to]) => order.indexOf(from) < order.indexOf(to));

    it('adds nodes and edges', () => {
      const g = new Graph();
      g.addNode('solo');
      g.addEdge('design', 'build');
      g.addEdge('design', 'copy');
      expect(g.hasNode('build')).to.equal(true);
      expect(g.nodes()).to.deep.equal(['solo', 'design', 'build', 'copy']);
      expect(g.neighbors('design')).to.deep.equal(['build', 'copy']);
      expect(g.neighbors('build')).to.deep.equal([]);
    });

    it('finds paths', () => {
      const g = new Graph();
      g.addEdge('a', 'b');
      g.addEdge('b', 'c');
      g.addNode('d');
      expect(g.hasPath('a', 'c')).to.equal(true);
      expect(g.hasPath('c', 'a')).to.equal(false);
      expect(g.hasPath('a', 'd')).to.equal(false);
      expect(g.hasPath('d', 'd')).to.equal(true);
    });

    it('topologically sorts dependencies (including isolated nodes)', () => {
      const edges = [
        ['api', 'login'],
        ['design', 'login'],
        ['login', 'e2e'],
        ['api', 'e2e'],
        ['design', 'landing'],
      ];
      const g = new Graph();
      g.addNode('docs');
      edges.forEach(([f, t]) => g.addEdge(f, t));
      const order = g.topoSort();
      expect(order).to.have.members(['docs', 'api', 'login', 'design', 'e2e', 'landing']);
      expect(isValidOrder(order, edges)).to.equal(true);
    });

    it('detects cycles', () => {
      const g = new Graph();
      g.addEdge('a', 'b');
      g.addEdge('b', 'c');
      expect(g.wouldCreateCycle('c', 'a')).to.equal(true);
      expect(g.wouldCreateCycle('a', 'a')).to.equal(true);
      expect(g.wouldCreateCycle('a', 'c')).to.equal(false);
      expect(g.neighbors('c')).to.deep.equal([]);
      g.addEdge('c', 'a');
      try {
        g.topoSort();
        expect.fail('should throw');
      } catch (e) {
        rethrowUnexpected(e);
        expect(e.name).to.equal('CycleError');
      }
    });

    it('removes edges and nodes (including incoming edges)', () => {
      const g = new Graph();
      g.addEdge('a', 'b');
      g.addEdge('c', 'b');
      g.removeEdge('a', 'b');
      expect(g.neighbors('a')).to.deep.equal([]);
      g.removeNode('b');
      expect(g.hasNode('b')).to.equal(false);
      expect(g.neighbors('c')).to.deep.equal([]);
      expect(g.nodes()).to.deep.equal(['a', 'c']);
    });
  });

  describe('History (undo/redo)', () => {
    it('undoes and redoes', () => {
      const h = new History({ count: 0 });
      h.push({ count: 1 });
      h.push({ count: 2 });
      expect(h.present).to.deep.equal({ count: 2 });
      expect(h.undo()).to.deep.equal({ count: 1 });
      expect(h.undo()).to.deep.equal({ count: 0 });
      expect(h.canUndo).to.equal(false);
      expect(h.undo()).to.deep.equal({ count: 0 });
      expect(h.redo()).to.deep.equal({ count: 1 });
      expect(h.canRedo).to.equal(true);
    });

    it('clears the redo stack when a new state is pushed', () => {
      const h = new History('a');
      h.push('b');
      h.undo();
      h.push('c');
      expect(h.canRedo).to.equal(false);
      expect(h.redo()).to.equal('c');
      expect(h.undo()).to.equal('a');
    });

    it('limits how many past states are kept', () => {
      const h = new History(0, { limit: 3 });
      for (let i = 1; i <= 10; i++) h.push(i);
      let undos = 0;
      while (h.canUndo) {
        h.undo();
        undos += 1;
      }
      expect(undos).to.equal(3);
      expect(h.present).to.equal(7);
    });
  });
});
