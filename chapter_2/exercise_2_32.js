// 练习 2.32

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

function is_pair(x) {
  return Array.isArray(x) && x.length === 2;
}

function map(fun, items) {
  return is_null(items) ? null : pair(fun(head(items)), map(fun, tail(items)));
}

function tree_map(fun, tree) {
  return map(
    sub_tree =>
      is_null(sub_tree) ? null : is_pair(sub_tree) ? tree_map(fun, sub_tree) : fun(sub_tree),
    tree,
  );
}

function subsets(s) {
  if (is_null(s)) {
    return list(null);
  } else {
    const rest = subsets(tail(s));

    // s 的子集可以分为 包含 head(s) 的子集 和不包含 head(s) 的子集
    // 将这两个部分合起来就是 s 的所有子集
    return append(
      rest,
      map(x => pair(head(s), x), rest),
    );
  }
}
