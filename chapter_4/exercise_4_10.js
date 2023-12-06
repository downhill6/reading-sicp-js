// exercise 4.10
// 在 metacircular_evaluator.js 的基础上修改

function scan_helper(not_found_cb, symbols, vals, symbol) {
  return is_null(symbols)
    ? not_found_cb()
    : symbol === head(symbols)
    ? head(vals)
    : scan_helper(tail(symbols), tail(vals));
}

function assign_helper(not_found_cb, symbols, vals, symbol, val) {
  return is_null(symbols)
    ? not_found_cb()
    : symbol === head(symbols)
    ? set_head(vals, val)
    : assign_helper(tail(symbols), tail(vals));
}

function env_loop_helper(cb, env, symbol, val) {
  if (env === the_empty_environment) {
    error(symbol, 'unbound name');
  } else {
    const frame = first_frame(env);
    return cb(
      () => env_loop_helper(enclosing_environment(env)),
      frame_symbols(frame),
      frame_values(frame),
      symbol,
      val,
    );
  }
}

function lookup_symbol_value(symbol, env) {
  return env_loop_helper(scan_helper, env, symbol);
}

function assign_symbol_value(symbol, val, env) {
  return env_loop_helper(assign_helper, env, symbol, val);
}
