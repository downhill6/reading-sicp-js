// 练习 2.74

function pair(x, y) {
  return [x, y];
}

function head(pair) {
  return is_null(pair) ? null : pair[0];
}

function tail(pair) {
  return is_null(pair) ? null : pair[1];
}

function append(list1, list2) {
  return is_null(list1) ? list2 : pair(head(list1), append(tail(list1), list2));
}

function is_null(val) {
  return val === null;
}

function is_pair(x) {
  return Array.isArray(x) && x.length === 2;
}

function list(...args) {
  const [first, ...rest] = args;
  return args.length === 0 ? null : pair(first, list(...rest));
}

function is_undefined(v) {
  return v === undefined;
}

// =========

function op_table() {
  const map = new Map();
  map.set('put', function put(name, op, content) {
    if (map.get(name)) {
      map.get(name).set(op, content);
    } else {
      map.set(name, new Map());
      map.get(name).set(op, content);
    }
  });
  map.set('get', function get(name, op) {
    return map.get(name).get(op);
  });
  return map;
}

const op_map = op_table();
const put = op_map.get('put');
const get = op_map.get('get');

function attach_tag(type_tag, contents) {
  return pair(type_tag, contents);
}

// 1.

// 分支机构的人事文件
function make_insatiable_file(division, file) {
  return pair(division, file);
}

function insatiable_file_division(insatiable_file) {
  return head(insatiable_file);
}

function insatiable_file_content(insatiable_file) {
  return tail(insatiable_file);
}

function install_get_record() {
  put('get_record', 'division_a', function (employee_name, record) {
    return record[employee_name];
  });
  put('get_record', 'division_b', function (employee_name, record) {
    return record[employee_name];
  });
}
install_get_record();

function get_record(employee_name, insatiable_file) {
  const the_division = insatiable_file_division(insatiable_file);
  const division_record = get('get_record', the_division)(
    employee_name,
    insatiable_file_content(insatiable_file),
  );

  return !is_undefined(division_record) ? attach_tag(the_division, division_record) : undefined;
}

// get_record('whh', pair('division_a', {whh: {salary: 20}, msd: {salary: 20}}));

// 2.

function install_get_salary() {
  put('get_salary', 'division_a', function (employee_name, record) {
    return record[employee_name]['salary'];
  });
}
install_get_salary();

function get_salary(employee_name, insatiable_file) {
  const the_division = insatiable_file_division(insatiable_file);
  const division_record = get('get_salary', the_division)(
    employee_name,
    insatiable_file_content(insatiable_file),
  );
  return !is_undefined(division_record) ? attach_tag(the_division, division_record) : undefined;
}

// get_salary('whh', pair('division_a', {whh: {salary: 20}, msd: {salary: 20}}));

// 3.

function find_employee_record(employee_name, personnel_files) {
  if (is_null(personnel_files)) {
    return undefined;
  } else {
    const insatiable_record = get_record(employee_name, head(personnel_files));
    return !is_undefined(insatiable_record)
      ? insatiable_record
      : find_employee_record(employee_name, tail(personnel_files));
  }
}

// find_employee_record(
//   'msd1',
//   list(
//     pair('division_a', {whh: {salary: 20}, msd: {salary: 20}}),
//     pair('division_b', {whh1: {salary: 20}, msd1: {salary: 20}}),
//   ),
// );

// 4.
// 需要将新公司安装到 get_record 和 get_salary 中
