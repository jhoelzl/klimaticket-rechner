const { defineConfig } = require('vitest/config');

module.exports = defineConfig({
    test: {
        globals: true,
        environment: 'jsdom',
        coverage: {
            provider: 'v8',
            reporter: ['text', 'text-summary', 'json', 'html', 'lcov'],
            reportOnFailure: true,
            exclude: [
                'node_modules/',
                'tests/',
                '**/*.test.js',
                '**/*.spec.js'
            ],
            thresholds: {
                lines: 60,
                functions: 60,
                branches: 60,
                statements: 60
            }
        }
    }
});
