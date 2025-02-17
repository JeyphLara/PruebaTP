const bcrypt = require('bcryptjs');
const config = require('../config/config'); 
const jwt = require('jsonwebtoken');
const db = require('../config/db');

exports.register = async (req, res) => {
    const { nombre, email, password, rol, medico } = req.body;
    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertar usuario
        const [userResult] = await connection.query(
            'INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?)',
            [nombre, email, hashedPassword, rol]
        );
        const userId = userResult.insertId;

        // Si el usuario es médico, insertar en la tabla medicos
        if (rol === "medico" && medico) {
            await connection.query(
                'INSERT INTO medicos (usuario_id, nombre, cedula, especialidad, ciudad) VALUES (?, ?, ?, ?, ?)',
                [userId, nombre, medico.cedula, medico.especialidad, medico.ciudad]
            );
        }

        await connection.commit();
        res.status(201).json({ message: 'Usuario y médico registrados', id: userId });
    } catch (error) {
        await connection.rollback();
        console.error("Error en el registro:", error);
        res.status(500).json({ error: "Error registrando usuario y médico" });
    } finally {
        connection.release();
    }
};


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verificar si el usuario existe
        const [user] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);

        if (user.length === 0) {
            console.log("Usuario no encontrado:", email);
            return res.status(401).json({ error: 'Usuario no encontrado' });
        }

        const usuario = user[0];
        console.log("Usuario encontrado:", usuario);

        // Comparar la contraseña
        const isMatch = await bcrypt.compare(password, usuario.password);
        if (!isMatch) {
            console.log("Contraseña incorrecta para:", email);
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        // Generar JWT
        const token = jwt.sign(
            { id: usuario.id, email: usuario.email, rol: usuario.rol },
            config.JWT_SECRET,
            { expiresIn: '1h' }
        );

        console.log(" Login exitoso para:", email);
        res.json({ message: 'Login exitoso', token,  rol: usuario.rol, user});

    } catch (error) {
        console.error(" Error en login:", error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

exports.getUser = async (req, res) => {
    try {
        const [users] = await db.query('SELECT id, nombre, email, rol FROM usuarios WHERE id = ?', [req.user.id]);
        if (users.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
        res.json(users[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error obteniendo usuario' });
    }
};
