// 练习 2.29

function pair(x, y) {
  return [x, y];
}

function head(pair) {
  return pair[0];
}

function tail(pair) {
  return pair[1];
}

function list(...args) {
  const [first, ...rest] = args;
  return args.length === 0 ? null : pair(first, list(...rest));
}

function list_ref(items, n) {
  return n === 0 ? head(items) : list_ref(tail(items), n - 1);
}

function is_null(val) {
  return val === null;
}

function is_pair(x) {
  return Array.isArray(x) && x.length === 2;
}

// ==========

function make_mobile(left, right) {
  return list(left, right);
}

function make_branch(length, structure) {
  return list(length, structure);
}

function left_branch(mobile) {
  return list_ref(mobile, 0);
}

function right_branch(mobile) {
  return list_ref(mobile, 1);
}

function branch_length(branch) {
  return list_ref(branch, 0);
}

function branch_structure(branch) {
  return list_ref(branch, 1);
}

function is_weight(x) {
  return typeof x === 'number';
}

function total_weight(mobile) {
  return is_weight(mobile)
    ? mobile
    : total_weight(branch_structure(left_branch(mobile))) +
        total_weight(branch_structure(right_branch(mobile)));
}

function is_balanced(mobile) {
  return (
    is_weight(mobile) ||
    (is_balanced(branch_structure(left_branch(mobile))) &&
      is_balanced(branch_structure(right_branch(mobile))) &&
      total_weight(branch_structure(left_branch(mobile))) * branch_length(left_branch(mobile)) ===
        total_weight(branch_structure(right_branch(mobile))) * branch_length(right_branch(mobile)))
  );
}

// 4.
// function left_branch(m) {
//   return head(m);
// }
// function right_branch(m) {
//   return tail(m);
// }
// function branch_length(b) {
//   return head(b);
// }
// function branch_structure(b) {
//   return tail(b);
// }
