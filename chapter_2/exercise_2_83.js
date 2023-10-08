// 练习 2.83

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

function is_number(x) {
  return typeof x === 'number';
}

function is_undefined(v) {
  return v === undefined;
}
function is_list(x) {
  return x !== null && is_pair(x);
}

function length(items) {
  return is_null(items) ? 0 : 1 + length(tail(items));
}

function append(list1, list2) {
  return is_null(list1) ? list2 : pair(head(list1), append(tail(list1), list2));
}

function last_pair(list) {
  return is_null(list) ? null : is_null(tail(list)) ? list : last_pair(tail(list));
}

function reverse(list) {
  function iter(items, result) {
    return is_null(items) ? result : iter(tail(items), pair(head(items), result));
  }

  return iter(list, null);
}

function map(fun, items) {
  return is_null(items) ? null : pair(fun(head(items)), map(fun, tail(items)));
}

function accumulate(op, initial, sequence) {
  return is_null(sequence) ? initial : op(head(sequence), accumulate(op, initial, tail(sequence)));
}

function error(err, ...args) {
  console.error(err, ...args);
}

function equal(a, b) {
  if (is_pair(a) && is_pair(b)) {
    return equal(head(a), head(b)) && equal(tail(a), tail(b));
  } else {
    return a === b;
  }
}

// ==========

// operation_table, put and get
// from chapter 3 (section 3.3.3)

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
    const subtable = assoc(name, map);
    if (is_undefined(subtable)) {
      return undefined;
    } else {
      const record = assoc(op, tail(subtable));
      return is_undefined(record) ? undefined : tail(record);
    }
  });
  return map;
}

function assoc(key, map) {
  const records = is_null(map) ? null : is_list(map) ? map : list(...map.entries());
  return is_null(records)
    ? undefined
    : equal(key, head(head(records)))
    ? head(records)
    : assoc(key, tail(records));
}

const op_map = op_table();
const put = op_map.get('put');
const get = op_map.get('get');

// SICP JS 2.5.1

// In Source, most functions have a fixed number of arguments.
// (The function list is the only exception, to this so far.)
// The function apply_in_underlying_javascript allows us to
// apply any given function fun to all elements of the argument
// list args, as if they were separate arguments
function apply(fun, args) {
  return apply_in_underlying_javascript(fun, args);
}

function apply_in_underlying_javascript(fun, args) {
  function flat_pair(list, result = []) {
    if (is_null(list)) {
      return result;
    } else if (is_pair(list)) {
      result.push(head(list));
      return flat_pair(tail(list), result);
    } else {
      return result;
    }
  }
  return fun(...flat_pair(args));
}

function add(x, y) {
  return apply_generic('add', list(x, y));
}

function sub(x, y) {
  return apply_generic('sub', list(x, y));
}

function mul(x, y) {
  return apply_generic('mul', list(x, y));
}

function div(x, y) {
  return apply_generic('div', list(x, y));
}

function is_equal(x, y) {
  return is_number(x) && is_number(y) ? x === y : apply_generic('equal', list(x, y));
}

function real_part(z) {
  return apply_generic('real_part', list(z));
}

function imag_part(z) {
  return apply_generic('imag_part', list(z));
}

function magnitude(z) {
  return apply_generic('magnitude', list(z));
}

function angle(z) {
  return apply_generic('angle', list(z));
}

function square(x) {
  return x * x;
}

function attach_tag(type_tag, contents) {
  return is_number(contents) ? pair('javascript_number', contents) : pair(type_tag, contents);
}
function type_tag(datum) {
  return is_number(datum)
    ? 'javascript_number'
    : is_pair(datum)
    ? head(datum)
    : error(datum, 'bad tagged datum -- type_tag');
}
function contents(datum) {
  return is_number(datum)
    ? datum
    : is_pair(datum)
    ? tail(datum)
    : error(datum, 'bad tagged datum -- contents');
}

// ==========

function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

function make_rational(n, d) {
  return get('make', 'rational')(n, d);
}

function install_rectangular_package() {
  // internal functions
  function real_part(z) {
    return head(z);
  }
  function imag_part(z) {
    return tail(z);
  }
  function make_from_real_imag(x, y) {
    return pair(x, y);
  }
  function magnitude(z) {
    return Math.sqrt(square(real_part(z)) + square(imag_part(z)));
  }
  function angle(z) {
    return Math.atan(imag_part(z), real_part(z));
  }
  function make_from_mag_ang(r, a) {
    return pair(r * Math.cos(a), r * Math.sin(a));
  }

  // interface to the rest of the system
  function tag(x) {
    return attach_tag('rectangular', x);
  }
  put('real_part', list('rectangular'), real_part);
  put('imag_part', list('rectangular'), imag_part);
  put('magnitude', list('rectangular'), magnitude);
  put('angle', list('rectangular'), angle);
  put('make_from_real_imag', 'rectangular', (x, y) => tag(make_from_real_imag(x, y)));
  put('make_from_mag_ang', 'rectangular', (r, a) => tag(make_from_mag_ang(r, a)));
  return 'done';
}

