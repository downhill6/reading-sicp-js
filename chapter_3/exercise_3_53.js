// 练习 3.53
// 练习 3.50

const {pair} = require('./pair');
const {stream_map_2} = require('./streams');

function add_streams(s1, s2) {
  return stream_map_2((x1, x2) => x1 + x2, s1, s2);
}

// 将s定义为一个流，其第一个元素为1，下一个元素是该流前一个元素的两倍。因此s的元素是1、2、4、8、16、... .
const s = pair(1, () => add_streams(s, s));

//     1   2   4   8   16  32  64  ... = s
// +   1   2   4   8   16  32  64  ... = s
// -------------------------------------------
// 1   2   4   8   16  32  64  128 ... = s
