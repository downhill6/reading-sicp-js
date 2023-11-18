// exercise 4.5

const {list, for_each, is_null, adjoin_set, length, error, head, tail} = require('./stdlib');

// 1. 修改 evaluate，检查重复参数
function has_duplicate_params(args) {
  let params = list();
  for_each(arg => {
    params = adjoin_set(arg, params);
  }, args);
  return length(params) !== length(args);
}

function apply(fun, args) {
  if (!check_repeat_args(args)) {
    error('SyntaxError: Duplicate parameter name not allowed in this context');
  } else if (is_primitive_function(fun)) {
    return apply_primitive_function(fun, args);
  } else if (is_compound_function(fun)) {
    // 检查参数是否有重复
    const params = function_parameters(fun);
    if (has_duplicate_params(params)) {
      error(fun, 'Duplicate parameters in function definition.');
      return undefined;
    }

    const result = evaluate(
      function_body(fun),
      extend_environment(function_parameters(fun), args, function_environment(fun)),
    );
    return is_return_value(result) ? return_value_content(result) : undefined;
  } else {
    error(fun, 'unknown function type -- apply');
  }
}

// 2. verify 检查给定程序中的任何 lambda 表达式是否包含重复参数，主体块是否包含重名变量
function verify(program) {
  const seen_params = new Set();

  function check_lambda(node) {
    const params = lambda_parameter_symbols(node);
    // 检查参数重复
    function loop(params) {
      if (is_null(params)) {
        return null;
      } else {
        const p = head(params);
        if (seen_params.has(p)) {
          throw new Error(`error: Duplicate parameter '${p}' in lambda expression`);
        }
        seen_params.add(p);
        loop(tail(params));
      }
    }
    loop(params);

    // 检查参数是否与主体块中的名称重复
    check_body_names(lambda_body(node));

    // 清空当前 lambda 表达式的参数集合，以便处理嵌套的 lambda 表达式
    seen_params.clear();

    // 递归检查 lambda 表达式的主体
    return start(lambda_body(node));
  }

  // check body duplicate names
  function check_body_names(stmts) {
    if (is_null(stmts)) {
      return null;
    } else {
      if (is_constant_declaration(stmts) || is_variable_declaration(stmts)) {
        const name = declaration_symbol(stmts);
        if (seen_params.has(name)) {
          throw new Error(
            `Variable name '${name}' is already a parameter in the lambda expression.`,
          );
        }
      } else if (is_block(stmts)) {
        return check_body_names(block_body(stmts), seen_params);
      } else if (is_sequence(stmts)) {
        const sequence = sequence_statements(stmts);
        check_body_names(first_statement(sequence));
        check_body_names(rest_statements(sequence));
      }
    }
  }

  function check_function(node) {
    const params = function_declaration_parameters(node);
    console.log('check_function', map(symbol_of_name, params));
    return check_lambda(
      make_lambda_expression(
        function_declaration_parameters(node),
        function_declaration_body(node),
      ),
    );
  }

  function loop_statements(stmts) {
    if (is_null(stmts)) {
      return null;
    } else {
      const stmt = first_statement(stmts);
      start(stmt);
      return loop_statements(rest_statements(stmts));
    }
  }

  function start(program) {
    console.log('start::', program);
    if (is_block(program)) {
      // 新 block, 清空集合
      seen_params.clear();
      return start(block_body(program));
    } else if (is_sequence(program)) {
      return loop_statements(sequence_statements(program));
    } else if (is_lambda_expression(program)) {
      return check_lambda(program);
    } else if (is_function_declaration(program)) {
      return check_function(program);
    } else {
      console.log('yo.');
    }
  }

  start(program);
}

const my_program = parse('(x, y) => { const z = 1; (x, yy)  => { const yy =1; } }');

verify(my_program);
