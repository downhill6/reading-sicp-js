// 练习 2.34

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

function map(f, sequence) {
  return accumulate((x, y) => pair(f(x), y), null, sequence);
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

function horner_eval(x, coefficient_sequence) {
  return accumulate(
    (this_coeff, higher_terms) => this_coeff + higher_terms * x,
    0,
    coefficient_sequence,
  );
}

display(horner_eval(2, list(1, 3, 0, 5, 0, 1))); // 79
