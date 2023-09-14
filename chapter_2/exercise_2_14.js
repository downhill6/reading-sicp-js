// 练习 2.14

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
  return lower_bound(y) <= 0 && upper_bound(y) >= 0
    ? console.error('不能除以跨越 0 的区间')
    : mul_interval(x, make_interval(1 / upper_bound(y), 1 / lower_bound(y)));
}

function sub_interval(x, y) {
  return make_interval(lower_bound(x) - lower_bound(y), upper_bound(x) - upper_bound(y));
}

function par1(r1, r2) {
  return div_interval(mul_interval(r1, r2), add_interval(r1, r2));
}
function par2(r1, r2) {
  const one = make_interval(1, 1);
  return div_interval(one, add_interval(div_interval(one, r1), div_interval(one, r2)));
}

// Lem is right
function test() {
  const A = make_interval(19.6, 20.4);
  const B = make_interval(9.8, 10.2);

  console.log(par1(A, B)); // [6.277124183006538, 7.077551020408162]
  console.log(par2(A, B)); // [6.533333333333334, 6.799999999999999]
  // par2 区间范围更小，是更好的估计值

  // [0.9607843137254903, 1.040816326530612] A/A 应该精确为 1，但结果有偏差
  console.log(div_interval(A, A));
  console.log(div_interval(A, B));
}
test();
