// 练习 1.44

function compose(f, g) {
  return x => f(g(x));
}

function repeated(f, n) {
  return n === 1 ? f : compose(f, repeated(f, n - 1));
}

function smooth(x) {
  const dx = 0.00001;
  return x => (f(x + dx) + f(X) + f(x - dx)) / 3;
}

function smooth_n_times(f, n) {
  return repeated(smooth, n)(f);
}
