const db = require('../config/db');

exports.getUserById = async (id) => {
    const [users] = await db.query('SELECT id, nombre, email FROM usuarios WHERE id = ?', [id]);
    if (users.length === 0) throw new Error('Usuario no encontrado');
    return users[0];
};
