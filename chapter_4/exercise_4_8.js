// exercise 4.8

// 1. 确认下面的表达式的值
// 1; 2; 3; 结果是 3
// 1; { if (true) {} else { 2; } } 结果是 undefined
// 1; const x = 2; 结果是 undefined
// 1; { let x = 2; { x = x + 3; } } 结果是 5

// 2. evaluator 的修改查看 meta_evaluator.js
