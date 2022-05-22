/* eslint-disable class-methods-use-this */
const fetch = require('node-fetch');
const stockService = require('../service/stockservice');
const ApiError = require('../exceptions/apiError');

// задаем массив выборки русских акций
const demoStocks = [
  'ABRD',
  'ALRS',
  'GMKN',
  'MTSS',
  'OZON',
  'SBER',
  'SIBN',
  'VKCO',
  'YNDX',
];

// задаем массив выборки фондов
const demoFunds = ['TBIO', 'TGLD', 'TMOS'];

class StockController {
  async getRuStocksFromMOEX() {
    try {
      const data = await fetch(
        'https://iss.moex.com/iss/engines/stock/markets/shares/boards/TQBR/securities.json',
      );
      const stocksData = await data.json();
      stockService.updateStockFromMOEX(stocksData, demoStocks);
    } catch (err) {
      console.log(err);
    }
  }

  async getRuFundsFromMOEX() {
    try {
      const data = await fetch(
        'https://iss.moex.com/iss/engines/stock/markets/shares/boards/TQTF/securities.json',
      );
      const fundsData = await data.json();
      stockService.updateStockFromMOEX(fundsData, demoFunds, 'Фонд');
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
