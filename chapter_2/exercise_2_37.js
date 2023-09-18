// 练习 2.37

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

function append(seq1, seq2) {
  return accumulate(pair, seq2, seq1);
}

function length(sequence) {
  return accumulate((x, y) => y + 1, 0, sequence);
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

function accumulate_n(op, init, seqs) {
  return is_null(head(seqs))
    ? null
    : pair(
        accumulate(
          op,
          init,
          map(seq => head(seq), seqs),
        ),
        accumulate_n(
          op,
          init,
          map(seq => tail(seq), seqs),
        ),
      );
}

function plus(x, y) {
  return x + y;
}

function dot_product(v, w) {
  return accumulate(
    plus,
    0,
    accumulate_n((x, y) => x * y, 1, list(v, w)),
  );
}

function matrix_times_vector(m, v) {
  return map(w => dot_product(w, v), m);
}

function transpose(mat) {
  return accumulate_n(pair, null, mat);
}

function matrix_times_matrix(n, m) {
  const cols = transpose(n);
  return map(x => map(y => dot_product(x, y), cols), m);
}

const v = list(10, 20, 30);
const m1 = list(list(1, 2, 3), list(3, 5, 1), list(1, 1, 1));
const m2 = list(list(1, 2, 3), list(4, 5, 6), list(7, 8, 9));

display_list(matrix_times_vector(m1, v)); // [140, [160, [60, null]]]
display_list(transpose(m1)); // [1, [3, [1, null]]], [2, [5, [1, null]]], [3, [1, [1, null]]], null]]]
display_list(matrix_times_matrix(m1, m2)); // [30, [36, [42, null]]], [30, [39, [48, null]]], [12, [15, [18, null]]], null]]]
