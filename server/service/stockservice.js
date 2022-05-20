/* eslint-disable class-methods-use-this */
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
  }

  async getAllStocksfromDB() {
    const allStocks = await Stock.findAll();
    return allStocks;
  }
}

module.exports = new StockService();
