# Challenge Engine Blueprint (Node/Express/Nest)

This blueprint mirrors the reference challenge-engine process and structure.

## Structure

- `courses/{course}/course-config.json`: course modules, concepts, challenges, scoring config
- `courses/{course}/project/challenges/{challenge}/README.md`: learner challenge brief
- `courses/{course}/project/challenges/{challenge}/metadata.json`: machine-readable challenge metadata
- `courses/{course}/results/*.json`: challenge and course review outputs
- `pathway-review/pathway-config.json`: course weights and badge thresholds
- `pathway-review/pathway-summary.json`: aggregated pathway performance
- `learner-results/progress.json`: learner-level progress snapshot

## Review Layers (same method as reference)

- Functional tests
- Code quality
- Architecture checks
- Best practices checks
- E2E/API tests
- AI review

Default score weights:

- functionalTests: 0.35
- codeQuality: 0.15
- architecture: 0.10
- bestPractices: 0.10
- e2eTests: 0.15
- aiReview: 0.15

## Data Flow

1. Per challenge result -> `challenge-results.json`
2. Per course summary -> `course-summary.json`
3. Pathway aggregation -> `pathway-summary.json`
4. Learner rollup -> `learner-results/progress.json`

## What is already scaffolded in this repo

- Full 5-course module-aligned challenge catalog
- Challenge metadata seed fields (`skills`, `patternsRequired`, `filesToCheck`)
- Progress aggregation script
- Folder scaffolding script to generate challenge docs and source stubs

## Next implementation step

Plug a real `review-engine` into each course (`courses/{course}/review-engine/index.js`) that reads challenge metadata and computes each review layer.
