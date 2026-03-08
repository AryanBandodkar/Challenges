# Topic Alignment Audit (Node/Express/Nest Challenge Engine)

Date: 2026-03-08

## Scope

Compared course syllabus module concepts with challenge coverage in:

- `courses/*/course-config.json`
- `courses/*/project/challenges/*/metadata.json`

Project-list sections were intentionally ignored, as requested.

## Coverage Summary

- Course 1 (JavaScript Fundamentals & Async): aligned.
- Course 2 (Node.js Core): aligned, including micro-industry concept for graceful shutdown.
- Course 3 (Express & REST API): aligned, including health/readiness probes and pagination contracts.
- Course 4 (TypeScript Backend): aligned, including runtime env schema validation.
- Course 5 (NestJS): aligned, including request-correlation logging interceptor.

## Added Industry Micro-Topic Challenges (Small Scope)

1. `02-nodejs-core-fundamentals`
- `15-graceful-shutdown-signal-handling`

2. `03-express-rest-api-development`
- `20-health-readiness-endpoints`
- `21-pagination-sorting-filter-contract`

3. `04-typescript-backend-development`
- `08-environment-schema-validation`

4. `05-nestjs-enterprise-framework`
- `17-request-id-logging-interceptor`

## Engine/Validator Support Added

- New architecture patterns in shared review engine:
  - `signalHandler`, `gracefulShutdown`
  - `healthEndpoint`, `paginationQueryHandling`
  - `requestIdInterceptor`, `envSchemaValidation`
- `scripts/audit-topic-alignment.js` now validates these micro-topics as part of coverage audit.

## New Challenge Count

- Previous total: 64
- Current total: 69

Breakdown:

- 01-javascript-fundamentals-async: 8
- 02-nodejs-core-fundamentals: 15
- 03-express-rest-api-development: 21
- 04-typescript-backend-development: 8
- 05-nestjs-enterprise-framework: 17

## Residual Notes

- Added concepts are intentionally small and industry-practical.
- No new large domain tracks were introduced.
