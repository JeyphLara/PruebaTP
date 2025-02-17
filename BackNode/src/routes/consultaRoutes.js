const express = require('express');
const { createConsulta, getConsultas, getConsultaById, updateConsulta, deleteConsulta } = require('../controls/consultaController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/crear', createConsulta);
router.get('/ver',  getConsultas);
router.get('/:id',  getConsultaById);
router.put('/:id',  updateConsulta);
router.delete('/:id',  deleteConsulta);

module.exports = router;
