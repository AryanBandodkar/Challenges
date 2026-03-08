import { execSync } from 'child_process';
import { pathToFileURL } from 'url';
import { resolveRepoRoot } from '../shared/utils/root.js';

const ROOT = resolveRepoRoot(import.meta.url);

function run(command) {
  execSync(command, {
    cwd: ROOT,
    stdio: 'inherit'
  });
}

export function runCiValidate() {
  run('node scripts/validate-structure.js');
  run('node scripts/audit-topic-alignment.js');
  run('node --test tests');
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isMain) {
  try {
    runCiValidate();
    console.log('CI validation passed.');
  } catch {
    console.error('CI validation failed.');
    process.exit(1);
  }
}
