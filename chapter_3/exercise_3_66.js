// 练习 3.66

const {head, pair, list} = require('./pair');
const {
  integers,
  interleave,
  stream_map,
  stream_tail,
  display_stream_infinite,
} = require('./streams');

function pairs(s, t) {
  return pair(list(head(s), head(t)), () =>
    interleave(
      stream_map(x => list(head(s), x), stream_tail(t)),
      pairs(stream_tail(s), stream_tail(t)),
    ),
  );
}

const integers_pairs = pairs(integers, integers);

display_stream_infinite(integers_pairs, 6); // [[1, [1, null]], [[1, [2, null]], [[2, [2, null]], [[1, [3, null]], null]]]]

// 位置公式
// num(m, m) = 2 ^ m - 1                               ; n = m
// num(m, m + 1) = num(m, m) + 2 ^ (m - 1)             ; n = m + 1
// num(m, n) = num(m, m + 1) + [n - (m + 1)] * 2 ^ m   ; n > m + 1
// 证明过程请看： https://github.com/hjcapple/reading-sicp/blob/master/chapter_3/exercise_3_66.md

function num1(m) {
  return Math.pow(2, m) - 1;
}

function num2(m) {
  return num1(m) + Math.pow(2, m - 1);
}

function num3(m, n) {
  return num2(m) + (n - (m + 1)) * Math.pow(2, m);
}

function counter(m, n) {
  if (m === n) {
    return num1(m);
  } else if (m + 1 === n) {
    return num2(m);
  } else {
    return num3(m, n);
  }
}

console.log(counter(1, 100)); // 198
console.log(counter(99, 100)); // 2 ^ 99 - 1 + 2 ^ 98
console.log(counter(100, 100)); // 2 ^ 100 -1
