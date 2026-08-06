export const PLACEHOLDER_PATTERNS = [
  /TODO:\s*Implement/i,
  /Not implemented/i,
  /throw\s+new\s+Error\(\s*['"]Not implemented['"]\s*\)/i
];

export const PATTERN_MATCHERS = {
  arrowFunction: /=>/,
  destructuring: /(const|let|var)\s*\{[^}]+\}\s*=|(const|let|var)\s*\[[^\]]+\]\s*=/,
  spreadOperator: /\.\.\./,
  templateLiteral: /`[^`]*\$\{[^}]+\}[^`]*`|`[^`]*`/,
  arrayMap: /\.map\s*\(/,
  arrayFilter: /\.filter\s*\(/,
  arrayReduce: /\.reduce\s*\(/,
  classSyntax: /class\s+[A-Za-z_][A-Za-z0-9_]*/,
  extendsKeyword: /extends\s+[A-Za-z_][A-Za-z0-9_]*/,
  importStatement: /import\s+.+\s+from\s+['"]/,
  exportStatement: /export\s+(default\s+)?(class|function|const|\{)/,
  callbackFunction: /callback\s*\(|function\s*\([^)]*callback[^)]*\)|\(\s*(err|error)\s*,/i,
  promiseUsage: /new\s+Promise\s*\(|Promise\./,
  promiseCatch: /\.catch\s*\(/,
  promiseThen: /\.then\s*\(/,
  asyncFunction: /async\s+function|async\s*\(/,
  awaitExpression: /await\s+/,
  tryCatch: /try\s*\{[\s\S]*\}\s*catch\s*\(/,
  setTimeoutUsage: /setTimeout\s*\(/,
  fsModuleImport: /from\s+['"]node:fs['"]|from\s+['"]fs['"]|require\(['"]fs['"]\)/,
  streamPipeline: /pipeline\s*\(|createReadStream\s*\(|createWriteStream\s*\(/,
  pathModuleImport: /from\s+['"]node:path['"]|from\s+['"]path['"]|require\(['"]path['"]\)/,
  osModuleImport: /from\s+['"]node:os['"]|from\s+['"]os['"]|require\(['"]os['"]\)/,
  processUsage: /process\.(env|argv|exit)/,
  childProcessUsage: /from\s+['"]node:child_process['"]|from\s+['"]child_process['"]|spawn\s*\(|fork\s*\(|execFile\s*\(/,
  signalHandler: /process\.on\s*\(\s*['"]SIG(INT|TERM)['"]/,
  gracefulShutdown: /server\.close\s*\(|gracefulShutdown|shutdown/i,
  npmScript: /"scripts"\s*:/,
  dotenvConfig: /dotenv\.config\s*\(/,
  httpCreateServer: /http\.createServer\s*\(/,
  httpsServer: /from\s+['"]node:https['"]|from\s+['"]https['"]|https\.createServer\s*\(/,
  urlClassUsage: /new\s+URL\s*\(/,
  loggerPattern: /console\.(info|warn|error)\s*\(|logger\./,
  expressApp: /express\s*\(\s*\)/,
  expressRouter: /express\.Router\s*\(|router\.(get|post|put|patch|delete)\s*\(/,
  expressStaticServing: /express\.static\s*\(/,
  templateEngineSetup: /set\s*\(\s*['"]view engine['"]/,
  healthEndpoint: /(app|router)\.get\s*\(\s*['"]\/(health|ready|readiness)['"]/,
  paginationQueryHandling: /req\.query\.(page|limit|sort|filter)|(\bpage\b.*\blimit\b)|(\blimit\b.*\bpage\b)/i,
  routeParamUsage: /:\w+|req\.params/,
  middlewareNext: /next\s*\(\s*\)/,
  httpStatusUsage: /res\.status\s*\(/,
  corsMiddleware: /cors\s*\(|Access-Control-Allow-Origin/i,
  parameterizedQuery: /\$\d+|query\s*\(\s*['"][^'"]*\$\d+/,
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
  typeGuard: /\bis\s+[A-Za-z_][A-Za-z0-9_]*/,
  tsNodeScript: /ts-node/,
  nodemonScript: /nodemon/,
  tsConfigPresent: /"compilerOptions"\s*:/,
  expressTypeImport: /Request|Response|NextFunction/,
  pathAliasImport: /from\s+['"]@\//,
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
  rolesDecorator: /@Roles\s*\(|SetMetadata\s*\(\s*['"]roles/,
  eventHandler: /@EventPattern\s*\(|emit\s*\(/,
  grpcClient: /@GrpcMethod\s*\(|ClientGrpc/,
  serviceDiscoveryPattern: /service\s+registry|consul|etcd|discovery/i,
  requestIdInterceptor: /x-request-id|requestId|correlationId|AsyncLocalStorage|ExecutionContext/i,
  envSchemaValidation: /zod|joi|envalid|convict|schema.*process\.env/i,
  constLetUsage: /\b(const|let)\b/,
  commonJsRequire: /\brequire\s*\(/,
  commonJsExports: /module\.exports/,
  stringConcatenation: /['"`][^'"`]*['"`]\s*\+|\+\s*['"`]/
};

export const AVAILABLE_PATTERN_KEYS = Object.freeze(Object.keys(PATTERN_MATCHERS));

export function isPlaceholder(content) {
  if (!content || !content.trim()) {
    return true;
  }

  return PLACEHOLDER_PATTERNS.some((pattern) => pattern.test(content));
}

export function matchRequiredPatterns(source, patternsRequired = []) {
  const found = [];
  const missing = [];

  for (const patternKey of patternsRequired) {
    const matcher = PATTERN_MATCHERS[patternKey];
    const match = matcher ? matcher.test(source) : source.includes(patternKey);

    if (match) {
      found.push(patternKey);
    } else {
      missing.push(patternKey);
    }
  }

  return { found, missing };
}
