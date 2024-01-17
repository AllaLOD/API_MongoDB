const express = require('express');
const router = express.Router();
const productContr = require('../controllers/product');
const multer = require('../middleware/multer-config');

router.post('/', multer, productContr.createProduct);
router.get('/', productContr.getAllProducts);

module.exports = router;