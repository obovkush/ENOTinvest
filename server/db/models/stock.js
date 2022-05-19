const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Stock extends Model {}
  Stock.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      // Идентификатор финансового инструмента
      secid: {
        allowNull: false,
        type: DataTypes.TEXT,
        unique: true,
      },
      // Тип акция/фонд
      type: {
        type: DataTypes.TEXT,
      },
      // Краткое наименование ценной бумаги
      shortName: {
        type: DataTypes.TEXT,
      },
      // Наименование финансового инструмента
      secName: {
        type: DataTypes.TEXT,
      },
      // Цена первой сделки
      open: {
        type: DataTypes.INTEGER,
      },
      // Минимальная цена сделки
      low: {
        type: DataTypes.INTEGER,
      },
      // Максимальная цена сделки
      high: {
        type: DataTypes.INTEGER,
      },
      // Цена последней сделки
      last: {
        type: DataTypes.INTEGER,
      },
      // Изменение цены последней сделки к цене предыдущей сделки, рублей
      lastchange: {
        type: DataTypes.INTEGER,
      },
      // Изменение цены последней сделки к цене предыдущей сделки, %
      lastchangeprcnt: {
        type: DataTypes.INTEGER,
      },
      // Цена предыдущего дня
      prevprice: {
        type: DataTypes.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'Stock',
      tableName: 'Stocks',
    },
  );
  return Stock;
};
