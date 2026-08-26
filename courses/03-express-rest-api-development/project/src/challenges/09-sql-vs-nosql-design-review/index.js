const criteria = [
  {
    name: 'Data relationships',
    sql: 'Best for complex relationships and joins',
    nosql: 'Better for simple or embedded relationships',
  },
  {
    name: 'Consistency',
    sql: 'Strong consistency and transactions',
    nosql: 'Flexible consistency depending on the database',
  },
  {
    name: 'Schema',
    sql: 'Fixed and structured schema',
    nosql: 'Flexible schema',
  },
  {
    name: 'Scalability',
    sql: 'Good vertical scaling',
    nosql: 'Good horizontal scaling',
  },
];

export function solve_09_sql_vs_nosql_design_review() {
  return {
    criteria,
    sqlRecommendation: 'Use SQL for structured data and complex relationships.',
    nosqlRecommendation: 'Use NoSQL for flexible data and high scalability.',
    recommendation: 'Choose SQL or NoSQL based on the application requirements.',
  };
}