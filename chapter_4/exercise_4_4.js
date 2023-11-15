// exercise 4.4

const {list_ref, error, list} = require('./stdlib');

// [logical_composition, [&&, [[literal, [true, null]], [[literal, [false, null]], null]]]]

function is_logical_expression(component) {
  return is_tagged_list(component, 'logical_composition');
}

function logical_operation(component) {
  return list_ref(component, 1);
}

function logical_expression_1(component) {
  return list_ref(component, 2);
}

function logical_expression_2(component) {
  return list_ref(component, 3);
}

function make_conditional_expression(predicate, exp1, exp2) {
  return list('conditional_expression', predicate, exp1, exp2);
}

// 直接实现
function eval_and(component, env) {
  const exp1 = logical_expression_1(component);
  const exp2 = logical_expression_2(component);
  return is_truthy(evaluate(exp1)) ? evaluate(exp2) : false;
}

function eval_or(component, env) {
  const exp1 = logical_expression_1(component);
  const exp2 = logical_expression_2(component);
  return is_truthy(evaluate(exp1)) ? true : evaluate(exp2);
}

function eval_not(component, env) {
  const exp1 = logical_expression_1(component);
  return evaluate(exp1, env) ? false : true;
}

// 派生组件
function eval_and(component, env) {
  const exp1 = logical_expression_1(component);
  const exp2 = logical_expression_2(component);
  return evaluate(make_conditional_expression(exp1, exp2, make_literal(false)), env);
}

function eval_or(component, env) {
  const exp1 = logical_expression_1(component);
  const exp2 = logical_expression_2(component);
  return evaluate(make_conditional_expression(exp1, make_literal(true), exp2), env);
}

function eval_not(component, env) {
  const exp1 = logical_expression_1(component);
  return evaluate(make_conditional_expression(exp1, make_literal(false), make_literal(true)), env);
}

function eval_logical_expression(component, env) {
  const operation = logical_operation(component);
  return operation === '&&'
    ? eval_and(component, env)
    : operation === '||'
    ? eval_or(component, env)
    : operation === '!'
    ? eval_not(component, env)
    : error(component, 'eval_logical_expression  not found');
}
