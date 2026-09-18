// Lab 02 · ready-made tests. Don't edit.
import { expect } from 'chai';
import {
  myCall,
  myApply,
  myBind,
  installPolyfills,
  Toggle,
  predictions,
} from './this-bind.js';

function withNativeBindingDisabled(run) {
  const { call, apply, bind } = Function.prototype;
  const boom = function () {
    throw new Error('native call/apply/bind must not be used');
  };
  Function.prototype.call = boom;
  Function.prototype.apply = boom;
  Function.prototype.bind = boom;
  try {
    return run();
  } finally {
    Function.prototype.call = call;
    Function.prototype.apply = apply;
    Function.prototype.bind = bind;
  }
}

describe('Lab 02 · this, call, apply, bind', () => {
  describe('myCall', () => {
    it('invokes fn with the given this and arguments', () => {
      const ctx = { base: 10 };
      const result = myCall(
        function (a, b) {
          return this.base + a + b;
        },
        ctx,
        1,
        2,
      );
      expect(result).to.equal(13);
    });

    it('does not use native call/apply/bind', () => {
      const result = withNativeBindingDisabled(() =>
        myCall(
          function (x) {
            return this.v + x;
          },
          { v: 1 },
          2,
        ),
      );
      expect(result).to.equal(3);
    });

    it('falls back to globalThis for null/undefined thisArg', () => {
      const fn = function () {
        return this;
      };
      expect(myCall(fn, null)).to.equal(globalThis);
      expect(myCall(fn, undefined)).to.equal(globalThis);
    });

    it('leaves no trace on the context object, even if fn throws', () => {
      const ctx = { fn: 'keep me' };
      myCall(function () {}, ctx);
      expect(() =>
        myCall(
          function () {
            throw new Error('x');
          },
          ctx,
        ),
      ).to.throw('x');
      expect(Object.getOwnPropertySymbols(ctx)).to.have.lengthOf(0);
      expect(Object.keys(ctx)).to.deep.equal(['fn']);
      expect(ctx.fn).to.equal('keep me');
    });

    it('works with primitive thisArg', () => {
      const result = myCall(function () {
        return this.toFixed(1);
      }, 5);
      expect(result).to.equal('5.0');
    });
  });

  describe('myApply', () => {
    it('passes arguments from an array', () => {
      const result = myApply(
        function (...nums) {
          return this.prefix + nums.join('-');
        },
        { prefix: '#' },
        [1, 2, 3],
      );
      expect(result).to.equal('#1-2-3');
    });

    it('handles a missing args array', () => {
      expect(
        myApply(function (...args) {
          return args.length;
        }, {}),
      ).to.equal(0);
    });

    it('does not use native call/apply/bind', () => {
      const result = withNativeBindingDisabled(() =>
        myApply(
          function (a, b) {
            return this.m * (a + b);
          },
          { m: 2 },
          [3, 4],
        ),
      );
      expect(result).to.equal(14);
    });
  });

  describe('myBind', () => {
    function greet(greeting, punctuation) {
      return `${greeting}, ${this.name}${punctuation}`;
    }

    it('binds this and supports partial application', () => {
      const hello = myBind(greet, { name: 'Asha' }, 'Hello');
      expect(hello('!')).to.equal('Hello, Asha!');
      expect(hello('?')).to.equal('Hello, Asha?');
    });

    it('ignores the this of the call site', () => {
      const bound = myBind(
        function () {
          return this.name;
        },
        { name: 'bound' },
      );
      const obj = { name: 'call-site', bound };
      expect(obj.bound()).to.equal('bound');
    });

    it('does not use native call/apply/bind', () => {
      const result = withNativeBindingDisabled(() => {
        const bound = myBind(greet, { name: 'Ravi' }, 'Hi');
        return bound('.');
      });
      expect(result).to.equal('Hi, Ravi.');
    });

    it('supports `new`: ignores thisArg, keeps preset args and the prototype chain', () => {
      function Point(x, y) {
        this.x = x;
        this.y = y;
      }
      Point.prototype.sum = function () {
        return this.x + this.y;
      };
      const ignored = { ignored: true };
      const BoundPoint = myBind(Point, ignored, 1);
      const p = new BoundPoint(2);
      expect(p).to.be.instanceOf(Point);
      expect(p.x).to.equal(1);
      expect(p.y).to.equal(2);
      expect(p.sum()).to.equal(3);
      expect(ignored).to.deep.equal({ ignored: true });
    });
  });

  describe('installPolyfills', () => {
    const names = ['myCall', 'myApply', 'myBind'];
    before(() => installPolyfills());
    after(() => {
      for (const n of names) delete Function.prototype[n];
    });

    it('adds myCall/myApply/myBind to every function', () => {
      function get(k) {
        return this[k];
      }
      expect(get.myCall({ a: 1 }, 'a')).to.equal(1);
      expect(get.myApply({ b: 2 }, ['b'])).to.equal(2);
      expect(get.myBind({ c: 3 })('c')).to.equal(3);
    });

    it('adds them as non-enumerable properties', () => {
      for (const n of names) {
        const d = Object.getOwnPropertyDescriptor(Function.prototype, n);
        expect(d, n).to.exist;
        expect(d.enumerable, n).to.equal(false);
      }
    });
  });

  describe('Toggle', () => {
    it('starts with the initial value', () => {
      expect(new Toggle().on).to.equal(false);
      expect(new Toggle(true).on).to.equal(true);
    });

    it('toggle() works when detached and returns the new state', () => {
      const t = new Toggle();
      const { toggle } = t;
      expect(toggle()).to.equal(true);
      expect(t.on).to.equal(true);
    });

    it('works as a callback', () => {
      const t = new Toggle();
      [1, 2, 3].forEach(t.toggle);
      expect(t.on).to.equal(true);
    });

    it('keeps instances independent', () => {
      const a = new Toggle();
      const b = new Toggle();
      const toggleA = a.toggle;
      toggleA();
      expect(a.on).to.equal(true);
      expect(b.on).to.equal(false);
    });
  });

  describe('predict the output (fill in `predictions`)', () => {
    /* eslint-disable */
    function q1() {
      const obj = { name: 'obj', getName() { return this?.name; } };
      const fn = obj.getName;
      return String(fn());
    }
    function q2() {
      const o = { name: 'obj', regular() { return (() => this.name)(); }, arrow: () => typeof this };
      return [o.regular(), o.arrow()].join(',');
    }
    function q3() {
      class Timer {
        constructor() { this.ticks = 0; }
        start(run) { run(function () { this.ticks += 1; }); }
      }
      const t = new Timer();
      try { t.start((cb) => cb()); return String(t.ticks); } catch (e) { return e.name; }
    }
    function q4() {
      function who() { return this.name; }
      const a = who.bind({ name: 'A' });
      const b = a.bind({ name: 'B' });
      return b();
    }
    function q5() {
      function Person(name) { this.name = name; }
      const Bound = Person.bind({ name: 'ignored' });
      const p = new Bound('Ada');
      return `${p.name}|${p instanceof Person}`;
    }
    function q6() {
      const counter = { n: 0, inc() { this.n += 1; return this.n; } };
      const other = { n: 41 };
      return String(counter.inc.call(other)) + '|' + counter.n;
    }
    /* eslint-enable */
    const snippets = { q1, q2, q3, q4, q5, q6 };

    for (const [key, run] of Object.entries(snippets)) {
      it(`${key} is predicted correctly`, () => {
        expect(predictions[key], `fill in predictions.${key}`).to.be.a('string');
        expect(predictions[key]).to.equal(run());
      });
    }
  });
});
