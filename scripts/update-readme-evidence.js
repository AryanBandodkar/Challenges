import { pathToFileURL } from 'url';
import { resolveRepoRoot } from '../shared/utils/root.js';
import { updateProgress } from './update-progress.js';

const ROOT = resolveRepoRoot(import.meta.url);

export function updateReadmeEvidence({ rootDir = ROOT } = {}) {
  return updateProgress({ rootDir });
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isMain) {
  try {
    const summary = updateReadmeEvidence({ rootDir: ROOT });
    console.log(
      `README evidence updated. Score ${summary.overallScore}%, completion ${summary.completionPercentage}%.`
    );
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}
