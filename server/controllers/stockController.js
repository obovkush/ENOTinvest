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
  eng(req, res, next) {
    const { api_key } = finnhub.ApiClient.instance.authentications;
    api_key.apiKey = 'sandbox_ca1opiqad3i6tbvcpd50'; // Replace this
    const finnhubClient = new finnhub.DefaultApi();

    finnhubClient.quote('AAPL', (error, data, response) => {
      res.json(data);
    });
  }

  async ru(req, res) {
    const data = await fetch(
      `https://iss.moex.com/iss/engines/stock/markets/shares/boards/TQBR/securities.json`,
    );
    const datajson = await data.json();
    console.log(datajson.marketdata);
    // res.send(datajson);
  }
}

module.exports = new StockController();
