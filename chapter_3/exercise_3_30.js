// 练习 3.30

const {
  make_wire,
  full_adder,
  get_signal,
  set_signal,
  propagate,
  the_agenda,
  current_time,
} = require('./digital_circuits.js');
const {is_null, pair, head, tail, list} = require('./pair.js');

function ripple_carry_adder(A, B, S, c_out) {
  function helper(A, B, S, c_in, c_out) {
    if (is_null(tail(A))) {
      return full_adder(head(A), head(B), c_in, head(S), c_out);
    } else {
      const wire = make_wire();
      helper(tail(A), tail(B), tail(S), c_in, wire);
      return full_adder(head(A), head(B), wire, head(S), c_out);
    }
  }
  const c_in = make_wire();
  set_signal(c_in, 0);
  helper(A, B, S, c_in, c_out);
  return 'ok';
}

function set_wire_signals(wires, values) {
  if (is_null(wires)) {
    return 'done';
  } else {
    set_signal(head(wires), head(values));
    return set_wire_signals(tail(wires), tail(values));
  }
}

const A = list(make_wire(), make_wire(), make_wire(), make_wire());
const B = list(make_wire(), make_wire(), make_wire(), make_wire());
const S = list(make_wire(), make_wire(), make_wire(), make_wire());
const c_out = make_wire();
// set_wire_signals(A, list(1, 1, 1, 1));
// set_wire_signals(B, list(0, 0, 0, 0));
// ripple_carry_adder(A, B, S, c_out);
// propagate();
set_wire_signals(A, list(1, 1, 1, 1));
set_wire_signals(B, list(0, 0, 0, 1));
ripple_carry_adder(A, B, S, c_out);
propagate();

console.log(get_signal(c_out), current_time(the_agenda));
