function pair(x, y) {
  return [x, y];
}

function head(pair) {
  return is_null(pair) ? null : pair[0];
}

function tail(pair) {
  return is_null(pair) ? null : pair[1];
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

function list(...args) {
  const [first, ...rest] = args;
  return args.length === 0 ? null : pair(first, list(...rest));
}

function set_head(pair, value) {
  pair[0] = value;
}

function set_tail(pair, value) {
  pair[1] = value;
}

function last_pair(list) {
  return tail(list) === null ? list : last_pair(tail(list));
}

function equal(a, b) {
  if (is_pair(a) && is_pair(b)) {
    return equal(head(a), head(b)) && equal(tail(a), tail(b));
  } else {
    return a === b;
  }
}
function contains_cycle(x) {
  function detect_cycle(fast, slow) {
    return is_null(fast) || is_null(tail(fast))
      ? false
      : fast === slow
      ? true
      : detect_cycle(tail(tail(fast)), tail(slow));
  }
  return detect_cycle(tail(x), x);
}

function member(item, list) {
  return is_null(list) ? null : item === head(list) ? item : member(item, tail(list));
}

function is_undefined(x) {
  return x === undefined;
}

function is_number(x) {
  return typeof x === 'number';
}

const error = console.error.bind(console);

module.exports = {
  pair,
  head,
  tail,
  is_null,
  is_pair,
  list,
  last_pair,
  set_head,
  set_tail,
  append,
  equal,
  contains_cycle,
  member,
  is_undefined,
  is_number,
  error,
};
