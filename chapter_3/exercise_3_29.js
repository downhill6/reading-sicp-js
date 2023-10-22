// 练习 3.29

function inverter(input, output) {
  function invert_input() {
    const new_value = logical_not(get_signal(input));
    after_delay(inverter_delay, () => set_signal(output, new_value));
  }
  add_action(input, invert_input);
  return 'ok';
}

function logical_not(s) {
  return s === 0 ? 1 : s === 1 ? 0 : console.error(s, 'valid signal');
}

function add_gate(a1, a2, output) {
  function add_action_function() {
    const new_value = logical_and(get_signal(a1), get_signal(a2));
    after_delay(and_gate_delay, () => set_signal(output, new_value));
  }
  add_action(a1, add_action_function);
  add_action(a2, add_action_function);
  return 'ok';
}

// 按 非门 -> 与门 -> 非门 的顺序连接就能实现或门
function or_gate(a1, a2, output) {
  return inverter(and_gate(inverter(a1), inverter(a2), output));
}

// 延迟时间是 2 * inverter_delay + and_gate_delay
