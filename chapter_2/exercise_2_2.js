// 练习 2.2

function pair(x, y) {
  return [x, y];
}

function head(pair) {
  return pair[0];
}

function tail(pair) {
  return pair[1];
}

function make_point(x, y) {
  return pair(x, y);
}

function x_point(x) {
  return head(x);
}

function y_point(x) {
  return tail(x);
}

function make_segment(start, end) {
  return pair(start, end);
}

function start_segment(x) {
  return head(x);
}

function end_segment(x) {
  return tail(x);
}

function average(a, b) {
  return (a + b) / 2;
}

function mid_point_segment(x) {
  const a = start_segment(x);
  const b = end_segment(x);
  return make_point(average(x_point(a), x_point(b)), average(y_point(a), y_point(b)));
}

mid_point_segment([
  [2, 2],
  [4, 4],
]); // [3,3]
