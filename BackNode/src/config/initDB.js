const mysql = require('mysql2/promise');
const db = require('./db');

async function createTables() {
    const connection = await db.getConnection();
    try {
        await connection.query(`
            CREATE TABLE IF NOT EXISTS usuarios (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nombre VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                rol ENUM('medico', 'admin') NOT NULL
            );
        `);

        await connection.query(`
            CREATE TABLE IF NOT EXISTS medicos (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nombre VARCHAR(100) NOT NULL,
                cedula VARCHAR(20) UNIQUE NOT NULL,
                especialidad VARCHAR(100) NOT NULL,
                ciudad VARCHAR(100) NOT NULL,
                usuario_id INT UNIQUE,
                FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL
            );
        `);

        await connection.query(`
            CREATE TABLE IF NOT EXISTS pacientes (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nombre VARCHAR(100) NOT NULL,
                cedula VARCHAR(20) UNIQUE NOT NULL,
                medico_id INT,
                fecha_ultima_consulta DATE,
                FOREIGN KEY (medico_id) REFERENCES medicos(id) ON DELETE SET NULL
            );
        `);

        await connection.query(`
            CREATE TABLE IF NOT EXISTS consultas (
                id INT AUTO_INCREMENT PRIMARY KEY,
                paciente_id INT NOT NULL,
                medico_id INT NOT NULL,
                fecha_consulta DATE NOT NULL,
                FOREIGN KEY (paciente_id) REFERENCES pacientes(id) ON DELETE CASCADE,
                FOREIGN KEY (medico_id) REFERENCES medicos(id) ON DELETE CASCADE,
                UNIQUE (paciente_id, fecha_consulta)
            );
        `);
    } catch (error) {
        console.error('Error creando tablas:', error);
    } finally {
        connection.release();
    }
}

module.exports = { createTables };

// Para Ejecutar automáticamente al iniciar el servidor
if (require.main === module) {
    createTables().then(() => {
        console.log('Tablas creadas o ya existen.');
        process.exit();
    }).catch(error => {
        console.error('Error al ejecutar la creación de tablas:', error);
        process.exit(1);
    });
}
