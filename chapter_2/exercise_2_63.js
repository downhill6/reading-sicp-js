// 练习 2.63

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

// =========

function tree_to_list_1(tree) {
  return is_null(tree)
    ? null
    : append(
        tree_to_list_1(left_branch(tree)),
        pair(entry(tree), tree_to_list_1(right_branch(tree))),
      );
}

function tree_to_list_2(tree) {
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

let tree = make_tree(1, null, null);
tree = adjoin_set(2, tree);
tree = adjoin_set(3, tree);
tree = adjoin_set(4, tree);
tree = adjoin_set(5, tree);
tree = adjoin_set(6, tree);
tree = adjoin_set(7, tree);

// a.
tree_to_list_1(tree); // list(1,2,3,4,5,6,7)
tree_to_list_2(tree); // list(1,2,3,4,5,6,7)
// 两个函数产生相同的结果，f1 和 f2 都是将 tree 节点按从大到小排列
// 对图 2.16 的树都返回同样的结果 list{1,3,5,7,9,11}

// b.

// tree_to_list_1 每次递归访问一个层级， 复杂度为 O(log n), 加上 append 的复杂度，总共为 O(nlogn)
// tree_to_list_2 访问每个节点，复杂度是 O(n)

// tree_to_list_2 增长的更慢
