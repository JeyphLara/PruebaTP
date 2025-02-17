const db = require('../config/db');

exports.createConsulta = async (req, res) => {
    const { paciente_id, fecha_consulta } = req.body;
    try {
        const [existing] = await db.query(
            'SELECT * FROM consultas WHERE paciente_id = ? AND fecha_consulta = ?',
            [paciente_id, fecha_consulta]
        );
        if (existing.length > 0) return res.status(400).json({ error: 'Ya existe una consulta para este paciente en esta fecha' });

        const [result] = await db.query(
            'INSERT INTO consultas (paciente_id, fecha_consulta) VALUES (?, ?)',
            [paciente_id, fecha_consulta]
        );
        res.status(201).json({ message: 'Consulta registrada', id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: 'Error registrando consulta' });
    }
};

exports.getConsultas = async (req, res) => {
    try {
        const [consultas] = await db.query('SELECT * FROM consultas');
        res.json(consultas);
    } catch (error) {
        res.status(500).json({ error: 'Error obteniendo consultas' });
    }
};

exports.getConsultaById = async (req, res) => {
    try {
        const [consultas] = await db.query('SELECT * FROM consultas WHERE id = ?', [req.params.id]);
        if (consultas.length === 0) return res.status(404).json({ error: 'Consulta no encontrada' });
        res.json(consultas[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error obteniendo consulta' });
    }
};

exports.updateConsulta = async (req, res) => {
    const { fecha_consulta } = req.body;
    try {
        await db.query(
            'UPDATE consultas SET fecha_consulta = ? WHERE id = ?',
            [fecha_consulta, req.params.id]
        );
        res.json({ message: 'Consulta actualizada' });
    } catch (error) {
        res.status(500).json({ error: 'Error actualizando consulta' });
    }
};

exports.deleteConsulta = async (req, res) => {
    try {
        await db.query('DELETE FROM consultas WHERE id = ?', [req.params.id]);
        res.json({ message: 'Consulta eliminada' });
    } catch (error) {
        res.status(500).json({ error: 'Error eliminando consulta' });
    }
};
