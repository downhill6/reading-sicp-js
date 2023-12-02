// exercise 4.7

// 1.
function is_while_loop(component) {
  return is_tagged_list(component, 'while_loop');
}

function while_predicate(component) {
  return list_ref(component, 1);
}

function while_block(component) {
  return list_ref(component, 2);
}

// 2.
function while_loop(predicate, body) {
  if (predicate()) {
    body();
    return while_loop(predicate, body);
  } else {
    return null;
  }
}

// 3.
//  需要把 while_loop 安装到 primitive_functions
function while_to_application(component) {
  const predicate = () => while_predicate(component);
  const body = () => while_block(component);
  return make_application(
    make_name('while_loop'),
    list(make_lambda_expression(list(), predicate), make_lambda_expression(list(), body)),
  );
}

// 4. What problem arises with this approach for implementing while loops, when the programmer decides within the body of the loop to return from the function that contains the loop?
// 无法直接返回，因为此时的 return 只能返回到 while_loop 函数，而不是 while_loop 的调用者

// 5.Change your approach to address the problem. How about directly installing while loops for the evaluator, using a function eval_while?
function eval_while(component, env) {
  const predicate = while_predicate(component);
  const body = while_block(component);
  if (evaluate(predicate, env)) {
    const result = evaluate(body, env);
    return is_return_value(result) ? return_value_content(result) : eval_while(component, env);
  } else {
    return null;
  }
}

// 6. 实现 break 语句, 7. 实现 continue 语句
// 需要修改 evaluate，让其返回 break_statement 和 continue_statement

function is_break_statement(component) {
  return is_tagged_list(component, 'break_statement');
}

function is_continue_statement(component) {
  return is_tagged_list(component, 'continue_statement');
}

function eval_while(component, env) {
  const predicate = while_predicate(component);
  const body = while_block(component);
  if (evaluate(predicate, env)) {
    const result = evaluate(body, env);
    if (is_break_statement(result)) {
      return null;
    } else if (is_return_value(result)) {
      return return_value_content(result);
    } else if (is_continue_statement(result)) {
      return eval_while(component, env);
    } else {
      return eval_while(component, env);
    }
  } else {
    return null;
  }
}
