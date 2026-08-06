import { existsSync } from 'fs';
import { join } from 'path';
import { pathToFileURL } from 'url';
import { getArg, hasFlag } from '../shared/utils/cli-args.js';
import { resolveRepoRoot } from '../shared/utils/root.js';
import { formatReviewOutput } from './format-review-output.js';
import { updateProgress } from './update-progress.js';

const ROOT = resolveRepoRoot(import.meta.url);

export async function runReviewChallenge({ rootDir = ROOT, courseId, challengeId } = {}) {
  if (!courseId || !challengeId) {
    throw new Error('Usage: npm run review:challenge -- --course=<courseId> --challenge=<challengeId>');
  }

  const reviewEnginePath = join(rootDir, 'courses', courseId, 'review-engine', 'index.js');
  if (!existsSync(reviewEnginePath)) {
    throw new Error(`Review engine not found: ${reviewEnginePath}`);
  }

  const reviewModule = await import(pathToFileURL(reviewEnginePath).href);
  const result = await reviewModule.runReview({ challengeId });
  if (!result?.summary) {
    throw new Error(`Review engine for ${courseId} returned invalid output.`);
  }

  if (result.reviewedChallenges?.length !== 1 || result.reviewedChallenges[0] !== challengeId) {
    throw new Error(
      `Expected to review only ${challengeId}, but reviewed: ${(result.reviewedChallenges || []).join(', ') || 'none'}`
    );
  }

  const pathwaySummary = updateProgress({ rootDir });

  return {
    result,
    pathwaySummary,
    resultsDir: join(rootDir, 'courses', courseId, 'results')
  };
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isMain) {
  const courseId = getArg('course');
  const challengeId = getArg('challenge');

  runReviewChallenge({ courseId, challengeId })
    .then(({ result, pathwaySummary, resultsDir }) => {
      if (hasFlag('json')) {
        console.log(JSON.stringify({ result, pathwaySummary }, null, 2));
        return;
      }

      console.log(
        formatReviewOutput({
          result,
          pathwaySummary,
          resultsDir
        })
      );
    })
    .catch((error) => {
      console.error(error.message);
      process.exit(1);
    });
}
