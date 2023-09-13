// 练习 2.4

function pair(x, y) {
  return m => m(x, y);
}

function head(z) {
  return z((p, q) => p);
}

head(pair(1, 2)); // 1
// 代换过程
// head(m => m(1, 2))
// ((p, q) => p)(1, 2)
// 1

function tail(z) {
  return z((p, q) => q);
}
