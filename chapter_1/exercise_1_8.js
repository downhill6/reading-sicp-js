// 练习 1.8

function abs(x) {
  return x >= 0 ? x : -x;
}

function square(x) {
  return x * x;
}

function cube(x) {
  return x * x * x;
}

function is_good_enough(guess, x) {
  return abs(cube(guess) - x) / x < 0.001;
}

function improve(guess, x) {
  return (x / square(guess) + 2 * guess) / 3;
}

function cube_root(guess, x) {
  return is_good_enough(guess, x) ? guess : cube_root(improve(guess, x), x);
}

cube_root(1, 27); // 3.0000005410641766
