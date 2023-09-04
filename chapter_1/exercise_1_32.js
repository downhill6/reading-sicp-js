// 练习 1.32

function accumulate(combiner, null_value, term, a, next, b) {
  return a > b
    ? null_value
    : combiner(
        term(a),
        accumulate(combiner, null_value, term, next(a), next, b),
      );
}

function accumulate_iter(combiner, null_value, term, a, next, b) {
  function iter(a, result) {
    return a > b ? result : iter(next(a), combiner(term(a), result));
  }

  return iter(a, null_value);
}

function product(term, a, next, b) {
  function combiner(a, b) {
    return a * b;
  }

  return accumulate_iter(combiner, 1, term, a, next, b);
}

function sum(term, a, next, b) {
  function combiner(a, b) {
    return a + b;
  }

  return accumulate(combiner, 0, term, a, next, b);
}

sum(
  a => a,
  1,
  a => a + 1,
  10,
);
