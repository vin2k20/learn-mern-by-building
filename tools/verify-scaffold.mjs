#!/usr/bin/env node
/**
 * Repo health check for MAINTAINERS and CONTRIBUTORS of the original repository.
 * (Learners: you don't need this. Once you start coding, check #1 is SUPPOSED to fail in your copy.)
 *
 * Checks:
 *   1. Instruction-only files (client/, server/, landing/, lab playgrounds) contain nothing but comments,
 *      and no comment block ends early.
 *   2. Every lab stub file has an instruction block and TODO stubs.
 *   3. Relative Markdown links and #anchors resolve.
 *   4. Required project files exist.
 *   5. With --run-labs (needs `cd labs && npm ci` first): the lab test suite LOADS, and every test fails with TODO
 *      (0 passing), so no solution has leaked into the stubs and no test crashes at import time.
 *
 * Usage: node tools/verify-scaffold.mjs [--run-labs]
 * Zero dependencies: Node 24 only.
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, dirname, resolve, extname, basename } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const problems = [];
const report = (msg) => problems.push(msg);
const rel = (p) => relative(ROOT, p).split('\\').join('/');

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (name === 'node_modules' || name === '.git' || name === 'dist' || name === 'coverage') continue;
    const p = join(dir, name);
    statSync(p).isDirectory() ? walk(p, out) : out.push(p);
  }
  return out;
}

// ── 1. Instruction-only files ────────────────────────────────────────────────
const INSTRUCTION_SCOPES = ['client', 'server', 'landing', 'labs/09-dom-events/playground', 'labs/10-canvas/playground', 'labs/11-babel-jsx/src'];
const NOT_INSTRUCTION_FILES = new Set([
  'client/src/mocks/data/seed.json', 'client/public/favicon.svg', 'client/.env.example', 'server/.env.example',
]);
// Files that may contain a few real config lines (explained in their comments).
const ALLOWED_CONFIG_LINES = { 'server/.mocharc.yml': ['spec:', 'timeout:'] };

const stripJsCss = (src) => src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '').trim();
let instructionCount = 0;
for (const scope of INSTRUCTION_SCOPES) {
  const dir = join(ROOT, scope);
  if (!existsSync(dir)) { report(`missing folder: ${scope}`); continue; }
  for (const file of walk(dir)) {
    const r = rel(file);
    if (NOT_INSTRUCTION_FILES.has(r) || r.endsWith('.md')) continue;
    const src = readFileSync(file, 'utf8');
    const ext = extname(file);
    instructionCount++;
    if (['.js', '.jsx', '.mjs', '.css'].includes(ext)) {
      const rest = stripJsCss(src);
      if (rest) report(`${r}: contains non-comment content → ${JSON.stringify(rest.slice(0, 60))}`);
      if (!src.includes('/*')) report(`${r}: has no instruction block`);
    } else if (ext === '.html') {
      const rest = src.replace(/<!--[\s\S]*?-->/g, '').trim();
      if (rest) report(`${r}: contains non-comment HTML → ${JSON.stringify(rest.slice(0, 60))}`);
    } else if (ext === '.yml' || ext === '.yaml' || basename(file) === 'Dockerfile') {
      const allowed = ALLOWED_CONFIG_LINES[r] ?? [];
      const bad = src.split('\n').filter((l) => l.trim() && !l.trim().startsWith('#') && !allowed.some((a) => l.startsWith(a)));
      if (bad.length) report(`${r}: ${bad.length} non-comment line(s), e.g. ${JSON.stringify(bad[0])}`);
    } else {
      report(`${r}: unexpected file type in an instruction-only folder (add it to NOT_INSTRUCTION_FILES if intended)`);
    }
  }
}

// ── 2. Lab stubs ─────────────────────────────────────────────────────────────
const labDirs = readdirSync(join(ROOT, 'labs')).filter((d) => /^\d\d-/.test(d));
for (const d of labDirs) {
  const files = readdirSync(join(ROOT, 'labs', d));
  if (!files.includes('README.md')) report(`labs/${d}: missing README.md`);
  if (!files.some((f) => f.endsWith('.test.js'))) report(`labs/${d}: missing test file`);
  for (const f of files.filter((f) => f.endsWith('.js') && !f.endsWith('.test.js'))) {
    const src = readFileSync(join(ROOT, 'labs', d, f), 'utf8');
    if (!src.includes('🎯 GOAL')) report(`labs/${d}/${f}: missing instruction block`);
    if (!/TODO/.test(stripJsCss(src))) report(`labs/${d}/${f}: stubs should throw TODO errors`);
  }
}

// ── 3. Markdown links ────────────────────────────────────────────────────────
const slug = (h) => h.trim().toLowerCase().replace(/<[^>]+>/g, '').replace(/[^\p{L}\p{N}\s_-]/gu, '').replace(/\s/g, '-');
const anchorCache = new Map();
const anchorsOf = (file) => {
  if (!anchorCache.has(file)) {
    const text = readFileSync(file, 'utf8').replace(/```[\s\S]*?```/g, '');
    anchorCache.set(file, new Set(text.split('\n').filter((l) => /^#{1,6}\s/.test(l)).map((l) => slug(l.replace(/^#+\s*/, '')))));
  }
  return anchorCache.get(file);
};
let linkCount = 0;
for (const file of walk(ROOT).filter((f) => f.endsWith('.md'))) {
  const text = readFileSync(file, 'utf8').replace(/```[\s\S]*?```/g, '');
  for (const [, target] of text.matchAll(/\]\(([^)\s]+)\)/g)) {
    if (/^(https?:|mailto:)/.test(target)) continue;
    linkCount++;
    const [path, anchor] = target.split('#');
    const abs = path ? resolve(dirname(file), path) : file;
    if (!existsSync(abs)) { report(`${rel(file)}: broken link → ${target}`); continue; }
    if (anchor && abs.endsWith('.md') && !anchorsOf(abs).has(anchor)) report(`${rel(file)}: broken anchor → ${target}`);
  }
}

