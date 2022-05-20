const express = require('express');
const stocksController = require('../controllers/stocksController');
const stockController = require('../controllers/stockController');

const router = express.Router();

router.get('/stocksEN', stocksController.stocksEN);
router.get('/ru', stockController.getAllStocksfromDB);

module.exports = router;
