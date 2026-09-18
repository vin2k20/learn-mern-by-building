// Lab 13 · ready-made tests. Don't edit.
import { expect } from 'chai';
import sinon from 'sinon';
import {
  createStore,
  combineReducers,
  compose,
  applyMiddleware,
  createThunk,
  thunk,
  createLogger,
  bindActionCreators,
  createAction,
  Dispatcher,
} from './mini-redux.js';

const counter = (state = 0, action) => {
  switch (action.type) {
    case 'inc':
      return state + (action.by ?? 1);
    case 'dec':
      return state - 1;
    default:
      return state;
  }
};

describe('Lab 13 · mini-Redux & Flux', () => {
  describe('createStore', () => {
    it('initialises state with an @@redux/INIT action', () => {
      const types = [];
      const store = createStore((state = { ready: true }, action) => {
        types.push(action.type);
        return state;
      });
      expect(store.getState()).to.deep.equal({ ready: true });
      expect(types[0]).to.match(/^@@redux\/INIT/);
    });

    it('uses preloaded state and updates on dispatch', () => {
      const store = createStore(counter, 10);
      const action = { type: 'inc', by: 5 };
      expect(store.dispatch(action)).to.equal(action);
      expect(store.getState()).to.equal(15);
    });

    it('notifies subscribers and supports unsubscribe (twice is safe)', () => {
      const store = createStore(counter);
      const listener = sinon.spy();
      const unsubscribe = store.subscribe(listener);
      store.dispatch({ type: 'inc' });
      unsubscribe();
      unsubscribe();
      store.dispatch({ type: 'inc' });
      expect(listener.callCount).to.equal(1);
    });

    it('snapshots listeners for each dispatch', () => {
      const store = createStore(counter);
      const calls = [];
      let unsubB;
      const late = () => calls.push('late');
      store.subscribe(() => {
        calls.push('a');
        unsubB();
        store.subscribe(late);
      });
      unsubB = store.subscribe(() => calls.push('b'));
      store.dispatch({ type: 'inc' });
      expect(calls).to.deep.equal(['a', 'b']);
    });

    it('validates actions', () => {
      const store = createStore(counter);
      expect(() => store.dispatch('inc')).to.throw();
      expect(() => store.dispatch(new (class Action {})())).to.throw();
      expect(() => store.dispatch({})).to.throw();
      expect(() => store.dispatch({ type: 42 })).to.throw();
      expect(() => store.dispatch(Object.assign(Object.create(null), { type: 'inc' }))).to.not.throw();
    });

    it('forbids dispatching from inside a reducer, and recovers afterwards', () => {
      let store;
      store = createStore((state = 0, action) => {
        if (action.type === 'bad') store.dispatch({ type: 'inc' });
        return counter(state, action);
      });
      expect(() => store.dispatch({ type: 'bad' })).to.throw(/may not dispatch/i);
      expect(() => store.dispatch({ type: 'inc' })).to.not.throw();
      expect(store.getState()).to.equal(1);
    });

    it('supports replaceReducer', () => {
      const store = createStore(counter, 1);
      store.replaceReducer((state = 0, action) => (action.type === 'inc' ? state + 100 : state));
      store.dispatch({ type: 'inc' });
      expect(store.getState()).to.equal(101);
    });

    it('accepts an enhancer as the second argument', () => {
      const enhancer = sinon.spy((create) => (reducer, pre) => create(reducer, pre));
      createStore(counter, enhancer);
      expect(enhancer.calledOnce).to.equal(true);
    });
  });

  describe('combineReducers', () => {
    const todos = (state = [], action) => (action.type === 'add' ? [...state, action.text] : state);
    // Built inside each test (not at load time) so an unfinished lab fails cleanly.
    const makeRoot = () => combineReducers({ counter, todos });

    it('builds the initial state from each slice', () => {
      const store = createStore(makeRoot());
      expect(store.getState()).to.deep.equal({ counter: 0, todos: [] });
    });

    it('passes each slice its own state', () => {
      const store = createStore(makeRoot());
      store.dispatch({ type: 'add', text: 'write tests' });
      store.dispatch({ type: 'inc' });
      expect(store.getState()).to.deep.equal({ counter: 1, todos: ['write tests'] });
    });

    it('returns the same state object when nothing changed', () => {
      const root = makeRoot();
      const state = root(undefined, { type: '@@init' });
      expect(root(state, { type: 'unknown' })).to.equal(state);
      expect(root(state, { type: 'inc' })).to.not.equal(state);
    });

    it('throws when a slice reducer returns undefined', () => {
      const broken = combineReducers({ counter, broken: () => undefined });
      expect(() => broken(undefined, { type: 'x' })).to.throw(/broken/);
    });
  });

  describe('compose', () => {
    it('composes right-to-left', () => {
      const add1 = (x) => x + 1;
      const double = (x) => x * 2;
      expect(compose(add1, double)(5)).to.equal(11);
      expect(compose()(7)).to.equal(7);
      expect(compose(double)).to.equal(double);
    });
  });

  describe('applyMiddleware', () => {
    it('runs middleware in order around the real dispatch', () => {
      const log = [];
      const mw = (name) => () => (next) => (action) => {
        log.push(`${name} before`);
        const result = next(action);
        log.push(`${name} after`);
        return result;
      };
      const store = createStore(counter, applyMiddleware(mw('a'), mw('b')));
      store.dispatch({ type: 'inc' });
      expect(log).to.deep.equal(['a before', 'b before', 'b after', 'a after']);
      expect(store.getState()).to.equal(1);
    });

    it('gives middleware getState and a dispatch that goes through the whole chain', () => {
      const seen = [];
      const spy = () => (next) => (action) => {
        seen.push(action.type);
        return next(action);
      };
      const doubler = ({ dispatch, getState }) => (next) => (action) => {
        if (action.type === 'double') {
          dispatch({ type: 'inc', by: getState() });
          return action;
        }
        return next(action);
      };
      const store = createStore(counter, 3, applyMiddleware(spy, doubler));
      store.dispatch({ type: 'double' });
      expect(store.getState()).to.equal(6);
      expect(seen).to.deep.equal(['double', 'inc']);
    });

    it('forbids dispatching while middleware is being constructed', () => {
      const eager = ({ dispatch }) => {
        dispatch({ type: 'inc' });
        return (next) => (action) => next(action);
      };
      expect(() => createStore(counter, applyMiddleware(eager))).to.throw(/while constructing your middleware/i);
    });
  });

  describe('thunk & logger', () => {
    it('thunk runs functions with dispatch and getState', () => {
      const store = createStore(counter, applyMiddleware(thunk));
      const result = store.dispatch((dispatch, getState) => {
        dispatch({ type: 'inc' });
        dispatch({ type: 'inc' });
        return `now ${getState()}`;
      });
      expect(result).to.equal('now 2');
      expect(store.dispatch({ type: 'dec' })).to.deep.equal({ type: 'dec' });
    });

    it('createThunk passes an extra argument (e.g. an API client)', async () => {
      const api = { fetchCount: async () => 42 };
      const store = createStore(counter, applyMiddleware(createThunk(api)));
      await store.dispatch(async (dispatch, getState, extra) => {
        dispatch({ type: 'inc', by: await extra.fetchCount() });
      });
      expect(store.getState()).to.equal(42);
    });

    it('createLogger logs prev and next state', () => {
      const log = sinon.spy();
      const store = createStore(counter, applyMiddleware(createLogger(log)));
      const returned = store.dispatch({ type: 'inc' });
      expect(returned).to.deep.equal({ type: 'inc' });
      expect(log.calledOnceWith({ type: 'inc', prev: 0, next: 1 })).to.equal(true);
    });
  });

  describe('action helpers', () => {
    it('bindActionCreators binds an object or a single function', () => {
      const dispatch = sinon.spy((a) => a);
      const bound = bindActionCreators({ inc: (by) => ({ type: 'inc', by }) }, dispatch);
      bound.inc(3);
      expect(dispatch.calledWith({ type: 'inc', by: 3 })).to.equal(true);
      const single = bindActionCreators(() => ({ type: 'dec' }), dispatch);
      expect(single()).to.deep.equal({ type: 'dec' });
    });

    it('createAction builds typed action creators', () => {
      const added = createAction('todos/added');
      expect(added('Write docs')).to.deep.equal({ type: 'todos/added', payload: 'Write docs' });
      expect(added.type).to.equal('todos/added');
      expect(String(added)).to.equal('todos/added');
      expect(added.match({ type: 'todos/added' })).to.equal(true);
      expect(added.match({ type: 'other' })).to.equal(false);
    });

    it('createAction supports a prepare callback', () => {
      const added = createAction('todos/added', (text, id) => ({ payload: { id, text }, meta: { at: 1 } }));
      expect(added('x', 7)).to.deep.equal({ type: 'todos/added', payload: { id: 7, text: 'x' }, meta: { at: 1 } });
    });
  });

  describe('Flux Dispatcher', () => {
    it('registers callbacks and dispatches payloads to all of them', () => {
      const d = new Dispatcher();
      const a = sinon.spy();
      const b = sinon.spy();
      expect(d.register(a)).to.equal('ID_1');
      const idB = d.register(b);
      expect(idB).to.equal('ID_2');
      d.dispatch({ type: 'hello' });
      expect(a.calledOnceWith({ type: 'hello' })).to.equal(true);
      expect(b.calledOnce).to.equal(true);
      d.unregister(idB);
      d.dispatch({ type: 'again' });
      expect(b.calledOnce).to.equal(true);
    });

    it('forbids dispatching in the middle of a dispatch', () => {
      const d = new Dispatcher();
      d.register(() => d.dispatch({ type: 'nested' }));
      expect(() => d.dispatch({ type: 'outer' })).to.throw(/middle of a dispatch/);
      d.unregister('ID_1');
      expect(() => d.dispatch({ type: 'ok' })).to.not.throw();
    });

    it('waitFor runs dependencies first, and each callback only once', () => {
      const d = new Dispatcher();
      const order = [];
      let tasksId = null;
      d.register(() => {
        d.waitFor([tasksId]);
        order.push('stats');
      });
      tasksId = d.register(() => order.push('tasks'));
      d.dispatch({ type: 'task/added' });
      expect(order).to.deep.equal(['tasks', 'stats']);
    });

    it('reports isDispatching and rejects waitFor outside a dispatch', () => {
      const d = new Dispatcher();
      let during;
      d.register(() => (during = d.isDispatching()));
      d.dispatch({});
      expect(during).to.equal(true);
      expect(d.isDispatching()).to.equal(false);
      expect(() => d.waitFor(['ID_1'])).to.throw();
    });

    it('detects circular waitFor dependencies', () => {
      const d = new Dispatcher();
      d.register(() => d.waitFor(['ID_2']));
      d.register(() => d.waitFor(['ID_1']));
      expect(() => d.dispatch({})).to.throw(/circular/i);
    });
  });
});
