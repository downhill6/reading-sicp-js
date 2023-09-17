// 练习 2.26

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

function is_null(val) {
  return val === null;
}

function append(list1, list2) {
  return is_null(list1) ? list2 : pair(head(list1), append(tail(list1), list2));
}

// ==========

const x = list(1, 2, 3);
const y = list(4, 5, 6);

append(x, y);
// [1, [2, [3, [4, [5, [6, null]]]]]]
// list(1, 2, 3, 4, 5, 6)

pair(x, y);
// [[1, [2, [3, null]]], [4, [5, [6, null]]]]
// list(list(1, 2, 3), list(4, 5, 6))

list(x, y);
// [[1, [2, [3, null]]], [[4, [5, [6, null]]], null]]
// list(list(1, 2, 3), list(4, 5, 6))
