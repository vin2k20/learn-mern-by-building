// Lab 05 · ready-made tests. Don't edit.
import { expect } from 'chai';
import {
  sleep,
  promiseAll,
  promiseAllSettled,
  promiseRace,
  promiseAny,
  withTimeout,
  retry,
  mapLimit,
  promisify,
  predictions,
} from './async.js';

// If the code under test isn't written yet (TODO) or never threw (expect.fail), show THAT error
// instead of a confusing "expected 'Error' to equal 'TimeoutError'".
function rethrowUnexpected(e) {
  if (String(e?.message).startsWith('TODO') || e?.name === 'AssertionError') throw e;
}

const delay = (ms, value, fail = false) =>
  new Promise((resolve, reject) => setTimeout(() => (fail ? reject(value) : resolve(value)), ms));

async function withCombinatorsDisabled(run) {
  const saved = {};
  for (const name of ['all', 'allSettled', 'race', 'any']) {
    saved[name] = Promise[name];
    Promise[name] = () => {
      throw new Error(`built-in Promise.${name} must not be used`);
    };
  }
  try {
    return await run();
  } finally {
    Object.assign(Promise, saved);
  }
}

async function settlesWithin(promise, ms) {
  let settled = false;
  promise.then(
    () => (settled = true),
    () => (settled = true),
  );
  await delay(ms);
  return settled;
}

