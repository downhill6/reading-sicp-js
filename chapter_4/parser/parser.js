const acorn = require('./acorn');
const {vector_to_list} = require('../stdlib/list');

const options = {
  ecmaVersion: 6,
  sourceType: 'module',
  locations: true,
  onInsertedSemicolon: function onInsertedSemicolon() {
    return 'error: Missing semicolon at the end of statement';
  },
  onTrailingComma: function onTrailingComma() {
    return 'error: Trailing comma';
  },
};

function unreachable() {
  console.error('error: unreachable');
}

class ParseError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ParseError';
  }
}

function makeSequenceIfNeeded(exs) {
  return exs.length === 1
    ? transform(exs[0])
    : vector_to_list(['sequence', vector_to_list(exs.map(transform))]);
}

function makeBlockIfNeeded(exs) {
  return hasDeclarationAtToplevel(exs)
    ? vector_to_list(['block', makeSequenceIfNeeded(exs)])
    : makeSequenceIfNeeded(exs);
}

function hasDeclarationAtToplevel(exs) {
  return exs.reduce(
    (b, ex) => b || ex.type === 'VariableDeclaration' || ex.type === 'FunctionDeclaration',
    false,
  );
}

const transformers = new Map([
  [
    'Program',
    node => {
      return makeSequenceIfNeeded(node.body);
    },
  ],

  [
    'BlockStatement',
    node => {
      return makeBlockIfNeeded(node.body);
    },
  ],

  [
    'ExpressionStatement',
    node => {
      return transform(node.expression);
    },
  ],

  [
    'IfStatement',
    node => {
      return vector_to_list([
        'conditional_statement',
        transform(node.test),
        transform(node.consequent),
        node.alternate === null ? makeSequenceIfNeeded([]) : transform(node.alternate),
      ]);
    },
  ],

  [
    'FunctionDeclaration',
    node => {
      return vector_to_list([
        'function_declaration',
        transform(node.id),
        vector_to_list(node.params.map(transform)),
        makeBlockIfNeeded(node.body.body),
      ]);
    },
  ],

  [
    'VariableDeclaration',
    node => {
      if (node.kind === 'let') {
        return vector_to_list([
          'variable_declaration',
          transform(node.declarations[0].id),
          transform(node.declarations[0].init),
        ]);
      } else if (node.kind === 'const') {
        return vector_to_list([
          'constant_declaration',
          transform(node.declarations[0].id),
          transform(node.declarations[0].init),
        ]);
      } else {
        unreachable();
        throw new ParseError('Invalid declaration kind');
      }
    },
  ],

  [
    'ReturnStatement',
    node => {
      return vector_to_list(['return_statement', transform(node.argument)]);
    },
  ],

  [
    'CallExpression',
    node => {
      return vector_to_list([
        'application',
        transform(node.callee),
        vector_to_list(node.arguments.map(transform)),
      ]);
    },
  ],

  [
    'UnaryExpression',
    node => {
      return vector_to_list([
        'unary_operator_combination',
        node.operator === '-' ? '-unary' : node.operator,
        transform(node.argument),
      ]);
    },
  ],

  [
    'BinaryExpression',
    node => {
      return vector_to_list([
        'binary_operator_combination',
        node.operator,
        transform(node.left),
        transform(node.right),
      ]);
    },
  ],

  [
    'LogicalExpression',
    node => {
      return vector_to_list([
        'logical_composition',
        node.operator,
        transform(node.left),
        transform(node.right),
      ]);
    },
  ],

  [
    'ConditionalExpression',
    node => {
      return vector_to_list([
        'conditional_expression',
        transform(node.test),
        transform(node.consequent),
        transform(node.alternate),
      ]);
    },
  ],

  [
    'ArrowFunctionExpression',
    node => {
      return vector_to_list([
        'lambda_expression',
        vector_to_list(node.params.map(transform)),
        node.body.type === 'BlockStatement'
          ? // body.body: strip away one layer of block:
            // The body of a function is the statement
            // inside the curly braces.
            makeBlockIfNeeded(node.body.body)
          : vector_to_list(['return_statement', transform(node.body)]),
      ]);
    },
  ],

  [
    'Identifier',
    node => {
      return vector_to_list(['name', node.name]);
    },
  ],

  [
    'Literal',
    node => {
      return vector_to_list(['literal', node.value]);
    },
  ],

  [
    'ArrayExpression',
    node => {
      return vector_to_list(['array_expression', vector_to_list(node.elements.map(transform))]);
    },
  ],

  [
    'AssignmentExpression',
    node => {
      if (node.left.type === 'Identifier') {
        return vector_to_list(['assignment', transform(node.left), transform(node.right)]);
      } else if (node.left.type === 'MemberExpression') {
        return vector_to_list(['object_assignment', transform(node.left), transform(node.right)]);
      } else {
        unreachable();
        throw new ParseError('Invalid assignment');
      }
    },
  ],

  [
    'ForStatement',
    node => {
      return vector_to_list([
        'for_loop',
        transform(node.init),
        transform(node.test),
        transform(node.update),
        transform(node.body),
      ]);
    },
  ],

  [
    'WhileStatement',
    node => {
      return vector_to_list(['while_loop', transform(node.test), transform(node.body)]);
    },
  ],

  [
    'BreakStatement',
    _node => {
      return vector_to_list(['break_statement']);
    },
  ],

  [
    'ContinueStatement',
    _node => {
      return vector_to_list(['continue_statement']);
    },
  ],

  [
    'ObjectExpression',
    node => {
      return vector_to_list(['object_expression', vector_to_list(node.properties.map(transform))]);
    },
  ],

  [
    'MemberExpression',
    node => {
      // "computed" property of MemberExpression distinguishes
      // between dot access (not computed) and
      // a[...] (computed)
      // the key in dot access is meant as string, and
      // represented by a "property" node in parse result
      return vector_to_list([
        'object_access',
        transform(node.object),
        !node.computed && node.property.type === 'Identifier'
          ? vector_to_list(['property', node.property.name])
          : transform(node.property),
      ]);
    },
  ],

  [
    'Property',
    node => {
      // identifiers before the ":" in literal objects are meant
      // as string, and represented by a "property" node in parse result
      return vector_to_list([
        'key_value_pair',
        node.key.type === 'Identifier'
          ? vector_to_list(['property', node.key.name])
          : transform(node.key),
        transform(node.value),
      ]);
    },
  ],

  [
    'ImportDeclaration',
    node => {
      return vector_to_list([
        'import_declaration',
        vector_to_list(node.specifiers.map(transform)),
        node.source.value,
      ]);
    },
  ],

  [
    'ImportSpecifier',
    node => {
      return vector_to_list(['name', node.imported.name]);
    },
  ],

  [
    'ImportDefaultSpecifier',
    _node => {
      return vector_to_list(['default']);
    },
  ],

  [
    'ExportNamedDeclaration',
    node => {
      return vector_to_list([
        'export_named_declaration',
        node.declaration ? transform(node.declaration) : node.specifiers.map(transform),
      ]);
    },
  ],

  [
    'ExportDefaultDeclaration',
    node => {
      return vector_to_list(['export_default_declaration', transform(node.declaration)]);
    },
  ],

  [
    'ExportSpecifier',
    node => {
      return vector_to_list(['name', node.exported.name]);
    },
  ],

  [
    'ClassDeclaration',
    node => {
      return vector_to_list([
        'class_declaration',
        vector_to_list([
          'name',
          node.id === null ? null : node.id.name,
          node.superClass === null || node.superClass === undefined
            ? null
            : transform(node.superClass),
          node.body.body.map(transform),
        ]),
      ]);
    },
  ],

  [
    'NewExpression',
    node => {
      return vector_to_list([
        'new_expression',
        transform(node.callee),
        vector_to_list(node.arguments.map(transform)),
      ]);
    },
  ],

  [
    'MethodDefinition',
    node => {
      return vector_to_list([
        'method_definition',
        node.kind,
        node.static,
        transform(node.key),
        transform(node.value),
      ]);
    },
  ],

  [
    'FunctionExpression',
    node => {
      return vector_to_list([
        'lambda_expression',
        vector_to_list(node.params.map(transform)),
        makeBlockIfNeeded(node.body.body),
      ]);
    },
  ],

  [
    'ThisExpression',
    _node => {
      return vector_to_list(['this_expression']);
    },
  ],

  [
    'Super',
    _node => {
      return vector_to_list(['super_expression']);
    },
  ],

  [
    'TryStatement',
    node => {
      return vector_to_list([
        'try_statement',
        transform(node.block),
        node.handler === null || node.handler === undefined
          ? null
          : vector_to_list(['name', node.handler.param.name]),
        node.handler === null || node.handler === undefined ? null : transform(node.handler.body),
      ]);
    },
  ],
  [
    'ThrowStatement',
    node => {
      return vector_to_list(['throw_statement', transform(node.argument)]);
    },
  ],
  [
    'SpreadElement',
    node => {
      return vector_to_list(['spread_element', transform(node.argument)]);
    },
  ],
  [
    'RestElement',
    node => {
      return vector_to_list(['rest_element', transform(node.argument)]);
    },
  ],
]);

function transform(node) {
  if (transformers.has(node.type)) {
    const transformer = transformers.get(node.type);
    const transformed = transformer(node);
    // Attach location information
    if (
      transformed !== null &&
      transformed !== undefined &&
      typeof transformed === 'object' &&
      transformed.tag !== undefined
    ) {
      transformed.loc = node.loc;
    }
    return transformed;
  } else {
    unreachable();
    throw new ParseError('Cannot transform unknown type: ' + node.type);
  }
}

function parse(programStr) {
  try {
    const sourceAst = acorn.parse(programStr, options);
    return transform(sourceAst);
  } catch (error) {
    console.error(error.toString());
    return null;
  }
}

module.exports = {
  parse,
};
