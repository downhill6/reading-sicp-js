// 练习 3.14

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

// reverse list
function mystery(x) {
  function loop(x, y) {
    if (is_null(x)) {
      return y;
    } else {
      const temp = tail(x);
      set_tail(x, y);
      return loop(temp, x);
    }
  }
  return loop(x, null);
}

const v = list('a', 'b', 'c', 'd');
const w = mystery(v);

display_list(v); // ["a", null]
display_list(w); // ["d", ["c", ["b", ["a", null]]]]

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
