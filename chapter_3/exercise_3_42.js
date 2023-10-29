// 练习 3.42

function make_account(balance) {
  function withdraw(amount) {
    if (balance > amount) {
      balance = balance - amount;
      return balance;
    } else {
      return 'Insufficient funds';
    }
  }
  function deposit(amount) {
    balance = balance + amount;
    return balance;
  }
  const protect = make_serializer();
  // 提前创建 protect_fun 不会影响并发
  // 也不会提升并发数，只是减少了每次执行 dispatch 时创建函数的开销
  const protect_withdraw = protect(withdraw);
  const protect_deposit = protect(deposit);
  function dispatch(m) {
    return m === 'withdraw'
      ? protect_withdraw
      : m === 'deposit'
      ? protect_deposit
      : m === 'balance'
      ? balance
      : error(m, 'unknown request -- make_account');
  }
  return dispatch;
}
