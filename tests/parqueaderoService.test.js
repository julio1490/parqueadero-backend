jest.mock('../src/models/Vehiculo', () => ({}));

const { obtenerEstado } = require('../src/services/parqueaderoService');

test('devuelve el estado activo del parqueadero', () => {
  const resultado = obtenerEstado();

  expect(resultado).toHaveProperty('estado', 'Activo');
  expect(resultado).toHaveProperty('nombre');
});
