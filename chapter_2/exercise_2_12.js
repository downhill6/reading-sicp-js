// 练习 2.12

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

function the_trouble_maker(xl, xu, yl, yu) {
  const p1 = xl * yl;
  const p2 = xl * yu;
  const p3 = xu * yl;
  const p4 = xu * yu;
  return make_interval(Math.min(p1, p2, p3, p4), Math.max(p1, p2, p3, p4));
}

function mul_interval(x, y) {
  const xl = lower_bound(x);
  const xu = upper_bound(x);
  const yl = lower_bound(y);
  const yu = upper_bound(y);

  if (xl > 0) {
    // 1. x 区间大于 0
    return yl > 0
      ? make_interval(xl * yl, xu * yu)
      : yu < 0
      ? make_interval(xu * yl, xl * yu)
      : make_interval(xu * yl, xu * yu);
  } else if (xu < 0) {
    // 2. x 区间小于 0
    return yl > 0
      ? make_interval(xl * yu, xu * yl)
      : yu < 0
      ? make_interval(xu * yu, xl * yl)
      : make_interval(xl * yu, xl * yl);
  } else {
    // 3. x 区间跨越 0
    return yl > 0
      ? make_interval(xl * yu, xu * yu)
      : yu < 0
      ? make_interval(xu * yl, xl * yl)
      : the_trouble_maker(xl, xu, yl, yu);
  }
}

function div_interval(x, y) {
  return lower_bound(y) <= 0 && upper_bound(y) >= 0
    ? console.error('不能除以跨越 0 的区间')
    : mul_interval(x, make_interval(1 / upper_bound(y), 1 / lower_bound(y)));
}

function sub_interval(x, y) {
  return make_interval(lower_bound(x) - lower_bound(y), upper_bound(x) - upper_bound(y));
}

function make_center_width(c, w) {
  return make_interval(c - w, c + w);
}

function center(i) {
  return (lower_bound(i) + upper_bound(i)) / 2;
}

function width(i) {
  return (upper_bound(i) - lower_bound(i)) / 2;
}

function make_center_percent(center, percent) {
  const width = center * (percent / 100);
  return make_center_width(center, width);
}

function percent(i) {
  return (width(i) / center(i)) * 100;
}
