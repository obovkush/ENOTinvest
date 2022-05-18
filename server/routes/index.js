const router = require('express').Router();
const Parser = require('rss-parser');
const userRouter = require('./userRouter');

const parser = new Parser();

router.use('/user', userRouter);

router.get('/', (req, res) => {
  res.render('/')
});

// Ручка на получение RSS новостей
router.get('/rssnews', async (req, res) => {
  try {
    // const rssData = await parser.parseURL('https://www.interfax.ru/rss.asp');
    // const rssData = await parser.parseURL('https://www.finam.ru/analysis/conews/rsspoint');
    const rssData = await parser.parseURL('https://ru.investing.com/rss/news.rss');
    const { items } = rssData;
    res.json({ items})
  } catch (error) {
    res.json({ message: 'Не удалось получить данные RSS ленты', error })
  }
})

module.exports = router;
