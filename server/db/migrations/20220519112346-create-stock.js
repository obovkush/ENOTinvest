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
        type: Sequelize.INTEGER,
      },
      // Минимальная цена сделки
      low: {
        type: Sequelize.INTEGER,
      },
      // Максимальная цена сделки
      high: {
        type: Sequelize.INTEGER,
      },
      // Цена последней сделки
      last: {
        type: Sequelize.INTEGER,
      },
      // Изменение цены последней сделки к цене предыдущей сделки, рублей
      lastchange: {
        type: Sequelize.INTEGER,
      },
      // Изменение цены последней сделки к цене предыдущей сделки, %
      lastchangeprcnt: {
        type: Sequelize.INTEGER,
      },
      // Цена предыдущего дня
      prevprice: {
        type: Sequelize.INTEGER,
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
