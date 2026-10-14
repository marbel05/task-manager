# ADR 0003: JavaScript ES Modules

- Status: Accepted

## Context

The project requires a consistent module system for imports, exports, and code organization.

## Decision

Use JavaScript ES Modules by setting `"type": "module"` in package.json.

## Alternatives Considered

- **CommonJS (`require`/`module.exports`):** not selected because the project uses ES Modules as its standard module system.
- **JavaScript ES Modules (`import`/`export`):** selected because they provide a consistent module system and align with the project's `"type": "module"` configuration.
- **Mixing ES Modules and CommonJS:** rejected because using two module systems would add unnecessary complexity.

## Consequences

- Modules use `import` and `export`.
- File extensions are specified in relative imports.
- Jest is configured to run the project's ES Modules.
