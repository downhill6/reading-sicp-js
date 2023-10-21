// 练习 3.23

const {pair, head, tail, is_null, is_pair, set_head, set_tail} = require('./pair.js');

function make_deque() {
  return pair(null, null);
}

function front_ptr(queue) {
  return head(queue);
}

function rear_ptr(queue) {
  return tail(queue);
}

function set_front_ptr(queue, item) {
  set_head(queue, item);
}

function set_rear_ptr(queue, item) {
  set_tail(queue, item);
}

function is_empty_queue(queue) {
  return is_null(front_ptr(queue));
}

function make_queue_node(item, prev, next) {
  return pair(item, pair(prev, next));
}

function node_item(node) {
  return head(node);
}

function node_next(node) {
  return tail(tail(node));
}

function node_prev(node) {
  return head(tail(node));
}

function set_queue_node_prev(node, prev) {
  set_head(tail(node), prev);
}

function set_queue_node_next(node, next) {
  set_tail(tail(node), next);
}

function front_deque(queue) {
  return is_empty_queue(queue)
    ? console.error(queue, 'FRONT called with an empty queue')
    : node_item(front_ptr(queue));
}

function rear_deque(queue) {
  return is_empty_queue(queue)
    ? console.error(queue, 'FRONT called with an empty queue')
    : node_item(rear_ptr(queue));
}

function front_insert_deque(queue, item) {
  const new_node = make_queue_node(item, null, null);

  if (is_empty_queue(queue)) {
    set_front_ptr(queue, new_node);
    set_rear_ptr(queue, new_node);
  } else {
    set_queue_node_next(new_node, front_ptr(queue));
    set_queue_node_prev(front_ptr(queue), new_node);
    set_front_ptr(queue, new_node);
  }
}

function front_delete_deque(queue) {
  if (is_empty_queue(queue)) {
    console.error(queue, 'DELETE called with an empty queue');
  } else {
    set_front_ptr(queue, node_next(front_ptr(queue)));
    set_queue_node_prev(front_ptr(queue), null);
  }
}

function rear_insert_deque(queue, item) {
  const new_node = make_queue_node(item, null, null);

  if (is_empty_queue(queue)) {
    set_front_ptr(queue, new_node);
    set_rear_ptr(queue, new_node);
  } else {
    set_queue_node_next(rear_ptr(queue), new_node);
    set_queue_node_prev(new_node, rear_ptr(queue));
    set_rear_ptr(queue, new_node);
  }
}

function rear_delete_deque(queue) {
  if (is_empty_queue(queue)) {
    console.error(queue, 'DELETE called with an empty queue');
  } else {
    set_rear_ptr(queue, node_prev(rear_ptr(queue)));
    set_queue_node_next(rear_ptr(queue), null);
  }
}

function print_queue(queue) {
  function iter(first) {
    if (is_null(first)) {
      return '';
    } else {
      return `${node_item(first)} ${iter(node_next(first))}`;
    }
  }
  return iter(front_ptr(queue));
}

const q = make_deque();
front_insert_deque(q, 'b');
front_insert_deque(q, 'a');
rear_insert_deque(q, 'c');
rear_insert_deque(q, 'd');
console.log(print_queue(q)); // a b c d

front_delete_deque(q);
console.log(print_queue(q)); // b c d

rear_delete_deque(q);
console.log(print_queue(q)); // b c
