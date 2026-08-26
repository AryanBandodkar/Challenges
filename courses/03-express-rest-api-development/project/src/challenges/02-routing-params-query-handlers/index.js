import express from 'express';

export function solve_02_routing_params_query_handlers() {
  const router = express.Router();

  router.get('/users/:id', (req, res) => {
    res.json({
      id: req.params.id
    });
  });

  router.get('/users', (req, res) => {
    res.json({
      query: req.query
    });
  });

  return router;
}
