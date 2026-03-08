import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { pathToFileURL } from 'url';
import { resolveRepoRoot } from '../shared/utils/root.js';

const ROOT = resolveRepoRoot(import.meta.url);

function readJson(filePath, fallback = null) {
  if (!existsSync(filePath)) {
    return fallback;
  }
  const raw = readFileSync(filePath, 'utf-8').replace(/^\uFEFF/, '');
  return JSON.parse(raw);
}

function writeJson(filePath, data) {
  writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf-8');
}

function round(value) {
  return Number(value.toFixed(2));
}

function asNonNegativeNumber(value, fallback = 0) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 0) {
    return fallback;
  }
  return parsed;
}

function clampTo100(value) {
  return Math.max(0, Math.min(100, value));
}

function normalizeCourseWeights(courses) {
  const safeCourses = courses.map((course) => ({
    ...course,
    weight: asNonNegativeNumber(course.weight, 0)
  }));

  const sum = safeCourses.reduce((acc, course) => acc + course.weight, 0);
  if (sum <= 0) {
    const even = safeCourses.length > 0 ? 1 / safeCourses.length : 0;
    return safeCourses.map((course) => ({ ...course, weight: even }));
  }

  return safeCourses.map((course) => ({ ...course, weight: course.weight / sum }));
}

function determineBadge(score, completion, badgeLevels) {
  const ordered = Object.entries(badgeLevels || {}).sort((a, b) => {
    const scoreDiff = (b[1]?.minScore ?? 0) - (a[1]?.minScore ?? 0);
    if (scoreDiff !== 0) {
      return scoreDiff;
    }
    return (b[1]?.minCompletion ?? 0) - (a[1]?.minCompletion ?? 0);
  });

  for (const [badge, rule] of ordered) {
    if (score >= rule.minScore && completion >= rule.minCompletion) {
      return badge;
    }
  }

  return 'none';
}

function replaceSection(content, start, end, body) {
  const startIndex = content.indexOf(start);
  const endIndex = content.indexOf(end);

  if (startIndex === -1 || endIndex === -1 || endIndex < startIndex) {
    return content;
  }

  const before = content.slice(0, startIndex + start.length);
  const after = content.slice(endIndex);
  return `${before}\n${body}\n${after}`;
}

function updateReadmes(pathwaySummary, rootDir) {
  const rootReadmePath = join(rootDir, 'README.md');
  if (existsSync(rootReadmePath)) {
    const lines = [
      `- Overall Score: **${pathwaySummary.overallScore}%**`,
      `- Completion: **${pathwaySummary.completionPercentage}%** (${pathwaySummary.completedChallenges}/${pathwaySummary.totalChallenges})`,
      `- Badge Level: **${pathwaySummary.badgeLevel}**`,
      '',
      '| Course | Score | Completion | Badge |',
      '|---|---:|---:|---|'
    ];

    for (const course of pathwaySummary.courses) {
      lines.push(`| ${course.name} | ${course.averageScore}% | ${course.completionPercentage}% | ${course.badgeLevel} |`);
    }

    const content = readFileSync(rootReadmePath, 'utf-8');
    const updated = replaceSection(
      content,
      '<!-- PROGRESS_SUMMARY_START -->',
      '<!-- PROGRESS_SUMMARY_END -->',
      lines.join('\n')
    );
    writeFileSync(rootReadmePath, updated, 'utf-8');
  }

  for (const course of pathwaySummary.courses) {
    const courseDir = join(rootDir, 'courses', course.id);
    const courseConfig = readJson(join(courseDir, 'course-config.json'));
    const courseSummary = readJson(join(courseDir, 'results', 'course-summary.json'));
    const challengeResults = readJson(join(courseDir, 'results', 'challenge-results.json'), []);
    const resultMap = new Map(challengeResults.map((item) => [item.challengeId, item]));

    const lines = [
      `- Average Score: **${courseSummary.averageScore}%**`,
      `- Completion: **${courseSummary.completionPercentage}%** (${courseSummary.completedChallenges}/${courseSummary.totalChallenges})`,
      `- Badge Level: **${courseSummary.badgeLevel}**`,
      '',
      '| Challenge | Module | Status | Score |',
      '|---|---|---|---:|'
    ];

    for (const challenge of courseConfig.challenges) {
      const result = resultMap.get(challenge.id);
      lines.push(
        `| ${challenge.name} | ${challenge.moduleName} | ${result?.passed ? 'Passed' : 'Not passed'} | ${result?.score ?? 0}% |`
      );
    }

    const readmePath = join(courseDir, 'project', 'README.md');
    if (!existsSync(readmePath)) {
      continue;
    }

    const content = readFileSync(readmePath, 'utf-8');
    const updated = replaceSection(
      content,
      '<!-- COURSE_PROGRESS_START -->',
      '<!-- COURSE_PROGRESS_END -->',
      lines.join('\n')
    );
    writeFileSync(readmePath, updated, 'utf-8');
  }
}

