// exercise 3.81

const {is_null, is_pair, list, head, tail, pair, error} = require('./pair');
const {stream_map, stream_tail, display_stream} = require('./streams');

function rand_update(x) {
  const a = 16807;
  const m = 214612347;
  const b = 12345;
  return (a * x + b) % m;
}

function make_rand(cmds) {
  function rand_stream(v, cmds) {
    if (is_null(cmds)) {
      return null;
    } else {
      const m = head(cmds);
      if (m === 'generate') {
        return pair(v, () => rand_stream(rand_update(v), stream_tail(cmds)));
      } else if (is_pair(m) && head(m) === 'reset') {
        return pair(tail(m), () => rand_stream(rand_update(tail(m)), stream_tail(cmds)));
      } else {
        return error('Unknown command -- RAND-GENERATOR', m);
      }
    }
  }
  return rand_stream(123, cmds);
}

function list_to_stream(list) {
  return is_null(list) ? null : pair(head(list), () => list_to_stream(tail(list)));
}

const input_stream = list_to_stream(
  list(
    'generate',
    'generate',
    'generate',
    'generate',
    pair('reset', 10),
    'generate',
    'generate',
    'generate',
  ),
);
const output = make_rand(input_stream);

display_stream(output);
