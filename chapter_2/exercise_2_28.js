// 练习 2.28

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

function is_pair(x) {
  return Array.isArray(x) && x.length === 2;
}

function is_list(x) {
  return x !== null && is_pair(x);
}

function deep_reverse(list) {
  return is_null(list)
    ? null
    : is_list(list)
    ? append(deep_reverse(tail(list)), pair(deep_reverse(head(list)), null))
    : list;
}

function fringe(tree) {
  return is_null(tree)
    ? null
    : is_list(tree)
    ? append(fringe(head(tree)), fringe(tail(tree)))
    : list(tree);
}
