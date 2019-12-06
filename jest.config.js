module.exports = {
  // collectCoverageFrom: ['src/**/*.{ts,tsx,vue}'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^vuetify/lib$': 'vuetify',
  },
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  setupFilesAfterEnv: ['<rootDir>/tests/unit/setup.ts'],
  // transformIgnorePatterns: ['node_modules/(?!(vuetify|vuex-composition-api)/)'],
}
