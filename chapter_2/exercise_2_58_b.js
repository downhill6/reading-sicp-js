// 练习 2.58

function pair(x, y) {
  return [x, y];
}

function head(pair) {
  return is_null(pair) ? null : pair[0];
}

function tail(pair) {
  return is_null(pair) ? null : pair[1];
}

function is_pair(x) {
  return Array.isArray(x) && x.length === 2;
}

function list(...args) {
  const [first, ...rest] = args;
  return args.length === 0 ? null : pair(first, list(...rest));
}

function length(items) {
  return is_null(items) ? 0 : 1 + length(tail(items));
}

function is_null(val) {
  return val === null;
}

function is_variable(x) {
  return is_string(x);
}

function is_string(x) {
  return typeof x === 'string';
}

function is_number(x) {
  return typeof x === 'number';
}

function is_same_variable(v1, v2) {
  return is_variable(v1) && is_variable(v2) && v1 === v2;
}

function number_equal(exp, num) {
  return is_number(exp) && exp === num;
}

function error(x, msg) {
  console.error(x, msg);
}

function accumulate(op, initial, sequence) {
  return is_null(sequence) ? initial : op(head(sequence), accumulate(op, initial, tail(sequence)));
}

function member(item, list) {
  console.log('member:', item, list);
  return is_null(list) ? null : item === head(list) ? item : member(item, tail(list));
}

// ============
function deriv(exp, variable) {
  return is_number(exp)
    ? 0
    : is_variable(exp)
    ? is_same_variable(exp, variable)
      ? 1
      : 0
    : is_sum(exp)
    ? make_sum(deriv(addend(exp), variable), deriv(augend(exp), variable))
    : is_product(exp)
    ? make_sum(
        make_product(multiplier(exp), deriv(multiplicand(exp), variable)),
        make_product(deriv(multiplier(exp), variable), multiplicand(exp)),
      )
    : error(exp, 'unknown expression type -- deriv');
}

function make_sum(a1, a2) {
  return number_equal(a1, 0)
    ? a2
    : number_equal(a2, 0)
    ? a1
    : is_number(a1) && is_number(a2)
    ? a1 + a2
    : list(a1, '+', a2);
}

function make_product(m1, m2) {
  return number_equal(m1, 0) || number_equal(m2, 0)
    ? 0
    : number_equal(m1, 1)
    ? m2
    : number_equal(m2, 1)
    ? m1
    : is_number(m1) && is_number(m2)
    ? m1 * m2
    : list(m1, '*', m2);
}

function find_operation(s) {
  return member('+', s) ? '+' : member('*', s) ? '*' : 'unknown';
}

function items_before_first(op, s) {
  return head(s) === op ? null : pair(head(s), items_before_first(op, tail(s)));
}
function items_after_first(op, s) {
  return head(s) === op ? tail(s) : items_after_first(op, tail(s));
}

function simplify(list) {
  return is_pair(list) && length(list) === 1 ? simplify(head(list)) : list;
}

function is_sum(x) {
  return is_pair(x) && find_operation(x) === '+';
}

function addend(s) {
  return simplify(items_before_first('+', s));
}

function augend(s) {
  return simplify(items_after_first('+', s));
}

function is_product(x) {
  return is_pair(x) && find_operation(x) === '*';
}

function multiplier(s) {
  return simplify(items_before_first('*', s));
}

function multiplicand(s) {
  return simplify(items_after_first('*', s));
}

// ==========

function display_list(list) {
  function rec(list) {
    return is_pair(list)
      ? '[' + rec(head(list)) + ', ' + rec(tail(list)) + ']'
      : is_null(list)
      ? 'null'
      : `${typeof list === 'string' ? '"' + list + '"' : list}`;
  }
  console.log(rec(list));
}

display_list(deriv(list('x', '+', 3, '*', list('x', '+', 'y', '+', 2)), 'x')); // 4
