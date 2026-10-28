
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function generarTokenParaUsuario(usuario, passwordIngresada) {
  const passwordValida = await bcrypt.compare(
    passwordIngresada,
    usuario.passwordHash
  );

  if (!passwordValida) {
    return null;
  }

  if (!process.env.JWT_SECRET) {
    throw new Error("Falta configurar JWT_SECRET en el archivo .env");
  }

  return jwt.sign(
    {
      id: usuario._id.toString(),
      rol: usuario.rol,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "1h",
    }
  );
}

module.exports = { generarTokenParaUsuario };
