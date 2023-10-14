// 练习 3.5

function random_in_range(low, high) {
  const range = high - low;
  return low + Math.random() * range;
}

function monte_carlo(trials, experiment) {
  function iter(trials_remaining, trials_passed) {
    return trials_remaining === 0
      ? trials_passed / trials
      : experiment()
      ? iter(trials_remaining - 1, trials_passed + 1)
      : iter(trials_remaining - 1, trials_passed);
  }
  return iter(trials, 0);
}

function estimate_integral(predicate, x1, x2, y1, y2, trials) {
  const area = (x2 - x1) * (y2 - y1);
  return (
    monte_carlo(trials, () => {
      const x = random_in_range(x1, x2);
      const y = random_in_range(y1, y2);
      return predicate(x, y);
    }) * area
  );
}

function test(x, y) {
  return square(x) + square(y) <= 1;
}

function square(x) {
  return x * x;
}

console.log(estimate_integral(test, -2, 2, -2, 2, 5000));
