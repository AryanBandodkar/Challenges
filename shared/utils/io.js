import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';

export function readJson(filePath, fallback = null) {
  if (!existsSync(filePath)) {
    return fallback;
  }

  const raw = readFileSync(filePath, 'utf-8').replace(/^\uFEFF/, '');
  return JSON.parse(raw);
}

export function writeJson(filePath, data) {
  mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf-8');
}

export function readText(filePath, fallback = '') {
  if (!existsSync(filePath)) {
    return fallback;
  }

  return readFileSync(filePath, 'utf-8');
}

export function writeText(filePath, content) {
  mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, content.endsWith('\n') ? content : `${content}\n`, 'utf-8');
}

export function exists(filePath) {
  return existsSync(filePath);
}

export function listCourseIds(rootDir) {
  const coursesDir = join(rootDir, 'courses');
  if (!existsSync(coursesDir)) {
    return [];
  }

  return readdirSync(coursesDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

export function clampScore(value) {
  return Math.max(0, Math.min(100, value));
}

export function roundScore(value) {
  return Number(value.toFixed(2));
}
