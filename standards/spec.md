# Task Manager - Technical Specification

## 1. Purpose

Task Manager is a REST API for creating, viewing, updating, filtering, and deleting tasks.

## 2. Technology Stack

- JavaScript ES Modules
- Node.js 24
- Express 5
- SQLite with better-sqlite3
- Jest and Supertest
- ESLint and Prettier
- Husky and GitHub Actions

## 3. Architecture

The application follows a modular layered architecture.

- `src/server.js` starts the HTTP server.
- `src/app.js` configures Express and mounts routes.
- `src/routes/task.routes.js` maps HTTP methods and URLs to controllers.
- `src/controllers/task.controller.js` handles requests and HTTP responses.
- `src/services/task.service.js` validates input and applies business rules.
- `src/repositories/task.repository.js` executes SQL queries.
- `src/config/database.js` configures the SQLite database.
- `tests/unit/` contains unit tests.
- `tests/integration/` contains API integration tests.
- `standards/` contains engineering standards and architecture decisions.

Request flow:

HTTP request -> Route -> Controller -> Service -> Repository -> SQLite.

## 4. Data Model

The `tasks` table contains:

| Field       | Type    | Constraints                        |
| ----------- | ------- | ---------------------------------- |
| id          | INTEGER | Primary key, autoincrement         |
| title       | TEXT    | Required                           |
| description | TEXT    | Required, defaults to empty string |
| status      | TEXT    | `todo`, `in_progress`, or `done`   |
| deadline    | TEXT    | Optional                           |
| created_at  | TEXT    | Required, default timestamp        |
| updated_at  | TEXT    | Required, default timestamp        |

A task has no relationships to other entities in the current version.

## 5. API

Base path: `/api/tasks`.

| Method | Endpoint                 | Purpose                 |
| ------ | ------------------------ | ----------------------- |
| GET    | `/api/tasks`             | List tasks              |
| GET    | `/api/tasks?status=todo` | Filter tasks by status  |
| GET    | `/api/tasks/:id`         | Get one task            |
| POST   | `/api/tasks`             | Create a task           |
| PATCH  | `/api/tasks/:id`         | Partially update a task |
| DELETE | `/api/tasks/:id`         | Delete a task           |
| GET    | `/health`                | Health check            |

Creation requires a non-empty title. The default status is `todo`.

Expected HTTP statuses include 200 for successful reads and updates, 201 for creation, 204 for deletion, 400 for invalid input, and 404 when a task is not found.

## 6. Update Scenarios

### Create

1. Client sends a POST request.
2. Controller passes the request body to the service.
3. Service validates the title and status.
4. Repository inserts the task into SQLite.
5. API returns the created task.

### Update

1. Client sends a PATCH request with a task ID.
2. Controller validates the ID.
3. Service validates supplied fields.
4. Repository updates the existing record.
5. API returns the updated task.

### Delete

1. Client sends a DELETE request.
2. Controller validates the ID.
3. Repository deletes the record.
4. API returns 204 if deletion succeeds.

## 7. Quality Requirements

- Source code must use ES Modules.
- Prettier must pass.
- ESLint must report no errors.
- Build and automated tests must pass.
- Local database files and secrets must not be committed.
- Changes must pass local quality checks and CI.
