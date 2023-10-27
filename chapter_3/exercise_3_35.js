// 练习 3.35
const {
  make_connector,
  probe,
  get_value,
  set_value,
  has_value,
  forget_value,
  connect,
} = require('./connect.js');
const {error} = require('./pair.js');

function squarer(a, b) {
  function process_new_value() {
    if (has_value(b)) {
      if (get_value(b) < 0) {
        error(get_value(b), 'square less than 0 -- squarer');
      } else {
        set_value(a, Math.sqrt(get_value(b)), me);
      }
    } else {
      set_value(b, get_value(a) * get_value(a), me);
    }
  }

  function process_forget_value() {
    forget_value(a, me);
    forget_value(b, me);
    process_new_value;
  }

  function me(request) {
    if (request === 'I have a value.') {
      process_new_value();
    } else if (request === 'I lost my value.') {
      process_forget_value();
    } else {
      error(request, 'unknown request -- squarer');
    }
  }

  connect(a, me);
  connect(b, me);

  return me;
}

const a = make_connector();
const b = make_connector();
squarer(a, b);
probe('b', b);
probe('a', a);
set_value(a, 10, 'user'); // Probe: b = 100
forget_value(a, 'user');
set_value(b, 100, 'user'); // Probe: a = 10
