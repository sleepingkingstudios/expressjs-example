const request = require('supertest');

const app = require('./index');

describe('GET /api', () => {
  it('should respond with 200 OK', async () => {
    const response = await request(app).get('/api');

    expect(response.statusCode).toBe(200);
  });

  it('should respond with { ok: true }', async () => {
    const response = await request(app).get('/api');

    expect(response.body).toEqual({ ok: true });
  });
});
