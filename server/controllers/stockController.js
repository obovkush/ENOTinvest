/* eslint-disable class-methods-use-this */
const fetch = require('node-fetch');

const finnhub = require('finnhub');

const stockService = require('../service/stockService');

const ApiError = require('../exceptions/apiError');

class StockController {

  async getRuStocksFromMOEX() {
    try {
      const data = await fetch(
        `https://iss.moex.com/iss/engines/stock/markets/shares/boards/TQBR/securities.json`,
      );
      const stocksData = await data.json();
      stockService.updateStockFromMOEX(stocksData);
    } catch (err) {
      console.log(err);
    }
  }

  async getAllStocksfromDB(req, res) {
    try {
      const allStocks = await stockService.getAllStocksfromDB();
      return res.json(allStocks);
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
        description: 'Что-то пошло не так',
      });
    }
  }
}

module.exports = new StockController();
