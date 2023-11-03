// 练习 3.60

const {pair, head} = require('./pair');
const {
  add_streams,
  stream_tail,
  scale_stream,
  display_stream_infinite,
  stream_map,
} = require('./streams');

// s1 (a0 + a1)
// s2 (b0 + b1)
// s1 * s2 = a0 * b0 + a0 * b1 + a1 * b0 + a1 * b1
// 其中 a0 * b0 是常数项，a0 * b1 + a1 * b0 是一次 x, a1 * b1 是二次 x
// 把 a0 * b0 + a0 * b1 + a1 * b0 + a1 * b1 合并一下，得到
// a0 * b0 + a0 * b1 + a1 * (b0 + b1) = a0 * b0 + a0 * b1 + a1 * s2
function mul_series(s1, s2) {
  return pair(head(s1) * head(s2), () =>
    add_streams(mul_series(stream_tail(s1), s2), scale_stream(stream_tail(s2), head(s1))),
  );
}

function integrate_series(s) {
  function helper(ss, n) {
    return pair(head(ss) / n, () => helper(stream_tail(ss), n + 1));
  }
  return helper(s, 1);
}
const exp_series = pair(1, () => integrate_series(exp_series));

const cos_series = pair(1, () =>
  integrate_series(pair(0, () => stream_map(x => -x, integrate_series(cos_series)))),
);

const sin_series = pair(0, () =>
  integrate_series(pair(1, () => stream_map(x => -x, integrate_series(sin_series)))),
);

display_stream_infinite(
  add_streams(mul_series(cos_series, cos_series), mul_series(sin_series, sin_series)),
  20,
);
// [1, 0, 0, -0, 0, 0, 0, -0, 0, 0, 0, -0, 0, 0, 0, -0, 0, 0, 0, -0, 0]; 去除了误差
