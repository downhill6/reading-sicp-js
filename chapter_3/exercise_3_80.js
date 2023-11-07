// exercise 3.80

const {pair, head, is_null} = require('./pair');
const {
  scale_stream,
  memo,
  add_streams,
  stream_tail,
  display_stream_infinite,
} = require('./streams');

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

function RLC(R, L, C, dt) {
  return (vc0, iL0) => {
    const vc = integral(() => scale_stream(iL, -1 / C), vc0, dt);
    const iL = integral(() => diL, iL0, dt);
    const diL = add_streams(scale_stream(vc, 1 / L), scale_stream(iL, -R / L));
    return stream_map_3(pair, vc, iL);
  };
}

const RLC1 = RLC(1, 1, 0.2, 0.1);
display_stream_infinite(RLC1(10, 0), 20);
