import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { pathToFileURL } from 'url';
import { resolveRepoRoot } from '../shared/utils/root.js';
import { buildChallengeReadme } from './scaffold-challenges.js';

const ROOT = resolveRepoRoot(import.meta.url);

function readJson(filePath) {
  const raw = readFileSync(filePath, 'utf-8').replace(/^\uFEFF/, '');
  return JSON.parse(raw);
}

export function refreshChallengeReadmes() {
  const pathwayConfig = readJson(join(ROOT, 'pathway-review', 'pathway-config.json'));
  let updated = 0;

  for (const course of pathwayConfig.courses) {
    const courseDir = join(ROOT, 'courses', course.id);
    const courseConfig = readJson(join(courseDir, 'course-config.json'));
    const ext = courseConfig.sourceExtension || 'js';

    for (const challenge of courseConfig.challenges) {
      const readmePath = join(courseDir, 'project', 'challenges', challenge.id, 'README.md');
      const content = buildChallengeReadme(
        {
          ...challenge,
          courseIdHint: course.id,
          minPassScore: courseConfig.requirements?.minScore ?? 80
        },
        ext
      );
      writeFileSync(readmePath, content.endsWith('\n') ? content : `${content}\n`, 'utf-8');
      updated += 1;
    }
  }

  return updated;
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isMain) {
  try {
    const updated = refreshChallengeReadmes();
    console.log(`Refreshed ${updated} challenge README file(s).`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}
