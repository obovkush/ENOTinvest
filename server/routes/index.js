const router = require('express').Router();
const Parser = require('rss-parser');
const googleIt = require('google-it');
const jsoner = require('../json/first.json');
const tinkoff_v2 = require('../tinkoff_v2');

const api = new tinkoff_v2({
  token:
    't.K7H9cqNn5--JA4xgPitpcrh3VFS4I-DzUSZkhq5WuL3Ufzs_zHYY0-Y6-26Pzyf5V3xeWpWTXZrCnppFvk0Bbw',
});

const parser = new Parser();

const favoriteRouter = require('./favoriteRouter');
const stocksRouter = require('./stockRouter');
const userRouter = require('./userRouter');

router.use('/favorite/user', favoriteRouter);
router.use('/stocks', stocksRouter);
router.use('/user', userRouter);

router.get('/', (req, res) => {
  res.render('/');
});

// Ручка на получение инфы с Википедии
router.post('/wikipedia', (req, res) => {
  const { secid } = req.body;
  // Ищем в гугле по secid и выводим ссылку с первого сайта
  googleIt({ query: `${secid} компания википедия` })
    .then((results) => {
      const link = results.filter((el) => el.link.match(/ru.wikipedia.org/gm));
      res.json(link[0]?.link);
    })
    .catch((error) => {
      res.json({
        message: 'Не удалось получить данные из Wikipedia',
        error: error.message,
      });
    });
});

// Гребаный тинькоф

router.get('/profile', async (req, res) => {
    try {
    const profile = await api.OperationsServicePromise.GetPortfolio({'account_id' : '2038810095'})
    const shares = await api.InstrumentsServicePromise.Shares({})
    const etfs = await api.InstrumentsServicePromise.Etfs({})
    res.json({ profile, shares, etfs })
  
}catch(err){
  console.log(err);
}
})


// Ручка на получение RSS новостей
router.get('/rssnews', async (req, res) => {
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