function buildSkillBreakdown({ rootDir, pathwayConfig }) {
  const skillMap = new Map();

  for (const course of pathwayConfig.courses) {
    const courseDir = join(rootDir, 'courses', course.id);
    const courseConfig = readJson(join(courseDir, 'course-config.json'), { challenges: [] });
    const challengeResults = readJson(join(courseDir, 'results', 'challenge-results.json'), []);
    const resultMap = new Map((challengeResults || []).map((item) => [item.challengeId, item]));

    for (const challenge of courseConfig.challenges || []) {
      const result = resultMap.get(challenge.id);
      const reviewed = Boolean(result);
      const passed = Boolean(result?.passed);
      const skills = Array.isArray(challenge.skills) ? challenge.skills : [];

      for (const rawSkill of skills) {
        const skill = String(rawSkill || '').trim();
        if (!skill) {
          continue;
        }

        if (!skillMap.has(skill)) {
          skillMap.set(skill, {
            skill,
            appearances: 0,
            reviewedChallenges: 0,
            passedChallenges: 0,
            courseIds: new Set(),
            challengeIds: new Set()
          });
        }

        const entry = skillMap.get(skill);
        entry.appearances += 1;
        if (reviewed) {
          entry.reviewedChallenges += 1;
        }
        if (passed) {
          entry.passedChallenges += 1;
        }
        entry.courseIds.add(course.id);
        entry.challengeIds.add(challenge.id);
      }
    }
  }

  const skills = Array.from(skillMap.values())
    .map((entry) => {
      const passRate = entry.reviewedChallenges === 0
        ? 0
        : round((entry.passedChallenges / entry.reviewedChallenges) * 100);
      return {
        skill: entry.skill,
        appearances: entry.appearances,
        reviewedChallenges: entry.reviewedChallenges,
        passedChallenges: entry.passedChallenges,
        passRate,
        courseIds: Array.from(entry.courseIds).sort(),
        challengeIds: Array.from(entry.challengeIds).sort()
      };
    })
    .sort((a, b) => {
      const appearancesDiff = b.appearances - a.appearances;
      if (appearancesDiff !== 0) {
        return appearancesDiff;
      }
      return a.skill.localeCompare(b.skill);
    });

  const reviewedSkills = skills.filter((item) => item.reviewedChallenges > 0);
  const topStrengths = [...reviewedSkills]
    .sort((a, b) => {
      const passRateDiff = b.passRate - a.passRate;
      if (passRateDiff !== 0) {
        return passRateDiff;
      }
      const reviewedDiff = b.reviewedChallenges - a.reviewedChallenges;
      if (reviewedDiff !== 0) {
        return reviewedDiff;
      }
      return a.skill.localeCompare(b.skill);
    })
    .slice(0, 12)
    .map((item) => item.skill);

  const improvementAreas = [...reviewedSkills]
    .sort((a, b) => {
      const passRateDiff = a.passRate - b.passRate;
      if (passRateDiff !== 0) {
        return passRateDiff;
      }
      const reviewedDiff = b.reviewedChallenges - a.reviewedChallenges;
      if (reviewedDiff !== 0) {
        return reviewedDiff;
      }
      return a.skill.localeCompare(b.skill);
    })
    .slice(0, 12)
    .map((item) => item.skill);

  const totalAppearances = skills.reduce((sum, item) => sum + item.appearances, 0);
  const totalReviewedAppearances = skills.reduce((sum, item) => sum + item.reviewedChallenges, 0);
  const totalPassedAppearances = skills.reduce((sum, item) => sum + item.passedChallenges, 0);

  return {
    pathwayName: pathwayConfig.pathwayName,
    pathwayVersion: pathwayConfig.pathwayVersion,
    totals: {
      trackedSkills: skills.length,
      skillAppearances: totalAppearances,
      reviewedSkillAppearances: totalReviewedAppearances,
      passedSkillAppearances: totalPassedAppearances
    },
    topStrengths,
    improvementAreas,
    skills,
    generatedAt: new Date().toISOString()
  };
}

