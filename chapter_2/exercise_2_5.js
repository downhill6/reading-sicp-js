// 练习 2.5

// 证明 https://github.com/hjcapple/reading-sicp/blob/master/chapter_2/exercise_2_5.md

function even(n) {
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

function pair(a, b) {
  return fast_expt(2, a) * fast_expt(3, b);
}

function head(p) {
  return p % 2 === 0 ? head(p / 2) + 1 : 0;
}

function tail(p) {
  return p % 3 === 0 ? tail(p / 3) + 1 : 0;
}

head(pair(1, 2));
tail(pair(1, 2));
