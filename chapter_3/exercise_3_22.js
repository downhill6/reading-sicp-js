// 练习 3.22

const {pair, head, tail, is_null, is_pair, set_head, set_tail} = require('./pair.js');

function make_queue() {
  let front_ptr = null;
  let rear_ptr = null;

  function set_front_ptr(item) {
    front_ptr = item;
  }

  function set_rear_ptr(item) {
    rear_ptr = item;
  }

  function is_empty_queue() {
    return is_null(front_ptr);
  }

  function front_queue() {
    return is_empty_queue()
      ? console.error('FRONT called with an empty queue" dispatch')
      : head(front_ptr);
  }

  function insert_queue(item) {
    const new_pair = pair(item, null);
    if (is_empty_queue()) {
      set_front_ptr(new_pair);
      set_rear_ptr(new_pair);
    } else {
      set_tail(rear_ptr, new_pair);
      set_rear_ptr(new_pair);
    }
    return dispatch;
  }

  function delete_queue() {
    if (is_empty_queue()) {
      console.error('delete_queue called with an empty queue');
    } else {
      set_front_ptr(tail(front_ptr));
      return dispatch;
    }
  }

  function print_queue() {
    function iter(first) {
      if (is_null(first)) {
        return '';
      } else {
        return `${head(first)} ${iter(tail(first))}`;
      }
    }
    return iter(front_ptr);
  }

  function dispatch(m) {
    return m === 'front_queue'
      ? front_queue
      : m === 'insert_queue'
      ? insert_queue
      : m === 'delete_queue'
      ? delete_queue
      : m === 'is_empty_queue'
      ? is_empty_queue
      : m === 'print_queue'
      ? print_queue
      : console.error(m, 'undefined operation -- queue');
  }

  return dispatch;
}

function print_queue(queue) {
  return queue('print_queue')();
}
function insert_queue(queue, item) {
  queue('insert_queue')(item);
}
function delete_queue(queue) {
  queue('delete_queue')();
}

const q = make_queue();

insert_queue(q, 'a');
insert_queue(q, 'b');
insert_queue(q, 'c');
console.log(print_queue(q)); // a b c
delete_queue(q);
console.log(print_queue(q)); // b c
