import jwt from 'jsonwebtoken';

const secret = 'my-secret';

function createAccessToken(userId) {
  return jwt.sign(
    { userId, type: 'access' },
    secret,
    { expiresIn: '15m' }
  );
}

function createRefreshToken(userId) {
  return jwt.sign(
    { userId, type: 'refresh' },
    secret,
    { expiresIn: '7d' }
  );
}

function verifyToken(token) {
  return jwt.verify(token, secret);
}

export function solve_11_jwt_refresh_token_auth() {
  const accessToken = createAccessToken(1);
  const refreshToken = createRefreshToken(1);

  return {
    accessToken,
    refreshToken,
    verified: verifyToken(accessToken),
  };
}