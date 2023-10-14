// 练习 3.1

function make_accumulator(sum) {
  return x => {
    sum += x;
    return sum;
  };
}

const acc = make_accumulator(5);

console.log(acc(10));
console.log(acc(10));
