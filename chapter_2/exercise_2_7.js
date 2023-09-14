// 练习 2.7

function pair(x, y) {
  return [x, y];
}

function head(pair) {
  return pair[0];
}

function tail(pair) {
  return pair[1];
}

function make_interval(x, y) {
  return pair(x, y);
}

function upper_bound(p) {
  return tail(p);
}

function lower_bound(p) {
  return head(p);
}

function add_interval(x, y) {
  return make_interval(lower_bound(x) + lower_bound(y), upper_bound(x) + upper_bound(y));
}

function mul_interval(x, y) {
  const p1 = lower_bound(x) * lower_bound(y);
  const p2 = lower_bound(x) * upper_bound(y);
  const p3 = upper_bound(x) * lower_bound(y);
  const p4 = upper_bound(x) * upper_bound(y);
  return make_interval(Math.min(p1, p2, p3, p4), Math.max(p1, p2, p3, p4));
}

function div_interval(x, y) {
  return mul_interval(x, make_interval(1 / upper_bound(y), 1 / lower_bound(y)));
}

div_interval(make_interval(1, 2), make_interval(3, 5));
