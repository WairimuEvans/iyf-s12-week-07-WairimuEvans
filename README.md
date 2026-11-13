
# Week 7 — JavaScript Best Practices

**Repository:** `iyf-s12-week-07-WairimuEvans`

## Overview

This project demonstrates JavaScript best practices through modular application
development, browser storage, state management, debugging, code quality tools,
and unit testing.

## Main Deliverable: Persistent To-Do List

The To-Do application supports:

- Adding tasks
- Completing and deleting tasks
- Filtering all, active, and completed tasks
- Persisting tasks with localStorage
- Remembering the selected theme and filter
- Separating application logic, state, storage, and UI into modules

## Additional Exercises

### Shopping Cart

A shopping cart implemented with a JavaScript class.

Features include:

- Adding products
- Updating product quantities
- Removing products
- Calculating item count and total price
- Persisting cart contents with localStorage

### Storage Exercises

- `notes.html` and `notes.js`: persistent notes using localStorage
- `session-form.html` and `form.js`: form recovery using sessionStorage

### Daily Challenges

`daily-challenges.html`, `daily-challenges.js`, and `daily-challenges.css` contain:

1. Theme persistence
2. Recent search history
3. Form auto-save
4. Code refactoring
5. Weather Dashboard code review

### Debugging

`debugging.js` demonstrates:

- Logging variables
- Inspecting arrays
- Handling errors
- Tracking program execution

## Project Structure

All project files are kept in the repository root.

| File | Purpose |
|---|---|
| `index.html` | To-Do application page |
| `app.js` | To-Do event handling |
| `ui.js` | Rendering and feedback |
| `state.js` | Central application state |
| `storage.js` | localStorage utilities |
| `todo-logic.js` | Reusable To-Do functions |
| `todo-logic.test.js` | Unit tests |
| `cart.html` | Shopping Cart page |
| `cart.js` | Shopping Cart class and UI |
| `notes.html` | Notes page |
| `notes.js` | Notes persistence |
| `session-form.html` | Session form page |
| `form.js` | Session form persistence |
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

## Run the Tests

```bash
npm test
```

## Run ESLint

```bash
npm run lint
```

## Format the Code

```bash
npm run format
```

## Run the Applications

Open the relevant HTML file with VS Code Live Server:

- `index.html`
- `cart.html`
- `notes.html`
- `session-form.html`
- `daily-challenges.html`

## Collaboration


## Author

Evans Wairimu
