// Lab 01 · ready-made tests. Don't edit. Make them pass by changing closures.js.
import { expect } from 'chai';
import {
  createCounter,
  once,
  memoize,
  createMultipliers,
  createIdGenerator,
  predictions,
} from './closures.js';

describe('Lab 01 · scope & closures', () => {
  describe('createCounter', () => {
    it('starts at 0 and increments by 1 by default', () => {
      const c = createCounter();
      expect(c.value).to.equal(0);
      expect(c.increment()).to.equal(1);
      expect(c.increment()).to.equal(2);
      expect(c.value).to.equal(2);
    });

    it('supports a custom start and step, and decrement()', () => {
      const c = createCounter(10, 5);
      expect(c.increment()).to.equal(15);
      expect(c.decrement()).to.equal(10);
      expect(c.decrement()).to.equal(5);
      expect(c.value).to.equal(5);
    });

    it('reset() returns to the start value', () => {
      const c = createCounter(7);
      c.increment();
      c.increment();
      expect(c.reset()).to.equal(7);
      expect(c.value).to.equal(7);
    });

    it('keeps the count private and value read-only', () => {
      const c = createCounter(3);
      expect(Object.keys(c)).to.not.include('count');
      expect(() => {
        c.value = 100;
      }).to.throw(TypeError);
      expect(c.value).to.equal(3);
    });

    it('creates independent counters', () => {
      const a = createCounter();
      const b = createCounter();
      a.increment();
      a.increment();
      b.increment();
      expect(a.value).to.equal(2);
      expect(b.value).to.equal(1);
    });
  });

  describe('once', () => {
    it('calls the function only once and returns the first result', () => {
      let calls = 0;
      const init = once((x) => {
        calls += 1;
        return x * 2;
      });
      expect(init(2)).to.equal(4);
      expect(init(50)).to.equal(4);
      expect(init()).to.equal(4);
      expect(calls).to.equal(1);
    });

    it('forwards all arguments and `this`', () => {
      const obj = {
        base: 10,
        add: once(function (a, b) {
          return this.base + a + b;
        }),
      };
      expect(obj.add(1, 2)).to.equal(13);
    });

    it('caches undefined results too (does not call again)', () => {
      let calls = 0;
      const f = once(() => {
        calls += 1;
      });
      f();
      f();
      expect(calls).to.equal(1);
    });
  });

  describe('memoize', () => {
    it('computes once per distinct argument list', () => {
      let calls = 0;
      const slowAdd = memoize((a, b) => {
        calls += 1;
        return a + b;
      });
      expect(slowAdd(1, 2)).to.equal(3);
      expect(slowAdd(1, 2)).to.equal(3);
      expect(slowAdd(2, 1)).to.equal(3);
      expect(calls).to.equal(2);
    });

    it('caches falsy results', () => {
      let calls = 0;
      const isZero = memoize((n) => {
        calls += 1;
        return n === 0 ? 0 : false;
      });
      isZero(5);
      isZero(5);
      isZero(0);
      isZero(0);
      expect(calls).to.equal(2);
    });

    it('uses the resolver to build the cache key', () => {
      let calls = 0;
      const byId = memoize(
        (user) => {
          calls += 1;
          return user.name.toUpperCase();
        },
        (user) => user.id,
      );
      expect(byId({ id: 1, name: 'asha' })).to.equal('ASHA');
      expect(byId({ id: 1, name: 'ignored' })).to.equal('ASHA');
      expect(calls).to.equal(1);
    });

    it('exposes the cache as a Map and a clear() method', () => {
      let calls = 0;
      const sq = memoize((n) => {
        calls += 1;
        return n * n;
      });
      sq(3);
      sq(4);
      expect(sq.cache).to.be.instanceOf(Map);
      expect(sq.cache.size).to.equal(2);
      sq.clear();
      expect(sq.cache.size).to.equal(0);
      sq(3);
      expect(calls).to.equal(3);
    });

    it('forwards `this`', () => {
      const obj = {
        factor: 3,
        times: memoize(function (n) {
          return n * this.factor;
        }),
      };
      expect(obj.times(2)).to.equal(6);
    });
  });

  describe('createMultipliers', () => {
    it('returns n functions, each capturing its own index', () => {
      const fns = createMultipliers(4);
      expect(fns).to.have.lengthOf(4);
      expect(fns.map((f) => f(10))).to.deep.equal([0, 10, 20, 30]);
    });
  });

  describe('createIdGenerator', () => {
    it('generates zero-padded, incrementing ids', () => {
      const gen = createIdGenerator('t');
      expect(gen.next()).to.equal('t_001');
      expect(gen.next()).to.equal('t_002');
    });

    it('supports a custom width and reset()', () => {
      const gen = createIdGenerator('p', 5);
      gen.next();
      expect(gen.next()).to.equal('p_00002');
      gen.reset();
      expect(gen.next()).to.equal('p_00001');
    });

    it('keeps generators independent', () => {
      const a = createIdGenerator('a');
      const b = createIdGenerator('b');
      a.next();
      a.next();
      expect(b.next()).to.equal('b_001');
      expect(a.next()).to.equal('a_003');
    });
  });

  describe('predict the output (fill in `predictions`)', () => {
    /* eslint-disable */
    const snippets = {
      q1() {
        const out = [];
        for (var i = 0; i < 3; i++) out.push(() => i);
        return out.map((f) => f());
      },
      q2() {
        const out = [];
        for (let i = 0; i < 3; i++) out.push(() => i);
        return out.map((f) => f());
      },
      q3() {
        const log = [];
        log.push(typeof a);
        log.push(typeof fnDecl);
        log.push(typeof fnExpr);
        var a = 1;
        function fnDecl() {}
        var fnExpr = function () {};
        return log;
      },
      q4() {
        try {
          x;
          return 'no error';
        } catch (e) {
          return e.name;
        }
        let x = 1;
      },
      q5() {
        let count = 0;
        const inc = () => ++count;
        {
          let count = 10;
          inc();
          count++;
        }
        return count;
      },
      q6() {
        const counter = (function () {
          let c = 0;
          return { inc: () => ++c, get: () => c };
        })();
        counter.inc();
        counter.inc();
        const { get } = counter;
        return [get(), typeof c];
      },
    };
    /* eslint-enable */

    for (const key of Object.keys(snippets)) {
      it(`${key} is predicted correctly`, () => {
        expect(predictions[key], `fill in predictions.${key}`).to.not.equal(undefined);
        expect(predictions[key]).to.deep.equal(snippets[key]());
      });
    }
  });
});
