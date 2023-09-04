// 练习 1.20

function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

// 使用正则序计算过程
// gcd(206, 40);
// gcd(40, 206 % 40);
// 让 B0 表示 206 % 40 过程，有 1 次 remainder 运算 206 % 40 === 6
//  B0 === 0 ? 40 : gcd(B0, 40 % B0)
// 让 B1 表示 40 % B0 过程，有 2 次 remainder 运算  40 % B0 === 4
// B1 === 0 ? B0 : gcd(B1, B0 % B1)
// 让 B2 表示 B0 % B1 过程，有 4 次 remainder 运算 B0 % B1 === 2
// B2 === 0 ? B1 : gcd(B2, B1 % B2)
// 让 B3 表示 B1 % B2 过程，有 7 次 remainder 运算 B1 % B2 === 0
// B3 === 0 ? B2 : gcd(B3, B2 % B3)
// 此时 B3 等于 0,得到结果，共有 18 次 remainder 运算

// 使用应用序计算过程
// gcd(206, 40)
// gcd(40, 206 % 40)
// gcd(6, 40 % 6)
// gcd(6, 6 % 4)
// gcd(2, 2 % 2)
// 2
// 共执行 4 次 remainder 运算
