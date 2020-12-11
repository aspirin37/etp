module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/recommended',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'guard-for-in': 'off',
    'import/no-cycle': 'off',
    'import/prefer-default-export': 'off',
    'max-len': 'off',
    'no-plusplus': 'off',
    'no-restricted-syntax': ['error', 'WithStatement'],
    'no-underscore-dangle': 'off',
    'vue/require-default-prop': 'off',
    'vue/valid-v-slot': 'off',
  },
};
