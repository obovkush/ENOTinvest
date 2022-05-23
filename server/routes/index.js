const router = require('express').Router();
const Parser = require('rss-parser');
const wiki = require('wikijs').default;
const googleIt = require('google-it');

const parser = new Parser();

const stocksRouter = require('./stockRouter');
const userRouter = require('./userRouter');

router.use('/stocks', stocksRouter);

router.use('/user', userRouter);

router.get('/', (req, res) => {
  res.render('/');
});

// Ручка на получение инфы с Википедии
router.post('/wikipedia', (req, res) => {
  const { secid } = req.body;
  // Ищем в гугле по secid и выводим ссылку с первого сайта
  googleIt({ query: `${secid} компания википедия` }).then((results) => {
    const link = results.filter((el) => el.link.match(/ru.wikipedia.org/gm));
    res.json(link[0]?.link);

    // wiki({ apiUrl: 'https://ru.wikipedia.org/w/api.php' })
    //   .page(secid)
    //   .then(page => {
    //     page.summary().then(info => console.log(info))
    //     // res.json(info)
    //   })
  }).catch((error) => {
    res.json({ message: 'Не удалось получить данные из Wikipedia', error: error.message });
  });
});

// Ручка на получение RSS новостей
router.get('/rssnews', async (req, res) => {
  // Запишем все RSS ленты в массив и пройдёмся по ним
  // const arrayOfAllRSS = [
  //   'https://ru.investing.com/rss/news.rss',
  //   'https://www.interfax.ru/rss.asp',
  //   'https://www.finam.ru/analysis/conews/rsspoint',
  // ];
  try {
    const rssDataInvest = await parser.parseURL(
      'https://ru.investing.com/rss/news.rss',
    );

    const rssDataInter = await parser.parseURL(
      'https://www.interfax.ru/rss.asp',
    );

    const rssDataFinam = await parser.parseURL(
      'https://www.finam.ru/analysis/conews/rsspoint',
    );

    // const arr = [];
    // arrayOfAllRSS.map((elem) => {
    //   parser.parseURL(elem).then((news) => news).then((data) => res.json({ data }));
    // });
    const investNews = rssDataInvest.items;
    const interNews = rssDataInter.items;
    const finamNews = rssDataFinam.items;
    const arrayOfAllNews = [investNews, interNews, finamNews];

    res.json(arrayOfAllNews.flat());
  } catch (error) {
    res.json({ message: 'Не удалось получить данные RSS ленты', error });
  }
});

module.exports = router;
