// exercise 3.73

const {pair} = require('./pair');
const {add_streams, scale_stream, display_stream_infinite} = require('./streams');

function integral(integrand, initial_value, dt) {
  const integ = pair(initial_value, () => add_streams(scale_stream(integrand, dt), integ));
  return integ;
}

function RC(R, C, dt) {
  return (i, v0) => {
    return add_streams(scale_stream(i, R), integral(scale_stream(i, 1 / C), v0, dt));
  };
}

const RC1 = RC(5, 1, 0.5);
console.log(RC1);

const ones = pair(1, () => ones);

display_stream_infinite(RC1(ones, 0.1), 10);
