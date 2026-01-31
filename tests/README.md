# Unit Tests for Klimaticket Rechner

This directory contains comprehensive unit tests for the core logic of the Klimaticket Rechner application.

## Overview

The test suite covers:
- **Data Module** (`data.test.js`): Trip data normalization and storage functions
- **Stats Module** (`stats.test.js`): Trip validation, distance estimation, and carbon statistics calculations

## Test Statistics

- **Total Test Files**: 2
- **Total Tests**: 32
- **All tests passing** ✓

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in watch mode
```bash
npm test -- --watch
```

### Run tests with UI
```bash
npm run test:ui
```

### Run tests once (CI mode)
```bash
npm test -- --run
```

## Test Coverage

### Data Module (12 tests)
- Trip normalization with `states` array
- Trip normalization with `bundeslaender` (legacy) array
- Storage preparation and format conversion
- Local storage retrieval
- Edge cases and data consistency

### Stats Module (20 tests)
- **Trip Validation**: Ensuring trips fall within valid date ranges
- **Distance Estimation**: Calculating distance based on provided value or state count
- **Carbon Calculations**: 
  - Carbon emissions per trip
  - Total carbon savings
  - Equivalent distances for car and plane travel
  - Filtering invalid trips

## Testing Framework

The tests use [Vitest](https://vitest.dev/), a fast and modern unit test framework with:
- ES module support
- jsdom environment for DOM testing
- Excellent developer experience

## Configuration

Configuration is in `vitest.config.js`:
- Environment: `jsdom` (browser-like environment)
- Globals: Enabled for `describe`, `it`, `expect`, etc.
- Coverage reporting available (v8 provider)

## Future Enhancements

Potential areas for additional tests:
- I18n module translation functions
- UI module DOM manipulation
- Export functionality
- Heatmap generation
- Achievement tracking
