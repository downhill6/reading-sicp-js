// 4.1.1 元循环求值器
// https://sourceacademy.org/sicpjs/4.1.1

const {is_string, stringify} = require('./stdlib');
const {map, accumulate, list_ref} = require('./stdlib/list');
const {error, tail, head} = require('./stdlib/pair');

function evaluate(component, env) {
  return is_literal(component)
    ? literal_value(component)
    : is_name(component)
    ? lookup_symbol_value(symbol_of_name(component), env)
    : is_application(component)
    ? apply(
        evaluate(function_expression(component), env),
        list_of_values(arg_expressions(component), env),
      )
    : is_operator_combination(component)
    ? evaluate(operator_combination_to_application(component), env)
    : is_conditional(component)
    ? eval_conditional(component, env)
    : is_lambda_expression(component)
    ? make_function(lambda_parameter_symbols(component), lambda_body(component), env)
    : is_sequence(component)
    ? eval_sequence(sequence_statements(component), env)
    : is_block(component)
    ? eval_block(component, env)
    : is_return_statement(component)
    ? eval_return_statement(component, env)
    : is_function_declaration(component)
    ? evaluate(function_decl_to_constant_decl(component), env)
    : is_declaration(component)
    ? eval_declaration(component, env)
    : is_assignment(component)
    ? eval_assignment(component, env)
    : error(component, 'unknown syntax -- evaluate');
}

function apply(fun, args) {
  if (is_primitive_function(fun)) {
    return apply_primitive_function(fun, args);
  } else if (is_compound_function(fun)) {
    const result = evaluate(
      function_body(fun),
      extend_environment(function_parameters(fun), args, function_environment(fun)),
    );
    return is_return_value(result) ? return_value_content(result) : undefined;
  } else {
    error(fun, 'unknown function type -- apply');
  }
}

// 处理函数的参数列表
function list_of_values(exps, env) {
  return map(arg => evaluate(arg, env), exps);
}

// 条件表达式
function eval_conditional(component, env) {
  return is_truthy(evaluate(conditional_predicate(component), env))
    ? evaluate(conditional_consequent(component), env)
    : evaluate(conditional_alternative(component), env);
}

// 处理顶层或块中的语句序列
function eval_sequence(stmts, env) {
  if (is_empty_sequence(stmts)) {
    return undefined;
  } else if (is_last_statement(stmts)) {
    return evaluate(first_statement(stmts), env);
  } else {
    const first_stmt_value = evaluate(first_statement(stmts), env);
    if (is_return_value(first_stmt_value)) {
      return first_stmt_value;
    } else {
      return eval_sequence(rest_statements(stmts), env);
    }
  }
}

// 处理块
function eval_block(component, env) {
  const body = block_body(component);
  const locals = scan_out_declarations(body);
  const unassigneds = list_of_unsigned(locals);
  return evaluate(body, extend_environment(locals, unassigneds, env));
}

function list_of_unsigned(symbols) {
  return map(symbol => '*unassigned*', symbols);
}

function scan_out_declarations(component) {
  // 按序列查找变量声明
  return is_sequence(component)
    ? accumulate(append, null, map(scan_out_declarations, sequence_statements(component)))
    : is_declaration(component)
    ? list(declaration_symbol(component))
    : null;
}

// return 语句
function eval_return_statement(component, env) {
  return make_return_value(evaluate(return_expression(component), env));
}

// 赋值和声明
function eval_assignment(component, env) {
  const value = evaluate(assignment_value_expression(component), env);
  assign_symbol_value(assignment_symbol(component), value, env);
  return value;
}

function eval_declaration(component, env) {
  assign_symbol_value(
    declaration_symbol(component),
    evaluate(declaration_value_expression(component), env),
    env,
  );
  return undefined;
}

//==========
// 语法
//==========

function is_tagged_list(component, the_tag) {
  return is_pair(component) && head(component) === the_tag;
}

// literal
function is_literal(component) {
  return is_tagged_list(component, 'literal');
}

function literal_value(component) {
  return head(tail(component));
}

function make_literal(value) {
  return list('literal', value);
}

// name
function make_name(symbol) {
  return list('name', symbol);
}

