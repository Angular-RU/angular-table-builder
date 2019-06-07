const { pathsToModuleNameMapper: resolver } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig');
const moduleNameMapper = resolver(compilerOptions.paths, { prefix: '<rootDir>/' });
const path = require('path');

module.exports = {
    verbose: null,
    watch: false,
    cache: true,
    moduleNameMapper,
    maxConcurrency: 10,
    rootDir: path.resolve('.'),
    preset: 'jest-preset-angular',
    cacheDirectory: '<rootDir>/cache',
    testMatch: ['<rootDir>/projects/table-builder/**/*.spec.ts'],
    collectCoverageFrom: ['<rootDir>/projects/table-builder/src/lib/**/*.ts'],
    setupFilesAfterEnv: ['<rootDir>/setupJest.ts'],
    coverageReporters: ['json', 'lcovonly', 'lcov', 'text', 'html'],
    coveragePathIgnorePatterns: ['/node_modules/'],
    modulePathIgnorePatterns: ['<rootDir>/dist/'],
    collectCoverage: true,
    globals: {
        __TRANSFORM_HTML__: true,
        'ts-jest': {
            tsConfig: '<rootDir>/tsconfig.json',
            stringifyContentPathRegex: '\\.html$',
            astTransformers: ['jest-preset-angular/InlineHtmlStripStylesTransformer']
        }
    }
};
