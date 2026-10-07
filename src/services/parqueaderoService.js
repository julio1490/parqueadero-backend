// Servicio: contiene la lógica del parqueadero

const obtenerEstado = () => {
    return {
        nombre: "Sistema de Gestión de Parqueadero",
        estado: "Activo",
        mensaje: "Servicio de parqueadero funcionando"
    };
};

module.exports = { obtenerEstado };
