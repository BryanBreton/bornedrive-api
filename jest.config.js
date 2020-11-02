module.exports = {
  preset: 'ts-jest',
  verbose: true,
  rootDir: '.',
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/$1',
    '^TU/(.*)$': '<rootDir>/spec/unit/$1',
    '^TI/(.*)$': '<rootDir>/spec/e2e/$1'
  },
  moduleFileExtensions: [
    'js',
    'ts',
    'json'
  ],
  transform: {
    "^.+\\.(t|j)s$": "ts-jest"
  },
  collectCoverage: false, // please enable coverage in command line. When enabled, debug is not working and stacktrace line numbers are wrong
  coverageDirectory: '<rootDir>/coverage',
  collectCoverageFrom: [
    '<rootDir>/src/**/*'
  ],
  testMatch: [
    '<rootDir>/spec/unit/**/*.spec.(js|jsx|ts|tsx)',
    '<rootDir>/spec/e2e/**/*.e2e-spec.(js|jsx|ts|tsx)'
  ],
  reporters: [
    'default',
    ['./node_modules/jest-html-reporter', {
      'pageTitle': 'Test Report',
      'outputPath': './reports/test-results.html',
      'includeFailureMsg': true
    }]
  ],
  coverageReporters: [
    'text',
    'html',
    'cobertura'
  ]

}
