// Lab 12 · ready-made tests (jsdom). Don't edit.
import 'global-jsdom/register';
import { expect } from 'chai';
import { h, render, useState, useEffect, TEXT } from './mini-react.js';

// Use jsdom's Event classes everywhere (Node has its own).
for (const name of ['Event', 'CustomEvent']) globalThis[name] = window[name];

// ☆ Stretch suites run with `npm run test:stretch` (any OS) or STRETCH=1 (macOS/Linux shells).
const stretch =
  process.env.STRETCH || process.env.npm_lifecycle_event === 'test:stretch' ? describe : describe.skip;
const flush = () => new Promise((resolve) => setTimeout(resolve, 0));
const text = (value) => ({ type: TEXT, key: null, props: { nodeValue: value, children: [] } });

function Counter({ label = 'count', id }) {
  const [n, setN] = useState(0);
  return h('button', { id, onClick: () => setN(n + 1) }, `${label}: ${n}`);
}

describe('Lab 12 · mini-React', () => {
  let container;
  beforeEach(() => {
    container = document.createElement('div');
    document.body.append(container);
  });
  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('h()', () => {
    it('creates vnodes with props and text children', () => {
      expect(h('div', { id: 'a' }, 'hi')).to.deep.equal({
        type: 'div',
        key: null,
        props: { id: 'a', children: [text('hi')] },
      });
    });

    it('flattens children, drops null/undefined/booleans and keeps 0', () => {
      const vnode = h('ul', null, ['x', [2]], null, false, true, undefined, 0);
      expect(vnode.props.children).to.deep.equal([text('x'), text('2'), text('0')]);
    });

    it('extracts the key and handles null props', () => {
      const li = h('li', { key: 'k1', className: 'c' });
      expect(li.key).to.equal('k1');
      expect(li.props).to.deep.equal({ className: 'c', children: [] });
      expect(h('br', null).props).to.deep.equal({ children: [] });
    });

    it('keeps element children as they are', () => {
      const child = h('b', null, 'x');
      expect(h('p', null, child).props.children[0]).to.equal(child);
    });
  });

  describe('render(): mounting', () => {
    it('mounts nested elements and text', () => {
      render(h('section', { id: 's' }, h('h1', null, 'Title'), h('p', null, 'Body ', 42)), container);
      expect(container.innerHTML).to.equal('<section id="s"><h1>Title</h1><p>Body 42</p></section>');
    });

    it('applies className, style, DOM properties and event handlers', () => {
      let clicks = 0;
      render(
        h(
          'div',
          null,
          h('button', { className: 'btn', style: { color: 'red' }, onClick: () => clicks++ }, 'Go'),
          h('input', { id: 'text', value: 'hello' }),
          h('input', { id: 'check', type: 'checkbox', checked: true }),
          h('p', { hidden: true, title: null }),
        ),
        container,
      );
      const button = container.querySelector('button');
      expect(button.className).to.equal('btn');
      expect(button.style.color).to.equal('red');
      expect(button.hasAttribute('onclick')).to.equal(false);
      button.click();
      expect(clicks).to.equal(1);
      expect(container.querySelector('#text').value).to.equal('hello');
      expect(container.querySelector('#check').checked).to.equal(true);
      const p = container.querySelector('p');
      expect(p.hasAttribute('hidden')).to.equal(true);
      expect(p.hasAttribute('title')).to.equal(false);
    });

    it('renders function components with props and children', () => {
      const Greeting = ({ name, children }) => h('p', null, `Hello ${name}`, children);
      render(h(Greeting, { name: 'Ada' }, h('b', null, '!')), container);
      expect(container.innerHTML).to.equal('<p>Hello Ada<b>!</b></p>');
    });

    it('renders nothing visible for components that return null', () => {
      render(h('div', null, h(() => null)), container);
      expect(container.textContent).to.equal('');
      expect(container.firstChild.children).to.have.lengthOf(0);
    });
  });

  describe('render(): updates (reconciliation)', () => {
    it('updates attributes in place', () => {
      render(h('div', { id: 'a', title: 'x' }), container);
      const node = container.firstChild;
      render(h('div', { id: 'b' }), container);
      expect(container.firstChild).to.equal(node);
      expect(node.id).to.equal('b');
      expect(node.hasAttribute('title')).to.equal(false);
    });

    it('updates text nodes in place', () => {
      render(h('p', null, 'one'), container);
      const textNode = container.firstChild.firstChild;
      render(h('p', null, 'two'), container);
      expect(container.firstChild.firstChild).to.equal(textNode);
      expect(textNode.nodeValue).to.equal('two');
    });

    it('replaces the node when the type changes', () => {
      render(h('p', null, 'x'), container);
      const old = container.firstChild;
      render(h('span', null, 'x'), container);
      expect(container.firstChild.tagName).to.equal('SPAN');
      expect(old.isConnected).to.equal(false);
      expect(container.childNodes).to.have.lengthOf(1);
    });

    it('swaps and removes event handlers', () => {
      const calls = [];
      render(h('button', { onClick: () => calls.push('old') }), container);
      render(h('button', { onClick: () => calls.push('new') }), container);
      container.firstChild.click();
      render(h('button', {}), container);
      container.firstChild.click();
      expect(calls).to.deep.equal(['new']);
    });

    it('updates and removes style keys', () => {
      render(h('div', { style: { color: 'red', fontSize: '12px' } }), container);
      render(h('div', { style: { color: 'blue' } }), container);
      expect(container.firstChild.style.color).to.equal('blue');
      expect(container.firstChild.style.fontSize).to.equal('');
    });

    it('adds and removes unkeyed children by index', () => {
      const list = (items) => h('ul', null, items.map((t) => h('li', null, t)));
      render(list(['a', 'b', 'c']), container);
      render(list(['a', 'b']), container);
      expect(container.firstChild.children).to.have.lengthOf(2);
      render(list(['w', 'x', 'y', 'z']), container);
      expect([...container.firstChild.children].map((li) => li.textContent)).to.deep.equal(['w', 'x', 'y', 'z']);
    });

    const keyed = (ids) => h('ul', null, ids.map((id) => h('li', { key: id }, id)));

    it('reuses DOM nodes when keyed children are reordered', () => {
      render(keyed(['a', 'b', 'c']), container);
      const [a, b, c] = container.firstChild.children;
      render(keyed(['c', 'a', 'b']), container);
      const after = [...container.firstChild.children];
      expect(after.map((li) => li.textContent)).to.deep.equal(['c', 'a', 'b']);
      expect(after[0]).to.equal(c);
      expect(after[1]).to.equal(a);
      expect(after[2]).to.equal(b);
    });

    it('inserts and removes keyed children while keeping the others', () => {
      render(keyed(['a', 'b', 'c']), container);
      const [a, b, c] = container.firstChild.children;
      render(keyed(['a', 'x', 'c', 'y']), container);
      const after = [...container.firstChild.children];
      expect(after.map((li) => li.textContent)).to.deep.equal(['a', 'x', 'c', 'y']);
      expect(after[0]).to.equal(a);
      expect(after[2]).to.equal(c);
      expect(b.isConnected).to.equal(false);
    });
  });

  describe('hooks: useState', () => {
    it('renders the initial state and patches the same node after an update', async () => {
      render(h(Counter), container);
      const btn = container.querySelector('button');
      expect(btn.textContent).to.equal('count: 0');
      btn.click();
      await flush();
      expect(container.querySelector('button').textContent).to.equal('count: 1');
      expect(container.querySelector('button')).to.equal(btn);
    });

    it('calls a lazy initialiser only once', async () => {
      let inits = 0;
      function Lazy() {
        const [v, setV] = useState(() => {
          inits += 1;
          return 5;
        });
        return h('button', { onClick: () => setV(v + 1) }, String(v));
      }
      render(h(Lazy), container);
      container.querySelector('button').click();
      await flush();
      expect(container.textContent).to.equal('6');
      expect(inits).to.equal(1);
    });

    it('keeps independent state per component instance', async () => {
      render(h('div', null, h(Counter, { label: 'a', id: 'a' }), h(Counter, { label: 'b', id: 'b' })), container);
      container.querySelector('#a').click();
      await flush();
      container.querySelector('#a').click();
      await flush();
      expect(container.querySelector('#a').textContent).to.equal('a: 2');
      expect(container.querySelector('#b').textContent).to.equal('b: 0');
    });

    it('batches updates into one render (render-time values vs updater functions)', async () => {
      let renders = 0;
      function Multi() {
        renders += 1;
        const [a, setA] = useState(0);
        const [b, setB] = useState(0);
        const onClick = () => {
          setA(a + 1);
          setA(a + 1);
          setB((x) => x + 1);
          setB((x) => x + 1);
        };
        return h('button', { onClick }, `${a}-${b}`);
      }
      render(h(Multi), container);
      expect(renders).to.equal(1);
      container.querySelector('button').click();
      expect(renders, 'updates must not render synchronously').to.equal(1);
      await flush();
      expect(renders, 'four updates, one render').to.equal(2);
      expect(container.textContent).to.equal('1-2');
    });

    it('gives the same setter every render', async () => {
      const setters = [];
      function Stable() {
        const [n, setN] = useState(0);
        setters.push(setN);
        return h('button', { onClick: () => setN(n + 1) }, String(n));
      }
      render(h(Stable), container);
      container.querySelector('button').click();
      await flush();
      expect(setters).to.have.lengthOf(2);
      expect(setters[0]).to.equal(setters[1]);
    });

    it('keeps child state across parent renders and resets it after unmount', async () => {
      function App() {
        const [show, setShow] = useState(true);
        const [ticks, setTicks] = useState(0);
        return h(
          'div',
          null,
          h('button', { id: 'toggle', onClick: () => setShow(!show) }, 'toggle'),
          h('button', { id: 'tick', onClick: () => setTicks(ticks + 1) }, `ticks ${ticks}`),
          show ? h(Counter, { key: 'counter', id: 'counter' }) : null,
        );
      }
      render(h(App), container);
      const $ = (sel) => container.querySelector(sel);

      $('#counter').click();
      await flush();
      expect($('#counter').textContent).to.equal('count: 1');

      $('#tick').click();
      await flush();
      expect($('#tick').textContent).to.equal('ticks 1');
      expect($('#counter').textContent).to.equal('count: 1');

      $('#toggle').click();
      await flush();
      expect($('#counter')).to.equal(null);

      $('#toggle').click();
      await flush();
      expect($('#counter').textContent).to.equal('count: 0');
    });

    it('ignores updates from unmounted components', async () => {
      let savedSet;
      function Child() {
        const [v, setV] = useState(0);
        savedSet = setV;
        return h('span', null, String(v));
      }
      render(h('div', null, h(Child)), container);
      render(h('div', null), container);
      expect(() => savedSet(5)).to.not.throw();
      await flush();
      expect(container.innerHTML).to.equal('<div></div>');
    });
  });

  stretch('☆ hooks: useEffect', () => {
    it('runs after the DOM is committed', async () => {
      const seen = [];
      function Title() {
        useEffect(() => {
          seen.push(container.textContent);
        });
        return h('h1', null, 'Hello');
      }
      render(h(Title), container);
      await flush();
      expect(seen).to.deep.equal(['Hello']);
    });

    it('re-runs when deps change, cleans up first, and cleans up on unmount', async () => {
      const log = [];
      function Effecty({ id }) {
        useEffect(() => {
          log.push('mount-once');
          return () => log.push('unmount-once');
        }, []);
        useEffect(() => {
          log.push(`subscribe ${id}`);
          return () => log.push(`unsubscribe ${id}`);
        }, [id]);
        return h('p', null, String(id));
      }
      render(h('div', null, h(Effecty, { id: 1 })), container);
      await flush();
      render(h('div', null, h(Effecty, { id: 1 })), container);
      await flush();
      render(h('div', null, h(Effecty, { id: 2 })), container);
      await flush();
      render(h('div', null), container);
      await flush();
      expect(log).to.deep.equal([
        'mount-once',
        'subscribe 1',
        'unsubscribe 1',
        'subscribe 2',
        'unmount-once',
        'unsubscribe 2',
      ]);
    });

    it('runs effects without deps after every render', async () => {
      let runs = 0;
      function Every() {
        const [n, setN] = useState(0);
        useEffect(() => {
          runs += 1;
        });
        return h('button', { onClick: () => setN(n + 1) }, String(n));
      }
      render(h(Every), container);
      await flush();
      container.querySelector('button').click();
      await flush();
      container.querySelector('button').click();
      await flush();
      expect(runs).to.equal(3);
    });

    it('lets effects update state (data-fetching pattern)', async () => {
      function Loader() {
        const [data, setData] = useState('loading');
        useEffect(() => {
          const id = setTimeout(() => setData('loaded'), 5);
          return () => clearTimeout(id);
        }, []);
        return h('p', null, data);
      }
      render(h(Loader), container);
      expect(container.textContent).to.equal('loading');
      await new Promise((r) => setTimeout(r, 30));
      expect(container.textContent).to.equal('loaded');
    });
  });
});
