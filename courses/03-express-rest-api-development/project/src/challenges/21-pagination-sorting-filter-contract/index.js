import express from 'express';

export function solve_21_pagination_sorting_filter_contract() {
  const app = express();

  const items = [
    { id: 1, name: 'Apple' },
    { id: 2, name: 'Banana' },
    { id: 3, name: 'Carrot' },
    { id: 4, name: 'Mango' },
    { id: 5, name: 'Orange' },
  ];

  app.get('/items', (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const sort = req.query.sort;
    const filter = req.query.filter;

    let result = [...items];

    // Filter
    if (filter) {
      result = result.filter(item =>
        item.name.toLowerCase().includes(filter.toLowerCase())
      );
    }

    // Sort
    if (sort === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    // Pagination
    const start = (page - 1) * limit;
    const data = result.slice(start, start + limit);

    res.status(200).json({
      data,
      page,
      limit,
      total: result.length
    });
  });

  return app;
}