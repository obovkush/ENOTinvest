const express = require('express');

const router = express.Router();

const googleIt = require('google-it');

// Ручка на получение инфы с Википедии
router.post('', (req, res) => {
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

module.exports = router;
