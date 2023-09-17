// 练习 2.19

function pair(x, y) {
  return [x, y];
}

function head(pair) {
  return pair[0];
}

function tail(pair) {
  return pair[1];
}

function list(...args) {
  const [first, ...rest] = args;
  return args.length === 0 ? null : pair(first, list(...rest));
}

function list_ref(items, n) {
  return n === 0 ? head(items) : list_ref(tail(items), n - 1);
}

function is_null(val) {
  return val === null;
}

function length(items) {
  return is_null(items) ? 0 : 1 + length(tail(items));
}

function append(list1, list2) {
  return is_null(list1) ? list2 : pair(head(list1), append(tail(list1), list2));
}

function last_pair(list) {
  return is_null(list) ? null : is_null(tail(list)) ? list : last_pair(tail(list));
}

function reverse(list) {
  function iter(items, result) {
    return is_null(items) ? result : iter(tail(items), pair(head(items), result));
  }

  return iter(list, null);
}

// ==========

const us_coins = list(50, 25, 10, 5, 1);
const uk_coins = list(100, 50, 20, 10, 5, 2, 1);

function first_denomination(coin_values) {
  return head(coin_values);
}

function except_first_denomination(coin_values) {
  return tail(coin_values);
}

function no_more(list) {
  return is_null(list);
}

function cc(amount, coin_values) {
  return amount === 0
    ? 1
    : amount < 0 || no_more(coin_values)
    ? 0
    : cc(amount, except_first_denomination(coin_values)) +
      cc(amount - first_denomination(coin_values), coin_values);
}

cc(100, list(50, 25, 10, 5, 1)); // 292
cc(100, list(1, 5, 25, 50, 10)); // 292

// coin-values 的排列顺序并不会影响 cc 的计算答案。
// 如上代码，传入两个不同顺序的列表，结果都是 292。

// cc 的计算过程会展开整棵树，彻底遍历 coin-values 列表。树状展开的终止条件中，
// 一个是 amount 数值，一个是 coin-values 列表的个数，
// 跟 coin-values 列表中包含的具体数据无关。
// 也就是说，无论传入的列表顺序如何，树状最终展开的具体树叶都是相同的，
// 只是树叶的顺序有所不同。列表的顺序只会影响树叶的顺序，并不会影响树叶本身。
// 而 cc 的最终计算结果，就是所有的树叶加起来，树叶的顺序并不会影响加起来的结果。
// 因此列表的顺序，并不会影响 cc 最终的计算结果。
