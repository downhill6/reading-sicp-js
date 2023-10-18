// 练习 3.12

const {
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
} = require('./pair.js');

function append_mutator(x, y) {
  set_tail(last_pair(x), y);
  return x;
}

const x = list('a', 'b');
const y = list('c', 'd');
const z = append(x, y);

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
// ==========

display_list(z); // ["a", ["b", ["c", ["d", null]]]]
display_list(tail(x)); // ["b", null]

const w = append_mutator(x, y);

display_list(w); // ["a", ["b", ["c", ["d", null]]]]

display_list(tail(x)); // ["b", ["c", ["d", null]]]
