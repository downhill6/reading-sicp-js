// exercise 3.75

const {pair, head, is_null, tail, list} = require('./pair');
const {stream_tail, display_stream_infinite, stream_map_2} = require('./streams');

function sign_change_detector(input_value, last_value) {
  return input_value < 0 && last_value > 0 ? -1 : input_value > 0 && last_value < 0 ? 1 : 0;
}

function list_to_stream(list) {
  return is_null(list) ? null : pair(head(list), () => list_to_stream(tail(list)));
}

function make_zero_crossings(input_stream, last_value, last_avpt) {
  const avpt = (head(input_stream) + last_value) / 2;
  return pair(sign_change_detector(avpt, last_avpt), () =>
    make_zero_crossings(stream_tail(input_stream), head(input_stream), avpt),
  );
}

const sense_data = list_to_stream(list(1, 2, 1.5, 1, 0.5, -0.1, -2, -3, -2, -0.5, 0.2, 3));

const zero_crossings = make_zero_crossings(sense_data, 0);
display_stream_infinite(zero_crossings, 11);
