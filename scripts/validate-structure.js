import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { pathToFileURL } from 'url';
import { resolveRepoRoot } from '../shared/utils/root.js';
import { AVAILABLE_PATTERN_KEYS } from '../shared/review-engine/index.js';

const ROOT = resolveRepoRoot(import.meta.url);

const SCORING_KEYS = ['functionalTests', 'codeQuality', 'architecture', 'bestPractices', 'e2eTests', 'aiReview'];
const VALID_SOURCE_EXTENSIONS = new Set(['js', 'ts']);
const CHALLENGE_ID_RE = /^[a-z0-9]+(?:-[a-z0-9]+)+$/;

function readJson(filePath) {
  const raw = readFileSync(filePath, 'utf-8').replace(/^\uFEFF/, '');
  return JSON.parse(raw);
}

function fail(message) {
  throw new Error(message);
}

function isString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function asFiniteNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function arraysEqual(a, b) {
  if (!Array.isArray(a) || !Array.isArray(b)) {
    return false;
  }
  if (a.length !== b.length) {
    return false;
  }
  for (let i = 0; i < a.length; i += 1) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}

function validateBadgeLevels({ badgeLevels, scope }) {
  if (!badgeLevels || typeof badgeLevels !== 'object') {
    fail(`${scope} missing badgeLevels object`);
  }

  for (const [badge, rule] of Object.entries(badgeLevels)) {
    const minScore = asFiniteNumber(rule?.minScore);
    const minCompletion = asFiniteNumber(rule?.minCompletion);
    if (minScore === null || minScore < 0 || minScore > 100) {
      fail(`${scope} badge ${badge} has invalid minScore`);
    }
    if (minCompletion === null || minCompletion < 0 || minCompletion > 100) {
      fail(`${scope} badge ${badge} has invalid minCompletion`);
    }
  }
}

function validateScoring({ scoring, courseId }) {
  if (!scoring || typeof scoring !== 'object') {
    fail(`${courseId} missing scoring object`);
  }

  let sum = 0;
  for (const key of SCORING_KEYS) {
    const value = asFiniteNumber(scoring[key]);
    if (value === null || value < 0) {
      fail(`${courseId} scoring.${key} must be a non-negative number`);
    }
    sum += value;
  }

  if (sum <= 0) {
    fail(`${courseId} has invalid scoring weights (sum <= 0)`);
  }
}

function validateRequirements({ requirements, courseId }) {
  if (!requirements || typeof requirements !== 'object') {
    fail(`${courseId} missing requirements object`);
  }

  const minScore = asFiniteNumber(requirements.minScore);
  const minCompletion = asFiniteNumber(requirements.minCompletion);
  if (minScore === null || minScore < 0 || minScore > 100) {
    fail(`${courseId} requirements.minScore must be between 0 and 100`);
  }
  if (minCompletion === null || minCompletion < 0 || minCompletion > 100) {
    fail(`${courseId} requirements.minCompletion must be between 0 and 100`);
  }
}

function validateChallengeMetadata({ courseId, courseDir, challenge }) {
  const metadataPath = join(courseDir, 'project', 'challenges', challenge.id, 'metadata.json');
  const readmePath = join(courseDir, 'project', 'challenges', challenge.id, 'README.md');
  if (!existsSync(metadataPath)) {
    fail(`Missing metadata: ${courseId}/${challenge.id}`);
  }
  if (!existsSync(readmePath)) {
    fail(`Missing README: ${courseId}/${challenge.id}`);
  }

  const metadata = readJson(metadataPath);
  if (metadata.challengeId !== challenge.id) {
    fail(`metadata.challengeId mismatch for ${courseId}/${challenge.id}`);
  }
  if (metadata.moduleId !== challenge.moduleId) {
    fail(`metadata.moduleId mismatch for ${courseId}/${challenge.id}`);
  }
  if (!arraysEqual(metadata.filesToCheck || [], challenge.filesToCheck || [])) {
    fail(`metadata.filesToCheck mismatch for ${courseId}/${challenge.id}`);
  }
  if (!arraysEqual(metadata.patternsRequired || [], challenge.patternsRequired || [])) {
    fail(`metadata.patternsRequired mismatch for ${courseId}/${challenge.id}`);
  }
  if (!Array.isArray(metadata.filesToCheck) || metadata.filesToCheck.length === 0) {
    fail(`metadata.filesToCheck missing for ${courseId}/${challenge.id}`);
  }

  for (const relativeFile of metadata.filesToCheck) {
    const sourcePath = join(courseDir, 'project', relativeFile);
    if (!existsSync(sourcePath)) {
      fail(`Missing source for ${courseId}/${challenge.id}: ${relativeFile}`);
    }
  }
}

