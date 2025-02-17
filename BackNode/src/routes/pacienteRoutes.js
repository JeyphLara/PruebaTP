const express = require('express');
const { createPaciente, getPacientes, getPacienteById, updatePaciente, deletePaciente } = require('../controls/pacienteController');
const authMiddleware = require('../middlewares/authMiddleware');
const { getMedicosConPacientes } = require('../controls/medicoController');
const { getPacientesSinConsulta, cambiarMedicoPaciente } = require('../controls/pacienteController');

const router = express.Router();

router.post('/crear',  createPaciente);
router.get('/ver', getPacientes);
router.get('/:id',  getPacienteById);
router.put('/:id',  updatePaciente);
router.delete('/:id',  deletePaciente);
router.get('/medicos-con-pacientes', getMedicosConPacientes);
router.get('/pacientes-sin-consulta', getPacientesSinConsulta);
router.put('/pacientes/:id/cambiar-medico', cambiarMedicoPaciente);


module.exports = router;
