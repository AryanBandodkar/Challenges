import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

export function loadDotEnv(rootDir) {
  const envPath = join(rootDir, '.env');
  if (!existsSync(envPath)) {
    return;
  }

  const content = readFileSync(envPath, 'utf-8').replace(/^\uFEFF/, '');
  const lines = content.split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }

    const separator = trimmed.indexOf('=');
    if (separator <= 0) {
      continue;
    }

    const key = trimmed.slice(0, separator).trim();
    let value = trimmed.slice(separator + 1).trim();

    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    if (process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}
