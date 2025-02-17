const db = require('../config/db');

exports.createPaciente = async (req, res) => {
    const { nombre, cedula, medico_id, fecha_ultima_consulta } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO pacientes (nombre, cedula, medico_id, fecha_ultima_consulta) VALUES (?, ?, ?, ?)',
            [nombre, cedula, medico_id, fecha_ultima_consulta]
        );
        res.status(201).json({ message: 'Paciente registrado', id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: 'Error registrando paciente' });
    }
};

exports.getPacientes = async (req, res) => {
    try {
        const [pacientes] = await db.query('SELECT * FROM pacientes');
        res.json(pacientes);
    } catch (error) {
        res.status(500).json({ error: 'Error obteniendo pacientes' });
    }
};

exports.getPacienteById = async (req, res) => {
    try {
        const [pacientes] = await db.query('SELECT * FROM pacientes WHERE id = ?', [req.params.id]);
        if (pacientes.length === 0) return res.status(404).json({ error: 'Paciente no encontrado' });
        res.json(pacientes[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error obteniendo paciente' });
    }
};

exports.updatePaciente = async (req, res) => {
    const { nombre, cedula, medico_id, fecha_ultima_consulta } = req.body;

    try {
        // Obtener los datos actuales del paciente
        const [paciente] = await db.query('SELECT * FROM pacientes WHERE id = ?', [req.params.id]);
        if (paciente.length === 0) return res.status(404).json({ error: 'Paciente no encontrado' });

        // Mantener los valores anteriores si no se envían en la petición
        const newNombre = nombre || paciente[0].nombre;
        const newCedula = cedula || paciente[0].cedula;
        const newMedicoId = medico_id !== undefined ? medico_id : paciente[0].medico_id;
        const newFechaConsulta = fecha_ultima_consulta || paciente[0].fecha_ultima_consulta;

        await db.query(
            'UPDATE pacientes SET nombre = ?, cedula = ?, medico_id = ?, fecha_ultima_consulta = ? WHERE id = ?',
            [newNombre, newCedula, newMedicoId, newFechaConsulta, req.params.id]
        );

        res.json({ message: 'Paciente actualizado' });
    } catch (error) {
        console.error(" Error en updatePaciente:", error);
        res.status(500).json({ error: 'Error actualizando paciente', details: error.message });
    }
};


exports.deletePaciente = async (req, res) => {
    try {
        await db.query('DELETE FROM pacientes WHERE id = ?', [req.params.id]);
        res.json({ message: 'Paciente eliminado' });
    } catch (error) {
        res.status(500).json({ error: 'Error eliminando paciente' });
    }
};


// Listar pacientes sin consulta en los últimos 3 meses
exports.getPacientesSinConsulta = async (req, res) => {
    try {
        const [result] = await db.query(`
            SELECT * FROM pacientes
            WHERE fecha_ultima_consulta IS NULL 
            OR fecha_ultima_consulta < DATE_SUB(CURDATE(), INTERVAL 3 MONTH)
        `);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error obteniendo pacientes sin consulta reciente' });
    }
};

// Cambiar la asignación de un paciente a otro médico
exports.cambiarMedicoPaciente = async (req, res) => {
    const { medico_id } = req.body;
    try {
        const [paciente] = await db.query('SELECT * FROM pacientes WHERE id = ?', [req.params.id]);
        if (paciente.length === 0) return res.status(404).json({ error: 'Paciente no encontrado' });

        await db.query('UPDATE pacientes SET medico_id = ? WHERE id = ?', [medico_id, req.params.id]);
        res.json({ message: 'Médico asignado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error actualizando asignación de médico' });
    }
};

// Registrar consulta asegurando que solo haya una por día
exports.registrarConsulta = async (req, res) => {
    const { fecha_ultima_consulta } = req.body;
    try {
        const [paciente] = await db.query('SELECT * FROM pacientes WHERE id = ?', [req.params.id]);
        if (paciente.length === 0) return res.status(404).json({ error: 'Paciente no encontrado' });

        // Verificar si ya tiene una consulta en el mismo día
        if (paciente[0].fecha_ultima_consulta === fecha_ultima_consulta) {
            return res.status(400).json({ error: 'Este paciente ya tiene una consulta registrada hoy' });
        }

        await db.query('UPDATE pacientes SET fecha_ultima_consulta = ? WHERE id = ?', [fecha_ultima_consulta, req.params.id]);
        res.json({ message: 'Consulta registrada correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error registrando consulta' });
    }
};
