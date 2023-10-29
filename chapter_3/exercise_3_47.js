// 练习 3.47
const {head, list, set_head, error} = require('./pair.js');

function make_serializer() {
  const mutex = make_mutex();
  return f => {
    function serialized_f(...args) {
      mutex('acquire');
      const val = f(...args);
      mutex('release');
      return val;
    }
    return serialized_f;
  };
}

function make_mutex() {
  const cell = list(false);
  function the_mutex(m) {
    return m === 'acquire'
      ? test_and_set(cell)
        ? the_mutex('acquire') // retry
        : true
      : m === 'release'
      ? clear(cell)
      : error(m, 'unknown request -- mutex');
  }
  return the_mutex;
}

function clear(cell) {
  set_head(cell, false);
}

function test_and_set(cell) {
  if (head(cell)) {
    return true;
  } else {
    set_head(cell, true);
    return false;
  }
}

// 1. 基于 mutexes
function make_semaphore(n) {
  const cell = list(false);
  function the_mutex(m) {
    return m === 'acquire'
      ? test_and_set(cell)
        ? the_mutex('acquire')
        : true
      : m === 'release'
      ? clear(cell)
      : error(m, 'unknown request -- mutex');
  }

  let local_n = 0;
  function count(f) {
    function loop(...args) {
      if (local_n >= n) {
        return loop(f);
      }

      local_n += 1;
      const res = f(...args);
      local_n -= 1;
      return res;
    }
    return loop;
  }

  return count(the_mutex);
}

// 2. 基于 test_and_set
function make_semaphore2(n) {
  const cell = list(false);
  let local_n = 0;
  function count(f) {
    function loop(...args) {
      if (local_n >= n) {
        return loop(f);
      }

      local_n += 1;
      const res = f(...args);
      local_n -= 1;
      return res;
    }
    return loop;
  }
  const test_and_set_count = count(test_and_set);
  function the_mutex(m) {
    return m === 'acquire'
      ? test_and_set_count(cell)
        ? the_mutex('acquire')
        : true
      : m === 'release'
      ? clear(cell)
      : error(m, 'unknown request -- mutex');
  }

  return count(the_mutex);
}
