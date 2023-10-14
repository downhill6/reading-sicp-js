// 练习 3.6

function make_rand(init) {
  let value = init;

  function rand_update() {
    const a = 16807;
    const m = 214612347;
    const c = 12345;
    value = (a * value + c) % m;
    return value;
  }

  function reset(new_value) {
    value = new_value;
    return true;
  }

  function dispatch(m, new_value) {
    return m === 'generate'
      ? rand_update()
      : m === 'reset'
      ? reset
      : 'unknown request -- MAKE-RAND';
  }

  return dispatch;
}

const rand = make_rand(1);
console.log(rand('generate'));
console.log(rand('generate'));
console.log(rand('generate'));
console.log(rand('generate'));
console.log(rand('reset')(1));
console.log(rand('generate'));
console.log(rand('generate'));
console.log(rand('generate'));
console.log(rand('generate'));
