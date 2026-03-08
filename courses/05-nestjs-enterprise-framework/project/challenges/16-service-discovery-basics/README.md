# 16-service-discovery-basics: Service Discovery Basics

## Goal

Demonstrate practical understanding of **Microservices & Communication** concepts through implementation-level work.

## Concepts Covered

- service discovery basics
- service registry patterns

## Files In Scope

- `src/challenges/16-service-discovery-basics/index.ts`

## Implementation Contract

1. Implement the solution in `src/challenges/16-service-discovery-basics/index.ts`.
2. Export function `solve_16_service_discovery_basics` from the primary source file.
3. Keep code modular and production-oriented (no hard-coded secrets or unsafe patterns).
4. Do not leave placeholder markers such as `TODO` or `throw new Error('Not implemented')` in scoped files.

## Architecture Signals To Include

- Represent service discovery/registry integration behavior. (`serviceDiscoveryPattern`)

## Scoring Notes

- If challenge test files are present, test evidence is detected from:
  - `tests/challenge-16-service-discovery-basics.test.js` or `tests/challenge-16-service-discovery-basics.test.ts`
  - `tests/e2e/challenge-16-service-discovery-basics.spec.js` or `tests/e2e/challenge-16-service-discovery-basics.spec.ts`
- If no challenge-specific test files are provided by course maintainers, the test layer is treated as neutral (not a penalty).
- Challenge score combines implementation, architecture, quality, best-practices, test evidence, and AI review layers.

## Done Definition (Learner Self-Check)

1. The scoped file(s) are implemented and not placeholders.
2. The export `solve_16_service_discovery_basics` exists and is callable.
3. Required architecture signals above are visible in your code.
4. Run review command: `npm run review:challenge -- --course=05-nestjs-enterprise-framework --challenge=16-service-discovery-basics`.

## Evaluation Layers

- Functional tests
- Code quality
- Architecture checks
- Best-practices checks
- E2E/API behavior checks
- AI review
