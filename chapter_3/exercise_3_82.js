// exercise 3.82

const {pair} = require('./pair');
const {stream_ref, scale_stream} = require('./streams');

function random_in_range(low, high) {
  const range = high - low;
  return low + Math.random() * range;
}

function monte_carlo(experiment) {
  function helper(trials_passed, trials) {
    return experiment()
      ? pair(trials_passed / trials, () => helper(trials_passed + 1, trials + 1))
      : pair(trials_passed / trials, () => helper(trials_passed, trials + 1));
  }

  return helper(0, 1);
}

function estimate_integral(predicate, x1, x2, y1, y2) {
  const area = (x2 - x1) * (y2 - y1);

  return scale_stream(
    monte_carlo(() => {
      const x = random_in_range(x1, x2);
      const y = random_in_range(y1, y2);
      return predicate(x, y);
    }),
    area,
  );
}

function test(x, y) {
  return square(x) + square(y) <= 1;
}

function square(x) {
  return x * x;
}

console.log(stream_ref(estimate_integral(test, -2, 2, -2, 2), 5000));
