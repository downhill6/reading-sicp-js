const {pair, head, tail, is_null, is_pair, list, equal} = require('./pair.js');

function list_ref(items, n) {
  return n === 0 ? head(items) : list_ref(tail(items), n - 1);
}

function length(items) {
  return is_null(items) ? 0 : 1 + length(tail(items));
}

function accumulate(op, initial, sequence) {
  return is_null(sequence) ? initial : op(head(sequence), accumulate(op, initial, tail(sequence)));
}

function map(fun, items) {
  return is_null(items) ? null : pair(fun(head(items)), map(fun, tail(items)));
}

function map2(fun, items1, items2) {
  return is_null(items1) || is_null(items2)
    ? null
    : pair(fun(head(items1), head(items2)), map(fun, tail(items1), tail(items2)));
}

function for_each(fun, items) {
  if (!is_null(items)) {
    fun(head(items));
    for_each(fun, tail(items));
  }
}

function filter(predicate, sequence) {
  return is_null(sequence)
    ? null
    : predicate(head(sequence))
    ? pair(head(sequence), filter(predicate, tail(sequence)))
    : filter(predicate, tail(sequence));
}

function enumerate_interval(low, high) {
  return low > high ? null : pair(low, enumerate_interval(low + 1, high));
}

function enumerate_tree(tree) {
  return is_null(tree)
    ? null
    : !is_pair(tree)
    ? list(tree)
    : append(enumerate_tree(head(tree)), enumerate_tree(tail(tree)));
}

function append(list1, list2) {
  return is_null(list1) ? list2 : pair(head(list1), append(tail(list1), list2));
}
``;

function reverse(sequence) {
  return fold_right((x, y) => append(y, list(x)), null, sequence);
}

function flatmap(f, seq) {
  return accumulate(append, null, map(f, seq));
}

function remove(item, sequence) {
  return filter(x => !(x === item), sequence);
}

function permutations(s) {
  return is_null(s)
    ? list(null)
    : flatmap(x => map(p => pair(x, p), permutations(remove(x, s))), s);
}

function is_element_of_set(x, set) {
  return is_null(set) ? false : equal(x, head(set)) ? true : is_element_of_set(x, tail(set));
}

function adjoin_set(x, set) {
  return is_element_of_set(x, set) ? set : pair(x, set);
}

function vector_to_list(vector) {
  return list(...vector);
}

function list_to_vector(lst) {
  const vector = [];
  while (!is_null(lst)) {
    vector.push(head(lst));
    lst = tail(lst);
  }
  return vector;
}

module.exports = {
  length,
  accumulate,
  map,
  map2,
  for_each,
  filter,
  enumerate_interval,
  enumerate_tree,
  append,
  reverse,
  flatmap,
  remove,
  permutations,
  adjoin_set,
  is_element_of_set,
  list_ref,
  vector_to_list,
  list_to_vector,
};
