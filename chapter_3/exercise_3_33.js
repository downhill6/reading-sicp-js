// 练习 3.33
const {
  make_connector,
  constant,
  multiplier,
  adder,
  probe,
  get_value,
  set_value,
} = require('./connect.js');

function averager(a, b, c) {
  const s = make_connector();
  const v = make_connector();
  constant(2, v);
  multiplier(c, v, s);
  adder(a, b, s);
}

const a = make_connector();
const b = make_connector();
const c = make_connector();
averager(a, b, c);
probe('b', b);
set_value(a, 54);
set_value(c, 3);
// Probe: b = -48
