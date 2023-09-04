// 练习 1.39

function cont_frac_iter(n, d, k) {
  function fraction(i, result) {
    return i < 1 ? result : fraction(i - 1, n(i) / (d(i) + result));
  }
  return fraction(k, 0);
}

function tan_cf(x, k) {
  function n(i) {
    return i === 1 ? x : -x * x;
  }
  function d(i) {
    return 2 * i - 1;
  }
  return cont_frac_iter(n, d, k);
}

tan_cf(Math.PI / 4, 20); // 1
