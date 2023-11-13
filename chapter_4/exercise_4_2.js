const {parse} = require('./parser/parser');
const {display_list} = require('./stdlib');

display_list(parse('const x = 1;'));
