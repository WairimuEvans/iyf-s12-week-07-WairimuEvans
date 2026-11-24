# Week 7 — JavaScript Best Practices

**Repository:** `iyf-s12-week-07-WairimuEvans`

## Overview

This project demonstrates JavaScript best practices through modular application
development, browser storage, state management, debugging, code quality tools,
and unit testing.

## Main Deliverable: Persistent To-Do List

The To-Do application supports:

- Adding, completing, and deleting tasks
- Filtering all, active, and completed tasks
- Persisting tasks with localStorage
- Remembering the selected theme and filter
- Separating application logic, state, storage, and UI into modules

## Additional Exercises

### Shopping Cart

A shopping cart implemented with a JavaScript class. It supports adding products,
updating quantities, removing items, calculating item counts and totals, and
persisting cart contents with localStorage.

### Storage Exercises

- `notes.html` and `notes.js`: persistent notes using localStorage
- `session-form.html` and `form.js`: form recovery using sessionStorage

### Daily Challenges

`daily-challenges.html`, `daily-challenges.js`, and
`daily-challenges.css` contain:

1. Theme persistence
2. Recent search history
3. Form auto-save
4. Code refactoring
5. Weather Dashboard code review

### Debugging

`debugging.js` demonstrates variable logging, array inspection, error handling,
and execution-flow tracing.

## Project Structure

All project files are kept in the repository root.

| File | Purpose |
|---|---|
| `index.html` | To-Do application page |
| `app.js` | To-Do event handling |
| `ui.js` | Rendering, theme control, and feedback |
| `state.js` | Central application state |
| `storage.js` | Safe localStorage utilities |
| `todo-logic.js` | Reusable To-Do functions |
| `todo-logic.test.js` | Unit tests for To-Do logic |
| `storage.test.js` | Unit tests for storage helpers |
| `cart.html` / `cart.js` | Shopping cart page and functionality |
| `notes.html` / `notes.js` | Persistent notes exercise |
| `session-form.html` / `form.js` | Session form recovery exercise |
| `daily-challenges.html` | Daily challenges page |
| `daily-challenges.js` | Daily challenge functionality |
| `daily-challenges.css` | Daily challenge styling |
| `debugging.js` | Debugging practice |
| `styles.css` | Main application styling |
| `eslint.config.js` | ESLint configuration |
| `.prettierrc` | Prettier configuration |
| `.gitignore` | Ignored files |

## Requirements

- Node.js 22 or newer
- npm
- Visual Studio Code
- Live Server extension

## Installation

```bash
npm install
```

## Quality Checks

Run the unit tests:

```bash
npm test
```

Run ESLint:

```bash
npm run lint
```

Format the source files:

```bash
npm run format
```

## Run the Applications

Open each relevant HTML file with VS Code Live Server:

- `index.html`
- `cart.html`
- `notes.html`
- `session-form.html`
- `daily-challenges.html`

## Collaboration

Use feature branches for changes. Open a pull request against `main` and
include a short summary of the change plus the tests and manual checks performed.
Do not merge a pull request until it has been reviewed.

## Author

Evans Wairimu
