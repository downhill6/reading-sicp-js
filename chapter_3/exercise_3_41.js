// 练习 3.41

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
  function dispatch(m) {
    return m === 'withdraw'
      ? protect(withdraw)
      : m === 'deposit'
      ? protect(deposit)
      : m === 'balance'
      ? protect(() => balance)(undefined) // serialized
      : error(m, 'unknown request -- make_account');
  }
  return dispatch;
}

// Ben 的担忧没有必要，读取 balance 的过程不会对其他操作造成影响
