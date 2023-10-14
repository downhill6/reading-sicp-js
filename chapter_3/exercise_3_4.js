// 练习 3.4

function make_account(balance, password) {
  let max_test = 7;

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
  function call_the_cops() {
    return 'calling the cops, your account is locked';
  }

  function dispatch(pd, m) {
    if (max_test > 7) {
      return call_the_cops;
    }

    if (pd !== password) {
      max_test += 1;
      return () => 'Incorrect password';
    } else {
      max_test = 0;
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
console.log(acc('secret password', 'withdraw')(40));
console.log(acc('some other password', 'deposit')(40));
console.log(acc('some other password', 'deposit')(40));
console.log(acc('some other password', 'deposit')(40));
console.log(acc('some other password', 'deposit')(40));
console.log(acc('some other password', 'deposit')(40));
console.log(acc('some other password', 'deposit')(40));
console.log(acc('some other password', 'deposit')(40));
console.log(acc('some other password', 'deposit')(40));
console.log(acc('some other password', 'deposit')(40));
