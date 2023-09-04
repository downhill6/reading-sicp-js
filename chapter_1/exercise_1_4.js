// 练习 1.4

function plus(a, b) {
  return a + b;
}

function minus(a, b) {
  return a - b;
}

function a_plus_abs_b(a, b) {
  return (b >= 0 ? plus : minus)(a, b);
}

// 如果 b > 0，那么就是 a + b, 否则就是 a - b
// 相当于 a 加上 b 的绝对值
