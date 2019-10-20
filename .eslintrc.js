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
  root: true,
  rules: {
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
    'sort-imports': [
      'warn',
      {
        ignoreCase: false,
        ignoreDeclarationSort: false,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
      },
    ],
    'sort-keys': 'warn',
  },
}
