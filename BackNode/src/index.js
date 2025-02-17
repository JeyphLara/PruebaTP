const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/db');
const medicoRoutes = require('./routes/medicoRoutes');
const pacienteRoutes = require('./routes/pacienteRoutes');
const consultaRoutes = require('../src/routes/consultaRoutes');
const usuarioRoutes = require('./routes/usuarioRouter');
const errorMiddleware = require('./middlewares/errorMiddleware');
const authMiddleware = require('./middlewares/authMiddleware');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/medicos', authMiddleware, medicoRoutes);
app.use('/api/pacientes', authMiddleware, pacienteRoutes);
app.use('/api/consultas', authMiddleware, consultaRoutes);
app.use('/api/usuarios', usuarioRoutes);

// Middleware de manejo de errores
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
    try {
        await db.authenticate();
        console.log('Conectado a la base de datos');
    } catch (error) {
        console.error('Error de conexión a la base de datos:', error);
    }
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
