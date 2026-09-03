import express from 'express';

export function solve_20_health_readiness_endpoints() {
  const app = express();

  app.get('/health', (req, res) => {
    res.status(200).json({
      status: 'ok',
    });
  });

  return app;
}