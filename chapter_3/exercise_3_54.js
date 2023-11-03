// 练习 3.54

const {pair} = require('./pair');
const {stream_map_2, integers, stream_ref} = require('./streams');

function mul_streams(s1, s2) {
  return stream_map_2((x1, x2) => x1 * x2, s1, s2);
}

const factorials = pair(1, () => mul_streams(factorials, integers));

//
//      1   2   6   24  120 720  ... = factorials
//  *   2   3   4   5   6   7    ... = integers
//  ----------------------------------------------
//  1   2   6   24  120 720 5040 ... = factorials
//

console.log(stream_ref(factorials, 5));
