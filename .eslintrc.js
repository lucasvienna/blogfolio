module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },

  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 13,
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'simple-import-sort'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react/recommended',
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'prettier',
  ],
  rules: {
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-console': ['error', { allow: ['debug', 'warn', 'error'] }],
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'off',
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'function-declaration',
        unnamedComponents: 'arrow-function',
      },
    ],
    'no-use-before-define': 'off', // note you must disable the base rule as it can report incorrect errors
    '@typescript-eslint/no-use-before-define': ['error', { functions: false }],
    'sort-imports': 'off',
    'import/order': 'off',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
};