install_rectangular_package();

function install_polar_package() {
  // internal functions
  function magnitude(z) {
    return head(z);
  }
  function angle(z) {
    return tail(z);
  }
  function make_from_mag_ang(r, a) {
    return pair(r, a);
  }
  function real_part(z) {
    return magnitude(z) * Math.cos(angle(z));
  }
  function imag_part(z) {
    return magnitude(z) * Math.sin(angle(z));
  }
  function make_from_real_imag(x, y) {
    return pair(Math.sqrt(square(x) + square(y)), Math.atan(y, x));
  }

  // interface to the rest of the system
  function tag(x) {
    return attach_tag('polar', x);
  }
  put('real_part', list('polar'), real_part);
  put('imag_part', list('polar'), imag_part);
  put('magnitude', list('polar'), magnitude);
  put('angle', list('polar'), angle);
  put('make_from_real_imag', 'polar', (x, y) => tag(make_from_real_imag(x, y)));
  put('make_from_mag_ang', 'polar', (r, a) => tag(make_from_mag_ang(r, a)));
  return 'done';
}

install_polar_package();

function install_complex_package() {
  // imported functions from rectangular and polar packages
  function make_from_real_imag(x, y) {
    return get('make_from_real_imag', 'rectangular')(x, y);
  }
  function make_from_mag_ang(r, a) {
    return get('make_from_mag_ang', 'polar')(r, a);
  }
  // internal functions
  function add_complex(z1, z2) {
    return make_from_real_imag(real_part(z1) + real_part(z2), imag_part(z1) + imag_part(z2));
  }
  function sub_complex(z1, z2) {
    return make_from_real_imag(real_part(z1) - real_part(z2), imag_part(z1) - imag_part(z2));
  }
  function mul_complex(z1, z2) {
    return make_from_mag_ang(magnitude(z1) * magnitude(z2), angle(z1) + angle(z2));
  }
  function div_complex(z1, z2) {
    return make_from_mag_ang(magnitude(z1) / magnitude(z2), angle(z1) - angle(z2));
  }
  function equal_complex(z1, z2) {
    return real_part(z1) === real_part(z2) && imag_part(z1) === imag_part(z2);
  }
  function is_zero(z) {
    return real_part(z) === 0 && imag_part(z) === 0;
  }

  // interface to rest of the system
  function tag(z) {
    return attach_tag('complex', z);
  }

  put('real_part', list('complex'), real_part);
  put('imag_part', list('complex'), imag_part);
  put('magnitude', list('complex'), magnitude);
  put('angle', list('complex'), angle);
  put('add', list('complex', 'complex'), (z1, z2) => tag(add_complex(z1, z2)));
  put('sub', list('complex', 'complex'), (z1, z2) => tag(sub_complex(z1, z2)));
  put('mul', list('complex', 'complex'), (z1, z2) => tag(mul_complex(z1, z2)));
  put('div', list('complex', 'complex'), (z1, z2) => tag(div_complex(z1, z2)));
  put('equal', list('complex', 'complex'), (z1, z2) => tag(equal_complex(z1, z2)));
  put('is_zero', list('complex'), z => tag(is_zero(z)));
  put('make_from_mag_ang', 'complex', (r, a) => tag(make_from_mag_ang(r, a)));
  put('make_from_real_imag', 'complex', (r, a) => tag(make_from_real_imag(r, a)));
  return 'done';
}
install_complex_package();

function make_complex_from_real_imag(x, y) {
  return get('make_from_real_imag', 'complex')(x, y);
}
function make_complex_from_mag_ang(r, a) {
  return get('make_from_mag_ang', 'complex')(r, a);
}

function is_equal_to_zero(x) {
  return is_number(x) ? x === 0 : apply_generic('is_zero', list(x));
}

// ==========

// coercion support

let coercion_list = null;

function clear_coercion_list() {
  coercion_list = null;
}

function put_coercion(type1, type2, item) {
  if (is_undefined(get_coercion(type1, type2))) {
    coercion_list = pair(list(type1, type2, item), coercion_list);
  } else {
    return coercion_list;
  }
}

