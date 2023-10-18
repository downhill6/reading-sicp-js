// 练习 3.19

const {tail, is_null, list, last_pair, set_tail} = require('./pair.js');

function make_cycle(x) {
  set_tail(last_pair(x), x);
  return x;
}

function contains_cycle(x) {
  function detect_cycle(fast, slow) {
    return is_null(fast) || is_null(tail(fast))
      ? false
      : fast === slow
      ? true
      : detect_cycle(tail(tail(fast)), tail(slow));
  }
  return detect_cycle(tail(x), x);
}

console.log(contains_cycle(make_cycle(list('a', 'b', 'c')))); // true
console.log(contains_cycle(list('a', 'b', 'c'))); // false
