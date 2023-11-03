// 练习 3.62

const {head, error} = require('./pair');
const {
  mul_series,
  invert_unit_series,
  cos_series,
  sin_series,
  display_stream_infinite,
} = require('./streams');

function div_series(s1, s2) {
  return head(s2) === 0 ? error('head(s2) is zero') : mul_series(s1, invert_unit_series(s2));
}

const tan_series = div_series(sin_series, cos_series);

display_stream_infinite(tan_series, 5);
// [ 0, 1, 0, 0.33333333333333337, 0, 0.13333333333333336 ]
