// exercise 4.1

const {is_null, tail, head, pair, list} = require('./stdlib');

const evaluate = x => console.log(x);

// from left to right
function list_of_values_1(exps, env) {
  if (is_null(exps)) {
    return null;
  } else {
    const first = evaluate(head(exps), env);
    return pair(first, list_of_values_1(tail(exps), env));
  }
}

// from right to left
function list_of_values_2(exps, env) {
  if (is_null(exps)) {
    return null;
  } else {
    const rest = list_of_values_2(tail(exps), env);
    return pair(evaluate(head(exps), env), rest);
  }
}

list_of_values_1(list(1, 2, 3)); // 打印 1 2 3
list_of_values_2(list(1, 2, 3)); // 打印 3 2 1
