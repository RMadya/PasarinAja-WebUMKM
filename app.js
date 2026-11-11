const express = require('express');
const path = require('path');
const { Client } = require('pg');
const { pool, sequelize } = require('./config/database');
const logger = require('./middlewares/logger');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Import Router dari folder routes
const routes = require('./routes');

// 1. Fungsi Otomatis Bikin Database jika belum ada
async function ensureDatabaseExists() {
  const client = new Client({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    password: process.env.DB_PASSWORD || '',
    port: Number(process.env.DB_PORT) || 5432,
    database: 'postgres',
  });

  try {
    await client.connect();
    await client.query('CREATE DATABASE "PasarinAja";');
    console.log('✅ Database "PasarinAja" berhasil dibuat!');
  } catch (err) {
    if (err.code === '42P04') {
      console.log('ℹ️ Database "PasarinAja" sudah ada, melanjutkan koneksi...');
    } else {
      console.log('⚠️ Warning Database:', err.message || err.code || err);
    }
  } finally {
    await client.end().catch(() => {});
  }
}

// 2. Fungsi Otomatis Bikin Tabel produk jika belum ada (via pg)
async function ensureTableExists() {
  const query = `
    CREATE TABLE IF NOT EXISTS "produk" (
      "id" SERIAL PRIMARY KEY,
      "nama" VARCHAR(255) NOT NULL,
      "kategori" VARCHAR(255) NOT NULL,
      "harga" INTEGER NOT NULL,
      "deskripsi" TEXT,
      "umkm" VARCHAR(255),
      "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
      "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
    );
  `;
  await pool.query(query);
  console.log('✅ Tabel "produk" siap digunakan di PostgreSQL!');
}

// 3. Konfigurasi View Engine (EJS) & Middleware Express
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// 4. Hubungkan Semua Rute Aplikasi dari folder routes
app.use('/', routes);

// 5. Jalankan Server & Koneksi Database
async function startServer() {
  await ensureDatabaseExists();

  try {
    await ensureTableExists();
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('✅ Berhasil terhubung ke database PostgreSQL!');

    app.listen(PORT, () => {
      console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Gagal konek database:', error.message || error.code || error);
    console.log('ℹ️ Tips: Pastikan PostgreSQL service sudah aktif di localhost:5432 dan kredensial di .env sudah sesuai.');
    // Tetap jalankan server agar frontend & endpoint tetap dapat diakses
    app.listen(PORT, () => {
      console.log(`🚀 Server tetap berjalan di http://localhost:${PORT} (Mode Offline / Database Belum Terhubung)`);
    });
  }
}

startServer();
