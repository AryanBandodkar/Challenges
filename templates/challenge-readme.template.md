# {{challengeId}}: {{challengeName}}

## Goal

Prove practical understanding of the concepts in this module challenge.

## Concepts Covered

{{skillsList}}

## Files In Scope

{{filesToCheckList}}

## Implementation Contract

1. Implement the solution in `{{sourceFile}}`.
2. Export function `{{solveFunctionName}}` from the primary source file.
3. Keep code modular and production-oriented.
4. Do not leave placeholder markers (`TODO`, `Not implemented`) in scoped files.

## Architecture Signals To Include

{{patternChecklist}}

## Scoring Notes

- If challenge test files are present, test evidence is detected from:
  - `tests/challenge-{{challengeId}}.test.js` or `tests/challenge-{{challengeId}}.test.ts`
  - `tests/e2e/challenge-{{challengeId}}.spec.js` or `tests/e2e/challenge-{{challengeId}}.spec.ts`
- If no challenge-specific test files are provided by course maintainers, the test layer is treated as neutral (not a penalty).
- If any scoped file is placeholder/missing, overall challenge score is forced to `0%`.
- Otherwise, challenge score combines implementation, architecture, quality, best-practices, test evidence, and AI review layers.

## Done Definition (Learner Self-Check)

1. Scoped file(s) are implemented.
2. `{{solveFunctionName}}` export exists.
3. Required architecture signals are present.
4. Run review for this challenge and verify score output.

## Evaluation Layers

- Functional tests
- Code quality
- Architecture checks
- Best-practices checks
- E2E/API behavior checks
- AI review
