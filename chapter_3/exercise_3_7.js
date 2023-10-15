// 练习 3.7

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
  function change_joint_password(new_password) {
    joint_password = new_password;
    return true;
  }

  function dispatch(pd, m) {
    if (pd !== password) {
      return () => 'Incorrect password';
    } else {
      return m === 'withdraw'
        ? withdraw
        : m === 'deposit'
        ? deposit
        : m === 'change_joint_password'
        ? change_joint_password
        : () => console.error(m, 'unknown request -- make_account');
    }
  }
  return dispatch;
}

function make_joint(acc, password, new_password) {
  return (pd, m) => {
    if (pd !== new_password) {
      return () => 'Incorrect password';
    } else {
      return acc(password, m);
    }
  };
}

const acc = make_account(100, 'secret password');
const joint_acc = make_joint(acc, 'secret password', 'rosebud');

console.log(joint_acc('rosebud', 'withdraw')(40));
console.log(joint_acc('rosebud', 'withdraw')(40));
console.log(joint_acc('rosebud', 'withdraw')(40));