function updateProgress({ rootDir = ROOT } = {}) {
  const pathwayConfig = readJson(join(rootDir, 'pathway-review', 'pathway-config.json'));
  if (!pathwayConfig) {
    throw new Error('Missing pathway-review/pathway-config.json');
  }
  if (!Array.isArray(pathwayConfig.courses) || pathwayConfig.courses.length === 0) {
    throw new Error('pathway-review/pathway-config.json has no courses.');
  }

  const normalizedCourses = normalizeCourseWeights(pathwayConfig.courses);

  const courseProgress = normalizedCourses.map((course) => {
    const courseDir = join(rootDir, 'courses', course.id);
    const courseConfig = readJson(join(courseDir, 'course-config.json'));
    if (!courseConfig || !Array.isArray(courseConfig.challenges)) {
      throw new Error(`Invalid course config for ${course.id}`);
    }

    const summary = readJson(join(courseDir, 'results', 'course-summary.json'), {
      averageScore: 0,
      completionPercentage: 0,
      totalChallenges: courseConfig.challenges.length,
      completedChallenges: 0,
      badgeLevel: 'none'
    });

    return {
      id: course.id,
      name: course.name,
      weight: course.weight,
      averageScore: clampTo100(asNonNegativeNumber(summary.averageScore, 0)),
      completionPercentage: clampTo100(asNonNegativeNumber(summary.completionPercentage, 0)),
      totalChallenges: courseConfig.challenges.length,
      completedChallenges: asNonNegativeNumber(summary.completedChallenges, 0),
      badgeLevel: summary.badgeLevel ?? 'none'
    };
  });

  const sanitizedCourseProgress = courseProgress.map((course) => {
    const total = Math.max(0, course.totalChallenges);
    const completed = Math.min(total, Math.max(0, course.completedChallenges));
    const completion = total === 0 ? 0 : clampTo100(round((completed / total) * 100));
    return {
      ...course,
      totalChallenges: total,
      completedChallenges: completed,
      completionPercentage: completion
    };
  });

  const overallScore = clampTo100(round(sanitizedCourseProgress.reduce((sum, course) => sum + course.averageScore * course.weight, 0)));
  const totalChallenges = sanitizedCourseProgress.reduce((sum, course) => sum + course.totalChallenges, 0);
  const completedChallenges = sanitizedCourseProgress.reduce((sum, course) => sum + course.completedChallenges, 0);
  const completionPercentage = totalChallenges === 0 ? 0 : clampTo100(round((completedChallenges / totalChallenges) * 100));
  const badgeLevel = determineBadge(overallScore, completionPercentage, pathwayConfig.badgeLevels);

  const pathwaySummary = {
    pathwayName: pathwayConfig.pathwayName,
    pathwayVersion: pathwayConfig.pathwayVersion,
    overallScore,
    completionPercentage,
    badgeLevel,
    totalChallenges,
    completedChallenges,
    courses: sanitizedCourseProgress,
    generatedAt: new Date().toISOString()
  };

  const learnerProgress = {
    learner: 'default',
    pathway: pathwayConfig.pathwayName,
    overallScore,
    completionPercentage,
    badgeLevel,
    totalChallenges,
    completedChallenges,
    courses: sanitizedCourseProgress,
    updatedAt: new Date().toISOString()
  };

  writeJson(join(rootDir, 'pathway-review', 'pathway-summary.json'), pathwaySummary);
  writeJson(
    join(rootDir, 'pathway-review', 'skill-breakdown.json'),
    buildSkillBreakdown({ rootDir, pathwayConfig })
  );
  writeJson(join(rootDir, 'learner-results', 'progress.json'), learnerProgress);
  updateReadmes(pathwaySummary, rootDir);

  return pathwaySummary;
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isMain) {
  try {
    const summary = updateProgress();
    console.log(
      `Progress updated. Score ${summary.overallScore}%, completion ${summary.completionPercentage}% (${summary.completedChallenges}/${summary.totalChallenges}).`
    );
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

export { updateProgress };
