# 12-rabbitmq-redis-event-driven-flow: RabbitMQ Redis Event Driven Flow

## Goal

Demonstrate practical understanding of **Microservices & Communication** concepts through implementation-level work.

## Concepts Covered

- message queues
- event-driven architecture

## Files In Scope

- `src/challenges/12-rabbitmq-redis-event-driven-flow/index.ts`

## Implementation Contract

1. Implement the solution in `src/challenges/12-rabbitmq-redis-event-driven-flow/index.ts`.
2. Export function `solve_12_rabbitmq_redis_event_driven_flow` from the primary source file.
3. Keep code modular and production-oriented (no hard-coded secrets or unsafe patterns).
4. Do not leave placeholder markers such as `TODO` or `throw new Error('Not implemented')` in scoped files.

## Architecture Signals To Include

- Implement event-driven producer/consumer flow (`emit`, event patterns). (`eventHandler`)

## Scoring Notes

- If challenge test files are present, test evidence is detected from:
  - `tests/challenge-12-rabbitmq-redis-event-driven-flow.test.js` or `tests/challenge-12-rabbitmq-redis-event-driven-flow.test.ts`
  - `tests/e2e/challenge-12-rabbitmq-redis-event-driven-flow.spec.js` or `tests/e2e/challenge-12-rabbitmq-redis-event-driven-flow.spec.ts`
- If no challenge-specific test files are provided by course maintainers, the test layer is treated as neutral (not a penalty).
- Challenge score combines implementation, architecture, quality, best-practices, test evidence, and AI review layers.

## Done Definition (Learner Self-Check)

1. The scoped file(s) are implemented and not placeholders.
2. The export `solve_12_rabbitmq_redis_event_driven_flow` exists and is callable.
3. Required architecture signals above are visible in your code.
4. Run review command: `npm run review:challenge -- --course=05-nestjs-enterprise-framework --challenge=12-rabbitmq-redis-event-driven-flow`.

## Evaluation Layers

- Functional tests
- Code quality
- Architecture checks
- Best-practices checks
- E2E/API behavior checks
- AI review
