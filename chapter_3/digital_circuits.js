const {pair, head, tail, is_null, equal, set_tail, list, set_head} = require('./pair.js');

// SICP JS 3.3.4

function call_each(functions) {
  if (is_null(functions)) {
    return 'done';
  } else {
    head(functions)();
    return call_each(tail(functions));
  }
}

function make_wire() {
  let signal_value = 0;
  let action_functions = null;
  function set_my_signal(new_value) {
    if (signal_value !== new_value) {
      signal_value = new_value;
      return call_each(action_functions);
    } else {
      return 'done';
    }
  }
  function accept_action_function(fun) {
    action_functions = pair(fun, action_functions);
    fun();
  }
  function dispatch(m) {
    return m === 'get_signal'
      ? signal_value
      : m === 'set_signal'
      ? set_my_signal
      : m === 'add_action'
      ? accept_action_function
      : console.error(m, 'unknown operation -- wire');
  }
  return dispatch;
}

function get_signal(wire) {
  return wire('get_signal');
}
function set_signal(wire, new_value) {
  return wire('set_signal')(new_value);
}
function add_action(wire, action_function) {
  return wire('add_action')(action_function);
}

function make_time_segment(time, queue) {
  return pair(time, queue);
}
function segment_time(s) {
  return head(s);
}

function segment_queue(s) {
  return tail(s);
}

function make_queue() {
  return pair(null, null);
}

function front_ptr(queue) {
  return head(queue);
}

function rear_ptr(queue) {
  return tail(queue);
}

function front_queue(queue) {
  return is_empty_queue(queue)
    ? console.error(queue, 'front_queue called with an empty queue')
    : head(front_ptr(queue));
}

function delete_queue(queue) {
  if (!is_empty_queue(queue)) {
    set_front_ptr(queue, tail(front_ptr(queue)));
  }
}

function set_front_ptr(queue, item) {
  set_head(queue, item);
}

function set_rear_ptr(queue, item) {
  set_tail(queue, item);
}

function is_empty_queue(queue) {
  return is_null(front_ptr(queue));
}

function insert_queue(queue, item) {
  const new_pair = pair(item, null);
  if (is_empty_queue(queue)) {
    set_front_ptr(queue, new_pair);
    set_rear_ptr(queue, new_pair);
  } else {
    set_tail(rear_ptr(queue), new_pair);
    set_rear_ptr(queue, new_pair);
  }
  return queue;
}

function make_agenda() {
  return list(0);
}

function current_time(agenda) {
  return head(agenda);
}

function set_current_time(agenda, time) {
  set_head(agenda, time);
}
function segments(agenda) {
  return tail(agenda);
}

function set_segments(agenda, segs) {
  set_tail(agenda, segs);
}
function first_segment(agenda) {
  return head(segments(agenda));
}

function rest_segments(agenda) {
  return tail(segments(agenda));
}

function add_to_agenda(time, action, agenda) {
  function belongs_before(segs) {
    return is_null(segs) || time < segment_time(head(segs));
  }
  function make_new_time_segment(time, action) {
    const q = make_queue();
    insert_queue(q, action);
    return make_time_segment(time, q);
  }
  function add_to_segments(segs) {
    if (segment_time(head(segs)) === time) {
      insert_queue(segment_queue(head(segs)), action);
    } else {
      const rest = tail(segs);
      if (belongs_before(rest)) {
        set_tail(segs, pair(make_new_time_segment(time, action), tail(segs)));
      } else {
        add_to_segments(rest);
      }
    }
  }
  const segs = segments(agenda);
  if (belongs_before(segs)) {
    set_segments(agenda, pair(make_new_time_segment(time, action), segs));
  } else {
    add_to_segments(segs);
  }
}

function is_empty_agenda(agenda) {
  return is_null(segments(agenda));
}

function remove_first_agenda_item(agenda) {
  const q = segment_queue(first_segment(agenda));
  delete_queue(q);
  if (is_empty_queue(q)) {
    set_segments(agenda, rest_segments(agenda));
  }
}

function first_agenda_item(agenda) {
  if (is_empty_agenda(agenda)) {
    console.error('Agenda is empty -- FIRST-AGENDA-ITEM');
  } else {
    const first_seg = first_segment(agenda);
    set_current_time(agenda, segment_time(first_seg));
    return front_queue(segment_queue(first_seg));
  }
}

function propagate() {
  if (is_empty_agenda(the_agenda)) {
    return 'done';
  } else {
    const first_item = first_agenda_item(the_agenda);
    first_item();
    remove_first_agenda_item(the_agenda);
    return propagate();
  }
}

function probe(name, wire) {
  add_action(wire, () =>
    console.log(
      name + ' ' + String(current_time(the_agenda)) + ', new value = ' + String(get_signal(wire)),
    ),
  );
}

const the_agenda = make_agenda();
const inverter_delay = 2;
const and_gate_delay = 3;
const or_gate_delay = 5;

function after_delay(delay, action) {
  add_to_agenda(delay + current_time(the_agenda), action, the_agenda);
}

function logical_or(s1, s2) {
  return s1 === 0 && s2 === 0
    ? 0
    : s1 === 0 || s1 === 1
    ? s2 === 0 || s2 === 1
      ? 1
      : console.error(s2, 'invalid signal')
    : console.error(s1, 'invalid signal');
}

function or_gate(a1, a2, output) {
  function or_action_function() {
    const new_value = logical_or(get_signal(a1), get_signal(a2));
    after_delay(or_gate_delay, () => set_signal(output, new_value));
  }
  add_action(a1, or_action_function);
  add_action(a2, or_action_function);
  return 'ok';
}

function logical_and(s1, s2) {
  return s1 === 1 && s2 === 1
    ? 1
    : s1 === 0 || s1 === 1
    ? s2 === 0 || s2 === 1
      ? 0
      : console.error(s2, 'invalid signal')
    : console.error(s1, 'invalid signal');
}

function and_gate(a1, a2, output) {
  function and_action_function() {
    const new_value = logical_and(get_signal(a1), get_signal(a2));
    after_delay(and_gate_delay, () => set_signal(output, new_value));
  }
  add_action(a1, and_action_function);
  add_action(a2, and_action_function);
  return 'ok';
}

function inverter(input, output) {
  function invert_input() {
    const new_value = logical_not(get_signal(input));
    after_delay(inverter_delay, () => {
      set_signal(output, new_value);
    });
  }
  add_action(input, invert_input);
  return 'ok';
}
function logical_not(s) {
  return s === 0 ? 1 : s === 1 ? 0 : console.error(s, 'invalid signal');
}

function half_adder(a, b, s, c) {
  const d = make_wire();
  const e = make_wire();
  or_gate(a, b, d);
  and_gate(a, b, c);
  inverter(c, e);
  and_gate(d, e, s);
  return 'ok';
}

function full_adder(a, b, c_in, sum, c_out) {
  const s = make_wire();
  const c1 = make_wire();
  const c2 = make_wire();
  half_adder(b, c_in, s, c1);
  half_adder(a, s, sum, c2);
  or_gate(c1, c2, c_out);
  return 'ok';
}

const a = make_wire();
const b = make_wire();
const c_in = make_wire();
const sum = make_wire();
const c_out = make_wire();

set_signal(a, 1);
set_signal(b, 1);
full_adder(a, b, c_in, sum, c_out);

// and_gate(a, b, c_out);
propagate();

// console.log(get_signal(c_out), the_agenda);

module.exports = {
  make_wire,
  or_gate,
  and_gate,
  inverter,
  full_adder,
  set_signal,
  get_signal,
  propagate,
  current_time,
  the_agenda,
  probe,
};
