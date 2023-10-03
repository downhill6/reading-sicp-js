// 练习 2.69

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

function member(item, x) {
  return is_null(x) ? null : item === head(x) ? x : member(item, tail(x));
}

function length(items) {
  return is_null(items) ? 0 : 1 + length(tail(items));
}

function error(msg) {
  console.error(msg);
  return null;
}

function is_pair(x) {
  return Array.isArray(x) && x.length === 2;
}

function list(...args) {
  const [first, ...rest] = args;
  return args.length === 0 ? null : pair(first, list(...rest));
}

// =========

// Huffman trees
function make_leaf(symbol, weight) {
  return list('leaf', symbol, weight);
}

function is_leaf(object) {
  return head(object) === 'leaf';
}

function symbol_leaf(x) {
  return head(tail(x));
}

function weight_leaf(x) {
  return head(tail(tail(x)));
}

function make_code_tree(left, right) {
  return list(
    'code_tree',
    left,
    right,
    append(symbols(left), symbols(right)),
    weight(left) + weight(right),
  );
}

function left_branch(tree) {
  return head(tail(tree));
}

function right_branch(tree) {
  return head(tail(tail(tree)));
}

function symbols(tree) {
  return is_leaf(tree) ? list(symbol_leaf(tree)) : head(tail(tail(tail(tree))));
}

function weight(tree) {
  return is_leaf(tree) ? weight_leaf(tree) : head(tail(tail(tail(tail(tree)))));
}

function decode(bits, tree) {
  function decode_1(bits, current_branch) {
    if (is_null(bits)) {
      return null;
    } else {
      const next_branch = choose_branch(head(bits), current_branch);
      return is_leaf(next_branch)
        ? pair(symbol_leaf(next_branch), decode_1(tail(bits), tree))
        : decode_1(tail(bits), next_branch);
    }
  }
  return decode_1(bits, tree);
}

function choose_branch(bit, branch) {
  return bit === 0
    ? left_branch(branch)
    : bit === 1
    ? right_branch(branch)
    : error(bit, 'bad bit -- choose_branch');
}

function decode(bits, tree) {
  function decode_1(bits, current_branch) {
    if (is_null(bits)) {
      return null;
    } else {
      const next_branch = choose_branch(head(bits), current_branch);
      return is_leaf(next_branch)
        ? pair(symbol_leaf(next_branch), decode_1(tail(bits), tree))
        : decode_1(tail(bits), next_branch);
    }
  }
  return decode_1(bits, tree);
}

function choose_branch(bit, branch) {
  return bit === 0
    ? left_branch(branch)
    : bit === 1
    ? right_branch(branch)
    : error(bit, 'bad bit -- choose_branch');
}

// 递增列表
function adjoin_set(x, set) {
  return is_null(set)
    ? list(x)
    : weight(x) < weight(head(set))
    ? pair(x, set)
    : pair(head(set), adjoin_set(x, tail(set)));
}

function make_leaf_set(pairs) {
  if (is_null(pairs)) {
    return null;
  } else {
    const first_pair = head(pairs);
    return adjoin_set(
      make_leaf(
        head(first_pair), // symbol
        head(tail(first_pair)), // frequency
      ),
      make_leaf_set(tail(pairs)),
    );
  }
}

function encode(message, tree) {
  return is_null(message)
    ? null
    : append(encode_symbol(head(message), tree), encode(tail(message), tree));
}

function encode_symbol(symbol, tree) {
  function include(s, tree) {
    return !is_null(member(s, symbols(tree)));
  }

  if (is_leaf(tree)) {
    return null;
  } else {
    const left = left_branch(tree);
    const right = right_branch(tree);
    return include(symbol, left)
      ? pair(0, encode_symbol(symbol, left))
      : include(symbol, right)
      ? pair(1, encode_symbol(symbol, right))
      : error('symbol not found -- encode_symbol');
  }
}

// =========
function generate_huffman_tree(pairs) {
  return successive_merge(make_leaf_set(pairs));
}

function successive_merge(list) {
  return length(list) === 1
    ? head(list)
    : successive_merge(adjoin_set(make_code_tree(head(list), head(tail(list))), tail(tail(list))));
}

function display_list(list) {
  function rec(list) {
    return is_pair(list)
      ? '[' + rec(head(list)) + ', ' + rec(tail(list)) + ']'
      : is_null(list)
      ? 'null'
      : `${typeof list === 'string' ? '"' + list + '"' : list}`;
  }
  console.log(rec(list));
}

const sample_tree = make_code_tree(
  make_leaf('A', 4),
  make_code_tree(make_leaf('B', 2), make_code_tree(make_leaf('D', 1), make_leaf('C', 1))),
);

const sample_frequencies = list(list('A', 4), list('B', 2), list('C', 1), list('D', 1));

String(generate_huffman_tree(sample_frequencies)) === String(sample_tree); // true
