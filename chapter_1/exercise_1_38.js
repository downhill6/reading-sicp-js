// 练习 1.38

function cont_frac_iter(n, d, k) {
  function fraction(i, result) {
    return i < 1 ? result : fraction(i - 1, n(i) / (d(i) + result));
  }
  return fraction(k, 0);
}

function compute_e(k) {
  function n(i) {
    return 1;
  }
  function d(i) {
    return (i + 1) % 3 === 0 ? (2 * (i + 1)) / 3 : 1;
  }
  return cont_frac_iter(n, d, k) + 2;
}

compute_e(20); // 2.718281828459045
