# Lab 08 · Algorithms for frontend engineers ☆

**Time box:** 90 min (stretch) · **Run:** `npm run test:08` · **Q&A:** [machine-coding](../../docs/interview/machine-coding.md)

## Why this matters
Frontend DS&A rounds rarely ask for red-black trees. They ask for **patterns** (hash maps, two pointers, sliding window, stacks,
binary search, recursion) and for algorithms that power UI features: fuzzy search, list diffing, virtualisation.

| Function | Pattern | Where it shows up |
|---|---|---|
| `binarySearch`, `lowerBound` | binary search | inserting into sorted lists, virtual lists with variable row heights |
| `mergeSort` | divide & conquer, **stability** | why `Array.prototype.sort` is stable since ES2019 |
| `twoSum` | hash map | the classic warm-up |
| `isBalanced` | stack | template/JSX validation, bracket matching in editors |
| `longestUniqueSubstring` | sliding window | rate limiting, "longest streak" |
| `groupAnagrams` | canonical keys | grouping and search normalisation |
| `fuzzyScore` | greedy matching + scoring | the command palette (Day 5) |
| `keyedDiff` | LIS (longest increasing subsequence) | how React/Vue/Inferno move keyed children with the fewest DOM moves |
| `virtualWindow` | arithmetic | `components/VirtualList` (Day 5) |

## `keyedDiff` explained
Given the old and new key orders, the keys that are in both lists and form the **longest increasing subsequence** of
old indexes can stay where they are. Everything else in both lists must **move**.
```
old: a b c d        new: a c b d
new order's old indexes: [0, 2, 1, 3]
LIS = [0, 1, 3] (a, b, d) or [0, 2, 3] (a, c, d)  → move 1 key (c or b)
```

## 🎤 Interview questions
1. Why does React warn about missing keys? What goes wrong with index keys when you insert at the top?
2. What's the complexity of the LIS approach? (O(n log n) with patience sorting.)
3. How would you virtualise a list with **variable** row heights? (A prefix-sum array plus binary search.)
4. Is `Array.prototype.sort` stable? Why does that matter for a multi-column table sort?
