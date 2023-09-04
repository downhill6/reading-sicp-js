// 练习 1.35

// fi^2 = fi + 1
// 两边同时除以 fi, 可得
// fi = 1 + 1 / fi

function fixed_point(f, first_guess) {
  const tolerance = 0.00001;
  function close_enough(x, y) {
    return Math.abs(x - y) < tolerance;
  }
  function try_with(guess) {
    const next = f(guess);
    return close_enough(guess, next) ? next : try_with(next);
  }
  return try_with(first_guess);
}

fixed_point(x => 1 + 1 / x, 1); // 1.6180327868852458
