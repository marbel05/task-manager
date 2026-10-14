# ADR 0003: JavaScript ES Modules

- Status: Accepted

## Context

The project requires a consistent module system for imports, exports, and code organization.

## Decision

Use JavaScript ES Modules by setting `"type": "module"` in package.json.

## Consequences

- Modules use `import` and `export`.
- File extensions are specified in relative imports.
- Jest is configured to run the project's ES Modules.
