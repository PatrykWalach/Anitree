module.exports = {
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', '@vue/prettier', '@vue/typescript'],
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
