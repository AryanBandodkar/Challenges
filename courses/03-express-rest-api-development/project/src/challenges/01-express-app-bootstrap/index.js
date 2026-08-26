import express from 'express';

export function solve_01_express_app_bootstrap() {
  const app = express();
  app.use(express.json());
  return app;
}
