// 练习 3.37
const {make_connector, constant, multiplier, adder, probe, set_value} = require('./connect.js');

function cplus(x, y) {
  const z = make_connector();
  adder(x, y, z);
  return z;
}

function cminus(x, y) {
  const z = make_connector();
  adder(y, z, x);
  return z;
}

function cmul(x, y) {
  const z = make_connector();
  multiplier(x, y, z);
  return z;
}

function cdiv(x, y) {
  const z = make_connector();
  multiplier(y, z, x);
  return z;
}

function cv(num) {
  const v = make_connector();
  constant(num, v);
  return v;
}

function celsius_fahrenheit_converter(x) {
  return cplus(cmul(cdiv(cv(9), cv(5)), x), cv(32));
}

const C = make_connector();
const F = celsius_fahrenheit_converter(C);

probe('F', F);
set_value(C, 25, 'user'); // Probe: F = 77
