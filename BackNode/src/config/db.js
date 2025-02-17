
// const mysql = require('mysql2/promise');
// const dotenv = require('dotenv');
// dotenv.config();



// const connection = mysql.createConnection({
//     host: process.env.DB_HOST ,
//     user: process.env.DB_USER ,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
// });

// const getConnection =  async() =>  await connection;


// module.exports = {
//     getConnection
// }

const mysql = require('mysql2/promise');
const config = require('./config');

const pool = mysql.createPool({
    host: config.DB_HOST,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;
