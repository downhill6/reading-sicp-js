// 练习 2.25

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

// ==========
const list1 = list(1, 3, list(5, 7), 9);
head(tail(head(tail(tail(list1)))));

const list2 = list(list(7));
head(head(list2));

const list3 = list(1, list(2, list(3, list(4, list(5, list(6, 7))))));
head(tail(head(tail(head(tail(head(tail(head(tail(head(tail(list3))))))))))));
