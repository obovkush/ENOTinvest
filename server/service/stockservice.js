/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
const finnhub = require('finnhub');
const { Stock } = require('../db/models');

// задаем массив выборки акций
const demoStocks = [
  'ABRD',
  'ALRS',
  'GMKN',
  'OZON',
  'SBER',
  'SIBN',
  'VKCO',
  'MTSS',
  'YNDX',
];

class StockService {
  async updateStockFromMOEX(stocksData) {
    const marketData = await stocksData.marketdata.data.filter((el) => demoStocks.includes(el[0]));
    const securitiesData = await stocksData.securities.data.filter((el) => demoStocks.includes(el[0]));

    demoStocks.forEach(async (tiker, index) => {
      if (marketData[index][12]) {
        const stockData = await Stock.findOne({
          where: { secid: tiker },
        });
        if (stockData) {
          await stockData.update({
            shortName: securitiesData[index][2],
            secName: securitiesData[index][9],
            open: marketData[index][9],
            low: marketData[index][10],
            high: marketData[index][11],
            last: marketData[index][12],
            lastchange: (
              marketData[index][12] - securitiesData[index][3]
            ).toFixed(2),
            lastchangeprcnt: (
              ((marketData[index][12] - securitiesData[index][3]) * 100)
              / marketData[index][12]
            ).toFixed(2),
            prevprice: securitiesData[index][3],
          });
        } else {
          await stockData.create({
            secid: tiker,
            shortName: securitiesData[index][2],
            secName: securitiesData[index][9],
            open: marketData[index][9],
            low: marketData[index][10],
            high: marketData[index][11],
            last: marketData[index][12],
            lastchange: (
              marketData[index][12] - securitiesData[index][3]
            ).toFixed(2),
            lastchangeprcnt: (
              ((marketData[index][12] - securitiesData[index][3]) * 100)
          / marketData[index][12]
            ).toFixed(2),
            prevprice: securitiesData[index][3],
          });
        }
      }
    });

    try {
      // Список акций за которыми будем следить
      const stocks = [
        'NFLX',
        'INTC',
        'NVDA',
        'AAPL',
        'TWTR',
        'DIS',
        'AMZN',
        'TSLA',
      ];

      const { api_key } = finnhub.ApiClient.instance.authentications;
      api_key.apiKey = 'ca28s8iad3iaqnc2om4g';
      const finnhubClient = new finnhub.DefaultApi();

      setInterval(() => {
        console.log('🚨');
        stocks.forEach((el) => {
          finnhubClient.quote(`${el}`, async (error, data, response) => {
            const checkStock = await Stock.findOne({ where: { secid: `${el}` }, row: true });
            if (checkStock) {
              if (data.c !== checkStock.last) {
                finnhubClient.companyProfile2({ symbol: `${el}` }, async (error, data, response) => {
                  await Stock.update({
                    shortName: data.name,
                  }, { where: { id: checkStock.id } });
                });
                await Stock.update({
                  secid: `${el}`,
                  type: 'Акция',
                  open: data.o,
                  high: data.h,
                  low: data.l,
                  last: data.c.toFixed(2),
                  prevprice: data.pc,
                  lastchange: data.d.toFixed(2),
                  lastchangeprcnt: ((data.c - data.pc) / data.pc * 100).toFixed(2),
                }, { where: { id: checkStock.id } });
              }
            } else {
              await Stock.create({
                secid: `${el}`, type: 'Акция', open: data.o, high: data.h, low: data.l, last: data.c.toFixed(2), prevprice: data.pc, lastchange: data.d.toFixed(2), lastchangeprcnt: ((data.c - data.pc) / data.pc * 100).toFixed(2),
              });
            }
          });
        });
      }, 60 * 1000);
    } catch (error) {
      console.log('stockservice ENG =>', error);
    }
  }

  // // finnhubClient.company Profile 2({'symbol': 'BMW.DE'}, (error, data, response) => {
  //   console.log('🚨', data)
  // });
  // finnhubClient.quote('BMW.DE', (error, data, response) => {
  //   console.log('🚨', data);
  // });

  // BMW
  // BMWG
  // BMW@DE
  // BMW.DE

  async getAllStocksfromDB() {
    const allStocks = await Stock.findAll();
    return allStocks;
  }
}

module.exports = new StockService();
