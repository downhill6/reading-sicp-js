// 练习 3.26
const {pair, head, tail, is_null, equal, set_tail, list, set_head} = require('./pair.js');

function make_tree(key, value, left, right) {
  return pair(pair(key, value), pair(left, right));
}

function tree_key(tree) {
  return head(head(tree));
}

function tree_value(tree) {
  return tail(head(tree));
}

function tree_left_branch(tree) {
  return head(tail(tree));
}

function tree_right_branch(tree) {
  return tail(tail(tree));
}

function set_tree_value(tree, value) {
  set_tail(head(tree), value);
}

function set_tree_left_branch(tree, left) {
  set_head(tail(tree), left);
}

function set_tree_right_branch(tree, right) {
  set_tail(tail(tree), right);
}

function make_table(compare_key) {
  let local_tree = null;

  function lookup_tree(key, tree) {
    if (is_null(tree)) {
      return false;
    } else {
      const compare_result = compare_key(key, tree_key(tree));
      if (equal(compare_result, '=')) {
        return tree_value(tree);
      } else if (equal(compare_result, '<')) {
        return lookup_tree(key, tree_left_branch(tree));
      } else if (equal(compare_result, '>')) {
        return lookup_tree(key, tree_right_branch(tree));
      }
    }
  }

  function lookup(key) {
    return lookup_tree(key, local_tree);
  }

  function insert(key, value) {
    function insert_tree(tree) {
      if (is_null(tree)) {
        return make_tree(key, value, null, null);
      } else {
        const compare_result = compare_key(key, tree_key(tree));
        if (equal(compare_result, '=')) {
          set_tree_value(tree, value);
        } else if (equal(compare_result, '<')) {
          set_tree_left_branch(tree, insert_tree(tree_left_branch(tree)));
        } else if (equal(compare_result, '>')) {
          set_tree_right_branch(tree, insert_tree(tree_right_branch(tree)));
        }
        return tree;
      }
    }

    if (is_null(local_tree)) {
      local_tree = insert_tree(local_tree);
    } else {
      insert_tree(local_tree);
    }
    return 'ok';
  }

  function dispatch(m) {
    return m === 'lookup'
      ? lookup
      : m === 'insert'
      ? insert
      : console.error(m, 'unknown operation -- table');
  }
  return dispatch;
}

function compare_number(key1, key2) {
  return key1 < key2 ? '<' : key1 > key2 ? '>' : '=';
}

const table = make_table(compare_number);
const insert = table('insert');
const lookup = table('lookup');

insert(1, 'a');
insert(0, 'z');

insert(2, 'b');
insert(3, 'c');

console.log(lookup(1)); // a
console.log(lookup(2)); // b
console.log(lookup(3)); // c
console.log(lookup(0)); // z
