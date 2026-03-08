# 09-rbac-guards-route-protection: RBAC Guards Route Protection

## Goal

Demonstrate practical understanding of **Authentication & Authorization** concepts through implementation-level work.

## Concepts Covered

- RBAC
- guards
- authorization

## Files In Scope

- `src/challenges/09-rbac-guards-route-protection/index.ts`

## Implementation Contract

1. Implement the solution in `src/challenges/09-rbac-guards-route-protection/index.ts`.
2. Export function `solve_09_rbac_guards_route_protection` from the primary source file.
3. Keep code modular and production-oriented (no hard-coded secrets or unsafe patterns).
4. Do not leave placeholder markers such as `TODO` or `throw new Error('Not implemented')` in scoped files.

## Architecture Signals To Include

- Implement route protection with guards (`@UseGuards` / `CanActivate`). (`nestjsGuard`)
- Implement role metadata/decorator-based authorization. (`rolesDecorator`)

## Scoring Notes

- If challenge test files are present, test evidence is detected from:
  - `tests/challenge-09-rbac-guards-route-protection.test.js` or `tests/challenge-09-rbac-guards-route-protection.test.ts`
  - `tests/e2e/challenge-09-rbac-guards-route-protection.spec.js` or `tests/e2e/challenge-09-rbac-guards-route-protection.spec.ts`
- If no challenge-specific test files are provided by course maintainers, the test layer is treated as neutral (not a penalty).
- Challenge score combines implementation, architecture, quality, best-practices, test evidence, and AI review layers.

## Done Definition (Learner Self-Check)

1. The scoped file(s) are implemented and not placeholders.
2. The export `solve_09_rbac_guards_route_protection` exists and is callable.
3. Required architecture signals above are visible in your code.
4. Run review command: `npm run review:challenge -- --course=05-nestjs-enterprise-framework --challenge=09-rbac-guards-route-protection`.

## Evaluation Layers

- Functional tests
- Code quality
- Architecture checks
- Best-practices checks
- E2E/API behavior checks
- AI review
