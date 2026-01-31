# Contributing to Klimaticket Calculator

Thank you for your interest in contributing to the Klimaticket Calculator! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)
- [Project Structure](#project-structure)

---

## Code of Conduct

This project follows standard open-source etiquette:
- Be respectful and constructive
- Focus on what's best for the project
- Show empathy towards other community members
- Accept constructive criticism gracefully

---

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm (comes with Node.js)
- Git
- A modern web browser
- Python 3.x (for local development server)

### Initial Setup

```bash
# 1. Fork the repository on GitHub
# 2. Clone your fork
git clone https://github.com/YOUR-USERNAME/klimaticket-rechner.git
cd klimaticket-rechner

# 3. Add upstream remote
git remote add upstream https://github.com/jhoelzl/klimaticket-rechner.git

# 4. Install dependencies
npm install

# 5. Start development server
npm run dev
# Or manually: python3 -m http.server 8000

# 6. Open http://localhost:8000 in your browser
```

---

## Development Workflow

### 1. Create a Feature Branch

Always create a new branch for your work:

```bash
# Update your main branch
git checkout main
git pull upstream main

# Create feature branch
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
# or
git checkout -b docs/documentation-update
```

### Branch Naming Convention

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `test/` - Adding or updating tests
- `chore/` - Maintenance tasks
- `refactor/` - Code refactoring

### 2. Make Your Changes

- Write clean, readable code
- Follow existing code style
- Add tests for new functionality
- Update documentation as needed
- Test your changes thoroughly

### 3. Run Tests and Linting

Before committing, ensure all tests pass:

```bash
# Run linter
npm run lint

# Fix linting issues automatically
npm run lint:fix

# Run all tests
npm run test:run

# Run tests with coverage
npm run test:coverage

# Check i18n translations
npm run check:i18n
```

### 4. Commit Your Changes

Follow the commit message guidelines (see below):

```bash
git add .
git commit -m "feat: add new achievement for weekend warrior"
```

### 5. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 6. Create Pull Request

- Go to GitHub and create a Pull Request
- Fill in the PR template
- Link related issues
- Wait for review

---

## Coding Standards

### JavaScript Style

- Use ES6+ features
- Use `const` and `let`, avoid `var`
- Use meaningful variable names
- Add comments for complex logic
- Keep functions small and focused
- Avoid deep nesting (max 3 levels)

**Example:**

```javascript
// Good
function calculateTripCost(distance, pricePerKm) {
    return distance * pricePerKm;
}

// Bad
function calc(d, p) {
    return d*p;
}
```

### HTML/CSS

- Use semantic HTML5 elements
- Keep CSS organized and modular
- Use CSS custom properties for theming
- Follow BEM naming convention where applicable
- Ensure responsive design (mobile-first)

### Comments

Write comments in **English**, even if code is in a multi-language environment:

```javascript
// Calculate the total savings compared to car travel
function calculateSavings(trips, ticketCost) {
    // Implementation
}
```

---

## Testing Guidelines

### Writing Tests

- Place tests in `tests/` directory
- Name test files as `*.test.js`
- Use Vitest for testing framework
- Write descriptive test names
- Group related tests using `describe()`
- Test edge cases and error conditions

**Example:**

```javascript
import { describe, it, expect } from 'vitest';

describe('Trip calculation', () => {
    it('should calculate cost correctly', () => {
        const result = calculateCost(10, 2.5);
        expect(result).toBe(25);
    });

    it('should handle zero distance', () => {
        const result = calculateCost(0, 2.5);
        expect(result).toBe(0);
    });

    it('should handle negative values gracefully', () => {
        const result = calculateCost(-10, 2.5);
        expect(result).toBe(0);
    });
});
```

### Test Coverage

- Aim for at least 70% code coverage
- Prioritize testing business logic
- Test happy paths and error cases
- Mock external dependencies (Supabase, localStorage)

---

## Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification:

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, semicolons, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `perf`: Performance improvements
- `ci`: CI/CD changes

### Examples

```bash
feat(ui): add dark mode toggle to settings panel

fix(stats): correct carbon calculation for multi-state trips

docs(readme): update installation instructions

test(i18n): add tests for translation fallback logic

chore(deps): update vitest to v4.0.18
```

---

## Pull Request Process

### Before Submitting

- [ ] Tests pass locally (`npm run test:run`)
- [ ] Linting passes (`npm run lint`)
- [ ] i18n check passes (`npm run check:i18n`)
- [ ] Code is well-documented
- [ ] No console.log statements left in code
- [ ] Commit messages follow convention
- [ ] Branch is up-to-date with main

### PR Template

When creating a PR, include:

1. **Description**: What does this PR do?
2. **Related Issue**: Link to issue (if applicable)
3. **Type of Change**: Feature, bugfix, docs, etc.
4. **Testing**: How was this tested?
5. **Screenshots**: For UI changes
6. **Checklist**: Confirm all requirements met

### Review Process

- At least one maintainer review required
- Address review comments promptly
- Be open to suggestions and improvements
- CI/CD checks must pass

---

## Project Structure

```
klimaticket_rechner/
├── .github/              # GitHub Actions workflows, templates
│   ├── workflows/        # CI/CD workflows
│   └── dependabot.yml    # Dependency updates config
├── css/                  # Stylesheets
│   └── styles.css        # Main CSS file
├── docs/                 # Documentation
│   ├── COVERAGE.md       # Test coverage report
│   ├── FEATURES.md       # Feature roadmap
│   ├── TEST_ANALYSIS.md  # Test analysis
│   ├── CHANGELOG.md      # Release changelog
│   └── CONTRIBUTING.md   # This file
├── js/                   # JavaScript modules
│   ├── app.js            # Main application
│   ├── config.js         # Configuration
│   ├── data.js           # Data management
│   ├── i18n.js           # Internationalization
│   ├── partials.js       # Partial templates
│   ├── ui.js             # UI utilities
│   └── features/         # Feature modules
│       ├── achievements.js
│       ├── export.js
│       ├── heatmap.js
│       └── stats.js
├── partials/             # HTML partials
│   └── app.html          # Main app template
├── scripts/              # Build/utility scripts
│   └── check-i18n.js     # Translation validation
├── tests/                # Test files
│   ├── data.test.js
│   ├── i18n.test.js
│   ├── stats.test.js
│   ├── ui.test.js
│   └── README.md
├── index.html            # Entry point
├── manifest.json         # PWA manifest
├── sw.js                 # Service Worker
├── package.json          # Dependencies and scripts
├── vitest.config.js      # Test configuration
├── eslint.config.js      # Linter configuration
└── README.md             # Main documentation
```

---

## Common Tasks

### Adding a New Feature

1. Create feature branch
2. Implement feature in appropriate module
3. Add tests in `tests/` directory
4. Update documentation
5. Add translations (if UI changes)
6. Run all checks
7. Submit PR

### Fixing a Bug

1. Create fix branch
2. Write failing test first (if possible)
3. Fix the bug
4. Verify test passes
5. Check for side effects
6. Submit PR with issue reference

### Updating Documentation

1. Create docs branch
2. Update relevant .md files
3. Check markdown formatting
4. Ensure links work
5. Submit PR

---

## Questions?

- Open an [issue](https://github.com/jhoelzl/klimaticket-rechner/issues)
- Check existing [discussions](https://github.com/jhoelzl/klimaticket-rechner/discussions)
- Review [documentation](https://github.com/jhoelzl/klimaticket-rechner#readme)

---

Thank you for contributing! 🚆✨
