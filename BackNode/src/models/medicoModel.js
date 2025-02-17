const db = require('../config/db');

exports.createTable = async () => {
    await db.query(`
        CREATE TABLE IF NOT EXISTS medicos (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nombre VARCHAR(255) NOT NULL,
            cedula VARCHAR(20) UNIQUE NOT NULL,
            especialidad VARCHAR(255) NOT NULL,
            ciudad VARCHAR(255) NOT NULL
        )
    `);
};
