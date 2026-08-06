import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { pathToFileURL } from 'url';
import { resolveRepoRoot } from '../shared/utils/root.js';
import { getArg, hasFlag } from '../shared/utils/cli-args.js';
import { buildCourseSummarySeed, buildSourceStub } from './scaffold-challenges.js';
import { updateProgress } from './update-progress.js';

const ROOT = resolveRepoRoot(import.meta.url);

function readJson(filePath) {
  const raw = readFileSync(filePath, 'utf-8').replace(/^\uFEFF/, '');
  return JSON.parse(raw);
}

function writeJson(filePath, data) {
  mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf-8');
}

function writeText(filePath, content) {
  mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, content.endsWith('\n') ? content : `${content}\n`, 'utf-8');
}

function resolveFilesToCheck(challenge, ext) {
  if (Array.isArray(challenge.filesToCheck) && challenge.filesToCheck.length > 0) {
    return challenge.filesToCheck;
  }

  return [`src/challenges/${challenge.id}/index.${ext}`];
}

function buildSupportingFileStub(challenge, relativePath, ext) {
  if (ext === 'ts') {
    return `// TODO: Implement supporting file for ${challenge.id} - ${challenge.name}\n// File: ${relativePath}\nexport {};\n`;
  }

  return `// TODO: Implement supporting file for ${challenge.id} - ${challenge.name}\n// File: ${relativePath}\nexport {};\n`;
}

function resetCourseResults(courseDir, courseConfig) {
  const resultsDir = join(courseDir, 'results');
  mkdirSync(resultsDir, { recursive: true });

  writeJson(join(resultsDir, 'challenge-results.json'), []);
  writeJson(join(resultsDir, 'ai-feedback.json'), []);
  writeJson(join(resultsDir, 'course-summary.json'), buildCourseSummarySeed(courseConfig));
}

function resetCourseTasks(courseDir, courseConfig) {
  const ext = courseConfig.sourceExtension || 'js';
  let resetCount = 0;

  for (const challenge of courseConfig.challenges) {
    const filesToCheck = resolveFilesToCheck(challenge, ext);
    const primaryFile = filesToCheck[0];

    for (const relativePath of filesToCheck) {
      const sourcePath = join(courseDir, 'project', relativePath);
      const content =
        relativePath === primaryFile
          ? buildSourceStub(challenge, ext)
          : buildSupportingFileStub(challenge, relativePath, ext);

      writeText(sourcePath, content);
      resetCount += 1;
    }
  }

  return resetCount;
}

export function resetCourseWorkspace({
  rootDir = ROOT,
  courseId = null,
  resetTasks = true,
  resetResults = true
} = {}) {
  if (!resetTasks && !resetResults) {
    throw new Error('Nothing to reset. Enable --tasks-only, --results-only, or use the default full reset.');
  }

  const pathwayConfig = readJson(join(rootDir, 'pathway-review', 'pathway-config.json'));
  const selectedCourses = courseId
    ? pathwayConfig.courses.filter((course) => course.id === courseId)
    : pathwayConfig.courses;

  if (selectedCourses.length === 0) {
    throw new Error(courseId ? `Course not found: ${courseId}` : 'No courses found in pathway config.');
  }

  let resetTaskFiles = 0;
  const resetCourses = [];

  for (const course of selectedCourses) {
    const courseDir = join(rootDir, 'courses', course.id);
    const courseConfigPath = join(courseDir, 'course-config.json');

    if (!existsSync(courseConfigPath)) {
      throw new Error(`Missing course config: ${courseConfigPath}`);
    }

    const courseConfig = readJson(courseConfigPath);

    if (resetTasks) {
      resetTaskFiles += resetCourseTasks(courseDir, courseConfig);
    }

    if (resetResults) {
      resetCourseResults(courseDir, courseConfig);
    }

    resetCourses.push(course.id);
  }

  let pathwaySummary = null;
  if (resetResults) {
    pathwaySummary = updateProgress({ rootDir });
  }

  return {
    resetCourses,
    resetTaskFiles,
    resetResults,
    resetTasks,
    pathwaySummary
  };
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isMain) {
  try {
    const courseId = getArg('course');
    const resetTasks = !hasFlag('results-only');
    const resetResults = !hasFlag('tasks-only');
    const summary = resetCourseWorkspace({ courseId, resetTasks, resetResults });

    const scope = courseId ? `course ${courseId}` : `${summary.resetCourses.length} course(s)`;
    const actions = [
      resetTasks ? `${summary.resetTaskFiles} task file(s)` : null,
      resetResults ? 'all result files' : null
    ]
      .filter(Boolean)
      .join(' and ');

    console.log(`Reset ${actions} for ${scope}.`);

    if (summary.pathwaySummary) {
      console.log(
        `Progress updated. Score ${summary.pathwaySummary.overallScore}%, completion ${summary.pathwaySummary.completionPercentage}% (${summary.pathwaySummary.completedChallenges}/${summary.pathwaySummary.totalChallenges}).`
      );
    }
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}
