# Node.js Backend Challenge Engine

This repo is a config-driven challenge engine for evaluating learner outcomes across:

- JavaScript Fundamentals & Async Programming
- Node.js Core Fundamentals
- Express.js & RESTful API Development
- TypeScript for Backend Development
- NestJS Enterprise Framework

The challenge catalog is based on module concepts only (project ideas are intentionally excluded).

Reference alignment note: `docs/original-system-alignment.md` documents parity and intentional differences versus the original system blueprint.

## Prerequisites

- Node.js 20+ (required for global `fetch` and ESM runtime behavior).
- npm 10+.

## Engine Principles

- Deterministic review flow and reproducible scoring
- Evidence-first tracking (`results/*.json`, `learner-results/progress.json`)
- Config-first scale: add courses/challenges without changing core process
- Learner-ready stubs: challenge folders contain instructions + metadata, not solutions

## Standard Flow

1. Define course and challenge metadata in `courses/*/course-config.json`.
2. Run `npm run setup` to scaffold challenge folders and learner stubs.
3. Run `npm run readmes:refresh` after metadata updates so all challenge READMEs stay aligned with review expectations.
4. Run review commands (`review:challenge`, `review:course`, `review:changed`, `review:all`).
5. Review engine writes challenge and course results, then progress and README evidence update automatically.

## Learner Quick Start

1. Run `npm run setup` once to scaffold local challenge workspace.
2. In each course folder you work in, install `nodemon` with `npm install --save-dev nodemon`.
3. Pick one challenge README under `courses/<course-id>/project/challenges/<challenge-id>/README.md`.
4. Implement only the scoped file(s) listed in that README.
5. If you want to see the project working before review, update that course project's `main.js` and run `npm run dev` from `courses/<course-id>/project`.
6. Run `npm run review:challenge -- --course=<courseId> --challenge=<challengeId>`.
7. Iterate until the challenge passes.

## Review Commands

Run these commands from the challenge-engine root folder (this repository root).

- `npm run readmes:refresh`
- `npm run review:challenge -- --course=<courseId> --challenge=<challengeId>`
- `npm run review:course -- --course=<courseId>`
- `npm run review:changed -- --ref=HEAD~1`
- `npm run review:all`
- `npm run readme:evidence`
- `npm run release:check`
- `npm run ci:validate`

## Dashboard Commands

- `npm run dashboard:setup`
- `npm run dashboard:dev` (API on `http://localhost:7700`, UI with HMR on `http://localhost:5174`)
- `npm run dashboard:build`
- `npm run dashboard` (serves built UI + API from port `7700`)

Dashboard docs: `dashboard/README.md`

## AI Review Notes

- Copy `.env.example` to `.env` only in internal maintainer environments.
- Never ship a real `GROQ_API_KEY` to learner distributions.
- `GROQ_API_KEY` is read from `.env` (or shell env var).
- AI review only runs when challenge code is substantial; placeholder stubs are skipped.
- Optional env vars: `GROQ_MODEL`, `AI_REVIEW_MAX_FILES`, `AI_REVIEW_MAX_CHARS`.

## Generated Outputs

- `pathway-review/pathway-summary.json`: pathway-level scores and completion.
- `pathway-review/skill-breakdown.json`: skill-level appearance and pass-rate analysis.
- `learner-results/progress.json`: learner-facing aggregated progress snapshot.

## Progress Summary

<!-- PROGRESS_SUMMARY_START -->
- Overall Score: **4.78%**
- Completion: **4.35%** (3/69)
- Badge Level: **none**

| Course | Score | Completion | Badge |
|---|---:|---:|---|
| JavaScript Fundamentals & Async Programming | 31.88% | 37.5% | none |
| Node.js Core Fundamentals | 0% | 0% | none |
| Express.js & RESTful API Development | 0% | 0% | none |
| TypeScript for Backend Development | 0% | 0% | none |
| NestJS Enterprise Framework | 0% | 0% | none |
<!-- PROGRESS_SUMMARY_END -->
