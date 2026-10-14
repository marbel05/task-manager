\# Architecture Audit

\## 1. Purpose

This audit compares the implemented Task Manager API architecture with the technical specification in `standards/spec.md`. It identifies inconsistencies and proposes corrective actions.

\## 2. Architecture Compliance

The application follows a layered architecture:

`HTTP request → Route → Controller → Service → Repository → SQLite`

| Component | Responsibility | Assessment |

| --- | --- | --- |

| `src/server.js` | Starts the HTTP server | Consistent with the specification |

| `src/app.js` | Configures Express and middleware | Consistent with the specification |

| `src/routes/task.routes.js` | Defines API routes | Consistent with the specification |

| `src/controllers/task.controller.js` | Handles requests and responses | Consistent with the specification |

| `src/services/task.service.js` | Validates input and applies business rules | Consistent with the specification |

| `src/repositories/task.repository.js` | Executes database queries | Consistent with the specification |

| `src/config/database.js` | Initializes SQLite and the task table | Consistent with the specification |

The database schema includes task identifiers, titles, descriptions, statuses, deadlines, and creation and update timestamps. The status constraint is enforced in SQLite, and the service also validates allowed statuses.

\## 3. Findings and Corrective Actions

\### Finding 1: Empty model module

\*\*Observation:\*\* `src/models/task.model.js` was empty and had no references in the source code.

\*\*Impact:\*\* The unused file suggested the existence of a model layer that was not actually implemented.

\*\*Action:\*\* Removed the empty file. The current database schema remains defined in `src/config/database.js`.

\### Finding 2: Incorrect package entry point

\*\*Observation:\*\* `package.json` specified `index.js` as the package entry point, but the application starts through `src/server.js`.

\*\*Impact:\*\* The metadata did not accurately represent the project structure and could mislead users or tools that rely on the package entry point.

\*\*Action:\*\* Removed the unused `main` field. The application is started through the `start` npm script.

\### Finding 3: Limited build check

\*\*Observation:\*\* The `build` script runs `node --check src/server.js`. This checks the syntax of the server entry file but does not independently perform a full build or check every source module.

\*\*Impact:\*\* The name `build` may imply broader validation than it actually provides.

\*\*Action:\*\* Documented this limitation. ESLint and automated tests provide additional validation. A future improvement could add syntax checks for every source file or introduce a dedicated build tool if the project requires bundling.

## 4. Dependency Audit

The project dependencies were reviewed against the application source code, test files, ESLint configuration, and npm scripts.

### 4.1. Runtime Dependencies

- `express` is required to implement HTTP routes and middleware for the REST API.
- `better-sqlite3` is required to store and retrieve tasks using SQLite.

Both packages are correctly classified as runtime dependencies because the application requires them to operate.

### 4.2. Development Dependencies

- `jest` runs unit and integration tests.
- `supertest` sends HTTP requests in integration tests.
- `eslint` and `@eslint/js` provide static analysis and recommended linting rules.
- `globals` defines Node.js and Jest global variables for ESLint.
- `prettier` checks and formats source code and documentation.
- `husky` manages Git hooks that run project quality checks.

These packages are correctly classified as development dependencies because they support development, testing, formatting, and quality assurance rather than application runtime functionality.

### 4.3. Three Dependency Decisions Reviewed

1. **`globals`** — initially a candidate for removal because it does not implement application functionality. However, `eslint.config.js` imports it to configure Node.js and Jest globals. It is therefore necessary for the current linting configuration.

2. **`@eslint/js`** — initially a candidate for removal because ESLint already provides the linting engine. However, the configuration explicitly imports `js.configs.recommended`, so this package provides rules that are actively used.

3. **`jest` and `supertest`** — reviewed for potential functional overlap. They are complementary rather than redundant: Jest runs the tests, while Supertest provides an interface for testing HTTP endpoints. Both are used by the testing setup.

### 4.4. Audit Result

No clearly unused or incorrectly classified dependency was identified in the reviewed configuration. The three decisions above were investigated, and the packages were retained because each has a documented purpose. Dependency removal is not recommended without further evidence of unused functionality.\## 5. Conclusion

The main application modules align with the documented layered architecture. The audit identified an unused empty file, inaccurate package metadata, and a build script whose scope is narrower than its name may suggest. Corrective actions were applied to the first two findings; the build-check limitation is documented for future improvement.
