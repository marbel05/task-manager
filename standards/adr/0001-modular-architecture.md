# ADR 0001: Modular Architecture

- Status: Accepted

## Context

The application needs to separate HTTP handling, business rules, database access, and server configuration. Keeping these concerns in one file would make the application harder to test and maintain.

## Decision

Use separate modules for routes, controllers, services, repositories, and database configuration.

## Alternatives Considered

- **Single-module architecture:** rejected because combining HTTP handling, business logic, and database access would make testing and maintenance harder.
- **Layered modular architecture:** selected because it separates responsibilities and allows business logic to be tested independently.

## Consequences

- Each layer has a defined responsibility.
- Business logic can be tested separately from HTTP handling.
- The structure introduces additional files and requires clear module boundaries.
