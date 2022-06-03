/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
const finnhub = require('finnhub');
const { Stock } = require('../db/models');

// // Список иностранных акций за которыми будем следить
// const stocks = [
//   'NFLX',
//   'INTC',
//   'NVDA',
//   'AAPL',
//   'TWTR',
//   'DIS',
//   'AMZN',
//   'TSLA',
//   // 'GOOGL',
// ];

class StockService {
  async updateStockFromMOEX(stocksData, securities, type = 'Акция') {
    const marketData = await stocksData.marketdata?.data.filter((el) =>
      securities.includes(el[0]),
    );
    const securitiesData = await stocksData.securities?.data.filter((el) =>
      securities.includes(el[0]),
    );
    securities.forEach(async (tiker, index) => {
      if (marketData[index][12]) {
        try {
          const stockData = await Stock.findOne({
            where: { secid: tiker },
          });
          if (stockData) {
            console.log(
              `============> Рыночные данные "${securitiesData[index][2]}" ${
                marketData[index][12] !== stockData.last
                  ? 'обновились'
                  : 'не изменились'
              }`,
            );
            if (marketData[index][12] !== stockData.last) {
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
                  ((marketData[index][12] - securitiesData[index][3]) * 100) /
                  marketData[index][12]
                ).toFixed(2),
                prevprice: securitiesData[index][3],
              });
            }
          } else {
            await Stock.create({
              secid: tiker,
              type,
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
                ((marketData[index][12] - securitiesData[index][3]) * 100) /
                marketData[index][12]
              ).toFixed(2),
              prevprice: securitiesData[index][3],
            });
          }
        } catch (err) {
          console.log('stockservice MOEX =>', err);
        }
      }
    });
  }

  async updateStockFromFINNHUB(stocks) {
    const { api_key } = finnhub.ApiClient.instance.authentications;
    api_key.apiKey = 'ca28s8iad3iaqnc2om4g';
    const finnhubClient = new finnhub.DefaultApi();

    stocks.forEach((el) => {
      finnhubClient.quote(`${el}`, async (error, data, response) => {
        try {
          const checkStock = await Stock.findOne({
            where: { secid: `${el}` },
            row: true,
          });
          if (checkStock) {
            if (data?.c?.toFixed(2) !== checkStock.last) {
              console.log('Обновилась 💰💰💰', el, '💰💰💰');
              await Stock.update(
                {
                  open: data.o,
                  high: data.h,
                  low: data.l,
                  last: data.c.toFixed(2),
                  prevprice: data.pc,
                  lastchange: data.d.toFixed(2),
                  lastchangeprcnt: (
                    ((data.c - data.pc) / data.pc) *
                    100
                  ).toFixed(2),
                },
                { where: { id: checkStock.id } },
              );
            } else {
              console.log('Не обновилась 💰💰💰', el, '💰💰💰');
            }
          } else {
            await Stock.create({
              secid: `${el}`,
              type: 'Акция',
              shortName: `${el}`,
              open: data.o,
              high: data.h,
              low: data.l,
              last: data.c.toFixed(2),
              prevprice: data.pc,
              lastchange: data.d.toFixed(2),
              lastchangeprcnt: (((data.c - data.pc) / data.pc) * 100).toFixed(
                2,
              ),
            });
            finnhubClient.companyProfile2(
              { symbol: `${el}` },
              async (error, data, response) => {
                await Stock.update(
                  { shortName: data.name, currency: data.currency },
                  { where: { shortName: `${el}` } },
                );
              },
            );
          }
        } catch (err) {
          console.log('stockservice ENG =>', err);
        }
      });
    });
  }

  // }

  async getAllStocksfromDB() {
    const allStocks = await Stock.findAll();
    return allStocks;
  }
}

module.exports = new StockService();
