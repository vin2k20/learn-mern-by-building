// Lab 06 · ready-made tests. Don't edit.
import { expect } from 'chai';
import sinon from 'sinon';
import {
  debounce,
  throttle,
  curry,
  compose,
  pipe,
  deepClone,
  deepEqual,
  get,
  setIn,
  flattenObject,
} from './functional.js';

describe('Lab 06 · functional utilities', () => {
  describe('with fake timers', () => {
    let clock;
    beforeEach(() => {
      clock = sinon.useFakeTimers({ now: 1_750_000_000_000 });
    });
    afterEach(() => clock.restore());

    describe('debounce', () => {
      it('trailing (default): calls once, wait ms after the last call, with the last args', () => {
        const spy = sinon.spy();
        const d = debounce(spy, 100);
        d('a');
        clock.tick(50);
        d('b');
        clock.tick(50);
        d('c');
        clock.tick(99);
        expect(spy.callCount).to.equal(0);
        clock.tick(1);
        expect(spy.callCount).to.equal(1);
        expect(spy.firstCall.args).to.deep.equal(['c']);
      });

      it('keeps `this`', () => {
        const obj = {
          name: 'search',
          run: debounce(function () {
            obj.seen = this.name;
          }, 10),
        };
        obj.run();
        clock.tick(10);
        expect(obj.seen).to.equal('search');
      });

      it('leading only: fires immediately, then ignores calls until quiet', () => {
        const spy = sinon.spy();
        const d = debounce(spy, 100, { leading: true, trailing: false });
        d(1);
        expect(spy.callCount).to.equal(1);
        clock.tick(50);
        d(2);
        clock.tick(150);
        expect(spy.callCount).to.equal(1);
        d(3);
        expect(spy.callCount).to.equal(2);
        expect(spy.secondCall.args).to.deep.equal([3]);
      });

      it('leading + trailing: fires on both edges only when there were extra calls', () => {
        const spy = sinon.spy();
        const d = debounce(spy, 100, { leading: true, trailing: true });
        d('x');
        clock.tick(200);
        expect(spy.callCount).to.equal(1);

        d('first');
        clock.tick(50);
        d('second');
        clock.tick(100);
        expect(spy.callCount).to.equal(3);
        expect(spy.thirdCall.args).to.deep.equal(['second']);
      });

      it('cancel() drops the pending call', () => {
        const spy = sinon.spy();
        const d = debounce(spy, 100);
        d();
        d.cancel();
        clock.tick(500);
        expect(spy.callCount).to.equal(0);
      });

      it('flush() runs the pending call immediately (and only once)', () => {
        const spy = sinon.spy();
        const d = debounce(spy, 100);
        d('now');
        d.flush();
        expect(spy.callCount).to.equal(1);
        expect(spy.firstCall.args).to.deep.equal(['now']);
        clock.tick(500);
        expect(spy.callCount).to.equal(1);
        d.flush();
        expect(spy.callCount).to.equal(1);
      });
    });

    describe('throttle', () => {
      it('calls immediately, then once at the end of the window with the latest args', () => {
        const spy = sinon.spy();
        const t = throttle(spy, 100);
        t(0);
        expect(spy.callCount).to.equal(1);
        for (let i = 1; i < 10; i++) {
          clock.tick(10);
          t(i);
        }
        expect(spy.callCount).to.equal(1);
        clock.tick(10); // t = 100
        expect(spy.callCount).to.equal(2);
        expect(spy.secondCall.args).to.deep.equal([9]);
      });

      it('is idle again after a quiet period', () => {
        const spy = sinon.spy();
        const t = throttle(spy, 100);
        t('a');
        clock.tick(500);
        t('b');
        expect(spy.callCount).to.equal(2);
        expect(spy.secondCall.args).to.deep.equal(['b']);
      });

      it('never exceeds one call per window under continuous input', () => {
        const spy = sinon.spy();
        const t = throttle(spy, 100);
        for (let i = 0; i < 100; i++) {
          t(i);
          clock.tick(10);
        }
        clock.tick(200);
        expect(spy.callCount).to.be.within(10, 11);
      });

      it('keeps `this` and supports cancel()', () => {
        const spy = sinon.spy();
        const ctx = { id: 1 };
        const t = throttle(spy, 100);
        t.call(ctx, 'a');
        t.call(ctx, 'b');
        t.cancel();
        clock.tick(300);
        expect(spy.callCount).to.equal(1);
        expect(spy.firstCall.thisValue).to.equal(ctx);
      });
    });
  });

  describe('curry', () => {
    const add3 = (a, b, c) => a + b + c;

    it('supports every grouping of arguments', () => {
      const c = curry(add3);
      expect(c(1)(2)(3)).to.equal(6);
      expect(c(1, 2)(3)).to.equal(6);
      expect(c(1)(2, 3)).to.equal(6);
      expect(c(1, 2, 3)).to.equal(6);
    });

    it('returns independent partial functions', () => {
      const c = curry(add3);
      const plus10 = c(10);
      expect(plus10(1)(1)).to.equal(12);
      expect(plus10(2, 2)).to.equal(14);
    });
  });

  describe('compose / pipe', () => {
    const inc = (x) => x + 1;
    const dbl = (x) => x * 2;

    it('compose runs right-to-left', () => {
      expect(compose(inc, dbl)(5)).to.equal(11);
    });

    it('pipe runs left-to-right and the first fn can take many args', () => {
      expect(pipe(inc, dbl)(5)).to.equal(12);
      expect(pipe((a, b) => a + b, dbl)(2, 3)).to.equal(10);
      expect(compose(dbl, (a, b) => a * b)(2, 3)).to.equal(12);
    });

    it('returns identity with no functions', () => {
      expect(compose()(7)).to.equal(7);
      expect(pipe()('x')).to.equal('x');
    });
  });

  describe('deepClone', () => {
    function withoutStructuredClone(run) {
      const saved = globalThis.structuredClone;
      const savedParse = JSON.parse;
      globalThis.structuredClone = () => {
        throw new Error('structuredClone must not be used');
      };
      JSON.parse = () => {
        throw new Error('JSON.parse must not be used');
      };
      try {
        return run();
      } finally {
        globalThis.structuredClone = saved;
        JSON.parse = savedParse;
      }
    }

    it('deeply copies objects and arrays', () => {
      const src = { a: 1, nested: { list: [1, { b: 2 }] } };
      const copy = withoutStructuredClone(() => deepClone(src));
      expect(copy).to.deep.equal(src);
      expect(copy).to.not.equal(src);
      expect(copy.nested).to.not.equal(src.nested);
      expect(copy.nested.list[1]).to.not.equal(src.nested.list[1]);
    });

    it('copies Date, RegExp, Map and Set', () => {
      const src = {
        when: new Date('2026-09-17T00:00:00Z'),
        re: /ab+c/gi,
        map: new Map([['k', { v: 1 }]]),
        set: new Set([1, 2]),
      };
      const copy = withoutStructuredClone(() => deepClone(src));
      expect(copy.when).to.be.instanceOf(Date);
      expect(copy.when).to.not.equal(src.when);
      expect(copy.when.getTime()).to.equal(src.when.getTime());
      expect(copy.re).to.be.instanceOf(RegExp);
      expect(copy.re.source).to.equal('ab+c');
      expect(copy.re.flags).to.equal('gi');
      expect(copy.map).to.be.instanceOf(Map);
      expect(copy.map.get('k')).to.deep.equal({ v: 1 });
      expect(copy.map.get('k')).to.not.equal(src.map.get('k'));
      expect([...copy.set]).to.deep.equal([1, 2]);
      expect(copy.set).to.not.equal(src.set);
    });

    it('handles circular references', () => {
      const src = { name: 'root' };
      src.self = src;
      src.children = [{ parent: src }];
      const copy = withoutStructuredClone(() => deepClone(src));
      expect(copy.self).to.equal(copy);
      expect(copy.children[0].parent).to.equal(copy);
      expect(copy).to.not.equal(src);
    });

    it('keeps class prototypes and function references', () => {
      class Point {
        constructor(x) {
          this.x = x;
        }
        double() {
          return this.x * 2;
        }
      }
      const fn = () => 1;
      const copy = withoutStructuredClone(() => deepClone({ p: new Point(2), fn }));
      expect(copy.p).to.be.instanceOf(Point);
      expect(copy.p.double()).to.equal(4);
      expect(copy.fn).to.equal(fn);
    });

    it('returns primitives as they are', () => {
      expect(deepClone(5)).to.equal(5);
      expect(deepClone(null)).to.equal(null);
      expect(deepClone('s')).to.equal('s');
    });
  });

  describe('deepEqual', () => {
    it('compares primitives with SameValueZero', () => {
      expect(deepEqual(1, 1)).to.equal(true);
      expect(deepEqual(NaN, NaN)).to.equal(true);
      expect(deepEqual(0, -0)).to.equal(true);
      expect(deepEqual(1, '1')).to.equal(false);
      expect(deepEqual(null, undefined)).to.equal(false);
    });

    it('compares objects and arrays structurally', () => {
      expect(deepEqual({ a: [1, { b: 2 }], c: 3 }, { c: 3, a: [1, { b: 2 }] })).to.equal(true);
      expect(deepEqual({ a: 1 }, { a: 1, b: undefined })).to.equal(false);
      expect(deepEqual([1, 2], [2, 1])).to.equal(false);
      expect(deepEqual([1], { 0: 1, length: 1 })).to.equal(false);
    });

    it('compares Dates, RegExps, Maps and Sets', () => {
      expect(deepEqual(new Date(5), new Date(5))).to.equal(true);
      expect(deepEqual(new Date(5), new Date(6))).to.equal(false);
      expect(deepEqual(/a/g, /a/g)).to.equal(true);
      expect(deepEqual(/a/g, /a/i)).to.equal(false);
      expect(deepEqual(new Map([['a', { x: 1 }]]), new Map([['a', { x: 1 }]]))).to.equal(true);
      expect(deepEqual(new Map([['a', 1]]), new Map([['a', 2]]))).to.equal(false);
      expect(deepEqual(new Set([1, 2]), new Set([2, 1]))).to.equal(true);
      expect(deepEqual(new Set([1]), new Set([2]))).to.equal(false);
    });

    it('treats different prototypes as different', () => {
      class A {}
      expect(deepEqual(new A(), {})).to.equal(false);
    });
  });

  describe('get', () => {
    const data = { a: { b: [{ c: 'deep' }, null] }, zero: 0 };

    it('reads by string or array path', () => {
      expect(get(data, 'a.b[0].c')).to.equal('deep');
      expect(get(data, ['a', 'b', 0, 'c'])).to.equal('deep');
      expect(get(data, 'zero', 5)).to.equal(0);
    });

    it('returns the default for missing paths', () => {
      expect(get(data, 'a.x.y', 'fallback')).to.equal('fallback');
      expect(get(data, 'a.b[1].c', 'fallback')).to.equal('fallback');
      expect(get(undefined, 'a')).to.equal(undefined);
    });
  });

  describe('setIn', () => {
    it('sets a nested value immutably with structural sharing', () => {
      const src = Object.freeze({
        user: Object.freeze({ name: 'A', prefs: Object.freeze({ theme: 'light' }) }),
        other: Object.freeze({ keep: true }),
      });
      const next = setIn(src, 'user.prefs.theme', 'dark');
      expect(next.user.prefs.theme).to.equal('dark');
      expect(src.user.prefs.theme).to.equal('light');
      expect(next).to.not.equal(src);
      expect(next.user).to.not.equal(src.user);
      expect(next.other).to.equal(src.other);
    });

    it('creates missing containers (arrays for numeric keys)', () => {
      const next = setIn({}, 'list[0].title', 'hello');
      expect(Array.isArray(next.list)).to.equal(true);
      expect(next).to.deep.equal({ list: [{ title: 'hello' }] });
    });

    it('updates array items by index without mutating', () => {
      const src = Object.freeze({ items: Object.freeze([1, 2, 3]) });
      const next = setIn(src, ['items', 1], 20);
      expect(next.items).to.deep.equal([1, 20, 3]);
      expect(Array.isArray(next.items)).to.equal(true);
      expect(src.items).to.deep.equal([1, 2, 3]);
    });
  });

  describe('flattenObject', () => {
    it('flattens nested objects and arrays into dotted keys', () => {
      expect(flattenObject({ a: { b: 1, c: [2, 3] }, d: null, e: {}, f: [] })).to.deep.equal({
        'a.b': 1,
        'a.c.0': 2,
        'a.c.1': 3,
        d: null,
        e: {},
        f: [],
      });
    });
  });
});
