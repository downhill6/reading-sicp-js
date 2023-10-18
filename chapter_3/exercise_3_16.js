// 练习 3.16
// 参考 https://github.com/hjcapple/reading-sicp/blob/master/chapter_3/exercise_3_16.md

const {pair, head, tail, is_pair, list, last_pair, set_tail} = require('./pair.js');

function count_pairs(x) {
  return !is_pair(x) ? 0 : count_pairs(head(x)) + count_pairs(tail(x)) + 1;
}

function make_cycle(x) {
  set_tail(last_pair(x), x);
  return x;
}

const three_list = list('a', 'b', 'c');
const cycle = make_cycle(three_list);

const one = pair('a', 'b');
const three = pair(one, one);
const four = pair(three, 'c');
const seven = pair(three, three);

console.log(count_pairs(seven)); // 7
console.log(count_pairs(cycle)); // 死循环
