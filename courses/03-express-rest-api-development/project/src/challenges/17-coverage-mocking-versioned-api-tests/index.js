import express from 'express';
import request from 'supertest';

const app = express();

const users = [
  { id: 1, name: 'Aryan' },
  { id: 2, name: 'John' },
];

app.get('/api/v1/users', (req, res) => {
  res.json(users);
});

app.get('/api/v2/users', (req, res) => {
  res.json({
    version: 2,
    users,
  });
});

/* descibe nd it gives an error if not commented
 describe('Versioned API', () => {
   it('tests v1 users', async () => {
     await request(app).get('/api/v1/users').expect(200);
   });
   it('tests v2 users', async () => {
     await request(app).get('/api/v2/users').expect(200);
   });
 });
*/
export async function solve_17_coverage_mocking_versioned_api_tests() {
  const v1Response = await request(app).get('/api/v1/users');
  const v2Response = await request(app).get('/api/v2/users');

  return {
    v1Status: v1Response.status,
    v2Status: v2Response.status,
  };
}