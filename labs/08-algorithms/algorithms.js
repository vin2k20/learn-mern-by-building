/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 labs/08-algorithms/algorithms.js · Phase 2 · Day 2 · ☆ stretch
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL
 *   Practise the algorithm patterns frontend interviews actually use, plus
 *   three algorithms that power Kanvas UI features.
 *
 * 🧠 CONCEPTS  → README.md · docs/interview/machine-coding.md
 *
 * 🧩 USED LATER BY
 *   fuzzyScore → client/src/features/search/CommandPalette.jsx
 *   virtualWindow → client/src/components/VirtualList/VirtualList.jsx
 *   keyedDiff → your mental model for lab 12 (mini-React) and React keys
 *
 * 📝 STEPS
 *   1. binarySearch(sorted, target) → index | -1. Iterative, O(log n).
 *   2. lowerBound(sorted, target) → the first index whose value is >= target (sorted.length if none).
 *   3. mergeSort(arr, compare = default ascending) → a NEW sorted array. Must be STABLE.
 *      ✋ Don't use Array.prototype.sort / toSorted. The tests check this.
 *   4. twoSum(nums, target) → [i, j] with i < j, or null. O(n) with a Map.
 *   5. isBalanced(str) → true if (), [] and {} are balanced. Ignore all other characters.
 *   6. longestUniqueSubstring(str) → the length of the longest substring without repeated characters
 *      (sliding window + Map of last-seen indexes).
 *   7. groupAnagrams(words) → groups in order of first appearance, with words in input order.
 *   8. fuzzyScore(query, text) → { score, indices } | null
 *      - Case-insensitive. Walk through `text` once, GREEDILY matching the next query character
 *        at its first possible position.
 *      - If not every query character is matched → null. Empty query → { score: 0, indices: [] }.
 *      - score = +1 per matched char
 *                +5 if the match is immediately after the previous matched index
 *                +10 if the match is at a word start (index 0, or the previous char is one of ' -_/.')
 *   9. keyedDiff(oldKeys, newKeys) → { removed, added, moved }
 *      - removed: keys only in old (old order). added: keys only in new (new order).
 *      - moved: the keys in both lists that are NOT part of a longest increasing subsequence of
 *        their old indexes (taken in new order). Return them in new order.
 *   10. virtualWindow({ scrollTop, viewportHeight, rowHeight, total, overscan = 3 })
 *      → { start, end, offsetTop, totalHeight }   (end is exclusive)
 *      start = max(0, floor(scrollTop / rowHeight) - overscan)
 *      end   = min(total, ceil((scrollTop + viewportHeight) / rowHeight) + overscan)
 *      offsetTop = start * rowHeight · totalHeight = total * rowHeight
 *
 * ✅ DONE WHEN
 *   [ ] npm run test:08 is green · [ ] you can state each function's time and space complexity
 *
 * 💡 HINTS
 *   - Stable merge: when compare(left, right) <= 0, take from LEFT.
 *   - LIS in O(n²) with a DP table is fine here. O(n log n) (patience sorting) is the stretch goal.
 *
 * 🎤 INTERVIEW ANGLE  "Why keys?", "virtualise a list", "implement fuzzy search", "two sum".
 *
 * 🤖 ASK THE AGENT  /explain longest increasing subsequence · /hint labs/08-algorithms/algorithms.js keyedDiff
 * ═══════════════════════════════════════════════════════════════════════════
 */

export function binarySearch(sorted, target) {
  throw new Error('TODO: implement binarySearch');
}

export function lowerBound(sorted, target) {
  throw new Error('TODO: implement lowerBound');
}

export function mergeSort(arr, compare) {
  throw new Error('TODO: implement mergeSort');
}

export function twoSum(nums, target) {
  throw new Error('TODO: implement twoSum');
}

export function isBalanced(str) {
  throw new Error('TODO: implement isBalanced');
}

export function longestUniqueSubstring(str) {
  throw new Error('TODO: implement longestUniqueSubstring');
}

export function groupAnagrams(words) {
  throw new Error('TODO: implement groupAnagrams');
}

export function fuzzyScore(query, text) {
  throw new Error('TODO: implement fuzzyScore');
}

export function keyedDiff(oldKeys, newKeys) {
  throw new Error('TODO: implement keyedDiff');
}

export function virtualWindow(options) {
  throw new Error('TODO: implement virtualWindow');
}
