/* eslint-disable class-methods-use-this */
const fetch = require('node-fetch');

const finnhub = require('finnhub');

// задаем массив выборки акций
const demoStocks = [
  'ABRD',
  'ALRS',
  'GMKN',
  'OZON',
  'SBER',
  'SIBN',
  'VKCO',
  'VNC',
  'YNDX',
];

class StockController {
  async ru(req, res) {
    const data = await fetch(
      'https://iss.moex.com/iss/engines/stock/markets/shares/boards/TQBR/securities.json',
    );
    const datajson = await data.json();
    console.log(datajson.marketdata);
    // res.send(datajson);
  }
}

module.exports = new StockController();
