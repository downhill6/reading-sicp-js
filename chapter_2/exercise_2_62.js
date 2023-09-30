// 练习 2.62

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
  return is_null(set)
    ? false
    : x === head(set)
    ? true
    : x < head(set)
    ? false
    : is_element_of_set(x, tail(set));
}

function intersection_set(set1, set2) {
  if (is_null(set1) || is_null(set2)) {
    return null;
  } else {
    const x1 = head(set1);
    const x2 = head(set2);
    return x1 === x2
      ? pair(x1, intersection_set(tail(set1), tail(set2)))
      : x1 < x2
      ? intersection_set(tail(set1), set2)
      : intersection_set(set1, tail(set2));
  }
}

function adjoin_set(x, set) {
  return is_null(set)
    ? list(x)
    : x === head(set)
    ? set
    : x < head(set)
    ? pair(x, set)
    : pair(head(set), adjoin_set(x, tail(set)));
}

function union_set(set1, set2) {
  if (is_null(set1)) {
    return set2;
  } else if (is_null(set2)) {
    return set1;
  } else {
    const x1 = head(set1);
    const x2 = head(set2);
    return x1 === x2
      ? pair(x1, union_set(tail(set1), tail(set2)))
      : x1 < x2
      ? pair(x1, union_set(tail(set1), set2))
      : pair(x2, union_set(tail(set2), set1));
  }
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

display_list(adjoin_set(10, adjoin_set(15, adjoin_set(20, null)))); // [10, [15, [20, null]]]
