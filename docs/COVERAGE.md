# Coverage Reporting

This project uses Vitest with v8 code coverage provider to track test coverage metrics.

## Local Coverage Report

Generate and view coverage reports locally:

```bash
# Generate coverage report
npm run test:coverage

# Generate coverage report and open HTML report
npm run test:coverage:report
```

This will create a `coverage/` directory with:
- `index.html` - Interactive HTML coverage report
- `lcov.info` - Machine-readable LCOV format
- `coverage.json` - JSON format for tools/CI

## Coverage Thresholds

The following thresholds are enforced:
- **Lines**: 60%
- **Functions**: 60%
- **Branches**: 60%
- **Statements**: 60%

Tests will fail if coverage drops below these thresholds.

## CI/CD Integration

Coverage reports are automatically:
1. Generated on every PR and push to `main`/`develop`
2. Uploaded to Codecov for trend tracking
3. Stored as GitHub artifacts for 30 days

## Viewing Coverage on GitHub

- **PR Checks**: Coverage badge and comparison in PR checks
- **Artifacts**: Download coverage reports from workflow run
- **Codecov**: View detailed coverage trends at [codecov.io](https://codecov.io)

## Improving Coverage

Common areas with lower coverage:
- UI event handlers (DOM interactions)
- Error boundary conditions
- Feature modules (achievements, heatmap)

To improve coverage:
1. Check the HTML report for uncovered lines: `coverage/index.html`
2. Add tests for missing branches
3. Focus on critical paths first (data, stats modules)
4. Document intentional coverage gaps

## .gitignore

Coverage directories are excluded from version control:
- `coverage/` - Generated reports
- `.nyc_output/` - Coverage tool cache
