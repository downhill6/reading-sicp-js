// 练习 3.48

function make_serializer() {
  const mutex = make_mutex();
  return f => {
    function serialized_f(...args) {
      mutex('acquire');
      const val = f(...args);
      mutex('release');
      return val;
    }
    return serialized_f;
  };
}

function make_mutex() {
  const cell = list(false);
  function the_mutex(m) {
    return m === 'acquire'
      ? test_and_set(cell)
        ? the_mutex('acquire') // retry
        : true
      : m === 'release'
      ? clear(cell)
      : error(m, 'unknown request -- mutex');
  }
  return the_mutex;
}

function clear(cell) {
  set_head(cell, false);
}

function make_account_and_serializer(balance, id) {
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
      : m === 'id'
      ? id
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

// 每个线程都访问较小 id 可以避免死锁问题
// 假如 a1 是较小编号，当 paul 的线程锁住 a1 时，peter 的线程不会同时锁住 a2
// 而是尝试访问 a1, 此时 a1 被锁住，需要等到 a1 释放才能继续
// 所以不会导致死锁
function serialized_exchange(account1, account2) {
  const account1_id = account1('id');
  const account2_id = account2('id');
  const serializer1 = account1('serializer');
  const serializer2 = account2('serializer');
  if (account1_id < account2_id) {
    serializer1(serializer2(exchange))(account1, account2);
  } else {
    serializer2(serializer1(exchange)(account1, account2));
  }
}
