// exercise 3.76

const {pair, head, is_null, tail, list} = require('./pair');
const {display_stream_infinite, stream_map_2} = require('./streams');

function sign_change_detector(input_value, last_value) {
  return input_value < 0 && last_value > 0 ? -1 : input_value > 0 && last_value < 0 ? 1 : 0;
}

function list_to_stream(list) {
  return is_null(list) ? null : pair(head(list), () => list_to_stream(tail(list)));
}

function average(x, y) {
  return (x + y) * 0.5;
}

function smooth(s, last_value) {
  return stream_map_2(
    average,
    s,
    pair(last_value, () => s),
  );
}

function make_zero_crossings(input_stream, last_value) {
  const average_stream = smooth(input_stream, last_value);
  return stream_map_2(
    sign_change_detector,
    average_stream,
    pair(last_value, () => average_stream),
  );
}

const sense_data = list_to_stream(list(1, 2, 1.5, 1, 0.5, -0.1, -2, -3, -2, -0.5, 0.2, 3));

const zero_crossings = make_zero_crossings(sense_data, 0);
display_stream_infinite(zero_crossings, 11);
