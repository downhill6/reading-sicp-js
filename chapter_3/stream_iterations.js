// 3.5.3   Exploiting the Stream Paradigm

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

function average(x, y) {
  return (x + y) / 2;
}
function square(x) {
  return x * x;
}

function sqrt_improve(guess, x) {
  return average(guess, x / guess);
}

function sqrt_stream(x) {
  return pair(1, () => stream_map(guess => sqrt_improve(guess, x), sqrt_stream(x)));
}

// display_stream_infinite(sqrt_stream(2), 8);

// pi
function pi_summands(n) {
  return pair(1 / n, () => stream_map(x => -x, pi_summands(n + 2)));
}
const pi_stream = scale_stream(partial_sums(pi_summands(1)), 4);
// display_stream_infinite(pi_stream, 8);

// 加速序列
function euler_transform(s) {
  const s0 = stream_ref(s, 0);
  const s1 = stream_ref(s, 1);
  const s2 = stream_ref(s, 2);
  return pair(
    s2 - square(s2 - s1) / (s0 + -2 * s1 + s2),
    memo(() => euler_transform(stream_tail(s))),
  );
}

// display_stream_infinite(euler_transform(pi_stream), 8);

// 超级加速
function make_tableau(transform, s) {
  return pair(s, () => make_tableau(transform, transform(s)));
}

function accelerated_sequence(transform, s) {
  return stream_map(head, make_tableau(transform, s));
}
display_stream_infinite(accelerated_sequence(euler_transform, pi_stream), 8);
