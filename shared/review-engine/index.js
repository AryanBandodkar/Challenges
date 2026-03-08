import { join } from 'path';
import { readJson, readText, writeJson, exists, clampScore, roundScore } from '../utils/io.js';
import { loadDotEnv } from '../utils/env.js';
import { resolveRepoRoot } from '../utils/root.js';

const PLACEHOLDER_PATTERNS = [
  /TODO:\s*Implement/i,
  /Not implemented/i,
  /throw\s+new\s+Error\(\s*['\"]Not implemented['\"]\s*\)/i
];

const PATTERN_MATCHERS = {
  arrowFunction: /=>/,
  destructuring: /(const|let|var)\s*\{[^}]+\}\s*=|(const|let|var)\s*\[[^\]]+\]\s*=/,
  spreadOperator: /\.\.\./,
  templateLiteral: /`[^`]*\$\{[^}]+\}[^`]*`|`[^`]*`/,
  arrayMap: /\.map\s*\(/,
  arrayFilter: /\.filter\s*\(/,
  arrayReduce: /\.reduce\s*\(/,
  classSyntax: /class\s+[A-Za-z_][A-Za-z0-9_]*/,
  extendsKeyword: /extends\s+[A-Za-z_][A-Za-z0-9_]*/,
  importStatement: /import\s+.+\s+from\s+['\"]/,
  exportStatement: /export\s+(default\s+)?(class|function|const|\{)/,
  callbackFunction: /callback\s*\(|function\s*\([^)]*callback[^)]*\)/i,
  promiseUsage: /new\s+Promise\s*\(|Promise\./,
  promiseCatch: /\.catch\s*\(/,
  asyncFunction: /async\s+function|async\s*\(/,
  awaitExpression: /await\s+/,
  tryCatch: /try\s*\{[\s\S]*\}\s*catch\s*\(/,
  setTimeoutUsage: /setTimeout\s*\(/,
  fsModuleImport: /from\s+['\"]node:fs['\"]|from\s+['\"]fs['\"]|require\(['\"]fs['\"]\)/,
  streamPipeline: /pipeline\s*\(|createReadStream\s*\(|createWriteStream\s*\(/,
  pathModuleImport: /from\s+['\"]node:path['\"]|from\s+['\"]path['\"]|require\(['\"]path['\"]\)/,
  osModuleImport: /from\s+['\"]node:os['\"]|from\s+['\"]os['\"]|require\(['\"]os['\"]\)/,
  processUsage: /process\.(env|argv|exit)/,
  childProcessUsage: /from\s+['\"]node:child_process['\"]|from\s+['\"]child_process['\"]|spawn\s*\(|fork\s*\(|execFile\s*\(/,
  signalHandler: /process\.on\s*\(\s*['\"]SIG(INT|TERM)['\"]/,
  gracefulShutdown: /server\.close\s*\(|gracefulShutdown|shutdown/i,
  npmScript: /"scripts"\s*:/,
  dotenvConfig: /dotenv\.config\s*\(/,
  httpCreateServer: /http\.createServer\s*\(/,
  httpsServer: /from\s+['\"]node:https['\"]|from\s+['\"]https['\"]|https\.createServer\s*\(/,
  urlClassUsage: /new\s+URL\s*\(/,
  loggerPattern: /console\.(info|warn|error)\s*\(|logger\./,
  expressApp: /express\s*\(\s*\)/,
  expressRouter: /express\.Router\s*\(|router\.(get|post|put|patch|delete)\s*\(/,
  expressStaticServing: /express\.static\s*\(/,
  templateEngineSetup: /set\s*\(\s*['\"]view engine['\"]/,
  healthEndpoint: /(app|router)\.get\s*\(\s*['\"]\/(health|ready|readiness)['\"]/,
  paginationQueryHandling: /req\.query\.(page|limit|sort|filter)|(\bpage\b.*\blimit\b)|(\blimit\b.*\bpage\b)/i,
  routeParamUsage: /:\w+|req\.params/,
  middlewareNext: /next\s*\(\s*\)/,
  httpStatusUsage: /res\.status\s*\(/,
  corsMiddleware: /cors\s*\(|Access-Control-Allow-Origin/i,
  parameterizedQuery: /\$\d+|query\s*\(\s*['\"][^'\"]*\$\d+/,
  mongooseSchema: /new\s+Schema\s*\(|mongoose\.model\s*\(/,
  transactionUsage: /BEGIN|COMMIT|ROLLBACK|transaction/i,
  jwtSignVerify: /jwt\.(sign|verify)\s*\(/,
  bcryptUsage: /bcrypt\.(hash|compare)\s*\(/,
  inputValidation: /zod|joi|validate\s*\(/i,
  rateLimitMiddleware: /rateLimit\s*\(/,
  openApiDoc: /openapi|swagger/i,
  jestDescribeIt: /describe\s*\(|it\s*\(/,
  supertestRequest: /request\s*\(.*\)\.(get|post|put|patch|delete)\s*\(/,
  typeAnnotation: /:\s*[A-Za-z_][A-Za-z0-9_<>,\[\] |]*/,
  interfaceDeclaration: /interface\s+[A-Za-z_][A-Za-z0-9_]*/,
  typeAlias: /type\s+[A-Za-z_][A-Za-z0-9_]*\s*=/,
  enumDeclaration: /enum\s+[A-Za-z_][A-Za-z0-9_]*/,
  tupleType: /\[[A-Za-z_][A-Za-z0-9_<>\[\]\s|,]*,\s*[A-Za-z_][A-Za-z0-9_<>\[\]\s|,]*\]/,
  genericType: /<[A-Za-z_][A-Za-z0-9_,\s]*>/,
  typeGuard: /\sis\s+[A-Za-z_][A-Za-z0-9_]*/,
  tsNodeScript: /ts-node/,
  nodemonScript: /nodemon/,
  tsConfigPresent: /"compilerOptions"\s*:/,
  expressTypeImport: /Request|Response|NextFunction/,
  pathAliasImport: /from\s+['\"]@\//,
  nestjsModule: /@Module\s*\(/,
  nestjsController: /@Controller\s*\(/,
  nestjsInjectable: /@Injectable\s*\(/,
  nestjsGuard: /@UseGuards\s*\(|implements\s+CanActivate/,
  nestjsPipe: /PipeTransform|@UsePipes\s*\(/,
  nestjsExceptionFilter: /@Catch\s*\(|ExceptionFilter/,
  nestjsDecorator: /SetMetadata|createParamDecorator|Reflector/,
  repositoryPattern: /Repository|EntityRepository|PrismaService/,
  classValidatorUsage: /class-validator|@Is[A-Z]/,
  passportStrategy: /PassportStrategy|AuthGuard/,
  rolesDecorator: /@Roles\s*\(|SetMetadata\s*\(\s*['\"]roles/,
  eventHandler: /@EventPattern\s*\(|emit\s*\(/,
  grpcClient: /@GrpcMethod\s*\(|ClientGrpc/,
  serviceDiscoveryPattern: /service\s+registry|consul|etcd|discovery/i,
  requestIdInterceptor: /x-request-id|requestId|correlationId|AsyncLocalStorage|ExecutionContext/i,
  envSchemaValidation: /zod|joi|envalid|convict|schema.*process\.env/i
};

export const AVAILABLE_PATTERN_KEYS = Object.freeze(Object.keys(PATTERN_MATCHERS));

function isPlaceholder(content) {
  if (!content || !content.trim()) {
    return true;
  }

  return PLACEHOLDER_PATTERNS.some((pattern) => pattern.test(content));
}

function asNonNegativeNumber(value, fallback = 0) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 0) {
    return fallback;
  }
  return parsed;
}

function asPositiveInteger(value, fallback) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    return fallback;
  }

  const integer = Math.floor(parsed);
  if (integer <= 0) {
    return fallback;
  }

  return integer;
}

function getChallengeWeight(challenge, fallbackWeight) {
  return asNonNegativeNumber(challenge?.weight, fallbackWeight);
}

function normalizeScoring(scoring = {}) {
  const defaults = {
    functionalTests: 0.35,
    codeQuality: 0.15,
    architecture: 0.1,
    bestPractices: 0.1,
    e2eTests: 0.15,
    aiReview: 0.15
  };

  const merged = Object.fromEntries(
    Object.entries({ ...defaults, ...scoring }).map(([key, value]) => [key, asNonNegativeNumber(value, 0)])
  );
  const sum = Object.values(merged).reduce((acc, value) => acc + value, 0);

  if (sum <= 0) {
    return defaults;
  }

  return Object.fromEntries(
    Object.entries(merged).map(([key, value]) => [key, value / sum])
  );
}

function determineBadge(score, completion, badgeLevels = {}) {
  if (!badgeLevels || typeof badgeLevels !== 'object') {
    return 'none';
  }

  const entries = Object.entries(badgeLevels).sort((a, b) => {
    const scoreDiff = (b[1]?.minScore ?? 0) - (a[1]?.minScore ?? 0);
    if (scoreDiff !== 0) {
      return scoreDiff;
    }
    return (b[1]?.minCompletion ?? 0) - (a[1]?.minCompletion ?? 0);
  });
  for (const [badge, rule] of entries) {
    if (score >= rule.minScore && completion >= rule.minCompletion) {
      return badge;
    }
  }
  return 'none';
}

function readChallengeContext({ projectDir, challengeId, fallbackChallengeConfig }) {
  const metadataPath = join(projectDir, 'challenges', challengeId, 'metadata.json');
  const readmePath = join(projectDir, 'challenges', challengeId, 'README.md');

  const metadataRaw = readJson(metadataPath, {
    challengeId,
    challengeName: fallbackChallengeConfig.name,
    moduleId: fallbackChallengeConfig.moduleId,
    moduleName: fallbackChallengeConfig.moduleName,
    filesToCheck: fallbackChallengeConfig.filesToCheck || [],
    skills: fallbackChallengeConfig.skills || [],
    patternsRequired: fallbackChallengeConfig.patternsRequired || []
  });
  const metadata = metadataRaw && typeof metadataRaw === 'object' ? metadataRaw : {};

  const filesToCheck = Array.isArray(metadata.filesToCheck) && metadata.filesToCheck.length > 0
    ? metadata.filesToCheck
    : fallbackChallengeConfig.filesToCheck || [];

  const files = filesToCheck.map((relativePath) => {
    const absolutePath = join(projectDir, relativePath);
    const content = readText(absolutePath, '');
    return {
      relativePath,
      absolutePath,
      exists: exists(absolutePath),
      content,
      placeholder: isPlaceholder(content)
    };
  });

  return {
    metadata: {
      ...metadata,
      filesToCheck
    },
    challengeReadme: readText(readmePath, ''),
    files
  };
}

function runFunctionalTests(files) {
  const total = files.length;
  if (total === 0) {
    return {
      score: 0,
      totalChecks: 0,
      passedChecks: 0,
      failedFiles: [],
      note: 'No filesToCheck configured.'
    };
  }

  const failedFiles = files
    .filter((file) => !file.exists || file.placeholder)
    .map((file) => file.relativePath);

  const passedChecks = total - failedFiles.length;
  return {
    score: roundScore((passedChecks / total) * 100),
    totalChecks: total,
    passedChecks,
    failedFiles
  };
}

function runCodeQuality(files) {
  let errors = 0;
  let warnings = 0;
  const details = [];

  for (const file of files) {
    if (!file.exists) {
      errors += 1;
      details.push(`${file.relativePath}: file missing`);
      continue;
    }

    const lines = file.content.split(/\r?\n/);
    lines.forEach((line, index) => {
      if (line.length > 140) {
        warnings += 1;
        details.push(`${file.relativePath}:${index + 1} line longer than 140 chars`);
      }

      if (/\s+$/.test(line)) {
        warnings += 1;
        details.push(`${file.relativePath}:${index + 1} trailing whitespace`);
      }
    });

    const consoleLogCount = (file.content.match(/console\.log\s*\(/g) || []).length;
    warnings += consoleLogCount;
    if (consoleLogCount > 0) {
      details.push(`${file.relativePath}: console.log used ${consoleLogCount} time(s)`);
    }

    const varCount = (file.content.match(/\bvar\s+/g) || []).length;
    warnings += varCount;
    if (varCount > 0) {
      details.push(`${file.relativePath}: var used ${varCount} time(s)`);
    }
  }

  const score = clampScore(100 - errors * 20 - warnings * 4);
  return { score, errors, warnings, details };
}

function runArchitectureChecks(files, patternsRequired = []) {
  if (!Array.isArray(patternsRequired) || patternsRequired.length === 0) {
    return {
      score: 100,
      required: [],
      found: [],
      missing: []
    };
  }

  const source = files.map((file) => file.content).join('\n');
  const found = [];
  const missing = [];

  for (const pattern of patternsRequired) {
    const matcher = PATTERN_MATCHERS[pattern];
    const match = matcher ? matcher.test(source) : source.includes(pattern);

    if (match) {
      found.push(pattern);
    } else {
      missing.push(pattern);
    }
  }

  return {
    score: roundScore((found.length / patternsRequired.length) * 100),
    required: patternsRequired,
    found,
    missing
  };
}

function runBestPractices(files) {
  const issues = [];

  const checks = [
    { regex: /eval\s*\(/, message: 'Avoid eval().' },
    { regex: /Function\s*\(\s*['\"]/, message: 'Avoid dynamic Function constructor.' },
    { regex: /password\s*[:=]\s*['\"][^'\"]+['\"]/i, message: 'Hardcoded password detected.' },
    { regex: /secret\s*[:=]\s*['\"][^'\"]+['\"]/i, message: 'Hardcoded secret detected.' },
    { regex: /process\.env\.[A-Z0-9_]+\s*\|\|\s*['\"][^'\"]+['\"]/i, message: 'Sensitive env fallback hardcoded.' }
  ];

  for (const file of files) {
    if (!file.exists) {
      continue;
    }

    for (const check of checks) {
      if (check.regex.test(file.content)) {
        issues.push(`${file.relativePath}: ${check.message}`);
      }
    }
  }

  return {
    score: clampScore(100 - issues.length * 20),
    issueCount: issues.length,
    issues
  };
}

function runE2ETests(projectDir, challengeId) {
  const unitCandidates = [
    join(projectDir, 'tests', `challenge-${challengeId}.test.js`),
    join(projectDir, 'tests', `challenge-${challengeId}.test.ts`)
  ];

  const e2eCandidates = [
    join(projectDir, 'tests', 'e2e', `challenge-${challengeId}.spec.js`),
    join(projectDir, 'tests', 'e2e', `challenge-${challengeId}.spec.ts`)
  ];

  const hasUnit = unitCandidates.some((file) => exists(file));
  const hasE2E = e2eCandidates.some((file) => exists(file));

  if (!hasUnit && !hasE2E) {
    return {
      score: 100,
      mode: 'not_configured',
      hasUnit,
      hasE2E,
      unitCandidates,
      e2eCandidates,
      note: 'No unit/e2e challenge tests were found; this layer is treated as neutral.'
    };
  }

  let score = 30;
  if (hasUnit) {
    score += 35;
  }
  if (hasE2E) {
    score += 35;
  }

  return {
    score,
    mode: 'evidence',
    hasUnit,
    hasE2E,
    unitCandidates,
    e2eCandidates
  };
}

function extractJsonObject(text) {
  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    const start = text.indexOf('{');
    const end = text.lastIndexOf('}');
    if (start === -1 || end === -1 || end <= start) {
      return null;
    }

    const candidate = text.slice(start, end + 1);
    try {
      return JSON.parse(candidate);
    } catch {
      return null;
    }
  }
}

function isEligibleForAi(files) {
  const implementedFiles = files.filter((file) => file.exists && !file.placeholder);
  if (implementedFiles.length === 0) {
    return false;
  }

  const totalChars = implementedFiles.reduce((sum, file) => sum + file.content.length, 0);
  return totalChars >= 80;
}

async function runAiReview({ rootDir, courseConfig, challenge, challengeReadme, files }) {
  loadDotEnv(rootDir);

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return {
      score: 0,
      mode: 'disabled',
      strengths: [],
      improvements: ['Set GROQ_API_KEY to enable AI review.']
    };
  }

  if (!isEligibleForAi(files)) {
    return {
      score: 0,
      mode: 'skipped',
      strengths: [],
      improvements: ['Code appears incomplete. AI review skipped until substantial implementation exists.']
    };
  }

  if (typeof fetch !== 'function') {
    return {
      score: 0,
      mode: 'error',
      strengths: [],
      improvements: ['Global fetch is not available in this Node runtime.']
    };
  }

  const model = process.env.GROQ_MODEL || 'llama-3.1-8b-instant';
  const maxFiles = asPositiveInteger(process.env.AI_REVIEW_MAX_FILES || 3, 3);
  const maxChars = asPositiveInteger(process.env.AI_REVIEW_MAX_CHARS || 7000, 7000);
  const charsPerFile = Math.max(300, Math.floor(maxChars / maxFiles));
  const fileContext = files
    .filter((file) => file.exists)
    .slice(0, maxFiles)
    .map((file) => `FILE: ${file.relativePath}\n${file.content.slice(0, charsPerFile)}`)
    .join('\n\n---\n\n');

  const prompt = [
    'You are evaluating a backend challenge solution.',
    'Return STRICT JSON only with keys: score (0-100 number), strengths (string[]), improvements (string[]).',
    `Course: ${courseConfig.courseName}`,
    `Challenge: ${challenge.id} - ${challenge.name}`,
    'Challenge brief:',
    challengeReadme.slice(0, 2200),
    'Learner code:',
    fileContext.slice(0, maxChars)
  ].join('\n\n');

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: 'You are a strict backend code reviewer.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.1
      })
    });

    if (!response.ok) {
      const body = await response.text();
      return {
        score: 0,
        mode: 'error',
        strengths: [],
        improvements: [`AI review request failed (${response.status}).`, body.slice(0, 300)]
      };
    }

    const payload = await response.json();
    const content = payload?.choices?.[0]?.message?.content || '';
    const parsed = extractJsonObject(content);

    if (!parsed) {
      return {
        score: 0,
        mode: 'parse_error',
        strengths: [],
        improvements: ['AI response was not valid JSON.']
      };
    }

    const score = clampScore(Number(parsed.score) || 0);
    const strengths = Array.isArray(parsed.strengths) ? parsed.strengths.slice(0, 6) : [];
    const improvements = Array.isArray(parsed.improvements) ? parsed.improvements.slice(0, 6) : [];

    return {
      score,
      mode: 'live',
      strengths,
      improvements
    };
  } catch (error) {
    return {
      score: 0,
      mode: 'error',
      strengths: [],
      improvements: [`AI review error: ${error.message}`]
    };
  }
}

function calculateTotalScore(layers, scoring) {
  const safeScoring = normalizeScoring(scoring);
  const total =
    layers.functionalTests.score * safeScoring.functionalTests +
    layers.codeQuality.score * safeScoring.codeQuality +
    layers.architecture.score * safeScoring.architecture +
    layers.bestPractices.score * safeScoring.bestPractices +
    layers.e2eTests.score * safeScoring.e2eTests +
    layers.aiReview.score * safeScoring.aiReview;

  return roundScore(total);
}

function mergeByChallengeOrder(existing, incoming, challengeOrder) {
  const map = new Map();
  for (const item of existing || []) {
    if (item?.challengeId) {
      map.set(item.challengeId, item);
    }
  }
  for (const item of incoming || []) {
    if (item?.challengeId) {
      map.set(item.challengeId, item);
    }
  }

  return challengeOrder.map((challengeId) => map.get(challengeId)).filter(Boolean);
}

function buildCourseSummary({ courseConfig, mergedResults, mergedAiFeedback }) {
  const challengeCount = courseConfig.challenges.length;
  const fallbackWeight = challengeCount > 0 ? 1 / challengeCount : 0;
  const rawWeights = courseConfig.challenges.map((challenge) =>
    getChallengeWeight(challenge, fallbackWeight)
  );
  const weightSum = rawWeights.reduce((sum, value) => sum + value, 0);
  const normalizedWeightMap = new Map(
    courseConfig.challenges.map((challenge, index) => [
      challenge.id,
      weightSum > 0 ? rawWeights[index] / weightSum : fallbackWeight
    ])
  );

  const scoreMap = new Map(mergedResults.map((item) => [item.challengeId, item.score]));

  const weightedTotal = courseConfig.challenges.reduce((sum, challenge) => {
    const score = scoreMap.get(challenge.id) ?? 0;
    const weight = normalizedWeightMap.get(challenge.id) ?? fallbackWeight;
    return sum + score * weight;
  }, 0);

  const passedSet = new Set(
    mergedResults.filter((item) => item.passed).map((item) => item.challengeId)
  );

  const completedChallenges = passedSet.size;
  const completionPercentage = challengeCount === 0 ? 0 : roundScore((completedChallenges / challengeCount) * 100);
  const averageScore = roundScore(weightedTotal);

  const strengthSkills = [];
  const improvementSkills = [];

  for (const challenge of courseConfig.challenges) {
    if (passedSet.has(challenge.id)) {
      for (const skill of challenge.skills || []) {
        if (!strengthSkills.includes(skill)) {
          strengthSkills.push(skill);
        }
      }
    } else {
      for (const skill of challenge.skills || []) {
        if (!improvementSkills.includes(skill)) {
          improvementSkills.push(skill);
        }
      }
    }
  }

  const aiStrengths = [];
  const aiImprovements = [];
  for (const item of mergedAiFeedback) {
    for (const line of item.strengths || []) {
      if (!aiStrengths.includes(line)) {
        aiStrengths.push(line);
      }
    }
    for (const line of item.improvements || []) {
      if (!aiImprovements.includes(line)) {
        aiImprovements.push(line);
      }
    }
  }

  return {
    courseId: courseConfig.courseId,
    courseName: courseConfig.courseName,
    averageScore,
    completionPercentage,
    totalChallenges: challengeCount,
    completedChallenges,
    badgeLevel: determineBadge(averageScore, completionPercentage, courseConfig.badgeLevels),
    challengeResults: mergedResults.map((result) => ({
      challengeId: result.challengeId,
      challengeName: result.challengeName,
      score: result.score,
      passed: result.passed,
      reviewedAt: result.reviewedAt
    })),
    skillStrengths: strengthSkills.slice(0, 12),
    improvementAreas: improvementSkills.slice(0, 12),
    aiStrengths: aiStrengths.slice(0, 12),
    aiImprovements: aiImprovements.slice(0, 12),
    generatedAt: new Date().toISOString()
  };
}

export async function runCourseReview({ rootDir = resolveRepoRoot(import.meta.url), courseId, challengeId = null }) {
  if (!courseId || typeof courseId !== 'string') {
    throw new Error('runCourseReview requires a valid courseId.');
  }

  const courseDir = join(rootDir, 'courses', courseId);
  const projectDir = join(courseDir, 'project');
  const resultsDir = join(courseDir, 'results');

  const courseConfig = readJson(join(courseDir, 'course-config.json'));
  if (!courseConfig) {
    throw new Error(`Course config not found for ${courseId}`);
  }
  if (!Array.isArray(courseConfig.challenges) || courseConfig.challenges.length === 0) {
    throw new Error(`Course ${courseId} has no challenges configured.`);
  }

  const targets = challengeId
    ? courseConfig.challenges.filter((challenge) => challenge.id === challengeId)
    : courseConfig.challenges;

  if (targets.length === 0) {
    throw new Error(`No challenge found for ${courseId}${challengeId ? ` (${challengeId})` : ''}`);
  }

  const existingResults = readJson(join(resultsDir, 'challenge-results.json'), []);
  const existingAi = readJson(join(resultsDir, 'ai-feedback.json'), []);

  const freshResults = [];
  const freshAiFeedback = [];

  for (const challenge of targets) {
    const { metadata, challengeReadme, files } = readChallengeContext({
      projectDir,
      challengeId: challenge.id,
      fallbackChallengeConfig: challenge
    });

    const layers = {
      functionalTests: runFunctionalTests(files),
      codeQuality: runCodeQuality(files),
      architecture: runArchitectureChecks(files, metadata.patternsRequired || []),
      bestPractices: runBestPractices(files),
      e2eTests: runE2ETests(projectDir, challenge.id),
      aiReview: await runAiReview({
        rootDir,
        courseConfig,
        challenge,
        challengeReadme,
        files
      })
    };

    const score = calculateTotalScore(layers, courseConfig.scoring);
    const passed = score >= (courseConfig.requirements?.minScore ?? 80);

    freshResults.push({
      challengeId: challenge.id,
      challengeName: challenge.name,
      moduleId: challenge.moduleId,
      moduleName: challenge.moduleName,
      score,
      passed,
      layers,
      reviewedAt: new Date().toISOString()
    });

    freshAiFeedback.push({
      challengeId: challenge.id,
      challengeName: challenge.name,
      score: layers.aiReview.score,
      mode: layers.aiReview.mode,
      strengths: layers.aiReview.strengths,
      improvements: layers.aiReview.improvements,
      reviewedAt: new Date().toISOString()
    });
  }

  const untouchedResults = existingResults.filter(
    (item) => !freshResults.some((fresh) => fresh.challengeId === item.challengeId)
  );
  const untouchedAi = existingAi.filter(
    (item) => !freshAiFeedback.some((fresh) => fresh.challengeId === item.challengeId)
  );

  const order = courseConfig.challenges.map((challenge) => challenge.id);
  const mergedResults = mergeByChallengeOrder(untouchedResults, freshResults, order);
  const mergedAiFeedback = mergeByChallengeOrder(untouchedAi, freshAiFeedback, order);

  writeJson(join(resultsDir, 'challenge-results.json'), mergedResults);
  writeJson(join(resultsDir, 'ai-feedback.json'), mergedAiFeedback);

  const summary = buildCourseSummary({
    courseConfig,
    mergedResults,
    mergedAiFeedback
  });

  writeJson(join(resultsDir, 'course-summary.json'), summary);

  return {
    courseId,
    challengeId,
    reviewedChallenges: targets.map((challenge) => challenge.id),
    summary
  };
}
