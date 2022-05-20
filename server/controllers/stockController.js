/* eslint-disable class-methods-use-this */
const fetch = require('node-fetch');

const finnhub = require('finnhub');

const stockService = require('../service/stockservice');

const ApiError = require('../exceptions/apiError');

class StockController {
  eng(req, res, next) {
    const { api_key } = finnhub.ApiClient.instance.authentications;
    api_key.apiKey = 'sandbox_ca1opiqad3i6tbvcpd50'; // Replace this
    const finnhubClient = new finnhub.DefaultApi();

    finnhubClient.quote('AAPL', (error, data, response) => {
      res.json(data);
    });
  }

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
