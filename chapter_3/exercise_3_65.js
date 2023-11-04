// 练习 3.64
const {pair, head} = require('./pair');
const {
  stream_map,
  display_stream_infinite,
  scale_stream,
  partial_sums,
  stream_ref,
  stream_tail,
  memo,
} = require('./streams');

function square(x) {
  return x * x;
}

// pi
function ln2_summands(n) {
  return pair(1 / n, () => stream_map(x => -x, ln2_summands(n + 1)));
}
const ln2_stream = partial_sums(ln2_summands(1));

function euler_transform(s) {
  const s0 = stream_ref(s, 0);
  const s1 = stream_ref(s, 1);
  const s2 = stream_ref(s, 2);
  return pair(
    s2 - square(s2 - s1) / (s0 + -2 * s1 + s2),
    memo(() => euler_transform(stream_tail(s))),
  );
}

function make_tableau(transform, s) {
  return pair(s, () => make_tableau(transform, transform(s)));
}

function accelerated_sequence(transform, s) {
  return stream_map(head, make_tableau(transform, s));
}

display_stream_infinite(ln2_stream, 8);
display_stream_infinite(euler_transform(ln2_stream), 8);
display_stream_infinite(accelerated_sequence(euler_transform, ln2_stream), 8);
// 同样是第 8 项，使用了超级加速的精度最高，高了好几个数量级
