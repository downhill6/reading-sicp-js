// exercise 4.9
// 在 metacircular_evaluator.js 的基础上修改

const {map, map2, tail, pair} = require('./stdlib');

function make_frame(symbols, vals) {
  return pair('frame', map2(pair, symbols, vals));
}

function frame_bindings(frame) {
  return tail(frame);
}

function extend_environment(symbol, val, base_env) {
  return pair('frame', pair(pair(symbol, val), tail(base_env)));
}

function add_binding_to_frame(symbol, val, frame) {
  set_tail(frame, pair(pair(symbol, val), frame_bindings(frame)));
}

// 声明变量，把变量绑定添加到当前环境
function define_variable(symbol, val, env) {
  const frame = first_frame(env);
  function scan(bindings) {
    return is_null(bindings)
      ? add_binding_to_frame(symbol, val, frame)
      : symbol === head(head(bindings))
      ? set_tail(head(bindings), val)
      : scan(tail(bindings));
  }
  return scan(frame_bindings(frame));
}

function lookup_variable_value(symbol, env) {
  function env_loop(env) {
    function scan(bindings) {
      return is_null(bindings)
        ? env_loop(enclosing_environment(env))
        : symbol === head(head(bindings))
        ? tail(head(bindings))
        : scan(tail(bindings));
    }
    if (env === the_empty_environment) {
      error(symbol, 'unbound name');
    } else {
      const frame = first_frame(env);
      return scan(frame_bindings(frame));
    }
  }
  return env_loop(env);
}

function assign_symbol_value(symbol, val, env) {
  function env_loop(env) {
    function scan(bindings) {
      return is_null(bindings)
        ? env_loop(enclosing_environment(env))
        : symbol === head(head(bindings))
        ? set_tail(head(bindings), val)
        : scan(tail(bindings));
    }
    if (env === the_empty_environment) {
      error(symbol, 'unbound name -- assignment');
    } else {
      const frame = first_frame(env);
      return scan(frame_bindings(frame));
    }
  }
  return env_loop(env);
}
