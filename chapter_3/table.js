const {pair, head, tail, is_null, is_undefined, equal, set_tail} = require('./pair.js');

function assoc(key, records) {
  return is_null(records)
    ? undefined
    : equal(key, head(head(records)))
    ? head(records)
    : assoc(key, tail(records));
}

// 一维表
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

// 二维表
function lookup2(key_1, key_2, table) {
  const subtable = assoc(key_1, tail(table));
  if (is_undefined(subtable)) {
    return undefined;
  } else {
    const record = assoc(key_2, tail(subtable));
    return is_undefined(record) ? undefined : tail(record);
  }
}

function insert2(key_1, key_2, value, table) {
  const subtable = assoc(key_1, tail(table));
  if (is_undefined(subtable)) {
    set_tail(table, pair(list(key_1, pair(key_2, value)), tail(table)));
  } else {
    const record = assoc(key_2, tail(table));
    if (is_undefined(record)) {
      set_tail(subtable, pair(pair(key_2, value), tail(subtable)));
    } else {
      set_tail(record, value);
    }
  }
  return 'ok';
}

// 一般化
function make_table2() {
  const local_table = list('*table*');
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

const operation_table = make_table2();
const get = operation_table('lookup');
const put = operation_table('insert');
