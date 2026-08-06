#!/usr/bin/env node

import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { existsSync, readFileSync } from 'fs';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';
import { runReviewChallenge } from '../scripts/run-review-challenge.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = resolve(__dirname, '..');
const DASHBOARD_PORT = Number(process.env.DASHBOARD_PORT || 7700);
const DEFAULT_COURSES_LIMIT = 20;
const DEFAULT_CHALLENGES_LIMIT = 50;

dotenv.config({ path: join(ROOT_DIR, '.env') });

const app = express();
app.use(cors());
app.use(express.json());

function readJson(filePath, fallback = null) {
  if (!existsSync(filePath)) return fallback;
  try {
    const raw = readFileSync(filePath, 'utf8').replace(/^\uFEFF/, '');
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function readText(filePath, fallback = '') {
  if (!existsSync(filePath)) return fallback;
  try {
    return readFileSync(filePath, 'utf8');
  } catch {
    return fallback;
  }
}

function getPathwayConfig() {
  return readJson(join(ROOT_DIR, 'pathway-review', 'pathway-config.json'), {
    pathwayName: 'Pathway',
    courses: [],
    badgeLevels: {}
  });
}

function getPathwaySummary() {
  return readJson(join(ROOT_DIR, 'pathway-review', 'pathway-summary.json'), null);
}

function getProgress() {
  return readJson(join(ROOT_DIR, 'learner-results', 'progress.json'), null);
}

function getCourseConfig(courseId) {
  return readJson(join(ROOT_DIR, 'courses', courseId, 'course-config.json'), null);
}

function getCourseResults(courseId) {
  const data = readJson(join(ROOT_DIR, 'courses', courseId, 'results', 'challenge-results.json'), []);
  return Array.isArray(data) ? data : [];
}

function getCourseAiFeedback(courseId) {
  const data = readJson(join(ROOT_DIR, 'courses', courseId, 'results', 'ai-feedback.json'), []);
  return Array.isArray(data) ? data : [];
}

function getChallengeMetadata(courseId, challengeId) {
  return readJson(
    join(ROOT_DIR, 'courses', courseId, 'project', 'challenges', challengeId, 'metadata.json'),
    null
  );
}

function getChallengeReadme(courseId, challengeId) {
  return readText(
    join(ROOT_DIR, 'courses', courseId, 'project', 'challenges', challengeId, 'README.md'),
    ''
  );
}

function toProgressCourseMap(progress) {
  const map = new Map();
  if (!progress || !Array.isArray(progress.courses)) return map;
  for (const item of progress.courses) {
    if (item?.id) map.set(item.id, item);
  }
  return map;
}

function toResultMap(resultEntries) {
  const map = new Map();
  for (const entry of resultEntries) {
    if (entry?.challengeId) map.set(entry.challengeId, entry);
  }
  return map;
}

function normalizeChallengeStatus(resultEntry) {
  if (!resultEntry) {
    return {
      status: 'not-run',
      passed: false,
      score: null,
      lastRun: null
    };
  }
  const passed = Boolean(resultEntry.passed);
  return {
    status: passed ? 'passed' : 'not-passed',
    passed,
    score: typeof resultEntry.score === 'number' ? resultEntry.score : null,
    lastRun: resultEntry.reviewedAt || null
  };
}

function buildProgressResponse() {
  const progress = getProgress();
  const summary = getPathwaySummary();
  const pathwayConfig = getPathwayConfig();

  const pathwayName =
    progress?.pathway ||
    summary?.pathwayName ||
    pathwayConfig?.pathwayName ||
    'Pathway';

  return {
    pathwayName,
    overallScore:
      typeof progress?.overallScore === 'number'
        ? progress.overallScore
        : typeof summary?.overallScore === 'number'
          ? summary.overallScore
          : 0,
    completionPercentage:
      typeof progress?.completionPercentage === 'number'
        ? progress.completionPercentage
        : typeof summary?.completionPercentage === 'number'
          ? summary.completionPercentage
          : 0,
    badgeLevel: progress?.badgeLevel || summary?.badgeLevel || 'none',
    totalChallenges:
      typeof progress?.totalChallenges === 'number'
        ? progress.totalChallenges
        : typeof summary?.totalChallenges === 'number'
          ? summary.totalChallenges
          : 0,
    completedChallenges:
      typeof progress?.completedChallenges === 'number'
        ? progress.completedChallenges
        : typeof summary?.completedChallenges === 'number'
          ? summary.completedChallenges
          : 0,
    courses: Array.isArray(progress?.courses) ? progress.courses : Array.isArray(summary?.courses) ? summary.courses : [],
    lastUpdated: progress?.updatedAt || summary?.generatedAt || null
  };
}

function clampInt(input, fallback, min, max) {
  const parsed = Number.parseInt(String(input ?? ''), 10);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.max(min, Math.min(max, parsed));
}

function paginate(items, page, limit) {
  const safePage = Math.max(1, page);
  const safeLimit = Math.max(1, limit);
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / safeLimit));
  const start = (safePage - 1) * safeLimit;
  return {
    items: items.slice(start, start + safeLimit),
    page: safePage,
    limit: safeLimit,
    total,
    totalPages
  };
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, port: DASHBOARD_PORT, rootDir: ROOT_DIR });
});

