// 练习 3.50

const {is_null, pair, head} = require('./pair');
const {stream_tail} = require('./streams');

function stream_map_2(f, s1, s2) {
  return is_null(s1) || is_null(s2)
    ? null
    : pair(f(head(s1), head(s2)), () => stream_map_2(f, stream_tail(s1), stream_tail(s2)));
}

function stream_map_2_optimized(f, s1, s2) {
  return is_null(s1) || is_null(s2)
    ? null
    : pair(
        f(head(s1), head(s2)),
        memo(() => stream_map_2(f, stream_tail(s1), stream_tail(s2))),
      );
}
