function is_number(v) {
  return typeof v === 'number';
}

function is_undefined(xs) {
  return typeof xs === 'undefined';
}

function is_string(xs) {
  return typeof xs === 'string';
}

function is_boolean(xs) {
  return typeof xs === 'boolean';
}

function is_object(xs) {
  return typeof xs === 'object' || is_function(xs);
}

function is_function(xs) {
  return typeof xs === 'function';
}

function is_NaN(x) {
  return is_number(x) && isNaN(x);
}

function has_own_property(obj, p) {
  return obj.hasOwnProperty(p);
}

function is_array(a) {
  return a instanceof Array;
}

function array_length(xs) {
  return xs.length;
}

const stringify = String;

module.exports = {
  is_NaN,
  is_array,
  is_boolean,
  is_string,
  is_undefined,
  is_object,
  has_own_property,
  array_length,
  stringify,
};
