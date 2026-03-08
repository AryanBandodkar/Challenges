import { readFileSync } from 'fs';
import { join } from 'path';
import { resolveRepoRoot } from '../shared/utils/root.js';

const ROOT = resolveRepoRoot(import.meta.url);

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf-8').replace(/^\uFEFF/, ''));
}

const expected = {
  '01-javascript-fundamentals-async': [
    { topic: 'ES6+ syntax', keywords: ['let/const', 'arrow', 'destructuring', 'spread'] },
    { topic: 'Template literals and strings', keywords: ['template', 'string'] },
    { topic: 'Array methods', keywords: ['map', 'filter', 'reduce', 'foreach', 'find'] },
    { topic: 'OOP classes/inheritance/prototypes', keywords: ['class', 'inheritance', 'prototype'] },
    { topic: 'Module systems', keywords: ['commonjs', 'es module', 'import/export'] },
    { topic: 'Callbacks', keywords: ['callback'] },
    { topic: 'Promises', keywords: ['promise'] },
    { topic: 'Async/await', keywords: ['async', 'await'] },
    { topic: 'Error handling patterns', keywords: ['try/catch', 'error handling', 'rejection'] },
    { topic: 'Event loop / non-blocking', keywords: ['event loop', 'non-blocking'] }
  ],
  '02-nodejs-core-fundamentals': [
    { topic: 'Runtime / V8 / event loop', keywords: ['v8', 'event loop', 'microtasks'] },
    { topic: 'FS streams buffers', keywords: ['fs', 'stream', 'buffer'] },
    { topic: 'Path and OS', keywords: ['path', 'os'] },
    { topic: 'Process management', keywords: ['process.env', 'argv', 'exit code'] },
    { topic: 'Child processes / worker threads', keywords: ['child process', 'worker thread'] },
    { topic: 'NPM/Yarn fundamentals', keywords: ['npm', 'yarn', 'package.json'] },
    { topic: 'Semver and lockfiles', keywords: ['semver', 'lockfile', 'package-lock'] },
    { topic: 'Utility libs + dotenv', keywords: ['lodash', 'dayjs', 'dotenv'] },
    { topic: 'Package publishing', keywords: ['publish', 'package exports'] },
    { topic: 'Native HTTP and routing', keywords: ['http server', 'routing'] },
    { topic: 'Headers/status/query/url parsing', keywords: ['headers', 'status', 'query', 'url'] },
    { topic: 'Error/debug/log/env config', keywords: ['error', 'debug', 'logging', 'environment'] },
    { topic: 'Graceful shutdown', keywords: ['graceful shutdown', 'sigterm', 'sigint'] }
  ],
  '03-express-rest-api-development': [
    { topic: 'Express setup/routing/middleware', keywords: ['express', 'route', 'middleware'] },
    { topic: 'Static/template basics', keywords: ['static file', 'template engine'] },
    { topic: 'Health/readiness endpoints', keywords: ['health checks', 'readiness probes'] },
    { topic: 'REST methods/status/formatting', keywords: ['rest', 'http methods', 'status codes'] },
    { topic: 'Versioning/CORS/content negotiation', keywords: ['versioning', 'cors', 'content negotiation', 'accept'] },
    { topic: 'Pagination/sorting/filtering contracts', keywords: ['pagination', 'sorting', 'filter query contracts'] },
    { topic: 'Postgres and Mongoose', keywords: ['postgres', 'mongoose'] },
    { topic: 'SQL vs NoSQL / indexing / N+1 / transactions', keywords: ['sql vs nosql', 'indexing', 'n+1', 'transaction'] },
    { topic: 'JWT/bcrypt/session/oauth', keywords: ['jwt', 'bcrypt', 'session', 'oauth'] },
    { topic: 'HTTPS + SSL/TLS', keywords: ['https', 'ssl', 'tls'] },
    { topic: 'Validation and security hardening', keywords: ['validation', 'sqli', 'xss', 'rate limiting'] },
    { topic: 'OpenAPI/testing/coverage/mocking', keywords: ['openapi', 'jest', 'integration', 'coverage', 'mocking'] },
    { topic: 'Postman/Insomnia', keywords: ['postman', 'insomnia'] }
  ],
  '04-typescript-backend-development': [
    { topic: 'Type annotations', keywords: ['type annotation', 'typed'] },
    { topic: 'Interfaces vs types', keywords: ['interfaces', 'types'] },
    { topic: 'Enums/tuples/unions/intersections', keywords: ['enum', 'tuple', 'union', 'intersection'] },
    { topic: 'Generics + guards + utility types', keywords: ['generic', 'type guard', 'utility types'] },
    { topic: 'TS config + Express typing', keywords: ['tsconfig', 'request typing', 'response typing'] },
    { topic: 'Custom defs + module resolution + path mapping', keywords: ['custom type definitions', 'module resolution', 'path mapping'] },
    { topic: 'Migration + ts-node + nodemon', keywords: ['migration', 'ts-node', 'nodemon'] },
    { topic: 'Runtime env schema validation', keywords: ['env validation', 'zod/joi schema', 'fail-fast configuration'] }
  ],
  '05-nestjs-enterprise-framework': [
    { topic: 'Modules/controllers/providers/services', keywords: ['modules', 'controllers', 'providers', 'services'] },
    { topic: 'Guards/interceptors/pipes/filters', keywords: ['guards', 'interceptors', 'pipes', 'exception filters'] },
    { topic: 'Custom decorators + metadata', keywords: ['custom decorators', 'metadata'] },
    { topic: 'TypeORM/Prisma + repository', keywords: ['typeorm', 'prisma', 'repository'] },
    { topic: 'Validation/config/logging', keywords: ['class-validator', '@nestjs/config', 'logging'] },
    { topic: 'Passport/JWT/RBAC/refresh/API key', keywords: ['passport', 'jwt', 'rbac', 'refresh token', 'api key'] },
    { topic: 'Microservices/queues/events/grpc/rest/discovery', keywords: ['microservice', 'rabbitmq', 'redis', 'event-driven', 'grpc', 'rest', 'service discovery'] },
    { topic: 'Unit/e2e/mocking/coverage/tdd', keywords: ['unit', 'e2e', 'mocking', 'coverage', 'tdd'] },
    { topic: 'Request correlation logging', keywords: ['request correlation id', 'logging context', 'interceptor'] }
  ]
};

