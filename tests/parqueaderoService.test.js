
jest.mock('../src/models/vehiculo', () => ({
  create: jest.fn(),
  find: jest.fn()
}));

const Vehiculo = require('../src/models/vehiculo');
const {
  obtenerEstado,
  registrarVehiculo,
  listarVehiculos
} = require('../src/services/parqueaderoService');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Pruebas unitarias del parqueadero', () => {
  test('1. Devuelve el nombre del sistema', () => {
    expect(obtenerEstado().nombre)
      .toBe('Sistema de Gestión de Parqueadero');
  });

  test('2. Devuelve estado Activo', () => {
    expect(obtenerEstado().estado).toBe('Activo');
  });

  test('3. Devuelve el mensaje correcto', () => {
    expect(obtenerEstado().mensaje)
      .toBe('Servicio de parqueadero funcionando');
  });

  test('4. Devuelve un objeto', () => {
    expect(obtenerEstado()).toEqual(expect.any(Object));
  });

  test('5. Devuelve tres propiedades', () => {
    expect(Object.keys(obtenerEstado())).toHaveLength(3);
  });

  test('6. Registrar vehículo llama al modelo', async () => {
    const datos = { placa: 'ABC123' };
    Vehiculo.create.mockResolvedValue(datos);

    await registrarVehiculo(datos);

    expect(Vehiculo.create).toHaveBeenCalledWith(datos);
  });

  test('7. Registrar vehículo devuelve el registro', async () => {
    const datos = { placa: 'XYZ789' };
    Vehiculo.create.mockResolvedValue(datos);

    await expect(registrarVehiculo(datos))
      .resolves.toEqual(datos);
  });

  test('8. Registrar vehículo propaga errores', async () => {
    Vehiculo.create.mockRejectedValue(new Error('Error BD'));

    await expect(registrarVehiculo({ placa: 'ABC123' }))
      .rejects.toThrow('Error BD');
  });

  test('9. Listar vehículos devuelve resultados', async () => {
    const vehiculos = [{ placa: 'ABC123' }];

    Vehiculo.find.mockReturnValue({
      sort: jest.fn().mockResolvedValue(vehiculos)
    });

    await expect(listarVehiculos())
      .resolves.toEqual(vehiculos);
  });

  test('10. Listar vehículos ordena por fecha descendente', async () => {
    const sort = jest.fn().mockResolvedValue([]);

    Vehiculo.find.mockReturnValue({ sort });

    await listarVehiculos();

    expect(sort).toHaveBeenCalledWith({ fechaEntrada: -1 });
  });
});
