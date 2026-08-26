import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function parameterizedQuery(id) {
  const result = await pool.query(
    'SELECT * FROM users WHERE id = $1',
    [id]
  );

  return result.rows;
}

export function solve_07_postgres_pool_parameterized_queries() {
  return {
    pool,
    parameterizedQuery,
  };
}