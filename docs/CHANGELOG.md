# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Comprehensive unit tests for UI module (toast notifications, dark mode, modals)
- Enhanced CI/CD workflow with multi-OS testing (Ubuntu, macOS, Windows)
- Node.js version matrix testing (18.x, 20.x, 22.x)
- Improved npm scripts for development workflow
- Enhanced i18n validation with placeholder checking
- Dependabot configuration for automated dependency updates
- Improved .gitignore with better organization

### Changed
- Moved documentation files (FEATURES.md, TEST_ANALYSIS.md) into docs/ folder
- Enhanced i18n check script with better reporting and statistics

### Fixed
- Documentation references updated to reflect new docs/ structure

## [1.0.0] - 2026-01-31

### Added
- Initial release of Klimaticket Calculator
- Trip tracking with date, route, cost, and distance
- Supabase cloud sync with authentication
- Offline support with PWA capabilities
- Heatmap calendar visualization
- 12-month year overview
- States overview for all 9 Austrian states
- Top 10 routes statistics
- PDF export functionality
- 12 Austria-themed achievements system
- JSON/CSV export and import
- Multi-language support (English/German)
- Dark mode with system detection
- Quick-add buttons for frequent routes
- Responsive mobile-first design

### Features
- **Analytics & Reporting**
  - Heatmap calendar with intensity levels
  - Monthly trends and statistics
  - State-based trip analysis
  - Carbon savings calculation
  - Professional PDF summaries

- **Data Management**
  - Cloud synchronization via Supabase
  - Local fallback with localStorage
  - Multi-device sync support
  - Data portability (JSON/CSV)

- **User Experience**
  - Automatic language detection
  - Dark/light theme toggle
  - Quick-add trip shortcuts
  - Comprehensive settings panel
  - Achievement tracking and badges

### Technical
- Vanilla HTML/CSS/JavaScript (no frameworks)
- Supabase backend (PostgreSQL + Auth)
- GitHub Pages deployment
- Service Worker for offline support
- Progressive Web App (PWA) capabilities
- Row Level Security (RLS) for data protection

---

## Release Types

- **Major**: Breaking changes
- **Minor**: New features, backward compatible
- **Patch**: Bug fixes, backward compatible

---

## Links

- [Repository](https://github.com/jhoelzl/klimaticket-rechner)
- [Live Demo](https://jhoelzl.github.io/klimaticket-rechner/)
- [Issues](https://github.com/jhoelzl/klimaticket-rechner/issues)
