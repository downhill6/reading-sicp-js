// 练习 2.60

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

function equal(a, b) {
  if (is_pair(a) && is_pair(b)) {
    return equal(head(a), head(b)) && equal(tail(a), tail(b));
  } else {
    return a === b;
  }
}

function is_element_of_set(x, set) {
  return is_null(set) ? false : equal(x, head(set)) ? true : is_element_of_set(x, tail(set));
}

function adjoin_set(x, set) {
  return pair(x, set);
}

function intersection_set(set1, set2) {
  return is_null(set1) || is_null(set2)
    ? null
    : is_element_of_set(head(set1), set2)
    ? pair(head(set1), intersection_set(tail(set1), set2))
    : intersection_set(tail(set1), set2);
}

function union_set(set1, set2) {
  return append(set1, set2);
}

// =========
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

display_list(union_set(list(1, 2, 3), list(3, 4, 5))); // [1, [2, [3, [4, [5, null]]]]]
display_list(intersection_set(list(1, 2, 3), list(3, 4, 5))); //[3, null]