describe('Lab 05 · async & the event loop', () => {
  describe('sleep', () => {
    it('resolves with undefined after roughly ms', async () => {
      const start = performance.now();
      const value = await sleep(30);
      expect(value).to.equal(undefined);
      expect(performance.now() - start).to.be.at.least(25);
    });
  });

  describe('promiseAll', () => {
    it('resolves values in input order, not completion order', async () => {
      const out = await withCombinatorsDisabled(() =>
        promiseAll([delay(20, 'slow'), delay(1, 'fast'), 'plain']),
      );
      expect(out).to.deep.equal(['slow', 'fast', 'plain']);
    });

    it('resolves [] for empty input and accepts any iterable', async () => {
      expect(await promiseAll([])).to.deep.equal([]);
      expect(await promiseAll(new Set([1, delay(1, 2)]))).to.deep.equal([1, 2]);
    });

    it('rejects as soon as one input rejects', async () => {
      const start = performance.now();
      try {
        await promiseAll([delay(200, 'slow'), delay(5, new Error('nope'), true)]);
        expect.fail('should reject');
      } catch (e) {
        rethrowUnexpected(e);
        expect(e.message).to.equal('nope');
        expect(performance.now() - start).to.be.below(150);
      }
    });

    it('handles results that arrive out of order (index 1 last)', async () => {
      const out = await promiseAll([delay(1, 'a'), delay(15, 'b'), delay(5, 'c')]);
      expect(out).to.deep.equal(['a', 'b', 'c']);
    });
  });

  describe('promiseAllSettled', () => {
    it('reports every outcome and never rejects', async () => {
      const err = new Error('x');
      const out = await withCombinatorsDisabled(() =>
        promiseAllSettled([delay(5, 1), Promise.reject(err), 3]),
      );
      expect(out).to.deep.equal([
        { status: 'fulfilled', value: 1 },
        { status: 'rejected', reason: err },
        { status: 'fulfilled', value: 3 },
      ]);
      expect(await promiseAllSettled([])).to.deep.equal([]);
    });
  });

  describe('promiseRace', () => {
    it('settles with the first settled input', async () => {
      const winner = await withCombinatorsDisabled(() =>
        promiseRace([delay(30, 'slow'), delay(5, 'fast')]),
      );
      expect(winner).to.equal('fast');
      try {
        await promiseRace([delay(30, 'slow'), delay(5, new Error('first'), true)]);
        expect.fail('should reject');
      } catch (e) {
        rethrowUnexpected(e);
        expect(e.message).to.equal('first');
      }
    });

    it('never settles for empty input', async () => {
      expect(await settlesWithin(promiseRace([]), 20)).to.equal(false);
    });
  });

  describe('promiseAny', () => {
    it('resolves with the first fulfilled value, ignoring rejections', async () => {
      const out = await withCombinatorsDisabled(() =>
        promiseAny([delay(1, new Error('a'), true), delay(20, 'ok'), delay(10, 'first ok')]),
      );
      expect(out).to.equal('first ok');
    });

    it('rejects with an AggregateError (errors in input order) when all reject', async () => {
      try {
        await promiseAny([delay(10, 'e1', true), delay(1, 'e2', true)]);
        expect.fail('should reject');
      } catch (e) {
        rethrowUnexpected(e);
        expect(e).to.be.instanceOf(AggregateError);
        expect(e.errors).to.deep.equal(['e1', 'e2']);
      }
    });

    it('rejects with an AggregateError for empty input', async () => {
      try {
        await promiseAny([]);
        expect.fail('should reject');
      } catch (e) {
        rethrowUnexpected(e);
        expect(e).to.be.instanceOf(AggregateError);
      }
    });
  });

  describe('withTimeout', () => {
    it('resolves when the promise is fast enough', async () => {
      expect(await withTimeout(delay(5, 'ok'), 50)).to.equal('ok');
    });

    it('rejects with a TimeoutError when too slow', async () => {
      try {
        await withTimeout(delay(100, 'late'), 10);
        expect.fail('should time out');
      } catch (e) {
        rethrowUnexpected(e);
        expect(e.name).to.equal('TimeoutError');
      }
    });

    it('passes through rejections of the original promise', async () => {
      try {
        await withTimeout(delay(5, new Error('boom'), true), 50);
        expect.fail('should reject');
      } catch (e) {
        rethrowUnexpected(e);
        expect(e.message).to.equal('boom');
      }
    });
  });

  describe('retry', () => {
    it('retries until success and passes the attempt number', async () => {
      const attempts = [];
      const value = await retry(async (attempt) => {
        attempts.push(attempt);
        if (attempt < 3) throw new Error(`fail ${attempt}`);
        return 'done';
      });
      expect(value).to.equal('done');
      expect(attempts).to.deep.equal([1, 2, 3]);
    });

    it('rethrows the last error after retries + 1 attempts', async () => {
      let calls = 0;
      try {
        await retry(
          async () => {
            calls += 1;
            throw new Error(`fail ${calls}`);
          },
          { retries: 2 },
        );
        expect.fail('should reject');
      } catch (e) {
        rethrowUnexpected(e);
        expect(e.message).to.equal('fail 3');
        expect(calls).to.equal(3);
      }
    });

    it('waits with exponential backoff', async () => {
      const times = [];
      const start = performance.now();
      await retry(
        async (attempt) => {
          times.push(performance.now() - start);
          if (attempt < 3) throw new Error('again');
          return true;
        },
        { retries: 3, delay: 20, factor: 2 },
      );
      // waits ≈ 20ms then ≈ 40ms
      expect(times[1] - times[0]).to.be.at.least(15);
      expect(times[2] - times[1]).to.be.at.least(35);
    });

    it('stops immediately when shouldRetry returns false', async () => {
      let calls = 0;
      try {
        await retry(
          async () => {
            calls += 1;
            const err = new Error('bad request');
            err.status = 400;
            throw err;
          },
          { retries: 5, shouldRetry: (e) => e.status >= 500 },
        );
        expect.fail('should reject');
      } catch (e) {
        rethrowUnexpected(e);
        expect(e.status).to.equal(400);
        expect(calls).to.equal(1);
      }
    });
  });

  describe('mapLimit', () => {
    it('keeps input order and never exceeds the limit (but uses it)', async () => {
      let active = 0;
      let maxActive = 0;
      const out = await mapLimit([30, 10, 20, 5, 15, 1], 2, async (ms, i) => {
        active += 1;
        maxActive = Math.max(maxActive, active);
        await delay(ms);
        active -= 1;
        return `${i}:${ms}`;
      });
      expect(out).to.deep.equal(['0:30', '1:10', '2:20', '3:5', '4:15', '5:1']);
      expect(maxActive).to.equal(2);
    });

    it('runs in parallel (faster than sequential)', async () => {
      const start = performance.now();
      await mapLimit([30, 30, 30, 30], 4, (ms) => delay(ms));
      expect(performance.now() - start).to.be.below(90);
    });

    it('rejects on the first error and stops starting new work', async () => {
      const started = [];
      try {
        await mapLimit([1, 2, 3, 4, 5, 6], 2, async (n) => {
          started.push(n);
          await delay(5);
          if (n === 2) throw new Error('item 2 failed');
          return n;
        });
        expect.fail('should reject');
      } catch (e) {
        rethrowUnexpected(e);
        expect(e.message).to.equal('item 2 failed');
      }
      await delay(30);
      expect(started.length).to.be.below(6);
    });

    it('handles empty input and limits above the item count', async () => {
      expect(await mapLimit([], 3, async (x) => x)).to.deep.equal([]);
      expect(await mapLimit([1, 2], 10, async (x) => x * 2)).to.deep.equal([2, 4]);
    });
  });

  describe('promisify', () => {
    function nodeStyle(a, b, cb) {
      setTimeout(() => (a < 0 ? cb(new Error('negative')) : cb(null, a + b + (this?.bonus ?? 0))), 1);
    }

    it('resolves with the callback value', async () => {
      expect(await promisify(nodeStyle)(1, 2)).to.equal(3);
    });

    it('rejects with the callback error', async () => {
      try {
        await promisify(nodeStyle)(-1, 2);
        expect.fail('should reject');
      } catch (e) {
        rethrowUnexpected(e);
        expect(e.message).to.equal('negative');
      }
    });

    it('keeps `this`', async () => {
      const obj = { bonus: 10, add: promisify(nodeStyle) };
      expect(await obj.add(1, 2)).to.equal(13);
    });
  });

  describe('predict the output (fill in `predictions`)', () => {
    /* eslint-disable */
    const snippets = {
      async p1() {
        const log = [];
        log.push('A');
        setTimeout(() => log.push('B'), 0);
        Promise.resolve().then(() => log.push('C'));
        queueMicrotask(() => log.push('D'));
        log.push('E');
        await delay(10);
        return log;
      },
      async p2() {
        const log = [];
        async function inner() { log.push('inner start'); await null; log.push('inner end'); }
        log.push('start');
        inner();
        Promise.resolve().then(() => log.push('then'));
        log.push('end');
        await delay(10);
        return log;
      },
      async p3() {
        const log = [];
        const p = new Promise((resolve) => { log.push('executor'); resolve('R'); log.push('after resolve'); });
        p.then((v) => log.push(v));
        log.push('sync');
        await p;
        log.push('awaited');
        return log;
      },
      async p4() {
        const log = [];
        setTimeout(() => { log.push('T1'); Promise.resolve().then(() => log.push('M-in-T1')); }, 0);
        setTimeout(() => log.push('T2'), 0);
        Promise.resolve().then(() => { log.push('M1'); setTimeout(() => log.push('T3'), 0); });
        await delay(30);
        return log;
      },
      async p5() {
        const log = [];
        try {
          setTimeout(() => { try { throw new Error('late'); } catch { log.push('caught inside timer'); } }, 0);
          await Promise.reject(new Error('early'));
        } catch (e) {
          log.push(`caught ${e.message}`);
        }
        await delay(10);
        return log;
      },
      async p6() {
        const log = [];
        const wait = (ms, v) => new Promise((r) => setTimeout(() => { log.push(v); r(v); }, ms));
        const result = await Promise.all([wait(15, 'slow'), wait(1, 'fast')]);
        log.push(result.join('+'));
        return log;
      },
    };
    /* eslint-enable */

    for (const [key, run] of Object.entries(snippets)) {
      it(`${key} is predicted correctly`, async () => {
        expect(predictions[key], `fill in predictions.${key}`).to.be.an('array');
        expect(predictions[key]).to.deep.equal(await run());
      });
    }
  });
});
