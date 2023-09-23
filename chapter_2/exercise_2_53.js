// 练习 2.53

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

function member(item, x) {
  return is_null(x) ? null : item === head(x) ? x : member(item, tail(x));
}

list('a', 'b', 'c'); // ["a", ["b", ["c", null]]]
list(list('george')); // [["george", null], null]
tail(list(list('x1', 'x2'), list('y1', 'y2'))); // [["y1", ["y2", null]], null]
tail(head(list(list('x1', 'x2'), list('y1', 'y2')))); // ["x2", null]
member('red', list('blue', 'shoes', 'yellow', 'socks')); // null
member('red', list('red', 'shoes', 'blue', 'socks')); // ["red", ["shoes", ["blue", ["socks", null]]]]
