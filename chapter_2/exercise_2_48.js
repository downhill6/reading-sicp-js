// 练习 2.48

function pair(x, y) {
  return [x, y];
}

function head(pair) {
  return pair[0];
}

function tail(pair) {
  return pair[1];
}

function make_vect(xcor_vect, ycor_vert) {
  return pair(xcor_vect, ycor_vert);
}

function xcor_vect(vect) {
  return head(vect);
}

function ycor_vect(vect) {
  return tail(vect);
}

function make_segment(v_start, v_end) {
  return pair(v_start, v_end);
}

function start_segment(segment) {
  return head(segment);
}

function end_segment(segment) {
  return tail(segment);
}
