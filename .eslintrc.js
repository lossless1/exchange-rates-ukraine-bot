module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: ['airbnb-base'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'arrow-parens': [0],
    'implicit-arrow-linebreak': [0],
    'function-paren-newline': [0],
    'import/no-dynamic-require': [0],
    'global-require': [0],
    'operator-linebreak': [0],
    'object-curly-newline': [0],
    'no-plusplus': [0],
  },
};