// ── 4. Required files ────────────────────────────────────────────────────────
for (const f of ['README.md', 'LICENSE', 'CONTRIBUTING.md', 'CODE_OF_CONDUCT.md', 'CHANGELOG.md', 'ROADMAP.md', 'PROGRESS.md',
  'CLAUDE.md', 'AGENTS.md', '.nvmrc', '.gitignore', '.gitattributes', 'labs/package.json', 'labs/package-lock.json',
  'docs/getting-started.md', 'docs/api-contract.md', 'docs/product-brief.md']) {
  if (!existsSync(join(ROOT, f))) report(`missing required file: ${f}`);
}
for (const s of ['explain', 'hint', 'review', 'quiz', 'progress', 'unstuck']) {
  const p = join(ROOT, '.claude/skills', s, 'SKILL.md');
  if (!existsSync(p)) { report(`missing skill: ${s}`); continue; }
  const head = readFileSync(p, 'utf8').split('---')[1] ?? '';
  if (!head.includes(`name: ${s}`) || !head.includes('description:')) report(`skill ${s}: invalid frontmatter`);
}

// ── 5. Lab suite loads and every test fails with TODO ────────────────────────
if (process.argv.includes('--run-labs')) {
  const labs = join(ROOT, 'labs');
  if (!existsSync(join(labs, 'node_modules'))) {
    report('--run-labs: run `cd labs && npm ci` first');
  } else {
    const res = spawnSync(process.execPath, ['node_modules/mocha/bin/mocha.js', '--reporter', 'json', '[0-9][0-9]-*/*.test.js'], {
      cwd: labs, encoding: 'utf8', env: { ...process.env, STRETCH: '1' }, maxBuffer: 64 * 1024 * 1024,
    });
    try {
      const json = JSON.parse(res.stdout.slice(res.stdout.indexOf('{')));
      const { passes, failures, tests } = json.stats;
      const notTodo = json.failures.filter((f) => !/TODO|fill in predictions/.test(`${f.err?.message} ${f.err?.stack}`));
      console.log(`labs: ${tests} tests, ${passes} passing, ${failures} failing (expected: 0 passing)`);
      if (passes > 0) report(`labs: ${passes} test(s) pass against the stubs → a solution leaked into a stub, or a test is too weak: ${json.passes.map((p) => p.fullTitle).slice(0, 5).join(' | ')}`);
      if (tests < 300) report(`labs: only ${tests} tests loaded, so a suite probably crashed at import time`);
      if (notTodo.length) report(`labs: ${notTodo.length} failure(s) are not TODO errors, e.g. "${notTodo[0].fullTitle}": ${notTodo[0].err?.message}`);
    } catch {
      report(`labs: could not parse the mocha output (did a suite crash on load?)\n${res.stderr.slice(0, 800)}`);
    }
  }
}

console.log(`checked ${instructionCount} instruction files, ${labDirs.length} labs, ${linkCount} markdown links`);
if (problems.length) {
  console.error(`\n✖ ${problems.length} problem(s):\n- ${problems.join('\n- ')}`);
  process.exit(1);
}
console.log('✔ scaffold is healthy');
