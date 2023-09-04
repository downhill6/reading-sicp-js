// 练习 1.9

function inc(x) {
  return x + 1;
}
function dec(x) {
  return x - 1;
}

function plus1(a, b) {
  return a === 0 ? b : inc(plus(dec(a), b));
}
plus1(4, 5);
// 计算过程先展开再收缩 递归计算过程
// inc(plus(dec(4), 5))
// inc(plus(3, 5))
// inc(inc(plus(dec(3), 5)))
// inc(inc(plus(2, 5)))
// inc(inc(inc(plus(dec(2), 5))))
// inc(inc(inc(plus(1, 5))))
// inc(inc(inc(inc(plus(dec(1), 5)))))
// inc(inc(inc(inc(plus(0, 5)))))
// inc(inc(inc(inc(5))))
// inc(inc(inc(6)))
// inc(inc(7))
// inc(8)
// 9

function plus2(a, b) {
  return a === 0 ? b : plus2(dec(a), inc(b));
}
plus2(4, 5);
// 展开为 迭代计算过程
// plus2(4, 5)
// plus2(3, 6)
// plus2(2, 7)
// plus2(1, 8)
// plus2(0, 9)
// 9
