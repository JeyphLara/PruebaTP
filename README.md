# PruebaTecnicaPromedico

# Proyecto de Gestión Médica

Este proyecto tiene como objetivo desarrollar una aplicación que gestione la relación entre médicos y sus pacientes. La aplicación consta de una API backend construida con Node.js y un frontend en React, permitiendo que los médicos gestionen a sus pacientes, realicen el seguimiento de consultas. El software resuelve la necesidad de la empresa Company INC de proporcionar a los médicos una herramienta para administrar sus pacientes y facilitar la asignación, seguimiento y consulta de los datos médicos.
La aplicación permite la gestión de los datos de los médicos y pacientes, así como la asignación de pacientes a médicos específicos. También incluye funcionalidades de autenticación para garantizar que solo los médicos autenticados puedan acceder a sus datos y realizar modificaciones.


# Características
- CRUD de médicos y pacientes.
- Asignación de pacientes a médicos.
- Registro y seguimiento de consultas médicas.
- Reportes básicos.
- Autenticación con JWT (solo médicos autenticados pueden gestionar sus pacientes).

#  Tecnologías utilizadas
- Backend: Node.js con autenticación JWT.
- Frontend: React con React Router y React Hooks.
- Base de datos: MySQL.

# Requisitos previos
Antes de instalar el proyecto, asegúrate de tener instalados:
- [Node.js](https://nodejs.org/) y npm.
- Tener MySQL instalado en local con usuario root y contrseña superAdmin, usar MySQL workbench para gestionar las bases de datos.

## Instalación
1. En MySQL, ajecutar el script.sql que está en la raíz del archivo adjuntado.
2. Clona el repositorio
3. 3. Configura el archivo `.env`
4. Abrir el backend en la teminal y ejecutar el siguiente comando para instalar dependencias: npm install
5. En la misma terminal, ejecutar el Backend en local desde la consola de comandos con el siguiente comando: node ./src/service.js
6. Abrir el Frontend en una nueva terminal e instalar las dependencias con el siguiente comando npm install
7. En la misma terminal, ejecutar el Frontend con el siguiente comando: npm run dev
8. Abrir un navegador e ingresar a la url donde está corriendo el Frontend

# Uso

# Registro e inicio de sesión
1. Abre la aplicación en `http://localhost:5173`.
2. Hay un usuario por defecto que sirve como administrador, con el cual puede acceder a registrar un paciente y asignarlo a un medico; email: Admin@admin.com  password: Admin
4. Gestiona pacientes y medicos.

### API Endpoints principales
#### Autenticación
- `POST /api/usuarios/login` - Iniciar sesión.
- `POST /api/usuarios/register` - Registrar usuario.

#### Médicos
- `GET /api/medicos/verMedico` - Listar médicos.
- `GET /api/medicos/:id` - Obtener detalles de un médico.
- `POST /api/medicos/crearMedico` - Crear un médico.
- `PUT /api/medicos/:id` - Actualizar un médico.
- `DELETE /api/medicos/:id'` - Eliminar un médico.

#### Pacientes
- `GET /api/pacientes/ver` - Listar pacientes.
- `GET /api/pacientes/:id` - Obtener detalles de un paciente.
- `POST /api/pacientes/crear` - Crear un paciente.
- `PUT /api/pacientes/:id` - Actualizar un paciente.
- `DELETE /api/pacientes/:id` - Eliminar un paciente.

#### Consultas
- `POST /api/consultas/crear` - Registrar una consulta.
- `GET /api/consultas/ver` - Obtener consultas de un paciente.

## Base de datos
El sistema utiliza una base de datos MySQL con las siguientes tablas principales:
- `usuarios`: Contiene la información de médicos y administradores para iniciar sesion.
- `medicos`: Continene la información de los médicos 
- `pacientes`: Contiene la información de los pacientes.
- `consultas`: Registra las consultas médicas realizadas a los pacientes.
  
-	Medico: Esta tabla hace referencia a los asociados de la empresa que en este caso son los profesionales de la medicina. 
Esta tabla contiene los datos del médico. La clave primaria es id y la cédula es única.

-	Paciente: Hace referencia a las personas que serán atendidas por los profesionales.
La clave primaria es id. Cada paciente tiene una clave foránea id_medico que hace referencia a un médico. Además, tiene un campo para la fecha de la última consulta.

-	Consulta:
La clave primaria es id. Tiene dos claves foráneas, una para id_paciente y otra para id_medico. Se asegura que cada paciente tenga solo una consulta por día mediante una restricción única combinada

-	Usuario: Representa los usuarios creados para que los médicos se puedan autenticar en el sistema e iniciar sesión.
El campo email es único y contiene la contraseña hasheada.


