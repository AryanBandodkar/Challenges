import { execFileSync } from 'child_process';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { pathToFileURL } from 'url';
import { resolveRepoRoot } from '../shared/utils/root.js';

const ROOT = resolveRepoRoot(import.meta.url);

function readJson(filePath, fallback = null) {
  if (!existsSync(filePath)) {
    return fallback;
  }

  const raw = readFileSync(filePath, 'utf-8').replace(/^\uFEFF/, '');
  return JSON.parse(raw);
}

function normalizePath(value) {
  return value.replace(/\\/g, '/');
}

function getArg(name, fallback = null) {
  const entry = process.argv.find((value) => value.startsWith(`--${name}=`));
  return entry ? entry.split('=')[1] : fallback;
}

export function getChangedChallenges({ ref = 'HEAD~1', rootDir = ROOT } = {}) {
  const pathwayConfig = readJson(join(rootDir, 'pathway-review', 'pathway-config.json'));
  if (!pathwayConfig) {
    return [];
  }

  let changedFiles = [];

  try {
    const diff = execFileSync('git', ['diff', '--name-only', ref, 'HEAD'], {
      cwd: rootDir,
      stdio: 'pipe'
    })
      .toString()
      .trim();

    changedFiles = diff
      ? diff.split(/\r?\n/).map((file) => normalizePath(file.trim())).filter(Boolean)
      : [];
  } catch {
    return [];
  }

  const changed = new Map();

  for (const course of pathwayConfig.courses) {
    const courseDir = join(rootDir, 'courses', course.id);
    const courseConfig = readJson(join(courseDir, 'course-config.json'));
    if (!courseConfig) {
      continue;
    }

    for (const challenge of courseConfig.challenges) {
      const metadata = readJson(
        join(courseDir, 'project', 'challenges', challenge.id, 'metadata.json'),
        challenge
      );

      const challengeFolder = normalizePath(`courses/${course.id}/project/challenges/${challenge.id}/`);
      const trackedFiles = (metadata.filesToCheck || []).map((relativePath) =>
        normalizePath(`courses/${course.id}/project/${relativePath}`)
      );

      const matched = changedFiles.some((file) => file.startsWith(challengeFolder) || trackedFiles.includes(file));
      if (matched) {
        const key = `${course.id}::${challenge.id}`;
        changed.set(key, {
          courseId: course.id,
          challengeId: challenge.id
        });
      }
    }
  }

  return Array.from(changed.values());
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isMain) {
  const ref = getArg('ref', 'HEAD~1');
  const changed = getChangedChallenges({ ref });
  console.log(JSON.stringify(changed, null, 2));
}
