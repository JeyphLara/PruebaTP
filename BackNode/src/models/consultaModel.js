const db = require('../config/db');

exports.createTable = async () => {
    await db.query(`
        CREATE TABLE IF NOT EXISTS consultas (
            id INT AUTO_INCREMENT PRIMARY KEY,
            paciente_id INT NOT NULL,
            medico_id INT NOT NULL,
            fecha DATE NOT NULL,
            FOREIGN KEY (paciente_id) REFERENCES pacientes(id) ON DELETE CASCADE,
            FOREIGN KEY (medico_id) REFERENCES medicos(id) ON DELETE CASCADE,
            UNIQUE KEY unique_consulta (paciente_id, fecha)
        )
    `);
};