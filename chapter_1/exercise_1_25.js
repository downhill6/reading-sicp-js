//  练习 1.25

function expmod(base, exp, m) {
  return fast_expt(base, exp) % m;
}

// 上面的 expmod 在 小基数时能正确工作，但是因为 JS 使用 64 位来表示数字
// 当基数过大，求幂的结果不可靠

function expmod(base, exp, m) {
  return exp === 0
    ? 1
    : even(exp)
    ? square(expmod(base, exp / 2, m)) % m
    : ((base % m) * expmod(base, exp - 1, m)) % m;
}

// 而原函数里面使用 % 取余数，计算结果不会超过 m。而实现过程是递归的，出现下面运算。
// square(expmod(base, exp / 2, m)) % m
// ((base % m) * expmod(base, exp - 1, m)) % m;
// 整个计算过程，可能出现的最大数字不会超过 m * m 和 base * m。只要控制好初始输入值，结果就不会溢出，也会快得多。