function get_coercion(type1, type2) {
  function get_type1(list_item) {
    return head(list_item);
  }
  function get_type2(list_item) {
    return head(tail(list_item));
  }
  function get_item(list_item) {
    return head(tail(tail(list_item)));
  }
  function get_coercion_iter(items) {
    if (is_null(items)) {
      return undefined;
    } else {
      const top = head(items);
      return equal(type1, get_type1(top)) && equal(type2, get_type2(top))
        ? get_item(top)
        : get_coercion_iter(tail(items));
    }
  }
  return get_coercion_iter(coercion_list);
}

function make_javascript_number(n) {
  return get('make', 'javascript_number')(n);
}

function javascript_number_to_javascript_number(n) {
  return n;
}
function complex_to_complex(n) {
  return n;
}
put_coercion('javascript_number', 'javascript_number', javascript_number_to_javascript_number);
put_coercion('complex', 'complex', complex_to_complex);
function exp(x, y) {
  return apply_generic('exp', list(x, y));
}

function apply_generic(op, args) {
  const type_tags = map(type_tag, args);
  const fun = get(op, type_tags);
  if (!is_undefined(fun)) {
    return apply(fun, map(contents, args));
  } else {
    if (length(args) === 2) {
      const type1 = head(type_tags);
      const type2 = head(tail(type_tags));
      const a1 = head(args);
      const a2 = head(tail(args));
      const t1_to_t2 = get_coercion(type1, type2);
      const t2_to_t1 = get_coercion(type2, type1);
      return type1 === type2
        ? error(list(op, type_tags), 'no method for these types')
        : !is_undefined(t1_to_t2)
        ? apply_generic(op, list(t1_to_t2(a1), a2))
        : !is_undefined(t2_to_t1)
        ? apply_generic(op, list(a1, t2_to_t1(a2)))
        : error(list(op, type_tags), 'no method for these types');
    } else {
      return error(list(op, type_tags), 'no method for these types');
    }
  }
}

// ==========
//  去掉了 real 层

function raise(x) {
  return apply_generic('raise', list(x));
}

function install_javascript_number_package() {
  function tag(x) {
    return attach_tag('javascript_number', x);
  }
  function raise(x) {
    return make_rational(x, 1);
  }
  put('add', list('javascript_number', 'javascript_number'), (x, y) => tag(x + y));
  put('sub', list('javascript_number', 'javascript_number'), (x, y) => tag(x - y));
  put('mul', list('javascript_number', 'javascript_number'), (x, y) => tag(x * y));
  put('div', list('javascript_number', 'javascript_number'), (x, y) => tag(x / y));
  put('exp', list('javascript_number', 'javascript_number'), (x, y) => tag(Math.exp(x, y)));
  put('make', 'javascript_number', x => tag(x));
  // 添加 raise
  put('raise', list('javascript_number'), x => tag(raise(x)));
  return 'done';
}
install_javascript_number_package();

function install_rational_package() {
  // internal functions
  function numer(x) {
    return head(x);
  }
  function denom(x) {
    return tail(x);
  }
  function make_rat(n, d) {
    const g = gcd(n, d);
    return pair(n / g, d / g);
  }
  function add_rat(x, y) {
    return make_rat(numer(x) * denom(y) + numer(y) * denom(x), denom(x) * denom(y));
  }
  function sub_rat(x, y) {
    return make_rat(numer(x) * denom(y) - numer(y) * denom(x), denom(x) * denom(y));
  }
  function mul_rat(x, y) {
    return make_rat(numer(x) * numer(y), denom(x) * denom(y));
  }
  function div_rat(x, y) {
    return make_rat(numer(x) * denom(y), denom(x) * numer(y));
  }
  function equal_rat(x, y) {
    return numer(x) * denom(y) === numer(y) * denom(x);
  }
  function is_zero(x) {
    return numer(x) === 0;
  }
  function raise(x) {
    return make_complex_from_real_imag(numer(x) / datum(x), 0);
  }

  // interface to rest of the system
  function tag(x) {
    return attach_tag('rational', x);
  }
  put('add', list('rational', 'rational'), (x, y) => tag(add_rat(x, y)));
  put('sub', list('rational', 'rational'), (x, y) => tag(sub_rat(x, y)));
  put('mul', list('rational', 'rational'), (x, y) => tag(mul_rat(x, y)));
  put('div', list('rational', 'rational'), (x, y) => tag(div_rat(x, y)));
  put('equal', list('rational', 'rational'), (x, y) => tag(equal_rat(x, y)));
  put('is_zero', list('rational'), (x, y) => tag(is_zero(x)));
  put('raise', list('rational'), (x, y) => tag(raise(x)));
  put('make', 'rational', (n, d) => tag(make_rat(n, d)));
  return 'done';
}
install_rational_package();

raise(make_javascript_number(2));
