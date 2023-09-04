// 练习 1.17

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
  return a === 0 || b === 0
    ? 0
    : b === 1
    ? a
    : even(b)
    ? fast_times(double(a), halve(b))
    : a + fast_times(a, b - 1);
}

fast_times(11, 99);
