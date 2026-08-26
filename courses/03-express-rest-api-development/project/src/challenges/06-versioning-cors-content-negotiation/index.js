import express from 'express';
import cors from 'cors';

export function solve_06_versioning_cors_content_negotiation() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get('/api/v1/users', (req, res) => {
    const acceptedType = req.accepts(['json', 'text']);

    if (acceptedType === 'text') {
      res.type('text').send('API v1 users');
      return;
    }

    res.status(200).json({
      version: 'v1',
      users: []
    });
  });

  app.get('/api/v2/users', (req, res) => {
    const acceptedType = req.accepts(['json', 'text']);

    if (acceptedType === 'text') {
      res.type('text').send('API v2 users');
      return;
    }

    res.status(200).json({
      version: 'v2',
      data: {
        users: []
      }
    });
  });

  return app;
}