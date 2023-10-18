// 练习 3.15
// 参考 https://github.com/hjcapple/reading-sicp/blob/master/chapter_3/exercise_3_15.md

const {pair, head, tail, is_pair, list, is_null, set_head} = require('./pair.js');

const x = list('a', 'b');
const z1 = pair(x, x);
const z2 = pair(list('a', 'b'), list('a', 'b'));
function set_to_wow(x) {
  set_head(head(x), 'wow');
  return x;
}

display_list(z1); // [["a", ["b", null]], ["a", ["b", null]]]
display_list(set_to_wow(z1)); // [["wow", ["b", null]], ["wow", ["b", null]]]
display_list(z2); // [["a", ["b", null]], ["a", ["b", null]]]
display_list(set_to_wow(z2)); // [["wow", ["b", null]], ["a", ["b", null]]]

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
