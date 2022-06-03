const express = require('express');

const router = express.Router();

const Parser = require('rss-parser');
const jsoner = require('../json/first.json');

const parser = new Parser();

// Ручка на получение RSS новостей
router.get('', async (req, res) => {
  try {
    const rssDataInvest = await parser.parseURL(
      'https://ru.investing.com/rss/news.rss',
    );

    const rssDataInter = await parser.parseURL(
      'https://www.interfax.ru/rss.asp',
    );

    // const rssDataFinam = await parser.parseURL(
    //   'https://www.finam.ru/analysis/conews/rsspoint',
    // );

    const investNews = rssDataInvest.items;
    const interNews = rssDataInter.items;
    // const finamNews = rssDataFinam.items;
    const arrayOfAllNews = [investNews, interNews, jsoner];

    res.json(arrayOfAllNews.flat());
  } catch (error) {
    res.json({ message: 'Не удалось получить данные RSS ленты', error });
  }
});

module.exports = router;
