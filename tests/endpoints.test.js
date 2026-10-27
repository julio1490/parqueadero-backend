const express = require('express');
const request = require('supertest');
const healthRoutes = require('../src/routes/healthRoutes');

const app = express();
app.use('/api/health', healthRoutes);

test('GET /api/health responde correctamente', async () => {
  const respuesta = await request(app).get('/api/health');
  expect(respuesta.statusCode).toBe(200);
});
