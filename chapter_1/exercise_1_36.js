// 练习 1.36

function dislpay(n) {
  console.log(n);
}

const tolerance = 0.00001;
function fixed_point(f, first_guess) {
  function close_enough(x, y) {
    return Math.abs(x - y) < tolerance;
  }
  function try_with(guess) {
    dislpay(guess);
    const next = f(guess);
    return close_enough(guess, next) ? next : try_with(next);
  }
  return try_with(first_guess);
}

function fixed_point_average(f, first_guess) {
  function close_enough(x, y) {
    return Math.abs(x - y) < tolerance;
  }
  function try_with(guess) {
    dislpay(guess);
    const next = (f(guess) + guess) / 2;
    return close_enough(guess, next) ? next : try_with(next);
  }
  return try_with(first_guess);
}

fixed_point(x => Math.log(1000) / Math.log(x), 2); // 4.555532270803653 共 34 步
fixed_point_average(x => Math.log(1000) / Math.log(x), 2); // 4.555537551999825 共 9 步
// 用平均阻尼加快了收敛速度
