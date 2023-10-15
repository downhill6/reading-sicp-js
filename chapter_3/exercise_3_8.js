// 练习 3.8

function make_f(init) {
  return x => {
    init = x - init;
    return init;
  };
}

const f = make_f(1 / 2);

console.log(f(0) + f(1));
console.log(f(1) + f(0));
