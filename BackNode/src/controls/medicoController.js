const config = require('../config/config'); 
const db = require('../config/db');

exports.createMedico = async (req, res) => {
    const { nombre, cedula, especialidad, ciudad } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO medicos (nombre, cedula, especialidad, ciudad) VALUES (?, ?, ?, ?)',
            [nombre, cedula, especialidad, ciudad]
        );
        res.status(201).json({ message: 'Médico registrado', id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: 'Error registrando médico' });
    }
};

exports.getMedicos = async (req, res) => {
    try {
        const [medicos] = await db.query('SELECT * FROM medicos');
        res.json(medicos);
    } catch (error) {
        res.status(500).json({ error: 'Error obteniendo médicos' });
    }
};

exports.getMedicoById = async (req, res) => {
    try {
        const [medicos] = await db.query('SELECT * FROM medicos WHERE id = ?', [req.params.id]);
        if (medicos.length === 0) return res.status(404).json({ error: 'Médico no encontrado' });
        res.json(medicos[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error obteniendo médico' });
    }
};

exports.updateMedico = async (req, res) => {
    const { nombre, cedula, especialidad, ciudad } = req.body;
    try {
        await db.query(
            'UPDATE medicos SET nombre = ?, cedula = ?, especialidad = ?, ciudad = ? WHERE id = ?',
            [nombre, cedula, especialidad, ciudad, req.params.id]
        );
        res.json({ message: 'Médico actualizado' });
    } catch (error) {
        res.status(500).json({ error: 'Error actualizando médico' });
    }
};

exports.deleteMedico = async (req, res) => {
    try {
        await db.query('DELETE FROM medicos WHERE id = ?', [req.params.id]);
        res.json({ message: 'Médico eliminado' });
    } catch (error) {
        res.status(500).json({ error: 'Error eliminando médico' });
    }
};

// Listar médicos con su cantidad de pacientes asignados
exports.getMedicosConPacientes = async (req, res) => {
    try {
        const [result] = await db.query(`
            SELECT m.id, m.nombre, COUNT(p.id) as cantidad_pacientes
            FROM medicos m
            LEFT JOIN pacientes p ON m.id = p.medico_id
            GROUP BY m.id, m.nombre
        `);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error obteniendo médicos con pacientes' });
    }
};

