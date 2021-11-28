module.exports = {
  ignorePatterns: [
    '/build/*',
    '/public/*',
  ],
  env: {
    browser: true,
    es2021: true,
    node: true,
    'jest/globals': true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:tailwindcss/recommended',
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
    'jest',
    'tailwindcss'
  ],
  rules: {
    'import/extensions': [0],
    'comma-dangle': ['error', 'only-multiline'],
    'react/react-in-jsx-scope': [0],
    'react/jsx-filename-extension': [0],
    'import/no-unresolved': [0],
    'no-use-before-define': [0],
    'vars-on-top': [0],
    'react/function-component-definition': [0],
    'func-names': [0],
    'react/require-default-props': [0],
    'react/no-unescaped-entities': [0],
    'no-fallthrough': [0],
  },

  overrides: [
    {
      files: ['cypress/**/*.ts'],
      rules: {
        'no-undef': [0]
      }
    }
  ]
};
