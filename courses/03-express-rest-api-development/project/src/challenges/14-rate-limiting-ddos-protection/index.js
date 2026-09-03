import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
});

export function solve_14_rate_limiting_ddos_protection() {
  return {
    middleware: limiter,
    limit: 100,
    window: '15 minutes',
  };
}