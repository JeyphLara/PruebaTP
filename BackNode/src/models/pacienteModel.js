const db = require('../config/db');

exports.createTable = async () => {
    await db.query(`
        CREATE TABLE IF NOT EXISTS pacientes (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nombre VARCHAR(255) NOT NULL,
            cedula VARCHAR(20) UNIQUE NOT NULL,
            medico_id INT,
            fecha_ultima_consulta DATE,
            FOREIGN KEY (medico_id) REFERENCES medicos(id) ON DELETE SET NULL
        )
    `);
};
