// 练习 1.23

function get_time() {
  return performance.now();
}

function display(n) {
  console.log(n);
}

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
    : find_divisor(n, next(test_divisor));
}

function next(input) {
  return input === 2 ? 3 : input + 2;
}

function divides(a, b) {
  return b % a === 0;
}

function is_prime(n) {
  return n === smallest_divisor(n);
}

function timed_prime_test(n) {
  display(n);
  return start_prime_test(n, get_time());
}

function start_prime_test(n, start_time) {
  return is_prime(n) ? report_prime(get_time(), start_time) : false;
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
