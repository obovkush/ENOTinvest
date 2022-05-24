module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Stocks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      // Идентификатор финансового инструмента
      secid: {
        allowNull: false,
        type: Sequelize.TEXT,
        unique: true,
      },
      // Режим торгов
      board: {
        type: Sequelize.TEXT,
      },
      // Тип акция/фонд
      type: {
        type: Sequelize.TEXT,
      },
      // Краткое наименование ценной бумаги
      shortName: {
        type: Sequelize.TEXT,
      },
      // Наименование финансового инструмента
      secName: {
        type: Sequelize.TEXT,
      },
      // Цена первой сделки
      open: {
        type: Sequelize.FLOAT,
      },
      // Минимальная цена сделки
      low: {
        type: Sequelize.FLOAT,
      },
      // Максимальная цена сделки
      high: {
        type: Sequelize.FLOAT,
      },
      // Цена последней сделки
      last: {
        type: Sequelize.FLOAT,
      },
      // Изменение цены последней сделки к цене предыдущего дня, рублей
      lastchange: {
        type: Sequelize.FLOAT,
      },
      // Изменение цены последней сделки к цене предыдущего дня, %
      lastchangeprcnt: {
        type: Sequelize.FLOAT,
      },
      // Цена предыдущего дня
      prevprice: {
        type: Sequelize.FLOAT,
      },
      currency: {
        type: Sequelize.TEXT,
      },
      // Информация о компании
      companyinfo: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Stocks');
  },
};
