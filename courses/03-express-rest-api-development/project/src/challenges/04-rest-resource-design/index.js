import express from 'express';

export function solve_04_rest_resource_design() {
  const router = express.Router();

  router.get('/users', (req, res) => {
    res.json({
      operation: 'list-users'
    });
  });

  router.post('/users', (req, res) => {
    res.status(201).json({
      operation: 'create-user',
      data: req.body
    });
  });

  router.get('/users/:id', (req, res) => {
    res.json({
      operation: 'get-user',
      id: req.params.id
    });
  });

  router.put('/users/:id', (req, res) => {
    res.json({
      operation: 'update-user',
      id: req.params.id,
      data: req.body
    });
  });

  router.delete('/users/:id', (req, res) => {
    res.status(204).send();
  });

  return router;
}