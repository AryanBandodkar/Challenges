import jwt from 'jsonwebtoken';

interface TokenPayload {
  userId: number;
  username: string;
}

interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

const ACCESS_SECRET = 'access-secret';
const REFRESH_SECRET = 'refresh-secret';
const VALID_API_KEY = 'demo-api-key';

function generateTokens(payload: TokenPayload): TokenPair {
  const accessToken = jwt.sign(
    payload,
    ACCESS_SECRET,
    { expiresIn: '15m' }
  );

  const refreshToken = jwt.sign(
    payload,
    REFRESH_SECRET,
    { expiresIn: '7d' }
  );

  return {
    accessToken,
    refreshToken
  };
}

function rotateRefreshToken(refreshToken: string): TokenPair {
  const decoded = jwt.verify(
    refreshToken,
    REFRESH_SECRET
  ) as TokenPayload;

  const payload: TokenPayload = {
    userId: decoded.userId,
    username: decoded.username
  };

  return generateTokens(payload);
}

function authenticateApiKey(apiKey: string): boolean {
  return apiKey === VALID_API_KEY;
}

export function solve_10_refresh_token_api_key_auth(): string {
  const payload: TokenPayload = {
    userId: 1,
    username: 'Aryan'
  };

  const tokens = generateTokens(payload);

  const rotatedTokens = rotateRefreshToken(
    tokens.refreshToken
  );

  const apiKeyValid = authenticateApiKey(
    'demo-api-key'
  );

  return `Access token: ${rotatedTokens.accessToken.length > 0}, API key: ${apiKeyValid}`;
}