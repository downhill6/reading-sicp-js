// 练习 1.27

function square(x) {
  return x * x;
}

function even(n) {
  return n % 2 === 0;
}

function expmod(base, exp, m) {
  return exp === 0
    ? 1
    : even(exp)
    ? square(expmod(base, exp / 2, m)) % m
    : ((base % m) * expmod(base, exp - 1, m)) % m;
}

function miller_rabin_test(n, a) {
  return expmod(a, n, n) === a;
}

function carmichael(n) {
  function iter(n, i) {
    return n === i ? true : miller_rabin_test(n, i) ? iter(n, i + 1) : false;
  }

  return iter(n, 2);
}

carmichael(561);
// carmichael(1105);
// carmichael(1729);
// carmichael(2465);
// carmichael(2821);
// carmichael(6601);
