module.exports = {
  collectCoverageFrom: ['src/**/*.{tsx,vue}'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^vuetify/lib$': 'vuetify',
  },
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  setupFilesAfterEnv: ['<rootDir>/tests/unit/setup.ts'],
  transform: {
    '\\.(gql|graphql)$': 'jest-transform-graphql',
    '^.+\\.tsx?$': require.resolve('ts-jest'),
  },
  transformIgnorePatterns: ['/node_modules/(?!vue-redux-hooks)'],
}
