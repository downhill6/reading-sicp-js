// 练习 2.21

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
    return is_null(items) ? result : iter(tail(items), pair(head(items), null));
  }

  return iter(list, null);
}

function map(fun, items) {
  return is_null(items) ? null : pair(fun(head(items)), map(fun, tail(items)));
}

// ==========

function square(x) {
  return x * x;
}
function square_list(items) {
  return is_null(items) ? null : pair(square(head(items)), square_list(tail(items)));
}

function square_list(items) {
  return map(square, items);
}
