// 练习 3.52

const {
  stream_map,
  stream_enumerate_interval,
  stream_ref,
  stream_filter,
  display_stream,
  stream_map_optimized,
} = require('./streams');

let sum = 0;

function is_even(n) {
  return n % 2 === 0;
}

function accum(x) {
  sum = x + sum;
  return sum;
}

// const seq = stream_map(accum, stream_enumerate_interval(1, 20));
// const y = stream_filter(is_even, seq);
// const z = stream_filter(x => x % 5 === 0, seq);
// stream_ref(y, 7);
// display_stream(z);
// console.log(sum); // 362
// // 没有缓存过程，每次调用 accum 都会重新求值

const seq = stream_map_optimized(accum, stream_enumerate_interval(1, 20));
const y = stream_filter(is_even, seq);
const z = stream_filter(x => x % 5 === 0, seq);
stream_ref(y, 7);
display_stream(z);
console.log(sum); // 210
// 缓存过程，每个 accum 求值后会保存结果
