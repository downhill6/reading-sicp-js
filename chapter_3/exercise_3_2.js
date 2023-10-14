// 练习 3.2

function make_monitored(fn) {
  let count = 0;
  return x => {
    if (x === 'how many calls') {
      return count;
    } else if (x === 'reset count') {
      count = 0;
      return count;
    } else {
      count += 1;
      return fn(x);
    }
  };
}

const s = make_monitored(Math.sqrt);

console.log(s(100));
console.log(s(16));
console.log(s('how many calls'));
console.log(s('reset count'));
