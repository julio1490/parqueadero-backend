const express = require("express");
const router = express.Router();

const usuarioService = require("../services/usuarioService");
const { generarTokenParaUsuario } = require("../utils/generarToken");

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { password } = req.body;
    const identificador = req.body.correo || req.body.email || req.body.usuario;

    if (!identificador || !password) {
      return res.status(400).json({
        mensaje: "Debes proporcionar usuario y contraseña",
      });
    }

    // Consultar el usuario usando el servicio existente.
    // La función de consulta debe devolver el usuario de MongoDB.
    const usuario = await usuarioService.buscarUsuarioParaLogin(identificador);

    if (!usuario) {
      return res.status(401).json({
        mensaje: "Credenciales incorrectas",
      });
    }

    const token = await generarTokenParaUsuario(usuario, password);

    if (!token) {
      return res.status(401).json({
        mensaje: "Credenciales incorrectas",
      });
    }

    return res.status(200).json({
      mensaje: "Inicio de sesión exitoso",
      token,
      usuario: {
        id: usuario._id.toString(),
        rol: usuario.rol,
      },
    });
  } catch (error) {
    console.error("Error en login:", error.message);

    return res.status(500).json({
      mensaje: "Error interno al iniciar sesión",
    });
  }
});

module.exports = router;
