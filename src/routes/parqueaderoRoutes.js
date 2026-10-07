const express = require('express');
const router = express.Router();

const parqueaderoController = require('../controllers/parqueaderoController');

router.get('/estado', parqueaderoController.consultarEstado);

module.exports = router;

