// 练习 1.3

function square(x) {
  return x * x;
}

function f(a, b, c) {
  return (
    square(a) +
    square(b) +
    square(c) -
    square(a > b ? (b > c ? c : b) : a > c ? c : a)
  );
}
