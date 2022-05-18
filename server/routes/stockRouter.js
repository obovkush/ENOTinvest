const express = require('express');
const stockController = require('../controllers/stockController');

const router = express.Router();

router.get('/stocksENG/NFLX', stockController.NFLX);
router.get('/stocksENG/INTC', stockController.INTC);
router.get('/stocksENG/NVDA', stockController.NVDA);
router.get('/stocksENG/AAPL', stockController.AAPL);
router.get('/stocksENG/TWTR', stockController.TWTR);
router.get('/stocksENG/DIS', stockController.DIS);
router.get('/stocksENG/AMZN', stockController.AMZN);
router.get('/stocksENG/TSLA', stockController.TSLA);

module.exports = router;
