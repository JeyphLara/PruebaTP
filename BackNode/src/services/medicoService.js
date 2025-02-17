const db = require('../config/db');

exports.createMedico = async (nombre, cedula, especialidad, ciudad) => {
    const [result] = await db.query(
        'INSERT INTO medicos (nombre, cedula, especialidad, ciudad) VALUES (?, ?, ?, ?)',
        [nombre, cedula, especialidad, ciudad]
    );
    return { id: result.insertId, nombre, cedula, especialidad, ciudad };
};

exports.getMedicos = async () => {
    const [medicos] = await db.query('SELECT * FROM medicos');
    return medicos;
};

exports.getMedicoById = async (id) => {
    const [medicos] = await db.query('SELECT * FROM medicos WHERE id = ?', [id]);
    if (medicos.length === 0) throw new Error('Médico no encontrado');
    return medicos[0];
};

exports.updateMedico = async (id, nombre, cedula, especialidad, ciudad) => {
    await db.query(
        'UPDATE medicos SET nombre = ?, cedula = ?, especialidad = ?, ciudad = ? WHERE id = ?',
        [nombre, cedula, especialidad, ciudad, id]
    );
    return { id, nombre, cedula, especialidad, ciudad };
};

exports.deleteMedico = async (id) => {
    await db.query('DELETE FROM medicos WHERE id = ?', [id]);
    return { message: 'Médico eliminado' };
};
