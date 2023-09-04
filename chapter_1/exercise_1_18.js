// 练习 1.18

function double(x) {
  return x + x;
}

function halve(x) {
  return x / 2;
}

function even(n) {
  return n % 2 === 0;
}

function fast_times(a, b) {
  return fast_times_iter(a, b, 0);
}

function fast_times_iter(a, b, result) {
  return a === 0 || b === 0
    ? result
    : even(b)
    ? fast_times_iter(double(a), halve(b), result)
    : fast_times_iter(a, b - 1, a + result);
}

fast_times(11, 99);
