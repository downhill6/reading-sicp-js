// exercise 3.78

const {pair} = require('./pair');
const {scale_stream, memo, add_streams, stream_ref} = require('./streams');

function integral(delayed_integrand, initial_value, dt) {
  const integ = pair(
    initial_value,
    // note the use of the memoization optimization, otherwise the GC will explode
    memo(() => {
      const integrand = delayed_integrand();
      return add_streams(scale_stream(integrand, dt), integ);
    }),
  );
  return integ;
}

function solve_2d(a, b, y0, dy0, dt) {
  const y = integral(() => dy, y0, dt);
  const dy = integral(() => ddy, dy0, dt);
  const ddy = add_streams(scale_stream(dy, a), scale_stream(y, b));
  return y;
}
// ddy + 2 * dy + y = 0
//  y(0) = 4, dy(0) = -2
console.log(stream_ref(solve_2d(-2, -1, 4, -2, 0.001), 20));

// 上面式子的解析解
function solution(t) {
  return (4 + 2 * t) * Math.exp(-t);
}

const solution_stream = (t, dt) => pair(solution(t), () => solution_stream(t + dt, dt));

console.log(stream_ref(solution_stream(0, 0.001), 20));
