const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  correo: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  passwordHash: {
    type: String,
    required: true,
    select: false
  },
  rol: {
    type: String,
    enum: ['administrador', 'operador'],
    default: 'operador'
  },
  activo: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Usuario', usuarioSchema);