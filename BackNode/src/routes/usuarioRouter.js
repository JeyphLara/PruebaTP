const express = require('express');
const { register, login, getUser } = require('../controls/usuarioController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', authMiddleware, getUser);

module.exports = router;
