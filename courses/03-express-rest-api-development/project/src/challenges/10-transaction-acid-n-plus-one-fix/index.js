export function solve_10_transaction_acid_n_plus_one_fix() {
  const queries = [];

  queries.push('BEGIN');

  try {
    queries.push(
      'UPDATE accounts SET balance = balance - $1 WHERE id = $2'
    );

    queries.push(
      'UPDATE accounts SET balance = balance + $1 WHERE id = $2'
    );

    queries.push('COMMIT');

    const batchedQuery = `
      SELECT users.id, users.name, orders.id AS order_id
      FROM users
      LEFT JOIN orders ON orders.user_id = users.id
    `;

    return {
      transaction: queries,
      batchedQuery,
      strategy: 'Use a JOIN instead of querying orders separately for each user.',
    };
  } catch (error) {
    queries.push('ROLLBACK');

    return {
      transaction: queries,
      error: error.message,
    };
  }
}