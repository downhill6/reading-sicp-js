// 练习 3.3

function make_account(balance, password) {
  function withdraw(amount) {
    if (balance >= amount) {
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
  function dispatch(pd, m) {
    if (pd !== password) {
      return () => 'Incorrect password';
    } else {
      return m === 'withdraw'
        ? withdraw
        : m === 'deposit'
        ? deposit
        : () => console.error(m, 'unknown request -- make_account');
    }
  }
  return dispatch;
}

const acc = make_account(100, 'secret password');
console.log(acc('secret password', 'withdra1w')(40));
console.log(acc('some other password', 'deposit')(40));
