// 练习 3.63
const {pair, head} = require('./pair');
const {
  stream_map,
  display_stream_infinite,
  scale_stream,
  partial_sums,
  stream_ref,
  stream_tail,
  memo,
} = require('./streams');

function average(x, y) {
  return (x + y) / 2;
}
function sqrt_improve(guess, x) {
  return average(guess, x / guess);
}

// Louis
function sqrt_stream_optimized(x) {
  return pair(
    1,
    // memo 每次缓存的都是由 sqrt_stream_optimized(x) 产生的不同的流，
    // 尽管值是相同的，但是依然不会生效
    memo(() => stream_map(guess => sqrt_improve(guess, x), sqrt_stream_optimized(x))),
  );
}

// Alyssa
function sqrt_stream_optimized_2(x) {
  const guesses = pair(
    1,
    // memo 缓存是固定的 guesses 流，所以不会重复计算
    memo(() => stream_map(guess => sqrt_improve(guess, x), guesses)),
  );
  return guesses;
}

// 如果都不用 memo 的话，每项都要重复计算，时间复杂度是 O(n^2)
