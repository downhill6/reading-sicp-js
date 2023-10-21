// 练习 3.25
const {pair, head, tail, is_null, is_undefined, equal, set_tail, list} = require('./pair.js');

function assoc(key, records) {
  return is_null(records)
    ? undefined
    : equal(key, head(head(records)))
    ? head(records)
    : assoc(key, tail(records));
}

function lookup(key, table) {
  const record = assoc(key, tail(table));
  return is_undefined(record) ? undefined : tail(record);
}

function insert(key, value, table) {
  const record = assoc(key, tail(table));
  if (is_undefined(record)) {
    set_tail(table, pair(pair(key, value), tail(table)));
  } else {
    set_tail(record, value);
  }
  return 'ok';
}

function make_table() {
  return list('*table*');
}

const table = make_table();
insert(list(1, 2, 3), 'hello', table);
insert(list(2, 3), 'world', table);

console.log(lookup(list(1, 2, 3), table)); // hello
console.log(lookup(list(2, 3), table)); // world
