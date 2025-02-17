require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 5000,
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_USER: process.env.DB_USER || 'root',
    DB_PASSWORD: process.env.DB_PASSWORD || '',
    DB_NAME: process.env.DB_NAME || 'medicos_db',
    JWT_SECRET: process.env.JWT_SECRET || 'secreto_super_seguro',
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1h'
};
