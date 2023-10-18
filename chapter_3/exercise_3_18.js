// 练习 3.18

const {tail, is_pair, list, last_pair, set_tail} = require('./pair.js');

function make_cycle(x) {
  set_tail(last_pair(x), x);
  return x;
}

function contains_cycle(x) {
  function iter(x, origin) {
    if (x === origin) {
      return true;
    } else {
      return !is_pair(x) ? false : iter(tail(x), origin);
    }
  }
  return iter(tail(x), x);
}

console.log(contains_cycle(make_cycle(list('a', 'b', 'c')))); // true
console.log(contains_cycle(list('a', 'b', 'c'))); // false
