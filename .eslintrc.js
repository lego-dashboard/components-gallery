module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/recommended', '@vue/standard', '@vue/typescript'],
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'camelcase': 'off',
    'comma-dangle': ['error', 'always-multiline'],
  },
  plugins: ['json'],
  parserOptions: {
    parser: 'babel-eslint',
  },
}
