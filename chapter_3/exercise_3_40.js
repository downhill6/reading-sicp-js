// 练习 3.40
const {permutations, for_each, filter, adjoin_set} = require('./list.js');
const {list, member, display_list} = require('./pair');

// ==========
// 1. 思路同 3.38 一样
// let x = 10;
// concurrent_execute(() => { x = x * x; },
//                    () => { x = x * x * x; });
let all_values = list();

function run(list) {
  let balance = 10;
  let T1_balance1 = 0;
  let T1_balance2 = 0;
  let T2_balance1 = 0;
  let T2_balance2 = 0;
  let T2_balance3 = 0;
  function bank(req) {
    if (req === 'T1-Get1') {
      T1_balance1 = balance;
    } else if (req === 'T1-Get2') {
      T1_balance2 = balance;
    } else if (req === 'T1-Set') {
      balance = T1_balance1 * T1_balance2;
    } else if (req === 'T2-Get1') {
      T2_balance1 = balance;
    } else if (req === 'T2-Get2') {
      T2_balance2 = balance;
    } else if (req === 'T2-Get3') {
      T2_balance3 = balance;
    } else if (req === 'T2-Set') {
      balance = T2_balance1 * T2_balance2 * T2_balance3;
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
  const lst = list('T1-Get1', 'T1-Get2', 'T1-Set', 'T2-Get1', 'T2-Get2', 'T2-Get3', 'T2-Set');
  const orders = permutations(lst);
  return filter(
    x =>
      right_order(x, 'T1-Get1', 'T1-Get2') &&
      right_order(x, 'T1-Get2', 'T1-Set') &&
      right_order(x, 'T2-Get1', 'T2-Get2') &&
      right_order(x, 'T2-Get2', 'T2-Get3') &&
      right_order(x, 'T2-Get3', 'T2-Set'),
    orders,
  );
}
const orders = gen_orders();

for_each(run, orders);

display_list(all_values);

// 最终有 5 种结果
// [100, [1000, [10000, [100000, [1000000, null]]]]]

// ==========
// 2.
// let x = 10;
// const s = make_serializer();
// concurrent_execute(s(() => { x = x * x;     }),
//                    s(() => { x = x * x * x; }));
// 因为 T1 和 T2 无法交错执行
// 所有最终结果只有 1000000 一种
