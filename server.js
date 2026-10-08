require('dotenv').config();

const express = require('express');
const conectarDB = require('./src/config/db');
const parqueaderoRoutes = require('./src/routes/parqueaderoRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Permitir recibir datos en formato JSON
app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
    res.json({
        message: 'Servidor del Sistema de Parqueadero funcionando correctamente'
    });
});

// Rutas del parqueadero
app.use('/api/parqueadero', parqueaderoRoutes);

// Iniciar servidor después de conectar MongoDB
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