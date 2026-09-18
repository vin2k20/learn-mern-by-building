// Lab 09 · ready-made tests (jsdom). Don't edit.
import 'global-jsdom/register';
import { expect } from 'chai';
import sinon from 'sinon';
import {
  createElement,
  renderList,
  delegate,
  onClickOutside,
  emitCustom,
  trapFocus,
  serializeForm,
} from './dom-events.js';

// Node ships its own Event/CustomEvent/FormData. Point them at jsdom's versions so the
// whole test runs in one "realm", just like a browser tab.
for (const name of ['Event', 'CustomEvent', 'FormData']) globalThis[name] = window[name];

function mount(html) {
  document.body.innerHTML = html;
  return document.body;
}

const click = (el) => el.dispatchEvent(new MouseEvent('click', { bubbles: true }));
const tab = (el, shiftKey = false) => {
  const e = new KeyboardEvent('keydown', { key: 'Tab', shiftKey, bubbles: true, cancelable: true });
  el.dispatchEvent(e);
  return e;
};

describe('Lab 09 · DOM & events', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('createElement', () => {
    it('creates an element with attributes, dataset, style and text', () => {
      const el = createElement(
        'button',
        {
          className: 'btn primary',
          type: 'button',
          disabled: true,
          hidden: false,
          'aria-label': 'Save task',
          dataset: { id: 't1' },
          style: { color: 'red' },
        },
        'Save',
      );
      expect(el.tagName).to.equal('BUTTON');
      expect([...el.classList]).to.deep.equal(['btn', 'primary']);
      expect(el.getAttribute('type')).to.equal('button');
      expect(el.hasAttribute('disabled')).to.equal(true);
      expect(el.hasAttribute('hidden')).to.equal(false);
      expect(el.getAttribute('aria-label')).to.equal('Save task');
      expect(el.dataset.id).to.equal('t1');
      expect(el.style.color).to.equal('red');
      expect(el.textContent).to.equal('Save');
    });

    it('attaches event listeners for onXxx props', () => {
      const spy = sinon.spy();
      const el = createElement('button', { onClick: spy });
      click(el);
      expect(spy.calledOnce).to.equal(true);
      expect(el.hasAttribute('onclick')).to.equal(false);
    });

    it('never parses strings as HTML (XSS-safe)', () => {
      const evil = '<img src=x onerror="alert(1)">';
      const el = createElement('p', null, evil);
      expect(el.children).to.have.lengthOf(0);
      expect(el.textContent).to.equal(evil);
    });

    it('flattens nested children and skips empty values', () => {
      const el = createElement(
        'ul',
        null,
        [createElement('li', null, 'a'), [createElement('li', null, 'b', 1)]],
        null,
        false,
        undefined,
        true,
      );
      expect(el.children).to.have.lengthOf(2);
      expect(el.textContent).to.equal('ab1');
    });
  });

  describe('renderList', () => {
    it('renders items, replaces old content and returns the container', () => {
      const root = mount('<ul id="list"><li>old</li></ul>');
      const ul = root.querySelector('#list');
      const out = renderList(ul, ['a', 'b', 'c'], (item, i) => {
        const li = document.createElement('li');
        li.textContent = `${i}:${item}`;
        return li;
      });
      expect(out).to.equal(ul);
      expect([...ul.children].map((li) => li.textContent)).to.deep.equal(['0:a', '1:b', '2:c']);
    });

    it('inserts everything in a single DOM mutation', () => {
      const root = mount('<ul id="list"><li>old</li></ul>');
      const ul = root.querySelector('#list');
      const observer = new MutationObserver(() => {});
      observer.observe(ul, { childList: true });
      renderList(ul, [1, 2, 3, 4, 5], (n) => {
        const li = document.createElement('li');
        li.textContent = String(n);
        return li;
      });
      const records = observer.takeRecords();
      observer.disconnect();
      const insertions = records.filter((r) => r.addedNodes.length > 0);
      expect(insertions).to.have.lengthOf(1);
      expect(ul.children).to.have.lengthOf(5);
    });

    it('empties the container for an empty list', () => {
      const root = mount('<ul id="list"><li>old</li></ul>');
      renderList(root.querySelector('#list'), [], () => document.createElement('li'));
      expect(root.querySelector('#list').children).to.have.lengthOf(0);
    });
  });

  describe('delegate', () => {
    it('adds a single listener and finds the matching ancestor of the target', () => {
      const root = mount(`
        <div id="board">
          <article class="card" data-id="t1"><span class="title">One</span></article>
          <article class="card" data-id="t2"><span class="title">Two</span></article>
          <p class="note">not a card</p>
        </div>`).querySelector('#board');
      const addSpy = sinon.spy(root, 'addEventListener');
      const seen = [];
      delegate(root, 'click', '.card', (event, card) => seen.push([event.type, card.dataset.id]));
      expect(addSpy.callCount).to.equal(1);
      click(root.querySelector('[data-id="t2"] .title'));
      click(root.querySelector('.note'));
      expect(seen).to.deep.equal([['click', 't2']]);
    });

    it('handles elements added after delegation', () => {
      const root = mount('<div id="board"></div>').querySelector('#board');
      const spy = sinon.spy();
      delegate(root, 'click', '.card', spy);
      root.insertAdjacentHTML('beforeend', '<article class="card" data-id="new"></article>');
      click(root.querySelector('[data-id="new"]'));
      expect(spy.calledOnce).to.equal(true);
    });

    it('ignores matches outside the root', () => {
      const body = mount('<section class="card"><div id="board"><p id="plain">x</p></div></section>');
      const spy = sinon.spy();
      delegate(body.querySelector('#board'), 'click', '.card', spy);
      click(body.querySelector('#plain'));
      expect(spy.called).to.equal(false);
    });

    it('returns an unsubscribe function', () => {
      const root = mount('<div id="board"><button class="card">x</button></div>').querySelector('#board');
      const spy = sinon.spy();
      const off = delegate(root, 'click', '.card', spy);
      off();
      click(root.querySelector('.card'));
      expect(spy.called).to.equal(false);
    });
  });

  describe('onClickOutside', () => {
    it('fires only for clicks outside the element', () => {
      const body = mount('<div id="menu"><button id="item">i</button></div><button id="other">o</button>');
      const spy = sinon.spy();
      const cleanup = onClickOutside(body.querySelector('#menu'), spy);
      click(body.querySelector('#item'));
      expect(spy.called).to.equal(false);
      click(body.querySelector('#other'));
      expect(spy.calledOnce).to.equal(true);
      expect(spy.firstCall.args[0]).to.be.instanceOf(Event);
      cleanup();
      click(body.querySelector('#other'));
      expect(spy.calledOnce).to.equal(true);
    });
  });

  describe('emitCustom', () => {
    it('dispatches a bubbling CustomEvent with detail', () => {
      const body = mount('<div id="parent"><span id="child"></span></div>');
      let received;
      body.querySelector('#parent').addEventListener('task:moved', (e) => (received = e));
      const result = emitCustom(body.querySelector('#child'), 'task:moved', { id: 't1', to: 'done' });
      expect(result).to.equal(true);
      expect(received).to.be.instanceOf(CustomEvent);
      expect(received.detail).to.deep.equal({ id: 't1', to: 'done' });
    });

    it('returns false when a listener prevents the default', () => {
      const body = mount('<div id="parent"><span id="child"></span></div>');
      body.querySelector('#parent').addEventListener('task:delete', (e) => e.preventDefault());
      expect(emitCustom(body.querySelector('#child'), 'task:delete', {})).to.equal(false);
    });
  });

  describe('trapFocus', () => {
    function setup() {
      return mount(`
        <button id="outside">outside</button>
        <div id="modal">
          <button id="first">first</button>
          <button disabled>disabled</button>
          <input id="middle" />
          <span tabindex="-1">skip me</span>
          <a href="#" id="last">last</a>
        </div>`);
    }

    it('focuses the first tabbable element', () => {
      const body = setup();
      trapFocus(body.querySelector('#modal'));
      expect(document.activeElement.id).to.equal('first');
    });

    it('wraps Tab from the last element to the first', () => {
      const body = setup();
      trapFocus(body.querySelector('#modal'));
      body.querySelector('#last').focus();
      const e = tab(document.activeElement);
      expect(e.defaultPrevented).to.equal(true);
      expect(document.activeElement.id).to.equal('first');
    });

    it('wraps Shift+Tab from the first element to the last', () => {
      const body = setup();
      trapFocus(body.querySelector('#modal'));
      const e = tab(document.activeElement, true);
      expect(e.defaultPrevented).to.equal(true);
      expect(document.activeElement.id).to.equal('last');
    });

    it('lets the browser handle Tab in the middle, and cleans up', () => {
      const body = setup();
      const cleanup = trapFocus(body.querySelector('#modal'));
      body.querySelector('#middle').focus();
      expect(tab(document.activeElement).defaultPrevented).to.equal(false);
      cleanup();
      body.querySelector('#last').focus();
      expect(tab(document.activeElement).defaultPrevented).to.equal(false);
    });
  });

  describe('serializeForm', () => {
    it('turns a form into an object, collecting repeated names into arrays', () => {
      const body = mount(`
        <form id="f">
          <input name="title" value="Login form" />
          <select name="priority"><option value="low">low</option><option value="high" selected>high</option></select>
          <input type="checkbox" name="labels" value="ui" checked />
          <input type="checkbox" name="labels" value="auth" checked />
          <input type="checkbox" name="labels" value="backend" />
          <input type="checkbox" name="urgent" value="yes" />
        </form>`);
      expect(serializeForm(body.querySelector('#f'))).to.deep.equal({
        title: 'Login form',
        priority: 'high',
        labels: ['ui', 'auth'],
      });
    });
  });
});
