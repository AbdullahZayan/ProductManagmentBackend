const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const {
  createProduct,
  getAllProducts,
  deleteProduct,
  updateProduct, 
} = require('../controllers/ProductController');

router.route('/')
  .post(protect, createProduct)
  .get(protect, getAllProducts);

router.route('/:id')
  .put(protect, updateProduct) 
  .delete(protect, deleteProduct);

module.exports = router;