const {tail, head, is_null, pair, display_list, set_tail, append, list} = require('./pair');

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

function display_stream_infinite(s, n) {
  const res = [];
  function iter(s, n) {
    res.push(head(s));
    return n === 0 ? null : iter(stream_tail(s), n - 1);
  }
  iter(s, n);
  console.log(res);
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

function stream_map_2(f, s1, s2) {
  return is_null(s1) || is_null(s2)
    ? null
    : pair(f(head(s1), head(s2)), () => stream_map_2(f, stream_tail(s1), stream_tail(s2)));
}

function add_streams(s1, s2) {
  return stream_map_2((x1, x2) => x1 + x2, s1, s2);
}

function mul_streams(s1, s2) {
  return stream_map_2((x1, x2) => x1 * x2, s1, s2);
}

function scale_stream(stream, factor) {
  return stream_map(x => x * factor, stream);
}

function merge(s1, s2) {
  if (is_null(s1)) {
    return s2;
  } else if (is_null(s2)) {
    return s1;
  } else {
    const s1head = head(s1);
    const s2head = head(s2);
    return s1head < s2head
      ? pair(s1head, () => merge(stream_tail(s1), s2))
      : s1head > s2head
      ? pair(s2head, () => merge(s1, stream_tail(s2)))
      : pair(s1head, () => merge(stream_tail(s1), stream_tail(s2)));
  }
}

const ones = pair(1, () => ones);

const integers = pair(1, () => add_streams(ones, integers));

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

const tan_series = div_series(sin_series, cos_series);

function mul_series(s1, s2) {
  return pair(head(s1) * head(s2), () =>
    add_streams(mul_series(stream_tail(s1), s2), scale_stream(stream_tail(s2), head(s1))),
  );
}

function invert_unit_series(s) {
  return pair(1, () => stream_map(x => -x, mul_series(stream_tail(s), invert_unit_series(s))));
}

function div_series(s1, s2) {
  return head(s2) === 0 ? error('head(s2) is zero') : mul_series(s1, invert_unit_series(s2));
}

function partial_sums(stream) {
  return pair(head(stream), () => add_streams(partial_sums(stream), stream_tail(stream)));
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
  stream_map_2,
  add_streams,
  scale_stream,
  display_stream_infinite,
  merge,
  mul_series,
  partial_sums,
  invert_unit_series,
  div_series,
  integers,
  cos_series,
  sin_series,
};
