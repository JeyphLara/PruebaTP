const jwt = require('jsonwebtoken');
const config = require('../config/config');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Acceso denegado. No hay token.' });

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), config.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ error: 'Token inválido.' });
    }
};

module.exports = authMiddleware;
