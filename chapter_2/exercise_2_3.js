// 练习 2.3

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

// 1. 使用两个对角点确定矩形
function make_rect(x, y) {
  return pair(x, y);
}

// 获取矩形四个点
function left_bottom(rect) {
  return head(rect);
}

function right_top(rect) {
  return tail(rect);
}

function left_top(rect) {
  return make_point(x_point(left_bottom(rect)), y_point(right_top(rect)));
}

function right_bottom(rect) {
  return make_point(x_point(right_top(rect)), y_point(left_bottom(rect)));
}

function rect_width(rect) {
  return Math.abs(x_point(left_bottom(rect)) - x_point(right_bottom(rect)));
}

function rect_height(rect) {
  return Math.abs(y_point(left_top(rect)) - y_point(left_bottom(rect)));
}

function rect_perimeter(rect) {
  return 2 * (rect_width(rect) + rect_height(rect));
}

function rect_area(rect) {
  return rect_width(rect) * rect_height(rect);
}

// 2. 使用一个点和相邻两条边确定矩形
function make_rect(left_bottom, width, height) {
  return pair(left_bottom, pair(width, height));
}
