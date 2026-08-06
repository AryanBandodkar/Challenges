import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import {
  PATTERN_MATCHERS,
  isPlaceholder,
  matchRequiredPatterns
} from '../challenge-patterns.js';
import {
  CHALLENGE_EXTRA_REQUIRED_PATTERNS,
  CHALLENGE_FORBIDDEN_PATTERNS,
  CHALLENGE_RETURN_PROFILES,
  DEFAULT_RETURN_PROFILE
} from '../challenge-test-specs.js';
import { assertReturnProfile, assertSourceProfile } from './behaviors.js';

export {
  PATTERN_MATCHERS,
  isPlaceholder,
  matchRequiredPatterns,
  CHALLENGE_FORBIDDEN_PATTERNS,
  CHALLENGE_RETURN_PROFILES,
  DEFAULT_RETURN_PROFILE
};

export { assertReturnProfile, assertSourceProfile, resolveSolverResult } from './behaviors.js';

const COMMON_FORBIDDEN = [
  { patternKey: 'var', pattern: /\bvar\s+/, message: 'Avoid using var' },
  { patternKey: 'consoleLog', pattern: /console\.log\s*\(/, message: 'Avoid unnecessary console.log()' }
];

export function readChallengeSources(projectDir, filesToCheck) {
  return filesToCheck.map((relativePath) => {
    const absolutePath = join(projectDir, relativePath);
    const source = readFileSync(absolutePath, 'utf-8');
    return { relativePath, absolutePath, source };
  });
}

export function readChallengeSourceFromTest(testMetaUrl, relativePath) {
  const projectDir = dirname(dirname(fileURLToPath(testMetaUrl)));
  const absolutePath = join(projectDir, relativePath);
  return {
    projectDir,
    relativePath,
    absolutePath,
    source: readFileSync(absolutePath, 'utf-8')
  };
}

export function assertNoPlaceholder(source, label = 'challenge source') {
  assert.ok(!isPlaceholder(source), `${label} must not contain placeholder stubs (TODO / Not implemented)`);
}

export function assertRequiredPatterns(source, patternsRequired, label = 'challenge source') {
  const { missing } = matchRequiredPatterns(source, patternsRequired);
  assert.equal(
    missing.length,
    0,
    `${label} is missing required patterns: ${missing.join(', ')}`
  );
}

export function assertForbiddenPatterns(source, forbidden = [], label = 'challenge source') {
  for (const rule of forbidden) {
    const matcher = rule.pattern ?? (rule.patternKey ? PATTERN_MATCHERS[rule.patternKey] : null);
    assert.ok(matcher, `Unknown forbidden pattern rule: ${rule.patternKey || rule.message}`);
    assert.doesNotMatch(
      source,
      matcher,
      `${label}: ${rule.message}`
    );
  }
}

export function assertCommonSourceRules(source, label = 'challenge source') {
  assertForbiddenPatterns(source, COMMON_FORBIDDEN, label);
}

export function getChallengeForbiddenPatterns(challengeId) {
  return [...COMMON_FORBIDDEN, ...(CHALLENGE_FORBIDDEN_PATTERNS[challengeId] || [])];
}

export function getChallengeRequiredPatterns(challengeId, patternsRequired = []) {
  const extra = CHALLENGE_EXTRA_REQUIRED_PATTERNS[challengeId] || [];
  return [...new Set([...patternsRequired, ...extra])];
}

export function getChallengeReturnProfile(challengeId) {
  return CHALLENGE_RETURN_PROFILES[challengeId] || DEFAULT_RETURN_PROFILE;
}

export function runChallengeSourceChecks({
  challengeId,
  filesToCheck,
  patternsRequired = [],
  testMetaUrl
}) {
  const projectDir = dirname(dirname(fileURLToPath(testMetaUrl)));
  const sources = readChallengeSources(projectDir, filesToCheck);
  const combinedSource = sources.map((file) => file.source).join('\n');
  const requiredPatterns = getChallengeRequiredPatterns(challengeId, patternsRequired);
  const forbiddenPatterns = getChallengeForbiddenPatterns(challengeId);
  const returnProfile = getChallengeReturnProfile(challengeId);

  for (const file of sources) {
    assertNoPlaceholder(file.source, file.relativePath);
    assertCommonSourceRules(file.source, file.relativePath);
  }

  assertRequiredPatterns(combinedSource, requiredPatterns, 'scoped challenge files');
  assertForbiddenPatterns(combinedSource, forbiddenPatterns, 'scoped challenge files');
  assertSourceProfile(returnProfile, combinedSource);

  return { combinedSource, returnProfile, projectDir };
}

export async function runChallengeBehaviorChecks(solver, returnProfile) {
  assert.equal(typeof solver, 'function', 'exported solver must be a function');
  await assertReturnProfile(returnProfile, solver());
}

export function solverImportUrl(projectDir, relativePath) {
  return pathToFileURL(join(projectDir, relativePath)).href;
}
