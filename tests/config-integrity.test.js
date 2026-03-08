import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { resolveRepoRoot } from '../shared/utils/root.js';
import { buildChallengeReadme } from '../scripts/scaffold-challenges.js';
import { validateStructure } from '../scripts/validate-structure.js';

const ROOT = resolveRepoRoot(import.meta.url);

function readJson(filePath) {
  const raw = readFileSync(filePath, 'utf-8').replace(/^\uFEFF/, '');
  return JSON.parse(raw);
}

function normalizeText(text) {
  return text.replace(/\r\n/g, '\n').trimEnd();
}

test('validateStructure reports expected high-level counts', () => {
  const report = validateStructure({ rootDir: ROOT });
  assert.equal(report.courseCount, 5);
  assert.ok(report.challengeCount >= 60);
  assert.ok(report.knownPatternCount >= 60);
});

test('pathway config has 5 courses and normalized weights', () => {
  const pathwayConfig = readJson(join(ROOT, 'pathway-review', 'pathway-config.json'));
  assert.equal(pathwayConfig.courses.length, 5);

  const sum = pathwayConfig.courses.reduce((acc, course) => acc + course.weight, 0);
  assert.ok(Math.abs(sum - 1) < 1e-9, `expected weight sum 1, got ${sum}`);
});

test('each course config has module-backed challenges and valid files', () => {
  const pathwayConfig = readJson(join(ROOT, 'pathway-review', 'pathway-config.json'));

  for (const course of pathwayConfig.courses) {
    const courseDir = join(ROOT, 'courses', course.id);
    const courseConfigPath = join(courseDir, 'course-config.json');
    assert.ok(existsSync(courseConfigPath), `missing ${courseConfigPath}`);

    const courseConfig = readJson(courseConfigPath);
    assert.ok(courseConfig.challenges.length > 0, `${course.id} has no challenges`);

    const moduleIds = new Set(courseConfig.modules.map((module) => module.id));

    for (const challenge of courseConfig.challenges) {
      assert.ok(moduleIds.has(challenge.moduleId), `${course.id}/${challenge.id} has unknown moduleId`);

      const metadataPath = join(courseDir, 'project', 'challenges', challenge.id, 'metadata.json');
      const readmePath = join(courseDir, 'project', 'challenges', challenge.id, 'README.md');
      assert.ok(existsSync(metadataPath), `missing ${metadataPath}`);
      assert.ok(existsSync(readmePath), `missing ${readmePath}`);

      const metadata = readJson(metadataPath);
      assert.equal(metadata.challengeId, challenge.id);
      assert.ok(Array.isArray(metadata.filesToCheck) && metadata.filesToCheck.length > 0);

      for (const relative of metadata.filesToCheck) {
        const sourcePath = join(courseDir, 'project', relative);
        assert.ok(existsSync(sourcePath), `missing ${sourcePath}`);
      }
    }

    assert.ok(existsSync(join(courseDir, 'results', 'challenge-results.json')));
    assert.ok(existsSync(join(courseDir, 'results', 'ai-feedback.json')));
    assert.ok(existsSync(join(courseDir, 'results', 'course-summary.json')));
  }
});

test('challenge README files are aligned with generator contract', () => {
  const pathwayConfig = readJson(join(ROOT, 'pathway-review', 'pathway-config.json'));

  for (const course of pathwayConfig.courses) {
    const courseDir = join(ROOT, 'courses', course.id);
    const courseConfig = readJson(join(courseDir, 'course-config.json'));
    const ext = courseConfig.sourceExtension || 'js';

    for (const challenge of courseConfig.challenges) {
      const readmePath = join(courseDir, 'project', 'challenges', challenge.id, 'README.md');
      assert.ok(existsSync(readmePath), `missing ${readmePath}`);

      const actual = normalizeText(readFileSync(readmePath, 'utf-8'));
      const expected = normalizeText(
        buildChallengeReadme({ ...challenge, courseIdHint: course.id }, ext)
      );

      assert.equal(
        actual,
        expected,
        `README is out of sync for ${course.id}/${challenge.id}`
      );

      const solveFunction = `solve_${challenge.id.replace(/-/g, '_')}`;
      assert.ok(
        actual.includes(`\`${solveFunction}\``),
        `${course.id}/${challenge.id} missing solve function contract`
      );
      assert.ok(
        actual.includes(`--course=${course.id} --challenge=${challenge.id}`),
        `${course.id}/${challenge.id} missing review command contract`
      );

      for (const pattern of challenge.patternsRequired || []) {
        assert.ok(
          actual.includes(`\`${pattern}\``),
          `${course.id}/${challenge.id} missing pattern contract ${pattern}`
        );
      }
    }
  }
});
