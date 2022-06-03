const express = require('express');
const favoriteController = require('../controllers/favoriteController');

const router = express.Router();

router.post(
  '/:userId/stock/:secid/create',
  favoriteController.createFavoriteStock,
);
router.get('/:userId/read', favoriteController.getAllFavoriteStocks);
router.delete(
  '/:userId/stock/:secid/delete',
  favoriteController.deleteStockFromFavorite,
);

module.exports = router;
