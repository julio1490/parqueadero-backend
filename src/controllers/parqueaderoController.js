const parqueaderoService = require('../services/parqueaderoService');

const consultarEstado = (req, res) => {
    const resultado = parqueaderoService.obtenerEstado();
    res.status(200).json(resultado);
};

module.exports = { consultarEstado };

