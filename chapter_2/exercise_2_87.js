// 练习 2.87

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

function is_string(x) {
  return typeof x === 'string';
}

function is_variable(x) {
  return is_string(x);
}

function length(items) {
  return is_null(items) ? 0 : 1 + length(tail(items));
}

function map(fun, items) {
  return is_null(items) ? null : pair(fun(head(items)), map(fun, tail(items)));
}

function member(item, list) {
  return is_null(list) ? null : item === head(list) ? item : member(item, tail(list));
}

function error(err, ...args) {
  console.error(err, ...args);
}
// ==========

function square(x) {
  return x * x;
}

function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

// ==========

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

function equal(a, b) {
  if (is_pair(a) && is_pair(b)) {
    return equal(head(a), head(b)) && equal(tail(a), tail(b));
  } else {
    return a === b;
  }
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

// ==========

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

function apply_generic(op, args) {
  const type_tags = map(type_tag, args);
  const fun = get(op, type_tags);
  return !is_undefined(fun)
    ? apply_in_underlying_javascript(fun, map(contents, args))
    : error(list(op, type_tags), 'no method for these types -- apply_generic');
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

function attach_tag(type_tag, contents) {
  return pair(type_tag, contents);
}

function type_tag(datum) {
  return is_pair(datum) ? head(datum) : error(datum, 'bad tagged datum -- type_tag');
}

function contents(datum) {
  return is_pair(datum) ? tail(datum) : error(datum, 'bad tagged datum -- contents');
}

function install_javascript_number_package() {
  function tag(x) {
    return attach_tag('javascript_number', x);
  }
  put('add', list('javascript_number', 'javascript_number'), (x, y) => tag(x + y));
  put('sub', list('javascript_number', 'javascript_number'), (x, y) => tag(x - y));
  put('mul', list('javascript_number', 'javascript_number'), (x, y) => tag(x * y));
  put('div', list('javascript_number', 'javascript_number'), (x, y) => tag(x / y));
  put('make', 'javascript_number', x => tag(x));
  return 'done';
}

install_javascript_number_package();

function make_javascript_number(n) {
  return get('make', 'javascript_number')(n);
}

function is_same_variable(v1, v2) {
  return is_variable(v1) && is_variable(v2) && v1 === v2;
}

function install_javascript_number_is_equal_to_zero() {
  put('is_equal_to_zero', list('javascript_number'), x => x === 0);
  return 'done';
}
install_javascript_number_is_equal_to_zero();

function is_equal_to_zero(x) {
  return is_number(x) ? x === 0 : apply_generic('is_equal_to_zero', list(x));
}

function make_term(order, coeff) {
  return list(order, coeff);
}

function install_polynomial_package() {
  // internal functions

  // representation of poly
  function make_poly(variable, term_list) {
    return pair(variable, term_list);
  }
  function variable(p) {
    return head(p);
  }
  function term_list(p) {
    return tail(p);
  }

  // representation of terms and term lists
  function adjoin_term(term, term_list) {
    return is_equal_to_zero(coeff(term)) ? term_list : pair(term, term_list);
  }
  const the_empty_termlist = null;
  function first_term(term_list) {
    return head(term_list);
  }
  function rest_terms(term_list) {
    return tail(term_list);
  }
  function is_empty_termlist(term_list) {
    return is_null(term_list);
  }
  function order(term) {
    return head(term);
  }
  function coeff(term) {
    return head(tail(term));
  }

  function add_poly(p1, p2) {
    return is_same_variable(variable(p1), variable(p2))
      ? make_poly(variable(p1), add_terms(term_list(p1), term_list(p2)))
      : error(list(p1, p2), 'polys not in same var -- add_poly');
  }

  function add_terms(L1, L2) {
    if (is_empty_termlist(L1)) {
      return L2;
    } else if (is_empty_termlist(L2)) {
      return L1;
    } else {
      const t1 = first_term(L1);
      const t2 = first_term(L2);
      return order(t1) > order(t2)
        ? adjoin_term(t1, add_terms(rest_terms(L1), L2))
        : order(t1) < order(t2)
        ? adjoin_term(t2, add_terms(L1, rest_terms(L2)))
        : adjoin_term(
            make_term(order(t1), add(coeff(t1), coeff(t2))),
            add_terms(rest_terms(L1), rest_terms(L2)),
          );
    }
  }

  function mul_poly(p1, p2) {
    return is_same_variable(variable(p1), variable(p2))
      ? make_poly(variable(p1), mul_terms(term_list(p1), term_list(p2)))
      : error(list(p1, p2), 'polys not in same var -- mul_poly');
  }

  function mul_terms(L1, L2) {
    return is_empty_termlist(L1)
      ? the_empty_termlist
      : add_terms(mul_term_by_all_terms(first_term(L1), L2), mul_terms(rest_terms(L1), L2));
  }
  function mul_term_by_all_terms(t1, L) {
    if (is_empty_termlist(L)) {
      return the_empty_termlist;
    } else {
      const t2 = first_term(L);
      return adjoin_term(
        make_term(order(t1) + order(t2), mul(coeff(t1), coeff(t2))),
        mul_term_by_all_terms(t1, rest_terms(L)),
      );
    }
  }

  // 练习 2.87
  function all_coeff_zero(term_list) {
    return is_null(term_list)
      ? true
      : is_equal_to_zero(coeff(first_term(term_list)))
      ? all_coeff_zero(rest_terms(term_list))
      : false;
  }

  // interface to rest of the system
  function tag(p) {
    return attach_tag('polynomial', p);
  }
  put('add', list('polynomial', 'polynomial'), (p1, p2) => tag(add_poly(p1, p2)));
  put('mul', list('polynomial', 'polynomial'), (p1, p2) => tag(mul_poly(p1, p2)));
  put('mul', list('polynomial', 'polynomial'), (p1, p2) => tag(mul_poly(p1, p2)));
  put('is_equal_to_zero', list('polynomial'), p => all_coeff_zero(term_list(p)));
  put('make', 'polynomial', (variable, terms) => tag(make_poly(variable, terms)));
  return 'done';
}
install_polynomial_package();

function make_polynomial(variable, terms) {
  return get('make', 'polynomial')(variable, terms);
}

const p1 = make_polynomial(
  'x',
  list(
    make_term(2, make_javascript_number(0)),
    make_term(1, make_javascript_number(0)),
    make_term(0, make_javascript_number(0)),
  ),
);

is_equal_to_zero(p1); // true
