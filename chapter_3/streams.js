const {tail, head, is_null, pair, display_list} = require('./pair');

// stream: 第一项是数据，第二项是一个 promise, 当需要时计算它
// pair(h, () => t)

function stream_tail(stream) {
  return tail(stream)();
}

function stream_ref(s, n) {
  return n === 0 ? head(s) : stream_ref(stream_tail(s), n - 1);
}

function stream_map(f, s) {
  return is_null(s) ? null : pair(f(head(s)), () => stream_map(f, stream_tail(s)));
}

function stream_filter(predicate, s) {
  return is_null(s)
    ? null
    : predicate(head(s))
    ? pair(head(s), () => stream_filter(predicate, stream_tail(s)))
    : stream_filter(predicate, stream_tail(s));
}

function stream_for_each(f, s) {
  if (is_null(s)) {
    return true;
  } else {
    f(head(s));
    return stream_for_each(f, stream_tail(s));
  }
}

function display_stream(s) {
  return stream_for_each(display_list, s);
}

function stream_enumerate_interval(low, high) {
  return low > high ? null : pair(low, () => stream_enumerate_interval(low + 1, high));
}

function memo(fun) {
  let already_run = false;
  let result = undefined;
  return () => {
    if (!already_run) {
      result = fun();
      already_run = true;
      return result;
    } else {
      return result;
    }
  };
}

function stream_map_optimized(f, s) {
  return is_null(s)
    ? null
    : pair(
        f(head(s)),
        memo(() => stream_map_optimized(f, stream_tail(s))),
      );
}

module.exports = {
  stream_tail,
  stream_enumerate_interval,
  stream_filter,
  stream_for_each,
  stream_map,
  stream_map_optimized,
  stream_ref,
  display_stream,
  memo,
};
