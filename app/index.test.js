const request = require('supertest');

const app = require('./index');

describe('GET /api', () => {
  it('should respond with 200 OK', async (done) => {
    const response = await request(app).get('/api');

    expect(response.statusCode).toBe(200);

    done();
  });

  it('should respond with { ok: true }', async (done) => {
    const response = await request(app).get('/api');

    expect(response.body).toEqual({ ok: true });

    done();
  });
});
