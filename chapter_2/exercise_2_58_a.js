// 练习 2.58

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

// ============
function make_sum(a1, a2) {
  return number_equal(a1, 0)
    ? a2
    : number_equal(a2, 0)
    ? a1
    : is_number(a1) && is_number(a2)
    ? a1 + a2
    : list(a1, '+', a2);
}

// 被加数
function augend(s) {
  return head(tail(tail(s)));
}

// 加数
function addend(s) {
  return head(s);
}

function is_sum(x) {
  return is_pair(x) && head(tail(x)) === '+';
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

// 乘数
function multiplier(s) {
  return head(s);
}

// 被乘数
function multiplicand(s) {
  return head(tail(tail(s)));
}

function is_product(x) {
  return is_pair(x) && head(tail(x)) === '*';
}

function make_exp(base, exponent) {
  return number_equal(exponent, 0)
    ? 1
    : number_equal(exponent, 1)
    ? base
    : list('**', base, exponent);
}

function base(e) {
  return head(e);
}

function exponent(e) {
  return head(tail(tail(e)));
}

function is_exp(x) {
  return is_pair(x) && head(tail(x)) === '**';
}

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
    : is_exp(exp)
    ? make_product(
        make_product(exponent(exp), make_exp(base(exp), exponent(exp) - 1)),
        deriv(base(exp), variable),
      )
    : error(exp, 'unknown expression type -- deriv');
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

// display_list(deriv(list(list('x', '*', 'y'), '*', list('x', '+', 3)), 'x')); // [["x", ["*", ["y", null]]], ["+", [["y", ["*", [["x", ["+", [3, null]]], null]]], null]]]
display_list(deriv(list('x', '+', list(3, '*', list('x', '+', list('y', '+', 2)))), 'x')); // 4
