// Lab 11 · ready-made tests. Don't edit.
import { expect } from 'chai';
import { transformSync } from '@babel/core';
import { compileClassic, compileAutomatic, compileForLegacy } from './compile.js';
import { buildCard } from './handwritten.js';
import removeConsole from './remove-console-plugin.js';

// ☆ Stretch suites run with `npm run test:stretch` (any OS) or STRETCH=1 (macOS/Linux shells).
const stretch =
  process.env.STRETCH || process.env.npm_lifecycle_event === 'test:stretch' ? describe : describe.skip;
const base = { configFile: false, babelrc: false };

describe('Lab 11 · Babel & JSX', () => {
  describe('compileClassic', () => {
    it('turns JSX into React.createElement calls', () => {
      const out = compileClassic('const a = <div className="x">hi</div>;');
      expect(out).to.be.a('string');
      expect(out).to.match(/React\.createElement\(\s*"div"/);
      expect(out).to.not.include('jsx-runtime');
    });

    it('uses React.Fragment for <></>', () => {
      expect(compileClassic('const f = <><p /></>;')).to.include('React.Fragment');
    });

    it('supports a custom pragma (Preact-style h)', () => {
      const out = compileClassic('const f = <><p id="a" /></>;', { pragma: 'h', pragmaFrag: 'Fragment' });
      expect(out).to.match(/h\(\s*Fragment/);
      expect(out).to.match(/h\(\s*"p"/);
      expect(out).to.not.include('React');
    });
  });

  describe('compileAutomatic', () => {
    it('imports jsx from react/jsx-runtime (production transform)', () => {
      const out = compileAutomatic('const a = <div className="x">hi</div>;');
      expect(out).to.match(/from\s+"react\/jsx-runtime"/);
      expect(out).to.match(/_jsx\(\s*"div"/);
      expect(out).to.not.include('createElement');
      expect(out).to.not.include('jsxDEV');
    });

    it('passes key separately and moves children into props', () => {
      const out = compileAutomatic('const a = <li key={id}>x</li>;');
      expect(out).to.match(/children:\s*"x"/);
      expect(out).to.match(/\},\s*id\)/);
    });

    it('uses jsxs for multiple static children', () => {
      expect(compileAutomatic('const a = <ul><li /><li /></ul>;')).to.match(/_jsxs\(/);
    });

    it('supports development mode and a custom importSource', () => {
      expect(compileAutomatic('const a = <b />;', { development: true })).to.include('react/jsx-dev-runtime');
      expect(compileAutomatic('const a = <b />;', { importSource: 'preact' })).to.include('preact/jsx-runtime');
    });
  });

  describe('compileForLegacy', () => {
    it('transpiles modern syntax for old targets', () => {
      const out = compileForLegacy('const f = (a) => a ?? 1;\nclass Task { #id = 1; get id() { return this.#id; } }');
      expect(out).to.not.include('=>');
      expect(out).to.not.include('??');
      expect(out).to.not.match(/\bclass\s+Task\b/);
      expect(out).to.not.match(/\bconst\s/);
    });

    it('leaves modern syntax alone for modern targets', () => {
      const out = compileForLegacy('const f = (a) => a ?? 1;', { chrome: '120' });
      expect(out).to.include('=>');
      expect(out).to.include('??');
    });
  });

  describe('buildCard (handwritten createElement calls)', () => {
    const jsx = `const __el = (
      <article className="card">
        <h2>{title}</h2>
        {done && <span className="badge">Done</span>}
        <ul>
          {tags.map((tag) => <li key={tag}>{tag}</li>)}
        </ul>
      </article>
    );`;
    const compiled = transformSync(jsx, {
      ...base,
      presets: [['@babel/preset-react', { runtime: 'classic', pragma: 'h' }]],
    }).code;
    const fromBabel = new Function('h', 'title', 'done', 'tags', `${compiled}\nreturn __el;`);
    const h = (type, props, ...children) => ({ type, props, children });

    for (const props of [
      { title: 'Ship it', done: false, tags: ['ui', 'auth'] },
      { title: 'Done task', done: true, tags: [] },
    ]) {
      it(`matches Babel's output for done=${props.done}`, () => {
        expect(buildCard(h, props)).to.deep.equal(fromBabel(h, props.title, props.done, props.tags));
      });
    }
  });

  describe('remove-console plugin', () => {
    const run = (code, opts) =>
      transformSync(code, { ...base, plugins: [opts ? [removeConsole, opts] : removeConsole] }).code;

    it('removes console.log statements but keeps other code', () => {
      const out = run('console.log("a"); foo(); console.debug("b");');
      expect(out).to.not.include('console');
      expect(out).to.include('foo()');
    });

    it('keeps error and warn by default, configurable via `exclude`', () => {
      const code = 'console.error("x"); console.warn("y"); console.info("z");';
      const out = run(code);
      expect(out).to.include('console.error');
      expect(out).to.include('console.warn');
      expect(out).to.not.include('console.info');
      expect(run(code, { exclude: [] })).to.not.include('console');
    });

    it('replaces calls used as expressions with void 0', () => {
      const out = run('const x = ready && console.log(1);');
      expect(out).to.include('void 0');
      expect(out).to.not.include('console');
    });

    it('handles computed string properties', () => {
      expect(run('console["debug"]("x");')).to.not.include('console');
    });

    it('does not touch look-alikes', () => {
      const out = run('myconsole.log(1); console.logger(2); log(3);');
      expect(out).to.include('myconsole.log(1)');
      expect(out).to.include('console.logger(2)');
      expect(out).to.include('log(3)');
    });
  });

  stretch('☆ remove-console respects local bindings', () => {
    it('keeps calls on a local variable named console', () => {
      const out = transformSync('function f(console) { console.log(1); }\nconsole.log(2);', {
        ...base,
        plugins: [removeConsole],
      }).code;
      expect(out).to.include('console.log(1)');
      expect(out).to.not.include('console.log(2)');
    });
  });
});
