import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { pathToFileURL } from 'url';
import { resolveRepoRoot } from '../shared/utils/root.js';
import { getChangedChallenges } from './get-changed-challenges.js';
import { updateProgress } from './update-progress.js';

const ROOT = resolveRepoRoot(import.meta.url);

function getArg(name, fallback = null) {
  const entry = process.argv.find((value) => value.startsWith(`--${name}=`));
  return entry ? entry.split('=')[1] : fallback;
}

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, 'utf-8').replace(/^\uFEFF/, ''));
}

async function runAllCoursesReview() {
  const pathwayConfig = readJson(join(ROOT, 'pathway-review', 'pathway-config.json'));
  if (!pathwayConfig || !Array.isArray(pathwayConfig.courses)) {
    throw new Error('Invalid pathway configuration.');
  }
  const reviewed = [];

  for (const course of pathwayConfig.courses) {
    const reviewEnginePath = join(ROOT, 'courses', course.id, 'review-engine', 'index.js');
    if (!existsSync(reviewEnginePath)) {
      continue;
    }

    const reviewModule = await import(pathToFileURL(reviewEnginePath).href);
    const result = await reviewModule.runReview();
    if (!result?.summary) {
      throw new Error(`Review engine for ${course.id} returned invalid output.`);
    }
    reviewed.push({
      courseId: course.id,
      reviewedChallenges: result.reviewedChallenges.length,
      averageScore: result.summary.averageScore
    });
  }

  return reviewed;
}

async function runReviewChanged() {
  const ref = getArg('ref', 'HEAD~1');
  const fallback = getArg('fallback', 'all');
  if (!['all', 'none'].includes(fallback)) {
    throw new Error(`Invalid --fallback value "${fallback}". Use "all" or "none".`);
  }
  const changed = getChangedChallenges({ ref, rootDir: ROOT });

  if (changed.length === 0) {
    let reviewed = [];
    if (fallback === 'all') {
      reviewed = await runAllCoursesReview();
    }

    const pathwaySummary = updateProgress({ rootDir: ROOT });
    console.log(JSON.stringify({ changedCount: 0, fallbackMode: fallback, reviewed, pathwaySummary }, null, 2));
    return;
  }

  const reviewed = [];

  for (const entry of changed) {
    const reviewEnginePath = join(ROOT, 'courses', entry.courseId, 'review-engine', 'index.js');
    if (!existsSync(reviewEnginePath)) {
      continue;
    }

    const reviewModule = await import(pathToFileURL(reviewEnginePath).href);
    const result = await reviewModule.runReview({ challengeId: entry.challengeId });
    if (!result?.summary) {
      throw new Error(`Review engine for ${entry.courseId} returned invalid output.`);
    }
    reviewed.push({
      courseId: entry.courseId,
      challengeId: entry.challengeId,
      score: result.summary.challengeResults.find((item) => item.challengeId === entry.challengeId)?.score ?? 0
    });
  }

  const pathwaySummary = updateProgress({ rootDir: ROOT });
  console.log(JSON.stringify({ changedCount: changed.length, fallbackMode: fallback, reviewed, pathwaySummary }, null, 2));
}

runReviewChanged().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
