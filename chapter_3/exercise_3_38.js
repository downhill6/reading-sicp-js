// 练习 3.38
const {permutations, for_each, filter, adjoin_set} = require('./list.js');
const {list, member, display_list} = require('./pair');

// 1. 顺序执行
function run(list) {
  let balance = 100;
  function bank(req) {
    if (req === 'Peter') {
      balance = balance + 10;
    } else if (req === 'Paul') {
      balance = balance - 20;
    } else if (req === 'Mary') {
      balance = balance - balance / 2;
    }
  }

  for_each(bank, list);
  console.log(list, ':', balance);
}
const lists = permutations(list('Peter', 'Paul', 'Mary'));
// for_each(run, lists);
// [ 'Peter', [ 'Paul', [ 'Mary', null ] ] ] : 45
// [ 'Peter', [ 'Mary', [ 'Paul', null ] ] ] : 35
// [ 'Paul', [ 'Peter', [ 'Mary', null ] ] ] : 45
// [ 'Paul', [ 'Mary', [ 'Peter', null ] ] ] : 50
// [ 'Mary', [ 'Peter', [ 'Paul', null ] ] ] : 40
// [ 'Mary', [ 'Paul', [ 'Peter', null ] ] ] : 40

// 2. 交错执行，// 时序图参考 https://github.com/hjcapple/reading-sicp/blob/master/chapter_3/exercise_3_38.md
let all_values = list();

function run2(list) {
  let balance = 100;
  let peter_balance = 0;
  let paul_balance = 0;
  let mary_balance_1 = 0;
  let mary_balance_2 = 0;
  function bank(req) {
    if (req === 'Peter-Get') {
      peter_balance = balance;
    } else if (req === 'Peter-Set') {
      balance = peter_balance + 10;
    } else if (req === 'Paul-Get') {
      paul_balance = balance;
    } else if (req === 'Paul-Set') {
      balance = paul_balance - 20;
    } else if (req === 'Mary-Get-1') {
      mary_balance_1 = balance;
    } else if (req === 'Mary-Get-2') {
      mary_balance_2 = balance;
    } else if (req === 'Mary-Set') {
      balance = mary_balance_2 - mary_balance_1 / 2;
    }
  }

  for_each(bank, list);
  all_values = adjoin_set(balance, all_values);
  console.log(list, ':', balance);
}

function right_order(list, a, b) {
  const tail = member(a, list);
  return tail && member(b, tail);
}

function gen_orders() {
  const lst = list(
    'Peter-Get',
    'Peter-Set',
    'Paul-Get',
    'Paul-Set',
    'Mary-Get-1',
    'Mary-Get-2',
    'Mary-Set',
  );
  const orders = permutations(lst);
  return filter(
    x =>
      right_order(x, 'Peter-Get', 'Peter-Set') &&
      right_order(x, 'Paul-Get', 'Paul-Set') &&
      right_order(x, 'Mary-Get-1', 'Mary-Get-2') &&
      right_order(x, 'Mary-Get-2', 'Mary-Set'),
    orders,
  );
}
const orders = gen_orders();

for_each(run2, orders);

display_list(all_values);
// [50, [60, [30, [110, [70, [80, [25, [40, [90, [55, [35, [45, null]]]]]]]]]]]]
