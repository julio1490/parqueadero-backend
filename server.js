require('dotenv').config();

const express = require('express');
const conectarDB = require('./src/config/db');
const parqueaderoRoutes = require('./src/routes/parqueaderoRoutes');
const healthRoutes = require('./src/routes/healthRoutes');
const usuarioRoutes = require('./src/routes/usuarioRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Leer datos enviados en formato JSON antes de cargar las rutas
app.use(express.json());

app.use('/api/health', healthRoutes);
app.use('/api/parqueadero', parqueaderoRoutes);
app.use('/api/usuarios', usuarioRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'Servidor del Sistema de Parqueadero funcionando correctamente'
  });
});

const iniciarServidor = async () => {
  try {
    await conectarDB();

    app.listen(PORT, () => {
      console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('No se pudo iniciar el servidor:', error.message);
    process.exit(1);
  }
};

iniciarServidor();