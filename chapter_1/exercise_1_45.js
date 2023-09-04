// 练习 1.45

function abs(x) {
  return x >= 0 ? x : -x;
}

function fixed_point(f, first_guess) {
  const tolerance = 0.00001;
  function close_enough(x, y) {
    return abs(x - y) < tolerance;
  }
  function try_with(guess) {
    const next = f(guess);
    return close_enough(guess, next) ? next : try_with(next);
  }
  return try_with(first_guess);
}

function average(x, y) {
  return (x + y) / 2;
}

function average_damp(f) {
  return x => average(x, f(x));
}

function compose(f, g) {
  return x => f(g(x));
}

function repeated(f, n) {
  return n === 0 ? x => x : compose(f, repeated(f, n - 1));
}

function square(x) {
  return x * x;
}

function is_even(n) {
  return n % 2 === 0;
}

function fast_expt(b, n) {
  function fast_expt_iter(b, n, result) {
    return n === 0
      ? result
      : even(n)
      ? fast_expt_iter(b * b, n / 2, result)
      : fast_expt_iter(b, n - 1, b * result);
  }
  return fast_expt_iter(b, n, 1);
}

// 要让 y = x / y^n-1 收敛，至少需要 log2(n) 次 平均阻尼
function damped(n) {
  return repeated(average_damp, Math.floor(Math.log2(n)));
}

function nth_root(n, x) {
  return fixed_point(
    damped(n)(y => x / fast_expt(y, n - 1)),
    1,
  );
}

nth_root(2, 3);
