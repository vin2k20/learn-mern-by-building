// Lab 03 · ready-made tests. Don't edit.
import { expect } from 'chai';
import {
  EventEmitter,
  inherits,
  Task,
  BugTask,
  deepFreeze,
  createObservable,
  getPrototypeChain,
} from './object-model.js';

describe('Lab 03 · object model', () => {
  describe('EventEmitter', () => {
    it('calls listeners in order with the emitted arguments', () => {
      const e = new EventEmitter();
      const calls = [];
      e.on('x', (a, b) => calls.push(['first', a, b]));
      e.on('x', (a) => calls.push(['second', a]));
      expect(e.emit('x', 1, 2)).to.equal(true);
      expect(calls).to.deep.equal([
        ['first', 1, 2],
        ['second', 1],
      ]);
    });

    it('returns false when nobody is listening', () => {
      expect(new EventEmitter().emit('nothing')).to.equal(false);
    });

    it('on() returns an unsubscribe function', () => {
      const e = new EventEmitter();
      let n = 0;
      const unsubscribe = e.on('tick', () => (n += 1));
      e.emit('tick');
      unsubscribe();
      e.emit('tick');
      expect(n).to.equal(1);
      expect(e.listenerCount('tick')).to.equal(0);
    });

    it('off() removes one registration of the given listener', () => {
      const e = new EventEmitter();
      let n = 0;
      const inc = () => (n += 1);
      e.on('tick', inc);
      e.on('tick', inc);
      e.off('tick', inc);
      e.emit('tick');
      expect(n).to.equal(1);
      expect(e.listenerCount('tick')).to.equal(1);
    });

    it('once() listeners fire a single time', () => {
      const e = new EventEmitter();
      const seen = [];
      e.once('msg', (m) => seen.push(m));
      e.emit('msg', 'a');
      e.emit('msg', 'b');
      expect(seen).to.deep.equal(['a']);
      expect(e.listenerCount('msg')).to.equal(0);
    });

    it('off() can remove a once() listener using the original function', () => {
      const e = new EventEmitter();
      let called = false;
      const listener = () => (called = true);
      e.once('msg', listener);
      e.off('msg', listener);
      e.emit('msg');
      expect(called).to.equal(false);
    });

    it('uses a snapshot of listeners during emit', () => {
      const e = new EventEmitter();
      const calls = [];
      const b = () => calls.push('b');
      const late = () => calls.push('late');
      e.on('x', () => {
        calls.push('a');
        e.off('x', b);
        e.on('x', late);
      });
      e.on('x', b);
      e.emit('x');
      expect(calls).to.deep.equal(['a', 'b']);
      calls.length = 0;
      e.emit('x');
      expect(calls).to.include('late');
      expect(calls).to.not.include('b');
    });

    it('binds `this` to the emitter for regular function listeners', () => {
      const e = new EventEmitter();
      let self;
      e.on('x', function () {
        self = this;
      });
      e.emit('x');
      expect(self).to.equal(e);
    });

    it("throws when 'error' is emitted with no listeners", () => {
      const e = new EventEmitter();
      const err = new Error('boom');
      expect(() => e.emit('error', err)).to.throw('boom');
      expect(() => e.emit('error', 'not an error')).to.throw(Error);
      e.on('error', () => {});
      expect(e.emit('error', err)).to.equal(true);
    });
  });

  describe('inherits', () => {
    function Animal(name) {
      this.name = name;
    }
    Animal.prototype.speak = function () {
      return `${this.name} makes a sound`;
    };
    Animal.kingdom = function () {
      return 'animalia';
    };
    function Dog(name) {
      Animal.call(this, name);
    }

    before(() => {
      inherits(Dog, Animal);
      Dog.prototype.speak = function () {
        return `${Animal.prototype.speak.call(this)}: woof`;
      };
    });

    it('sets up the prototype chain', () => {
      const d = new Dog('Rex');
      expect(d).to.be.instanceOf(Dog);
      expect(d).to.be.instanceOf(Animal);
      expect(d.speak()).to.equal('Rex makes a sound: woof');
      expect(Object.getPrototypeOf(Dog.prototype)).to.equal(Animal.prototype);
    });

    it('keeps a non-enumerable constructor pointing at the child', () => {
      expect(Dog.prototype.constructor).to.equal(Dog);
      expect(Object.keys(Dog.prototype)).to.not.include('constructor');
      const d = Object.getOwnPropertyDescriptor(Dog.prototype, 'constructor');
      expect(d.enumerable).to.equal(false);
    });

    it('inherits static methods', () => {
      expect(Dog.kingdom()).to.equal('animalia');
    });

    it('works with getPrototypeChain', () => {
      expect(getPrototypeChain(new Dog('x'))).to.deep.equal(['Dog', 'Animal', 'Object']);
    });
  });

  describe('Task / BugTask', () => {
    it('stores title and points privately; only status is an own enumerable key', () => {
      const t = new Task({ title: 'Write tests', points: 3 });
      expect(t.title).to.equal('Write tests');
      expect(t.points).to.equal(3);
      expect(t.status).to.equal('todo');
      expect(Object.keys(t)).to.deep.equal(['status']);
    });

    it('defaults points to 1 and trims the title', () => {
      const t = new Task({ title: '  Fix bug  ' });
      expect(t.title).to.equal('Fix bug');
      expect(t.points).to.equal(1);
    });

    it('validates the title in the setter', () => {
      const t = new Task({ title: 'ok' });
      expect(() => {
        t.title = '   ';
      }).to.throw(TypeError);
      expect(() => {
        t.title = 42;
      }).to.throw(TypeError);
      expect(() => new Task({ title: '' })).to.throw(TypeError);
      t.title = 'renamed';
      expect(t.title).to.equal('renamed');
    });

    it('points is read-only', () => {
      const t = new Task({ title: 'x', points: 2 });
      expect(() => {
        t.points = 10;
      }).to.throw(TypeError);
      expect(t.points).to.equal(2);
    });

    it('complete() is chainable and toJSON is used by JSON.stringify', () => {
      const t = new Task({ title: 'Ship', points: 5 }).complete();
      expect(t).to.be.instanceOf(Task);
      expect(JSON.parse(JSON.stringify(t))).to.deep.equal({
        title: 'Ship',
        points: 5,
        status: 'done',
      });
    });

    it('static fromJSON() restores status and respects subclasses', () => {
      const t = Task.fromJSON({ title: 'Restore', points: 2, status: 'done' });
      expect(t).to.be.instanceOf(Task);
      expect(t.status).to.equal('done');
      const b = BugTask.fromJSON({ title: 'Crash', severity: 'critical' });
      expect(b).to.be.instanceOf(BugTask);
      expect(b.severity).to.equal('critical');
    });

    it('BugTask extends Task and adds severity to toJSON', () => {
      const b = new BugTask({ title: 'Crash on login', points: 8 });
      expect(b).to.be.instanceOf(Task);
      expect(Object.getPrototypeOf(BugTask)).to.equal(Task);
      expect(b.toJSON()).to.deep.equal({
        title: 'Crash on login',
        points: 8,
        status: 'todo',
        severity: 'minor',
      });
      expect(Object.keys(b)).to.deep.equal(['status', 'severity']);
      expect(getPrototypeChain(b)).to.deep.equal(['BugTask', 'Task', 'Object']);
    });

    it('counts created instances with a static getter', () => {
      const before = Task.created;
      expect(before).to.be.a('number');
      new Task({ title: 'a' });
      new BugTask({ title: 'b' });
      expect(Task.created).to.equal(before + 2);
    });
  });

  describe('deepFreeze', () => {
    it('freezes nested objects and arrays', () => {
      const cfg = deepFreeze({ theme: { colors: ['red'] }, n: 1 });
      expect(Object.isFrozen(cfg)).to.equal(true);
      expect(Object.isFrozen(cfg.theme)).to.equal(true);
      expect(Object.isFrozen(cfg.theme.colors)).to.equal(true);
      expect(() => {
        cfg.theme.colors.push('blue');
      }).to.throw(TypeError);
      expect(() => {
        cfg.theme.dark = true;
      }).to.throw(TypeError);
    });

    it('returns the same reference and handles primitives', () => {
      const obj = { a: 1 };
      expect(deepFreeze(obj)).to.equal(obj);
      expect(deepFreeze(5)).to.equal(5);
      expect(deepFreeze(null)).to.equal(null);
    });

    it('survives circular references', () => {
      const a = { name: 'a' };
      const b = { name: 'b', a };
      a.b = b;
      expect(() => deepFreeze(a)).to.not.throw();
      expect(Object.isFrozen(b)).to.equal(true);
    });
  });

  describe('createObservable', () => {
    function setup() {
      const changes = [];
      const target = { user: { name: 'A' }, tags: ['x'], count: 0 };
      const state = createObservable(target, (c) => changes.push(c));
      return { changes, target, state };
    }

    it('reports top-level sets with path, value and previous', () => {
      const { changes, state, target } = setup();
      state.count = 1;
      expect(changes).to.deep.equal([{ type: 'set', path: ['count'], value: 1, previous: 0 }]);
      expect(target.count).to.equal(1);
    });

    it('reports nested sets with the full path', () => {
      const { changes, state } = setup();
      state.user.name = 'B';
      expect(changes).to.deep.equal([
        { type: 'set', path: ['user', 'name'], value: 'B', previous: 'A' },
      ]);
    });

    it('skips no-op writes', () => {
      const { changes, state } = setup();
      state.count = 0;
      state.user.name = 'A';
      expect(changes).to.have.lengthOf(0);
    });

    it('tracks array mutations like push', () => {
      const { changes, state, target } = setup();
      state.tags.push('y');
      expect(target.tags).to.deep.equal(['x', 'y']);
      expect(changes).to.deep.equal([
        { type: 'set', path: ['tags', '1'], value: 'y', previous: undefined },
      ]);
    });

    it('reports deletes', () => {
      const { changes, state } = setup();
      delete state.user.name;
      expect(changes).to.deep.equal([
        { type: 'delete', path: ['user', 'name'], value: undefined, previous: 'A' },
      ]);
    });

    it('observes objects assigned later', () => {
      const { changes, state } = setup();
      state.meta = { a: 1 };
      state.meta.a = 2;
      expect(changes[1]).to.deep.equal({
        type: 'set',
        path: ['meta', 'a'],
        value: 2,
        previous: 1,
      });
    });

    it('returns stable nested proxies', () => {
      const { state } = setup();
      expect(state.user).to.equal(state.user);
    });
  });

  describe('getPrototypeChain', () => {
    it('lists constructor names up the chain', () => {
      expect(getPrototypeChain([])).to.deep.equal(['Array', 'Object']);
      expect(getPrototypeChain(new Map())).to.deep.equal(['Map', 'Object']);
    });

    it('handles null-prototype objects', () => {
      expect(getPrototypeChain(Object.create(null))).to.deep.equal([]);
      expect(getPrototypeChain(Object.create(Object.create(null)))).to.deep.equal(['(anonymous)']);
    });
  });
});
