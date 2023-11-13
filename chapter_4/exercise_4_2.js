const {parse} = require('./parser/parser');
const {is_string, stringify} = require('./stdlib');
const {map, list_ref} = require('./stdlib/list');
const {error, tail, head, display, is_pair, is_null} = require('./stdlib/pair');

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

function construct_literal(component) {
  const literal = literal_value(component);
  return is_string(literal) ? '"' + literal + '"' : stringify(literal);
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

function construct_function_application(component) {
  // Constructs fun-expr(arg-expr_1, ..., arg-expr_n)
  return (
    unparse(function_expression(component)) +
    bracketize(join(map(unparse, arg_expressions(component)), ','))
  );
}

function is_conditional_expression(component) {
  return is_tagged_list(component, 'conditional_expression');
}

function is_conditional_statement(component) {
  return is_tagged_list(component, 'conditional_statement');
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

function construct_conditional_expression(component) {
  // xx ? a : b;
  return (
    unparse(conditional_predicate(component)) +
    ' ? ' +
    unparse(conditional_consequent(component)) +
    ' : ' +
    unparse(conditional_alternative(component))
  );
}

function construct_conditional_statement(component) {
  // if (xx) {..} else {..}
  return (
    'if ' +
    bracketize(unparse(conditional_predicate(component))) +
    '{\n' +
    unparse(conditional_consequent(component)) +
    '\n}' +
    ' else ' +
    '{\n' +
    unparse(conditional_alternative(component)) +
    '\n}'
  );
}

// lambda expression
function is_lambda_expression(component) {
  return is_tagged_list(component, 'lambda_expression');
}

function lambda_body(component) {
  return list_ref(component, 2);
}

function lambda_parameter_symbols(component) {
  return head(tail(component));
}

function construct_lambda_expression(component) {
  // (name1,...namen) => {..}
  const names = map(unparse, lambda_parameter_symbols(component));
  const block = unparse(lambda_body(component));

  return bracketize(join(names, ' , ')) + ' => ' + block;
}

// sqquense
function is_sequence(component) {
  return is_tagged_list(component, 'sequence');
}

function sequence_statements(component) {
  return list_ref(component, 1);
}

function construct_sequence(component) {
  return join(map(unparse, sequence_statements(component)), ';\n');
}

// block
function is_block(component) {
  return is_tagged_list(component, 'block');
}

function block_body(component) {
  return list_ref(component, 1);
}

function construct_block(component) {
  return '{\n' + unparse(block_body(component)) + '\n}';
}

// return statements
function is_return_statement(component) {
  return is_tagged_list(component, 'return_statement');
}

function return_expression(component) {
  return list_ref(component, 1);
}

function construct_return_statement(component) {
  return 'return ' + unparse(return_expression(component));
}

// assignment
function is_assignment(component) {
  return is_tagged_list(component, 'assignment');
}

function assignment_symbol(component) {
  return head(tail(component));
}

function assignment_value_expression(component) {
  return list_ref(2);
}

function construct_assignment(component) {
  return (
    unparse(assignment_symbol(component)) + ' = ' + unparse(assignment_value_expression(component))
  );
}

// Constant, variable, and function declarations
function declaration_symbol(component) {
  return head(tail(component));
}

function declaration_value_expression(component) {
  return head(tail(tail(component)));
}

function is_constant_declaratino(component) {
  return is_tagged_list(component, 'constant_declaration');
}

function is_variable_declaration(component) {
  return is_tagged_list(component, 'variable_declaration');
}

function construct_constant_declaration(component) {
  return (
    'const ' +
    unparse(declaration_symbol(component)) +
    ' = ' +
    unparse(declaration_value_expression(component))
  );
}

function construct_variable_declaration(component) {
  return (
    'let ' +
    unparse(declaration_symbol(component)) +
    ' = ' +
    unparse(declaration_value_expression(component))
  );
}

// function
function is_function_declaration(component) {
  return is_tagged_list(component, 'function_declaration');
}

function function_declaration_name(component) {
  return head(tail(component));
}

function function_declaration_parameters(component) {
  return list_ref(component, 2);
}

function function_declaration_body(component) {
  return list_ref(component, 3);
}

function construct_function_declaration(component) {
  const fn_name = unparse(function_declaration_name(component));
  const parameters = bracketize(
    join(map(unparse, function_declaration_parameters(component)), ','),
  );
  const body = unparse(function_declaration_body(component));
  return 'function ' + fn_name + parameters + ' {\n' + body + '\n}';
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
  return list_ref(component, 2);
}

function second_operand(component) {
  return list_ref(component, 3);
}

function construct_unary_operator_combination(component) {
  return operator_symbol(component) + bracketize(unparse(first_operand(component)));
}

function construct_binary_operator_combination(component) {
  return (
    bracketize(unparse(first_operand(component))) +
    ' ' +
    operator_symbol(component) +
    ' ' +
    bracketize(unparse(second_operand(component)))
  );
}

// unparse
function join(sequence, delimitter) {
  return is_null(sequence)
    ? ''
    : is_null(tail(sequence))
    ? head(sequence)
    : head(sequence) + delimitter + join(tail(sequence), delimitter);
}

function bracketize(unparsed) {
  return '(' + unparsed + ')';
}

function unparse(component) {
  return is_literal(component)
    ? construct_literal(component)
    : is_name(component)
    ? symbol_of_name(component)
    : is_application(component)
    ? construct_function_application(component)
    : is_conditional_expression(component)
    ? construct_conditional_expression(component)
    : is_conditional_statement(component)
    ? construct_conditional_statement(component)
    : is_lambda_expression(component)
    ? construct_lambda_expression(component)
    : is_sequence(component)
    ? construct_sequence(component)
    : is_block(component)
    ? construct_block(component)
    : is_return_statement(component)
    ? construct_return_statement(component)
    : is_assignment(component)
    ? construct_assignment(component)
    : is_constant_declaratino(component)
    ? construct_constant_declaration(component)
    : is_variable_declaration(component)
    ? construct_variable_declaration(component)
    : is_function_declaration(component)
    ? construct_function_declaration(component)
    : is_unary_operator_combination(component)
    ? construct_unary_operator_combination(component)
    : is_binary_operator_combination(component)
    ? construct_binary_operator_combination(component)
    : error(component, 'unknown syntax -- unparse');
}

// Functions, returns, operators, conditionals, applications
display(unparse(parse('function factorial(n) { return n === 0 ? 1 : n * factorial(n - 1);}')));
// function factorial(n) {
//   return n === 0 ? 1 : n * factorial(n - 1);
// }
display('=======');

// Lambdas, declarations, operators, conditionals, applications
display(unparse(parse('const factorial = n => n === 0 ? 1 : n * factorial(n - 1);')));
// const factorial = (n) => return (n) === (0) ? 1 : (n) * (factorial((n) - (1)))
display('=======');

// Declarations, operators, applications, sequences
display(unparse(parse('const size = 2; let five_times = 5 * size; !true; 4 + p(5);')));
// const size = 2;
// let five_times = (5) * (size);
// !(true);
// (4) + (p(5))
display('=======');

// Conditionals, applications
display(unparse(parse('if (is_even(n)) { display("even!"); } else { display("odd!"); } ')));
// if (is_even(n)) {
//   display('even!');
// } else {
//   display('odd!');
// }
display('=======');

// Functions, conditionals, returns, operators, applications (this is the example for normal-order evaluation)
display(
  unparse(
    parse('function p() { return p(); } function f(x, y) { return x === 0 ? x : y; } f(0, p());'),
  ),
);
// function p() {
//   return p();
// }
// function f(x, y) {
//   return x === 0 ? x : y;
// }
// f(0, p());
display('=======');
