import bcrypt from 'bcrypt';

export async function solve_12_bcrypt_session_cookie_security() {
  const password = 'password123';

  const hashedPassword = await bcrypt.hash(password, 10);
  const passwordMatches = await bcrypt.compare(password, hashedPassword);

  const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  };

  return {
    hashedPassword,
    passwordMatches,
    cookieOptions,
  };
}