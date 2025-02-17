const express = require('express');
const { createMedico, getMedicos, getMedicoById, updateMedico, deleteMedico } = require('../controls/medicoController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/crearMedico', createMedico);
router.get('/verMedicos', getMedicos);
router.get('/:id',  getMedicoById);
router.put('/:id', updateMedico);
router.delete('/:id', deleteMedico);

module.exports = router;
