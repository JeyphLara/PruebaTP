const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../config/db');
const config = require('../config/config');

exports.register = async (nombre, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.query(
        'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)',
        [nombre, email, hashedPassword]
    );
    return { id: result.insertId, nombre, email };
};

exports.login = async (email, password) => {
    const [users] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    if (users.length === 0) throw new Error('Usuario no encontrado');
    
    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Credenciales inválidas');
    
    const token = jwt.sign({ id: user.id, email: user.email }, config.JWT_SECRET, { expiresIn: config.JWT_EXPIRES_IN });
    return { token, user: { id: user.id, nombre: user.nombre, email: user.email } };
};
