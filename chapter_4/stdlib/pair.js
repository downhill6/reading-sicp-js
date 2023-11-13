function pair(x, y) {
  return [x, y];
}

function head(pair) {
  return is_null(pair) || pair === undefined ? null : pair[0];
}

function tail(pair) {
  return is_null(pair) ? null : pair[1];
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

function member(item, x) {
  return is_null(x) ? null : item === head(x) ? x : member(item, tail(x));
}

function is_undefined(x) {
  return x === undefined;
}

function is_number(x) {
  return typeof x === 'number';
}

const error = console.error.bind(console);

function display_list(list) {
  function rec(list) {
    return is_pair(list)
      ? '[' + rec(head(list)) + ', ' + rec(tail(list)) + ']'
      : is_null(list)
      ? 'null'
      : `${list}`;
  }
  console.log(rec(list));
}

function display(...args) {
  console.log(...args);
}

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
  equal,
  contains_cycle,
  member,
  is_undefined,
  is_number,
  error,
  display_list,
  display,
};
