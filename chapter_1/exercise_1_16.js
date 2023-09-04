// 练习 1.16

function even(n) {
  return n % 2 === 0;
}

function fast_expt(b, n) {
  return fast_expt_iter(b, n, 1);
}

function fast_expt_iter(b, n, result) {
  return n === 0
    ? result
    : even(n)
    ? fast_expt_iter(b * b, n / 2, result)
    : fast_expt_iter(b, n - 1, b * result);
}
