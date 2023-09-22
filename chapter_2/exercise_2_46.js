// 练习 2.46

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

function add_vect(vect1, vect2) {
  return make_vect(xcor_vect(vect1) + xcor_vect(vect2), ycor_vect(vect1) + ycor_vect(vect2));
}

function scale_vect(s, vect) {
  return make_vect(s * xcor_vect(vect), s * ycor_vect(vect));
}

function sub_vect(vect1, vect2) {
  return make_vect(xcor_vect(vect1) - xcor_vect(vect2), ycor_vect(vect1) - ycor_vect(vect2));
}

// ============

function is_pair(x) {
  return Array.isArray(x) && x.length === 2;
}

function is_null(val) {
  return val === null;
}

function display_list(list) {
  function rec(list) {
    return is_pair(list)
      ? '[' + rec(head(list)) + ', ' + rec(tail(list)) + ']'
      : is_null(list)
      ? 'null'
      : `${list}`;
  }
  console.log(rec(list));
}

const v1 = make_vect(1, 1);
display_list(v1);
