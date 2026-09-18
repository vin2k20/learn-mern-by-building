// Lab 08 · ready-made tests. Don't edit.
import { expect } from 'chai';
import {
  binarySearch,
  lowerBound,
  mergeSort,
  twoSum,
  isBalanced,
  longestUniqueSubstring,
  groupAnagrams,
  fuzzyScore,
  keyedDiff,
  virtualWindow,
} from './algorithms.js';

describe('Lab 08 · algorithms', () => {
  describe('binarySearch / lowerBound', () => {
    it('finds items or returns -1', () => {
      expect(binarySearch([1, 3, 5, 7, 9], 7)).to.equal(3);
      expect(binarySearch([1, 3, 5, 7, 9], 1)).to.equal(0);
      expect(binarySearch([1, 3, 5, 7, 9], 4)).to.equal(-1);
      expect(binarySearch([], 1)).to.equal(-1);
    });

    it('lowerBound returns the insertion point', () => {
      expect(lowerBound([1, 3, 3, 5], 3)).to.equal(1);
      expect(lowerBound([1, 3], 4)).to.equal(2);
      expect(lowerBound([1, 3], 0)).to.equal(0);
      expect(lowerBound([], 1)).to.equal(0);
    });
  });

  describe('mergeSort', () => {
    it('sorts without mutating or using the built-in sort', () => {
      const input = Object.freeze([5, 1, 4, 2, 3, 2]);
      const { sort, toSorted } = Array.prototype;
      let out;
      Array.prototype.sort = Array.prototype.toSorted = () => {
        throw new Error('built-in sort must not be used');
      };
      try {
        out = mergeSort(input);
      } finally {
        Array.prototype.sort = sort;
        Array.prototype.toSorted = toSorted;
      }
      expect(out).to.deep.equal([1, 2, 2, 3, 4, 5]);
      expect(input).to.deep.equal([5, 1, 4, 2, 3, 2]);
    });

    it('is stable with a custom comparator', () => {
      const people = [
        { name: 'A', team: 'web' },
        { name: 'B', team: 'api' },
        { name: 'C', team: 'web' },
        { name: 'D', team: 'api' },
        { name: 'E', team: 'web' },
      ];
      const out = mergeSort(people, (a, b) => a.team.localeCompare(b.team));
      expect(out.map((p) => p.name)).to.deep.equal(['B', 'D', 'A', 'C', 'E']);
    });

    it('sorts strings by default and handles tiny arrays', () => {
      expect(mergeSort(['pear', 'apple', 'fig'])).to.deep.equal(['apple', 'fig', 'pear']);
      expect(mergeSort([])).to.deep.equal([]);
      expect(mergeSort([1])).to.deep.equal([1]);
    });
  });

  describe('twoSum', () => {
    it('returns index pairs or null', () => {
      expect(twoSum([2, 7, 11, 15], 9)).to.deep.equal([0, 1]);
      expect(twoSum([3, 2, 4], 6)).to.deep.equal([1, 2]);
      expect(twoSum([3, 3], 6)).to.deep.equal([0, 1]);
      expect(twoSum([1, 2], 10)).to.equal(null);
    });
  });

  describe('isBalanced', () => {
    it('validates bracket nesting', () => {
      expect(isBalanced('([]{})')).to.equal(true);
      expect(isBalanced('fn(a[0], {b: 1})')).to.equal(true);
      expect(isBalanced('')).to.equal(true);
      expect(isBalanced('(]')).to.equal(false);
      expect(isBalanced('((')).to.equal(false);
      expect(isBalanced('())')).to.equal(false);
    });
  });

  describe('longestUniqueSubstring', () => {
    it('uses a sliding window', () => {
      expect(longestUniqueSubstring('abcabcbb')).to.equal(3);
      expect(longestUniqueSubstring('bbbbb')).to.equal(1);
      expect(longestUniqueSubstring('pwwkew')).to.equal(3);
      expect(longestUniqueSubstring('dvdf')).to.equal(3);
      expect(longestUniqueSubstring('abba')).to.equal(2);
      expect(longestUniqueSubstring('')).to.equal(0);
    });
  });

  describe('groupAnagrams', () => {
    it('groups in order of first appearance', () => {
      expect(groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat'])).to.deep.equal([
        ['eat', 'tea', 'ate'],
        ['tan', 'nat'],
        ['bat'],
      ]);
      expect(groupAnagrams([])).to.deep.equal([]);
    });
  });

  describe('fuzzyScore', () => {
    it('returns null when the query is not a subsequence', () => {
      expect(fuzzyScore('xyz', 'Login form')).to.equal(null);
      expect(fuzzyScore('fl', 'Login form')).to.equal(null);
    });

    it('returns matched indices and the score', () => {
      expect(fuzzyScore('lgf', 'Login form')).to.deep.equal({ score: 23, indices: [0, 2, 6] });
      expect(fuzzyScore('LOG', 'login')).to.deep.equal({ score: 23, indices: [0, 1, 2] });
      expect(fuzzyScore('', 'anything')).to.deep.equal({ score: 0, indices: [] });
    });

    it('ranks prefix and consecutive matches higher', () => {
      expect(fuzzyScore('log', 'Login form').score).to.be.above(fuzzyScore('log', 'Blog').score);
      expect(fuzzyScore('abc', 'abcxyz').score).to.be.above(fuzzyScore('abc', 'axbxcx').score);
      expect(fuzzyScore('fb', 'fix-bug').score).to.equal(22);
    });
  });

  describe('keyedDiff', () => {
    it('returns empty lists when nothing changed', () => {
      expect(keyedDiff(['a', 'b'], ['a', 'b'])).to.deep.equal({ removed: [], added: [], moved: [] });
    });

    it('detects removals and insertions without moves', () => {
      expect(keyedDiff(['a', 'b', 'c'], ['a', 'c'])).to.deep.equal({ removed: ['b'], added: [], moved: [] });
      expect(keyedDiff(['a', 'b'], ['a', 'x', 'b'])).to.deep.equal({ removed: [], added: ['x'], moved: [] });
    });

    it('moves the minimum number of keys', () => {
      const swap = keyedDiff(['a', 'b', 'c', 'd'], ['a', 'c', 'b', 'd']);
      expect(swap.moved).to.have.lengthOf(1);
      expect(['b', 'c']).to.include(swap.moved[0]);
      expect(keyedDiff(['a', 'b', 'c'], ['c', 'b', 'a']).moved).to.have.lengthOf(2);
      expect(keyedDiff(['a', 'b', 'c', 'd', 'e'], ['e', 'a', 'b', 'c', 'd']).moved).to.deep.equal(['e']);
    });

    it('combines removals, insertions and moves', () => {
      expect(keyedDiff(['a', 'b', 'c', 'd'], ['d', 'x', 'a', 'c'])).to.deep.equal({
        removed: ['b'],
        added: ['x'],
        moved: ['d'],
      });
    });
  });

  describe('virtualWindow', () => {
    const base = { viewportHeight: 500, rowHeight: 50, total: 1000 };

    it('computes the window at the top', () => {
      expect(virtualWindow({ ...base, scrollTop: 0 })).to.deep.equal({
        start: 0,
        end: 13,
        offsetTop: 0,
        totalHeight: 50_000,
      });
    });

    it('applies overscan in the middle, including fractional scroll positions', () => {
      expect(virtualWindow({ ...base, scrollTop: 1000 })).to.deep.equal({
        start: 17,
        end: 33,
        offsetTop: 850,
        totalHeight: 50_000,
      });
      expect(virtualWindow({ ...base, scrollTop: 1049, overscan: 0 })).to.deep.include({ start: 20, end: 31 });
    });

    it('clamps at the bottom and handles empty lists', () => {
      expect(virtualWindow({ ...base, scrollTop: 49_500 })).to.deep.include({ start: 987, end: 1000 });
      expect(virtualWindow({ ...base, total: 0, scrollTop: 0 })).to.deep.equal({
        start: 0,
        end: 0,
        offsetTop: 0,
        totalHeight: 0,
      });
    });
  });
});
