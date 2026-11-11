const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// ================================================================
// Route Halaman Frontend (EJS)
// ================================================================
router.get('/', productController.renderHomePage);

// ================================================================
// Endpoint API
// ================================================================

// Status server
router.get('/api/status', productController.getStatus);

// --- CRUD Produk ---

// READ   : Daftar kategori (harus di atas /:id agar tidak tertangkap sebagai ID)
router.get('/api/produk/kategori', productController.getApiCategories);

// READ   : Semua produk  (query opsional: ?search=keyword&kategori=xxx)
router.get('/api/produk', productController.getApiProducts);

// READ   : Satu produk berdasarkan ID
router.get('/api/produk/:id', productController.getApiProductById);

// CREATE : Tambah produk baru
router.post('/api/produk', productController.createProduct);

// UPDATE : Ubah seluruh data produk
router.put('/api/produk/:id', productController.updateProduct);

// UPDATE : Ubah sebagian data produk
router.patch('/api/produk/:id', productController.patchProduct);

// DELETE : Hapus produk
router.delete('/api/produk/:id', productController.deleteProduct);

module.exports = router;
