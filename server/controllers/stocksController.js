const finnhub = require('finnhub');
const { Stock } = require('../db/models');
const ApiError = require('../exceptions/apiError');

class StocksController {
  async stocksEN(req, res, next) {
    try {
      const { api_key } = finnhub.ApiClient.instance.authentications;
      api_key.apiKey = 'ca28s8iad3iaqnc2om4g';
      const finnhubClient = new finnhub.DefaultApi();

      finnhubClient.quote('NFLX', async (error, data, response) => {
        const checkStock = await Stock.findOne({ where: { secid: 'NFLX' }, row: true });
        if (checkStock) {
          if (data.c !== checkStock.last) {
            await Stock.update({
              secid: 'NFLX', type: 'stock', open: data.o, high: data.h, low: data.l, last: data.c, prevprice: data.pc, lastchange: data.d,
            }, { where: { id: checkStock.id } });
          }
        } else {
          await Stock.create({
            secid: 'NFLX', type: 'stock', open: data.o, high: data.h, low: data.l, course: data.c, prevprice: data.pc, difference: data.d,
          });
        }
      });

      finnhubClient.quote('INTC', async (error, data, response) => {
        const checkStock = await Stock.findOne({ where: { secid: 'INTC' }, row: true });
        if (checkStock) {
          if (data.c !== checkStock.last) {
            await Stock.update({
              secid: 'INTC', type: 'stock', open: data.o, high: data.h, low: data.l, last: data.c, prevprice: data.pc, lastchange: data.d,
            }, { where: { id: checkStock.id } });
          }
        } else {
          await Stock.create({
            secid: 'INTC', type: 'stock', open: data.o, high: data.h, low: data.l, course: data.c, prevprice: data.pc, difference: data.d,
          });
        }
      });

      finnhubClient.quote('NVDA', async (error, data, response) => {
        const checkStock = await Stock.findOne({ where: { secid: 'NVDA' }, row: true });
        if (checkStock) {
          if (data.c !== checkStock.last) {
            await Stock.update({
              secid: 'NVDA', type: 'stock', open: data.o, high: data.h, low: data.l, last: data.c, prevprice: data.pc, lastchange: data.d,
            }, { where: { id: checkStock.id } });
          }
        } else {
          await Stock.create({
            secid: 'NVDA', type: 'stock', open: data.o, high: data.h, low: data.l, course: data.c, prevprice: data.pc, difference: data.d,
          });
        }
      });

      finnhubClient.quote('AAPL', async (error, data, response) => {
        const checkStock = await Stock.findOne({ where: { secid: 'AAPL' }, row: true });
        if (checkStock) {
          if (data.c !== checkStock.last) {
            await Stock.update({
              secid: 'AAPL', type: 'stock', open: data.o, high: data.h, low: data.l, last: data.c, prevprice: data.pc, lastchange: data.d,
            }, { where: { id: checkStock.id } });
          }
        } else {
          await Stock.create({
            secid: 'AAPL', type: 'stock', open: data.o, high: data.h, low: data.l, course: data.c, prevprice: data.pc, difference: data.d,
          });
        }
      });

      finnhubClient.quote('TWTR', async (error, data, response) => {
        const checkStock = await Stock.findOne({ where: { secid: 'TWTR' }, row: true });
        if (checkStock) {
          if (data.c !== checkStock.last) {
            await Stock.update({
              secid: 'TWTR', type: 'stock', open: data.o, high: data.h, low: data.l, last: data.c, prevprice: data.pc, lastchange: data.d,
            }, { where: { id: checkStock.id } });
          }
        } else {
          await Stock.create({
            secid: 'TWTR', type: 'stock', open: data.o, high: data.h, low: data.l, course: data.c, prevprice: data.pc, difference: data.d,
          });
        }
      });

      finnhubClient.quote('DIS', async (error, data, response) => {
        const checkStock = await Stock.findOne({ where: { secid: 'DIS' }, row: true });
        if (checkStock) {
          if (data.c !== checkStock.last) {
            await Stock.update({
              secid: 'DIS', type: 'stock', open: data.o, high: data.h, low: data.l, last: data.c, prevprice: data.pc, lastchange: data.d,
            }, { where: { id: checkStock.id } });
          }
        } else {
          await Stock.create({
            secid: 'DIS', type: 'stock', open: data.o, high: data.h, low: data.l, course: data.c, prevprice: data.pc, difference: data.d,
          });
        }
      });

      finnhubClient.quote('AMZN', async (error, data, response) => {
        const checkStock = await Stock.findOne({ where: { secid: 'AMZN' }, row: true });
        if (checkStock) {
          if (data.c !== checkStock.last) {
            await Stock.update({
              secid: 'AMZN', type: 'stock', open: data.o, high: data.h, low: data.l, last: data.c, prevprice: data.pc, lastchange: data.d,
            }, { where: { id: checkStock.id } });
          }
        } else {
          await Stock.create({
            secid: 'AMZN', type: 'stock', open: data.o, high: data.h, low: data.l, course: data.c, prevprice: data.pc, difference: data.d,
          });
        }
      });

      finnhubClient.quote('TSLA', async (error, data, response) => {
        const checkStock = await Stock.findOne({ where: { secid: 'TSLA' }, row: true });
        if (checkStock) {
          if (data.c !== checkStock.last) {
            await Stock.update({
              secid: 'TSLA', type: 'stock', open: data.o, high: data.h, low: data.l, last: data.c, prevprice: data.pc, lastchange: data.d,
            }, { where: { id: checkStock.id } });
          }
        } else {
          await Stock.create({
            secid: 'TSLA', type: 'stock', open: data.o, high: data.h, low: data.l, course: data.c, prevprice: data.pc, difference: data.d,
          });
        }
      });

      const fullInfo = await Stock.findAll();
      res.json(fullInfo);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new StocksController();
