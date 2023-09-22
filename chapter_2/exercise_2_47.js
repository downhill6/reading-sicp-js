// 练习 2.47

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

function make_frame(origin, edge1, edge2) {
  return list(origin, edge1, edge2);
}

function origin_frame(frame) {
  return list_ref(frame, 0);
}

function edge1_frame(frame) {
  return list_ref(frame, 1);
}

function edge2_frame(frame) {
  return list_ref(frame, 2);
}

//

function make_frame(origin, edge1, edge2) {
  return pair(origin, pair(edge1, edge2));
}

function origin_frame(frame) {
  return head(0);
}

function edge1_frame(frame) {
  return head(tail(frame));
}

function edge2_frame(frame) {
  return tail(tail(frame));
}
