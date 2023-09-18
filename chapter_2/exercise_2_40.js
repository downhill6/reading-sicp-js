// 练习 2.40

function pair(x, y) {
  return [x, y];
}

function head(pair) {
  return pair[0];
}

function tail(pair) {
  return pair[1];
}

function is_pair(x) {
  return Array.isArray(x) && x.length === 2;
}

function is_null(val) {
  return val === null;
}

function list(...args) {
  const [first, ...rest] = args;
  return args.length === 0 ? null : pair(first, list(...rest));
}

function accumulate(op, initial, sequence) {
  return is_null(sequence) ? initial : op(head(sequence), accumulate(op, initial, tail(sequence)));
}

function map(fun, items) {
  return is_null(items) ? null : pair(fun(head(items)), map(fun, tail(items)));
}

function filter(predicate, sequence) {
  return is_null(sequence)
    ? null
    : predicate(head(sequence))
    ? pair(head(sequence), filter(predicate, tail(sequence)))
    : filter(predicate, tail(sequence));
}

function enumerate_interval(low, high) {
  return low > high ? null : pair(low, enumerate_interval(low + 1, high));
}

function enumerate_tree(tree) {
  return is_null(tree)
    ? null
    : !is_pair(tree)
    ? list(tree)
    : append(enumerate_tree(head(tree)), enumerate_tree(tail(tree)));
}

function append(list1, list2) {
  return is_null(list1) ? list2 : pair(head(list1), append(tail(list1), list2));
}

function reverse(sequence) {
  return fold_right((x, y) => append(y, list(x)), null, sequence);
}

function square(x) {
  return x * x;
}

function display_list(list) {
  function rec(list) {
    return is_pair(list)
      ? '[' + rec(head(list)) + ', ' + rec(tail(list)) + ']'
      : is_null(list)
      ? 'null'
      : `${list}`;
  }
  console.log(rec(list));
}

function display(x) {
  console.log(x);
}

function flatmap(f, seq) {
  return accumulate(append, null, map(f, seq));
}

function remove(item, sequence) {
  return filter(x => !(x === item), sequence);
}

function permutations(s) {
  return is_null(s)
    ? list(null)
    : flatmap(x => map(p => pair(x, p), permutations(remove(x, s))), s);
}

// ========

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

function is_prime(n) {
  return n === smallest_divisor(n);
}

function is_prime_sum(pair) {
  return is_prime(head(pair) + head(tail(pair)));
}

function make_pair_sum(pair) {
  return list(head(pair), head(tail(pair)), head(pair) + head(tail(pair)));
}

function unique_pairs(n) {
  return flatmap(i => map(j => list(i, j), enumerate_interval(1, i - 1)), enumerate_interval(1, n));
}

function prime_sum_pairs(n) {
  return map(make_pair_sum, filter(is_prime_sum, unique_pairs(n)));
}

prime_sum_pairs(6);
