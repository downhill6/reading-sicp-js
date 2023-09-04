// 练习 1.40

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

function deriv(g) {
  const dx = 0.00001;
  return x => (g(x + dx) - g(x)) / dx;
}

function newton_transform(g) {
  return x => x - g(x) / deriv(g)(x);
}

function newton_method(g, guess) {
  return fixed_point(newton_transform(g), guess);
}

function cubic(a, b, c) {
  function cube(x) {
    return x * x * x;
  }
  function square(x) {
    return x * x;
  }
  return x => cube(x) + a * square(x) + b * x + c;
}

newton_method(cubic(1, 2, 3), 1); // -1.2756822036498454
