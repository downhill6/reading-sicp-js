// 练习 3.57

const {pair} = require('./pair');
const {display_stream_infinite} = require('./streams');

const math_trunc = Math.floor;

function expand(num, den, radix) {
  return pair(math_trunc((num * radix) / den), () => expand((num * radix) % den, den, radix));
}

// expand 其实在模拟手算的过程，计算分数在 n 进制中的小数数字。\
// 其中 num 表示分子(numerator), den 表示分母(denominator)，radix 表示进制。

// 比如 (expand 1 7 10), 表示分数 1/7 在 10 进制中的小数数字(1/7 = 0.14285714285714)。前 20 项为
// (1 4 2 8 5 7 1 4 2 8 5 7 1 4 2 8 5 7 1 4)

display_stream_infinite(expand(1, 7, 10), 20);
// [
//   1, 4, 2, 8, 5, 7, 1,
//   4, 2, 8, 5, 7, 1, 4,
//   2, 8, 5, 7, 1, 4, 2
// ]

display_stream_infinite(expand(3, 8, 10), 20); // 3 / 8 = 0.375
// [
//   3, 7, 5, 0, 0, 0, 0,
//   0, 0, 0, 0, 0, 0, 0,
//   0, 0, 0, 0, 0, 0, 0
// ]
