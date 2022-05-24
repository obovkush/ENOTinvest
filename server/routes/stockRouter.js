const express = require('express');
const { Stock } = require('../db/models');
const stockController = require('../controllers/stockController');

const router = express.Router();

router.get('/ru', stockController.getAllStocksfromDB);

module.exports = router;
