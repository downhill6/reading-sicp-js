// 练习 3.68

const {head, list} = require('./pair');
const {integers, interleave, stream_map, stream_tail} = require('./streams');

function pairs(s, t) {
  return interleave(
    stream_map(x => list(head(s), x), stream_tail(t)),
    pairs(stream_tail(s), stream_tail(t)),
  );
}

// 会在初始化时就会递归调用 pairs，导致无限递归
const integers_pairs = pairs(integers, integers);
