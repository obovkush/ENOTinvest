const express = require('express');
const stockController = require('../controllers/stockController');

const router = express.Router();

router.get('/stocksENG', stockController.eng);
router.get('/stocksRU', stockController.ru);

module.exports = router;
