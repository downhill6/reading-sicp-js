// 练习 2.42

function pair(x, y) {
  return [x, y];
}

function head(pair) {
  return pair[0];
}

function tail(pair) {
  return pair[1];
}

function is_pair(x) {
  return Array.isArray(x) && x.length === 2;
}

function is_null(val) {
  return val === null;
}

function list(...args) {
  const [first, ...rest] = args;
  return args.length === 0 ? null : pair(first, list(...rest));
}

function accumulate(op, initial, sequence) {
  return is_null(sequence) ? initial : op(head(sequence), accumulate(op, initial, tail(sequence)));
}

function map(fun, items) {
  return is_null(items) ? null : pair(fun(head(items)), map(fun, tail(items)));
}

function filter(predicate, sequence) {
  return is_null(sequence)
    ? null
    : predicate(head(sequence))
    ? pair(head(sequence), filter(predicate, tail(sequence)))
    : filter(predicate, tail(sequence));
}

function enumerate_interval(low, high) {
  return low > high ? null : pair(low, enumerate_interval(low + 1, high));
}

function enumerate_tree(tree) {
  return is_null(tree)
    ? null
    : !is_pair(tree)
    ? list(tree)
    : append(enumerate_tree(head(tree)), enumerate_tree(tail(tree)));
}

function append(list1, list2) {
  return is_null(list1) ? list2 : pair(head(list1), append(tail(list1), list2));
}

function reverse(sequence) {
  return fold_right((x, y) => append(y, list(x)), null, sequence);
}

function square(x) {
  return x * x;
}

function display_list(list) {
  function rec(list) {
    return is_pair(list)
      ? '[' + rec(head(list)) + ', ' + rec(tail(list)) + ']'
      : is_null(list)
      ? 'null'
      : `${list}`;
  }
  console.log(rec(list));
}

function display(x) {
  console.log(x);
}

function flatmap(f, seq) {
  return accumulate(append, null, map(f, seq));
}

function remove(item, sequence) {
  return filter(x => !(x === item), sequence);
}

function permutations(s) {
  return is_null(s)
    ? list(null)
    : flatmap(x => map(p => pair(x, p), permutations(remove(x, s))), s);
}

// ========

function adjoin_position(new_row, k, rest_of_queens) {
  // 把第 k 列放在第一位
  return pair(pair(new_row, k), rest_of_queens);
}

function is_safe(k, position) {
  function same_row(a, b) {
    return head(a) === head(b);
  }

  function same_diagonal(a, b) {
    return Math.abs(head(a) - head(b)) === Math.abs(tail(a) - tail(b));
  }

  const k_pos = head(position);
  return accumulate(
    (pos, result) => {
      return result && !same_diagonal(k_pos, pos) && !same_row(k_pos, pos);
    },
    true,
    tail(position),
  );
}

const empty_board = null;

function queens(board_size) {
  function queen_cols(k) {
    return k === 0
      ? list(empty_board)
      : filter(
          positions => is_safe(k, positions),
          flatmap(
            rest_of_queens =>
              map(
                new_row => adjoin_position(new_row, k, rest_of_queens),
                enumerate_interval(1, board_size),
              ),
            queen_cols(k - 1),
          ),
        );
  }
  return queen_cols(board_size);
}

queens(8);
