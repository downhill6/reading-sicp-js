// 练习 3.55

const {pair, head} = require('./pair');
const {add_streams, stream_tail, integers, display_stream_infinite} = require('./streams');

function partial_sums(stream) {
  return pair(head(stream), () => add_streams(partial_sums(stream), stream_tail(stream)));
}

display_stream_infinite(partial_sums(integers), 5); // 1, 3, 6, 10, 15, 21
