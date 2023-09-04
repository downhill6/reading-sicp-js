// 练习 1.16

function expmod(base, exp, m) {
  return exp === 0
    ? 1
    : is_even(exp)
    ? (expmod(base, exp / 2, m) * expmod(base, exp / 2, m)) % m
    : (base * expmod(base, exp - 1, m)) % m;
}

// 修改后的 expmod 在 exp 是偶数时重复计算了  expmod(base, exp / 2, m)
