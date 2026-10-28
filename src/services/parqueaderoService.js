const Vehiculo = require('../models/vehiculo');


const obtenerEstado = () => ({
  nombre: 'Sistema de Gestión de Parqueadero',
  estado: 'Activo',
  mensaje: 'Servicio de parqueadero funcionando'
});

const registrarVehiculo = async (datos) => {
  return Vehiculo.create(datos);
};

const listarVehiculos = async () => {
  return Vehiculo.find().sort({ fechaEntrada: -1 });
};

module.exports = {
  obtenerEstado,
  registrarVehiculo,
  listarVehiculos
};
