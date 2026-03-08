# 19-https-tls-api-hardening: HTTPS TLS API Hardening

## Goal

Demonstrate practical understanding of **Authentication & Security** concepts through implementation-level work.

## Concepts Covered

- HTTPS
- SSL/TLS fundamentals

## Files In Scope

- `src/challenges/19-https-tls-api-hardening/index.js`

## Implementation Contract

1. Implement the solution in `src/challenges/19-https-tls-api-hardening/index.js`.
2. Export function `solve_19_https_tls_api_hardening` from the primary source file.
3. Keep code modular and production-oriented (no hard-coded secrets or unsafe patterns).
4. Do not leave placeholder markers such as `TODO` or `throw new Error('Not implemented')` in scoped files.

## Architecture Signals To Include

- Use HTTPS server APIs (`https.createServer` or `node:https`). (`httpsServer`)

## Scoring Notes

- If challenge test files are present, test evidence is detected from:
  - `tests/challenge-19-https-tls-api-hardening.test.js` or `tests/challenge-19-https-tls-api-hardening.test.ts`
  - `tests/e2e/challenge-19-https-tls-api-hardening.spec.js` or `tests/e2e/challenge-19-https-tls-api-hardening.spec.ts`
- If no challenge-specific test files are provided by course maintainers, the test layer is treated as neutral (not a penalty).
- Challenge score combines implementation, architecture, quality, best-practices, test evidence, and AI review layers.

## Done Definition (Learner Self-Check)

1. The scoped file(s) are implemented and not placeholders.
2. The export `solve_19_https_tls_api_hardening` exists and is callable.
3. Required architecture signals above are visible in your code.
4. Run review command: `npm run review:challenge -- --course=03-express-rest-api-development --challenge=19-https-tls-api-hardening`.

## Evaluation Layers

- Functional tests
- Code quality
- Architecture checks
- Best-practices checks
- E2E/API behavior checks
- AI review
