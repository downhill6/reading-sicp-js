// 练习 2.54

function pair(x, y) {
  return [x, y];
}

function head(pair) {
  return pair[0];
}

function tail(pair) {
  return pair[1];
}

function is_pair(x) {
  return Array.isArray(x) && x.length === 2;
}

function list(...args) {
  const [first, ...rest] = args;
  return args.length === 0 ? null : pair(first, list(...rest));
}

function is_null(val) {
  return val === null;
}

function member(item, x) {
  return is_null(x) ? null : item === head(x) ? x : member(item, tail(x));
}

function equal(a, b) {
  if (is_pair(a) && is_pair(b)) {
    return equal(head(a), head(b)) && equal(tail(a), tail(b));
  } else {
    return a === b;
  }
}

equal(list('this', 'is', 'a', 'list'), list('this', 'is', 'a', 'list')); // true
equal(list('this', 'is', 'a', 'list'), list('this', 'is', 'a')); // false
