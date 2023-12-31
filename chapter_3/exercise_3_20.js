// 练习 3.20

function pair(x, y) {
  function set_x(v) {
    x = v;
  }
  function set_y(v) {
    y = v;
  }
  return m =>
    m === 'head'
      ? x
      : m === 'tail'
      ? y
      : m === 'set_head'
      ? set_x
      : m === 'set_tail'
      ? set_y
      : error(m, 'undefined operation -- pair');
}

function head(z) {
  return z('head');
}

function tail(z) {
  return z('tail');
}

function set_head(z, new_value) {
  z('set_head')(new_value);
  return z;
}
function set_tail(z, new_value) {
  z('set_tail')(new_value);
  return z;
}

const x = pair(1, 2);
const z = pair(x, x);
set_head(tail(z), 17);

console.log(head(x)); // 17
