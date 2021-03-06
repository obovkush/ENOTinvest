module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Stocks', [
      {
        // Идентификатор финансового инструмента
        secid: 'ABRD',
        // Режим торгов
        board: 'TQBR',
        // Тип акция/фонд
        type: 'Акция',
        // Краткое наименование ценной бумаги"
        shortName: 'АбрауДюрсо',
        // Наименование финансового инструмента
        secName: 'Абрау-Дюрсо ПАО',
        // Цена первой сделки
        open: 123,
        // Минимальная цена сделки
        low: 122,
        // Максимальная цена сделки
        high: 125,
        // Цена последней сделки
        last: 124,
        // Изменение цены последней сделки к цене предыдущего дня, рублей
        lastchange: -1,
        // Изменение цены последней сделки к цене предыдущего дня, %
        lastchangeprcnt: -0.7,
        // Цена предыдущего дня
        prevprice: 122,
        companyinfo: `Группа компаний «Абрау-Дюрсо» выпускает игристые вина, произведенные по классической технологии и методом Charmat, тихие вина, а также сидр, крепкие алкогольные напитки, безалкогольные газированные напитки и артезианскую воду.`,
        currency: 'RUB',
        img: 'https://invest-brands.cdn-tinkoff.ru/RU000A0JS5T7x160.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Русские акции:
      {
        secid: 'VKCO',
        board: 'TQBR',
        type: 'Акция',
        shortName: 'VKCO',
        secName: 'VKCO',
        open: 123,
        low: 122,
        high: 125,
        last: 124,
        lastchange: -1,
        lastchangeprcnt: -0.7,
        prevprice: 122,
        companyinfo: `VK Company Limited это компания, развивающая электронную коммерцию, русскоязычные социальные сети и мессенджеры. Компания участвует в различных предприятиях, включая порталы, социальные сети и коммуникацию, службы доставки, онлайн-магазины, разработчиков игр и другие.`,
        currency: 'RUB',
        img: 'https://invest-brands.cdn-tinkoff.ru/vkcx160.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        secid: 'SIBN',
        board: 'TQBR',
        type: 'Акция',
        shortName: 'SIBN',
        secName: 'SIBN',
        open: 123,
        low: 122,
        high: 125,
        last: 124,
        lastchange: -1,
        lastchangeprcnt: -0.7,
        prevprice: 122,
        companyinfo: `«Газпром нефть» – вертикально-интегрированная нефтяная компания, основные виды деятельности которой – разведка и разработка месторождений нефти и газа, нефтепереработка, а также производство и сбыт нефтепродуктов. Компания – лидер российской нефтяной индустрии по эффективности.`,
        currency: 'RUB',
        img: 'https://invest-brands.cdn-tinkoff.ru/RU0007661625x160.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        secid: 'GMKN',
        board: 'TQBR',
        type: 'Акция',
        shortName: 'GMKN',
        secName: 'GMKN',
        open: 123,
        low: 122,
        high: 125,
        last: 124,
        lastchange: -1,
        lastchangeprcnt: -0.7,
        prevprice: 122,
        companyinfo: `«Норникель» является лидером горно-металлургической промышленности России, а также крупнейшим производителем палладия и рафинированного никеля и одним из крупнейших производителей платины и меди. «Норникель» производит также кобальт, родий, серебро, золото, иридий, рутений, селен, теллур и серу.`,
        currency: 'RUB',
        img: 'https://invest-brands.cdn-tinkoff.ru/nornikelx160.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        secid: 'MTSS',
        board: 'TQBR',
        type: 'Акция',
        shortName: 'MTSS',
        secName: 'MTSS',
        open: 123,
        low: 122,
        high: 125,
        last: 124,
        lastchange: -1,
        lastchangeprcnt: -0.7,
        prevprice: 122,
        companyinfo: `Публичное акционерное общество «Мобильные ТелеСистемы» (ПАО «МТС») — ведущая компания в России и странах СНГ по предоставлению услуг мобильной и фиксированной связи, передачи данных и доступа в интернет, кабельного и спутникового ТВ-вещания, провайдер цифровых сервисов, включая финтех и медиа в рамках экосистем и мобильных приложений, поставщик ИТ-решений в области коммуникационных платформ, интернета вещей, автоматизации, мониторинга, обработки данных, облачных вычислений и информационной безопасности.`,
        currency: 'RUB',
        img: 'https://invest-brands.cdn-tinkoff.ru/RU0007775219x160.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        secid: 'OZON',
        board: 'TQBR',
        type: 'Акция',
        shortName: 'OZON',
        secName: 'OZON',
        open: 123,
        low: 122,
        high: 125,
        last: 124,
        lastchange: -1,
        lastchangeprcnt: -0.7,
        prevprice: 122,
        companyinfo: `Ozon — ведущая универсальная e-commerce платформа в России. Оборот от продаж товаров и услуг (GMV) Ozon вырос на 133% в четвертом квартале 2021 года. Группа также управляет ведущим российским онлайн-турагентством Ozon. Travel, показатели которого не учитываются в GMV, и имеет долю в группе компаний «Литрес» — крупнейшей российской платформе электронных книг.`,
        currency: 'RUB',
        img: 'https://invest-brands.cdn-tinkoff.ru/ISSUANCEOZONx160.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        secid: 'ALRS',
        board: 'TQBR',
        type: 'Акция',
        shortName: 'ALRS',
        secName: 'ALRS',
        open: 123,
        low: 122,
        high: 125,
        last: 124,
        lastchange: -1,
        lastchangeprcnt: -0.7,
        prevprice: 122,
        companyinfo: `Группа предприятий АЛРОСА — это группа российских компаний, занимающая первое место в мире по объему производства природных алмазов и располагающая крупнейшими в мире доказанными запасами алмазов.`,
        currency: 'RUB',
        img: 'https://invest-brands.cdn-tinkoff.ru/RU0007252813x160.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        secid: 'SBER',
        board: 'TQBR',
        type: 'Акция',
        shortName: 'SBER',
        secName: 'SBER',
        open: 123,
        low: 122,
        high: 125,
        last: 124,
        lastchange: -1,
        lastchangeprcnt: -0.7,
        prevprice: 122,
        companyinfo: `ПАО Сбербанк представляет весь спектр инвестиционно-банковских услуг. Основным акционером и учредителем выступает Банк России, которому принадлежит 52,32% акций Сбербанка, еще 47,68% находится в публичном обращении. На активы банка (21,8 трлн рублей на 1 июля 2015 года) приходится почти треть всех активов банковской системы, также в банке размещено около 40% всех вкладов населения.`,
        currency: 'RUB',
        img: 'https://invest-brands.cdn-tinkoff.ru/sberx160.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        secid: 'YNDX',
        board: 'TQBR',
        type: 'Акция',
        shortName: 'YNDX',
        secName: 'YNDX',
        open: 123,
        low: 122,
        high: 125,
        last: 124,
        lastchange: -1,
        lastchangeprcnt: -0.7,
        prevprice: 122,
        companyinfo: `Российская технологическая компания, владеющая одноимённой системой поиска в интернете, интернет-порталом и веб-службами в нескольких странах. Головное юридическое лицо зарегистрировано в Нидерландах.`,
        currency: 'RUB',
        img: 'https://invest-brands.cdn-tinkoff.ru/NL0009805522x160.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Русские фонды:
      {
        secid: 'TMOS',
        board: 'TQTF',
        type: 'Фонд',
        shortName: 'TMOS',
        secName: 'TMOS',
        open: 123,
        low: 122,
        high: 125,
        last: 124,
        lastchange: -1,
        lastchangeprcnt: -0.7,
        prevprice: 122,
        companyinfo: `TMOS - фонд, который инвестирует в акции крупных публичных компаний России. Целевым индексом является Индекс МосБиржи (IMOEX), который пересматривается раз в квартал.  Валюта фонда - рубли. На Мосбирже фонд котируется в рублях. В Радаре цена указана также в рублях.`,
        currency: 'RUB',
        img: 'https://invest-brands.cdn-tinkoff.ru/TMOSx160.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        secid: 'TBRU',
        board: 'TQTF',
        type: 'Фонд',
        shortName: 'TBRU',
        secName: 'TBRU',
        open: 123,
        low: 122,
        high: 125,
        last: 124,
        lastchange: -1,
        lastchangeprcnt: -0.7,
        prevprice: 122,
        companyinfo: `TBRU — биржевой фонд, который инвестирует в краткосрочные, среднесрочные и долгосрочные рублевые облигации. Портфель составляется командой управляющих банка, то есть фактора отслеживания какого-либо индекса нет (как в случае) с ETF-фондом TMOS нет.`,
        currency: 'RUB',
        img: 'https://invest-brands.cdn-tinkoff.ru/TBRUx160.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        secid: 'TRUR',
        board: 'TQTF',
        type: 'Фонд',
        shortName: 'TRUR',
        secName: 'TRUR',
        open: 123,
        low: 122,
        high: 125,
        last: 124,
        lastchange: -1,
        lastchangeprcnt: -0.7,
        prevprice: 122,
        companyinfo: `TRUR — биржевой паевой инвестиционный фонд (БПИФ), который торгуется на Московской бирже и вкладывает сразу в 4 класса активов: российские акции, краткосрочные и долгосрочные рублёвые гос облигации, а также золото.`,
        currency: 'RUB',
        img: 'https://invest-brands.cdn-tinkoff.ru/TRURx160.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Иностранные акции
      {
        secid: 'NFLX',
        board: '',
        type: 'Акция',
        shortName: 'Netflix Inc',
        secName: 'NFLX',
        open: 185.8665,
        low: 179.82,
        high: 190.17,
        last: 186.35,
        lastchange: 2.87,
        lastchangeprcnt: 1.56,
        prevprice: 183.48,
        companyinfo: `Netflix — американская развлекательная компания, поставщик фильмов и сериалов на основе потокового мультимедиа. Основана 29 августа 1997 года Ридом Хастингсом и Марком Рэндольфом. Штаб-квартира находится в Лос-Гатос, Калифорния.`,
        currency: 'USD',
        img: 'https://invest-brands.cdn-tinkoff.ru/US64110L1061x160.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        secid: 'INTC',
        board: '',
        type: 'Акция',
        shortName: 'Intel Corp',
        secName: 'INTC',
        open: 42.245,
        low: 40.31,
        high: 42.28,
        last: 41.65,
        lastchange: -0.36,
        lastchangeprcnt: -0.86,
        prevprice: 42.01,
        companyinfo: `Intel — технологическая компания из Калифорнии, основанная несколькими инженерами в 1968 году. Сейчас в компании работают десятки тысяч сотрудников во многих странах мира.
        Intel известна как крупнейший производитель микропроцессоров, однако, будучи крупной инженерной компанией, выросшей из небольшого стартапа, продолжает многолетний опыт инноваций, в последние годы активно расширяя сферы своих интересов: здравоохранение и телекоммуникации, мобильные устройства и пользовательские интерфейсы, операционные системы и дополненная реальность.`,
        currency: 'USD',
        img: 'https://invest-brands.cdn-tinkoff.ru/US4581401001x160.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        secid: 'NVDA',
        board: '',
        type: 'Акция',
        shortName: 'NVIDIA Corp',
        secName: 'NVDA',
        open: 173.32,
        low: 157.56,
        high: 174.1,
        last: 166.94,
        lastchange: -4.3,
        lastchangeprcnt: -2.51,
        prevprice: 171.24,
        companyinfo: `NVIDIA - мировой лидер в области визуальных вычислений. Графические процессоры, которые мы изобрели, выступают в роли «зрительной коры» современных компьютеров и лежат в основе всех наших продуктов. Наша деятельность открывает широкое поле для новых исследований, творческой изобретательности и научных открытий.`,
        currency: 'USD',
        img: 'https://invest-brands.cdn-tinkoff.ru/US67066G1040x160.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        secid: 'AAPL',
        board: '',
        type: 'Акция',
        shortName: 'Apple Inc',
        secName: 'AAPL',
        open: 139.09,
        low: 132.61,
        high: 140.48,
        last: 137.59,
        lastchange: 0.24,
        lastchangeprcnt: 0.17,
        prevprice: 137.35,
        companyinfo: `Apple Inc. — американская корпорация, основанная 1 апреля 1976, в Калифорнии Стивом Джобсом, Рональдом Уэйном и Стивом Возняком. Компания Apple Inc. разрабатывает, производит и продаёт персональные компьютеры, мобильные коммуникационные и медиа устройства, портативные цифровые музыкальные проигрыватели, а также сопутствующее программное обеспечение, цифровой контент и приложения сторонних производителей по всему миру. Штаб-квартира находится в Купертино, штат Калифорния.`,
        currency: 'USD',
        img: 'https://invest-brands.cdn-tinkoff.ru/US0378331005x160.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        secid: 'TWTR',
        board: '',
        type: 'Акция',
        shortName: 'Twitter Inc',
        secName: 'TWTR',
        open: 37.77,
        low: 36.75,
        high: 38.305,
        last: 38.29,
        lastchange: 1,
        lastchangeprcnt: 2.68,
        prevprice: 37.29,
        companyinfo: `Twitter - социальная сеть для публичного обмена короткими (до 140 символов) сообщениями при помощи веб-интерфейса, SMS, средств мгновенного обмена сообщениями или сторонних программ-клиентов для пользователей интернета. Владельцем системы Twitter является компания Twitter Inc., главный офис которой находится в Сан-Франциско (штат Калифорния).`,
        currency: 'USD',
        img: 'https://invest-brands.cdn-tinkoff.ru/US90184L1026x160.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        secid: 'DIS',
        board: '',
        type: 'Акция',
        shortName: 'Walt Disney Co',
        secName: 'DIS',
        open: 104.49,
        low: 100.05,
        high: 104.82,
        last: 102.42,
        lastchange: -0.72,
        lastchangeprcnt: -0.7,
        prevprice: 103.14,
        companyinfo: `Компания The Walt Disney Company (TWDC, NYSE - DIS), мировой лидер индустрии развлечений, была основана Уолтом Диснеем в 1923 году. TWDC принадлежат различные бренды, в том числе Disney, Pixar, Звёздные Войны, MARVEL, ABC, National Georgraphic и другие.`,
        currency: 'USD',
        img: 'https://invest-brands.cdn-tinkoff.ru/US2546871060x160.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        secid: 'AMZN',
        board: '',
        type: 'Акция',
        shortName: 'Amazon.com Inc',
        secName: 'AMZN',
        open: 2191.37,
        low: 2100.2,
        high: 2197.41,
        last: 2151.82,
        lastchange: 5.44,
        lastchangeprcnt: 0.25,
        prevprice: 2146.38,
        companyinfo: `Amazon (Amazon.com, Inc.) – американская компания, крупнейшая в мире на рынках платформ электронной коммерции и публично-облачных вычислений по выручке и рыночной капитализации. Штаб-квартира – в Сиэтле.
        В 2019 бренд Amazon.com стал самым дорогим в мире и оценивался в $415 млрд. В 2019 компания стала самой дорогой в мире, обойдя Microsoft, ее цена на 7 января 2019 составила $797 млрд.`,
        currency: 'USD',
        img: 'https://invest-brands.cdn-tinkoff.ru/US0231351067x160.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        secid: 'TSLA',
        board: '',
        type: 'Акция',
        shortName: 'Tesla Inc',
        secName: 'TSLA',
        open: 713.99,
        low: 633,
        high: 721.582,
        last: 663.9,
        lastchange: -45.52,
        lastchangeprcnt: -6.42,
        prevprice: 709.42,
        companyinfo: `Tesla (ранее Tesla Motors) – американская компания, производитель электромобилей и (через свой филиал SolarCity) решений для хранения электрической энергии, базирующаяся в Пало-Альто, Калифорния. Названа в честь всемирно известного электротехника и физика Николы Теслы`,
        currency: 'USD',
        img: 'https://invest-brands.cdn-tinkoff.ru/US88160R1014x160.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // {
      //   secid: 'BMW@DE',
      //   board: '',
      //   type: 'Акция',
      //   shortName: 'BMW@DE',
      //   secName: 'BMW@DE',
      //   open: 123,
      //   low: 122,
      //   high: 125,
      //   last: 124,
      //   lastchange: -1,
      //   lastchangeprcnt: -0.7,
      //   prevprice: 122,
      //   companyinfo: `Bayerische Motoren Werke Aktiengesellschaft (BMW) производит и продает элитные автомобили и мотоциклы по всему миру. Компания производит все: от спортивных кабриолетов до элитных седанов и туристических мотоциклов с двигателями большого рабочего объема.`,
      //   currency: 'EUR',
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Stocks');
  },
};
