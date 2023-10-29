// 练习 3.46

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

// 当两个线程同时执行了 test_and_set(cell), 并且 head(cell) false
// 会导致两个线程都能正常执行导致互斥锁失效
// 时序图参考 https://github.com/hjcapple/reading-sicp/blob/master/chapter_3/exercise_3_46.md