app.get('/api/progress', (_req, res) => {
  res.json(buildProgressResponse());
});

app.get('/api/courses', (req, res) => {
  const pathwayConfig = getPathwayConfig();
  const progress = getProgress();
  const progressCourses = toProgressCourseMap(progress);
  const query = String(req.query.q || '').trim().toLowerCase();

  const mergedCourses = (pathwayConfig.courses || []).map((course) => {
    const progressData = progressCourses.get(course.id) || {};
    const courseConfig = getCourseConfig(course.id);
    const totalChallenges =
      typeof progressData.totalChallenges === 'number'
        ? progressData.totalChallenges
        : Array.isArray(courseConfig?.challenges)
          ? courseConfig.challenges.length
          : 0;
    const completedChallenges =
      typeof progressData.completedChallenges === 'number'
        ? progressData.completedChallenges
        : 0;
    const completionPercentage =
      typeof progressData.completionPercentage === 'number'
        ? progressData.completionPercentage
        : totalChallenges > 0
          ? (completedChallenges / totalChallenges) * 100
          : 0;

    return {
      id: course.id,
      name: course.name,
      weight: course.weight ?? null,
      duration: course.duration ?? null,
      required: Boolean(course.required),
      averageScore:
        typeof progressData.averageScore === 'number' ? progressData.averageScore : 0,
      completionPercentage,
      totalChallenges,
      completedChallenges,
      badgeLevel: progressData.badgeLevel || 'none'
    };
  });

  const filtered = query
    ? mergedCourses.filter((course) => {
        return (
          course.id.toLowerCase().includes(query) ||
          course.name.toLowerCase().includes(query)
        );
      })
    : mergedCourses;

  const page = clampInt(req.query.page, 1, 1, 999);
  const limit = clampInt(req.query.limit, DEFAULT_COURSES_LIMIT, 1, 100);
  const paged = paginate(filtered, page, limit);

  res.json({
    courses: paged.items,
    page: paged.page,
    limit: paged.limit,
    total: paged.total,
    totalPages: paged.totalPages
  });
});

app.get('/api/courses/:courseId', (req, res) => {
  const { courseId } = req.params;
  const courseConfig = getCourseConfig(courseId);
  if (!courseConfig) {
    res.status(404).json({ error: 'Course not found' });
    return;
  }

  const progress = getProgress();
  const progressCourses = toProgressCourseMap(progress);
  const progressData = progressCourses.get(courseId) || {};
  const results = getCourseResults(courseId);
  const passedChallenges = results.filter((entry) => entry?.passed === true).length;

  res.json({
    courseId: courseConfig.courseId,
    courseName: courseConfig.courseName,
    duration: courseConfig.duration || null,
    sourceExtension: courseConfig.sourceExtension || null,
    modules: Array.isArray(courseConfig.modules) ? courseConfig.modules : [],
    averageScore:
      typeof progressData.averageScore === 'number' ? progressData.averageScore : 0,
    completionPercentage:
      typeof progressData.completionPercentage === 'number'
        ? progressData.completionPercentage
        : 0,
    totalChallenges:
      typeof progressData.totalChallenges === 'number'
        ? progressData.totalChallenges
        : Array.isArray(courseConfig.challenges)
          ? courseConfig.challenges.length
          : 0,
    completedChallenges:
      typeof progressData.completedChallenges === 'number'
        ? progressData.completedChallenges
        : passedChallenges,
    passedChallenges,
    badgeLevel: progressData.badgeLevel || 'none',
    scoring: courseConfig.scoring || {},
    requirements: courseConfig.requirements || {},
    badgeLevels: courseConfig.badgeLevels || {}
  });
});

app.get('/api/courses/:courseId/challenges', (req, res) => {
  const { courseId } = req.params;
  const courseConfig = getCourseConfig(courseId);
  if (!courseConfig) {
    res.status(404).json({ error: 'Course not found' });
    return;
  }

  const resultsMap = toResultMap(getCourseResults(courseId));
  const query = String(req.query.q || '').trim().toLowerCase();
  const statusFilter = String(req.query.status || 'all').toLowerCase();
  const page = clampInt(req.query.page, 1, 1, 9999);
  const limit = clampInt(req.query.limit, DEFAULT_CHALLENGES_LIMIT, 1, 200);

  const withStatus = (courseConfig.challenges || []).map((challenge) => {
    const resultEntry = resultsMap.get(challenge.id) || null;
    const status = normalizeChallengeStatus(resultEntry);
    return {
      id: challenge.id,
      name: challenge.name,
      moduleId: challenge.moduleId || null,
      moduleName: challenge.moduleName || null,
      difficulty: challenge.difficulty || null,
      estimatedTime: challenge.estimatedTime || null,
      skills: Array.isArray(challenge.skills) ? challenge.skills : [],
      ...status
    };
  });

  const filteredByStatus = withStatus.filter((item) => {
    if (statusFilter === 'all') return true;
    if (statusFilter === 'passed') return item.status === 'passed';
    if (statusFilter === 'not-passed') return item.status !== 'passed';
    return true;
  });

  const filteredByQuery = query
    ? filteredByStatus.filter((item) => {
        return (
          item.id.toLowerCase().includes(query) ||
          item.name.toLowerCase().includes(query)
        );
      })
    : filteredByStatus;

  const paged = paginate(filteredByQuery, page, limit);
  res.json({
    challenges: paged.items,
    page: paged.page,
    limit: paged.limit,
    total: paged.total,
    totalPages: paged.totalPages
  });
});

