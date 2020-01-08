module.exports = {
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', '@vue/prettier', '@vue/typescript'],
  overrides: [
    {
      env: {
        jest: true,
      },
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
    },
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  plugins: ['graphql'],
  root: true,
  rules: {
    'graphql/template-strings': [
      'error',
      {
        env: 'apollo',
        schemaJson: require('./schema.json'),
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        args: 'after-used',
        ignoreRestSiblings: true,
        vars: 'all',
        varsIgnorePattern: '^h$',
      },
    ],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
}
