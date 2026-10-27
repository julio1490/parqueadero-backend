const jwt = require("jsonwebtoken");

function verificarToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      mensaje: "Se requiere un token de autenticación",
    });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      mensaje: "Token no proporcionado",
    });
  }

  try {
    const usuario = jwt.verify(token, process.env.JWT_SECRET);

    req.usuario = usuario;
    next();
  } catch (error) {
    return res.status(401).json({
      mensaje: "Token inválido o expirado",
    });
  }
}

function verificarRol(...rolesPermitidos) {
  return (req, res, next) => {
    if (!req.usuario) {
      return res.status(401).json({
        mensaje: "Debes iniciar sesión",
      });
    }

    if (!rolesPermitidos.includes(req.usuario.rol)) {
      return res.status(403).json({
        mensaje: "No tienes permisos para realizar esta acción",
      });
    }

    next();
  };
}

module.exports = {
  verificarToken,
  verificarRol,
};
