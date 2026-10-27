const express = require("express");
const router = express.Router();
const controller = require("../controllers/parqueaderoController");
const { verificarToken } = require("../middleware/authMiddleware");

router.get("/estado", controller.consultarEstado);
router.post("/ingresar", controller.registrarVehiculo);
router.get("/vehiculos", verificarToken, controller.listarVehiculos);

module.exports = router;
