const {is_null, head, pair} = require('./pair');
const {stream_tail, scale_stream, display_stream_infinite} = require('./streams');

// 练习 3.56
function merge(s1, s2) {
  if (is_null(s1)) {
    return s2;
  } else if (is_null(s2)) {
    return s1;
  } else {
    const s1head = head(s1);
    const s2head = head(s2);
    return s1head < s2head
      ? pair(s1head, () => merge(stream_tail(s1), s2))
      : s1head > s2head
      ? pair(s2head, () => merge(s1, stream_tail(s2)))
      : pair(s1head, () => merge(stream_tail(s1), stream_tail(s2)));
  }
}

const S = pair(1, () => merge(scale_stream(S, 2), merge(scale_stream(S, 3), scale_stream(S, 5))));

display_stream_infinite(S, 50);
// [
//   1,   2,   3,   4,   5,   6,   8,   9,  10,  12,  15,
//   16,  18,  20,  24,  25,  27,  30,  32,  36,  40,  45,
//   48,  50,  54,  60,  64,  72,  75,  80,  81,  90,  96,
//  100, 108, 120, 125, 128, 135, 144, 150, 160, 162, 180,
//  192, 200, 216, 225, 240, 243, 250
// ]
