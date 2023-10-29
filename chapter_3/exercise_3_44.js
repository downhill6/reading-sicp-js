// 练习 3.44

function transfer(from_account, to_account, amount) {
  from_account('withdraw')(amount);
  to_account('deposit')(amount);
}

// Louis 错了，转移并不需要串行化
// 转移没有中间状态，无论 withdraw 和 deposit 之间是否有其他操作，都不影响结果
// （只要 from_account 中的余额足够）
