// 练习 1.28
// 证明过程见：https://github.com/hjcapple/reading-sicp/blob/master/chapter_1/exercise_1_28.md

function even(n) {
  return n % 2 === 0;
}

function square(x) {
  return x * x;
}

function expmod(base, exp, m) {
  return exp === 0
    ? 1
    : non_trivial_test(base, m)
    ? 0
    : even(exp)
    ? square(expmod(base, exp / 2, m)) % m
    : ((base % m) * expmod(base, exp - 1, m)) % m;
}

function non_trivial_test(a, m) {
  return a !== 1 && a !== m - 1 && square(a) % m === 1;
}

function miller_rabin_test(n) {
  function try_it(a) {
    return expmod(a, n - 1, n) === 1;
  }
  return try_it(1 + Math.floor(Math.random() * (n - 1)));
}

function fast_is_prime(n, times) {
  return times === 0
    ? true
    : miller_rabin_test(n)
    ? fast_is_prime(n, times - 1)
    : false;
}

fast_is_prime(11, 10); // true
fast_is_prime(561, 10); // false
