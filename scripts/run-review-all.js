import { join } from 'path';
import { pathToFileURL } from 'url';
import { existsSync, readFileSync } from 'fs';
import { resolveRepoRoot } from '../shared/utils/root.js';
import { updateProgress } from './update-progress.js';

const ROOT = resolveRepoRoot(import.meta.url);

function readJson(filePath) {
  const raw = readFileSync(filePath, 'utf-8').replace(/^\uFEFF/, '');
  return JSON.parse(raw);
}

async function runReviewAll() {
  const pathwayConfig = readJson(join(ROOT, 'pathway-review', 'pathway-config.json'));
  if (!pathwayConfig || !Array.isArray(pathwayConfig.courses)) {
    throw new Error('Invalid pathway configuration.');
  }
  const reviews = [];

  for (const course of pathwayConfig.courses) {
    const reviewEnginePath = join(ROOT, 'courses', course.id, 'review-engine', 'index.js');
    if (!existsSync(reviewEnginePath)) {
      throw new Error(`Missing review engine for ${course.id}: ${reviewEnginePath}`);
    }
    const reviewModule = await import(pathToFileURL(reviewEnginePath).href);
    const result = await reviewModule.runReview();
    if (!result?.summary) {
      throw new Error(`Review engine for ${course.id} returned invalid result.`);
    }
    reviews.push({
      courseId: course.id,
      averageScore: result.summary.averageScore,
      completionPercentage: result.summary.completionPercentage,
      reviewedChallenges: result.reviewedChallenges.length
    });
  }

  const pathwaySummary = updateProgress({ rootDir: ROOT });
  console.log(JSON.stringify({ reviews, pathwaySummary }, null, 2));
}

runReviewAll().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
