// 练习 1.46

function iterative_improve(good_enough, improve) {
  function iter(guess) {
    const next = improve(guess);
    return good_enough(guess, next) ? guess : iter(next);
  }

  return iter;
}

function abs(x) {
  return x >= 0 ? x : -x;
}

function square(x) {
  return x * x;
}

function average(x, y) {
  return (x + y) / 2;
}

function sqrt(x) {
  function is_good_enough(guess) {
    return abs(square(guess) - x) < 0.001;
  }
  function improve(guess) {
    return average(guess, x / guess);
  }
  return iterative_improve(is_good_enough, improve)(1);
}

function fixed_point(f, first_guess) {
  const tolerance = 0.00001;
  function close_enough(x, y) {
    return abs(x - y) < tolerance;
  }

  return iterative_improve(close_enough, f)(first_guess);
}
