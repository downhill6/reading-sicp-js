// 练习 1.7

function abs(x) {
  return x >= 0 ? x : -x;
}

function square(x) {
  return x * x;
}

function is_good_enough_old(guess, x) {
  return abs(square(guess) - x) < 0.001;
}

function average(x, y) {
  return (x + y) / 2;
}

function improve(guess, x) {
  return average(guess, x / guess);
}

function sqrt_iter(guess, x) {
  return is_good_enough(guess, x) ? guess : sqrt_iter(improve(guess, x), x);
}

function sqrt(x) {
  return sqrt_iter(1, x);
}

// 在计算非常小的数字时，因为误差比较值只有 0.001，所以误差较大
sqrt(0.001 * 0.001); // 计算结果是 0.031260655525445276，而正确结果是 0.001

// 因为计算机的精度是有限的，所以在计算非常大的数字时，留给小数点后的位数就会很少
// 导致误差比较值 0.001 无法满足 is_good_enough 的条件，从而导致无限递归
sqrt(100000000000000000.0); // 无限递归
// 实际的计算结果是 316227766.01683795， square(316227766.01683795) 的结果是 100000000000000050
// 误差是 50

// good_enough 的改进版本，使用相对误差来判断
function is_good_enough(guess, x) {
  return abs(square(guess) - x) / x < 0.001;
}
