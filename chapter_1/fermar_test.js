// 费马检测素数
// 证明见 https://github.com/hjcapple/reading-sicp/blob/master/chapter_1/fermat_test.md

function even(n) {
  return n % 2 === 0;
}

function square(x) {
  return x * x;
}

// 利用同余定理
// 补充，乘法原理 ab mod n = (a * (b mod n)) mod n = ((a mod n) * b) mod n = ((a mond n) * (b mod n)) mod n
function expmod(base, exp, m) {
  return exp === 0
    ? 1
    : even(exp)
    ? square(expmod(base, exp / 2, m)) % m
    : ((base % m) * expmod(base, exp - 1, m)) % m;
}

// 费马定理, n 是一个素数，a 是小于 n 的任意正整数
// expmod(a, n, n) === a % n === a

function miller_rabin_test(n) {
  function try_it(a) {
    return expmod(a, n, n) === a;
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

fast_is_prime(11, 10);
