// 练习 3.24
const {
  pair,
  head,
  tail,
  is_null,
  is_undefined,
  equal,
  set_tail,
  is_number,
  list,
} = require('./pair.js');

function make_table() {
  const local_table = list('*table*');

  function same_key(key_1, key_2) {
    if (is_number(key_1) && is_number(key_2)) {
      return Math.abs(key_1 - key_2) < 0.5;
    } else {
      return equal(key_1, key_2);
    }
  }

  function assoc(key, records) {
    return is_null(records)
      ? undefined
      : same_key(key, head(head(records)))
      ? head(records)
      : assoc(key, tail(records));
  }

  function lookup(key_1, key_2) {
    const subtable = assoc(key_1, tail(local_table));
    if (is_undefined(subtable)) {
      return undefined;
    } else {
      const record = assoc(key_2, tail(subtable));
      return is_undefined(record) ? undefined : tail(record);
    }
  }
  function insert(key_1, key_2, value) {
    const subtable = assoc(key_1, tail(local_table));
    if (is_undefined(subtable)) {
      set_tail(local_table, pair(list(key_1, pair(key_2, value)), tail(local_table)));
    } else {
      const record = assoc(key_2, tail(subtable));
      if (is_undefined(record)) {
        set_tail(subtable, pair(pair(key_2, value), tail(subtable)));
      } else {
        set_tail(record, value);
      }
    }
  }
  function dispatch(m) {
    return m === 'lookup'
      ? lookup
      : m === 'insert'
      ? insert
      : error(m, 'unknown operation -- table');
  }
  return dispatch;
}

const table = make_table();
table('insert')(1, 2, 'hello');
table('insert')(2, 3, 'world');
console.log(table('lookup')(1, 2)); // hello
console.log(table('lookup')(2, 3.3)); // world
