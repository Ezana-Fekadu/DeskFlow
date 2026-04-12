const request = require('supertest');
const express = require('express');
const checkinsRouter = require('../routes/checkins');
const db = require('../database');

const app = express();
app.use(express.json());
app.use('/api/checkins', checkinsRouter);

describe('CheckIns Routes', () => {
  beforeEach(async () => {
    // Clear table
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM CheckIns', [], (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  });

  it('POST /api/checkins - create checkin', async () => {
    const res = await request(app)
      .post('/api/checkins')
      .send({
        resident_id: 1,
        clerk_id: 1,
        check_in_time: new Date().toISOString()
      });
    expect(res.status).toBe(200);
    expect(res.body.id).toBeDefined();
  });

  it('GET /api/checkins - read all', async () => {
    const res = await request(app).get('/api/checkins');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('PUT /api/checkins/:id - update checkout', async () => {
    // First create
    const createRes = await request(app)
      .post('/api/checkins')
      .send({
        resident_id: 1,
        clerk_id: 1,
        check_in_time: new Date().toISOString()
      });
    const id = createRes.body.id;

    const res = await request(app)
      .put(`/api/checkins/${id}`)
      .send({ check_out_time: new Date().toISOString() });
    expect(res.status).toBe(200);
    expect(res.body.changes).toBe(1);
  });

  it('DELETE /api/checkins/:id', async () => {
    // Create
    const createRes = await request(app)
      .post('/api/checkins')
      .send({
        resident_id: 1,
        clerk_id: 1,
        check_in_time: new Date().toISOString()
      });
    const id = createRes.body.id;

    const res = await request(app).delete(`/api/checkins/${id}`);
    expect(res.status).toBe(200);
    expect(res.body.deleted).toBe(1);
  });
});
