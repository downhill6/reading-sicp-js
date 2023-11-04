// 练习 3.64
const {pair} = require('./pair');
const {stream_map, stream_ref, stream_tail, memo} = require('./streams');

function average(x, y) {
  return (x + y) / 2;
}

function sqrt_improve(guess, x) {
  return average(guess, x / guess);
}

// function sqrt_stream(x) {
//   return pair(1, () => stream_map(guess => sqrt_improve(guess, x), sqrt_stream(x)));
// }

function sqrt_stream_optimized_2(x) {
  const guesses = pair(
    1,
    // memo 缓存是固定的 guesses 流，所以不会重复计算
    memo(() => stream_map(guess => sqrt_improve(guess, x), guesses)),
  );
  return guesses;
}

function stream_limit(s, tolerance) {
  const s0 = stream_ref(s, 0);
  const s1 = stream_ref(s, 1);
  return Math.abs(s0 - s1) < tolerance ? s1 : stream_limit(stream_tail(s), tolerance);
}

function sqrt(x, tolerance) {
  return stream_limit(sqrt_stream_optimized_2(x), tolerance);
}

console.log(sqrt(2, 0.000001)); // 1.414213562373095
