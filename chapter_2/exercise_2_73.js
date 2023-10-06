// 练习 2.73

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

function is_variable(x) {
  return is_string(x);
}

function number_equal(exp, num) {
  return is_number(exp) && exp === num;
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

function is_variable(x) {
  return is_string(x);
}

function is_same_variable(v1, v2) {
  return is_variable(v1) && is_variable(v2) && v1 === v2;
}

function deriv(exp, variable) {
  return is_number(exp)
    ? 0
    : is_variable(exp)
    ? is_same_variable(exp, variable)
      ? 1
      : 0
    : get('deriv', operator(exp))(operands(exp), variable);
}
function operator(exp) {
  return head(exp);
}

function operands(exp) {
  return tail(exp);
}

function make_sum(a1, a2) {
  return list('+', a1, a2);
}

function make_product(m1, m2) {
  return list('*', m1, m2);
}

function addend(operands) {
  return head(operands);
}

function augend(operands) {
  return head(tail(operands));
}

function multiplier(operands) {
  return head(operands);
}

function multiplicand(operands) {
  return head(tail(operands));
}

// function make_exp(base, exponent) {
//   return number_equal(exponent, 0)
//     ? 1
//     : number_equal(exponent, 1)
//     ? base
//     : list('**', base, exponent);
// }

function make_exp(base, exp) {
  return list('**', base, exp);
}

function base(e) {
  return head(e);
}

function exponent(e) {
  return head(tail(e));
}

// =========

function op_table() {
  const map = new Map();
  map.set('put', function put(name, op, content) {
    if (map.get(name)) {
      map.get(name).set(op, content);
    } else {
      map.set(name, new Map());
      map.get(name).set(op, content);
    }
  });
  map.set('get', function get(name, op) {
    return map.get(name).get(op);
  });
  return map;
}

const op_map = op_table();
const put = op_map.get('put');
const get = op_map.get('get');

function deriv(exp, variable) {
  console.log(exp);
  return is_number(exp)
    ? 0
    : is_variable(exp)
    ? is_same_variable(exp, variable)
      ? 1
      : 0
    : get('deriv', operator(exp))(operands(exp), variable);
}
function operator(exp) {
  return head(exp);
}

function operands(exp) {
  return tail(exp);
}

// 1.
// 在 deriv 的实现中，使用运算符作为分派依据，将相应参数传到对应的求导公式中。
// is_number 和 is_same_variable 没有使用数据导向，主要原因是数字和变量没有对应的运算符。而我们是以运算符作为分发依据的，
// 没有运算符，就不能分发了。假如一定要写成数据导向，就需要为其添加运算符。

// 2.
function deriv_sum(operands, variable) {
  return make_sum(deriv(addend(operands), variable), deriv(augend(operands), variable));
}
function deriv_product(operands, variable) {
  return make_sum(
    make_product(multiplier(operands), deriv(multiplicand(operands), variable)),
    make_product(deriv(multiplier(operands), variable), multiplicand(operands)),
  );
}
function install_deriv() {
  put('deriv', '+', deriv_sum);
  put('deriv', '*', deriv_product);
  return 'done';
}
install_deriv();
// deriv(list('*', list('*', 'x', 'y'), list('+', 'x', 3)), 'x');

// 3.
function deriv_exponentiation(operands, variable) {
  const bas = base(operands);
  const exp = exponent(operands);
  console.log('11', bas, exp);
  return make_product(exp, make_product(make_exp(bas, make_sum(exp, -1)), deriv(bas, variable)));
}
function install_exponentiation_extension() {
  put('deriv', '**', deriv_exponentiation);
  return 'done';
}
install_exponentiation_extension();
display_list(deriv(list('**', 'x', 4), 'x'));

// 4.
// 只需要在 put 中，将第一个和第二个参数互换。
// function put(name, op, content)  -> function put(op, name, content)
