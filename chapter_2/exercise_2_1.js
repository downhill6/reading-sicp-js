// 练习 2.1

function pair(x, y) {
  return [x, y];
}

function head(pair) {
  return pair[0];
}

function tail(pair) {
  return pair[1];
}

function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}
function sign(x) {
  return x > 0 ? 1 : x < 0 ? -1 : 0;
}

function make_rat(n, d) {
  const g = gcd(n, d);
  return pair(sign(n) * sign(d) * Math.abs(n / g), Math.abs(d / g));
}

function numer(x) {
  return head(x);
}

function denom(x) {
  return tail(x);
}

function add_rat(x, y) {
  return make_rat(numer(x) * denom(y) + numer(y) * denom(x), denom(x) * denom(y));
}

function sub_rat(x, y) {
  return make_rat(numer(x) * denom(y) - numer(y) * denom(x), denom(x) * denom(y));
}

function mul_rat(x, y) {
  return make_rat(numer(x) * numer(y), denom(x) * denom(y));
}

function div_rat(x, y) {
  return make_rat(numer(x) * denom(y), denom(x) * numer(y));
}

function equal_rat(x, y) {
  return numer(x) * denom(y) === numer(y) * denom(x);
}
