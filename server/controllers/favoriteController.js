/* eslint-disable class-methods-use-this */
const ApiError = require('../exceptions/apiError');

const { Favorite } = require('../db/models');

class FavoriteController {
  // eslint-disable-next-line consistent-return
  async createFavoriteStock(req, res) {
    try {
      const { userId, secid } = req.params;
      const favorite = await Favorite.findOne({
        where: {
          userId,
          secid,
        },
      });
      if (!favorite) {
        try {
          await Favorite.create({
            userId,
            secid,
          });
          return res.status(200).send({
            message: 'Акция успешно добавлена в избранное',
          });
        } catch (err) {
          if (err instanceof ApiError) {
            return res.status(err.status).send({
              error: err.code,
              description: err.message,
            });
          }
          console.log('error', err);
          return res.status(500).send({
            error: 'GENERIC',
            description: 'Что-то пошло не так при добавлении акции в избранное',
          });
        }
      } else {
        return res.status(500).send({
          message: 'Акция уже в избранном',
        });
      }
    } catch (err) {
      if (err instanceof ApiError) {
        return res.status(err.status).send({
          error: err.code,
          description: err.message,
        });
      }
      console.log('error', err);
      return res.status(500).send({
        error: 'GENERIC',
        description: 'Что-то пошло не так при добавлении акции в избранное',
      });
    }
  }

  async getAllFavoriteStocks(req, res) {
    const { userId } = req.params;
    try {
      const allFavoriteStocks = await Favorite.findAll({
        where: {
          userId,
        },
      });
      return res.json(allFavoriteStocks);
    } catch (err) {
      if (err instanceof ApiError) {
        return res.status(err.status).send({
          error: err.code,
          description: err.message,
        });
      }
      console.log('error', err);
      return res.status(500).send({
        error: 'GENERIC',
        description: 'Что-то пошло не так при получении акций из избранного',
      });
    }
  }

  async deleteStockFromFavorite(req, res) {
    const { userId, secid } = req.params;
    try {
      await Favorite.destroy({
        where: {
          userId,
          secid,
        },
      });
      return res.status(200).send({
        message: 'Акция удалена из избранного',
      });
    } catch (err) {
      if (err instanceof ApiError) {
        return res.status(err.status).send({
          error: err.code,
          description: err.message,
        });
      }
      console.log('error', err);
      return res.status(500).send({
        error: 'GENERIC',
        description: 'Что-то пошло не так при удалении акции из избранного',
      });
    }
  }
}

module.exports = new FavoriteController();
