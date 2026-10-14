# Quality Checks

## Before Commit

- [ ] Review changed files.
- [ ] Run `npm run format:check`.
- [ ] Run `npm run lint`.
- [ ] Run `npm run build`.
- [ ] Run `npm test`.
- [ ] Run `npm run check`.
- [ ] Confirm that no local database or secret files are staged.

The Husky pre-commit hook runs `npm run check` and blocks the commit if the command fails.

## Before Push

- [ ] Confirm the current branch is correct.
- [ ] Run `npm run check`.
- [ ] Review the staged diff.
- [ ] Confirm that the commit contains only intended changes.

The Husky pre-push hook runs `npm run check` and blocks the push if the command fails.

## Pull Request

- [ ] The feature branch is pushed to GitHub.
- [ ] The Pull Request describes the changes.
- [ ] GitHub Actions CI passes.
- [ ] The specification and implementation are consistent.
- [ ] The Pull Request is reviewed before merging.
