// exercise 3.72

const {head, is_null, pair, list, tail} = require('./pair');
const {
  stream_tail,
  interleave,
  stream_map,
  stream_ref,
  integers,
  display_stream_infinite,
  stream_filter,
} = require('./streams');

function merge_weighted(s1, s2, weight) {
  if (is_null(s1)) {
    return s2;
  } else if (is_null(s2)) {
    return s1;
  } else {
    const s1head = head(s1);
    const s2head = head(s2);
    const w1 = weight(s1head);
    const w2 = weight(s2head);
    return w1 < w2
      ? pair(s1head, () => merge_weighted(stream_tail(s1), s2, weight))
      : w1 > w2
      ? pair(s2head, () => merge_weighted(s1, stream_tail(s2), weight))
      : pair(s1head, () =>
          pair(s2head, () => merge_weighted(stream_tail(s1), stream_tail(s2), weight)),
        );
  }
}

function weighted_pairs(s, t, weight) {
  return pair(list(head(s), head(t)), () =>
    merge_weighted(
      stream_map(x => list(head(s), x), stream_tail(t)),
      weighted_pairs(stream_tail(s), stream_tail(t), weight),
      weight,
    ),
  );
}

function square(x) {
  return x * x;
}

function square_sum(p) {
  return square(head(p)) + square(head(tail(p)));
}

function square_filter(s) {
  const s0 = head(s);
  const s1 = head(stream_tail(s));
  const s2 = head(stream_tail(stream_tail(s)));
  return square_sum(s0) === square_sum(s1) && square_sum(s1) === square_sum(s2)
    ? pair(list(square_sum(s0), s0, s1, s2), () =>
        square_filter(stream_tail(stream_tail(stream_tail(s)))),
      )
    : square_filter(stream_tail(s));
}

const square_numbers = square_filter(weighted_pairs(integers, integers, square_sum));

display_stream_infinite(square_numbers, 5);
