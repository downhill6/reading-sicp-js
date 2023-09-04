// 练习 1.31

function product(term, a, next, b) {
  return a > b ? 1 : term(a) * product(term, next(a), next, b);
}

function product_iter(term, a, next, b) {
  function iter(a, result) {
    return a > b ? result : iter(next(a), term(a) * result);
  }

  return iter(a, 1);
}

function fac(n) {
  function inc(x) {
    return x + 1;
  }
  function term(x) {
    return x;
  }
  return product(term, 1, inc, n);
}

function pi(n) {
  function next(x) {
    return x + 1;
  }
  function even(n) {
    return n % 2 === 0;
  }
  function term(x) {
    return even(x) ? (x + 2) / (x + 1) : (x + 1) / (x + 2);
  }

  return product_iter(term, 1, next, n) * 4;
}
