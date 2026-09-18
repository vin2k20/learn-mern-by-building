// Lab 10 · ready-made tests. Don't edit.
import { expect } from 'chai';
import {
  scaleForDPR,
  pointInRect,
  pointInEllipse,
  distanceToSegment,
  hitTestShapes,
  niceTicks,
  lerp,
  clamp,
  easeOutCubic,
  simplifyPath,
} from './canvas-helpers.js';

// ☆ Stretch suites run with `npm run test:stretch` (any OS) or STRETCH=1 (macOS/Linux shells).
const stretch =
  process.env.STRETCH || process.env.npm_lifecycle_event === 'test:stretch' ? describe : describe.skip;

describe('Lab 10 · canvas helpers', () => {
  describe('scaleForDPR', () => {
    it('scales the backing store by the device pixel ratio', () => {
      expect(scaleForDPR({ cssWidth: 300, cssHeight: 150, dpr: 2 })).to.deep.equal({ width: 600, height: 300, scale: 2 });
      expect(scaleForDPR({ cssWidth: 101, cssHeight: 51, dpr: 1.5 })).to.deep.equal({ width: 152, height: 77, scale: 1.5 });
    });

    it('defaults dpr to 1 and caps it at maxDpr', () => {
      expect(scaleForDPR({ cssWidth: 10, cssHeight: 10 })).to.deep.equal({ width: 10, height: 10, scale: 1 });
      expect(scaleForDPR({ cssWidth: 10, cssHeight: 10, dpr: 4 }).scale).to.equal(3);
      expect(scaleForDPR({ cssWidth: 10, cssHeight: 10, dpr: 4, maxDpr: 2 })).to.deep.equal({ width: 20, height: 20, scale: 2 });
    });
  });

  describe('pointInRect / pointInEllipse', () => {
    it('includes edges and handles negative sizes', () => {
      const r = { x: 10, y: 10, w: 20, h: 10 };
      expect(pointInRect(10, 10, r)).to.equal(true);
      expect(pointInRect(30, 20, r)).to.equal(true);
      expect(pointInRect(31, 15, r)).to.equal(false);
      expect(pointInRect(15, 15, { x: 30, y: 20, w: -20, h: -10 })).to.equal(true);
    });

    it('tests ellipses', () => {
      const e = { x: 0, y: 0, w: 100, h: 50 };
      expect(pointInEllipse(50, 25, e)).to.equal(true);
      expect(pointInEllipse(100, 25, e)).to.equal(true);
      expect(pointInEllipse(95, 5, e)).to.equal(false);
      expect(pointInEllipse(50, 25, { x: 100, y: 50, w: -100, h: -50 })).to.equal(true);
      expect(pointInEllipse(0, 0, { x: 0, y: 0, w: 0, h: 10 })).to.equal(false);
    });
  });

  describe('distanceToSegment', () => {
    it('measures perpendicular and endpoint distances', () => {
      expect(distanceToSegment([5, 5], [0, 0], [10, 0])).to.equal(5);
      expect(distanceToSegment([-3, 4], [0, 0], [10, 0])).to.equal(5);
      expect(distanceToSegment([13, 4], [0, 0], [10, 0])).to.equal(5);
      expect(distanceToSegment([3, 4], [0, 0], [0, 0])).to.equal(5);
    });
  });

  describe('hitTestShapes', () => {
    const shapes = [
      { id: 'big-rect', type: 'rect', x: 0, y: 0, w: 200, h: 200, strokeWidth: 2 },
      { id: 'circle', type: 'ellipse', x: 50, y: 50, w: 40, h: 40, strokeWidth: 2 },
      { id: 'diag', type: 'line', x: 100, y: 100, w: 100, h: 100, strokeWidth: 4 },
      { id: 'stroke', type: 'pen', points: [[300, 300], [310, 300], [320, 310]], strokeWidth: 2 },
      { id: 'dot', type: 'pen', points: [[400, 400]], strokeWidth: 6 },
    ];

    it('returns the topmost shape under the point', () => {
      expect(hitTestShapes(shapes, 70, 70)).to.equal('circle');
      expect(hitTestShapes(shapes, 10, 10)).to.equal('big-rect');
      expect(hitTestShapes(shapes, 150, 152)).to.equal('diag');
    });

    it('uses stroke width plus tolerance for lines and pens', () => {
      expect(hitTestShapes(shapes, 305, 305)).to.equal('stroke');
      expect(hitTestShapes(shapes, 305, 320)).to.equal(null);
      expect(hitTestShapes(shapes, 405, 400)).to.equal('dot');
      expect(hitTestShapes(shapes, 150, 160, 0)).to.equal('big-rect');
    });

    it('returns null when nothing is hit', () => {
      expect(hitTestShapes(shapes, 999, 999)).to.equal(null);
      expect(hitTestShapes([], 0, 0)).to.equal(null);
    });
  });

  describe('niceTicks', () => {
    it('produces human-friendly axis ticks', () => {
      expect(niceTicks(0, 37)).to.deep.equal({ niceMin: 0, niceMax: 40, step: 10, ticks: [0, 10, 20, 30, 40] });
      expect(niceTicks(0, 8)).to.deep.equal({ niceMin: 0, niceMax: 8, step: 2, ticks: [0, 2, 4, 6, 8] });
      expect(niceTicks(3, 97).ticks).to.deep.equal([0, 20, 40, 60, 80, 100]);
    });

    it('rounds away floating-point noise', () => {
      expect(niceTicks(0, 1).ticks).to.deep.equal([0, 0.2, 0.4, 0.6, 0.8, 1]);
    });

    it('handles a zero range', () => {
      const { ticks } = niceTicks(5, 5);
      expect(ticks[0]).to.be.at.most(5);
      expect(ticks.at(-1)).to.be.at.least(5);
      expect(ticks).to.include(5);
      expect(ticks.length).to.be.within(2, 10);
    });
  });

  describe('lerp / clamp / easeOutCubic', () => {
    it('interpolates, clamps and eases', () => {
      expect(lerp(0, 100, 0.25)).to.equal(25);
      expect(lerp(10, 20, 0)).to.equal(10);
      expect(clamp(5, 0, 3)).to.equal(3);
      expect(clamp(-1, 0, 3)).to.equal(0);
      expect(clamp(2, 0, 3)).to.equal(2);
      expect(easeOutCubic(0)).to.equal(0);
      expect(easeOutCubic(1)).to.equal(1);
      expect(easeOutCubic(0.5)).to.equal(0.875);
    });
  });

  stretch('☆ simplifyPath (Ramer–Douglas–Peucker)', () => {
    it('collapses a straight line to its endpoints', () => {
      const line = Array.from({ length: 20 }, (_, i) => [i, i * 2]);
      expect(simplifyPath(line, 0.5)).to.deep.equal([
        [0, 0],
        [19, 38],
      ]);
    });

    it('keeps corners above epsilon', () => {
      const corner = [[0, 0], [5, 0.1], [10, 0], [10, 5], [10, 10]];
      expect(simplifyPath(corner, 1)).to.deep.equal([
        [0, 0],
        [10, 0],
        [10, 10],
      ]);
    });

    it('returns short paths unchanged', () => {
      expect(simplifyPath([[1, 1]], 1)).to.deep.equal([[1, 1]]);
      expect(simplifyPath([[1, 1], [2, 2]], 1)).to.deep.equal([[1, 1], [2, 2]]);
    });
  });
});
