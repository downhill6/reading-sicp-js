// 练习 1.24

function get_time() {
  return performance.now();
}

function display(n) {
  console.log(n);
}

function square(x) {
  return x * x;
}

function even(n) {
  return n % 2 === 0;
}

function smallest_divisor(n) {
  return find_divisor(n, 2);
}

function find_divisor(n, test_divisor) {
  return square(test_divisor) > n
    ? n
    : divides(test_divisor, n)
    ? test_divisor
    : find_divisor(n, next(test_divisor));
}

function next(input) {
  return input === 2 ? 3 : input + 2;
}

function divides(a, b) {
  return b % a === 0;
}

function miller_rabin_test(n) {
  function try_it(a) {
    return expmod(a, n, n) === a;
  }
  return try_it(1 + Math.floor(Math.random() * (n - 1)));
}

function fast_is_prime(n, times) {
  return times === 0
    ? true
    : miller_rabin_test(n)
    ? fast_is_prime(n, times - 1)
    : false;
}

function expmod(base, exp, m) {
  return exp === 0
    ? 1
    : even(exp)
    ? square(expmod(base, exp / 2, m)) % m
    : ((base % m) * expmod(base, exp - 1, m)) % m;
}

function timed_prime_test(n) {
  display(n);
  return start_prime_test(n, get_time());
}

function start_prime_test(n, start_time) {
  return miller_rabin_test(n) ? report_prime(get_time(), start_time) : false;
}

function report_prime(end_time, start_time) {
  display(' *** ');
  console.log(end_time, start_time);
  display(end_time - start_time);
  return true;
}

function search_for_primes(n, count) {
  return count === 0
    ? true
    : n > 2 && n % 2 === 0
    ? search_for_primes(n + 1, count)
    : timed_prime_test(n)
    ? search_for_primes(n + 2, count - 1)
    : search_for_primes(n + 2, count);
}

search_for_primes(1000, 3);
// search_for_primes(10000, 3);
// search_for_primes(1000000, 3);
