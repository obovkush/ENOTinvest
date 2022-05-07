const router = require('express').Router();

const userRouter = require('./userRouter');

router.use('/user', userRouter);
router.get('/', (req, res) => {
  res.render('index');
});

module.exports = router;
