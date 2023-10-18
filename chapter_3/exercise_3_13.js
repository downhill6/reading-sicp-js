// 练习 3.13

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

function make_cycle(x) {
  set_tail(last_pair(x), x);
  return x;
}

const z = make_cycle(list('a', 'b', 'c'));

last_pair(z); // 死循环
