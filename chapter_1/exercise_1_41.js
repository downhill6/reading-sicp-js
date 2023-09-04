// 练习 1.41

function double(fn) {
  return x => fn(fn(x));
}

function inc(x) {
  return x + 1;
}

double(double(double))(inc)(5); // 21
