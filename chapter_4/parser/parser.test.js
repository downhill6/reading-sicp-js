const {display_list} = require('../stdlib/pair');
const {parse} = require('./parser');

display_list(parse('1;'));
display_list(parse("'hello world';"));
display_list(parse(`if (true) {'1+20';}`));
