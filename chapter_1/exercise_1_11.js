// 练习 1.11

function fn_rec(n) {
  return n < 3 ? n : fn_rec(n - 1) + 2 * fn_rec(n - 2) + 3 * fn_rec(n - 3);
}

function fn_iter(n) {
  return n < 3 ? n : fn_iter(n - 2, 0, 1, 2);
}

function f_iter(count, a, b, c) {
  return count === 0 ? c : f_iter(count - 1, b, c, 3 * a + 2 * b + c);
}
