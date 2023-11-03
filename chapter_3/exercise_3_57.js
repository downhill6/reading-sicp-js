// 练习 3.57
const {pair} = require('./pair');
const {stream_tail, add_streams} = require('./streams');

// 没有缓存的 fib 函数，对于每个 i 都会重复计算 fib(i - 1)
// 此时所需的加法次数
// A(n) = Fib(n + 1) - 1
const fibs = pair(0, () => pair(1, () => add_streams(stream_tail(fibs), fibs)));

// 添加了缓存的 fib 函数， 每个 i 都会只计算一次，所以
// A(n) = n - 1

// 证明参见 https://github.com/hjcapple/reading-sicp/blob/master/chapter_3/exercise_3_57.md
