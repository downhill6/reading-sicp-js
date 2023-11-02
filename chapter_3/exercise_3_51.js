// 练习 3.51

const {
  stream_map,
  stream_map_optimized,
  stream_enumerate_interval,
  stream_ref,
} = require('./streams');

let x = stream_map(console.log, stream_enumerate_interval(0, 10));

stream_ref(x, 5); // 0 1 2 3 4 5
stream_ref(x, 7); // 1 2 3 4 5 6 7

let y = stream_map_optimized(console.log, stream_enumerate_interval(0, 10));
stream_ref(y, 5); // 0 1 2 3 4 5
// stream y 中 0 - 5 项函数已经被执行过，所以不会再次执行
stream_ref(y, 7); //  6 7
