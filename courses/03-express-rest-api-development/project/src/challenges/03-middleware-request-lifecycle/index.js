import express from 'express';

export function solve_03_middleware_request_lifecycle() {
  const app = express();

  const requestMiddleware = (req, res, next) => {
    req.requestStarted = true;
    next();
  };

  app.use(requestMiddleware);

  app.get('/hello', (req, res) => {
    res.json({
      message: 'Hello',
      middlewareExecuted: req.requestStarted === true
    });
  });

  return app;
}