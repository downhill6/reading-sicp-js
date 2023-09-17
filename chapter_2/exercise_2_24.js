// 练习 2.24

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

function is_pair(x) {
  return Array.isArray(x) && x.length === 2;
}

function count_leaves(x) {
  return is_null(x) ? 0 : !is_pair(x) ? 1 : count_leaves(head(x)) + count_leaves(tail(x));
}

// ==========

// [1, [[2, [[3, [4, null]], null]], null]]
// https://sicp.sourceacademy.org/img_javascript/ch2-Z-G-ex-2-24.svg
// https://sicp.sourceacademy.org/img_javascript/ch2-Z-G-ex-2-24-tree.svg
