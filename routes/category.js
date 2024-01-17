const express = require('express');
const router = express.Router();

const categoryContr = require('../controllers/category');

router.post('/', categoryContr.createCategory);
router.get('/', categoryContr.getAllCategory);


module.exports = router;