export function validateStructure({ rootDir = ROOT } = {}) {
  const requiredRoot = ['courses', 'scripts', 'shared', 'pathway-review', 'learner-results', 'README.md'];
  for (const entry of requiredRoot) {
    if (!existsSync(join(rootDir, entry))) {
      fail(`Missing root path: ${entry}`);
    }
  }

  const pathwayConfigPath = join(rootDir, 'pathway-review', 'pathway-config.json');
  if (!existsSync(pathwayConfigPath)) {
    fail('Missing pathway-review/pathway-config.json');
  }

  const pathwayConfig = readJson(pathwayConfigPath);
  if (!isString(pathwayConfig.pathwayName)) {
    fail('pathwayName must be a non-empty string');
  }
  if (!isString(pathwayConfig.pathwayVersion)) {
    fail('pathwayVersion must be a non-empty string');
  }
  if (!Array.isArray(pathwayConfig.courses) || pathwayConfig.courses.length === 0) {
    fail('pathway config has no courses');
  }
  validateBadgeLevels({ badgeLevels: pathwayConfig.badgeLevels, scope: 'pathway config' });

  let challengeCount = 0;
  const seenCourseIds = new Set();
  const seenChallengeIds = new Map();
  const knownPatternKeys = new Set(AVAILABLE_PATTERN_KEYS);

  for (const course of pathwayConfig.courses) {
    if (!isString(course.id)) {
      fail('Each pathway course must include a non-empty id');
    }
    if (!isString(course.name)) {
      fail(`Course ${course.id} has invalid name`);
    }
    const courseWeight = asFiniteNumber(course.weight);
    if (courseWeight === null || courseWeight < 0) {
      fail(`Course ${course.id} has invalid weight`);
    }

    if (seenCourseIds.has(course.id)) {
      fail(`Duplicate course id in pathway config: ${course.id}`);
    }
    seenCourseIds.add(course.id);

    const courseDir = join(rootDir, 'courses', course.id);
    const courseConfigPath = join(courseDir, 'course-config.json');
    const reviewEnginePath = join(courseDir, 'review-engine', 'index.js');

    if (!existsSync(courseConfigPath)) {
      fail(`Missing ${course.id}/course-config.json`);
    }
    if (!existsSync(reviewEnginePath)) {
      fail(`Missing ${course.id}/review-engine/index.js`);
    }

    const courseConfig = readJson(courseConfigPath);
    if (courseConfig.courseId !== course.id) {
      fail(`course-config courseId mismatch in ${course.id}`);
    }
    if (!isString(courseConfig.courseName)) {
      fail(`${course.id} has invalid courseName in course-config.json`);
    }
    if (!VALID_SOURCE_EXTENSIONS.has(courseConfig.sourceExtension)) {
      fail(`${course.id} has invalid sourceExtension (expected "js" or "ts")`);
    }
    if (!Array.isArray(courseConfig.challenges) || courseConfig.challenges.length === 0) {
      fail(`${course.id} has no challenges in course-config.json`);
    }
    if (!Array.isArray(courseConfig.modules) || courseConfig.modules.length === 0) {
      fail(`${course.id} has no modules in course-config.json`);
    }

    validateScoring({ scoring: courseConfig.scoring, courseId: course.id });
    validateRequirements({ requirements: courseConfig.requirements, courseId: course.id });
    validateBadgeLevels({ badgeLevels: courseConfig.badgeLevels, scope: `course ${course.id}` });

    const moduleIds = new Set();
    for (const module of courseConfig.modules) {
      if (!isString(module.id)) {
        fail(`${course.id} has module with invalid id`);
      }
      if (!isString(module.name)) {
        fail(`${course.id}/${module.id} has invalid module name`);
      }
      if (moduleIds.has(module.id)) {
        fail(`Duplicate module id in ${course.id}: ${module.id}`);
      }
      moduleIds.add(module.id);
    }

    const localChallengeIds = new Set();
    for (const challenge of courseConfig.challenges) {
      if (!isString(challenge.id)) {
        fail(`${course.id} has challenge with invalid id`);
      }
      if (!CHALLENGE_ID_RE.test(challenge.id)) {
        fail(`${course.id}/${challenge.id} has invalid id format (use kebab-case)`);
      }
      if (!isString(challenge.name)) {
        fail(`${course.id}/${challenge.id} has invalid challenge name`);
      }
      if (!isString(challenge.moduleId) || !moduleIds.has(challenge.moduleId)) {
        fail(`Challenge ${course.id}/${challenge.id} references unknown moduleId ${challenge.moduleId}`);
      }
      if (!Array.isArray(challenge.filesToCheck) || challenge.filesToCheck.length === 0) {
        fail(`Challenge ${course.id}/${challenge.id} must define filesToCheck`);
      }
      if (!Array.isArray(challenge.patternsRequired)) {
        fail(`Challenge ${course.id}/${challenge.id} patternsRequired must be an array`);
      }

      for (const patternKey of challenge.patternsRequired) {
        if (!knownPatternKeys.has(patternKey)) {
          fail(`Challenge ${course.id}/${challenge.id} uses unknown pattern key "${patternKey}"`);
        }
      }

      if (localChallengeIds.has(challenge.id)) {
        fail(`Duplicate challenge id in ${course.id}: ${challenge.id}`);
      }
      localChallengeIds.add(challenge.id);

      if (seenChallengeIds.has(challenge.id)) {
        fail(
          `Duplicate challenge id across courses: ${challenge.id} in ${course.id} and ${seenChallengeIds.get(challenge.id)}`
        );
      }
      seenChallengeIds.set(challenge.id, course.id);

      challengeCount += 1;
      validateChallengeMetadata({ courseId: course.id, courseDir, challenge });
    }
  }

  return {
    courseCount: pathwayConfig.courses.length,
    challengeCount,
    knownPatternCount: AVAILABLE_PATTERN_KEYS.length
  };
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isMain) {
  try {
    const report = validateStructure();
    console.log(
      `Structure valid. Courses: ${report.courseCount}, Challenges: ${report.challengeCount}, Pattern keys: ${report.knownPatternCount}`
    );
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}
