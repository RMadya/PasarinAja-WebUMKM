-- ========================================================
-- Database Initialization Script for PasarinAja (PostgreSQL)
-- Proyek PAW - PasarinAja
-- ========================================================

-- 1. Buat Database (Jalankan jika database belum ada)
-- NOTE: Jika menggunakan psql / pgAdmin, Anda bisa mengeksekusi baris ini secara terpisah:
-- CREATE DATABASE "PasarinAja";

-- 2. Hubungkan ke database PasarinAja
-- \c "PasarinAja";

-- 3. Buat Tabel Produk
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

-- 4. Masukkan Data Awal (Seed Data)
INSERT INTO "produk" ("nama", "kategori", "harga", "deskripsi", "umkm", "createdAt", "updatedAt")
VALUES
    ('Keripik Singkong Original', 'Makanan & Minuman', 15000, 'Keripik singkong renyah dengan bumbu gurih, dikemas 250 gram.', 'Keripik Singkong Bu Sari', NOW(), NOW()),
    ('Kopi Bubuk Robusta', 'Makanan & Minuman', 25000, 'Kopi robusta asli pilihan dari petani lokal.', 'Kopi Desa Paseban', NOW(), NOW()),
    ('Madu Hutan Asli', 'Makanan & Minuman', 75000, 'Madu murni dari hutan penangkaran lokal.', 'Madu Hutan Lestari', NOW(), NOW()),
    ('Tas Tenun Tradisional', 'Kerajinan', 120000, 'Tas tangan tenun tangan motif khas daerah.', 'Tenun Indah', NOW(), NOW()),
    ('Gantungan Kunci Kayu', 'Kerajinan', 10000, 'Gantungan kunci ukiran kayu unik.', 'Kriya Kayu Kreatif', NOW(), NOW()),
    ('Peyek Kacang Renyah', 'Makanan & Minuman', 12000, 'Peyek kacang gurih dan renyah cocok untuk teman makan.', 'Peyek Bu Minah', NOW(), NOW()),
    ('Sambal Terasi Botol', 'Makanan & Minuman', 20000, 'Sambal terasi rumahan pedas nikmat siap saji.', 'Sambal Sedap', NOW(), NOW()),
    ('Peci Rajut Handmade', 'Fashion', 30000, 'Peci rajut tangan yang adem dan nyaman dipakai.', 'Rajut Berkah', NOW(), NOW())
ON CONFLICT DO NOTHING;
