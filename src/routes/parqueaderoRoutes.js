const express = require('express');
const router = express.Router();
const controller = require('../controllers/parqueaderoController');

router.get('/estado', controller.consultarEstado);
router.post('/ingresar', controller.registrarVehiculo);
router.get('/vehiculos', controller.listarVehiculos);

module.exports = router;
