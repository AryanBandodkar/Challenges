import { z } from 'zod';

const userSchema = z.object({
  name: z.string().trim().min(2),
  email: z.string().trim().email(),
});

function validate(input) {
  return userSchema.parse(input);
}

function oauthCallback(code) {
  return {
    code,
    flow: 'authorization-code',
  };
}

export function solve_13_oauth_validation_sanitization() {
  const user = validate({
    name: 'Aryan',
    email: 'aryan@example.com',
  });

  const oauth = oauthCallback('example-code');

  return {
    user,
    oauth,
  };
}