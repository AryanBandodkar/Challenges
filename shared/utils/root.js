import { existsSync } from 'fs';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';

function hasRepoMarker(directory) {
  return existsSync(join(directory, 'pathway-review', 'pathway-config.json'));
}

function walkUp(startDirectory) {
  let current = resolve(startDirectory);
  while (true) {
    if (hasRepoMarker(current)) {
      return current;
    }

    const parent = dirname(current);
    if (parent === current) {
      return null;
    }
    current = parent;
  }
}

export function resolveRepoRoot(importMetaUrl, startDirectory = process.cwd()) {
  const fromStart = walkUp(startDirectory);
  if (fromStart) {
    return fromStart;
  }

  const fromScript = walkUp(dirname(fileURLToPath(importMetaUrl)));
  if (fromScript) {
    return fromScript;
  }

  throw new Error('Could not resolve repository root (pathway-review/pathway-config.json not found).');
}
