# Challenge Engine Dashboard

Central dashboard for the Node.js challenge engine.

## What It Does

- Reads pathway/course/challenge progress from repository JSON files.
- Lets learners browse courses and challenges.
- Shows challenge instructions from Markdown (`README.md` in challenge folders).
- Triggers review runs for a challenge and updates UI after new results are written.

## API Server

Runs on port `7700` by default.

### Endpoints

- `GET /api/health`
- `GET /api/progress`
- `GET /api/courses?page=1&limit=20&q=express`
- `GET /api/courses/:courseId`
- `GET /api/courses/:courseId/challenges?page=1&limit=50&status=all|passed|not-passed&q=jwt`
- `GET /api/courses/:courseId/challenges/:challengeId`
- `POST /api/review` with body `{ "courseId": "...", "challengeId": "..." }`

`POST /api/review` starts review in a detached process and returns immediately.

## Local Run (from repository root)

- `npm run dashboard:setup`
- `npm run dashboard:dev`

This starts:

- API: `http://localhost:7700`
- UI (Vite): `http://localhost:5174`

## Production-Like Run

- `npm run dashboard:build`
- `npm run dashboard`

This serves built UI and API from the same server on port `7700`.
