// 练习 3.67

const {head, pair, list} = require('./pair');
const {
  integers,
  interleave,
  stream_map,
  stream_tail,
  display_stream_infinite,
} = require('./streams');

function all_pairs(s, t) {
  return pair(list(head(s), head(t)), () =>
    interleave(
      interleave(
        stream_map(x => list(head(s), x), stream_tail(t)),
        // 交换顺序再添加进去
        stream_map(x => list(x, head(t)), stream_tail(s)),
      ),
      all_pairs(stream_tail(s), stream_tail(t)),
    ),
  );
}

const integers_pairs = all_pairs(integers, integers);
display_stream_infinite(integers_pairs, 10);
// [[1, [1, null]], [[1, [2, null]], [[2, [2, null]], [[2, [1, null]], [[2, [3, null]], [[1, [3, null]], [[3, [3, null]], [[3, [1, null]], [[3, [2, null]], [[1, [4, null]], [[3, [4, null]], null]]]]]]]]]]]
