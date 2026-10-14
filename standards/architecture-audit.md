# Architecture Audit

## 1. Purpose

This audit compares the implemented Task Manager API architecture with `standards/spec.md`. It evaluates module boundaries, identifies architectural inconsistencies, and reviews three candidates for unnecessary or incorrectly classified dependencies.

## 2. Architecture Compliance

The application follows a layered architecture:

`HTTP request -> Route -> Controller -> Service -> Repository -> SQLite`

| Component                             | Responsibility                                   | Assessment                        |
| ------------------------------------- | ------------------------------------------------ | --------------------------------- |
| `src/server.js`                       | Starts the HTTP server                           | Consistent with the specification |
| `src/app.js`                          | Configures Express and mounts routes             | Consistent with the specification |
| `src/routes/task.routes.js`           | Maps HTTP endpoints to controllers               | Consistent with the specification |
| `src/controllers/task.controller.js`  | Handles HTTP requests and responses              | Consistent with the specification |
| `src/services/task.service.js`        | Validates input and applies business rules       | Consistent with the specification |
| `src/repositories/task.repository.js` | Executes database queries                        | Consistent with the specification |
| `src/config/database.js`              | Configures SQLite and initializes the task table | Consistent with the specification |

The module boundaries separate HTTP handling, business logic, and data access. This structure corresponds to the request flow defined in the specification.

The `tasks` table contains task identifiers, titles, descriptions, statuses, deadlines, and timestamps. The status constraint is enforced in SQLite, and the service also validates allowed statuses. Tasks have no relationships to other entities in the current version.

## 3. Findings and Corrective Actions

### Finding 1: Unused model file

**Observation:** `src/models/task.model.js` was empty and had no references in the source code.

**Impact:** The unused file suggested the existence of a model layer that was not implemented.

**Action:** The empty file was removed. The database schema remains defined in `src/config/database.js`.

### Finding 2: Incorrect package entry point

**Observation:** `package.json` specified `index.js` as the package entry point, while the application starts through `src/server.js`.

**Impact:** The package metadata did not accurately represent the project structure.

**Action:** The unused `main` field was removed. The application is started through the `start` npm script.

### Finding 3: Limited build check

**Observation:** The `build` script runs `node --check src/server.js`. This checks the syntax of the server entry file, not every source module or a bundled production build.

**Impact:** The script provides narrower validation than a full build might imply.

**Action:** The limitation is documented. ESLint and automated tests provide additional validation. A broader build process is not required unless the project needs it.

## 4. Dependency Audit

The dependencies were reviewed against the application source code, tests, ESLint configuration, and npm scripts.

### 4.1. Runtime Dependencies

- `express` provides HTTP routing and middleware.
- `better-sqlite3` provides SQLite database access.

Both are required at runtime and are correctly classified as runtime dependencies.

### 4.2. Development Dependencies

- `jest` runs automated tests.
- `supertest` supports HTTP integration tests.
- `eslint` and `@eslint/js` provide static analysis and recommended rules.
- `globals` configures environment-specific global variables for ESLint.
- `prettier` formats files and checks formatting.
- `husky` manages Git hooks.

These packages support development and quality assurance rather than application runtime functionality.

### 4.3. Three Candidates for Removal or Reclassification

The following candidates were investigated. They are not confirmed unnecessary dependencies; the audit found evidence that each is currently used.

1. **`globals` — candidate for removal.** It does not implement application functionality. However, `eslint.config.js` imports it to configure Node.js and Jest globals. Removing it without changing the ESLint configuration would break that configuration.

2. **`@eslint/js` — candidate for removal.** ESLint is already the linting engine, but `eslint.config.js` explicitly uses `js.configs.recommended`. The package therefore provides rules actively used by the project.

3. **`supertest` — candidate for reclassification or removal.** It is a development dependency, not a runtime dependency. The integration tests use it to send HTTP requests to the API, so removing it would require replacing the existing HTTP testing approach. Its current classification is correct.

### 4.4. Dependency Audit Result

No clearly unused or incorrectly classified dependency was identified among the reviewed candidates. All three were retained because the current project configuration or tests use them.

The audit therefore records three investigated candidates rather than claiming that three unnecessary dependencies actually exist. No dependency should be removed without evidence that it is unused or incorrectly classified.

## 5. Conclusion

The implemented application modules align with the layered architecture documented in `standards/spec.md`. The audit records three architectural findings, two of which were corrected, and documents the limitation of the current build check.

Three dependency candidates were reviewed. None was confirmed to be unnecessary or incorrectly classified, so no dependency removal is justified by the available evidence.
