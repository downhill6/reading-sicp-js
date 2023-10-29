// 练习 3.45

function make_account_and_serializer(balance) {
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
  const balance_serializer = make_serializer();
  return m =>
    m === 'withdraw'
      ? balance_serializer(withdraw)
      : m === 'deposit'
      ? balance_serializer(deposit)
      : m === 'balance'
      ? balance
      : m === 'serializer'
      ? balance_serializer
      : error(m, 'unknown request -- make_account');
}

function deposit(account, amount) {
  account('deposit')(amount);
}

function withdraw(account, amount) {
  account('withdraw')(amount);
}

function exchange(account1, account2) {
  const difference = account1('balance') - account2('balance');
  account1('withdraw')(difference);
  account2('deposit')(difference);
}

function serialized_exchange(account1, account2) {
  const serializer1 = account1('serializer');
  const serializer2 = account2('serializer');
  serializer1(serializer2(exchange))(account1, account2);
}

// serialized_exchange 中的 serializer1 就是 account1 中的 balance_serializer
// 所以在执行 serialized_exchange(account1, account2) 时
// serializer1 已经将 account1 锁住
// 当 exchange 中的 account1('withdraw')(difference) 执行到 account1 中的 balance_serializer(withdraw)
// 会发现 account1 已经被锁住，导致死锁无法完成操作
