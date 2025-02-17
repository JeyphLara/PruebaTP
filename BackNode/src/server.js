const express = require('express');
const cors = require('cors');
const config = require('./config/config');
const usuarioRoutes = require('../src/routes/usuarioRouter');
const medicoRoutes = require('./routes/medicoRoutes');
const pacienteRoutes = require('./routes/pacienteRoutes');
const consultaRoutes = require('./routes/consultaRoutes');
const errorMiddleware = require('./middlewares/errorMiddleware');

const adminRoutes = require('./routes/adminRoutes');


const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/medicos', medicoRoutes);
app.use('/api/pacientes', pacienteRoutes);
app.use('/api/consultas', consultaRoutes);

app.use('/api/admin', adminRoutes);
app.use(errorMiddleware);

const PORT = config.PORT;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});




















































































// const express = require('express');
// const morgan = require('morgan');
// const database = require('./config/db');
// const cors = require('cors');
// const bodyParser = require('body-parser'); // Para poder recibir el body

// const app = express();

// app.set("port", 4000);
// app.listen(app.get("port"));
// console.log("listening on port " + app.get("port"));

// // Middleware
// app.use(cors({
//   origin: '*',
// }));

// app.use(morgan("dev"));
// app.use(bodyParser.json()); // Para que pueda leer los datos JSON en el body

// //MEDICOS

// // Ruta GET para obtener médicos
// app.get("/medicos", async (req, res) => {
//   const connection = await database.getConnection();
//   const resultado = await connection.query("SELECT * FROM medico");
//   res.json(resultado);
// });

// // Ruta POST para registrar un nuevo médico
// app.post("/medicos", async (req, res) => {
//   const { nombre, cedula, especialidad, ciudad } = req.body;

//   if (!nombre || !cedula || !especialidad || !ciudad) {
//     return res.status(400).json({ message: "Todos los campos son obligatorios" });
//   }

//   const connection = await database.getConnection();
//   try {
//     // Insertamos el nuevo médico en la base de datos
//     const result = await connection.query(
//       "INSERT INTO Medico (nombre, cedula, especialidad, ciudad) VALUES (?, ?, ?, ?)",
//       [nombre, cedula, especialidad, ciudad]
//     );
//     res.status(201).json({ message: "Médico registrado exitosamente", id: result.insertId });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error al registrar el médico" });
//   }
// });

// //PACIENTES
// app.post("/pacientes", async (req, res) => {
//   const { nombre, cedula, id_medico, fecha_ultima_consulta } = req.body;

//   if (!nombre || !cedula || !id_medico || !fecha_ultima_consulta) {
//     return res.status(400).json({ message: "Todos los campos son obligatorios" });
//   }

//   const connection = await database.getConnection();
//   try {
//     // Insertamos el nuevo paciente en la base de datos
//     const result = await connection.query(
//       "INSERT INTO Paciente (nombre, cedula, id_medico, fecha_ultima_consulta) VALUES (?, ?, ?, ?)",
//       [nombre, cedula, id_medico, fecha_ultima_consulta]
//     );
//     res.status(201).json({ message: "Paciente registrado exitosamente", id: result.insertId });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error al registrar el paciente" });
//   }
// });

// //CONSULTAS

// app.post("/consultas", async (req, res) => {
//   const { id_paciente, id_medico, fecha_consulta, nota_consulta } = req.body;

//   if (!id_paciente || !id_medico || !fecha_consulta) {
//     return res.status(400).json({ message: "Todos los campos son obligatorios" });
//   }

//   const connection = await database.getConnection();
//   try {
//     // Insertamos la consulta en la base de datos
//     const result = await connection.query(
//       "INSERT INTO Consulta (id_paciente, id_medico, fecha_consulta, nota_consulta) VALUES (?, ?, ?, ?)",
//       [id_paciente, id_medico, fecha_consulta, nota_consulta || null]
//     );
//     res.status(201).json({ message: "Consulta registrada exitosamente", id: result.insertId });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error al registrar la consulta" });
//   }
// });
