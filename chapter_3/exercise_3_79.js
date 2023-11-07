// exercise 3.79

const {pair, head, is_null} = require('./pair');
const {scale_stream, memo, add_streams, stream_ref, stream_map, stream_tail} = require('./streams');

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

function stream_map_3(f, s1, s2) {
  return is_null(s1) && is_null(s2)
    ? null
    : pair(f(head(s1), head(s2)), () => stream_map_3(f, stream_tail(s1), stream_tail(s2)));
}

function solve_2nd(f, y0, dy0, dt) {
  const y = integral(() => dy, y0, dt);
  const dy = integral(() => ddy, dy0, dt);
  const ddy = stream_map_3(f, dy, y);
  return y;
}

function f(dy, y) {
  return -(2 * dy + y);
}

// ddy + 2 * dy + y = 0
//  y(0) = 4, dy(0) = -2
console.log(stream_ref(solve_2nd(f, 4, -2, 0.001), 20));

// 上面式子的解析解
function solution(t) {
  return (4 + 2 * t) * Math.exp(-t);
}

const solution_stream = (t, dt) => pair(solution(t), () => solution_stream(t + dt, dt));

console.log(stream_ref(solution_stream(0, 0.001), 20));
