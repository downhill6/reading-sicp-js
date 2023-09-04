// 练习 1.15

function cube(x) {
  return x * x * x;
}

function p(x) {
  return 3 * x + 4 * cube(x);
}

function sine(angle) {
  console.log('call p, angel', angle);
  return Math.abs(angle) <= 0.1 ? angle : p(sine(angle / 3));
}

sine(12.15);

// 计算 sine(12.15) 时，p 使用了 5 次
// call p, angel 12.15
// call p, angel 4.05
// call p, angel 1.3499999999999999
// call p, angel 0.44999999999999996
// call p, angel 0.15
// call p, angel 0.049999999999999996

// sine(a) 递归计算过程，每次 a / 3, 所以 sine(a) 的空间和时间复杂度是 O(logn)，对数增长
// 每当 a 大 3 倍，p 的调用次数加 1
