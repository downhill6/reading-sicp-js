// 练习 3.34
const {
  make_connector,
  constant,
  multiplier,
  adder,
  probe,
  get_value,
  set_value,
} = require('./connect.js');

function squarer(a, b) {
  return multiplier(a, a, b);
}

// 根据 multiplier 的定义，这样写在计算 b 时可以正常工作，但是无法计算 a
