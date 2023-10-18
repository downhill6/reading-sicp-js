// 练习 3.17

const {pair, tail, is_null, is_pair, list, last_pair, set_tail, member} = require('./pair.js');

function count_pairs(x) {
  function iter_cycle(x, result, members) {
    if (member(x, members)) {
      return result;
    } else {
      return !is_pair(x)
        ? result
        : is_null(tail(x))
        ? result + 1
        : iter_cycle(tail(x), result + 1, pair(x, members));
    }
  }

  return iter_cycle(x, 0, null);
}

function make_cycle(x) {
  set_tail(last_pair(x), x);
  return x;
}

const three_list = list('a', 'b', 'c', 'd');
const cycle = make_cycle(three_list);

const one = pair('a', 'b');
const three = pair(one, one);
const seven = pair(three, three);

console.log(count_pairs(cycle)); // 4
console.log(count_pairs(seven)); // 3
