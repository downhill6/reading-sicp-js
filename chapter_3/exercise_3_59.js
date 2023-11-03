// 练习 3.59

const {pair, head} = require('./pair');
const {stream_tail, stream_map, display_stream_infinite} = require('./streams');

// 1.
function integrate_series(s) {
  function helper(ss, n) {
    return pair(head(ss) / n, () => helper(stream_tail(ss), n + 1));
  }
  return helper(s, 1);
}

// 2.

const exp_series = pair(1, () => integrate_series(exp_series));

const cos_series = pair(1, () =>
  integrate_series(pair(0, () => stream_map(x => -x, integrate_series(cos_series)))),
);

const sin_series = pair(0, () =>
  integrate_series(pair(1, () => stream_map(x => -x, integrate_series(sin_series)))),
);

display_stream_infinite(exp_series, 5); // [1, 1, 0.5, 0.16666666666666666, 0.041666666666666664, 0.008333333333333333];
display_stream_infinite(cos_series, 5); // [ 1, 0, -0.5, -0, 0.041666666666666664, 0 ]
display_stream_infinite(sin_series, 5); // [ 0, 1, -0, -0.16666666666666666, 0, 0.008333333333333333 ]
