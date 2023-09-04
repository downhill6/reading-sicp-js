// 练习 1.33

function filtered_accumulate(combiner, null_value, term, a, next, b, filter) {
  return a > b
    ? null_value
    : filter(a)
    ? combiner(term(a), filtered_accumulate(combiner, null_value, term, next(a), next, b, filter))
    : filtered_accumulate(combiner, null_value, term, next(a), next, b, filter);
}

function filtered_accumulate_iter(combiner, null_value, term, a, next, b, filter) {
  function iter(a, result) {
    return a > b
      ? result
      : filter(a)
      ? iter(next(a), combiner(term(a), result))
      : iter(next(a), result);
  }

  return iter(a, null_value);
}

function is_prime(n) {
  function square(x) {
    return x * x;
  }
  function smallest_divisor(n) {
    return find_divisor(n, 2);
  }
  function find_divisor(n, test_divisor) {
    return square(test_divisor) > n
      ? n
      : divides(test_divisor, n)
      ? test_divisor
      : find_divisor(n, test_divisor + 1);
  }
  function divides(a, b) {
    return b % a === 0;
  }

  return n === smallest_divisor(n);
}

function prime_squares_sum(a, b) {
  function next(a) {
    return a + 1;
  }
  function term(a) {
    return a * a;
  }
  function combiner(a, b) {
    return a + b;
  }

  return filtered_accumulate_iter(combiner, 0, term, a, next, b, is_prime);
}

function relative_prime_product(n) {
  function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
  }
  function next(a) {
    return a + 1;
  }
  function filter(a) {
    return gcd(a, n) === 1;
  }
  function combiner(a, b) {
    return a * b;
  }
  function term(a) {
    return a;
  }
  return filtered_accumulate(combiner, 1, term, 1, next, n, filter);
}

relative_prime_product(5); // 24

prime_squares_sum(1, 5); // 39
