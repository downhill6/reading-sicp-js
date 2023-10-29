// 练习 3.43

// 1.
function serialized_exchange(account1, account2) {
  const serializer1 = account1('serializer');
  const serializer2 = account2('serializer');
  serializer1(serializer2(exchange))(account1, account2);
}
const a = make_account(10);
const b = make_account(20);
const c = make_account(30);
// exchange 只是交换账户的余额，a <==> b， 不会改变总额
// 所以多次并发 exchange 后，余额依然是 10， 20， 30

// ==========
// 2. 时序图参考 https://github.com/hjcapple/reading-sicp/blob/master/chapter_3/exercise_3_43.md
function exchange(account1, account2) {
  const difference = account1('balance') - account2('balance');
  account1('withdraw')(difference);
  account2('deposit')(difference);
}
concurrent_execute(
  // T1
  () => exchange(a, b),
  // T2
  () => (a, c),
);
// 这样会存在这种时序
// T1: a balance: 10
// T1: b balance: 20
// T1: 计算 difference: -10
// T2: a balance: 10
// T2: c: 30
// T1: a withdraw balance: 20
// T2: 计算 difference: -20
// T1: b deposit balance: 10
// T2: a withdraw balance: 40
// T2: c deposit: 10
// 最后结果 a: 40, b: 10, c: 10

// ==========
// 3.
// 参考2，a: 40, b: 10, c: 10, 总额未变

// 4. 参考 https://github.com/hjcapple/reading-sicp/blob/master/chapter_3/exercise_3_43.md
