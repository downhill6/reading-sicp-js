// exercise 4.3

function op_table() {
  const map = new Map();
  map.set('put', function put(name, op, content) {
    if (map.get(name)) {
      map.get(name).set(op, content);
    } else {
      map.set(name, new Map());
      map.get(name).set(op, content);
    }
  });
  map.set('get', function get(name, op) {
    return map.get(name).get(op);
  });
  return map;
}

const op_map = op_table();
const put = op_map.get('put');
const get = op_map.get('get');

function install_evaluate_package() {
  put('evaluate', 'literal', literal_value);
  put('evaluate', 'name', (component, env) => lookup_symbol_value(symbol_of_name(component), env));
  put('evaluate', 'application', (component, env) =>
    apply(
      evaluate(function_expression(component), env),
      list_of_values(arg_expressions(component), env),
    ),
  );
  put('evaluate', 'unary_operator_combination', (component, env) =>
    evaluate(operator_combination_to_application(component), env),
  );
  put('evaluate', 'binary_operator_combination', (component, env) =>
    evaluate(operator_combination_to_application(component), env),
  );
  put('evaluate', 'conditional_expression', eval_conditional);
  put('evaluate', 'lambda_expression', (component, env) =>
    make_function(lambda_parameter_symbols(component), lambda_body(component), env),
  );
  put('evaluate', 'sequence', (component, env) =>
    eval_sequence(sequence_statements(component), env),
  );
  put('evaluate', 'block', eval_block);
  put('evaluate', 'return_statement', eval_return_statement);
  put('evaluate', 'function_declaration', (component, env) =>
    evaluate(function_decl_to_constant_decl(component), env),
  );
  put('evaluate', 'constant_declaration', eval_declaration);
  put('evaluate', 'variable_declaration', eval_declaration);
  put('evaluate', 'assignment', eval_assignment);
}
install_evaluate_package();

function evaluate(component, env) {
  const eval = get('evaluate', head(component));
  return eval ? eval(component, env) : error(component, 'unknown syntax -- evaluate');
}
