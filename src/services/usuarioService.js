const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');

const crearUsuario = async (datos) => {
  const passwordHash = await bcrypt.hash(datos.contrasena, 10);

  const usuario = await Usuario.create({
    nombre: datos.nombre,
    correo: datos.correo,
    passwordHash,
    rol: datos.rol
  });

  return {
    _id: usuario._id,
    nombre: usuario.nombre,
    correo: usuario.correo,
    rol: usuario.rol,
    activo: usuario.activo
  };
};

const listarUsuarios = async () => {
  return Usuario.find().select('-passwordHash');
};

const buscarUsuario = async (id) => {
  return Usuario.findById(id).select('-passwordHash');
};

const actualizarUsuario = async (id, datos) => {
  const cambios = {};

  for (const campo of ['nombre', 'correo', 'rol', 'activo']) {
    if (datos[campo] !== undefined) cambios[campo] = datos[campo];
  }

  return Usuario.findByIdAndUpdate(id, cambios, {
    new: true,
    runValidators: true
  }).select('-passwordHash');
};

const eliminarUsuario = async (id) => {
  return Usuario.findByIdAndDelete(id).select('-passwordHash');
};

module.exports = {
  crearUsuario,
  listarUsuarios,
  buscarUsuario,
  actualizarUsuario,
  eliminarUsuario
};