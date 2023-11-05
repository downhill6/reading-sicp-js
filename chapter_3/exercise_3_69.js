// exercise 3.69

const {head, pair, list, tail} = require('./pair');
const {
  integers,
  interleave,
  stream_map,
  stream_tail,
  display_stream_infinite,
  stream_filter,
  stream_ref,
} = require('./streams');

function pairs(s, t) {
  return pair(list(head(s), head(t)), () =>
    interleave(
      stream_map(x => list(head(s), x), stream_tail(t)),
      pairs(stream_tail(s), stream_tail(t)),
    ),
  );
}

function triples(s, t, u) {
  return pair(list(head(s), head(t), head(u)), () =>
    interleave(
      stream_map(x => pair(head(s), x), stream_tail(pairs(t, u))),
      triples(stream_tail(s), stream_tail(t), stream_tail(u)),
    ),
  );
}

const integers_triples = triples(integers, integers, integers);

function square(x) {
  return x * x;
}

function is_pythagorean(p) {
  const s1 = head(p);
  const s2 = head(tail(p));
  const s3 = head(tail(tail(p)));
  return square(s1) + square(s2) === square(s3);
}

const pythagorean_triples = stream_filter(is_pythagorean, integers_triples);

console.log(stream_ref(pythagorean_triples, 0));
// [ 3, [ 4, [ 5, null ] ] ]
console.log(stream_ref(pythagorean_triples, 1));
// [ 6, [ 8, [ 10, null ] ] ]
