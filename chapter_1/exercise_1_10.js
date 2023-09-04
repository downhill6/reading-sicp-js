// 练习 1.10

// Ackermann 函数
function A(x, y) {
  return y === 0 ? 0 : x === 0 ? 2 * y : y === 1 ? 2 : A(x - 1, A(x, y - 1));
}

A(1, 10); // 1024
A(2, 4); // 65536
A(3, 3); // 65536

function f(n) {
  return A(0, n);
}

function g(n) {
  return A(1, n);
}

function h(n) {
  return A(2, n);
}

// f(n) = 2 * n
// g(n) = 2 ^ n
// h(n) = 2 ^ h(n - 1)
// h(n) = 2 ^ 2 ^ 2 ^ ... ^ 2 (n 个 2)
