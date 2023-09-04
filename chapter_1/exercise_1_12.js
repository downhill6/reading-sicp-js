// 练习 1.12

function pascal(row, col) {
  return row < col
    ? false
    : col === 1 || row === col
    ? 1
    : pascal(row - 1, col - 1) + pascal(row - 1, col);
}

console.log(pascal(5, 4));
