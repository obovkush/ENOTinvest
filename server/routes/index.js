const router = require('express').Router();

const favoriteRouter = require('./favoriteRouter');
const stocksRouter = require('./stockRouter');
const userRouter = require('./userRouter');
const profileRouter = require('./profileRouter');
const rssRouter = require('./rssRouter');
const wikipediaRouter = require('./wikipediaRouter');

router.use('/favorite/user', favoriteRouter);
router.use('/stocks', stocksRouter);
router.use('/user', userRouter);
router.use('/profile', profileRouter);
router.use('/rssnews', rssRouter);
router.use('/wikipedia', wikipediaRouter);

router.get('/', (req, res) => {
  res.render('/');
});

module.exports = router;
