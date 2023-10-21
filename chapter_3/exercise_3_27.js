// 练习 3.27

// 图形参考 https://github.com/hjcapple/reading-sicp/blob/master/chapter_3/exercise_3_27.md
// memo_fib 在计算重复的数字时，因为表里已经存在了，所以会直接返回，不会重复计算，所以时间复杂度是 O(n)。
// 简单地将 memo_fib 定义为 memoize(fib) ，该方案是否仍然有效？
// 这样做会导致计算没有缓存的数时，会重复计算已经计算过的数，因此不会有效。
