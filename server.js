require('dotenv').config();

const express = require('express');
const parqueaderoRoutes = require('./src/routes/parqueaderoRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'Servidor del Sistema de Parqueadero funcionando correctamente'
    });
});

app.use('/api/parqueadero', parqueaderoRoutes);

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
