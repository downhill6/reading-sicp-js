// 练习 2.64

function pair(x, y) {
  return [x, y];
}

function head(pair) {
  return is_null(pair) ? null : pair[0];
}

function tail(pair) {
  return is_null(pair) ? null : pair[1];
}

function append(list1, list2) {
  return is_null(list1) ? list2 : pair(head(list1), append(tail(list1), list2));
}

function is_null(val) {
  return val === null;
}

function is_pair(x) {
  return Array.isArray(x) && x.length === 2;
}

function list(...args) {
  const [first, ...rest] = args;
  return args.length === 0 ? null : pair(first, list(...rest));
}

function entry(tree) {
  return head(tree);
}

function left_branch(tree) {
  return head(tail(tree));
}

function right_branch(tree) {
  return head(tail(tail(tree)));
}

function make_tree(entry, left, right) {
  return list(entry, left, right);
}

function is_element_of_set(x, set) {
  return is_null(set)
    ? false
    : x === entry(set)
    ? true
    : x < entry(set)
    ? is_element_of_set(x, left_branch(set))
    : is_element_of_set(x, right_branch(set));
}

function adjoin_set(x, set) {
  return is_null(set)
    ? make_tree(x, null, null)
    : x === entry(set)
    ? set
    : x < entry(set)
    ? make_tree(entry(set), adjoin_set(x, left_branch(set)), right_branch(set))
    : make_tree(entry(set), left_branch(set), adjoin_set(x, right_branch(set)));
}

function tree_to_list(tree) {
  function copy_to_list(tree, result_list) {
    return is_null(tree)
      ? result_list
      : copy_to_list(
          left_branch(tree),
          pair(entry(tree), copy_to_list(right_branch(tree), result_list)),
        );
  }
  return copy_to_list(tree, null);
}

// =========

function list_to_tree(elements) {
  return head(partial_tree(elements, length(elements)));
}
function partial_tree(elts, n) {
  if (n === 0) {
    return pair(null, elts);
  } else {
    const left_size = math_floor((n - 1) / 2);
    const left_result = partial_tree(elts, left_size);
    const left_tree = head(left_result);
    const non_left_elts = tail(left_result);
    const right_size = n - (left_size + 1);
    const this_entry = head(non_left_elts);
    const right_result = partial_tree(tail(non_left_elts), right_size);
    const right_tree = head(right_result);
    const remaining_elts = tail(right_result);
    return pair(make_tree(this_entry, left_tree, right_tree), remaining_elts);
  }
}

// a.
// partial-tree 的输入是个排序的列表。
// 其实现中，将数据分为左右两边，取出中间数值。
// 递归调用 partial-tree，将左边数据变为平衡二叉树，再
// 将右边数据变成平衡二叉树，之后使用中间数值创建出新的树节点。
// 输入是排序的列表，中间数值必然会比左边数据大，而比右边数据小。
// 而划分时，让左右数据尽量相等（至多相差 1），于是整个递归过程，就产生出平衡二叉树。

// b.
// 假设列表长度为 N。
// list-tree 调用 partial-tree，每次将节点数分为左右两半，
// 而每次都需要递归调用 partial-tree，分别处理左右两半。
// 因而算法的复杂度为 O(N)。实际上每个列表元素都调用了一次 make-tree。
