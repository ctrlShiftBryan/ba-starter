module.exports = {
  ignorePatterns: [
    '/build/*',
  ],
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    'comma-dangle': ['error', 'only-multiline'],
    'react/react-in-jsx-scope': [0],
    'react/jsx-filename-extension': [0],
    'import/no-unresolved': [0],
    'no-use-before-define': [0],
    'vars-on-top': [0],
    'react/function-component-definition': [0],
    'func-names': [0],
    'react/require-default-props': [0],
  },
};
