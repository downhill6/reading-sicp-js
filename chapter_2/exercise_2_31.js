// 练习 2.31

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

function append(list1, list2) {
  return is_null(list1) ? list2 : pair(head(list1), append(tail(list1), list2));
}

function is_null(val) {
  return val === null;
}

function is_pair(x) {
  return Array.isArray(x) && x.length === 2;
}

function map(fun, items) {
  return is_null(items) ? null : pair(fun(head(items)), map(fun, tail(items)));
}

function square(x) {
  return x * x;
}

function tree_map(fun, tree) {
  return map(
    sub_tree =>
      is_null(sub_tree) ? null : is_pair(sub_tree) ? tree_map(fun, sub_tree) : fun(sub_tree),
    tree,
  );
}

function square_tree(tree) {
  return tree_map(square, tree);
}
