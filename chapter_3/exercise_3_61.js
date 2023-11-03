// 练习 3.61

const {pair} = require('./pair');
const {
  mul_series,
  stream_tail,
  cos_series,
  display_stream_infinite,
  stream_map,
} = require('./streams');

function invert_unit_series(s) {
  return pair(1, () => stream_map(x => -x, mul_series(stream_tail(s), invert_unit_series(s))));
}

const a = invert_unit_series(cos_series);
display_stream_infinite(mul_series(a, cos_series), 5);
// [ 1, 0, 0, 0, 0, 0 ], 去除误差
