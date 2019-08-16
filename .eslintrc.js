module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/prettier',
    '@vue/typescript',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // "no-unused-vars": ["error", { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }]
    // 'vue/valid-v-on': 0,
    '@typescript-eslint/no-unused-vars': 2,
    // '@typescript-eslint/explicit-function-return-type': 0,
    // '@typescript-eslint/no-explicit-any': 0
  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  }
}
