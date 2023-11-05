// exercise 3.71

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

function cube(x) {
  return x * x * x;
}

function cube_sum(p) {
  return cube(head(p)) + cube(head(tail(p)));
}

function ramanujan_filter(s) {
  const s0 = head(s);
  const s1 = head(stream_tail(s));
  return cube_sum(s0) === cube_sum(s1)
    ? pair(list(cube_sum(s0), s0, s1), () => ramanujan_filter(stream_tail(stream_tail(s))))
    : ramanujan_filter(stream_tail(s));
}
const ramanujan_numbers = ramanujan_filter(weighted_pairs(integers, integers, cube_sum));

display_stream_infinite(ramanujan_numbers, 5);
// 1729 (1, 12) (9 10)
// 4104 (2, 16) (9, 15)
// 13832 (2 24) (18 20)
// 20683 (10 27) (19 24)
// 32832 (4 32) (18 30)
//  39312 (2 34) (15 33)
