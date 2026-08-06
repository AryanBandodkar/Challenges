const DIVIDER = '='.repeat(60);

function formatPercent(score) {
  if (typeof score !== 'number' || Number.isNaN(score)) {
    return '0.0%';
  }
  return `${score.toFixed(1)}%`;
}

function printLine(lines, value = '') {
  lines.push(value);
}

function formatFunctionalTests(layer, lines) {
  printLine(lines, '🧪 Running functional tests...');
  printLine(lines, `   Score: ${formatPercent(layer?.score)}`);
  printLine(
    lines,
    `   Passed: ${layer?.passedChecks ?? 0}/${layer?.totalChecks ?? 0} checks`
  );

  if (layer?.note) {
    printLine(lines, `   ℹ️  ${layer.note}`);
  }

  for (const file of layer?.failedFiles || []) {
    printLine(lines, `      ❌ Failed file: ${file}`);
  }

  if (layer?.testFile && layer?.testPassed === false) {
    printLine(lines, `      ❌ Unit tests failed: ${layer.testFile}`);
    if (layer?.testError) {
      printLine(lines, `      ${layer.testError.split('\n')[0]}`);
    }
  }

  if (layer?.testFile && layer?.testPassed === true) {
    printLine(lines, `      ✅ Unit tests passed: ${layer.testFile}`);
  }
  printLine(lines);
}

function formatCodeQuality(layer, lines) {
  printLine(lines, '🔍 Running code quality checks...');
  printLine(lines, `   Score: ${formatPercent(layer?.score)}`);

  const errors = layer?.errors ?? 0;
  const warnings = layer?.warnings ?? 0;
  if (errors > 0 || warnings > 0) {
    printLine(lines, `   ⚠️  Found ${errors} error(s) and ${warnings} warning(s)`);
    for (const detail of layer?.details || []) {
      const prefix = detail.toLowerCase().includes('missing') ? '❌' : '⚠️';
      printLine(lines, `      ${prefix} ${detail}`);
    }
  } else {
    printLine(lines, '   ✅ No code quality issues found.');
  }
  printLine(lines);
}

function formatArchitecture(layer, lines) {
  printLine(lines, '🏗️  Checking architecture...');
  printLine(lines, `   Score: ${formatPercent(layer?.score)}`);

  if ((layer?.required || []).length === 0) {
    printLine(lines, '   ℹ️  No architecture patterns required for this challenge.');
  } else if ((layer?.missing || []).length === 0) {
    printLine(lines, `   ✅ Found: ${(layer?.found || []).join(', ')}`);
    printLine(lines, '   ✅ All required patterns found!');
  } else {
    if ((layer?.found || []).length > 0) {
      printLine(lines, `   ✅ Found: ${layer.found.join(', ')}`);
    }
    printLine(lines, `   ❌ Missing: ${layer.missing.join(', ')}`);
  }
  printLine(lines);
}

function formatBestPractices(layer, lines) {
  printLine(lines, '✨ Checking best practices...');
  printLine(lines, `   Score: ${formatPercent(layer?.score)}`);

  if ((layer?.issues || []).length === 0) {
    printLine(lines, '   ✅ No best-practice issues found.');
  } else {
    printLine(lines, `   ⚠️  Found ${layer.issueCount ?? layer.issues.length} issue(s)`);
    for (const issue of layer.issues) {
      printLine(lines, `      ⚠️  ${issue}`);
    }
  }
  printLine(lines);
}

function formatE2eTests(layer, lines) {
  printLine(lines, '🎭 Running E2E / API behavior checks...');
  printLine(lines, `   Score: ${formatPercent(layer?.score)}`);

  if (layer?.mode === 'not_configured') {
    printLine(lines, `   ℹ️  ${layer?.note || 'No challenge-specific tests configured for this layer.'}`);
  } else if (layer?.mode === 'evidence') {
    const parts = [];
    if (layer?.hasUnit) parts.push('unit test file present');
    if (layer?.hasE2E) parts.push('e2e spec present');
    printLine(lines, `   ✅ Test evidence detected (${parts.join(', ') || 'configured'}).`);
  } else if (layer?.error) {
    printLine(lines, `   ⚠️  Error: ${layer.error}`);
  } else if (layer?.note) {
    printLine(lines, `   ℹ️  ${layer.note}`);
  }
  printLine(lines);
}

