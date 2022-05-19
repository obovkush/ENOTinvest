const express = require('express');
const stocksController = require('../controllers/stocksController');

const router = express.Router();

router.get('/stocksENG/NFLX', stocksController.NFLX);
router.get('/stocksENG/INTC', stocksController.INTC);
router.get('/stocksENG/NVDA', stocksController.NVDA);
router.get('/stocksENG/AAPL', stocksController.AAPL);
router.get('/stocksENG/TWTR', stocksController.TWTR);
router.get('/stocksENG/DIS', stocksController.DIS);
router.get('/stocksENG/AMZN', stocksController.AMZN);
router.get('/stocksENG/TSLA', stocksController.TSLA);

module.exports = router;
