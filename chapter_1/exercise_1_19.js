// 练习 1.19
// 证明过程见 https://github.com/hjcapple/reading-sicp/blob/master/chapter_1/exercise_1_19.md

// T' 变换
// p ← pp + qq
// q ← 2pq + qq

function even(n) {
  return n % 2 === 0;
}

function fib(n) {
  return fib_iter(1, 0, 0, 1, n);
}

function fib_iter(a, b, p, q, count) {
  return count === 0
    ? b
    : even(count)
    ? fib_iter(a, b, p * p + q * q, 2 * p * q + q * q, count / 2)
    : fib_iter(p * a + q * a + q * b, q * a + p * b, p, q, count - 1);
}

fib(10);