function topicCovered(challengeText, keywords) {
  return keywords.some((keyword) => challengeText.includes(keyword));
}

const pathwayConfig = readJson(join(ROOT, 'pathway-review', 'pathway-config.json'));
const report = [];

for (const course of pathwayConfig.courses) {
  const courseConfig = readJson(join(ROOT, 'courses', course.id, 'course-config.json'));
  const challengeText = courseConfig.challenges
    .map((challenge) => [
      challenge.name,
      challenge.moduleName,
      ...(challenge.skills || [])
    ].join(' '))
    .join(' | ')
    .toLowerCase();

  const topics = expected[course.id] || [];
  const uncovered = topics.filter((entry) => !topicCovered(challengeText, entry.keywords.map((k) => k.toLowerCase())));

  report.push({
    courseId: course.id,
    courseName: courseConfig.courseName,
    totalTopics: topics.length,
    coveredTopics: topics.length - uncovered.length,
    uncovered: uncovered.map((entry) => entry.topic)
  });
}

const totalTopics = report.reduce((sum, item) => sum + item.totalTopics, 0);
const coveredTopics = report.reduce((sum, item) => sum + item.coveredTopics, 0);
const uncoveredTotal = totalTopics - coveredTopics;

console.log(JSON.stringify({ totalTopics, coveredTopics, uncoveredTotal, report }, null, 2));

if (uncoveredTotal > 0) {
  process.exit(1);
}
