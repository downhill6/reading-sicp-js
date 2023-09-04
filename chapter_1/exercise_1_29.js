// 练习 1.29

function cube(x) {
  return x * x * x;
}

function sum(term, a, next, b) {
  return a > b ? 0 : term(a) + sum(term, next(a), next, b);
}

function even(n) {
  return n % 2 === 0;
}

function inc(k) {
  return k + 1;
}

function simpsons_rule_integral(f, a, b, n) {
  function helper(h) {
    function y(k) {
      return f(a + k * h);
    }

    function term(k) {
      return k === 0 || k === n ? y(k) : even(k) ? 2 * y(k) : 4 * y(k);
    }

    return (sum(term, 0, inc, n) * h) / 3;
  }
  return helper((b - a) / n);
}

// 精度很高
simpsons_rule_integral(cube, 0, 1, 100); // 0.24999999999999992
simpsons_rule_integral(cube, 0, 1, 1000); // 0.2500000000000003