function formatAiReview(layer, lines) {
  printLine(lines, '🤖 Running AI code review...');
  printLine(lines, `   Score: ${formatPercent(layer?.score)}`);

  if (layer?.mode === 'disabled') {
    printLine(lines, '   ℹ️  AI review is disabled. Set GROQ_API_KEY to enable it.');
  } else if (layer?.mode === 'skipped') {
    printLine(lines, '   ℹ️  AI review skipped until substantial implementation exists.');
  } else if (layer?.mode === 'error') {
    printLine(lines, '   ⚠️  AI review could not complete.');
  }

  for (const strength of layer?.strengths || []) {
    printLine(lines, `   ✅ Strength: ${strength}`);
  }
  for (const improvement of layer?.improvements || []) {
    printLine(lines, `   💡 Improvement: ${improvement}`);
  }
  printLine(lines);
}

export function formatChallengeReview(challengeResult) {
  const lines = [];
  const status = challengeResult.passed ? '✅' : '❌';

  printLine(lines);
  printLine(lines, DIVIDER);
  printLine(
    lines,
    `📝 Challenge: ${challengeResult.challengeName} (${challengeResult.challengeId})`
  );
  printLine(lines, DIVIDER);
  printLine(lines);

  const layers = challengeResult.layers || {};
  formatFunctionalTests(layers.functionalTests, lines);
  formatCodeQuality(layers.codeQuality, lines);
  formatArchitecture(layers.architecture, lines);
  formatBestPractices(layers.bestPractices, lines);
  formatE2eTests(layers.e2eTests, lines);
  formatAiReview(layers.aiReview, lines);

  printLine(lines, `${status} Challenge ${challengeResult.challengeId} completed`);
  printLine(lines, `   Score: ${formatPercent(challengeResult.score)}`);
  printLine(lines, `   Passed: ${challengeResult.passed ? 'Yes' : 'No'}`);

  return lines.join('\n');
}

export function formatCourseSummary(summary) {
  const lines = [];

  printLine(lines);
  printLine(lines, DIVIDER);
  printLine(lines, '📊 Course Summary');
  printLine(lines, DIVIDER);
  printLine(lines, `Overall Score: ${formatPercent(summary?.averageScore)}`);
  printLine(lines, `Completion: ${formatPercent(summary?.completionPercentage)}`);
  printLine(
    lines,
    `Reviewed Challenges: ${summary?.reviewedChallengesCount ?? summary?.challengeResults?.length ?? 0}/${summary?.totalChallenges ?? 0}`
  );
  printLine(
    lines,
    `Completed Challenges: ${summary?.completedChallenges ?? 0}/${summary?.totalChallenges ?? 0}`
  );
  printLine(lines, `Badge Level: ${summary?.badgeLevel || 'none'}`);

  if ((summary?.skillStrengths || []).length > 0) {
    printLine(lines, `Skill Strengths: ${summary.skillStrengths.join(', ')}`);
  }
  if ((summary?.improvementAreas || []).length > 0) {
    printLine(lines, `Improvement Areas: ${summary.improvementAreas.join(', ')}`);
  }

  return lines.join('\n');
}

export function formatPathwaySummary(pathwaySummary) {
  const lines = [];

  printLine(lines);
  printLine(lines, DIVIDER);
  printLine(lines, '🌐 Pathway Summary');
  printLine(lines, DIVIDER);
  printLine(lines, `Pathway: ${pathwaySummary?.pathwayName || 'Pathway'}`);
  printLine(lines, `Overall Score: ${formatPercent(pathwaySummary?.overallScore)}`);
  printLine(lines, `Completion: ${formatPercent(pathwaySummary?.completionPercentage)}`);
  printLine(
    lines,
    `Completed Challenges: ${pathwaySummary?.completedChallenges ?? 0}/${pathwaySummary?.totalChallenges ?? 0}`
  );
  printLine(lines, `Badge Level: ${pathwaySummary?.badgeLevel || 'none'}`);

  return lines.join('\n');
}

export function formatReviewOutput({
  result,
  pathwaySummary = null,
  resultsDir = null,
  includePathwaySummary = true
} = {}) {
  const lines = [];

  printLine(lines, '🔍 Starting review engine...');
  printLine(lines);
  printLine(
    lines,
    `📋 Reviewing ${result?.reviewedChallenges?.length ?? 0} challenge(s)`
  );

  for (const challengeResult of result?.reviewedResults || []) {
    lines.push(formatChallengeReview(challengeResult));
  }

  lines.push(formatCourseSummary(result?.summary));

  if (includePathwaySummary && pathwaySummary) {
    lines.push(formatPathwaySummary(pathwaySummary));
  }

  if (resultsDir) {
    printLine(lines);
    printLine(lines, `✅ Results saved to: ${resultsDir}`);
  }

  return `${lines.join('\n')}\n`;
}
