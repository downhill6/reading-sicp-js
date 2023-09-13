// 练习 2.6

// 摘自维基百科
// 邱奇数为使用邱奇编码的自然数表示法，而用以表示自然数 n的高阶函数是个任意函数
// f映射到它自身的n重函数复合之函数，简言之，数的“值”即等价于参数被函数包裹的次数。

// f 被调用 0 次
const zero = f => x => x;
// f 被调用 1 次
const wun = f => x => f(x);
const two = f => x => f(f(x));

function plus(n, m) {
  return f => x => n(f)(m(f)(x));
}

function mul(n, m) {
  return f => x => n(m(f))(x);
}

function church_to_number(c) {
  return c(n => n + 1)(0);
}

church_to_number(plus(wun, two)); // 3
church_to_number(mul(wun, two)); // 2
