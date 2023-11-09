const {pair, head} = require('./pair');
const {stream_tail, stream_map, stream_ref} = require('./streams');

function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

const m = 200560490131;
const a = 1103515245;
const b = 12345;
function rand_update(x) {
  return (a * x + b) % m;
}

const random_init = 123456789;

const random_numbers = pair(random_init, () => stream_map(rand_update, random_numbers));

function map_successive_pairs(f, s) {
  return pair(f(head(s), head(stream_tail(s))), () =>
    map_successive_pairs(f, stream_tail(stream_tail(s))),
  );
}

const dirichlet_stream = map_successive_pairs((r1, r2) => gcd(r1, r2) === 1, random_numbers);

function monte_carlo(experiment_stream, passed, failed) {
  function next(passed, failed) {
    return pair(passed / (passed + failed), () =>
      monte_carlo(stream_tail(experiment_stream), passed, failed),
    );
  }
  return head(experiment_stream) ? next(passed + 1, failed) : next(passed, failed + 1);
}
const pi = stream_map(p => Math.sqrt(6 / p), monte_carlo(dirichlet_stream, 0, 0));

console.log(stream_ref(pi, 2000));
