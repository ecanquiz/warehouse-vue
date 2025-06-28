## How to contribute?

1. Fork the repo.
2. Create a branch: `git checkout -b mi-feature`.
3. Make descriptive commits.
4. Submit a PR to `develop` and describe the changes.

## Branches  
- `main`: Stable. Only updated via PR from `develop` (requires review).
- `develop`: Integration (contributors submit PRs here). All changes (even admin ones) require PR.

## Branch flow
- `develop`: Accepts PRs from any branch (e.g. `feature/xxx`).
- `main`: **Only accepts PRs from `develop`** (never from other branches).
