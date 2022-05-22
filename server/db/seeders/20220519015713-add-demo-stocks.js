module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Stocks', [
      {
        // Идентификатор финансового инструмента
        secid: 'ABRD',
        // Тип акция/фонд
        type: 'Акция',
        // Краткое наименование ценной бумаги"
        shortName: 'АбрауДюрсо',
        // Наименование финансового инструмента
        secName: 'Абрау-Дюрсо ПАО',
        // Цена первой сделки
        open: 123,
        // Минимальная цена сделки
        low: 122,
        // Максимальная цена сделки
        high: 125,
        // Цена последней сделки
        last: 124,
        // Изменение цены последней сделки к цене предыдущей сделки, рублей
        lastchange: -1,
        // Изменение цены последней сделки к цене предыдущей сделки, %
        lastchangeprcnt: -0.7,
        // Цена предыдущего дня
        prevprice: 122,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Русские акции:
      {
        secid: 'VKCO',
        type: 'Акция',
        shortName: 'VKCO',
        secName: 'VKCO',
        open: 123,
        low: 122,
        high: 125,
        last: 124,
        lastchange: -1,
        lastchangeprcnt: -0.7,
        prevprice: 122,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        secid: 'SIBN',
        type: 'Акция',
        shortName: 'SIBN',
        secName: 'SIBN',
        open: 123,
        low: 122,
        high: 125,
        last: 124,
        lastchange: -1,
        lastchangeprcnt: -0.7,
        prevprice: 122,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        secid: 'GMKN',
        type: 'Акция',
        shortName: 'GMKN',
        secName: 'GMKN',
        open: 123,
        low: 122,
        high: 125,
        last: 124,
        lastchange: -1,
        lastchangeprcnt: -0.7,
        prevprice: 122,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        secid: 'MTSS',
        type: 'Акция',
        shortName: 'MTSS',
        secName: 'MTSS',
        open: 123,
        low: 122,
        high: 125,
        last: 124,
        lastchange: -1,
        lastchangeprcnt: -0.7,
        prevprice: 122,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        secid: 'OZON',
        type: 'Акция',
        shortName: 'OZON',
        secName: 'OZON',
        open: 123,
        low: 122,
        high: 125,
        last: 124,
        lastchange: -1,
        lastchangeprcnt: -0.7,
        prevprice: 122,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        secid: 'ALRS',
        type: 'Акция',
        shortName: 'ALRS',
        secName: 'ALRS',
        open: 123,
        low: 122,
        high: 125,
        last: 124,
        lastchange: -1,
        lastchangeprcnt: -0.7,
        prevprice: 122,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        secid: 'SBER',
        type: 'Акция',
        shortName: 'SBER',
        secName: 'SBER',
        open: 123,
        low: 122,
        high: 125,
        last: 124,
        lastchange: -1,
        lastchangeprcnt: -0.7,
        prevprice: 122,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        secid: 'YNDX',
        type: 'Акция',
        shortName: 'YNDX',
        secName: 'YNDX',
        open: 123,
        low: 122,
        high: 125,
        last: 124,
        lastchange: -1,
        lastchangeprcnt: -0.7,
        prevprice: 122,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Русские фонды:
      {
        secid: 'TMOS',
        type: 'Фонд',
        shortName: 'TMOS',
        secName: 'TMOS',
        open: 123,
        low: 122,
        high: 125,
        last: 124,
        lastchange: -1,
        lastchangeprcnt: -0.7,
        prevprice: 122,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        secid: 'TBIO',
        type: 'Фонд',
        shortName: 'TBIO',
        secName: 'TBIO',
        open: 123,
        low: 122,
        high: 125,
        last: 124,
        lastchange: -1,
        lastchangeprcnt: -0.7,
        prevprice: 122,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        secid: 'TGLD',
        type: 'Фонд',
        shortName: 'TGLD',
        secName: 'TGLD',
        open: 123,
        low: 122,
        high: 125,
        last: 124,
        lastchange: -1,
        lastchangeprcnt: -0.7,
        prevprice: 122,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Иностранные акции
      {
        secid: 'NFLX',
        type: 'Акция',
        shortName: 'Netflix Inc',
        secName: 'NFLX',
        open: 185.8665,
        low: 179.82,
        high: 190.17,
        last: 186.35,
        lastchange: 2.87,
        lastchangeprcnt: 1.56,
        prevprice: 183.48,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        secid: 'INTC',
        type: 'Акция',
        shortName: 'Intel Corp',
        secName: 'INTC',
        open: 42.245,
        low: 40.31,
        high: 42.28,
        last: 41.65,
        lastchange: -0.36,
        lastchangeprcnt: -0.86,
        prevprice: 42.01,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        secid: 'NVDA',
        type: 'Акция',
        shortName: 'NVIDIA Corp',
        secName: 'NVDA',
        open: 173.32,
        low: 157.56,
        high: 174.1,
        last: 166.94,
        lastchange: -4.3,
        lastchangeprcnt: -2.51,
        prevprice: 171.24,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        secid: 'AAPL',
        type: 'Акция',
        shortName: 'Apple Inc',
        secName: 'AAPL',
        open: 139.09,
        low: 132.61,
        high: 140.48,
        last: 137.59,
        lastchange: 0.24,
        lastchangeprcnt: 0.17,
        prevprice: 137.35,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        secid: 'TWTR',
        type: 'Акция',
        shortName: 'Twitter Inc',
        secName: 'TWTR',
        open: 37.77,
        low: 36.75,
        high: 38.305,
        last: 38.29,
        lastchange: 1,
        lastchangeprcnt: 2.68,
        prevprice: 37.29,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        secid: 'DIS',
        type: 'Акция',
        shortName: 'Walt Disney Co',
        secName: 'DIS',
        open: 104.49,
        low: 100.05,
        high: 104.82,
        last: 102.42,
        lastchange: -0.72,
        lastchangeprcnt: -0.7,
        prevprice: 103.14,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        secid: 'AMZN',
        type: 'Акция',
        shortName: 'Amazon.com Inc',
        secName: 'AMZN',
        open: 2191.37,
        low: 2100.2,
        high: 2197.41,
        last: 2151.82,
        lastchange: 5.44,
        lastchangeprcnt: 0.25,
        prevprice: 2146.38,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        secid: 'TSLA',
        type: 'Акция',
        shortName: 'Tesla Inc',
        secName: 'TSLA',
        open: 713.99,
        low: 633,
        high: 721.582,
        last: 663.9,
        lastchange: -45.52,
        lastchangeprcnt: -6.42,
        prevprice: 709.42,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        secid: 'BMW@DE',
        type: 'Акция',
        shortName: 'BMW@DE',
        secName: 'BMW@DE',
        open: 123,
        low: 122,
        high: 125,
        last: 124,
        lastchange: -1,
        lastchangeprcnt: -0.7,
        prevprice: 122,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Stocks');
  },
};
