require('dotenv').config();
const { Sequelize } = require('sequelize');
const { Pool } = require('pg');

// 1. Koneksi langsung menggunakan pg (node-postgres) Pool
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'PasarinAja',
  port: Number(process.env.DB_PORT) || 5432,
});

// 2. Koneksi menggunakan Sequelize ORM
const sequelize = new Sequelize(
  process.env.DB_NAME || 'PasarinAja',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    dialect: 'postgres',
    logging: false,
  }
);

module.exports = sequelize;
module.exports.sequelize = sequelize;
module.exports.pool = pool;
