// exercise 4.6

const {is_null, tail} = require('./stdlib');

// 1. example
// let 重复声明报错，let* 只会覆盖变量
// let a = 1;
// let* a = 2;

// 2. 标记列表
// `< let* name = expression; > = list("variable_star_declaration", < name >, < expression >)`

function is_variable_star_declaration(component) {
  return is_tagged_list(component, 'variable_star_declaration');
}

function variable_star_declaration_name(component) {
  return head(tail(component));
}

function variable_star_declaration_value_expression(component) {
  return head(tail(tail(component)));
}

// 3.
function let_star_to_nested_let(component) {
  if (!is_null(component)) {
    if (is_variable_star_declaration(component)) {
      return make_block(
        make_constant_declaration(
          variable_star_declaration_name(component),
          variable_star_declaration_value_expression(component),
        ),
      );
    } else {
      return let_star_to_nested_let(tail(component));
    }
  } else {
    return component;
  }
}

// 4.
// todo
