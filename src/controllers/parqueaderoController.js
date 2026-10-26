const parqueaderoService = require('../services/parqueaderoService');

const consultarEstado = (req, res) => {
  res.status(200).json(parqueaderoService.obtenerEstado());
};

const registrarVehiculo = async (req, res) => {
  try {
    const vehiculo = await parqueaderoService.registrarVehiculo(req.body);
    res.status(201).json(vehiculo);
  } catch (error) {
    res.status(error.code === 11000 ? 409 : 400).json({
      mensaje: error.code === 11000
        ? 'Esa placa ya está registrada'
        : 'No se pudo registrar el vehículo',
      error: error.message
    });
  }
};

const listarVehiculos = async (req, res) => {
  try {
    const vehiculos = await parqueaderoService.listarVehiculos();
    res.status(200).json(vehiculos);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

module.exports = {
  consultarEstado,
  registrarVehiculo,
  listarVehiculos
};
