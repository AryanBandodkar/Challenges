import { runCourseReview } from '../../../shared/review-engine/index.js';
import { resolveRepoRoot } from '../../../shared/utils/root.js';

const ROOT = resolveRepoRoot(import.meta.url);

export async function runReview({ challengeId = null } = {}) {
  return runCourseReview({
    rootDir: ROOT,
    courseId: '03-express-rest-api-development',
    challengeId
  });
}
