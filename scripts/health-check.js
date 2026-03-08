import { execSync } from 'child_process';
import { resolveRepoRoot } from '../shared/utils/root.js';

const ROOT = resolveRepoRoot(import.meta.url);

function run(command) {
  execSync(command, {
    cwd: ROOT,
    stdio: 'inherit'
  });
}

try {
  run('node scripts/validate-structure.js');
  run('npm run audit:topics');
  run('npm test');
  run('npm run review:changed -- --fallback=none');
  console.log('Health check passed.');
} catch (error) {
  console.error('Health check failed.');
  process.exit(1);
}
