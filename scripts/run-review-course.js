import { existsSync } from 'fs';
import { join } from 'path';
import { pathToFileURL } from 'url';
import { getArg, hasFlag } from '../shared/utils/cli-args.js';
import { resolveRepoRoot } from '../shared/utils/root.js';
import { formatReviewOutput } from './format-review-output.js';
import { updateProgress } from './update-progress.js';

const ROOT = resolveRepoRoot(import.meta.url);

async function runReviewCourse() {
  const courseId = getArg('course');
  const challengeId = getArg('challenge');

  if (!courseId) {
    throw new Error('Missing --course=<courseId>');
  }

  const reviewEnginePath = join(ROOT, 'courses', courseId, 'review-engine', 'index.js');
  if (!existsSync(reviewEnginePath)) {
    throw new Error(`Review engine not found: ${reviewEnginePath}`);
  }

  const reviewModule = await import(pathToFileURL(reviewEnginePath).href);
  const result = await reviewModule.runReview({ challengeId });
  if (!result?.summary) {
    throw new Error(`Review engine for ${courseId} returned invalid output.`);
  }
  const pathwaySummary = updateProgress({ rootDir: ROOT });

  if (hasFlag('json')) {
    console.log(JSON.stringify({ result, pathwaySummary }, null, 2));
    return;
  }

  console.log(
    formatReviewOutput({
      result,
      pathwaySummary,
      resultsDir: join(ROOT, 'courses', courseId, 'results')
    })
  );
}

runReviewCourse().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
