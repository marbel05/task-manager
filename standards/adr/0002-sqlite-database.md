# ADR 0002: SQLite Database

- Status: Accepted

## Context

Task Manager needs persistent storage for task records without requiring a separate database server during local development.

## Decision

Use SQLite through the better-sqlite3 package.

## Alternatives Considered

- **In-memory storage:** rejected because task records must persist after the application restarts.
- **External database server (e.g., PostgreSQL):** rejected because it would introduce additional setup and operational requirements for this small project.
- **SQLite with `better-sqlite3`:** selected because it provides persistent local storage without requiring a separate database server.

## Consequences

- The application can store tasks in a local database file.
- SQL operations are available through a synchronous API.
- The database file must be excluded from version control.
- Tests should use an isolated in-memory database where practical.
