// exercise 3.70

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

// 1.
const integers_pairs = weighted_pairs(integers, integers, p => head(p) + head(tail(p)));
display_stream_infinite(integers_pairs, 0);

// 2.
function filter_b(x) {
  return x % 2 !== 0 && x % 3 !== 0 && x % 5 !== 0;
}
const integers_b = stream_filter(filter_b, integers);
const integers_pairs_b = weighted_pairs(integers_b, integers_b, p => {
  const i = head(p);
  const j = head(tail(p));
  return 2 * i + 3 * j + 5 * i * j;
});
display_stream_infinite(integers_pairs_b, 0);
