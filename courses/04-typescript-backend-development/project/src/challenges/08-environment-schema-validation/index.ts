import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"])
});

export function solve_08_environment_schema_validation(): string {
  const env = {
    NODE_ENV: process.env.NODE_ENV ?? "development"
  };

  const result = envSchema.safeParse(env);

  if (!result.success) {
    throw new Error("Invalid environment configuration");
  }

  return `Environment valid: ${result.data.NODE_ENV}`;
}