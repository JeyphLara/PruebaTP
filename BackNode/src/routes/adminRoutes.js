const express = require('express');
const { getMedicosConPacientes } = require('../controls/medicoController');
const { getPacientesSinConsulta, cambiarMedicoPaciente } = require('../controls/pacienteController');

const router = express.Router();

router.get('/medicos-con-pacientes', getMedicosConPacientes);
router.get('/pacientes-sin-consulta', getPacientesSinConsulta);
router.put('/pacientes/:id/cambiar-medico', cambiarMedicoPaciente);

module.exports = router;
