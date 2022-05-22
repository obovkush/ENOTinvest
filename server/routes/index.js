const router = require('express').Router();
const Parser = require('rss-parser');
const wiki = require('wikijs').default;
const  googleIt = require('google-it')

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
  const { secid } = req.body
  // Ищем в гугле по secid и выводим ссылку с первого сайта
  googleIt({'query': `${secid} компания википедия`}).then(results => {
    const link = results.filter(el => el.link.match(/ru.wikipedia.org/gm))
    res.json(link[0]?.link)
  
  // wiki({ apiUrl: 'https://ru.wikipedia.org/w/api.php' })
  //   .page(secid)
  //   .then(page => {
  //     page.summary().then(info => console.log(info))
  //     // res.json(info)
  //   })

  }).catch(error => {
    res.json({ message: 'Не удалось получить данные из Wikipedia', error: error.message });
  })
});

// Ручка на получение RSS новостей
router.get('/rssnews', async (req, res) => {
  try {
    // const rssData = await parser.parseURL('https://www.interfax.ru/rss.asp');
    // const rssData = await parser.parseURL('https://www.finam.ru/analysis/conews/rsspoint');
    const rssData = await parser.parseURL(
      'https://ru.investing.com/rss/news.rss',
    );
    const { items } = rssData;
    res.json({ items });
  } catch (error) {
    res.json({ message: 'Не удалось получить данные RSS ленты', error });
  }
});

module.exports = router;
