# 13-grpc-rest-interservice-bridge: gRPC REST Interservice Bridge

## Goal

Demonstrate practical understanding of **Microservices & Communication** concepts through implementation-level work.

## Concepts Covered

- gRPC
- REST bridge
- service communication

## Files In Scope

- `src/challenges/13-grpc-rest-interservice-bridge/index.ts`

## Implementation Contract

1. Implement the solution in `src/challenges/13-grpc-rest-interservice-bridge/index.ts`.
2. Export function `solve_13_grpc_rest_interservice_bridge` from the primary source file.
3. Keep code modular and production-oriented (no hard-coded secrets or unsafe patterns).
4. Do not leave placeholder markers such as `TODO` or `throw new Error('Not implemented')` in scoped files.

## Architecture Signals To Include

- Implement gRPC handler/client integration points. (`grpcClient`)

## Scoring Notes

- If challenge test files are present, test evidence is detected from:
  - `tests/challenge-13-grpc-rest-interservice-bridge.test.js` or `tests/challenge-13-grpc-rest-interservice-bridge.test.ts`
  - `tests/e2e/challenge-13-grpc-rest-interservice-bridge.spec.js` or `tests/e2e/challenge-13-grpc-rest-interservice-bridge.spec.ts`
- If no challenge-specific test files are provided by course maintainers, the test layer is treated as neutral (not a penalty).
- Challenge score combines implementation, architecture, quality, best-practices, test evidence, and AI review layers.

## Done Definition (Learner Self-Check)

1. The scoped file(s) are implemented and not placeholders.
2. The export `solve_13_grpc_rest_interservice_bridge` exists and is callable.
3. Required architecture signals above are visible in your code.
4. Run review command: `npm run review:challenge -- --course=05-nestjs-enterprise-framework --challenge=13-grpc-rest-interservice-bridge`.

## Evaluation Layers

- Functional tests
- Code quality
- Architecture checks
- Best-practices checks
- E2E/API behavior checks
- AI review