function is_name(component) {
  return is_tagged_list(component, 'name');
}

function symbol_of_name(component) {
  return head(tail(component));
}

// expression statement

// function application
function is_application(component) {
  return is_tagged_list(component, 'application');
}

function make_application(function_expression, argument_expression) {
  return list('application', function_expression, argument_expression);
}

function function_expression(component) {
  return list_ref(component, 1);
}

function arg_expressions(component) {
  return list_ref(component, 2);
}

// conditional
function is_conditional(component) {
  return (
    is_tagged_list(component, 'conditional_expression') ||
    is_tagged_list(component, 'conditional_statement')
  );
}

function conditional_predicate(component) {
  return list_ref(component, 1);
}

function conditional_consequent(component) {
  return list_ref(component, 2);
}

function conditional_alternative(component) {
  return list_ref(component, 3);
}

// lambda expression
function is_lambda_expression(component) {
  return is_tagged_list(component, 'lambda_expression');
}

function lambda_body(component) {
  return list_ref(component, 2);
}

function lambda_parameter_symbols(component) {
  return map(symbol_of_name, head(tail(component)));
}

function make_lambda_expression(parameters, body) {
  return list('lambda_expression', parameters, body);
}

// sqquense
function is_sequence(component) {
  return is_tagged_list(component, 'sequence');
}

function sequence_statements(component) {
  return list_ref(component, 1);
}

function first_statement(stmts) {
  return head(stmts);
}

function rest_statements(stmts) {
  return tail(stmts);
}

function is_empty_sequence(stmts) {
  return is_null(stmts);
}

function is_last_statement(stmts) {
  return is_null(tail(stmts));
}

// block
function is_block(component) {
  return is_tagged_list(component, 'block');
}

function block_body(component) {
  return list_ref(component, 1);
}

// return statements
function is_return_statement(component) {
  return is_tagged_list(component, 'return_statement');
}

function return_expression(component) {
  return list_ref(component, 1);
}

// assignment
function is_assignment(component) {
  return is_tagged_list(component, 'assignment');
}

function assignment_symbol(component) {
  return symbol_of_name(head(tail(component)));
}

function assignment_value_expression(component) {
  return list_ref(2);
}

// Constant, variable, and function declarations
function declaration_symbol(component) {
  return symbol_of_name(head(tail(component)));
}

function declaration_value_expression(component) {
  return head(tail(tail(component)));
}

function make_constant_declaration(name, value_expression) {
  return list('constant_declaration', name, value_expression);
}

function is_declaration(component) {
  return (
    is_tagged_list(component, 'constant_declaration') ||
    is_tagged_list(component, 'variable_declaration') ||
    is_tagged_list(component, 'function_declaration')
  );
}

// function
function is_function_declaration(component) {
  return is_tagged_list(component, 'function_declaration');
}

function function_declaration_name(component) {
  return symbol_of_name(head(tail(component)));
}

function function_declaration_parameters(component) {
  return map(symbol_of_name, list_ref(component, 2));
}

function function_declaration_body(component) {
  return list_ref(component, 3);
}

// Derived components
function function_decl_to_constant_decl(component) {
  return make_constant_declaration(
    function_declaration_name(component),
    make_lambda_expression(
      function_declaration_parameters(component),
      function_declaration_body(component),
    ),
  );
}

// 选择器为 operator_symbol 、 first_operand 和 second_operand

function is_operator_combination(component) {
  return is_unary_operator_combination(component) || is_binary_operator_combination(component);
}

function is_unary_operator_combination(component) {
  return is_tagged_list(component, 'unary_operator_combination');
}

function is_binary_operator_combination(component) {
  return is_tagged_list(component, 'binary_operator_combination');
}

function operator_symbol(component) {
  return head(tail(component));
}

function first_operand(component) {
  return head(list_ref(component, 2));
}

function second_operand(component) {
  return head(tail(list_ref(component, 2)));
}

function operator_combination_to_application(component) {
  const operator = operator_symbol(component);
  return is_unary_operator_combination(component)
    ? make_application(make_name(operator), list(first_operand(component)))
    : make_application(
        make_name(operator),
        list(first_operand(component), second_operand(component)),
      );
}