app.get('/api/courses/:courseId/challenges/:challengeId', (req, res) => {
  const { courseId, challengeId } = req.params;
  const courseConfig = getCourseConfig(courseId);
  if (!courseConfig) {
    res.status(404).json({ error: 'Course not found' });
    return;
  }

  const challenge = (courseConfig.challenges || []).find((item) => item.id === challengeId);
  if (!challenge) {
    res.status(404).json({ error: 'Challenge not found' });
    return;
  }

  const result = getCourseResults(courseId).find((item) => item.challengeId === challengeId) || null;
  const aiFeedback =
    getCourseAiFeedback(courseId).find((item) => item.challengeId === challengeId) || null;
  const metadata = getChallengeMetadata(courseId, challengeId);
  const instructions = getChallengeReadme(courseId, challengeId);
  const status = normalizeChallengeStatus(result);

  res.json({
    id: challenge.id,
    name: challenge.name,
    courseId,
    courseName: courseConfig.courseName,
    moduleId: challenge.moduleId || null,
    moduleName: challenge.moduleName || null,
    difficulty: challenge.difficulty || null,
    estimatedTime: challenge.estimatedTime || null,
    skills: Array.isArray(metadata?.skills)
      ? metadata.skills
      : Array.isArray(challenge.skills)
        ? challenge.skills
        : [],
    metadata: metadata || {},
    instructions,
    result,
    aiFeedback,
    ...status
  });
});

function getChallengeReviewedAt(courseId, challengeId) {
  const result = getCourseResults(courseId).find((item) => item.challengeId === challengeId);
  return result?.reviewedAt || null;
}

const reviewJobs = new Map();

app.post('/api/review', (req, res) => {
  const { courseId, challengeId } = req.body || {};
  if (!courseId || !challengeId) {
    res.status(400).json({ error: 'courseId and challengeId are required' });
    return;
  }

  const courseConfig = getCourseConfig(courseId);
  if (!courseConfig) {
    res.status(404).json({ error: 'Course not found' });
    return;
  }
  const challenge = (courseConfig.challenges || []).find((item) => item.id === challengeId);
  if (!challenge) {
    res.status(404).json({ error: 'Challenge not found' });
    return;
  }

  const jobKey = `${courseId}:${challengeId}`;
  const activeJob = reviewJobs.get(jobKey);
  if (activeJob?.status === 'running') {
    res.json({
      ok: true,
      started: false,
      alreadyRunning: true,
      progress: buildProgressResponse()
    });
    return;
  }

  const previousReviewedAt = getChallengeReviewedAt(courseId, challengeId);
  reviewJobs.set(jobKey, {
    status: 'running',
    startedAt: new Date().toISOString(),
    previousReviewedAt
  });

  res.json({
    ok: true,
    started: true,
    progress: buildProgressResponse()
  });

  runReviewChallenge({
    rootDir: ROOT_DIR,
    courseId,
    challengeId
  })
    .then(() => {
      reviewJobs.set(jobKey, {
        status: 'completed',
        completedAt: new Date().toISOString(),
        reviewedAt: getChallengeReviewedAt(courseId, challengeId)
      });
    })
    .catch((error) => {
      reviewJobs.set(jobKey, {
        status: 'failed',
        completedAt: new Date().toISOString(),
        error: error.message || 'Review failed'
      });
      console.error(`Review failed for ${jobKey}:`, error.message);
    });
});

const uiDistPath = join(__dirname, 'app', 'dist');

if (existsSync(uiDistPath)) {
  app.use(express.static(uiDistPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      next();
      return;
    }
    res.sendFile(join(uiDistPath, 'index.html'));
  });
} else {
  app.get('/', (_req, res) => {
    res.type('html').send(`
      <html>
        <head>
          <meta charset="utf-8" />
          <title>Challenge Engine Dashboard</title>
          <style>
            body { font-family: sans-serif; margin: 2rem; line-height: 1.5; }
            code { background: #f5f5f5; padding: 0.2rem 0.35rem; border-radius: 4px; }
          </style>
        </head>
        <body>
          <h1>Dashboard API running</h1>
          <p>Build UI once with <code>npm run dashboard:build</code>, then restart <code>npm run dashboard</code>.</p>
          <ul>
            <li><a href="/api/health">GET /api/health</a></li>
            <li><a href="/api/progress">GET /api/progress</a></li>
            <li><a href="/api/courses">GET /api/courses</a></li>
          </ul>
        </body>
      </html>
    `);
  });
}

app.listen(DASHBOARD_PORT, () => {
  console.log(`Dashboard API listening on http://localhost:${DASHBOARD_PORT}`);
});
