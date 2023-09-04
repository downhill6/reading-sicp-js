// 练习 1.37

function cont_frac(n, d, k) {
  function fraction(i) {
    return i === k ? n(k) / d(k) : n(i) / (d(i) + fraction(i + 1));
  }
  return fraction(1);
}

function cont_frac_iter(n, d, k) {
  function fraction(i, result) {
    return i < 1 ? result : fraction(i - 1, n(i) / (d(i) + result));
  }
  return fraction(k, 0);
}

cont_frac_iter(
  x => 1,
  x => 1,
  11,
);
// 0.6180555555555556
// 黄金分割率 0.61803398874989
// k 取 11 时，有 4 位精度
