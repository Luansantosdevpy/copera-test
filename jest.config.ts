/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coveragePathIgnorePatterns: [
      'node_modules/',
      'tests/',
      'src/infrastructure/log',
    ],
    coverageProvider: 'v8',
    coverageReporters: ['json', 'html'],
    preset: 'ts-jest',
    roots: ['<rootDir>/src/', '<rootDir>/tests/'],
    setupFiles: ['./tests/jest.setup.ts'],
    setupFilesAfterEnv: ['./tests/jest.setup.ts'],
    testMatch: ['**/tests/unit/**/*.test.ts']
  };