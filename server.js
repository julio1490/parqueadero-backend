require("dotenv").config();

const express = require("express");
const conectarDB = require("./src/config/db");
const parqueaderoRoutes = require("./src/routes/parqueaderoRoutes");
const healthRoutes = require("./src/routes/healthRoutes");
const authRoutes = require("./src/routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Rutas
app.use("/api/health", healthRoutes);
app.use("/api/parqueadero", parqueaderoRoutes);
app.use("/api/auth", authRoutes);

// Ruta principal
app.get("/", (req, res) => {
  res.json({
    mensaje: "Servidor del Sistema de Parqueadero funcionando correctamente",
  });
});

// Iniciar servidor
const iniciarServidor = async () => {
  try {
    await conectarDB();

    app.listen(PORT, () => {
      console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("No se pudo iniciar el servidor:", error.message);
    process.exit(1);
  }
};

iniciarServidor();
