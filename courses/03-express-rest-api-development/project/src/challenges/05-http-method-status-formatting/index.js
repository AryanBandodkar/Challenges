import express from 'express';

export function solve_05_http_method_status_formatting() {
  const app = express();

  app.use(express.json());

  app.get('/items', (req, res) => {
    res.status(200).json({
      success: true,
      method: 'GET',
      message: 'Items retrieved successfully'
    });
  });

  app.post('/items', (req, res) => {
    res.status(201).json({
      success: true,
      method: 'POST',
      message: 'Item created successfully',
      data: req.body
    });
  });

  return app;
}
