# Task Manager API

A REST API for creating, viewing, updating, filtering, and deleting tasks. The project demonstrates a modular application architecture, automated testing, engineering standards, and continuous integration.

## Technology Stack

- JavaScript ES Modules
- Node.js 24
- Express 5
- SQLite with better-sqlite3
- Jest and Supertest
- ESLint and Prettier
- Husky Git hooks
- GitHub Actions CI

## Features

- Create tasks with a title, description, status, and optional deadline.
- List all tasks or filter them by status.
- Retrieve a task by ID.
- Partially update an existing task.
- Delete tasks.
- Check API health using `/health`.

Supported task statuses: `todo`, `in_progress`, and `done`.

## Getting Started

### Prerequisites

Install Node.js 24 and npm.

### Installation

Install the project dependencies:

```bash
npm ci
```

### Run in development mode

```bash
npm run dev
```

### Run normally

```bash
npm start
```

The server runs on port 3000 by default.

## API Endpoints

| Method | Endpoint                 | Description            |
| ------ | ------------------------ | ---------------------- |
| GET    | `/health`                | Health check           |
| GET    | `/api/tasks`             | List tasks             |
| GET    | `/api/tasks?status=todo` | Filter tasks by status |
| GET    | `/api/tasks/:id`         | Get a task             |
| POST   | `/api/tasks`             | Create a task          |
| PATCH  | `/api/tasks/:id`         | Update a task          |
| DELETE | `/api/tasks/:id`         | Delete a task          |

For task creation, send JSON with a non-empty `title`. The default status is `todo`.

Example request body:

```json
{
  "title": "Complete the lab",
  "description": "Finish the Task Manager API assignment",
  "status": "todo",
  "deadline": null
}
```

## Quality Checks

Run all local quality checks:

```bash
npm run check
```

Individual checks:

```bash
npm run format:check
npm run lint
npm run build
npm test
```

Git hooks run quality checks before commits and pushes. The pre-commit hook has been verified to block a commit when code formatting checks fail. GitHub Actions runs the quality checks in CI.

## Project Structure

```text
src/
  app.js
  server.js
  config/
    database.js
  controllers/
    task.controller.js
  routes/
    task.routes.js
  services/
    task.service.js
  repositories/
    task.repository.js
tests/
  unit/
  integration/
standards/
  adr/
  spec.md
  definition-of-done.md
  quality-checks.md
  architecture-audit.md
```

## Engineering Standards

The `standards/` directory documents the project's architecture, data model, API behavior, and data update scenarios in `spec.md`. It also contains Architecture Decision Records (ADRs) using the MADR format, a project-specific Definition of Done, quality checks, and an architecture audit.

## Development Workflow

Develop changes on feature branches, run local quality checks, push the branch, and open a pull request. Changes should be merged only after the required CI checks pass.

## Project Status

The initial application structure, REST API, SQLite data layer, automated unit and integration tests, engineering standards, Git hooks, and GitHub Actions CI workflow are implemented. The current test suite contains 15 passing tests across three test suites.

## Pull Request Workflow

1. Create a separate branch for each feature or documentation change.
2. Run `npm run check` before submitting changes.
3. Push the branch to GitHub and open a Pull Request targeting `main`.
4. Review the changes and merge the Pull Request after successful checks.
