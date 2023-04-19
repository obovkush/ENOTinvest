<h1 align="center">ENOTINVEST</a>
<img src="https://media1.giphy.com/media/NOSGFZ16rx6iUiG7mB/giphy.gif?cid=6c09b952l9d4dkunjz9y4fib588m9i3myv2uvz0kyl8ksqml&rid=giphy.gif&ct=s" height="45"/></h1>
<h3 align="center">Агрегатор новостей\YouTube роликов\котировок акций компаний размещенных на Санкт-Петербургской и Московской бирже. Основная цель проекта упростить поиск и контроль информации по интересующим компаниям.</h3>

# Запуск проекта
1. npm i в директории server
2. npm i в директории client
3. npm run dev для старта

# Новости

<img src="/readme-assets/news.gif"/>

Блок поделен на 3 вкладки: все новости, только текстовые, только YouTube.

Сбор новостей с сайтов:
- rss-parser
- rss-to-json

Сбор видео:

- YouTube API

Кликнув на любую из новостей можно перейти на сайт, где эта новость размещена. Видео можно просматривать прямо не выходя с сайта.

# Акции

<img src="/readme-assets/stockpage.gif"/>

Работа с акциями Московской биржи (котировки, исторические данные, тикеры, имена компаний):

- MOEX API

Работа с акциями Санкт-Петербургской биржи (котировки, исторические данные, тикеры):

- Finnhub API
- Polygon API

Описание компаний:
- google-it
- wikijs

Построение графиков:

- ChartJS

Для ежесекундного обновления данных по всем компаниям требуется платная подписка на API, поэтому в целях демонстрационных возможностей было выбрано 20. По клику на компанию раскрывается дополнительное поле с историческими данными, их динамикой в % соотношении, описанием из Википедии и подборкой последних новостей связанных только с этой компаний. Для зарегистрированного пользователя доступна возможность добавлять акции в избранное.

# Логин / регистрация

<img src="/readme-assets/loginreg.gif"/>

Хранение данных:

- PostgresSQL

Защита данных:

- bcrypt
- jwt

Подтверждение аккаунта:
- nodemailer

При регистрации проходит проверка по email на наличии уже такого в базе. Также есть проверка на сложность пароля и правильность его ввода при логине на сайт. После регистрации необходимо подтвердить аккаунт через переход по пришедшей ссылки на почту.

<img src="/readme-assets/validation.jpg"/>

# Портфель

<img src="/readme-assets/profile.gif"/>

Подключение личного кабинета:

- tinkoff-invest-api

После подключения портфеля на главной странице появляются 3 виджета: текущие состояние портфеля, распределение капитала и лучшая\худшая акция в активе. Чтобы посмотреть на свой портфель более детально, можно зайти в соответствующий раздел.

# Другие технологии проекта

<div>
   <img src="https://github.com/devicons/devicon/blob/master/icons/javascript/javascript-original.svg" title="JavaScript" alt="JavaScript" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/react/react-original-wordmark.svg" title="React" alt="React" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/redux/redux-original.svg" title="Redux" alt="Redux " width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/nodejs/nodejs-original-wordmark.svg" title="NodeJS" alt="NodeJS" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/express/express-original.svg" title="Express" **alt="Express" width="40" height="40"/>
  <img src="https://github.com/devicons/devicon/blob/master/icons/html5/html5-original.svg" title="HTML5" alt="HTML" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/git/git-original-wordmark.svg" title="Git" **alt="Git" width="40" height="40"/>
  <img src="https://github.com/devicons/devicon/blob/master/icons/css3/css3-plain-wordmark.svg"  title="CSS3" alt="CSS" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/bootstrap/bootstrap-original.svg" title="Bootstrap" **alt="Bootstrap" width="40" height="40"/>
  <img src="https://github.com/devicons/devicon/blob/master/icons/materialui/materialui-original.svg" title="Material UI" alt="Material UI" width="40" height="40"/>&nbsp;
</div>
