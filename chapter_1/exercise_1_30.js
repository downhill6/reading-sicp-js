// 练习 1.30

function sum(term, a, next, b) {
  function iter(a, result) {
    return a > b ? result : iter(next(a), term(a) + result);
  }

  return iter(a, 0);
}
