const { pool } = require('../config/database');

// HALAMAN FRONTEND (EJS)
const renderHomePage = async (req, res) => {
  try {
    const { rows: produk } = await pool.query('SELECT * FROM "produk" ORDER BY "id" DESC');
    res.render('index', { appName: 'PasarinAja', produk });
  } catch (error) {
    console.error('Gagal memuat halaman:', error.message);
    res.render('index', { appName: 'PasarinAja', produk: [] });
  }
};

// API — STATUS
const getStatus = (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Server berjalan dengan baik',
    timestamp: new Date().toISOString(),
  });
};

// API — READ: GET /api/produk (menggunakan Express & pg)
const getApiProducts = async (req, res) => {
  try {
    const { search, kategori } = req.query;
    let query = 'SELECT * FROM "produk"';
    const params = [];

    if (search || kategori) {
      const conditions = [];
      if (kategori) {
        params.push(kategori);
        conditions.push(`LOWER("kategori") = LOWER($${params.length})`);
      }
      if (search) {
        params.push(`%${search}%`);
        conditions.push(`("nama" ILIKE $${params.length} OR "deskripsi" ILIKE $${params.length} OR "umkm" ILIKE $${params.length})`);
      }
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY "id" DESC';
    const { rows } = await pool.query(query, params);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Gagal mengambil produk:', error.message);
    res.status(500).json({ error: 'Gagal mengambil data produk' });
  }
};

// API — READ ONE: GET /api/produk/:id
const getApiProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query('SELECT * FROM "produk" WHERE "id" = $1', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Produk tidak ditemukan' });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Gagal mengambil produk:', error.message);
    res.status(500).json({ error: 'Gagal mengambil data produk' });
  }
};

// API — CATEGORIES: GET /api/produk/kategori
const getApiCategories = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT DISTINCT "kategori" FROM "produk" ORDER BY "kategori" ASC');
    const kategori = rows.map((r) => r.kategori);
    res.status(200).json(kategori);
  } catch (error) {
    console.error('Gagal mengambil kategori:', error.message);
    res.status(500).json({ error: 'Gagal mengambil data kategori' });
  }
};

// API — CREATE: POST /api/produk (menggunakan Express & pg)
const createProduct = async (req, res) => {
  try {
    const { nama, kategori, harga, deskripsi, umkm } = req.body;

    // Validasi field wajib
    if (!nama || !kategori || harga === undefined || harga === '') {
      return res.status(400).json({
        error: 'Field nama, kategori, dan harga wajib diisi',
      });
    }

    const query = `
      INSERT INTO "produk" ("nama", "kategori", "harga", "deskripsi", "umkm", "createdAt", "updatedAt")
      VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
      RETURNING *
    `;
    const values = [nama, kategori, Number(harga), deskripsi || null, umkm || null];
    const { rows } = await pool.query(query, values);

    res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Gagal membuat produk:', error.message);
    res.status(500).json({ error: 'Gagal membuat produk baru' });
  }
};

// API — UPDATE: PUT /api/produk/:id
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, kategori, harga, deskripsi, umkm } = req.body;

    if (!nama || !kategori || harga === undefined || harga === '') {
      return res.status(400).json({
        error: 'Field nama, kategori, dan harga wajib diisi',
      });
    }

    const query = `
      UPDATE "produk"
      SET "nama" = $1, "kategori" = $2, "harga" = $3, "deskripsi" = $4, "umkm" = $5, "updatedAt" = NOW()
      WHERE "id" = $6
      RETURNING *
    `;
    const values = [nama, kategori, Number(harga), deskripsi || null, umkm || null, id];
    const { rows } = await pool.query(query, values);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Produk tidak ditemukan' });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Gagal mengubah produk:', error.message);
    res.status(500).json({ error: 'Gagal mengubah data produk' });
  }
};

// API — PATCH: PATCH /api/produk/:id
const patchProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const bolehDiubah = ['nama', 'kategori', 'harga', 'deskripsi', 'umkm'];
    const fields = [];
    const values = [];

    for (const kolom of bolehDiubah) {
      if (req.body[kolom] !== undefined) {
        values.push(kolom === 'harga' ? Number(req.body[kolom]) : req.body[kolom]);
        fields.push(`"${kolom}" = $${values.length}`);
      }
    }

    if (fields.length === 0) {
      return res.status(400).json({ error: 'Tidak ada data yang dikirim untuk diubah' });
    }

    values.push(id);
    const query = `
      UPDATE "produk"
      SET ${fields.join(', ')}, "updatedAt" = NOW()
      WHERE "id" = $${values.length}
      RETURNING *
    `;
    const { rows } = await pool.query(query, values);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Produk tidak ditemukan' });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Gagal mengubah produk:', error.message);
    res.status(500).json({ error: 'Gagal mengubah data produk' });
  }
};

// API — DELETE: DELETE /api/produk/:id
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query('DELETE FROM "produk" WHERE "id" = $1 RETURNING *', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Produk tidak ditemukan' });
    }

    res.status(200).json({ message: 'Produk berhasil dihapus', produk: rows[0] });
  } catch (error) {
    console.error('Gagal menghapus produk:', error.message);
    res.status(500).json({ error: 'Gagal menghapus produk' });
  }
};

module.exports = {
  renderHomePage,
  getStatus,
  getApiProducts,
  getApiProductById,
  getApiCategories,
  createProduct,
  updateProduct,
  patchProduct,
  deleteProduct,
};
