// exercise 3.77

const {pair, is_null, head} = require('./pair');
const {scale_stream, stream_ref, stream_map, memo, add_streams, stream_tail} = require('./streams');

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

function solve(f, y0, dt) {
  const y = integral(() => dy, y0, dt);
  const dy = stream_map(f, y);
  return y;
}

console.log(
  stream_ref(
    solve(y => y, 1, 0.001),
    1000,
  ),
);

// 1.
function integral1(delayed_integrand, initial_value, dt) {
  return pair(
    initial_value,
    memo(() => {
      const integrand = delayed_integrand();
      return is_null(integrand)
        ? null
        : integral1(() => stream_tail(integrand), dt * head(integrand) + initial_value, dt);
    }),
  );
}

function solve1(f, y0, dt) {
  const y = integral1(() => dy, y0, dt);
  const dy = stream_map(f, y);
  return y;
}

console.log(
  stream_ref(
    solve1(y => y, 1, 0.001),
    1000,
  ),
);
