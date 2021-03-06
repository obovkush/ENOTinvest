require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const path = require('path');
const router = require('./routes/index');
const errorMiddleware = require('./middlewares/errorMiddleware');
const stockController = require('./controllers/stockController');
// const stockController = require('./controllers/stockController');

const log = console;
// Задаем порт подключения к серверу
const PORT = process.env.PORT ?? 5000;
// Импортируем функцию проверки подключения к базе данных
const dbConnectionCheck = require('./db/dbConnectionCheck');

app.use(cookieParser());

// Вместо политики CORS
app.use((req, res, next) => {
  const accessList = ['http://localhost:3000'];
  const origin = req.get('origin');
  if (accessList.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
    res.header(
      'Access-Control-Allow-Methods',
      'GET, HEAD, OPTIONS, POST, DELETE',
    );
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    );
  }
  next();
});

app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));

app.use('/api', router);

// Обработка обшибок, последний middleware
app.use(errorMiddleware);

// Запускаем сервер
const start = async () => {
  try {
    // Проверяем подключение к базе данных
    await dbConnectionCheck();
    app.listen(PORT, (error) => {
      if (!error) {
        log.log('Server running on HTTP-port:', PORT);
      } else log.log(error);
    });
  } catch (error) {
    log.log(error);
  }
};

start();

// Вызов функций обновления информации по акциям/фондам с API в базу
const intStocksMOEX = setInterval(stockController.getRuStocksFromMOEX, 1000);
setTimeout(() => clearInterval(intStocksMOEX), 2000);
const intFundsMOEX = setInterval(stockController.getRuFundsFromMOEX, 1000);
setTimeout(() => clearInterval(intFundsMOEX), 2000);
const intStocksFINNHUB = setInterval(
  stockController.getEngStocksFromFINNHUB,
  1000,
);
setTimeout(() => clearInterval(intStocksFINNHUB), 2000);
