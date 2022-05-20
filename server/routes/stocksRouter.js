const express = require('express');
const stocksController = require('../controllers/stocksController');

const router = express.Router();

router.get('/stocksEN', stocksController.stocksEN);

module.exports = router;
