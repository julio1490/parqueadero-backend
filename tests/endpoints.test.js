
const express = require('express');
const request = require('supertest');

// Simulamos la base de datos a través del servicio.
jest.mock('../src/services/parqueaderoService', () => ({
  obtenerEstado: jest.fn(),
  registrarVehiculo: jest.fn(),
  listarVehiculos: jest.fn()
}));

const jwt = require('jsonwebtoken');
const servicio = require('../src/services/parqueaderoService');
const healthRoutes = require('../src/routes/healthRoutes');
const parqueaderoRoutes = require('../src/routes/parqueaderoRoutes');

const app = express();
app.use(express.json());
app.use('/api/health', healthRoutes);
app.use('/api/parqueadero', parqueaderoRoutes);

const estado = {
  nombre: 'Sistema de Gestión de Parqueadero',
  estado: 'Activo',
  mensaje: 'Servicio de parqueadero funcionando'
};

beforeEach(() => {
  jest.clearAllMocks();
  servicio.obtenerEstado.mockReturnValue(estado);
});

describe('10 pruebas de integración del parqueadero', () => {

  test('1. Health responde HTTP 200', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toBe(200);
  });

  test('2. Estado del parqueadero responde 200', async () => {
    const res = await request(app)
      .get('/api/parqueadero/estado');

    expect(res.statusCode).toBe(200);
  });

  test('3. Estado devuelve Activo', async () => {
    const res = await request(app)
      .get('/api/parqueadero/estado');

    expect(res.body.estado).toBe('Activo');
  });

  test('4. Registrar vehículo responde 201', async () => {
    const vehiculo = { placa: 'ABC123' };
    servicio.registrarVehiculo.mockResolvedValue(vehiculo);

    const res = await request(app)
      .post('/api/parqueadero/ingresar')
      .send(vehiculo);

    expect(res.statusCode).toBe(201);
  });

  test('5. Registrar vehículo devuelve JSON', async () => {
    const vehiculo = { placa: 'XYZ789' };
    servicio.registrarVehiculo.mockResolvedValue(vehiculo);

    const res = await request(app)
      .post('/api/parqueadero/ingresar')
      .send(vehiculo);

    expect(res.body.placa).toBe('XYZ789');
  });

  test('6. Placa duplicada devuelve 409', async () => {
    const error = new Error('Duplicado');
    error.code = 11000;
    servicio.registrarVehiculo.mockRejectedValue(error);

    const res = await request(app)
      .post('/api/parqueadero/ingresar')
      .send({ placa: 'ABC123' });

    expect(res.statusCode).toBe(409);
  });

  test('7. Error de registro devuelve 400', async () => {
    servicio.registrarVehiculo.mockRejectedValue(
      new Error('Datos inválidos')
    );

    const res = await request(app)
      .post('/api/parqueadero/ingresar')
      .send({ placa: '' });

    expect(res.statusCode).toBe(400);
  });

  test('8. Ruta privada sin token devuelve 401', async () => {
    const res = await request(app)
      .get('/api/parqueadero/vehiculos');

    expect(res.statusCode).toBe(401);
  });

  test('9. Ruta privada con token inválido devuelve 401', async () => {
    const res = await request(app)
      .get('/api/parqueadero/vehiculos')
      .set('Authorization', 'Bearer token-invalido');

    expect(res.statusCode).toBe(401);
  });

  test('10. Ruta inexistente devuelve 404', async () => {
    const res = await request(app)
      .get('/api/ruta-inexistente');

    expect(res.statusCode).toBe(404);
  });

});
