# 🛒 PasarinAja - Katalog & Manajemen Produk UMKM Desa Paseban Kawis

[![Node.js](https://img.shields.io/badge/Node.js-v22+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17%2F18-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg?style=for-the-badge)](https://opensource.org/licenses/ISC)

> **PasarinAja** adalah aplikasi web modern berbasis Node.js, Express, dan PostgreSQL yang dirancang untuk mempromosikan, mengelola, dan mendigitalkan produk-produk UMKM Desa Paseban Kawis. Dibangun dengan arsitektur **MVC (Model-View-Controller)** dan antarmuka interaktif yang menerapkan **DOM Manipulation & Fetch API tanpa reload halaman**.

---

## 📌 Daftar Isi

- [Fitur Utama](#-fitur-utama)
- [Teknologi yang Digunakan](#-teknologi-yang-digunakan)
- [Struktur Database](#-struktur-database)
- [Struktur Direktori](#-struktur-direktori)
- [Panduan Instalasi & Penggunaan](#-panduan-instalasi--penggunaan)
- [Dokumentasi API](#-dokumentasi-api)
- [Pengujian Frontend (DOM Manipulation)](#-pengujian-frontend-dom-manipulation)
- [Lisensi](#-lisensi)

---

## ✨ Fitur Utama

- **⚡ Full RESTful API CRUD**:
  - `GET /api/produk` : Mengambil semua data produk (mendukung query filter `search` & `kategori`).
  - `POST /api/produk` : Menambahkan data produk baru ke database PostgreSQL.
  - `GET /api/produk/:id` : Mengambil detail satu produk berdasarkan ID.
  - `PUT /api/produk/:id` & `PATCH /api/produk/:id` : Memperbarui data produk.
  - `DELETE /api/produk/:id` : Menghapus produk dari database.
- **🔄 Interaksi Dinamis Tanpa Reload (DOM Manipulation & Fetch API)**:
  - Form input tambah produk langsung menyisipkan kartu produk ke tampilan layar secara instan (*optimistic/live DOM update*) tanpa merefresh browser.
  - Pengambilan data realtime dari backend melalui Fetch API.
- **🔍 Pencarian Real-Time & Filter**: Pencarian instan berdasarkan nama produk, deskripsi, atau UMKM langsung di sisi klien.
- **🛠️ Auto Database & Table Initialization**: Aplikasi otomatis membuat database `PasarinAja` dan tabel `produk` di PostgreSQL saat server dijalankan pertama kali.
- **📱 Antarmuka Responsif & Modern**: Desain bersih dengan Tailwind CSS, icon FontAwesome, dan modal detail interaktif.
- **🤖 Asisten Chatbot AI (Demo)**: Tampilan mockup konsultasi pemasaran produk untuk pelaku UMKM.

---

## 🛠️ Teknologi yang Digunakan

### Backend
- **Runtime**: [Node.js](https://nodejs.org/) (v18+)
- **Framework**: [Express.js](https://expressjs.com/) (v5)
- **Database Driver**: [pg (node-postgres)](https://node-postgres.com/) & [Sequelize ORM](https://sequelize.org/)
- **Environment**: [dotenv](https://github.com/motdotla/dotenv)

### Frontend
- **Template Engine**: [EJS (Embedded JavaScript)](https://ejs.co/)
- **Styling**: [Tailwind CSS CDN](https://tailwindcss.com/)
- **Typography**: Google Font (*Bricolage Grotesque*)
- **Scripting**: Pure JavaScript (Fetch API, Async/Await, DOM Manipulation)

### Database
- **DBMS**: [PostgreSQL](https://www.postgresql.org/) (Port 5432)

---

## 🗄️ Struktur Database

Database: **`PasarinAja`**  
Tabel: **`produk`**

| Kolom | Tipe Data | Deskripsi | Atribut |
|---|---|---|---|
| `id` | `SERIAL` | ID unik produk | Primary Key, Auto-increment |
| `nama` | `VARCHAR(255)` | Nama produk UMKM | NOT NULL |
| `kategori` | `VARCHAR(255)` | Kategori usaha produk | NOT NULL |
| `harga` | `INTEGER` | Harga produk dalam Rupiah | NOT NULL |
| `deskripsi` | `TEXT` | Deskripsi lengkap produk | NULL |
| `umkm` | `VARCHAR(255)` | Nama UMKM / Pemilik usaha | NULL |
| `createdAt` | `TIMESTAMPTZ` | Waktu pembuatan data | DEFAULT CURRENT_TIMESTAMP |
| `updatedAt` | `TIMESTAMPTZ` | Waktu terakhir data diupdate | DEFAULT CURRENT_TIMESTAMP |

Skrip SQL manual tersedia di file [`database.sql`](./database.sql).

---

## 📂 Struktur Direktori

```text
PAW-Project-PasarinAja-main/
├── .env                      # Konfigurasi variabel lingkungan (Port & Kredensial DB)
├── .env.example              # Template contoh variabel lingkungan
├── .gitignore                # File & folder yang diabaikan Git
├── app.js                    # Entry point server Express & inisialisasi database
├── database.sql              # Skrip DDL & seed PostgreSQL mandiri
├── package.json              # Metadata dependensi & skrip npm
├── package-lock.json
│
├── config/
│   └── database.js           # Konfigurasi koneksi PostgreSQL (pg Pool & Sequelize)
│
├── controllers/
│   └── productController.js  # Logika bisnis endpoint API & render halaman web
│
├── middlewares/
│   └── logger.js             # HTTP request logger middleware
│
├── models/
│   └── productModel.js       # Definisi model Sequelize tabel 'produk'
│
├── public/
│   └── index.html            # Frontend mandiri HTML + JS (Fetch & DOM Manipulation)
│
├── routes/
│   └── index.js              # Pemetaan rute URL API & Frontend
│
├── utils/
│   ├── formatter.js          # Helper format mata uang Rupiah & timestamp
│   └── seed.js               # Skrip seeder data awal produk UMKM
│
└── views/
    ├── index.ejs             # Halaman web utama (SPA EJS)
    └── partials/
        ├── head.ejs          # Head HTML, meta tag, font & Tailwind CDN
        └── footer.ejs        # Footer halaman
```

---

## 🚀 Panduan Instalasi & Penggunaan

### 1. Prasyarat Sistem
- **Node.js** (versi 18 ke atas)
- **PostgreSQL** sudah terpasang dan service-nya aktif (port default: `5432`)

### 2. Clone Repositori
```bash
git clone https://github.com/username-anda/PAW-Project-PasarinAja.git
cd PAW-Project-PasarinAja
```

### 3. Install Dependensi
```bash
npm install
```

### 4. Konfigurasi File Lingkungan (`.env`)
Salin file `.env.example` menjadi `.env`:
```bash
cp .env.example .env
```
Buka file `.env` dan sesuaikan kredensial PostgreSQL Anda:
```env
PORT=3000
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=password_postgres_anda
DB_NAME=PasarinAja
DB_PORT=5432
```

### 5. Inisialisasi Data Awal (Opsional)
Untuk mengisi database dengan contoh 8 produk UMKM:
```bash
npm run seed
```
*(Atau Anda bisa mengeksekusi file [`database.sql`](./database.sql) melalui pgAdmin / DBeaver / psql)*.

### 6. Jalankan Server
- **Mode Produksi**:
  ```bash
  npm start
  ```
- **Mode Pengembangan (Hot Reload via Nodemon)**:
  ```bash
  npm run dev
  ```

Akses aplikasi di browser:
- **Aplikasi Web Utama (EJS)**: [`http://localhost:3000`](http://localhost:3000)
- **Halaman Standalone (HTML/JS Client)**: [`http://localhost:3000/index.html`](http://localhost:3000/index.html)

---

## 📡 Dokumentasi API

Base URL: `http://localhost:3000`

### 1. Cek Status Server
- **Endpoint**: `GET /api/status`
- **Response `200 OK`**:
  ```json
  {
    "status": "ok",
    "message": "Server berjalan dengan baik",
    "timestamp": "2026-11-12T01:00:00.000Z"
  }
  ```

---

### 2. Mengambil Semua Produk
- **Endpoint**: `GET /api/produk`
- **Query Parameter (Opsional)**:
  - `search` : Kata kunci pencarian nama/deskripsi/UMKM (contoh: `?search=kopi`)
  - `kategori` : Filter kategori (contoh: `?kategori=Makanan & Minuman`)
- **Response `200 OK`**:
  ```json
  [
    {
      "id": 1,
      "nama": "Keripik Singkong Original",
      "kategori": "Makanan & Minuman",
      "harga": 15000,
      "deskripsi": "Keripik singkong renyah dengan bumbu gurih, dikemas 250 gram.",
      "umkm": "Keripik Singkong Bu Sari",
      "createdAt": "2026-11-12T00:00:00.000Z",
      "updatedAt": "2026-11-12T00:00:00.000Z"
    }
  ]
  ```

---

### 3. Mengambil Detail Satu Produk
- **Endpoint**: `GET /api/produk/:id`
- **Response `200 OK`**:
  ```json
  {
    "id": 1,
    "nama": "Keripik Singkong Original",
    "kategori": "Makanan & Minuman",
    "harga": 15000,
    "deskripsi": "Keripik singkong renyah dengan bumbu gurih, dikemas 250 gram.",
    "umkm": "Keripik Singkong Bu Sari",
    "createdAt": "2026-11-12T00:00:00.000Z",
    "updatedAt": "2026-11-12T00:00:00.000Z"
  }
  ```

---

### 4. Menambahkan Produk Baru
- **Endpoint**: `POST /api/produk`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "nama": "Sambal Bawang Pedas",
    "kategori": "Makanan & Minuman",
    "harga": 20000,
    "deskripsi": "Sambal bawang gurih pedas kemasan botol 150ml.",
    "umkm": "Dapur Bu Lilis"
  }
  ```
- **Response `201 Created`**:
  ```json
  {
    "id": 9,
    "nama": "Sambal Bawang Pedas",
    "kategori": "Makanan & Minuman",
    "harga": 20000,
    "deskripsi": "Sambal bawang gurih pedas kemasan botol 150ml.",
    "umkm": "Dapur Bu Lilis",
    "createdAt": "2026-11-12T01:05:00.000Z",
    "updatedAt": "2026-11-12T01:05:00.000Z"
  }
  ```

---

### 5. Memperbarui Data Produk
- **Endpoint**: `PUT /api/produk/:id` atau `PATCH /api/produk/:id`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "harga": 22000
  }
  ```
- **Response `200 OK`**: Data produk yang telah terupdate.

---

### 6. Menghapus Produk
- **Endpoint**: `DELETE /api/produk/:id`
- **Response `200 OK`**:
  ```json
  {
    "message": "Produk berhasil dihapus",
    "produk": { "id": 9, "nama": "Sambal Bawang Pedas" }
  }
  ```

---

## 💻 Pengujian Frontend (DOM Manipulation)

Alur kerja AJAX & manipulasi DOM pada aplikasi ini:
1. Saat halaman dimuat, fungsi `muatProduk()` melakukan `fetch('/api/produk')` dan memanggil `document.createElement('article')` untuk setiap produk lalu memasukkannya ke `#daftarProduk`.
2. Saat form `#formTambahProduk` di-submit, event `e.preventDefault()` menahan reload halaman.
3. Request dikirim secara asynchronous dengan method `POST` dan body JSON.
4. Response produk baru yang dikembalikan backend langsung dimasukkan ke urutan teratas katalog (`container.prepend(cardBaru)`), form dikosongkan (`form.reset()`), dan notifikasi sukses ditampilkan.

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah lisensi **ISC**. Bebas digunakan dan dikembangkan untuk keperluan akademik maupun pembelajaran.
