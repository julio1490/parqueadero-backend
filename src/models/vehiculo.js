const mongoose = require('mongoose');

const vehiculoSchema = new mongoose.Schema({
  placa: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true
  },
  tipoVehiculo: {
    type: String,
    required: true,
    enum: ['Carro', 'Moto']
  },
  fechaEntrada: {
    type: Date,
    default: Date.now
  },
  fechaSalida: {
    type: Date,
    default: null
  }
});

module.exports = mongoose.model('Vehiculo', vehiculoSchema);
