const router = require('express').Router();

const stocksRouter = require('./stockRouter');
const userRouter = require('./userRouter');

router.use('/stocks', stocksRouter);
router.use('/user', userRouter);

router.get('/', (req, res) => {
  res.render('index');
});

module.exports = router;
